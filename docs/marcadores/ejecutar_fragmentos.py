#!/usr/bin/env python3
"""Ejecuta los dos fragmentos de «Usar los datos» TAL COMO ESTÁN EN EL COPY y guarda su salida.

Extrae de `docs/copy_es/datos.md` los bloques de código de las claves `datos.codigo.r` y `datos.codigo.python`, los
ejecuta en un directorio temporal junto a los dos archivos que piden (el CSV V2 depositado y la tabla de diputados de
CGOCUS V1.1 en el formato `.tab` en que la sirve Dataverse), comprueba que R y Python dicen lo mismo y que su salida
reproduce los marcadores de `marcadores_metodo_datos.json`, y escribe `docs/marcadores/fragmentos_salida.txt`.

El `.tab` se reconstruye del original depositado (`representative_metadata.csv`, MD5 c9e660131cbfbe0ac96e56e59c94837d,
el que declara Dataverse) con la regla de ingesta de Dataverse: tabuladores, cabecera sin comillas, texto entre
comillas dobles, números sin ellas. La copia mide 156.736 bytes, lo mismo que el `.tab` depositado.

Uso:  python3 docs/marcadores/ejecutar_fragmentos.py      (≈ 10 s; pandas 3 y R 4.5)
"""
from __future__ import annotations

import datetime as dt
import hashlib
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import pandas as pd

AQUI = Path(__file__).resolve().parent
COPY = AQUI.parent / "copy_es" / "datos.md"
CSV = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv")
AFIN = Path("/Users/rodrodr/Dropbox/Apps/2REP/2REP_Coautorias/data/dataverse/representative_metadata.csv")
MD5 = {CSV: "360332a0ff1327671530f15eed46ac0c", AFIN: "c9e660131cbfbe0ac96e56e59c94837d"}
TAB_BYTES = 156736


def md5(p: Path) -> str:
    h = hashlib.md5()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def bloque(md: str, clave: str) -> tuple[str, str]:
    m = re.search(r"<!-- " + re.escape(clave) + r" -->\s*```(\w+)\n(.*?)\n```", md, flags=re.S)
    if not m:
        raise SystemExit(f"No encuentro el bloque de código de «{clave}» en {COPY}")
    return m.group(1), m.group(2) + "\n"


def tab_dataverse(origen: Path, destino: Path) -> None:
    a = pd.read_csv(origen)
    with open(destino, "w", encoding="utf-8", newline="") as f:
        f.write("\t".join(a.columns) + "\n")
        for fila in a.itertuples(index=False):
            celdas = []
            for v in fila:
                if pd.isna(v):
                    celdas.append("")
                elif isinstance(v, str):
                    celdas.append('"' + v.replace('"', '""') + '"')
                else:
                    celdas.append(str(v))
            f.write("\t".join(celdas) + "\n")
    assert destino.stat().st_size == TAB_BYTES, destino.stat().st_size


def main() -> None:
    for p, h in MD5.items():
        assert md5(p) == h, f"{p}: MD5 inesperado"
    md = COPY.read_text(encoding="utf-8")
    (lr, r), (lp, py) = bloque(md, "datos.codigo.r"), bloque(md, "datos.codigo.python")
    assert (lr, lp) == ("r", "python")
    with tempfile.TemporaryDirectory() as tmp:
        t = Path(tmp)
        (t / "2REP_Diaries.csv").symlink_to(CSV)
        tab_dataverse(AFIN, t / "representative_metadata.tab")
        (t / "fragmento.R").write_text(r, encoding="utf-8")
        (t / "fragmento.py").write_text(py, encoding="utf-8")
        sal_py = subprocess.run([sys.executable, "-W", "error", "fragmento.py"], cwd=t, check=True,
                                capture_output=True, text=True).stdout
        sal_r = subprocess.run(["Rscript", "fragmento.R"], cwd=t, check=True, capture_output=True, text=True).stdout
        ver_r = subprocess.run(["Rscript", "-e", "cat(R.version$major, R.version$minor, sep='.')"],
                               capture_output=True, text=True).stdout.strip()
    # Las dos salidas dicen lo mismo, número a número.
    nums = lambda s: re.findall(r"\d+", s)
    assert nums(sal_py) == nums(sal_r), (sal_py, sal_r)
    # Y reproducen los marcadores del copy.
    M = json.loads((AQUI / "marcadores_metodo_datos.json").read_text(encoding="utf-8"))
    esperado = [M[k]["v"] for k in ("mes.1933-02.sesiones", "mes.1933-02.filas", "mes.1933-02.palabras",
                                    "union.solo_id.filas", "filas.V2", "union.filas.sin_ficha", "union.pares.sin_ficha")]
    hallado = [int(x) for x in re.findall(r"\d+", sal_py.split("febrero de 1933:")[1])]
    hallado = [x for x in hallado if x != 1933][:3] + [int(x) for x in re.findall(r"\d+", sal_py.split("unión solo por el id:")[1])][:1] \
        + [int(x) for x in re.findall(r"\d+", sal_py.split("unión por id y legislatura:")[1])][:3]
    assert hallado == esperado, (hallado, esperado)
    assert f"meses con sesión: {M['meses.con_sesion']['v']}" in sal_py
    assert str(M["palabras.V2"]["v"]) != "" and sum(int(x) for x in re.findall(r"^\S+\s+\d+\s+\d+\s+(\d+)$", sal_py, flags=re.M)) == M["palabras.V2"]["v"]
    cab = (f"# Salida de los dos fragmentos de «Usar los datos» (docs/copy_es/datos.md, claves datos.codigo.r y datos.codigo.python)\n"
           f"# Ejecutados el {dt.datetime.now().isoformat(timespec='seconds')} con Python {sys.version.split()[0]} · pandas {pd.__version__}"
           f" (avisos elevados a error) y R {ver_r}\n"
           f"# 2REP_Diaries.csv (THQCMI V2.0) MD5 {MD5[CSV]} · representative_metadata.tab reconstruido del original de CGOCUS V1.1"
           f" (MD5 {MD5[AFIN]}), {TAB_BYTES} bytes como el depositado\n"
           f"# Comprobado: R y Python dan los mismos números, y reproducen filas.V2, palabras.V2, meses.con_sesion, mes.1933-02.*"
           f" y union.* de marcadores_metodo_datos.json\n")
    (AQUI / "fragmentos_salida.txt").write_text(cab + "\n## Python\n" + sal_py + "\n## R\n" + sal_r, encoding="utf-8")
    print(cab + "\n## Python\n" + sal_py + "\n## R\n" + sal_r)


if __name__ == "__main__":
    main()
