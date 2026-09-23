"""base · cifras generales, etapas, sesiones, meses, Dataverse, explorador, JSON-LD, grafías y hemiciclo.

Dueño: exportador. Se ejecuta EL PRIMERO: deja en `ctx.compartido` las sesiones, las etapas y los meses para
que los demás módulos no los recalculen.

Escribe en `src/data/`:
  sesiones.json        las 755 sesiones (V2 + v3 + metadatos del proyecto rotulados), una por línea
  meses.json           los 173 meses de 1931-07 a 1945-11, con su estado (sesion · sin_sesion · fuera · salto)
  etapas.json          las cinco etapas, con presidentes titulares, Gobiernos y debates preparados
  hemiciclo_1936.json  la portada, copiada tal cual (sha256 comprobado)
  grafias.json         la tabla de grafías (de exportador/grafias.csv; vacía hasta que exista, D-22)
  jsonld/thqcmi.json   Dataset de schema.org, {es, en}
  jsonld/cgocus.json   Dataset de schema.org, {es, en}
Y en `src/data/cifras.json`, por este módulo, las familias:
  filas.* · palabras.* · habla.* · sesiones* · fechas* · diputados.* · presidencia.* · pres.* · leg.<leg>.* ·
  etapa.<I…V>.* (con .pres.<clave> y .gob.<id>) · sesiones.tras_18jul · palabras.tras_18jul(.pct) · meses.* ·
  paginas.* · serie.* · gobiernos.n · presidentes.n · bib.n · bib.entradas · bib.debates · dv.thqcmi.* · dv.cgocus.* ·
  dv.csv.* · explorador.* · v3.*. Algunos nombres que el copy ya usaba van como alias (`alias_de`): ver ALIAS.
Las sesiones y los meses se resuelven por familia (`sesion.<AAAA-MM-DD>-<n>.<campo>`, `mes.<AAAA-MM>.<campo>`):
ver `src/data/formatos.json › familias`.
"""
from __future__ import annotations

import csv
import datetime as dt
from collections import Counter


from comun import (COLUMNAS_V2, ETAPA_IDS, ETAPAS, GRAFIAS_CSV, HEMICICLO, LEGISLATURAS, N_FILAS_V2, N_FILAS_V3,
                   SHA256_V3, SHA256_V3_CSV, exige, meses_entre)
from formatos import formatear

