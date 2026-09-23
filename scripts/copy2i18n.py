#!/usr/bin/env python3
"""Genera src/i18n/<lang>.json desde docs/copy_<lang>/*.md (contrato de construcción § Copy).

El Markdown del copy es la FUENTE editable; el JSON es GENERADO y no se toca a mano. Formato idéntico al de ParlaIbero:
una unidad de texto empieza en su clave `<!-- clave -->` (el texto puede seguir en la misma línea) y acaba en la clave
siguiente, un encabezado, una nota de diseño (`>`), una regla (`---`) o un rótulo editorial (una línea ENTERA en
negrita). Todo lo que sigue a un encabezado `## Anexo` de un archivo no es copy.

`<!-- ↺ clave -->` repite una frase fija (o un rótulo) definida en otro sitio: todas sus apariciones deben ser
IDÉNTICAS a la definición, letra a letra, o el script falla.

Comprueba, además:
  · claves: sintaxis; una clave definida dos veces con textos distintos; una clave fuera del prefijo de su archivo (aviso);
  · marcadores `{{clave|formato}}`: llaves cerradas y formato conocido;
  · frases fijas del plan (§ Frases fijas ↺): que las trece estén, letra a letra (aviso; error con --strict).
El orden de las claves en el JSON es el del copy (comun.md primero y después los demás por orden alfabético): las
plantillas que «pintan lo que haya» lo siguen.

Uso:  python3 scripts/copy2i18n.py es              (escribe src/i18n/es.json)
      python3 scripts/copy2i18n.py en              (escribe src/i18n/en.json si existe docs/copy_en/)
      python3 scripts/copy2i18n.py es --check      (solo comprueba; no escribe)
      python3 scripts/copy2i18n.py es --strict     (las frases fijas que falten también fallan)
"""
import json, re, sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CLAVE = re.compile(r'^<!--\s*(↺\s*)?([A-Za-z0-9_.\-]+)\s*-->\s*(.*)$')
ROTULO = re.compile(r'^\*\*[^*]+\*\*$')
MARCADOR = re.compile(r'\{\{([^{}]*)\}\}')
# Los formatos que entiende `src/lib/formato.ts` (y el exportador, `formatos.json › formatos`, que se suma si existe).
# `peso_dec*`: peso en unidades DECIMALES (1 MB = 1.000.000 B), para «unos 112 MB comprimidos» (plan D-26 (a); REVISION
# P1-4); `peso*` es la unidad de Dataverse (1.024²).
FORMATOS = {'', 'n', 'id', 'anio', 'letra', 'texto', 'fecha', 'fecha_larga', 'fecha_corta', 'mes',
            'pct', 'pct0', 'pct1', 'pct2', 'pct3', 'peso', 'peso0', 'peso1', 'peso2',
            'peso_dec', 'peso_dec0', 'peso_dec1', 'peso_dec2', 'redondo'}
try:
    FORMATOS |= set(json.loads((RAIZ / 'src/data/formatos.json').read_text(encoding='utf-8')).get('formatos', {}))
except (OSError, ValueError):
    pass

# Prefijos esperados por archivo (aviso si una clave se sale del suyo). `fig.` vale en cualquier archivo: cada grupo
# escribe los textos de sus figuras donde le resulta natural.
PREFIJOS = {
    'comun': ('comun.', 'glosario.'),
    'inicio': ('inicio.',),
    'cortes': ('cortes.',), 'cortes_1931': ('cortes.',), 'cortes_1933': ('cortes.',), 'cortes_1936': ('cortes.',),
    'cortes_guerra': ('cortes.',), 'cortes_mexico': ('cortes.',),
    'sesiones': ('sesiones.', 'puerta.'),
    'diario': ('diario.',),
    'metodo': ('metodo.',),
    'datos': ('datos.', 'versiones.'),
    'explorador': ('explorador.',),
    'afinidades': ('afinidades.',),
    'figuras': ('fig.',),
}

