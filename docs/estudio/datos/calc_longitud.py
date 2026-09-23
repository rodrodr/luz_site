#!/usr/bin/env python3
"""Longitud de las intervenciones (CSV V2 depositado): trámite frente a discurso.

1) Histograma en tramos logarítmicos de nwords, por legislatura y por papel (Presidencia / resto).
2) Curva de concentración: qué parte de las palabras se lleva qué parte de las filas (100 puntos).
3) Las 12 filas más largas, marcando si están a nombre de la Presidencia: en V2 las más largas suelen ser
   turnos ENTERRADOS (p. ej. la 25979, a nombre de Besteiro, contiene el discurso de Azaña del 27-05-1932).

Salida: longitud_v2.json. Uso: python3 calc_longitud.py
"""
from __future__ import annotations

import numpy as np

from comun import FUENTE, LEGISLATURAS, cargar_v2, escribir, roles_presidencia

TRAMOS = [(0, 5), (6, 10), (11, 20), (21, 50), (51, 100), (101, 300), (301, 1000), (1001, 3000),
          (3001, 10000), (10001, 10 ** 9)]


def hist(s):
    return [int(((s >= a) & (s <= b)).sum()) for a, b in TRAMOS]


def main() -> None:
    df = roles_presidencia(cargar_v2())
    h = {}
    for leg in ["todas"] + LEGISLATURAS:
        g = df if leg == "todas" else df[df.legislature == leg]
        h[leg] = {"presidencia": hist(g.loc[g.presidencia, "nwords"]), "resto": hist(g.loc[~g.presidencia, "nwords"]),
                  "pal_presidencia": [int(g.loc[g.presidencia & g.nwords.between(a, b), "nwords"].sum()) for a, b in TRAMOS],
                  "pal_resto": [int(g.loc[~g.presidencia & g.nwords.between(a, b), "nwords"].sum()) for a, b in TRAMOS]}
    w = np.sort(df.nwords.values)[::-1]
    cw = np.cumsum(w) / w.sum()
    curva = [[p, round(float(cw[max(0, int(len(w) * p / 100) - 1)]), 4)] for p in range(1, 101)]
    top = df.sort_values("nwords", ascending=False).head(12)
    largas = [{"id_v2": int(r.id), "fecha": r.date, "sesion": int(r.num_session), "orador": r.speaker,
               "diputado": r.rep_name if isinstance(r.rep_name, str) else None, "palabras": int(r.nwords),
               "presidencia": bool(r.presidencia)} for r in top.itertuples()]
    s = df.nwords
    datos = {
        "_meta": {
            "fuente": FUENTE,
            "tramos": [f"{a}-{b}" if b < 10 ** 9 else f">{a - 1}" for a, b in TRAMOS],
            "resumen": {"filas": int(len(s)), "mediana": float(s.median()), "media": round(float(s.mean()), 1),
                        "hasta_50": int((s <= 50).sum()), "pct_hasta_50": round(float((s <= 50).mean() * 100), 2),
                        "mas_de_300": int((s > 300).sum()),
                        "pct_palabras_en_mas_de_300": round(float(s[s > 300].sum() * 100 / s.sum()), 2),
                        "presidencia_filas": int(df.presidencia.sum()),
                        "presidencia_pct_filas": round(float(df.presidencia.mean() * 100), 2),
                        "presidencia_pct_hasta_50": round(float(df.loc[s <= 50, "presidencia"].mean() * 100), 2)},
            "curva": "[% de filas más largas, % de palabras que acumulan]",
            "salvedades": [
                "nwords cuenta palabras separadas por espacios (definición del CSV).",
                "Longitud no es importancia: una fila breve puede ser decisiva (una votación, una interrupción).",
                "En V2 algunas filas muy largas de la Presidencia son turnos enterrados o documentos leídos.",
            ],
        },
        "histograma": h, "curva": curva, "mas_largas": largas,
    }
    escribir("longitud_v2.json", datos)
    print(datos["_meta"]["resumen"])
    print([(x["id_v2"], x["orador"], x["diputado"], x["palabras"], x["presidencia"]) for x in largas[:6]])
    print("10% filas ->", curva[9], " 20% ->", curva[19])


if __name__ == "__main__":
    main()
