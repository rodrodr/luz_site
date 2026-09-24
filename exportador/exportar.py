#!/usr/bin/env python3
"""Exportador del sitio de Luz y Taquígrafos: de las bases a `src/data/` y `public/datos/`.

PROYECTA, NO INVENTA. Cada cifra sale de una base con su huella comprobada y lleva `{v, t, base, clave, f, d}`
(contrato § Cifras). Nada se escribe en `src/data/` ni en `public/datos/` si falla una puerta: todo se prepara en
`~/.cache/luz_site/exportador/staging/<marca>/` y solo se vuelca cuando todo pasa.

Pasos
  1  Huellas. MD5 de la V2 · sha256 de la v3 (corpus.sqlite y el CSV v3) · sha256 de sessions.json del proyecto ·
     versión, UNF y MD5 de cada archivo de CGOCUS V1.1 contra la API de Dataverse · sha256 de hemiciclo_1936.json ·
     sha256 del motor del explorador · la instantánea de Dataverse (el CSV depositado es el que tenemos) y del
     explorador (sirve la v3 que tenemos). Si algo no cuadra, se para.
  2  Papel de cada fila (V2 y v3) con el motor del explorador (`motor/papel.mjs`); la caché
     `~/.cache/luz_site/clima/*.jsonl` se reutiliza solo si su huella cuadra (mismos ids, ningún error, mismo papel).
  3  Módulos, en orden: base, cortes, sesiones, diario, metodo, datos, explorador, afinidades, laboratorio, erratas. Cada uno devuelve
     sus cifras y escribe sus archivos por `ctx`.
  4  Puertas: cifra sin base/t/f/d o con base desconocida · suma de etapas ≠ total · archivo de
     `aecpa2026/figs/data/` distinto del hemiciclo · palabras del prototipo · cita de `citas.json` que no está letra
     a letra en su fila V2 y en su fila v3 · nombre sin grafía (cuando exista la tabla) · marcadores de
     `docs/marcadores/*.md` sin cifra o con otro valor u otra base · cifras de control del plan.
  5  Escribe `src/data/cifras.json`, `formatos.json`, `sello.json` y `public/datos/procedencia.csv|xlsx`, y vuelca.

Uso:  python3 exportador/exportar.py [--red] [--comprobar] [--solo base,cortes] [--estricto]
      --red        refresca antes la instantánea de Dataverse y del explorador (instantanea.py)
      --comprobar  hace todo y no vuelca nada en el sitio
      --solo       ejecuta solo esos módulos además de base (para trabajar en uno; nunca vuelca)
      --estricto   un marcador declarado sin cifra también falla (así se exporta para publicar)
"""
from __future__ import annotations

import argparse
from types import MappingProxyType
import datetime as dt
import importlib
import json
import platform
import re
import shutil
import subprocess
import sys
import time
import traceback
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI))

import pandas as pd  # noqa: E402

import controles  # noqa: E402
import formatos  # noqa: E402
from comun import (AFIN_ARCHIVOS, AFIN_UNF, AFIN_VERSION, BYTES_V2, CACHE_EXP, ETAPA_IDS, FIGS_DATA, HEMICICLO,  # noqa: E402
                   LEGISLATURAS, MARCADORES, MD5_V2, MOTOR, N_FILAS_V3, PROYECTO_JSON, PUB_DATOS, RAIZ,
                   SHA256_HEMICICLO, SHA256_MOTOR, SHA256_PROYECTO, SHA256_V3, SHA256_V3_CSV, SRC_DATA, V2_CSV, V3_CSV,
                   V3_DB, Contexto, Falla, exige, huella, leer_json, volcar_json)

MODULOS = ["base", "cortes", "sesiones", "diario", "metodo", "datos", "explorador", "afinidades", "laboratorio", "erratas"]
AJENOS_EN_DATA = {"tokens.json"}          # archivos de src/data/ que no escribe el exportador (andamiaje)
PROTOTIPO_DURO = ["libro de códigos", "libro de codigos", "grafo anotado", "acto afectivo", "actos afectivos",
                  "índice de reacción", "indice de reaccion"]
