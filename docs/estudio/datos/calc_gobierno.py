#!/usr/bin/env python3
"""¿Cuánto habla el Gobierno en la Cámara? Palabras del banco azul por Gobierno (CSV V2 depositado).

Cada sesión se asigna a su Gobierno con el sidecar sessions.json del explorador (construido sobre V2, NO
depositado; regla: intervalo semiabierto [inicio, fin), el día del cambio cuenta para el entrante).
Banco azul = filas cuyo orador, según el parse_speaker del explorador, es ministro (minister) o Presidente
del Consejo (head_of_government). Se dan también las palabras de la Presidencia y del resto.

Salida: gobierno_v2.json. Uso: python3 calc_gobierno.py
"""
from __future__ import annotations

import json
from pathlib import Path

from comun import FUENTE, cargar_v2, escribir, roles_presidencia

SIDECAR = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json")
BANCO_AZUL = {"minister", "head_of_government"}


def main() -> None:
    df = roles_presidencia(cargar_v2())
    side = json.loads(SIDECAR.read_text(encoding="utf-8"))
    gob = {}
    orden = []
    df["gobierno"] = None
    for s in side["sessions"]:
        g = s["gobierno"]
        if g["id"] not in gob:
            gob[g["id"]] = {k: g.get(k) for k in ("id", "nombre", "presidente", "inicio", "fin")}
            orden.append(g["id"])
        df.loc[(df.id >= s["id_min"]) & (df.id <= s["id_max"]), "gobierno"] = g["id"]
    assert df.gobierno.notna().all()
    df["banco_azul"] = df.rol.isin(BANCO_AZUL)
    out = []
    for gid in orden:
        h = df[df.gobierno == gid]
        b = h[h.banco_azul]
        top = b[b.rep_name.notna()].groupby("rep_name").nwords.sum().sort_values(ascending=False).head(3)
        pal = int(h.nwords.sum())
        out.append({**gob[gid], "sesiones": int(h.groupby(["date", "num_session"]).ngroups),
                    "primera": h.date.min(), "ultima": h.date.max(), "palabras": pal,
                    "pal_banco_azul": int(b.nwords.sum()), "filas_banco_azul": int(len(b)),
                    "pal_presidencia": int(h.loc[h.presidencia, "nwords"].sum()),
                    "pct_banco_azul": round(b.nwords.sum() * 100 / pal, 1) if pal else None,
                    "top_ministros": [[n, int(w)] for n, w in top.items()]})
    tot_b = int(df.loc[df.banco_azul, "nwords"].sum())
    datos = {
        "_meta": {
            "fuente": FUENTE,
            "gobiernos": "sidecar 2REP_Explorer/standalone/data/sessions.json (2026-09-15, sobre V2; no depositado)",
            "banco_azul": "roles minister + head_of_government del parse_speaker del explorador",
            "total": {"pal_banco_azul": tot_b, "filas_banco_azul": int(df.banco_azul.sum()),
                      "pct_palabras": round(tot_b * 100 / df.nwords.sum(), 2)},
            "salvedades": [
                "La asignación sesión → Gobierno sale del sidecar local; la web del explorador no la muestra.",
                "Un ministro que habla desde su escaño sin la etiqueta de cargo cuenta como diputado.",
                "En V2 algunas filas del banco azul arrastran documentos impresos (p. ej. la 55221 de Prieto).",
                "Gobiernos con 1-3 sesiones (guerra, exilio, interinos) no admiten comparación.",
            ],
        },
        "gobiernos": out,
    }
    escribir("gobierno_v2.json", datos)
    for g in out:
        print(f'{g["nombre"][:38]:38s} {g["sesiones"]:>4} ses {g["palabras"]:>10,} pal  banco azul {g["pct_banco_azul"]}%')


if __name__ == "__main__":
    main()
