export {};
/**
 * Isla de «El aplausómetro» (El Diario; `components/diario/Aplausometro.astro`). SOLO AÑADE: sin JS, la tabla con las
 * frases y sus acotaciones está a la vista. Con JS:
 *  · cada partida saca dos frases de cada acotación, barajadas;
 *  · el lector elige qué anotó el taquígrafo; se dice si acertó, si el sentido era ese (aplausos y «Muy bien»;
 *    rumores y protestas) o no, y aparecen la acotación literal y la fila;
 *  · al final, sus aciertos y la acotación que le dedica la Cámara; [Otra sesión] baraja otra partida.
 */
interface Ronda { clave: string; cat: string; id: number; cuando: string; orador: string; partido: string; frase: string; acotacion: string }
interface Textos {
  cuenta: string; quien: string; exacto: string; cerca: string; fallo: string; anoto: string; fila: string;
  siguiente: string; ver: string; resumen: string; veredicto: string[];
}

const POR_CATEGORIA = 2;
const SENTIDO: Record<string, string> = { aplausos: 'bien', muy_bien: 'bien', rumores: 'mal', protestas: 'mal', risas: 'risa' };
const pinta = (x: string, v: Record<string, string>) => x.replace(/\{(\w+)\}/g, (_m, k: string) => v[k] ?? '');
const baraja = <T,>(xs: T[]): T[] => {
  const a = xs.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const TODAS = JSON.parse(raiz.dataset.rondas || '[]') as Ronda[];
  if (!TODAS.length) return;
  const q = <E extends Element>(s: string) => raiz.querySelector<E>(s)!;
  const juego = q<HTMLElement>('.apl-juego');
  const cuenta = q<HTMLElement>('[data-apl-cuenta]');
  const metro = q<HTMLOListElement>('[data-apl-metro]');
  const hoja = q<HTMLElement>('[data-apl-hoja]');
  const frase = q<HTMLElement>('[data-apl-frase]');
  const quien = q<HTMLElement>('[data-apl-quien]');
  const botones = Array.from(raiz.querySelectorAll<HTMLButtonElement>('.apl-op'));
  const revela = q<HTMLElement>('[data-apl-revela]');
  const aviso = q<HTMLElement>('[data-apl-aviso]');
  const acot = q<HTMLElement>('[data-apl-acot]');
  const fila = q<HTMLElement>('[data-apl-fila]');
  const sr = q<HTMLElement>('[data-apl-sr]');
  const siguiente = q<HTMLButtonElement>('[data-apl-siguiente]');
  const final = q<HTMLElement>('[data-apl-final]');
  const resumen = q<HTMLElement>('[data-apl-resumen]');
  const veredicto = q<HTMLElement>('[data-apl-veredicto]');
  const otra = q<HTMLButtonElement>('[data-apl-otra]');
  const opciones = q<HTMLElement>('.apl-opciones');
  const pregunta = q<HTMLElement>('.apl-pregunta');
  let R: Ronda[] = [], i = 0, aciertos = 0, respondida = false;

  raiz.classList.add('apl--juego');
  juego.hidden = false;

  function partida(): void {
    const cats = [...new Set(TODAS.map((x) => x.cat))];
    R = baraja(cats.flatMap((c) => baraja(TODAS.filter((x) => x.cat === c)).slice(0, POR_CATEGORIA)));
    i = 0; aciertos = 0;
    metro.replaceChildren(...R.map(() => document.createElement('li')));
    final.hidden = true;
    for (const x of [hoja, pregunta, opciones, cuenta]) x.hidden = false;
    ronda();
  }

  function ronda(): void {
    const r = R[i];
    respondida = false;
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), a: String(aciertos) });
    frase.textContent = `«${r.frase}»`;
    quien.textContent = pinta(T.quien, { orador: r.orador, partido: r.partido, fecha: r.cuando });
    metro.querySelectorAll('li').forEach((li, k) => li.classList.toggle('ahora', k === i));
    for (const b of botones) { b.disabled = false; b.removeAttribute('aria-pressed'); b.classList.remove('correcta'); }
    revela.hidden = true;
    siguiente.hidden = true;
    hoja.classList.remove('entra');
    void hoja.offsetWidth;
    hoja.classList.add('entra');
    sr.textContent = `${frase.textContent} ${quien.textContent}`;
  }

  function responde(b: HTMLButtonElement): void {
    if (respondida) return;
    respondida = true;
    const r = R[i];
    const elegida = b.dataset.cat || '';
    const nota = elegida === r.cat ? 'acierto' : SENTIDO[elegida] === SENTIDO[r.cat] ? 'cerca' : 'fallo';
    if (nota === 'acierto') aciertos++;
    for (const x of botones) { x.disabled = true; x.classList.toggle('correcta', x.dataset.cat === r.cat); }
    b.setAttribute('aria-pressed', 'true');
    metro.children[i].classList.add(nota);
    aviso.textContent = `${nota === 'acierto' ? T.exacto : nota === 'cerca' ? T.cerca : T.fallo} ${T.anoto}`;
    acot.textContent = r.acotacion;
    fila.textContent = pinta(T.fila, { id: String(r.id) });
    revela.hidden = false;
    acot.classList.remove('sale');
    void acot.offsetWidth;
    acot.classList.add('sale');
    cuenta.textContent = pinta(T.cuenta, { i: String(i + 1), n: String(R.length), a: String(aciertos) });
    siguiente.textContent = i + 1 < R.length ? T.siguiente : T.ver;
    siguiente.hidden = false;
    sr.textContent = `${aviso.textContent} ${r.acotacion}`;
    siguiente.focus();
  }

  function fin(): void {
    const k = aciertos / R.length;
    resumen.textContent = pinta(T.resumen, { n: String(aciertos), total: String(R.length) });
    veredicto.textContent = T.veredicto[k >= 0.9 ? 4 : k >= 0.7 ? 3 : k >= 0.5 ? 2 : k >= 0.3 ? 1 : 0];
    for (const x of [hoja, pregunta, opciones, revela, cuenta, siguiente]) x.hidden = true;
    metro.querySelectorAll('li').forEach((li) => li.classList.remove('ahora'));
    final.hidden = false;
    sr.textContent = `${resumen.textContent} ${veredicto.textContent}`;
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

document.querySelectorAll<HTMLElement>('[data-aplausos]').forEach(iniciar);