PROTOTIPO_BLANDO = ["ironía", "hostilidad", "intensidad"]
FAMILIAS = {
    "sesion.<AAAA-MM-DD>-<n>.<campo>": {
        "archivo": "sesiones.json", "lista": "sesiones", "id": "clave", "patron": r"^sesion\.(\d{4}-\d{2}-\d{2}-\d+)\.(.+)$",
        "campos": {
            "fecha": {"ruta": "f", "t": "fecha", "base": "V2", "f": "fecha de la sesión"},
            "numero": {"ruta": "s", "t": "id", "base": "V2", "f": "num_session"},
            "filas": {"ruta": "filas", "t": "n", "base": "V2", "f": "filas V2 de la sesión"},
            "palabras": {"ruta": "pal", "t": "n", "base": "V2", "f": "suma de nwords de la sesión"},
            "diputados": {"ruta": "dip", "t": "n", "base": "V2", "f": "rep_id distintos, incluido el de quien preside"},
            "diputados_sp": {"ruta": "dip_sp", "t": "n", "base": "V2", "f": "rep_id distintos fuera de la Presidencia"},
            "largas": {"ruta": "largas", "t": "n", "base": "V2", "f": "filas de más de 300 palabras"},
            "filas_pres": {"ruta": "filas_pres", "t": "n", "base": "V2", "f": "filas de la Presidencia (parse_speaker)"},
            "id_v2.desde": {"ruta": "id_v2.0", "t": "id", "base": "V2", "f": "primer id V2"},
            "id_v2.hasta": {"ruta": "id_v2.1", "t": "id", "base": "V2", "f": "último id V2"},
            "filas_v3": {"ruta": "filas_v3", "t": "n", "base": "v3", "f": "filas v3 de la sesión"},
            "habla_v3": {"ruta": "habla_v3", "t": "n", "base": "v3", "f": "filas v3 de habla"},
            "id_v3.desde": {"ruta": "id_v3.0", "t": "id", "base": "v3", "f": "primer id v3"},
            "id_v3.hasta": {"ruta": "id_v3.1", "t": "id", "base": "v3", "f": "último id v3"},
            "diario": {"ruta": "meta.num", "t": "id", "base": "proyecto", "f": "número del Diario (sessions.json)"},
            "pag.desde": {"ruta": "meta.paginas.0", "t": "id", "base": "proyecto", "f": "primera página verificada (sessions.json)"},
            "pag.hasta": {"ruta": "meta.paginas.1", "t": "id", "base": "proyecto", "f": "última página verificada (sessions.json)"},
            "pp_desde": {"ruta": "meta.paginas.0", "t": "id", "base": "proyecto", "f": "primera página verificada (sessions.json)"},
            "pp_hasta": {"ruta": "meta.paginas.1", "t": "id", "base": "proyecto", "f": "última página verificada (sessions.json)"},
            "id_min": {"ruta": "id_v2.0", "t": "id", "base": "V2", "f": "primer id V2"},
            "id_max": {"ruta": "id_v2.1", "t": "id", "base": "V2", "f": "último id V2"},
            "filas.v3": {"ruta": "filas_v3", "t": "n", "base": "v3", "f": "filas v3 de la sesión"},
            "habla.v3": {"ruta": "habla_v3", "t": "n", "base": "v3", "f": "filas v3 de habla"},
            "num": {"ruta": "s", "t": "id", "base": "V2", "f": "num_session"},
            "diario_num": {"ruta": "meta.num", "t": "id", "base": "proyecto", "f": "número del Diario (sessions.json)"},
            "paginas": {"ruta": "meta.paginas", "t": "texto", "unir": "–", "base": "proyecto",
                        "f": "páginas verificadas del Diario, primera–última (sessions.json)"},
            "id.desde": {"ruta": "id_v2.0", "t": "id", "base": "V2", "f": "primer id V2"},
            "id.hasta": {"ruta": "id_v2.1", "t": "id", "base": "V2", "f": "último id V2"},
        },
    },
    "mes.<AAAA-MM>.<campo>": {
        "archivo": "meses.json", "lista": "meses", "id": "mes", "patron": r"^mes\.(\d{4}-\d{2})\.(.+)$",
        "campos": {
            "sesiones": {"ruta": "sesiones", "t": "n", "base": "V2", "f": "sesiones del mes"},
            "filas": {"ruta": "filas", "t": "n", "base": "V2", "f": "filas V2 del mes"},
            "palabras": {"ruta": "pal", "t": "n", "base": "V2", "f": "palabras V2 del mes"},
            "diputados": {"ruta": "dip", "t": "n", "base": "V2", "f": "rep_id distintos del mes"},
        },
    },
}


# ── 1. huellas ────────────────────────────────────────────────────────────────────────────────────────────────────

