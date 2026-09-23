"""Genera los dos prototipos autocontenidos de movimiento (RECURSOS_VANGUARDIA.md).

p1_hemiciclo_portada.html : SVG real del hemiciclo (1936) + CSS nativo (0 KB de libreria):
    encendido de escanos por orden angular, descenso de camara con animation-timeline: scroll(),
    filtro por minoria con :has() y transicion de color con @property.
p2_diario_a_fila.html     : three.js r186 (Points + ShaderMaterial): la tinta de una pagina
    compuesta del Diario (16-VI-1936, ses. 45) viaja hasta las celdas de su fila de datos.
"""
import json, re, pathlib

APPS = pathlib.Path('/Users/rodrodr/Dropbox/Apps')
OUT = APPS / 'luz_site/docs/diseno/prototipos'
hemi = json.loads((APPS / 'aecpa2026/figs/data/hemiciclo_1936.json').read_text())
svg = (APPS / 'aecpa2026/landing/hero_hemiciclo.svg').read_text()
ses = json.loads((APPS / 'luz_site/docs/estudio/datos/sesiones_v2.json').read_text())['sesiones']

# --- P1: orden angular de cada escano (phi) -> --i ; clase por minoria ----------------
phis = sorted(range(len(hemi['seats'])), key=lambda k: -hemi['seats'][k]['phi'])
rank = {k: r for r, k in enumerate(phis)}
seat_re = re.compile(r'<g transform="(translate\([^"]*\) rotate\([^"]*\))" data-g="([a-z]+)">')
counter = iter(range(10_000))
def seat_sub(m):
    k = next(counter)
    return f'<g class="s" transform="{m.group(1)}" data-g="{m.group(2)}" style="--i:{rank.get(k, k)}">'
svg1 = seat_re.sub(seat_sub, svg)
assert next(counter) == 227, 'se esperaban 227 escanos'
groups = hemi['groups']
counts = {}
for s in hemi['seats']:
    counts[s['g']] = counts.get(s['g'], 0) + 1
vars_css = '\n'.join(f'  --g-{g}: {v["color"]};' for g, v in groups.items())
vars_css_l = '\n'.join(f'  --g-{g}: {v.get("color_claro", v["color"])};' for g, v in groups.items())
legend = '\n'.join(
    f'<label style="--c:var(--g-{g})"><input type="checkbox" name="g" value="{g}"><span class="sw"></span>{groups[g]["nombre"]} <small>{counts.get(g,0)}</small></label>'
    for g in hemi['orden'] if g in groups and counts.get(g))
has_rules = '\n'.join(
    f'.hemi-wrap:has(input[value="{g}"]:checked) .s[data-g="{g}"] {{ --on: 1; }}' for g in groups)

