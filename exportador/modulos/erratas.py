"""erratas · El juego «Corrija al Diario» de Método 03 (petición del investigador, 24-09-2026).

Cada ronda es una fórmula de orador tal como la leyó la máquina, con la forma que debería decir y cuántas filas la
llevan en la base (corpus.sqlite del explorador, columna `speaker`, «Consta en el diario como»). Ninguna se inventa:
si una lectura no está en la base, o si la forma buena no es más frecuente que la dañada, se para. La última ronda es
una trampa: una forma que NO es errata («El señor PRESIDENTE:», como la escriben los extractos de 1938 y 1939 y las
sesiones de México), para que el lector vea que normalizar también es decidir.

Da además, para el remate del juego:
  · `formulas`: las fórmulas de orador distintas de la base (sin los rótulos SUMARIO y COMENTARIOS);
  · `presidencia.formas`: de cuántas maneras sale escrita «El Sr. PRESIDENTE:» (ella y las lecturas a distancia de
    edición ≤ 2: «El Sr, PRESIDENTE:», «El Sr. PERSIDENTE:»…), y en cuántas filas van esas lecturas dañadas.

Escribe `src/data/erratas.json`. Se puede ejecutar solo, sin el resto del exportador:
    python3 exportador/modulos/erratas.py [--db ~/.cache/luz_site/corpus.sqlite]
"""
from __future__ import annotations

import hashlib
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent))

from comun import exige  # noqa: E402

CANON = "El Sr. PRESIDENTE:"
# (clave, lo que leyó la máquina, lo que debería decir). El orden es el del juego: de la errata que se ve a la que
# engaña, y de la Presidencia a una diputada y un diputado.
RONDAS = [
    ("punto", "El Sr PRESIDENTE:", CANON),
    ("coma", "El Sr, PRESIDENTE:", CANON),
    ("ei", "Ei Sr. PRESIDENTE:", CANON),
    ("persidente", "El Sr. PERSIDENTE:", CANON),
    ("siete", "El Sr. PRESIDENT7E:", CANON),
    ("articulo", "La Sr. PRESIDENTE:", CANON),
    ("residente", "El Sr. RESIDENTE:", CANON),
    ("campoamor", "La Srta. COMPOAMOR:", "La Srta. CAMPOAMOR:"),
    ("gil_robles", "El Sr. QL ROBLES:", "El Sr. GIL ROBLES:"),
]
TRAMPA = ("senor", "El señor PRESIDENTE:")
RELLENO = ("SUMARIO", "COMENTARIOS")
DISTANCIA = 2


def _lev(a: str, b: str) -> int:
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]


def exportar(ctx) -> dict:
    db = ctx.v3_db()
    cuenta = dict(db.execute("SELECT speaker, COUNT(*) FROM speeches WHERE speaker IS NOT NULL GROUP BY speaker"))
    rondas = []
    for clave, mal, bien in RONDAS:
        exige(cuenta.get(mal, 0) >= 1, f"erratas: la lectura «{mal}» no está en la base")
        exige(cuenta.get(bien, 0) > cuenta.get(mal, 0), f"erratas: «{bien}» no es más frecuente que «{mal}»")
        rondas.append({"clave": clave, "mal": mal, "bien": bien, "filas": cuenta[mal], "filas_bien": cuenta[bien]})
    clave, forma = TRAMPA
    n = cuenta.get(forma, 0)
    tardias = db.execute("SELECT COUNT(*) FROM speeches WHERE speaker = ? AND date >= '1938-01-01'", (forma,)).fetchone()[0]
    # El remate dice «los extractos de 1938 y 1939 y las sesiones de México»: casi todas sus filas tienen que ser de ahí.
    exige(n >= 100 and tardias / n >= 0.95, f"erratas: «{forma}» ya no es la forma de los extractos tardíos ({tardias}/{n})")
    rondas.append({"clave": clave, "mal": forma, "bien": None, "filas": n, "filas_bien": None})

    formulas = sum(1 for s in cuenta if s not in RELLENO)
    variantes = {s: k for s, k in cuenta.items() if s != CANON and _lev(s, CANON) <= DISTANCIA}
    exige(all(r["mal"] in variantes for r in rondas if r["bien"] == CANON), "erratas: una ronda de la Presidencia no cuenta entre sus variantes")
    datos = {
        "_meta": {"base": "v3", "fuente": "corpus.sqlite del explorador, columna speaker", "huella": ctx.huellas["v3_sha256"][:12],
                  "fecha": ctx.hoy, "distancia": DISTANCIA},
        "formulas": formulas,
        "presidencia": {"canon": CANON, "filas": cuenta[CANON], "formas": 1 + len(variantes), "filas_danadas": sum(variantes.values())},
        "rondas": rondas,
    }
    ctx.escribir_json("erratas.json", datos)
    f = "corpus.sqlite › speeches.speaker"
    C = {
        "erratas.formulas": ctx.cifra(formulas, "n", "v3", f"{f}: valores distintos, sin {' ni '.join(RELLENO)}"),
        "erratas.presidencia.formas": ctx.cifra(1 + len(variantes), "n", "v3", f"{f}: «{CANON}» y los valores a distancia de edición ≤ {DISTANCIA}"),
        "erratas.presidencia.filas_danadas": ctx.cifra(sum(variantes.values()), "n", "v3", f"{f}: filas con un valor a distancia 1–{DISTANCIA} de «{CANON}»"),
    }
    for r in rondas:
        C[f"erratas.{r['clave']}.filas"] = ctx.cifra(r["filas"], "n", "v3", f"{f} = «{r['mal']}»")
    return C


class _CtxSuelto:
    def __init__(self, db: Path, data: Path) -> None:
        import datetime as dt
        import sqlite3
        self._db = sqlite3.connect(f"file:{db}?mode=ro", uri=True)
        self.data = data
        self.hoy = dt.date.today().isoformat()
        h = hashlib.sha256()
        with open(db, "rb") as fh:
            for trozo in iter(lambda: fh.read(1 << 20), b""):
                h.update(trozo)
        self.huellas = {"v3_sha256": h.hexdigest()}

    def v3_db(self):
        return self._db

    def cifra(self, v, t, base, f, clave="C", d=None, **extra):
        return {"v": v, "t": t, "base": base, "clave": clave, "f": f, "d": d or self.hoy, **extra}

    def escribir_json(self, nombre: str, datos) -> Path:
        from comun import volcar_json
        p = self.data / nombre
        p.write_text(volcar_json(datos), encoding="utf-8")
        return p


if __name__ == "__main__":
    import argparse
    from comun import RAIZ, V3_DB
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--db", type=Path, default=V3_DB)
    ap.add_argument("--data", type=Path, default=RAIZ / "src" / "data")
    a = ap.parse_args()
    for k, c in exportar(_CtxSuelto(a.db, a.data)).items():
        print(f"{k:34} {c['v']:>8}   {c['f']}")
