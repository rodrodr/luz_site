#!/usr/bin/env python3
"""Claves de figura en `procedencia.csv` (petición del pulidor, 23-09-2026; hallazgo D11 de la crítica de la fase 2).

Las cifras del copy salen de `src/data/cifras.json` y ya tienen su fila en `procedencia.csv`. Las que pintan las figuras
(ejes, tablas, rótulos: `F10.*`, `F27.fila.*`, `familias.etapa.*`, `fig.F32.*`, `bibliotecas.json › …`) las calculan
los componentes a partir de los archivos de datos que escribe el exportador, y cada una sale en la página con su
envoltorio auditable (`<data class="cifra" value=… data-k=… data-base=…>`). Este paso las recoge de la compilación y
les da su fila: valor, tipo, base, archivo de datos y figura. No calcula nada: PROYECTA lo que la página ya enseña.

Se ejecuta DESPUÉS de `astro build` (va en `npm run publicar`): reescribe las filas `figura:*` de
`public/datos/procedencia.csv|xlsx` y de su copia en `dist/datos/`. El exportador conserva esas filas al exportar
(`exportar.py › escribe_salidas`), así que una exportación sin compilar no las pierde; la siguiente compilación las
pone al día.

Una clave suele ser un valor (`F27.fila.3.V2`). Algunas nombran un CAMPO que la figura repite en cada fila
(`redes.json › 1931.grado`, `bibliotecas.json › sesión.entradas`, `meses.csv`): esas llevan una sola fila, sin valor,
con cuántos valores distintos pinta la página y su intervalo.

Puertas (con --estricto fallan; sin él, avisan):
  · una clave de figura que no casa con ninguna familia de FAMILIAS (una figura nueva tiene que declarar su fuente);
  · una clave sin data-base, o con dos bases distintas.

Uso:  python3 exportador/claves_figura.py [--estricto] [--dist dist]
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent
PUB_DATOS = RAIZ / "public" / "datos"
CIFRAS = RAIZ / "src" / "data" / "cifras.json"
SELLO = RAIZ / "src" / "data" / "sello.json"
CABECERA = ["cifra", "valor", "tipo", "base", "clave", "fuente", "fecha", "texto", "modulo"]

# Familia de claves → (figura, o «tabla», «plantilla» o «pie» si no es una figura; archivo de datos de src/data/; cómo
# se obtiene). El orden importa: gana la primera.
FAMILIAS: list[tuple[str, str, str, str]] = [
    (r"^F10\.", "F10", "longitud.json", "barras de longitud de las filas por tramo de palabras y legislatura (FigLongitud)"),
    (r"^longitud\.json › ", "F10", "longitud.json", "eje y tramo de la figura de longitud (FigLongitud)"),
    (r"^F12\.", "F12", "despiece.json", "filas largas despiezadas: id y palabras en la V2, piezas en la v3 (FigDespiece)"),
    (r"^F27\.", "F27", "diario.json", "filas de «luz y taquígrafos» en la cronología: id V2 y v3 de cada cita (FigCronologia)"),
    (r"^F28\.", "F28", "diario.json", "órdenes de no constar en el Diario: id V2 y v3 de cada fila (FigCronologia)"),
    (r"^bibliotecas\.json › ", "F17", "bibliotecas.json", "bibliotecas del explorador: entradas y oradores (FigBibliotecas)"),
    (r"^busquedas\.json › ", "F29", "busquedas.json", "búsquedas de muestra en la v3: resultados fuera de la muestra (FigBusquedas)"),
    (r"^busqueda\.", "F29", "busquedas.json", "búsquedas de muestra en la v3: resultados (FigBusquedas)"),
    (r"^cruces\.json › ", "F22", "afinidades/cruces.json", "cruce entre bloques por legislatura en CGOCUS V1.1 (FigCruces)"),
    (r"^redes\.json › ", "F21", "afinidades/redes.json", "redes de coautoría de CGOCUS V1.1: nodos por ideología y grado de cada diputado de la tabla (FigRed)"),
    (r"^familias\.etapa\.", "F09", "familias_etapa.json", "filas y palabras de cada familia de partidos por etapa (FigFamilias)"),
    (r"^oradores\.etapa\.", "F05", "oradores_etapa.json", "los diez oradores con más palabras de cada etapa (FigOradores)"),
    (r"^fig\.F07\.", "F07", "quien_habla.json", "quién habla más según la edición: filas y palabras en la V2 y la v3 (FigEdiciones)"),
    (r"^fig\.F18\.", "F18", "destino_filas.json", "adónde va cada fila de la V2 en la v3 (FigDestino)"),
    (r"^fig\.F25\.", "F25", "fechas_corregidas.json", "sesiones con la fecha corregida de la V1 a la V2 (FigLinea)"),
    (r"^fig\.F32\.", "F32", "columnas.json", "valores distintos y vacíos de cada columna del CSV (FigColumnas)"),
    (r"^fig\.F33\.", "F33", "palabras.json", "recuentos de palabras según el filtro (FigRecuentos)"),
    (r"^fig\.F34\.", "F34", "union.json", "unión de las filas con CGOCUS por diputado (FigUnion)"),
    (r"^puertas\.turnos\.", "F30", "puertas.json", "turnos de cada sesión de las puertas (FigTurnos)"),
    (r"^voto\.", "F26", "votaciones.json", "votaciones nominales: fecha y sesión (FigVotaciones)"),
    (r"^f01\.", "F01", "calendario.json", "clases de la escala del calendario (FigCalendario)"),
    (r"^(sesion|mes)\.", "plantilla", "sesiones.json · meses.json", "campo de una sesión o de un mes (calendarios, fichas y puertas)"),
    (r"^dv\.thqcmi\.", "tabla", "depositos.json", "versiones y archivos depositados de THQCMI en Dataverse (instantánea del exportador)"),
    (r"^edicion_pagina$", "pie", "src/config/enlaces.ts", "edición de las páginas (PENDIENTES_DEL_INVESTIGADOR)"),
    (r"^meses\.csv$", "F01", "meses.json", "celda de la tabla del calendario, la misma que public/datos/meses.csv (FigCalendario)"),
    (r"^presidencia_gobierno\.csv$", "F16", "sesiones.json", "celda de la tabla de Presidencia y Gobierno, la misma que public/datos/presidencia_gobierno.csv"),
    (r"^[a-z_]+\.csv$", "tabla", "public/datos/", "celda de la tabla Datos de una figura, la misma que su CSV"),
]


VACIAS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class Cosecha(HTMLParser):
    """Recoge cada elemento con `data-k` (su valor, su base y su texto visible)."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.pila: list[dict] = []
        self.hallados: list[dict] = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "data-k" in a:
            self.pila.append({"k": a["data-k"], "v": a.get("value"), "base": a.get("data-base"), "texto": "", "tag": tag})
        elif self.pila and tag not in VACIAS:
            self.pila[-1].setdefault("hondo", 0)
            self.pila[-1]["hondo"] += 1

    def handle_endtag(self, tag):
        if not self.pila:
            return
        top = self.pila[-1]
        if top.get("hondo"):
            top["hondo"] -= 1
            return
        if tag == top["tag"]:
            self.hallados.append(self.pila.pop())

    def handle_data(self, data):
        for x in self.pila:
            x["texto"] += data


