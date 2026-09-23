#!/usr/bin/env python3
"""Tabla de grafías (D-22) de Luz y Taquígrafos: cómo se escribe el nombre de cada diputado en el sitio.

Salidas: exportador/grafias.csv (rep_id;rep_name_base;grafia;fuente;estado) y las tablas de docs/02c_GRAFIAS.md.

Fuentes, en este orden:
  1. El Diario: las etiquetas de orador («El Sr. GIMÉNEZ FERNÁNDEZ:») y el texto corrido de la V2 depositada (MD5
     360332a0…) y de las filas de sumario y comentario de la v3 (sha256 3a0d8b2d…). Dan letras, tildes y guiones.
  2. El Congreso de los Diputados, Histórico de diputados (fichas de las elecciones de 1931, 1933 y 1936). Da la
     composición del nombre (nombres de pila, apellidos, «y», «de»). Escribe en mayúsculas sin tildes.
  3. La Real Academia de la Historia, Diccionario Biográfico electrónico (historia-hispanica.rah.es). Coteja tildes y
     letras cuando tiene la biografía.

Reglas (las mismas que explica docs/02c_GRAFIAS.md):
  - Composición: la del Congreso, que es la de la base; partículas en minúscula (y, e, de, del, la, los).
  - Letras: las del Congreso, salvo que el Diario imprima otra cosa de forma abrumadora y lo explique (tres casos).
  - Tildes: las que el Diario imprime en minúscula en al menos el 20 % de las apariciones (o el 5 % de las etiquetas),
    si la tilde es posible en español; las mayúsculas llevan la tilde de la ortografía actual (Álvarez, Ángel), que la
    tipografía del Diario omitía. Si la RAH tiene la biografía, se coteja: si coincide, «confirmada»; si discrepa,
    «por revisar».
  - Guiones: los que el Diario imprime en la mayoría de las etiquetas o del texto (Alcalá-Zamora, Ruiz-Funes).
  - Nombres de pila: en la forma española del Diario y del Congreso (Luis Companys, no Lluís), con la tilde de la
    ortografía actual.

Uso: python3 construir_grafias.py [--escribir]
"""
from __future__ import annotations

import csv
import hashlib
import os
import json
import pickle
import re
import sqlite3
import subprocess
import sys
import unicodedata
from collections import Counter, defaultdict
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

import pandas as pd

AQUI = Path(__file__).resolve().parent
SITIO = Path(os.environ.get("LUZ_SITE", AQUI.parents[1]))   # luz_site/
V2 = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv")
MD5_V2 = "360332a0ff1327671530f15eed46ac0c"
V3 = Path("/Users/rodrodr/.cache/luz_site/corpus.sqlite")
SHA_V3 = "3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15"
CLIMA = Path("/Users/rodrodr/.cache/luz_site/clima")
ROLES = SITIO / "docs/estudio/datos/motor/roles.mjs"
CACHE = Path("/Users/rodrodr/.cache/luz_site/grafias")
PRESIDENCIA = {"chair", "vicechair", "chair_age"}
GOBIERNO = {"minister", "head_of_government", "head_of_state"}
PARTS = {"y", "e", "i", "de", "del", "la", "las", "los", "da"}

# rep_id nombrados en 01_NARRATIVA_sitio.md (cotejados a mano con la base; ver 02c_GRAFIAS.md § Universo)
NARRATIVA = [980, 175, 467, 754, 133, 28, 455, 581, 89, 672, 673, 174, 107, 477, 487, 821, 98, 550, 208, 863, 229, 103, 170,
             191, 209, 423, 130, 993, 479, 16, 266, 652, 441, 730, 448, 956, 306, 384, 345, 452, 412, 925, 121, 745, 125, 179,
             819, 668, 583, 755, 380, 50, 290, 960, 836, 835, 20, 456, 236, 472, 143]
PETICIONES: list[int] = []   # rep_id pedidos en docs/peticiones/grafias_*.md (se rellenan al leer la carpeta)

# Nombres de pila con tilde (ortografía actual). Los demás de la tabla no la llevan.
PILA = {"agustin": "Agustín", "alvaro": "Álvaro", "amos": "Amós", "andres": "Andrés", "angel": "Ángel", "angeles": "Ángeles",
        "asis": "Asís", "bartolome": "Bartolomé", "candido": "Cándido", "cesar": "César", "damaso": "Dámaso", "felix": "Félix",
        "fermin": "Fermín", "gines": "Ginés", "hector": "Héctor", "jeronimo": "Jerónimo", "jesus": "Jesús", "joaquin": "Joaquín",
        "jose": "José", "julian": "Julián", "leon": "León", "maria": "María", "martin": "Martín", "matias": "Matías",
        "melquiades": "Melquíades", "nicolas": "Nicolás", "ramon": "Ramón", "sebastian": "Sebastián", "simeon": "Simeón",
        "tomas": "Tomás", "trifon": "Trifón", "victor": "Víctor"}
# Apellidos cuya tilde en mayúscula inicial omitía la tipografía del Diario (se restituye por ortografía).
MAYUS = {"alvarez": "Álvarez"}
# Forma corta (la del rótulo del Diario) cuando la automática no sirve
CORTO = {394: "Trifón Gómez", 50: "Melquíades Álvarez", 55: "Basilio Álvarez", 790: "del Río", 791: "de los Ríos",
         681: "de Pablo-Blanco", 512: "Dimas Madariaga", 513: "Salvador Madariaga", 420: "Antonio Guallar", 421: "Santiago Guallar",
         666: "Oreja Elósegui", 672: "Eduardo Ortega y Gasset", 673: "Ortega y Gasset", 836: "Ruiz Lecina", 835: "Ruiz-Funes",
         654: "Nicolau d'Olwer", 143: "Blasco-Ibáñez", 944: "Tomás y Piera"}
# Candidatos de la RAH que son otra persona (mismo apellido, otro nombre o generación)
RAH_RECHAZO = {48, 399, 548, 722}

