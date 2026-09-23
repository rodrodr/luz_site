#!/usr/bin/env python3
"""Reparto de la palabra por ideología y por familia política, legislatura a legislatura (CSV V2 depositado).

Para cada legislatura × ideología (7 posiciones + sin identificar) y × familia: filas y palabras de todo el
CSV, de la Presidencia y sin la Presidencia, y diputados distintos que hablan fuera de la Presidencia.
Añade, como contraste, el censo de diputados por ideología de Afinidades Elegidas (doi:10.7910/DVN/CGOCUS,
representative_metadata: 1.446 pares diputado-legislatura), tal como lo agregó figs/afinidades/data/afin_resumen.json.
OJO: Afinidades llama 1933-1936 a la legislatura que el CSV llama 1933-1935.

Salida: reparto_v2.json. Uso: python3 calc_reparto.py
"""
from __future__ import annotations

import json
from pathlib import Path

from comun import FUENTE, IDEO_ETIQ, IDEOLOGIAS, LEGISLATURAS, cargar_v2, escribir, normalizar, roles_presidencia

AFIN = Path("/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/data/afin_resumen.json")
AFIN_LEG = {"1931-1933": "1931-1933", "1933-1935": "1933-1936", "1936-1939": "1936-1939"}


def bloque(g, clave):
    out = {}
    for k, h in g.groupby(clave):
        r = h[~h.presidencia]
        out[k] = {"filas": int(len(h)), "pal": int(h.nwords.sum()),
                  "filas_pres": int(h.presidencia.sum()), "pal_pres": int(h.loc[h.presidencia, "nwords"].sum()),
                  "filas_sp": int(len(r)), "pal_sp": int(r.nwords.sum()),
                  "dip_sp": int(r.rep_id.dropna().nunique())}
    return out


def main() -> None:
    df = normalizar(roles_presidencia(cargar_v2()))
    afin = json.loads(AFIN.read_text(encoding="utf-8"))
    res = {}
    for leg in LEGISLATURAS:
        g = df[df.legislature == leg]
        a = afin[AFIN_LEG[leg]]
        res[leg] = {
            "total": {"filas": int(len(g)), "pal": int(g.nwords.sum()),
                      "filas_pres": int(g.presidencia.sum()), "pal_pres": int(g.loc[g.presidencia, "nwords"].sum()),
                      "sesiones": int(g.groupby(["date", "num_session"]).ngroups)},
            "ideologia": bloque(g, "ideo"),
            "familia": bloque(g, "familia"),
            "censo_afinidades": {"leg_afinidades": AFIN_LEG[leg], "diputados": a["diputados"],
                                 "por_ideologia": a["ideologia"], "por_familia": a["familias"]},
        }
    datos = {
        "_meta": {
            "fuente": FUENTE,
            "ideologias": {k: IDEO_ETIQ[k] for k in IDEOLOGIAS + ["NA"]},
            "claves": {"pal": "palabras (nwords)", "_pres": "Presidencia", "_sp": "sin Presidencia",
                       "dip_sp": "diputados distintos fuera de la Presidencia"},
            "censo": "Afinidades Elegidas, doi:10.7910/DVN/CGOCUS V1.1 (vía figs/afinidades/data/afin_resumen.json); "
                     "cuenta diputados del censo por legislatura, incluidos sustitutos; no son escaños.",
            "salvedades": [
                "La ideología es la del partido del diputado (escala de 7 posiciones, codificación de Llamazares), "
                "no la del individuo; «Republicanos» mezcla centro, centro-derecha e izquierda.",
                "Con Presidencia, Socialista (Besteiro) y Liberales (Alba) salen inflados: usar «sin Presidencia».",
                "Las etiquetas de la tercera legislatura difieren: CSV 1936-1939 (con las 5 sesiones de 1945), "
                "Afinidades 1936-1939 (sin el exilio de 1945).",
                "La Presidencia de V2 contiene turnos enterrados y material impreso (la v3 los separa).",
            ],
        },
        "legislaturas": res,
    }
    escribir("reparto_v2.json", datos)
    for leg in LEGISLATURAS:
        t = sum(v["pal_sp"] for v in res[leg]["ideologia"].values())
        print(leg, {k: round(v["pal_sp"] * 100 / t, 1) for k, v in res[leg]["ideologia"].items()})


if __name__ == "__main__":
    main()
