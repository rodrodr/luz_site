#!/usr/bin/env python3
"""Calcula y comprueba, sobre las fuentes, cada marcador del copy de Método, Usar los datos y Versiones.

Es la referencia de `exportador/modulos/metodo.py` y `exportador/modulos/datos.py`: cada marcador dice su valor, su
tipo, su base y su fórmula legible, con el mismo formato que `src/data/cifras.json` (`v`, `t`, `base`, `f`). Escribe:

  docs/marcadores/metodo.md · datos.md · versiones.md   (tablas `clave | valor esperado | base | cómo se calcula`)
  docs/marcadores/marcadores_metodo_datos.json            (los mismos valores, legibles por máquina)
  docs/marcadores/comprobaciones_metodo_datos.txt        (el registro de esta ejecución)

Fuentes (solo lectura) y huellas que se comprueban antes de calcular nada:
  V2        2REP_Base/2REP_Diaries.csv                          MD5 360332a0ff1327671530f15eed46ac0c
  V1        2REP_Base/copia_2REP_Diaries_V1_dataverse_2026-09-15  MD5 0a9adafefd12a21691f4a44b2e75beac (F25)
  v3        ~/.cache/luz_site/corpus.sqlite                     sha256 3a0d8b2d…  + clima/*.jsonl (papel de cada fila)
  mapa      2REP_Explorer/tools/mapa_v2_v3.json                 destino_sha256 e1906abc… (el CSV v3 del explorador)
  proyecto  2REP_Explorer/standalone/data/sessions.json         sha256 b3295e99…
            2REP_Base/TXT_OCR_REPAIRED y TXT_OCR_TESSERACT (*.meta.json) · diputados_21_06_encode.csv
  afin      2REP_Coautorias/data/dataverse/representative_metadata.csv  MD5 c9e66013… (= original depositado en CGOCUS V1.1)
  dv        luz_site/exportador/instantaneas/<última>/dv_thqcmi*.json
  explorador la misma instantánea (manifiesto del corpus servido)

Uso:  python3 docs/marcadores/comprobar_metodo_datos.py      (≈ 1 min; pandas 3, node 22)
"""
from __future__ import annotations

import datetime as dt
import glob
import hashlib
import json
import sqlite3
import sys
from pathlib import Path

import numpy as np
import pandas as pd

AQUI = Path(__file__).resolve().parent
SITIO = AQUI.parent.parent
sys.path.insert(0, str(SITIO / "docs" / "estudio" / "datos"))
sys.dont_write_bytecode = True
import comun  # noqa: E402  (cargar_v2 comprueba el MD5; roles_presidencia usa el analizador del explorador)

BASE = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base")
V1 = BASE / "copia_2REP_Diaries_V1_dataverse_2026-09-15" / "2REP_Diaries.csv"
V3 = Path("/Users/rodrodr/.cache/luz_site/corpus.sqlite")
CLIMA = Path("/Users/rodrodr/.cache/luz_site/clima")
MAPA = BASE / "2REP_Explorer" / "tools" / "mapa_v2_v3.json"
SESIONES = BASE / "2REP_Explorer" / "standalone" / "data" / "sessions.json"
DIPUTADOS = BASE / "diputados_21_06_encode.csv"
AFIN = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Coautorias/data/dataverse/representative_metadata.csv")
HUELLAS = {V1: ("md5", "0a9adafefd12a21691f4a44b2e75beac"),
           V3: ("sha256", "3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15"),
           SESIONES: ("sha256", "b3295e99f45af95a4d6f47f910fcacea7fc5f6da98ffde38df726fda1d7231da"),
           AFIN: ("md5", "c9e660131cbfbe0ac96e56e59c94837d")}
HOY = dt.date.today().isoformat()
LOG: list[str] = []
# Claves que también declaran otros grupos (base.md, comun.md, inicio.md): mismo nombre, mismo valor.
COMPARTIDAS = {"filas.V2", "filas.v3", "habla.v3", "sesiones", "sesiones.num1", "sesiones.fechas_dobles", "columnas.V2",
               "diputados.V2", "palabras.V2", "palabras.v3", "palabras.habla.v3", "paginas.total", "dv.csv.bytes", "dv.version",
               "dv.thqcmi.versiones", "explorador.gz.bytes", "filas.con_diputado", "filas.sin_diputado", "pres.vice_ses",
               "presidencia.filas.pct", "presidencia.palabras.pct", "meses.con_sesion", "mes.1933-02.sesiones",
               "mes.1933-02.filas", "mes.1933-02.palabras", "v3.comentarios", "v3.sumarios", "sesion.1931-10-01-48.filas_v3",
               "leg.1931-1933.sesiones", "leg.1933-1935.sesiones", "leg.1936-1939.sesiones", "leg.1931-1933.palabras",
               "leg.1933-1935.palabras", "leg.1936-1939.palabras", "fila.presidencia.id.V2", "fila.presidencia.id.v3",
               "fila.presidencia.nwords", "fila.campoamor.id.V2", "fila.campoamor.id.v3", "fila.campoamor.nwords",
               "voto.161-121.si", "voto.161-121.no", "voto.161-121.V2",
               # la cola de la sesión 48 es la de Sesiones (`ses.s48.cola*`, REVISION_FASE1 P1-3)
               "ses.s48.cola", "ses.s48.cola.V2.desde", "ses.s48.cola.V2.hasta", "ses.s48.cola.v3.desde",
               "ses.s48.cola.v3.hasta", "ses.s48.cola.pantalla.desde", "ses.s48.cola.pantalla.hasta"}
