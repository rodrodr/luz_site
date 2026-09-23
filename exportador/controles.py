"""Cifras de control del plan (`00_PLAN_sitio.md` § Procedencia de las cifras principales), recalculadas en cada
exportación sobre las fuentes. Si una deja de cuadrar, el exportador falla: o cambió una fuente o cambió el código.

Cada control lleva el valor verificado (`esperado`) y, si difiere, el que escribió el plan (`plan`) con el porqué.
Las cifras de figuras de otros dueños (votaciones, «luz y taquígrafos», «no constará», Afinidades) se comprueban
aquí sobre la fuente, sin emitirlas: las emite su módulo.
"""
from __future__ import annotations

import csv
import json
from collections import Counter

from comun import CRITICA, LEGISLATURAS, N_FILAS_V2, exige, leer_json
from formatos import formatear


def _v(C, k):
    exige(k in C, f"control: falta la cifra {k}")
    return C[k]["v"]


def comprobar(ctx, C: dict) -> list[dict]:
    R: list[dict] = []

    def chk(nombre, esperado, obtenido, base, plan=None, nota=""):
        R.append({"control": nombre, "base": base, "esperado": esperado, "obtenido": obtenido, "ok": esperado == obtenido,
                  "plan": plan if plan is not None else esperado, "nota": nota})

    f = lambda k, fmt="": formatear(C[k], fmt, "es")  # noqa: E731
    chk("Filas", 107551, _v(C, "filas.V2"), "V2")
    chk("Filas", 121700, _v(C, "filas.v3"), "v3")
    chk("Filas de habla (role ∉ {summary, remark})", (108291, 22096389), (_v(C, "habla.v3"), _v(C, "palabras.habla.v3")), "v3")
    chk("Sesiones en fechas (V2 = v3)", (755, 752, 755), (_v(C, "sesiones"), _v(C, "sesiones.fechas"), _v(C, "sesiones.v3")), "V2")
    chk("Sesiones por legislatura", (405, 276, 74), tuple(_v(C, f"leg.{l}.sesiones") for l in LEGISLATURAS), "V2")
    chk("Sesiones por etapa", (405, 276, 60, 9, 5), tuple(_v(C, f"etapa.{e}.sesiones") for e in ("I", "II", "III", "IV", "V")), "V2")
    chk("Palabras", 24335896, _v(C, "palabras.V2"), "V2")
    chk("Palabras por legislatura (fragmentos de Datos)", (12966290, 9476120, 1893486),
        tuple(_v(C, f"leg.{l}.palabras") for l in LEGISLATURAS), "V2")
    chk("Filas por etapa", (61355, 40342, 5368, 276, 210), tuple(_v(C, f"etapa.{e}.filas") for e in ("I", "II", "III", "IV", "V")), "V2")
    chk("Diputados por etapa (con quien preside)", (417, 390, 243, 44, 29),
        tuple(_v(C, f"etapa.{e}.diputados") for e in ("I", "II", "III", "IV", "V")), "V2")
    chk("Diputados, total y por legislatura", (773, 417, 390, 253),
        (_v(C, "diputados.V2"),) + tuple(_v(C, f"leg.{l}.diputados") for l in LEGISLATURAS), "V2")
    chk("Tras el 18-VII-1936", (14, 203167, "0,83 %"),
        (_v(C, "sesiones.tras_18jul"), _v(C, "palabras.tras_18jul"), f("palabras.tras_18jul.pct")), "V2")
    chk("Meses; con sesión; salto 1939-03 → 1944-12", (173, 64, 70),
        (_v(C, "meses.total"), _v(C, "meses.con_sesion"), _v(C, "meses.salto")), "V2")
    # Mes a mes contra el control del estudio.
    ctl = {m["mes"]: m for m in leer_json(CRITICA / "cobertura_mes_v2.json")["meses"]}
    difs = [m["mes"] for m in ctx.compartido["meses"]
            if (m["sesiones"], m["filas"], m["pal"]) != (ctl.get(m["mes"], {}).get("sesiones", 0), ctl.get(m["mes"], {}).get("filas", 0),
                                                        ctl.get(m["mes"], {}).get("palabras", 0))]
    chk("Meses iguales a critica/cobertura_mes_v2.json (sesiones, filas, palabras)", (173, []), (len(ctl), difs), "V2")
    feb33 = next(m for m in ctx.compartido["meses"] if m["mes"] == "1933-02")
    chk("Febrero de 1933 (fragmentos de Datos)", (16, 1843, 574317), (feb33["sesiones"], feb33["filas"], feb33["pal"]), "V2")
    chk("Sesiones con un vicepresidente en algún tramo (filas · fechas)", (586, 10025, 584),
        (_v(C, "pres.vice_ses"), _v(C, "pres.vice_filas"), _v(C, "pres.vice_fechas")), "V2",
        plan=(584, 10009), nota="Con parse_speaker del explorador, el método que cita el plan, son 586 sesiones (fecha y "
                                 "número), 10.025 filas y 584 fechas. El «584 (10.009 filas)» del plan cuenta la cadena "
                                 "«VICEPRESIDENTE» en la etiqueta: deja fuera 17 filas cuya etiqueta trae erratas del "
                                 "reconocimiento óptico («VIEPRESIDENTE», «VICFPRESIDENTE»…) y cuenta una que no es de la "
                                 "Presidencia («El Sr. S. VICEPRESIDENTE»). El copy usa {{pres.vice_ses}} (sesiones) o "
                                 "{{pres.vice_fechas}} (fechas), nunca «584» tecleado.")
    chk("Páginas (total y por legislatura)", (28780, 15272, 11177, 2331),
        (_v(C, "paginas.total"),) + tuple(_v(C, f"leg.{l}.paginas") for l in LEGISLATURAS), "proyecto")
    chk("Sesiones con páginas verificadas", (741, 14), (_v(C, "paginas.verificadas.sesiones"), _v(C, "paginas.sin_verificar.sesiones")),
        "proyecto")
    chk("Series del Diario", (405, 336, 9, 5), tuple(_v(C, f"serie.{s}.sesiones") for s in ("constituyentes", "cortes", "extracto", "mexico")),
        "proyecto")
    chk("Presidencia: filas y palabras", ("44,85 %", "10,24 %"), (f("presidencia.filas.pct"), f("presidencia.palabras.pct")), "V2")
    v2 = ctx.v2()
    hasta50 = int((v2["nwords"] <= 50).sum())
    chk("Filas de 50 palabras o menos; mediana", ("66,53 %", 71550, 14.0),
        (formatear({"v": hasta50 / N_FILAS_V2, "t": "pct"}), hasta50, float(v2["nwords"].median())), "V2")
    chk("Debates preparados por etapa", (13, 7, 4, 1, 1, 31, 24029),
        tuple(_v(C, f"etapa.{e}.debates") for e in ("I", "II", "III", "IV", "V")) + (_v(C, "bib.n"), _v(C, "bib.entradas")),
        "v3")

    # Votaciones: seis nominales en cinco sesiones, más la ordinaria 141–106 (texto de la fila V2).
    pl = ctx.v2_plegado()
    votos = {5453: ["total, 161", "total, 121"], 6994: ["total, 178", "total, 59"], 13531: ["suman 466", "mitad mas uno, 234", "votacion 368"],
             37177: ["total, 318", "total, 19"], 37178: ["total, 314", "total, 24"], 102358: ["total, 238", "total, 5"]}
    ok_votos = [i for i, trozos in votos.items() if all(t in pl[i] for t in trozos)]
    ses_votos = sorted({v2.loc[i - 1, "clave"] for i in votos})
    ordinaria = "votacion ordinaria" in pl[5453] and "141 votos contra 106" in pl[5453]
    chk("Votaciones nominales: filas que las contienen, sesiones y la ordinaria 141–106", (6, 5, True),
        (len(ok_votos), len(ses_votos), ordinaria), "V2")

    # «Luz y taquígrafos»: diez filas, las mismas en las dos ediciones.
    luz_v2 = [420, 23898, 24658, 55902, 57506, 71330, 75263, 79803, 99859, 106747]
    luz_v3 = [472, 26612, 27477, 62718, 64595, 80306, 84760, 89910, 112827, 120751]
    chk("«Luz y taquígrafos» (texto plegado V2 · FTS v3)", (luz_v2, luz_v3),
        (ctx.buscar_v2(r"luz y taquigrafos"), ctx.fts_v3('"luz y taquigrafos"')), "V2")
    fila = ctx.fila_v2(71330)
    chk("«Luz y taquígrafos.» V2 71330: rep_id, partido, distrito", ("456", "CEDA", "Badajoz"),
        (fila["rep_id"], fila["party"], fila["district"]), "V2")

    # «No constará(n) en el Diario»: 9 filas en las dos ediciones; la FTS exacta en plural da 7.
    nc_v2 = [13605, 45115, 45440, 64659, 102484, 102492, 103251, 104406, 106290]
    nc_v3 = [15129, 50466, 50818, 72690, 115828, 115836, 116698, 118058, 120222]
    expr = r"no constar(?:a|an) en el diario"
    chk("«No constará(n) en el Diario» (V2 · v3 · FTS exacta en plural)", (nc_v2, nc_v3, 7),
        (ctx.buscar_v2(expr), ctx.buscar_v3(expr), len(ctx.fts_v3('"no constaran en el diario"'))), "V2")
    chk("«No se consigna(n) por orden» (V2 · v3)", ([103182, 105324, 106289], [116626, 119098, 120221]),
        (ctx.buscar_v2(r"no se consignan? por orden"), ctx.buscar_v3(r"no se consignan? por orden")), "V2")

    # Pesos, en la unidad de Dataverse.
    chk("Peso del CSV", (165785782, "158,1 MB"), (_v(C, "dv.csv.bytes"), f("dv.csv.bytes")), "dv")
    chk("Descarga del explorador", (111733652, "106,6 MB", "unos 107 MB"),
        (_v(C, "explorador.gz.bytes"), f("explorador.gz.bytes"), "unos " + f("explorador.gz.bytes", "peso0")), "explorador")
    chk("Base del explorador descomprimida", (282316800, "269,2 MB"), (_v(C, "explorador.db.bytes"), f("explorador.db.bytes")), "explorador")

    # Afinidades (CGOCUS V1.1): 63.507 filas par × medida; 78 diputados con tres fichas.
    with open(ctx.afin("2REP_coauthor_edgelist.tab"), encoding="utf-8") as fh:
        aristas = sum(1 for _ in csv.reader(fh)) - 1
    with open(ctx.afin("representative_metadata.tab"), encoding="utf-8") as fh:
        filas = list(csv.DictReader(fh, delimiter=ctx.afin_sep("representative_metadata.tab")))
    col = next(c for c in filas[0] if c.lower() in ("id_dip", "id"))
    fichas = Counter(r[col] for r in filas)
    chk("Coautorías (filas del edgelist)", 63507, aristas, "afin")
    chk("Personas y fichas del censo; en las tres legislaturas", (1026, 1446, 78),
        (len(fichas), len(filas), sum(n == 3 for n in fichas.values())), "afin")
    return R


def informe(R: list[dict]) -> tuple[list[str], list[str]]:
    """(fallos, avisos) legibles."""
    fallos, avisos = [], []
    for r in R:
        if not r["ok"]:
            fallos.append(f"control «{r['control']}» [{r['base']}]: esperado {json.dumps(r['esperado'], ensure_ascii=False)}, "
                          f"obtenido {json.dumps(r['obtenido'], ensure_ascii=False)}")
        elif r["plan"] != r["esperado"]:
            avisos.append(f"control «{r['control']}»: el plan dice {r['plan']}; la fuente da {r['esperado']}. {r['nota']}")
    return fallos, avisos