def verificar_entradas(ctx: Contexto) -> None:
    h = ctx.huellas

    def fija(nombre, calculada, esperada, que):
        h[nombre] = calculada
        exige(calculada == esperada, f"huella de {que}: {calculada} ≠ {esperada}")
    fija("v2_md5", huella(V2_CSV, "md5"), MD5_V2, f"la V2 ({V2_CSV.name})")
    exige(V2_CSV.stat().st_size == BYTES_V2, "la V2 no pesa lo depositado")
    fija("v3_sha256", huella(V3_DB), SHA256_V3, f"la v3 ({V3_DB})")
    if V3_CSV.exists():
        fija("v3_csv_sha256", huella(V3_CSV), SHA256_V3_CSV, f"el CSV v3 ({V3_CSV.name})")
    else:
        h["v3_csv_sha256"] = SHA256_V3_CSV
        ctx.aviso("no está el CSV v3 local; su sha256 se toma del manifiesto del explorador")
    fija("proyecto_sha256", huella(PROYECTO_JSON), SHA256_PROYECTO, "sessions.json del proyecto")
    fija("hemiciclo_sha256", huella(HEMICICLO), SHA256_HEMICICLO, "hemiciclo_1936.json")
    fija("motor_sha256", huella(MOTOR / "engine.js"), SHA256_MOTOR, "motor/engine.js (motor del explorador)")
    h["instantanea"] = ctx.inst.fecha
    # Dataverse: el CSV que tenemos es el depositado en la versión vigente.
    th = ctx.inst.dataset("thqcmi")["latestVersion"]
    exige((th["versionNumber"], th["versionMinorNumber"]) == (2, 0), f"THQCMI ya no está en la V2.0 (instantánea {ctx.inst.fecha})")
    csvf = next(f["dataFile"] for f in th["files"] if f["dataFile"]["filename"] == V2_CSV.name)
    exige(csvf["md5"] == MD5_V2 and csvf["filesize"] == BYTES_V2, "el CSV depositado en Dataverse no es el que tenemos")
    # CGOCUS V1.1: versión, UNF y MD5 de cada archivo que tenemos.
    cg = ctx.inst.dataset("cgocus")["latestVersion"]
    exige((cg["versionNumber"], cg["versionMinorNumber"]) == AFIN_VERSION, "CGOCUS ya no está en la V1.1: vuelva a exportar sobre la nueva (D-3)")
    exige(cg.get("UNF") == AFIN_UNF, f"UNF de CGOCUS: {cg.get('UNF')} ≠ {AFIN_UNF}")
    h["afin_version"] = "V1.1"
    h["afin_unf"] = cg["UNF"]
    verificados = {}
    for fl in cg["files"]:
        df = fl["dataFile"]
        loc = AFIN_ARCHIVOS.get(df["filename"])
        if not loc:
            continue
        exige(loc["ruta"].exists(), f"CGOCUS: falta la copia local de {df['filename']} ({loc['ruta']})")
        if loc.get("sep") == ";":  # la copia de la app usa «;»; lo depositado, «,»
            import hashlib
            m = hashlib.md5(loc["ruta"].read_bytes().replace(b";", b",")).hexdigest()
        else:
            m = huella(loc["ruta"], "md5")
        exige(m == df["md5"], f"CGOCUS: {df['filename']} local ({m}) ≠ depositado ({df['md5']})")
        verificados[df["filename"]] = m
    exige(set(verificados) == set(AFIN_ARCHIVOS), f"CGOCUS: sin comprobar {set(AFIN_ARCHIVOS) - set(verificados)}")
    ctx.compartido["afin_verificados"] = verificados
    h["afin_md5"] = json.dumps(verificados, sort_keys=True)
    # Explorador publicado: sirve la v3 que tenemos.
    ex = ctx.inst.explorador()
    man = ex["corpus_servido"]
    exige(man["sha256"] == SHA256_V3 and man["bytes"] == V3_DB.stat().st_size and man["n_speeches"] == N_FILAS_V3,
          "el explorador publicado sirve otra base: las cifras v3 caducan (vuelva a descargar corpus.sqlite)")
    exige(man["csv_origen"]["sha256"] == SHA256_V3_CSV, "el explorador declara otro CSV v3 de origen")
    h["explorador_md5"] = ex["md5"]
    h["explorador_etag"] = (ex.get("cabeceras") or {}).get("etag")


# ── 4. puertas ────────────────────────────────────────────────────────────────────────────────────────────────────

def valida_cifras(C: dict, origen: dict) -> list[str]:
    fallos = []
    for k, c in C.items():
        que = f"cifra {k} ({origen.get(k)})"
        if not re.fullmatch(r"[A-Za-z0-9_.\-]+", k):
            fallos.append(f"{que}: clave con caracteres no permitidos")
        for campo in ("v", "t", "base", "clave", "f", "d"):
            if campo not in c or c[campo] in (None, ""):
                fallos.append(f"{que}: sin «{campo}»")
        if c.get("t") not in formatos.TIPOS:
            fallos.append(f"{que}: tipo {c.get('t')!r} fuera de {formatos.TIPOS}")
        if c.get("base") not in formatos.BASES:
            fallos.append(f"{que}: base {c.get('base')!r} fuera de {formatos.BASES}")
        if c.get("clave") not in formatos.CLAVES_FUENTE:
            fallos.append(f"{que}: clave de fuente {c.get('clave')!r} desconocida")
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(c.get("d", ""))):
            fallos.append(f"{que}: fecha d {c.get('d')!r} no es AAAA-MM-DD")
        v, t = c.get("v"), c.get("t")
        if t in ("n", "pct", "peso", "id", "anio") and (not isinstance(v, (int, float)) or isinstance(v, bool) or v != v):
            fallos.append(f"{que}: valor {v!r} no numérico")
        elif t == "pct" and not 0 <= v <= 1:
            fallos.append(f"{que}: porcentaje {v} fuera de [0, 1] (va como fracción)")
        elif t in ("peso", "id", "anio") and (v < 0 or not float(v).is_integer()):
            fallos.append(f"{que}: {t} {v} no es un entero no negativo")
        elif t == "fecha" and not re.fullmatch(r"\d{4}-\d{2}(-\d{2})?", str(v)):
            fallos.append(f"{que}: fecha {v!r} no es AAAA-MM-DD")
        elif t == "texto" and not isinstance(v, (str, dict)):
            fallos.append(f"{que}: texto {v!r} no es cadena")
    return fallos


