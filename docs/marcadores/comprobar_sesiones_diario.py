#!/usr/bin/env python3
"""Recalcula sobre las fuentes primarias cada cifra y cada cita del copy de «Sesiones y votaciones», de las ocho puertas
de lectura y de «El Diario» (docs/copy_es/sesiones*.md y diario.md).

No escribe nada en el sitio. Comprueba las huellas, recalcula los marcadores de docs/marcadores/sesiones.md y
diario.md, comprueba letra a letra los fragmentos de docs/marcadores/citas.md en su fila V2 y en su fila v3, y sale con
error si algo no cuadra. El exportador (modulos/sesiones.py y diario.py) debe dar exactamente estos valores.

Fuentes (huella comprobada antes de calcular):
  V2        /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv       MD5 360332a0ff1327671530f15eed46ac0c
  v3        /Users/rodrodr/.cache/luz_site/corpus.sqlite                     sha256 3a0d8b2d…
  proyecto  2REP_Explorer/standalone/data/sessions.json                      sha256 b3295e99…
  bibliotecas  2REP_Explorer/dist/bibliotecas/*.2replib (las que ofrece el explorador publicado)
Papel de cada fila V2 (Presidencia): parse_speaker del motor del explorador (exportador/motor/papel.mjs, con node).

Uso:  python3 docs/marcadores/comprobar_sesiones_diario.py        (unos 30 s: lee el CSV entero)
"""
from __future__ import annotations

import collections
import glob
import hashlib
import json
import os
import pickle
import re
import sqlite3
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

import pandas as pd

SITIO = Path(__file__).resolve().parents[2]
V2P = "/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv"
V3P = "/Users/rodrodr/.cache/luz_site/corpus.sqlite"
assert hashlib.sha256(open(V3P, "rb").read()).hexdigest().startswith("3a0d8b2d"), "v3: huella inesperada"
TMP = Path(tempfile.mkdtemp(prefix="lyt_sesiones_"))


def plegar(t):
    t = unicodedata.normalize("NFD", t.lower())
    return "".join(ch for ch in t if unicodedata.category(ch) != "Mn")


class lyt:  # noqa: N801 — mismo nombre que en el guion de trabajo
    V2P = V2P
    _d = None
    _c = None

    @staticmethod
    def v2():
        if lyt._d is None:
            df = pd.read_csv(V2P, sep=";", dtype={"rep_id": "Int64", "speaker": str, "rep_name": str, "party": str,
                                                   "party_family": str, "ideology": str, "district": str,
                                                   "legislature": str, "date": str, "speech": str})
            assert len(df) == 107551
            lyt._d = df
        return lyt._d

    @staticmethod
    def v3():
        if lyt._c is None:
            lyt._c = sqlite3.connect(f"file:{V3P}?mode=ro", uri=True)
        return lyt._c

    @staticmethod
    def row2(i):
        return lyt.v2().set_index("id").loc[i]

    @staticmethod
    def row3(i):
        cur = lyt.v3().execute("select id,num_session,ord,date,legislature,speaker,rep_id,rep_name,party,nwords,speech "
                               "from speeches where id=?", (i,))
        cols = [x[0] for x in cur.description]
        return dict(zip(cols, cur.fetchone()))


class roles:  # noqa: N801
    @staticmethod
    def con_roles():
        df = lyt.v2()
        pares = df[["speaker", "rep_name"]].fillna("").drop_duplicates()
        e, s = TMP / "pares.json", TMP / "papel.json"
        e.write_text(json.dumps(pares.values.tolist(), ensure_ascii=False), encoding="utf-8")
        subprocess.run(["node", str(SITIO / "exportador" / "motor" / "papel.mjs"), str(e), str(s)], check=True)
        papel = json.loads(s.read_text(encoding="utf-8"))
        mapa = {(a, b): p[0] for (a, b), p in zip(pares.values.tolist(), papel)}
        df["rol"] = [mapa[k] for k in zip(df.speaker.fillna(""), df.rep_name.fillna(""))]
        df["pres"] = df.rol.isin({"chair", "vicechair", "chair_age"})
        return df


def cuenta(fts, desde=None, hasta=None, habla=False, leg=None, ses=None):
    """El recuento del buscador del explorador: FTS5 MATCH + filtros, orden bm25."""
    w, p = ["speeches_fts MATCH ?"], [fts]
    if desde: w.append("s.date >= ?"); p.append(desde)
    if hasta: w.append("s.date <= ?"); p.append(hasta)
    if habla: w.append("s.speaker NOT IN ('SUMARIO','COMENTARIOS')")
    if leg: w.append("s.legislature = ?"); p.append(leg)
    if ses is not None: w.append("s.num_session = ?"); p.append(ses)
    sql = "FROM speeches_fts JOIN speeches s ON s.id = speeches_fts.rowid WHERE " + " AND ".join(w)
    c = lyt.v3()
    n = c.execute("SELECT COUNT(*) " + sql, p).fetchone()[0]
    rows = c.execute("SELECT s.id,s.date,s.num_session,s.ord,s.speaker,s.rep_name,s.nwords " + sql
                     + " ORDER BY bm25(speeches_fts), s.id ASC", p).fetchall()
    return n, rows


# ═════════════ cifras ═════════════
HOY = "2026-09-22"
assert hashlib.md5(open(lyt.V2P, "rb").read()).hexdigest() == "360332a0ff1327671530f15eed46ac0c"
SIDE = "/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json"
assert hashlib.sha256(open(SIDE, "rb").read()).hexdigest().startswith("b3295e99")

d = roles.con_roles()
fold = d.speech.fillna("").map(plegar)
c = lyt.v3()
side = json.load(open(SIDE))
M = {}          # marcadores


def m(k, v, t, base, clave, f):
    assert k not in M, k
    M[k] = {"v": v, "t": t, "base": base, "clave": clave, "f": f, "d": HOY}


def sp2(i):
    return d.loc[d.id == i, "speech"].iloc[0]


def sp3(i):
    return c.execute("select speech from speeches where id=?", (i,)).fetchone()[0]


# ─────────────────────────────── votaciones (F26) ───────────────────────────────
def voto(k, v2, v3, fr2, **campos):
    s2, s3 = sp2(v2), sp3(v3)
    for fr in fr2:
        assert fr in s2, (k, "V2", fr)
        assert fr in s3, (k, "v3", fr)
    for campo, (valor, formula) in campos.items():
        m(f"voto.{k}.{campo}", valor, "n", "V2", "L", formula)
    m(f"voto.{k}.V2", v2, "id", "V2", "C", "id de la fila V2 que imprime el resultado")
    m(f"voto.{k}.v3", v3, "id", "v3", "C", "id de la fila v3 con el mismo texto")


voto("141-106", 5453, 6110,
     ["En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106."],
     si=(141, "texto de V2 5453: «…por 141 votos contra 106.»"), no=(106, "ídem"))
voto("161-121", 5453, 6110, ["art. 34 (numeración antigua)", "Total, 161.", "Total, 121.",
                                       "Srta. Campoamor.", "Srta. Victoria Kent."],
     si=(161, "texto de V2 5453: «Total, 161.» tras «Señores que dijeron si:»"),
     no=(121, "texto de V2 5453: «Total, 121.» tras «Señores que dijeron no:»"))
s = sp2(5453)
assert s.index("Srta. Campoamor.") < s.index("Total, 161.") < s.index("Srta. Victoria Kent.") < s.index("Total, 121.")
voto("178-59", 6994, 7800, ["quedó aprobado el artículo 24 por 178 votos contra 59",
                                       "Total, 178.", "Total, 59.", "Señores que han dicho no:\n\nAlcalá-Zamora.\n\nMaura."],
     si=(178, "texto de V2 6994: «…por 178 votos contra 59»"), no=(59, "ídem"))
voto("368-466", 13531, 15043,
     ["Los Sres. Diputados que han prometido en estas Cortes suman 466; la mitad más uno, 234. Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí."],
     si=(368, "texto de V2 13531: «Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí»"),
     no=(0, "ídem: los 368 votantes votan sí"),
     total=(466, "texto de V2 13531: «…suman 466»"), mitad=(234, "texto de V2 13531: «la mitad más uno, 234»"))