# Decisiones razonadas caso a caso (la columna «motivo» va a la nota de 02c_GRAFIAS.md)
DECISION = {
    (456, None): dict(g="Manuel Giménez Fernández", e="confirmada",
                      m="El Congreso y la base escriben JIMENEZ; el Diario imprime G en el 97,9 % de sus etiquetas y la RAH titula «Giménez». La fila V2 71330 (8-VI-1934) lo imprime «JIMÉNEZ FERNÁNDEZ»: la cita se conserva tal cual."),
    (676, None): dict(g="Ángel Ossorio Gallardo", e="confirmada",
                      m="El Congreso y la base escriben OSORIO; el Diario imprime OSSORIO en todas sus etiquetas y la RAH titula «Ossorio y Gallardo»."),
    (956, None): dict(g="José Antonio Trabal y Sans", e="por revisar",
                      m="El Congreso y la base escriben SAUS; el Diario imprime «Trabal Sans» 9 veces y «Trabal y Sans» 1, y nunca «Saus». Sin biografía en la RAH."),
    (550, None): dict(g="Diego Martínez Barrio", e="confirmada",
                      m="El Diario imprime a menudo «Martínez Barrios» (también en el texto), pero el Congreso, la RAH y el propio Diario en la promesa de 1945 (V2 107371) dicen «Barrio»."),
    (835, None): dict(g="Mariano Ruiz-Funes García", e="confirmada",
                      m="El guion lo imprime el texto del Diario en la mayoría de los casos (779 frente a 448) y lo da la RAH; las etiquetas de este rep_id no lo llevan."),
    (836, "Amos Ruiz Lecina"): dict(e="por revisar",
                      m="El rep_id 836 es Amós Ruiz Lecina, pero 92 de sus 184 filas llevan rep_name «Mariano Ruiz Funes Garcia» y son de Ruiz-Funes (rep_id 835): errata de la base pendiente del autor (D-25). Una figura que agrupe por rep_id debe separarlas por rep_name y dar a esas filas la grafía de 835."),
    (65, None): dict(g="Mariano Ansó Zunzarren", e="por revisar",
                     m="El Diario imprime «Ansó» en el 90 % del texto y el 62 % de las etiquetas; la RAH titula «Anso y Zunzarren», sin tilde."),
    (174, None): dict(g="Rafael Campalans Puig", e="por revisar",
                      m="El Diario castellaniza «Campaláns» (422 frente a 18); la RAH y la forma catalana, «Campalans». Se propone la de la RAH."),
    (654, None): dict(g="Luis Nicolau d'Olwer", e="por revisar",
                      m="El Diario imprime «Nicoláu» (441) y «Nicolau» (88); la forma catalana no lleva tilde. Sin biografía en la RAH con este nombre."),
    (908, None): dict(g="Ramón Serrano Suñer", e="por revisar",
                      m="El Diario imprime «Suñer» en 1.205 de 1.211 casos; la RAH titula «Súñer»."),
    (236, None): dict(g="Jesús Comín Sagües", e="por revisar",
                      m="El Diario imprime «Sagües» (14), «Sagués» (4) y «Sagues» (3): la sílaba tónica no queda clara. Sin biografía en la RAH."),
    (509, None): dict(g="Luis Lucía Lucía", e="confirmada",
                      m="El Diario imprime «Lucía Lucía» 5 veces y «Lucía y Lucía» 1, nunca sin tilde; la RAH titula «Lucía y Lucía»."),
    (1000, None): dict(g="Juan Simeón Vidarte Franco-Romero", e="confirmada",
                       m="El guion lo imprime el Diario («Vidarte Franco-Romero», 11) y lo da la RAH."),
    (393, None): dict(g="Ricardo Gómez Roji", e="probable",
                      m="El Diario imprime «Roji» en el 92 % del texto y el 90 % de las etiquetas; se usa también «Rojí». Sin biografía en la RAH."),
    (386, None): dict(g="Jerónimo Gomariz Latorre", e="probable",
                      m="El Diario imprime «Gomariz» en el 94 % del texto («Gomáriz», 184). Sin biografía en la RAH."),
    (492, None): dict(g="Juan Lluhí Vallescá", e="confirmada",
                      m="La RAH titula «Joan Lluhí i Vallescà»; el Diario imprime «Lluhí» (196 de 903) y «Vallescá» (38 de 43). Nombre de pila en la forma del Diario."),
    (583, None): dict(e="confirmada",
                      m="La RAH titula «Maurín Julià»; el Diario imprime «Juliá», con tilde aguda (119 veces), y la tabla sigue al Diario (criterio 2)."),
    (190, None): dict(g="Jaime Carner Romeu", e="confirmada",
                      m="El Diario castellaniza a veces «Roméu» (3 de 10); la RAH titula «Jaume Carner Romeu». Nombre de pila en la forma del Diario."),
    (135, None): dict(g="Crescenciano Bilbao Castellanos", e="por revisar",
                      m="El Congreso y la base escriben CASTELLANO; el Diario imprime «Castellanos» en todas sus etiquetas y en 138 de 152 casos del texto. Sin biografía en la RAH."),
    (454, None): dict(g="Luis Giménez Canga-Argüelles", e="confirmada",
                      m="El Congreso y la base escriben JIMENEZ; el Diario imprime «Giménez Canga» 572 veces frente a 89 y la RAH titula «Giménez». La RAH omite la diéresis que el Diario imprime («Argüelles», 721 de 746)."),
    (735, None): dict(g="Antonio Pildáin Zapiáin", e="por revisar",
                      m="La RAH titula «Pildáin Zapiáin»; el Diario imprime casi siempre «Pildain» (562 frente a 19) y nunca «Zapiáin». Se propone la forma de la RAH."),
    (814, None): dict(g="Antonio Romá y Rubíes", e="por revisar",
                      m="El Diario imprime sobre todo «Roma y Rubies», pero también «Rubíes» (134 de 830) y «Romá» (19); la RAH titula «Romá Rubies»."),
    (143, None): dict(g="Sigfrido Blasco-Ibáñez Blasco", e="por revisar",
                      m="El Congreso y la base escriben BLASCO BLASCO; el Diario lo nombra «Sigfrido Blasco-Ibáñez» o «Sigfrido Blasco Ibáñez» 19 veces (6 con «Blasco» detrás) y «Sigfrido Blasco Blasco» 7. La fila V2 97389 (28-X-1935, «El Sr. BLASCO-IBANEZ:») no tiene rep_id y es, probablemente, suya."),
    (944, None): dict(g="José Tomás y Piera", e="confirmada",
                      m="Con «y», como el Diario («TOMÁS Y PIERA») y la RAH, aunque el Congreso no la ponga: sin ella, «José Tomás» se leería como nombre compuesto."),
    (48, None): dict(e="probable",
                     m="El Diario no pone guion («Alvarez Buylla», 257 frente a 4); la RAH escribe «Álvarez-Buylla» a sus hermanos."),
}


def fold(t: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", t.lower()) if unicodedata.category(c) != "Mn")


def sin_tilde(t: str) -> str:
    return "".join(c if c in "ñÑüÜ" else unicodedata.normalize("NFD", c)[0] for c in t)


def cap(t: str) -> str:
    out = "-".join(p[:1].upper() + p[1:].lower() for p in t.split("-"))
    return re.sub(r"^O'(\w)", lambda m: "O'" + m.group(1).upper(), out)


def fmt(n: int) -> str:
    return f"{n:,}".replace(",", ".")


# ---------- ortografía mínima: ¿es posible esta tilde? ----------
AGUDA = {"á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u"}


def nucleos(w: str) -> list[tuple[int, int]]:
    w = w.lower(); n = len(w); res = []; i = 0

    def voc(k):
        c = w[k]
        if c in "aeiouáéíóúü":
            return not (c == "u" and k > 0 and w[k - 1] in "qg" and k + 1 < n and w[k + 1] in "eiéí")
        return c == "y" and k == n - 1 and k > 0 and w[k - 1] in "aeiou"
    while i < n:
        if voc(i):
            j = i
            while j + 1 < n and voc(j + 1):
                j += 1
            g = w[i:j + 1]
            fuertes = [k for k, c in enumerate(g) if c in "aeoáéóíú"]
            if len(fuertes) <= 1:
                res.append((i, j))
            else:
                cortes = [i + k for k in fuertes]; ini = i
                for k in range(1, len(cortes)):
                    res.append((ini, cortes[k] - 1)); ini = cortes[k]
                res.append((ini, j))
            i = j + 1
        else:
            i += 1
    return res


def tilde_posible(w: str) -> bool:
    wl = w.lower(); pos = [k for k, c in enumerate(wl) if c in AGUDA]
    if len(pos) != 1:
        return not pos
    p = pos[0]; nu = nucleos(wl)
    idx = next((k for k, (a, b) in enumerate(nu) if a <= p <= b), None)
    if idx is None or len(nu) == 1:
        return False
    if wl[p] in "íú" and any(c in "aeo" for c in wl[max(p - 1, 0):p] + wl[p + 1:p + 2]):
        return True
    desde = len(nu) - idx; ult = AGUDA.get(wl[-1], wl[-1])
    return (ult in "aeiouns") if desde == 1 else (ult not in "aeiouns") if desde == 2 else True


# ---------- datos ----------
def huella(path: Path, algo: str) -> str:
    h = hashlib.new(algo)
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 22), b""):
            h.update(b)
    return h.hexdigest()