def valida_sumas(C: dict, ctx: Contexto) -> list[str]:
    f = []
    v = lambda k: C[k]["v"]  # noqa: E731
    for campo, total in (("sesiones", "sesiones"), ("filas", "filas.V2"), ("palabras", "palabras.V2"), ("filas.v3", "filas.v3"),
                         ("habla.v3", "habla.v3"), ("paginas", "paginas.total")):
        s = sum(v(f"etapa.{e}.{campo}") for e in ETAPA_IDS)
        if s != v(total):
            f.append(f"suma de etapas: etapa.*.{campo} = {s} ≠ {total} = {v(total)}")
    for campo, total in (("sesiones", "sesiones"), ("filas", "filas.V2"), ("palabras", "palabras.V2"), ("paginas", "paginas.total")):
        s = sum(v(f"leg.{l}.{campo}") for l in LEGISLATURAS)
        if s != v(total):
            f.append(f"suma de legislaturas: leg.*.{campo} = {s} ≠ {total}")
    meses = ctx.compartido.get("meses", [])
    if sum(m["sesiones"] for m in meses) != v("sesiones") or sum(m["filas"] for m in meses) != v("filas.V2"):
        f.append("los meses no suman las sesiones o las filas")
    if len(meses) != v("meses.total"):
        f.append("meses.json no tiene meses.total meses")
    if abs(sum(v(f"etapa.{e}.palabras.pct") for e in ETAPA_IDS) - 1) > 1e-9:
        f.append("los porcentajes de palabras por etapa no suman 1")
    return f


def valida_figs_data(ctx: Contexto) -> list[str]:
    """Nada de `aecpa2026/figs/data/` salvo el hemiciclo: se compara el CONTENIDO (sha256), no el nombre."""
    prohibidos = {huella(p): p.name for p in FIGS_DATA.iterdir() if p.is_file() and p.name != HEMICICLO.name}
    f = []
    for p in ctx.staging.rglob("*"):
        if p.is_file():
            h = huella(p)
            if h in prohibidos:
                f.append(f"{p.relative_to(ctx.staging)} es {prohibidos[h]} de aecpa2026/figs/data/ (prototipo)")
            if p.name == HEMICICLO.name and h != SHA256_HEMICICLO:
                f.append(f"{p.relative_to(ctx.staging)} no es el hemiciclo depositado")
    return f


def valida_prototipo(ctx: Contexto) -> tuple[list[str], list[str]]:
    fallos, avisos = [], []
    for p in ctx.data.rglob("*.json"):
        t = p.read_text(encoding="utf-8").lower()
        for w in PROTOTIPO_DURO:
            if w in t:
                fallos.append(f"{p.relative_to(ctx.staging)} contiene «{w}» (prototipo de 1931)")
        for w in PROTOTIPO_BLANDO:
            if w in t:
                avisos.append(f"{p.relative_to(ctx.staging)} contiene «{w}»: compruebe que es una cita del Diario y no una categoría")
    return fallos, avisos


def valida_grafias(ctx: Contexto) -> tuple[list[str], list[str]]:
    g = leer_json(ctx.data / "grafias.json")["grafias"]
    if not g:
        return [], ["grafías pendientes (D-22): ningún nombre se comprueba todavía contra la tabla"]
    faltan: dict[str, set] = {}

    def recorre(o, archivo):
        if isinstance(o, dict):
            if "rep_id" in o and o["rep_id"] not in (None, ""):
                if str(int(o["rep_id"])) not in g:
                    faltan.setdefault(archivo, set()).add(int(o["rep_id"]))
            for x in o.values():
                recorre(x, archivo)
        elif isinstance(o, list):
            for x in o:
                recorre(x, archivo)
    for p in ctx.data.rglob("*.json"):
        if p.name not in ("grafias.json", "cifras.json"):
            recorre(leer_json(p), str(p.relative_to(ctx.staging)))
    return [f"{a}: rep_id sin grafía {sorted(ids)[:12]}{'…' if len(ids) > 12 else ''}" for a, ids in faltan.items()], []


def valida_citas(ctx: Contexto) -> list[str]:
    """Puerta del plan: cada cita de `citas.json` está LETRA A LETRA en su fila V2 y en su fila v3.
    Formato: {"citas": [{"id": "...", "texto": "...", "v2": <id V2>, "v3": <id v3 o lista>}, ...]}."""
    p = ctx.data / "citas.json"
    if not p.exists():
        return []
    d = leer_json(p)
    fallos = []
    for c in (d.get("citas", d) if isinstance(d, dict) else d):
        texto = c.get("texto") or ""
        exige(texto, f"citas.json: cita {c.get('id')} sin texto")
        v3s = c.get("v3") if isinstance(c.get("v3"), list) else [c.get("v3")]
        if c.get("v2") is not None and texto not in (ctx.fila_v2(c["v2"])["speech"] or ""):
            fallos.append(f"citas.json › {c.get('id')}: el texto no está letra a letra en la fila V2 {c['v2']}")
        if c.get("v3") is not None and not any(texto in (ctx.fila_v3(i)["speech"] or "") for i in v3s):
            fallos.append(f"citas.json › {c.get('id')}: el texto no está letra a letra en la fila v3 {c['v3']}")
        if c.get("v2") is None and c.get("v3") is None:
            fallos.append(f"citas.json › {c.get('id')}: sin fila de origen")
    return fallos