VERIFICADAS = {"contiguous", "verso_blank", "corrected"}
SERIES = {  # título del Diario en los metadatos del proyecto → código corto
    "Diario de Sesiones de las Cortes Constituyentes de la República Española": "constituyentes",
    "Diario de las Sesiones de Cortes. Congreso de los Diputados": "cortes",
    "Extracto oficial de las sesiones. Congreso de los Diputados": "extracto",
    "Extracto oficial de las sesiones de Cortes celebradas en México (exilio)": "mexico",
}
GUERRA = "1936-07-18"
CORTOS = {  # nombre del archivo en Dataverse (sin extensión ni prefijo) → clave corta de la cifra
    "diaries": "csv", "readme": "readme", "changelog_es_09_2026": "changelog_es", "changelog_en_09_2026": "changelog_en",
    "00_readme": "readme", "coauthor_edgelist": "edgelist", "cosponsorship": "cosponsorship", "codebook": "codebook",
    "methodology": "methodology", "representative_metadata": "metadata", "representatives_metrics": "metrics",
    "representatives_roles": "roles",
}
# Otros nombres con que el copy ya llama a una cifra de este módulo (una sola fuente; `alias_de` apunta a la canónica).
ALIAS = {
    "sesiones.n": "sesiones", "sesiones.V2": "sesiones", "presidencia.vice.sesiones": "pres.vice_ses",
    "hueco.1939_1944.meses": "meses.salto", "meses.sin_sesion_1939_1944": "meses.salto",
    "dv.versiones": "dv.thqcmi.versiones", "dv.version": "dv.thqcmi.version", "dv.cita": "dv.thqcmi.cita",
    **{f"legislatura.{l}.palabras.pct": f"leg.{l}.palabras.pct" for l in LEGISLATURAS},
    **{f"etapa.{e}.desde": f"etapa.{e}.fecha.desde" for e in ETAPA_IDS},
    **{f"etapa.{e}.hasta": f"etapa.{e}.fecha.hasta" for e in ETAPA_IDS},
    **{f"etapa.{e}.meses_con": f"etapa.{e}.meses_con_sesion" for e in ETAPA_IDS},
    **{f"etapa.{e}.meses_sin": f"etapa.{e}.meses_sin_sesion" for e in ETAPA_IDS},
}


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}
    v2, v3, pr = ctx.v2(), ctx.v3(), ctx.proyecto()
    V2F = "2REP_Diaries.csv (THQCMI V2.0)"
    V3F = "corpus.sqlite del explorador, tabla speeches"
    PRF = "sessions.json del proyecto"

    def pon(k, *a, **kw):
        exige(k not in C, f"clave repetida en base: {k}")
        C[k] = ctx.cifra(*a, **kw)

    # ── 1. Totales V2 ────────────────────────────────────────────────────────────────────────────────────────
    pal = int(v2["nwords"].sum())
    pon("filas.V2", len(v2), "n", "V2", f"recuento de filas de {V2F}")
    pon("columnas.V2", 14, "n", "V2", f"columnas de {V2F}")
    pon("palabras.V2", pal, "n", "V2", f"suma de nwords en {V2F}")
    pon("diputados.V2", int(v2["rep_id"].nunique()), "n", "V2", "rep_id distintos (con alguna fila, incluida la Presidencia)")
    pon("filas.sin_diputado", int(v2["rep_id"].isna().sum()), "n", "V2", "filas con rep_id vacío (ministros sin escaño, según el README)")
    pon("filas.con_diputado", int(v2["rep_id"].notna().sum()), "n", "V2", "filas con rep_id")
    pon("filas.con_diputado.pct", v2["rep_id"].notna().mean(), "pct", "V2", "filas con rep_id / filas", clave="CALC",
        n=int(v2["rep_id"].notna().sum()), den=len(v2))
    ses_v2 = v2.groupby("clave", sort=False)
    n_ses = v2["clave"].nunique()
    pon("sesiones", n_ses, "n", "V2", "claves (date, num_session) distintas; las mismas 755 en la v3")
    pon("sesiones.fechas", int(v2["date"].nunique()), "n", "V2", "fechas distintas con sesión")
    dobles = v2.groupby("date")["clave"].nunique()
    pon("sesiones.fechas_dobles", int((dobles > 1).sum()), "n", "V2", "fechas con dos sesiones")
    pon("sesiones.num1", int((v2.groupby("clave")["num_session"].first() == 1).sum()), "n", "V2",
        "sesiones con num_session = 1 (la numeración vuelve a empezar en cada legislatura)")
    pon("sesion.primera", v2["date"].min(), "fecha", "V2", "primera fecha del CSV")
    pon("sesion.ultima", v2["date"].max(), "fecha", "V2", "última fecha del CSV")
    pon("legislaturas.V2", int(v2["legislature"].nunique()), "n", "V2", "valores distintos de legislature")
    pon("etapas.n", len(ETAPAS), "n", "V2", "etapas del sitio (D-8): dos legislaturas enteras y la tercera partida por su numeración",
        clave="R")

    # ── 2. Totales v3 ────────────────────────────────────────────────────────────────────────────────────────
    exige(set(v3["clave"]) == set(v2["clave"]), "V2 y v3 no comparten las 755 claves de sesión")
    hab = v3[v3["habla"]]
    pon("filas.v3", len(v3), "n", "v3", f"count(*) de {V3F}")
    pon("palabras.v3", int(v3["nwords"].sum()), "n", "v3", f"suma de nwords en {V3F}")
    pon("habla.v3", len(hab), "n", "v3", "filas con role ∉ {summary, remark} según parse_speaker del explorador")
    pon("palabras.habla.v3", int(hab["nwords"].sum()), "n", "v3", "suma de nwords de las filas de habla")
    pon("v3.sumarios", int((v3["role"] == "summary").sum()), "n", "v3", "filas SUMARIO (role summary)")
    pon("v3.comentarios", int((v3["role"] == "remark").sum()), "n", "v3", "filas COMENTARIOS (role remark)")
    pon("palabras.sumarios.v3", int(v3.loc[v3["role"] == "summary", "nwords"].sum()), "n", "v3", "suma de nwords de las filas SUMARIO")
    pon("palabras.comentarios.v3", int(v3.loc[v3["role"] == "remark", "nwords"].sum()), "n", "v3", "suma de nwords de las filas COMENTARIOS")
    pon("diputados.v3", int(v3["rep_id"].nunique()), "n", "v3", "rep_id distintos")
    pon("sesiones.v3", int(v3["clave"].nunique()), "n", "v3", "claves (date, num_session) distintas")

    # ── 3. Presidencia (V2, parse_speaker del explorador) ─────────────────────────────────────────────────────
    pres = v2[v2["presidencia"]]
    pf = "roles chair, vicechair y chair_age de parse_speaker (motor del explorador)"
    pon("presidencia.filas", len(pres), "n", "V2", f"filas de la Presidencia: {pf}")
    pon("presidencia.filas.pct", len(pres) / len(v2), "pct", "V2", "filas de la Presidencia / filas", clave="CALC",
        n=len(pres), den=len(v2))
    pon("presidencia.palabras", int(pres["nwords"].sum()), "n", "V2", f"palabras de la Presidencia: {pf}")
    pon("presidencia.palabras.pct", pres["nwords"].sum() / pal, "pct", "V2", "palabras de la Presidencia / palabras",
        clave="CALC", n=int(pres["nwords"].sum()), den=pal)
    vice = v2[v2["rol"] == "vicechair"]
    pon("pres.vice_ses", int(vice["clave"].nunique()), "n", "V2",
        "sesiones con al menos una fila de un vicepresidente (role vicechair de parse_speaker, que tolera las erratas "
        "del reconocimiento óptico en la etiqueta)")
    pon("pres.vice_filas", len(vice), "n", "V2", "filas con role vicechair de parse_speaker")
    pon("pres.vice_fechas", int(vice["date"].nunique()), "n", "V2",
        "fechas con alguna fila de un vicepresidente (dos fechas tienen dos sesiones con vicepresidente)")
    edad = v2[v2["rol"] == "chair_age"]
    pon("pres.edad_ses", int(edad["clave"].nunique()), "n", "V2", "sesiones con Presidencia de edad (role chair_age)")

    # ── 4. Sesiones (una por clave), con v3 y metadatos del proyecto ─────────────────────────────────────────
    agg = ses_v2.agg(f=("date", "first"), s=("num_session", "first"), leg=("legislature", "first"), e=("etapa", "first"),
                     filas=("nwords", "size"), pal=("nwords", "sum"), id_min=("id", "min"), id_max=("id", "max"))
    agg["largas"] = ses_v2["nwords"].apply(lambda s: int((s > 300).sum()))
    agg["dip"] = ses_v2["rep_id"].nunique()
    sp = v2[~v2["presidencia"]].groupby("clave")
    agg["dip_sp"] = sp["rep_id"].nunique()
    pg = pres.groupby("clave")
    agg["filas_pres"] = pg.size()
    agg["pal_pres"] = pg["nwords"].sum()
    agg["vice"] = vice.groupby("clave").size()
    g3 = v3.groupby("clave")
    agg["filas_v3"] = g3.size()
    agg["habla_v3"] = hab.groupby("clave").size()
    agg["id3_min"] = g3["id"].min()
    agg["id3_max"] = g3["id"].max()
    agg = agg.fillna(0).sort_values(["f", "s"])
    presidentes: dict[str, dict] = {}
    gobiernos: dict[str, dict] = {}
    series_e: dict[str, set] = {}
    estados_pag: dict[str, int] = {}
    sesiones = []
    for k, r in agg.iterrows():
        m = ctx.meta_sesion(k)
        p = m.get("presidente") or {}
        g = m.get("gobierno") or {}
        if p.get("clave") and p["clave"] not in presidentes:
            presidentes[p["clave"]] = {"clave": p["clave"], "nombre": p.get("nombre"), "corto": p.get("corto"),
                                       "cargo": p.get("cargo"), "verificar": bool(p.get("verificar"))}
        if g.get("id") and g["id"] not in gobiernos:
            gobiernos[g["id"]] = {"id": g["id"], "nombre": g.get("nombre"), "presidente": g.get("presidente"),
                                  "inicio": g.get("inicio"), "fin": g.get("fin"), "verificar": bool(g.get("verificar"))}
        exige(m["diario"] in SERIES, f"serie desconocida en sessions.json: {m['diario']}")
        verif = m.get("page_status") in VERIFICADAS and m.get("page_start") is not None
        avisos = sorted(set((m.get("warnings") or []) + [i.get("tipo") for i in (m.get("incidents") or []) if i.get("tipo")]))
        series_e.setdefault(r["e"], set()).add((SERIES[m["diario"]], m.get("sigla"), m["diario"]))
        estados_pag[m.get("page_status")] = estados_pag.get(m.get("page_status"), 0) + 1
        meta = {"num": m.get("diario_num"), "paginas": [m["page_start"], m["page_end"]] if verif else None,
                "pdf": m.get("pdf_pages"), "pres": p.get("clave"), "gob": g.get("id"),
                "doble": (m.get("double_sitting") or {}).get("franja")}
        reg = {
            "clave": k, "f": r["f"], "s": int(r["s"]), "e": r["e"],
            "filas": int(r["filas"]), "pal": int(r["pal"]), "dip": int(r["dip"]), "dip_sp": int(r["dip_sp"]),
            "largas": int(r["largas"]), "filas_pres": int(r["filas_pres"]), "pal_pres": int(r["pal_pres"]),
            "vice": int(r["vice"] > 0), "id_v2": [int(r["id_min"]), int(r["id_max"])],
            "filas_v3": int(r["filas_v3"]), "habla_v3": int(r["habla_v3"]), "id_v3": [int(r["id3_min"]), int(r["id3_max"])],
            "meta": {x: y for x, y in meta.items() if y is not None},
        }
        if avisos:
            reg["avisos"] = avisos
        sesiones.append(reg)
    exige(len(sesiones) == 755, f"{len(sesiones)} sesiones")
    exige(sum(s["filas"] for s in sesiones) == N_FILAS_V2 and sum(s["filas_v3"] for s in sesiones) == N_FILAS_V3,
          "las filas por sesión no suman el total")
    ctx.compartido["sesiones"] = sesiones
    ctx.compartido["presidentes"] = presidentes
    ctx.compartido["gobiernos"] = gobiernos
    por_clave = {s["clave"]: s for s in sesiones}

    # ── 5. Legislaturas ──────────────────────────────────────────────────────────────────────────────────────
    for leg in LEGISLATURAS:
        d = v2[v2["legislature"] == leg]
        ss = [s for s in sesiones if next(x["leg"] for x in ETAPAS if x["id"] == s["e"]) == leg]
        pon(f"leg.{leg}.sesiones", int(d["clave"].nunique()), "n", "V2", f"claves de sesión con legislature = {leg}")
        pon(f"leg.{leg}.filas", len(d), "n", "V2", f"filas con legislature = {leg}")
        pon(f"leg.{leg}.palabras", int(d["nwords"].sum()), "n", "V2", f"suma de nwords con legislature = {leg}")
        pon(f"leg.{leg}.palabras.pct", d["nwords"].sum() / pal, "pct", "V2", "palabras de la legislatura / palabras",
            clave="CALC", n=int(d["nwords"].sum()), den=pal)
        pon(f"leg.{leg}.diputados", int(d["rep_id"].nunique()), "n", "V2", f"rep_id distintos con legislature = {leg}")
        pon(f"leg.{leg}.paginas", int(sum(s["meta"].get("pdf") or 0 for s in ss)), "n", "proyecto",
            f"suma de pdf_pages de sus sesiones ({PRF}; recuento de los archivos del proyecto)")

    # ── 6. Meses ─────────────────────────────────────────────────────────────────────────────────────────────
    rango = {}
    for e in ETAPAS:
        d = v2[v2["etapa"] == e["id"]]
        rango[e["id"]] = (d["mes"].min(), d["mes"].max())
    for a, b in zip(ETAPA_IDS, ETAPA_IDS[1:]):
        exige(v2.loc[v2["etapa"] == a, "date"].max() < v2.loc[v2["etapa"] == b, "date"].min(),
              f"el corte por numeración no coincide con el de fechas entre {a} y {b}")
    salto = (meses_entre(rango["IV"][1], rango["V"][0])[1:-1])
    mes_g = v2.groupby("mes").agg(sesiones=("clave", "nunique"), filas=("nwords", "size"), pal=("nwords", "sum"),
                                  dip=("rep_id", "nunique"))
    meses = []
    for mm in meses_entre(v2["mes"].min(), v2["mes"].max()):
        e = next((x for x, (a, b) in rango.items() if a <= mm <= b), None)
        if mm in mes_g.index:
            estado = "sesion"
        elif e:
            estado = "sin_sesion"
        elif mm in salto:
            estado = "salto"
        else:
            estado = "fuera"
        r = mes_g.loc[mm] if mm in mes_g.index else None
        leg = v2.loc[v2["mes"] == mm, "legislature"].iloc[0] if r is not None else (next(x["leg"] for x in ETAPAS if x["id"] == e) if e else None)
        meses.append({"mes": mm, "e": e, "leg": leg, "estado": estado,
                      "sesiones": int(r["sesiones"]) if r is not None else 0, "filas": int(r["filas"]) if r is not None else 0,
                      "pal": int(r["pal"]) if r is not None else 0, "dip": int(r["dip"]) if r is not None else 0})
    cuenta = Counter(m["estado"] for m in meses)
    pon("meses.total", len(meses), "n", "V2", f"meses de {meses[0]['mes']} a {meses[-1]['mes']}")
    pon("meses.con_sesion", cuenta["sesion"], "n", "V2", "meses con al menos una sesión")
    pon("meses.sin_sesion", len(meses) - cuenta["sesion"], "n", "V2", "meses sin sesión")
    pon("meses.sin_sesion_en_etapa", cuenta["sin_sesion"], "n", "V2", "meses sin sesión entre la primera y la última de una etapa")
    pon("meses.fuera_de_etapa", cuenta["fuera"], "n", "V2", "meses sin sesión entre dos etapas")
    pon("meses.salto", cuenta["salto"], "n", "V2", f"meses sin sesión entre la etapa IV y la V ({salto[0]} → {salto[-1]})")
    pon("meses.salto.desde", salto[0], "fecha", "V2", "primer mes del salto", clave="CALC")
    pon("meses.salto.hasta", salto[-1], "fecha", "V2", "último mes del salto", clave="CALC")
    ctx.compartido["meses"] = meses

    # ── 7. Etapas ────────────────────────────────────────────────────────────────────────────────────────────
    bibl = ctx.bibliotecas()
    debates = [b for b in bibl if b["clave"].startswith("L2-")]
    for b in debates:
        exige(len(b["etapas"]) == 1, f"el debate {b['clave']} cae en varias etapas: {b['etapas']}")
    etapas = []
    tot_pag = 0
    for e in ETAPAS:
        i = e["id"]
        d = v2[v2["etapa"] == i]
        d3 = v3[v3["etapa"] == i]
        ss = [s for s in sesiones if s["e"] == i]
        ms = [m for m in meses if m["e"] == i]
        pres_c = Counter(s["meta"].get("pres") for s in ss)
        gob_c = Counter(s["meta"].get("gob") for s in ss)
        exige(len(series_e[i]) == 1, f"la etapa {i} mezcla series del Diario: {series_e[i]}")
        serie, sigla, titulo = next(iter(series_e[i]))
        deb = [b for b in debates if b["etapas"] == [i]]
        pag = int(sum(s["meta"].get("pdf") or 0 for s in ss))
        tot_pag += pag
        reg = {
            "id": i, "slug": e["slug"], "leg": e["leg"], "num": list(e["num"]),
            "fechas": [d["date"].min(), d["date"].max()], "meses_rango": list(rango[i]),
            "sesiones": len(ss), "dias": int(d["date"].nunique()), "filas": len(d), "palabras": int(d["nwords"].sum()),
            "pct_palabras": round(d["nwords"].sum() / pal, 6), "diputados": int(d["rep_id"].nunique()),
            "diputados_sp": int(d.loc[~d["presidencia"], "rep_id"].nunique()),
            "filas_pres": int(d["presidencia"].sum()), "pal_pres": int(d.loc[d["presidencia"], "nwords"].sum()),
            "filas_v3": len(d3), "habla_v3": int(d3["habla"].sum()), "habla_v3_palabras": int(d3.loc[d3["habla"], "nwords"].sum()),
            "meses": len(ms), "meses_con_sesion": sum(m["estado"] == "sesion" for m in ms),
            "meses_sin_sesion": [m["mes"] for m in ms if m["estado"] != "sesion"],
            "serie": serie, "sigla": sigla, "diario": titulo,
            "paginas": pag, "sesiones_paginas_verificadas": sum(s["meta"].get("paginas") is not None for s in ss),
            "presidentes": [{"clave": k, "corto": presidentes[k]["corto"], "sesiones": n} for k, n in pres_c.most_common()],
            "gobiernos": [{"id": k, "nombre": gobiernos[k]["nombre"], "sesiones": n,
                           "primera": min(s["f"] for s in ss if s["meta"].get("gob") == k),
                           "ultima": max(s["f"] for s in ss if s["meta"].get("gob") == k)}
                          for k, n in sorted(gob_c.items(), key=lambda x: min(s["f"] for s in ss if s["meta"].get("gob") == x[0]))],
            "debates": [{"clave": b["clave"], "nombre": b["nombre"], "entradas": b["entradas"], "sesiones": len(b["sesiones"]),
                         "desde": b["desde"], "hasta": b["hasta"]} for b in sorted(deb, key=lambda b: b["desde"])],
        }
        etapas.append(reg)
        p = f"etapa.{i}"
        regla = f"legislature = {e['leg']}" + (f" y num_session {e['num'][0]}–{e['num'][1]}" if e["leg"] == "1936-1939" else "")
        pon(f"{p}.sesiones", reg["sesiones"], "n", "V2", f"claves de sesión con {regla}")
        pon(f"{p}.num_desde", e["num"][0], "id", "V2", "primer número de sesión de la etapa", clave="R")
        pon(f"{p}.num_hasta", e["num"][1], "id", "V2", "último número de sesión de la etapa", clave="R")
        pon(f"{p}.fecha.desde", reg["fechas"][0], "fecha", "V2", "primera fecha de la etapa")
        pon(f"{p}.fecha.hasta", reg["fechas"][1], "fecha", "V2", "última fecha de la etapa")
        pon(f"{p}.dias", reg["dias"], "n", "V2", "fechas distintas con sesión en la etapa")
        pon(f"{p}.filas", reg["filas"], "n", "V2", f"filas con {regla}")
        pon(f"{p}.palabras", reg["palabras"], "n", "V2", f"suma de nwords con {regla}")
        pon(f"{p}.palabras.pct", d["nwords"].sum() / pal, "pct", "V2", "palabras de la etapa / palabras", clave="CALC",
            n=reg["palabras"], den=pal)
        pon(f"{p}.diputados", reg["diputados"], "n", "V2", "rep_id distintos en la etapa, incluido el de quien preside")
        pon(f"{p}.diputados_sp", reg["diputados_sp"], "n", "V2", "rep_id distintos en la etapa fuera de la Presidencia")
        pon(f"{p}.filas.v3", reg["filas_v3"], "n", "v3", "filas v3 de las sesiones de la etapa")
        pon(f"{p}.habla.v3", reg["habla_v3"], "n", "v3", "filas de habla v3 (role ∉ {summary, remark}) de la etapa")
        pon(f"{p}.meses", reg["meses"], "n", "V2", f"meses de {rango[i][0]} a {rango[i][1]}")
        pon(f"{p}.meses_con_sesion", reg["meses_con_sesion"], "n", "V2", "meses de la etapa con al menos una sesión")
        pon(f"{p}.meses_sin_sesion", len(reg["meses_sin_sesion"]), "n", "V2", "meses de la etapa sin sesión")
        pon(f"{p}.vice_ses", int(d.loc[d["rol"] == "vicechair", "clave"].nunique()), "n", "V2",
            "sesiones de la etapa con alguna fila de un vicepresidente (role vicechair de parse_speaker)")
        pon(f"{p}.dobles", int((d.groupby("date")["clave"].nunique() > 1).sum()), "n", "V2", "fechas de la etapa con dos sesiones")
        pon(f"{p}.presidencia.pct", reg["pal_pres"] / reg["palabras"], "pct", "V2",
            "palabras de la Presidencia (parse_speaker) / palabras de la etapa", clave="CALC", n=reg["pal_pres"], den=reg["palabras"])
        pon(f"{p}.presidencia.filas.pct", reg["filas_pres"] / reg["filas"], "pct", "V2",
            "filas de la Presidencia (parse_speaker) / filas de la etapa", clave="CALC", n=reg["filas_pres"], den=reg["filas"])
        pon(f"{p}.paginas", pag, "n", "proyecto", f"suma de pdf_pages de sus sesiones ({PRF}; recuento de los archivos del proyecto)")
        pon(f"{p}.paginas.verificadas", reg["sesiones_paginas_verificadas"], "n", "proyecto",
            f"sesiones con page_status contiguous, verso_blank o corrected ({PRF})")
        pon(f"{p}.sigla", sigla, "texto", "proyecto", f"sigla del Diario de sus sesiones ({PRF})", clave="M")
        pon(f"{p}.serie", titulo, "texto", "proyecto", f"título del Diario de sus sesiones ({PRF})", clave="M")
        for k, n in pres_c.items():
            pon(f"{p}.pres.{k}", n, "n", "proyecto", f"sesiones de la etapa con {presidentes[k]['nombre']} como presidente titular ({PRF})")
        for k, n in gob_c.items():
            pon(f"{p}.gob.{k}", n, "n", "proyecto", f"sesiones de la etapa bajo el {gobiernos[k]['nombre']} ({PRF})")
        pon(f"{p}.presidentes", len(pres_c), "n", "proyecto", f"presidentes titulares distintos ({PRF})")
        pon(f"{p}.gobiernos", len(gob_c), "n", "proyecto", f"Gobiernos distintos por fecha de sesión ({PRF})")
        pon(f"{p}.debates", len(deb), "n", "v3", "debates preparados del explorador (bibliotecas L2) con todas sus sesiones en la etapa")
    exige(sum(x["sesiones"] for x in etapas) == n_ses and sum(x["filas"] for x in etapas) == N_FILAS_V2
          and sum(x["palabras"] for x in etapas) == pal and sum(x["filas_v3"] for x in etapas) == N_FILAS_V3,
          "la suma de las etapas no da el total")
    ctx.compartido["etapas"] = etapas

    # Tras el 18-VII-1936 (= etapas IV y V; se comprueba).
    tras = v2[v2["date"] > GUERRA]
    exige(set(tras["etapa"]) == {"IV", "V"} and len(tras) == sum(x["filas"] for x in etapas if x["id"] in ("IV", "V")),
          "«tras el 18-VII-1936» no coincide con las etapas IV y V")
    pon("sesiones.tras_18jul", int(tras["clave"].nunique()), "n", "V2", f"sesiones con fecha posterior a {GUERRA}")
    pon("palabras.tras_18jul", int(tras["nwords"].sum()), "n", "V2", f"suma de nwords con fecha posterior a {GUERRA}")
    pon("palabras.tras_18jul.pct", tras["nwords"].sum() / pal, "pct", "V2", "palabras tras el 18-VII-1936 / palabras",
        clave="CALC", n=int(tras["nwords"].sum()), den=pal)

    # ── 8. Metadatos del proyecto: páginas, series, presidentes, Gobiernos ──────────────────────────────────
    ps = pr["sessions"]
    pon("paginas.total", int(sum(s.get("pdf_pages") or 0 for s in ps)), "n", "proyecto",
        f"suma de pdf_pages ({PRF}; recuento de los archivos del proyecto, no dato depositado)")
    exige(tot_pag == C["paginas.total"]["v"], "las páginas por etapa no suman el total")
    ver = sum(s.get("page_status") in VERIFICADAS for s in ps)
    pon("paginas.verificadas.sesiones", ver, "n", "proyecto", f"sesiones con page_status contiguous, verso_blank o corrected ({PRF})")
    pon("paginas.sin_verificar.sesiones", len(ps) - ver, "n", "proyecto", f"sesiones con page_status unverified ({PRF})")
    sin_ver = [s for s in sesiones if s["meta"].get("paginas") is None]
    pon("paginas.sin_verificar.desde", min(s["f"] for s in sin_ver), "fecha", "proyecto", "primera sesión sin páginas verificadas")
    serie_c = Counter()
    for e in etapas:
        serie_c[e["serie"]] += e["sesiones"]
    for est, n in sorted(estados_pag.items()):
        pon(f"paginas.estado.{est}", n, "n", "proyecto", f"sesiones con page_status = {est} ({PRF})")
    pon("series.n", len(serie_c), "n", "proyecto", f"títulos distintos del Diario ({PRF})")
    for cod, n in serie_c.items():
        tit = next(t for t, c in SERIES.items() if c == cod)
        pon(f"serie.{cod}.sesiones", n, "n", "proyecto", f"sesiones con diario = «{tit}» ({PRF})")
        pon(f"serie.{cod}.titulo", tit, "texto", "proyecto", f"campo diario de {PRF}", clave="M")
    pon("presidentes.n", len(presidentes), "n", "proyecto", f"presidentes titulares distintos ({PRF})")
    pon("gobiernos.n", len(gobiernos), "n", "proyecto", f"Gobiernos distintos por fecha de sesión ({PRF})")

    # ── 9. Bibliotecas del explorador (v3) ──────────────────────────────────────────────────────────────────
    pon("bib.n", len(bibl), "n", "v3", "bibliotecas del proyecto (.2replib) que ofrece el explorador")
    pon("bib.entradas", sum(b["entradas"] for b in bibl), "n", "v3", "suma de entradas de las bibliotecas (no son filas distintas)")
    pon("bib.debates", len(debates), "n", "v3", "bibliotecas de debate (clave L2)")

    # ── 10. Dataverse (instantánea fechada) ─────────────────────────────────────────────────────────────────
    C.update(_dataverse(ctx))

    # ── 11. Explorador publicado ────────────────────────────────────────────────────────────────────────────
    C.update(_explorador(ctx))

    # ── 12. Archivos ─────────────────────────────────────────────────────────────────────────────────────────
    ctx.escribir_json("sesiones.json", {
        "_meta": {"unidad": "sesión = (date, num_session): 755 claves en 752 fechas, las mismas en V2 y v3",
                  "base": {"V2": "filas, pal, dip, dip_sp, largas, filas_pres, pal_pres, vice, id_v2",
                           "v3": "filas_v3, habla_v3, id_v3", "proyecto": "meta (no depositados; el explorador no los muestra)"},
                  "campos": {"clave": "AAAA-MM-DD-n", "f": "fecha", "s": "num_session", "e": "etapa (su legislatura, en etapas.json)",
                             "filas": "filas V2", "pal": "palabras V2 (nwords)", "dip": "rep_id distintos, con la Presidencia",
                             "dip_sp": "rep_id distintos fuera de la Presidencia", "largas": "filas V2 de más de 300 palabras",
                             "filas_pres/pal_pres": "de la Presidencia (parse_speaker del explorador)",
                             "vice": "1 si un vicepresidente preside algún tramo", "id_v2/id_v3": "primer y último id de la sesión",
                             "habla_v3": "filas v3 con role ∉ {summary, remark}",
                             "meta.num": "número del Diario (la serie y la sigla, por etapa, en etapas.json)",
                             "meta.paginas": "[primera, última] solo si las páginas están verificadas (si falta: sin verificar)",
                             "meta.pdf": "páginas del archivo",
                             "meta.pres": "clave del presidente titular (etapas.json › presidentes)", "meta.gob": "id del Gobierno (etapas.json › gobiernos)",
                             "meta.doble": "franja si la fecha tiene dos sesiones", "avisos": "avisos e incidencias de sessions.json (solo si hay)",
                             "omitidos": "un campo de meta que falta es un valor nulo en sessions.json"},
                  "exportado": ctx.hoy},
        "sesiones": sesiones,
    })
    ctx.escribir_json("meses.json", {
        "_meta": {"estados": {"sesion": "con sesión", "sin_sesion": "sin sesión dentro de su etapa (contorno y rótulo)",
                              "fuera": "sin sesión entre dos etapas (vacío)", "salto": f"el «//» de {salto[0]} a {salto[-1]}"},
                  "base": "V2", "nota": "La causa de un mes sin sesión no sale del corpus y no se rotula.", "exportado": ctx.hoy},
        "meses": meses,
    })
    ctx.escribir_json("etapas.json", {
        "_meta": {"regla": "I y II: legislatura entera; 1936-1939 se corta por num_session: 1–60 (III), 61–69 (IV), 70–74 (V)",
                  "base": {"V2": "sesiones, dias, filas, palabras, diputados, meses", "v3": "filas_v3, habla_v3, debates",
                           "proyecto": "series, paginas, presidentes, gobiernos"},
                  "exportado": ctx.hoy},
        "etapas": etapas,
        "presidentes": list(presidentes.values()),
        "gobiernos": sorted(gobiernos.values(), key=lambda g: g["inicio"] or ""),
    })
    ctx.copiar_a_data(HEMICICLO, "hemiciclo_1936.json")
    ctx.escribir_json("grafias.json", _grafias(ctx))
    ctx.escribir_json("jsonld/thqcmi.json", _jsonld_thqcmi(ctx, C))
    ctx.escribir_json("jsonld/cgocus.json", _jsonld_cgocus(ctx))
    exige(por_clave["1931-10-01-48"]["filas"] > 0, "falta la sesión 48 de 1931")
    for alias, canon in ALIAS.items():
        exige(alias not in C, f"el alias {alias} ya es una cifra")
        C[alias] = {**C[canon], "alias_de": canon}
    return C