def tipo_de(clave: str, valor: str, texto: str) -> str:
    if re.search(r"\.(fecha|desde|hasta)$", clave) or re.fullmatch(r"\d{4}-\d{2}-\d{2}", valor or ""):
        return "fecha"
    if re.search(r"(\.V2|\.v3|\.id|v3id\.\d+|\.rep\.\d+|\.sesion)$", clave):
        return "id"
    if "%" in texto:
        return "pct"
    if re.fullmatch(r"-?\d+", valor or ""):
        return "n"
    if re.fullmatch(r"-?\d+\.\d+", valor or ""):
        return "n"
    return "texto"


def cosecha(dist: Path, cifras: set[str]) -> tuple[dict[str, dict], list[str], list[str]]:
    claves: dict[str, dict] = {}
    fallos, avisos = [], []
    for html in sorted((dist / "es").rglob("*.html")):
        p = Cosecha()
        p.feed(html.read_text(encoding="utf-8"))
        rel = str(html.relative_to(dist))
        for h in p.hallados:
            k = h["k"]
            if k in cifras:
                continue
            valor = h["v"] if h["v"] not in (None, "") else h["texto"].strip()
            texto = re.sub(r"\s+", " ", h["texto"]).strip()
            if not h["base"]:
                fallos.append(f"{rel}: [data-k=«{k}»] sin data-base")
                continue
            if k in claves:
                c = claves[k]
                if c["base"] != h["base"]:
                    fallos.append(f"«{k}» lleva la base «{c['base']}» en {c['paginas'][0]} y «{h['base']}» en {rel}")
                c["valores"].setdefault(valor, texto)
                if rel not in c["paginas"]:
                    c["paginas"].append(rel)
                continue
            claves[k] = {"valor": valor, "base": h["base"], "texto": texto, "paginas": [rel], "valores": {valor: texto}}
    for k, c in claves.items():
        fam = next((f for f in FAMILIAS if re.search(f[0], k)), None)
        if fam is None:
            fallos.append(f"«{k}» ({c['paginas'][0]}) no casa con ninguna familia de claves_figura.py › FAMILIAS")
            continue
        c["figura"], c["archivo"], c["como"] = fam[1], fam[2], fam[3]
    return claves, fallos, avisos