def resuelve(k: str, C: dict, ctx: Contexto) -> dict | None:
    if k in C:
        return C[k]
    for fam in FAMILIAS.values():
        m = re.match(fam["patron"], k)
        if not m:
            continue
        lista = leer_json(ctx.data / fam["archivo"])[fam["lista"]]
        reg = next((x for x in lista if x[fam["id"]] == m.group(1)), None)
        campo = fam["campos"].get(m.group(2))
        if reg is None or campo is None:
            return None
        v = reg
        for paso in campo["ruta"].split("."):
            v = v[int(paso)] if isinstance(v, list) else (v or {}).get(paso)
            if v is None:
                return None
        if isinstance(v, list):
            v = campo.get("unir", "–").join(str(x) for x in v)
        return {"v": v, **{x: campo[x] for x in ("t", "base") if x in campo}, "f": campo["f"], "d": ctx.hoy}
    return None


def _celdas(linea: str) -> list[str]:
    return [c.strip().replace("\\|", "|") for c in re.split(r"(?<!\\)\|", linea.strip().strip("|"))]


def _claves_de(celda: str) -> list[tuple[str, str]]:
    """«`voto.161-121.si` · `.no`» → [(voto.161-121.si, ''), (voto.161-121.no, '')]; «`{{x|id}}`» → [(x, 'id')]."""
    fichas = re.findall(r"`([^`]+)`", celda) or ([celda] if re.fullmatch(r"\{\{[^}]+\}\}", celda.strip()) else [])
    out: list[tuple[str, str]] = []
    for f in fichas:
        f = f.strip()
        m = re.fullmatch(r"\{\{\s*([^|}]+?)\s*(?:\|\s*(\w+)\s*)?\}\}", f)
        clave, fmt = (m.group(1), m.group(2) or "") if m else (f, "")
        if clave.startswith(".") and clave.endswith(".") and out:  # «`afin.1931.x` · `.1933.`»: cambia un segmento de dentro
            nuevo, partes = clave.strip("."), out[0][0].split(".")
            k = next((i for i, x in enumerate(partes) if x.isdigit() == nuevo.isdigit() and i > 0), None)
            if k is None:
                continue
            clave = ".".join(partes[:k] + [nuevo] + partes[k + 1:])
        elif clave.startswith(".") and out:
            seg = clave[1:].split(".")
            clave = ".".join(out[0][0].split(".")[:-len(seg)] + seg)
        if re.fullmatch(r"[A-Za-z0-9_.\-<>]+", clave):
            out.append((clave, fmt))
    return out


def lee_marcadores() -> tuple[list[dict], list[str]]:
    """Filas de las tablas de `docs/marcadores/*.md` cuya cabecera tiene «clave», «valor…» y «base» (y quizá «t»/«tipo»,
    de donde sale el formato: «formato `letra`»). Admite varias claves por fila («`a.si` · `.no`» con «161 · 121»)."""
    out, avisos = [], []
    for p in sorted(MARCADORES.glob("*.md")):
        cab = None
        for n, linea in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            l = linea.strip()
            if not l.startswith("|"):
                cab = None
                continue
            celdas = _celdas(l)
            if cab is None:
                low = [c.lower().strip("*` ") for c in celdas]
                ic = next((i for i, c in enumerate(low) if c in ("clave", "marcador")), None)
                iv = next((i for i, c in enumerate(low) if c.startswith("valor")), None)
                ib = next((i for i, c in enumerate(low) if c.startswith("base")), None)
                it = next((i for i, c in enumerate(low) if c in ("t", "tipo") or c.startswith("t ·") or c.startswith("tipo")), None)
                cab = {"c": ic, "v": iv, "b": ib, "t": it} if None not in (ic, iv, ib) else {}
                continue
            if not cab or re.fullmatch(r"[\s|:\-]+", l) or len(celdas) <= max(x for x in cab.values() if x is not None):
                continue
            claves = _claves_de(celdas[cab["c"]])
            if not claves:
                continue
            valores = [x.strip() for x in celdas[cab["v"]].split(" · ")] if len(claves) > 1 else [celdas[cab["v"]]]
            if len(claves) > 1 and len(valores) != len(claves):  # «35,1 % · 23,0 % (0,3506 · 0,2304)»: fuera el paréntesis
                valores = [x.strip() for x in re.sub(r"\([^()]*\)", "", celdas[cab["v"]]).split(" · ")]
            bases = [x.strip("` ") for x in celdas[cab["b"]].split("·")]
            if len(claves) > 1 and len(valores) != len(claves):
                avisos.append(f"{p.name}:{n}: {len(claves)} claves y {len(valores)} valores; no se comprueba el valor")
                valores = ["—"] * len(claves)
            fmt_t = ""
            if cab["t"] is not None:
                m = re.search(r"formato\s+`?(\w+)`?", celdas[cab["t"]])
                fmt_t = m.group(1) if m else ""
            for k, (clave, fmt) in enumerate(claves):
                base = bases[k] if len(bases) == len(claves) else bases[0]
                out.append({"archivo": p.name, "linea": n, "clave": clave, "fmt": fmt or fmt_t, "esperado": valores[k], "base": base})
    return out, avisos


