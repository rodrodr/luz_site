"""metodo · Método, diez apartados (dueño: grupo 4, El Diario y Método).

Figuras y archivos
  F20  Anatomía de una fila: V2 5423 y 5424 (las 14 columnas) y sus pares v3 6078 y 6079 (con los campos que solo trae
       la v3). Escribe `src/data/fila_ejemplo.json` y `public/datos/fila_ejemplo.csv`.
  F19  Del Diario a la fila, en cinco pasos: `public/datos/pasos.csv` con la cifra de cada paso y su base. Las cifras
       que no salen de una base depositada (páginas, fallos de lectura, etiquetas, correcciones) dicen de dónde salen.
  F10/F11  Trámite frente a discurso: diez tramos que se duplican × Presidencia o resto × legislatura, en filas y en
       palabras, y la curva de concentración de 100 puntos. Escribe `src/data/longitud.json` y `public/datos/longitud.csv`.
  F12  La fila más larga no es un discurso: V2 55221 → v3 61929–61932; V2 25979 → v3 29041–29042; V2 85330 → v3 96282,
       leídas en el mapa V2 → v3 del proyecto (local, sin publicar; huella comprobada por `ctx.mapa_v2_v3()`). Escribe
       `src/data/despiece.json` y `public/datos/fila_larga.csv`.
  Cifras: las de `docs/marcadores/metodo.md` que son de este grupo. Las compartidas que ya dio un módulo anterior
  (base.py, sesiones.py) no se repiten (`_ya_dadas`). Las de Datos y Versiones (`fechas.*`, `familias.V2|v3`,
  `ideologia.partidos_varios`, `v3.turnos`) las da `datos.py` (docs/peticiones/diario-metodo.md).
"""
from __future__ import annotations

import glob
import json

import numpy as np
import pandas as pd

from comun import BASE_2REP, COLUMNAS_V2, PRESIDENCIA, exige, leer_json
from modulos.diario import _ya_dadas

README = BASE_2REP / "Luz_y_Taquigrafos_README.txt"
DIPUTADOS = BASE_2REP / "diputados_21_06_encode.csv"
TRAMOS = [(0, 5), (6, 10), (11, 20), (21, 50), (51, 100), (101, 300), (301, 1000), (1001, 3000), (3001, 10000),
          (10001, None)]
UMBRAL = 50
FILAS_EJEMPLO = {"presidencia": (5423, 6078), "campoamor": (5424, 6079)}
DESPIECE = {"prieto": 55221, "estatuto": 25979, "azana1935": 85330}
CAMPOS_V3 = ["ord", "speaker_fold", "rep_name_fold", "party_family_raw", "ideology_raw", "year"]   # los que solo trae la v3
COLUMNAS_V3 = ["id", "num_session", "ord", "date", "year", "legislature", "speaker", "speaker_fold", "rep_id", "rep_name",
               "rep_name_fold", "district", "party", "party_family_raw", "party_family", "ideology_raw", "ideology", "nwords",
               "speech"]
CORTE_TEXTO = 330          # caracteres del comienzo de `speech` que enseña F20 (el CSV lleva el texto entero)


def _comienzo(texto: str, palabras: int = 9) -> str:
    t = " ".join((texto or "").split())
    w = t.split(" ")
    return " ".join(w[:palabras]) + ("…" if len(w) > palabras else "")


