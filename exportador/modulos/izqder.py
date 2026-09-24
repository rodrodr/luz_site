"""izqder · El juego «¿Izquierda o derecha?» de Método 07 (petición del investigador, 24-09-2026).

Una palabra y siete bancos, de EI a ED: ¿en cuál sonó más? Para cada palabra, las apariciones por cada 10.000 palabras
en las filas de cada ideología de la base, sin la Presidencia, sin SUMARIO ni COMENTARIOS y sin filas sin ideología.
Numerador: apariciones de la forma (con su plural) sobre el texto plegado (`comun.plegar`: sin tildes ni mayúsculas),
entre límites de palabra. Denominador: la suma de `nwords` de esas mismas filas. Si una palabra aparece menos de
100 veces, se para: con tan pocas, el máximo no dice nada.

Escribe `src/data/izqder.json`. Se puede ejecutar solo, sin el resto del exportador:
    python3 exportador/modulos/izqder.py [--db ~/.cache/luz_site/corpus.sqlite]
"""
from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent))

from comun import RAIZ, exige, plegar  # noqa: E402

EJE = ["EI", "I", "CI", "C", "CD", "D", "ED"]
# (clave, cómo se muestra, forma buscada sobre el texto plegado)
PALABRAS = [
    ("patria", "patria", r"patrias?"), ("iglesia", "Iglesia", r"iglesias?"), ("dios", "Dios", r"dios"),
    ("marxismo", "marxismo", r"marxismo"), ("religion", "religión", r"religion(?:es)?"),
    ("propiedad", "propiedad", r"propiedad(?:es)?"), ("cataluna", "Cataluña", r"cataluna"),
    ("monarquia", "monarquía", r"monarquia"), ("caciques", "caciques", r"caciqu(?:e|es|ismo)"),
    ("fascismo", "fascismo", r"fascismo"), ("trabajadores", "trabajadores", r"trabajador(?:es|as)?"),
    ("espana", "España", r"espana"),
]
PRESIDENCIA = re.compile(r"PRESIDEN", re.I)
NO_PRESIDENCIA = re.compile(r"CONSEJO|GOBIERNO|COMISI|REP[UÚ]BLICA", re.I)


def exportar(ctx) -> dict:
    db = ctx.v3_db()
    patron = re.compile(r"\b(?:" + "|".join(f"(?P<g{i}>{f})" for i, (_c, _e, f) in enumerate(PALABRAS)) + r")\b")
    n = [Counter() for _ in PALABRAS]
    palabras = Counter()
    for spk, ide, nw, texto in db.execute("SELECT speaker, ideology, nwords, speech FROM speeches WHERE speaker NOT IN ('SUMARIO', 'COMENTARIOS')"):
        if ide not in EJE or (PRESIDENCIA.search(spk or "") and not NO_PRESIDENCIA.search(spk or "")):
            continue
        palabras[ide] += nw or 0
        for m in patron.finditer(plegar(texto or "")):
            n[int(m.lastgroup[1:])][ide] += 1
    exige(all(palabras[e] > 0 for e in EJE), "izqder: una ideología sin palabras")
    salida, C = [], {}
    f = "corpus.sqlite › speech (plegado), nwords e ideology; sin la Presidencia"
    for (clave, etiqueta, forma), cuenta in zip(PALABRAS, n):
        total = sum(cuenta.values())
        exige(total >= 100, f"izqder: «{etiqueta}» aparece {total} veces; hacen falta 100")
        tasas = {e: round(cuenta[e] / palabras[e] * 10_000, 2) for e in EJE}
        maxima = max(EJE, key=lambda e: tasas[e])
        salida.append({"clave": clave, "palabra": etiqueta, "forma": forma, "total": total, "tasas": tasas, "max": maxima})
        for e in EJE:
            C[f"izqder.{clave}.{e}"] = ctx.cifra(tasas[e], "ratio", "v3", f"{f}: apariciones de «{forma}» por 10.000 palabras de las filas {e}")
    datos = {
        "_meta": {"base": "v3", "fuente": f, "fecha": ctx.hoy, "medida": "apariciones por cada 10.000 palabras (nwords) de las filas de cada ideología"},
        "eje": EJE, "palabras_por_ideologia": {e: palabras[e] for e in EJE}, "palabras": salida,
    }
    ctx.escribir_json("izqder.json", datos)
    return C


if __name__ == "__main__":
    import argparse
    from comun import V3_DB
    from erratas import _CtxSuelto
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--db", type=Path, default=V3_DB)
    ap.add_argument("--data", type=Path, default=RAIZ / "src" / "data")
    a = ap.parse_args()
    exportar(_CtxSuelto(a.db, a.data))
    import json
    for p in json.loads((a.data / "izqder.json").read_text(encoding="utf-8"))["palabras"]:
        print(f"{p['palabra']:14} {p['total']:6}  máx {p['max']:3}  " + "  ".join(f"{e}:{v}" for e, v in p["tasas"].items()))
