#!/usr/bin/env python3
"""Recalcula, sobre las fuentes primarias, cada marcador y cada ancla del grupo cortes_a.

Cubre `docs/copy_es/cortes.md` (índice de Las Cortes, plantilla de ficha y figuras F01, F16, F05, F09),
`cortes_1931.md` (ficha I) y `cortes_1933.md` (ficha II). No escribe nada en el sitio: imprime una fila por marcador
(«clave · valor calculado · valor esperado · base») y sale con error si algo no cuadra. Los valores esperados son los
de `docs/marcadores/cortes.md`, `cortes_1931.md` y `cortes_1933.md`; el exportador (`exportador/modulos/cortes.py` y
`base.py`) debe dar exactamente estos.

Anclas: cada `fila.<etapa>.<nombre>` se comprueba así: la fila V2 existe, es de la fecha y la sesión dichas y contiene
LETRA A LETRA el fragmento citado; la fila v3 es de la misma sesión y contiene el mismo fragmento. Es el aserto que el
plan pide para `citas.json`.

Fuentes (se comprueba su huella antes de calcular):
  V2        /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv            MD5 360332a0ff1327671530f15eed46ac0c
  v3        /Users/rodrodr/.cache/luz_site/corpus.sqlite                          sha256 3a0d8b2d…
  papel v3  /Users/rodrodr/.cache/luz_site/clima/*.jsonl (motor del explorador: role, chair)
  proyecto  2REP_Explorer/standalone/data/sessions.json                           sha256 b3295e99…
  cambios   2REP_Base/Dataverse_V2_2026-09-15/erratas_fechas_V1.csv (los rangos de id están en el changelog depositado)
  bibliotecas docs/estudio/datos/bibliotecas_v3.json (bibliotecas del proyecto en el explorador, v3)

Uso:  python3 docs/marcadores/cortes_a_comprobar.py      (≈ 1 min: lee el CSV entero y llama a node una vez)
"""
from __future__ import annotations

import glob
import hashlib
import json
import re
import sqlite3
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

import pandas as pd

SITIO = Path(__file__).resolve().parents[2]
V2 = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv")
V3 = Path("/Users/rodrodr/.cache/luz_site/corpus.sqlite")
CLIMA = "/Users/rodrodr/.cache/luz_site/clima/part*.jsonl"
PROYECTO = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json")
ERRATAS = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/Dataverse_V2_2026-09-15/erratas_fechas_V1.csv")
BIBLIOTECAS = SITIO / "docs" / "estudio" / "datos" / "bibliotecas_v3.json"
MOTOR = SITIO / "docs" / "estudio" / "datos" / "motor" / "roles.mjs"

HUELLAS = {
    V2: ("md5", "360332a0ff1327671530f15eed46ac0c"),
    V3: ("sha256", "3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15"),
    PROYECTO: ("sha256", "b3295e99f45af95a4d6f47f910fcacea7fc5f6da98ffde38df726fda1d7231da"),
}
PRESIDENCIA = {"chair", "vicechair", "chair_age"}
LETRA = ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece"]
LISTA = re.compile(r"senores que (?:dijeron|han dicho)\s*:?\s*(?:si|no)\b")


def huella(p: Path, alg: str) -> str:
    h = hashlib.new(alg)
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def fold(s: str) -> str:
    return unicodedata.normalize("NFKD", str(s)).encode("ascii", "ignore").decode().lower()


def etapa(leg: str, num: int) -> str:
    if leg == "1931-1933":
        return "I"
    if leg == "1933-1935":
        return "II"
    return "III" if num <= 60 else "IV" if num <= 69 else "V"


def fecha_corta(iso: str) -> str:
    y, m, d = iso.split("-")
    return f"{int(d)}-{['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][int(m)-1]}-{y}"