# ── Dataverse ─────────────────────────────────────────────────────────────────────────────────────────────────────

def _campo(ds: dict, nombre: str):
    for f in ds["latestVersion"]["metadataBlocks"]["citation"]["fields"]:
        if f["typeName"] == nombre:
            return f["value"]
    return None


def _dataverse(ctx) -> dict:
    C = {}
    inst = ctx.inst
    for ds, doi in (("thqcmi", "10.7910/DVN/THQCMI"), ("cgocus", "10.7910/DVN/CGOCUS")):
        d = inst.dataset(ds)
        lv = d["latestVersion"]
        fecha = inst.consultado(f"dv_{ds}")
        pre = f"dv.{ds}"
        f_api = f"API de Harvard Dataverse, doi:{doi}, consultada el {fecha}"

        def pon(k, v, t, f, clave="M", **kw):
            C[k] = ctx.cifra(v, t, "dv", f, clave=clave, d=fecha, **kw)
        pon(f"{pre}.doi", doi, "texto", f_api)
        pon(f"{pre}.version", f'V{lv["versionNumber"]}.{lv["versionMinorNumber"]}', "texto", f"{f_api} › latestVersion")
        pon(f"{pre}.version.fecha", lv["releaseTime"][:10], "fecha", f"{f_api} › latestVersion.releaseTime")
        pon(f"{pre}.publicacion.fecha", d["publicationDate"], "fecha", f"{f_api} › publicationDate")
        pon(f"{pre}.licencia", lv["license"]["name"], "texto", f"{f_api} › license")
        pon(f"{pre}.archivos", len(lv["files"]), "n", f"{f_api} › files")
        pon(f"{pre}.titulo", _campo(d, "title"), "texto", f"{f_api} › title")
        cita = inst.cita(ds)
        if cita:
            pon(f"{pre}.cita", cita, "texto", f"API de Harvard Dataverse, versions/:latest-published/citation, {fecha}")
        uso = inst.uso(ds)
        if uso:
            f_uso = f"API de Harvard Dataverse, makeDataCount, consultada el {inst.consultado(f'dv_{ds}_uso')}"
            for k_api, k in (("viewsTotal", "visitas"), ("downloadsTotal", "descargas"), ("viewsUnique", "visitas_unicas"),
                             ("downloadsUnique", "descargas_unicas")):
                C[f"{pre}.{k}"] = ctx.cifra(uso[k_api], "n", "dv", f"{f_uso} › {k_api} (cambia cada día; el plan no lo publica)",
                                            clave="M", d=inst.consultado(f"dv_{ds}_uso"))
        vers = inst.versiones(ds)
        pon(f"{pre}.versiones", len(vers), "n", f"{f_api} › versions")
        for v in vers:
            pon(f'{pre}.v{v["versionNumber"]}_{v["versionMinorNumber"]}.fecha', v["releaseTime"][:10], "fecha",
                f"{f_api} › versions › releaseTime")
        for fl in lv["files"]:
            df = fl["dataFile"]
            nom = df.get("originalFileName") or df["filename"]
            slug = CORTOS[nom.rsplit(".", 1)[0].lower().replace("2rep_", "").replace("luz_y_taquigrafos_", "")]
            pon(f"{pre}.{slug}.bytes", df["filesize"], "peso",
                f"{f_api} › files › {df['filename']} › filesize (el tamaño que enseña Dataverse)")
            if df.get("originalFileSize"):
                pon(f"{pre}.{slug}.original.bytes", df["originalFileSize"], "peso",
                    f"{f_api} › files › {df['filename']} › originalFileSize ({nom}, tal como se depositó)")
            pon(f"{pre}.{slug}.nombre", df["filename"], "texto", f"{f_api} › files › filename (el nombre que enseña Dataverse)")
            if df.get("originalFileName"):
                pon(f"{pre}.{slug}.original.nombre", nom, "texto", f"{f_api} › files › originalFileName")
            pon(f"{pre}.{slug}.md5", df["md5"], "texto", f"{f_api} › files › md5 (del archivo servido)")
        autores = [a["authorName"]["value"] for a in (_campo(d, "author") or [])]
        pon(f"{pre}.autores", "; ".join(autores), "texto", f"{f_api} › author, unidos con «; »")
        if ds == "thqcmi":
            csvf = next(fl["dataFile"] for fl in lv["files"] if fl["dataFile"]["filename"] == "2REP_Diaries.csv")
            pon("dv.csv.bytes", csvf["filesize"], "peso", f"{f_api} › files › 2REP_Diaries.csv")
            pon("dv.csv.md5", csvf["md5"], "texto", f"{f_api} › files › 2REP_Diaries.csv › md5")
            pon("dv.guestbook", d.get("guestbookId"), "id", f"{f_api} › guestbookId")
        else:
            pon("dv.cgocus.unf", lv.get("UNF"), "texto", f"{f_api} › latestVersion.UNF")
            tot = sum(fl["dataFile"]["filesize"] for fl in lv["files"])
            pon("dv.cgocus.bytes", tot, "peso", f"{f_api} › suma de filesize de los {len(lv['files'])} archivos", clave="CALC")
    return C


