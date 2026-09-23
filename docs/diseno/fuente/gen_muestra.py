#!/usr/bin/env python3
"""Genera docs/diseno/muestra.html: la página muestra del sistema de diseño de Luz y Taquígrafos.
Autocontenida: fuentes en base64 (latin, de @fontsource-variable), hemiciclo en línea, datos reales de
docs/estudio/critica/cobertura_mes_v2.json. Ninguna cifra tecleada salvo las que la narrativa verificada trae."""
import base64, json, math, re, pathlib, html

SITE = pathlib.Path('/Users/rodrodr/Dropbox/Apps/luz_site')
FS = SITE / 'node_modules/@fontsource-variable'
LAND = pathlib.Path('/Users/rodrodr/Dropbox/Apps/aecpa2026/landing')
HJ = json.load(open('/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/data/hemiciclo_1936.json', encoding='utf-8'))

def b64(p): return base64.b64encode((FS / p).read_bytes()).decode()

FONTS = f"""
@font-face{{font-family:'Cormorant Garamond Variable';font-style:italic;font-weight:300 700;font-display:swap;src:url(data:font/woff2;base64,{b64('cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2')}) format('woff2')}}
@font-face{{font-family:'EB Garamond Variable';font-style:normal;font-weight:400 800;font-display:swap;src:url(data:font/woff2;base64,{b64('eb-garamond/files/eb-garamond-latin-wght-normal.woff2')}) format('woff2')}}
@font-face{{font-family:'EB Garamond Variable';font-style:italic;font-weight:400 800;font-display:swap;src:url(data:font/woff2;base64,{b64('eb-garamond/files/eb-garamond-latin-wght-italic.woff2')}) format('woff2')}}
@font-face{{font-family:'JetBrains Mono Variable';font-style:normal;font-weight:100 800;font-display:swap;src:url(data:font/woff2;base64,{b64('jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}) format('woff2')}}
"""

# ---------------------------------------------------------------- utilidades
def mil(n):
    """Separador de miles español siempre, también en cuatro cifras (1.843), como fija el plan."""
    s = f"{int(n):d}"
    return re.sub(r"(\d)(?=(\d{3})+$)", r"\1.", s)

MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

# ---------------------------------------------------------------- hemiciclo
svg = (LAND / 'hero_hemiciclo.svg').read_text(encoding='utf-8')
BLOQ = {k: v['bloque'] for k, v in HJ['groups'].items()}
CX, YC = HJ['geom']['cx'], HJ['geom']['yc']
seats = []
def seat_sub(m):
    x, y, rot, g = float(m.group(1)), float(m.group(2)), m.group(3), m.group(4)
    r = math.hypot(x - CX, y - YC); a = math.degrees(math.atan2(y - YC, x - CX))
    seats.append((r, a))
    idx = len(seats) - 1
    return f'<g transform="translate({m.group(1)},{m.group(2)}) rotate({rot})" data-g="{g}" data-b="{BLOQ.get(g, "")}" style="--o:{{O{idx}}}">'
svg = re.sub(r'<g transform="translate\(([-\d.]+),([-\d.]+)\) rotate\(([-\d.]+)\)" data-g="([a-z]+)">', seat_sub, svg)
rs = [s[0] for s in seats]; rmin, rmax = min(rs), max(rs)
for i, (r, a) in enumerate(seats):
    # la Cámara se sienta: de la tribuna hacia fuera, fila a fila, y dentro de la fila de un extremo al otro
    o = round((r - rmin) / (rmax - rmin) * 900 + ((a + 180) % 360) / 180 * 160)
    svg = svg.replace(f'{{O{i}}}', str(o), 1)
svg = svg.replace('<path d=', '<path pathLength="1" d=')
svg = svg.replace('<svg class="hemi"', '<svg class="hemi" focusable="false"')
LEY = [('der', 'Derechas'), ('cen', 'Centro'), ('izq', 'Izquierdas'), ('gob', 'Gobierno')]
ley_html = []
for b, lab in LEY:
    ks = [k for k in HJ['orden'] if HJ['groups'][k]['bloque'] == b]
    items = ''.join(f'<li><i style="background:var(--g-{k})"></i>{html.escape(HJ["groups"][k]["nombre"])}</li>' for k in ks)
    ley_html.append(f'<div class="ley-b"><input type="radio" name="hemi-b" id="hb-{b}" value="{b}" class="sr-only">'
                    f'<label for="hb-{b}" class="ley-h">{lab}</label><ul>{items}</ul></div>')
ley_html = '\n'.join(ley_html)

