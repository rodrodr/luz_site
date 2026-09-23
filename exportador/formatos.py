"""Formatos de las cifras del sitio: la especificación que implementa `src/lib/cifras.ts` y su espejo en Python.

El exportador usa este espejo para tres cosas: comprobar los marcadores declarados en `docs/marcadores/*.md`
(su «valor esperado» está escrito como lo verá el lector), rellenar la columna `texto` de `procedencia.csv` y
escribir `src/data/formatos.json`, que lleva la especificación y una batería de pruebas (`pruebas`) para que
`cifras.ts` formatee EXACTAMENTE igual. Si cambia un formato, cambia aquí, se vuelve a exportar y la prueba de
`cifras.ts` lo detecta.

Tipos (`t`, contrato § Cifras, más `id` y `anio`, que `src/lib/cifras.ts` ya admite): n · pct · peso · fecha · texto
· id · anio.
  n      número. Entero con separador de miles SIEMPRE (D-16: «1.460»). Con decimales, `dec` (por defecto 1).
  id     entero que NUNCA se agrupa (D-16): ids de fila, números de sesión, del Diario o de página («71330», «1347»).
  anio   año, sin agrupar («1931»).
  pct    FRACCIÓN entre 0 y 1 (como ParlaIbero). Se imprime ×100 con `dec` decimales (2 por defecto) y, en
         español, espacio indivisible antes de «%»: «0,83 %». En inglés, «0.83%».
  peso   bytes. Se imprime en la unidad de Harvard Dataverse: bytes / 1.024², rotulado MB, con `dec` decimales
         (1 por defecto): «158,1 MB». Por debajo de 1 MB, KB; desde 1.024 MB, GB.
  fecha  «AAAA-MM-DD» (o «AAAA-MM» para un mes). Por defecto, fecha larga: «1 de octubre de 1931».
  texto  cadena tal cual (o {es, en}).

Formatos del marcador (`{{clave|formato}}`), que mandan sobre el tipo:
  |n  |id  |letra  |pct  |pct0 |pct1 |pct2  |peso  |peso0 |peso1 |peso2  |fecha  |fecha_corta  |mes  |anio  |texto
"""
from __future__ import annotations

import datetime as dt
import re

NBSP = "\u00a0"
MESES = {
    "es": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre",
           "noviembre", "diciembre"],
    "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
           "November", "December"],
}
ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
LETRA = {
    "es": ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce",
           "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
           "veintiuna", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete",
           "veintiocho", "veintinueve", "treinta"],
    "en": ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
           "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
           "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven",
           "twenty-eight", "twenty-nine", "thirty"],
}
TIPOS = ("n", "pct", "peso", "fecha", "texto", "id", "anio")
BASES = ("V2", "v3", "proyecto", "afin", "dv", "explorador", "croquis")
CLAVES_FUENTE = {
    "C": "recuento directo sobre la base (filas, palabras, claves de sesión)",
    "CALC": "aritmética sobre otras cifras de este archivo (porcentajes, sumas, diferencias)",
    "L": "lectura: filas leídas una a una; el exportador comprueba en cada ejecución que siguen diciendo lo mismo",
    "M": "metadato leído tal cual en su archivo de origen (API de Dataverse, manifiesto del explorador, sessions.json)",
    "R": "regla fijada por el plan (cortes de etapa, límites de un tramo)",
}
FORMATOS = {
    "n": "número con el formato de su tipo (por defecto)",
    "id": "entero SIN separador de miles: ids de fila, números de sesión, años («71330»)",
    "letra": "número en palabras (0–30), en femenino en español («seis votaciones», «una sesión»)",
    "pct": "porcentaje con los decimales de la cifra (`dec`, 2 por defecto)",
    "pct0": "porcentaje sin decimales", "pct1": "porcentaje con un decimal", "pct2": "porcentaje con dos decimales",
    "peso": "peso con los decimales de la cifra (`dec`, 1 por defecto): «158,1 MB»",
    "peso0": "peso sin decimales: «unos 107 MB»", "peso1": "peso con un decimal", "peso2": "peso con dos decimales",
    "fecha": "fecha larga: «1 de octubre de 1931» · «1 October 1931»",
    "fecha_corta": "fecha con el mes en romanos, como en el Diario y en este sitio: «1-X-1931»",
    "mes": "mes y año: «octubre de 1931» · «October 1931»",
    "anio": "solo el año, sin agrupar: «1931»",
    "texto": "el valor tal cual",
}


