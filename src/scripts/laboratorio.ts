export {};
/**
 * Isla del laboratorio de palabras (juego 1 de Inicio; `components/inicio/Laboratorio.astro`). SOLO AÑADE: sin JS, las
 * ocho palabras de partida funcionan con radios y CSS. Con JS:
 *  · el JSON (`public/datos/laboratorio.json`) se pide cuando la sección se acerca a la pantalla o al primer gesto;
 *  · se puede escribir cualquier término (combobox con sugerencias), comparar hasta tres y quitar cada uno;
 *  · la curva se traza de izquierda a derecha, se recorre con el puntero o con ← → (Inicio, Fin) y enseña el mes;
 *  · el calendario se enciende con la palabra principal; al elegirla, la nota se posa en su mes de máximo;
 *  · [Copiar la consulta] copia la palabra principal tal como se escribe en el buscador del explorador.
 * Movimiento solo con `prefers-reduced-motion: no-preference`.
 */
import {
  W, H, serie, densidades, techo, trazos, niveles, clave, consulta, type LabDatos,
} from '../viz/geom/laboratorio';

const MAX_SERIES = 3;
const MAX_SUG = 8;
const quieto = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS = 'http://www.w3.org/2000/svg';

interface Textos { mes: string; nada: string; ninguna: string; cargando: string; quitar: string }
interface Entrada { k: string; f: string; total: number }

