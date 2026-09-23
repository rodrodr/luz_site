/**
 * La ISLA genérica de las figuras (plan § Figuras · Contrato común; DESIGN.md § Sistema de figuras). SOLO AÑADE: sin
 * este script cada figura se lee entera (pestañas y conmutaciones son radios con CSS, cada marca que lleva a algún
 * sitio es un enlace y todos los valores están en la pestaña «Tabla»). Ninguna cifra se formatea aquí: la compilación
 * ya las dejó escritas, en la lengua de la página y con su agrupación, en atributos.
 *
 * CONTRATO con los componentes de figura:
 *  · `[data-figura="F01"]`  raíz de la figura. La isla se engancha a ella una vez (`data-isla`).
 *  · `[data-plantilla]`     plantilla de la nota emergente, con huecos `{nombre}` («{mes} · {n} sesiones»). Hasta tres
 *                           líneas: `data-plantilla-t` (qué, en garamond) · `data-plantilla` (cifras, en mono) ·
 *                           `data-plantilla-b` (base y fuente). Van en la raíz o en un antepasado; manda el más cercano.
 *                           Para escribirlas desde el copy: `plantillaNota()` de lib/i18n.ts.
 *  · `[data-nota]`          marca con nota compuesta: sus valores en `data-v-<nombre>` (y en los de sus antepasados dentro
 *                           de la figura; manda el más cercano). `[data-tip]`: la nota ya escrita entera.
 *  · `[data-recorre]`       contenedor enfocable (una etapa, una serie): ← → ↑ ↓ Inicio Fin recorren sus `[data-paso]`
 *                           (en orden de documento, o por `data-orden`); Esc cierra. La región `aria-live` solo habla
 *                           al recorrer con el teclado, precedida de la posición («3 de 12», `data-posicion` de la raíz).
 *  · `[data-diana]`         marca enfocable (`tabindex="0"`) con diana de 44 px como mínimo: al recibir el foco, su nota.
 *  · `[data-solo-isla]`     texto que solo es verdad con la isla («Con el teclado…»): nace `hidden` y aquí se enseña.
 *  · `[data-entra-fig]`     rejilla que «entra» al verse (el tiempo corre): solo si empieza por debajo del pliegue y no se
 *                           pidió menos movimiento. Sus celdas llevan `data-n` y `--n` (índice cronológico).
 * La nota es invertida, con flecha, se puede recorrer con el puntero (150 ms de gracia) y no caduca (WCAG 1.4.13):
 *  · RECORRIBLE: el puntero puede pasar de la marca a la nota (y seleccionar su texto) sin que desaparezca;
 *  · PERSISTENTE: dura mientras el puntero o el foco sigan en la marca o en la nota, o hasta que se descarte;
 *  · DESCARTABLE: Esc la cierra sin mover el puntero ni el foco, y no vuelve hasta que el puntero pase a otra marca.
 * Táctil: un toque enseña la nota (con [Cerrar la nota], rótulo en `data-cerrar` de la raíz); un segundo toque en la
 * misma marca (o su enlace) navega; tocar fuera la cierra.
 * Pestañas: la elegida se refleja en el hash (`#calendario-tabla`) y un hash así la abre al cargar.
 * Si una figura se sustituye, la isla vuelve a enlazar (escuchadores delegados + MutationObserver);
 * `window.LyTFiguras.enlaza(nodo)` lo hace a mano.
 */

const SEL_MARCA = '[data-tip], [data-nota]';
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let nota: HTMLDivElement | null = null;
let texto: HTMLDivElement | null = null;
let cierra: HTMLButtonElement | null = null;
let viva: HTMLDivElement | null = null;
let actual: Element | null = null;
/** La marca que un primer toque dejó «armada»: el segundo toque en ella navega. */
let armada: Element | null = null;
let reloj = 0;