def _corta(texto: str, n: int) -> tuple[str, bool]:
    if len(texto) <= n:
        return texto, False
    cortado = texto[:n].rsplit(" ", 1)[0].rstrip(",;:")
    return cortado, True


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}
    dadas = _ya_dadas(ctx)

    def pon(k, v, t, base, f, clave="C", **kw):
        exige(k not in C, f"metodo: cifra {k} repetida")
        if k not in dadas:
            C[k] = ctx.cifra(v, t, base, f, clave, **kw)

    v2 = ctx.v2()
    txt2 = ctx.v2_texto()
    por_id = v2.set_index("id")
    v3 = ctx.v3()
    v3i = v3.set_index("id")
    graf = leer_json(ctx.data / "grafias.json")["grafias"]

    def uso(rep_id):
        g = graf.get(str(int(rep_id))) if pd.notna(rep_id) else None
        return (g or {}).get("uso") or (g or {}).get("grafia") or ""

    # ── 01 · F20: anatomía de una fila ─────────────────────────────────────────────────────────────────────────
    filas_json, csv_filas = [], []
    for nombre, (a, b) in FILAS_EJEMPLO.items():
        r2 = ctx.fila_v2(a)
        r3 = ctx.fila_v3(b)
        exige(r2["speech"] == r3["speech"], f"F20: el texto de V2 {a} y v3 {b} no es idéntico")
        exige((r2["date"], int(r2["num_session"])) == (r3["date"], int(r3["num_session"])), f"F20: V2 {a} y v3 {b} no son de la misma sesión")
        texto, cortado = _corta(r2["speech"], CORTE_TEXTO)
        fila = {c: r2[c] for c in COLUMNAS_V2}
        filas_json.append({
            "clave": nombre, "v2": {**fila, "speech": texto}, "cortado": cortado, "nwords": int(r2["nwords"]),
            "v3": {c: r3[c] for c in COLUMNAS_V3 if c != "speech"},
            "uso": uso(int(r2["rep_id"])),
        })
        csv_filas.append([r2[c] for c in COLUMNAS_V2])
        pon(f"fila.{nombre}.id.V2", int(a), "id", "V2", f"id de la fila ({r2['date']}, sesión {r2['num_session']}, {r2['speaker']})")
        pon(f"fila.{nombre}.id.v3", int(b), "id", "v3", f"id v3 de la misma fila ({r3['speaker']})")
        pon(f"fila.{nombre}.nwords", int(r2["nwords"]), "n", "V2", f"nwords de la fila V2 {a}")
        pon(f"fila.{nombre}.orden.V2", int(r2["order"]), "id", "V2", f"order de la fila V2 {a}")
        pon(f"fila.{nombre}.orden.v3", int(r3["ord"]), "id", "v3", f"ord de la fila v3 {b}")
    exige(filas_json[0]["v2"]["speech"] == "Ruego a la Cámara que guarde silencio.", "F20: la fila de la Presidencia no dice lo esperado")
    exige(ctx.fila_v2(5424)["speech"].startswith("Yo ruego a la Cámara que me escuche en silencio"), "F20: la fila de Campoamor no empieza como se cita")
    pon("fila.campoamor.orden.pantalla", int(ctx.fila_v3(6079)["ord"]) + 1, "id", "explorador",
        "«Orden 30 de 415» en el lector del explorador (captura c_lector_campoamor_1440): ord + 1")
    ctx.escribir_json("fila_ejemplo.json", {
        "_meta": {"fuente": "V2 (2REP_Diaries.csv) y v3 (corpus.sqlite)", "exportado": ctx.hoy, "columnas_v2": COLUMNAS_V2,
                  "campos_v3": CAMPOS_V3, "columnas_v3": COLUMNAS_V3, "corte": f"`speech` se corta en {CORTE_TEXTO} caracteres; el CSV lleva el texto entero"},
        "filas": filas_json,
    })
    ctx.escribir_datos("fila_ejemplo", COLUMNAS_V2, csv_filas)

    # ── 02 · F19: los cinco pasos ─────────────────────────────────────────────────────────────────────────────
    readme = README.read_text(encoding="utf-8")
    for frag in ("107,556 tags retained", "filtering 1,532", "367 assignments were corrected", "Jaro-Winkler >= 0.82", "3-character"):
        exige(frag in readme, f"el README depositado ya no dice «{frag}»")
    S = ctx.proyecto()["sessions"]
    pon("etiquetas.n", 107556, "n", "V2", "README depositado, SECTION 4 («107,556 tags retained»)", "M")
    pon("etiquetas.falsos_positivos", 1532, "n", "V2", "README depositado, SECTION 4 («filtering 1,532 false positives»)", "M")
    pon("etiquetas.diferencia", 107556 - len(v2), "n", "V2", "etiquetas.n − filas.V2 (sin documentar)", "CALC")
    pon("etiquetas.filtro.letras", 3, "n", "V2", "README SECTION 4 («3-character all-capitals word»); tag_speakers.py [A-ZÁÉÍÓÚÜÑ]{3,}", "M")
    pon("vinculo.corregidas", 367, "n", "V2", "README depositado, SECTION 4 («367 assignments were corrected»)", "M")
    pon("vinculo.umbral", 0.82, "n", "V2", "README SECTION 4 (0.82); link_deputies.py, difflib.get_close_matches cutoff 0.82", "M", dec=2)
    paginas = sum(s["pdf_pages"] or 0 for s in S)
    fallidas = sum(len(s["ocr"]["failed_pages"]) for s in S)
    con_dip = int(v2["rep_id"].notna().sum())
    ctx.escribir_datos("pasos", ["paso", "que", "cifra", "unidad", "base", "fuente"], [
        [1, "Los números del Diario", int(v2["clave"].nunique()), "números (sesiones)", "V2", "claves (date, num_session) del CSV depositado"],
        [2, "Las páginas, leídas", paginas, "páginas", "proyecto", "suma de pdf_pages en sessions.json (no depositado)"],
        [2, "Páginas fallidas en la primera pasada", fallidas, "páginas", "proyecto", "suma de ocr.failed_pages en sessions.json"],
        [3, "Las fórmulas de orador", 107556, "etiquetas", "V2", "README depositado, SECTION 4"],
        [3, "Falsos positivos descartados", 1532, "etiquetas", "V2", "README depositado, SECTION 4"],
        [4, "Las filas", len(v2), "filas", "V2", "filas del CSV depositado"],
        [5, "Filas con diputado", con_dip, "filas", "V2", "filas con rep_id"],
        [5, "Asignaciones corregidas a mano", 367, "asignaciones", "V2", "README depositado, SECTION 4"],
    ])

    # ── 03 · el reconocimiento óptico ─────────────────────────────────────────────────────────────────────────
    pon("ocr.fallidas.paginas", fallidas, "n", "proyecto", "suma de ocr.failed_pages (sessions.json)", "M")
    pon("ocr.fallidas.sesiones", sum(1 for s in S if s["ocr"]["failed_pages"]), "n", "proyecto", "sesiones con ocr.failed_pages", "M")
    pon("ocr.bucles.paginas", sum(len(s["ocr"]["loop_pages"]) for s in S), "n", "proyecto", "suma de ocr.loop_pages (páginas releídas por bucle)", "M")
    pon("ocr.incidencias", sum(len(s["incidents"]) for s in S), "n", "proyecto", "incidencias declaradas en sessions.json (ocr_loop · truncated_end)", "M")
    rep = [json.load(open(f, encoding="utf-8")) for f in glob.glob(str(BASE_2REP / "TXT_OCR_REPAIRED" / "*.meta.json"))]
    tes = [json.load(open(f, encoding="utf-8")) for f in glob.glob(str(BASE_2REP / "TXT_OCR_TESSERACT" / "*.meta.json"))]
    exige(rep and tes, "faltan los metadatos de TXT_OCR_REPAIRED o TXT_OCR_TESSERACT")
    recuperadas = sum(len(m["repaired_pages"]) for m in rep)
    tess = sum(len(m["tesseract_pages"]) for m in tes)
    exige(recuperadas + tess == fallidas, f"OCR: {recuperadas} recuperadas + {tess} de Tesseract ≠ {fallidas} fallidas")
    exige(sum(len(m["tesseract_still_failed"]) for m in tes) == 0, "OCR: quedan páginas sin texto tras Tesseract")
    modelos = sorted({p.get("model") for m in rep for p in m["repaired_pages"]})
    pon("ocr.recuperadas", recuperadas, "n", "proyecto", f"páginas en repaired_pages (TXT_OCR_REPAIRED/*.meta.json); modelo: {modelos}", "M")
    pon("ocr.tesseract.paginas", tess, "n", "proyecto", "páginas en tesseract_pages (TXT_OCR_TESSERACT/*.meta.json)", "M")
    pon("ocr.tesseract.sesiones", sum(1 for m in tes if m["tesseract_pages"]), "n", "proyecto", "archivos con tesseract_pages", "M")
    t976 = txt2[976]
    pon("fila.bucle9.id.V2", 976, "id", "V2", "fila del bucle de la sesión 9 (1931-07-27)")
    pon("ocr.bucle9.repeticiones", t976.count("Sánchez Guerra, Ossorio y Gallardo"), "n", "V2",
        'apariciones de "Sánchez Guerra, Ossorio y Gallardo" en la fila V2 976')
    s48 = v2[v2["clave"] == "1931-10-01-48"].sort_values("order").tail(5)
    exige(all(txt2[i].startswith("Pido la palabra.") for i in s48["id"]) and txt2[int(s48["id"].iloc[-1])].endswith("El Sr. Ministro de"),
          "la cola de la sesión 48 ya no es la esperada")
    pon("ses.s48.cola", len(s48), "n", "V2", "filas finales de la sesión 48 que repiten «Pido la palabra»")
    pon("ses.s48.cola.V2.desde", int(s48["id"].min()), "id", "V2", "primera de esas filas en la V2")
    pon("ses.s48.cola.V2.hasta", int(s48["id"].max()), "id", "V2", "última de esas filas en la V2")
    s48v = v3[v3["clave"] == "1931-10-01-48"].sort_values("ord").tail(5)
    pon("ses.s48.cola.v3.desde", int(s48v["id"].min()), "id", "v3", "primera de las cinco filas finales en la v3")
    pon("ses.s48.cola.v3.hasta", int(s48v["id"].max()), "id", "v3", "última de las cinco filas finales en la v3")
    txt3 = ctx.v3_texto()
    cola = []
    for (i2, o2), (i3, o3) in zip(s48[["id", "order"]].itertuples(index=False), s48v[["id", "ord"]].itertuples(index=False)):
        exige(txt2[int(i2)] == txt3[int(i3)], f"la cola de la sesión 48: V2 {i2} y v3 {i3} no dicen lo mismo")
        cola.append({"id_v2": int(i2), "id_v3": int(i3), "order": int(o2), "ord": int(o3), "speaker": por_id.loc[int(i2), "speaker"],
                     "speech": txt2[int(i2)]})
    ctx.escribir_json("cola48.json", {"_meta": {"fuente": "V2 y v3: las cinco últimas filas de la sesión 48 (1-X-1931), literales",
                                                 "exportado": ctx.hoy}, "filas": cola})
    pon("ses.s48.cola.pantalla.desde", int(s48v["ord"].min()) + 1, "id", "explorador", "orden en pantalla (ord + 1) de la primera")
    pon("ses.s48.cola.pantalla.hasta", int(s48v["ord"].max()) + 1, "id", "explorador", "orden en pantalla (ord + 1) de la última")

    # ── 04 · quién habla ──────────────────────────────────────────────────────────────────────────────────────
    pon("filas.sin_diputado.ministerio", int((v2["rep_id"].isna() & (v2["rol"] == "minister")).sum()), "n", "V2",
        "filas sin rep_id cuya fórmula el analizador del explorador lee como ministro (rol minister)")
    tab = pd.read_csv(DIPUTADOS, sep=";")
    ids = set(int(x) for x in v2["rep_id"].dropna())
    x = tab[tab["id_dip"].isin(ids)].drop_duplicates("id_dip").copy()
    x["a1"] = x["apellidos"].astype(str).str.split().str[0]
    vc = x["a1"].value_counts()
    pon("diputados.comparten_apellido", int(vc[vc > 1].sum()), "n", "proyecto",
        f"diputados que intervienen (rep_id de la V2) cuyo primer apellido (diputados_21_06_encode.csv) comparte otro; "
        f"{len(vc)} apellidos distintos entre {len(x)}", "C")

    # ── 05 · F10/F11: trámite frente a discurso ───────────────────────────────────────────────────────────────
    s = v2["nwords"]
    pres = v2["presidencia"]
    pon("longitud.umbral", UMBRAL, "n", "V2", "umbral de fila breve del sitio (límite del tramo 21–50 de F10)", "R")
    pon("longitud.hasta50", int((s <= UMBRAL).sum()), "n", "V2", "filas con nwords ≤ 50")
    pon("longitud.hasta50.pct", float((s <= UMBRAL).mean()), "pct", "V2", "filas con nwords ≤ 50 / filas", "CALC")
    pon("longitud.mediana", int(s.median()), "n", "V2", "mediana de nwords")
    pon("longitud.hasta50.presidencia.pct", float(pres[s <= UMBRAL].mean()), "pct", "V2",
        "filas de la Presidencia entre las de nwords ≤ 50", "CALC")
    w = np.sort(s.values)[::-1]
    cw = np.cumsum(w) / w.sum()
    for k, p in (("", 0.10), ("2", 0.20)):
        pon(f"longitud.curva.corte{k}", p, "pct", "V2", "punto anotado de F11 (parte de filas, de la más larga a la más corta)", "R")
        pon(f"longitud.curva.palabras{k}", float(cw[int(len(w) * p) - 1]), "pct", "V2",
            f"parte de nwords en el {int(p * 100)} % de filas más largas (curva de F11)", "CALC", dec=1)
    pon("longitud.hasta50.pct.v3", float((v3["nwords"] <= UMBRAL).mean()), "pct", "v3", "filas de la v3 con nwords ≤ 50 / filas de la v3", "CALC")

    def en_tramo(serie, a, b):
        return (serie >= a) & ((serie <= b) if b is not None else True)

    legs = {"todas": v2}
    for lg, g in v2.groupby("legislature"):
        legs[lg] = g
    hist, csv_long = {}, []
    for lg, g in legs.items():
        gp = g["presidencia"]
        bloque = {"filas": len(g), "palabras": int(g["nwords"].sum()), "tramos": []}
        for a, b in TRAMOS:
            m = en_tramo(g["nwords"], a, b)
            t = {"desde": a, "hasta": b,
                 "filas_pres": int((m & gp).sum()), "filas_resto": int((m & ~gp).sum()),
                 "pal_pres": int(g.loc[m & gp, "nwords"].sum()), "pal_resto": int(g.loc[m & ~gp, "nwords"].sum())}
            bloque["tramos"].append(t)
            csv_long.append([lg, a, "" if b is None else b, t["filas_pres"], t["filas_resto"], t["pal_pres"], t["pal_resto"]])
        exige(sum(t["filas_pres"] + t["filas_resto"] for t in bloque["tramos"]) == len(g), f"F10: los tramos de {lg} no suman sus filas")
        exige(sum(t["pal_pres"] + t["pal_resto"] for t in bloque["tramos"]) == bloque["palabras"], f"F10: los tramos de {lg} no suman sus palabras")
        hist[lg] = bloque
    curva = [[p, round(float(cw[max(0, int(len(w) * p / 100) - 1)]), 5)] for p in range(1, 101)]
    ctx.escribir_json("longitud.json", {
        "_meta": {"fuente": "V2 (2REP_Diaries.csv): nwords; Presidencia = parse_speaker del explorador (chair, vicechair, chair_age)",
                  "exportado": ctx.hoy, "umbral": UMBRAL,
                  "curva": "[% de filas, de la más larga a la más corta; parte de todas las palabras que acumulan]"},
        "legislaturas": list(legs), "hist": hist, "curva": curva,
    })
    ctx.escribir_datos("longitud", ["legislatura", "tramo_desde", "tramo_hasta", "filas_presidencia", "filas_resto",
                                    "palabras_presidencia", "palabras_resto"], csv_long)

    # ── 06 · F12: la fila más larga no es un discurso ────────────────────────────────────────────────────────
    mapa = ctx.mapa_v2_v3()
    exige(int(s.idxmax()) >= 0 and int(v2.loc[s.idxmax(), "id"]) == DESPIECE["prieto"], "F12: la fila más larga de la V2 ya no es la 55221")
    rol2 = por_id["rol"]
    despiece, csv_desp = [], []
    for nombre, id2 in DESPIECE.items():
        pz = mapa[mapa["id_v2"] == id2].sort_values("id_v3")
        exige(len(pz) > 0, f"F12: la V2 {id2} no está en el mapa")
        piezas = []
        for p in pz.itertuples():
            r3 = v3i.loc[int(p.id_v3)]
            if p.clase == "comentario":
                tipo = "documento"
            elif p.clase == "turno":
                tipo = "turno"
            elif r3["role"] in PRESIDENCIA:
                tipo = "presidencia"
            else:
                tipo = "habla"
            piezas.append({"id_v3": int(p.id_v3), "clase": p.clase, "tipo": tipo, "nwords": int(r3["nwords"]),
                           "rotulo": r3["speaker"], "orador": uso(r3["rep_id"]) if pd.notna(r3["rep_id"]) else "",
                           "comienzo": _comienzo(txt3[int(p.id_v3)])})
        r2 = por_id.loc[id2]
        exige(sum(x["nwords"] for x in piezas) == int(r2["nwords"]), f"F12: las piezas de V2 {id2} no suman sus palabras")
        despiece.append({"clave": nombre, "id_v2": int(id2), "fecha": r2["date"], "rotulo": r2["speaker"],
                         "orador": uso(r2["rep_id"]), "nwords": int(r2["nwords"]), "presidencia": bool(rol2[id2] in PRESIDENCIA),
                         "piezas": piezas})
        for x in piezas:
            csv_desp.append([id2, x["id_v3"], x["tipo"], x["orador"] or x["rotulo"], x["nwords"], x["comienzo"]])
    d = {x["clave"]: x for x in despiece}
    exige([p["id_v3"] for p in d["prieto"]["piezas"]] == [61929, 61930, 61931, 61932], "F12: el despiece de 55221 cambió")
    exige([p["id_v3"] for p in d["estatuto"]["piezas"]] == [29041, 29042], "F12: el despiece de 25979 cambió")
    exige([p["id_v3"] for p in d["azana1935"]["piezas"]] == [96282], "F12: el despiece de 85330 cambió")
    for nombre, id2 in DESPIECE.items():
        pon(f"fila.{nombre}.id.V2", int(id2), "id", "V2", f"id de la fila V2 ({d[nombre]['fecha']}, {d[nombre]['rotulo']})")
    pon("fila.prieto.nwords", d["prieto"]["nwords"], "n", "V2", "nwords de la fila V2 55221 (la más larga)")
    pon("fila.azana1935.nwords", d["azana1935"]["nwords"], "n", "V2", "nwords de la fila V2 85330 (= v3 96282)")
    pon("fila.prieto.habla", sum(p["nwords"] for p in d["prieto"]["piezas"] if p["tipo"] == "habla"), "n", "v3",
        "nwords de las piezas de habla de V2 55221 (v3 61929 + 61931)")
    pon("fila.prieto.documentos", sum(p["nwords"] for p in d["prieto"]["piezas"] if p["tipo"] == "documento"), "n", "v3",
        "nwords de las piezas de comentario de V2 55221 (v3 61930 + 61932)")
    pon("fila.estatuto.id.v3", 29042, "id", "v3", "turno rescatado de Azaña (27-V-1932) en la v3")
    pon("fila.estatuto.nwords.v3", int(v3i.loc[29042, "nwords"]), "n", "v3", "nwords de la fila v3 29042")
    ctx.escribir_json("despiece.json", {
        "_meta": {"fuente": "mapa V2 → v3 del proyecto (mapa_v2_v3.json, sin publicar) y la v3 (corpus.sqlite)", "exportado": ctx.hoy,
                  "tipos": {"habla": "habla del orador", "documento": "comentario del Diario", "turno": "turno rescatado",
                            "presidencia": "Presidencia"}},
        "filas": despiece,
    })
    ctx.escribir_datos("fila_larga", ["id_V2", "id_v3", "tipo", "a_nombre_de", "palabras", "comienzo"], csv_desp)
    com = mapa[mapa["clase"] == "comentario"]
    tur = mapa[mapa["clase"] == "turno"]
    pon("v3.comentarios.en_presidencia", float(com["id_v2"].astype(int).map(rol2).isin(PRESIDENCIA).mean()), "pct", "v3",
        "bloques de comentario cuya fila V2 de origen es de la Presidencia", "CALC")
    pon("v3.turnos.en_presidencia", float(tur["id_v2"].astype(int).map(rol2).isin(PRESIDENCIA).mean()), "pct", "v3",
        "turnos rescatados cuya fila V2 de origen es de la Presidencia", "CALC")

    # ── 08 · partido, familia e ideología ─────────────────────────────────────────────────────────────────────
    pon("familias.liberal.filas", int((v2["party_family"] == "Liberal").sum()), "n", "V2", 'filas con party_family = "Liberal"')
    # D-25 (23-09-2026): pendientes de datos que el sitio DECLARA con su cifra (Versiones) y no corrige en origen.
    mb = v2[v2["rep_name"] == "Diego Martinez Barrio"]
    exige(set(mb["rep_id"].astype(str)) == {"550"}, "D-25: Diego Martinez Barrio ya no es solo el rep_id 550")
    pon("pendiente.martinez_barrio_ar.filas", int(((mb["legislature"] == "1931-1933") & (mb["party"] == "AR")).sum()), "n", "V2",
        'filas del rep_id 550 (Diego Martinez Barrio) con party = "AR" en la legislatura 1931-1933')
    pon("pendiente.lliga_cd.filas", int(((v2["party"] == "Lliga") & (v2["ideology"].str.strip() == "CD")).sum()), "n", "V2",
        'filas con party = "Lliga" e ideology = "CD" (el README la da como D)')
    for c in ("D", "CD", "C"):
        pon(f"ideologia.ceda.{c}", int(((v2["party"] == "CEDA") & (v2["ideology"].str.strip() == c)).sum()), "n", "V2",
            f'filas con party = "CEDA" e ideology = "{c}"')

    # ── 09 · la lista nominal como texto ──────────────────────────────────────────────────────────────────────
    exige("Total, 161." in txt2[5453] and "Total, 121." in txt2[5453] and rol2[5453] == "chair", "la fila 5453 ya no trae la lista")
    pon("fila.lista.nwords", int(por_id.loc[5453, "nwords"]), "n", "V2", "nwords de la fila V2 5453")
    return C
