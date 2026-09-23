#!/usr/bin/env python3
"""Tests de rechazo de Inicio (plan § Plantilla A; narrativa §6): palabras de copy por movimiento, palabras de límites,
frases de más de 30 palabras y longitud de la descripción.

Lee `docs/copy_es/inicio.md` y `comun.md` con la misma partición en unidades que `copy2i18n.py`, resuelve los
marcadores con los valores esperados de `docs/marcadores/inicio.md` y cuenta. No escribe nada.

Uso:  python3 docs/marcadores/contar_inicio.py
"""
from __future__ import annotations

import re
from pathlib import Path

COPY = Path(__file__).resolve().parents[1] / "copy_es"
CLAVE = re.compile(r"^<!--\s*(↺\s*)?([A-Za-z0-9_.\-]+)\s*-->\s*(.*)$")
ROTULO = re.compile(r"^\*\*[^*]+\*\*$")


def unidades(md: str) -> dict[str, str]:
    fin = md.find("\n## Anexo A")
    lineas = (md if fin < 0 else md[:fin]).split("\n")
    out, actual, buf = {}, None, []
    for ln in lineas:
        s = ln.rstrip()
        m = CLAVE.match(s.strip())
        if m:
            if actual:
                out.setdefault(actual, "\n".join(buf).strip())
            actual, buf = m.group(2), ([m.group(3)] if m.group(3) else [])
            continue
        if s.startswith("#") or s.startswith(">") or s.strip() == "---" or ROTULO.match(s.strip()):
            if actual:
                out.setdefault(actual, "\n".join(buf).strip())
            actual, buf = None, []
            continue
        if actual:
            buf.append(s)
    if actual:
        out.setdefault(actual, "\n".join(buf).strip())
    return out


U = {}
for nombre in ("comun.md", "inicio.md"):
    if (COPY / nombre).exists():
        for k, v in unidades((COPY / nombre).read_text(encoding="utf-8")).items():
            U.setdefault(k, v)

LETRA = ["cero", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce",
         "trece", "catorce", "quince"]
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre",
         "noviembre", "diciembre"]
V = {  # valores esperados (docs/marcadores/inicio.md y comun.md)
    "filas.V2": 107551, "sesiones": 755, "sesion.primera": "1931-07-14", "sesion.ultima": "1945-11-09",
    "sesiones.tras_18jul": 14, "palabras.tras_18jul.pct": 0.008348, "fila.luz.id.V2": 71330, "fila.luz.id.v3": 80306,
    "fila.luz.nwords": 3, "voto.n": 6, "voto.161-121.si": 161, "voto.161-121.no": 121,
    "fila.presidencia.id.V2": 5423, "fila.presidencia.id.v3": 6078, "fila.presidencia.nwords": 7,
    "fila.campoamor.id.V2": 5424, "fila.campoamor.id.v3": 6079, "fila.campoamor.nwords": 1460,
    "sesion.1931-10-01-48.filas": 395, "sesion.1931-10-13-55.filas": 378, "sesion.1932-05-27-173.filas": 44,
    "sesion.1933-02-02-288.filas": 155, "sesion.1934-07-04-112.filas": 255, "sesion.1936-06-16-45.filas": 159,
    "sesion.1936-07-01-54.filas": 125, "sesion.1939-02-01-69.filas": 16, "puerta.mexico-1945.filas": 183,
    "puerta.mexico-1945.sesiones": 4, "explorador.gz.bytes": 111733652, "dv.csv.bytes": 165785782,
    "dv.version": "V2.0", "voto.listas.sesiones": 405,
}


def formato(clave: str, fmt: str) -> str:
    if clave not in V:
        return "X"
    v = V[clave]
    if fmt == "letra":
        return LETRA[v]
    if fmt == "fecha_larga":
        a, m, d = v.split("-")
        return f"{int(d)} de {MESES[int(m) - 1]} de {a}"
    if fmt == "peso":
        return f"{v / 1048576:.1f}".replace(".", ",") + " MB"
    if fmt == "peso_dec0":
        return f"{round(v / 1_000_000)} MB"
    if fmt == "peso0":
        return f"{round(v / 1048576)} MB"
    if fmt == "id" or isinstance(v, str):
        return str(v)
    if clave.endswith(".pct"):
        return f"{100 * v:.2f}".replace(".", ",") + " %"
    return f"{v:,}".replace(",", ".")


