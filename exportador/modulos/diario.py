"""diario · El Diario de Sesiones como fuente (dueño: grupo 4, El Diario y Método).

Figuras y archivos
  F27  «Luz y taquígrafos», diez veces: las diez filas V2 cuyo texto plegado dice «luz y taquígrafos», con su par v3
       (FTS5 del explorador, la misma búsqueda que su buscador). Se COMPRUEBA en cada ejecución que la búsqueda sigue
       dando esas diez filas en las dos ediciones y que cada fragmento citado está letra a letra en las dos filas.
  F28  Lo que el Diario calla: «no constará(n)» con «diario» a menos de 60 caracteres (diez filas V2: ocho órdenes de la
       Presidencia, una petición y una ajena) y las cinco acotaciones «no se consigna(n) / no constan por orden». La
       clasificación de cada fila es LECTURA (clave «L»): el exportador comprueba que la búsqueda sigue devolviendo
       exactamente esas filas y que cada una dice lo que se cita.
  Escribe `src/data/diario.json` (F27 + F28, con el mes de cada marca) y `public/datos/luz_y_taquigrafos.csv` y
  `public/datos/no_constara.csv` (con sus .xlsx).
  Cifras: `f27.*`, `f28.*`, `fuente.*` y los ids de las citas de la página (`cita.<clave>.V2|v3`, `.palabras`), según
  `docs/marcadores/diario.md`. Las que ya dio un módulo anterior (p. ej. `cita.figueres.*` de sesiones.py) no se
  repiten: ver `_ya_dadas`.
"""
from __future__ import annotations

import inspect
import json
import re

from comun import BASE_2REP, MARCADORES, exige, leer_json

# (V2, v3) de cada fila, en orden cronológico. La búsqueda las vuelve a encontrar en cada ejecución.
F27 = [(420, 472), (23898, 26612), (24658, 27477), (55902, 62718), (57506, 64595), (71330, 80306), (75263, 84760),
       (79803, 89910), (99859, 112827), (106747, 120751)]
ORDENES = [(13605, 15129), (45115, 50466), (45440, 50818), (102484, 115828), (102486, 115830), (102492, 115836),
           (103251, 116698), (106290, 120222)]
PETICION = (104406, 118058)
AJENA = (64659, 72690)
ACOTACIONES = [(103182, 116626, "consigna"), (103250, 116697, "constan"), (105310, 119084, "constan"),
               (105324, 119098, "consigna"), (106289, 120221, "consigna")]
BALBONTIN = 98          # rep_id de José Antonio Balbontín
PREFIJOS_CITA = ("diario.", "f27.", "f28.")
OTRAS_CITAS = ("figueres.fotocopia", "mexico.permanente", "sufragio.campoamor.ciudadana")


def _ya_dadas(ctx=None) -> set[str]:
    """Claves que ya ha dado un módulo anterior en esta exportación (exportar.py › main › C).

    El contrato hace fallar la exportación si dos módulos dan la misma cifra. Algunas cifras de esta página las declaran
    también otros grupos (los ids de las citas de las puertas, p. ej.): si el módulo que corre antes ya las dio, aquí no
    se repiten. Se lee el diccionario de quien llama; si no se encuentra (otra forma de llamar), no se omite nada."""
    if ctx is not None and getattr(ctx, "dadas", None):
        return set(ctx.dadas)
    marco = inspect.currentframe()
    try:
        while marco is not None:
            C = marco.f_locals.get("C")
            if marco.f_code.co_name == "main" and isinstance(C, dict):
                return set(C)
            marco = marco.f_back
    finally:
        del marco
    return set()


def registro_citas() -> dict[str, dict]:
    """El registro de citas (`docs/marcadores/citas.md`, bloque JSON final): clave → {v2, v3, fragmentos, …}."""
    txt = (MARCADORES / "citas.md").read_text(encoding="utf-8")
    m = re.search(r"```json\s*(\[.*?\])\s*```", txt, re.S)
    exige(m is not None, "docs/marcadores/citas.md no trae su bloque JSON")
    return {c["clave"]: c for c in json.loads(m.group(1))}


