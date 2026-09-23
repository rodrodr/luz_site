"""explorador · La página del explorador (dueño: grupo 6, explorador y afinidades).

Figuras y archivos:
  F17  Las bibliotecas del proyecto, en el tiempo (v3). `ctx.bibliotecas()` (base) da las 31 bibliotecas del explorador
       publicado; aquí se les añade su grupo, sus sesiones con fecha y número, una descripción SIN rutas internas ni el
       criterio de reacción, y los cinco oradores con más palabras sin la Presidencia (grafía de `grafias.json`).
       Escribe `src/data/bibliotecas.json` y `public/datos/bibliotecas.csv|xlsx` (una fila por biblioteca y sesión).
  F29  Búsquedas de muestra, recontadas con el FTS5 de la v3 (el índice que usa el buscador del explorador) y FECHADAS.
       Escribe `src/data/busquedas.json` y `public/datos/busquedas.csv|xlsx`.
Cifras: `busqueda.*`, `busquedas.fecha`, `bib.debates_enteros`, `bib.sufragio.n`, `explorador.capturas.fecha`
(docs/marcadores/explorador.md). Las que ya pone base.py (bib.n, bib.entradas, bib.debates, v3.huella…) no se repiten.
"""
from __future__ import annotations

import re
from pathlib import Path

from comun import RAIZ, exige, leer_json

HABLA = "s.speaker NOT IN ('SUMARIO','COMENTARIOS')"
LEEME_CAPTURAS = RAIZ / "src" / "assets" / "explorador" / "LEEME.md"

# F29: id → (consulta como se escribe en el buscador del explorador, consulta FTS5 equivalente).
# El buscador traduce `|` a OR y `+` a AND; las comillas son la frase exacta (comprobado en la pantalla: 40 = 40).
BUSQUEDAS = [
    ("voto_femenino", '"voto femenino"', '"voto femenino"'),
    ("voto_mujer", '"voto de la mujer"', '"voto de la mujer"'),
    ("voto_union", '"voto femenino" | "voto de la mujer"', '"voto femenino" OR "voto de la mujer"'),
    ("casas_viejas", '"casas viejas"', '"casas viejas"'),
    ("divorcio", "divorcio", "divorcio"),
    ("reforma_agraria", '"reforma agraria"', '"reforma agraria"'),
    ("estatuto", '"estatuto de cataluña"', '"estatuto de cataluña"'),
    ("catolica", '"España ha dejado de ser católica"', '"España ha dejado de ser católica"'),
]
# Fecha de los recuentos: el día en que se comprobaron contra la pantalla del explorador, para ESTA base (huella de la
# v3). Mientras la huella no cambie, los recuentos no cambian y la fecha tampoco (así la frase «Recuentos del …» no
# envejece un día en cada exportación). Si la base cambia, se usa la fecha de la exportación y se avisa: hay que volver
# a comprobarlos en la pantalla.
FECHA_COMPROBADA = {"3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15": "2026-09-22"}
GRUPOS = {"L1": "discursos", "L2": "debates", "L3": "sesiones", "L4": "anecdotas"}
ORDEN_GRUPOS = ["discursos", "debates", "sesiones", "anecdotas"]
# «Sesiones más crispadas» y «Sesiones decisivas» se definen con el criterio de reacción del explorador, que el sitio no
# describe (plan § F17): su ficha lleva la nota `fig.F17.ficha.criterio` en lugar de la descripción.
SIN_CRITERIO = {"L3-interno", "L3-nucleo"}


