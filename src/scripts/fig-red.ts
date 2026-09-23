/**
 * F21 · el MOTOR de las tres redes (DESIGN.md § Movimiento, momento 4: «las redes se reordenan»). sigma.js 3 y
 * graphology, en su propio trozo: lo importa `fig-red-carga.ts` cuando la figura entra en pantalla (o al pulsar
 * [Cargar la figura] en una pantalla pequeña o táctil). Sin él, la figura está entera: póster, leyenda y tabla.
 *
 * Qué hace:
 *  · dibuja la red de la legislatura elegida con las posiciones que calculó el exportador (ForceAtlas2 con semilla,
 *    `public/datos/red-<leg>.json`); ningún texto en el lienzo: la nota es la de la isla (`window.LyTFiguras`);
 *  · al cambiar de legislatura, quien repite se DESPLAZA a su nuevo sitio y quien entra o sale crece o se apaga
 *    (900 ms); con menos movimiento, salta sin interpolar;
 *  · el puntero, el dedo, el buscador del censo y el teclado (← → por grado, Inicio, Fin, Esc) seleccionan a un
 *    diputado: se resaltan sus cofirmantes y se listan con cuántas medidas comparten;
 *  · lee los colores de los tokens (ideología, fondo, tinta) y los vuelve a leer si cambia el tema.
 * Legibilidad (revisión del director, 23-09-2026): cada legislatura se ENCUADRA para ocupar el lienzo
 * (`viz/red-encuadre.ts`); los puntos son algo mayores y llevan una orla del color del fondo que los separa de la
 * madeja; el color de ideología se satura un poco (en OKLCH, dentro del gamut) y la leyenda hace lo mismo; las aristas
 * se atenúan según cuántas hay; y donde la red se parte (1936-1939) dos rótulos editoriales nombran los bloques.
 * Sin zoom ni arrastre: el lienzo no secuestra la rueda ni el desplazamiento de la página.
 */
import Sigma from 'sigma';
import Graph from 'graphology';
import { encuadre, anclaGrupo, W, H, type NodoRed } from '../viz/red-encuadre';

type Nodo = NodoRed;
interface Red { leg: string; clave: string; lienzo: [number, number]; nodos: Nodo[]; aristas: number[] }
interface Isla { muestra: (el: Element, anuncia?: boolean, pos?: { i: number; total: number }) => void; oculta: () => void }
export interface Motor { pausa?: () => void; sigue?: () => void; desmonta?: () => void }

const isla = () => (window as unknown as { LyTFiguras?: Isla }).LyTFiguras;
const IDEOS = ['EI', 'I', 'CI', 'C', 'CD', 'D', 'ED'];
const plegar = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const rellena = (p: string, v: Record<string, string>) => p.replace(/\{(\w+)\}/g, (_t, k: string) => v[k] ?? '');

/** Un color con transparencia, PREMULTIPLICADO: sigma mezcla con (ONE, ONE_MINUS_SRC_ALPHA), así que el canal de
 *  color ya debe llevar su alfa. Sin premultiplicar, las aristas salían opacas. */
