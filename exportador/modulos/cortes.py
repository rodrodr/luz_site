"""cortes · Las Cortes: calendario F01 (tres escalas) y bandas F16; datos de Inicio que faltaban (dueño: grupo 1).

F05 y F09 (fichas, grupo 2) viven en `modulos/fichas.py`: si existe, este módulo lo llama al final y suma sus cifras
(un solo módulo por la lista de `exportar.py`; dos archivos para no pisarse). Una cifra que den los dos con el MISMO
valor se toma una vez; con valores distintos, falla.

Escribe
  src/data/calendario.json   clases del tono (F01c/F01), mes de más palabras, escala de las barras (F01), puertas por
                             sesión (anillos) y los tramos de presidente titular y Gobierno de cada etapa (F16)
  public/datos/sesiones.csv  755 sesiones, V2 y v3 (SIN los metadatos del proyecto mientras siga abierta D-19)
  public/datos/meses.csv     173 meses con estado y clase del tono
  public/datos/presidencia_gobierno.csv   tramos de F16 (los mismos que enseñan las bandas y su tabla)
  (+ los .xlsx gemelos)

Cifras (todas comprobadas contra `docs/marcadores/{cortes,inicio}.md`)
  f01.clase.<0…4>.desde|hasta|meses · f01.mes_max (+ .palabras .sesiones .filas) · f01.sesion_max.palabras|diputados ·
  etapa.<E>.meses.con_sesion|sin_sesion · etapa.<E>.num.desde|hasta · etapa.<E>.filas_v3 ·
  fila.luz.* · fila.presidencia.* · fila.campoamor.* · fila.mexico_caratula.v3 · puerta.mexico-1945.filas|sesiones ·
  f16.verificar.sesiones · f16.tramos.presidente|gobierno
"""
from __future__ import annotations

import importlib
import math

from comun import ETAPA_IDS, exige, leer_json

V2F = "2REP_Diaries.csv (THQCMI V2.0)"
PRF = "sessions.json del proyecto"

# Las ocho puertas de la 0.1 y sus sesiones (clave «AAAA-MM-DD-n»). Son las de `inicio.puertas.*` y `sesiones.lista.*`:
# doce sesiones en total. Los anillos de F01 salen de aquí; se comprueba que cada clave exista.
PUERTAS = {
    "sufragio-1931": ["1931-10-01-48"],
    "cuestion-religiosa-1931": ["1931-10-13-55"],
    "estatuto-1932": ["1932-05-27-173"],
    "casas-viejas-1933": ["1933-02-02-288"],
    "pistola-1934": ["1934-07-04-112"],
    "antesala-1936": ["1936-06-16-45", "1936-07-01-54"],
    "figueres-1939": ["1939-02-01-69"],
    "mexico-1945": ["1945-08-17-71", "1945-11-07-72", "1945-11-08-73", "1945-11-09-74"],
}


def _clases(pal_meses: list[int]) -> list[dict]:
    """Cinco clases por cuantiles SIN interpolar (rango más próximo), como la muestra del sistema de diseño:
    el corte k es el valor de la posición ⌈n·k/5⌉ de la lista ordenada. Cada clase lleva su rango impreso."""
    con = sorted(pal_meses)
    n = len(con)
    cortes = [con[math.ceil(n * k / 5) - 1] for k in (1, 2, 3, 4)]
    lims = [(con[0], cortes[0])] + [(cortes[i - 1] + 1, cortes[i]) for i in (1, 2, 3)] + [(cortes[3] + 1, con[-1])]
    out = []
    for i, (a, b) in enumerate(lims):
        out.append({"i": i, "desde": a, "hasta": b, "meses": sum(1 for p in con if a <= p <= b)})
    exige(sum(c["meses"] for c in out) == n, "F01: las cinco clases no suman los meses con sesión")
    return out


def clase_de(p: int, clases: list[dict]) -> int:
    for c in clases:
        if p <= c["hasta"]:
            return c["i"]
    return clases[-1]["i"]