def _sep(s: str, lang: str) -> str:
    """Convierte «1,234.5» (formato de Python) al separador de la lengua."""
    if lang == "es":
        return s.replace(",", "\u0001").replace(".", ",").replace("\u0001", ".")
    return s


def entero(x, lang: str = "es", agrupa: bool = True) -> str:
    n = int(round(float(x)))
    return _sep(f"{n:,}", lang) if agrupa else str(n)


def decimal(x, lang: str = "es", dec: int = 1) -> str:
    return _sep(f"{float(x):,.{dec}f}", lang)


def pct(v, lang: str = "es", dec: int = 2) -> str:
    return decimal(100 * float(v), lang, dec) + (NBSP + "%" if lang == "es" else "%")


def peso(b, lang: str = "es", dec: int = 1) -> str:
    b = float(b)
    mb = b / 1024 ** 2
    if mb >= 1024:
        return decimal(mb / 1024, lang, dec) + NBSP + "GB"
    if mb < 1:
        return decimal(b / 1024, lang, dec) + NBSP + "KB"
    return decimal(mb, lang, dec) + NBSP + "MB"


def _fecha(v) -> dt.date:
    s = str(v)
    return dt.date.fromisoformat(s if len(s) == 10 else s + "-01")


def fecha_larga(v, lang: str = "es") -> str:
    d = _fecha(v)
    if lang == "es":
        return f"{d.day} de {MESES['es'][d.month - 1]} de {d.year}"
    return f"{d.day} {MESES['en'][d.month - 1]} {d.year}"


def fecha_corta(v, lang: str = "es") -> str:
    d = _fecha(v)
    return f"{d.day}-{ROMANOS[d.month - 1]}-{d.year}"


def mes(v, lang: str = "es") -> str:
    d = _fecha(v)
    return f"{MESES['es'][d.month - 1]} de {d.year}" if lang == "es" else f"{MESES['en'][d.month - 1]} {d.year}"


def formatear(c: dict, fmt: str = "", lang: str = "es") -> str:
    """Texto de una cifra `{v, t, dec?}` con el formato del marcador (vacío: el de su tipo)."""
    v, t = c["v"], c["t"]
    fmt = (fmt or "").strip()
    if isinstance(v, dict):
        v = v.get(lang, v.get("es"))
    if fmt == "texto" or t == "texto":
        return str(v)
    if fmt == "letra" and isinstance(v, (int, float)) and float(v).is_integer() and 0 <= int(v) < len(LETRA[lang]):
        return LETRA[lang][int(v)]
    if fmt in ("id", "anio") or (t in ("id", "anio") and fmt in ("", "n")):
        return str(_fecha(v).year) if (fmt == "anio" and t == "fecha") else str(int(v))
    if fmt in ("fecha", "fecha_larga") or (t == "fecha" and fmt in ("", "n")):
        return fecha_larga(v, lang)
    if fmt == "fecha_corta":
        return fecha_corta(v, lang)
    if fmt == "mes":
        return mes(v, lang)
    m = re.fullmatch(r"(peso|pct)(\d)?", fmt)
    if m or t in ("peso", "pct"):
        tipo = m.group(1) if m else t
        dec = int(m.group(2)) if (m and m.group(2)) else int(c.get("dec", 1 if tipo == "peso" else 2))
        return peso(v, lang, dec) if tipo == "peso" else pct(v, lang, dec)
    if t == "n" or fmt == "n":
        if isinstance(v, float) and not v.is_integer():
            return decimal(v, lang, int(c.get("dec", 1)))
        return entero(v, lang, True)
    return str(v)