function rgba(color: string, a: number): string {
  const c = color.trim();
  let rgb: number[] | null = null;
  const hex = c.match(/^#([0-9a-f]{6})$/i);
  if (hex) { const n = parseInt(hex[1], 16); rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  const m = c.match(/^rgba?\(([^)]+)\)$/i);
  if (m) rgb = m[1].split(',').slice(0, 3).map((x) => Number(x.trim()));
  if (!rgb) return c;
  const [r, g, b] = rgb.map((x) => Math.round(x * a));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** El color de ideología, algo más saturado para el punto: croma × f en OKLCH, sin salir del gamut sRGB (si se sale,
 *  se queda en el mayor factor que cabe). Tono y claridad no cambian, así que la leyenda sigue diciendo lo mismo. */
const SATURA = 1.3;
function satura(color: string, f = SATURA): string {
  const hex = color.trim().match(/^#([0-9a-f]{6})$/i);
  if (!hex) return color;
  const n = parseInt(hex[1], 16);
  const lin = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const aRgb = (k: number) => {
    const l_ = (L + 0.3963377774 * A * k + 0.2158037573 * B * k) ** 3;
    const m_ = (L - 0.1055613458 * A * k - 0.0638541728 * B * k) ** 3;
    const s_ = (L - 0.0894841775 * A * k - 1.291485548 * B * k) ** 3;
    return [4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_, -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_, -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_];
  };
  const cabe = (k: number) => aRgb(k).every((c) => c >= -1e-4 && c <= 1 + 1e-4);
  let k = f;
  if (!cabe(k)) { let lo = 1, hi = f; for (let i = 0; i < 16; i++) { const mid = (lo + hi) / 2; if (cabe(mid)) lo = mid; else hi = mid; } k = lo; }
  const srgb = (c: number) => Math.round(255 * Math.min(1, Math.max(0, c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)));
  return '#' + aRgb(k).map(srgb).map((c) => c.toString(16).padStart(2, '0')).join('');
}
/** Alfa de la arista: más tenue cuantas más hay (1931-1933 tiene tres veces las de 1936-1939). */
const alfaArista = (aristas: number, oscuro: boolean) => (oscuro ? 0.07 : 0.085) * Math.min(1, Math.max(0.45, Math.sqrt(4000 / Math.max(1, aristas))));

export async function monta(el: HTMLElement): Promise<Motor> {
  const fig = el.closest<HTMLElement>('[data-figura]') ?? document.body;
  const urls = JSON.parse(el.dataset.urls ?? '{}') as Record<string, string>;
  const T = {
    grado: el.dataset.tGrado ?? '', uno: el.dataset.tUno ?? '', aislado: el.dataset.tAislado ?? '',
    medidas: el.dataset.tMedidas ?? '{n}', una: el.dataset.tUna ?? '', resto: el.dataset.tResto ?? '', vacio: el.dataset.tVacio ?? '',
    titulo: el.dataset.tTitulo ?? '',
  };
  const ROT = JSON.parse(el.dataset.rotulos ?? '{}') as Record<string, { t: string; ideos: string[] }[]>;
  const radios = [...fig.querySelectorAll<HTMLInputElement>('input[name="f21-leg"]')];
  const buscar = fig.querySelector<HTMLElement>('.f21-buscar');
  const entrada = buscar?.querySelector<HTMLInputElement>('input[type="search"]') ?? null;
  const lista = buscar?.querySelector<HTMLDataListElement>('datalist') ?? null;
  const estado = buscar?.querySelector<HTMLElement>('.f21-estado') ?? null;
  const limpiar = buscar?.querySelector<HTMLButtonElement>('.f21-limpiar') ?? null;
  const coautores = fig.querySelector<HTMLElement>('.f21-coautores');

  const cache = new Map<string, Promise<Red>>();
  const carga = (clave: string) => {
    if (!cache.has(clave)) cache.set(clave, fetch(urls[clave]).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<Red>; }));
    return cache.get(clave)!;
  };
  const elegida = () => radios.find((r) => r.checked)?.value ?? radios[0]?.value ?? '1931';
  // posiciones encuadradas, una vez por red
  const encuadres = new WeakMap<Red, Map<number, [number, number]>>();
  const posDe = (r: Red) => { let m = encuadres.get(r); if (!m) { m = encuadre(r.nodos); encuadres.set(r, m); } return m; };
  const xy = (r: Red, n: Nodo) => posDe(r).get(n[0]) ?? [n[6], n[7]];
  let red = await carga(elegida());

  // ── el lienzo y el ancla de la nota ────────────────────────────────────────────────────────────────────────────
  const caja = document.createElement('div');
  caja.className = 'f21-sigma';
  caja.setAttribute('aria-hidden', 'true');
  const ancla = document.createElement('span');
  ancla.className = 'f21-ancla';
  ancla.setAttribute('data-nota', '');
  ancla.setAttribute('data-plantilla-t', '{nombre}');
  // los rótulos editoriales de la red viva (los del póster se quedan con el póster, que se oculta)
  const rotulos = document.createElement('div');
  rotulos.className = 'f21-rotulos';
  rotulos.setAttribute('aria-hidden', 'true');
  el.append(caja, rotulos, ancla);

  // ── colores de los tokens ───────────────────────────────────────────────────────────────────────────────────
  let P = paleta();
  function paleta() {
    const cs = getComputedStyle(el);
    const v = (n: string) => cs.getPropertyValue(n).trim();
    const atenua = Number(v('--atenua')) || 0.2;
    const ideo: Record<string, string> = {};
    for (const i of IDEOS) ideo[i] = v(`--${i.toLowerCase()}`) || v('--nc');
    const oscuro = (document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')) === 'dark';
    for (const i of IDEOS) ideo[i] = satura(ideo[i]);
    return { ideo, bg: v('--bg'), ink: v('--ink'), atenua, oscuro, aristaFoco: rgba(v('--ink'), 0.55) };
  }
  let arista = rgba(P.ink, alfaArista(red.aristas.length / 3, P.oscuro));

  // ── el grafo ────────────────────────────────────────────────────────────────────────────────────────────────
  const graph = new Graph({ multi: false, type: 'undirected' });
  // Algo mayores que el primer corte (×1,35), y nunca por debajo de 2 px de radio.
  const escala = () => Math.max(0.4, caja.clientWidth / 1600) * 1.35;
  const tamano = (n: Nodo, k: number) => Math.max(2, n[8] * k);
  const ORLA = 1.1;
  let vivo = false; // hasta que exista el renderer, los rótulos esperan
  let anclasRot: { p: HTMLElement; x: number; y: number }[] = [];
  const info = new Map<string, Nodo>();
  let orden: string[] = [];
  function construye(r: Red) {
    graph.clear();
    info.clear();
    const k = escala();
    arista = rgba(P.ink, alfaArista(r.aristas.length / 3, P.oscuro));
    for (const n of r.nodos) {
      const id = String(n[0]);
      const [x, y] = xy(r, n);
      info.set(id, n);
      graph.addNode(id, { x, y: -y, size: tamano(n, k), color: P.ideo[n[4]], zIndex: n[5] ? 2 : 1 });
      // La orla: un disco del color del fondo, algo mayor, debajo de cada punto que firma; lo despega de la madeja.
      if (n[5]) graph.addNode(`o${id}`, { x, y: -y, size: tamano(n, k) + ORLA, color: P.bg, zIndex: 0, orla: true });
      // Quien no firma con nadie va hueco: un disco del color del fondo dentro del suyo (la ausencia no es un color).
      else graph.addNode(`h${id}`, { x, y: -y, size: Math.max(0.6, tamano(n, k) - 1.4), color: P.bg, zIndex: 2, hueco: true });
    }
    for (let i = 0; i < r.aristas.length; i += 3) {
      const a = String(r.nodos[r.aristas[i]][0]), b = String(r.nodos[r.aristas[i + 1]][0]);
      graph.addEdge(a, b, { w: r.aristas[i + 2], size: 0.6, color: arista });
    }
    pintaRotulos(r);
    orden = r.nodos.slice().sort((a, b) => b[5] - a[5] || a[1].localeCompare(b[1], 'es')).map((n) => String(n[0]));
    if (lista) lista.replaceChildren(...r.nodos.map((n) => n[1]).sort((a, b) => a.localeCompare(b, 'es')).map((nombre) => { const o = document.createElement('option'); o.value = nombre; return o; }));
  }
  construye(red);

  // ── foco: el seleccionado (clic, búsqueda, teclado) o, si no hay, el que está bajo el puntero ─────────────────
  let seleccionado: string | null = null;
  let bajo: string | null = null;
  let vecinos = new Set<string>();
  const raiz = (n: string) => (n.startsWith('h') || n.startsWith('o') ? n.slice(1) : n);
  const foco = () => seleccionado ?? bajo;
  function enfoca() {
    const f = foco();
    vecinos = f && graph.hasNode(f) ? new Set(graph.neighbors(f)) : new Set();
    renderer.refresh();
  }

  const renderer = new Sigma(graph, caja, {
    renderLabels: false, renderEdgeLabels: false, enableEdgeEvents: false, zIndex: true,
    stagePadding: 0, autoRescale: true, autoCenter: true, enableCameraZooming: false, enableCameraPanning: false,
    defaultDrawNodeHover: () => undefined, labelRenderedSizeThreshold: Infinity, minEdgeThickness: 0.7,
    nodeReducer: (node, data) => {
      const f = foco();
      if (!f) return data;
      const r = raiz(node);
      if ((data as { hueco?: boolean }).hueco) return r === f || vecinos.has(r) ? { ...data, zIndex: 6 } : data;
      if ((data as { orla?: boolean }).orla) return r === f ? { ...data, zIndex: 4, size: (data.size - ORLA) * 1.35 + ORLA } : vecinos.has(r) ? { ...data, zIndex: 3 } : data;
      if (r === f) return { ...data, zIndex: 5, size: data.size * 1.35 };
      if (vecinos.has(r)) return { ...data, zIndex: 4 };
      return { ...data, color: rgba(data.color, P.atenua), zIndex: 0 };
    },
    edgeReducer: (edge, data) => {
      const f = foco();
      if (!f) return data;
      const [a, b] = graph.extremities(edge);
      return a === f || b === f ? { ...data, color: P.aristaFoco, size: 1 } : { ...data, hidden: true };
    },
  });
  renderer.setCustomBBox({ x: [-W, W], y: [-H, H] });
  el.classList.add('f21-vivo');

  // ── rótulos editoriales: HTML sobre el lienzo, anclados a su bloque (DESIGN.md § Sistema de figuras) ──────────
  vivo = true;
  function pintaRotulos(r: Red) {
    anclasRot = [];
    if (!vivo) return;
    const lista = ROT[r.clave] ?? [];
    rotulos.replaceChildren(...lista.flatMap((g) => {
      const a = anclaGrupo(r.nodos, g.ideos, posDe(r));
      if (!a) return [];
      const p = document.createElement('p');
      p.className = 'f21-rot';
      p.textContent = g.t;
      anclasRot.push({ p, x: a[0], y: a[1] });
      return [p];
    }));
    colocaRotulos();
  }
  function colocaRotulos() {
    if (!vivo) return;
    for (const { p, x, y } of anclasRot) {
      const v = renderer.graphToViewport({ x, y: -y });
      p.style.left = `${v.x}px`;
      p.style.top = `${v.y}px`;
    }
  }
  renderer.on('afterRender', colocaRotulos);
  pintaRotulos(red);

  // ── la nota (la de la isla, anclada al nodo) ────────────────────────────────────────────────────────────────
  function nota(id: string, anuncia = false, pos?: { i: number; total: number }) {
    const n = info.get(id);
    const d = renderer.getNodeDisplayData(id);
    if (!n || !d) return;
    const p = renderer.graphToViewport({ x: d.x, y: d.y });
    const r = renderer.scaleSize(d.size);
    ancla.style.left = `${p.x - r}px`;
    ancla.style.top = `${p.y - r}px`;
    ancla.style.width = ancla.style.height = `${2 * r}px`;
    const plantilla = n[5] === 0 ? T.aislado : n[5] === 1 ? T.uno : T.grado;
    ancla.setAttribute('data-plantilla', plantilla);
    ancla.setAttribute('data-v-nombre', n[1]);
    ancla.setAttribute('data-v-partido', n[2]);
    ancla.setAttribute('data-v-familia', n[3]);
    ancla.setAttribute('data-v-grado', n[5].toLocaleString(document.documentElement.lang || 'es'));
    isla()?.muestra(ancla, anuncia, pos);
  }
  function listaCoautores(id: string | null) {
    if (!coautores) return;
    if (!id || !graph.hasNode(id) || graph.degree(id) === 0) { coautores.hidden = true; coautores.replaceChildren(); return; }
    const pares = graph.edges(id).map((e) => ({ otro: graph.opposite(id, e), w: graph.getEdgeAttribute(e, 'w') as number }))
      .sort((a, b) => b.w - a.w || info.get(a.otro)![1].localeCompare(info.get(b.otro)![1], 'es'));
    const cab = document.createElement('p');
    cab.className = 'f21-co-t';
    cab.textContent = `${T.titulo}: ${info.get(id)![1]}`;
    const ol = document.createElement('ol');
    for (const { otro, w } of pares.slice(0, 8)) {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'f21-co-nombre';
      b.textContent = info.get(otro)![1];
      b.addEventListener('click', () => selecciona(otro, true));
      const m = document.createElement('span');
      m.className = 'f21-co-n';
      m.textContent = w === 1 ? T.una : rellena(T.medidas, { n: w.toLocaleString(document.documentElement.lang || 'es') });
      li.append(b, ' ', m);
      ol.append(li);
    }
    coautores.replaceChildren(cab, ol);
    if (pares.length > 8) { const p = document.createElement('p'); p.className = 'f21-co-resto'; p.textContent = rellena(T.resto, { n: String(pares.length - 8) }); coautores.append(p); }
    coautores.hidden = false;
  }
  function selecciona(id: string, anuncia = false, pos?: { i: number; total: number }) {
    if (!info.has(id)) return;
    seleccionado = id;
    enfoca();
    nota(id, anuncia, pos);
    listaCoautores(id);
    if (entrada && document.activeElement !== entrada) entrada.value = info.get(id)![1];
  }
  function suelta() {
    seleccionado = null; bajo = null;
    enfoca();
    isla()?.oculta();
    listaCoautores(null);
    if (entrada) entrada.value = '';
    if (estado) estado.textContent = '';
  }

  renderer.on('enterNode', ({ node }) => { bajo = raiz(node); if (!seleccionado) { enfoca(); nota(bajo); } });
  renderer.on('leaveNode', () => { bajo = null; if (!seleccionado) { enfoca(); isla()?.oculta(); } });
  renderer.on('clickNode', ({ node }) => selecciona(raiz(node), true));
  renderer.on('clickStage', () => suelta());

  // Táctil: el captor de sigma impediría desplazar la página; se apaga y un toque elige el nodo más cercano.
  const tactil = matchMedia('(pointer: coarse)').matches;
  const alToque = (e: MouseEvent) => {
    const rect = caja.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    let mejor: string | null = null, dist = 22 * 22;
    graph.forEachNode((node, a) => {
      if ((a as { hueco?: boolean; orla?: boolean }).hueco || (a as { orla?: boolean }).orla) return;
      const d = renderer.getNodeDisplayData(node);
      if (!d) return;
      const p = renderer.graphToViewport({ x: d.x, y: d.y });
      const q = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (q < dist) { dist = q; mejor = node; }
    });
    if (mejor) selecciona(mejor, true); else suelta();
  };
  if (tactil) { renderer.getTouchCaptor().enabled = false; caja.addEventListener('click', alToque); }

  // ── teclado: una parada; ← → recorren de más a menos cofirmantes ────────────────────────────────────────────
  el.tabIndex = 0;
  let i = -1;
  const teclas = (e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.target !== el) return;
    if (e.key === 'Escape') { suelta(); i = -1; return; }
    const tot = orden.length;
    let j = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = Math.min(i + 1, tot - 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = i < 0 ? tot - 1 : Math.max(i - 1, 0);
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = tot - 1;
    else return;
    e.preventDefault();
    i = j;
    selecciona(orden[i], true, { i: i + 1, total: tot });
  };
  el.addEventListener('keydown', teclas);

  // ── buscador del censo ──────────────────────────────────────────────────────────────────────────────────────
  const porNombre = () => new Map([...info.values()].map((n) => [plegar(n[1]), String(n[0])]));
  const busca = (final: boolean) => {
    if (!entrada) return;
    const q = plegar(entrada.value);
    if (!q) { suelta(); return; }
    const m = porNombre();
    let id = m.get(q) ?? null;
    if (!id && final) {
      const cand = [...m.entries()].filter(([k]) => k.includes(q));
      if (cand.length === 1) id = cand[0][1];
    }
    if (id) { if (estado) estado.textContent = ''; selecciona(id, true); }
    else if (final && estado) estado.textContent = T.vacio;
  };
  const alEscribir = () => busca(false);
  const alCambiar = () => busca(true);
  entrada?.addEventListener('input', alEscribir);
  entrada?.addEventListener('change', alCambiar);
  const escEnEntrada = (e: KeyboardEvent) => { if (e.key === 'Escape') { suelta(); } };
  entrada?.addEventListener('keydown', escEnEntrada);
  limpiar?.addEventListener('click', suelta);
  if (buscar) buscar.hidden = false;

  // ── cambiar de legislatura: los que repiten se desplazan ────────────────────────────────────────────────────
  let animando = 0;
  async function cambia() {
    const destino = await carga(elegida());
    if (destino === red) return;
    const antes = red;
    red = destino;
    const sigue = seleccionado && destino.nodos.some((n) => String(n[0]) === seleccionado) ? seleccionado : null;
    cancelAnimationFrame(animando);
    isla()?.oculta();
    if (reducido()) { construye(destino); reenfoca(sigue); return; }
    const k = escala();
    const viejos = new Map(antes.nodos.map((n) => [String(n[0]), n]));
    const nuevos = new Map(destino.nodos.map((n) => [String(n[0]), n]));
    graph.clearEdges();
    seleccionado = null; bajo = null; vecinos = new Set();
    rotulos.replaceChildren(); anclasRot = [];
    // los que entran nacen en su sitio, sin tamaño
    for (const [id, n] of nuevos) {
      if (!graph.hasNode(id)) { const [x, y] = xy(destino, n); graph.addNode(id, { x, y: -y, size: 0, color: P.ideo[n[4]], zIndex: 1 }); }
    }
    graph.filterNodes((id) => id.startsWith('h') || id.startsWith('o')).forEach((id) => graph.dropNode(id));
    const t0 = performance.now(), dur = 900;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - t0) / dur);
      const e = 1 - (1 - t) ** 3;
      graph.updateEachNodeAttributes((id, a) => {
        const v = viejos.get(id), n = nuevos.get(id);
        if (v && n) {
          const [vx, vy] = xy(antes, v), [nx, ny] = xy(destino, n);
          return { ...a, x: vx + (nx - vx) * e, y: -(vy + (ny - vy) * e), size: Math.max(0.6, tamano(v, k) + (tamano(n, k) - tamano(v, k)) * e), color: t < 0.5 ? P.ideo[v[4]] : P.ideo[n[4]] };
        }
        if (v) return { ...a, size: Math.max(0, tamano(v, k) * (1 - e)) };
        if (n) return { ...a, size: Math.max(0, tamano(n, k) * e) };
        return a;
      });
      if (t < 1) animando = requestAnimationFrame(paso);
      else { construye(destino); reenfoca(sigue); }
    };
    animando = requestAnimationFrame(paso);
  }
  function reenfoca(id: string | null) {
    i = -1;
    if (id) selecciona(id, false); else { listaCoautores(null); enfoca(); if (entrada) entrada.value = ''; }
  }
  const alRadio = () => { void cambia(); };
  radios.forEach((r) => r.addEventListener('change', alRadio));
  // precarga las otras dos en un rato libre
  const ric = (window as unknown as { requestIdleCallback?: (f: () => void) => void }).requestIdleCallback ?? ((f: () => void) => setTimeout(f, 1200));
  ric(() => radios.forEach((r) => { void carga(r.value).catch(() => undefined); }));

  // ── tema y tamaño ───────────────────────────────────────────────────────────────────────────────────────────
  const recolorea = () => {
    P = paleta();
    graph.updateEachNodeAttributes((id, a) => {
      const n = info.get(raiz(id));
      if (!n) return a;
      const fondo = (a as { hueco?: boolean; orla?: boolean }).hueco || (a as { orla?: boolean }).orla;
      return { ...a, color: fondo ? P.bg : P.ideo[n[4]] };
    });
    arista = rgba(P.ink, alfaArista(red.aristas.length / 3, P.oscuro));
    graph.updateEachEdgeAttributes((_e, a) => ({ ...a, color: arista }));
  };
  const mo = new MutationObserver(recolorea);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const mq = matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener('change', recolorea);
  let anchoPrevio = caja.clientWidth;
  const ro = new ResizeObserver(() => {
    if (Math.abs(caja.clientWidth - anchoPrevio) < 2) return;
    anchoPrevio = caja.clientWidth;
    const k = escala();
    graph.updateEachNodeAttributes((id, a) => {
      const n = info.get(raiz(id));
      if (!n) return a;
      const x = a as { hueco?: boolean; orla?: boolean };
      return { ...a, size: x.hueco ? Math.max(0.6, tamano(n, k) - 1.4) : x.orla ? tamano(n, k) + ORLA : tamano(n, k) };
    });
    isla()?.oculta();
  });
  ro.observe(caja);

  return {
    desmonta() {
      cancelAnimationFrame(animando);
      renderer.kill();
      mo.disconnect(); ro.disconnect();
      mq.removeEventListener('change', recolorea);
      radios.forEach((r) => r.removeEventListener('change', alRadio));
      entrada?.removeEventListener('input', alEscribir);
      entrada?.removeEventListener('change', alCambiar);
      entrada?.removeEventListener('keydown', escEnEntrada);
      limpiar?.removeEventListener('click', suelta);
      el.removeEventListener('keydown', teclas);
      caja.removeEventListener('click', alToque);
      caja.remove(); ancla.remove(); rotulos.remove();
      el.classList.remove('f21-vivo');
    },
  };
}