def cargar():
    CACHE.mkdir(parents=True, exist_ok=True)
    c = CACHE / "filas.pkl"
    if c.exists():
        return pickle.load(open(c, "rb"))
    assert huella(V2, "md5") == MD5_V2, "no es la V2 depositada"
    assert huella(V3, "sha256") == SHA_V3, "no es la v3 del explorador"
    v2 = pd.read_csv(V2, sep=";", usecols=["id", "speaker", "speech", "rep_id", "rep_name", "legislature", "nwords"],
                     dtype={"rep_id": "Int64", "speaker": str, "rep_name": str})
    assert len(v2) == 107_551
    pares = v2[["speaker", "rep_name"]].fillna("").drop_duplicates()
    ent = CACHE / "pares.json"; ent.write_text(json.dumps(pares.values.tolist(), ensure_ascii=False))
    roles = json.loads(subprocess.run(["node", str(ROLES), str(ent)], check=True, capture_output=True, text=True).stdout)
    m = {(s, r): x for (s, r), x in zip(pares.values.tolist(), roles)}
    v2["rol"] = [m[k] for k in zip(v2.speaker.fillna(""), v2.rep_name.fillna(""))]
    con = sqlite3.connect(V3)
    v3 = pd.read_sql("select id, speaker, speech, rep_id, rep_name, nwords from speeches", con)
    assert len(v3) == 121_700
    cl = [json.loads(l) for p in sorted(CLIMA.glob("part*.jsonl")) for l in p.read_text().splitlines()]
    cl = pd.DataFrame([(o["id"], o["role"], o["chair"]) for o in cl], columns=["id", "rol", "chair"])
    v3 = v3.merge(cl, on="id", how="left")
    assert v3.rol.notna().all()
    pickle.dump((v2, v3), open(c, "wb"))
    return v2, v3


PAL = re.compile(r"[A-Za-zÁÉÍÓÚÜÑÀÈÌÒÙÏÇáéíóúüñàèìòùïç'’\-]+")


def _cuenta(textos):
    c = Counter()
    for t in textos:
        if isinstance(t, str):
            c.update(w.strip("-'’") for w in PAL.findall(t))
    return c


def indice_formas(v2, v3):
    """Cada palabra impresa (V2 entera + filas de sumario y comentario de la v3) con su frecuencia, por forma plegada."""
    c = CACHE / "formas.pkl"
    if c.exists():
        return pickle.load(open(c, "rb"))
    textos = v2.speech.tolist() + v3[v3.rol.isin(["summary", "remark"])].speech.tolist()
    tot = Counter()
    with ProcessPoolExecutor(8) as ex:
        for x in ex.map(_cuenta, [textos[k::16] for k in range(16)]):
            tot.update(x)
    idx: dict[str, dict[str, int]] = {}
    for w, n in tot.items():
        idx.setdefault(fold(w), {})[w] = n
    pickle.dump(idx, open(c, "wb"))
    return idx


def cuerpo(etiqueta: str) -> str:
    """El nombre dentro de una etiqueta: «El Sr. VICEPRESIDENTE (Giménez Fernández):» → «Giménez Fernández»."""
    s = re.sub(r"^\s*(El|La)\s+(Srta|Sra|Sr|Señorita|Señora|Señor)\.?\s*", "", etiqueta or "")
    m = re.search(r"\(([^)]*)\)", s)
    if m and re.match(r"(?i)\s*(vice|vicf)?presidente|ministro|secretario", s) and not re.search(r"(?i)comisi|dictamen", m.group(1)):
        return m.group(1).strip()
    return re.sub(r"\s*\(.*$", "", s).rstrip(":. ").strip()


CATALAN = {"joan": "juan", "lluis": "luis", "francesc": "francisco", "jaume": "jaime", "miquel": "miguel", "josep": "jose",
           "pere": "pedro", "antoni": "antonio", "joaquim": "joaquin", "marti": "martin", "pau": "pablo", "jordi": "jorge"}
NOMBRES_PILA: set[str] = set()


def coincide_rah(c: dict, grafia: str, n_pila: int) -> bool:
    """¿Es la biografía de la RAH la de este diputado? Antes del primer apellido, solo nombres de pila, entre ellos el
    primero del diputado; después, sus apellidos en orden (puede faltar uno). Si solo casa el primer apellido, el
    título debe acabar ahí y llevar exactamente sus nombres de pila. Nacido entre 1840 y 1915."""
    if c.get("nacimiento") and not 1840 <= int(c["nacimiento"]) <= 1915:
        return False
    tit = c["titulo"]
    if "," in tit:   # «Castelao, Alfonso Daniel Rodríguez» → «Alfonso Daniel Rodríguez Castelao»
        x, y = tit.split(",", 1); tit = y.strip() + " " + x.strip()
    rt = [CATALAN.get(fold(x), fold(x)) for x in re.split(r"[\s\-']+", tit) if x and fold(x) not in PARTS]
    toks = [fold(x) for x in re.split(r"[\s\-']+", grafia) if x and fold(x) not in PARTS]
    pila = [fold(x) for x in grafia.split()[:n_pila] if fold(x) not in PARTS]
    aps = toks[len(pila):]
    if not pila or not aps or aps[0] not in rt:
        return False
    i = rt.index(aps[0]); antes = rt[:i]
    if pila[0] not in antes or any(x not in NOMBRES_PILA and len(x) > 1 for x in antes):
        return False
    j = i; faltan = 0
    for a in aps[1:]:
        if j + 1 < len(rt) and rt[j + 1] == a:
            j += 1
        else:
            faltan += 1
    casan = j - i + 1
    if casan >= 2:
        return faltan <= 1
    return len(aps) <= 2 and i + 1 == len(rt) and antes == pila