p1 = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hemiciclo en movimiento</title>
<style>
:root {{
  color-scheme: dark light;
  --bg:#0e0d0b; --ink:#efe6d2; --mute:#9d937f; --gold:#c9a45c; --line:#3a352c;
{vars_css}
}}
@media (prefers-color-scheme: light) {{ :root:not([data-theme="dark"]) {{
  --bg:#f4efe4; --ink:#1b1916; --mute:#6b6356; --gold:#8a6a26; --line:#cfc6b4;
{vars_css_l}
}} }}
@property --dim {{ syntax:'<number>'; inherits:true; initial-value:1; }}
@property --on {{ syntax:'<number>'; inherits:true; initial-value:0; }}
* {{ box-sizing:border-box }}
body {{ margin:0; background:var(--bg); color:var(--ink); font:16px/1.5 Georgia, 'Times New Roman', serif; }}
.stage {{ height:260vh; }}
.sticky {{ position:sticky; top:0; height:100vh; display:grid; grid-template-rows:auto 1fr auto; padding:24px 16px; overflow:hidden; }}
h1 {{ font-style:italic; font-weight:400; font-size:clamp(28px,5vw,56px); margin:0; text-wrap:balance; letter-spacing:-.01em }}
h1 em {{ color:var(--gold) }}
.kicker {{ font:12px/1.4 ui-monospace, Menlo, monospace; letter-spacing:.14em; text-transform:uppercase; color:var(--mute) }}
.room {{ perspective:1100px; perspective-origin:50% 20%; display:grid; place-items:center; min-height:0 }}
.hemi {{ width:min(92vw,880px); max-height:62vh; color:var(--line); transform-origin:50% 60%; }}
.hemi-mesa {{ color:var(--mute) }}
.s rect {{ transition: opacity .35s ease-out, filter .35s ease-out; }}
.hemi-wrap:has(input:checked) .s rect {{ opacity: calc(.14 + .86 * var(--on)); }}
.hemi-wrap:has(input:checked) .s rect {{ filter: saturate(calc(.2 + .8 * var(--on))); }}
{has_rules}
.legend {{ display:flex; flex-wrap:wrap; gap:6px 14px; font-size:13px; color:var(--mute); max-width:900px; margin:0 auto }}
.legend label {{ display:inline-flex; align-items:center; gap:6px; cursor:pointer }}
.legend input {{ accent-color: var(--gold) }}
.legend .sw {{ width:10px; height:10px; border-radius:2px; background:var(--c) }}
.legend small {{ font-variant-numeric: tabular-nums; opacity:.7 }}
.note {{ max-width:680px; margin:0 auto; padding:24px 16px 80px; color:var(--mute) }}
@media (prefers-reduced-motion: no-preference) {{
  /* 1. Encendido: cada escano entra en su orden angular (izquierda -> derecha del croquis) */
  .s rect {{ animation: ignite .9s cubic-bezier(.2,.7,.2,1) both; animation-delay: calc(var(--i) * 6ms + 200ms); }}
  @keyframes ignite {{ from {{ opacity:0; transform: translateY(-6px) scale(.9); }} }}
  /* 2. Descenso de camara ligado al scroll: la planta cenital se inclina hasta la vista desde la tribuna */
  @supports (animation-timeline: scroll()) {{
    .hemi {{ animation: descend linear both; animation-timeline: scroll(root); animation-range: 0 90%; }}
    @keyframes descend {{
      from {{ transform: rotateX(0deg) scale(1) translateY(0); }}
      to   {{ transform: rotateX(58deg) scale(1.28) translateY(-4%); }}
    }}
    .kicker {{ animation: fade linear both; animation-timeline: scroll(root); animation-range: 40% 90%; }}
    @keyframes fade {{ to {{ opacity:.25 }} }}
  }}
}}
</style></head>
<body>
<div class="stage"><div class="sticky hemi-wrap">
  <header>
    <div class="kicker">Cortes de 1936 · 227 escaños del plano · croquis de Gil Robles</div>
    <h1>Luz y <em>taquígrafos</em></h1>
  </header>
  <div class="room">{svg1}</div>
  <fieldset class="legend" aria-label="Filtrar minorías">{legend}</fieldset>
