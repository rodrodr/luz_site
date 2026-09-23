#!/usr/bin/env python3
"""Curvas de términos por mes (tipo Ngram), precalculadas sobre el CSV V2 depositado.

Una lista CURADA de términos y expresiones de la época (sin comodines abiertos: cada familia declara sus
variantes). Texto plegado a minúsculas y sin tildes (como el índice del explorador: «cataluna» y «Cataluña»
se cuentan juntas); límites de palabra \\b. Por mes: apariciones, filas con al menos una aparición y
denominadores (palabras nwords, filas, sesiones) para dar tasas por 10.000 palabras. Por familia: reparto de
las apariciones por ideología SIN Presidencia (quién lo dice) y las 3 sesiones con más apariciones.

Fiabilidad por mes con los umbrales del explorador (Tendencia): normal ≥ 100.000, baja ≥ 20.000,
muy baja < 20.000 — aquí sobre nwords, no sobre tokens del índice; se avisa.

Salida: terminos_mes_v2.json. Uso: python3 calc_terminos.py  (≈1 min, 8 procesos)
"""
from __future__ import annotations

import re
from collections import Counter, defaultdict
from concurrent.futures import ProcessPoolExecutor

from comun import FUENTE, cargar_v2, escribir, normalizar, plegar, roles_presidencia

# familia → (etiqueta visible, expresión sobre texto plegado, grupo temático)
TERMINOS = {
    "republica":        ("República",                 r"\brepublicas?\b", "régimen"),
    "monarquia":        ("monarquía",                 r"\bmonarqu(?:ia|ias|ico|ica|icos|icas)\b", "régimen"),
    "constitucion":     ("Constitución",              r"\bconstitucion(?:es)?\b", "régimen"),
    "revolucion":       ("revolución",                r"\brevolucion(?:es|ario|aria|arios|arias)?\b", "régimen"),
    "dictadura":        ("dictadura",                 r"\bdictadura(?:s)?\b", "régimen"),
    "defensa_rep":      ("«Defensa de la República»", r"\bdefensa de la republica\b", "régimen"),
    "reforma_agraria":  ("reforma agraria",           r"\breforma agraria\b", "tierra y trabajo"),
    "latifundio":       ("latifundio",                r"\blatifundi(?:o|os|sta|stas)\b", "tierra y trabajo"),
    "yunteros":         ("yunteros",                  r"\byunteros?\b", "tierra y trabajo"),
    "trigo":            ("trigo",                     r"\btrigos?\b", "tierra y trabajo"),
    "paro":             ("paro obrero / forzoso",     r"\bparo (?:obrero|forzoso)\b", "tierra y trabajo"),
    "huelga":           ("huelga",                    r"\bhuelgas?\b", "tierra y trabajo"),
    "jurados_mixtos":   ("jurados mixtos",            r"\bjurados mixtos\b", "tierra y trabajo"),
    "estatuto":         ("Estatuto",                  r"\bestatutos?\b", "territorio"),
    "cataluna":         ("Cataluña",                  r"\bcataluna\b", "territorio"),
    "vasco":            ("vasco / Euzkadi",           r"\b(?:vasco|vascos|vascongadas|euzkadi)\b", "territorio"),
    "iglesia":          ("Iglesia",                   r"\biglesias?\b", "religión y enseñanza"),
    "jesuitas":         ("jesuitas",                  r"\bjesuitas?\b", "religión y enseñanza"),
    "congregaciones":   ("congregaciones religiosas", r"\bcongregaciones religiosas\b", "religión y enseñanza"),
    "divorcio":         ("divorcio",                  r"\bdivorcios?\b", "religión y enseñanza"),
    "ensenanza":        ("enseñanza / escuela",       r"\b(?:ensenanza|ensenanzas|escuela|escuelas)\b", "religión y enseñanza"),
    "mujer":            ("mujer / mujeres",           r"\bmujer(?:es)?\b", "ciudadanía"),
    "voto_femenino":    ("voto femenino / de la mujer", r"\b(?:voto femenino|voto de la mujer|sufragio femenino)\b", "ciudadanía"),
    "amnistia":         ("amnistía",                  r"\bamnistias?\b", "ciudadanía"),
    "orden_publico":    ("orden público",             r"\borden publico\b", "orden y violencia"),
    "guardia_civil":    ("Guardia civil",             r"\bguardia civil\b", "orden y violencia"),
    "ejercito":         ("Ejército",                  r"\bejercitos?\b", "orden y violencia"),
    "casas_viejas":     ("Casas Viejas",              r"\bcasas viejas\b", "orden y violencia"),
    "asturias":         ("Asturias",                  r"\basturias\b", "orden y violencia"),
    "pistolerismo":     ("pistoleros / pistolerismo", r"\bpistoler(?:o|os|ismo)\b", "orden y violencia"),
    "fascismo":         ("fascismo / fascista",       r"\bfascis(?:mo|ta|tas)\b", "ideologías"),
    "marxismo":         ("marxismo / marxista",       r"\bmarxis(?:mo|ta|tas)\b", "ideologías"),
    "comunismo":        ("comunismo / comunista",     r"\bcomunis(?:mo|ta|tas)\b", "ideologías"),
    "anarquismo":       ("anarquismo / anarquista",   r"\banarquis(?:mo|ta|tas)\b", "ideologías"),
    "frente_popular":   ("Frente Popular",            r"\bfrente popular\b", "ideologías"),
    "presupuesto":      ("presupuesto",               r"\bpresupuestos?\b", "Estado y hacienda"),
    "estraperlo":       ("estraperlo / «Strauss»",    r"\b(?:estraperlo|straperlo|strauss)\b", "Estado y hacienda"),
}
_RX = {k: re.compile(v[1]) for k, v in TERMINOS.items()}


