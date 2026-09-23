#!/usr/bin/env python3
"""Las 31 bibliotecas del proyecto que ofrece el explorador, situadas en el tiempo (base v3, SIN DEPOSITAR).

ÚNICA figura de esta carpeta que no sale del CSV V2: las bibliotecas se definen sobre la matriz resegmentada
v3 (2REP_Diaries_v3, 121.700 filas, ids renumerados) que sirve el explorador. Se leen los .2replib
publicados por tools/bibliotecas.py (2REP_Explorer/dist/bibliotecas/) y se cruzan con la copia de la base
servida (corpus.sqlite, sha256 3a0d8b2d…) y con el papel de cada orador calculado con el motor del explorador
(landing/clima/*.jsonl, campo chair).

Por biblioteca: entradas, palabras, sesiones [(fecha, num_session, entradas)], primera y última fecha,
% de entradas de la Presidencia y 5 diputados con más palabras fuera de la Presidencia. Las sesiones se
identifican por (fecha, num_session), la misma clave que el calendario V2 (sesiones_v2.json), de modo que
el sitio puede resaltar en el calendario las sesiones de una biblioteca.

Salida: bibliotecas_v3.json. Uso: python3 calc_bibliotecas.py
"""
from __future__ import annotations

import json
import sqlite3
from collections import Counter
from pathlib import Path

from comun import escribir

LIBS = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/dist/bibliotecas")
ESC = Path("/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/landing")
DB = ESC / "corpus" / "corpus.sqlite"
CLIMA = sorted((ESC / "clima").glob("part*.jsonl"))
ORDEN = ["L1", "L2-B17", "L2-B1", "L2-B2", "L2-B3", "L2-B18", "L2-B4", "L2-B19", "L2-B5", "L2-B6", "L2-B7", "L2-B20",
         "L2-B21", "L2-B22", "L2-B23", "L2-B24", "L2-B8", "L2-B9", "L2-B25", "L2-B10", "L2-B11", "L2-B26", "L2-B12",
         "L2-B13", "L2-B14", "L2-B15", "L2-B16", "L3-nucleo", "L3-externo", "L3-interno", "L4"]


def main() -> None:
    chair = {}
    for p in CLIMA:
        for l in p.read_text(encoding="utf-8").splitlines():
            r = json.loads(l)
            chair[r["id"]] = bool(r.get("chair"))
    db = sqlite3.connect(f"file:{DB}?mode=ro", uri=True)
    fila = {r[0]: r[1:] for r in db.execute(
        "select id, date, num_session, nwords, rep_name, party, speaker from speeches")}
    out = []
    for f in sorted(LIBS.glob("*.2replib")):
        d = json.loads(f.read_text(encoding="utf-8"))
        assert d["corpus"] == "2REP_Diaries_v3"
        clave = d["generado"]["biblioteca"]
        ids = [it["speech_id"] for it in d["items"]]
        filas = [fila[i] for i in ids]
        ses = Counter((r[0], r[1]) for r in filas)
        pal = sum(r[2] for r in filas)
        dip = Counter()
        for i, r in zip(ids, filas):
            if not chair.get(i) and r[3] and r[5] not in ("SUMARIO", "COMENTARIOS") and r[3] != "Sin identificar":
                dip[(r[3], r[4])] += r[2]
        out.append({
            "clave": clave, "nombre": d["collection"]["name"], "descripcion": d["collection"]["description"],
            "entradas": len(ids), "palabras": pal,
            "desde": min(r[0] for r in filas), "hasta": max(r[0] for r in filas),
            "sesiones": [[fe, int(n), c] for (fe, n), c in sorted(ses.items())],
            "pct_presidencia": round(sum(chair.get(i, False) for i in ids) * 100 / len(ids), 1),
            "top_sin_presidencia": [[n, p, w] for (n, p), w in dip.most_common(5)],
        })
    out.sort(key=lambda b: ORDEN.index(b["clave"]))
    assert len(out) == 31 and sum(b["entradas"] for b in out) == 24_029
    datos = {
        "_meta": {
            "fuente": "Explorador (v3, SIN DEPOSITAR): 2REP_Explorer/dist/bibliotecas/*.2replib (tools/bibliotecas.py, "
                      "2026-09-16) + corpus.sqlite servido (sha256 3a0d8b2d…) + papel del orador con el motor del "
                      "explorador (landing/clima/*.jsonl).",
            "bibliotecas": len(out), "entradas": sum(b["entradas"] for b in out),
            "grupos": {"L1": "Discursos", "L2": "Debates", "L3": "Sesiones", "L4": "Anécdotas y amenazas"},
            "salvedades": [
                "Base v3 (121.700 filas), no el CSV depositado: los ids no sirven en V2.",
                "«Discursos principales» dice 17 discursos y trae 29 intervenciones: un discurso puede ocupar "
                "varias filas.",
                "Las L3 incluyen SUMARIO y COMENTARIOS (el acta entera); las demás, no.",
                "L3-interno sale del índice IRP, cuya definición no está publicada (solo en el código local "
                "tools/indice_reaccion_sesiones.py).",
                "Once debates se añadieron a partir de Cabrera (1995); los criterios de selección están en "
                "docs/BIBLIOTECAS_PROPUESTA.md (no publicado; la web devuelve 404 para docs/…).",
            ],
        },
        "bibliotecas": out,
    }
    escribir("bibliotecas_v3.json", datos)
    for b in out:
        print(f'{b["clave"]:10s} {b["entradas"]:>5} {b["palabras"]:>9,} {len(b["sesiones"]):>3} ses '
              f'{b["desde"]}→{b["hasta"]} pres {b["pct_presidencia"]}%')


if __name__ == "__main__":
    main()
