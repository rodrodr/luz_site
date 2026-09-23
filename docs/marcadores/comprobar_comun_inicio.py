#!/usr/bin/env python3
"""Recalcula, sobre las fuentes primarias, cada cifra que usan `docs/copy_es/comun.md` e `inicio.md`.

No escribe nada en el sitio: imprime la tabla «clave · valor calculado · valor esperado · base» y sale con error si
algo no cuadra. Los valores esperados son los de `docs/marcadores/comun.md` e `inicio.md`; el exportador
(`exportador/modulos/base.py` y `sesiones.py`) debe dar exactamente estos.

Fuentes (se comprueba su huella antes de calcular):
  V2        /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv            MD5 360332a0ff1327671530f15eed46ac0c
  v3        /Users/rodrodr/.cache/luz_site/corpus.sqlite                          sha256 3a0d8b2d…
  proyecto  2REP_Explorer/standalone/data/sessions.json                           sha256 b3295e99…
  dv        exportador/instantaneas/2026-09-22/dv_thqcmi*.json (API de Dataverse)
  explorador exportador/instantaneas/2026-09-22/explorador.json (manifiesto del explorador publicado)

Uso:  python3 docs/marcadores/comprobar_comun_inicio.py      (unos 30 s: lee el CSV entero)
"""
from __future__ import annotations

import hashlib
import unicodedata
import html
import json
import re
import sqlite3
import sys
from pathlib import Path

import pandas as pd

SITIO = Path(__file__).resolve().parents[2]
V2 = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv")
V3 = Path("/Users/rodrodr/.cache/luz_site/corpus.sqlite")
PROYECTO = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json")
INST = SITIO / "exportador" / "instantaneas" / "2026-09-22"

HUELLAS = {
    V2: ("md5", "360332a0ff1327671530f15eed46ac0c"),
    V3: ("sha256", "3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15"),
    PROYECTO: ("sha256", "b3295e99f45af95a4d6f47f910fcacea7fc5f6da98ffde38df726fda1d7231da"),
}


def huella(p: Path, alg: str) -> str:
    h = hashlib.new(alg)
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


for p, (alg, esperada) in HUELLAS.items():
    if huella(p, alg) != esperada:
        sys.exit(f"✗ {p.name}: la huella {alg} no es la esperada. No se calcula nada.")

d = pd.read_csv(V2, sep=";", dtype={"rep_id": "Int64", "date": str, "speech": str, "legislature": str})
d["nwords"] = d["nwords"].astype(int)
fila = d.set_index("id")
con = sqlite3.connect(V3)
v3 = lambda q: con.execute(q).fetchall()  # noqa: E731
S = json.load(open(PROYECTO, encoding="utf-8"))["sessions"]

res: list[tuple[str, object, object, str]] = []


def ok(clave: str, calculado, esperado, base: str):
    res.append((clave, calculado, esperado, base))


def ses(fecha: str, num: int) -> pd.DataFrame:
    return d[(d.date == fecha) & (d.num_session == num)]


# ── comun ──────────────────────────────────────────────────────────────────────────────────
ok("filas.V2", len(d), 107551, "V2")
ok("filas.v3", v3("select count(*) from speeches")[0][0], 121700, "v3")
cita = json.load(open(INST / "dv_thqcmi_cita.json", encoding="utf-8"))["cuerpo"]["data"]["message"]
cita = re.sub(r"<[^>]+>", "", html.unescape(cita))
ok("dv.thqcmi.autores", cita.split(", 2026,")[0],
   "Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo", "dv")
ok("dv.thqcmi.cita", cita,
   'Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, '
   'Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic, 1931–1945", '
   'https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2', "dv")
for conjunto, clave, esperada in (("thqcmi", "dv.version", "V2.0"), ("cgocus", "dv.cgocus.version", "V1.1")):
    lv = json.load(open(INST / f"dv_{conjunto}.json", encoding="utf-8"))["cuerpo"]["data"]["latestVersion"]
    ok(clave, f"V{lv['versionNumber']}.{lv['versionMinorNumber']}", esperada, "dv")
cita_cg = json.load(open(INST / "dv_cgocus_cita.json", encoding="utf-8"))["cuerpo"]["data"]["message"]
ok("dv.cgocus.cita (acaba en «Harvard Dataverse, V1, UNF…»)",
   re.sub(r"<[^>]+>", "", html.unescape(cita_cg)).split("Harvard Dataverse, ")[1][:3], "V1,", "dv")

# ── inicio · portada y tesis ───────────────────────────────────────────────────────────────
ok("fila.luz.texto.V2", fila.loc[71330, "speech"], "Luz y taquigrafos.", "V2")
ok("fila.luz.texto.v3", v3("select speech from speeches where id=80306")[0][0], "Luz y taquigrafos.", "v3")
ok("fila.luz.fecha", fila.loc[71330, "date"], "1934-06-08", "V2")
ok("fila.luz.id.V2", 71330, 71330, "V2")
ok("fila.luz.id.v3", v3("select id from speeches where date='1934-06-08' and speech='Luz y taquigrafos.'")[0][0], 80306, "v3")
ok("fila.luz.nwords", int(fila.loc[71330, "nwords"]), 3, "V2")
ok("[control] V2 71329 recuerda la sesión secreta",
   "los suplicatorios han de tratarse en sesión secreta" in fila.loc[71329, "speech"], True, "V2")
