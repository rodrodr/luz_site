"""datos · Usar los datos y Versiones (dueño: datos, grupo 5).

PROYECTA, NO INVENTA: cada cifra sale de la V2 depositada, de la v3 servida, de la correspondencia V2 → v3, de CGOCUS
V1.1 o de la instantánea de Dataverse, con la huella que `exportar.py` ya comprobó. La referencia de cada marcador es
`docs/marcadores/comprobar_metodo_datos.py`; aquí se recalcula con las utilidades de `ctx` (mismo analizador de
fórmulas del explorador, mismas huellas) y `exportar.py` compara cada valor con el esperado de `docs/marcadores/`.

Figuras y archivos (nombres de `src/lib/figuras.ts`):
  F32  columnas.json · datos/columnas.csv|xlsx          las 14 columnas: tipo, vacíos, distintos y valor en V2 5423 y 5424
  F33  palabras.json · datos/palabras.csv|xlsx          cinco maneras de contar «palabra» (V2 y v3)
  F34  union.json · datos/union.csv|xlsx                la unión con CGOCUS V1.1: pasos, 13 pares sin ficha, otro partido
  F25  fechas_corregidas.json · datos/fechas_corregidas.csv|xlsx   las siete sesiones que cambiaron de fecha
  F18  destino_filas.json · datos/destino_filas.csv|xlsx           las 121.700 filas de la v3, por clase
  F07  quien_habla.json · datos/quien_habla.csv|xlsx    diez oradores en orden fijo por la V2; el CSV trae los 773
       depositos.json                                   versiones depositadas de THQCMI y archivos de la vigente
  Fragmentos  fragmentos.json · datos/fragmentos_salida.txt: los dos bloques de `docs/copy_es/datos.md` (claves
       `datos.codigo.r` y `datos.codigo.python`) se EJECUTAN aquí, en R y en Python, junto al CSV depositado y a
       `representative_metadata.tab` reconstruido como lo sirve Dataverse. La exportación FALLA si R y Python no dan
       los mismos números o si su salida no reproduce las cifras de esta exportación.

Claves compartidas: muchas cifras de Datos también las declaran Método, Inicio o Sesiones (mismo nombre, mismo valor).
Los módulos que corren antes (base, cortes, sesiones, diario, metodo) pueden haberlas dado ya: aquí se comprueba que
su valor es el mismo y no se repiten (una clave repetida entre módulos tumba la exportación).
"""
from __future__ import annotations

import datetime as dt
import hashlib
import inspect
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import pandas as pd

from comun import (CACHE_EXP, COLUMNAS_V2, DOCS, ERRATAS_FECHAS, LEGISLATURAS, MD5_V2, N_FILAS_V2, N_FILAS_V3, V2_CSV,
                   exige, huella, leer_json)

COPY_DATOS = DOCS / "copy_es" / "datos.md"
V1_CSV = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/copia_2REP_Diaries_V1_dataverse_2026-09-15/2REP_Diaries.csv")
MD5_V1 = "0a9adafefd12a21691f4a44b2e75beac"
TAB_BYTES = 156_736                     # representative_metadata.tab tal como lo sirve Dataverse
EXCEL_MAX = 32_767                      # máximo de caracteres de una celda de Excel
FILAS_EJEMPLO = (5423, 5424)            # la Presidencia pide silencio; Campoamor empieza a hablar (1-X-1931, sesión 48)
FILAS_EJEMPLO_V3 = (6078, 6079)
# F07: los diez primeros por palabras en la V2, en este orden (el copy los nombra; si cambian, falla).
DIEZ_V2 = ["Julian Besteiro Fernandez", "Santiago Alba Bonifaz", "Indalecio Prieto Tuero", "Antonio Royo Villanova Morales",
           "Manuel Azaña Diaz", "Rafael Guerra Del Rio", "Jose Antonio Balbontin Y Gutierrez", "Jose Maria Lamamie De Clairac Y De La Colina",
           "Candido Casanueva Y Gorjon", "Manuel Jimenez Fernandez"]
# F25: la prueba de cada sesión, según 2REP_Base/Dataverse_V2_2026-09-15/AUDITORIA_FECHAS.md (clave: legislatura V2 y número).
PRUEBAS_F25 = {("1931-1933", 52): ["cabeceras", "danada"], ("1931-1933", 78): ["cabeceras", "danada"],
               ("1931-1933", 293): ["cabeceras", "errata"], ("1931-1933", 295): ["cabeceras", "errata"],
               ("1931-1933", 311): ["cabeceras", "errata"], ("1931-1933", 321): ["cabeceras", "portada"],
               ("1933-1935", 77): ["cabeceras", "serie"]}
TIPO_COLUMNA = {"id": "entero", "num_session": "entero", "order": "entero", "date": "fecha", "speaker": "texto",
                "speech": "texto", "rep_id": "entero", "rep_name": "texto", "district": "texto", "party": "texto",
                "party_family": "texto", "ideology": "texto", "nwords": "entero", "legislature": "texto"}


def _dadas(ctx=None) -> dict:
    """Las cifras que ya han dado los módulos anteriores (el acumulador `C` de `exportar.main`)."""
    if ctx is not None and getattr(ctx, "dadas", None):
        return dict(ctx.dadas)
    for fr in inspect.stack()[1:]:
        c = fr.frame.f_locals.get("C")
        if isinstance(c, dict) and fr.frame.f_locals.get("origen") is not None:
            return c
    return {}


def _bloque(md: str, clave: str) -> tuple[str, str]:
    m = re.search(r"<!-- " + re.escape(clave) + r" -->\s*```(\w+)\n(.*?)\n```", md, flags=re.S)
    exige(m is not None, f"no encuentro el bloque de código de «{clave}» en {COPY_DATOS.name}")
    return m.group(1), m.group(2) + "\n"