def filas_de(claves: dict[str, dict], fecha: str) -> list[list]:
    out = []
    for k in sorted(claves):
        c = claves[k]
        if "figura" not in c:
            continue
        paginas = ", ".join(p.removesuffix("index.html").rstrip("/") or "es" for p in c["paginas"][:3])
        mas = f" y {len(c['paginas']) - 3} más" if len(c["paginas"]) > 3 else ""
        archivo = c["archivo"] if "/" in c["archivo"] and not c["archivo"].startswith("afinidades/") else f"src/data/{c['archivo']}"
        fuente = f"{c['como']}; {archivo} · en {paginas}{mas}"
        tipo = tipo_de(k, c["valor"], c["texto"])
        valor, texto = c["valor"], c["texto"]
        if len(c["valores"]) > 1:   # un campo: una fila por clave, con su intervalo
            nums = sorted((float(v), v) for v in c["valores"] if re.fullmatch(r"-?\d+(\.\d+)?", v or ""))
            valor = ""
            texto = f"{len(c['valores'])} valores distintos" + (f", de {c['valores'][nums[0][1]]} a {c['valores'][nums[-1][1]]}"
                                                                 if len(nums) == len(c["valores"]) else "")
            fuente = "campo que la figura repite en cada fila: " + fuente
        out.append([k, valor, tipo, c["base"], "FIG", fuente, fecha, texto, f"figura:{c['figura']}"])
    return out


def reescribe(destino: Path, figuras: list[list]) -> int:
    """Sustituye las filas `figura:*` de `procedencia.csv` (y de su .xlsx gemelo) por las de esta cosecha."""
    csv_p = destino / "procedencia.csv"
    if not csv_p.exists():
        return 0
    filas = list(csv.reader(io.StringIO(csv_p.read_text(encoding="utf-8"))))
    cab, cuerpo = filas[0], [f for f in filas[1:] if not (len(f) == len(CABECERA) and f[-1].startswith("figura:"))]
    if cab != CABECERA:
        raise SystemExit(f"✗ {csv_p}: cabecera inesperada {cab}")
    todas = cuerpo + figuras
    buf = io.StringIO()
    w = csv.writer(buf, lineterminator="\n")
    w.writerow(CABECERA)
    w.writerows(todas)
    csv_p.write_text(buf.getvalue(), encoding="utf-8")
    xl = destino / "procedencia.xlsx"
    if xl.exists():
        from openpyxl import Workbook
        wb = Workbook()
        ws = wb.active
        ws.title = "procedencia"
        ws.append(CABECERA)
        for f in todas:
            ws.append(f)
        wb.save(xl)
    return len(figuras)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--estricto", action="store_true")
    ap.add_argument("--dist", default=str(RAIZ / "dist"))
    a = ap.parse_args()
    dist = Path(a.dist)
    if not (dist / "es").exists():
        print(f"✗ no hay compilación en {dist}: ejecute antes `astro build`", file=sys.stderr)
        return 1
    cifras = set(json.loads(CIFRAS.read_text(encoding="utf-8")))
    fecha = json.loads(SELLO.read_text(encoding="utf-8")).get("exportado", "")[:10]
    claves, fallos, avisos = cosecha(dist, cifras)
    figuras = filas_de(claves, fecha)
    for x in avisos:
        print("⚠", x)
    if fallos:
        for x in fallos[:40]:
            print(("✗ " if a.estricto else "⚠ ") + x, file=sys.stderr)
        if len(fallos) > 40:
            print(f"  …y {len(fallos) - 40} más", file=sys.stderr)
        if a.estricto:
            return 1
    n = reescribe(PUB_DATOS, figuras)
    reescribe(dist / "datos", figuras)
    por_fig: dict[str, int] = {}
    for f in figuras:
        por_fig[f[-1]] = por_fig.get(f[-1], 0) + 1
    resumen = ", ".join(f"{k.split(':')[1]} {v}" for k, v in sorted(por_fig.items()))
    print(f"claves de figura · {n} filas en procedencia.csv ({resumen})" + (" · estricto" if a.estricto else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