# Batería que `cifras.ts` debe reproducir carácter a carácter (va en src/data/formatos.json › pruebas).
PRUEBAS = [
    ({"v": 107551, "t": "n"}, ""), ({"v": 1460, "t": "n"}, ""), ({"v": 755, "t": "n"}, ""),
    ({"v": 71330, "t": "id"}, ""), ({"v": 71330, "t": "n"}, "id"), ({"v": 1931, "t": "anio"}, ""), ({"v": 6, "t": "n"}, "letra"),
    ({"v": 1, "t": "n"}, "letra"), ({"v": 0.008348, "t": "pct"}, ""), ({"v": 0.4485, "t": "pct", "dec": 2}, ""),
    ({"v": 0.513, "t": "pct", "dec": 1}, ""), ({"v": 0.6653, "t": "pct"}, "pct0"),
    ({"v": 165785782, "t": "peso"}, ""), ({"v": 111733652, "t": "peso"}, "peso0"),
    ({"v": 282316800, "t": "peso"}, ""), ({"v": 14919, "t": "peso"}, ""), ({"v": 12884901888, "t": "peso"}, ""),
    ({"v": "1931-10-01", "t": "fecha"}, ""), ({"v": "1931-10-01", "t": "fecha"}, "fecha_corta"),
    ({"v": "1933-02", "t": "fecha"}, "mes"), ({"v": "1945-11-09", "t": "fecha"}, "anio"),
    ({"v": 24335896.0, "t": "n"}, ""), ({"v": 44.5, "t": "n", "dec": 1}, ""),
    ({"v": "CGOCUS V1.1", "t": "texto"}, ""),
]


def especificacion() -> dict:
    """Contenido de `src/data/formatos.json` (sin las familias, que añade exportar.py)."""
    pruebas = []
    for c, f in PRUEBAS:
        pruebas.append({**c, "fmt": f, "es": formatear(c, f, "es"), "en": formatear(c, f, "en")})
    return {
        "version": 1,
        "tipos": {
            "n": "número; entero agrupado siempre (D-16); decimal con `dec` (1 por defecto)",
            "id": "entero que nunca se agrupa: ids de fila, números de sesión, del Diario o de página",
            "anio": "año, sin agrupar",
            "pct": "fracción 0–1; ×100 con `dec` decimales (2 por defecto); es: espacio indivisible + «%»",
            "peso": "bytes; bytes/1.024² rotulado MB con `dec` decimales (1 por defecto); KB bajo 1 MB, GB desde 1.024 MB",
            "fecha": "AAAA-MM-DD (o AAAA-MM); por defecto fecha larga",
            "texto": "cadena tal cual, o {es, en}",
        },
        "formatos": FORMATOS,
        "campos": {
            "v": "valor", "t": "tipo", "base": "V2 | v3 | proyecto | afin | dv | explorador | croquis",
            "clave": "letra de fuente (ver claves_de_fuente)", "f": "fórmula o fuente legible", "d": "fecha de cálculo o de consulta",
            "dec": "decimales (opcional)",
            "n": "numerador (opcional, en porcentajes)", "den": "denominador (opcional, en porcentajes)",
        },
        "bases": list(BASES),
        "claves_de_fuente": CLAVES_FUENTE,
        "separadores": {"es": {"miles": ".", "decimal": ",", "pct": NBSP + "%"}, "en": {"miles": ",", "decimal": ".", "pct": "%"}},
        "pruebas": pruebas,
    }


# ── lectura de un «valor esperado» escrito como lo ve el lector ─────────────────────────────────────────────────

def _limpia(s: str) -> str:
    return re.sub(r"[\s   ]+", " ", str(s)).strip().strip("«»\"'`").strip().lower()


PALABRA_NUM = {w: n for lang in LETRA for n, w in enumerate(LETRA[lang])}
PALABRA_NUM.update({"un": 1, "uno": 1})


def _numeros(texto: str) -> list[tuple[float, int, str | None]]:
    """Números escritos en la celda, con sus decimales y su unidad: «5.515.047 (5,3 MB)» → [(5515047, 0, None),
    (5.3, 1, 'mb')]. «1.460» es mil cuatrocientos sesenta (punto de miles); «6.95», seis con noventa y cinco."""
    out = []
    for m in re.finditer(r"(?<![\w\-])(\d[\d.,]*)(?:\s*(%|mb|kb|gb)\b|\s*(%))?", texto.lower()):
        t, unidad = m.group(1).rstrip(".,"), m.group(2) or m.group(3)
        if "," in t and "." in t:
            t = t.replace(".", "").replace(",", ".")
        elif "," in t:
            t = t.replace(",", ".") if t.count(",") == 1 and len(t.split(",")[1]) != 3 or t.startswith("0,") else t.replace(",", "")
        elif t.count(".") > 1:
            t = t.replace(".", "")
        elif "." in t and len(t.split(".")[1]) == 3 and not t.startswith("0."):
            t = t.replace(".", "")
        try:
            out.append((float(t), len(t.split(".")[1]) if "." in t else 0, unidad))
        except ValueError:
            pass
    for w in re.findall(r"«([a-záéíóúñ\- ]+)»", texto.lower()):
        if w.strip() in PALABRA_NUM:
            out.append((float(PALABRA_NUM[w.strip()]), 0, None))
    return out


