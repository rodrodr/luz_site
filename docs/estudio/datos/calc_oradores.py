#!/usr/bin/env python3
"""Quién habla: los 773 diputados con intervención, con y sin Presidencia, sobre el CSV V2 depositado.

Por diputado (rep_id): nombre, partido/familia/ideología/distrito por legislatura (tal como vienen en el CSV,
familia normalizada como en el explorador), y para cada legislatura: filas y palabras totales, de Presidencia
y sin Presidencia, intervenciones de más de 300 palabras sin Presidencia y sesiones en que interviene.

Por qué «sin Presidencia»: el CSV atribuye «El Sr. PRESIDENTE:» al diputado que preside, así que Besteiro y
Alba encabezan cualquier recuento bruto por puro trámite de Mesa. La Presidencia se identifica con el
analizador de etiquetas del explorador (roles chair, vicechair, chair_age).

Salida: oradores_v2.json. Uso: python3 calc_oradores.py
"""
from __future__ import annotations

from comun import FUENTE, LEGISLATURAS, cargar_v2, escribir, normalizar, roles_presidencia


TOP_SERIE = 100


def moda(s):
    s = s.dropna()
    return None if s.empty else s.value_counts().index[0]


def main() -> None:
    df = normalizar(roles_presidencia(cargar_v2()))
    dip = df[df.rep_id.notna()].copy()
    dip["rep_id"] = dip.rep_id.astype(int)
    orad = []
    for rid, g in dip.groupby("rep_id"):
        por_leg = {}
        for leg, h in g.groupby("legislature"):
            r = h[~h.presidencia]
            por_leg[leg] = {
                "partido": moda(h.party), "familia": moda(h.familia), "ideo": moda(h.ideo), "distrito": moda(h.district),
                "filas": int(len(h)), "pal": int(h.nwords.sum()),
                "filas_pres": int(h.presidencia.sum()), "pal_pres": int(h.loc[h.presidencia, "nwords"].sum()),
                "filas_sp": int(len(r)), "pal_sp": int(r.nwords.sum()), "largas_sp": int((r.nwords > 300).sum()),
                "sesiones_sp": int(r.groupby(["date", "num_session"]).ngroups),
            }
        r = g[~g.presidencia]
        orad.append({
            "id": int(rid), "nombre": moda(g.rep_name),
            "partido": moda(g.party), "familia": moda(g.familia), "ideo": moda(g.ideo),
            "filas": int(len(g)), "pal": int(g.nwords.sum()),
            "filas_pres": int(g.presidencia.sum()), "pal_pres": int(g.loc[g.presidencia, "nwords"].sum()),
            "filas_sp": int(len(r)), "pal_sp": int(r.nwords.sum()), "largas_sp": int((r.nwords > 300).sum()),
            "leg": por_leg,
        })
    orad.sort(key=lambda o: -o["pal_sp"])
    for k, o in enumerate(orad, 1):
        o["rango_pal_sp"] = k
    # Serie mensual (palabras sin Presidencia) de los 100 primeros, alineada con MESES (meses con sesión)
    meses = sorted(df.mes.unique())
    sp = dip[~dip.presidencia].groupby(["rep_id", "mes"]).nwords.sum()
    for o in orad[:TOP_SERIE]:
        s = sp.loc[o["id"]] if o["id"] in sp.index.get_level_values(0) else {}
        o["meses_pal_sp"] = [int(s.get(m, 0)) for m in meses]
    sin_dip = df[df.rep_id.isna()]
    datos = {
        "_meta": {
            "fuente": FUENTE,
            "diputados": len(orad),
            "filas_sin_diputado": {"filas": int(len(sin_dip)), "pal": int(sin_dip.nwords.sum()),
                                   "nota": "ministros sin escaño según el README depositado (SECTION 4)"},
            "claves": {"pal": "palabras (nwords)", "_pres": "como Presidencia", "_sp": "sin Presidencia",
                       "largas_sp": "intervenciones de más de 300 palabras, sin Presidencia",
                       "sesiones_sp": "sesiones en que interviene fuera de la Presidencia"},
            "legislaturas": LEGISLATURAS,
            "meses": sorted(df.mes.unique()),
            "serie_mensual": f"meses_pal_sp solo para los {TOP_SERIE} primeros por palabras sin Presidencia",
            "salvedades": [
                "Partido, familia e ideología se heredan de la tabla de diputados (no depositada); la ideología "
                "es la del partido, no la del individuo.",
                "La familia sigue la normalización del explorador; «Liberal» → «Liberales» (15.364 filas) está "
                "pendiente de revisión por el autor.",
                "En V2, 729 turnos de otros oradores quedaron dentro de la fila anterior, casi siempre de la "
                "Presidencia: excluir la Presidencia en V2 también excluye esas palabras (p. ej. el discurso de "
                "Azaña del 27-05-1932 sobre el Estatuto está en la fila 25979, a nombre de Besteiro). La v3 lo "
                "corrige, pero no está depositada.",
                "V2 también deja material impreso dentro de las filas de los oradores: la fila V2 55221 (Prieto, "
                "12-07-1933, 25.371 palabras, la más larga del CSV) son 3.733 palabras de Prieto y un documento "
                "de ≈21.600; por eso en V2 Prieto encabeza el ranking (554.773) y en la v3 lo encabeza Royo "
                "Villanova (534.408 frente a 521.742 de Prieto).",
                "Contar palabras no mide influencia, acierto ni tono.",
            ],
        },
        "oradores": orad,
    }
    escribir("oradores_v2.json", datos)
    print("top10 sin Presidencia:", [(o["nombre"], o["pal_sp"]) for o in orad[:10]])
    bruto = sorted(orad, key=lambda o: -o["filas"])[:5]
    print("top5 filas brutas:", [(o["nombre"], o["filas"], o["filas_pres"]) for o in bruto])


if __name__ == "__main__":
    main()
