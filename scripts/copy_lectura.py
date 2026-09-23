#!/usr/bin/env python3
"""Genera docs/lectura/<lang>.md: el copy con las cifras de HOY ya puestas, para leerlo sin marcadores.

Es una COPIA DE LECTURA: se genera y no se edita; las correcciones van en docs/copy_<lang>/*.md. Los valores salen de
src/data/cifras.json (lo que escribe exportador/exportar.py), con el mismo formato que el sitio (src/lib/formato.ts,
comprobado contra src/data/formatos.json › pruebas). Lo que queda entre ⟦corchetes dobles⟧ aún no tiene valor: lo da el
investigador, es una variable de plantilla ({{n}}, {{fecha}}…) o el exportador aún no la escribe.

Uso:  python3 scripts/copy_lectura.py [es|en]
"""
import json, re, sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
NBSP = ' '
LETRA = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce',
         'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuna', 'veintidós', 'veintitrés', 'veinticuatro',
         'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta']
MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']


def agrupa(x, dec=0):
    s = f'{abs(x):,.{dec}f}'.replace(',', '§').replace('.', ',').replace('§', '.')
    return ('-' if x < 0 else '') + s


def peso(b, dec=1):
    mb = b / 1048576
    if mb < 1: return agrupa(b / 1024, 1) + NBSP + 'KB'
    return agrupa(mb / 1024, 1) + NBSP + 'GB' if mb >= 1024 else agrupa(mb, dec) + NBSP + 'MB'


def fecha(iso, fmt):
    y, m, *d = iso.split('-')
    if fmt == 'mes' or not d: return f'{MES[int(m) - 1]} de {y}'
    if fmt == 'fecha_corta': return f'{int(d[0])}-{ROM[int(m) - 1]}-{y}'
    if fmt == 'anio': return y
    return f'{int(d[0])} de {MES[int(m) - 1]} de {y}'


def formatea(c, fmt):
    v, t, dec = c['v'], c.get('t', 'n'), c.get('dec')
    t = {'int': 'n', 'bytes': 'peso', 'date': 'fecha', 'text': 'texto', 'year': 'anio'}.get(t, t)
    if fmt == 'letra' and isinstance(v, int) and 0 <= v < len(LETRA): return LETRA[v]
    if t == 'fecha' or fmt in ('fecha', 'fecha_larga', 'fecha_corta', 'mes'): return fecha(str(v), fmt)
    if fmt in ('peso', 'peso0', 'peso1', 'peso2') or t == 'peso': return peso(v, int(fmt[4:]) if fmt[4:].isdigit() else (dec if dec is not None else 1))
    if fmt.startswith('pct') or t == 'pct': return agrupa(100 * v, int(fmt[3:]) if fmt[3:].isdigit() else (dec if dec is not None else 2)) + NBSP + '%'
    if fmt in ('id', 'anio') or t in ('id', 'anio'): return str(int(v))
    if t == 'n': return agrupa(v, 0 if float(v).is_integer() else (dec if dec is not None else 1))
    if isinstance(v, dict): return v.get('es', '')
    return str(v)


def main():
    lang = sys.argv[1] if len(sys.argv) > 1 else 'es'
    carpeta = RAIZ / 'docs' / f'copy_{lang}'
    if not carpeta.is_dir():
        print(f'⚠ no existe docs/copy_{lang}/'); return
    f = RAIZ / 'src/data/cifras.json'
    cifras = json.loads(f.read_text(encoding='utf-8')) if f.exists() else {}

    def resuelve(m):
        clave, _, fmt = m.group(1).partition('|')
        c = cifras.get(clave.strip())
        return formatea(c, fmt.strip()) if c else '⟦' + clave.strip() + '⟧'

    partes, total, sin = [], 0, 0
    for md in sorted(carpeta.glob('*.md'), key=lambda p: (p.stem != 'comun', p.stem)):
        texto = md.read_text(encoding='utf-8')
        total += len(re.findall(r'\{\{[^{}]+\}\}', texto))
        salida = re.sub(r'\{\{([^{}]+)\}\}', resuelve, texto)
        sin += len(re.findall(r'⟦[^⟧]+⟧', salida))
        partes.append(f'<!-- ═══ {md.name} ═══ -->\n\n{salida}')
    fecha_datos = next((v.get('d') for v in cifras.values() if isinstance(v, dict) and v.get('d')), '—')
    aviso = (f'> ⚠ **VERSIÓN DE LECTURA — GENERADA, NO SE EDITA** (`python3 scripts/copy_lectura.py {lang}`). Es el copy de '
             f'`docs/copy_{lang}/` con las cifras de `src/data/cifras.json` ya puestas (exportadas el {fecha_datos}). Lo que sigue entre '
             '⟦corchetes dobles⟧ aún no tiene valor. Las correcciones se hacen en el copy.\n\n')
    destino = RAIZ / 'docs' / 'lectura' / f'{lang}.md'
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(aviso + '\n\n'.join(partes), encoding='utf-8')
    print(f'✓ docs/lectura/{lang}.md · {total} marcadores, {sin} sin valor')


if __name__ == '__main__':
    main()