# ── el facsímil: la página impresa de la que salen las dos filas de F20 ──────────────────────────────────────────────
# Diario de Sesiones de las Cortes Constituyentes, núm. 48 (1-X-1931), p. 1353: el escaneo del proyecto (PDF del
# archivo histórico del Congreso), página 8 del archivo. Se toma la columna derecha, donde la Presidencia pide silencio
# y Campoamor pide que la escuchen en silencio: son las filas V2 5423 y 5424. Nada se redibuja ni se retoca: se
# rasteriza el escaneo, la tinta pasa a canal alfa (el sitio la pinta con su color de tinta, en los dos temas) y se
# anotan, con las cajas que da la capa de texto del propio PDF, el rótulo de cada orador, una acotación y una
# interrupción. Cada caja se comprueba leyendo lo que el PDF dice dentro.
FACSIMIL_PDF = BASE_2REP / "PDF" / "D_D_1931_1933_C-0048-01347.pdf"
FACSIMIL_SHA256 = "ac506387005136c952d036240b85c4807c9574d9e269ec1e0100981c540a1ef8"
FACSIMIL_PAGINA = 8                      # del archivo PDF (1 = la primera)
FACSIMIL_DIARIO = 1353                   # página impresa
FACSIMIL_RECORTE = (256.0, 38.0, 540.0, 240.0)   # en puntos PDF: x0, y0, x1, y1 (y1: la fila de píxeles sin tinta entre dos líneas)
FACSIMIL_COLUMNA_X = 295.0               # a la izquierda de esto, bajo la cabecera, está la otra columna: se borra
FACSIMIL_CABECERA_Y = 66.0
FACSIMIL_ESCALA = 3.0                    # 216 ppp
# Cajas (puntos PDF) y lo que la capa de texto del PDF lee dentro (su OCR, con sus erratas: «PRESIDENTS», «Krez»).
FACSIMIL_CAJAS = {
    "pagina": {"lineas": [(500.0, 46.5, 523.0, 59.0)], "lee": "1353"},
    "interrupcion": {"lineas": [(420.0, 76.5, 533.0, 87.5), (302.0, 87.5, 533.0, 98.5), (302.0, 98.5, 469.0, 109.5)],
                     "lee": "Madrigal"},
    "rotulo_presidencia": {"lineas": [(318.0, 110.0, 419.0, 121.0)], "lee": "PRESIDENT"},
    "texto_presidencia": {"lineas": [(422.0, 110.0, 533.0, 121.0), (302.0, 121.0, 375.0, 132.0)], "lee": "guarde silencio"},
    "rotulo_campoamor": {"lineas": [(318.0, 131.5, 432.0, 142.5)], "lee": "CAMPOAMOR"},
    "texto_campoamor": {"lineas": [(435.0, 131.5, 533.0, 142.5), (302.0, 142.5, 533.0, 153.5)], "lee": "escuche en silencio"},
    "acotacion": {"lineas": [(482.0, 208.5, 534.0, 219.5), (302.0, 219.0, 351.0, 230.0)], "lee": "Aplausos"},
}