def _limpia_descripcion(clave: str, texto: str | None) -> str | None:
    """La descripción del explorador sin rutas internas, sin notas de trabajo y sin el criterio de reacción."""
    if not texto or clave in SIN_CRITERIO:
        return None
    frases = re.split(r"(?<=[.])\s+(?=[A-ZÁÉÍÓÚÑ«])", texto.strip())
    out = []
    for f in frases:
        if "docs/" in f or "tools/" in f:
            continue                                   # «Ficha B2 en docs/…», «Método: docs/…», «Criterio y método: docs/…»
        if re.search(r"las intervenciones de sus sesiones clave\.?$", f):
            continue                                   # la plantilla «X (fechas): …» repite el nombre y las fechas
        f = re.sub(r",\s*que no cubría ninguna biblioteca", "", f)
        f = f.replace("Calvo-Solelo", "Calvo-Sotelo")  # errata del explorador (la autora es Cabrera Calvo-Sotelo)
        out.append(f)
    d = " ".join(out).strip()
    exige(not re.search(r"docs/|tools/|IRP|índice de reacción", d), f"biblioteca {clave}: la descripción aún trae rutas o el criterio")
    return d or None


def _nombre_sin_prefijo(nombre: str) -> str:
    return re.sub(r"^Debate\s*·\s*", "", nombre)


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}
    db = ctx.v3_db()
    v3sha = ctx.huellas["v3_sha256"]

    def pon(k, v, t, base, f, **kw):
        exige(k not in C, f"cifra repetida en explorador: {k}")
        C[k] = ctx.cifra(v, t, base, f, **kw)

    def n(match: str, extra: str = "") -> int:
        return db.execute("SELECT count(*) FROM speeches_fts f JOIN speeches s ON s.id = f.rowid "
                          f"WHERE speeches_fts MATCH ? {extra}", (match,)).fetchone()[0]

    def fechas(match: str) -> tuple[str, str]:
        r = db.execute("SELECT min(s.date), max(s.date) FROM speeches_fts f JOIN speeches s ON s.id = f.rowid "
                       "WHERE speeches_fts MATCH ?", (match,)).fetchone()
        return r[0], r[1]

    # ── F29 · búsquedas de muestra ──────────────────────────────────────────────────────────────────────────────
    filas = []
    for bid, pantalla, fts in BUSQUEDAS:
        total, habla = n(fts), n(fts, "AND " + HABLA)
        desde, hasta = fechas(fts)
        filas.append({"id": bid, "consulta": pantalla, "fts": fts, "n": total, "habla": habla, "resto": total - habla,
                      "desde": desde, "hasta": hasta})
        pon(f"busqueda.{bid}.n", total, "n", "v3", f"FTS5 de la v3: count(*) WHERE speeches_fts MATCH '{fts}'")
        pon(f"busqueda.{bid}.habla", habla, "n", "v3", f"lo mismo con {HABLA} («Solo lo que se habla»)")
    por = {f["id"]: f for f in filas}
    # la unión y la intersección de las dos frases del voto
    ambas = n('"voto femenino" AND "voto de la mujer"')
    pon("busqueda.voto_ambas.n", ambas, "n", "v3", "FTS5: '\"voto femenino\" AND \"voto de la mujer\"'")
    exige(por["voto_femenino"]["n"] + por["voto_mujer"]["n"] - ambas == por["voto_union"]["n"], "F29: 20 + 28 − 8 ≠ 40")
    pon("busqueda.voto_union.desde", por["voto_union"]["desde"], "fecha", "v3", "min(date) de la unión", clave="CALC")
    pon("busqueda.voto_union.hasta", por["voto_union"]["hasta"], "fecha", "v3", "max(date) de la unión", clave="CALC")
    # «casas viejas»: primera fila y febrero de 1933 (la nota de Tendencia en la captura)
    cv = '"casas viejas"'
    pon("busqueda.casas_viejas.primera", por["casas_viejas"]["desde"], "fecha", "v3", "min(date) de «casas viejas»", clave="CALC")
    primera = db.execute("SELECT s.id, s.speaker FROM speeches_fts f JOIN speeches s ON s.id = f.rowid WHERE speeches_fts MATCH ? "
                         "ORDER BY s.date, s.num_session, s.ord LIMIT 1", (cv,)).fetchone()
    exige(primera[1] not in ("SUMARIO", "COMENTARIOS"), "la primera fila de «casas viejas» debía ser de habla")
    pon("busqueda.casas_viejas.m1933_02", n(cv, "AND substr(s.date,1,7)='1933-02'"), "n", "v3",
        "«casas viejas» en febrero de 1933 (la nota de Tendencia de la captura)")
    pon("busqueda.casas_viejas.m1933_02_habla", n(cv, f"AND substr(s.date,1,7)='1933-02' AND {HABLA}"), "n", "v3",
        "lo mismo con «Solo lo que se habla»")
    enero = db.execute("SELECT count(DISTINCT date||'-'||num_session) FROM speeches WHERE substr(date,1,7)='1933-01'").fetchone()[0]
    exige(enero == 0, f"el pie de Tendencia dice que en enero de 1933 no hubo sesiones, y hay {enero}")
    pon("busqueda.reforma_agraria_y.n", n("reforma agraria"), "n", "v3", "FTS5: 'reforma agraria' (las dos palabras, sin comillas)")
    # la de Azaña, en el orden de «Relevancia» (bm25, el que reproduce la pantalla)
    orden = [r[0] for r in db.execute("SELECT rowid FROM speeches_fts WHERE speeches_fts MATCH ? ORDER BY bm25(speeches_fts)",
                                      (por["catolica"]["fts"],))]
    exige(7531 in orden, "la fila v3 7531 (Azaña, 13-X-1931) no sale en «España ha dejado de ser católica»")
    pon("busqueda.catolica.puesto_azana", orden.index(7531) + 1, "n", "v3",
        "posición de la fila v3 7531 (Azaña, 13-X-1931) con ORDER BY bm25(speeches_fts), el orden «Relevancia»")
    fecha = FECHA_COMPROBADA.get(v3sha)
    if fecha is None:
        fecha = ctx.hoy
        ctx.aviso(f"la v3 ha cambiado ({v3sha[:8]}): compruebe los recuentos de F29 en la pantalla del explorador y fije su fecha")
    pon("busquedas.fecha", fecha, "fecha", "v3",
        f"día en que los recuentos se comprobaron en la pantalla del explorador, sobre la v3 {v3sha[:8]} (se recalculan en cada exportación)",
        clave="CALC")
    ctx.escribir_json("busquedas.json", {"fecha": fecha, "v3_sha256": v3sha, "busquedas": filas})
    ctx.escribir_datos("busquedas", ["id", "consulta", "consulta_fts5", "intervenciones", "solo_lo_que_se_habla",
                                     "sumarios_y_comentarios", "primera_fecha", "ultima_fecha", "fecha_recuento", "v3_sha256"],
                       [[f["id"], f["consulta"], f["fts"], f["n"], f["habla"], f["resto"], f["desde"], f["hasta"], fecha, v3sha]
                        for f in filas])
    ctx.compartido["busquedas.fecha"] = fecha

    # ── F17 · bibliotecas del proyecto ──────────────────────────────────────────────────────────────────────────
    v3 = ctx.v3().set_index("id")
    graf = leer_json(ctx.data / "grafias.json").get("grafias", {})
    habla_ses = v3[v3["habla"]].groupby("clave").size()
    bibl = []
    enteros = 0
    debates = 0
    for b in ctx.bibliotecas():
        clave = b["clave"]
        grupo = GRUPOS[clave.split("-")[0]]
        sub = v3.loc[b["ids_v3"]]
        # sesiones con fecha, número y entradas, en orden cronológico
        ses = []
        for k, e in sorted(b["sesiones"], key=lambda x: (x[0][:10], int(x[0][11:]))):
            ses.append({"f": k[:10], "s": int(k[11:]), "e": int(e)})
        # ¿reúne sus sesiones enteras (todo lo que se habla en ellas)?
        habla_b = sub[sub["habla"]]
        enteras = bool(len(habla_b) == len(sub) and sum(int(habla_ses.get(k, 0)) for k, _ in b["sesiones"]) == len(sub))
        if grupo == "debates":
            debates += 1
            enteros += enteras
        # los cinco con más palabras, sin la Presidencia (solo habla, con diputado)
        o = sub[sub["habla"] & ~sub["chair"] & sub["rep_id"].notna()]
        top = o.groupby("rep_id")["nwords"].agg(["sum", "size"]).sort_values(["sum", "size"], ascending=False).head(5)
        oradores = []
        for rid, r in top.iterrows():
            g = graf.get(str(int(rid)))
            exige(g is not None, f"biblioteca {clave}: el orador {int(rid)} no tiene grafía")
            partido = o.loc[o["rep_id"] == rid, "party"].dropna()
            oradores.append({"rep_id": int(rid), "nombre": g["uso"], "partido": partido.value_counts().index[0] if len(partido) else None,
                             "palabras": int(r["sum"]), "filas": int(r["size"])})
        bibl.append({
            "id": clave.lower().replace("-", ""), "grupo": grupo,
            "nombre": _nombre_sin_prefijo(b["nombre"]), "nombre_explorador": b["nombre"],
            "descripcion": _limpia_descripcion(clave, b["descripcion"]), "criterio": clave in SIN_CRITERIO,
            "entradas": b["entradas"], "palabras": b["palabras"], "desde": b["desde"], "hasta": b["hasta"],
            "sesiones": ses, "enteras": enteras if grupo == "debates" else None,
            "sumarios": int((~sub["habla"]).sum()), "oradores": oradores,
        })
    exige(debates == 26, f"se esperaban 26 debates y hay {debates}")
    pon("bib.debates_enteros", enteros, "n", "v3",
        "debates cuyas entradas son todas las filas de habla de sus sesiones (clave de sesión: fecha y número)")
    suf = next(x for x in bibl if x["id"] == "l2b2")
    pon("bib.sufragio.n", suf["entradas"], "n", "v3", "entradas de «Debate · Sufragio femenino» (L2-B2)")
    # orden: por grupo; dentro de cada grupo, por su primera sesión
    bibl.sort(key=lambda x: (ORDEN_GRUPOS.index(x["grupo"]), x["desde"], x["hasta"]))
    # los topes del eje: la primera y la última sesión del corpus (las marcas caen dentro)
    fs = [s["f"] for x in bibl for s in x["sesiones"]]
    ctx.escribir_json("bibliotecas.json", {
        "fecha": ctx.hoy, "v3_sha256": v3sha, "grupos": ORDEN_GRUPOS,
        "max_entradas_sesion": max(s["e"] for x in bibl for s in x["sesiones"]),
        "primera": min(fs), "ultima": max(fs), "bibliotecas": bibl,
    })
    ctx.escribir_datos("bibliotecas", ["biblioteca", "nombre_en_el_explorador", "grupo", "fecha", "num_session", "entradas",
                                       "entradas_biblioteca", "sesiones_biblioteca"],
                       [[x["nombre"], x["nombre_explorador"], x["grupo"], s["f"], s["s"], s["e"], x["entradas"], len(x["sesiones"])]
                        for x in bibl for s in x["sesiones"]])

    # ── capturas: la fecha común de las doce (LEEME del grupo «capturas») ────────────────────────────────────────
    m = re.search(r"\| Fecha y hora \| (\d{4}-\d{2}-\d{2})", LEEME_CAPTURAS.read_text(encoding="utf-8"))
    exige(m is not None, "no encuentro la fecha de las capturas en src/assets/explorador/LEEME.md")
    pon("explorador.capturas.fecha", m.group(1), "fecha", "explorador",
        "fecha de las capturas del explorador publicado (src/assets/explorador/LEEME.md)", clave="M")
    return C
