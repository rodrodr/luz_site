"""Utilidades comunes del exportador del sitio de Luz y Taquígrafos (dueño: exportador).

Todo módulo de `exportador/modulos/` recibe un `Contexto` (`ctx`) y devuelve sus cifras. Este archivo reúne lo
que varios módulos comparten, para que nadie vuelva a leer, plegar o emparejar las bases por su cuenta:

  Entradas y huellas     V2 (MD5), v3 (sha256 de corpus.sqlite y del CSV v3), metadatos del proyecto (sha256 de
                         sessions.json), CGOCUS V1.1 (versión, UNF y MD5 de cada archivo contra la API de Dataverse),
                         hemiciclo (sha256), motor del explorador (sha256 de engine.js), instantánea de Dataverse y
                         del explorador (`exportador/instantaneas/<fecha>/`).
  Filas                  ctx.v2()  · 107.551 filas V2 sin texto, con `rol` y `presidencia` (parse_speaker del
                                     explorador), `familia` e `ideo` normalizadas como el explorador, `etapa`,
                                     `clave` de sesión («AAAA-MM-DD-n»), `mes`.
                         ctx.v3()  · 121.700 filas v3 sin texto, con `role`, `chair`, `habla` (role ∉ {summary,
                                     remark}), `etapa`, `clave`, `mes`.
                         ctx.v2_texto() / ctx.v3_texto()   · Series id → texto literal.
                         ctx.v2_plegado() / ctx.v3_plegado() · Series id → texto en minúsculas y sin diacríticos.
                         ctx.buscar_v2(expr) / ctx.buscar_v3(expr) · ids cuyas filas casan la expresión (sobre el
                                     texto plegado). ctx.fts_v3(consulta) · ids que devuelve el FTS del explorador.
                         ctx.fila_v2(id) / ctx.fila_v3(id) · dict de la fila, con texto.
  Correspondencias       ctx.mapa_v2_v3() · piezas V2 → v3 (`tools/mapa_v2_v3.json`, local y SIN PUBLICAR;
                                     huella comprobada contra el CSV v3 que sirve el explorador).
                         ctx.v3_de_v2(id_v2) · ids v3 que salen de una fila V2.
  Sesiones               ctx.proyecto() · sessions.json · ctx.meta_sesion(clave) · metadatos de una sesión.
                         ctx.compartido['sesiones' | 'etapas' | 'meses'] · lo que calcula base.py (se ejecuta el
                                     primero): úselo en lugar de recalcular.
  Agregados comunes      ctx.oradores(base, por, sin_presidencia) · filas y palabras por rep_id (y etapa o
                                     legislatura) en V2 o en la v3 (habla).
                         ctx.familias(por, sin_presidencia) · filas y palabras V2 por familia normalizada.
                         ctx.bibliotecas() · las 31 bibliotecas del proyecto que ofrece el explorador (v3).
                         ctx.clima_v2() / ctx.clima_v3() · acotaciones por fila con el motor del explorador.
  Afinidades             ctx.afin(nombre) · ruta comprobada de cada archivo de CGOCUS V1.1.
  Salida                 ctx.cifra(...) · construye una cifra con el formato del contrato.
                         ctx.escribir_json(nombre, datos) · a `src/data/` (vía el área de preparación).
                         ctx.escribir_datos(nombre, cabecera, filas) · CSV y XLSX a `public/datos/`.

⛔ No se escribe fuera de `luz_site/` salvo la caché de `~/.cache/luz_site/exportador/`. No se lee de
`aecpa2026/figs/data/` nada que no sea `hemiciclo_1936.json`.
"""
from __future__ import annotations

import csv
import hashlib
import html as htmlmod
import io
import json
import re
import shutil
import sqlite3
import subprocess
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from types import MappingProxyType

import pandas as pd

# ── rutas ─────────────────────────────────────────────────────────────────────────────────────────────────────────
EXP = Path(__file__).resolve().parent
RAIZ = EXP.parent
SRC_DATA = RAIZ / "src" / "data"
PUB_DATOS = RAIZ / "public" / "datos"
DOCS = RAIZ / "docs"
ESTUDIO = DOCS / "estudio"
MARCADORES = DOCS / "marcadores"
MOTOR = EXP / "motor"
INSTANTANEAS = EXP / "instantaneas"
GRAFIAS_CSV = EXP / "grafias.csv"
CACHE = Path.home() / ".cache" / "luz_site"
CACHE_EXP = CACHE / "exportador"