def contar(textos: list[str]) -> list[dict]:
    out = []
    for t in textos:
        f = plegar(t) if isinstance(t, str) else ""
        c = {}
        for k, rx in _RX.items():
            n = len(rx.findall(f))
            if n:
                c[k] = n
        out.append(c)
    return out


def main() -> None:
    df = normalizar(roles_presidencia(cargar_v2(con_texto=True)))
    textos = df["speech"].tolist()
    trozo = (len(textos) + 31) // 32
    partes = [textos[i:i + trozo] for i in range(0, len(textos), trozo)]
    with ProcessPoolExecutor(max_workers=8) as ex:
        conteos = [c for parte in ex.map(contar, partes) for c in parte]
    assert len(conteos) == len(df)
    df = df.drop(columns=["speech"])

    den = df.groupby("mes").agg(pal=("nwords", "sum"), filas=("id", "size"))
    ses = df.groupby("mes").apply(lambda g: g.groupby(["date", "num_session"]).ngroups, include_groups=False)
    meses = sorted(den.index)
    fiab = lambda p: "normal" if p >= 100_000 else ("baja" if p >= 20_000 else "muy_baja")

    apar = {k: defaultdict(int) for k in TERMINOS}
    filas = {k: defaultdict(int) for k in TERMINOS}
    ideo = {k: Counter() for k in TERMINOS}
    por_ses = {k: Counter() for k in TERMINOS}
    total = Counter()
    for mes, pres, ide, fecha, num, c in zip(df.mes, df.presidencia, df.ideo, df.date, df.num_session, conteos):
        for k, n in c.items():
            apar[k][mes] += n
            filas[k][mes] += 1
            total[k] += n
            por_ses[k][(fecha, int(num))] += n
            if not pres:
                ideo[k][ide] += n
    series = {}
    for k, (etq, rx, grupo) in TERMINOS.items():
        series[k] = {
            "etiqueta": etq, "grupo": grupo, "expresion": rx, "total": int(total[k]),
            "apariciones": [int(apar[k].get(m, 0)) for m in meses],
            "filas": [int(filas[k].get(m, 0)) for m in meses],
            "por_ideologia_sin_presidencia": dict(ideo[k].most_common()),
            "sesiones_top": [[f, s, int(n)] for (f, s), n in por_ses[k].most_common(3)],
        }
    datos = {
        "_meta": {
            "fuente": FUENTE,
            "texto": "speech plegado: minúsculas, sin diacríticos (NFD sin marcas Mn); ñ→n",
            "meses": meses,
            "denominadores": {"palabras": [int(den.loc[m, "pal"]) for m in meses],
                              "filas": [int(den.loc[m, "filas"]) for m in meses],
                              "sesiones": [int(ses.loc[m]) for m in meses]},
            "fiabilidad": [fiab(int(den.loc[m, "pal"])) for m in meses],
            "umbrales": "normal ≥ 100.000 palabras/mes; baja ≥ 20.000; muy baja < 20.000 (los del explorador, "
                        "que los aplica a tokens del índice; aquí a nwords)",
            "salvedades": [
                "Contar una palabra no mide el tema, el tono ni la posición de quien la dice.",
                "Texto OCR: formas mal leídas no se cuentan; la lista declara variantes, no comodines.",
                "V2 incluye material impreso dentro de las filas (≈9,8 % de las palabras según la auditoría de "
                "la v3): leyes, dictámenes y votaciones también cuentan.",
                "Los meses sin sesiones no aparecen; la guerra y el exilio son meses de muy poco texto.",
                "Las cifras no coinciden al unidad con la Tendencia del explorador, que trabaja sobre la v3 y "
                "sus tokens (25.903.736) en lugar de nwords de V2 (24.335.896).",
                "El reparto por ideología es el del partido del orador, sin la Presidencia.",
            ],
        },
        "terminos": series,
    }
    escribir("terminos_mes_v2.json", datos)
    for k in TERMINOS:
        s = series[k]
        pico = max(range(len(meses)), key=lambda i: s["apariciones"][i] * 1e4 / max(1, datos["_meta"]["denominadores"]["palabras"][i])
                   if datos["_meta"]["fiabilidad"][i] != "muy_baja" else -1)
        print(f'{k:16s} total {s["total"]:>7,}  pico {meses[pico]}  top {s["sesiones_top"][:1]}')


if __name__ == "__main__":
    main()