def valida_marcadores(C: dict, ctx: Contexto, estricto: bool) -> tuple[list[str], list[str], dict]:
    fallos, avisos = [], []
    filas, av = lee_marcadores()
    avisos += av
    pendientes: dict[str, list[str]] = {}
    comprobados = 0
    for r in filas:
        donde = f"{r['archivo']}:{r['linea']} {{{{{r['clave']}{'|' + r['fmt'] if r['fmt'] else ''}}}}}"
        if "<" in r["clave"]:
            patron = "^" + re.sub(r"<[^>]+>", "[^.]+", re.escape(r["clave"]).replace("\\<", "<").replace("\\>", ">")) + "$"
            if not any(re.match(patron, k) for k in C):
                pendientes.setdefault(r["archivo"], []).append(r["clave"])
            continue
        c = resuelve(r["clave"], C, ctx)
        if c is None:
            pendientes.setdefault(r["archivo"], []).append(r["clave"])
            continue
        comprobados += 1
        if r["base"] and r["base"] not in ("—", "-") and r["base"] != c["base"]:
            fallos.append(f"{donde}: base declarada {r['base']} ≠ base de la cifra {c['base']}")
        ok, calc = formatos.coincide(c, r["esperado"], r["fmt"])
        if ok is False:
            fallos.append(f"{donde}: esperado «{r['esperado']}», calculado «{calc}» (valor {c['v']!r})")
        elif ok is None:
            avisos.append(f"{donde}: el valor esperado «{r['esperado'][:60]}» no se puede comparar con «{calc[:60]}»")
    n_pend = sum(len(v) for v in pendientes.values())
    if n_pend:
        (CACHE_EXP / "marcadores_pendientes.txt").write_text(
            "\n".join(f"{a}: {k}" for a, ks in sorted(pendientes.items()) for k in ks) + "\n", encoding="utf-8")
        resumen = ", ".join(f"{a} {len(ks)}" for a, ks in sorted(pendientes.items()))
        msg = (f"{n_pend} marcadores declarados aún sin cifra ({resumen}); lista en "
               f"{CACHE_EXP / 'marcadores_pendientes.txt'}")
        (fallos if estricto else avisos).append(msg)
    return fallos, avisos, {"declarados": len(filas), "comprobados": comprobados, "pendientes": n_pend}


def materializa_familias(C: dict, origen: dict, ctx: Contexto, estricto: bool) -> tuple[list[str], list[str]]:
    """Las cifras de familia (`sesion.<clave>.<campo>`, `mes.<AAAA-MM>.<campo>`) que el copy o los marcadores citan
    se escriben en `cifras.json`, para que `cifras.ts` las resuelva como cualquier otra."""
    usadas = set()
    for p in list((RAIZ / "docs" / "copy_es").glob("*.md")) + list(MARCADORES.glob("*.md")):
        for m in re.finditer(r"(?:\{\{|`)\s*((?:sesion|mes)\.[0-9][0-9\-]*\.[A-Za-z_.0-9]+?)\s*(?:\\?\||\}\}|`)", p.read_text(encoding="utf-8")):
            usadas.add(m.group(1))
    fallos, avisos = [], []
    for k in sorted(usadas):
        if k in C:
            continue
        c = resuelve(k, {}, ctx)
        if c is None:
            (fallos if estricto else avisos).append(f"el copy cita {{{{{k}}}}} y no hay tal sesión, mes o campo")
            continue
        C[k] = {**c, "clave": "C"}
        origen[k] = "familia"
    return fallos, avisos


# ── 5. escritura ──────────────────────────────────────────────────────────────────────────────────────────────────