def _tramos(ses: list[dict], campo: str) -> list[dict]:
    """Tramos de sesiones CONSECUTIVAS (en el orden del calendario) con el mismo valor de `meta.<campo>`."""
    out: list[dict] = []
    for s in ses:
        v = s["meta"].get(campo)
        if out and out[-1]["clave"] == v and out[-1]["etapa"] == s["e"]:
            t = out[-1]
            t["hasta"] = s["f"]
            t["ultima"] = s["clave"]
            t["sesiones"] += 1
        else:
            out.append({"clave": v, "etapa": s["e"], "desde": s["f"], "hasta": s["f"], "primera": s["clave"],
                        "ultima": s["clave"], "sesiones": 1})
    return out


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}

    def pon(k, *a, **kw):
        exige(k not in C, f"clave repetida en cortes: {k}")
        C[k] = ctx.cifra(*a, **kw)

    S = leer_json(ctx.data / "sesiones.json")["sesiones"]
    M = leer_json(ctx.data / "meses.json")["meses"]
    E = leer_json(ctx.data / "etapas.json")
    ET = {e["id"]: e for e in E["etapas"]}
    PRES = {p["clave"]: p for p in E["presidentes"]}
    GOB = {g["id"]: g for g in E["gobiernos"]}
    exige(len(S) == 755 and len(M) == 173, "F01: sesiones.json o meses.json no traen 755 sesiones y 173 meses")
    S = sorted(S, key=lambda s: (s["f"], s["s"]))
    por_clave = {s["clave"]: s for s in S}

    # ── F01 · clases del tono (meses con sesión, palabras V2) ────────────────────────────────────────────────
    con = [m for m in M if m["estado"] == "sesion"]
    clases = _clases([m["pal"] for m in con])
    for c in clases:
        pon(f"f01.clase.{c['i']}.desde", c["desde"], "n", "V2", f"clase {c['i'] + 1} de 5 del tono de F01: palabras del mes, desde (cuantiles sin interpolar)")
        pon(f"f01.clase.{c['i']}.hasta", c["hasta"], "n", "V2", f"clase {c['i'] + 1} de 5 del tono de F01: palabras del mes, hasta (cuantiles sin interpolar)")
        pon(f"f01.clase.{c['i']}.meses", c["meses"], "n", "V2", f"meses con sesión en la clase {c['i'] + 1} del tono de F01")
    mx = max(con, key=lambda m: m["pal"])
    pon("f01.mes_max", mx["mes"], "fecha", "V2", "mes con más palabras (suma de nwords por mes)")
    pon("f01.mes_max.palabras", mx["pal"], "n", "V2", "palabras del mes con más palabras")
    pon("f01.mes_max.sesiones", mx["sesiones"], "n", "V2", "sesiones del mes con más palabras")
    pon("f01.mes_max.filas", mx["filas"], "n", "V2", "filas del mes con más palabras")
    smax = max(S, key=lambda s: s["pal"])
    dmax = max(S, key=lambda s: s["dip"])
    pon("f01.sesion_max.palabras", smax["pal"], "n", "V2", f"palabras de la sesión con más palabras ({smax['clave']}): la barra más alta de F01")
    pon("f01.sesion_max.diputados", dmax["dip"], "n", "V2", f"diputados que intervienen en la sesión con más ({dmax['clave']}), con quien preside")

    # ── etapas: lo que el índice de Las Cortes cita y base.py no escribe como cifra ─────────────────────────────
    for e in ETAPA_IDS:
        et = ET[e]
        meses_e = [m for m in M if m["e"] == e]
        con_e = sum(m["estado"] == "sesion" for m in meses_e)
        sin_e = sum(m["estado"] == "sin_sesion" for m in meses_e)
        exige(con_e == et["meses_con_sesion"] and sin_e == len(et["meses_sin_sesion"]) and con_e + sin_e == et["meses"],
              f"etapa {e}: los meses de meses.json no cuadran con etapas.json")
        pon(f"etapa.{e}.meses.con_sesion", con_e, "n", "V2", "meses de la etapa con al menos una sesión")
        pon(f"etapa.{e}.meses.sin_sesion", sin_e, "n", "V2", "meses de la etapa sin ninguna sesión en el corpus")
        nums = sorted(s["s"] for s in S if s["e"] == e)
        exige(nums == list(range(nums[0], nums[-1] + 1)), f"etapa {e}: la numeración de sesiones tiene huecos o repetidos")
        exige([nums[0], nums[-1]] == et["num"], f"etapa {e}: num_session no cuadra con etapas.json")
        pon(f"etapa.{e}.num.desde", nums[0], "id", "V2", "primer num_session de la etapa (sin huecos hasta el último)")
        pon(f"etapa.{e}.num.hasta", nums[-1], "id", "V2", "último num_session de la etapa")
        exige(sum(s["filas_v3"] for s in S if s["e"] == e) == et["filas_v3"], f"etapa {e}: filas v3 no cuadran")
        pon(f"etapa.{e}.filas_v3", et["filas_v3"], "n", "v3", "filas v3 de las sesiones de la etapa (tabla speeches)")
    # El corte por número coincide con el corte por fechas (cortes.etapas.corte_fechas).
    for a, b in zip(ETAPA_IDS, ETAPA_IDS[1:]):
        exige(max(s["f"] for s in S if s["e"] == a) < min(s["f"] for s in S if s["e"] == b), f"las etapas {a} y {b} se solapan en fechas")

    # ── puertas: anillos de F01 y el recuento de México en Inicio ──────────────────────────────────────────────
    anillo = {}
    for slug, ks in PUERTAS.items():
        for k in ks:
            exige(k in por_clave, f"puerta {slug}: no hay sesión {k}")
            anillo[k] = slug
    mex = PUERTAS["mexico-1945"]
    pon("puerta.mexico-1945.filas", sum(por_clave[k]["filas"] for k in mex), "n", "V2", "filas V2 de las cuatro sesiones de México de la puerta (17-VIII y 7–9-XI-1945)")
    pon("puerta.mexico-1945.sesiones", len(mex), "n", "V2", "sesiones de la puerta de México")

    # ── filas ancla de Inicio (lectura: se comprueban en cada ejecución) ──────────────────────────────────────
    def ancla(nombre: str, v2: int, v3: int, fecha: str, texto: str, exacto: bool, orden: int | None = None) -> None:
        f2, f3 = ctx.fila_v2(v2), ctx.fila_v3(v3)
        exige(f2["date"] == fecha and f3["date"] == fecha, f"{nombre}: fecha ≠ {fecha}")
        s2, s3 = (f2["speech"] or "").strip(), (f3["speech"] or "").strip()
        if exacto:
            exige(s2 == texto and s3 == texto, f"{nombre}: el texto de V2 {v2} / v3 {v3} no es «{texto}»")
        else:
            exige(s2.startswith(texto) and s3.startswith(texto), f"{nombre}: V2 {v2} / v3 {v3} no empiezan por «{texto}»")
        pon(f"fila.{nombre}.id.V2", v2, "id", "V2", f"id V2 de la fila del {fecha} «{texto[:40]}»", clave="L")
        pon(f"fila.{nombre}.id.v3", v3, "id", "v3", f"id v3 de la misma fila (mismo texto)", clave="L")
        pon(f"fila.{nombre}.nwords", int(f2["nwords"]), "n", "V2", f"nwords de la fila V2 {v2}", clave="L")

    ancla("luz", 71330, 80306, "1934-06-08", "Luz y taquigrafos.", True)
    exige(str(ctx.fila_v2(71330)["rep_id"]) == "456", "fila.luz: V2 71330 no es del rep_id 456")
    ancla("presidencia", 5423, 6078, "1931-10-01", "Ruego a la Cámara que guarde silencio.", True)
    ancla("campoamor", 5424, 6079, "1931-10-01", "Yo ruego a la Cámara que me escuche en silencio", False)

    f3 = ctx.fila_v3(121466)
    exige(f3["date"] == "1945-01-10" and "sólo tenemos noticia de ellas por citas" in (f3["speech"] or ""),
          "fila.mexico_caratula: v3 121466 no es la carátula del 10-I-1945")
    exige(not any("sólo tenemos noticia de ellas por citas" in (ctx.fila_v2(i)["speech"] or "")
                  for i in range(por_clave["1945-01-10-70"]["id_v2"][0], por_clave["1945-01-10-70"]["id_v2"][1] + 1)),
          "fila.mexico_caratula: la carátula también está en la V2 (el copy dice que solo está en la v3)")
    pon("fila.mexico_caratula.v3", 121466, "id", "v3", "fila SUMARIO del 10-I-1945 con la carátula del volumen de México (solo v3)", clave="L")

    # ── F16 · tramos de presidente titular y de Gobierno ───────────────────────────────────────────────────────
    tp, tg = _tramos(S, "pres"), _tramos(S, "gob")
    for t in tp:
        p = PRES[t["clave"]]
        t.update(nombre=p["nombre"], corto=p["corto"], cargo=p["cargo"], verificar=bool(p["verificar"]))
    for t in tg:
        g = GOB[t["clave"]]
        t.update(nombre=g["nombre"], corto=g["nombre"].replace("Gobierno ", ""), verificar=bool(g["verificar"]))
    exige(sum(t["sesiones"] for t in tp) == 755 and sum(t["sesiones"] for t in tg) == 755, "F16: los tramos no suman 755 sesiones")
    ver_p = sum(t["sesiones"] for t in tp if t["verificar"])
    ver_g = sum(t["sesiones"] for t in tg if t["verificar"])
    pon("f16.verificar.presidente", ver_p, "n", "proyecto", f"sesiones con presidente titular marcado «verificar» ({PRF})", clave="M")
    pon("f16.verificar.gobierno", ver_g, "n", "proyecto", f"sesiones con Gobierno marcado «verificar» ({PRF})", clave="M")
    pon("f16.tramos.presidente", len(tp), "n", "proyecto", f"tramos de sesiones consecutivas con el mismo presidente titular ({PRF})", clave="M")
    pon("f16.tramos.gobierno", len(tg), "n", "proyecto", f"tramos de sesiones consecutivas con el mismo Gobierno ({PRF})", clave="M")

    # ── archivos ──────────────────────────────────────────────────────────────────────────────────────────────
    ctx.escribir_json("calendario.json", {
        "_meta": {
            "que": "F01 (calendario, tres escalas) y F16 (bandas de presidente titular y Gobierno)",
            "base": {"V2": "clases, mes_max, escala, meses", "proyecto": "tramos (presidente titular, Gobierno)"},
            "clases": "cinco clases por cuantiles sin interpolar de las palabras de los 64 meses con sesión",
            "escala": "máximos por sesión para la altura de las barras de F01 (palabras, diputados con quien preside)",
            "puertas": "sesión → puerta de lectura (anillo en F01)",
            "tramos": "sesiones consecutivas, dentro de una etapa, con el mismo presidente titular o Gobierno (proyecto)",
            "exportado": ctx.hoy,
        },
        "clases": clases,
        "mes_max": {"mes": mx["mes"], "palabras": mx["pal"], "sesiones": mx["sesiones"], "filas": mx["filas"]},
        "escala": {"palabras": smax["pal"], "diputados": dmax["dip"]},
        "puertas": anillo,
        "tramos": {"presidente": tp, "gobierno": tg},
    })

    ctx.escribir_datos("sesiones", [
        "clave", "fecha", "num_session", "etapa", "legislatura", "filas_V2", "palabras_V2", "diputados_V2",
        "diputados_sin_presidencia_V2", "filas_mas_300_palabras_V2", "filas_presidencia_V2", "id_V2_desde", "id_V2_hasta",
        "filas_v3", "filas_habla_v3", "id_v3_desde", "id_v3_hasta", "puerta"],
        [[s["clave"], s["f"], s["s"], s["e"], ET[s["e"]]["leg"], s["filas"], s["pal"], s["dip"], s["dip_sp"], s["largas"],
          s["filas_pres"], s["id_v2"][0], s["id_v2"][1], s["filas_v3"], s["habla_v3"], s["id_v3"][0], s["id_v3"][1],
          anillo.get(s["clave"], "")] for s in S])
    ctx.escribir_datos("meses", [
        "mes", "etapa", "legislatura", "estado", "sesiones_V2", "filas_V2", "palabras_V2", "diputados_V2", "clase_tono"],
        [[m["mes"], m["e"] or "", m["leg"] or "", m["estado"], m["sesiones"], m["filas"], m["pal"], m["dip"],
          (clase_de(m["pal"], clases) + 1) if m["estado"] == "sesion" else ""] for m in M])
    ctx.escribir_datos("presidencia_gobierno", [
        "banda", "etapa", "clave", "nombre", "desde", "hasta", "primera_sesion", "ultima_sesion", "sesiones", "verificar"],
        [["presidente_titular", t["etapa"], t["clave"], t["nombre"], t["desde"], t["hasta"], t["primera"], t["ultima"],
          t["sesiones"], "sí" if t["verificar"] else ""] for t in tp]
        + [["gobierno", t["etapa"], t["clave"], t["nombre"], t["desde"], t["hasta"], t["primera"], t["ultima"],
            t["sesiones"], "sí" if t["verificar"] else ""] for t in tg])
    ctx.compartido["calendario_clases"] = clases

    # ── F05 y F09 (grupo 2), si ya existe su archivo ─────────────────────────────────────────────────────────────
    try:
        fichas = importlib.import_module("modulos.fichas")
    except ModuleNotFoundError as e:
        if e.name != "modulos.fichas":
            raise
        fichas = None
    if fichas is not None:
        otras = fichas.exportar(ctx) or {}
        for k, c in otras.items():
            if k in C:
                exige(C[k]["v"] == c["v"] and C[k]["base"] == c["base"], f"la cifra {k} la dan cortes y fichas con valores distintos")
                continue
            C[k] = c
    return C