# Lista blanca de `check-i18n` para Método: cadenas con dígitos que no son cifras (REVISION_FASE1 P2-9).
LISTA_BLANCA_METODO = [
    ("E1 Sr.", "`metodo.02.texto`: variante de lectura de la fórmula «El Sr.» (el 1 es una l mal leída)"),
    ("escriba 77", "`metodo.07.pruebelo.explorador`: lo que se teclea en «Nº de sesión» para la sesión 77"),
]


def log(*a) -> None:
    s = " ".join(str(x) for x in a)
    print(s)
    LOG.append(s)


def huella(p: Path, alg: str) -> str:
    h = hashlib.new(alg)
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


M: dict[str, dict] = {}   # clave -> {v, t, base, f, grupo, dec?}


def pon(clave: str, v, t: str, base: str, f: str, grupos: str, dec: int | None = None) -> None:
    if isinstance(v, (np.integer,)):
        v = int(v)
    if isinstance(v, (np.floating,)):
        v = float(v)
    d = {"v": v, "t": t, "base": base, "f": f, "d": HOY, "grupos": grupos}
    if dec is not None:
        d["dec"] = dec
    M[clave] = d


def muestra(c: dict, fmt: str = "") -> str:
    """Cómo lo pinta `cifras.ts` en español (para leer las tablas)."""
    v, t = c["v"], c["t"]
    g = lambda x, dec=0: f"{x:,.{dec}f}".replace(",", "X").replace(".", ",").replace("X", ".")
    if t == "pct":
        return g(100 * v, c.get("dec", 2)) + " %"
    if t == "peso":
        return g(v / 1048576, 1) + " MB"
    if t == "id":
        return str(v)
    if t == "ratio":
        return g(v, c.get("dec", 2))
    if t == "n":
        return g(v)
    return str(v)


def roles(df: pd.DataFrame) -> pd.DataFrame:
    """Como comun.roles_presidencia, pero con la entrada en un directorio temporal: no escribe en docs/estudio/."""
    import subprocess
    import tempfile
    pares = df[["speaker", "rep_name"]].fillna("").drop_duplicates()
    with tempfile.TemporaryDirectory() as tmp:
        entrada = Path(tmp) / "etiquetas.json"
        entrada.write_text(json.dumps(pares.values.tolist(), ensure_ascii=False), encoding="utf-8")
        salida = subprocess.run(["node", str(SITIO / "docs" / "estudio" / "datos" / "motor" / "roles.mjs"), str(entrada)],
                                check=True, capture_output=True, text=True).stdout
    mapa = {(s, r): rol for (s, r), rol in zip(pares.values.tolist(), json.loads(salida))}
    df["rol"] = [mapa[k] for k in zip(df["speaker"].fillna(""), df["rep_name"].fillna(""))]
    df["presidencia"] = df["rol"].isin(comun.PRESIDENCIA)
    return df