# ── anclas: clave, id V2, id v3, fecha, sesión, fragmento literal (None = solo se comprueba fecha y sesión) ──────
ANCLAS = [
    ("I.mesa_edad", 1, 2, "1931-07-14", 1, "Abrese la sesión"),
    ("I.alcala_resigna", 2, 3, "1931-07-14", 1, "resignar sus Poderes en fecha próxima"),
    ("I.besteiro_elegido", 5, 9, "1931-07-14", 1, "D. Julián Besteiro, 363"),
    ("I.besteiro_ovacion", 10, 18, "1931-07-14", 1, None),
    ("I.asua_proyecto", 2725, 3006, "1931-08-27", 28, "es una Constitución de izquierda"),
    ("I.art24", 6994, 7800, "1931-10-13", 55, "quedó aprobado el artículo 24 por 178 votos contra 59"),
    ("I.azana_baja", 7022, 7833, "1931-10-14", 56, "la sensible baja que nos ha forzado hoy a este cambio ministerial"),
    ("I.constitucion", 13531, 15043, "1931-12-09", 88,
     "Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí"),
    ("I.presidente_republica", 13613, 15140, "1931-12-10", 89,
     "D. Niceto Alcalá-Zamora queda elegido Presidente de la República española"),
    ("I.centro_gravedad", 20689, 23023, "1932-03-09", 132,
     "El centro de gravedad de la política de la República española está en el Parlamento, aquí en este salón"),
    ("I.conllevar", 25527, 28500, "1932-05-13", 165,
     "es un problema que no se puede resolver, que sólo se puede conllevar"),
    ("I.campalans", 25529, 28502, "1932-05-13", 165, "después de hacerlo el ilustre maestro de todos"),
    ("I.estatuto_presidencia", 25979, 29042, "1932-05-27", 173, None),
    ("I.sanjurjo", 32910, 36780, "1932-08-10", 215, "los sucesos acaecidos esta madrugada en Madrid"),
    ("I.agraria", 37177, 41627, "1932-09-09", 233,
     "votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19"),
    ("I.estatuto_voto", 37178, 41629, "1932-09-09", 233, "Total, 314."),
    ("I.lerroux_gobierno", 61223, 68793, "1933-10-02", 404, "el mejor acto de acatamiento"),
    ("I.azana_1933", 61237, 68809, "1933-10-02", 404, "a ninguno de vosotros se os ocultará"),
    ("I.van_a_morir", 61277, 68855, "1933-10-03", 405, "Señores Diputados, los que van a morir os saludan."),
    ("I.gobierno_se_retira", 61309, 68887, "1933-10-03", 405, "el Gobierno se retira"),
    ("I.voto_187", 61320, 68900, "1933-10-03", 405, "fue aprobada la proposición por 187 votos contra 91"),
    ("I.suspenden", 61355, 68942, "1933-10-03", 405,
     "En vista de la declaración del Gobierno, se suspenden las sesiones de Cortes"),
    ("I.bucle9", 976, 1081, "1931-07-27", 9, "Sánchez Guerra, Ossorio y Gallardo, Sánchez Guerra"),
    ("II.riesgo", 61356, 68945, "1933-12-08", 1, "Abrese la sesión"),
    ("II.alba_interino", 61358, 68949, "1933-12-08", 1, "D. Santiago Alba Bonifaz, 234"),
    ("II.alba_proclamado", 62053, 69744, "1933-12-28", 12,
     "Queda proclamado Presidente de la Cámara D. Santiago Alba Bonifaz"),
    ("II.lerroux_declaracion", 61596, 69228, "1933-12-19", 6,
     "cumplimos el grato deber de comparecer a vuestra presencia"),
    ("II.gil_robles_fraccion", 61598, 69230, "1933-12-19", 6, "la fracción numéricamente más importante de la Cámara"),
    ("II.inicuo", 68270, 76798, "1934-04-20", 72,
     "¿Por qué es inicuo el acto que van a realizar las Cortes al aprobar este proyecto de ley?"),
    ("II.amnistia_voto", 68299, 76829, "1934-04-20", 72,
     "quedó aprobado el artículo y con él el dictamen, por 265 votos contra 45"),
    ("II.samper", 68466, 77029, "1934-05-02", 75, None),
    ("II.tiros", 70714, 79606, "1934-05-31", 91, "Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!"),
    ("II.sesion_secreta", 71329, 80305, "1934-06-08", 96, "han de tratarse en sesión secreta"),
    ("II.luz", 71330, 80306, "1934-06-08", 96, "Luz y taquigrafos."),
    ("II.esquerra", 71609, 80615, "1934-06-12", 97,
     "esta minoría catalana, integrada por la Esquerra, federales y Unió Socialista"),
    ("II.se_retiran", 71611, 80617, "1934-06-12", 97,
     "¿por qué se retiran los Sres. Diputados de la Esquerra catalana?"),
    ("II.vascos", 71613, 80619, "1934-06-12", 97, "La minoría vasca se retira del salón"),
    ("II.cuatro_julio", 74646, 84075, "1934-10-01", 113,
     "dijerase que acaba de transcurrir la noche del 4 de Julio en que el Parlamento acordó suspender sus tareas"),
    ("II.ese_camino", 74648, 84079, "1934-10-01", 113, "ha puesto de relieve que no es posible seguir por ese camino"),
    ("II.huelga", 74669, 84109, "1934-10-09", 114,
     "hasta completar la pacificación y el imperio de la Ley, interrumpida por la huelga revolucionaria"),
    ("II.asturias", 74673, 84113, "1934-10-09", 114, "nuestros compañeros Diputados por Asturias"),
    ("II.vivas", 74703, 84145, "1934-10-09", 114, "son contestados con unánimes aplausos y aclamaciones"),
    ("II.azana_1935", 85330, 96282, "1935-03-20", 173, "un presunto acusado y culpable"),
    ("II.straperlo", 97387, 110040, "1935-10-28", 250, "aparato de juego de salón que ha motivado todo este asunto"),
    ("II.salazar", 97391, 110044, "1935-10-28", 250, "vengo apesadumbrado por una grave acusación"),
    ("II.nombela", 101450, 114599, "1935-12-07", 275, "denuncia del Sr. Nombela"),
    ("II.nuevo_aviso", 101697, 114872, "1935-12-10", 276, "las sesiones hasta nuevo aviso"),
]
# Frases que el copy cita y que deben estar también en la fila (además del fragmento del ancla).
CITAS_EXTRA = [
    ("I.besteiro_ovacion", "speaker", "acogido con una gran ovación"),
    ("I.asua_proyecto", "speech", "en nombre de la Comisión"),
    ("I.presidente_republica", "speech", "Don Niceto Alcalá-Zamora, 362"),
    ("I.presidente_republica", "speech", "La suma total es la de 410"),
    ("I.besteiro_elegido", "speech", "Han tomado parte en la votación 371 señores Diputados"),
    ("I.art24", "speech", "Señores que han dicho no:\n\nAlcalá-Zamora.\n\nMaura."),
    ("I.sanjurjo", "speech", "El general Sanjurjo se ha presentado en Sevilla"),
    ("II.alba_interino", "speech", "Han tomado parte en la votación 248 Diputados"),
    ("II.ese_camino", "speech", "es necesaria una rectificación"),
    ("II.samper", "speaker", "Presidente del CONSEJO DE MINISTROS (Samper)"),
    ("II.straperlo", "speech", "denominado \"Straperlo\""),
]
# Solo en la v3 (filas de sumario).
ANCLAS_V3 = [("mexico_caratula", 121466, "1945-01-10", 70,
              "sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia")]


