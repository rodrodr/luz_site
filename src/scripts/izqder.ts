export {};
/**
 * Isla de «¿Izquierda o derecha?» (Método 07; `components/metodo/IzqDer.astro`). SOLO AÑADE: sin JS, la tabla con
 * las tasas está a la vista. Con JS: seis palabras al azar; el lector elige un banco de EI a ED; se pintan las siete
 * barras (apariciones por 10.000 palabras) con el máximo y su apuesta, y se puntúa por la distancia (3 · 2 · 1 · 0).
 */
interface Palabra { clave: string; palabra: string; tasas: Record<string, number>; max: string }
interface Textos {
  cuenta: string; pregunta: string; exacto: string; cerca: string; cercaUno: string; mas: string; leyenda: string;
  siguiente: string; ver: string; resumen: string; niveles: string[]; nombres: string[];
}

const POR_PARTIDA = 6;
const pinta = (x: string, v: Record<string, string>) => x.replace(/\{(\w+)\}/g, (_m, k: string) => v[k] ?? '');
const baraja = <T,>(xs: T[]): T[] => {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const P = JSON.parse(raiz.dataset.palabras || '[]') as Palabra[];
  const EJE = JSON.parse(raiz.dataset.eje || '[]') as string[];
  if (!P.length || EJE.length !== 7) return;
  const uno = new Intl.NumberFormat(raiz.dataset.locale || 'es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const q = <E extends Element>(s: string) => raiz.querySelector<E>(s)!;
  const juego = q<HTMLElement>('.izq-juego');
  const cuenta = q<HTMLElement>('[data-izq-cuenta]');
  const pregunta = q<HTMLElement>('[data-izq-pregunta]');
  const bancos = Array.from(raiz.querySelectorAll<HTMLButtonElement>('[data-izq-banco]'));
  const grupo = q<HTMLElement>('.izq-bancos');
  const leyendaEje = q<HTMLElement>('.izq-leyenda-eje');
  const revela = q<HTMLElement>('[data-izq-revela]');
  const aviso = q<HTMLElement>('[data-izq-aviso]');
  const barras = q<HTMLElement>('[data-izq-barras]');
  const leyenda = q<HTMLElement>('[data-izq-leyenda]');
  const sr = q<HTMLElement>('[data-izq-sr]');
  const siguiente = q<HTMLButtonElement>('[data-izq-siguiente]');
  const final = q<HTMLElement>('[data-izq-final]');
  const resumen = q<HTMLElement>('[data-izq-resumen]');
  const nivel = q<HTMLElement>('[data-izq-nivel]');
  const otra = q<HTMLButtonElement>('[data-izq-otra]');
  let R: Palabra[] = [], i = 0, total = 0, respondida = false;

  raiz.classList.add('izq--juego');
  juego.hidden = false;

  function partida(): void {
    R = baraja(P).slice(0, POR_PARTIDA);
    i = 0; total = 0;
    final.hidden = true;
    for (const x of [cuenta, pregunta, grupo, leyendaEje]) x.hidden = false;
    ronda();
  }

  function ronda(): void {
    respondida = false;
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), p: String(total) });
    pregunta.textContent = pinta(T.pregunta, { palabra: R[i].palabra });
    for (const b of bancos) { b.disabled = false; b.removeAttribute('aria-pressed'); b.classList.remove('max'); }
    revela.hidden = true; siguiente.hidden = true;
    sr.textContent = pregunta.textContent;
  }

  function apuesta(k: number): void {
    if (respondida) return;
    respondida = true;
    const w = R[i], m = EJE.indexOf(w.max), d = Math.abs(k - m);
    total += d === 0 ? 3 : d === 1 ? 2 : d === 2 ? 1 : 0;
    bancos.forEach((b, j) => { b.disabled = true; b.classList.toggle('max', j === m); });
    bancos[k].setAttribute('aria-pressed', 'true');
    const tope = Math.max(...EJE.map((e) => w.tasas[e]), 0.01);
    barras.replaceChildren(...EJE.map((e, j) => {
      const fila = document.createElement('div');
      fila.className = `fila${j === m ? ' max' : ''}${j === k ? ' apuesta' : ''}`;
      const cod = document.createElement('span'); cod.textContent = e;
      const pista = document.createElement('span');
      const barra = document.createElement('span'); barra.className = 'barra'; barra.style.display = 'block'; barra.style.width = `${(w.tasas[e] / tope) * 100}%`;
      pista.append(barra);
      const valor = document.createElement('span'); valor.className = 'valor'; valor.textContent = uno.format(w.tasas[e]);
      fila.append(cod, pista, valor);
      return fila;
    }));
    const lejos = d === 0 ? T.exacto : d === 1 ? T.cercaUno : pinta(T.cerca, { n: String(d) });
    aviso.textContent = `${lejos} ${pinta(T.mas, { ideologia: T.nombres[m], tasa: uno.format(w.tasas[w.max]) })}`;
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
    for (const x of [cuenta, pregunta, grupo, leyendaEje, revela, siguiente]) x.hidden = true;
    final.hidden = false;
    sr.textContent = `${resumen.textContent} ${nivel.textContent}`;
    otra.focus();
  }

  bancos.forEach((b, k) => b.addEventListener('click', () => apuesta(k)));
  siguiente.addEventListener('click', () => {
    i++;
    if (i < R.length) { ronda(); bancos[0].focus(); } else fin();
  });
  otra.addEventListener('click', () => { partida(); bancos[0].focus(); });

  partida();
}

document.querySelectorAll<HTMLElement>('[data-izqder]').forEach(iniciar);