def escribe_salidas(ctx: Contexto, C: dict, origen: dict, resumen: dict, R: list, avisos: list) -> None:
    C = dict(sorted(C.items()))
    (ctx.data / "cifras.json").write_text(volcar_json(C), encoding="utf-8")
    ctx.escritos["data/cifras.json"] = "exportar"
    spec = formatos.especificacion()
    spec["familias"] = {k: {x: v[x] for x in ("archivo", "lista", "id", "campos")} for k, v in FAMILIAS.items()}
    (ctx.data / "formatos.json").write_text(volcar_json(spec), encoding="utf-8")
    ctx.escritos["data/formatos.json"] = "exportar"
    puertas = None
    if (ctx.data / "puertas.json").exists():
        pj = leer_json(ctx.data / "puertas.json")
        puertas = len(pj.get("puertas", pj) if isinstance(pj, dict) else pj)
    sello = {
        "exportado": ctx.hoy, "v2_md5": ctx.huellas["v2_md5"], "v3_sha256": ctx.huellas["v3_sha256"],
        "v3_csv_sha256": ctx.huellas["v3_csv_sha256"], "proyecto_sha256": ctx.huellas["proyecto_sha256"],
        "afin_version": ctx.huellas["afin_version"], "afin_unf": ctx.huellas["afin_unf"],
        "hemiciclo_sha256": ctx.huellas["hemiciclo_sha256"], "motor_sha256": ctx.huellas["motor_sha256"],
        "instantanea": ctx.huellas["instantanea"], "explorador_md5": ctx.huellas["explorador_md5"],
        "explorador_etag": ctx.huellas["explorador_etag"],
        "clima_v3_cache": ctx.compartido.get("clima_v3_cache", {}).get("valida"),
        "puertas": puertas, "cifras": len(C), "modulos": {m: r["cifras"] for m, r in resumen.items()},
        "controles": {"total": len(R), "ok": sum(r["ok"] for r in R), "distintos_del_plan": sum(r["plan"] != r["esperado"] for r in R)},
        "entorno": {"python": platform.python_version(), "pandas": pd.__version__,
                    "node": subprocess.run(["node", "--version"], capture_output=True, text=True).stdout.strip()},
        "avisos": avisos,
    }
    (ctx.data / "sello.json").write_text(volcar_json(sello), encoding="utf-8")
    ctx.escritos["data/sello.json"] = "exportar"
    cab = ["cifra", "valor", "tipo", "base", "clave", "fuente", "fecha", "texto", "modulo"]
    filas = [[k, json.dumps(c["v"], ensure_ascii=False) if isinstance(c["v"], dict) else c["v"], c["t"], c["base"], c["clave"], c["f"],
              c["d"], formatos.formatear(c, "", "es"), origen.get(k, "")] for k, c in C.items()]
    # Las claves de figura (`modulo` = «figura:<id>») las pone `claves_figura.py` tras compilar, recogidas de la página:
    # se conservan las de la última compilación para que exportar sin compilar no las borre.
    previa = PUB_DATOS / "procedencia.csv"
    if previa.exists():
        import csv as _csv
        figuras = [f for f in _csv.reader(previa.read_text(encoding="utf-8").splitlines())
                   if len(f) == len(cab) and f[-1].startswith("figura:") and f[0] not in C]
        filas += figuras
    ctx.escribir_datos("procedencia", cab, filas)


def vuelca(ctx: Contexto) -> tuple[int, int, list[str]]:
    cambiados = iguales = 0
    for rel in sorted(ctx.escritos):
        tipo, _, nombre = rel.partition("/")
        src = ctx.staging / tipo / nombre
        dst = (SRC_DATA if tipo == "data" else PUB_DATOS) / nombre
        dst.parent.mkdir(parents=True, exist_ok=True)
        if dst.exists() and dst.read_bytes() == src.read_bytes():
            iguales += 1
            continue
        shutil.copyfile(src, dst)
        cambiados += 1
    sobrantes = []
    for raiz, tipo in ((SRC_DATA, "data"), (PUB_DATOS, "datos")):
        if raiz.exists():
            for p in raiz.rglob("*"):
                rel = f"{tipo}/{p.relative_to(raiz)}"
                if p.is_file() and rel not in ctx.escritos and p.name not in AJENOS_EN_DATA and not p.name.startswith("."):
                    sobrantes.append(rel)
    return cambiados, iguales, sobrantes