def _facsimil(ctx) -> dict:
    import fitz  # PyMuPDF
    from PIL import Image

    from comun import huella
    exige(FACSIMIL_PDF.exists(), f"falta el escaneo {FACSIMIL_PDF}")
    exige(huella(FACSIMIL_PDF) == FACSIMIL_SHA256, f"{FACSIMIL_PDF.name} no es el escaneo esperado")
    doc = fitz.open(FACSIMIL_PDF)
    pag = doc[FACSIMIL_PAGINA - 1]
    meta = ctx.meta_sesion("1931-10-01-48")
    exige(meta["page_start"] <= FACSIMIL_DIARIO <= meta["page_end"], "facsímil: la p. 1353 no es de la sesión 48 según sessions.json")
    exige(meta["archivo"].replace(".txt", ".pdf") == FACSIMIL_PDF.name, "facsímil: sessions.json da otro archivo para la sesión 48")
    x0, y0, x1, y1 = FACSIMIL_RECORTE
    for nombre, c in FACSIMIL_CAJAS.items():
        dentro = " ".join(pag.get_textbox(fitz.Rect(*r)) for r in c["lineas"])
        exige(c["lee"] in " ".join(dentro.split()), f"facsímil › {nombre}: el PDF no dice «{c['lee']}» ahí (lee «{dentro[:60]}»)")
    pix = pag.get_pixmap(matrix=fitz.Matrix(FACSIMIL_ESCALA, FACSIMIL_ESCALA), clip=fitz.Rect(x0, y0, x1, y1),
                         colorspace=fitz.csGRAY, alpha=False)
    gris = Image.frombytes("L", (pix.width, pix.height), pix.samples)
    # La tinta pasa a alfa: papel (claro) → transparente, tinta (oscura) → opaca. Una curva de niveles, sin umbral duro.
    alfa = gris.point(lambda g: max(0, min(255, round((222 - g) * 255 / 150))))
    ancho_borrado = round((FACSIMIL_COLUMNA_X - x0) * FACSIMIL_ESCALA)
    alto_cabecera = round((FACSIMIL_CABECERA_Y - y0) * FACSIMIL_ESCALA)
    alfa.paste(0, (0, alto_cabecera, ancho_borrado, pix.height))
    img = Image.new("RGBA", gris.size, (0, 0, 0, 0))
    img.putalpha(alfa)
    tmp = ctx.staging / "tmp_facsimil.webp"
    img.save(tmp, "WEBP", quality=82, alpha_quality=90, method=6)
    nombre = f"facsimil/diario_1931-10-01_p{FACSIMIL_DIARIO}.webp"
    ctx.copiar_a_data(tmp, nombre)
    tmp.unlink()
    w, h = x1 - x0, y1 - y0

    def rel(r):
        return [round((r[0] - x0) / w, 4), round((r[1] - y0) / h, 4), round((r[2] - x0) / w, 4), round((r[3] - y0) / h, 4)]
    return {
        "imagen": nombre, "ancho": pix.width, "alto": pix.height, "proporcion": round(w / h, 4),
        "pdf": FACSIMIL_PDF.name, "pdf_sha256": FACSIMIL_SHA256, "pagina_pdf": FACSIMIL_PAGINA, "pagina": FACSIMIL_DIARIO,
        "numero": 48, "fecha": "1931-10-01", "filas_v2": [5423, 5424], "filas_v3": [6078, 6079],
        "cajas": {k: [rel(r) for r in c["lineas"]] for k, c in FACSIMIL_CAJAS.items()},
        "nota": "Escaneo del proyecto, sin retocar: la tinta pasa a canal alfa; se borra solo la columna izquierda bajo la cabecera.",
    }