def _explorador(ctx) -> dict:
    C = {}
    ex = ctx.inst.explorador()
    man = ex["corpus_servido"]
    fecha = ex.get("consultado", ctx.inst.fecha)[:10]
    f = f"manifiesto embebido en {ex['url']} (md5 {ex['md5'][:8]}…), consultado el {fecha}"

    def pon(k, v, t, fu, clave="M", **kw):
        C[k] = ctx.cifra(v, t, "explorador", fu, clave=clave, d=fecha, **kw)
    exige(man["sha256"] == SHA256_V3 and man["csv_origen"]["sha256"] == SHA256_V3_CSV and man["n_speeches"] == N_FILAS_V3,
          "el explorador publicado no sirve la v3 esperada")
    pon("explorador.gz.bytes", man["bytes_gz"], "peso", f"{f} › corpus_servido.bytes_gz (los {len(man['partes'])} trozos)")
    pon("explorador.db.bytes", man["bytes"], "peso", f"{f} › corpus_servido.bytes (la base descomprimida)")
    pon("explorador.gz.mb", round(man["bytes_gz"] / 1024 ** 2), "n", f"round(corpus_servido.bytes_gz / 1.024²), {f}", clave="CALC")
    pon("explorador.trozos", len(man["partes"]), "n", f"{f} › corpus_servido.partes")
    pon("explorador.construido", man["construido_en"][:10], "fecha", f"{f} › corpus_servido.construido_en")
    if ex.get("trozos"):
        tot = sum(int(t["content-length"]) for t in ex["trozos"])
        exige(tot == man["bytes_gz"], f"HEAD de los trozos: {tot} B ≠ {man['bytes_gz']} B del manifiesto")
    lm = (ex.get("cabeceras") or {}).get("last-modified")
    if lm:
        pon("explorador.pagina.fecha", dt.datetime.strptime(lm, "%a, %d %b %Y %H:%M:%S GMT").date().isoformat(), "fecha",
            f"cabecera last-modified de {ex['url']}")
    if ex.get("build_id"):
        pon("explorador.build", ex["build_id"], "texto", f"build_id de {ex['url']}")
    fuente = ex.get("fuente") or {}
    if fuente.get("cita"):
        pon("explorador.cita", fuente["cita"], "texto", f"{f} › fuente.cita (la cita que da el explorador)")
        pon("explorador.cita.version", fuente.get("version_cita"), "texto", f"{f} › fuente.version_cita")
    C["v3.sha256"] = ctx.cifra(SHA256_V3, "texto", "v3", "sha256 de corpus.sqlite (el que sirve el explorador)", clave="C")
    C["v3.huella"] = ctx.cifra(SHA256_V3[:8], "texto", "v3", "primeros 8 caracteres del sha256 de corpus.sqlite", clave="C")
    C["v3.csv.sha256"] = ctx.cifra(SHA256_V3_CSV, "texto", "v3", "sha256 de 2REP_Diaries_v3.csv, origen de la base del explorador",
                                   clave="M")
    return C