</div></div>
<p class="note">Prototipo P1 · 0 KB de librería. Encendido con <code>animation-delay: calc(var(--i)*6ms)</code> (orden angular calculado en el build),
descenso de cámara con <code>animation-timeline: scroll()</code> y filtro por minoría con <code>:has()</code> y <code>@property</code>.
Sin JS: todo funciona. Con <code>prefers-reduced-motion: reduce</code>: planta fija. Sin soporte de scroll-timeline (Firefox): planta fija.</p>
<script>
/* Única línea de JS: medir FPS para la prueba (no forma parte del componente). */
window.__fps = (ms=2000) => new Promise(r => {{ let n=0, t0=performance.now(); (function f(t){{ n++; if (t-t0<ms) requestAnimationFrame(f); else r(n*1000/(t-t0)); }})(t0); }});
</script>
</body></html>'''
(OUT / 'p1_hemiciclo_portada.html').write_text(p1)

# --- P2: la pagina del Diario -> fila de datos --------------------------------------
S = next(x for x in ses if x['f'] == '1936-06-16')
meta = S['meta']
fila = {
    'fecha': '16·VI·1936', 'sesion': f"Sesión {S['s']}", 'diario': f"DSC n.º {meta['diario_num']}, pp. {meta['paginas'].replace('-', '–')}",
    'orador': 'Gil Robles', 'minoria': 'CEDA', 'palabras': f"{S['top'][1][2]:,}".replace(',', '.') + ' palabras',
    'filas': S['filas'], 'pal': S['pal'], 'dip': S['dip'], 'presidente': meta['presidente'],
}
p2 = '''<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Del Diario a la fila</title>
<style>
:root { color-scheme: dark light; --bg:#0e0d0b; --ink:#efe6d2; --mute:#9d937f; --gold:#c9a45c; --line:#3a352c; }
@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) { --bg:#f4efe4; --ink:#1b1916; --mute:#6b6356; --gold:#8a6a26; --line:#cfc6b4; } }
* { box-sizing:border-box }
body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.5 Georgia, 'Times New Roman', serif; }
.stage { height:320vh; position:relative }
.sticky { position:sticky; top:0; height:100vh; overflow:hidden }
canvas#gl { position:absolute; inset:0; width:100%; height:100%; display:block }
.cap { position:absolute; left:16px; right:16px; bottom:20px; font:12px/1.4 ui-monospace, Menlo, monospace; letter-spacing:.1em; text-transform:uppercase; color:var(--mute); text-align:center }
.static { display:none; max-width:980px; margin:0 auto; padding:24px 16px; gap:24px; grid-template-columns: 1fr 1.4fr; align-items:center }
.static img { width:100%; height:auto; border:1px solid var(--line) }
table { border-collapse:collapse; width:100%; font-variant-numeric: tabular-nums }
th { font:11px ui-monospace, Menlo, monospace; letter-spacing:.12em; text-transform:uppercase; color:var(--mute); text-align:left; padding:6px 8px; border-bottom:1px solid var(--line) }
td { padding:8px; border-bottom:1px solid var(--line) }
td.o { font-style:italic; color:var(--gold) }
.note { max-width:680px; margin:0 auto; padding:24px 16px 80px; color:var(--mute) }
.no-gl .stage { display:none } .no-gl .static { display:grid }
@media (max-width:700px) { .static { grid-template-columns:1fr } }
</style></head>
<body>
<script>
  /* Degradación decidida ANTES de pintar: sin WebGL o con movimiento reducido, estados estáticos. */
  (function(){ var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var gl = !!document.createElement('canvas').getContext('webgl2');
    if (rm || !gl) document.documentElement.classList.add('no-gl'); })();
</script>
<div class="stage" aria-hidden="true"><div class="sticky"><canvas id="gl"></canvas>
  <div class="cap" id="cap">Diario de Sesiones · 16 de junio de 1936 · desplázate</div></div></div>
<section class="static" aria-label="La página y su fila">
  <img id="pageImg" alt="Maqueta de la página del Diario de Sesiones del 16 de junio de 1936">
  <div></div>
</section>
<table id="fila" style="max-width:980px;margin:0 auto 24px;padding:0 16px">
  <caption class="note" style="padding:8px 0;text-align:left">La fila de datos (HTML real, accesible y sin JS)</caption>
  <thead><tr><th>Fecha</th><th>Sesión</th><th>Diario</th><th>Orador</th><th>Minoría</th><th>Palabras</th></tr></thead>
  <tbody><tr><td>__fecha__</td><td>__sesion__</td><td>__diario__</td><td class="o">__orador__</td><td>__minoria__</td><td>__palabras__</td></tr></tbody>
