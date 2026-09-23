"""sesiones · Sesiones y votaciones, y las ocho puertas de lectura (dueño: sesiones, grupo 3 de la fase 2).

Qué calcula y qué escribe (contrato § Exportador; copy `docs/copy_es/sesiones*.md`; marcadores
`docs/marcadores/sesiones.md` y `citas.md`). Todo se lee en la fuente y se comprueba en cada ejecución: si una fila
deja de decir lo que el copy cita, la exportación FALLA (exige).

  F26  Lo que se votó en voz alta. Seis votaciones nominales ESCOGIDAS en cinco sesiones y, con otro trazo, la
       ordinaria del 1-X-1931. Cada total se lee en el texto de su fila (V2 y v3); los umbrales de la mitad más uno,
       en las tres filas que los imprimen (V2 13531, 37178 y 102359). Además, el REGISTRO de todas las filas con
       lista nominal, por etapa y por sesión (patrón común `senores que (dijeron|han dicho) (si|no)` sobre el texto
       plegado de la V2: 1.023 filas en 405 sesiones).
       → src/data/votaciones.json · public/datos/votaciones.csv|xlsx · public/datos/listas_nominales.csv|xlsx
  F30  La sesión, turno a turno: las filas V2 de las doce sesiones de las puertas, en su orden, con sus palabras, el
       papel de la Presidencia (parse_speaker del explorador) y el nombre con su grafía (tabla de grafías, D-22). La
       cola truncada de la sesión 48 (V2 5788–5792) va marcada. SIN CSV por fila (plan, anexo V10: serían datos fila a
       fila de una sesión, no agregados; D-23): la pestaña Datos remite a la exportación del explorador.
       → src/data/puertas.json (sesiones, cifras y turnos de cada puerta)
  Citas  Las 105 citas de `docs/marcadores/citas.md` (bloque JSON), una entrada POR FRAGMENTO en `citas` (lo que
       comprueba `exportar.py › valida_citas`, letra a letra en su fila V2 y en su fila v3) y, en `pasajes`, cada cita
       entera con su `tramo`: el trozo de la fila que va del primer fragmento al último. La plantilla de la puerta
       comprueba en la compilación que cada cita del copy está en su tramo (aserto de cita).
       → src/data/citas.json
  Cifras  voto.* · etapa.<E>.listas_nominales.* · ses.* · puerta.* · busqueda.ses.* · bib.<clave>.* · cita.<clave>.*
       (las de las puertas y de F26; las de `diario.*`, `f27.*` y `f28.*` son de diario.py).
Las cifras de las sesiones (`sesion.<fecha>-<n>.<campo>`) las resuelve exportar.py por familia desde sesiones.json.
"""
from __future__ import annotations

import inspect
import json
import re

from comun import MARCADORES, clave_sesion, exige

