#!/usr/bin/env python3
"""Calendario de las 755 sesiones (una celda por sesión), sobre el CSV V2 depositado.

Por sesión = (date, num_session): filas, palabras, peso de la Presidencia, diputados que hablan fuera de la
Presidencia, intervenciones largas (> 300 palabras), los tres oradores con más palabras sin contar la
Presidencia, y el clima de sala (si existe clima_sesiones_v2.json, de calc_clima.py).

Metadatos de sesión OPCIONALES (campo `meta`): del sidecar sessions.json del explorador
(2REP_Explorer/standalone/data/sessions.json, generado el 2026-09-15 SOBRE V2, sha256 b3295e99…). Da Diario,
sigla, páginas verificadas (741 de 755), Presidencia y Gobierno. NO está depositado en Dataverse y la web
publicada del explorador NO lo aplica: si el sitio lo muestra, debe decir de dónde sale.

Uso: python3 calc_sesiones.py
"""
from __future__ import annotations

import json
from pathlib import Path

from comun import AQUI, FUENTE, cargar_v2, escribir, normalizar, roles_presidencia

SIDECAR = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/standalone/data/sessions.json")
VERIFICADAS = {"contiguous", "verso_blank", "corrected"}


def main() -> None:
    df = normalizar(roles_presidencia(cargar_v2()))
    side = json.loads(SIDECAR.read_text(encoding="utf-8"))
    assert side["corpus"] == "2REP_Diaries" and side["n_sessions"] == 755
    meta_por_clave = {}
    for s in side["sessions"]:
        sub = df[(df.id >= s["id_min"]) & (df.id <= s["id_max"])]
        assert len(sub) == s["n"] and sub.date.nunique() == 1 and sub.num_session.nunique() == 1, s["session_id"]
        clave = (sub.date.iloc[0], int(sub.num_session.iloc[0]))
        pag = (f'{s["page_start"]}-{s["page_end"]}' if s.get("page_status") in VERIFICADAS
               and s.get("page_start") else None)
        meta_por_clave[clave] = {
            "sigla": s.get("sigla"), "diario_num": s.get("diario_num"), "paginas": pag,
            "presidente": (s.get("presidente") or {}).get("corto"),
            "gobierno": (s.get("gobierno") or {}).get("nombre"),
            "doble_sesion": (s.get("double_sitting") or {}).get("franja"),
            "avisos": s.get("warnings") or [],
        }
    clima = {}
    p = AQUI / "clima_sesiones_v2.json"
    if p.exists():
        for s in json.loads(p.read_text(encoding="utf-8"))["sesiones"]:
            clima[(s["fecha"], s["sesion"])] = s["u"]

    out = []
    for (fecha, num), g in df.groupby(["date", "num_session"], sort=True):
        resto = g[~g.presidencia]
        dip = resto[resto.rep_id.notna()]
        top = (dip.groupby(["rep_name", "party"], dropna=False).nwords.sum().sort_values(ascending=False).head(3))
        reg = {
            "f": fecha, "s": int(num), "leg": g.legislature.iloc[0],
            "filas": int(len(g)), "pal": int(g.nwords.sum()),
            "filas_pres": int(g.presidencia.sum()), "pal_pres": int(g.loc[g.presidencia, "nwords"].sum()),
            "dip": int(dip.rep_id.nunique()), "largas": int((g.nwords > 300).sum()),
            "top": [[n, p if isinstance(p, str) else None, int(w)] for (n, p), w in top.items()],
            "id_v2": [int(g.id.min()), int(g.id.max())],
        }
        if (fecha, int(num)) in clima:
            reg["clima"] = clima[(fecha, int(num))]
        if (fecha, int(num)) in meta_por_clave:
            reg["meta"] = meta_por_clave[(fecha, int(num))]
        out.append(reg)
    assert len(out) == 755
    datos = {
        "_meta": {
            "fuente": FUENTE,
            "unidad": "sesión = (date, num_session); 755 sesiones en 752 fechas (3 fechas con doble sesión)",
            "campos": {"f": "fecha", "s": "num_session", "leg": "legislatura (etiqueta del CSV)",
                       "filas": "intervenciones (filas V2)", "pal": "palabras (nwords, separadas por espacios)",
                       "filas_pres/pal_pres": "de la Presidencia (parse_speaker del explorador)",
                       "dip": "diputados distintos que intervienen fuera de la Presidencia",
                       "largas": "intervenciones de más de 300 palabras",
                       "top": "3 diputados con más palabras en la sesión, sin Presidencia [nombre, partido, palabras]",
                       "id_v2": "primer y último id de V2 (NO sirven en el explorador, que usa ids v3)",
                       "clima": "unidades de acotación por clase (calc_clima.py)",
                       "meta": "sidecar local sessions.json (no depositado; la web del explorador no lo muestra)"},
            "sidecar": {"fichero": str(SIDECAR), "generated_at": side["generated_at"], "corpus": side["corpus"],
                        "sha256": "b3295e99f45af95a4d6f47f910fcacea7fc5f6da98ffde38df726fda1d7231da"},
            "salvedades": [
                "La Presidencia se atribuye en el CSV al diputado que preside; aquí se separa con el analizador "
                "de etiquetas del explorador.",
                "En V2 algunas filas de la Presidencia contienen turnos de otros oradores (729 turnos enterrados, "
                "0,8 % de las palabras) y material impreso; la v3 del explorador los separa.",
                "La guerra (3 sesiones en 1937, 3 en 1938, 1 en 1939) y el exilio (5 en 1945) tienen muy poco texto.",
                "La legislatura 1936-1939 del CSV incluye las 5 sesiones de México de 1945.",
            ],
        },
        "sesiones": out,
    }
    escribir("sesiones_v2.json", datos)


if __name__ == "__main__":
    main()