assert "Total, 368." in sp2(13525) and "Total, 368." in sp3(15037)
m("voto.368-466.lista.V2", 13525, "id", "V2", "C", "fila V2 con la lista («Total, 368.»)")
m("voto.368-466.lista.v3", 15037, "id", "v3", "C", "fila v3 con la lista")
voto("318-19", 37177, 41627,
     ["votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19", "Total, 318.", "Total, 19."],
     si=(318, "texto de V2 37177"), no=(19, "texto de V2 37177"))
for fr in ["El número de Diputados que han prometido suma 462. La mitad mas uno son 232. Han votado en pro 318; en contra, 19."]:
    assert fr in sp2(37178) and fr in sp3(41628)
m("voto.318-19.total", 462, "n", "V2", "L", "texto de V2 37178: «…suma 462»")
m("voto.318-19.mitad", 232, "n", "V2", "L", "texto de V2 37178: «La mitad mas uno son 232»")
m("voto.318-19.mitad.V2", 37178, "id", "V2", "C", "fila V2 que imprime la mitad más uno")
m("voto.318-19.mitad.v3", 41628, "id", "v3", "C", "ídem en v3")
voto("314-24", 37178, 41629, ["Total, 314.", "Total, 24."],
     si=(314, "texto de V2 37178: «Total, 314.» (lista del Estatuto)"), no=(24, "texto de V2 37178: «Total, 24.»"))
assert "Queda definitivamente aprobado el Estatuto de Cataluña." in sp2(37179) and "Queda definitivamente aprobado el Estatuto de Cataluña." in sp3(41630)
voto("238-5", 102358, 115675,
     ["resultado que habían votado a favor de la proposición 238 Sres. Diputados y en contra 5",
      "Señores que dijeron no:\n\nBecerra.\n\nPortela.\n\nBenítez de Lugo.\n\nCanals.\n\nRosado.\n\nTotal, 5."],
     si=(238, "texto de V2 102358"), no=(5, "texto de V2 102358"))
fr = "Los Sres. Diputados en el ejercicio del cargo son 417; la mitad más uno, 209."
assert fr in sp2(102359) and fr in sp3(115676)
m("voto.238-5.total", 417, "n", "V2", "L", "texto de V2 102359: «…son 417»")
m("voto.238-5.mitad", 209, "n", "V2", "L", "texto de V2 102359: «la mitad más uno, 209»")
m("voto.238-5.mitad.V2", 102359, "id", "V2", "C", "fila V2 que imprime la mitad más uno")
m("voto.238-5.mitad.v3", 115676, "id", "v3", "C", "ídem en v3")
fr = "declaren que no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936."
assert fr in sp2(102304) and fr in sp3(115618)
m("voto.238-5.proposicion.V2", 102304, "id", "V2", "C", "fila V2 con el texto de la proposición")
m("voto.238-5.proposicion.v3", 115618, "id", "v3", "C", "ídem en v3")
fr = "Se entenderá acordada la destitución del Presidente cuando a favor de ella se pronuncien, en votación nominal."
assert fr in sp2(102309) and fr in sp3(115623)
m("voto.238-5.reglamento.V2", 102309, "id", "V2", "C", "fila V2 en que el Secretario lee el art. 106 del Reglamento")
m("voto.238-5.reglamento.v3", 115623, "id", "v3", "C", "ídem en v3")
m("voto.n", 6, "n", "V2", "R", "selección editorial de F26: 161–121, 178–59, 368, 318–19, 314–24, 238–5")
m("voto.sesiones", 5, "n", "V2", "R", "sesiones de esas seis votaciones: 1-X-1931, 13-X-1931, 9-XII-1931, 9-IX-1932, 7-IV-1936")
pat = r"senores que (?:dijeron|han dicho) (?:si|no)\b"
mk = fold.str.contains(pat, regex=True)
n_ses = d[mk].groupby(["date", "num_session"]).ngroups
m("voto.listas.sesiones", n_ses, "n", "V2", "C",
  "sesiones (date, num_session) con al menos una fila cuyo texto plegado contiene «señores que dijeron/han dicho sí/no»")
m("sesiones.n", 755, "n", "V2", "C", "sesiones de la V2 (claves date, num_session)")
assert n_ses == 405
# fase 2 (corrector del copy): registro de todas las listas, por etapa (plan R1)
def _etapa(r):
    if r.legislature == "1931-1933": return "I"
    if r.legislature == "1933-1935": return "II"
    return "III" if r.num_session <= 60 else ("IV" if r.num_session <= 69 else "V")
_x = d[mk].copy(); _x["et"] = _x.apply(_etapa, axis=1)
for _e in ("I", "II", "III", "IV", "V"):
    _g = _x[_x.et == _e]
    m(f"etapa.{_e}.listas_nominales.filas", len(_g), "n", "V2", "C", "filas con lista nominal (definición común)")
    if _e != "V":
        m(f"etapa.{_e}.listas_nominales.sesiones", _g.groupby(["date", "num_session"]).ngroups, "n", "V2", "C", "sesiones de esas filas")
assert len(_x) == 1023

# ─────────────────────────────── índice de Sesiones ───────────────────────────────
ses = d.groupby(["date", "num_session"]).size().reset_index()
dobles = ses[ses.date.duplicated(keep=False)].date.nunique()
m("ses.dobles", dobles, "n", "V2", "C", "fechas con dos sesiones en la V2 (1934-12-19, 1935-10-08, 1935-11-13)")
assert dobles == 3
cola = d[(d.date == "1931-10-01") & (d.num_session == 48)].sort_values("order").tail(5)
assert (cola.speech.str.startswith("Pido la palabra.")).all() and sp2(5792).endswith("El Sr. Ministro de")
assert sp3(6464).endswith("El Sr. Ministro de") and all(sp3(i).startswith("Pido la palabra.") for i in range(6460, 6465))
m("ses.s48.cola", 5, "n", "V2", "L", "filas finales repetidas de la sesión 48 (V2 5788–5792 · v3 6460–6464)")
for k, v, b in [("ses.s48.cola.V2.desde", 5788, "V2"), ("ses.s48.cola.V2.hasta", 5792, "V2"),
                ("ses.s48.cola.v3.desde", 6460, "v3"), ("ses.s48.cola.v3.hasta", 6464, "v3")]:
    m(k, v, "id", b, "C", "extremo de la cola repetida (incidencia truncated_end de sessions.json)")
# fase 2 (corrector del copy): Método usa esta familia; su orden en pantalla es `ord` + 1 (plan R20)
ords = [r[0] for r in c.execute("select ord from speeches where id between 6460 and 6464 order by id")]
assert ords == list(range(ords[0], ords[0] + 5))
m("ses.s48.cola.pantalla.desde", ords[0] + 1, "id", "explorador", "CALC", "«Orden» en pantalla de v3 6460 (ord + 1)")
m("ses.s48.cola.pantalla.hasta", ords[-1] + 1, "id", "explorador", "CALC", "«Orden» en pantalla de v3 6464 (ord + 1)")
frase = "Sánchez Guerra, Ossorio y Gallardo"
assert sp2(976).count(frase) == 6 and sp3(1081).count(frase) == 6
m("ses.s9.sesion", 9, "id", "V2", "C", "num_session de 1931-07-27")
m("ses.s9.bucle.veces", 6, "n", "V2", "L", "veces que la fila V2 976 repite «Sánchez Guerra, Ossorio y Gallardo»")
m("ses.s9.bucle.V2", 976, "id", "V2", "C", "fila V2 con el bucle (incidencia ocr_loop)")
m("ses.s9.bucle.v3", 1081, "id", "v3", "C", "la misma fila en v3")
nover = [s for s in side["sessions"] if s["page_status"] not in side["page_verified_status"]]
assert len(nover) == 14 and all(s["date"] >= "1936-10-01" for s in nover)
m("ses.paginas_sin_verificar", 14, "n", "proyecto", "M", "sesiones con page_status «unverified» en sessions.json (61–74 de 1936-1939)")
m("ses.umbral.largas", 300, "n", "V2", "R", "umbral de «fila larga» (palabras) en F30")