ok("[control] V2 71331: la Presidencia no vio quién interrumpía",
   "no he visto quién ha interrumpido" in fila.loc[71331, "speech"], True, "V2")
claves = d.groupby(["date", "num_session"]).size()
ok("sesiones", len(claves), 755, "V2")
ok("[control] fechas distintas", d.date.nunique(), 752, "V2")

# ── inicio · calendario (F01c) ─────────────────────────────────────────────────────────────
ok("sesion.primera", d.date.min(), "1931-07-14", "V2")
ok("sesion.ultima", d.date.max(), "1945-11-09", "V2")
for leg, g in d.groupby("legislature"):
    nums = sorted(g.num_session.unique())
    ok(f"[control] numeración {leg} sin huecos ni repetidos", (nums == list(range(1, nums[-1] + 1)))
       and g.groupby("num_session").date.nunique().max() == 1, True, "V2")
tras = d[d.date > "1936-07-18"]
ok("sesiones.tras_18jul", tras.groupby(["date", "num_session"]).ngroups, 14, "V2")
ok("palabras.tras_18jul.pct", round(tras.nwords.sum() / d.nwords.sum(), 6), 0.008348, "V2")
ok("[control] palabras tras el 18-VII-1936", int(tras.nwords.sum()), 203167, "V2")
ok("[control] palabras del corpus (nwords)", int(d.nwords.sum()), 24335896, "V2")
series_tras = {s["diario"] for s in S if s["date"] > "1936-07-18"}
ok("[control] las 14 son extractos oficiales (proyecto)", all(x.startswith("Extracto oficial") for x in series_tras)
   and sum(1 for s in S if s["date"] > "1936-07-18") == 14, True, "proyecto")
meses = set(d.date.str[:7])
ok("meses.con_sesion", len(meses), 64, "V2")
hueco = [str(p) for p in pd.period_range("1939-03", "1944-12", freq="M")]
ok("meses.salto", len(hueco) if not (set(hueco) & meses) else -1, 70, "V2")

# ── inicio · votaciones (F26 en su versión de Inicio) ──────────────────────────────────────
VOTOS = [  # clave, fila V2 con el resultado, patrón literal, sí, no, fila v3 con la lista
    ("161-121", 5453, r"Total, 161\..*Total, 121\.", 161, 121, 6110),
    ("178-59", 6994, r"178 votos contra 59", 178, 59, 7800),
    ("368-466", 13531, r"suman 466; la mitad más uno, 234\. Han tomado parte en la votación 368", 368, 0, 15043),
    ("318-19", 37177, r"Total, 318\..*Total, 19\.", 318, 19, 41627),
    ("314-24", 37178, r"Total, 314\..*Total, 24\.", 314, 24, 41629),
    ("238-5", 102358, r"Total, 238\..*Total, 5\.", 238, 5, 115675),
]
for k, i2, pat, si, no, i3 in VOTOS:
    ok(f"voto.{k} (texto literal en V2 {i2})", bool(re.search(pat, fila.loc[i2, "speech"], re.S)), True, "V2")
    ok(f"voto.{k}.si", si, si, "V2")
    ok(f"voto.{k}.no", no, no, "V2")
    ok(f"voto.{k}.V2", i2, i2, "V2")
    ok(f"voto.{k}.v3", i3, i3, "v3")
ok("voto.n", len(VOTOS), 6, "V2")
# fase 2 (corrector del copy): el total al lado de las seis «escogidas» (plan H3); definición común con Sesiones
_pleg = d.speech.fillna("").map(lambda x: unicodedata.normalize("NFKD", x).encode("ascii", "ignore").decode().lower())
_mk = _pleg.str.contains(r"senores que (?:dijeron|han dicho) (?:si|no)\b", regex=True)
ok("voto.listas.sesiones", d[_mk].groupby(["date", "num_session"]).ngroups, 405, "V2")
ok("[control] V2 13525 trae la lista de la Constitución (Total, 368)", "Total, 368." in fila.loc[13525, "speech"], True, "V2")
ok("[control] mitad más uno: 232 de 462 (V2 37178)", "suma 462. La mitad mas uno son 232" in fila.loc[37178, "speech"], True, "V2")
ok("[control] mitad más uno: 209 de 417 (V2 102359)", "son 417; la mitad más uno, 209" in fila.loc[102359, "speech"], True, "V2")
ok("[control] el art. 34 es el del voto de «uno y otro sexo» (V2 5335)", "uno y otro sexo" in fila.loc[5335, "speech"], True, "V2")
ok("[control] art. 24: órdenes religiosas (V2 6968)", "Ordenes religiosas" in fila.loc[6968, "speech"], True, "V2")
ok("[control] 7-IV-1936: art. 81 y decreto de disolución (V2 102304)",
   "artículo 81" in fila.loc[102304, "speech"] and "decreto de disolución" in fila.loc[102304, "speech"], True, "V2")