def texto(clave: str) -> str:
    t = U[clave]
    t = re.sub(r"\{\{([^}|]+)\|?([^}]*)\}\}", lambda m: formato(m.group(1).strip(), m.group(2).strip()), t)
    t = re.sub(r"\[(Ver|Abrir|Descargar|Unir)[^\]]*\]", "", t)  # los botones no cuentan
    return t.replace("**", "").replace("[", "").replace("]", "")


def palabras(s: str) -> int:
    return len([w for w in s.split() if re.search(r"\w", w)])


def frases(s: str) -> list[str]:
    return [f for f in re.split(r"(?<=[.!?:;])\s+(?=[«¿¡A-ZÁÉÍÓÚÑ0-9])", s) if f.strip()]


PUERTAS = ["sufragio-1931", "cuestion-religiosa-1931", "estatuto-1932", "casas-viejas-1933", "pistola-1934",
           "antesala-1936", "figueres-1939", "mexico-1945"]
BEATS = {
    "0 · Portada (con el pie del hemiciclo)": (["inicio.portada.pregunta", "inicio.portada.entrada", "comun.hemiciclo.pie"], 60),
    "1 · Tesis (con su pie y la credencial)": ([f"inicio.tesis.{k}" for k in
                                                ["grito", "grito.pie", "contexto", "inabarcable", "resolucion", "remate"]]
                                               + ["inicio.credencial"], 90),
    "2 · ¿Cuándo se reunieron las Cortes?": ([f"inicio.calendario.{k}" for k in
                                              ["titulo", "entrada", "como", "numeracion", "cotejo", "guerra", "palabras"]], 100),
    "3 · ¿Qué se decidía allí?": ([f"inicio.votaciones.{k}" for k in ["titulo", "entrada", "seleccion", "mujeres", "salvedad"]], 90),
    "4 · ¿Qué es una fila?": ([f"inicio.fila.{k}" for k in ["titulo", "presidencia", "presidencia.pie", "campoamor",
                                                          "campoamor.pie", "dos", "palabras", "leccion"]]
                              + ["comun.fija.ocr"], 90),
    "5 · ¿Qué sesión leo primero?": (["inicio.puertas.titulo", "inicio.puertas.entrada"]
                                    + [f"inicio.puertas.{p}.{c}" for p in PUERTAS for c in ["fecha", "que", "filas"]]
                                    + ["inicio.puertas.salvedad"], 110),
    "6 · ¿Qué no trae la base?": ([f"inicio.falta.{k}" for k in ["titulo", "entrada", "tema", "tono", "posicion", "voto",
                                                               "afinidades", "usted"]], 70),
    "7 · ¿Por dónde empiezo?": (["inicio.empezar.titulo", "comun.fija.formulario", "inicio.empezar.sin_programar",
                                 "comun.fija.explorador", "inicio.empezar.programar", "inicio.empezar.redes",
                                 "inicio.empezar.remate", "inicio.empezar.salvedad"], 90),
}
LIMITES = {  # clave: fragmento que es límite (None = la unidad entera)
    "inicio.tesis.inabarcable": "salvo lo que la Presidencia mandó borrar",
    "inicio.calendario.cotejo": None,
    "inicio.calendario.guerra": "y son extractos oficiales, no el Diario íntegro",
    "inicio.votaciones.salvedad": None,
    "comun.fija.ocr": None,
    "inicio.puertas.salvedad": None,
    "inicio.empezar.salvedad": None,
    "comun.fija.explorador": None,
}

total = total_lim = 0
larga = ("", 0)
print(f"{'movimiento':<44} {'palabras':>8} {'tope':>5} {'límites':>8}")
for nombre, (claves, tope) in BEATS.items():
    n = lim = 0
    for k in claves:
        t = texto(k)
        n += palabras(t)
        if k in LIMITES:
            lim += palabras(LIMITES[k] or t)
        for f in frases(t):
            if palabras(f) > larga[1]:
                larga = (f"{k}: {f}", palabras(f))
    total += n
    total_lim += lim
    print(f"{nombre:<44} {n:>8} {tope:>5} {lim:>8}{'   ← pasa su tope' if n > tope else ''}")
print(f"{'TOTAL':<44} {total:>8} {700:>5} {total_lim:>8} de 120")
print(f"\nFrase más larga ({larga[1]} palabras): {larga[0]}")
todas = [(k, f) for k in U if k.startswith(("inicio.", "comun.")) for f in frases(texto(k)) if palabras(f) > 30]
print("Frases de más de 30 palabras:", todas or "ninguna")
desc = texto("inicio.meta.descripcion")
print(f"Descripción: {len(desc)} caracteres (tope 155): {desc}")