# ─────────────────────────────── puertas ───────────────────────────────
PUERTAS = {
    "sufragio-1931": [("1931-10-01", 48)],
    "cuestion-religiosa-1931": [("1931-10-13", 55)],
    "estatuto-1932": [("1932-05-27", 173)],
    "casas-viejas-1933": [("1933-02-02", 288)],
    "pistola-1934": [("1934-07-04", 112)],
    "antesala-1936": [("1936-06-16", 45), ("1936-07-01", 54)],
    "figueres-1939": [("1939-02-01", 69)],
    "mexico-1945": [("1945-08-17", 71), ("1945-11-07", 72), ("1945-11-08", 73), ("1945-11-09", 74)],
}
meta = {(s["date"], s["num_session"]): s for s in side["sessions"]}
for p, lista in PUERTAS.items():
    multi = len(lista) > 1
    tot = collections.Counter()
    for f, n in lista:
        g = d[(d.date == f) & (d.num_session == n)]
        resto = g[~g.pres]
        dip = resto[resto.rep_id.notna()].rep_id.nunique()
        v3 = c.execute("select count(*), sum(speaker not in ('SUMARIO','COMENTARIOS')), min(id), max(id) from speeches where date=? and num_session=?", (f, n)).fetchone()
        pre = f"sesion.{f}-{n}."
        m(pre + "num", n, "id", "V2", "C", f"num_session de {f}")
        m(pre + "fecha", f, "fecha", "V2", "C", "fecha de la sesión")
        m(pre + "filas", len(g), "n", "V2", "C", f"filas V2 de ({f}, {n})")
        m(pre + "palabras", int(g.nwords.sum()), "n", "V2", "C", f"suma de nwords de ({f}, {n})")
        m(pre + "diputados_sp", int(dip), "n", "V2", "C", "rep_id distintos fuera de la Presidencia (parse_speaker del explorador)")
        m(pre + "largas", int((g.nwords > 300).sum()), "n", "V2", "C", "filas con nwords > 300")
        m(pre + "presidencia", int(g.pres.sum()), "n", "V2", "C", "filas de la Presidencia (chair, vicechair, chair_age)")
        m(pre + "filas_v3", v3[0], "n", "v3", "C", f"filas v3 de ({f}, {n}), con sumario y comentarios")
        m(pre + "habla_v3", v3[1], "n", "v3", "C", "filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla»)")
        s = meta[(f, n)]
        m(pre + "diario_num", s["diario_num"], "id", "proyecto", "M", "diario_num en sessions.json")
        m(pre + "sigla", s["sigla"], "texto", "proyecto", "M", "sigla en sessions.json")
        if s["page_status"] in side["page_verified_status"]:
            m(pre + "paginas", f'{s["page_start"]}–{s["page_end"]}', "texto", "proyecto", "M",
              f'page_start–page_end en sessions.json (page_status {s["page_status"]})')
        m(pre + "presidente", (s["presidente"] or {}).get("nombre"), "texto", "proyecto", "M", "presidente titular (sessions.json)")
        tot["filas"] += len(g); tot["palabras"] += int(g.nwords.sum()); tot["filas_v3"] += v3[0]
    if multi:
        m(f"puerta.{p}.filas", tot["filas"], "n", "V2", "CALC", "suma de las filas V2 de sus sesiones")
        m(f"puerta.{p}.palabras", tot["palabras"], "n", "V2", "CALC", "suma de las palabras V2 de sus sesiones")
        m(f"puerta.{p}.sesiones", len(lista), "n", "V2", "R", "sesiones de la puerta")
m("ses.puertas", 8, "n", "V2", "R", "puertas de lectura de la edición 0.1")
m("ses.puertas.sesiones", 12, "n", "V2", "R", "sesiones que cubren las ocho puertas")

# hechos de calendario usados en las puertas
assert not (ses.date.str.startswith("1933-01")).any()
assert ses[ses.date.str.startswith("1933-02")].date.min() == "1933-02-01"
m("puerta.casas-viejas-1933.primera_feb", 287, "id", "V2", "C", "num_session de 1933-02-01, primera sesión de 1933")
m("puerta.casas-viejas-1933.feb.sesiones", int((ses.date.str.startswith("1933-02")).sum()), "n", "V2", "C", "sesiones de febrero de 1933")
nxt = ses[ses.date > "1934-07-04"].date.min(); assert nxt == "1934-10-01"
m("puerta.pistola-1934.siguiente", nxt, "fecha", "V2", "C", "primera sesión posterior al 4-VII-1934")
tot_pal = d.groupby(["date", "num_session"]).nwords.sum()
assert tot_pal.idxmax() == ("1936-07-01", 54)
top3 = c.execute("select date,num_session from speeches group by date,num_session order by sum(nwords) desc limit 1").fetchone()
assert top3 == ("1936-07-01", 54)
# estatuto: fila más larga
assert d.sort_values("nwords", ascending=False).id.iloc[1] == 25979 and d.sort_values("nwords", ascending=False).id.iloc[0] == 55221
top_hab = c.execute("select id from speeches where speaker not in ('SUMARIO','COMENTARIOS') order by nwords desc limit 1").fetchone()[0]
assert top_hab == 29042
m("puerta.estatuto-1932.fila.V2.palabras", int(d.loc[d.id == 25979, "nwords"].iloc[0]), "n", "V2", "C", "nwords de V2 25979 (fila a nombre de «El Sr. PRESIDENTE:»)")
m("puerta.estatuto-1932.fila.v3.palabras", c.execute("select nwords from speeches where id=29042").fetchone()[0], "n", "v3", "C", "nwords de v3 29042 (Azaña)")
m("puerta.estatuto-1932.fila.v3.presidencia.palabras", c.execute("select nwords from speeches where id=29041").fetchone()[0], "n", "v3", "C", "nwords de v3 29041 (la Presidencia da la palabra)")
m("puerta.estatuto-1932.fila.V2.puesto", 2, "n", "V2", "C", "puesto de V2 25979 por nwords entre las 107.551 filas")
# fase 2 (corrector del copy): la lista nominal de Figueres (1-II-1939)
_lf = d[(d.date == "1939-02-01") & d.speech.fillna("").str.contains("Señores Diputados que dijeron SI:", regex=False)].id.tolist()
_lf3 = [r[0] for r in c.execute("select id from speeches where date='1939-02-01' and instr(speech, 'Señores Diputados que dijeron SI:') > 0")]
assert len(_lf) == 1 and len(_lf3) == 1, (_lf, _lf3)
m("puerta.figueres-1939.lista.V2", int(_lf[0]), "id", "V2", "L", "fila V2 con la lista nominal de Figueres")
m("puerta.figueres-1939.lista.v3", int(_lf3[0]), "id", "v3", "L", "la misma lista en la v3")
# fase 2 (corrector del copy): «más de 17.000» (narrativa §10.3, plan R17)
_umbral = min(M["puerta.estatuto-1932.fila.V2.palabras"]["v"], M["puerta.estatuto-1932.fila.v3.palabras"]["v"]) // 1000 * 1000
m("puerta.estatuto-1932.umbral", _umbral, "n", "V2", "CALC", "millar entero por debajo de la menor de V2 25979 y v3 29042")
m("puerta.estatuto-1932.primera.V2", 55221, "id", "V2", "C", "la fila V2 más larga (Prieto, 12-VII-1933)")
m("puerta.estatuto-1932.primera.palabras", int(d.loc[d.id == 55221, "nwords"].iloc[0]), "n", "V2", "C", "nwords de V2 55221")
m("puerta.estatuto-1932.documento.v3", 61932, "id", "v3", "C", "fila COMENTARIOS v3 que recibe el documento leído por Prieto")
m("puerta.estatuto-1932.documento.palabras", c.execute("select nwords from speeches where id=61932").fetchone()[0], "n", "v3", "C", "nwords de v3 61932")
assert sp3(61932).startswith("DOCUMENTOS COMPLEMENTARIOS DEL DISCURSO DEL SEÑOR MINISTRO DE OBRAS PUBLICAS")