listas = d.speech.fillna("").str.count(r"Se[ñn]ores que (?:dijeron|han dicho) s[ií]\s*:")
ok("[control] listas «Señores que dijeron sí» en el texto (cota inferior: el OCR rompe algún encabezado)",
   int(listas.sum()), 962, "V2")

# ── inicio · la fila ───────────────────────────────────────────────────────────────────────
ok("fila.presidencia.texto", fila.loc[5423, "speech"], "Ruego a la Cámara que guarde silencio.", "V2")
ok("[control] v3 6078, mismo texto", v3("select speech from speeches where id=6078")[0][0],
   "Ruego a la Cámara que guarde silencio.", "v3")
ok("fila.presidencia.nwords", int(fila.loc[5423, "nwords"]), 7, "V2")
ok("fila.campoamor.empieza", fila.loc[5424, "speech"].startswith("Yo ruego a la Cámara que me escuche en silencio"), True, "V2")
ok("[control] v3 6079, mismo comienzo",
   v3("select speech from speeches where id=6079")[0][0].startswith("Yo ruego a la Cámara que me escuche en silencio"), True, "v3")
ok("fila.campoamor.nwords", int(fila.loc[5424, "nwords"]), 1460, "V2")
ok("[control] 5423 y 5424, seguidas en la sesión 48", (fila.loc[5424, "order"] - fila.loc[5423, "order"],
   fila.loc[5423, "date"], fila.loc[5424, "num_session"]), (1, "1931-10-01", 48), "V2")

# ── inicio · puertas ───────────────────────────────────────────────────────────────────────
PUERTAS = [("1931-10-01", 48, 395), ("1931-10-13", 55, 378), ("1932-05-27", 173, 44), ("1933-02-02", 288, 155),
           ("1934-07-04", 112, 255), ("1936-06-16", 45, 159), ("1936-07-01", 54, 125), ("1939-02-01", 69, 16)]
for f, n, esperado in PUERTAS:
    ok(f"sesion.{f}-{n}.filas", len(ses(f, n)), esperado, "V2")
mex = [("1945-08-17", 71), ("1945-11-07", 72), ("1945-11-08", 73), ("1945-11-09", 74)]
ok("puerta.mexico-1945.filas", sum(len(ses(f, n)) for f, n in mex), 183, "V2")
ok("puerta.antesala-1936.filas", len(ses("1936-06-16", 45)) + len(ses("1936-07-01", 54)), 284, "V2")
ok("puerta.mexico-1945.sesiones", sum(1 for f, n in mex if len(ses(f, n))), 4, "V2")
cola = d[(d.date == "1931-10-01")].sort_values("order").tail(5)
ok("[control] acta del 1-X-1931 truncada: cinco «Pido la palabra.» y la última acaba en «El Sr. Ministro de»",
   (list(cola.id), cola.speech.str.startswith("Pido la palabra.").all(), cola.speech.iloc[-1].endswith("El Sr. Ministro de")),
   ([5788, 5789, 5790, 5791, 5792], True, True), "V2")
inc = [i["tipo"] for s in S if s["date"] == "1931-10-01" for i in s["incidents"]]
ok("[control] incidencia truncated_end de la sesión 48 (proyecto)", inc, ["truncated_end"], "proyecto")
ok("[control] «España ha dejado de ser católica» en V2 6748", "España ha dejado de ser católica" in fila.loc[6748, "speech"], True, "V2")

# ── inicio · por dónde empezar ─────────────────────────────────────────────────────────────
dv = json.load(open(INST / "dv_thqcmi.json", encoding="utf-8"))
dvd = dv.get("cuerpo", dv).get("data", dv.get("cuerpo", dv))
tam = next(f["dataFile"]["filesize"] for f in dvd["latestVersion"]["files"] if f["label"] == "2REP_Diaries.csv")
ok("dv.csv.bytes", tam, 165785782, "dv")
ok("[control] dv.csv.bytes|peso", f"{tam / 1048576:.1f}".replace(".", ",") + " MB", "158,1 MB", "dv")
ex = json.load(open(INST / "explorador.json", encoding="utf-8"))["corpus_servido"]
ok("explorador.gz.bytes", ex["bytes_gz"], 111733652, "explorador")
ok("[control] explorador.gz.bytes|peso_dec0 (D-26 (a), unidad decimal)", f"{round(ex['bytes_gz'] / 1_000_000)} MB", "112 MB", "explorador")
ok("[control] el explorador sirve la v3 (sha256 del manifiesto)", ex["sha256"][:8], "3a0d8b2d", "explorador")

# ── informe ────────────────────────────────────────────────────────────────────────────────
fallos = 0
for k, c, e, b in res:
    bien = (abs(c - e) < 1e-6) if isinstance(e, float) else c == e
    fallos += not bien
    print(f"{'✓' if bien else '✗'} {k:<70} {b:<10} {str(c)[:60]}" + ("" if bien else f"   ≠ esperado {e!r}"))
print(f"\n{len(res) - fallos} de {len(res)} comprobaciones correctas.")
sys.exit(1 if fallos else 0)