# ── Grafías (D-22) ────────────────────────────────────────────────────────────────────────────────────────────────

def _grafias(ctx) -> dict:
    meta = {"fuente": "exportador/grafias.csv (dueño: grafías; la revisa el investigador, D-22)", "exportado": ctx.hoy}
    if not GRAFIAS_CSV.exists():
        ctx.aviso("exportador/grafias.csv aún no existe: grafias.json sale vacío (D-22)")
        return {"_meta": {**meta, "estado": "pendiente"}, "grafias": {}}
    txt = GRAFIAS_CSV.read_text(encoding="utf-8-sig")
    dialecto = csv.Sniffer().sniff(txt.splitlines()[0], delimiters=",;\t")
    filas = list(csv.DictReader(txt.splitlines(), dialect=dialecto))
    exige(filas and "rep_id" in filas[0], "grafias.csv necesita la columna rep_id")
    col = next((c for c in ("grafia", "nombre", "nombre_grafia") if c in filas[0]), None)
    exige(col is not None, "grafias.csv necesita una columna grafia (o nombre)")
    v2 = ctx.v2()
    ids = set(int(x) for x in v2["rep_id"].dropna())
    out = {}
    for f in filas:
        rid = int(f["rep_id"])
        exige(rid in ids, f"grafias.csv: rep_id {rid} no existe en la V2")
        exige(str(rid) not in out, f"grafias.csv: rep_id {rid} repetido")
        exige((f.get(col) or "").strip(), f"grafias.csv: rep_id {rid} sin grafía")
        out[str(rid)] = {"grafia": f[col].strip(), **{k: v for k, v in f.items() if k not in ("rep_id", col) and v not in (None, "")}}
    _adopta_grafias(out, ctx.v2_texto())
    return {"_meta": {**meta, "estado": "adoptada (D-22, 23-09-2026)", "n": len(out),
                      "criterio": "confirmadas y probables, tal cual; las «por revisar», con la forma que imprime el Diario"},
            "grafias": out}


