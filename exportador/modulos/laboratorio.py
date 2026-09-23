"""laboratorio · Los datos del laboratorio de palabras de Inicio (rediseño del 23-09-2026, docs/REDISENO_23-09.md).

Para cada término del vocabulario, sus apariciones por mes en la v3, contadas como las cuenta la Tendencia del
explorador: tokens del índice FTS5 (`unicode61 remove_diacritics 2`: sin tildes ni mayúsculas), sin variantes y sin
filtros, sobre todo el corpus. La densidad es por 10.000 tokens del mes, el denominador de la Tendencia
(`palabras.tendencia.v3`). Las expresiones de varias palabras cuentan como la frase exacta del buscador («"reforma
agraria"»): tokens seguidos.

El recuento se hace en Python con un tokenizador equivalente al del índice y se COMPRUEBA contra el propio índice:
el total de cada palabra, con `fts5vocab`; el de cada expresión, con las intervenciones que devuelve `MATCH`; y los
tokens de cada intervención, con `speeches_fts_docsize`. Si una sola cifra no cuadra, se para.

Vocabulario: las palabras más frecuentes sin las vacías del explorador (sus listas VACIAS y STOPWORDS_KEYNESS, que
se leen del motor), más las expresiones más frecuentes de la tabla `expresiones` del explorador y las que pide la
portada (SIEMPRE). La forma que se enseña es la más frecuente en el Diario («Cataluña», no «cataluna»).

Escribe `public/datos/laboratorio.json`, que la página carga la primera vez que alguien juega, y da las cifras `lab.*`.
Se puede ejecutar solo, sin la V2 ni el resto del exportador:
    python3 exportador/modulos/laboratorio.py [--db ~/.cache/luz_site/corpus.sqlite] [--salida public/datos]
"""
from __future__ import annotations

import collections
import hashlib
import json
import re
import sys
import unicodedata
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent))

from comun import exige  # noqa: E402

N_PALABRAS = 3000        # palabras del vocabulario (las más frecuentes, sin vacías)
N_EXPRESIONES = 400      # expresiones de la tabla del explorador, por frecuencia
MIN_LETRAS = 3
# Las que Inicio propone para empezar y las que cita la portada: van siempre, sean o no de las más frecuentes.
SIEMPRE = ["divorcio", "Cataluña", "reforma agraria", "Congregaciones", "Casas Viejas", "amnistía", "Asturias",
           "Frente Popular", "voto femenino", "voto de la mujer", "orden público", "estatuto de Cataluña",
           "Guardia Civil", "Iglesia", "paro", "fascismo", "jesuitas", "latifundios", "sufragio", "monarquía",
           "revolución", "huelga", "trigo"]
PORTADA = SIEMPRE[:8]    # las que el laboratorio propone al entrar, en este orden
UMBRAL_NORMAL = 100_000  # la Tendencia del explorador: por debajo, fiabilidad baja
UMBRAL_BAJA = 20_000     # por debajo, fiabilidad muy baja: no fija la escala
MOTOR = AQUI.parent / "motor" / "engine.js"


def _clase_token() -> str:
    """Letras y números (como `\\w` sin «_»), más las marcas Mn y el uso privado (Co), que `unicode61` también toma
    por parte del token: «Márilla», con la tilde suelta, es UN token («marilla»), no dos (fila v3 26648)."""
    tramos, ini = [], None
    for cp in range(0x110000):
        dentro = unicodedata.category(chr(cp)) in ("Mn", "Co")
        if dentro and ini is None:
            ini = cp
        elif not dentro and ini is not None:
            tramos.append((ini, cp - 1)); ini = None
    extra = "".join(re.escape(chr(a)) + ("-" + re.escape(chr(b)) if b > a else "") for a, b in tramos)
    return rf"(?:[^\W_]|[{extra}])+"


TOKEN = re.compile(_clase_token())


