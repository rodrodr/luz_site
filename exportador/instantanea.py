#!/usr/bin/env python3
"""Instantánea fechada de lo publicado: API de Harvard Dataverse, el explorador y la app de Afinidades.

Solo lectura y solo llamadas públicas (GET y HEAD). No descarga ningún archivo de datos de Dataverse ni rellena
el formulario: pide los metadatos, la cita, las versiones y las métricas de uso de THQCMI y de CGOCUS, la
página del explorador (de la que guarda la huella, las cabeceras y el manifiesto embebido, no la página), las
cabeceras de los tres trozos de `corpus.sqlite.gz` y las de la app de Afinidades.

Escribe `exportador/instantaneas/<AAAA-MM-DD>/*.json`. `exportar.py` lee siempre la instantánea MÁS RECIENTE, así
que el sitio se reconstruye sin red y cada cifra de base `dv` o `explorador` lleva la fecha de su consulta.

Uso:  python3 exportador/instantanea.py            (o `python3 exportador/exportar.py --red`)
"""
from __future__ import annotations

import datetime as dt
import hashlib
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

AQUI = Path(__file__).resolve().parent
DESTINO = AQUI / "instantaneas"
DV = "https://dataverse.harvard.edu/api/datasets"
DOIS = {"thqcmi": "doi:10.7910/DVN/THQCMI", "cgocus": "doi:10.7910/DVN/CGOCUS"}
EXPLORADOR = "https://rodrodr.github.io/luz_explorer/"
AFINIDADES = "https://rodrodr.github.io/afinidades/"
AGENTE = "luz-site-exportador/0.1 (+https://rodrodr.github.io/luz_explorer/)"
CABECERAS = ("content-length", "content-type", "etag", "last-modified", "date")


def pedir(url: str, metodo: str = "GET") -> tuple[int, dict, bytes]:
    req = urllib.request.Request(url, method=metodo, headers={"User-Agent": AGENTE})
    with urllib.request.urlopen(req, timeout=60) as r:  # noqa: S310 (URL fija y pública)
        return r.status, {k.lower(): v for k, v in r.headers.items()}, (r.read() if metodo == "GET" else b"")


def api(ruta: str, doi: str) -> dict:
    estado, cab, cuerpo = pedir(f"{DV}/{ruta}?persistentId={doi}")
    return {"url": f"{DV}/{ruta}?persistentId={doi}", "estado": estado, "cuerpo": json.loads(cuerpo)}


def extraer(html: str, clave: str):
    """Objeto JSON que sigue a `"clave":` en la página del explorador (manifiesto embebido)."""
    i = html.find(f'"{clave}":')
    if i < 0:
        return None
    obj, _ = json.JSONDecoder().raw_decode(html, i + len(clave) + 3)
    return obj


def main() -> Path:
    ahora = dt.datetime.now(dt.timezone.utc)
    dst = DESTINO / ahora.date().isoformat()
    dst.mkdir(parents=True, exist_ok=True)
    salida: dict[str, dict] = {}
    for nombre, doi in DOIS.items():
        salida[f"dv_{nombre}"] = api(":persistentId/", doi)
        salida[f"dv_{nombre}_versiones"] = api(":persistentId/versions", doi)
        salida[f"dv_{nombre}_cita"] = api(":persistentId/versions/:latest-published/citation", doi)
        uso = {}
        for m in ("viewsTotal", "viewsUnique", "downloadsTotal", "downloadsUnique", "citations"):
            uso[m] = api(f":persistentId/makeDataCount/{m}", doi)["cuerpo"]
        salida[f"dv_{nombre}_uso"] = {"cuerpo": uso}
    # Explorador: la página (huella y manifiesto embebido) y las cabeceras de los tres trozos de la base.
    estado, cab, cuerpo = pedir(EXPLORADOR)
    html = cuerpo.decode("utf-8")
    manifiesto = extraer(html, "corpus_servido")
    trozos = []
    for parte in (manifiesto or {}).get("partes", []):
        url = f'{EXPLORADOR}{manifiesto["dir"]}/{parte["archivo"]}'
        e, c, _ = pedir(url, "HEAD")
        trozos.append({"url": url, "estado": e, **{k: c.get(k) for k in CABECERAS}})
    build = None
    j = html.find("build_id")
    if j >= 0:
        import re
        m = re.search(r'build_id["\']?\s*[:=]\s*["\']([0-9a-f]+)', html[j - 5:j + 80])
        build = m.group(1) if m else None
    fuente = extraer(html, "fuente")
    salida["explorador"] = {
        "url": EXPLORADOR, "estado": estado, "cabeceras": {k: cab.get(k) for k in CABECERAS},
        "bytes": len(cuerpo), "md5": hashlib.md5(cuerpo).hexdigest(), "sha256": hashlib.sha256(cuerpo).hexdigest(),
        "build_id": build, "corpus_servido": manifiesto, "bibliotecas_proyecto": extraer(html, "bibliotecas_proyecto"),
        "fuente": (fuente or {}).get("fuente") if isinstance(fuente, dict) else None, "trozos": trozos,
    }
    e, c, _ = pedir(AFINIDADES, "HEAD")
    salida["afinidades_app"] = {"url": AFINIDADES, "estado": e, "cabeceras": {k: c.get(k) for k in CABECERAS}}
    for nombre, datos in salida.items():
        datos["consultado"] = ahora.isoformat(timespec="seconds")
        (dst / f"{nombre}.json").write_text(json.dumps(datos, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"instantánea → {dst} ({len(salida)} archivos)")
    return dst


if __name__ == "__main__":
    try:
        main()
    except (urllib.error.URLError, TimeoutError) as e:
        print(f"✗ sin red o sin respuesta: {e}", file=sys.stderr)
        sys.exit(2)