def main(escribir: bool) -> None:
    v2, v3 = cargar()
    idx = indice_formas(v2, v3)
    d2 = v2[v2.rep_id.notna()].copy(); d2["rep_id"] = d2.rep_id.astype(int)
    d3 = v3[v3.rep_id.notna()].copy(); d3["rep_id"] = d3.rep_id.astype(int)
    d2["pres"] = d2.rol.isin(PRESIDENCIA)
    sp2 = d2[~d2.pres].groupby("rep_id").nwords.sum().sort_values(ascending=False)
    h3 = d3[(~d3.chair.astype(bool)) & (~d3.rol.isin(["summary", "remark"]))]
    sp3 = h3.groupby("rep_id").nwords.sum().sort_values(ascending=False)
    rango2 = {r: k for k, r in enumerate(sp2.index, 1)}; rango3 = {r: k for k, r in enumerate(sp3.index, 1)}
    pres = set(d2[d2.rol.isin(PRESIDENCIA)].rep_id) | set(d3[d3.rol.isin(PRESIDENCIA)].rep_id)
    gob = set(d2[d2.rol.isin(GOBIERNO)].rep_id) | set(d3[d3.rol.isin(GOBIERNO)].rep_id)
    secr = set(d2[d2.rol == "secretary"].rep_id) | set(d3[d3.rol == "secretary"].rep_id)
    top2, top3 = set(sp2.index[:150]), set(sp3.index[:150])
    for f in sorted((SITIO / "docs/peticiones").glob("grafias_*.md")):
        t = f.read_text()
        PETICIONES.extend(int(x) for x in re.findall(r"rep_id\D{0,3}(\d{1,4})", t))
        PETICIONES.extend(int(x) for x in re.findall(r"\|\s*(\d{1,4})\??\s*(?=\|)", t))
        PETICIONES.extend(int(x) for x in re.findall(r"(?<![\d.,])(\d{1,4}) [A-ZÁÉÍÓÚ][a-záéíóúñ]+ [A-ZÁÉÍÓÚ]", t))
    nucleo = top2 | top3 | pres | gob | secr | set(NARRATIVA) | set(PETICIONES)
    universo = sorted(set(d2.rep_id) | set(d3.rep_id))   # los 773: toda figura puede nombrar a cualquiera (F30, votaciones)
    PETICIONES[:] = [x for x in PETICIONES if x in set(universo)]
    nucleo = nucleo | set(PETICIONES)
    cong = json.load(open(AQUI / "fuentes/congreso_1931_1936.json"))["fichas"]
    rah = json.load(open(AQUI / "fuentes/rah_candidatos.json"))["candidatos"]

    def clave(nombre, apellido):
        return frozenset(x for x in re.split(r"[\s\-]+", fold(nombre + " " + apellido)) if x and x not in PARTS)
    for f in cong:
        NOMBRES_PILA.update(fold(x) for x in f["nombre"].split() if fold(x) not in PARTS)
    NOMBRES_PILA.update(CATALAN.values()); NOMBRES_PILA.update({"baltasar", "diosdado"})
    por_clave = defaultdict(list)
    for f in cong:
        por_clave[clave(f["nombre"], f["apellido"])].append(f)

    filas = []
    for rid in universo:
        a = d2[d2.rep_id == rid]; b = d3[d3.rep_id == rid]
        nombres = sorted(set(a.rep_name.dropna()) | set(b.rep_name.dropna()))
        etiq = Counter(a.speaker.fillna(""))
        if rid == 836:
            nombres = ["Amos Ruiz Lecina"]   # una fila por rep_id (lo exige base.py); ver DECISION
        for nb in nombres:
            k = frozenset(x for x in re.split(r"[\s\-]+", fold(nb)) if x and x not in PARTS)
            fichas = por_clave.get(k, [])
            if not fichas:   # el listado del Congreso omite alguna ficha: se buscan por inclusión, y si no, la base
                fichas = [f for kk, fs in por_clave.items() if len(k & kk) >= len(k) - 1 and len(kk - k) <= 1 and len(k) >= 3 for f in fs]
            if not fichas:
                toks_b = nb.split()
                fichas = [{"nombre": toks_b[0].upper(), "apellido": " ".join(toks_b[1:]).upper(), "titulo": "", "elecciones": [], "_base": True}]
            f0 = fichas[0]
            elecc = sorted({e["eleccion"][-4:] for f in fichas for e in f["elecciones"]})
            # etiquetas de este nombre (en 836, solo las del nombre correspondiente)
            et = Counter(a[a.rep_name == nb].speaker.fillna("")) if len(nombres) > 1 else etiq
            cuerpos = Counter()
            for s, n in et.items():
                cuerpos[cuerpo(s)] += n
            # formas de cada apellido en etiquetas (mayúsculas con o sin tilde)
            pila = f0["nombre"].split(); pre = []
            while pila and fold(pila[-1]) in PARTS:
                pre.insert(0, pila.pop().lower())
            g_pila = [PILA.get(fold(x), cap(x)) if fold(x) not in PARTS else x.lower() for x in pila]
            toks = f0["apellido"].split(); g_ap = []; apoyo = []; avisos_letras = []
            for t in toks:
                ft = fold(t)
                if ft in PARTS:
                    g_ap.append(t.lower()); continue
                if ft.startswith("d'"):
                    g_ap.append("d'" + cap(t[2:])); continue
                formas = idx.get(ft, {})
                low = {w: n for w, n in formas.items() if w[:1].isupper() and w != w.upper()}
                tot_low = sum(low.values())
                def marcada(w):  # lleva tilde posible o diéresis
                    return fold(w) != w.lower() and (tilde_posible(w) if sin_tilde(w) != w else True)
                acc_low = sorted(((w, n) for w, n in low.items() if marcada(w)), key=lambda x: -x[1])
                lab = Counter()
                for c, n in cuerpos.items():
                    for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", c):
                        if fold(w) == ft:
                            lab[w] += n
                tot_lab = sum(lab.values())
                acc_lab = sorted(((w, n) for w, n in lab.items() if marcada(w)), key=lambda x: -x[1])
                elegido, razon = None, None
                if acc_low and acc_low[0][1] >= 3 and acc_low[0][1] >= 0.2 * tot_low:
                    elegido, razon = acc_low[0][0], f"texto {fmt(acc_low[0][1])} de {fmt(tot_low)}"
                elif acc_lab and acc_lab[0][1] >= 3 and acc_lab[0][1] >= 0.05 * tot_lab:
                    elegido, razon = acc_lab[0][0], f"etiquetas {fmt(acc_lab[0][1])} de {fmt(tot_lab)}"
                elif ft in MAYUS:
                    elegido, razon = MAYUS[ft], "tilde de mayúscula"
                # letras: ¿imprime el Diario otra forma cercana de este apellido en sus etiquetas?
                cerca = Counter()
                for c, n in cuerpos.items():
                    for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", c):
                        fw = fold(w)
                        if fw != ft and len(ft) >= 4 and abs(len(fw) - len(ft)) <= 1 and sum(a != b for a, b in zip(fw, ft)) + abs(len(fw) - len(ft)) == 1:
                            cerca[fw] += n
                if cerca:
                    fw, n = cerca.most_common(1)[0]
                    if n >= 20 and n >= 0.6 * (n + tot_lab):
                        avisos_letras.append(f"{t.lower()}→{fw} ({fmt(n)} de {fmt(n + tot_lab)} etiquetas)")
                forma = cap(elegido.lower()) if elegido else cap(t.lower())
                if re.search(r"[áéó]u$", forma):
                    sin = forma[:-2] + sin_tilde(forma[-2]) + "u"
                    if sum(n for w, n in low.items() if w == sin) >= 3:
                        apoyo.append((sin, f"sin la tilde castellanizadora del diptongo final ({fmt(low.get(sin, 0))} sin tilde en el texto)", 0, 0))
                        forma = sin; elegido = None
                if "Ñ" in t.upper() and "ñ" not in forma:
                    forma = cap(t.lower())
                g_ap.append(forma); apoyo.append((forma, razon, tot_low, tot_lab))
            # guiones: los del Diario (etiquetas o texto) en la mayoría de los casos
            sin_p = [(i, x) for i, x in enumerate(g_ap) if fold(x) not in PARTS]
            for (i1, x1), (i2, x2) in zip(sin_p, sin_p[1:]):
                if i2 != i1 + 1:
                    continue
                f1, f2 = fold(x1), fold(x2)
                con = sum(n for c, n in cuerpos.items() if re.search(rf"{f1}\s*-\s*{f2}", fold(c)))
                sin = sum(n for c, n in cuerpos.items() if re.search(rf"{f1}\s+{f2}", fold(c)))
                if con + sin >= 5 and con / (con + sin) >= 0.5:
                    g_ap[i1] = g_ap[i1] + "-"
            grafia = " ".join(g_pila + pre + [" ".join(g_ap).replace("- ", "-")])
            # si la RAH pone una tilde que el Diario también imprime (al menos dos veces), se adopta
            for c in rah.get(str(rid), {}).get(nb, []):
                if rid in RAH_RECHAZO:
                    break
                for y in re.split(r"[\s\-',]+", c["titulo"]):
                    for x in re.split(r"[\s\-']+", grafia):
                        if x and fold(x) == fold(y) and x != y and sin_tilde(y) != y and "à" not in y and "è" not in y and "ò" not in y:
                            veces = idx.get(fold(y), {}).get(y, 0) + idx.get(fold(y), {}).get(y.upper(), 0)
                            if veces >= 2 and tilde_posible(y):
                                grafia = re.sub(rf"(?<![\wÁÉÍÓÚáéíóúÑñÜü]){re.escape(x)}(?![\wÁÉÍÓÚáéíóúÑñÜü])", y, grafia)
                                apoyo.append((y, f"RAH y Diario {fmt(veces)}", 0, 0))
                break
            dec = DECISION.get((rid, nb)) or DECISION.get((rid, None)) or {}
            grafia = dec.get("g", grafia)
            # RAH
            cand = [c for c in rah.get(str(rid), {}).get(nb, []) if rid not in RAH_RECHAZO]
            r0 = next((c for c in cand if coincide_rah(c, grafia, len(g_pila) + len(pre))), None)
            # estado
            dif_rah = []
            if r0:
                rt = {fold(x): x for x in re.split(r"[\s\-',]+", r0["titulo"]) if x}
                for x in re.split(r"[\s\-']+", grafia):
                    if fold(x) in PARTS or not x:
                        continue
                    y = rt.get(fold(x))
                    if y and y != x and sin_tilde(y).replace("à", "a") != sin_tilde(x) and y.replace("à", "á").replace("è", "é").replace("ò", "ó") != x:
                        dif_rah.append(f"{x}/{y}")
                    elif y and y != x and y.replace("à", "á").replace("è", "é").replace("ò", "ó") != x:
                        dif_rah.append(f"{x}/{y}")
            if r0:
                for x in re.split(r"[\s\-']+", " ".join(grafia.split()[len(g_pila):])):
                    fx = fold(x)
                    if not x or fx in PARTS or fx in rt:
                        continue
                    for fy, y in rt.items():
                        if len(fx) >= 4 and len(fx) == len(fy) and sum(a != b for a, b in zip(fx, fy)) == 1:
                            dif_rah.append(f"{x}/{y}")
            letras = [x for x in re.split(r"[\s\-']+", grafia) if x and fold(x) not in PARTS and fold(x) not in {fold(y) for y in re.split(r"[\s\-']+", f0["nombre"] + " " + f0["apellido"])}]
            if "e" in dec:
                estado = dec["e"]
            elif dif_rah or letras or avisos_letras:
                estado = "por revisar"
            elif r0:
                estado = "confirmada"
            else:
                estado = "probable"
            # ejemplo del Diario: la etiqueta con más tildes compatibles, y su primera fila V2
            sur = {fold(x) for x in re.split(r"[\s\-']+", " ".join(grafia.split()[len(g_pila) + len(pre):])) if x and fold(x) not in PARTS}

            def puntua(s):
                c = cuerpo(s)
                nombra = any(fold(w) in sur for w in re.split(r"[\s\-]+", c)) and not re.fullmatch(r"(?i)(vice)?presidente.*|ministro.*|secretario", c)
                return (nombra, sum(1 for x in re.split(r"[\s\-]+", grafia) if sin_tilde(x) != x and x.upper() in c.upper()), et[s])
            ej = max(et, key=puntua) if et else ""
            ej_id = int(a[a.speaker == ej].id.iloc[0]) if ej else None
            if ej and not puntua(ej)[0]:
                # ninguna etiqueta lo nombra (preside o es ministro sin paréntesis): se busca su nombre en el texto
                pat = re.compile(r"\b" + r"\s+".join(re.escape(x) for x in [grafia.split()[0]] + grafia.split()[len(g_pila) + len(pre):][:2]), re.I)
                hit = next(((i, m.group(0)) for i, t in zip(v2.id, v2.speech) if isinstance(t, str) for m in [pat.search(t)] if m), None)
                if hit:
                    ej_id, ej = int(hit[0]), hit[1]
            gt_ap = {fold(x) for x in re.split(r"[\s\-']+", grafia) if x and fold(x) not in PARTS}
            con_ap = [(c, n) for c, n in cuerpos.most_common() if any(fold(w) in gt_ap for w in re.split(r"[\s\-]+", c))
                      and not re.search(r"(?i)presidente|ministro|secretario", c)]
            corto_c = con_ap[0][0] if con_ap else ""
            # tokens de la grafía con su separador
            piezas = re.findall(r"[^\s\-]+[\s\-]?", grafia)
            tok = [fold(p.rstrip(" -")) for p in piezas]
            lab = [fold(w) for w in re.split(r"[\s\-]+", re.sub(r"\(.*?\)", "", corto_c)) if w and fold(w) not in PARTS]
            corto = ""
            for i in range(len(piezas)):
                for j in range(i, len(piezas)):
                    seq = [t for t in tok[i:j + 1] if t not in PARTS]
                    if seq == lab and tok[i] not in PARTS:
                        corto = "".join(piezas[i:j + 1]).strip(" -"); break
                if corto:
                    break
            if not corto:
                corto = " ".join(grafia.split()[len(g_pila) + len(pre):]).split(" y ")[0]
            corto = CORTO.get(rid, corto)
            primera = fold(corto.split()[0])
            if primera in {fold(x) for x in g_pila}:
                uso = corto
            elif primera in PARTS or not pre:
                uso = " ".join(g_pila + [corto])
            else:
                uso = " ".join(g_pila + pre + [corto])
            if rid == 673:
                uso = "José Ortega y Gasset"
            # texto de la fuente
            partes = []
            if ej and ej.startswith(("El ", "La ")):
                partes.append(f"Diario: V2 {ej_id} «{ej.strip()}»")
            elif ej:
                partes.append(f"Diario: V2 {ej_id}, en el texto: «{ej.strip()}»")
            fin = set(re.split(r"[\s\-']+", grafia))
            ap_ev = [f"{x} ({r})" for x, r, _, _ in apoyo if r and r != "tilde de mayúscula" and x in fin]
            if ap_ev:
                partes.append("tildes: " + ", ".join(ap_ev))
            tit = f" ({f0['titulo']})" if f0["titulo"] else ""
            partes.append(f"Congreso: {f0['apellido']}, {f0['nombre']}{tit}, elecciones {', '.join(elecc)}" if not f0.get("_base") else "Congreso: sin ficha en el listado descargado")
            partes.append(f"RAH {r0['nid']}: {r0['titulo']}" if r0 else "RAH: sin biografía")
            if dec.get("m"):
                partes.append("nota: " + dec["m"])
            fuente = " · ".join(partes).replace(";", ",")
            motivo = []
            if rid in top2: motivo.append(f"V2 n.º {rango2[rid]}")
            if rid in top3: motivo.append(f"v3 n.º {rango3[rid]}")
            if rid in pres: motivo.append("Presidencia")
            if rid in gob: motivo.append("Gobierno")
            if rid in secr: motivo.append("Secretaría")
            if rid in NARRATIVA: motivo.append("narrativa")
            if rid in PETICIONES: motivo.append("petición")
            if f0.get("_base"): motivo.append("sin ficha del Congreso")
            nota = dec.get("m", "")
            if not nota and dif_rah:
                nota = "La RAH difiere: " + ", ".join(dif_rah) + "."
            if not nota and avisos_letras:
                nota = "El Diario imprime otra letra: " + ", ".join(avisos_letras) + "."
            if not nota and letras:
                nota = "Letras distintas del Congreso: " + ", ".join(letras) + "."
            filas.append(dict(rep_id=rid, rep_name_base=nb, grafia=grafia, fuente=fuente, estado=estado, corto=corto, uso=uso,
                              motivo=" · ".join(motivo), nucleo=rid in nucleo, nota=nota, rah=(r0["titulo"] if r0 else ""), rah_nid=(r0["nid"] if r0 else None),
                              filas_v2=int((d2.rep_id == rid).sum()), pal_sp_v2=int(sp2.get(rid, 0)), pal_habla_v3=int(sp3.get(rid, 0))))
    # cortos repetidos → con nombre de pila
    cc = Counter(f["corto"] for f in filas)
    for f in filas:
        if cc[f["corto"]] > 1 and f["rep_id"] not in CORTO:
            f["corto"] = f["uso"]
    json.dump(filas, open(CACHE / "grafias_trabajo.json", "w"), ensure_ascii=False, indent=0)
    print(len(filas), Counter(f["estado"] for f in filas))
    if escribir:
        dest = SITIO / "exportador/grafias.csv"; dest.parent.mkdir(exist_ok=True)
        with open(dest, "w", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh, delimiter=";", quoting=csv.QUOTE_MINIMAL, lineterminator="\n")
            w.writerow(["rep_id", "rep_name_base", "grafia", "fuente", "estado", "corto", "uso"])
            for f in filas:
                w.writerow([f["rep_id"], f["rep_name_base"], f["grafia"], f["fuente"], f["estado"], f["corto"], f["uso"]])
        print("escrito", dest)
        escribir_md(filas, SITIO / "docs/02c_GRAFIAS.md")
        print("escrito", SITIO / "docs/02c_GRAFIAS.md")