# ─────────────────────────────── búsquedas (v3, FTS5 como el explorador) ───────────────────────────────
def busq(k, fts, formula, **kw):
    n, rows = cuenta(fts, **kw)
    m(k, n, "n", "v3", "C", f"FTS5 MATCH {fts!r} {kw or ''} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; {formula}")
    return n, rows

n, rows = busq("busqueda.voto_union.n", '"voto femenino" OR "voto de la mujer"', "consulta del explorador: \"voto femenino\" | \"voto de la mujer\"")
assert n == 40 and cuenta('"voto femenino" OR "voto de la mujer"', habla=True)[0] == 40
m("busqueda.ses.voto_union.campoamor", sum(1 for r in rows if "Campoamor" in (r[5] or "")), "n", "v3", "C", "de los 40, filas de rep_name Clara Campoamor")
m("busqueda.ses.voto_union.fechas", len(set(r[1] for r in rows)), "n", "v3", "C", "fechas distintas de los 40")
n, rows = busq("busqueda.catolica.n", '"españa ha dejado de ser catolica"', "consulta: \"España ha dejado de ser católica\"")
pos = [r[0] for r in rows].index(7531) + 1
m("busqueda.catolica.puesto_azana", pos, "n", "v3", "C", "puesto de v3 7531 (Azaña) con ORDER BY bm25(speeches_fts), s.id")
assert (n, pos) == (6, 4)
busq("busqueda.ses.otra_manera.n", '"vivir de otra manera"', "consulta: \"vivir de otra manera\"")
busq("busqueda.ses.tenia_que_ocurrir.n", '"no ha ocurrido sino lo que tenia que ocurrir"', "consulta: \"no ha ocurrido sino lo que tenía que ocurrir\"")
busq("busqueda.casas_viejas.n", '"casas viejas"', "todo el corpus, todas las filas")
busq("busqueda.casas_viejas.habla", '"casas viejas"', "todo el corpus, «Solo lo que se habla»", habla=True)
busq("busqueda.casas_viejas.m1933_02", '"casas viejas"', "febrero de 1933, todas las filas", desde="1933-02-01", hasta="1933-02-28")
busq("busqueda.ses.casas_viejas.m1933_03", '"casas viejas"', "marzo de 1933, todas las filas", desde="1933-03-01", hasta="1933-03-31")
busq("busqueda.casas_viejas.m1933_02_habla", '"casas viejas"', "febrero de 1933, «Solo lo que se habla»", desde="1933-02-01", hasta="1933-02-28", habla=True)
busq("busqueda.ses.casas_viejas.m1933_03_habla", '"casas viejas"', "marzo de 1933, «Solo lo que se habla»", desde="1933-03-01", hasta="1933-03-31", habla=True)
busq("busqueda.ses.pistola.dia", '"pistola"', "Desde y Hasta 04/07/1934", desde="1934-07-04", hasta="1934-07-04")
busq("busqueda.ses.pistola.n", '"pistola"', "todo el corpus")
n, _ = busq("busqueda.ses.tierra_catalana.n", '"trozo de la tierra catalana"', "todo el corpus, todas las filas")
n2, _ = busq("busqueda.ses.tierra_catalana.habla", '"trozo de la tierra catalana"', "con «Solo lo que se habla»", habla=True)
assert (n, n2) == (1, 0)
busq("busqueda.ses.presidente_interino.n", '"presidente interino de la republica"', "Desde 01/01/1945", desde="1945-01-01")
busq("busqueda.ses.barriga.n", '"tiros a la barriga"', "todo el corpus")
m("busquedas.fecha", HOY, "fecha", "v3", "M", "fecha de los recuentos del buscador")

# ─────────────────────────────── bibliotecas del explorador ───────────────────────────────
fila = {r[0]: (r[1], r[2]) for r in c.execute("select id,date,num_session from speeches")}
LIB = {"sufragio": "L2-B2_debate-sufragio-femenino", "religiosa": "L2-B3_debate-cuestion-religiosa-art-26",
       "estatuto": "L2-B5_debate-estatuto-de-cataluna", "casas_viejas": "L2-B7_debate-casas-viejas",
       "orden_publico": "L2-B14_debate-orden-publico-en-la-primavera-de-1936", "guerra": "L2-B15_debate-las-cortes-en-guerra",
       "exilio": "L2-B16_debate-las-cortes-en-el-exilio"}
for k, f in LIB.items():
    dd = json.load(open(f"/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/dist/bibliotecas/{f}.2replib"))
    ids = [it["speech_id"] for it in dd["items"]]
    m(f"bib.{k}.nombre", dd["collection"]["name"], "texto", "v3", "M", f"{f}.2replib › collection.name")
    m(f"bib.{k}.entradas", len(ids), "n", "v3", "C", f"items de {f}.2replib")
    m(f"bib.{k}.sesiones", len(set(fila[i] for i in ids)), "n", "v3", "C", "sesiones (date, num_session) de sus items")

# ─────────────────────────────── El Diario ───────────────────────────────
S = side["sessions"]
cnt = collections.Counter(s["diario"] for s in S)
m("fuente.serie.constituyentes", cnt["Diario de Sesiones de las Cortes Constituyentes de la República Española"], "n", "proyecto", "M", "sesiones con ese título de Diario en sessions.json")
m("fuente.serie.cortes", cnt["Diario de las Sesiones de Cortes. Congreso de los Diputados"], "n", "proyecto", "M", "ídem")
m("fuente.serie.extracto_guerra", cnt["Extracto oficial de las sesiones. Congreso de los Diputados"], "n", "proyecto", "M", "ídem")
m("fuente.serie.extracto_mexico", cnt["Extracto oficial de las sesiones de Cortes celebradas en México (exilio)"], "n", "proyecto", "M", "ídem")
m("fuente.paginas.verificadas", sum(1 for s in S if s["page_status"] in side["page_verified_status"]), "n", "proyecto", "M", "sesiones con page_status contiguous, verso_blank o corrected")
m("fuente.paginas.den", len(S), "n", "proyecto", "M", "sesiones en sessions.json")
m("fuente.paginas.total", sum(s["pdf_pages"] or 0 for s in S), "n", "proyecto", "M", "suma de pdf_pages (páginas de los archivos del proyecto, portadas incluidas)")
m("fuente.sumarios.v3", c.execute("select count(*) from speeches where speaker='SUMARIO'").fetchone()[0], "n", "v3", "C", "filas SUMARIO de la v3")
m("fuente.comentarios.v3", c.execute("select count(*) from speeches where speaker='COMENTARIOS'").fetchone()[0], "n", "v3", "C", "filas COMENTARIOS de la v3")
mk = fold.str.contains(r"diario de sesiones", regex=True)
m("fuente.cita_diario.filas", int(mk.sum()), "n", "V2", "C", "filas V2 cuyo texto plegado contiene «diario de sesiones»")
m("fuente.cita_diario.sesiones", d[mk].groupby(["date", "num_session"]).ngroups, "n", "V2", "C", "sesiones de esas filas")
mk = fold.str.contains(r"palabras que no se perciben", regex=True)
m("fuente.no_perciben.filas", int(mk.sum()), "n", "V2", "C", "filas V2 cuyo texto plegado contiene «palabras que no se perciben»")
m("fuente.no_perciben.sesiones", d[mk].groupby(["date", "num_session"]).ngroups, "n", "V2", "C", "sesiones de esas filas")
m("fuente.no_perciben.filas_v3", cuenta('"palabras que no se perciben"')[0], "n", "v3", "C", "FTS5 «palabras que no se perciben» en v3")
mk = fold.str.contains(r"tiros a la barriga", regex=True)
assert d[mk].id.tolist() == [70714]
m("fuente.barriga.v2.filas", int(mk.sum()), "n", "V2", "C", "filas V2 con «tiros a la barriga» (texto plegado, sin coma)")
g = d[(d.date == "1936-06-16")]
assert (g.rep_name == "Dolores Ibarruri Gomez").sum() == 1
assert not fold.str.contains("hablado por ultima vez").any() and cuenta('"hablado por ultima vez"')[0] == 0
m("fuente.ibarruri.V2", 105336, "id", "V2", "C", "fila V2 de Dolores Ibárruri el 16-VI-1936")