# Las ocho puertas de la edición 0.1, con sus sesiones (fecha, número). Las de la 0.2 no se exportan.
PUERTAS = {
    "sufragio-1931": {"etapa": "I", "sesiones": [("1931-10-01", 48)]},
    "cuestion-religiosa-1931": {"etapa": "I", "sesiones": [("1931-10-13", 55)]},
    "estatuto-1932": {"etapa": "I", "sesiones": [("1932-05-27", 173)]},
    "casas-viejas-1933": {"etapa": "I", "sesiones": [("1933-02-02", 288)]},
    "pistola-1934": {"etapa": "II", "sesiones": [("1934-07-04", 112)]},
    "antesala-1936": {"etapa": "III", "sesiones": [("1936-06-16", 45), ("1936-07-01", 54)]},
    "figueres-1939": {"etapa": "IV", "sesiones": [("1939-02-01", 69)]},
    "mexico-1945": {"etapa": "V", "sesiones": [("1945-08-17", 71), ("1945-11-07", 72), ("1945-11-08", 73), ("1945-11-09", 74)]},
}
UMBRAL_LARGAS = 300
# F26: las seis nominales escogidas y la ordinaria, en orden de fecha. `lee`: fragmentos que deben estar en las dos
# filas; `mitad`: (fila V2, fila v3, fragmento, total, mitad) donde el Diario imprime el umbral.
VOTOS = [
    {"clave": "141-106", "fecha": "1931-10-01", "si": 141, "no": 106, "nominal": False, "v2": 5453, "v3": 6110,
     "lee": ["En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106."],
     "puerta": "sufragio-1931"},
    {"clave": "161-121", "fecha": "1931-10-01", "si": 161, "no": 121, "nominal": True, "v2": 5453, "v3": 6110,
     "lee": ["art. 34 (numeración antigua)", "Total, 161.", "Total, 121.", "Srta. Campoamor.", "Srta. Victoria Kent."],
     "puerta": "sufragio-1931"},
    {"clave": "178-59", "fecha": "1931-10-13", "si": 178, "no": 59, "nominal": True, "v2": 6994, "v3": 7800,
     "lee": ["quedó aprobado el artículo 24 por 178 votos contra 59", "Total, 178.", "Total, 59."],
     "puerta": "cuestion-religiosa-1931"},
    {"clave": "368-466", "fecha": "1931-12-09", "si": 368, "no": 0, "nominal": True, "v2": 13531, "v3": 15043,
     "lee": ["Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí."],
     "lista": (13525, 15037, "Total, 368."),
     "mitad": (13531, 15043, "Los Sres. Diputados que han prometido en estas Cortes suman 466; la mitad más uno, 234.", 466, 234)},
    {"clave": "318-19", "fecha": "1932-09-09", "si": 318, "no": 19, "nominal": True, "v2": 37177, "v3": 41627,
     "lee": ["votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19", "Total, 318.", "Total, 19."],
     "mitad": (37178, 41628, "El número de Diputados que han prometido suma 462. La mitad mas uno son 232.", 462, 232)},
    {"clave": "314-24", "fecha": "1932-09-09", "si": 314, "no": 24, "nominal": True, "v2": 37178, "v3": 41629,
     "lee": ["Total, 314.", "Total, 24."]},
    {"clave": "238-5", "fecha": "1936-04-07", "si": 238, "no": 5, "nominal": True, "v2": 102358, "v3": 115675,
     "lee": ["resultado que habían votado a favor de la proposición 238 Sres. Diputados y en contra 5",
             "Señores que dijeron no:\n\nBecerra.\n\nPortela.\n\nBenítez de Lugo.\n\nCanals.\n\nRosado.\n\nTotal, 5."],
     "mitad": (102359, 115676, "Los Sres. Diputados en el ejercicio del cargo son 417; la mitad más uno, 209.", 417, 209)},
]
PATRON_LISTA = r"senores que (?:dijeron|han dicho) (?:si|no)\b"
# Debates preparados que citan las puertas (clave corta → biblioteca del explorador).
BIBLIOTECAS = {"sufragio": "L2-B2", "religiosa": "L2-B3", "estatuto": "L2-B5", "casas_viejas": "L2-B7",
               "orden_publico": "L2-B14", "guerra": "L2-B15", "exilio": "L2-B16"}
# Las citas de estos prefijos llevan su terna de cifras en diario.py (El Diario, F27 y F28).
CITAS_DE_OTRO = ("diario.", "f27.", "f28.", "voto.")


def _dadas_antes(ctx=None) -> dict:
    """Cifras que ya dio un módulo anterior en esta exportación (el `C` de exportar.py › main). Algunas claves de este
    copy las declaran también otros grupos (`puerta.mexico-1945.filas` en la ficha V, p. ej.): si ya están con EL MISMO
    valor, aquí no se repiten; con otro valor, la exportación falla. Si no se encuentra el diccionario, no se omite nada."""
    if ctx is not None and getattr(ctx, "dadas", None):
        return dict(ctx.dadas)
    marco = inspect.currentframe()
    try:
        while marco is not None:
            C = marco.f_locals.get("C")
            if marco.f_code.co_name == "main" and isinstance(C, dict):
                return C
            marco = marco.f_back
    finally:
        del marco
    return {}


def _cuenta(db, fts: str, desde=None, hasta=None, habla=False):
    """El recuento del buscador del explorador: FTS5 MATCH + filtros, orden bm25 (docs/estudio, informe del explorador)."""
    w, p = ["speeches_fts MATCH ?"], [fts]
    if desde:
        w.append("s.date >= ?"); p.append(desde)
    if hasta:
        w.append("s.date <= ?"); p.append(hasta)
    if habla:
        w.append("s.speaker NOT IN ('SUMARIO','COMENTARIOS')")
    sql = "FROM speeches_fts JOIN speeches s ON s.id = speeches_fts.rowid WHERE " + " AND ".join(w)
    filas = db.execute("SELECT s.id, s.date, s.num_session, s.rep_name " + sql + " ORDER BY bm25(speeches_fts), s.id ASC", p).fetchall()
    return len(filas), filas