SIN_REP_ID = [  # ministros sin escaño que hablan en el Diario (V2, filas sin rep_id) y nombres citados que no son diputados
    ("Agustín Viñuales Pardo", "Viñuales", "«Ministro de HACIENDA (Viñuales)»: 13 etiquetas, del 16-VI al 6-IX-1933", 46117),
    ("Joaquín Dualde Gómez", "Dualde", "«Ministro de INSTRUCCIÓN PÚBLICA (Dualde)»: 16 etiquetas, del 26-III al 28-VI-1935", 13821),
    ("José Oriol Anguera de Sojo", "Anguera de Sojo", "«Ministro de TRABAJO (Anguera de Sojo)»: 12 etiquetas, del 14-XI-1934 al 27-III-1935; la RAH titula «Josep Oriol Anguera de Sojo»", 3588),
    ("César Jalón Aragón", "Jalón", "«Ministro de COMUNICACIONES (Jalón)»: 7 etiquetas, en noviembre y diciembre de 1934", 23558),
    ("Carlos Masquelet Lacaci", "Masquelet", "«Ministro de la GUERRA (Masquelet)»: 2 etiquetas, en abril y mayo de 1936", 29131),
    ("Juan Moles Ormella", "Moles", "«Ministro de la GOBERNACIÓN (Moles)»: 2 etiquetas, en junio de 1936", 31444),
    ("Antonio Maura y Montaner", "Maura", "no es diputado de estas Cortes: lo cita Royo Villanova («como decía Maura», V2 57506)", 29034),
]