# Las trece frases fijas del plan (§ Frases fijas ↺), con la marca de enlace [ ] donde el copy la lleva.
# Se comparan sin corchetes: el enlace es forma, no redacción.
FIJAS = [
    'Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.',
    'Edición depositada (V2)',
    'Edición del explorador (v3, sin depositar)',
    'Metadatos del proyecto (no depositados; el explorador no los muestra)',
    'Afinidades Elegidas (CGOCUS V1.1, depositada)',
    'Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.',
    'Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.',
    'El explorador no abre una búsqueda desde un enlace: cópiela y péguela en su buscador (tecla /).',
    'Contar una palabra no dice quién la defiende ni en qué tono.',
    'El texto sale del reconocimiento óptico y no está corregido a mano.',
    'La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.',
    'Que estén no valida su contenido.',
    # ↺ 10, redacción de la fase 2 (REVISION_FASE1 P2-4; peticiones/corrector-copy.md § B): en CGOCUS V1.1 el censo y el
    # edgelist dicen 1933-1936, pero `2REP_cosponsorship` dice 1933-1935; la frase ya no generaliza.
    'El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.',
    'El README depositado describe la primera versión; las diferencias, aquí.',
    'Sin formulario: son datos agregados.',
    'Esta cifra sale de la edición del explorador (v3, {{filas.v3}} filas, sin depositar); la depositada es la V2 ({{filas.V2}} filas). Por qué hay dos →',
]


def unidades(md: str):
    """(clave, es_fija, líneas) de cada unidad, en orden."""
    corte = re.search(r'^## Anexo', md, flags=re.M)
    lineas = (md if not corte else md[:corte.start()]).split('\n')
    actual, buf, en_codigo = None, [], False
    for ln in lineas:
        s = ln.rstrip()
        if s.lstrip().startswith('```'):
            en_codigo = not en_codigo
            if actual: buf.append(s)
            continue
        m = None if en_codigo else CLAVE.match(s.strip())
        if m:
            if actual: yield actual[0], actual[1], buf
            actual, buf = (m.group(2), bool(m.group(1))), ([m.group(3)] if m.group(3) else [])
            continue
        if not en_codigo and (s.startswith('#') or s.startswith('>') or s.strip() == '---' or ROTULO.match(s.strip())):
            if actual: yield actual[0], actual[1], buf
            actual, buf = None, []
            continue
        if actual: buf.append(s)
    if actual: yield actual[0], actual[1], buf