def pliega(s: str) -> str:
    """Como `unicode61 remove_diacritics 2`: minúsculas y sin marcas diacríticas («Cataluña» → «cataluna»)."""
    return "".join(c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn")


def vacias() -> set[str]:
    """VACIAS y STOPWORDS_KEYNESS del motor del explorador, plegadas."""
    t = MOTOR.read_text(encoding="utf-8", errors="replace")
    i = t.index("gen.vacias = congelar(") + len("gen.vacias = congelar(")
    j = t.index("});", i) + 1
    d = json.loads(t[i:j])
    return {pliega(w) for k in ("VACIAS", "STOPWORDS_KEYNESS") for w in d.get(k, [])}


def varints(blob: bytes) -> list[int]:
    """Los varint de SQLite de un blob de `*_docsize` (uno por columna)."""
    out, i = [], 0
    while i < len(blob):
        v = 0
        for k in range(9):
            b = blob[i]; i += 1
            if k == 8:
                v = (v << 8) | b
                break
            v = (v << 7) | (b & 0x7F)
            if not b & 0x80:
                break
        out.append(v)
    return out


def codifica(cuentas: list[int]) -> str:
    """Una serie mensual, compacta: enteros en base 36 separados por coma; los ceros, vacíos («,,3,»)."""
    return ",".join("" if n == 0 else _b36(n) for n in cuentas).rstrip(",")


def _b36(n: int) -> str:
    d = "0123456789abcdefghijklmnopqrstuvwxyz"
    s = ""
    while n:
        n, r = divmod(n, 36)
        s = d[r] + s
    return s


def exportar(ctx) -> dict:
    C: dict[str, dict] = {}
    db = ctx.v3_db()
    exige(db.execute("select sql from sqlite_master where name='speeches_fts'").fetchone()[0].find("remove_diacritics 2") > 0,
          "el índice FTS5 del explorador ya no usa `unicode61 remove_diacritics 2`: revise pliega()")

    def pon(k, v, t, f, **kw):
        exige(k not in C, f"cifra repetida en laboratorio: {k}")
        C[k] = ctx.cifra(v, t, "v3", f, **kw)

    # ── meses y tokens por mes (el denominador de la Tendencia) ─────────────────────────────────────────────────
    mes_de = {i: d[:7] for i, d in db.execute("select id, date from speeches")}
    tokens_doc = {i: varints(sz)[0] for i, sz in db.execute("select id, sz from speeches_fts_docsize")}
    exige(len(tokens_doc) == len(mes_de), "docsize y speeches no tienen las mismas filas")
    por_mes = collections.Counter()
    for i, n in tokens_doc.items():
        por_mes[mes_de[i]] += n
    meses = sorted(m for m, n in por_mes.items() if n > 0)
    idx = {m: k for k, m in enumerate(meses)}
    total_tokens = sum(por_mes.values())
    db.execute("create virtual table if not exists temp.voc_lab using fts5vocab(main, speeches_fts, 'row')")
    exige(total_tokens == db.execute("select sum(cnt) from temp.voc_lab").fetchone()[0],
          "los tokens de docsize no suman lo mismo que fts5vocab")

    # ── expresiones buscadas: las más frecuentes del explorador y las de SIEMPRE ───────────────────────────────
    vac = vacias()
    exprs: dict[tuple, str] = {}
    for forma, mostrar in db.execute("select forma, mostrar from expresiones where n_tokens >= 2 "
                                     "order by frecuencia desc, forma limit ?", (N_EXPRESIONES,)):
        exprs[tuple(TOKEN.findall(pliega(forma)))] = mostrar or forma      # «Casas Viejas», como lo enseña el explorador
    for w in SIEMPRE:
        toks = tuple(TOKEN.findall(pliega(w)))
        if len(toks) > 1:
            exprs[toks] = w                                                 # la grafía de SIEMPRE manda
    largos = sorted({len(k) for k in exprs})

    # ── una pasada por el texto: palabras y expresiones por mes, y las formas de cada palabra ────────────────────
    uni: dict[str, list[int]] = collections.defaultdict(lambda: [0] * len(meses))
    frase: dict[tuple, list[int]] = {k: [0] * len(meses) for k in exprs}
    frase_docs: dict[tuple, int] = collections.Counter()
    formas: dict[str, collections.Counter] = collections.defaultdict(collections.Counter)
    cache: dict[str, str] = {}
    for i, texto in db.execute("select id, speech from speeches"):
        crudos = TOKEN.findall(texto or "")
        pl = []
        for w in crudos:
            p = cache.get(w)
            if p is None:
                p = cache[w] = pliega(w)
            pl.append(p)
        exige(len(pl) == tokens_doc[i], f"fila v3 {i}: {len(pl)} tokens aquí y {tokens_doc[i]} en el índice")
        k = idx.get(mes_de[i])
        if k is None:
            continue
        for w, p in zip(crudos, pl):
            uni[p][k] += 1
            formas[p][w] += 1
        vistas = set()
        for L in largos:
            for a in range(len(pl) - L + 1):
                t = tuple(pl[a:a + L])
                if t in frase:
                    frase[t][k] += 1
                    vistas.add(t)
        for t in vistas:
            frase_docs[t] += 1

    # ── vocabulario ─────────────────────────────────────────────────────────────────────────────────────────────
    total = {p: sum(v) for p, v in uni.items()}
    elegibles = [p for p in total if len(p) >= MIN_LETRAS and not p.isdigit() and p not in vac]
    palabras = sorted(elegibles, key=lambda p: (-total[p], p))[:N_PALABRAS]
    for w in SIEMPRE:
        toks = TOKEN.findall(pliega(w))
        if len(toks) == 1 and toks[0] in total and toks[0] not in palabras:
            palabras.append(toks[0])

    # ── comprobaciones contra el índice ─────────────────────────────────────────────────────────────────────────
    fts = dict(db.execute("select term, cnt from temp.voc_lab"))
    malas = [p for p in palabras if fts.get(p) != total[p]]
    exige(not malas, f"{len(malas)} palabras no cuadran con fts5vocab, p. ej. {malas[:5]}")
    for t, forma in exprs.items():
        consulta = '"' + " ".join(t) + '"'
        n_fts = db.execute("select count(*) from speeches_fts where speeches_fts match ?", (consulta,)).fetchone()[0]
        exige(n_fts == frase_docs[t], f"«{forma}»: {frase_docs[t]} intervenciones aquí y {n_fts} con MATCH")

    def _forma_siempre(p: str) -> str:
        for w in SIEMPRE:
            if pliega(w) == p:
                return w
        return p

    terminos = {}
    for p in palabras:
        # La forma que se enseña: la más frecuente; si casi siempre va con mayúscula (nombres propios), con ella.
        f, n = formas[p].most_common(1)[0]
        mayus = sum(c for w, c in formas[p].items() if w[:1].isupper())
        forma = f if mayus > 0.8 * total[p] else f.lower()
        if p in {pliega(w) for w in SIEMPRE}:
            forma = _forma_siempre(p)
        terminos[p] = {"m": forma, "s": codifica(uni[p])}
    n_expr = 0
    for t, forma in exprs.items():
        if sum(frase[t]) == 0:
            continue
        clave = " ".join(t)
        terminos[clave] = {"m": forma, "s": codifica(frase[t])}
        n_expr += 1

    datos = {
        "_meta": {
            "que": "Apariciones por mes de cada término, como las cuenta la Tendencia del explorador",
            "base": "v3", "v3_sha256": ctx.huellas.get("v3_sha256"), "fecha": ctx.hoy,
            "medida": "apariciones del término (tokens del índice FTS5, sin tildes ni mayúsculas; las expresiones, "
                      "como frase exacta) y tokens del mes; densidad = apariciones / tokens × 10.000",
            "codigo": "cada serie son enteros en base 36 separados por comas, uno por mes de `meses`; vacío = 0",
            "umbral_normal": UMBRAL_NORMAL, "umbral_baja": UMBRAL_BAJA,
        },
        "propuestas": [" ".join(TOKEN.findall(pliega(w))) for w in PORTADA],
        "meses": meses,
        "tokens": [por_mes[m] for m in meses],
        "terminos": terminos,
    }
    ctx.escribir_texto("laboratorio.json", json.dumps(datos, ensure_ascii=False, separators=(",", ":")))
    pon("lab.palabras", len(palabras), "n", f"palabras del laboratorio: las {N_PALABRAS} más frecuentes sin vacías, más SIEMPRE")
    pon("lab.expresiones", n_expr, "n", "expresiones del laboratorio (tabla `expresiones` del explorador y SIEMPRE)")
    pon("lab.terminos", len(terminos), "n", "términos del laboratorio (palabras y expresiones)")
    pon("lab.meses", len(meses), "n", "meses con algún token en la v3")
    pon("lab.tokens", total_tokens, "n", "tokens del índice FTS5 (docsize); igual a palabras.tendencia.v3")
    if "palabras.tendencia.v3" in getattr(ctx, "dadas", {}):
        exige(ctx.dadas["palabras.tendencia.v3"]["v"] == total_tokens, "lab.tokens ≠ palabras.tendencia.v3")
    return C


# ── ejecución suelta: solo necesita el corpus del explorador ───────────────────────────────────────────────────────
class _CtxSuelto:
    def __init__(self, db: Path, salida: Path) -> None:
        import datetime as dt
        import sqlite3
        self._db = sqlite3.connect(f"file:{db}?mode=ro", uri=True)
        self.salida = salida
        self.hoy = dt.date.today().isoformat()
        h = hashlib.sha256()
        with open(db, "rb") as f:
            for trozo in iter(lambda: f.read(1 << 20), b""):
                h.update(trozo)
        self.huellas = {"v3_sha256": h.hexdigest()}
        self.dadas: dict = {}

    def v3_db(self):
        return self._db

    def cifra(self, v, t, base, f, clave="C", d=None, **extra):
        return {"v": v, "t": t, "base": base, "clave": clave, "f": f, "d": d or self.hoy, **extra}

    def escribir_texto(self, nombre: str, texto: str) -> Path:
        p = self.salida / nombre
        p.write_text(texto, encoding="utf-8")
        return p


if __name__ == "__main__":
    import argparse
    from comun import RAIZ, V3_DB
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--db", type=Path, default=V3_DB)
    ap.add_argument("--salida", type=Path, default=RAIZ / "public" / "datos")
    a = ap.parse_args()
    cifras = exportar(_CtxSuelto(a.db, a.salida))
    for k, c in cifras.items():
        print(f"{k:18} {c['v']:>12}   {c['f']}")
