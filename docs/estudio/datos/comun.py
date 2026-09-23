#!/usr/bin/env python3
"""Utilidades comunes de los cálculos del sitio de Luz y Taquígrafos.

Fuente única: el CSV DEPOSITADO en Harvard Dataverse (doi:10.7910/DVN/THQCMI, V2.0, 15-09-2026),
2REP_Diaries.csv, 107.551 filas × 14 columnas, sep ';', QUOTE_ALL, UTF-8.
Se comprueba el MD5 publicado (360332a0ff1327671530f15eed46ac0c) antes de calcular nada.

La Presidencia se identifica con el MISMO analizador de etiquetas que usa el explorador web
(R2.diario.parse_speaker, copiado en motor/engine.js desde 2REP_Explorer/standalone/src): roles chair,
vicechair y chair_age. Así las cifras «sin Presidencia» del sitio son comparables con las del explorador.
"""
from __future__ import annotations

import hashlib
import json
import subprocess
import unicodedata
from pathlib import Path

import pandas as pd

AQUI = Path(__file__).resolve().parent
V2 = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv")
MD5_V2 = "360332a0ff1327671530f15eed46ac0c"
N_FILAS_V2 = 107_551
COLUMNAS_V2 = ["id", "num_session", "order", "date", "speaker", "speech", "rep_id", "rep_name",
               "district", "party", "party_family", "ideology", "nwords", "legislature"]
LEGISLATURAS = ["1931-1933", "1933-1935", "1936-1939"]
IDEOLOGIAS = ["EI", "I", "CI", "C", "CD", "D", "ED"]
IDEO_ETIQ = {"EI": "Extrema izquierda", "I": "Izquierda", "CI": "Centro-izquierda", "C": "Centro",
             "CD": "Centro-derecha", "D": "Derecha", "ED": "Extrema derecha", "NA": "Sin identificar"}
PRESIDENCIA = {"chair", "vicechair", "chair_age"}

FUENTE = {
    "fichero": "2REP_Diaries.csv",
    "deposito": "Harvard Dataverse, doi:10.7910/DVN/THQCMI, V2.0 (15-09-2026)",
    "md5": MD5_V2,
    "filas": N_FILAS_V2,
    "licencia": "CC BY 4.0",
}


def md5(path: Path) -> str:
    h = hashlib.md5()
    with open(path, "rb") as f:
        for bloque in iter(lambda: f.read(1 << 20), b""):
            h.update(bloque)
    return h.hexdigest()


def cargar_v2(con_texto: bool = False, comprobar_md5: bool = True) -> pd.DataFrame:
    """Lee el CSV V2 tal como está depositado y comprueba su integridad."""
    if comprobar_md5:
        m = md5(V2)
        if m != MD5_V2:
            raise SystemExit(f"MD5 inesperado {m}: no es el CSV V2 depositado")
    usecols = COLUMNAS_V2 if con_texto else [c for c in COLUMNAS_V2 if c != "speech"]
    df = pd.read_csv(V2, sep=";", usecols=usecols, dtype={"rep_id": "Int64", "speaker": str, "rep_name": str,
                                                         "party": str, "party_family": str, "ideology": str,
                                                         "district": str, "legislature": str, "date": str},
                     keep_default_na=True)
    if len(df) != N_FILAS_V2:
        raise SystemExit(f"{len(df)} filas; se esperaban {N_FILAS_V2}")
    df["nwords"] = df["nwords"].astype(int)
    df["mes"] = df["date"].str.slice(0, 7)
    df["anio"] = df["date"].str.slice(0, 4).astype(int)
    return df


def roles_presidencia(df: pd.DataFrame) -> pd.DataFrame:
    """Añade `rol` y `presidencia` con el parse_speaker del explorador (vía node)."""
    pares = df[["speaker", "rep_name"]].fillna("").drop_duplicates()
    entrada = AQUI / "_cache" / "etiquetas.json"
    entrada.parent.mkdir(exist_ok=True)
    entrada.write_text(json.dumps(pares.values.tolist(), ensure_ascii=False), encoding="utf-8")
    salida = subprocess.run(["node", str(AQUI / "motor" / "roles.mjs"), str(entrada)],
                            check=True, capture_output=True, text=True).stdout
    roles = json.loads(salida)
    mapa = {(s, r): rol for (s, r), rol in zip(pares.values.tolist(), roles)}
    claves = list(zip(df["speaker"].fillna(""), df["rep_name"].fillna("")))
    df["rol"] = [mapa[k] for k in claves]
    df["presidencia"] = df["rol"].isin(PRESIDENCIA)
    return df


# Normalización de party_family: la MISMA que aplica el explorador (worker › R2.datos.normalizacion; copia en
# landing/datos_explorador.json › familias_politicas.normalizacion_literal). Solo variantes del mismo lema que
# comparten partidos; «Liberal» → «Liberales» (15.364 filas) está marcada allí para revisión del autor.
FAMILIA_NORM = {"Republicanoses": "Republicanos", "Repubicanos": "Republicanos", "Republcanos": "Republicanos",
                "Republicano": "Republicanos", "Liberal": "Liberales", "Carlista": "Carlistas",
                "Agrario": "Agrarios", "catder": "Catder", "Nacionalistas vascos": "Nacionalista Vasco"}
FAMILIA_ETIQ = {"Catizq": "Catalanista de izquierda", "Catder": "Catalanista de derecha",
                "RE": "Renovación Española"}


def normalizar(df: pd.DataFrame) -> pd.DataFrame:
    """party_family normalizada (familia) e ideology sin espacios (ideo); NA → «Sin identificar»/«NA»."""
    fam = df["party_family"].str.strip().replace(FAMILIA_NORM)
    df["familia"] = fam.map(lambda v: FAMILIA_ETIQ.get(v, v) if isinstance(v, str) else "Sin identificar")
    df["ideo"] = df["ideology"].str.strip().fillna("NA")
    return df


def plegar(texto: str) -> str:
    """Minúsculas y sin diacríticos (como el unicode61 remove_diacritics 2 del explorador, en esencia)."""
    t = unicodedata.normalize("NFD", texto.lower())
    return "".join(c for c in t if unicodedata.category(c) != "Mn")


def escribir(nombre: str, datos: dict) -> Path:
    p = AQUI / nombre
    p.write_text(json.dumps(datos, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{p.name}: {p.stat().st_size:,} bytes")
    return p