def calcular():
    """Devuelve ({clave: (valor, base, cómo)}, [fallos de ancla])."""
    for p, (alg, h) in HUELLAS.items():
        got = huella(p, alg)
        if got != h:
            raise SystemExit(f"✗ huella de {p.name}: {got}")
    d = pd.read_csv(V2, sep=";", dtype={"speech": str, "speaker": str, "rep_name": str, "party": str,
                                        "party_family": str, "ideology": str, "legislature": str, "date": str})
    assert len(d) == 107551
    d["etapa"] = [etapa(l, n) for l, n in zip(d.legislature, d.num_session)]
    d["mes"] = d.date.str[:7]
    con = sqlite3.connect(V3)
    P = json.load(open(PROYECTO))["sessions"]
    p = pd.DataFrame([{"date": x["date"], "num": x["num_session"], "leg": x["legislature"], "diario": x["diario"],
                       "diario_num": x["diario_num"], "pag_desde": x.get("page_start"), "pag_hasta": x.get("page_end"),
                       "id_min": x["id_min"], "id_max": x["id_max"], "status": x["page_status"],
                       "pres": (x["presidente"] or {}).get("nombre"), "gob": (x["gobierno"] or {}).get("nombre")}
                      for x in P])
    p["etapa"] = [etapa(l, n) for l, n in zip(p.leg, p.num)]

    # papel de cada fila V2 (Presidencia) con el analizador del explorador
    pares = d[["speaker", "rep_name"]].fillna("").drop_duplicates()
    with tempfile.TemporaryDirectory() as tmp:
        f = Path(tmp) / "pares.json"
        f.write_text(json.dumps(pares.values.tolist(), ensure_ascii=False), encoding="utf-8")
        roles = json.loads(subprocess.run(["node", str(MOTOR), str(f)], check=True, capture_output=True,
                                          text=True).stdout)
    mapa = {tuple(k): r for k, r in zip(pares.values.tolist(), roles)}
    d["rol"] = [mapa[(s, r)] for s, r in zip(d.speaker.fillna(""), d.rep_name.fillna(""))]
    d["pres"] = d.rol.isin(PRESIDENCIA)

    C: dict[str, tuple] = {}   # clave → (valor, base, cómo)

    def pon(k, v, base, como):
        C[k] = (v, base, como)

    # ── corpus y legislaturas ────────────────────────────────────────────────────────────────────────────────
    ses = d[["date", "num_session", "etapa", "legislature"]].drop_duplicates()
    pon("sesiones", len(ses), "V2", "claves (date, num_session)")
    pon("filas.V2", len(d), "V2", "recuento del CSV")
    pon("filas.v3", con.execute("select count(*) from speeches").fetchone()[0], "v3", "count(*) de speeches")
    pon("diputados.V2", d.rep_id.nunique(), "V2", "rep_id distintos")
    pon("legislaturas.V2", d.legislature.nunique(), "V2", "valores de legislature")
    pon("etapas.n", 5, "V2", "regla del plan (D-8): legislaturas 1 y 2, y la 3.ª partida por num_session ≤60/61–69/70–74")
    for leg in ["1931-1933", "1933-1935", "1936-1939"]:
        pon(f"leg.{leg}.diputados", d[d.legislature == leg].rep_id.nunique(), "V2", "rep_id distintos, con quien preside")
    meses_con = set(d.mes)
    todos = pd.period_range("1931-07", "1945-11", freq="M").astype(str)
    pon("meses.total", len(todos), "V2", "de 1931-07 a 1945-11")
    pon("meses.con_sesion", len(meses_con), "V2", "meses con alguna sesión")
    salto = pd.period_range("1939-03", "1944-12", freq="M").astype(str)
    assert not (set(salto) & meses_con)
    pon("meses.salto", len(salto), "V2", "1939-03 → 1944-12, sin ninguna sesión")
    pon("meses.salto.desde", "1939-03", "V2", "primer mes del salto")
    pon("meses.salto.hasta", "1944-12", "V2", "último mes del salto")

    # ── etapas ─────────────────────────────────────────────────────────────────────────────────────────────
    rango = {"I": ("1931-07", "1933-10"), "II": ("1933-12", "1935-12"), "III": ("1936-03", "1936-07"),
             "IV": ("1936-10", "1939-02"), "V": ("1945-01", "1945-11")}
    tot = d.nwords.sum()
    fam_norm = {"Republicanoses": "Republicanos", "Repubicanos": "Republicanos", "Republcanos": "Republicanos",
                "Republicano": "Republicanos", "Liberal": "Liberales", "Carlista": "Carlistas", "Agrario": "Agrarios",
                "catder": "Catder", "Nacionalistas vascos": "Nacionalista Vasco"}
    d["familia"] = d.party_family.str.strip().replace(fam_norm)
    d["ideo"] = d.ideology.str.strip()
    for e, g in d.groupby("etapa"):
        s = g[["date", "num_session"]].drop_duplicates()
        nums = sorted(s.num_session.unique())
        assert nums == list(range(nums[0], nums[-1] + 1)), e
        pon(f"etapa.{e}.sesiones", len(s), "V2", "claves de sesión de la etapa")
        pon(f"etapa.{e}.num.desde", int(nums[0]), "V2", "primer num_session (sin huecos)")
        pon(f"etapa.{e}.num.hasta", int(nums[-1]), "V2", "último num_session (sin huecos)")
        pon(f"etapa.{e}.fecha.desde", s.date.min(), "V2", "primera fecha")
        pon(f"etapa.{e}.fecha.hasta", s.date.max(), "V2", "última fecha")
        pon(f"etapa.{e}.fechas", s.date.nunique(), "V2", "fechas distintas")
        pon(f"etapa.{e}.fechas.dobles", int((s.date.value_counts() > 1).sum()), "V2", "fechas con dos sesiones")
        pon(f"etapa.{e}.filas", len(g), "V2", "filas")
        pon(f"etapa.{e}.palabras", int(g.nwords.sum()), "V2", "suma de nwords")
        pon(f"etapa.{e}.palabras.pct", g.nwords.sum() / tot, "V2", "palabras de la etapa / palabras del CSV")
        pon(f"etapa.{e}.diputados", g.rep_id.nunique(), "V2", "rep_id distintos, con quien preside")
        ms = pd.period_range(*rango[e], freq="M").astype(str)
        pon(f"etapa.{e}.meses", len(ms), "V2", f"{rango[e][0]} → {rango[e][1]}")
        pon(f"etapa.{e}.meses.con_sesion", sum(m in meses_con for m in ms), "V2", "meses de la etapa con sesión")
        pon(f"etapa.{e}.meses.sin_sesion", sum(m not in meses_con for m in ms), "V2", "meses de la etapa sin sesión")
        pon(f"etapa.{e}.vice_ses", g[g.rol == "vicechair"][["date", "num_session"]].drop_duplicates().shape[0], "V2",
            "sesiones con alguna fila vicechair (parse_speaker del explorador)")
        lis = g[g.speech.fillna("").map(lambda t: bool(LISTA.search(fold(t))))]
        pon(f"etapa.{e}.listas_nominales.filas", len(lis), "V2",
            "filas cuyo texto plegado contiene «señores que dijeron|han dicho» + «sí|no»")
        pon(f"etapa.{e}.listas_nominales.sesiones", lis[["date", "num_session"]].drop_duplicates().shape[0], "V2",
            "sesiones de esas filas")
        sp = g[~g.pres]
        spt = sp.nwords.sum()
        if e in ("I", "II"):
            fam = sp.groupby("familia").nwords.sum() / spt
            ide = sp.groupby("ideo").nwords.sum()
            pon(f"ideologia.etapa.{e}.d_ed.pct", (ide.get("D", 0) + ide.get("ED", 0)) / spt, "V2",
                "palabras de ideology D o ED / palabras sin Presidencia")
            if e == "I":
                pon("familias.etapa.I.republicanos.pct", fam["Republicanos"], "V2",
                    "palabras de la familia Republicanos / palabras sin Presidencia (familia normalizada como el explorador)")
            else:
                pon("familias.etapa.II.conservadores.pct", fam["Conservadores"], "V2",
                    "palabras de la familia Conservadores / palabras sin Presidencia")
                assert fam.idxmax() == "Conservadores"
    pon("pres.vice_ses", d[d.rol == "vicechair"][["date", "num_session"]].drop_duplicates().shape[0], "V2",
        "sesiones con alguna fila vicechair (parse_speaker del explorador)")
    v3s = pd.read_sql("select id, date, num_session, legislature, rep_id, rep_name, nwords from speeches", con)
    v3s["etapa"] = [etapa(l, n) for l, n in zip(v3s.legislature, v3s.num_session)]
    for e, n in v3s.groupby("etapa").size().items():
        pon(f"etapa.{e}.filas_v3", int(n), "v3", "filas de la etapa en speeches")

    # proyecto: serie, presidentes, Gobiernos
    for e, g in p.groupby("etapa"):
        series = g.diario.value_counts()
        pon(f"etapa.{e}.serie", series.index[0], "proyecto", "título del Diario (sessions.json › diario)")
    pres = p.groupby(["etapa", "pres"]).size()
    for (e, nombre), clave in [(("I", "Julián Besteiro Fernández"), "etapa.I.pres.besteiro"),
                               (("I", "Francisco Barnés"), "etapa.I.pres.barnes"),
                               (("I", "Antonio Lara y Zárate"), "etapa.I.pres.lara"),
                               (("II", "Santiago Alba Bonifaz"), "etapa.II.pres.alba"),
                               (("II", "Cándido Casanueva"), "etapa.II.pres.casanueva"),
                               (("II", "Manuel Giménez Fernández"), "etapa.II.pres.gimenez_fernandez")]:
        pon(clave, int(pres[(e, nombre)]), "proyecto", f"sesiones con presidente titular «{nombre}»")
    pon("etapa.I.gob.lerroux_i", int((p.gob == "Gobierno Lerroux I").sum()), "proyecto", "sesiones del Gobierno Lerroux I")
    pon("etapa.II.gobiernos", p[p.etapa == "II"].gob.nunique(), "proyecto", "Gobiernos distintos en la etapa")
    for clave, (fecha, num) in {"1931-12-09-88": ("1931-12-09", 88), "1934-04-20-72": ("1934-04-20", 72)}.items():
        r = p[(p.date == fecha) & (p.num == num)].iloc[0]
        pon(f"sesion.{clave}.diario", int(r.diario_num), "proyecto", "sessions.json › diario_num")
        pon(f"sesion.{clave}.pag.desde", int(r.pag_desde), "proyecto", "sessions.json › page_start")
        pon(f"sesion.{clave}.pag.hasta", int(r.pag_hasta), "proyecto", "sessions.json › page_end")
        filas = d[(d.date == fecha) & (d.num_session == num)]
        pon(f"sesion.{clave}.id.desde", int(filas.id.min()), "V2", "primer id de la sesión")
        pon(f"sesion.{clave}.id.hasta", int(filas.id.max()), "V2", "último id de la sesión")
        assert (int(r.id_min), int(r.id_max)) == (int(filas.id.min()), int(filas.id.max()))
    g = d.groupby(["date", "num_session"]).nwords.sum().sort_values(ascending=False)
    pon("sesion.1935-12-07-275.palabras", int(g[("1935-12-07", 275)]), "V2", "suma de nwords de la sesión")
    assert g.index[0] == ("1936-07-01", 54) and g.index[1] == ("1935-12-07", 275), "cambió el orden de las más largas"

    # correcciones de fecha (changelog depositado)
    er = pd.read_csv(ERRATAS, sep=";")
    pon("correcciones.fechas.n", len(er), "V2", "sesiones con fecha corregida (changelog de la V2)")
    pon("correcciones.fechas.I", int((er.legislatura_corregida == "1931-1933").sum()), "V2", "de ellas, en la legislatura 1931-1933")
    r77 = er[er.num_session == 77].iloc[0]
    pon("correcciones.sesion77.filas", int(r77.n), "V2", f"ids {r77.id_min}–{r77.id_max}")
    assert (r77.fecha_V1, r77.fecha_corregida, r77.legislatura_V1) == ("1933-06-01", "1934-05-04", "1931-1933")

    # ── votaciones y elecciones leídas en el texto de la fila ────────────────────────────────────────────────
    txt = d.set_index("id").speech

    def num(i, pat):
        m = re.search(pat, txt[i])
        assert m, (i, pat)
        return [int(x) for x in m.groups()]

    si, no = num(6994, r"aprobado el artículo 24 por (\d+) votos contra (\d+)")
    pon("voto.178-59.si", si, "V2", "texto de V2 6994"); pon("voto.178-59.no", no, "V2", "texto de V2 6994")
    si, no = num(37177, r"votaron en pro del proyecto de Reforma agraria (\d+) Sres\. Diputados, y en contra, (\d+)")
    pon("voto.318-19.si", si, "V2", "texto de V2 37177"); pon("voto.318-19.no", no, "V2", "texto de V2 37177")
    si, no = [int(x) for x in re.search(r"Total, (\d+)\.\s+Señores que dijeron no:.*?Total, (\d+)\.", txt[37178], re.S).groups()]
    pon("voto.314-24.si", si, "V2", "texto de V2 37178: «Total, N.» de la lista del sí")
    pon("voto.314-24.no", no, "V2", "texto de V2 37178: «Total, N.» de la lista del no")
    si, no = num(61320, r"aprobada la proposición por (\d+) votos contra (\d+)")
    pon("voto.187-91.si", si, "V2", "texto de V2 61320"); pon("voto.187-91.no", no, "V2", "texto de V2 61320")
    si, no = num(68299, r"el dictamen, por (\d+) votos contra (\d+)")
    pon("voto.265-45.si", si, "V2", "texto de V2 68299"); pon("voto.265-45.no", no, "V2", "texto de V2 68299")
    (prom,) = num(13531, r"suman (\d+)")
    (vot,) = num(13531, r"votación (\d+) señores Diputados y este mismo número ha votado que sí")
    pon("voto.constitucion.prometidos", prom, "V2", "texto de V2 13531"); pon("voto.constitucion.si", vot, "V2", "texto de V2 13531")
    (v,) = num(13613, r"Don Niceto Alcalá-Zamora, (\d+)"); (n,) = num(13613, r"La suma total es la de (\d+)")
    pon("eleccion.presidente1931.votos", v, "V2", "texto de V2 13613"); pon("eleccion.presidente1931.votantes", n, "V2", "texto de V2 13613")
    (v,) = num(5, r"D\. Julián Besteiro, (\d+)"); (n,) = num(5, r"votación (\d+) señores Diputados")
    pon("eleccion.besteiro1931.votos", v, "V2", "texto de V2 5"); pon("eleccion.besteiro1931.votantes", n, "V2", "texto de V2 5")
    (v,) = num(61358, r"D\. Santiago Alba Bonifaz, (\d+)"); (n,) = num(61358, r"votación (\d+) Diputados")
    pon("eleccion.alba1933.votos", v, "V2", "texto de V2 61358"); pon("eleccion.alba1933.votantes", n, "V2", "texto de V2 61358")

    # ── anclas ───────────────────────────────────────────────────────────────────────────────────────────────
    fallos = []
    d2 = d.set_index("id")
    anc = {}
    for clave, i2, i3, fecha, sesion, frag in ANCLAS:
        r = d2.loc[i2]
        r3 = con.execute("select date, num_session, speaker, speech, nwords from speeches where id=?", (i3,)).fetchone()
        ok = r.date == fecha and int(r.num_session) == sesion and r3[0] == fecha and r3[1] == sesion
        if frag:
            ok = ok and frag in (r.speech or "") and frag in (r3[3] or "")
        if not ok:
            fallos.append(f"ancla {clave}: V2 {i2} / v3 {i3}")
        anc[clave] = (r, r3)
        pon(f"fila.{clave}.V2", i2, "V2", f"fila de {fecha_corta(fecha)} (sesión {sesion})" + (f" con «{frag}»" if frag else ""))
        pon(f"fila.{clave}.v3", i3, "v3", "misma sesión" + (", mismo fragmento" if frag else ""))
    for clave, campo, frag in CITAS_EXTRA:
        r, r3 = anc[clave]
        if frag not in (r[campo] or "") or frag not in (r3[2 if campo == "speaker" else 3] or ""):
            fallos.append(f"cita extra {clave}: «{frag}»")
    for clave in ["I.alcala_resigna", "I.asua_proyecto", "I.azana_1933", "II.azana_1935"]:
        r, r3 = anc[clave]
        assert int(r.nwords) == int(r3[4]), clave
        pon(f"fila.{clave}.palabras", int(r.nwords), "V2", f"nwords de la fila (igual en la v3)")
    for clave, i3, fecha, sesion, frag in ANCLAS_V3:
        r3 = con.execute("select date, num_session, speech from speeches where id=?", (i3,)).fetchone()
        if not (r3[0] == fecha and r3[1] == sesion and frag in r3[2]):
            fallos.append(f"ancla v3 {clave}")
        pon(f"fila.{clave}.v3", i3, "v3", f"fila SUMARIO de {fecha_corta(fecha)}, solo en la v3, con «{frag[:40]}…»")

    # ── F05 (v3, sin Presidencia, sin sumarios ni comentarios) ─────────────────────────────────────────────
    papel = []
    for f in sorted(glob.glob(CLIMA)):
        for ln in open(f):
            o = json.loads(ln)
            papel.append((o["id"], o["role"], o["chair"]))
    papel = pd.DataFrame(papel, columns=["id", "role", "chair"])
    h = v3s.merge(papel, on="id")
    h = h[(~h.chair) & (~h.role.isin(["summary", "remark"]))]
    for e, esperado in [("I", ["Manuel Azana Diaz", "Antonio Royo Villanova Morales", "Indalecio Prieto Tuero",
                               "Jose Antonio Balbontin Y Gutierrez", "Eduardo Ortega Y Gasset"]),
                        ("II", ["Augusto Barcia Y Trelles", "Indalecio Prieto Tuero", "Jose Calvo Sotelo",
                                "Joaquin Chapaprieta Y Torregrosa", "Manuel Jimenez Fernandez"])]:
        g = h[h.etapa == e]
        top = g[g.rep_id.notna()].groupby("rep_id").agg(pal=("nwords", "sum"), nombre=("rep_name", "first")) \
            .sort_values("pal", ascending=False)
        nombres = [fold(x) for x in top.nombre.head(5)]
        if nombres != [fold(x) for x in esperado]:
            fallos.append(f"F05 {e}: {top.nombre.head(5).tolist()}")
        pon(f"oradores.etapa.{e}.1.pal", int(top.pal.iloc[0]), "v3",
            "palabras de habla del primero (chair = false, role ∉ {summary, remark})")
        pon(f"oradores.etapa.{e}.den", int(g.nwords.sum()), "v3", "palabras de habla de la etapa, sin la Presidencia")

    # ── explorador: búsquedas (FTS del explorador) y bibliotecas del proyecto ─────────────────────────────
    def fts(q, leg=None, d1=None, d2_=None):
        sql = "select count(*) from speeches_fts f join speeches s on s.id=f.rowid where speeches_fts match ?"
        a = [q]
        if leg:
            sql += " and s.legislature=?"; a.append(leg)
        if d1:
            sql += " and s.date between ? and ?"; a += [d1, d2_]
        return con.execute(sql, a).fetchone()[0]
    pon("busqueda.divorcio.1931-1933", fts("divorcio", "1931-1933"), "v3", "«divorcio» con la faceta Legislatura 1931-1933")
    pon("busqueda.amnistia.1933-1935", fts("amnistia", "1933-1935"), "v3", "«amnistía» con la faceta Legislatura 1933-1935")
    pon("busqueda.strauss.1935", fts("strauss", None, "1935-10-01", "1935-12-31"), "v3", "«strauss», del 1-X al 31-XII-1935")
    pon("busqueda.straperlo.1935", fts("straperlo", None, "1935-10-01", "1935-12-31"), "v3", "«straperlo», del 1-X al 31-XII-1935")
    B = {b["nombre"]: b for b in json.load(open(BIBLIOTECAS))["bibliotecas"]}
    pon("biblioteca.sufragio.entradas", B["Debate · Sufragio femenino"]["entradas"], "v3", "entradas de la biblioteca")
    pon("biblioteca.casas_viejas.sesiones", len(B["Debate · Casas Viejas"]["sesiones"]), "v3", "sesiones de la biblioteca")
    pon("biblioteca.amnistia.entradas", B["Debate · Amnistía de 1934"]["entradas"], "v3", "entradas de la biblioteca")
    pon("biblioteca.amnistia.sesiones", len(B["Debate · Amnistía de 1934"]["sesiones"]), "v3", "sesiones de la biblioteca")

    def et_fecha(f):
        return "I" if f <= "1933-10-03" else "II" if f <= "1935-12-10" else "III" if f <= "1936-07-10" else "IV" if f <= "1939-02-01" else "V"
    for e in ["I", "II", "III", "IV", "V"]:
        n = sum(1 for b in B.values() if b["nombre"].startswith("Debate · ") and {et_fecha(s[0]) for s in b["sesiones"]} == {e})
        pon(f"etapa.{e}.debates", n, "v3", "bibliotecas «Debate · …» cuyas sesiones caen en la etapa")

    return C, fallos