def coincide(c: dict, celda: str, fmt: str = "") -> tuple[bool | None, str]:
    """¿Dice la celda «valor esperado» lo mismo que la cifra? Devuelve (sí · no · None = no comprobable, texto calculado).

    Los grupos escriben el valor de varias maneras: el texto que verá el lector («158,1 MB», «0,83 %», «seis»), el valor
    crudo («165785782», «0,0083484», «14.919» bytes), el porcentaje ×100 («6.95») o las dos cosas («107551 → «107.551»»).
    Se exige que TODO número escrito en la celda sea una lectura correcta de la cifra a la precisión con que se escribió,
    o que el texto citado sea exactamente el que imprime `cifras.ts`. Una fecha se acepta en cualquiera de sus formas.
    Una celda que dice que el valor es el de la ejecución («(la de la exportación)») no se compara."""
    calculado = formatear(c, fmt, "es")
    bruto = str(celda).strip()
    if _limpia(bruto) in ("", "—", "-", "varía", "variable"):
        return True, calculado
    if re.search(r"\((?:[^)]*)(exportaci|ejecuci|\bhoy\b|var[ií]a)", bruto, re.I):
        return True, calculado
    v, t = c["v"], c["t"]
    citas = [x.strip() for x in re.findall(r"«([^»]*)»", bruto) + re.findall(r"`([^`]*)`", bruto)]
    texto_calc = _limpia(calculado)

    def igual_texto(e: str) -> bool:
        e = _limpia(e)
        if "…" in e:  # cita parcial: los trozos, en orden, anclados si no empiezan o acaban en «…»
            pos, trozos = 0, e.split("…")
            for k, tr in enumerate(trozos):
                tr = tr.strip()
                if tr:
                    j = texto_calc.find(tr, pos)
                    if j < 0 or (k == 0 and j != 0):
                        return False
                    pos = j + len(tr)
            return not trozos[-1].strip() or texto_calc.endswith(trozos[-1].strip())
        return e == texto_calc
    if t == "texto":
        if any(igual_texto(x) for x in citas) or igual_texto(bruto):
            return True, calculado
        return (False if citas else None), calculado
    if t == "fecha":
        formas = set()
        for f in ("fecha", "fecha_corta", "mes", "anio", "texto"):
            try:
                formas.add(_limpia(formatear(c, f, "es")))
            except (ValueError, TypeError):
                pass
        trozos = [x for x in re.split(r"→|\(|\)|·", bruto) if x.strip()] + citas
        vistos = [x for x in trozos if re.search(r"\d", x)]
        return (bool(vistos) and all(_limpia(x) in formas for x in vistos)), calculado
    # numérica: n · id · anio · pct · peso
    if igual_texto(bruto) or (any(igual_texto(x) for x in citas) and not _numeros(re.sub(r"«[^»]*»", "", bruto))):
        return True, calculado
    nums = _numeros(bruto)
    if _limpia(bruto) in PALABRA_NUM:
        nums.append((float(PALABRA_NUM[_limpia(bruto)]), 0, None))
    if not nums:
        return (True if any(igual_texto(x) for x in citas) else None), calculado
    x = float(v)

    def lectura(val: float, dec: int, unidad: str | None) -> bool:
        if t == "pct":
            if unidad == "%":
                return round(100 * x, dec) == round(val, dec)
            return round(x, dec) == round(val, dec) or round(100 * x, dec) == round(val, dec)
        if t == "peso":
            if unidad in ("kb", "mb", "gb"):
                return round(x / {"kb": 1024, "mb": 1024 ** 2, "gb": 1024 ** 3}[unidad], dec) == round(val, dec)
            return unidad is None and x == val
        return unidad is None and round(x, dec) == round(val, dec)
    ok = all(lectura(*n) for n in nums)
    return ok, calculado