def escribir_md(filas: list[dict], destino: Path) -> None:
    from datetime import date
    E = Counter(f["estado"] for f in filas)
    nuc = [f for f in filas if f["nucleo"]]; EN = Counter(f["estado"] for f in nuc)
    rev = [f for f in filas if f["estado"] == "por revisar"]
    def lin(f):
        return f"| {f['rep_id']} | {f['rep_name_base']} | **{f['grafia']}** | {f['corto']} | {f['uso']} | {f['estado']} | {f['motivo'] or '—'} | " + (f"RAH {f['rah_nid']}" if f["rah_nid"] else "—") + " |"
    def pl(n, uno, varios):
        return f"{fmt(n)} {uno if n == 1 else varios}"
    cambios = [f for f in filas if [fold(x) for x in re.split(r"[\s\-]+", f["grafia"]) if fold(x) not in PARTS]
               != [fold(x) for x in re.split(r"[\s\-]+", f["rep_name_base"]) if fold(x) not in PARTS]]
    L = []
    A = L.append
    A("# Tabla de grafías · D-22")
    A("")
    A(f"**Dueño:** grupo de grafías. **Fecha:** {date.today().isoformat()}. **Estado:** propuesta para su revisión (D-22, contrato de construcción).")
    A("La tabla vive en `exportador/grafias.csv`; `exportador/modulos/base.py` la convierte en `src/data/grafias.json`.")
    A("La regenera `docs/grafias/construir_grafias.py`, con las fuentes descargadas en `docs/grafias/fuentes/`.")
    A("")
    A("## En una frase")
    A("")
    A(f"La base escribe los nombres sin tildes y con alguna errata; esta tabla da la grafía de los {fmt(len(filas))} diputados que hablan en la V2.")
    A(f"De esas grafías, {pl(E['confirmada'], 'está confirmada', 'están confirmadas')}, {pl(E['probable'], 'es probable', 'son probables')} y {pl(E['por revisar'], 'queda por revisar', 'quedan por revisar')}.")
    A(f"El núcleo que pedía el encargo son {fmt(len(nuc))} nombres: {fmt(EN['confirmada'])} grafías confirmadas, {fmt(EN['probable'])} probables y {fmt(EN['por revisar'])} por revisar.")
    A("")
    A("## Lo que le pedimos revisar")
    A("")
    A(f"### 1. Los {fmt(len(rev))} nombres por revisar")
    A("")
    A("| rep_id | la base | grafía propuesta | por qué hay duda |")
    A("|---|---|---|---|")
    for f in rev:
        A(f"| {f['rep_id']} | {f['rep_name_base']} | **{f['grafia']}** | {f['nota']} |")
    A("")
    A("### 2. Cuatro criterios, con la opción que aplicamos primero")
    A("")
    A("1. **Composición del nombre.** (a) La del Congreso, que es la de la base: «Clara Campoamor y Rodríguez», «Manuel Irujo Ollo».")
    A("   (b) La de uso actual, sin «y» entre apellidos y con el «de» que imprimen el Diario y la RAH: «Clara Campoamor Rodríguez», «Manuel de Irujo Ollo».")
    A("   Con (a), la columna `uso` ya da la forma de la primera mención en el copy («Clara Campoamor»).")
    A("   Pasar a (b) es una regla para la «y» y una lista para el «de».")
    A("   El Diario pone y quita ese «de» (Aguirre, Irujo, Leizaola, Madariaga, Zulueta, Jáuregui).")
    A("2. **Diputados catalanes, vascos y gallegos.** (a) El nombre de pila en la forma del Diario y del Congreso: «Luis Companys Jover», «Juan Ventosa Calvell».")
    A("   (b) La forma de la lengua propia, que usa la RAH: «Lluís Companys i Jover». Con (a), los apellidos llevan las tildes de su lengua (Cambó, Lluhí, Santaló) y la grave pasa a aguda, como la imprime el Diario («Juliá», «Vallescá»).")
    A("3. **Tildes que el Diario añade a apellidos catalanes.** (a) No se adoptan: «Campalans», «Nicolau», «Palau», «Xirau», «Romeu», aunque el Diario imprima a menudo «Campaláns» o «Xiráu».")
    A("   (b) Se adoptan, como imprime el Diario. Solo afecta a los casos anotados.")
    A("4. **Guiones.** (a) Los que imprime el Diario en la mayoría de los casos: «Alcalá-Zamora», «Ruiz-Funes», «Sánchez-Covisa», «Fernández-Osorio Tafall».")
    A("   (b) Los de la RAH: «Gil-Robles», «Sánchez-Albornoz», «Álvarez-Valdés», «Fernández Osorio Tafall». La tabla anota la variante en la fuente cuando la RAH difiere.")
    A("")
    A(f"### 3. Los {fmt(len(cambios))} nombres cuyas letras cambian respecto de la base")
    A("")
    A("No son tildes: son otra letra, otro apellido o un guion que une dos palabras.")
    A("")
    A("| rep_id | la base | grafía | estado |")
    A("|---|---|---|---|")
    for f in cambios:
        A(f"| {f['rep_id']} | {f['rep_name_base']} | **{f['grafia']}** | {f['estado']} |")
    A("")
    A("### 4. Erratas de la base que ha encontrado la tabla (para el autor)")
    A("")
    A("- **rep_id 836** (D-25). Es Amós Ruiz Lecina, pero 92 de sus 184 filas V2 llevan `rep_name` «Mariano Ruiz Funes Garcia».")
    A("  Esas filas son de Ruiz-Funes (rep_id 835). La tabla da a 836 la grafía de Ruiz Lecina; quien agrupe por `rep_id` debe separarlas por `rep_name`.")
    A("- **rep_id 956.** El Congreso y la base escriben «Trabal y Saus»; el Diario, «Trabal Sans» o «Trabal y Sans», nunca «Saus».")
    A("- **rep_id 135.** El Congreso y la base escriben «Bilbao Castellano»; el Diario imprime «Castellanos» en todas sus etiquetas.")
    A("- **V2 97389** (28-X-1935). «El Sr. BLASCO-IBANEZ:» no tiene `rep_id`; es, probablemente, Sigfrido Blasco-Ibáñez (rep_id 143), que en la base solo tiene 3 filas de 1931-1933.")
    A("")
    A("## Cómo se lee la tabla")
    A("")
    A("`exportador/grafias.csv`, separado por punto y coma, en UTF-8, una fila por `rep_id` (lo exige `base.py`).")
    A("")
    A("| columna | qué es |")
    A("|---|---|")
    A("| `rep_id` | El id del diputado en la V2 y en la v3 (el mismo en las dos). |")
    A("| `rep_name_base` | El `rep_name` de la base, tal cual. Los CSV del sitio lo conservan (D-22 a). |")
    A("| `grafia` | El nombre completo, con tildes, para el texto y los rótulos visibles. |")
    A("| `fuente` | De dónde sale: una fila del Diario con su etiqueta, las tildes que respalda, la ficha del Congreso y la biografía de la RAH. |")
    A("| `estado` | `confirmada`, `probable` o `por revisar` (abajo). |")
    A("| `corto` | Cómo lo rotula el Diario («Giménez Fernández», «Azaña», «Trifón Gómez»): para barras y notas emergentes. |")
    A("| `uso` | Nombre de pila más `corto` («Manuel Azaña», «Clara Campoamor»): para la primera mención en el copy. |")
    A("")
    A("`corto` y `uso` son dos columnas más que las del contrato. `base.py` las pasa a `grafias.json` sin cambios.")
    A("")
    A("**Los estados.**")
    A("- **confirmada:** la RAH tiene su biografía y sus letras y tildes coinciden con las del Diario; o el caso se ha decidido con las tres fuentes a la vista (anotado).")
    A("  La composición sigue siendo la del Congreso (criterio 1), aunque la RAH añada o quite un «y» o un «de».")
    A("- **probable:** sin biografía en la RAH; letras del Congreso y tildes del Diario (o de la ortografía en las mayúsculas).")
    A("- **por revisar:** las fuentes discrepan o la base tiene una errata. La propuesta dice cuál elegimos y por qué.")
    A("")
    A("**Las citas no se tocan.** Una cita del Diario conserva la grafía impresa: la fila V2 71330 atribuye «Luz y taquigrafos.» a «JIMÉNEZ FERNÁNDEZ», y así se cita.")
    A("Fuera de la cita, el sitio escribe «Giménez Fernández» (rep_id 456), la grafía confirmada.")
    A("")
    A("## Cómo se ha hecho")
    A("")
    A("**Fuentes.**")
    A(f"- **El Diario**: las etiquetas de orador de la V2 depositada (MD5 `{MD5_V2}`) y su texto corrido, más las filas de sumario y comentario de la v3 (sha256 `{SHA_V3[:8]}…`).")
    A("  Se cuentan todas las formas impresas de cada apellido, con y sin tilde.")
    A("- **El Congreso de los Diputados**, Histórico de diputados 1810-1977 (congreso.es/es/historico-diputados): las 1.449 fichas de las elecciones de 1931, 1933 y 1936, descargadas el 22-09-2026.")
    A("  Da la composición del nombre. Escribe en mayúsculas sin tildes, así que no decide ninguna tilde.")
    A("- **La Real Academia de la Historia**, Diccionario Biográfico electrónico (historia-hispanica.rah.es, antes dbe.rah.es), consultado el 22-09-2026.")
    A(f"  Tiene biografía de {fmt(sum(1 for f in filas if f['rah_nid']))} de los {fmt(len(filas))}. Se acepta solo si casan el primer nombre, los apellidos en orden y el año de nacimiento; se descartaron a mano cuatro homónimos.")
    A("")
    A("**Reglas.**")
    A("1. Composición: la de la ficha del Congreso. Partículas en minúscula («y», «e», «de», «del», «la», «da»).")
    A("2. Letras: las del Congreso, salvo que el Diario imprima otra cosa de forma abrumadora y la RAH o el texto lo confirmen. Cada caso va en la sección 3.")
    A("3. Tildes: la que el Diario imprime al menos en el 20 % de las apariciones del apellido en minúscula, o en el 5 % de sus etiquetas.")
    A("   La tilde tiene que ser posible en español: una tilde de ruido del reconocimiento óptico («Ortíz», «Siérra») no cuenta.")
    A("   La tipografía del Diario suprimía a menudo las tildes, así que su ausencia no prueba nada; su presencia, sí.")
    A("4. Si la RAH pone una tilde que el Diario también imprime, se adopta («Ibárruri»). Si discrepan de verdad, el nombre queda por revisar.")
    A("5. Mayúsculas: llevan la tilde de la ortografía actual («Álvarez», «Ángel», «Álvaro»), que el Diario no imprimía.")
    A("6. Nombres de pila: en la forma del Congreso y del Diario, con la tilde de la ortografía actual.")
    A("7. Guiones: los del Diario, si aparecen en la mayoría de sus etiquetas o de su texto.")
    A("")
    A("**Alcance.** El encargo pedía el núcleo: los 150 primeros en palabras sin Presidencia (V2 y v3), la Presidencia y la Mesa, el Gobierno, y los nombres de la narrativa y de las peticiones.")
    A(f"La tabla cubre los {fmt(len(filas))} de la V2 porque F30 (turno a turno), F05 y F07 pueden rotular a cualquiera.")
    A("Además, `valida_grafias` (en `exportar.py`) falla ante cualquier `rep_id` de `src/data/` sin entrada.")
    A("No incluye a quien no habla en la V2 (las personas de CGOCUS sin filas): `base.py` rechaza un `rep_id` que no esté en la V2 (D-22 b).")
    A("")
    A("## Respuesta a las peticiones (`peticiones/grafias_*.md`)")
    A("")
    A("Todos los `rep_id` pedidos están en la tabla. Las formas de las peticiones son, casi siempre, la columna `uso` o la `corto`.")
    A("Las diferencias:")
    A("- **Composición (criterio 1).** `grafias_explorador.md` pide «Clara Campoamor Rodríguez», «Joaquín Chapaprieta Torregrosa» y «Manuel de Irujo Ollo».")
    A("  La tabla da «Clara Campoamor y Rodríguez», «Joaquín Chapaprieta y Torregrosa» (el Diario imprime las dos formas, 12 y 12) y «Manuel Irujo Ollo».")
    A("  El Diario imprime más «Manuel de Irujo» (194 frente a 134). Si usted elige (b) en el criterio 1, las tres cambian.")
    A("  `grafias_cortes_b.md` escribe «Fernández-Osorio y Tafall», como el acta; la tabla, «Bibiano Fernández-Osorio Tafall» (Congreso), con `corto` «Fernández-Osorio».")
    A("- **Guion.** 50 va sin guion, «Melquíades Álvarez González Posada»: el Diario nunca lo pone («González Posada», 4) y la RAH tampoco.")
    A("- **«José Tomás y Piera»** (944), con «y», como piden `grafias_cortes_a.md` y `grafias_sesiones.md`: es la excepción al criterio 1, anotada en la tabla.")
    A("- **Diputados catalanes.** Forma castellana del Diario («Juan Estelrich Artigues», «José Antonio Trabal y Sans»), como proponen `grafias_explorador.md` y `grafias_cortes_b.md` (criterio 2).")
    A("- **Trabal** (956): la base dice «Saus»; la tabla corrige a «Sans», que es también lo que usa `grafias_cortes_b.md`. Queda por revisar.")
    A("- **Dionisio Cano López** es el `rep_id` 184 (Congreso «CANO LOPEZ, DIONISIO»), como ya dice `grafias_sesiones.md`.")
    A("- **Ibárruri** (441) y **Giménez Fernández** (456): las dos peticiones que las proponen coinciden con la tabla, que las da por confirmadas.")
    A("")
    A("Una vinculación dudosa que señala `grafias_cortes_a.md` y que la tabla no resuelve: V2 74696 («El Sr. VENTOSA», 9-X-1934) va a 994 (Ventosa Roig) y, por el contexto, parece de 993 (Ventosa Calvell). Es para el autor (D-25).")
    A("")
    A("## Nombres sin `rep_id`")
    A("")
    A("Ministros sin escaño que hablan en el Diario (sus filas V2 no tienen `rep_id`) y nombres citados que no son diputados de estas Cortes. No van en el CSV, porque `base.py` exige un `rep_id` de la V2.")
    A("")
    A("| grafía | corto | quién es | RAH |")
    A("|---|---|---|---|")
    for g, c, q, nid in SIN_REP_ID:
        A(f"| **{g}** | {c} | {q} | {nid} |")
    A("")
    A(f"## El núcleo ({fmt(len(nuc))} nombres)")
    A("")
    A("«Por qué está»: puesto en palabras sin Presidencia (V2 y v3), Presidencia o Mesa, Gobierno, narrativa o petición. Los demás, en el CSV.")
    A("")
    A("| rep_id | la base | grafía | corto | uso | estado | por qué está | RAH |")
    A("|---|---|---|---|---|---|---|---|")
    for f in nuc:
        A(lin(f))
    A("")
    A(f"## El resto ({fmt(len(filas) - len(nuc))} nombres)")
    A("")
    R = Counter(f["estado"] for f in filas if not f["nucleo"])
    A(f"Solo en `exportador/grafias.csv`: {fmt(R['confirmada'])} grafías confirmadas, {fmt(R['probable'])} probables y {fmt(R['por revisar'])} por revisar (van en la sección 1).")
    A("")
    A("## Regenerar")
    A("")
    A("```")
    A("python3 docs/grafias/construir_grafias.py --escribir")
    A("```")
    A("Comprueba las huellas de la V2 y la v3, recalcula la evidencia del Diario (unos dos minutos la primera vez; caché en `~/.cache/luz_site/grafias/`) y reescribe el CSV y este documento.")
    A("Las fichas del Congreso y los candidatos de la RAH están guardados en `docs/grafias/fuentes/`, con su fecha de consulta.")
    A("Las decisiones caso a caso están en el diccionario `DECISION` del constructor, cada una con su motivo.")
    destino.write_text("\n".join(L) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main("--escribir" in sys.argv)