# F27
mk = fold.str.contains(r"luz\s+y\s+taquigraf", regex=True)
F27 = [(420, 472), (23898, 26612), (24658, 27477), (55902, 62718), (57506, 64595), (71330, 80306), (75263, 84760),
       (79803, 89910), (99859, 112827), (106747, 120751)]
assert d[mk].id.tolist() == [a for a, _ in F27]
assert sorted(r[0] for r in c.execute("select rowid from speeches_fts where speeches_fts match '\"luz y taquigrafos\"'")) == [b for _, b in F27]
m("f27.n", 10, "n", "V2", "C", "filas V2 con «luz y taquígrafos» (texto plegado); las mismas diez en v3 por FTS5")
for i, (a, b) in enumerate(F27, 1):
    r = d.loc[d.id == a].iloc[0]
    m(f"f27.{i}.fecha", r.date, "fecha", "V2", "C", "date de la fila")
m("f27.desde", "1931-07-20", "fecha", "V2", "C", "primera fila"); m("f27.hasta", "1936-07-08", "fecha", "V2", "C", "última fila")

# F28
mk = fold.str.contains(r"no constar(?:a|an)\b.{0,60}?diario", regex=True)
F28F = [13605, 45115, 45440, 64659, 102484, 102486, 102492, 103251, 104406, 106290]
assert d[mk].id.tolist() == F28F
ORD = [(13605, 15129), (45115, 50466), (45440, 50818), (102484, 115828), (102486, 115830), (102492, 115836), (103251, 116698), (106290, 120222)]
PET = (104406, 118058); AJENA = (64659, 72690)
ACO = [(103182, 116626, "consigna"), (103250, 116697, "constan"), (105310, 119084, "constan"), (105324, 119098, "consigna"), (106289, 120221, "consigna")]
mk2 = fold.str.contains(r"no se consigna(?:n)?\s+por\s+orden", regex=True)
assert d[mk2].id.tolist() == [103182, 105324, 106289]
mk3 = fold.str.contains(r"no constan por orden", regex=True)
assert d[mk3].id.tolist() == [103250, 105310]
assert sorted(r[0] for r in c.execute("select rowid from speeches_fts where speeches_fts match 'NEAR(\"no constaran\" \"diario\", 10) OR NEAR(\"no constara\" \"diario\", 10)'")) == sorted([b for _, b in ORD] + [PET[1], AJENA[1]])
assert sorted(r[0] for r in c.execute("select rowid from speeches_fts where speeches_fts match '\"no se consignan por orden\" OR \"no se consigna por orden\" OR \"no constan por orden\"'")) == sorted(b for _, b, _ in ACO)
m("f28.formula.filas", len(F28F), "n", "V2", "C", "filas V2 cuyo texto plegado dice «no constará(n)» y, a menos de 60 caracteres, «diario»; las mismas diez en v3 (FTS5 NEAR)")
m("f28.ordenes", len(ORD), "n", "V2", "L", "de esas nueve, órdenes de la Presidencia, leídas una a una")
m("f28.ordenes.1936", sum(1 for a, _ in ORD if d.loc[d.id == a, "date"].iloc[0] >= "1936-04-01"), "n", "V2", "L", "órdenes entre abril y julio de 1936")
m("f28.peticion", 1, "n", "V2", "L", "petición de un diputado (Calvo Sotelo, V2 104406)")
m("f28.ajena", 1, "n", "V2", "L", "fila con la fórmula en otro sentido (V2 64659)")
m("f28.acotaciones", len(ACO), "n", "V2", "C", "acotaciones «no se consigna(n) por orden» (3) y «no constan por orden» (2)")
m("f28.acotaciones.consigna", int(mk2.sum()), "n", "V2", "C", "acotaciones «no se consigna(n) por orden»")
m("f28.acotaciones.constan", int(mk3.sum()), "n", "V2", "C", "acotaciones «no constan por orden»")
m("f28.fts_plural", cuenta('"no constaran en el diario"')[0], "n", "v3", "C", "FTS5 exacta «no constarán en el Diario» en v3")
m("f28.marcas", len(ORD) + len(ACO), "n", "V2", "CALC", "marcas de F28: órdenes + acotaciones")
for i, (a, b) in enumerate(ORD, 1):
    m(f"f28.orden.{i}.fecha", d.loc[d.id == a, "date"].iloc[0], "fecha", "V2", "C", "fecha")
for i, (a, b, _) in enumerate(ACO, 1):
    m(f"f28.acotacion.{i}.fecha", d.loc[d.id == a, "date"].iloc[0], "fecha", "V2", "C", "fecha")
m("f28.peticion.fecha", "1936-06-03", "fecha", "V2", "C", "fecha de la petición")
m("f28.ajena.fecha", "1934-02-21", "fecha", "V2", "C", "fecha de la fila ajena")

# ── añadidos tras la redacción ──
g = c.execute("select count(*), sum(speaker not in ('SUMARIO','COMENTARIOS')) from speeches where date >= '1945-08-17'").fetchone()
m("puerta.mexico-1945.filas_v3", g[0], "n", "v3", "C", "filas v3 con date >= 1945-08-17 (Desde 17/08/1945, sin Hasta)")
m("puerta.mexico-1945.habla_v3", g[1], "n", "v3", "C", "ídem con «Solo lo que se habla»")
n, rows = busq("busqueda.ses.suprimidas.n", '"no constan por orden" OR "no se consigna por orden" OR "no se consignan por orden"', "acotaciones de palabras suprimidas")
m("busqueda.ses.suprimidas.puerta", sum(1 for r in rows if r[1] in ("1936-06-16", "1936-07-01")), "n", "v3", "C", "de ellas, en 16-VI y 1-VII-1936")
m("fuente.series.n", len(cnt), "n", "proyecto", "M", "títulos de Diario distintos en sessions.json")
m("fuente.series.diarios", sum(1 for k in cnt if k.startswith("Diario")), "n", "proyecto", "M", "títulos que empiezan por «Diario»")
m("fuente.series.extractos", sum(1 for k in cnt if k.startswith("Extracto")), "n", "proyecto", "M", "títulos que empiezan por «Extracto»")
assert (M["busqueda.ses.suprimidas.n"]["v"], M["busqueda.ses.suprimidas.puerta"]["v"], M["fuente.series.n"]["v"]) == (5, 3, 4)

m("f28.15abril.ordenes", 3, "n", "V2", "L", "órdenes del 15-IV-1936: V2 102484, 102486 y 102492 (v3 115828, 115830, 115836)")
m("f27.balbontin", int((d[d.id.isin([a for a, _ in F27])].rep_id == 98).sum()), "n", "V2", "C", "de las diez filas de F27, las de José Antonio Balbontín (rep_id 98)")
assert M["f27.balbontin"]["v"] == 3 and M["f28.ordenes"]["v"] == 8 and M["f28.ordenes.1936"]["v"] == 5

print(len(M), "marcadores recalculados")