</table>
<p class="note">Prototipo P2 · three.js r186 (WebGL2, <code>Points</code> + <code>ShaderMaterial</code>, un solo draw call).
Datos reales de la sesión (sesiones_v2.json): __filas__ intervenciones, __pal__ palabras, __dip__ diputados, preside __presidente__.
La «página» es una maqueta tipográfica compuesta en canvas (en producción: el escaneo real del DSC, umbralizado en el build).
Cada partícula es un píxel de tinta; su destino es un píxel de las celdas de la fila. El scroll hace de <em>scrub</em>.</p>
<script type="importmap">{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.min.js" } }</script>
<script type="module">
const FILA = __FILA__;
const W = 900, H = 1100;              // lienzo lógico de la página
const css = getComputedStyle(document.documentElement);
const INK = css.getPropertyValue('--ink').trim(), GOLD = css.getPropertyValue('--gold').trim();

function pageCanvas() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.fillStyle = '#000';
  x.textAlign = 'center';
  x.font = '600 30px Georgia, serif'; x.fillText('DIARIO DE SESIONES', W/2, 70);
  x.font = 'italic 22px Georgia, serif'; x.fillText('de las Cortes de la República', W/2, 102);
  x.font = '15px Georgia, serif'; x.fillText(`Núm. ${FILA.diario.match(/n\\.º (\\d+)/)[1]}  ·  Sesión del martes 16 de junio de 1936  ·  Preside ${FILA.presidente}`, W/2, 136);
  x.fillRect(60, 152, W-120, 2);
  x.textAlign = 'left';
  // dos columnas de "texto" como en el facsímil: renglones de palabras de ancho variable (seed fija)
  let s = 45; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const cols = [[60, 430], [470, 840]];
  for (const [x0, x1] of cols) {
    for (let y = 190; y < H - 60; y += 19) {
      let xx = x0 + (rnd() < .08 ? 18 : 0);
      if (rnd() < .06) { x.font = 'italic 14px Georgia, serif'; x.fillText(rnd() < .5 ? 'El Sr. GIL ROBLES:' : 'El Sr. CALVO SOTELO:', xx, y); xx += 150; }
      const end = rnd() < .1 ? x0 + (x1 - x0) * (.3 + .5 * rnd()) : x1;
      while (xx < end - 10) { const w = 10 + rnd() * 48; x.fillRect(xx, y - 9, Math.min(w, end - xx), 8); xx += w + 5; }
    }
  }
  return c;
}
function rowCanvas() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  const cells = [['FECHA', FILA.fecha], ['SESIÓN', FILA.sesion], ['DIARIO', FILA.diario], ['ORADOR', FILA.orador], ['MINORÍA', FILA.minoria], ['PALABRAS', FILA.palabras]];
  x.fillStyle = '#000';
  const y0 = 420; x.fillRect(40, y0 - 70, W - 80, 2); x.fillRect(40, y0 + 190, W - 80, 2);
  cells.forEach(([k, v], i) => {
    const cx = 60 + (i % 3) * 280, cy = y0 + Math.floor(i / 3) * 110;
    x.font = '13px Menlo, monospace'; x.fillText(k, cx, cy - 30);
    x.font = (k === 'ORADOR' ? 'italic 44px' : '30px') + ' Georgia, serif'; x.fillText(v, cx, cy + 14);
  });
  return c;
}
function sample(c, n, step) {
  const d = c.getContext('2d').getImageData(0, 0, W, H).data, pts = [];
  for (let y = 0; y < H; y += step) for (let x = 0; x < W; x += step) if (d[(y * W + x) * 4 + 3] > 120) pts.push(x, y);
  return pts;
}
const pc = pageCanvas(), rc = rowCanvas();
document.getElementById('pageImg').src = pc.toDataURL();
if (document.documentElement.classList.contains('no-gl')) throw 'estático';