BASE_2REP = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base")
V2_CSV = BASE_2REP / "2REP_Diaries.csv"
V3_DB = CACHE / "corpus.sqlite"
V3_CSV = BASE_2REP / "2REP_Diaries_v3.csv"
PROYECTO_JSON = BASE_2REP / "2REP_Explorer" / "standalone" / "data" / "sessions.json"
MAPA_V2_V3 = BASE_2REP / "2REP_Explorer" / "tools" / "mapa_v2_v3.json"
BIBLIOTECAS_DIR = BASE_2REP / "2REP_Explorer" / "dist" / "bibliotecas"
ERRATAS_FECHAS = BASE_2REP / "Dataverse_V2_2026-09-15" / "erratas_fechas_V1.csv"
CLIMA_V3_CACHE = CACHE / "clima"
AECPA = Path("/Users/rodrodr/Dropbox/Apps/aecpa2026")
FIGS_DATA = AECPA / "figs" / "data"
HEMICICLO = FIGS_DATA / "hemiciclo_1936.json"
HERO_SVG = AECPA / "landing" / "hero_svg.py"
CRITICA = ESTUDIO / "critica"

# CGOCUS V1.1: dónde está cada archivo depositado en este equipo (se comprueba su MD5 contra la API de Dataverse).
AFIN_ARCHIVOS = {
    "2REP_coauthor_edgelist.tab": {"ruta": CRITICA / "afin_coauthor_edgelist.csv", "sep": ","},
    "representative_metadata.tab": {"ruta": CRITICA / "afin_diputados_basico.csv", "sep": ";",
                                    "nota": "la copia de la app usa «;»; el MD5 depositado es el del mismo archivo con «,»"},
    "representatives_roles.json": {"ruta": CRITICA / "afin_roles_diputados.json"},
    "representatives_metrics.json": {"ruta": AECPA / "figs" / "afinidades" / "metricas_diputados.json"},
    "2REP_cosponsorship.tab": {"ruta": Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Coautorias/data/dataverse/2REP_cosponsorship.csv"), "sep": ","},
}

# ── huellas esperadas (si una no cuadra, el exportador se para) ──────────────────────────────────────────────────
MD5_V2 = "360332a0ff1327671530f15eed46ac0c"
BYTES_V2 = 165_785_782
SHA256_V3 = "3a0d8b2dea42e8836a955d6b8fe33bfd30b4ee6ed60bad76d87c17a3dde5df15"
SHA256_V3_CSV = "e1906abc601795860a2da5835571dc0f10b58e3679aa6867a27d68af843eb5f9"
SHA256_PROYECTO = "b3295e99f45af95a4d6f47f910fcacea7fc5f6da98ffde38df726fda1d7231da"
SHA256_HEMICICLO = "54ee48fedda9f179f87ecd3c87d0cef38c17bc71cd329529cacc73707fb812c7"
SHA256_MOTOR = "b8c0f571c65dcc40f1aafe8634b6449200d58146c748f7d5fb42d77d8db66b52"
AFIN_VERSION = (1, 1)
AFIN_UNF = "UNF:6:CMFrKjuOq5l9fBChyzsMsQ=="
N_FILAS_V2 = 107_551
N_FILAS_V3 = 121_700

COLUMNAS_V2 = ["id", "num_session", "order", "date", "speaker", "speech", "rep_id", "rep_name", "district", "party",
               "party_family", "ideology", "nwords", "legislature"]
LEGISLATURAS = ["1931-1933", "1933-1935", "1936-1939"]
PRESIDENCIA = {"chair", "vicechair", "chair_age"}
NO_HABLA_V3 = {"summary", "remark"}

# Etapas (D-8): las dos primeras legislaturas enteras; la tercera se corta por su propia numeración.
ETAPAS = [
    {"id": "I", "slug": "1931", "leg": "1931-1933", "num": (1, 405)},
    {"id": "II", "slug": "1933", "leg": "1933-1935", "num": (1, 276)},
    {"id": "III", "slug": "1936", "leg": "1936-1939", "num": (1, 60)},
    {"id": "IV", "slug": "guerra", "leg": "1936-1939", "num": (61, 69)},
    {"id": "V", "slug": "mexico", "leg": "1936-1939", "num": (70, 74)},
]
ETAPA_IDS = [e["id"] for e in ETAPAS]

# Normalización de party_family: la MISMA que aplica el explorador (worker › R2.datos.normalizacion). Solo variantes
# del mismo lema; «Liberal» → «Liberales» (15.364 filas) está pendiente del autor (D-25).
FAMILIA_NORM = {"Republicanoses": "Republicanos", "Repubicanos": "Republicanos", "Republcanos": "Republicanos",
                "Republicano": "Republicanos", "Liberal": "Liberales", "Carlista": "Carlistas",
                "Agrario": "Agrarios", "catder": "Catder", "Nacionalistas vascos": "Nacionalista Vasco"}
FAMILIA_ETIQ = {"Catizq": "Catalanista de izquierda", "Catder": "Catalanista de derecha", "RE": "Renovación Española"}


class Falla(Exception):
    """Una puerta del exportador no se cumple: se para sin escribir en src/data/."""


def exige(cond, msg: str) -> None:
    if not cond:
        raise Falla(msg)


# ── utilidades ────────────────────────────────────────────────────────────────────────────────────────────────────

def huella(path: Path, algo: str = "sha256") -> str:
    h = hashlib.new(algo)
    with open(path, "rb") as f:
        for bloque in iter(lambda: f.read(1 << 20), b""):
            h.update(bloque)
    return h.hexdigest()


def plegar(texto) -> str:
    """Minúsculas y sin diacríticos (ñ → n), como el índice unicode61 remove_diacritics 2 del explorador."""
    if not isinstance(texto, str):
        return ""
    return unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode("ascii").lower()


def clave_sesion(fecha: str, num) -> str:
    return f"{fecha}-{int(num)}"


def etapa_de(leg: str, num: int) -> str:
    for e in ETAPAS:
        if e["leg"] == leg and e["num"][0] <= int(num) <= e["num"][1]:
            return e["id"]
    raise Falla(f"sesión sin etapa: legislatura {leg}, número {num}")


def meses_entre(desde: str, hasta: str) -> list[str]:
    y, m = map(int, desde.split("-"))
    y2, m2 = map(int, hasta.split("-"))
    out = []
    while (y, m) <= (y2, m2):
        out.append(f"{y:04d}-{m:02d}")
        m += 1
        if m == 13:
            y, m = y + 1, 1
    return out


def leer_json(path: Path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def volcar_json(datos) -> str:
    """JSON legible y compacto a la vez: sangría de 1 y cada elemento de una lista de objetos en su línea (diff limpio)."""
    def enc(o, nivel: int) -> str:
        pad, pad1 = " " * nivel, " " * (nivel + 1)
        if isinstance(o, dict):
            if not o:
                return "{}"
            items = [f"{pad1}{json.dumps(str(k), ensure_ascii=False)}: {enc(v, nivel + 1)}" for k, v in o.items()]
            return "{\n" + ",\n".join(items) + "\n" + pad + "}"
        if isinstance(o, list):
            if not o:
                return "[]"
            if all(isinstance(x, (dict, list)) for x in o):
                items = [pad1 + json.dumps(x, ensure_ascii=False, separators=(",", ":")) for x in o]
                return "[\n" + ",\n".join(items) + "\n" + pad + "]"
            return json.dumps(o, ensure_ascii=False, separators=(",", ":"))
        return json.dumps(o, ensure_ascii=False)
    return enc(datos, 0) + "\n"


def texto_llano(html_txt: str) -> str:
    """La cita de Dataverse viene con entidades y un <a>: se deja como la ve el lector."""
    return re.sub(r"<[^>]+>", "", htmlmod.unescape(html_txt or "")).strip()


# ── la instantánea de lo publicado (Dataverse, explorador, app de Afinidades) ─────────────────────────────────────

class Instantanea:
    """Lee la instantánea más reciente de `exportador/instantaneas/`. Sin instantánea, usa las respuestas del estudio
    (`docs/estudio/critica/dv_*.json` y la página del explorador guardada), fechadas el 22-09-2026."""

    def __init__(self) -> None:
        dirs = sorted(p for p in INSTANTANEAS.glob("????-??-??") if p.is_dir())
        self.dir = dirs[-1] if dirs else None
        self.fecha = self.dir.name if self.dir else "2026-09-22"

    def _lee(self, nombre: str):
        if self.dir and (self.dir / f"{nombre}.json").exists():
            return leer_json(self.dir / f"{nombre}.json")
        return None

    def dataset(self, ds: str) -> dict:
        d = self._lee(f"dv_{ds}")
        return (d["cuerpo"] if d else leer_json(CRITICA / f"dv_{ds.upper()}.json"))["data"]

    def versiones(self, ds: str) -> list:
        d = self._lee(f"dv_{ds}_versiones")
        return (d["cuerpo"] if d else leer_json(CRITICA / f"dv_{ds.upper()}_versions.json"))["data"]

    def cita(self, ds: str) -> str | None:
        d = self._lee(f"dv_{ds}_cita")
        return texto_llano(d["cuerpo"]["data"]["message"]) if d else None

    def uso(self, ds: str) -> dict | None:
        d = self._lee(f"dv_{ds}_uso")
        if not d:
            return None
        return {k: (v["data"].get(k) if isinstance(v.get("data"), dict) else v.get("data")) for k, v in d["cuerpo"].items()}

    def consultado(self, nombre: str) -> str:
        d = self._lee(nombre)
        return (d or {}).get("consultado", self.fecha)[:10]

    def explorador(self) -> dict:
        d = self._lee("explorador")
        if d:
            return d
        # Respaldo: la página guardada por el estudio (MD5 155b10fd…) y sus cabeceras.
        h = (CRITICA / "explorer_index_live.html").read_text(encoding="utf-8")

        def ext(clave):
            i = h.find(f'"{clave}":')
            return json.JSONDecoder().raw_decode(h, i + len(clave) + 3)[0] if i >= 0 else None
        man = ext("corpus_servido")
        return {"url": "https://rodrodr.github.io/luz_explorer/", "cabeceras": {}, "md5": huella(CRITICA / "explorer_index_live.html", "md5"),
                "bytes": len(h.encode()), "corpus_servido": man, "bibliotecas_proyecto": ext("bibliotecas_proyecto"),
                "fuente": (ext("fuente") or {}).get("fuente"), "trozos": [], "consultado": "2026-09-22"}

    def afinidades_app(self) -> dict | None:
        return self._lee("afinidades_app")


# ── el contexto que recibe cada módulo ───────────────────────────────────────────────────────────────────────────

class Contexto:
    def __init__(self, hoy: str, staging: Path, opciones=None) -> None:
        self.hoy = hoy
        self.opciones = opciones
        self.staging = staging
        self.data = staging / "data"
        self.datos = staging / "datos"
        self.data.mkdir(parents=True, exist_ok=True)
        self.datos.mkdir(parents=True, exist_ok=True)
        self.inst = Instantanea()
        self.huellas: dict[str, str] = {}
        self.escritos: dict[str, str] = {}      # ruta relativa → módulo que la escribió
        self.modulo = "exportar"
        self.compartido: dict = {}
        self.avisos: list[str] = []
        self._c: dict = {}
        # Cifras ya dadas por los módulos anteriores, en solo lectura (exportar.py › main la enlaza con su acumulador).
        # Un módulo que comparte claves con otro las da solo si no están aquí, y comprueba que valen lo mismo.
        self.dadas = MappingProxyType({})
        CACHE_EXP.mkdir(parents=True, exist_ok=True)

    # ── avisos y cifras ─────────────────────────────────────────────────────────────────────────────────────────
    def aviso(self, msg: str) -> None:
        self.avisos.append(f"[{self.modulo}] {msg}")

    def cifra(self, v, t: str, base: str, f: str, clave: str = "C", d: str | None = None, **extra) -> dict:
        """Una cifra con el formato del contrato: {v, t, base, clave, f, d} más `dec`, `n`, `den` opcionales."""
        if hasattr(v, "item"):
            v = v.item()
        c = {"v": v, "t": t, "base": base, "clave": clave, "f": f, "d": d or self.hoy}
        for k, x in extra.items():
            if x is not None:
                c[k] = x.item() if hasattr(x, "item") else x
        return c

    # ── escritura (siempre al área de preparación; exportar.py la vuelca si todo pasa) ──────────────────────────
    def _registra(self, rel: str) -> None:
        exige(rel not in self.escritos, f"{rel}: lo escriben dos módulos ({self.escritos.get(rel)} y {self.modulo})")
        self.escritos[rel] = self.modulo

    def escribir_json(self, nombre: str, datos) -> Path:
        rel = f"data/{nombre}"
        self._registra(rel)
        p = self.data / nombre
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(volcar_json(datos), encoding="utf-8")
        return p

    def escribir_texto(self, nombre: str, texto: str) -> Path:
        """`public/datos/<nombre>` como texto UTF-8 (p. ej. la salida de los fragmentos de código)."""
        rel = f"datos/{nombre}"
        self._registra(rel)
        p = self.datos / nombre
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(texto, encoding="utf-8")
        return p

    def copiar_a_data(self, origen: Path, nombre: str) -> Path:
        rel = f"data/{nombre}"
        self._registra(rel)
        p = self.data / nombre
        p.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(origen, p)
        return p

    def escribir_datos(self, nombre: str, cabecera: list[str], filas: list[list], xlsx: bool = True) -> Path:
        """`public/datos/<nombre>.csv` (coma, UTF-8, cabecera, como ParlaIbero) y, si `xlsx`, el .xlsx gemelo."""
        rel = f"datos/{nombre}.csv"
        self._registra(rel)
        buf = io.StringIO()
        w = csv.writer(buf, lineterminator="\n")
        w.writerow(cabecera)
        w.writerows(filas)
        p = self.datos / f"{nombre}.csv"
        p.write_text(buf.getvalue(), encoding="utf-8")
        if xlsx:
            from openpyxl import Workbook
            self._registra(f"datos/{nombre}.xlsx")
            wb = Workbook()
            ws = wb.active
            ws.title = nombre[:31]
            ws.append(cabecera)
            for fila in filas:
                ws.append([x if not isinstance(x, (dict, list)) else json.dumps(x, ensure_ascii=False) for x in fila])
            wb.save(self.datos / f"{nombre}.xlsx")
        return p

    # ── V2 ─────────────────────────────────────────────────────────────────────────────────────────────────────
    def _lee_v2(self) -> pd.DataFrame:
        if "v2_bruto" not in self._c:
            df = pd.read_csv(V2_CSV, sep=";", dtype=str, keep_default_na=False)
            exige(list(df.columns) == COLUMNAS_V2, f"columnas V2 inesperadas: {list(df.columns)}")
            exige(len(df) == N_FILAS_V2, f"V2 con {len(df)} filas; se esperaban {N_FILAS_V2}")
            self._c["v2_bruto"] = df
        return self._c["v2_bruto"]

    def v2(self) -> pd.DataFrame:
        """Las 107.551 filas V2 sin texto, con papel, familia, etapa y clave de sesión. No la modifique: cópiela."""
        if "v2" not in self._c:
            b = self._lee_v2()
            df = b.drop(columns=["speech"]).copy()
            for c in ("id", "num_session", "order", "nwords"):
                df[c] = df[c].astype(int)
            df["rep_id"] = pd.to_numeric(df["rep_id"].replace("", None), errors="raise").astype("Int64")
            for c in ("rep_name", "district", "party", "party_family", "ideology"):
                df[c] = df[c].replace("", None)
            df["mes"] = df["date"].str.slice(0, 7)
            df["anio"] = df["date"].str.slice(0, 4).astype(int)
            df["clave"] = df["date"] + "-" + df["num_session"].astype(str)
            df["etapa"] = [etapa_de(l, n) for l, n in zip(df["legislature"], df["num_session"])]
            papel = self.papel(list(zip(df["speaker"], df["rep_name"].fillna(""))))
            df["rol"] = [papel[k][0] for k in zip(df["speaker"], df["rep_name"].fillna(""))]
            df["presidencia"] = df["rol"].isin(PRESIDENCIA)
            fam = df["party_family"].str.strip().replace(FAMILIA_NORM)
            df["familia"] = fam.map(lambda v: FAMILIA_ETIQ.get(v, v) if isinstance(v, str) else "Sin identificar")
            df["ideo"] = df["ideology"].str.strip().fillna("NA")
            exige(df["id"].tolist() == list(range(1, N_FILAS_V2 + 1)), "los ids V2 no son 1…107.551 contiguos")
            self._c["v2"] = df
        return self._c["v2"]

    def v2_texto(self) -> pd.Series:
        if "v2_texto" not in self._c:
            b = self._lee_v2()
            self._c["v2_texto"] = pd.Series(b["speech"].values, index=b["id"].astype(int).values, name="speech")
        return self._c["v2_texto"]

    def v2_plegado(self) -> pd.Series:
        if "v2_plegado" not in self._c:
            self._c["v2_plegado"] = self._plegado("v2", MD5_V2, self.v2_texto)
        return self._c["v2_plegado"]

    def _plegado(self, nombre: str, h: str, fuente) -> pd.Series:
        pq = CACHE_EXP / f"plegado_{nombre}_{h[:16]}.parquet"
        if pq.exists():
            s = pd.read_parquet(pq)["t"]
            s.index = s.index.astype(int)
            return s
        t = fuente()
        s = pd.Series([plegar(x) for x in t.values], index=t.index, name="t")
        s.to_frame().to_parquet(pq)
        return s

    def buscar_v2(self, expr: str) -> list[int]:
        """Ids V2 cuyo texto plegado casa la expresión regular (escríbala en minúsculas y sin tildes)."""
        s = self.v2_plegado()
        return [int(i) for i in s.index[s.str.contains(expr, regex=True)]]

    def fila_v2(self, i: int) -> dict:
        r = self._lee_v2().iloc[int(i) - 1]
        exige(int(r["id"]) == int(i), f"fila V2 {i} fuera de sitio")
        return r.to_dict()

    # ── v3 ─────────────────────────────────────────────────────────────────────────────────────────────────────
    def v3_db(self) -> sqlite3.Connection:
        if "v3_db" not in self._c:
            self._c["v3_db"] = sqlite3.connect(f"file:{V3_DB}?mode=ro", uri=True, check_same_thread=False)
        return self._c["v3_db"]

    def v3(self) -> pd.DataFrame:
        """Las 121.700 filas v3 sin texto, con el papel del motor del explorador. No la modifique: cópiela."""
        if "v3" not in self._c:
            cols = ["id", "num_session", "ord", "date", "legislature", "speaker", "rep_id", "rep_name", "district",
                    "party", "party_family_raw", "party_family", "ideology_raw", "ideology", "nwords"]
            df = pd.read_sql_query(f"select {','.join(cols)} from speeches order by id", self.v3_db())
            exige(len(df) == N_FILAS_V3, f"v3 con {len(df)} filas; se esperaban {N_FILAS_V3}")
            df["rep_id"] = df["rep_id"].astype("Int64")
            df["mes"] = df["date"].str.slice(0, 7)
            df["clave"] = df["date"] + "-" + df["num_session"].astype(str)
            df["etapa"] = [etapa_de(l, n) for l, n in zip(df["legislature"], df["num_session"])]
            pares = list(zip(df["speaker"].fillna(""), df["rep_name"].fillna("")))
            papel = self.papel(pares)
            df["role"] = [papel[k][0] for k in pares]
            df["chair"] = [bool(papel[k][1]) for k in pares]
            df["habla"] = ~df["role"].isin(NO_HABLA_V3)
            self._c["v3"] = df
            self._comprueba_clima_v3(df)
        return self._c["v3"]

    def v3_texto(self) -> pd.Series:
        if "v3_texto" not in self._c:
            r = self.v3_db().execute("select id, speech from speeches order by id").fetchall()
            self._c["v3_texto"] = pd.Series([x[1] or "" for x in r], index=[x[0] for x in r], name="speech")
        return self._c["v3_texto"]

    def v3_plegado(self) -> pd.Series:
        if "v3_plegado" not in self._c:
            self._c["v3_plegado"] = self._plegado("v3", SHA256_V3, self.v3_texto)
        return self._c["v3_plegado"]

    def buscar_v3(self, expr: str) -> list[int]:
        s = self.v3_plegado()
        return [int(i) for i in s.index[s.str.contains(expr, regex=True)]]

    def fts_v3(self, consulta: str) -> list[int]:
        """Ids que devuelve el índice FTS5 del explorador (`speeches_fts MATCH`), la misma base que su buscador."""
        return [r[0] for r in self.v3_db().execute(
            "select rowid from speeches_fts where speeches_fts match ? order by rowid", (consulta,))]

    def fila_v3(self, i: int) -> dict:
        cur = self.v3_db().execute("select * from speeches where id = ?", (int(i),))
        cols = [d[0] for d in cur.description]
        r = cur.fetchone()
        exige(r is not None, f"fila v3 {i} no existe")
        return dict(zip(cols, r))

    # ── papel del orador con el motor del explorador ────────────────────────────────────────────────────────────
    def papel(self, pares: list[tuple[str, str]]) -> dict[tuple[str, str], tuple]:
        """(speaker, rep_name) → (role, is_chair, group) con `R2.diario.parse_speaker` (motor/engine.js)."""
        memo = self._c.setdefault("papel", {})
        faltan = sorted({(s or "", r or "") for s, r in pares} - set(memo))
        if faltan:
            tmp = CACHE_EXP / "tmp"
            tmp.mkdir(exist_ok=True)
            trozos = [faltan[i::8] for i in range(8)]

            def corre(k: int):
                ent, sal = tmp / f"pares_{k}.json", tmp / f"papel_{k}.json"
                ent.write_text(json.dumps(trozos[k], ensure_ascii=False), encoding="utf-8")
                subprocess.run(["node", str(MOTOR / "papel.mjs"), str(ent), str(sal)], check=True, capture_output=True, text=True)
                return json.loads(sal.read_text(encoding="utf-8"))
            with ThreadPoolExecutor(max_workers=8) as ex:
                for k, res in enumerate(ex.map(corre, range(8))):
                    for par, pap in zip(trozos[k], res):
                        memo[par] = tuple(pap)
        return memo

    def _comprueba_clima_v3(self, df: pd.DataFrame) -> None:
        """La caché ~/.cache/luz_site/clima/*.jsonl (papel y acotaciones de cada fila v3) solo se usa si su huella
        cuadra: los mismos 121.700 ids, ningún error del motor y el MISMO papel que acabamos de calcular."""
        partes = sorted(CLIMA_V3_CACHE.glob("part*.jsonl"))
        estado = {"ruta": str(CLIMA_V3_CACHE), "archivos": len(partes)}
        if not partes:
            estado["valida"] = False
            estado["motivo"] = "no existe"
        else:
            h = hashlib.sha256()
            recs = {}
            for p in partes:
                b = p.read_bytes()
                h.update(b)
                for l in b.decode("utf-8").splitlines():
                    if l:
                        r = json.loads(l)
                        recs[r["id"]] = r
            estado["sha256"] = h.hexdigest()
            ids_ok = set(recs) == set(df["id"].tolist())
            errores = sum("err" in r for r in recs.values())
            iguales = ids_ok and all(recs[i].get("role") == ro and bool(recs[i].get("chair")) == ch
                                     for i, ro, ch in zip(df["id"], df["role"], df["chair"]))
            estado.update({"ids": ids_ok, "errores": errores, "papel_igual": iguales, "valida": ids_ok and errores == 0 and iguales})
            if estado["valida"]:
                self._c["clima_v3_recs"] = recs
            else:
                self.aviso("la caché clima/*.jsonl no cuadra con la v3 y el motor: se recalculará si alguien la pide")
        self.huellas["clima_v3_cache"] = json.dumps(estado, ensure_ascii=False)
        self.compartido["clima_v3_cache"] = estado

    def _clima(self, filas: list[dict], nombre: str) -> pd.DataFrame:
        tmp = CACHE_EXP / "tmp"
        tmp.mkdir(exist_ok=True)
        trozos = [filas[i::8] for i in range(8)]

        def corre(k: int):
            ent, sal = tmp / f"clima_{nombre}_in_{k}.jsonl", tmp / f"clima_{nombre}_out_{k}.jsonl"
            with open(ent, "w", encoding="utf-8") as f:
                for r in trozos[k]:
                    f.write(json.dumps(r, ensure_ascii=False) + "\n")
            subprocess.run(["node", str(MOTOR / "clima.mjs"), str(ent), str(sal)], check=True, capture_output=True, text=True)
            return [json.loads(l) for l in sal.read_text(encoding="utf-8").splitlines() if l]
        recs = []
        with ThreadPoolExecutor(max_workers=8) as ex:
            for res in ex.map(corre, range(8)):
                recs.extend(res)
        return self._clima_df(recs)

    @staticmethod
    def _clima_df(recs) -> pd.DataFrame:
        errores = [r for r in recs if "err" in r]
        exige(not errores, f"el motor falla en {len(errores)} filas (p. ej. {errores[:1]})")
        df = pd.DataFrame(recs).rename(columns={"n": "unidades", "ap": "aplauso", "co": "conflicto", "or": "orden", "ne": "neutral"})
        return df.set_index("id").sort_index()

    def clima_v2(self) -> pd.DataFrame:
        """Acotaciones de cada fila V2 (unidades, aplauso, conflicto, orden, neutral, lab) con el motor del explorador."""
        if "clima_v2" not in self._c:
            pq = CACHE_EXP / f"clima_v2_{MD5_V2[:12]}_{SHA256_MOTOR[:12]}.pkl"
            if pq.exists():
                self._c["clima_v2"] = pd.read_pickle(pq)
            else:
                b = self._lee_v2()
                filas = [{"id": int(i), "speaker": s, "rep_name": r, "speech": t}
                         for i, s, r, t in zip(b["id"], b["speaker"], b["rep_name"], b["speech"])]
                df = self._clima(filas, "v2")
                df.to_pickle(pq)
                self._c["clima_v2"] = df
        return self._c["clima_v2"]

    def clima_v3(self) -> pd.DataFrame:
        """Acotaciones de cada fila v3; reutiliza ~/.cache/luz_site/clima/*.jsonl si su huella cuadra."""
        if "clima_v3" not in self._c:
            self.v3()
            if "clima_v3_recs" in self._c:
                self._c["clima_v3"] = self._clima_df(list(self._c["clima_v3_recs"].values()))
            else:
                t = self.v3_texto()
                v = self.v3()
                filas = [{"id": int(i), "speaker": s or "", "rep_name": r or "", "speech": t[int(i)]}
                         for i, s, r in zip(v["id"], v["speaker"], v["rep_name"])]
                self._c["clima_v3"] = self._clima(filas, "v3")
        return self._c["clima_v3"]

    # ── metadatos del proyecto ──────────────────────────────────────────────────────────────────────────────────
    def proyecto(self) -> dict:
        if "proyecto" not in self._c:
            d = leer_json(PROYECTO_JSON)
            exige(d.get("corpus") == "2REP_Diaries" and d.get("n_sessions") == 755, "sessions.json no describe las 755 sesiones V2")
            self._c["proyecto"] = d
        return self._c["proyecto"]

    def meta_sesion(self, clave: str) -> dict:
        """Metadatos del proyecto de una sesión («AAAA-MM-DD-n»), casados por su rango de ids V2."""
        if "meta_por_clave" not in self._c:
            v2 = self.v2()
            por = {}
            for s in self.proyecto()["sessions"]:
                sub = v2.iloc[s["id_min"] - 1:s["id_max"]]
                exige(len(sub) == s["n"] and sub["clave"].nunique() == 1,
                      f"sessions.json: la sesión {s['session_id']} no casa con su rango de ids V2")
                k = sub["clave"].iloc[0]
                exige(k == clave_sesion(s["date"], s["num_session"]), f"sessions.json: {k} ≠ {s['date']}-{s['num_session']}")
                por[k] = s
            exige(len(por) == 755, "sessions.json no cubre las 755 claves")
            self._c["meta_por_clave"] = por
        return self._c["meta_por_clave"][clave]

    # ── correspondencia V2 → v3 (local, sin publicar) ───────────────────────────────────────────────────────────
    def mapa_v2_v3(self) -> pd.DataFrame:
        if "mapa" not in self._c:
            d = leer_json(MAPA_V2_V3)
            exige(d.get("destino_sha256") == SHA256_V3_CSV, "mapa_v2_v3.json no apunta al CSV v3 que sirve el explorador")
            exige(d["resumen"]["filas_v2"] == N_FILAS_V2 and d["resumen"]["filas_v3"] == N_FILAS_V3, "mapa_v2_v3.json: recuentos inesperados")
            df = pd.DataFrame(d["piezas"])
            df["id_v2"] = df["id_v2"].astype("Int64")
            exige(sorted(df["id_v3"].tolist()) == list(range(1, N_FILAS_V3 + 1)), "mapa_v2_v3.json no cubre las 121.700 filas v3")
            self._c["mapa"] = df
            self._c["mapa_resumen"] = d["resumen"]
        return self._c["mapa"]

    def v3_de_v2(self, id_v2: int) -> list[int]:
        m = self.mapa_v2_v3()
        return sorted(int(x) for x in m.loc[m["id_v2"] == int(id_v2), "id_v3"])

    # ── agregados que comparten varias figuras ──────────────────────────────────────────────────────────────────
    def oradores(self, base: str = "V2", por: str | None = "etapa", sin_presidencia: bool = True) -> pd.DataFrame:
        """Filas y palabras por `rep_id` (y por `etapa` o `legislature` si `por`), con nombre, partido y familia más
        frecuentes. V2: todas las filas con diputado, sin Presidencia si se pide. v3: solo habla (role ∉ {summary,
        remark}) y, si se pide, `chair = false` (la definición de F05)."""
        clave = ("oradores", base, por, sin_presidencia)
        if clave not in self._c:
            if base == "V2":
                d = self.v2()
                d = d[d["rep_id"].notna()]
                if sin_presidencia:
                    d = d[~d["presidencia"]]
            else:
                d = self.v3()
                d = d[d["habla"] & d["rep_id"].notna()]
                if sin_presidencia:
                    d = d[~d["chair"]]
            grupos = ["rep_id"] + ([por] if por else [])
            g = d.groupby(grupos, observed=True).agg(filas=("nwords", "size"), palabras=("nwords", "sum")).reset_index()
            moda = lambda s: s.dropna().value_counts().index[0] if s.notna().any() else None  # noqa: E731
            fam_col = "familia" if base == "V2" else "party_family"
            info = d.groupby(grupos, observed=True).agg(nombre=("rep_name", moda), partido=("party", moda), familia=(fam_col, moda)).reset_index()
            g = g.merge(info, on=grupos).sort_values(grupos[1:] + ["palabras"], ascending=[True] * (len(grupos) - 1) + [False])
            self._c[clave] = g.reset_index(drop=True)
        return self._c[clave]

    def familias(self, por: str = "etapa", sin_presidencia: bool = True) -> pd.DataFrame:
        """Filas y palabras V2 por familia normalizada (la del explorador) y por etapa o legislatura."""
        clave = ("familias", por, sin_presidencia)
        if clave not in self._c:
            d = self.v2()
            if sin_presidencia:
                d = d[~d["presidencia"]]
            g = d.groupby([por, "familia"]).agg(filas=("nwords", "size"), palabras=("nwords", "sum"),
                                                 diputados=("rep_id", "nunique")).reset_index()
            self._c[clave] = g
        return self._c[clave]

    def bibliotecas(self) -> list[dict]:
        """Las bibliotecas del proyecto (`2REP_Explorer/dist/bibliotecas/*.2replib`) cruzadas con la v3 servida:
        clave, nombre, descripción, entradas, palabras, sesiones [(clave, entradas)], etapas, primera y última fecha.
        Se comprueba que casan con la lista embebida en el explorador publicado (nombre y número de entradas)."""
        if "bibliotecas" not in self._c:
            v3 = self.v3().set_index("id")
            pub = {b["clave"]: b for b in (self.inst.explorador().get("bibliotecas_proyecto") or {}).get("bibliotecas", [])}
            out = []
            for f in sorted(BIBLIOTECAS_DIR.glob("*.2replib")):
                d = leer_json(f)
                exige(d.get("corpus") == "2REP_Diaries_v3", f"{f.name}: no es de la v3")
                clave = d["generado"]["biblioteca"]
                ids = [int(it["speech_id"]) for it in d["items"]]
                sub = v3.loc[ids]
                ses = sub.groupby("clave").size()
                out.append({"clave": clave, "nombre": d["collection"]["name"], "descripcion": d["collection"].get("description"),
                            "entradas": len(ids), "palabras": int(sub["nwords"].sum()),
                            "sesiones": [[k, int(n)] for k, n in ses.sort_index().items()],
                            "etapas": sorted(set(sub["etapa"]), key=ETAPA_IDS.index),
                            "desde": sub["date"].min(), "hasta": sub["date"].max(), "ids_v3": ids})
                if pub:
                    exige(clave in pub and pub[clave]["n"] == len(ids) and pub[clave]["nombre"] == d["collection"]["name"],
                          f"biblioteca {clave}: no casa con la lista del explorador publicado")
            if pub:
                exige(len(out) == len(pub), f"{len(out)} bibliotecas en dist/ frente a {len(pub)} en el explorador publicado")
            self._c["bibliotecas"] = out
        return self._c["bibliotecas"]

    # ── Afinidades Elegidas (CGOCUS V1.1) ───────────────────────────────────────────────────────────────────────
    def afin(self, nombre: str) -> Path:
        """Ruta local, con el MD5 ya comprobado contra la API de Dataverse, del archivo depositado `nombre`
        (p. ej. «2REP_coauthor_edgelist.tab», «representative_metadata.tab»)."""
        exige(nombre in self.compartido.get("afin_verificados", {}), f"CGOCUS: {nombre} no está comprobado")
        return AFIN_ARCHIVOS[nombre]["ruta"]

    def afin_sep(self, nombre: str) -> str:
        return AFIN_ARCHIVOS[nombre].get("sep", ",")