function iniciar(raiz: HTMLElement): void {
  const url = raiz.dataset.url!;
  const locale = raiz.dataset.locale || 'es-ES';
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  // D-16: punto de millares también en cifras de cuatro dígitos («1.116»).
  const nf = new Intl.NumberFormat(locale, { useGrouping: 'always' as unknown as boolean });
  const nf1 = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat(locale, { maximumFractionDigits: 2, useGrouping: 'always' as unknown as boolean });
  const df = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const mesLargo = (m: string) => { const [y, mm] = m.split('-').map(Number); return df.format(new Date(Date.UTC(y, mm - 1, 1))); };

  const busca = raiz.querySelector<HTMLElement>('.lab-busca')!;
  const input = raiz.querySelector<HTMLInputElement>('#lab-q')!;
  const sug = raiz.querySelector<HTMLUListElement>('#lab-sug')!;
  const comparar = raiz.querySelector<HTMLButtonElement>('.lab-comparar')!;
  const lista = raiz.querySelector<HTMLUListElement>('.lab-series')!;
  const estado = raiz.querySelector<HTMLElement>('.lab-estado')!;
  const anuncio = raiz.querySelector<HTMLElement>('.lab-anuncio')!;
  const grafico = raiz.querySelector<HTMLElement>('.lab-grafico')!;
  const svg = raiz.querySelector<SVGSVGElement>('.lab-svg')!;
  const capa = raiz.querySelector<SVGGElement>('.lab-dinamico')!;
  const cursor = raiz.querySelector<SVGLineElement>('.lab-cursor')!;
  const nota = raiz.querySelector<HTMLElement>('.lab-nota')!;
  const eco = raiz.querySelector<HTMLElement>('.lab-eco-vivo')!;
  const techoVivo = raiz.querySelector<HTMLElement>('.lab-techo-vivo')!;
  const celdas = [...raiz.querySelectorAll<HTMLElement>('.lab-c')];
  const radios = [...raiz.querySelectorAll<HTMLInputElement>('input[name="lab-w"]')];
  const codigo = raiz.querySelector<HTMLElement>('[data-copiar-texto]');

  let D: LabDatos | null = null;
  let pidiendo: Promise<LabDatos | null> | null = null;
  let indice: Entrada[] = [];
  let series: string[] = [];
  let actual = -1;                       // índice del mes bajo el cursor (o del máximo)
  let pts: { x: number; i: number }[] = [];
  let dens: number[][] = [];
  let conts: number[][] = [];
  let opcion = -1;

  busca.hidden = false;

  function cargar(): Promise<LabDatos | null> {
    if (D) return Promise.resolve(D);
    if (!pidiendo) {
      estado.textContent = T.cargando;
      pidiendo = fetch(url).then((r) => (r.ok ? r.json() : null)).then((d: LabDatos | null) => {
        D = d;
        estado.textContent = '';
        if (!d) return null;
        indice = Object.entries(d.terminos).map(([k, v]) => ({ k, f: v.m, total: serie(v.s, d.meses.length).reduce((a, b) => a + b, 0) }))
          .sort((a, b) => b.total - a.total);
        const marcado = radios.find((r) => r.checked);
        series = [marcado ? marcado.value : d.propuestas[0]];
        raiz.classList.add('lab--vivo');
        grafico.tabIndex = 0;
        dibujar(true);
        return d;
      }).catch(() => { estado.textContent = ''; return null; });
    }
    return pidiendo;
  }

  // ── dibujo ────────────────────────────────────────────────────────────────────────────────────────────────────
  function dibujar(animar: boolean): void {
    if (!D) return;
    const n = D.meses.length;
    conts = series.map((k) => serie(D!.terminos[k].s, n));
    dens = conts.map((c) => densidades(c, D!.tokens));
    const te = techo(dens, D.tokens, D._meta.umbral_baja);
    capa.replaceChildren();
    series.forEach((_, s) => {
      const tr = trazos(D!.meses, dens[s], D!.tokens, te, D!._meta.umbral_normal, D!._meta.umbral_baja);
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', `s${s}`);
      for (const [cls, d] of [['fino', tr.fino], ['firme', tr.firme], ['puntos', tr.pts.filter((p) => !p.debil).map((p) => `M${p.x.toFixed(1)} ${p.y.toFixed(1)}h0`).join('')]]) {
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('class', cls);
        p.setAttribute('d', d);
        g.appendChild(p);
      }
      capa.appendChild(g);
      if (s === 0) pts = tr.pts.filter((p) => !p.debil).map((p) => ({ x: p.x, i: p.i }));
    });
    techoVivo.textContent = nf1.format(te);
    eco.textContent = D.terminos[series[0]].m;
    // El calendario: la palabra principal.
    const niv = niveles(dens[0], D.tokens, D._meta.umbral_baja);
    for (const c of celdas) c.style.setProperty('--qv', String(niv[Number(c.dataset.i)] ?? 0));
    // Las fichas de las series y las palabras de partida.
    lista.replaceChildren(...series.map((k, s) => {
      const li = document.createElement('li');
      li.dataset.s = String(s);
      const muestra = document.createElement('span');
      muestra.className = 'lab-muestra';
      const nom = document.createElement('span');
      nom.textContent = D!.terminos[k].m;
      const x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('aria-label', `${T.quitar}: ${D!.terminos[k].m}`);
      x.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.6"/></svg>';
      x.addEventListener('click', () => quitar(k));
      li.append(muestra, nom, x);
      return li;
    }));
    radios.forEach((r) => r.closest('.lab-chip')?.classList.toggle('activa', r.value === series[0]));
    if (codigo) codigo.textContent = consulta(D.terminos[series[0]].m);
    // La nota se posa en el mes de máximo de la palabra principal.
    let max = -1, im = -1;
    dens[0].forEach((v, i) => { if (D!.tokens[i] >= D!._meta.umbral_baja && v > max) { max = v; im = i; } });
    if (im >= 0) { enMes(im); anuncio.textContent = texto(im, true); }
    if (animar && !quieto()) trazar();
  }

  function trazar(): void {
    const clip = document.createElementNS(NS, 'clipPath');
    clip.id = 'lab-clip';
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', '0'); r.setAttribute('y', '0'); r.setAttribute('height', String(H)); r.setAttribute('width', '0');
    clip.appendChild(r);
    svg.querySelector('#lab-clip')?.remove();
    svg.appendChild(clip);
    capa.setAttribute('clip-path', 'url(#lab-clip)');
    const t0 = performance.now(), dur = 900;
    const paso = (t: number) => {
      const k = Math.max(0, Math.min(1, (t - t0) / dur));
      const e = 1 - Math.pow(1 - k, 3);
      r.setAttribute('width', String(W * e));
      if (k < 1) requestAnimationFrame(paso); else capa.removeAttribute('clip-path');
    };
    requestAnimationFrame(paso);
  }

  function texto(i: number, soloPrimera = false): string {
    if (!D) return '';
    const mes = mesLargo(D.meses[i]);
    return series.slice(0, soloPrimera ? 1 : undefined).map((k, s) => `${soloPrimera ? mes : D!.terminos[k].m}: ` +
      T.mes.replace(/^\{mes\}:\s*/, '').replace('{n}', nf.format(conts[s][i])).replace('{d}', nf2.format(dens[s][i]))).join(' · ');
  }

  function enMes(i: number): void {
    if (!D || i < 0) return;
    actual = i;
    const x = pts.find((p) => p.i === i)?.x ?? 0;
    cursor.setAttribute('x1', String(x)); cursor.setAttribute('x2', String(x));
    cursor.setAttribute('visibility', 'visible');
    const filas = series.map((k, s) => `<span>${esc(D!.terminos[k].m)} · ${esc(T.mes.replace(/^\{mes\}:\s*/, '').replace('{n}', nf.format(conts[s][i])).replace('{d}', nf2.format(dens[s][i])))}</span>`).join('');
    nota.innerHTML = `<b>${esc(mesLargo(D.meses[i]))}</b>${filas}`;
    nota.hidden = false;
    const ancho = grafico.clientWidth;
    const px = (x / W) * ancho;
    const w = nota.offsetWidth;
    nota.style.left = `${Math.max(0, Math.min(ancho - w, px + 14 > ancho - w ? px - w - 14 : px + 14))}px`;
    celdas.forEach((c) => c.classList.toggle('activo', Number(c.dataset.i) === i));
  }
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

  // ── elegir, comparar, quitar ──────────────────────────────────────────────────────────────────────────────────
  function elegir(k: string): void {
    if (!D || !D.terminos[k]) return;
    if (comparar.getAttribute('aria-pressed') === 'true' && series.length < MAX_SERIES && !series.includes(k)) {
      series.push(k);
      comparar.setAttribute('aria-pressed', 'false');
    } else {
      series = [k, ...series.slice(1).filter((x) => x !== k)];
    }
    input.value = '';
    cerrarSug();
    dibujar(true);
  }
  function quitar(k: string): void {
    if (!D) return;
    series = series.filter((x) => x !== k);
    if (!series.length) series = [D.propuestas[0]];
    dibujar(false);
  }

  // ── sugerencias (combobox) ────────────────────────────────────────────────────────────────────────────────────
  /** Las coincidencias de lo escrito: la exacta, las que empiezan por ello y las expresiones que lo contienen. */
  function coincidencias(texto: string): Entrada[] {
    const q = clave(texto);
    if (!q || !D) return [];
    const exacta = indice.filter((e) => e.k === q);
    const empieza = indice.filter((e) => e.k !== q && e.k.startsWith(q));
    const dentro = indice.filter((e) => !e.k.startsWith(q) && e.k.includes(' ' + q));
    return [...exacta, ...empieza, ...dentro].slice(0, MAX_SUG);
  }
  function sugerir(): void {
    if (!clave(input.value) || !D) { cerrarSug(); return; }
    const res = coincidencias(input.value);
    if (!res.length) {
      cerrarSug();
      estado.textContent = T.ninguna.replace('{palabra}', input.value.trim());
      if (codigo) codigo.textContent = consulta(input.value);
      return;
    }
    estado.textContent = '';
    sug.replaceChildren(...res.map((e, j) => {
      const li = document.createElement('li');
      li.id = `lab-op-${j}`;
      li.setAttribute('role', 'option');
      li.dataset.k = e.k;
      li.setAttribute('aria-selected', 'false');
      const a = document.createElement('span'); a.textContent = e.f;
      const b = document.createElement('span'); b.className = 'lab-sug-n'; b.textContent = nf.format(e.total);
      li.append(a, b);
      li.addEventListener('pointerdown', (ev) => { ev.preventDefault(); elegir(e.k); });
      return li;
    }));
    opcion = -1;
    sug.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }
  function cerrarSug(): void {
    sug.hidden = true;
    sug.replaceChildren();
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    opcion = -1;
  }
  function marcar(j: number): void {
    const ops = [...sug.children] as HTMLElement[];
    if (!ops.length) return;
    opcion = (j + ops.length) % ops.length;
    ops.forEach((o, n) => o.setAttribute('aria-selected', String(n === opcion)));
    input.setAttribute('aria-activedescendant', ops[opcion].id);
    ops[opcion].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('focus', () => { cargar(); });
  input.addEventListener('input', () => { cargar().then(sugerir); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (sug.hidden) sugerir(); marcar(opcion + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); marcar(opcion - 1); }
    else if (e.key === 'Escape') { cerrarSug(); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      // La opción marcada con las flechas o, si no hay, la primera coincidencia de lo escrito (calculada ahora: la lista
      // puede no estar abierta todavía si se escribe y se pulsa Intro muy deprisa).
      const ops = [...sug.children] as HTMLElement[];
      const k = (opcion >= 0 ? ops[opcion]?.dataset.k : undefined) ?? coincidencias(input.value)[0]?.k;
      if (k) cargar().then(() => elegir(k)); else sugerir();
    }
  });
  // Al perder el foco se cierra la lista, salvo que el foco haya vuelto (p. ej., tras pulsar «Comparar»).
  input.addEventListener('blur', () => window.setTimeout(() => { if (document.activeElement !== input) cerrarSug(); }, 120));
  comparar.addEventListener('click', () => {
    const on = comparar.getAttribute('aria-pressed') !== 'true';
    comparar.setAttribute('aria-pressed', String(on && series.length < MAX_SERIES));
    input.focus();
  });
  radios.forEach((r) => r.addEventListener('change', () => { if (r.checked) cargar().then(() => elegir(r.value)); }));

  // ── recorrer la curva: puntero, calendario y teclado ──────────────────────────────────────────────────────────
  const mesEnX = (clientX: number) => {
    const caja = svg.getBoundingClientRect();
    const x = ((clientX - caja.left) / caja.width) * W;
    let mejor = -1, dist = Infinity;
    for (const p of pts) { const d = Math.abs(p.x - x); if (d < dist) { dist = d; mejor = p.i; } }
    return mejor;
  };
  svg.addEventListener('pointermove', (e) => { if (D) enMes(mesEnX(e.clientX)); });
  svg.addEventListener('pointerdown', (e) => { if (D) enMes(mesEnX(e.clientX)); });
  celdas.forEach((c) => {
    c.addEventListener('pointerenter', () => { if (D) enMes(Number(c.dataset.i)); });
    // Un mes con anillo abre su momento (el primero, si el mes tiene dos).
    c.addEventListener('click', () => {
      if (!c.classList.contains('momento')) return;
      raiz.querySelector<HTMLAnchorElement>(`[data-momento][data-meses~="${c.dataset.mes}"]`)?.click();
    });
  });
  grafico.addEventListener('keydown', (e) => {
    if (!D || !pts.length) return;
    const orden = pts.map((p) => p.i);
    const j = Math.max(0, orden.indexOf(actual));
    const nuevo = e.key === 'ArrowRight' ? orden[Math.min(orden.length - 1, j + 1)] : e.key === 'ArrowLeft' ? orden[Math.max(0, j - 1)]
      : e.key === 'Home' ? orden[0] : e.key === 'End' ? orden[orden.length - 1] : null;
    if (nuevo === null) return;
    e.preventDefault();
    enMes(nuevo);
    anuncio.textContent = texto(nuevo);
  });

  // El JSON se pide cuando la sección se acerca (o ya, si el navegador no sabe observar).
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) { io.disconnect(); cargar(); } }, { rootMargin: '400px 0px' });
    io.observe(raiz);
  } else cargar();
}

document.querySelectorAll<HTMLElement>('[data-lab]').forEach(iniciar);