# ---------------------------------------------------------------- calendario F01c (V2)
COB = json.load(open(SITE / 'docs/estudio/critica/cobertura_mes_v2.json', encoding='utf-8'))
MESES = COB['meses']; META = COB['_meta']
M = {m['mes']: m for m in MESES}
IDX = {m['mes']: i for i, m in enumerate(MESES)}
con = sorted(m['palabras'] for m in MESES if m['estado'] == 'sesion')
n = len(con)
cortes = [con[math.ceil(n * k / 5) - 1] for k in (1, 2, 3, 4)]  # rango más próximo: sin interpolar
def clase(p):
    for i, c in enumerate(cortes):
        if p <= c: return i
    return 4
ETAPAS = [
    ('I', 'Las Cortes Constituyentes', [(1931, 7, 12), (1932, 1, 12), (1933, 1, 10)]),
    ('II', 'La legislatura elegida en 1933', [(1933, 12, 12), (1934, 1, 12), (1935, 1, 12)]),
    ('III', 'Las Cortes de 1936, hasta la guerra', [(1936, 3, 7)]),
    ('IV', 'Las Cortes en guerra', [(1936, 10, 12), (1937, 1, 12), (1938, 1, 12), (1939, 1, 2)]),
    ('V', 'Las Cortes en México', [(1945, 1, 11)]),
]
ESPERADO = {'I': (405, 12966290), 'II': (276, 9476120), 'III': (60, 1690319), 'IV': (9, 127709), 'V': (5, 75458)}
maxm = max((m for m in MESES if m['estado'] == 'sesion'), key=lambda m: m['palabras'])
tras_julio = sum(M[k]['palabras'] for k in M if k >= '1936-10')
total_p = sum(m['palabras'] for m in MESES)
assert (sum(m['sesiones'] for m in MESES), sum(m['filas'] for m in MESES), total_p) == (755, 107551, 24335896)
assert tras_julio == 203167, tras_julio
NOTAS = {
    ('I', 1933): 'Enero de 1933: ninguna sesión. El debate de Casas Viejas llega en febrero.',
    ('IV', 1936): 'Tras el 18 de julio de 1936 quedan catorce sesiones, en extractos oficiales: el 0,83&nbsp;% de las palabras.',
}
my, mm = int(maxm['mes'][:4]), int(maxm['mes'][5:])
cal = []
for et, nombre, filas in ETAPAS:
    ses = pal = 0
    rows = []
    for (anio, a, b) in filas:
        celdas = []
        for mes in range(1, 13):
            k = f'{anio}-{mes:02d}'
            if mes < a or mes > b:
                celdas.append('<span class="c fuera" aria-hidden="true"></span>'); continue
            d = M[k]; i = IDX[k]
            if d['estado'] == 'sesion':
                ses += d['sesiones']; pal += d['palabras']
                celdas.append(f'<span class="c q{clase(d["palabras"])}" data-m="{k}" data-s="{d["sesiones"]}" '
                              f'data-f="{d["filas"]}" data-p="{d["palabras"]}" style="--n:{i}"></span>')
            else:
                celdas.append(f'<span class="c vacio" data-m="{k}" data-s="0" style="--n:{i}"></span>')
        nota = NOTAS.get((et, anio), '')
        if anio == my and a <= mm <= b and not nota:
            nota = (f'El mes con más palabras: {MES[mm-1]} de {my}, {mil(maxm["palabras"])} en '
                    f'{maxm["sesiones"]} sesiones.')
        nota_html = f'<p class="cal-nota">{nota}</p>' if nota else ''
        rows.append(f'<div class="cal-fila"><span class="cal-anio">{anio}</span>{"".join(celdas)}{nota_html}</div>')
    assert (ses, pal) == ESPERADO[et], (et, ses, pal)
    cal.append(f'<div class="cal-etapa" data-etapa="{et}" tabindex="0" role="group" '
               f'aria-label="Etapa {et}, {nombre}: {ses} sesiones, {mil(pal)} palabras. Las flechas recorren los meses.">'
               f'<div class="cal-cab"><a href="#ficha" class="cal-nombre"><span class="cal-rom">{et}</span> {nombre}</a>'
               f'<span class="cal-tot">{ses} sesiones · {mil(pal)} palabras</span></div>{"".join(rows)}</div>')
    if et == 'IV':
        cal.append('<div class="cal-salto" aria-label="De marzo de 1939 a diciembre de 1944: 70 meses sin ninguna sesión en el corpus">'
                   '<span class="cal-anio" aria-hidden="true">//</span><p><span class="mono">1939-03 → 1944-12</span>: 70 meses; el corpus no contiene ninguna sesión.</p></div>')
cal_html = '\n'.join(cal)
ley_cortes = [f'{mil(con[0])}–{mil(cortes[0])}'] + [f'{mil(cortes[i-1]+1)}–{mil(cortes[i])}' for i in (1, 2, 3)] + [f'{mil(cortes[3]+1)}–{mil(con[-1])}']
ley_cal = ''.join(f'<li><i class="c q{i}"></i><span>{t}</span></li>' for i, t in enumerate(ley_cortes))