def sin_corchetes(s: str) -> str:
    return re.sub(r'\[([^\]]+)\]', r'\1', s)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    lang = args[0] if args else 'es'
    solo_check = '--check' in sys.argv
    estricto = '--strict' in sys.argv
    carpeta = RAIZ / 'docs' / f'copy_{lang}'
    if not carpeta.is_dir():
        print(f'⚠ {lang}: no existe docs/copy_{lang}/ — esa lengua se pinta con el texto español, marcado (data-sin-traducir).')
        return
    # LEEME.md es la guía de los traductores, no copy. Una carpeta que solo lo tiene cuenta como inexistente: no se
    # escribe un <lang>.json vacío (la lengua se sigue pintando con el español marcado).
    archivos = sorted((p for p in carpeta.glob('*.md') if p.stem.upper() != 'LEEME'),
                      key=lambda p: (p.stem != 'comun', p.stem))
    if not archivos:
        print(f'⚠ {lang}: docs/copy_{lang}/ aún no tiene copy — esa lengua se pinta con el texto español, marcado (data-sin-traducir).')
        return
    dic, origen, fijas_vistas = {}, {}, {}
    # Dónde repite cada archivo una frase fija o un rótulo (↺): tras qué clave propia. Las plantillas que «pintan lo que
    # haya» la ponen ahí (src/i18n/anclas/<lang>.json): así una llamada o una salvedad fija cae donde la quiso el copy.
    anclas = {}
    errores, avisos = [], []
    for f in archivos:
        previa = None
        for clave, fija, buf in unidades(f.read_text(encoding='utf-8')):
            texto = '\n'.join(buf).strip()
            aqui = f'{f.name} · {clave}'
            if not texto:
                errores.append(f'{aqui}: vacía'); continue
            if texto.startswith('[nota de diseño]'):
                continue
            # marcadores
            if texto.count('{{') != texto.count('}}'):
                errores.append(f'{aqui}: llaves de marcador sin cerrar')
            for m in MARCADOR.finditer(texto):
                clave_m, _, fmt = m.group(1).partition('|')
                if not clave_m.strip():
                    errores.append(f'{aqui}: marcador vacío «{m.group(0)}»')
                if fmt.strip() not in FORMATOS:
                    errores.append(f'{aqui}: formato desconocido «|{fmt.strip()}» en {m.group(0)} (admitidos: {", ".join(sorted(x for x in FORMATOS if x))})')
            # prefijo del archivo
            pref = PREFIJOS.get(f.stem)
            if pref and not clave.startswith(pref) and not clave.startswith('fig.') and not fija:
                avisos.append(f'{aqui}: la clave no empieza por {" o ".join(pref)} (prefijo de grupo del contrato)')
            if fija:
                fijas_vistas.setdefault(clave, []).append((f.name, texto))
                if previa: anclas.setdefault(previa, []).append(clave)
                continue
            previa = clave
            if clave in dic and dic[clave] != texto:
                errores.append(f'{aqui}: definida dos veces con textos distintos (la otra, en {origen[clave]})')
                continue
            if clave in dic:
                avisos.append(f'{aqui}: definida dos veces (el mismo texto; la otra, en {origen[clave]}); márquela con ↺ donde se repite')
            dic.setdefault(clave, texto)
            origen.setdefault(clave, f.name)

    # ↺: cada repetición, idéntica a su definición
    for clave, vistas in fijas_vistas.items():
        base = dic.get(clave)
        if base is None:
            # Una frase fija repetida pero sin definición: vale la primera, y todas deben coincidir entre sí.
            base = vistas[0][1]
            avisos.append(f'↺ {clave}: se repite en {", ".join(sorted({v[0] for v in vistas}))} pero no se define en ningún archivo sin ↺')
            dic[clave] = base
            origen[clave] = vistas[0][0]
        for archivo, texto in vistas:
            if texto != base:
                errores.append(f'↺ {clave} en {archivo}: la repetición no es idéntica a la de {origen[clave]} («{texto[:60]}…» ≠ «{base[:60]}…»)')

    # frases fijas del plan: las trece, letra a letra (sin la marca de enlace)
    if lang == 'es':
        presentes = {sin_corchetes(v).strip() for v in dic.values()}
        faltan = [f for f in FIJAS if sin_corchetes(f) not in presentes]
        for f in faltan:
            (errores if estricto else avisos).append(f'frase fija del plan que no está, letra a letra, en ninguna clave: «{f[:80]}»')

    for a in avisos: print('  ⚠ ' + a)
    if errores:
        print('\n'.join('✗ ' + e for e in errores)); sys.exit(1)
    if not solo_check:
        destino = RAIZ / 'src' / 'i18n' / f'{lang}.json'
        destino.parent.mkdir(parents=True, exist_ok=True)
        destino.write_text(json.dumps(dic, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
        (RAIZ / 'src' / 'i18n' / 'anclas').mkdir(parents=True, exist_ok=True)
        (RAIZ / 'src' / 'i18n' / 'anclas' / f'{lang}.json').write_text(json.dumps(anclas, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f'✓ {lang}: {len(dic)} claves desde {len(archivos)} archivos de docs/copy_{lang}/' + ('' if solo_check else f' → src/i18n/{lang}.json')
          + (f' · {len(avisos)} avisos' if avisos else ''))


if __name__ == '__main__':
    main()