def main() -> None:
    for p, (alg, esperado) in HUELLAS.items():
        h = huella(p, alg)
        assert h == esperado, f"{p}: {alg} {h} ≠ {esperado}"
        log(f"huella ok · {p.name} · {alg} {h[:12]}…")

    # ── V2 ──────────────────────────────────────────────────────────────────────────────────────────────
    d = roles(comun.cargar_v2(con_texto=True))      # MD5 y 107.551 filas comprobados dentro
    log("huella ok · 2REP_Diaries.csv · md5", comun.MD5_V2[:12] + "…")
    P = d.presidencia
    ses = d[["date", "num_session"]].drop_duplicates()
    V2 = "V2"
    G_M, G_D, G_V = "metodo", "datos", "versiones"

    pon("filas.V2", len(d), "n", V2, "recuento de filas del CSV depositado", "metodo datos versiones")
    pon("columnas.V2", d.shape[1] - 4, "n", V2, "columnas del CSV (sin las derivadas de este cálculo)", "metodo datos")
    assert M["columnas.V2"]["v"] == 14
    pon("sesiones", len(ses), "n", V2, "claves distintas (date, num_session)", "metodo datos versiones")
    pon("sesiones.num1", int((ses.num_session == 1).sum()), "n", V2, "claves con num_session = 1", G_D)
    dobles = ses.date.value_counts()
    pon("sesiones.fechas_dobles", int((dobles > 1).sum()), "n", V2, "fechas con dos claves de sesión", G_D)
    pon("palabras.V2", int(d.nwords.sum()), "n", V2, "suma de nwords", "metodo datos")
    pon("palabras.split.V2", int(d.speech.str.split().str.len().sum()), "n", V2,
        "suma de len(speech.split()) (separa por cualquier espacio en blanco)", G_D)
    pon("filas.con_diputado", int(d.rep_id.notna().sum()), "n", V2, "filas con rep_id", G_M)
    pon("filas.con_diputado.pct", float(d.rep_id.notna().mean()), "pct", V2, "filas con rep_id / filas", G_M)
    pon("filas.sin_diputado", int(d.rep_id.isna().sum()), "n", V2, "filas sin rep_id", "metodo datos")
    pon("filas.sin_diputado.ministerio", int((d.rep_id.isna() & (d.rol == "minister")).sum()), "n", V2,
        "filas sin rep_id cuya fórmula el analizador del explorador lee como ministro (rol minister)", G_M)
    vice = d[d.rol == "vicechair"]
    pon("pres.vice_ses", len(vice[["date", "num_session"]].drop_duplicates()), "n", V2,
        "sesiones (date, num_session) con alguna fila de rol vicechair (parse_speaker del explorador); 584 si se cuentan fechas",
        G_M)
    pon("presidencia.filas", int(P.sum()), "n", V2, "filas con rol chair, vicechair o chair_age (parse_speaker)", G_D)
    pon("presidencia.filas.pct", float(P.mean()), "pct", V2, "filas de la Presidencia / filas", G_D)
    pon("presidencia.palabras.pct", float(d.loc[P, "nwords"].sum() / d.nwords.sum()), "pct", V2,
        "nwords de la Presidencia / nwords", G_D)
    aprox = d.speaker.str.contains("PRESIDENTE") & ~d.speaker.str.contains("CONSEJO|GOBIERNO|REPÚBLICA")
    pon("presidencia.aprox.filas", int(aprox.sum()), "n", V2,
        'la línea de datos.decisiones.1.codigo: speaker contiene "PRESIDENTE" y no "CONSEJO|GOBIERNO|REPÚBLICA"', G_D)

    s = d.nwords
    pon("longitud.umbral", 50, "n", V2, "umbral de fila breve del sitio (límite del tramo 21–50 de F10)", "metodo datos")
    pon("longitud.umbral300", 300, "n", V2, "umbral de fila larga (límite del tramo 101–300 de F10)", G_D)
    pon("longitud.hasta50", int((s <= 50).sum()), "n", V2, "filas con nwords ≤ 50", G_M)
    pon("longitud.hasta50.pct", float((s <= 50).mean()), "pct", V2, "filas con nwords ≤ 50 / filas", "metodo datos")
    pon("longitud.mediana", int(s.median()), "n", V2, "mediana de nwords", G_M)
    pon("longitud.hasta50.presidencia.pct", float(d.loc[s <= 50, "presidencia"].mean()), "pct", V2,
        "filas de la Presidencia entre las de nwords ≤ 50", G_M)
    w = np.sort(s.values)[::-1]
    cw = np.cumsum(w) / w.sum()
    for k, p in (("", 0.10), ("2", 0.20)):
        pon(f"longitud.curva.corte{k}", p, "pct", V2, "punto anotado de F11 (parte de filas, de la más larga a la más corta)", G_M)
        pon(f"longitud.curva.palabras{k}", float(cw[int(len(w) * p) - 1]), "pct", V2,
            f"parte de nwords en el {int(p * 100)} % de filas más largas (curva de F11)", G_M, dec=1)
    pon("longitud.mas300", int((s > 300).sum()), "n", V2, "filas con nwords > 300", G_D)
    pon("longitud.mas300.palabras.pct", float(s[s > 300].sum() / s.sum()), "pct", V2,
        "nwords de las filas > 300 / nwords", G_D)

    leg = d.groupby("legislature").nwords.sum()
    pon("leg.1931-1933.palabras.pct", float(leg["1931-1933"] / leg.sum()), "pct", V2,
        "nwords de 1931-1933 / nwords", "metodo datos")
    for lg, g in d.groupby("legislature"):
        ns = len(g[["date", "num_session"]].drop_duplicates())
        pon(f"leg.{lg}.sesiones", ns, "n", V2, f"claves (date, num_session) de {lg}", G_D)
        pon(f"leg.{lg}.filas", len(g), "n", V2, f"filas de {lg}", G_D)
        pon(f"leg.{lg}.palabras", int(g.nwords.sum()), "n", V2, f"nwords de {lg}", G_D)
        pon(f"leg.{lg}.palabras_por_sesion", int(round(g.nwords.sum() / ns)), "n", V2,
            f"nwords de {lg} / sus sesiones, redondeado a la unidad", G_D)

    L = d.speech.str.len()
    pon("csv.celdas_largas", int((L > 32767).sum()), "n", V2, "filas con len(speech) > 32.767 (máximo de una celda de Excel)", G_D)
    pon("csv.fila_mas_larga.caracteres", int(L.max()), "n", V2, "len(speech) máximo (fila 55221)", G_D)

    pon("distritos.V2", int(d.district.nunique()), "n", V2, "valores distintos de district", G_D)
    pon("distritos.agrarios.filas", int((d.district == "Agrarios").sum()), "n", V2, 'filas con district = "Agrarios"', G_D)
    pon("familias.V2", int(d.party_family.nunique()), "n", V2, "valores distintos de party_family, en bruto", "metodo datos")
    pon("familias.vacias", int(d.party_family.isna().sum()), "n", V2, "filas con party_family vacía", G_D)
    pon("familias.liberal.filas", int((d.party_family == "Liberal").sum()), "n", V2, 'filas con party_family = "Liberal"', "metodo versiones")
    # D-25 (23-09-2026): los pendientes de datos se declaran con su cifra en Versiones
    mb = d[d.rep_name == "Diego Martinez Barrio"]
    pon("pendiente.martinez_barrio_ar.filas", int(((mb.legislature == "1931-1933") & (mb.party == "AR")).sum()), "n", V2,
        'filas del rep_id 550 (Diego Martinez Barrio) con party = "AR" en la legislatura 1931-1933', G_V)
    pon("pendiente.lliga_cd.filas", int(((d.party == "Lliga") & (d.ideology.str.strip() == "CD")).sum()), "n", V2,
        'filas con party = "Lliga" e ideology = "CD" (el README la da como D)', G_V)
    ideo = d.dropna(subset=["party"]).assign(i=lambda x: x.ideology.str.strip())
    varios = ideo.groupby("party").i.nunique()
    pon("ideologia.partidos_varios", int((varios > 1).sum()), "n", V2,
        "partidos con más de un código de ideology (sin el espacio final); 6 si no se quita", "metodo datos")
    for c in ("D", "CD", "C"):
        pon(f"ideologia.ceda.{c}", int(((d.party == "CEDA") & (d.ideology.str.strip() == c)).sum()), "n", V2,
            f'filas con party = "CEDA" e ideology = "{c}"', G_M)
    pon("ideologia.c_espacio", int((d.ideology == "C ").sum()), "n", V2, 'filas con ideology = "C " (con espacio)', G_D)
    pon("rep836.id", 836, "id", V2, "único rep_id con dos rep_name distintos (Amos Ruiz Lecina · Mariano Ruiz Funes Garcia)", "datos versiones")
    assert d.dropna(subset=["rep_id"]).groupby("rep_id").rep_name.nunique().pipe(lambda x: list(x[x > 1].index)) == [836]

    def fila(i):
        return d.loc[d.id == i].iloc[0]
    for nombre, i in (("presidencia", 5423), ("campoamor", 5424)):
        r = fila(i)
        pon(f"fila.{nombre}.id.V2", i, "id", V2, f"id de la fila ({r.date}, sesión {r.num_session}, {r.speaker})", "metodo datos versiones")
        pon(f"fila.{nombre}.nwords", int(r.nwords), "n", V2, f"nwords de la fila V2 {i}", G_M)
        pon(f"fila.{nombre}.orden.V2", int(r.order), "id", V2, f"order de la fila V2 {i}", "metodo datos")
    assert fila(5423).speech == "Ruego a la Cámara que guarde silencio."
    assert fila(5424).speech.startswith("Yo ruego a la Cámara que me escuche en silencio")
    r976 = fila(976)
    pon("fila.bucle9.id.V2", 976, "id", V2, "fila del bucle de la sesión 9 (1931-07-27)", G_M)
    pon("ocr.bucle9.repeticiones", r976.speech.count("Sánchez Guerra, Ossorio y Gallardo"), "n", V2,
        'apariciones de "Sánchez Guerra, Ossorio y Gallardo" en la fila V2 976', G_M)
    s48 = d[(d.date == "1931-10-01") & (d.num_session == 48)].sort_values("order")
    cola = s48.tail(5)
    assert (cola.speech.str.startswith("Pido la palabra.")).all() and cola.speech.iloc[-1].endswith("El Sr. Ministro de")
    pon("ses.s48.cola", len(cola), "n", V2, "filas finales de la sesión 48 que repiten «Pido la palabra»", G_M)
    pon("ses.s48.cola.V2.desde", int(cola.id.min()), "id", V2, "primera de esas filas en la V2", G_M)
    pon("ses.s48.cola.V2.hasta", int(cola.id.max()), "id", V2, "última de esas filas en la V2", G_M)
    for nombre, i in (("prieto", 55221), ("estatuto", 25979), ("azana1935", 85330)):
        pon(f"fila.{nombre}.id.V2", i, "id", V2, f"id de la fila V2 ({fila(i).date}, {fila(i).speaker})", "metodo datos")
    pon("fila.prieto.nwords", int(fila(55221).nwords), "n", V2, "nwords de la fila V2 55221 (la más larga)", G_M)
    pon("fila.azana1935.nwords", int(fila(85330).nwords), "n", V2, "nwords de la fila V2 85330 (= v3 96282)", G_M)
    r5453 = fila(5453)
    assert "Total, 161." in r5453.speech and "Total, 121." in r5453.speech and r5453.rol == "chair"
    pon("voto.161-121.V2", 5453, "id", V2, "fila de la Presidencia con la lista nominal del 1-X-1931 (compartida con Inicio)", "metodo datos")
    pon("fila.lista.nwords", int(r5453.nwords), "n", V2, "nwords de la fila V2 5453", "metodo datos")
    pon("fila.lista.split", len(r5453.speech.split()), "n", V2, "len(speech.split()) de la fila V2 5453", G_D)
    pon("voto.161-121.si", 161, "n", V2, "«Total, 161.» en el texto de la fila V2 5453 (compartido con Sesiones)", G_M)
    pon("voto.161-121.no", 121, "n", V2, "«Total, 121.» en el texto de la fila V2 5453 (compartido con Sesiones)", G_M)

    mes = d.date.str[:7]
    pon("meses.con_sesion", int(mes.nunique()), "n", V2, "meses AAAA-MM con alguna fila", G_D)
    feb = d[mes == "1933-02"]
    pon("mes.1933-02.sesiones", len(feb[["date", "num_session"]].drop_duplicates()), "n", V2, "sesiones de febrero de 1933", G_D)
    pon("mes.1933-02.filas", len(feb), "n", V2, "filas de febrero de 1933", G_D)
    pon("mes.1933-02.palabras", int(feb.nwords.sum()), "n", V2, "nwords de febrero de 1933", G_D)
    pon("fragmentos.fecha", HOY, "fecha", V2, "fecha de la última ejecución de los dos fragmentos de Datos", G_D)

    # Oradores (F07), en la V2
    def dip(nombre):
        return d.rep_name == nombre
    pon("orador.besteiro.palabras.V2", int(d.loc[dip("Julian Besteiro Fernandez"), "nwords"].sum()), "n", V2,
        "nwords con rep_name = Julian Besteiro Fernandez (Presidencia incluida)", G_V)
    pon("orador.besteiro.presidencia.V2", int(d.loc[dip("Julian Besteiro Fernandez") & P, "nwords"].sum()), "n", V2,
        "las mismas, solo en filas de la Presidencia", G_V)
    pon("orador.alba.palabras.V2", int(d.loc[dip("Santiago Alba Bonifaz"), "nwords"].sum()), "n", V2,
        "nwords con rep_name = Santiago Alba Bonifaz (Presidencia incluida)", G_V)
    sp = d[~P & d.rep_id.notna()].groupby("rep_name").nwords.sum().sort_values(ascending=False)
    assert sp.index[0] == "Indalecio Prieto Tuero"
    pon("orador.prieto.sp.V2", int(sp.iloc[0]), "n", V2, "nwords de Prieto sin filas de la Presidencia (primero de la V2)", G_V)
    pon("diputados.V2", int(d.rep_id.nunique()), "n", V2, "rep_id distintos", G_V)

    # F25: V1 frente a V2
    v1 = pd.read_csv(V1, sep=";", dtype=str, keep_default_na=False)
    v2s = pd.read_csv(comun.V2, sep=";", dtype=str, keep_default_na=False)
    cambios = {c: int((v1[c] != v2s[c]).sum()) for c in v1.columns}
    assert {c for c, n in cambios.items() if n} == {"date", "legislature"}, cambios
    ch = v1[(v1.date != v2s.date) | (v1.legislature != v2s.legislature)]
    pon("fechas.filas", len(ch), "n", V2, "filas con otra date o legislature entre la V1 (MD5 0a9adafe…) y la V2", "metodo datos versiones")
    pon("fechas.sesiones", len(ch[["num_session", "date"]].drop_duplicates()), "n", V2,
        "sesiones con la fecha cambiada entre la V1 y la V2 (= changelog)", "metodo datos versiones")
    pon("fechas.filas.legislatura", cambios["legislature"], "n", V2,
        "filas con otra legislature entre la V1 y la V2 (todas de la sesión 77, 1931-1933 → 1933-1935)", G_V)
    log("F25 · columnas que cambian de la V1 a la V2:", {c: n for c, n in cambios.items() if n})
    log("F25 · id V2 sigue la fecha sin retrocesos:", int((d.sort_values("id").date.values[1:] < d.sort_values("id").date.values[:-1]).sum()) == 0)

    # ── v3 ──────────────────────────────────────────────────────────────────────────────────────────────
    con = sqlite3.connect(f"file:{V3}?mode=ro", uri=True)
    v = pd.read_sql("select id, num_session, ord, date, legislature, speaker, rep_id, rep_name, party_family, nwords, speech from speeches", con)
    papel = {}
    for f in sorted(CLIMA.glob("*.jsonl")):
        for linea in open(f, encoding="utf-8"):
            x = json.loads(linea)
            papel[x["id"]] = (x["role"], x["chair"])
    v["role"] = v.id.map(lambda i: papel[i][0])
    v["chair"] = v.id.map(lambda i: papel[i][1])
    hab = v[~v.role.isin(["summary", "remark"])]
    v3 = "v3"
    pon("filas.v3", len(v), "n", v3, "count(*) de speeches", "metodo versiones")
    pon("habla.v3", len(hab), "n", v3, "filas con papel ∉ {summary, remark} (lo que deja «Solo lo que se habla»)", "metodo versiones")
    pon("v3.comentarios", int((v.role == "remark").sum()), "n", v3, "filas COMENTARIOS (papel remark)", "metodo datos versiones")
    pon("v3.sumarios", int((v.role == "summary").sum()), "n", v3, "filas SUMARIO (papel summary)", G_V)
    pon("palabras.v3", int(v.nwords.sum()), "n", v3, "suma de nwords en la v3", G_D)
    pon("palabras.habla.v3", int(hab.nwords.sum()), "n", v3, "suma de nwords sin SUMARIO ni COMENTARIOS", G_D)
    pon("palabras.sumarios.v3", int(v.loc[v.role == "summary", "nwords"].sum()), "n", v3, "nwords de las filas SUMARIO", G_V)
    con.execute("create virtual table temp.voc using fts5vocab(main, speeches_fts, 'row')")
    pon("palabras.tendencia.v3", int(con.execute("select sum(cnt) from temp.voc").fetchone()[0]), "n", v3,
        "tokens del índice FTS5 (fts5vocab); = meta.expresiones.tokens_corpus, denominador de la Tendencia", G_D)
    pon("longitud.hasta50.pct.v3", float((v.nwords <= 50).mean()), "pct", v3, "filas de la v3 con nwords ≤ 50 / filas de la v3", G_M)
    fam = v.party_family.dropna()
    pon("familias.v3", int(fam[fam != "Sin identificar"].nunique()), "n", v3,
        "valores distintos de party_family normalizada, sin «Sin identificar»", "metodo datos")
    k2 = set(map(tuple, ses.values.tolist()))
    k3 = set(map(tuple, v[["date", "num_session"]].drop_duplicates().values.tolist()))
    assert k2 == k3
    log("sesiones · claves (date, num_session) iguales en V2 y v3:", len(k2), "=", len(k3))

    def fila3(i):
        return v.loc[v.id == i].iloc[0]
    for nombre, i in (("presidencia", 6078), ("campoamor", 6079)):
        pon(f"fila.{nombre}.id.v3", i, "id", v3, f"id v3 de la misma fila ({fila3(i).speaker})", "metodo datos versiones")
        pon(f"fila.{nombre}.orden.v3", int(fila3(i).ord), "id", v3, f"ord de la fila v3 {i}", "metodo datos")
    pon("fila.campoamor.orden.pantalla", int(fila3(6079).ord) + 1, "id", "explorador",
        "«Orden 30 de 415» en el lector del explorador (captura c_lector_campoamor_1440): ord + 1", "metodo datos")
    s48v = v[(v.date == "1931-10-01") & (v.num_session == 48)].sort_values("ord")
    pon("sesion.1931-10-01-48.filas_v3", len(s48v), "n", v3, "filas de la sesión 48 en la v3", G_M)
    colav = s48v.tail(5)
    assert (colav.speech.str.startswith("Pido la palabra.")).all()
    pon("ses.s48.cola.v3.desde", int(colav.id.min()), "id", v3, "primera de las cinco filas finales en la v3", G_M)
    pon("ses.s48.cola.v3.hasta", int(colav.id.max()), "id", v3, "última de las cinco filas finales en la v3", G_M)
    pon("ses.s48.cola.pantalla.desde", int(colav.ord.min()) + 1, "id", "explorador", "orden en pantalla (ord + 1) de la primera", G_M)
    pon("ses.s48.cola.pantalla.hasta", int(colav.ord.max()) + 1, "id", "explorador", "orden en pantalla (ord + 1) de la última", G_M)
    assert fila3(29042).speaker.startswith("El Sr. PRESIDENTE DEL CONSEJO DE MINISTROS (Azaña)")
    pon("fila.estatuto.id.v3", 29042, "id", v3, "turno rescatado de Azaña (27-V-1932) en la v3", G_M)
    pon("fila.estatuto.nwords.v3", int(fila3(29042).nwords), "n", v3, "nwords de la fila v3 29042", G_M)

    # Oradores (F07), en la v3
    def tot3(nombre, solo=None):
        x = v[v.rep_name == nombre]
        return int(x.nwords.sum())
    b2, b3 = M["orador.besteiro.palabras.V2"]["v"], tot3("Julian Besteiro Fernandez")
    a2, a3 = M["orador.alba.palabras.V2"]["v"], tot3("Santiago Alba Bonifaz")
    n2, n3 = int(d.loc[dip("Juan Negrin Lopez"), "nwords"].sum()), tot3("Juan Negrin Lopez")
    pon("orador.besteiro.perdida", 1 - b3 / b2, "pct", v3, f"1 − nwords v3 / nwords V2 de Besteiro ({b3} / {b2})", G_V, dec=1)
    pon("orador.alba.perdida", 1 - a3 / a2, "pct", v3, f"1 − nwords v3 / nwords V2 de Alba ({a3} / {a2})", G_V, dec=1)
    pon("orador.negrin.ganancia", n3 / n2 - 1, "pct", v3, f"nwords v3 / nwords V2 de Negrín − 1 ({n3} / {n2})", G_V, dec=1)
    sp3 = hab[~hab.chair & hab.rep_id.notna()].groupby("rep_name").nwords.sum().sort_values(ascending=False)
    assert sp3.index[0] == "Antonio Royo Villanova Morales"
    pon("orador.royo.sp.v3", int(sp3.iloc[0]), "n", v3, "nwords de Royo Villanova sin Presidencia en la v3 (primero)", G_V)

    # mapa V2 → v3 (F12, F18)
    mp = json.load(open(MAPA, encoding="utf-8"))
    assert mp["destino_sha256"].startswith("e1906abc")
    pz = pd.DataFrame(mp["piezas"])
    rol = d.set_index("id").rol
    pres_roles = {"chair", "vicechair", "chair_age"}
    com = pz[pz.clase == "comentario"]
    tur = pz[pz.clase == "turno"]
    habp = pz[pz.clase == "habla"]
    pon("v3.turnos", len(tur), "n", v3, "piezas de clase turno (mapa_v2_v3.json) = habla.v3 − piezas de habla", "metodo versiones")
    assert len(tur) == M["habla.v3"]["v"] - len(habp)
    pon("v3.piezas_habla", len(habp), "n", v3, "piezas de clase habla (mapa_v2_v3.json)", G_V)
    pon("v3.filas_v2_con_habla", int(habp.id_v2.nunique()), "n", v3, "filas V2 con alguna pieza de habla", G_V)
    pon("v3.filas_v2_solo_comentario", M["filas.V2"]["v"] - int(habp.id_v2.nunique()), "n", v3, "filas V2 sin pieza de habla", G_V)
    pon("v3.piezas_extra", len(habp) - int(habp.id_v2.nunique()), "n", v3, "piezas de habla − filas V2 con habla (continuaciones)", G_V)
    pon("v3.comentarios.en_presidencia", float(com.id_v2.astype(int).map(rol).isin(pres_roles).mean()), "pct", v3,
        "bloques de comentario cuya fila V2 de origen es de la Presidencia", G_M)
    pon("v3.turnos.en_presidencia", float(tur.id_v2.astype(int).map(rol).isin(pres_roles).mean()), "pct", v3,
        "turnos rescatados cuya fila V2 de origen es de la Presidencia", G_M)
    assert len(habp) + len(tur) + len(com) + int((pz.clase == "sumario").sum()) == M["filas.v3"]["v"]
    S2 = d.set_index("id").speech
    S3 = v.set_index("id").speech
    orig = pz[pz.id_v2.notna()]
    iguales = sum(S2[int(r.id_v2)][int(r.inicio_v2):int(r.fin_v2)].strip() == S3[int(r.id_v3)].strip() for r in orig.itertuples())
    log(f"v3 · piezas que son un tramo literal de su fila V2: {iguales} de {len(orig)}")
    assert iguales == len(orig)
    P55 = pz[pz.id_v2 == 55221]
    hab55 = int(v.set_index("id").loc[P55[P55.clase == "habla"].id_v3, "nwords"].sum())
    doc55 = int(v.set_index("id").loc[P55[P55.clase == "comentario"].id_v3, "nwords"].sum())
    pon("fila.prieto.habla", hab55, "n", v3, "nwords de las piezas de habla de V2 55221 (v3 61929 + 61931)", G_M)
    pon("fila.prieto.documentos", doc55, "n", v3, "nwords de las piezas de comentario de V2 55221 (v3 61930 + 61932)", G_M)
    assert hab55 + doc55 == M["fila.prieto.nwords"]["v"]
    log("F12 ·", {r.id_v2: r.id_v3 for r in pz[pz.id_v2.isin([55221, 25979, 85330])].itertuples()})

    # ── proyecto ────────────────────────────────────────────────────────────────────────────────────────
    sj = json.load(open(SESIONES, encoding="utf-8"))["sessions"]
    PR = "proyecto"
    pon("paginas.total", sum(x["pdf_pages"] for x in sj), "n", PR, "suma de pdf_pages (sessions.json); = total_pages de TXT_OCR/*.meta.json", "metodo")
    pon("ocr.fallidas.paginas", sum(len(x["ocr"]["failed_pages"]) for x in sj), "n", PR, "suma de ocr.failed_pages (sessions.json)", G_M)
    pon("ocr.fallidas.sesiones", sum(1 for x in sj if x["ocr"]["failed_pages"]), "n", PR, "sesiones con ocr.failed_pages", G_M)
    pon("ocr.bucles.paginas", sum(len(x["ocr"]["loop_pages"]) for x in sj), "n", PR, "suma de ocr.loop_pages (páginas releídas por bucle)", G_M)
    pon("ocr.incidencias", sum(len(x["incidents"]) for x in sj), "n", PR, "incidencias declaradas en sessions.json (ocr_loop · truncated_end)", G_M)
    rep = [json.load(open(f)) for f in glob.glob(str(BASE / "TXT_OCR_REPAIRED" / "*.meta.json"))]
    tes = [json.load(open(f)) for f in glob.glob(str(BASE / "TXT_OCR_TESSERACT" / "*.meta.json"))]
    modelos = {p.get("model") for m in rep for p in m["repaired_pages"]}
    pon("ocr.recuperadas", sum(len(m["repaired_pages"]) for m in rep), "n", PR,
        f"páginas en repaired_pages (TXT_OCR_REPAIRED/*.meta.json); modelo: {sorted(modelos)}", G_M)
    pon("ocr.tesseract.paginas", sum(len(m["tesseract_pages"]) for m in tes), "n", PR, "páginas en tesseract_pages (TXT_OCR_TESSERACT/*.meta.json)", G_M)
    pon("ocr.tesseract.sesiones", sum(1 for m in tes if m["tesseract_pages"]), "n", PR, "archivos con tesseract_pages", G_M)
    assert sum(len(m["tesseract_still_failed"]) for m in tes) == 0
    assert all(p["llm_corrected"] is False for m in tes for p in m["tesseract_pages"])
    assert M["ocr.recuperadas"]["v"] + M["ocr.tesseract.paginas"]["v"] == M["ocr.fallidas.paginas"]["v"]
    log("OCR · modelos que recuperaron páginas:", modelos, "· Tesseract sin corrección posterior: sí · páginas sin texto: 0")
    tab = pd.read_csv(DIPUTADOS, sep=";")
    ids = set(d.rep_id.dropna().astype(int))
    x = tab[tab.id_dip.isin(ids)].drop_duplicates("id_dip").copy()
    x["a1"] = x.apellidos.astype(str).str.split().str[0]
    vc = x.a1.value_counts()
    pon("diputados.comparten_apellido", int(vc[vc > 1].sum()), "n", PR,
        f"diputados que intervienen (rep_id de la V2) cuyo primer apellido (diputados_21_06_encode.csv) comparte otro; {len(vc)} apellidos distintos entre {len(x)}",
        G_M)
    pon("etiquetas.n", 107556, "n", V2, "README depositado, SECTION 4 («107,556 tags retained»)", G_M)
    pon("etiquetas.falsos_positivos", 1532, "n", V2, "README depositado, SECTION 4 («filtering 1,532 false positives»)", G_M)
    pon("etiquetas.diferencia", 107556 - len(d), "n", V2, "etiquetas.n − filas.V2 (sin documentar)", "metodo versiones")
    pon("etiquetas.filtro.letras", 3, "n", V2, "README SECTION 4 («3-character all-capitals word»); tag_speakers.py [A-ZÁÉÍÓÚÜÑ]{3,}", G_M)
    pon("vinculo.corregidas", 367, "n", V2, "README depositado, SECTION 4 («367 assignments were corrected»)", G_M)
    pon("vinculo.umbral", 0.82, "ratio", V2, "README SECTION 4 (0.82); link_deputies.py, difflib.get_close_matches cutoff 0.82", G_M, dec=2)
    readme = (BASE / "Luz_y_Taquigrafos_README.txt").read_text(encoding="utf-8")
    for frag in ("107,556 tags retained", "filtering 1,532", "367 assignments were corrected", "Jaro-Winkler >= 0.82", "3-character"):
        assert frag in readme, frag
    log("README · las cinco frases citadas están en el README depositado")

    # ── afin (unión, F34) ───────────────────────────────────────────────────────────────────────────────
    a = pd.read_csv(AFIN)
    AF = "afin"
    d["leg_afin"] = d.legislature.replace({"1933-1935": "1933-1936"})
    pares = d.dropna(subset=["rep_id"])[["rep_id", "leg_afin"]].drop_duplicates().astype({"rep_id": int})
    m = pares.merge(a, left_on=["rep_id", "leg_afin"], right_on=["id_dip", "legislatura"], how="left", indicator=True)
    sin = m[m._merge == "left_only"][["rep_id", "leg_afin"]]
    dd = d.dropna(subset=["rep_id"]).astype({"rep_id": int})
    pon("union.pares", len(pares), "n", AF, "pares (rep_id, legislatura recodificada) de la V2", G_D)
    pon("union.pares.casan", int((m._merge == "both").sum()), "n", AF, "pares con ficha en representative_metadata (CGOCUS V1.1)", G_D)
    pon("union.pares.sin_ficha", len(sin), "n", AF, "pares sin ficha", G_D)
    pon("union.filas.sin_ficha", len(dd.merge(sin, on=["rep_id", "leg_afin"])), "n", AF, "filas V2 de esos pares", G_D)
    pon("union.solo_id.filas", len(d.merge(a, left_on="rep_id", right_on="id_dip", how="left")), "n", AF,
        "filas tras unir solo por rep_id = id_dip (left join)", G_D)
    pm = dd.groupby(["rep_id", "leg_afin"]).party.agg(lambda s: s.mode().iloc[0]).reset_index().merge(
        a, left_on=["rep_id", "leg_afin"], right_on=["id_dip", "legislatura"])
    pon("union.pares.otro_partido", int((pm.party != pm.partido).sum()), "n", AF,
        "pares cuyo party (moda en la V2) ≠ partido en CGOCUS", G_D)
    log("F34 · pares sin ficha:", sin.values.tolist())

    # ── dv y explorador (instantánea del exportador) ────────────────────────────────────────────────────
    inst = sorted((SITIO / "exportador" / "instantaneas").glob("*"))[-1]
    dvj = json.load(open(inst / "dv_thqcmi.json"))
    lv = dvj["cuerpo"]["data"]["latestVersion"] if "cuerpo" in dvj else dvj["data"]["latestVersion"]
    csvf = [f for f in lv["files"] if f["label"] == "2REP_Diaries.csv"][0]["dataFile"]
    assert csvf["md5"] == comun.MD5_V2
    pon("dv.csv.bytes", int(csvf["filesize"]), "peso", "dv", f"filesize de 2REP_Diaries.csv (API de Dataverse, {inst.name})", "datos")
    pon("dv.version", f"V{lv['versionNumber']}.{lv['versionMinorNumber']}", "texto", "dv", "versionNumber.versionMinorNumber", "datos versiones")
    vers = json.load(open(inst / "dv_thqcmi_versiones.json"))
    lista = vers["cuerpo"]["data"] if "cuerpo" in vers else vers["data"]
    pon("dv.thqcmi.versiones", len([x for x in lista if x.get("versionState") == "RELEASED"]), "n", "dv", "versiones publicadas de THQCMI", G_V)
    ex = json.load(open(inst / "explorador.json"))
    pon("explorador.gz.bytes", int(ex["corpus_servido"]["bytes_gz"]), "peso", "explorador",
        "manifiesto del corpus servido: suma de los tres trozos corpus.sqlite.gz (HEAD: 45.000.000 + 45.000.000 + 21.733.652). "
        "El copy lo imprime en unidad decimal, formato `peso_dec0`: «unos 112 MB comprimidos» (plan D-26 (a))", G_D)
    assert ex["corpus_servido"]["sha256"].startswith("3a0d8b2d")

    # ── salida ──────────────────────────────────────────────────────────────────────────────────────────
    (AQUI / "marcadores_metodo_datos.json").write_text(json.dumps(M, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    for grupo, titulo, modulo in (("metodo", "Método", "metodo.py"), ("datos", "Usar los datos", "datos.py"),
                                  ("versiones", "Versiones", "datos.py")):
        filas = [(k, c) for k, c in sorted(M.items()) if grupo in c["grupos"].split()]
        out = [f"# Marcadores del copy · {titulo} (`docs/copy_es/{grupo}.md`)", "",
               f"**Generado el {HOY}** por `docs/marcadores/comprobar_metodo_datos.py`, que lee las fuentes y comprueba sus huellas.",
               f"No se edita a mano. Lo implementa `exportador/modulos/{modulo}`; la compilación falla si su valor no es el esperado.",
               "`valor esperado` es el valor tal como lo pinta `cifras.ts` en español; `v` es lo que va en `src/data/cifras.json`",
               "(los `pct` se guardan como proporción). Las claves compartidas con otros grupos van marcadas «compartida».", "",
               "| clave | valor esperado | `v` · `t` | base | cómo se calcula |", "|---|---:|---|---|---|"]
        for k, c in filas:
            comp = " · compartida" if len(c["grupos"].split()) > 1 or k in COMPARTIDAS else ""
            vv = f"{c['v']:.6f}" if isinstance(c["v"], float) else c["v"]
            if k == "fragmentos.fecha":  # la fija cada exportación, que vuelve a ejecutar los fragmentos (exportador/modulos/datos.py)
                c, vv = {**c, "v": "(la de la exportación)"}, "AAAA-MM-DD"
            out.append(f"| `{k}` | {muestra(c)} | {vv} · {c['t']}{' · dec ' + str(c['dec']) if 'dec' in c else ''} | {c['base']} | {c['f']}{comp} |")
        out += ["", "El motivo del formulario (D-20) ya no es un marcador: es texto del copy (`comun.fija.formulario.motivo`)."
                if grupo == "datos" else ""]
        if grupo == "metodo":
            out += ["## Lista blanca de `check-i18n` para Método", "",
                    "Cadenas con dígitos que no son cifras del corpus (las lee `scripts/vetos.mjs › literalesBlancos`).", ""]
            out += [f"- «{lit}»: {por}" for lit, por in LISTA_BLANCA_METODO]
        (AQUI / f"{grupo}.md").write_text("\n".join(out).rstrip() + "\n", encoding="utf-8")
    log(f"{len(M)} marcadores escritos en docs/marcadores/ · {HOY}")
    (AQUI / "comprobaciones_metodo_datos.txt").write_text(
        f"# comprobar_metodo_datos.py · {dt.datetime.now().isoformat(timespec='seconds')} · pandas {pd.__version__}\n"
        + "\n".join(LOG) + "\n\n" + "\n".join(f"{k} = {muestra(c)}  [{c['base']}]" for k, c in sorted(M.items())) + "\n",
        encoding="utf-8")


if __name__ == "__main__":
    main()
