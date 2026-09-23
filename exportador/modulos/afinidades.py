"""afinidades · Afinidades Elegidas (dueño: grupo 6, explorador y afinidades). Se construye la última (D-3).

Todo sobre CGOCUS V1.1 DEPOSITADA (versión, UNF y MD5 de cada archivo ya comprobados por exportar.py). Reglas de
cálculo: `docs/marcadores/afinidades.md` (censo = fichas de la legislatura; firman = firmantes ∩ censo; aislados =
censo − firmantes; fuera del censo = firmantes − censo; bloques EI·I·CI / C / CD·D·ED con la ideología de la ficha de
esa legislatura; denominador de los cruces = filas del edgelist).

Figuras y archivos:
  F22  Dos cruces por legislatura → `src/data/afinidades/cruces.json` y `public/datos/cruces.csv|xlsx`.
  F21  Tres redes REGENERADAS desde el edgelist y el censo (475 · 470 · 501 nodos; los `afin_red_*.json` viejos, con
       476 · 476 · 502, no se usan). Disposición ForceAtlas2 calculada aquí, con semilla fija y sembrada con la
       legislatura anterior (y alineada con ella por Procrustes), para que al cambiar de legislatura quien repite se
       desplace poco. Los que no firman con nadie van en un anillo exterior, ordenados por ideología.
       · `public/datos/red-<leg>.json` (se carga bajo demanda: nodos con posición, nombre, partido, familia, ideología
         y grado; aristas con su peso);
       · `src/data/afinidades/redes.json` (lo que pinta la compilación: recuentos, leyenda y los 20 de mayor grado);
       · `src/data/afinidades/red-<leg>-<tema>.png` (póster sin JS: aristas y nodos, uno por tema; Astro lo optimiza);
       · `public/datos/redes.csv|xlsx` (el censo completo, con su grado, por legislatura).
Cifras (base «afin»; ninguna sale de su página mientras siga abierta D-3): las de docs/marcadores/afinidades.md.
"""
from __future__ import annotations

import json
import math
import re
import unicodedata

import networkx as nx
import numpy as np
import pandas as pd

from comun import CACHE_EXP, FAMILIA_ETIQ, FAMILIA_NORM, RAIZ, exige, leer_json

LEGS = [("1931", "1931-1933"), ("1933", "1933-1936"), ("1936", "1936-1939")]
BLOQUE = {"EI": "izq", "I": "izq", "CI": "izq", "C": "centro", "CD": "der", "D": "der", "ED": "der"}
IDEOS = ["EI", "I", "CI", "C", "CD", "D", "ED"]
TOKENS = RAIZ / "src" / "styles" / "tokens.json"
SEMILLA = 20260922
# Lienzo del póster y del sistema de coordenadas de la red: 16:10 (x ∈ [−1,6, 1,6], y ∈ [−1, 1], y hacia abajo).
ANCHO, ALTO, RX, RY = 1600, 1000, 1.6, 1.0
ESTIRA = 1.35   # la red, ensanchada para ocupar un lienzo apaisado (el anillo exterior va aparte)
PARTICULAS = {"De", "Del", "La", "Las", "Los", "Y", "I", "E", "Da", "Das", "Do", "Dos"}