def _tab_dataverse(a: pd.DataFrame, destino: Path) -> None:
    """La regla de ingesta de Dataverse: tabuladores, cabecera sin comillas, texto entre comillas dobles, números sin ellas."""
    with open(destino, "w", encoding="utf-8", newline="") as f:
        f.write("\t".join(a.columns) + "\n")
        for fila in a.itertuples(index=False):
            celdas = []
            for v in fila:
                if pd.isna(v):
                    celdas.append("")
                elif isinstance(v, str):
                    celdas.append('"' + v.replace('"', '""') + '"')
                else:
                    celdas.append(str(v))
            f.write("\t".join(celdas) + "\n")
    exige(destino.stat().st_size == TAB_BYTES, f"representative_metadata.tab reconstruido mide {destino.stat().st_size} B, no {TAB_BYTES}")


def exportar(ctx) -> dict:
    dadas = _dadas(ctx)
    C: dict[str, dict] = {}
    valores: dict[str, object] = {}

    def pon(k: str, v, t: str, base: str, f: str, clave: str = "C", **extra) -> None:
        """Da la cifra, salvo que un módulo anterior ya la haya dado: entonces solo comprueba que dice lo mismo."""
        if hasattr(v, "item"):
            v = v.item()
        valores[k] = v
        if k in dadas:
            previo = dadas[k]["v"]
            igual = abs(previo - v) < 1e-9 if isinstance(v, float) and isinstance(previo, (int, float)) else previo == v
            exige(igual, f"la cifra compartida {k} vale {previo!r} en otro módulo y {v!r} aquí")
            exige(dadas[k]["base"] == base, f"la cifra compartida {k} tiene base {dadas[k]['base']} en otro módulo y {base} aquí")
            return
        C[k] = ctx.cifra(v, t, base, f, clave, **extra)

    def dado(k: str):
        """Una cifra que tiene que existir ya (de base.py o de este módulo)."""
        if k in valores:
            return valores[k]
        exige(k in dadas, f"falta la cifra {k} (debería darla base.py)")
        return dadas[k]["v"]

    grafias = leer_json(ctx.data / "grafias.json")["grafias"] if (ctx.data / "grafias.json").exists() else {}

    def nombre(rep_id, crudo: str | None = None) -> str:
        g = grafias.get(str(int(rep_id))) if rep_id is not None and not pd.isna(rep_id) else None
        return (g or {}).get("uso") or (g or {}).get("grafia") or (crudo or "")

    # ── V2 ──────────────────────────────────────────────────────────────────────────────────────────────────────
    d = ctx.v2()
    texto = ctx.v2_texto()
    exige(len(d) == N_FILAS_V2, "V2 incompleta")
    P = d["presidencia"]
    ses = d[["date", "num_session"]].drop_duplicates()
    pon("filas.V2", len(d), "n", "V2", "recuento de filas del CSV depositado")
    pon("columnas.V2", len(COLUMNAS_V2), "n", "V2", "columnas del CSV depositado")
    pon("sesiones", len(ses), "n", "V2", "claves distintas (date, num_session)")
    pon("sesiones.num1", int((ses.num_session == 1).sum()), "n", "V2", "claves con num_session = 1")
    pon("sesiones.fechas_dobles", int((ses.date.value_counts() > 1).sum()), "n", "V2", "fechas con dos claves de sesión")
    pon("palabras.V2", int(d.nwords.sum()), "n", "V2", "suma de nwords")
    pon("filas.sin_diputado", int(d.rep_id.isna().sum()), "n", "V2", "filas sin rep_id")
    pon("diputados.V2", int(d.rep_id.nunique()), "n", "V2", "rep_id distintos")
    pon("presidencia.filas", int(P.sum()), "n", "V2", "filas con rol chair, vicechair o chair_age (parse_speaker del explorador)")
    pon("presidencia.filas.pct", float(P.mean()), "pct", "V2", "filas de la Presidencia / filas", "CALC")
    pon("presidencia.palabras.pct", float(d.loc[P, "nwords"].sum() / d.nwords.sum()), "pct", "V2", "nwords de la Presidencia / nwords", "CALC")
    aprox = d.speaker.str.contains("PRESIDENTE") & ~d.speaker.str.contains("CONSEJO|GOBIERNO|REPÚBLICA")
    pon("presidencia.aprox.filas", int(aprox.sum()), "n", "V2",
        'la línea de datos.decisiones.1.codigo: speaker contiene "PRESIDENTE" y no "CONSEJO|GOBIERNO|REPÚBLICA"')

    s = d.nwords
    pon("longitud.umbral", 50, "n", "V2", "umbral de fila breve del sitio (límite del tramo 21–50 de F10)", "R")
    pon("longitud.umbral300", 300, "n", "V2", "umbral de fila larga (límite del tramo 101–300 de F10)", "R")
    pon("longitud.hasta50.pct", float((s <= 50).mean()), "pct", "V2", "filas con nwords ≤ 50 / filas", "CALC")
    pon("longitud.mas300", int((s > 300).sum()), "n", "V2", "filas con nwords > 300")
    pon("longitud.mas300.palabras.pct", float(s[s > 300].sum() / s.sum()), "pct", "V2", "nwords de las filas > 300 / nwords", "CALC")

    tot = int(s.sum())
    por_leg = []
    for lg in LEGISLATURAS:
        g = d[d.legislature == lg]
        ns = len(g[["date", "num_session"]].drop_duplicates())
        pon(f"leg.{lg}.sesiones", ns, "n", "V2", f"claves (date, num_session) de {lg}")
        pon(f"leg.{lg}.filas", len(g), "n", "V2", f"filas de {lg}")
        pon(f"leg.{lg}.palabras", int(g.nwords.sum()), "n", "V2", f"nwords de {lg}")
        pon(f"leg.{lg}.palabras_por_sesion", int(round(g.nwords.sum() / ns)), "n", "V2", f"nwords de {lg} / sus sesiones, redondeado a la unidad", "CALC")
        por_leg.append({"legislatura": lg, "sesiones": ns, "filas": len(g), "palabras": int(g.nwords.sum())})
    pon("leg.1931-1933.palabras.pct", float(d.loc[d.legislature == "1931-1933", "nwords"].sum() / tot), "pct", "V2", "nwords de 1931-1933 / nwords", "CALC")

    L = texto.str.len()
    pon("csv.celdas_largas", int((L > EXCEL_MAX).sum()), "n", "V2", "filas con len(speech) > 32.767 (máximo de una celda de Excel)")
    pon("csv.fila_mas_larga.caracteres", int(L.max()), "n", "V2", f"len(speech) máximo (fila {int(L.idxmax())})")
    exige(int(L.idxmax()) == 55221, "la fila más larga de la V2 ya no es la 55221")

    pon("distritos.V2", int(d.district.nunique()), "n", "V2", "valores distintos de district")
    pon("distritos.agrarios.filas", int((d.district == "Agrarios").sum()), "n", "V2", 'filas con district = "Agrarios"')
    pon("familias.V2", int(d.party_family.nunique()), "n", "V2", "valores distintos de party_family, en bruto")
    pon("familias.vacias", int(d.party_family.isna().sum()), "n", "V2", "filas con party_family vacía")
    varios = d.dropna(subset=["party"]).assign(i=lambda x: x.ideology.str.strip()).groupby("party").i.nunique()
    pon("ideologia.partidos_varios", int((varios > 1).sum()), "n", "V2", "partidos con más de un código de ideology (sin el espacio final); 6 si no se quita")
    pon("ideologia.c_espacio", int((d.ideology == "C ").sum()), "n", "V2", 'filas con ideology = "C " (con espacio)')
    dobles = d.dropna(subset=["rep_id"]).groupby("rep_id").rep_name.nunique()
    exige(list(dobles[dobles > 1].index) == [836], f"rep_id con dos nombres: {list(dobles[dobles > 1].index)} (se esperaba solo 836)")
    pon("rep836.id", 836, "id", "V2", "único rep_id con dos rep_name distintos (Amos Ruiz Lecina · Mariano Ruiz Funes Garcia)", "L")

    def fila(i: int) -> pd.Series:
        r = d.iloc[int(i) - 1]
        exige(int(r.id) == int(i), f"fila V2 {i} fuera de sitio")
        return r
    exige(texto[5423] == "Ruego a la Cámara que guarde silencio.", "la fila V2 5423 ya no dice «Ruego a la Cámara que guarde silencio.»")
    exige(texto[5424].startswith("Yo ruego a la Cámara que me escuche en silencio"), "la fila V2 5424 ya no empieza por «Yo ruego a la Cámara…»")
    for nom, i in (("presidencia", 5423), ("campoamor", 5424)):
        r = fila(i)
        pon(f"fila.{nom}.id.V2", i, "id", "V2", f"id de la fila ({r.date}, sesión {r.num_session}, {r.speaker})", "L")
        pon(f"fila.{nom}.orden.V2", int(r.order), "id", "V2", f"order de la fila V2 {i}", "L")
    for nom, i in (("prieto", 55221), ("estatuto", 25979), ("azana1935", 85330)):
        pon(f"fila.{nom}.id.V2", i, "id", "V2", f"id de la fila V2 ({fila(i).date}, {fila(i).speaker})", "L")
    t5453 = texto[5453]
    exige("Total, 161." in t5453 and "Total, 121." in t5453 and fila(5453).rol == "chair", "la fila V2 5453 ya no es la lista nominal 161–121 de la Presidencia")
    pon("voto.161-121.V2", 5453, "id", "V2", "fila de la Presidencia con la lista nominal del 1-X-1931 (compartida con Inicio)", "L")
    pon("fila.lista.nwords", int(fila(5453).nwords), "n", "V2", "nwords de la fila V2 5453")
    pon("fila.lista.split", len(t5453.split()), "n", "V2", "len(speech.split()) de la fila V2 5453")
    split_total = int(texto.str.split().str.len().sum())
    pon("palabras.split.V2", split_total, "n", "V2", "suma de len(speech.split()) (separa por cualquier espacio en blanco)")
    pon("meses.con_sesion", int(d.mes.nunique()), "n", "V2", "meses AAAA-MM con alguna fila")

    # ── v3 ──────────────────────────────────────────────────────────────────────────────────────────────────────
    v = ctx.v3()
    exige(len(v) == N_FILAS_V3, "v3 incompleta")
    hab = v[v.habla]
    pon("filas.v3", len(v), "n", "v3", "count(*) de speeches")
    pon("habla.v3", len(hab), "n", "v3", "filas con papel ∉ {summary, remark} (lo que deja «Solo lo que se habla»)")
    pon("v3.comentarios", int((v.role == "remark").sum()), "n", "v3", "filas COMENTARIOS (papel remark)")
    pon("v3.sumarios", int((v.role == "summary").sum()), "n", "v3", "filas SUMARIO (papel summary)")
    pon("palabras.v3", int(v.nwords.sum()), "n", "v3", "suma de nwords en la v3")
    pon("palabras.habla.v3", int(hab.nwords.sum()), "n", "v3", "suma de nwords sin SUMARIO ni COMENTARIOS")
    pon("palabras.sumarios.v3", int(v.loc[v.role == "summary", "nwords"].sum()), "n", "v3", "nwords de las filas SUMARIO")
    con = ctx.v3_db()
    con.execute("create virtual table if not exists temp.voc_datos using fts5vocab(main, speeches_fts, 'row')")
    tokens = int(con.execute("select sum(cnt) from temp.voc_datos").fetchone()[0])
    pon("palabras.tendencia.v3", tokens, "n", "v3", "tokens del índice FTS5 (fts5vocab); denominador de la Tendencia del explorador")
    fam = v.party_family.dropna()
    pon("familias.v3", int(fam[fam != "Sin identificar"].nunique()), "n", "v3", "valores distintos de party_family normalizada, sin «Sin identificar»")
    v3i = v.set_index("id")
    for nom, i2, i3 in (("presidencia", 5423, 6078), ("campoamor", 5424, 6079)):
        exige(v3i.loc[i3, "speaker"] == fila(i2).speaker and v3i.loc[i3, "date"] == fila(i2).date, f"la fila v3 {i3} no es la V2 {i2}")
        pon(f"fila.{nom}.id.v3", i3, "id", "v3", f"id v3 de la misma fila ({v3i.loc[i3, 'speaker']})", "L")
        pon(f"fila.{nom}.orden.v3", int(v3i.loc[i3, "ord"]), "id", "v3", f"ord de la fila v3 {i3}", "L")
    pon("fila.campoamor.orden.pantalla", int(v3i.loc[6079, "ord"]) + 1, "id", "explorador",
        "«Orden 30 de 415» en el lector del explorador: ord + 1", "L")
    exige(set(map(tuple, ses.values.tolist())) == set(map(tuple, v[["date", "num_session"]].drop_duplicates().values.tolist())),
          "las claves de sesión (date, num_session) no son las mismas en la V2 y en la v3")

    # ── correspondencia V2 → v3 (F18) ──────────────────────────────────────────────────────────────────────────
    pz = ctx.mapa_v2_v3()
    clases = pz.clase.value_counts().to_dict()
    habp = pz[pz.clase == "habla"]
    n_habla, n_turno, n_com, n_sum = (int(clases.get(k, 0)) for k in ("habla", "turno", "comentario", "sumario"))
    exige(n_habla + n_turno + n_com + n_sum == N_FILAS_V3, f"F18: {n_habla} + {n_turno} + {n_com} + {n_sum} ≠ {N_FILAS_V3}")
    exige(n_habla + n_turno == len(hab), f"F18: piezas de habla + turnos ({n_habla + n_turno}) ≠ filas de habla de la v3 ({len(hab)})")
    exige(n_com == int((v.role == "remark").sum()) and n_sum == int((v.role == "summary").sum()), "F18: la correspondencia y la v3 no cuentan igual los comentarios o los sumarios")
    con_habla = int(habp.id_v2.nunique())
    pon("v3.piezas_habla", n_habla, "n", "v3", "piezas de clase habla (mapa_v2_v3.json)")
    pon("v3.turnos", n_turno, "n", "v3", "piezas de clase turno (mapa_v2_v3.json) = habla.v3 − piezas de habla")
    pon("v3.filas_v2_con_habla", con_habla, "n", "v3", "filas V2 con alguna pieza de habla")
    pon("v3.filas_v2_solo_comentario", N_FILAS_V2 - con_habla, "n", "v3", "filas V2 sin pieza de habla", "CALC")
    pon("v3.piezas_extra", n_habla - con_habla, "n", "v3", "piezas de habla − filas V2 con habla (continuaciones)", "CALC")
    destino = [
        {"clase": "habla", "filas": n_habla, "palabras": int(v3i.loc[habp.id_v3, "nwords"].sum())},
        {"clase": "turnos", "filas": n_turno, "palabras": int(v3i.loc[pz[pz.clase == "turno"].id_v3, "nwords"].sum())},
        {"clase": "comentarios", "filas": n_com, "palabras": int(v3i.loc[pz[pz.clase == "comentario"].id_v3, "nwords"].sum())},
        {"clase": "sumarios", "filas": n_sum, "palabras": int(v3i.loc[pz[pz.clase == "sumario"].id_v3, "nwords"].sum())},
    ]
    exige(sum(x["palabras"] for x in destino) == int(v.nwords.sum()), "F18: las palabras por clase no suman las de la v3")
    ctx.escribir_json("destino_filas.json", {
        "_meta": {"fig": "F18", "base": "v3", "fuente": "mapa_v2_v3.json (correspondencia local, sin publicar) y corpus.sqlite servido",
                  "v3_sha256": ctx.huellas["v3_sha256"], "d": ctx.hoy},
        "clases": destino, "total": N_FILAS_V3, "filas_v2": N_FILAS_V2, "filas_v2_con_habla": con_habla,
        "filas_v2_solo_comentario": N_FILAS_V2 - con_habla, "piezas_extra": n_habla - con_habla, "habla_v3": len(hab)})
    ctx.escribir_datos("destino_filas", ["clase", "filas_v3", "palabras_v3", "base"],
                       [[x["clase"], x["filas"], x["palabras"], "v3"] for x in destino] + [["total", N_FILAS_V3, int(v.nwords.sum()), "v3"]])

    # ── F07 · quién habla más, en cada edición ──────────────────────────────────────────────────────────────────
    dd = d[d.rep_id.notna()]
    g2 = dd.groupby("rep_id").agg(filas_v2=("nwords", "size"), palabras_v2=("nwords", "sum"), rep_name=("rep_name", "first"))
    g2p = dd[dd.presidencia].groupby("rep_id").agg(filas_v2_pres=("nwords", "size"), palabras_v2_pres=("nwords", "sum"))
    vv = v[v.rep_id.notna()]
    g3 = vv.groupby("rep_id").agg(filas_v3=("nwords", "size"), palabras_v3=("nwords", "sum"))
    o = g2.join(g2p).join(g3).fillna(0).astype({"filas_v2_pres": int, "palabras_v2_pres": int, "filas_v3": int, "palabras_v3": int})
    o = o.sort_values("palabras_v2", ascending=False)
    exige(len(o) == dado("diputados.V2"), "F07: no están los 773 diputados")
    exige(list(o.rep_name.head(10)) == DIEZ_V2, f"F07: los diez primeros de la V2 han cambiado: {list(o.rep_name.head(10))}")

    def por_nombre(n: str) -> pd.Series:
        x = o[o.rep_name == n]
        exige(len(x) == 1, f"F07: {n} no es un solo rep_id")
        return x.iloc[0]
    b, a, ng = por_nombre("Julian Besteiro Fernandez"), por_nombre("Santiago Alba Bonifaz"), por_nombre("Juan Negrin Lopez")
    pon("orador.besteiro.palabras.V2", int(b.palabras_v2), "n", "V2", "nwords con rep_name = Julian Besteiro Fernandez (Presidencia incluida)")
    pon("orador.besteiro.presidencia.V2", int(b.palabras_v2_pres), "n", "V2", "las mismas, solo en filas de la Presidencia")
    pon("orador.alba.palabras.V2", int(a.palabras_v2), "n", "V2", "nwords con rep_name = Santiago Alba Bonifaz (Presidencia incluida)")
    pon("orador.besteiro.perdida", 1 - b.palabras_v3 / b.palabras_v2, "pct", "v3", f"1 − nwords v3 / nwords V2 de Besteiro ({int(b.palabras_v3)} / {int(b.palabras_v2)})", "CALC", dec=1)
    pon("orador.alba.perdida", 1 - a.palabras_v3 / a.palabras_v2, "pct", "v3", f"1 − nwords v3 / nwords V2 de Alba ({int(a.palabras_v3)} / {int(a.palabras_v2)})", "CALC", dec=1)
    pon("orador.negrin.ganancia", ng.palabras_v3 / ng.palabras_v2 - 1, "pct", "v3", f"nwords v3 / nwords V2 de Negrín − 1 ({int(ng.palabras_v3)} / {int(ng.palabras_v2)})", "CALC", dec=1)
    sp2 = dd[~dd.presidencia].groupby("rep_name").nwords.sum().sort_values(ascending=False)
    exige(sp2.index[0] == "Indalecio Prieto Tuero", "F07: sin la Presidencia, Prieto ya no encabeza la V2")
    pon("orador.prieto.sp.V2", int(sp2.iloc[0]), "n", "V2", "nwords de Prieto sin filas de la Presidencia (primero de la V2)")
    sp3 = hab[~hab.chair & hab.rep_id.notna()].groupby("rep_name").nwords.sum().sort_values(ascending=False)
    exige(sp3.index[0] == "Antonio Royo Villanova Morales", "F07: sin la Presidencia, Royo Villanova ya no encabeza la v3")
    pon("orador.royo.sp.v3", int(sp3.iloc[0]), "n", "v3", "nwords de Royo Villanova sin Presidencia en la v3 (primero)")

    def reg(rid, r) -> dict:
        return {"rep_id": int(rid), "nombre": nombre(rid, r.rep_name), "filas_v2": int(r.filas_v2), "palabras_v2": int(r.palabras_v2),
                "filas_v2_pres": int(r.filas_v2_pres), "palabras_v2_pres": int(r.palabras_v2_pres),
                "filas_v3": int(r.filas_v3), "palabras_v3": int(r.palabras_v3)}
    diez = [reg(rid, r) for rid, r in o.head(10).iterrows()]
    ctx.escribir_json("quien_habla.json", {
        "_meta": {"fig": "F07", "base": "V2 y v3", "orden": "fijo, por palabras en la V2", "d": ctx.hoy,
                  "definicion": "todas las filas de cada edición a nombre del diputado (rep_id), con la Presidencia incluida"},
        "diez": diez, "diputados": len(o),
        "maximos": {"palabras": int(max(max(x["palabras_v2"], x["palabras_v3"]) for x in diez)),
                    "filas": int(max(max(x["filas_v2"], x["filas_v3"]) for x in diez))}})
    ctx.escribir_datos("quien_habla", ["rep_id", "nombre", "filas_v2", "palabras_v2", "filas_v2_presidencia", "palabras_v2_presidencia",
                                       "filas_v3", "palabras_v3", "cambio_palabras"],
                       [[x["rep_id"], x["nombre"], x["filas_v2"], x["palabras_v2"], x["filas_v2_pres"], x["palabras_v2_pres"],
                         x["filas_v3"], x["palabras_v3"], round(x["palabras_v3"] / x["palabras_v2"] - 1, 6) if x["palabras_v2"] else ""]
                        for x in (reg(rid, r) for rid, r in o.iterrows())])

    # ── F25 · siete fechas corregidas (V1 → V2) ────────────────────────────────────────────────────────────────
    er = pd.read_csv(ERRATAS_FECHAS, sep=";")
    exige(len(er) == 7, f"erratas_fechas_V1.csv trae {len(er)} sesiones, no 7")
    if V1_CSV.exists():
        exige(huella(V1_CSV, "md5") == MD5_V1, "la copia local de la V1 no es la depositada")
        v1 = pd.read_csv(V1_CSV, sep=";", dtype=str, keep_default_na=False, usecols=["id", "date", "legislature"])
        v2c = ctx._lee_v2()[["id", "date", "legislature"]]
        exige(list(v1.id) == list(v2c.id), "la V1 y la V2 no tienen los mismos ids")
        cambia = (v1.date.values != v2c.date.values) | (v1.legislature.values != v2c.legislature.values)
        ids_cambian = set(v2c.id[cambia].astype(int))
        exige(ids_cambian == {i for r in er.itertuples() for i in range(r.id_min, r.id_max + 1)}, "las filas que cambian de la V1 a la V2 no son las de erratas_fechas_V1.csv")
        n_leg = int((v1.legislature.values != v2c.legislature.values).sum())
        ctx.compartido["datos_v1_comprobada"] = True
    else:
        ctx.aviso("no está la copia local de la V1: F25 se comprueba solo contra erratas_fechas_V1.csv y la V2")
        n_leg = int(er.loc[er.legislatura_V1 != er.legislatura_corregida, "n"].sum())
    fechas = []
    for r in er.itertuples():
        bloque = d[(d.id >= r.id_min) & (d.id <= r.id_max)]
        exige(len(bloque) == r.n == r.id_max - r.id_min + 1, f"F25: la sesión {r.num_session} no tiene {r.n} filas contiguas")
        exige(set(bloque.date) == {r.fecha_corregida} and set(bloque.legislature) == {r.legislatura_corregida} and set(bloque.num_session) == {r.num_session},
              f"F25: la V2 no trae la fecha corregida de la sesión {r.num_session}")
        prueba = PRUEBAS_F25.get((r.legislatura_corregida, int(r.num_session)))
        exige(prueba is not None, f"F25: sin prueba para la sesión {r.num_session} ({r.legislatura_corregida})")
        dias = (dt.date.fromisoformat(r.fecha_corregida) - dt.date.fromisoformat(r.fecha_V1)).days
        fechas.append({"sesion": int(r.num_session), "leg_v1": r.legislatura_V1, "leg_v2": r.legislatura_corregida,
                       "fecha_v1": r.fecha_V1, "fecha_v2": r.fecha_corregida, "dias": dias, "id_min": int(r.id_min), "id_max": int(r.id_max),
                       "filas": int(r.n), "prueba": prueba, "clave": f"{r.fecha_corregida}-{int(r.num_session)}"})
    pon("fechas.sesiones", len(fechas), "n", "V2", "sesiones con la fecha cambiada entre la V1 y la V2 (= changelog)")
    pon("fechas.filas", int(er.n.sum()), "n", "V2", "filas con otra date o legislature entre la V1 (MD5 0a9adafe…) y la V2")
    pon("fechas.filas.legislatura", n_leg, "n", "V2", "filas con otra legislature entre la V1 y la V2 (todas de la sesión 77, 1931-1933 → 1933-1935)")
    ctx.escribir_json("fechas_corregidas.json", {
        "_meta": {"fig": "F25", "base": "V2", "fuente": "erratas_fechas_V1.csv y la comparación de la V1 depositada con la V2",
                  "pruebas": "AUDITORIA_FECHAS.md (proyecto, sin depositar)", "d": ctx.hoy},
        "sesiones": sorted(fechas, key=lambda x: x["fecha_v2"]),
        "extremos": [min(min(x["fecha_v1"], x["fecha_v2"]) for x in fechas), max(max(x["fecha_v1"], x["fecha_v2"]) for x in fechas)]})
    ctx.escribir_datos("fechas_corregidas", ["num_session", "legislatura_v1", "legislatura_v2", "fecha_v1", "fecha_v2", "dias", "id_min", "id_max", "filas", "prueba"],
                       [[x["sesion"], x["leg_v1"], x["leg_v2"], x["fecha_v1"], x["fecha_v2"], x["dias"], x["id_min"], x["id_max"], x["filas"], "+".join(x["prueba"])]
                        for x in sorted(fechas, key=lambda x: x["fecha_v2"])])

    # ── F32 · las 14 columnas ──────────────────────────────────────────────────────────────────────────────────
    bruto = ctx._lee_v2()
    cols = []
    for c in COLUMNAS_V2:
        serie = bruto[c]
        vacios = int((serie == "").sum())
        ej = [bruto.iloc[i - 1][c] for i in FILAS_EJEMPLO]
        cols.append({"columna": c, "tipo": TIPO_COLUMNA[c], "vacios": vacios, "distintos": int(serie[serie != ""].nunique()),
                     "den": N_FILAS_V2, "v5423": ej[0], "v5424": ej[1][:600] if c == "speech" else ej[1],
                     "v5424_caracteres": len(ej[1]) if c == "speech" else None})
    vac = {x["columna"]: x["vacios"] for x in cols}
    exige(vac["rep_id"] == dado("filas.sin_diputado") and vac["party_family"] == dado("familias.vacias"), "F32: los vacíos de rep_id o de party_family no cuadran")
    ctx.escribir_json("columnas.json", {"_meta": {"fig": "F32", "base": "V2", "filas_ejemplo": list(FILAS_EJEMPLO), "d": ctx.hoy,
                                                  "md5_v2": MD5_V2}, "columnas": cols})
    ctx.escribir_datos("columnas", ["columna", "tipo", "vacios", "distintos", "filas", "fila_5423", "fila_5424"],
                       [[x["columna"], x["tipo"], x["vacios"], x["distintos"], x["den"], x["v5423"], bruto.iloc[5423][x["columna"]]] for x in cols])

    # ── F33 · cinco maneras de contar «palabra» ───────────────────────────────────────────────────────────────
    recuentos = [
        {"k": "nwords", "base": "V2", "clave": "palabras.V2", "valor": int(dado("palabras.V2")), "codigo": "d.nwords.sum()"},
        {"k": "split", "base": "V2", "clave": "palabras.split.V2", "valor": split_total, "codigo": "d.speech.str.split().str.len().sum()"},
        {"k": "total", "base": "v3", "clave": "palabras.v3", "valor": int(dado("palabras.v3")), "codigo": None},
        {"k": "habla", "base": "v3", "clave": "palabras.habla.v3", "valor": int(dado("palabras.habla.v3")), "codigo": None},
        {"k": "tendencia", "base": "v3", "clave": "palabras.tendencia.v3", "valor": tokens, "codigo": None},
    ]
    ctx.escribir_json("palabras.json", {"_meta": {"fig": "F33", "base": "V2 y v3", "d": ctx.hoy}, "recuentos": recuentos,
                                        "referencia": "nwords", "maximo": max(x["valor"] for x in recuentos)})
    ctx.escribir_datos("palabras", ["recuento", "palabras", "edicion", "diferencia_con_nwords", "codigo"],
                       [[x["k"], x["valor"], x["base"], x["valor"] - recuentos[0]["valor"], x["codigo"] or ""] for x in recuentos])

    # ── F34 · unir con Afinidades Elegidas (CGOCUS V1.1) ─────────────────────────────────────────────────────────
    ruta = ctx.afin("representative_metadata.tab")
    af = pd.read_csv(ruta, sep=ctx.afin_sep("representative_metadata.tab"))
    exige({"id_dip", "legislatura", "partido", "nombre_completo"} <= set(af.columns), "representative_metadata sin las columnas esperadas")
    exige(not af.duplicated(["id_dip", "legislatura"]).any(), "CGOCUS: representative_metadata repite pares (id_dip, legislatura)")
    dl = d.assign(leg_afin=d.legislature.replace({"1933-1935": "1933-1936"}))
    pares = dl.dropna(subset=["rep_id"])[["rep_id", "leg_afin"]].drop_duplicates().astype({"rep_id": int})
    m = pares.merge(af, left_on=["rep_id", "leg_afin"], right_on=["id_dip", "legislatura"], how="left", indicator=True)
    sin = m[m._merge == "left_only"][["rep_id", "leg_afin"]]
    ddi = dl.dropna(subset=["rep_id"]).astype({"rep_id": int})
    filas_sin = ddi.merge(sin, on=["rep_id", "leg_afin"])
    solo_id = len(d[["rep_id"]].astype({"rep_id": "Int64"}).merge(af[["id_dip"]].astype({"id_dip": "Int64"}), left_on="rep_id", right_on="id_dip", how="left"))
    bien = dl[["rep_id", "leg_afin"]].astype({"rep_id": "Int64"}).merge(
        af[["id_dip", "legislatura"]].astype({"id_dip": "Int64"}), left_on=["rep_id", "leg_afin"], right_on=["id_dip", "legislatura"], how="left", validate="many_to_one")
    exige(len(bien) == N_FILAS_V2, "F34: la unión por diputado y legislatura cambia el número de filas")
    pm = ddi.groupby(["rep_id", "leg_afin"]).party.agg(lambda x: x.mode().iloc[0] if x.notna().any() else None).reset_index().merge(
        af, left_on=["rep_id", "leg_afin"], right_on=["id_dip", "legislatura"])
    otro = pm[pm.party != pm.partido]
    pon("union.pares", len(pares), "n", "afin", "pares (rep_id, legislatura recodificada) de la V2")
    pon("union.pares.casan", int((m._merge == "both").sum()), "n", "afin", "pares con ficha en representative_metadata (CGOCUS V1.1)")
    pon("union.pares.sin_ficha", len(sin), "n", "afin", "pares sin ficha")
    pon("union.filas.sin_ficha", len(filas_sin), "n", "afin", "filas V2 de esos pares")
    pon("union.solo_id.filas", solo_id, "n", "afin", "filas tras unir solo por rep_id = id_dip (left join)")
    pon("union.pares.otro_partido", len(otro), "n", "afin", "pares cuyo party (moda en la V2) ≠ partido en CGOCUS")
    n_sin = filas_sin.groupby(["rep_id", "leg_afin"]).size()
    casos = [{"rep_id": int(r.rep_id), "nombre": nombre(r.rep_id, d.loc[d.rep_id == r.rep_id, "rep_name"].iloc[0]),
              "legislatura": "1933-1935" if r.leg_afin == "1933-1936" else r.leg_afin, "legislatura_cgocus": r.leg_afin,
              "filas": int(n_sin[(r.rep_id, r.leg_afin)])} for r in sin.sort_values(["leg_afin", "rep_id"]).itertuples()]
    otros = [{"rep_id": int(r.rep_id), "nombre": nombre(r.rep_id), "legislatura_cgocus": r.leg_afin, "party": r.party, "partido": r.partido}
             for r in otro.sort_values(["leg_afin", "rep_id"]).itertuples()]
    ctx.escribir_json("union.json", {
        "_meta": {"fig": "F34", "base": "V2 × CGOCUS V1.1", "archivo": "representative_metadata.tab", "d": ctx.hoy,
                  "clave": "rep_id = id_dip y legislature (1933-1935 → 1933-1936) = legislatura"},
        "filas_v2": N_FILAS_V2, "filas_bien": len(bien), "filas_mal": solo_id, "pares": len(pares),
        "pares_casan": int((m._merge == "both").sum()), "pares_sin_ficha": len(sin), "filas_sin_ficha": len(filas_sin),
        "otro_partido": len(otro), "sin_ficha": casos, "partido_distinto": otros})
    ctx.escribir_datos("union", ["caso", "rep_id", "nombre", "legislatura_cgocus", "filas_v2", "party_v2", "partido_cgocus"],
                       [["sin_ficha", x["rep_id"], x["nombre"], x["legislatura_cgocus"], x["filas"], "", ""] for x in casos]
                       + [["otro_partido", x["rep_id"], x["nombre"], x["legislatura_cgocus"], "", x["party"], x["partido"]] for x in otros])

    # ── depósitos: versiones de THQCMI y archivos de la vigente (instantánea de Dataverse) ────────────────────
    vers = []
    for x in ctx.inst.versiones("thqcmi"):
        if x.get("versionState") != "RELEASED":
            continue
        lic = x.get("license")
        vers.append({"version": f"V{x['versionNumber']}.{x['versionMinorNumber']}", "fecha": (x.get("releaseTime") or "")[:10],
                     "licencia": lic.get("name") if isinstance(lic, dict) else lic,
                     "archivos": [f["dataFile"]["filename"] for f in x.get("files", [])]})
    th = ctx.inst.dataset("thqcmi")["latestVersion"]
    archivos = [{"nombre": f["dataFile"]["filename"], "bytes": int(f["dataFile"]["filesize"]), "md5": f["dataFile"]["md5"]} for f in th["files"]]
    orden = ["2REP_Diaries.csv", "changelog_es_09_2026.txt", "changelog_en_09_2026.txt", "Luz_y_Taquigrafos_README.txt"]
    exige(sorted(a["nombre"] for a in archivos) == sorted(orden), f"THQCMI V2.0: archivos inesperados {[a['nombre'] for a in archivos]}")
    archivos.sort(key=lambda a: orden.index(a["nombre"]))
    exige(next(a for a in archivos if a["nombre"] == V2_CSV.name)["md5"] == MD5_V2, "el MD5 depositado del CSV no es el nuestro")
    ctx.escribir_json("depositos.json", {"_meta": {"base": "dv", "instantanea": ctx.inst.fecha, "d": ctx.hoy},
                                         "versiones": sorted(vers, key=lambda x: x["version"]), "archivos": archivos,
                                         "clave_archivo": {"2REP_Diaries.csv": "csv", "changelog_es_09_2026.txt": "changelog_es",
                                                           "changelog_en_09_2026.txt": "changelog_en", "Luz_y_Taquigrafos_README.txt": "readme"}})

    # ── fragmentos R y Python: se EJECUTAN y deben reproducir estas cifras ───────────────────────────────────────
    md = COPY_DATOS.read_text(encoding="utf-8")
    (lr, codigo_r), (lp, codigo_py) = _bloque(md, "datos.codigo.r"), _bloque(md, "datos.codigo.python")
    exige((lr, lp) == ("r", "python"), "los bloques de datos.codigo.r y .python no son R y Python")
    tmp = CACHE_EXP / "fragmentos"
    tmp.mkdir(parents=True, exist_ok=True)
    for p in tmp.iterdir():
        p.unlink()
    (tmp / "2REP_Diaries.csv").symlink_to(V2_CSV)
    _tab_dataverse(af, tmp / "representative_metadata.tab")
    (tmp / "fragmento.R").write_text(codigo_r, encoding="utf-8")
    (tmp / "fragmento.py").write_text(codigo_py, encoding="utf-8")
    try:
        sal_py = subprocess.run([sys.executable, "-W", "error", "fragmento.py"], cwd=tmp, check=True, capture_output=True, text=True, timeout=300).stdout
        sal_r = subprocess.run(["Rscript", "fragmento.R"], cwd=tmp, check=True, capture_output=True, text=True, timeout=300).stdout
    except subprocess.CalledProcessError as e:
        raise AssertionError(f"un fragmento de Datos falla al ejecutarse: {e.stderr[-600:]}") from e
    ver_r = subprocess.run(["Rscript", "-e", "cat(R.version$major, R.version$minor, sep='.')"], capture_output=True, text=True).stdout.strip()
    nums = lambda x: re.findall(r"\d+", x)  # noqa: E731
    exige(nums(sal_py) == nums(sal_r), "los fragmentos de R y de Python no dan los mismos números")
    # Lo que tienen que reproducir, línea a línea.
    for lg in LEGISLATURAS:
        linea = re.search(rf"^{re.escape(lg)}\s+(\d+)\s+(\d+)\s+(\d+)\s*$", sal_py, flags=re.M)
        exige(linea is not None, f"los fragmentos no imprimen la legislatura {lg}")
        exige([int(x) for x in linea.groups()] == [dado(f"leg.{lg}.sesiones"), dado(f"leg.{lg}.filas"), dado(f"leg.{lg}.palabras")],
              f"los fragmentos no reproducen las sesiones, filas o palabras de {lg}")
    exige(f"meses con sesión: {dado('meses.con_sesion')}" in sal_py, "los fragmentos no reproducen los meses con sesión")
    feb = next((x for x in ctx.compartido.get("meses", []) if x.get("mes") == "1933-02"), None)
    exige(feb is not None, "base.py no dejó los meses en ctx.compartido")
    exige(f"febrero de 1933: {feb['sesiones']} sesiones, {feb['filas']} filas, {feb['pal']} palabras" in sal_py,
          "los fragmentos no reproducen febrero de 1933")
    exige(f"unión solo por el id: {solo_id} filas" in sal_py, "los fragmentos no reproducen la unión solo por el id")
    exige(f"unión por id y legislatura: {N_FILAS_V2} filas; {len(filas_sin)} filas y {len(sin)} pares sin ficha en CGOCUS" in sal_py,
          "los fragmentos no reproducen la unión por diputado y legislatura")
    ahora = dt.datetime.now().isoformat(timespec="seconds")
    pon("fragmentos.fecha", ctx.hoy, "fecha", "V2", "fecha de la última ejecución de los dos fragmentos de Datos (exportador)")
    entorno = {"python": sys.version.split()[0], "pandas": pd.__version__, "r": ver_r}
    ctx.escribir_json("fragmentos.json", {"_meta": {"ejecutado": ahora, "md5_v2": MD5_V2, "tab_bytes": TAB_BYTES,
                                                    "md5_cgocus_original": ctx.compartido["afin_verificados"].get("representative_metadata.tab"), **entorno},
                                          "python": {"codigo": codigo_py, "salida": sal_py}, "r": {"codigo": codigo_r, "salida": sal_r}})
    cab = (f"# Salida de los dos fragmentos de «Usar los datos» (docs/copy_es/datos.md, claves datos.codigo.r y datos.codigo.python)\n"
           f"# Ejecutados por el exportador del sitio el {ahora} con Python {entorno['python']} · pandas {entorno['pandas']}"
           f" (avisos elevados a error) y R {ver_r}\n"
           f"# 2REP_Diaries.csv (THQCMI V2.0) MD5 {MD5_V2} · representative_metadata.tab (CGOCUS V1.1) reconstruido como lo sirve"
           f" Harvard Dataverse, {TAB_BYTES} bytes\n"
           f"# Comprobado: R y Python dan los mismos números y reproducen las cifras del sitio (leg.*, meses.con_sesion,"
           f" mes.1933-02.*, union.*)\n")
    ctx.escribir_texto("fragmentos_salida.txt", cab + "\n## Python\n" + sal_py + "\n## R\n" + sal_r)

    # Comprobación de sentido: lo que F18 y F34 dicen del total.
    exige(dado("filas.v3") == N_FILAS_V3 and dado("filas.V2") == N_FILAS_V2, "totales inesperados")
    return C