function prepara(): void {
  if (nota) return;
  nota = document.createElement('div');
  nota.className = 'fig-tip';
  nota.hidden = true;
  nota.setAttribute('aria-hidden', 'true'); // quien usa lector de pantalla la oye por la región viva, una vez
  texto = document.createElement('div');
  cierra = document.createElement('button');
  cierra.type = 'button';
  cierra.className = 'fig-tip-cierra';
  cierra.hidden = true;
  cierra.innerHTML = '<svg class="icono" aria-hidden="true" focusable="false"><use href="#i-cerrar"></use></svg>';
  cierra.addEventListener('click', () => oculta());
  nota.append(texto, cierra);
  // Se puede recorrer con el puntero sin que desaparezca.
  nota.addEventListener('pointerenter', () => window.clearTimeout(reloj));
  nota.addEventListener('pointerleave', (e) => { if ((e as PointerEvent).pointerType !== 'touch') ocultaLuego(); });
  viva = document.createElement('div');
  viva.className = 'sr-only';
  viva.setAttribute('aria-live', 'polite');
  document.body.append(nota, viva);
}

/** Valores `data-v-*` de la marca y de sus antepasados dentro de la figura; manda el más cercano. */
function valores(el: Element): Record<string, string> {
  const out: Record<string, string> = {};
  const raiz = el.closest('[data-figura]');
  for (let n: Element | null = el; n; n = n.parentElement) {
    for (const a of Array.from(n.attributes)) {
      if (a.name.startsWith('data-v-')) { const k = a.name.slice(7); if (!(k in out)) out[k] = a.value; }
    }
    if (n === raiz) break;
  }
  return out;
}

const rellena = (plantilla: string, v: Record<string, string>) =>
  plantilla.replace(/\{([\w-]+)\}/g, (todo, k: string) => v[k] ?? todo).replace(/\{[\w-]+\}/g, '').replace(/\s+·\s+(?=·|$)/g, '').trim();

function lineas(el: Element): { t: string; d: string; b: string } {
  const escrito = el.getAttribute('data-tip');
  if (escrito) return { t: '', d: escrito, b: '' };
  const cerca = (a: string) => el.closest(`[${a}]`)?.getAttribute(a) ?? '';
  const v = valores(el);
  return { t: rellena(cerca('data-plantilla-t'), v), d: rellena(cerca('data-plantilla'), v), b: rellena(cerca('data-plantilla-b'), v) };
}
export const textoDe = (el: Element) => { const l = lineas(el); return [l.t, l.d, l.b].filter(Boolean).join('. '); };

/** Hasta cuándo (performance.now) el `scroll` no cierra la nota: el que provoca traer la marca a la vista. */
let ignoraScrollHasta = 0;

function muestra(el: Element, anuncia = false, pos?: { i: number; total: number }, porToque = false): void {
  prepara();
  window.clearTimeout(reloj);
  const l = lineas(el);
  if (!nota || !texto || !cierra || !(l.t || l.d || l.b)) return oculta();
  if (actual && actual !== el) actual.classList.remove('fig-activa');
  actual = el;
  el.classList.add('fig-activa');
  texto.replaceChildren();
  for (const [clase, linea] of [['em-t', l.t], ['em-d', l.d], ['em-b', l.b]] as const) {
    if (!linea) continue;
    const s = document.createElement('span');
    s.className = clase;
    s.textContent = linea;
    texto.append(s);
  }
  // Abierta con el dedo, la nota es algo que el lector pidió: se puede cerrar con su botón (y tocando fuera).
  const rotuloCierre = el.closest('[data-cerrar]')?.getAttribute('data-cerrar') ?? '';
  cierra.hidden = !(porToque && rotuloCierre);
  cierra.setAttribute('aria-label', rotuloCierre);
  nota.classList.toggle('con-cierre', !cierra.hidden);
  if (porToque) nota.removeAttribute('aria-hidden'); else nota.setAttribute('aria-hidden', 'true');
  nota.hidden = false;
  // Con el teclado, la marca activa se trae a la vista si se salió (listas largas: F17, F29, F32). El desplazamiento
  // que eso provoca no cierra la nota (el escuchador de `scroll` lo ignora un momento).
  if (anuncia) {
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight || r.left < 0 || r.right > window.innerWidth) {
      ignoraScrollHasta = performance.now() + 200;
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }
  // Anclada a la marca, no al puntero; acotada a la figura y a la ventana; debajo si no cabe arriba.
  const caja = el.getBoundingClientRect();
  const fig = (el.closest('[data-figura]') ?? document.body).getBoundingClientRect();
  const ancho = nota.offsetWidth, alto = nota.offsetHeight, margen = 8;
  const izq = Math.max(fig.left, margen), der = Math.min(fig.right, window.innerWidth - margen);
  const cx = caja.left + caja.width / 2;
  const x = Math.min(Math.max(cx - ancho / 2, izq), Math.max(izq, der - ancho));
  let y = caja.top - alto - 10;
  const abajo = y < margen;
  if (abajo) y = Math.min(caja.bottom + 10, window.innerHeight - alto - margen);
  nota.classList.toggle('abajo', abajo);
  nota.style.setProperty('--flecha', `${Math.round(Math.min(Math.max(cx - x, 10), ancho - 10))}px`);
  nota.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  if (anuncia && viva) {
    const plantilla = el.closest('[data-posicion]')?.getAttribute('data-posicion') ?? '';
    const donde = pos && plantilla ? plantilla.replace('{i}', String(pos.i)).replace('{total}', String(pos.total)) + '. ' : '';
    viva.textContent = donde + textoDe(el);
  }
}