# tabla: meses con sesión y una fila por hueco, con su rango
tab = []; hueco = []
ETQ = {'sin_sesion_en_legislatura': 'sin sesión, dentro de la etapa', 'sin_sesion_entre_legislaturas': 'entre legislaturas',
       'sin_sesion_guerra_exilio': 'sin sesión (guerra y exilio)'}
def cerrar_hueco():
    if not hueco: return
    a, b = hueco[0]['mes'], hueco[-1]['mes']
    rango = a if a == b else f'{a} → {b}'
    tab.append(f'<tr class="t-hueco"><th scope="row" class="mono">{rango}</th><td>{ETQ[hueco[0]["estado"]]}</td>'
               f'<td colspan="3" class="num">{len(hueco)} {"mes" if len(hueco)==1 else "meses"}</td></tr>')
    hueco.clear()
for m in MESES:
    if m['mes'] > '1945-11': break
    if m['estado'] == 'sesion':
        cerrar_hueco()
        tab.append(f'<tr><th scope="row" class="mono">{m["mes"]}</th><td>{m["legislatura"]}</td><td class="num">{m["sesiones"]}</td>'
                   f'<td class="num">{mil(m["filas"])}</td><td class="num">{mil(m["palabras"])}</td></tr>')
    else:
        if hueco and hueco[-1]['estado'] != m['estado']: cerrar_hueco()
        hueco.append(m)
cerrar_hueco()
tabla_html = '\n'.join(tab)
csv = 'mes,legislatura,estado,sesiones,filas,palabras\n' + '\n'.join(
    f'{m["mes"]},{m["legislatura"] or ""},{m["estado"]},{m["sesiones"]},{m["filas"]},{m["palabras"]}' for m in MESES)
csv_uri = 'data:text/csv;charset=utf-8;base64,' + base64.b64encode(csv.encode()).decode()

# ---------------------------------------------------------------- iconos (dibujados, una sola línea)
ICONOS = """<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-ext" viewBox="0 0 16 16"><path d="M5.5 3.5h7v7M12.5 3.5 4 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="square"/></symbol>
<symbol id="i-tema" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor"/></symbol>
<symbol id="i-copiar" viewBox="0 0 16 16"><rect x="5.5" y="5.5" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3.5 10.5h-1v-8h8v1" fill="none" stroke="currentColor" stroke-width="1.3"/></symbol>
<symbol id="i-bajar" viewBox="0 0 16 16"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>
<symbol id="i-marca" viewBox="0 0 32 22"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 1v6a14 14 0 0 0 28 0V1"/><path d="M8 1v6a8 8 0 0 0 16 0V1"/><path d="M13.2 1v6a2.8 2.8 0 0 0 5.6 0V1"/></g></symbol>
</svg>"""

CSS = (pathlib.Path(__file__).parent / 'muestra.css').read_text(encoding='utf-8')
JS = (pathlib.Path(__file__).parent / 'muestra.js').read_text(encoding='utf-8')
TPL = (pathlib.Path(__file__).parent / 'muestra_body.html').read_text(encoding='utf-8')

body = (TPL.replace('{{HEMI}}', svg).replace('{{LEY_HEMI}}', ley_html).replace('{{CAL}}', cal_html)
        .replace('{{LEY_CAL}}', ley_cal).replace('{{TABLA}}', tabla_html).replace('{{CSV}}', csv_uri)
        .replace('{{ICONOS}}', ICONOS).replace('{{MD5}}', META['md5'][:8]).replace('{{CALC}}', META['calculado'])
        .replace('{{N_CON}}', str(n)))
out = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Luz y Taquígrafos · muestra del sistema</title>
<meta name="description" content="Muestra del sistema de diseño del sitio de Luz y Taquígrafos: cabecera, portada, Inicio, ficha, figura y pie en los dos temas.">
<meta name="color-scheme" content="dark light">
<script>
(function(){{try{{var q=new URLSearchParams(location.search).get('tema');var t=q==='claro'?'light':q==='oscuro'?'dark':localStorage.getItem('tema');if(t)document.documentElement.dataset.theme=t;}}catch(e){{}}}})();
</script>
<style>{FONTS}
{CSS}</style>
</head>
<body>
{body}
<script>{JS}</script>
</body>
</html>"""
(SITE / 'docs/diseno/muestra.html').write_text(out, encoding='utf-8')
print('muestra:', len(out) // 1024, 'KB ·', len(seats), 'escaños · cortes', cortes, '· max', maxm['mes'], maxm['palabras'])