def _plegar(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", str(s).lower()) if unicodedata.category(c) != "Mn")


def _nombre_base(s: str) -> str:
    """Nombre de CGOCUS sin grafía revisada: las partículas en minúscula («Miguel De Unamuno Y Jugo» → «… de … y …»)."""
    partes = str(s).split()
    return " ".join(p.lower() if i > 0 and p in PARTICULAS else p for i, p in enumerate(partes))


# ── ForceAtlas2 (Jacomy et al., 2014), sin Barnes-Hut: con 500 nodos, la repulsión exacta cuesta poco ─────────────
def forceatlas2(n: int, aristas: np.ndarray, pesos: np.ndarray, pos: np.ndarray, iteraciones: int = 900,
                kr: float = 2.0, kg: float = 1.0, delta: float = 0.5) -> np.ndarray:
    """`aristas`: (m, 2) índices; `pesos`: (m,) medidas compartidas; `pos`: (n, 2) posiciones de partida.
    Atracción lineal (d · w^delta), repulsión kr·(g_i+1)(g_j+1)/d, gravedad kg·(g_i+1) y velocidad adaptativa."""
    pos = pos.astype(float).copy()
    grado = np.bincount(aristas.ravel(), minlength=n).astype(float)
    masa = grado + 1.0
    w = pesos.astype(float) ** delta
    mm = masa[:, None] * masa[None, :]
    previa = np.zeros_like(pos)
    velocidad, eficiencia = 1.0, 1.0
    for _ in range(iteraciones):
        dif = pos[:, None, :] - pos[None, :, :]
        d2 = (dif ** 2).sum(-1) + 1e-9
        np.fill_diagonal(d2, np.inf)
        fuerza = (kr * mm / d2)[:, :, None] * dif           # repulsión: kr·m_i·m_j / d, en la dirección i ← j
        f = fuerza.sum(1)
        a, b = aristas[:, 0], aristas[:, 1]
        dab = pos[a] - pos[b]
        tira = dab * w[:, None]                             # atracción lineal, ponderada
        np.add.at(f, a, -tira)
        np.add.at(f, b, tira)
        dist0 = np.sqrt((pos ** 2).sum(1)) + 1e-9
        f -= (kg * masa / dist0)[:, None] * pos             # gravedad hacia el centro
        # velocidad adaptativa (oscilación y tracción)
        osc = np.sqrt(((f - previa) ** 2).sum(1))
        tra = np.sqrt(((f + previa) ** 2).sum(1)) / 2
        g_osc, g_tra = (masa * osc).sum(), (masa * tra).sum()
        tolerancia = 1.0
        estimada = tolerancia * g_tra / max(g_osc, 1e-9)
        velocidad = min(estimada, velocidad * 1.5) if velocidad else estimada
        local = 0.1 * velocidad / (1 + velocidad * np.sqrt(osc))
        modulo = np.sqrt((f ** 2).sum(1)) + 1e-9
        local = np.minimum(local, 10.0 / modulo)
        pos += f * local[:, None]
        previa = f
    return pos


def _procrustes(base: np.ndarray, mover: np.ndarray) -> tuple[np.ndarray, float, np.ndarray, np.ndarray]:
    """Rotación (o reflexión), escala y traslación que llevan `mover` sobre `base` (mínimos cuadrados)."""
    mb, mm = base.mean(0), mover.mean(0)
    A, B = base - mb, mover - mm
    U, S, Vt = np.linalg.svd(B.T @ A)
    R = U @ Vt
    s = S.sum() / (B ** 2).sum()
    return R, s, mb, mm


def _hex(c: str) -> tuple[int, int, int]:
    c = c.lstrip("#")
    return int(c[0:2], 16), int(c[2:4], 16), int(c[4:6], 16)


def _poster(nodos: list[dict], aristas: list[tuple[int, int, int]], tema: dict, destino, oscuro: bool) -> None:
    """Póster de la red para la versión sin JS: aristas acumuladas (densidad) y nodos encima, sin texto. Transparente:
    el fondo es el de la página. Se dibuja al doble de tamaño y se reduce (antialias)."""
    from PIL import Image, ImageDraw
    k = 2
    W, H = ANCHO * k, ALTO * k
    px = lambda x: (x + RX) / (2 * RX) * W  # noqa: E731
    py = lambda y: (y + RY) / (2 * RY) * H  # noqa: E731
    acum = np.zeros((H, W), dtype=np.float32)
    xy = np.array([[px(n["x"]), py(n["y"])] for n in nodos])
    for a, b, _w in aristas:
        x0, y0 = xy[a]
        x1, y1 = xy[b]
        m = int(max(abs(x1 - x0), abs(y1 - y0))) + 1
        xs = np.linspace(x0, x1, m).astype(np.int32).clip(0, W - 1)
        ys = np.linspace(y0, y1, m).astype(np.int32).clip(0, H - 1)
        np.add.at(acum, (ys, xs), 1.0)
    # densidad → opacidad: una arista sola queda en un velo (≈ 6 % tras reducir); donde se amontonan, satura al 55 %
    alfa = (1 - np.exp(-acum * 0.25)) * (0.55 if oscuro else 0.5)
    r, g, b = _hex(tema["ink"])
    capa = np.zeros((H, W, 4), dtype=np.uint8)
    capa[..., 0], capa[..., 1], capa[..., 2] = r, g, b
    capa[..., 3] = (alfa * 255).clip(0, 255).astype(np.uint8)
    img = Image.fromarray(capa, "RGBA")
    d = ImageDraw.Draw(img)
    fondo = _hex(tema["bg"])
    for n in sorted(nodos, key=lambda n: n["g"]):
        cx, cy = px(n["x"]), py(n["y"])
        rad = n["r"] * k
        col = _hex(tema[n["i"].lower()])
        if n["g"] == 0:   # no firma con nadie: contorno, sin relleno (la ausencia no es un color)
            d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=fondo + (255,), outline=col + (255,), width=max(2, int(1.2 * k)))
        else:
            d.ellipse([cx - rad - k * 0.6, cy - rad - k * 0.6, cx + rad + k * 0.6, cy + rad + k * 0.6], fill=fondo + (255,))
            d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=col + (255,))
    img = img.resize((ANCHO, ALTO), Image.LANCZOS)
    img.save(destino, optimize=True)


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}

    def pon(k, v, t, f, **kw):
        exige(k not in C, f"cifra repetida en afinidades: {k}")
        C[k] = ctx.cifra(v, t, "afin", f, **kw)

    E = pd.read_csv(ctx.afin("2REP_coauthor_edgelist.tab"), sep=ctx.afin_sep("2REP_coauthor_edgelist.tab"))
    M = pd.read_csv(ctx.afin("representative_metadata.tab"), sep=ctx.afin_sep("representative_metadata.tab"))
    F = pd.read_csv(ctx.afin("2REP_cosponsorship.tab"), sep=ctx.afin_sep("2REP_cosponsorship.tab"), low_memory=False)
    MET = leer_json(ctx.afin("representatives_metrics.json"))
    graf = leer_json(ctx.data / "grafias.json").get("grafias", {})
    tokens = leer_json(TOKENS)["temas"]
    PRF = "CGOCUS V1.1"

    # ── censo, firmas y medidas ─────────────────────────────────────────────────────────────────────────────────
    pon("afin.relaciones", len(E), "n", f"filas de 2REP_coauthor_edgelist ({PRF}): una por par de firmantes y medida")
    pon("afin.personas", int(M["id_dip"].nunique()), "n", f"id_dip distintos del censo (representative_metadata, {PRF})")
    pon("afin.medidas", int(E["id_medida"].nunique()), "n", f"id_medida distintos del edgelist ({PRF})")
    fichas = M.groupby("id_dip")["legislatura"].nunique()
    pon("afin.tres_leg", int((fichas == 3).sum()), "n", f"id_dip con ficha en las tres legislaturas ({PRF})")
    pon("afin.firmas", len(F), "n", f"filas de 2REP_cosponsorship ({PRF}): una por firma de una medida")
    pon("afin.firmas_sin_diputado", int(F["id_dip"].isna().sum()), "n", f"firmas de 2REP_cosponsorship sin id_dip ({PRF})")
    por_medida = F.dropna(subset=["id_dip"]).groupby("id_medida")["id_dip"].nunique()
    todas = set(F["id_medida"].unique())
    con_dos = set(por_medida[por_medida >= 2].index)
    pon("afin.medidas_sin_relacion", len(todas - con_dos), "n",
        f"id_medida de 2REP_cosponsorship con menos de dos id_dip distintos ({PRF})")
    exige(con_dos == set(E["id_medida"].unique()), "las medidas con dos firmantes identificados no son las del edgelist")

    ficha = {(leg, int(r.id_dip)): r for leg in M["legislatura"].unique() for r in M[M["legislatura"] == leg].itertuples()}
    ideo_met = {int(k): v.get("ideologia") for k, v in MET["deputies"].items()}

    def ideo(leg: str, i: int) -> str:
        f = ficha.get((leg, i))
        return f.ideologia if f is not None else ideo_met[i]

    sumas = 0
    resumen_leg = []
    grafos: dict[str, nx.Graph] = {}
    for corto, leg in LEGS:
        e = E[E["id_legislature"] == leg]
        censo = set(M.loc[M["legislatura"] == leg, "id_dip"].astype(int))
        firmantes = set(e["id_dip1"].astype(int)) | set(e["id_dip2"].astype(int))
        firman, aislados, fuera = censo & firmantes, censo - firmantes, firmantes - censo
        exige(len(censo) == len(firman) + len(aislados), f"{leg}: censo ≠ firman + aislados")
        pon(f"afin.{corto}.censo", len(censo), "n", f"fichas del censo en {leg} ({PRF})")
        pon(f"afin.{corto}.firman", len(firman), "n", f"firmantes del edgelist de {leg} que tienen ficha en el censo de {leg}")
        pon(f"afin.{corto}.aislados", len(aislados), "n", f"fichas del censo de {leg} sin ninguna relación en el edgelist")
        pon(f"afin.{corto}.fuera_censo", len(fuera), "n", f"firmantes del edgelist de {leg} sin ficha en el censo de {leg}")
        pon(f"afin.{corto}.medidas", int(e["id_medida"].nunique()), "n", f"id_medida distintos del edgelist de {leg}")
        pon(f"afin.{corto}.relaciones", len(e), "n", f"filas del edgelist de {leg} (relaciones par-medida)")
        sumas += int(e["id_medida"].nunique())
        # cruces: bloques con la ideología de la ficha de esa legislatura (o la de las métricas si no la hay)
        b1 = np.array([BLOQUE[ideo(leg, int(i))] for i in e["id_dip1"]])
        b2 = np.array([BLOQUE[ideo(leg, int(i))] for i in e["id_dip2"]])
        cruza = b1 != b2
        estricto = ((b1 == "izq") & (b2 == "der")) | ((b1 == "der") & (b2 == "izq"))
        centro = cruza & ((b1 == "centro") | (b2 == "centro"))
        den = len(e)
        pon(f"afin.{corto}.cruce_bloque", int(cruza.sum()) / den, "pct", f"relaciones de {leg} con los dos firmantes en bloques distintos / relaciones",
            dec=1, n=int(cruza.sum()), den=den)
        pon(f"afin.{corto}.cruce_estricto", int(estricto.sum()) / den, "pct", f"relaciones de {leg} izquierda–derecha / relaciones",
            dec=1, n=int(estricto.sum()), den=den)
        pon(f"afin.{corto}.cruce_centro", int(centro.sum()) / int(cruza.sum()), "pct",
            f"relaciones de {leg} que cruzan de bloque con un firmante del centro / relaciones que cruzan de bloque",
            dec=1, n=int(centro.sum()), den=int(cruza.sum()))
        resumen_leg.append({"clave": corto, "leg": leg, "relaciones": den, "bloque": int(cruza.sum()), "estricto": int(estricto.sum()),
                            "centro": int(centro.sum()), "medidas": int(e["id_medida"].nunique()),
                            "medidas_estricto": int(e.loc[estricto, "id_medida"].nunique())})
        if corto == "1936":
            pon("afin.1936.medidas_estricto", int(e.loc[estricto, "id_medida"].nunique()), "n",
                "id_medida de 1936-1939 con al menos una relación izquierda–derecha")
            der = np.where(b1 == "der", e["id_dip1"].to_numpy(), e["id_dip2"].to_numpy())[estricto]
            pnv = sum(1 for i in der if (f := ficha.get((leg, int(i)))) is not None and f.partido == "PNV")
            pon("afin.1936.estricto_pnv", pnv / int(estricto.sum()), "pct",
                "relaciones izquierda–derecha de 1936-1939 cuyo firmante de derecha es del PNV en su ficha / relaciones izquierda–derecha",
                dec=1, n=pnv, den=int(estricto.sum()))
        # la red de la legislatura: nodos = censo; aristas = pares distintos de firmantes del censo, con su peso
        G = nx.Graph()
        G.add_nodes_from(sorted(censo))
        dentro = e[e["id_dip1"].astype(int).isin(censo) & e["id_dip2"].astype(int).isin(censo)]
        pares = dentro.assign(a=dentro[["id_dip1", "id_dip2"]].min(1).astype(int), b=dentro[["id_dip1", "id_dip2"]].max(1).astype(int))
        for (a, b), w in pares.groupby(["a", "b"]).size().items():
            G.add_edge(int(a), int(b), w=int(w))
        grafos[corto] = G
    exige(sumas == C["afin.medidas"]["v"], "las medidas por legislatura no suman las del edgelist")
    exige(set(M.loc[M["partido"] == "PNV", "ideologia"]) == {"CD"}, "el PNV no está codificado CD en todas sus fichas")

    # componentes: 1931 y 1933, una sola red; 1936, cinco firmantes fuera de la principal
    for corto in ("1931", "1933"):
        G = grafos[corto]
        sub = G.subgraph([v for v in G if G.degree(v) > 0])
        exige(nx.number_connected_components(sub) == 1, f"la red de {corto} no es una sola componente")
    G = grafos["1936"]
    sub = G.subgraph([v for v in G if G.degree(v) > 0])
    comps = sorted((len(c) for c in nx.connected_components(sub)), reverse=True)
    pon("afin.1936.fuera_principal", sum(comps[1:]), "n", f"firmantes del censo de 1936-1939 fuera de la componente mayor (componentes {comps})")
    pc = MET["party_communities"]
    pon("afin.1931.modularidad", round(pc["1931-1933"]["modularity"], 4), "n", "party_communities['1931-1933'].modularity (representatives_metrics.json)", dec=3)
    pon("afin.1936.modularidad", round(pc["1936-1939"]["modularity"], 4), "n", "party_communities['1936-1939'].modularity (representatives_metrics.json)", dec=3)

    # los puentes: índice de transversalidad, sin filtro de grado
    def ranking(leg):
        xs = [(int(k), v["metrics"][leg].get("transversality_score")) for k, v in MET["deputies"].items()
              if leg in (v.get("metrics") or {}) and v["metrics"][leg].get("transversality_score") is not None]
        return [i for i, _ in sorted(xs, key=lambda x: -x[1])]
    r31, r33, r36 = ranking("1931-1933"), ranking("1933-1936"), ranking("1936-1939")
    exige(r31[:3] == [50, 290, 960], f"los tres primeros puentes de 1931-1933 no son Álvarez, Estelrich y Unamuno: {r31[:3]}")
    exige(r33[:3] == [229, 184, 446], f"los tres primeros de 1933-1936 no son Chapaprieta, Cano López e Iranzo: {r33[:3]}")
    exige(r36.index(16) == 1 and r36.index(448) == 4, "Aguirre e Irujo no son 2.º y 5.º en 1936-1939")
    pon("afin.1931.puentes.n", 3, "n", "puestos 1 a 3 de transversality_score en 1931-1933 (id_dip 50, 290, 960)")
    pon("afin.1936.puentes.n", 5, "n", "grupo de los cinco primeros de transversality_score en 1936-1939 (Aguirre 2.º, Irujo 5.º)")

    # límites: medidas anteriores al 18 de julio y listas de firmas cortadas
    primera = F.sort_values(["id_medida", "id"]).groupby("id_medida")["fecha_sesion"].first()
    m36 = E.loc[E["id_legislature"] == "1936-1939", "id_medida"].unique()
    pon("afin.1936.medidas_antes", int((primera.loc[m36] < "1936-07-18").sum()), "n",
        "medidas de 1936-1939 cuya primera firma es de una sesión anterior al 18-VII-1936")
    texto = F.groupby("id_medida")["texto_medida"].first().fillna("")
    cortadas = {int(i) for i, t in texto.items() if re.search(r"siguen\s+(?:las\s+)?firmas", t, re.I)} & set(E["id_medida"].astype(int))
    pon("afin.truncadas.medidas", len(cortadas), "n", "medidas del edgelist cuyo texto dice «Siguen las firmas…» (lista cortada en el Diario)")
    rel_cortadas = int(E["id_medida"].astype(int).isin(cortadas).sum())
    pon("afin.truncadas.relaciones", rel_cortadas / len(E), "pct", "relaciones par-medida de las medidas con la lista cortada / relaciones",
        dec=1, n=rel_cortadas, den=len(E))

    # ── F22 · cruces ────────────────────────────────────────────────────────────────────────────────────────────
    ctx.escribir_json("afinidades/cruces.json", {"version": PRF, "legislaturas": resumen_leg})
    ctx.escribir_datos("cruces", ["legislatura", "relaciones_par_medida", "cruce_de_bloque", "cruce_de_bloque_pct", "cruce_estricto",
                                  "cruce_estricto_pct", "cruce_con_el_centro", "cruce_con_el_centro_pct_del_cruce", "medidas",
                                  "medidas_con_cruce_estricto", "version"],
                       [[r["leg"], r["relaciones"], r["bloque"], round(100 * r["bloque"] / r["relaciones"], 2), r["estricto"],
                         round(100 * r["estricto"] / r["relaciones"], 2), r["centro"], round(100 * r["centro"] / r["bloque"], 2),
                         r["medidas"], r["medidas_estricto"], PRF] for r in resumen_leg])

    # ── F21 · tres redes ────────────────────────────────────────────────────────────────────────────────────────
    rng = np.random.default_rng(SEMILLA)
    previas: dict[int, np.ndarray] = {}
    redes, filas_csv = [], []
    for corto, leg in LEGS:
        G = grafos[corto]
        censo = list(G.nodes)
        conectados = sorted(v for v in censo if G.degree(v) > 0)
        idx = {v: k for k, v in enumerate(conectados)}
        ar = np.array([[idx[a], idx[b]] for a, b in G.edges()], dtype=int)
        pe = np.array([G[a][b]["w"] for a, b in G.edges()], dtype=float)
        ini = np.array([previas[v] * 40 if v in previas else rng.normal(0, 25, 2) for v in conectados])
        pos = forceatlas2(len(conectados), ar, pe, ini)
        # alineación: con la legislatura anterior (Procrustes sobre los que repiten); la primera, con la izquierda a la izquierda
        pos -= pos.mean(0)
        comunes = [v for v in conectados if v in previas]
        if len(comunes) >= 10:
            R, _s, _mb, mm = _procrustes(np.array([previas[v] for v in comunes]), np.array([pos[idx[v]] for v in comunes]))
            pos = (pos - mm) @ R            # solo el giro: la escala la fija el encaje de abajo
        else:
            izq = np.array([BLOQUE[ideo(leg, v)] == "izq" for v in conectados])
            der = np.array([BLOQUE[ideo(leg, v)] == "der" for v in conectados])
            eje = pos[izq].mean(0) - pos[der].mean(0)
            ang = math.atan2(eje[1], eje[0])
            rot = math.pi - ang                                      # que la izquierda quede a la izquierda (−x)
            Rm = np.array([[math.cos(rot), math.sin(rot)], [-math.sin(rot), math.cos(rot)]])
            pos = pos @ Rm

        # que llene el lienzo: el 98 % de los nodos, en la caja interior (x ≤ 1,2 ya ensanchado; y ≤ 0,8), y nadie fuera de
        # la elipse de semiejes 1,3 × 0,88, dentro del anillo (los grupos sueltos de 1936-1939 flotan lejos con la gravedad
        # de FA2: se acercan por su radio sin cambiar de forma)
        pos = pos - np.median(pos, 0)
        pos = pos * min(1.2 / (np.percentile(np.abs(pos[:, 0]), 98) * ESTIRA), 0.8 / np.percentile(np.abs(pos[:, 1]), 98))
        el = np.sqrt((pos[:, 0] * ESTIRA / 1.3) ** 2 + (pos[:, 1] / 0.88) ** 2)
        lejos = el > 1
        if lejos.any():
            pos[lejos] = pos[lejos] / el[lejos][:, None] * (1 - 0.02 * np.tanh(el[lejos] - 1))[:, None]
        # los que repiten guardan su sitio para la siguiente
        for v in conectados:
            previas[v] = pos[idx[v]]
        # anillo exterior: los que no firman, por ideología (izquierda a la izquierda), alternando arriba y abajo
        aisl = sorted((v for v in censo if G.degree(v) == 0), key=lambda v: (IDEOS.index(ideo(leg, v)), v))
        anillo = {}
        N = len(aisl)
        for k, v in enumerate(aisl):
            p = (k // 2 + 0.5) / max((N + 1) // 2, 1)
            th = math.pi * (1 - p)
            arriba = k % 2 == 0
            anillo[v] = np.array([1.5 * math.cos(th), (-0.94 if arriba else 0.94) * math.sin(th)])
        nodos = []
        orden = conectados + aisl
        for v in orden:
            f = ficha[(leg, v)]
            g_ = graf.get(str(v))
            nombre = g_["uso"] if g_ else _nombre_base(f.nombre_completo)
            fam = FAMILIA_ETIQ.get(FAMILIA_NORM.get(f.familia_partidos, f.familia_partidos), FAMILIA_NORM.get(f.familia_partidos, f.familia_partidos))
            x, y = (pos[idx[v]] * [ESTIRA, 1] if v in idx else anillo[v])
            grado = G.degree(v)
            nodos.append({"id": v, "n": nombre, "p": f.partido if isinstance(f.partido, str) else "—", "f": fam, "i": f.ideologia,
                          "g": grado, "x": round(float(x), 4), "y": round(float(y), 4),
                          "r": round(1.4 + 0.42 * math.sqrt(grado), 2) if grado else 2.0, "rev": bool(g_)})
        # escala común de las tres redes: la red conectada de la primera cabe en un círculo de radio 0,8 (y ∈ [−1, 1])
        exige(all(abs(n["x"]) < RX and abs(n["y"]) < RY for n in nodos), f"{leg}: nodos fuera del lienzo")
        pos_i = {n["id"]: k for k, n in enumerate(nodos)}
        aristas = sorted((pos_i[a], pos_i[b], G[a][b]["w"]) for a, b in G.edges())
        mayor = max(nx.connected_components(G.subgraph(conectados)), key=len)
        medidas_dip = {}
        e = E[E["id_legislature"] == leg]
        for col in ("id_dip1", "id_dip2"):
            for i, m in zip(e[col].astype(int), e["id_medida"]):
                medidas_dip.setdefault(i, set()).add(m)
        for n in nodos:
            filas_csv.append([leg, n["id"], n["n"], n["p"], n["f"], n["i"], n["g"], len(medidas_dip.get(n["id"], ())),
                              n["id"] in mayor, n["g"] == 0, "revisada" if n["rev"] else "sin revisar (CGOCUS)"])
        # red para el cliente (bajo demanda)
        red = {"leg": leg, "clave": corto, "version": PRF, "lienzo": [RX, RY],
               "nodos": [[n["id"], n["n"], n["p"], n["f"], n["i"], n["g"], n["x"], n["y"], n["r"]] for n in nodos],
               "campos": ["id", "nombre", "partido", "familia", "ideologia", "grado", "x", "y", "radio"],
               "aristas": [x for a in aristas for x in a]}
        ctx._registra(f"datos/red-{corto}.json")
        (ctx.datos / f"red-{corto}.json").write_text(json.dumps(red, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        # pósteres sin JS (uno por tema)
        tmp = CACHE_EXP / "tmp"
        tmp.mkdir(exist_ok=True)
        for tema, oscuro in (("oscuro", True), ("claro", False)):
            p = tmp / f"red-{corto}-{tema}.png"
            _poster(nodos, aristas, tokens[tema], p, oscuro)
            ctx.copiar_a_data(p, f"afinidades/red-{corto}-{tema}.png")
        top = sorted(nodos, key=lambda n: (-n["g"], _plegar(n["n"])))[:20]
        ideos = {i: sum(1 for n in nodos if n["i"] == i) for i in IDEOS}
        redes.append({"clave": corto, "leg": leg, "censo": len(nodos), "firman": len(conectados), "aislados": len(aisl),
                      "aristas": len(aristas), "ideologias": ideos, "sin_grafia": sum(1 for n in nodos if not n["rev"]),
                      "top": [{"id": n["id"], "nombre": n["n"], "partido": n["p"], "familia": n["f"], "ideologia": n["i"], "grado": n["g"]} for n in top],
                      "nombres": sorted((n["n"] for n in nodos), key=_plegar)})
    sin = {int(i) for i in M["id_dip"]} - {int(k) for k in graf}
    pon("afin.sin_grafia", len(sin), "n", "personas del censo de CGOCUS sin grafía revisada en grafias.json (su nombre va como lo escribe CGOCUS)")
    ctx.escribir_json("afinidades/redes.json", {"version": PRF, "lienzo": [ANCHO, ALTO], "ideologias": IDEOS, "redes": redes})
    ctx.escribir_datos("redes", ["legislatura", "id_dip", "nombre", "partido", "familia", "ideologia", "firmo_con",
                                 "medidas_firmadas", "en_la_red_principal", "no_firma_con_nadie", "grafia"], filas_csv)
    return C