# D-22 (decisión del director, 23-09-2026): se adoptan las grafías confirmadas y probables; las «por revisar» usan la
# forma que IMPRIME EL DIARIO, con sus tildes. En siete de las once, la propuesta de la tabla ya es esa forma; en estas
# cuatro, la propuesta sigue a la RAH o a la lengua propia y el Diario imprime otra. La propuesta no se pierde: queda en
# `propuesta` y en docs/02c_GRAFIAS.md § 1 para la revisión posterior. Cada forma se comprueba contra el texto de la V2:
# la del Diario tiene que aparecer en él más veces que la propuesta (si un día no es así, la exportación se para).
GRAFIA_DEL_DIARIO = {
    # rep_id: (grafía, corto, uso, forma que se cuenta en el Diario, forma de la propuesta que se cuenta)
    "174": ("Rafael Campaláns Puig", "Campaláns", "Rafael Campaláns", "Campaláns", "Campalans"),
    "654": ("Luis Nicoláu d'Olwer", "Nicoláu d'Olwer", "Luis Nicoláu d'Olwer", "Nicoláu", "Nicolau"),
    "735": ("Antonio Pildain Zapiain", "Pildain", "Antonio Pildain", "Pildain", "Pildáin"),
    "814": ("Antonio Roma y Rubies", "Roma y Rubies", "Antonio Roma y Rubies", "Roma y Rubies", "Romá y Rubíes"),
}