def _citas_registro() -> list[dict]:
    """El bloque JSON de `docs/marcadores/citas.md`: la fuente de las citas para las máquinas."""
    texto = (MARCADORES / "citas.md").read_text(encoding="utf-8")
    m = re.search(r"```json\n(.*?)\n```", texto, re.S)
    exige(m is not None, "docs/marcadores/citas.md no trae su bloque JSON")
    citas = json.loads(m.group(1))
    exige(isinstance(citas, list) and citas, "citas.md: el bloque JSON no es una lista")
    claves = [c["clave"] for c in citas]
    exige(len(claves) == len(set(claves)), "citas.md: claves repetidas")
    return citas


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}
    antes = _dadas_antes(ctx)

    def pon(k, v, t, base, f, clave="C"):
        exige(k not in C, f"cifra {k} repetida en sesiones.py")
        if k in antes:
            exige(antes[k]["v"] == v and antes[k]["base"] == base,
                  f"la cifra {k} ya la dio otro módulo con otro valor o base ({antes[k]['v']!r} {antes[k]['base']} ≠ {v!r} {base})")
            return
        C[k] = ctx.cifra(v, t, base, f, clave=clave)

    v2 = ctx.v2()
    db = ctx.v3_db()
    sp2 = lambda i: ctx.fila_v2(i)["speech"] or ""  # noqa: E731
    sp3 = lambda i: ctx.fila_v3(i)["speech"] or ""  # noqa: E731
    por_id = v2.set_index("id")

    # ── 1 · F26: las votaciones escogidas, leídas en su fila ────────────────────────────────────────────────────
    votos = []
    for x in VOTOS:
        k = x["clave"]
        s2, s3 = sp2(x["v2"]), sp3(x["v3"])
        for fr in x["lee"]:
            exige(fr in s2, f"voto {k}: la fila V2 {x['v2']} ya no dice «{fr[:60]}»")
            exige(fr in s3, f"voto {k}: la fila v3 {x['v3']} ya no dice «{fr[:60]}»")
        r = por_id.loc[x["v2"]]
        exige(r["date"] == x["fecha"], f"voto {k}: la fila V2 {x['v2']} es de otro día ({r['date']})")
        pon(f"voto.{k}.si", x["si"], "n", "V2", f"texto de V2 {x['v2']}: votos a favor", "L")
        pon(f"voto.{k}.no", x["no"], "n", "V2", f"texto de V2 {x['v2']}: votos en contra", "L")
        pon(f"voto.{k}.V2", x["v2"], "id", "V2", "id de la fila V2 que imprime el resultado")
        pon(f"voto.{k}.v3", x["v3"], "id", "v3", "id de la fila v3 con el mismo texto")
        reg = {"clave": k, "fecha": x["fecha"], "num_session": int(r["num_session"]), "legislatura": r["legislature"], "etapa": r["etapa"],
               "si": x["si"], "no": x["no"], "nominal": x["nominal"], "v2": x["v2"], "v3": x["v3"], "puerta": x.get("puerta")}
        if "lista" in x:
            l2, l3, fr = x["lista"]
            exige(fr in sp2(l2) and fr in sp3(l3), f"voto {k}: la lista ya no está en V2 {l2} · v3 {l3}")
            pon(f"voto.{k}.lista.V2", l2, "id", "V2", "fila V2 con la lista de la votación")
            pon(f"voto.{k}.lista.v3", l3, "id", "v3", "fila v3 con la lista de la votación")
            reg.update({"lista_v2": l2, "lista_v3": l3})
        if "mitad" in x:
            m2, m3, fr, total, mitad = x["mitad"]
            exige(fr in sp2(m2) and fr in sp3(m3), f"voto {k}: el umbral ya no está en V2 {m2} · v3 {m3}")
            exige(str(total) in fr and str(mitad) in fr and mitad == total // 2 + 1, f"voto {k}: umbral incoherente")
            pon(f"voto.{k}.total", total, "n", "V2", f"texto de V2 {m2}: diputados que cuenta la Presidencia", "L")
            pon(f"voto.{k}.mitad", mitad, "n", "V2", f"texto de V2 {m2}: la mitad más uno", "L")
            if m2 != x["v2"]:
                pon(f"voto.{k}.mitad.V2", m2, "id", "V2", "fila V2 que imprime la mitad más uno")
                pon(f"voto.{k}.mitad.v3", m3, "id", "v3", "fila v3 que imprime la mitad más uno")
            reg.update({"total": total, "mitad": mitad, "mitad_v2": m2, "mitad_v3": m3})
        votos.append(reg)
    # La destitución (7-IV-1936): la proposición y el artículo del Reglamento que se leen en la sesión.
    for campo, a, b, fr, f in (
        ("proposicion", 102304, 115618, "declaren que no era necesario el decreto de disolución de Cortes de 7 de Enero de 1936.",
         "fila V2 con el texto de la proposición"),
        ("reglamento", 102309, 115623, "Se entenderá acordada la destitución del Presidente cuando a favor de ella se pronuncien, en votación nominal.",
         "fila V2 en que el Secretario lee el art. 106 del Reglamento"),
    ):
        exige(fr in sp2(a) and fr in sp3(b), f"voto 238-5: la {campo} ya no está en V2 {a} · v3 {b}")
        pon(f"voto.238-5.{campo}.V2", a, "id", "V2", f)
        pon(f"voto.238-5.{campo}.v3", b, "id", "v3", f.replace("fila V2", "fila v3"))
    exige(sum(v["nominal"] for v in votos) == 6 and len({(v["fecha"], v["num_session"]) for v in votos if v["nominal"]}) == 5,
          "F26: la selección debe ser de seis nominales en cinco sesiones")
    pon("voto.n", 6, "n", "V2", "selección editorial de F26: 161–121, 178–59, 368, 318–19, 314–24, 238–5", "R")
    pon("voto.sesiones", 5, "n", "V2", "sesiones de esas seis votaciones: 1-X-1931, 13-X-1931, 9-XII-1931, 9-IX-1932, 7-IV-1936", "R")

    # El registro de todas las listas nominales (plan, anexo R1; narrativa § 9.3): misma definición en todo el sitio.
    pleg = ctx.v2_plegado()
    ids_lista = set(int(i) for i in pleg.index[pleg.str.contains(PATRON_LISTA, regex=True)])
    lis = v2[v2["id"].isin(ids_lista)]
    pon("voto.listas.sesiones", int(lis["clave"].nunique()), "n", "V2",
        "sesiones (date, num_session) con al menos una fila cuyo texto plegado contiene «señores que dijeron/han dicho sí/no»")
    pon("voto.listas.filas", len(lis), "n", "V2", "filas V2 cuyo texto plegado contiene «señores que dijeron/han dicho sí/no»")
    etapas_listas = []
    for e in ("I", "II", "III", "IV", "V"):
        g = lis[lis["etapa"] == e]
        pon(f"etapa.{e}.listas_nominales.filas", len(g), "n", "V2", f"filas de la etapa {e} con lista nominal (definición común)")
        pon(f"etapa.{e}.listas_nominales.sesiones", int(g["clave"].nunique()), "n", "V2", f"sesiones de la etapa {e} con alguna de esas filas")
        etapas_listas.append({"etapa": e, "filas": len(g), "sesiones": int(g["clave"].nunique())})
    exige(sum(x["filas"] for x in etapas_listas) == len(lis), "las listas por etapa no suman el total")
    por_sesion = []
    for k, g in lis.sort_values("id").groupby("clave", sort=False):
        por_sesion.append([g["date"].iloc[0], int(g["num_session"].iloc[0]), g["legislature"].iloc[0], g["etapa"].iloc[0], len(g),
                           " ".join(str(int(i)) for i in g["id"])])
    por_sesion.sort(key=lambda r: (r[0], r[1]))
    # ── 2 · índice de Sesiones: límites ─────────────────────────────────────────────────────────────────────────
    s48 = v2[v2["clave"] == "1931-10-01-48"].sort_values("order")
    cola = s48.tail(5)
    exige(cola["id"].tolist() == [5788, 5789, 5790, 5791, 5792], "sesión 48: la cola ya no es V2 5788–5792")
    exige(all(sp2(i).startswith("Pido la palabra.") for i in cola["id"]) and sp2(5792).endswith("El Sr. Ministro de"),
          "sesión 48: la cola ya no repite «Pido la palabra.»")
    exige(all(sp3(i).startswith("Pido la palabra.") for i in range(6460, 6465)) and sp3(6464).endswith("El Sr. Ministro de"),
          "sesión 48: la cola v3 ya no es 6460–6464")
    pon("ses.s48.cola", 5, "n", "V2", "filas finales repetidas de la sesión 48 (V2 5788–5792 · v3 6460–6464)", "L")
    for k, v, b in (("ses.s48.cola.V2.desde", 5788, "V2"), ("ses.s48.cola.V2.hasta", 5792, "V2"),
                    ("ses.s48.cola.v3.desde", 6460, "v3"), ("ses.s48.cola.v3.hasta", 6464, "v3")):
        pon(k, v, "id", b, "extremo de la cola repetida (incidencia truncated_end de sessions.json)")
    ords = [r[0] for r in db.execute("select ord from speeches where id between 6460 and 6464 order by id")]
    exige(ords == list(range(ords[0], ords[0] + 5)), "sesión 48: la cola v3 no es consecutiva")
    pon("ses.s48.cola.pantalla.desde", ords[0] + 1, "id", "explorador", "«Orden» que enseña el explorador para v3 6460: ord + 1", "CALC")
    pon("ses.s48.cola.pantalla.hasta", ords[-1] + 1, "id", "explorador", "«Orden» que enseña el explorador para v3 6464: ord + 1", "CALC")
    frase = "Sánchez Guerra, Ossorio y Gallardo"
    exige(sp2(976).count(frase) == 6 and sp3(1081).count(frase) == 6, "sesión 9: la fila del bucle ya no repite seis veces")
    pon("ses.s9.bucle.veces", 6, "n", "V2", f"veces que la fila V2 976 repite «{frase}»", "L")
    pon("ses.s9.bucle.V2", 976, "id", "V2", "fila V2 con el bucle (incidencia ocr_loop)")
    pon("ses.s9.bucle.v3", 1081, "id", "v3", "la misma fila en v3")
    proy = ctx.proyecto()
    nover = [s for s in proy["sessions"] if s["page_status"] not in proy["page_verified_status"]]
    exige(all(s["date"] >= "1936-10-01" for s in nover), "hay sesiones sin páginas verificadas antes de octubre de 1936")
    pon("ses.paginas_sin_verificar", len(nover), "n", "proyecto", "sesiones con page_status «unverified» en sessions.json", "M")
    pon("ses.umbral.largas", UMBRAL_LARGAS, "n", "V2", "umbral de «fila larga» (palabras) en F30", "R")
    pon("ses.puertas", len(PUERTAS), "n", "V2", "puertas de lectura de la edición 0.1", "R")
    pon("ses.puertas.sesiones", sum(len(p["sesiones"]) for p in PUERTAS.values()), "n", "V2", "sesiones que cubren las puertas", "R")

    # ── 3 · puertas: sesiones, cifras y turnos (F30) ───────────────────────────────────────────────────────────
    ses = {s["clave"]: s for s in ctx.compartido["sesiones"]}
    graf = json.loads((ctx.data / "grafias.json").read_text(encoding="utf-8")).get("grafias", {})
    puertas = []
    for slug, p in PUERTAS.items():
        lista = []
        for f, n in p["sesiones"]:
            k = clave_sesion(f, n)
            exige(k in ses, f"puerta {slug}: no existe la sesión {k}")
            s = ses[k]
            g = v2[v2["clave"] == k].sort_values("order")
            exige(g["order"].is_unique, f"sesión {k}: órdenes V2 repetidos")
            turnos = []
            for r in g.itertuples(index=False):
                rid = None if r.rep_id is None or str(r.rep_id) == "<NA>" else int(r.rep_id)
                gr = graf.get(str(rid)) if rid is not None else None
                t = {"o": int(r.order), "id": int(r.id), "p": int(r.nwords), "pres": bool(r.presidencia), "rep_id": rid,
                     "rotulo": r.speaker}
                if gr:
                    t["nombre"] = gr.get("uso") or gr["grafia"]
                    t["corto"] = gr.get("corto") or t["nombre"]
                elif rid is not None:
                    t["nombre"] = t["corto"] = r.rep_name
                turnos.append(t)
            truncadas = cola["id"].tolist() if k == "1931-10-01-48" else []
            meta = ctx.meta_sesion(k)
            lista.append({
                "clave": k, "fecha": f, "num": n, "filas": s["filas"], "palabras": s["pal"], "diputados_sp": s["dip_sp"],
                "largas": s["largas"], "filas_pres": s["filas_pres"], "filas_v3": s["filas_v3"], "habla_v3": s["habla_v3"],
                "id_v2": s["id_v2"], "id_v3": s["id_v3"], "diario_num": meta.get("diario_num"), "sigla": meta.get("sigla"),
                "paginas": s["meta"].get("paginas"), "max_palabras": int(g["nwords"].max()), "truncadas": truncadas,
                "turnos": turnos,
            })
        tot = {c: sum(x[c] for x in lista) for c in ("filas", "palabras", "filas_v3", "habla_v3")}
        if len(lista) > 1:
            pon(f"puerta.{slug}.filas", tot["filas"], "n", "V2", "suma de las filas V2 de sus sesiones", "CALC")
            pon(f"puerta.{slug}.palabras", tot["palabras"], "n", "V2", "suma de las palabras V2 de sus sesiones", "CALC")
            pon(f"puerta.{slug}.sesiones", len(lista), "n", "V2", "sesiones de la puerta", "R")
        puertas.append({"slug": slug, "etapa": p["etapa"], "sesiones": lista, **tot})
    exige(sum(len(p["sesiones"]) for p in puertas) == sum(len(p["sesiones"]) for p in PUERTAS.values()), "puertas: sesiones mal contadas")
    ctx.escribir_json("puertas.json", {
        "_meta": {"fuente": "V2 (filas en su orden; papel de la Presidencia con parse_speaker del explorador) y v3 (recuentos); "
                            "nombres con la tabla de grafías", "exportado": ctx.hoy, "umbral_largas": UMBRAL_LARGAS},
        "puertas": puertas,
    })

    # Hechos propios de las puertas.
    ses_v2 = v2.groupby("clave").agg(f=("date", "first"), n=("num_session", "first"))
    exige(not ses_v2["f"].str.startswith("1933-01").any(), "hay sesiones en enero de 1933")
    feb = ses_v2[ses_v2["f"].str.startswith("1933-02")].sort_values(["f", "n"])
    exige(feb["f"].iloc[0] == "1933-02-01", "la primera sesión de 1933 ya no es la del 1 de febrero")
    pon("puerta.casas-viejas-1933.primera_feb", int(feb["n"].iloc[0]), "id", "V2", "num_session de 1933-02-01, primera sesión de 1933")
    pon("puerta.casas-viejas-1933.feb.sesiones", len(feb), "n", "V2", "sesiones de febrero de 1933")
    sig = ses_v2[ses_v2["f"] > "1934-07-04"]["f"].min()
    pon("puerta.pistola-1934.siguiente", sig, "fecha", "V2", "primera sesión posterior al 4-VII-1934")
    orden = v2.sort_values(["nwords", "id"], ascending=[False, True])["id"].tolist()
    exige(orden[0] == 55221 and orden[1] == 25979, "estatuto: V2 55221 y 25979 ya no son las dos filas más largas")
    top_hab = db.execute("select id from speeches where speaker not in ('SUMARIO','COMENTARIOS') order by nwords desc limit 1").fetchone()[0]
    exige(top_hab == 29042, "estatuto: v3 29042 ya no es la intervención de habla más larga")
    w2 = int(por_id.loc[25979, "nwords"])
    w3 = db.execute("select nwords from speeches where id=29042").fetchone()[0]
    pon("puerta.estatuto-1932.fila.V2.palabras", w2, "n", "V2", "nwords de V2 25979 (fila a nombre de «El Sr. PRESIDENTE:»)")
    pon("puerta.estatuto-1932.fila.v3.palabras", w3, "n", "v3", "nwords de v3 29042 (Azaña)")
    pon("puerta.estatuto-1932.fila.v3.presidencia.palabras", db.execute("select nwords from speeches where id=29041").fetchone()[0],
        "n", "v3", "nwords de v3 29041 (la Presidencia da la palabra)")
    pon("puerta.estatuto-1932.fila.V2.puesto", orden.index(25979) + 1, "n", "V2", "puesto de V2 25979 por nwords entre las filas V2")
    pon("puerta.estatuto-1932.umbral", min(w2, w3) // 1000 * 1000, "n", "V2",
        "millar entero por debajo de la menor de las dos filas del discurso (V2 25979, v3 29042): «más de…»", "CALC")
    pon("puerta.estatuto-1932.primera.V2", 55221, "id", "V2", "la fila V2 más larga (Prieto, 12-VII-1933)")
    pon("puerta.estatuto-1932.primera.palabras", int(por_id.loc[55221, "nwords"]), "n", "V2", "nwords de V2 55221")
    exige(sp3(61932).startswith("DOCUMENTOS COMPLEMENTARIOS DEL DISCURSO DEL SEÑOR MINISTRO DE OBRAS PUBLICAS"),
          "estatuto: v3 61932 ya no son los documentos de Prieto")
    pon("puerta.estatuto-1932.documento.v3", 61932, "id", "v3", "fila COMENTARIOS v3 que recibe el documento leído por Prieto")
    pon("puerta.estatuto-1932.documento.palabras", db.execute("select nwords from speeches where id=61932").fetchone()[0], "n", "v3",
        "nwords de v3 61932")
    lf2 = [int(i) for i in v2[(v2["date"] == "1939-02-01")]["id"] if "Señores Diputados que dijeron SI:" in sp2(i)]
    lf3 = [r[0] for r in db.execute("select id from speeches where date='1939-02-01' and instr(speech, 'Señores Diputados que dijeron SI:') > 0")]
    exige(len(lf2) == 1 and len(lf3) == 1, "figueres: la lista nominal ya no está en una sola fila")
    pon("puerta.figueres-1939.lista.V2", lf2[0], "id", "V2", "fila V2 del 1-II-1939 con «Señores Diputados que dijeron SI:»", "L")
    pon("puerta.figueres-1939.lista.v3", lf3[0], "id", "v3", "la misma lista en la v3 (fila de comentarios)", "L")
    g = db.execute("select count(*), sum(speaker not in ('SUMARIO','COMENTARIOS')) from speeches where date >= '1945-08-17'").fetchone()
    pon("puerta.mexico-1945.filas_v3", g[0], "n", "v3", "filas v3 con date >= 1945-08-17 (Desde 17/08/1945, sin Hasta)")
    pon("puerta.mexico-1945.habla_v3", g[1], "n", "v3", "ídem con «Solo lo que se habla»")

    # ── 4 · búsquedas del explorador (v3, FTS5 como su buscador) ──────────────────────────────────────────────
    def busq(k, fts, que, **kw):
        n, filas = _cuenta(db, fts, **kw)
        pon(k, n, "n", "v3", f"FTS5 MATCH {fts!r} {kw or ''} sobre speeches_fts, como el explorador; {que}")
        return n, filas
    _, filas = _cuenta(db, '"voto femenino" OR "voto de la mujer"')
    pon("busqueda.ses.voto_union.campoamor", sum(1 for r in filas if "Campoamor" in (r[3] or "")), "n", "v3",
        "de las filas de la consulta \"voto femenino\" | \"voto de la mujer\", las de rep_name Clara Campoamor")
    pon("busqueda.ses.voto_union.fechas", len({r[1] for r in filas}), "n", "v3", "fechas distintas de esas filas")
    busq("busqueda.ses.otra_manera.n", '"vivir de otra manera"', "consulta: \"vivir de otra manera\"")
    busq("busqueda.ses.tenia_que_ocurrir.n", '"no ha ocurrido sino lo que tenia que ocurrir"', "consulta: la frase de Azaña")
    busq("busqueda.ses.casas_viejas.m1933_03", '"casas viejas"', "marzo de 1933, todas las filas", desde="1933-03-01", hasta="1933-03-31")
    busq("busqueda.ses.casas_viejas.m1933_03_habla", '"casas viejas"', "marzo de 1933, «Solo lo que se habla»",
         desde="1933-03-01", hasta="1933-03-31", habla=True)
    busq("busqueda.ses.pistola.dia", '"pistola"', "Desde y Hasta 04/07/1934", desde="1934-07-04", hasta="1934-07-04")
    busq("busqueda.ses.pistola.n", '"pistola"', "todo el corpus")
    n1, _ = busq("busqueda.ses.tierra_catalana.n", '"trozo de la tierra catalana"', "todo el corpus, todas las filas")
    n2, _ = busq("busqueda.ses.tierra_catalana.habla", '"trozo de la tierra catalana"', "con «Solo lo que se habla»", habla=True)
    exige((n1, n2) == (1, 0), "«trozo de la tierra catalana»: la búsqueda ya no da solo el sumario")
    busq("busqueda.ses.presidente_interino.n", '"presidente interino de la republica"', "Desde 01/01/1945", desde="1945-01-01")
    busq("busqueda.ses.barriga.n", '"tiros a la barriga"', "todo el corpus")
    _, filas = busq("busqueda.ses.suprimidas.n", '"no constan por orden" OR "no se consigna por orden" OR "no se consignan por orden"',
                    "acotaciones de palabras suprimidas por la Presidencia")
    pon("busqueda.ses.suprimidas.puerta", sum(1 for r in filas if r[1] in ("1936-06-16", "1936-07-01")), "n", "v3",
        "de esas filas, las del 16-VI y el 1-VII-1936")

    # ── 5 · debates preparados (bibliotecas del explorador) ────────────────────────────────────────────────────
    bibl = {b["clave"]: b for b in ctx.bibliotecas()}
    for k, pref in BIBLIOTECAS.items():
        b = next((x for c, x in bibl.items() if c == pref or c.startswith(pref + "_") or c.startswith(pref + "-")), None)
        exige(b is not None, f"no está la biblioteca {pref} ({k})")
        pon(f"bib.{k}.nombre", b["nombre"], "texto", "v3", f"{b['clave']} › collection.name", "M")
        pon(f"bib.{k}.entradas", b["entradas"], "n", "v3", f"items de {b['clave']}")
        pon(f"bib.{k}.sesiones", len(b["sesiones"]), "n", "v3", "sesiones (date, num_session) de sus items")

    # ── 6 · citas: una entrada por fragmento (aserto de exportar.py) y el pasaje entero con su tramo ──────────────
    citas, pasajes = [], {}
    for c in _citas_registro():
        a, b, frs = c.get("v2"), c.get("v3"), c["fragmentos"]
        exige(frs and (a or b), f"cita {c['clave']}: sin fragmentos o sin fila")
        tramos = {}
        for ed, i, leer in (("V2", a, sp2), ("v3", b, sp3)):
            if not i:
                continue
            fecha = por_id.loc[i, "date"] if ed == "V2" else ctx.fila_v3(i)["date"]
            exige(fecha == c["fecha"], f"cita {c['clave']}: la fila {ed} {i} es del {fecha}, no del {c['fecha']}")
            s = leer(i)
            pos = []
            for fr in frs:
                exige(fr in s, f"cita {c['clave']}: el fragmento «{fr[:50]}» no está letra a letra en la fila {ed} {i}")
                pos.append(s.index(fr, pos[-1] if pos else 0))
            exige(pos == sorted(pos), f"cita {c['clave']}: los fragmentos no van en orden en la fila {ed} {i}")
            tramos[ed] = s[pos[0]:pos[-1] + len(frs[-1])]
        for n, fr in enumerate(frs, 1):
            citas.append({"id": f"{c['clave']}#{n}", "texto": fr, "v2": a, "v3": b})
        pasajes[c["clave"]] = {"v2": a, "v3": b, "orador": c.get("orador"), "fecha": c["fecha"], "nota": c.get("nota") or None,
                               "fragmentos": frs, "tramo": tramos.get("V2") or tramos.get("v3"),
                               "ediciones": "V2+v3" if a and b else ("solo_v3" if b else "solo_V2"),
                               "palabras": int(por_id.loc[a, "nwords"]) if a else None}
        if c["clave"].startswith(CITAS_DE_OTRO):
            continue
        if a:
            pon(f"cita.{c['clave']}.V2", a, "id", "V2", f"fila V2 donde está, letra a letra, la cita {c['clave']} (citas.md)", "L")
            pon(f"cita.{c['clave']}.palabras", int(por_id.loc[a, "nwords"]), "n", "V2", f"nwords de la fila V2 {a}")
        if b:
            pon(f"cita.{c['clave']}.v3", b, "id", "v3", f"fila v3 donde está, letra a letra, la cita {c['clave']} (citas.md)", "L")
    ctx.escribir_json("citas.json", {
        "_meta": {"fuente": "docs/marcadores/citas.md (bloque JSON); cada fragmento, comprobado letra a letra en su fila",
                  "exportado": ctx.hoy, "n_citas": len(pasajes), "n_fragmentos": len(citas)},
        "citas": citas,
        "pasajes": pasajes,
    })
    # El literal de F26 (nota emergente y tabla): los fragmentos de `voto.<clave>` (comprobados arriba), unidos por « … ».
    for v in votos:
        p = pasajes.get(f"voto.{v['clave']}")
        exige(p is not None, f"citas.md no trae el literal de voto.{v['clave']}")
        v["literal"] = " … ".join(p["fragmentos"])
    ctx.escribir_json("votaciones.json", {
        "_meta": {"fuente": "V2 (texto de las filas) y v3; umbrales y totales leídos en su fila", "exportado": ctx.hoy,
                  "patron_listas": PATRON_LISTA},
        "votaciones": votos,
        "listas": {"filas": len(lis), "sesiones": int(lis["clave"].nunique()), "etapas": etapas_listas},
    })
    ctx.escribir_datos("votaciones", ["votacion", "fecha", "num_session", "legislatura", "si", "no", "total", "mitad_mas_uno", "nominal",
                                      "id_V2", "id_v3", "literal"],
                       [[v["clave"], v["fecha"], v["num_session"], v["legislatura"], v["si"], v["no"], v.get("total", ""), v.get("mitad", ""),
                         "sí" if v["nominal"] else "no", v["v2"], v["v3"], v["literal"]] for v in votos])
    ctx.escribir_datos("listas_nominales", ["fecha", "num_session", "legislatura", "etapa", "filas_con_lista", "ids_V2"], por_sesion)
    return C