const THREE = await import('three');
const mobile = matchMedia('(max-width: 700px)').matches;
const N = mobile ? 15000 : 40000;
let A = sample(pc, 0, 2), B = sample(rc, 0, 1);
const pos = new Float32Array(N * 3), tgt = new Float32Array(N * 3), rnd = new Float32Array(N);
// orden espacial coherente: se ordenan ambos conjuntos por x+y*0.35 para que la tinta viaje "hacia su celda"
const pick = (arr, k) => { const m = arr.length / 2; const j = Math.floor(k * m / N) % m; return [arr[2*j], arr[2*j+1]]; };
const sortPts = arr => { const p = []; for (let i = 0; i < arr.length; i += 2) p.push([arr[i], arr[i+1]]); p.sort((a, b) => (a[0] + a[1]*0.35) - (b[0] + b[1]*0.35)); return p.flat(); };
A = sortPts(A); B = sortPts(B);
for (let i = 0; i < N; i++) {
  const [ax, ay] = pick(A, i), [bx, by] = pick(B, i);
  pos.set([ax - W/2, H/2 - ay, 0], i*3); tgt.set([bx - W/2 + (Math.random()-.5)*.8, H/2 - by + (Math.random()-.5)*.8, 0], i*3);
  rnd[i] = Math.random();
}
const g = new THREE.BufferGeometry();
g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
g.setAttribute('target', new THREE.BufferAttribute(tgt, 3));
g.setAttribute('rnd', new THREE.BufferAttribute(rnd, 1));
const mat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  uniforms: { uP: { value: 0 }, uInk: { value: new THREE.Color(INK) }, uGold: { value: new THREE.Color(GOLD) }, uSize: { value: 1.6 } },
  vertexShader: `
    attribute vec3 target; attribute float rnd; uniform float uP; uniform float uSize; varying float vK;
    float ease(float t){ return t<.5 ? 4.*t*t*t : 1.-pow(-2.*t+2.,3.)/2.; }
    void main(){
      float d = rnd * .35;                                  // escalonado por partícula
      float k = ease(clamp((uP - d) / .65, 0., 1.)); vK = k;
      vec3 p = mix(position, target, k);
      float a = sin(k * 3.14159);                           // la tinta se dispersa a mitad de camino...
      p.xy += a * 60. * vec2(sin(position.y*.021 + rnd*6.28), cos(position.x*.017 + rnd*6.28));
      p.z  += a * 120. * (rnd - .5);                        // ...y se asienta al llegar
      vec4 mv = modelViewMatrix * vec4(p, 1.); gl_Position = projectionMatrix * mv;
      gl_PointSize = uSize * (1. + a * 1.2) * (600. / -mv.z);
    }`,
  fragmentShader: `
    uniform vec3 uInk; uniform vec3 uGold; varying float vK;
    void main(){ vec2 c = gl_PointCoord - .5; if (dot(c,c) > .25) discard;
      gl_FragColor = vec4(mix(uInk, uGold, smoothstep(.55, 1., vK) * .85), .9); }`
});
const scene = new THREE.Scene(); scene.add(new THREE.Points(g, mat));
const canvas = document.getElementById('gl');
const r = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'low-power' });
r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
const cam = new THREE.PerspectiveCamera(40, 1, 10, 4000);
function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; r.setSize(w, h, false); cam.aspect = w / h;
  cam.position.z = (H * 0.62) / Math.tan(THREE.MathUtils.degToRad(20)) * Math.max(1, 0.9 * (W/H) / cam.aspect) ; cam.updateProjectionMatrix(); draw(); }
const stage = document.querySelector('.stage'), cap = document.getElementById('cap');
let visible = true, raf = 0;
function progress() { const b = stage.getBoundingClientRect(); return Math.min(1, Math.max(0, -b.top / (b.height - innerHeight))); }
function draw() { raf = 0; mat.uniforms.uP.value = progress(); r.render(scene, cam);
  const p = mat.uniforms.uP.value; cap.textContent = p < .05 ? 'Diario de Sesiones · 16 de junio de 1936 · desplázate' : p > .95 ? 'Una fila del corpus: ' + FILA.orador + ' · ' + FILA.palabras : 'La tinta se convierte en dato'; }
// render bajo demanda: solo cuando cambia el scroll y la pieza está en pantalla
addEventListener('scroll', () => { if (visible && !raf) raf = requestAnimationFrame(draw); }, { passive: true });
new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);
addEventListener('resize', resize); resize();
window.__ready = true;
</script>
<script>
window.__fps = (ms=2000) => new Promise(r => { let n=0, t0=performance.now(); (function f(t){ n++; if (t-t0<ms) requestAnimationFrame(f); else r(n*1000/(t-t0)); })(t0); });
</script>
</body></html>'''
for k, v in fila.items():
    p2 = p2.replace(f'__{k}__', str(v))
p2 = p2.replace('__FILA__', json.dumps(fila, ensure_ascii=False))
(OUT / 'p2_diario_a_fila.html').write_text(p2)
print('ok', {g: counts[g] for g in hemi['orden'] if g in counts}, fila)