# ═════════════ citas ═════════════
# (clave, V2, v3, [fragmentos], orador, fecha, nota)
C = [
    # sufragio-1931
    ("sufragio.kent", 5419, 6074, ["que creo que el voto femenino debe aplazarse."], "Victoria Kent", "1931-10-01", ""),
    ("sufragio.presidencia", 5423, 6078, ["Ruego a la Cámara que guarde silencio."], "La Presidencia (Besteiro)", "1931-10-01", ""),
    ("sufragio.campoamor.silencio", 5424, 6079, ["Yo ruego a la Cámara que me escuche en silencio"], "Clara Campoamor", "1931-10-01", "el original sigue con «;»: se corta con «…»"),
    ("sufragio.campoamor.ciudadana", 5424, 6079, ["Yo, Sres. Diputados, me siento ciudadana antes que mujer, y considero que sería un profundo error político dejar a la mujer al margen de ese derecho"], "Clara Campoamor", "1931-10-01", ""),
    ("sufragio.resultado", 5453, 6110, ["Total, 161.", "Total, 121."], "Diario (lista de la votación)", "1931-10-01", "dos fragmentos unidos por «…»"),
    ("sufragio.ordinaria", 5453, 6110, ["En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106."], "Diario", "1931-10-01", ""),
    ("sufragio.art34", 5453, 6110, ["art. 34 (numeración antigua) del dictamen de la Comisión"], "Diario", "1931-10-01", ""),
    ("sufragio.lista.campoamor", 5453, 6110, ["Srta. Campoamor."], "Diario (lista del sí)", "1931-10-01", "está antes de «Total, 161.»"),
    ("sufragio.lista.kent", 5453, 6110, ["Srta. Victoria Kent."], "Diario (lista del no)", "1931-10-01", "está entre «Total, 161.» y «Total, 121.»"),
    ("sufragio.art34.texto", 12785, 14216, ["Los ciudadanos de uno y otro sexo, mayores de veintitrés años, tendrán los mismos derechos electorales"], "Clara Campoamor", "1931-12-01", "v3 se busca por texto"),
    ("sufragio.final", 5792, 6464, ["El Sr. Ministro de"], "Diario (final truncado)", "1931-10-01", "la fila TERMINA así"),
    # cuestion-religiosa-1931
    ("religiosa.azana", 6748, 7531, ["España ha dejado de ser católica: el problema político consiguiente es organizar el Estado en forma tal que puede", "adecuado a esta fase nueva e histórica del pueblo español."], "Manuel Azaña", "1931-10-13", "[sic] entre los dos fragmentos"),
    ("religiosa.resultado", 6994, 7800, ["quedó aprobado el artículo 24 por 178 votos contra 59"], "Diario", "1931-10-13", ""),
    ("religiosa.lista.no", 6994, 7800, ["Señores que han dicho no:\n\nAlcalá-Zamora.\n\nMaura."], "Diario (lista del no)", "1931-10-13", "comprobación, no se cita"),
    ("religiosa.cierre", 6999, 7807, ["Eran las siete y treinta y cinco minutos de la mañana del día 14."], "Diario", "1931-10-13", ""),
    ("religiosa.apertura", None, 7387, ["Abierta la sesión a las cuatro y treinta minutos de la tarde"], "Sumario", "1931-10-13", "solo v3 (sumario)"),
    # estatuto-1932
    ("estatuto.v2.palabra", 25979, 29041, ["El Sr. Presidente del Consejo de Ministros tiene la palabra."], "La Presidencia (Besteiro)", "1932-05-27", ""),
    ("estatuto.v2.rotulo", 25979, None, ["El Sr. Presidente del CONSEJO DE MINIS\n"], "rótulo cortado dentro de la fila V2", "1932-05-27", "solo V2: en la v3 es el orador de la fila 29042"),
    ("estatuto.azana", 25979, 29042, ["Cataluña dice, los catalanes dicen: “quieremos", "vivir de otra manera dentro del Estado español”. La pretensión es legítima; es legítima porque la autoriza la ley, nada menos que la ley constitucional."], "Manuel Azaña", "1932-05-27", "[sic] tras «quieremos»"),
    # casas-viejas-1933
    ("casasviejas.azana.hurgue", 44922, 50255, ["por mucho que se hurgue no se encontrará un atisbo de responsabilidad para el Gobierno."], "Manuel Azaña", "1933-02-02", ""),
    ("casasviejas.azana", 44922, 50255, ["En Casas Viejas no ha ocurrido sino lo que tenía que ocurrir. (Fuertes rumores y protestas en los bancos de las minorías; contraprotestas en la mayoría.)"], "Manuel Azaña", "1933-02-02", ""),
    ("casasviejas.barriga", 70714, 79606, ["Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!"], "Varios diputados (acotación en la fila de José Tomás y Piera)", "1934-05-31", ""),
    # pistola-1934
    ("pistola.prieto.golpes", 74619, 84039, ["Estos incidentes limitados a palabras son corrientes; el de hoy se ha convertido en golpes."], "Indalecio Prieto", "1934-07-04", ""),
    ("pistola.prieto", 74619, 84039, ["es exacto, Sr. Presidente, que ha salido a luz alguna pistola, por lo menos la mía"], "Indalecio Prieto", "1934-07-04", ""),
    ("pistola.oriol", 74621, 84041, ["Invito al Sr. Prieto a que diga quien ha sacado la pistola; lo que es un hecho completamente cierto, que saben todos los presentes, es que el Sr. Prieto la tenía."], "Jaime Oriol de la Puerta", "1934-07-04", "«quien» sin tilde, como en el texto"),
    # antesala-1936
    ("antesala.calvo", 105356, 119131, ["Yo digo lo que Santo Domingo de Silos contestó a un rey castellano: ", "Señor, la vida podéis quitarme, pero más no podéis."], "José Calvo Sotelo", "1936-06-16", "las comillas rectas del texto se escriben “ ”"),
    ("antesala.casares", 105330, 119104, ["haré responsable ante el país a S. S."], "Santiago Casares Quiroga", "1936-06-16", ""),
    ("antesala.calvo.suprimidas", 105310, 119084, ["(El orador pronuncia palabras que no constan por orden del Sr. Presidente y que dan motivo a grandes protestas e increpaciones.)"], "Diario (acotación en la fila de Calvo Sotelo)", "1936-06-16", ""),
    ("antesala.carrillo.suprimidas", 105324, 119098, ["(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)"], "Diario (acotación en la fila de Suárez de Tangil)", "1936-06-16", ""),
    ("antesala.galarza", 106289, 120221, ["¡Ah!, pero yo proclamo una cosa: la violencia... (El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)"], "Ángel Galarza", "1936-07-01", ""),
    ("antesala.presidencia", 106290, 120222, ["Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones."], "La Presidencia (Martínez Barrio)", "1936-07-01", ""),
    ("antesala.galarza2", 106291, 120223, ["esas palabras, que en el Diario de Sesiones no figurarán, el país las conocerá"], "Ángel Galarza", "1936-07-01", ""),
    # figueres-1939
    ("figueres.apertura.sumario", None, 121446, ["Abierta la sesión a las veintidos horas treinta minutos"], "Sumario del extracto", "1939-02-01", "solo v3"),
    ("figueres.apertura.texto", None, 121446, ["Abierta la sesión a las 22 horas 39"], "Extracto", "1939-02-01", "solo v3"),
    ("figueres.martinezbarrio", None, 121446, ["Lo hacemos en un trozo de la tierra catalana que, como otras distintas de España, se encuentra actualmente nuancilada", "y hollada por la planta de los invasores extranjeros"], "Diego Martínez Barrio (dentro del sumario)", "1939-02-01", "solo v3; [sic] tras «nuancilada»"),
    ("figueres.negrin", 107326, 121447, ["Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra."], "Juan Negrín", "1939-02-01", ""),
    ("figueres.nota", None, 121110, ["DE LA ULTILLA SESION QUE TUVO LUGAR EN LA CIUDAD DE FIGUERAS A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939, NO EXISTE DATO ALGUNO."], "Nota que abre el volumen de la guerra", "1936-10-01", "solo v3 (sumario de la sesión 61); [sic] tras «ULTILLA»"),
    # mexico-1945
    ("mexico.lugar", None, 121495, ["de la sesión extraordinaria celebrada en la Ciudad de México el viernes 17 de agosto de 1945"], "Carátula del extracto", "1945-08-17", "solo v3"),
    ("mexico.orden", 107371, 121500, ["Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española."], "La Presidencia (Fernández Clérigo)", "1945-08-17", ""),
    ("mexico.promesa", 107372, 121502, ["¿Prometéis solemnemente fidelidad a la República y a la Constitución?", "Si, prometo."], "La Presidencia · Diego Martínez Barrio", "1945-08-17", "«Si» sin tilde, como en el texto"),
    ("mexico.giral", 107375, 121507, ["al presentarse ante las Cortes españolas el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente desde el día en que el infortunio nos hizo cruzar la frontera de nuestra patria amada"], "José Giral", "1945-11-07", ""),
    ("mexico.permanente", None, 121466, ["sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia."], "Carátula del volumen de México", "1945-01-10", "solo v3"),
    ("mexico.editor", None, 121466, ["(México D.F.: B. Costa i Amic)"], "Carátula del volumen de México", "1945-01-10", "solo v3"),
    # El Diario
    ("diario.alba.secreta", 71329, 80305, ["Con arreglo al Reglamento, los suplicatorios han de tratarse en sesión secreta;"], "La Presidencia (Alba)", "1934-06-08", ""),
    ("diario.grito", 71330, 80306, ["Luz y taquigrafos."], "El Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ»", "1934-06-08", "sin tilde, como en el texto"),
    ("diario.alba.reglamento", 71331, 80307, ["El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías"], "La Presidencia (Alba)", "1934-06-08", "raya pegada, como en el texto"),
    ("diario.prieto.publica", 71332, 80308, ["La minoría socialista no tiene inconveniente en que esto se discuta públicamente."], "Indalecio Prieto", "1934-06-08", ""),
    ("diario.royo", 57506, 64595, ["aquí se liquida todo con luz y taquigrafos, como decía Maura"], "Antonio Royo Villanova", "1933-08-03", ""),
    ("diario.maurin", 106747, 120751, ["Hay luz y taquigrafos, los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)"], "Joaquín Maurín · Comín", "1936-07-08", ""),
    ("diario.prieto.consten", 45116, 50467, ["Por mí, que consten."], "Indalecio Prieto", "1933-02-07", ""),
    ("diario.besteiro.consten", 45115, 50466, ["Esas palabras, que no constarán en el Diario de Sesiones."], "La Presidencia (Besteiro)", "1933-02-07", ""),
    ("diario.calvo.peticion", 104406, 118058, ["supongo, Sr. Presidente de la misma, que ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones."], "José Calvo Sotelo", "1936-06-03", ""),
    ("diario.perciben.y.constan", 103250, 116697, ["(Un Sr. Diputado pronuncia palabras que no se perciben)", "Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente."], "Diario (acotaciones en la fila de Calvo Sotelo)", "1936-05-06", ""),
    ("diario.sainz", 77318, 87096, ["ese Reglamento determina que el Presidente puede incluso mandar callar a un Diputado, puede ordenar que no consten en el Diario de Sesiones sus palabras"], "Pedro Sainz Rodríguez", "1934-12-05", ""),
    ("diario.nota.liberacion", None, 121110, ["A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939"], "Nota que abre el volumen de la guerra", "1936-10-01", "solo v3"),
    ("diario.nota.volumen", None, 121110, ["EN ESTE VOLUMEN FIGURAN LOS EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO."], "Nota que abre el volumen de la guerra", "1936-10-01", "solo v3"),
    # F27: un fragmento por fila
    ("f27.1", 420, 472, ["En la imposibilidad de recoger notarialmente la prueba de estas fechorias, que no suelen hacerse con luz y taquigrafos"], "Gabriel Franco", "1931-07-20", ""),
    ("f27.2", 23898, 26612, ["se discutiese ampliamente con luz y taquigrafos y en presencia de todos los Sres. Diputados de las demás minorías"], "José Antonio Balbontín", "1932-04-09", ""),
    ("f27.3", 24658, 27477, ["la máxima garantía es la oposición libre, con luz y taquigrafos"], "José Antonio Balbontín", "1932-05-03", ""),
    ("f27.4", 55902, 62718, ["yo aquí he levantado mi voz, con luz y taquigrafos, contra los pistoleros"], "José Antonio Balbontín", "1933-07-19", ""),
    ("f27.5", 57506, 64595, ["aquí se liquida todo con luz y taquigrafos, como decía Maura"], "Antonio Royo Villanova", "1933-08-03", ""),
    ("f27.6", 71330, 80306, ["Luz y taquigrafos."], "El Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ»", "1934-06-08", ""),
    ("f27.7", 75263, 84760, ["no hay ningún reparo, ningún obstaculo ni ninguna dificultad para que se examine el presupuesto con luz y taquigrafos"], "Abilio Calderón", "1934-11-13", ""),
    ("f27.8", 79803, 89910, ["que realiza el Parlamento suele decir que hacen falta ", "luz y taquigrafos"], "Santiago Fuentes Pila", "1935-01-29", "comillas rectas del texto → “ ”"),
    ("f27.9", 99859, 112827, ["El que está agazapado en su escaño, con luz y taquigrafos, naturalmente que no quiere valerse de nocturnidad ni de obscuridad de ninguna clase."], "José Calvo Sotelo", "1935-11-22", ""),
    ("f27.10", 106747, 120751, ["Hay luz y taquigrafos, los taquigrafos recogeran eso."], "Joaquín Maurín", "1936-07-08", ""),
    # F28: órdenes, acotaciones, petición y fila ajena
    ("f28.orden.1", 13605, 15129, ['Que no constaran en el Diario de Sesiones.'], "La Presidencia (Besteiro)", "1931-12-10", ""),
    ("f28.orden.2", 45115, 50466, ['Esas palabras, que no constarán en el Diario de Sesiones.'], "La Presidencia (Besteiro)", "1933-02-07", ""),
    ("f28.orden.3", 45440, 50818, ['le aseguro que las palabras que ha pronunciado no constarán en el Diario de Sesiones.'], "La Presidencia (Besteiro)", "1933-02-09", ""),
    ("f28.orden.4", 102484, 115828, ['Esas palabras no constarán en el Diario de Sesiones.'], "La Presidencia (Jiménez de Asúa)", "1936-04-15", ""),
    ("f28.orden.5", 102486, 115830, ['Ya se ha dicho que no constarán esas palabras en el Diario de Sesiones.'], "La Presidencia (Jiménez de Asúa)", "1936-04-15", ""),
    ("f28.orden.6", 102492, 115836, ['Ya ha advertido la Presidencia que no constarán en el Diario de Sesiones esas palabras.'], "La Presidencia (Jiménez de Asúa)", "1936-04-15", ""),
    ("f28.orden.7", 103251, 116698, ['No constará en el Diario de Sesiones.'], "La Presidencia (Jiménez de Asúa)", "1936-05-06", ""),
    ("f28.orden.8", 106290, 120222, ['Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones.'], "La Presidencia (Martínez Barrio)", "1936-07-01", ""),
    ("f28.acotacion.1", 103182, 116626, ["(El Sr. Muñoz de Zafra pronuncia palabras que no se consignan por orden del Sr. Presidente"], "Diario (fila de Jesús Pabón)", "1936-05-06", ""),
    ("f28.acotacion.2", 103250, 116697, ["Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente."], "Diario (fila de Calvo Sotelo)", "1936-05-06", ""),
    ("f28.acotacion.3", 105310, 119084, ["(El orador pronuncia palabras que no constan por orden del Sr. Presidente"], "Diario (fila de Calvo Sotelo)", "1936-06-16", ""),
    ("f28.acotacion.4", 105324, 119098, ["(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)"], "Diario (fila de Suárez de Tangil)", "1936-06-16", ""),
    ("f28.acotacion.5", 106289, 120221, ["(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)"], "Diario (fila de Galarza)", "1936-07-01", ""),
    ("f28.peticion", 104406, 118058, ["ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones."], "José Calvo Sotelo", "1936-06-03", ""),
    ("f28.ajena", 64659, 72690, ["por parecerne injusto que no constara en el Diario de Sesión"], "Luis Rodríguez de Viguri", "1934-02-21", "la fórmula en otro sentido"),
    # añadidas tras la segunda lectura
    ("pistola.tumulto", 74608, 84026, ["Entre los Sres. Tirado y Oriol de la Puerta se produjo un violento altercado, llegando a agredirse dichos Sres. Diputados.—Esto determinó un verdadero tumulto en la Cámara."], "Diario (acotación en la fila de Gil Robles)", "1934-07-04", ""),
    ("figueres.castillo", 107337, 121459, ["Castillo de Figueras, a primero de Febrero, de mil novceientos treinta y nueve."], "Proposición leída en la sesión", "1939-02-01", "«novceientos» [sic]"),
    ("figueres.fotocopia", 107341, 121465, ["se indicaba que no había sido posible obtener el número 69, que contenía la sesión celebrada en el Castillo de Figueras.", "Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión"], "Nota al final del extracto", "1939-02-01", "en la V2, dentro de la última fila de la Presidencia"),
    ("figueres.votacion", 107341, 121464, ["Han votado afirmativamente los sesenta y dos señores Diputados."], "La Presidencia (Martínez Barrio)", "1939-02-01", ""),
    ("casasviejas.martinezbarrio", 46426, 51919, ['nos dijo: "En los sucesos de Casas Viejas, Sres. Diputados, por mucho que se hurgue'], "Diego Martínez Barrio", "1933-02-23", ""),
    ("diario.campoamor.lee", 5424, 6079, ["En ausencia mía y leyendo el Diario de Sesiones, pude ver en él que un doctor hablaba aquí de que no había ecuación posible"], "Clara Campoamor", "1931-10-01", ""),
    ("religiosa.art24", 6628, 7398, ["Art. 24. Todas las confesiones religiosas serán consideradas como Asociaciones sometidas a una ley especial."], "Lectura del Secretario (Ramos)", "1931-10-13", "en la v3, fila de comentarios"),
    ("sufragio.campoamor.antes", 5422, 6077, ["Sres. Diputados, lejos yo de censurar ni de atacar las manifestaciones de mi colega, Srta. Kent;"], "Clara Campoamor", "1931-10-01", ""),
    ("mexico.declaracion", None, 121568, ["Se aprueba, en votación ordinaria, la propuesta sobre la declaración del Gobierno de la República."], "Sumario del 8-XI-1945", "1945-11-08", "solo v3"),
    ("mexico.galicia", None, 121601, ["Debate sobre el Estatuto de Galicia."], "Sumario del 9-XI-1945", "1945-11-09", "solo v3"),
    ("diario.eso_no_basta", 102492, 115837, ["Eso no basta."], "Varios diputados", "1936-04-15", "en la V2, dentro de la fila de la Presidencia"),
    ("diario.cano.tachado", 82129, 92599, ["eso se ha tachado en el Diario de Sesiones."], "Dionisio Cano López", "1935-02-19", ""),
    ("diario.kent.interrupcion", 5419, 6074, ["(El Sr. Guerra del Rio: Los cavernicolas hablan de pastel.)"], "Acotación en la fila de Victoria Kent", "1931-10-01", "sin tildes, como en el texto"),
    ("diario.maura.censura", 82369, 92880, ["que los textos integros tomados del Diario de Sesiones no sean tachados ni mutilados por aquélla"], "Ruego escrito de Honorio Maura", "1935-02-20", "en la V2, dentro de una fila de la Presidencia"),
    # literales de F26 (nota emergente y tabla)
    ("voto.141-106", 5453, 6110, ["En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106."], "Diario", "1931-10-01", ""),
    ("voto.161-121", 5453, 6110, ["Total, 161.", "Total, 121."], "Diario", "1931-10-01", ""),
    ("voto.178-59", 6994, 7800, ["quedó aprobado el artículo 24 por 178 votos contra 59"], "Diario", "1931-10-13", ""),
    ("voto.368-466", 13531, 15043, ["Los Sres. Diputados que han prometido en estas Cortes suman 466; la mitad más uno, 234. Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí."], "La Presidencia (Besteiro)", "1931-12-09", ""),
    ("voto.318-19", 37177, 41627, ["votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19"], "Diario", "1932-09-09", ""),
    ("voto.318-19.mitad", 37178, 41628, ["El número de Diputados que han prometido suma 462. La mitad mas uno son 232."], "La Presidencia (Besteiro)", "1932-09-09", ""),
    ("voto.314-24", 37178, 41629, ["Total, 314.", "Total, 24."], "Diario", "1932-09-09", ""),
    ("voto.238-5", 102358, 115675, ["resultado que habían votado a favor de la proposición 238 Sres. Diputados y en contra 5"], "Diario", "1936-04-07", ""),
    ("voto.238-5.mitad", 102359, 115676, ["Los Sres. Diputados en el ejercicio del cargo son 417; la mitad más uno, 209."], "La Presidencia (Jiménez de Asúa)", "1936-04-07", ""),
    ("voto.238-5.reglamento", 102309, 115623, ["Se entenderá acordada la destitución del Presidente cuando a favor de ella se pronuncien, en votación nominal."], "El Secretario lee el Reglamento", "1936-04-07", ""),
]

