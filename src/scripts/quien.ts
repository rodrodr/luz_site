export {};
/**
 * Isla de «¿Quién lo dijo?» (Sesiones; `components/sesiones/QuienLoDijo.astro`). SOLO AÑADE: sin JS, la tabla con
 * las citas y su autor está a la vista. Con JS: ocho citas de autores distintos, cuatro opciones cada una (el autor y
 * tres oradores más de la lista, al azar); al responder, el autor con su partido, su fecha y su fila; al final, los
 * aciertos y el puesto en la Cámara. [Otra ronda] baraja otra partida.
 */
interface Cita { id: number; rep_id: number; orador: string; partido: string; cuando: string; frase: string }
interface Textos { cuenta: string; bien: string; mal: string; quien: string; fila: string; siguiente: string; ver: string; resumen: string; niveles: string[] }

const POR_PARTIDA = 8;
const pinta = (x: string, v: Record<string, string>) => x.replace(/\{(\w+)\}/g, (_m, k: string) => v[k] ?? '');
const baraja = <T,>(xs: T[]): T[] => {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const C = JSON.parse(raiz.dataset.citas || '[]') as Cita[];
  const oradores = [...new Map(C.map((c) => [c.rep_id, c.orador])).entries()];
  if (oradores.length < 4) return;
  const q = <E extends Element>(s: string) => raiz.querySelector<E>(s)!;
  const juego = q<HTMLElement>('.qui-juego');
  const cuenta = q<HTMLElement>('[data-qui-cuenta]');
  const hoja = q<HTMLElement>('[data-qui-hoja]');
  const frase = q<HTMLElement>('[data-qui-frase]');
  const pregunta = q<HTMLElement>('.qui-pregunta');
  const opciones = q<HTMLElement>('.qui-opciones');
  const botones = Array.from(raiz.querySelectorAll<HTMLButtonElement>('[data-qui-op]'));
  const revela = q<HTMLElement>('[data-qui-revela]');
  const aviso = q<HTMLElement>('[data-qui-aviso]');
  const quien = q<HTMLElement>('[data-qui-quien]');
  const sr = q<HTMLElement>('[data-qui-sr]');
  const siguiente = q<HTMLButtonElement>('[data-qui-siguiente]');
  const final = q<HTMLElement>('[data-qui-final]');
  const resumen = q<HTMLElement>('[data-qui-resumen]');
  const nivel = q<HTMLElement>('[data-qui-nivel]');
  const otra = q<HTMLButtonElement>('[data-qui-otra]');
  let R: { c: Cita; ops: string[] }[] = [], i = 0, aciertos = 0, respondida = false;

  raiz.classList.add('qui--juego');
  juego.hidden = false;

  function partida(): void {
    const vistos = new Set<number>(), elegidas: Cita[] = [];
    for (const c of baraja(C)) {
      if (vistos.has(c.rep_id)) continue;
      vistos.add(c.rep_id); elegidas.push(c);
      if (elegidas.length === POR_PARTIDA) break;
    }
    R = elegidas.map((c) => ({ c, ops: baraja([c.orador, ...baraja(oradores.filter(([r]) => r !== c.rep_id)).slice(0, 3).map(([, o]) => o)]) }));
    i = 0; aciertos = 0;
    final.hidden = true;
    for (const x of [cuenta, hoja, pregunta, opciones]) x.hidden = false;
    ronda();
  }

  function ronda(): void {
    const r = R[i];
    respondida = false;
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), a: String(aciertos) });
    frase.textContent = `«${r.c.frase}»`;
    botones.forEach((b, k) => { b.textContent = r.ops[k]; b.disabled = false; b.removeAttribute('aria-pressed'); b.classList.remove('correcta'); });
    revela.hidden = true;
    siguiente.hidden = true;
    hoja.classList.remove('entra');
    void hoja.offsetWidth;
    hoja.classList.add('entra');
    sr.textContent = frase.textContent;
  }

  function responde(b: HTMLButtonElement): void {
    if (respondida) return;
    respondida = true;
    const c = R[i].c;
    const bien = b.textContent === c.orador;
    if (bien) aciertos++;
    for (const x of botones) { x.disabled = true; x.classList.toggle('correcta', x.textContent === c.orador); }
    b.setAttribute('aria-pressed', 'true');
    aviso.textContent = bien ? T.bien : pinta(T.mal, { orador: c.orador });
    quien.textContent = `${pinta(T.quien, { orador: c.orador, partido: c.partido, fecha: c.cuando })} · ${pinta(T.fila, { id: String(c.id) })}`;
    revela.hidden = false;
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), a: String(aciertos) });
    siguiente.textContent = i + 1 < R.length ? T.siguiente : T.ver;
    siguiente.hidden = false;
    sr.textContent = `${aviso.textContent} ${quien.textContent}`;
    siguiente.focus();
  }

  function fin(): void {
    const k = aciertos / R.length;
    resumen.textContent = pinta(T.resumen, { n: String(aciertos), total: String(R.length) });
    nivel.textContent = T.niveles[k >= 0.9 ? 4 : k >= 0.7 ? 3 : k >= 0.5 ? 2 : k >= 0.3 ? 1 : 0];
    for (const x of [cuenta, hoja, pregunta, opciones, revela, siguiente]) x.hidden = true;
    final.hidden = false;
    sr.textContent = `${resumen.textContent} ${nivel.textContent}`;
    otra.focus();
  }

  botones.forEach((b) => b.addEventListener('click', () => responde(b)));
  siguiente.addEventListener('click', () => {
    i++;
    if (i < R.length) { ronda(); botones[0].focus(); } else fin();
  });
  otra.addEventListener('click', () => { partida(); botones[0].focus(); });

  partida();
}

document.querySelectorAll<HTMLElement>('[data-quien]').forEach(iniciar);
