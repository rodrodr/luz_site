#!/usr/bin/env python3
"""Clima de sala por sesión y por mes, sobre el CSV V2 depositado.

Qué mide: las ACOTACIONES impresas en el Diario dentro de cada intervención («(Aplausos.)», «(Rumores.)»,
«(Campanilla.)», «(Risas.)»…), clasificadas en cuatro clases por el MISMO motor que colorea el lector del
explorador (R2.diario.parse_speech + climate; copia en motor/engine.js):
  aplauso  · Aplausos, Aprobación, «Muy bien», «¡Bravo!»
  conflicto· Rumores, Protestas, Interrupciones, Voces
  orden    · Presidencia: campanilla, llamadas al orden
  neutral  · Risas, Interjecciones, Gestos, Asentimiento, Denegaciones, Pausa, Piden la palabra

Salvedades que viajan con el dato: la clasificación es automática y tolera errores de OCR, pero alguna
acotación puede quedar mal clasificada; es lo que ANOTÓ el taquígrafo, no una medida del tono; V2 conserva
los 729 turnos enterrados y el material impreso dentro de las filas (se corrige solo en la v3, sin depositar).

Salidas: clima_sesiones_v2.json (755 sesiones) y clima_meses_v2.json. Caché por fila en _cache/.
Uso: python3 calc_clima.py   (≈10 s; 8 procesos node en paralelo)
"""
from __future__ import annotations

import json
import subprocess
from concurrent.futures import ThreadPoolExecutor

import pandas as pd

from comun import AQUI, FUENTE, cargar_v2, escribir, roles_presidencia

PARTES = 8
CACHE = AQUI / "_cache"
CACHE.mkdir(exist_ok=True)


def correr(k: int) -> str:
    r = subprocess.run(["node", str(AQUI / "motor" / "clima_v2.mjs"), str(CACHE / f"clima_in_{k}.jsonl"),
                        str(CACHE / f"clima_out_{k}.jsonl")], check=True, capture_output=True, text=True)
    return r.stderr.strip()


def main() -> None:
    df = roles_presidencia(cargar_v2(con_texto=True))
    # 1) trocear la entrada para node
    trozos = [df.iloc[i::PARTES] for i in range(PARTES)]
    for k, t in enumerate(trozos):
        with open(CACHE / f"clima_in_{k}.jsonl", "w", encoding="utf-8") as f:
            for rid, sp, rn, tx in zip(t["id"], t["speaker"], t["rep_name"], t["speech"]):
                f.write(json.dumps({"id": int(rid), "speaker": sp if isinstance(sp, str) else "",
                                    "rep_name": rn if isinstance(rn, str) else "",
                                    "speech": tx if isinstance(tx, str) else ""}, ensure_ascii=False) + "\n")
    # 2) motor del explorador en paralelo
    with ThreadPoolExecutor(max_workers=PARTES) as ex:
        for msg in ex.map(correr, range(PARTES)):
            print(msg)
    # 3) reunir
    recs = []
    for k in range(PARTES):
        with open(CACHE / f"clima_out_{k}.jsonl", encoding="utf-8") as f:
            recs.extend(json.loads(l) for l in f if l.strip())
    errores = [r for r in recs if "err" in r]
    cl = pd.DataFrame([r for r in recs if "err" not in r]).rename(
        columns={"ap": "aplauso", "co": "conflicto", "or": "orden", "ne": "neutral", "n": "unidades"})
    etiquetas = {}
    for r in recs:
        for e, v in (r.get("lab") or {}).items():
            etiquetas[e] = etiquetas.get(e, 0) + v
    cl = cl.drop(columns=["lab"])
    d = df.drop(columns=["speech"]).merge(cl, on="id", how="left")
    for c in ["unidades", "aplauso", "conflicto", "orden", "neutral"]:
        d[c] = d[c].fillna(0).astype(int)
    d[["id", "date", "num_session", "rol", "presidencia", "nwords", "unidades", "aplauso", "conflicto", "orden",
       "neutral"]].to_pickle(CACHE / "clima_filas_v2.pkl")

    CL = ["aplauso", "conflicto", "orden", "neutral"]
    # 4) por sesión
    ses = []
    for (fecha, num), g in d.groupby(["date", "num_session"], sort=True):
        pal = int(g.nwords.sum())
        top = g.sort_values(["conflicto", "nwords"], ascending=[False, False]).iloc[0]
        ses.append({
            "fecha": fecha, "sesion": int(num), "leg": g.legislature.iloc[0],
            "filas": int(len(g)), "palabras": pal,
            "u": {c: int(g[c].sum()) for c in CL},
            "filas_con_acotacion": int((g.unidades > 0).sum()),
            "conflicto_x10k": round(g.conflicto.sum() * 1e4 / pal, 2) if pal else None,
            "aplauso_x10k": round(g.aplauso.sum() * 1e4 / pal, 2) if pal else None,
            "mas_conflictiva": None if top.conflicto == 0 else {
                "id_v2": int(top.id), "orden": int(top["order"]), "orador": top.speaker,
                "diputado": top.rep_name if isinstance(top.rep_name, str) else None,
                "palabras": int(top.nwords), "conflicto": int(top.conflicto), "aplauso": int(top.aplauso)},
        })
    # 5) por mes
    meses = []
    for mes, g in d.groupby("mes", sort=True):
        pal = int(g.nwords.sum())
        meses.append({"mes": mes, "sesiones": int(g.groupby(["date", "num_session"]).ngroups),
                      "palabras": pal, "u": {c: int(g[c].sum()) for c in CL},
                      "x10k": {c: round(g[c].sum() * 1e4 / pal, 2) for c in CL} if pal else None})
    tot = {c: int(d[c].sum()) for c in CL}
    meta = {
        "fuente": FUENTE, "unidad": "sesión = (date, num_session) del CSV V2",
        "motor": "R2.diario.parse_speech + R2.diario.climate del explorador (motor/engine.js)",
        "clases": {"aplauso": "Aplausos, Aprobación, «Muy bien», «¡Bravo!»",
                   "conflicto": "Rumores, Protestas, Interrupciones, Voces",
                   "orden": "Presidencia: campanilla, llamadas al orden",
                   "neutral": "Risas, Interjecciones, Gestos, Asentimiento, Denegaciones, Pausa, Piden la palabra"},
        "totales": {"unidades": int(d.unidades.sum()), "por_clase": tot,
                    "filas_con_alguna": int((d.unidades > 0).sum()), "filas": int(len(d)),
                    "palabras": int(d.nwords.sum()), "errores_motor": len(errores)},
        "por_etiqueta": dict(sorted(etiquetas.items(), key=lambda x: -x[1])),
        "salvedades": [
            "Clasificación automática de acotaciones; alguna puede quedar mal clasificada.",
            "Mide lo que anotó el taquígrafo, no el tono ni la intención.",
            "V2 conserva turnos enterrados y material impreso dentro de las filas; la v3 del explorador los separa, "
            "por eso sus cifras (76.678 unidades) no coinciden exactamente con las de V2.",
            "La guerra (7 sesiones) y el exilio (5) tienen muy poco texto: normalizar por palabras y avisar.",
            "Los ids son los de V2; el explorador usa ids renumerados (v3) y no admite enlaces profundos.",
        ],
    }
    escribir("clima_sesiones_v2.json", {"_meta": meta, "sesiones": ses})
    escribir("clima_meses_v2.json", {"_meta": {k: meta[k] for k in ("fuente", "motor", "clases", "salvedades")},
                                     "meses": meses})


if __name__ == "__main__":
    main()
