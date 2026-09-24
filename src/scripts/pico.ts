export {};
/**
 * Isla de «¿Cuándo fue el pico?» (Explorador; `components/explorador/Pico.astro`). SOLO AÑADE: sin JS, la tabla con
 * cada término y su mes pico está a la vista. Con JS: cinco términos al azar; el lector elige año y mes; se dibuja la
 * curva de apariciones por mes con el pico y su apuesta, y se puntúa por la distancia en meses (3 · 2 · 1 · 0).
 */
interface Termino { nombre: string; s: number[]; pico: string }
interface Lab { meses: string[]; terminos: Termino[] }
interface Textos {
  cuenta: string; pregunta: string; exacto: string; distancia: string; distanciaUno: string; pico: string; leyenda: string;
  siguiente: string; ver: string; resumen: string; niveles: string[];
}

const POR_PARTIDA = 5;
const NS = 'http://www.w3.org/2000/svg';
const pinta = (x: string, v: Record<string, string>) => x.replace(/\{(\w+)\}/g, (_m, k: string) => v[k] ?? '');
const baraja = <T,>(xs: T[]): T[] => {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const ordinal = (m: string) => Number(m.slice(0, 4)) * 12 + Number(m.slice(5, 7)) - 1;
const puntos = (d: number) => (d === 0 ? 3 : d <= 2 ? 2 : d <= 6 ? 1 : 0);

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const D = JSON.parse(raiz.dataset.lab || 'null') as Lab | null;
  if (!D || !D.terminos.length) return;
  const loc = raiz.dataset.locale || 'es-ES';
  const nf = new Intl.NumberFormat(loc);
  const mesLargo = (m: string) => new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${m}-01T00:00:00Z`));
  const mesCorto = (k: number) => new Intl.DateTimeFormat(loc, { month: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, k, 1)));
  const q = <E extends Element>(s: string) => raiz.querySelector<E>(s)!;
  const juego = q<HTMLElement>('.pic-juego');
  const cuenta = q<HTMLElement>('[data-pic-cuenta]');
  const pregunta = q<HTMLElement>('[data-pic-pregunta]');
  const anios = q<HTMLElement>('[data-pic-anios]');
  const rotMes = q<HTMLElement>('[data-pic-rot-mes]');
  const meses = q<HTMLElement>('[data-pic-meses]');
  const revela = q<HTMLElement>('[data-pic-revela]');
  const aviso = q<HTMLElement>('[data-pic-aviso]');
  const curva = q<SVGSVGElement>('[data-pic-curva]');
  const leyenda = q<HTMLElement>('[data-pic-leyenda]');
  const sr = q<HTMLElement>('[data-pic-sr]');
  const siguiente = q<HTMLButtonElement>('[data-pic-siguiente]');
  const final = q<HTMLElement>('[data-pic-final]');
  const resumen = q<HTMLElement>('[data-pic-resumen]');
  const nivel = q<HTMLElement>('[data-pic-nivel]');
  const otra = q<HTMLButtonElement>('[data-pic-otra]');
  const conSesion = new Set(D.meses);
  const listaAnios = [...new Set(D.meses.map((m) => m.slice(0, 4)))];
  const rotulosPrevios = [anios.previousElementSibling as HTMLElement];
  let R: Termino[] = [], i = 0, total = 0, anio = '', respondida = false;

  raiz.classList.add('pic--juego');
  juego.hidden = false;

  const boton = (texto: string, al: () => void) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'boton sec'; b.textContent = texto;
    b.addEventListener('click', al);
    return b;
  };
  anios.replaceChildren(...listaAnios.map((a) => boton(a, () => eligeAnio(a))));

  function partida(): void {
    R = baraja(D!.terminos).slice(0, POR_PARTIDA);
    i = 0; total = 0;
    final.hidden = true;
    for (const x of [cuenta, pregunta, anios, ...rotulosPrevios]) x.hidden = false;
    ronda();
  }

  function ronda(): void {
    respondida = false; anio = '';
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), p: String(total) });
    pregunta.textContent = pinta(T.pregunta, { termino: R[i].nombre });
    anios.querySelectorAll('button').forEach((b) => { b.disabled = false; b.removeAttribute('aria-pressed'); });
    meses.hidden = true; rotMes.hidden = true; revela.hidden = true; siguiente.hidden = true;
    sr.textContent = pregunta.textContent;
  }

  function eligeAnio(a: string): void {
    if (respondida) return;
    anio = a;
    anios.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === a)));
    meses.replaceChildren(...Array.from({ length: 12 }, (_x, k) => {
      const m = `${a}-${String(k + 1).padStart(2, '0')}`;
      const b = boton(mesCorto(k), () => apuesta(m, b));
      b.dataset.mes = m;
      b.disabled = !conSesion.has(m);
      return b;
    }));
    rotMes.hidden = false; meses.hidden = false;
    meses.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();
  }

  function dibuja(t: Termino, m: string): void {
    const n = D!.meses.length, w = 640 / n, max = Math.max(...t.s, 1);
    const nodos: SVGElement[] = [];
    let ultimo = -99, anioPrevio = '';
    D!.meses.forEach((mes, k) => {
      const h = (t.s[k] / max) * 100;
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', String(k * w + w * 0.1)); r.setAttribute('width', String(w * 0.8));
      r.setAttribute('y', String(104 - h)); r.setAttribute('height', String(Math.max(h, 0.8)));
      if (mes === t.pico) r.classList.add('pico'); else if (mes === m) r.classList.add('apuesta');
      nodos.push(r);
      // La apuesta, también marcada bajo el eje: su barra puede ser casi nula.
      if (mes === m && mes !== t.pico) {
        const s = document.createElementNS(NS, 'rect');
        s.setAttribute('x', String(k * w)); s.setAttribute('width', String(w)); s.setAttribute('y', '106'); s.setAttribute('height', '3');
        s.classList.add('apuesta');
        nodos.push(s);
      }
      // El año, rotulado en su primer mes con sesiones (enero puede no tenerlas), si cabe.
      if (mes.slice(0, 4) !== anioPrevio) {
        anioPrevio = mes.slice(0, 4);
        if (k - ultimo >= 5) {
          const tx = document.createElementNS(NS, 'text');
          tx.setAttribute('x', String(k * w)); tx.setAttribute('y', '122'); tx.textContent = anioPrevio;
          nodos.push(tx); ultimo = k;
        }
      }
    });
    curva.replaceChildren(...nodos);
    curva.setAttribute('aria-label', `${T.leyenda} ${pinta(T.pico, { mes: mesLargo(t.pico), n: nf.format(max) })}`);
  }

  function apuesta(m: string, b: HTMLButtonElement): void {
    if (respondida) return;
    respondida = true;
    const t = R[i];
    const d = Math.abs(ordinal(m) - ordinal(t.pico));
    total += puntos(d);
    meses.querySelectorAll('button').forEach((x) => { x.disabled = true; x.classList.toggle('pico', x.dataset.mes === t.pico); });
    anios.querySelectorAll('button').forEach((x) => { x.disabled = true; });
    b.setAttribute('aria-pressed', 'true');
    const max = t.s[D!.meses.indexOf(t.pico)];
    aviso.textContent = `${d === 0 ? T.exacto : d === 1 ? T.distanciaUno : pinta(T.distancia, { n: nf.format(d) })} ${pinta(T.pico, { mes: mesLargo(t.pico), n: nf.format(max) })}`;
    dibuja(t, m);
    leyenda.textContent = T.leyenda;
    revela.hidden = false;
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), p: String(total) });
    siguiente.textContent = i + 1 < R.length ? T.siguiente : T.ver;
    siguiente.hidden = false;
    sr.textContent = aviso.textContent;
    siguiente.focus();
  }

  function fin(): void {
    const max = R.length * 3, k = total / max;
    resumen.textContent = pinta(T.resumen, { p: String(total), max: String(max) });
    nivel.textContent = T.niveles[k >= 0.8 ? 3 : k >= 0.5 ? 2 : k >= 0.25 ? 1 : 0];
    for (const x of [cuenta, pregunta, anios, meses, rotMes, revela, siguiente, ...rotulosPrevios]) x.hidden = true;
    final.hidden = false;
    sr.textContent = `${resumen.textContent} ${nivel.textContent}`;
    otra.focus();
  }

  siguiente.addEventListener('click', () => {
    i++;
    if (i < R.length) { ronda(); anios.querySelector('button')?.focus(); } else fin();
  });
  otra.addEventListener('click', () => { partida(); anios.querySelector('button')?.focus(); });

  partida();
}

document.querySelectorAll<HTMLElement>('[data-pico]').forEach(iniciar);