d2 = lyt.v2().set_index("id")
c = lyt.v3()
out, fallos = [], []
for clave, a, b, frs, orador, fecha, nota in C:
    s2 = d2.loc[a, "speech"] if a else None
    if b is None:  # buscar la fila v3 por el primer fragmento
        hits = [r[0] for r in c.execute("select id from speeches where instr(speech, ?) > 0", (frs[0],))]
        b = hits[0] if len(hits) == 1 and a is not None and "solo V2" not in nota else None
    s3 = lyt.row3(b)["speech"] if b else None
    if a:
        assert d2.loc[a, "date"] == fecha, (clave, "fecha V2", d2.loc[a, "date"])
    if b:
        assert lyt.row3(b)["date"] == fecha, (clave, "fecha v3", lyt.row3(b)["date"])
    for fr in frs:
        if a and fr not in s2:
            fallos.append((clave, "V2", a, fr))
        if b and fr not in s3:
            fallos.append((clave, "v3", b, fr))
    if len(frs) > 1:  # en orden
        for s in (s2, s3):
            if s:
                pos = [s.index(fr) for fr in frs]
                assert pos == sorted(pos), (clave, "orden")
    if clave == "sufragio.final":
        assert s2.endswith(frs[0]) and s3.endswith(frs[0])
    out.append({"clave": clave, "v2": a, "v3": b, "fragmentos": frs, "orador": orador, "fecha": fecha, "nota": nota})