# ── principal ─────────────────────────────────────────────────────────────────────────────────────────────────────

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--red", action="store_true", help="refresca la instantánea de Dataverse y del explorador")
    ap.add_argument("--comprobar", action="store_true", help="no vuelca nada en el sitio")
    ap.add_argument("--solo", default="", help="módulos a ejecutar además de base (nunca vuelca)")
    ap.add_argument("--estricto", action="store_true",
                    help="un marcador declarado sin cifra, o una cifra de familia que no existe, también hace fallar (publicación)")
    a = ap.parse_args()
    t0 = time.time()
    if a.red:
        import instantanea
        instantanea.main()
    marca = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    staging = CACHE_EXP / "staging" / marca
    viejos = sorted(p for p in (CACHE_EXP / "staging").glob("*") if p.is_dir()) if (CACHE_EXP / "staging").exists() else []
    for p in viejos[:-4]:  # se conservan las cuatro preparaciones más recientes
        shutil.rmtree(p, ignore_errors=True)
    ctx = Contexto(dt.date.today().isoformat(), staging, a)
    fallos: list[str] = []
    print(f"Exportador de Luz y Taquígrafos · {ctx.hoy} · preparación en {staging}")
    try:
        verificar_entradas(ctx)
    except Falla as e:
        print(f"✗ HUELLAS: {e}")
        return 1
    print(f"✓ huellas: V2 {MD5_V2[:8]}… · v3 {SHA256_V3[:8]}… · proyecto {SHA256_PROYECTO[:8]}… · CGOCUS V1.1 "
          f"({len(ctx.compartido['afin_verificados'])} archivos) · hemiciclo {SHA256_HEMICICLO[:8]}… · motor {SHA256_MOTOR[:8]}… · "
          f"instantánea {ctx.inst.fecha}")
    elegidos = MODULOS if not a.solo else ["base"] + [m.strip() for m in a.solo.split(",") if m.strip() and m.strip() != "base"]
    C: dict[str, dict] = {}
    origen: dict[str, str] = {}
    resumen: dict[str, dict] = {}
    ctx.dadas = MappingProxyType(C)  # vista viva y de solo lectura del acumulador (peticiones: datos 7, diario-metodo 4.1)
    for nombre in elegidos:
        ctx.modulo = nombre
        t = time.time()
        try:
            mod = importlib.import_module(f"modulos.{nombre}")
            cif = mod.exportar(ctx) or {}
            exige(isinstance(cif, dict), f"{nombre}.exportar() no devuelve un dict")
            for k, c in cif.items():
                exige(k not in C, f"la cifra {k} la dan {origen.get(k)} y {nombre}")
                C[k] = c
                origen[k] = nombre
            resumen[nombre] = {"cifras": len(cif), "s": round(time.time() - t, 1), "archivos": sum(v == nombre for v in ctx.escritos.values())}
        except Exception as e:  # noqa: BLE001 — se recoge todo para el informe
            fallos.append(f"módulo {nombre}: {e}" + ("" if isinstance(e, Falla) else "\n" + traceback.format_exc(limit=4)))
            resumen[nombre] = {"cifras": 0, "s": round(time.time() - t, 1), "archivos": 0, "fallo": True}
            if nombre == "base":
                break
        print(f"  · {nombre:<11} {resumen[nombre]['cifras']:>4} cifras · {resumen[nombre]['archivos']:>2} archivos · {resumen[nombre]['s']:>5} s"
              + ("  ✗" if resumen[nombre].get("fallo") else ""))
    ctx.modulo = "exportar"
    R: list[dict] = []
    avisos_ctl: list[str] = []
    if not any(r.get("fallo") for n, r in resumen.items() if n == "base"):
        fallos += valida_cifras(C, origen)
        fallos += valida_sumas(C, ctx)
        try:
            R = controles.comprobar(ctx, C)
            f_ctl, avisos_ctl = controles.informe(R)
            fallos += f_ctl
        except Falla as e:
            fallos.append(f"controles: {e}")
        fallos += valida_figs_data(ctx)
        fallos += valida_citas(ctx)
        f1, a1 = valida_prototipo(ctx)
        f2, a2 = valida_grafias(ctx)
        fallos += f1 + f2
        for x in a1 + a2:
            ctx.aviso(x)
        f4, a4 = materializa_familias(C, origen, ctx, a.estricto)
        fallos += f4
        f3, a3, n_marc = valida_marcadores(C, ctx, a.estricto)
        fallos += f3
        for x in a4 + a3:
            ctx.aviso(x)
    else:
        n_marc = {"declarados": 0, "comprobados": 0, "pendientes": 0}
    avisos = ctx.avisos + avisos_ctl
    if not fallos:
        escribe_salidas(ctx, C, origen, resumen, R, avisos)
        fallos += valida_figs_data(ctx)
    # ── informe ──
    por_base: dict[str, int] = {}
    for c in C.values():
        por_base[c["base"]] = por_base.get(c["base"], 0) + 1
    print(f"✓ {len(C)} cifras · por base: " + " · ".join(f"{b} {n}" for b, n in sorted(por_base.items())))
    if R:
        print(f"{'✓' if all(r['ok'] for r in R) else '✗'} controles del plan: {sum(r['ok'] for r in R)} de {len(R)}")
        for r in R:
            marca_r = "✓" if r["ok"] else "✗"
            difiere = "  ⚠ el plan decía " + json.dumps(r["plan"], ensure_ascii=False) if r["ok"] and r["plan"] != r["esperado"] else ""
            print(f"    {marca_r} {r['control']} [{r['base']}]: {json.dumps(r['obtenido'], ensure_ascii=False)[:110]}{difiere}")
    print(f"✓ marcadores de docs/marcadores/: {n_marc['declarados']} declarados · {n_marc['comprobados']} comprobados contra su cifra"
          f" · {n_marc['pendientes']} aún sin cifra{' (fallan: --estricto)' if a.estricto else ''}")
    for x in avisos:
        print(f"⚠ {x}")
    if fallos:
        print(f"\n✗ EXPORTACIÓN FALLIDA · {len(fallos)} puerta(s) sin pasar · nada se ha escrito en el sitio")
        for x in fallos:
            print(f"  ✗ {x}")
        (CACHE_EXP / "informe_ultimo.txt").write_text("\n".join(fallos) + "\n", encoding="utf-8")
        print(f"  (preparación conservada en {staging}; informe en {CACHE_EXP / 'informe_ultimo.txt'})")
        return 1
    if a.comprobar or a.solo:
        print(f"✓ todo pasa · {len(ctx.escritos)} archivos preparados en {staging} · nada volcado ({'--comprobar' if a.comprobar else '--solo'})")
        return 0
    cambiados, iguales, sobrantes = vuelca(ctx)
    shutil.rmtree(staging, ignore_errors=True)
    print(f"✓ volcado: {cambiados} archivos nuevos o cambiados, {iguales} iguales → {SRC_DATA.relative_to(RAIZ)}/ y {PUB_DATOS.relative_to(RAIZ)}/")
    for s in sobrantes:
        print(f"⚠ {s} está en el sitio y esta exportación no lo escribe (¿resto de otra versión?)")
    print(f"✓ hecho en {time.time() - t0:.0f} s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