def _adopta_grafias(out: dict, textos) -> None:
    texto = None
    for rid, g in out.items():
        if g.get("estado") != "por revisar" or rid not in GRAFIA_DEL_DIARIO:
            continue
        grafia, corto, uso, del_diario, de_propuesta = GRAFIA_DEL_DIARIO[rid]
        if texto is None:
            texto = "\n".join(textos.astype(str))
        n_d, n_p = texto.count(del_diario), texto.count(de_propuesta)
        exige(n_d > n_p, f"D-22: rep_id {rid}: el Diario imprime «{del_diario}» {n_d} veces y «{de_propuesta}» {n_p}; "
                         "la forma del Diario ya no es la mayoritaria: revise GRAFIA_DEL_DIARIO")
        g.update({"propuesta": g["grafia"], "grafia": grafia, "corto": corto, "uso": uso,
                  "adopcion": f"D-22: forma que imprime el Diario («{del_diario}» {n_d} veces en la V2, «{de_propuesta}» {n_p})"})
    for rid in GRAFIA_DEL_DIARIO:
        exige(rid in out and out[rid].get("estado") == "por revisar",
              f"D-22: rep_id {rid} ya no está «por revisar» en grafias.csv: quítelo de GRAFIA_DEL_DIARIO")


# ── JSON-LD (schema.org Dataset) ──────────────────────────────────────────────────────────────────────────────────