if fallos:
    for f in fallos:
        print("✗", f)
    raise SystemExit(1)
print(len(out), "citas comprobadas;", sum(len(x["fragmentos"]) for x in out), "fragmentos")
for x in out:
    if x["v3"] is None or x["v2"] is None:
        print("  solo una edición:", x["clave"], x["v2"], x["v3"])


# ── comparación con docs/marcadores/sesiones.md y diario.md ──
CIT = {x["clave"]: x for x in out}
for x in out:
    if x["v2"]:
        M[f"cita.{x['clave']}.V2"] = {"v": x["v2"]}
        M[f"cita.{x['clave']}.palabras"] = {"v": int(d2.loc[x["v2"], "nwords"])}
    if x["v3"]:
        M[f"cita.{x['clave']}.v3"] = {"v": x["v3"]}
FAM = {"num": "s", "filas": "filas", "palabras": "pal", "diputados_sp": "dip_sp", "largas": "largas",
       "filas_v3": "filas_v3", "habla_v3": "habla_v3", "diario_num": None, "paginas": None}
errores = comparadas = 0
for tabla in ("sesiones.md", "diario.md"):
    for ln in open(SITIO / "docs" / "marcadores" / tabla, encoding="utf-8"):
        m_ = re.match(r"^\| `([^`]+)` \| ([^|]+?) \|", ln)
        if not m_:
            continue
        k, esperado = m_.group(1), m_.group(2).split("→")[0].strip()
        if k not in M:
            continue  # de otro dueño: lo comprueba su guion
        v = M[k]["v"]
        calc = str(v)
        e = esperado.replace(".", "") if re.fullmatch(r"[\d.]+", esperado) else esperado
        if isinstance(v, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", v):
            continue  # fechas: se comparan en el exportador (formato corto)
        comparadas += 1
        if e != calc:
            print(f"✗ {tabla}: {k} esperado {esperado!r} y calculado {calc!r}")
            errores += 1
print(f"comparación con las tablas: {comparadas} marcadores,", "sin diferencias" if not errores else f"{errores} diferencias")
sys.exit(1 if errores else 0)