function oculta(): void {
  window.clearTimeout(reloj);
  if (nota) nota.hidden = true;
  actual?.classList.remove('fig-activa');
  actual = null;
  armada = null;
}
/** 150 ms de gracia: el puntero puede pasar de la marca a la nota sin que desaparezca. */
function ocultaLuego(): void {
  window.clearTimeout(reloj);
  reloj = window.setTimeout(oculta, 150);
}

function pasosDe(cont: Element): Element[] {
  const pasos = Array.from(cont.querySelectorAll('[data-paso]'));
  return pasos.some((p) => p.hasAttribute('data-orden'))
    ? pasos.sort((a, b) => Number(a.getAttribute('data-orden')) - Number(b.getAttribute('data-orden')))
    : pasos;
}

function enlaza(raiz: HTMLElement): void {
  if (raiz.hasAttribute('data-isla')) return;
  raiz.setAttribute('data-isla', '');

  // ratón
  let ultima: Element | null = null;
  raiz.addEventListener('pointerover', (e) => {
    if ((e as PointerEvent).pointerType === 'touch') return;
    const el = (e.target as Element).closest?.(SEL_MARCA) ?? null;
    if (el === ultima) { if (el) window.clearTimeout(reloj); return; }
    ultima = el;
    if (!el) return ocultaLuego();
    muestra(el);
  });
  raiz.addEventListener('pointerleave', () => { ultima = null; ocultaLuego(); });

  // táctil: el primer toque enseña, el segundo navega
  raiz.addEventListener('click', (e) => {
    const el = (e.target as Element).closest?.(SEL_MARCA) ?? null;
    if (!el) return;
    const tactil = (e as PointerEvent).pointerType === 'touch' || matchMedia('(hover: none)').matches;
    if (!tactil) return;
    if (armada !== el) {
      muestra(el, false, undefined, true);
      armada = el;
      if ((e.target as Element).closest('a')) e.preventDefault();
    } else armada = null;
  });

  // foco en una diana
  raiz.addEventListener('focusin', (e) => {
    const t = e.target as Element;
    const el = t.closest?.(SEL_MARCA);
    if (el && t.matches('[data-diana]')) muestra(el);
  });
  raiz.addEventListener('focusout', (e) => {
    const sale = e.relatedTarget as Element | null;
    if (!sale || !raiz.contains(sale)) oculta();
  });

  // teclado: una parada por grupo; ← → ↑ ↓ Inicio Fin recorren; Esc cierra
  const indice = new WeakMap<Element, number>();
  raiz.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape') { oculta(); return; }
    const cont = (e.target as Element).closest?.('[data-recorre]');
    if (!cont || !raiz.contains(cont)) return;
    const pasos = pasosDe(cont);
    if (!pasos.length) return;
    const i = indice.get(cont) ?? -1;
    let j: number;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': j = Math.min(i + 1, pasos.length - 1); break;
      case 'ArrowLeft': case 'ArrowUp': j = i < 0 ? pasos.length - 1 : Math.max(i - 1, 0); break;
      case 'Home': j = 0; break;
      case 'End': j = pasos.length - 1; break;
      default: return;
    }
    e.preventDefault();
    indice.set(cont, j);
    muestra(pasos[j], true, { i: j + 1, total: pasos.length });
  });

  // la frase «Con el teclado…» solo es verdad desde ahora: se enseña y se suma a la descripción de cada grupo
  raiz.querySelectorAll<HTMLElement>('[data-solo-isla]').forEach((aviso) => {
    aviso.hidden = false;
    if (!aviso.id) return;
    raiz.querySelectorAll('[data-recorre]').forEach((c) => {
      const previa = c.getAttribute('aria-describedby') ?? '';
      if (!previa.split(/\s+/).includes(aviso.id)) c.setAttribute('aria-describedby', `${previa} ${aviso.id}`.trim());
    });
  });

  // el tiempo corre: solo si la rejilla empieza por debajo del pliegue y no se pidió menos movimiento
  raiz.querySelectorAll<HTMLElement>('[data-entra-fig]').forEach((rej) => {
    if (reducido() || !('IntersectionObserver' in window) || rej.getBoundingClientRect().top <= window.innerHeight) return;
    rej.classList.add('espera');
    const io = new IntersectionObserver((vistos) => {
      if (vistos.some((v) => v.isIntersecting)) { rej.classList.add('entra-fig'); rej.classList.remove('espera'); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(rej);
  });
}

/** Pestañas ↔ hash: `#<id>-tabla` abre la Tabla de esa figura; elegir una pestaña lo escribe (sin saltar). */
function pestanasYHash(): void {
  const abre = () => {
    const m = location.hash.match(/^#(.+)-(grafico|tabla|datos)$/);
    if (!m) return;
    const radio = document.getElementById(`${m[1]}-pest-${m[2]}`) as HTMLInputElement | null;
    if (radio) { radio.checked = true; radio.closest('.pestanas')?.scrollIntoView({ block: 'start' }); }
  };
  abre();
  window.addEventListener('hashchange', abre);
  document.addEventListener('change', (e) => {
    const r = e.target as HTMLInputElement;
    if (!r.matches?.('.pest-radio')) return;
    const id = r.id.replace(/-pest-(grafico|tabla|datos)$/, '');
    history.replaceState(null, '', r.value === 'grafico' ? location.pathname + location.search : `#${id}-${r.value}`);
  });
}

function arranca(nodo: ParentNode = document): void {
  if (nodo instanceof HTMLElement && nodo.matches('[data-figura]')) enlaza(nodo);
  nodo.querySelectorAll<HTMLElement>('[data-figura]:not([data-isla])').forEach(enlaza);
}

if (!document.documentElement.hasAttribute('data-isla-figuras')) {
  document.documentElement.setAttribute('data-isla-figuras', '');
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') oculta(); });
  // Tocar (o pulsar) fuera de la marca y de la nota la cierra.
  document.addEventListener('pointerdown', (e) => {
    if (!actual || !nota || nota.hidden) return;
    const t = e.target as Node;
    if (nota.contains(t) || actual.contains(t)) return;
    if ((t as Element).closest?.(SEL_MARCA)) return; // otra marca: la cambia su propio escuchador
    oculta();
  }, { capture: true });
  window.addEventListener('scroll', () => { if (performance.now() >= ignoraScrollHasta) oculta(); }, { passive: true });
  window.addEventListener('resize', oculta, { passive: true });
  new MutationObserver((cambios) => {
    for (const c of cambios) c.addedNodes.forEach((n) => { if (n instanceof HTMLElement) arranca(n); });
    if (actual && !actual.isConnected) oculta();
  }).observe(document.body, { childList: true, subtree: true });
  pestanasYHash();
  (window as unknown as { LyTFiguras: unknown }).LyTFiguras = { enlaza: (n: ParentNode) => arranca(n), muestra, oculta };
}
arranca();