def main() -> int:
    C, fallos = calcular()
    # ── salida y comparación con los valores esperados ──────────────────────────────────────────────────
    esperado = {}
    for md in ["cortes.md", "cortes_1931.md", "cortes_1933.md"]:
        f = SITIO / "docs" / "marcadores" / md
        if f.exists():
            for ln in f.read_text(encoding="utf-8").splitlines():
                m = re.match(r"\|\s*`([^`]+)`\s*\|\s*([^|]*?)\s*\|\s*(\w+)\s*\|", ln)
                if m:
                    esperado[m.group(1).split("\\|")[0].strip("{}")] = (m.group(2), m.group(3))
    malos = 0
    for k, (v, base, como) in sorted(C.items()):
        txt_v = f"{100*v:.2f} %".replace(".", ",") if isinstance(v, float) else str(v)
        e = esperado.get(k)
        marca = "·"
        if e and "→" in e[0]:  # «3 → «tres»»: el número y el texto que verá el lector
            num_, letra_ = e[0].split("→")
            if isinstance(v, int) and letra_.strip(" «»") != LETRA[v]:
                e = ("?", e[1])
            else:
                e = (num_.strip(), e[1])
        if e:
            ev = e[0].replace(".", "").replace(" ", " ")
            cv = txt_v.replace(".", "")
            ok = (ev.replace(" ", "") == cv.replace(" ", "")) or (isinstance(v, float) and ev.endswith("%") and
                  round(100 * v, len(ev.split(",")[1].rstrip("% ")) if "," in ev else 0) ==
                  float(ev.rstrip("% ").replace(",", "."))) or (isinstance(v, str) and len(v) == 10 and ev == fecha_corta(v))
            ok = ok and e[1] == base
            marca = "✓" if ok else "✗"
            malos += not ok
        print(f"{marca} {k:45s} {txt_v:>28s}  {base:9s} {e[0] if e else '(sin declarar)'}")
    for f in fallos:
        print("✗", f)
    print(f"{len(C)} marcadores · {len(ANCLAS) + len(ANCLAS_V3)} anclas · {len(fallos)} fallos de ancla · {malos} valores distintos")
    return 1 if (fallos or malos) else 0


if __name__ == "__main__":
    sys.exit(main())