def _creadores(ds: dict) -> list:
    out = []
    for a in _campo(ds, "author") or []:
        p = {"@type": "Person", "name": a["authorName"]["value"]}
        if a.get("authorIdentifier"):
            p["identifier"] = a["authorIdentifier"]["value"]
        af = a.get("authorAffiliation") or {}
        nombre = (af.get("expandedvalue") or {}).get("termName") or af.get("value")
        if nombre:
            p["affiliation"] = {"@type": "Organization", "name": nombre}
            if str(af.get("value", "")).startswith("https://ror.org/"):
                p["affiliation"]["identifier"] = af["value"]
        out.append(p)
    return out


def _comun_ld(ds: dict, doi: str) -> dict:
    lv = ds["latestVersion"]
    kw = [k["keywordValue"]["value"] for k in (_campo(ds, "keyword") or [])]
    return {
        "@context": "https://schema.org/", "@type": "Dataset",
        "url": f"https://doi.org/{doi}", "identifier": f"https://doi.org/{doi}",
        "sameAs": f"https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:{doi}",
        "version": f'{lv["versionNumber"]}.{lv["versionMinorNumber"]}',
        "license": "https://creativecommons.org/licenses/by/4.0/", "isAccessibleForFree": True,
        "creator": _creadores(ds), "publisher": {"@type": "Organization", "name": ds["publisher"]},
        "datePublished": ds["publicationDate"], "dateModified": lv["releaseTime"][:10], "keywords": kw,
    }


def _jsonld_thqcmi(ctx, C: dict) -> dict:
    ds = ctx.inst.dataset("thqcmi")
    base = _comun_ld(ds, "10.7910/DVN/THQCMI")
    es = {k: formatear(C[k], "", "es") for k in ("filas.V2", "sesiones")}
    en = {k: formatear(C[k], "", "en") for k in ("filas.V2", "sesiones")}
    col = COLUMNAS_V2
    variables = [{"@type": "PropertyValue", "name": c} for c in col]
    alt = (_campo(ds, "alternativeTitle") or [None])[0]
    tit = _campo(ds, "title")
    cobertura = f'{C["sesion.primera"]["v"]}/{C["sesion.ultima"]["v"]}'
    return {
        "es": {**base, "name": alt or tit, "alternateName": tit, "inLanguage": "es", "temporalCoverage": cobertura,
               "variableMeasured": variables,
               "description": (f"Los Diarios de Sesiones del Congreso de la Segunda República Española, de 1931 a 1945, en una tabla: "
                               f"{es['filas.V2']} filas y 14 columnas en {es['sesiones']} sesiones. Cada fila es una vez que el "
                               "Diario anota a un orador, con su texto y el diputado identificado. El texto sale del reconocimiento "
                               "óptico y no está corregido a mano.")},
        "en": {**base, "name": tit, "alternateName": alt, "inLanguage": "es", "temporalCoverage": cobertura,
               "variableMeasured": variables,
               "description": (f"The Diarios de Sesiones of the Congress of the Spanish Second Republic, 1931 to 1945, as a table: "
                               f"{en['filas.V2']} rows and 14 columns across {en['sesiones']} sessions. Each row is one entry of a "
                               "speaker in the printed record, with its text and the identified deputy. The text comes from optical "
                               "character recognition and has not been corrected by hand.")},
    }


def _jsonld_cgocus(ctx) -> dict:
    ds = ctx.inst.dataset("cgocus")
    base = _comun_ld(ds, "10.7910/DVN/CGOCUS")
    tit = _campo(ds, "title")
    periodo = (_campo(ds, "timePeriodCovered") or [{}])[0]
    cobertura = f'{periodo.get("timePeriodCoveredStart", {}).get("value")}/{periodo.get("timePeriodCoveredEnd", {}).get("value")}'
    base.update({"name": tit, "inLanguage": "es", "temporalCoverage": cobertura,
                 "isBasedOn": "https://doi.org/10.7910/DVN/THQCMI"})
    return {
        "es": {**base, "description": ("Afinidades Elegidas: las redes de coautoría de iniciativas en el Congreso de la Segunda "
                                       "República Española, de 1931 a 1939. Es una base derivada de Luz y Taquígrafos. Una "
                                       "arista une a dos diputados que firmaron juntos una misma iniciativa.")},
        "en": {**base, "description": ("Afinidades Elegidas: the co-sponsorship networks of the Congress of the Spanish Second "
                                       "Republic, 1931 to 1939. It is a dataset derived from Luz y Taquígrafos. An edge links two "
                                       "deputies who signed the same parliamentary initiative.")},
    }