def _normaliza(s: str) -> str:
    """El copy escribe “ ” donde el texto trae comillas rectas; el aserto compara con las rectas."""
    return (s or "").replace("“", '"').replace("”", '"')


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}
    dadas = _ya_dadas(ctx)

    def pon(k, v, t, base, f, clave="C", **kw):
        exige(k not in C, f"diario: cifra {k} repetida")
        if k not in dadas:
            C[k] = ctx.cifra(v, t, base, f, clave, **kw)

    v2 = ctx.v2()
    fold = ctx.v2_plegado()
    por_id = v2.set_index("id")
    graf = leer_json(ctx.data / "grafias.json")["grafias"]
    reg = registro_citas()

    def nombre(rep_id, campo="uso"):
        if rep_id is None or str(rep_id) in ("", "<NA>", "nan"):
            return ""
        g = graf.get(str(int(rep_id)))
        return (g or {}).get(campo) or (g or {}).get("grafia") or ""

    def texto_v2(i):
        return ctx.fila_v2(i)["speech"] or ""

    def texto_v3(i):
        return ctx.fila_v3(i)["speech"] or ""

    def comprueba(clave, id2, id3):
        c = reg[clave]
        exige((c["v2"], c["v3"]) == (id2, id3), f"citas.md › {clave}: ids {c['v2']}/{c['v3']} ≠ {id2}/{id3}")
        for fr in c["fragmentos"]:
            exige(_normaliza(fr) in texto_v2(id2), f"{clave}: «{fr[:50]}…» no está letra a letra en la fila V2 {id2}")
            exige(_normaliza(fr) in texto_v3(id3), f"{clave}: «{fr[:50]}…» no está letra a letra en la fila v3 {id3}")
        return c

    def preside(id2):
        """Quien presidía al escribirse la fila: la propia fila si es de la Presidencia; si no, la última de la
        Presidencia antes de ella en la misma sesión (parse_speaker del explorador)."""
        r = por_id.loc[id2]
        ses = v2[(v2["clave"] == r["clave"]) & (v2["id"] <= id2) & v2["presidencia"]]
        exige(len(ses) > 0, f"F28: no hay fila de la Presidencia antes de la V2 {id2}")
        return nombre(ses.iloc[-1]["rep_id"], "corto")

    def base_fila(id2, id3):
        r = por_id.loc[id2]
        f3 = ctx.fila_v3(id3)
        exige(f3["date"] == r["date"] and int(f3["num_session"]) == int(r["num_session"]),
              f"v3 {id3} no es de la sesión de la V2 {id2}")
        return {
            "fecha": r["date"], "mes": r["mes"], "num_session": int(r["num_session"]), "leg": r["legislature"],
            "id_v2": int(id2), "id_v3": int(id3), "rotulo": r["speaker"],
            "rep_id": None if str(r["rep_id"]) == "<NA>" else int(r["rep_id"]),
            "orador": nombre(r["rep_id"]), "corto": nombre(r["rep_id"], "corto"), "party": r["party"] or "",
            "presidencia": bool(r["presidencia"]),
        }

    # ── F27 ────────────────────────────────────────────────────────────────────────────────────────────────────
    ids27 = ctx.buscar_v2(r"luz\s+y\s+taquigraf")
    exige(ids27 == [a for a, _ in F27], f"F27: la búsqueda en la V2 da {ids27}")
    fts27 = sorted(ctx.fts_v3('"luz y taquigrafos"'))
    exige(fts27 == sorted(b for _, b in F27), f"F27: la FTS del explorador da {fts27}")
    f27 = []
    for n, (a, b) in enumerate(F27, 1):
        c = comprueba(f"f27.{n}", a, b)
        x = base_fila(a, b)
        f27.append({"n": n, **x, "fragmento": " … ".join(c["fragmentos"])})
        pon(f"f27.{n}.fecha", x["fecha"], "fecha", "V2", "date de la fila")
    pon("f27.n", len(F27), "n", "V2", "filas V2 con «luz y taquígrafos» (texto plegado); las mismas diez en v3 por FTS5")
    pon("f27.desde", f27[0]["fecha"], "fecha", "V2", "primera fila")
    pon("f27.hasta", f27[-1]["fecha"], "fecha", "V2", "última fila")
    pon("f27.balbontin", sum(1 for x in f27 if x["rep_id"] == BALBONTIN), "n", "V2",
        "de las diez filas de F27, las de José Antonio Balbontín (rep_id 98)")

    # ── F28 ────────────────────────────────────────────────────────────────────────────────────────────────────
    formula = ctx.buscar_v2(r"no constar(?:a|an)\b.{0,60}?diario")
    esperadas = sorted([a for a, _ in ORDENES] + [PETICION[0], AJENA[0]])
    exige(formula == esperadas, f"F28: la fórmula da {formula}")
    near = sorted(ctx.fts_v3('NEAR("no constaran" "diario", 10) OR NEAR("no constara" "diario", 10)'))
    exige(near == sorted([b for _, b in ORDENES] + [PETICION[1], AJENA[1]]), f"F28: la FTS NEAR da {near}")
    consigna = ctx.buscar_v2(r"no se consigna(?:n)?\s+por\s+orden")
    constan = ctx.buscar_v2(r"no constan por orden")
    exige(consigna == [a for a, _, k in ACOTACIONES if k == "consigna"], f"F28: «no se consigna(n)» da {consigna}")
    exige(constan == [a for a, _, k in ACOTACIONES if k == "constan"], f"F28: «no constan» da {constan}")
    fts_aco = sorted(ctx.fts_v3('"no se consignan por orden" OR "no se consigna por orden" OR "no constan por orden"'))
    exige(fts_aco == sorted(b for _, b, _ in ACOTACIONES), f"F28: la FTS de las acotaciones da {fts_aco}")
    f28 = []
    for n, (a, b) in enumerate(ORDENES, 1):
        c = comprueba(f"f28.orden.{n}", a, b)
        x = base_fila(a, b)
        exige(x["presidencia"], f"F28: la orden V2 {a} no es una fila de la Presidencia")
        f28.append({"tipo": "orden", "n": n, **x, "preside": preside(a), "fragmento": " … ".join(c["fragmentos"])})
        pon(f"f28.orden.{n}.fecha", x["fecha"], "fecha", "V2", "fecha")
    for n, (a, b, _k) in enumerate(ACOTACIONES, 1):
        c = comprueba(f"f28.acotacion.{n}", a, b)
        x = base_fila(a, b)
        f28.append({"tipo": "acotacion", "n": n, **x, "preside": preside(a), "fragmento": " … ".join(c["fragmentos"])})
        pon(f"f28.acotacion.{n}.fecha", x["fecha"], "fecha", "V2", "fecha")
    for tipo, (a, b), clave in (("peticion", PETICION, "f28.peticion"), ("ajena", AJENA, "f28.ajena")):
        c = comprueba(clave, a, b)
        x = base_fila(a, b)
        f28.append({"tipo": tipo, "n": 1, **x, "preside": preside(a), "fragmento": " … ".join(c["fragmentos"])})
        pon(f"{clave}.fecha", x["fecha"], "fecha", "V2", f"fecha de la {'petición' if tipo == 'peticion' else 'fila ajena'}")
    f28.sort(key=lambda x: (x["fecha"], x["id_v2"], x["tipo"]))
    ordenes = [x for x in f28 if x["tipo"] == "orden"]
    pon("f28.formula.filas", len(formula), "n", "V2",
        "filas V2 cuyo texto plegado dice «no constará(n)» y, a menos de 60 caracteres, «diario»; las mismas diez en v3 (FTS5 NEAR)")
    pon("f28.ordenes", len(ordenes), "n", "V2", "de esas diez, órdenes de la Presidencia, leídas una a una", "L")
    pon("f28.ordenes.1936", sum(1 for x in ordenes if "1936-04-01" <= x["fecha"] <= "1936-07-31"), "n", "V2",
        "órdenes entre abril y julio de 1936", "L")
    pon("f28.15abril.ordenes", sum(1 for x in ordenes if x["fecha"] == "1936-04-15"), "n", "V2",
        "órdenes del 15-IV-1936: V2 102484, 102486 y 102492 (v3 115828, 115830, 115836)", "L")
    pon("f28.peticion", 1, "n", "V2", "petición de un diputado (Calvo Sotelo, V2 104406)", "L")
    pon("f28.ajena", 1, "n", "V2", "fila con la fórmula en otro sentido (V2 64659)", "L")
    pon("f28.acotaciones", len(ACOTACIONES), "n", "V2", "acotaciones «no se consigna(n) por orden» y «no constan por orden»")
    pon("f28.acotaciones.consigna", len(consigna), "n", "V2", "acotaciones «no se consigna(n) por orden»")
    pon("f28.acotaciones.constan", len(constan), "n", "V2", "acotaciones «no constan por orden»")
    pon("f28.fts_plural", len(ctx.fts_v3('"no constaran en el diario"')), "n", "v3", "FTS5 exacta «no constarán en el Diario» en v3")
    pon("f28.marcas", len(ordenes) + len(ACOTACIONES), "n", "V2", "marcas de F28: órdenes + acotaciones", "CALC")

    # ── la fuente ───────────────────────────────────────────────────────────────────────────────────────────────
    S = ctx.proyecto()["sessions"]
    series: dict[str, int] = {}
    for s in S:
        series[s["diario"]] = series.get(s["diario"], 0) + 1
    SERIES = {
        "constituyentes": "Diario de Sesiones de las Cortes Constituyentes de la República Española",
        "cortes": "Diario de las Sesiones de Cortes. Congreso de los Diputados",
        "extracto_guerra": "Extracto oficial de las sesiones. Congreso de los Diputados",
        "extracto_mexico": "Extracto oficial de las sesiones de Cortes celebradas en México (exilio)",
    }
    exige(set(series) == set(SERIES.values()), f"sessions.json trae otras series: {sorted(series)}")
    for k, titulo in SERIES.items():
        pon(f"fuente.serie.{k}", series[titulo], "n", "proyecto", "sesiones con ese título de Diario en sessions.json", "M")
    pon("fuente.series.n", len(series), "n", "proyecto", "títulos de Diario distintos en sessions.json", "M")
    pon("fuente.series.diarios", sum(1 for k in series if k.startswith("Diario")), "n", "proyecto", "títulos que empiezan por «Diario»", "M")
    pon("fuente.series.extractos", sum(1 for k in series if k.startswith("Extracto")), "n", "proyecto", "títulos que empiezan por «Extracto»", "M")
    verificadas = set(ctx.proyecto()["page_verified_status"])
    pon("fuente.paginas.verificadas", sum(1 for s in S if s["page_status"] in verificadas), "n", "proyecto",
        "sesiones con page_status contiguous, verso_blank o corrected", "M")
    pon("fuente.paginas.den", len(S), "n", "proyecto", "sesiones en sessions.json", "M")
    pon("fuente.paginas.total", sum(s["pdf_pages"] or 0 for s in S), "n", "proyecto",
        "suma de pdf_pages (páginas de los archivos del proyecto, portadas incluidas)", "M")
    v3 = ctx.v3()
    pon("fuente.sumarios.v3", int((v3["speaker"] == "SUMARIO").sum()), "n", "v3", "filas SUMARIO de la v3")
    pon("fuente.comentarios.v3", int((v3["speaker"] == "COMENTARIOS").sum()), "n", "v3", "filas COMENTARIOS de la v3")
    for k, expr, que in (("cita_diario", r"diario de sesiones", "«diario de sesiones»"),
                         ("no_perciben", r"palabras que no se perciben", "«palabras que no se perciben»")):
        mk = fold.str.contains(expr, regex=True)
        ids = set(int(i) for i in fold.index[mk])
        sub = v2[v2["id"].isin(ids)]
        pon(f"fuente.{k}.filas", len(ids), "n", "V2", f"filas V2 cuyo texto plegado contiene {que}")
        pon(f"fuente.{k}.sesiones", int(sub["clave"].nunique()), "n", "V2", "sesiones de esas filas")
    pon("fuente.no_perciben.filas_v3", len(ctx.fts_v3('"palabras que no se perciben"')), "n", "v3",
        "FTS5 «palabras que no se perciben» en v3")
    barriga = ctx.buscar_v2(r"tiros a la barriga")
    exige(barriga == [70714], f"«tiros a la barriga» da {barriga} en la V2")
    pon("fuente.barriga.v2.filas", len(barriga), "n", "V2", "filas V2 con «tiros a la barriga» (texto plegado, sin coma)")
    ib = v2[(v2["date"] == "1936-06-16") & (v2["rep_name"] == "Dolores Ibarruri Gomez")]
    exige(len(ib) == 1, "Ibárruri: no hay exactamente una fila el 16-VI-1936")
    exige(not fold.str.contains("hablado por ultima vez").any() and not ctx.fts_v3('"hablado por ultima vez"'),
          "«hablado por última vez» aparece en el corpus: revise diario.calla.ausencias.ibarruri")
    pon("fuente.ibarruri.V2", int(ib["id"].iloc[0]), "id", "V2", "fila V2 de Dolores Ibárruri el 16-VI-1936")

    # ── ids de las citas de la página ───────────────────────────────────────────────────────────────────────────
    for clave, c in reg.items():
        if not (clave.startswith(PREFIJOS_CITA) or clave in OTRAS_CITAS):
            continue
        for ed, i, leer in (("V2", c["v2"], texto_v2), ("v3", c["v3"], texto_v3)):
            if i is None:
                continue
            for fr in c["fragmentos"]:
                exige(_normaliza(fr) in leer(i), f"cita {clave}: «{fr[:50]}…» no está letra a letra en la fila {ed} {i}")
            pon(f"cita.{clave}.{ed}", int(i), "id", ed, f"fila {ed} donde está, letra a letra, la cita {clave} (citas.md)", "L")
    pon("cita.diario.grito.palabras", int(por_id.loc[71330, "nwords"]), "n", "V2", "nwords de la fila V2 71330")

    # ── archivos ────────────────────────────────────────────────────────────────────────────────────────────────
    facsimil = _facsimil(ctx)
    pon("fuente.facsimil.pagina", facsimil["pagina"], "id", "proyecto",
        "página impresa del detalle del núm. 48 (PDF del proyecto, página 8 del archivo; en el rango de la sesión en sessions.json)", "M")
    ctx.escribir_json("diario.json", {
        "_meta": {
            "fuente": "V2 (2REP_Diaries.csv) y v3 (corpus.sqlite del explorador), con sus huellas; clasificación de F28 leída fila a fila",
            "exportado": ctx.hoy,
            "f27": "filas con «luz y taquígrafos» (texto plegado en la V2; FTS5 en la v3)",
            "f28": "órdenes de la Presidencia, acotaciones del taquígrafo, una petición y una fila ajena (no se dibuja)",
        },
        "f27": f27, "f28": f28, "facsimil": facsimil,
    })
    ctx.escribir_datos("luz_y_taquigrafos",
                       ["fecha", "num_session", "orador_rotulo", "rep_id", "rep_name", "party", "fragmento", "id_V2", "id_v3"],
                       [[x["fecha"], x["num_session"], x["rotulo"], x["rep_id"] or "", x["orador"], x["party"],
                         x["fragmento"], x["id_v2"], x["id_v3"]] for x in f27])
    ctx.escribir_datos("no_constara",
                       ["fecha", "num_session", "tipo", "preside", "orador_fila", "fragmento", "id_V2", "id_v3"],
                       [[x["fecha"], x["num_session"], x["tipo"], x["preside"], x["orador"] or x["rotulo"],
                         x["fragmento"], x["id_v2"], x["id_v3"]] for x in f28])
    return C
