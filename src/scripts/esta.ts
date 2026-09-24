export {};
/**
 * Isla de «¿Esta o esta?» (Las Cortes; `components/cortes/EstaOEsta.astro`). SOLO AÑADE: sin JS, la tabla con las
 * parejas y sus autores está a la vista. Con JS:
 *  · cada partida saca diez parejas y baraja qué frase va a cada lado;
 *  · el lector firma una; se descubre quién dijo cada una (partido, familia, ideología, fecha y fila);
 *  · al final, su escaño: el lugar en el eje (media de las ideologías firmadas, de EI = −3 a ED = +3), la familia más
 *    firmada (en empate, la de ideología más cercana a esa media), el diputado más firmado y la lista de firmados.
 */
interface Lado { id: number; orador: string; partido: string; familia: string; ideologia: string; ideo: string; cuando: string; frase: string }
interface Pareja { clave: string; tema: string; lados: Lado[] }
interface Textos {
  cuenta: string; quien: string; fila: string; siguiente: string; ver: string;
  familia: string; ejeFrase: string; companero: string; firmo: string; eje: string[]; ejeNombres: string[];
}

const POR_PARTIDA = 10;
const pinta = (x: string, v: Record<string, string>) => x.replace(/\{(\w+)\}/g, (_m, k: string) => v[k] ?? '');
const baraja = <T,>(xs: T[]): T[] => {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const TODAS = JSON.parse(raiz.dataset.parejas || '[]') as Pareja[];
  if (!TODAS.length) return;
  const q = <E extends Element>(s: string) => raiz.querySelector<E>(s)!;
  const juego = q<HTMLElement>('.est-juego');
  const cuenta = q<HTMLElement>('[data-est-cuenta]');
  const tema = q<HTMLElement>('[data-est-tema]');
  const par = q<HTMLElement>('[data-est-par]');
  const cartas = Array.from(raiz.querySelectorAll<HTMLElement>('[data-est-carta]'));
  const sr = q<HTMLElement>('[data-est-sr]');
  const siguiente = q<HTMLButtonElement>('[data-est-siguiente]');
  const final = q<HTMLElement>('[data-est-final]');
  const eje = q<HTMLElement>('[data-est-eje]');
  const otra = q<HTMLButtonElement>('[data-est-otra]');
  const pos = (c: string) => T.eje.indexOf(c) - (T.eje.length - 1) / 2;
  const izq = (v: number) => `${((v + (T.eje.length - 1) / 2) / (T.eje.length - 1)) * 100}%`;
  let P: Pareja[] = [], i = 0, firmadas: Lado[] = [], firmada = false;

  raiz.classList.add('est--juego');
  juego.hidden = false;

  const parte = (c: HTMLElement) => ({
    frase: c.querySelector<HTMLElement>('[data-est-frase]')!, quien: c.querySelector<HTMLElement>('[data-est-quien]')!,
    marca: c.querySelector<HTMLElement>('[data-est-marca]')!, boton: c.querySelector<HTMLButtonElement>('[data-est-firmo]')!,
  });

  function partida(): void {
    P = baraja(TODAS).slice(0, POR_PARTIDA).map((x) => ({ ...x, lados: Math.random() < 0.5 ? x.lados : [x.lados[1], x.lados[0]] }));
    i = 0; firmadas = [];
    final.hidden = true;
    for (const x of [cuenta, tema, par]) x.hidden = false;
    ronda();
  }

  function ronda(): void {
    const x = P[i];
    firmada = false;
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(P.length) });
    tema.textContent = x.tema;
    cartas.forEach((c, k) => {
      const e = parte(c);
      e.frase.textContent = `«${x.lados[k].frase}»`;
      e.quien.hidden = true; e.marca.hidden = true; e.boton.hidden = false; e.boton.disabled = false;
      c.classList.remove('firmada');
    });
    siguiente.hidden = true;
    par.classList.remove('entra');
    void par.offsetWidth;
    par.classList.add('entra');
    sr.textContent = x.tema;
  }

  function firma(k: number): void {
    if (firmada) return;
    firmada = true;
    const x = P[i];
    firmadas.push(x.lados[k]);
    cartas.forEach((c, j) => {
      const e = parte(c), l = x.lados[j];
      e.quien.textContent = `${pinta(T.quien, { orador: l.orador, partido: l.partido, familia: l.familia, ideologia: l.ideo, fecha: l.cuando })} · ${pinta(T.fila, { id: String(l.id) })}`;
      e.quien.hidden = false; e.boton.hidden = true; e.marca.hidden = j !== k;
      c.classList.toggle('firmada', j === k);
    });
    siguiente.textContent = i + 1 < P.length ? T.siguiente : T.ver;
    siguiente.hidden = false;
    sr.textContent = parte(cartas[k]).quien.textContent || '';
    siguiente.focus();
  }

  /** El más repetido; en empate, el de ideología más cercana a la media del lector. */
  function masFirmado(clave: (l: Lado) => string, media: number): string {
    const n = new Map<string, Lado[]>();
    for (const l of firmadas) n.set(clave(l), [...(n.get(clave(l)) ?? []), l]);
    const d = (ls: Lado[]) => Math.abs(ls.reduce((s, l) => s + pos(l.ideologia), 0) / ls.length - media);
    return [...n.entries()].sort((a, b) => b[1].length - a[1].length || d(a[1]) - d(b[1]))[0][0];
  }

  function fin(): void {
    const media = firmadas.reduce((s, l) => s + pos(l.ideologia), 0) / firmadas.length;
    const cerca = T.eje[Math.round(media + (T.eje.length - 1) / 2)];
    const nombre = T.ejeNombres[T.eje.indexOf(cerca)];
    // El eje: sus siete marcas, un punto por frase firmada (apilados) y el escaño del lector.
    const pila = new Map<string, number>();
    const nodos: HTMLElement[] = [Object.assign(document.createElement('span'), { className: 'linea' })];
    T.eje.forEach((c) => nodos.push(Object.assign(document.createElement('span'), { className: 'marca', textContent: c, style: `left:${izq(pos(c))}` })));
    for (const l of firmadas) {
      const h = pila.get(l.ideologia) ?? 0;
      pila.set(l.ideologia, h + 1);
      nodos.push(Object.assign(document.createElement('span'), { className: 'voto', style: `left:${izq(pos(l.ideologia))};top:${1.05 - h * 0.55}rem` }));
    }
    const usted = Object.assign(document.createElement('span'), { className: 'usted', style: `left:${izq(0)}` });
    nodos.push(usted);
    eje.replaceChildren(...nodos);
    requestAnimationFrame(() => requestAnimationFrame(() => { usted.style.left = izq(media); }));

    const cuantos = new Map<string, number>();
    for (const l of firmadas) cuantos.set(l.orador, (cuantos.get(l.orador) ?? 0) + 1);
    const lista = [...cuantos.entries()].sort((a, b) => b[1] - a[1]).map(([o, n]) => (n > 1 ? `${o} (${n})` : o)).join(', ');
    q<HTMLElement>('[data-est-p-eje]').textContent = pinta(T.ejeFrase, { ideologia: nombre });
    q<HTMLElement>('[data-est-p-familia]').textContent = pinta(T.familia, { familia: masFirmado((l) => l.familia, media) });
    q<HTMLElement>('[data-est-p-companero]').textContent = pinta(T.companero, { diputado: masFirmado((l) => l.orador, media) });
    q<HTMLElement>('[data-est-p-firmo]').textContent = pinta(T.firmo, { lista });
    for (const x of [cuenta, tema, par, siguiente]) x.hidden = true;
    final.hidden = false;
    sr.textContent = [q('[data-est-p-eje]'), q('[data-est-p-familia]'), q('[data-est-p-companero]')].map((x) => x.textContent).join(' ');
    otra.focus();
  }

  cartas.forEach((c, k) => parte(c).boton.addEventListener('click', () => firma(k)));
  siguiente.addEventListener('click', () => {
    i++;
    if (i < P.length) { ronda(); parte(cartas[0]).boton.focus(); } else fin();
  });
  otra.addEventListener('click', () => { partida(); parte(cartas[0]).boton.focus(); });

  partida();
}

document.querySelectorAll<HTMLElement>('[data-esta]').forEach(iniciar);
