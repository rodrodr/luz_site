export {};
/**
 * Isla de «Corrija al Diario» (Método 03; `components/metodo/Erratas.astro`). SOLO AÑADE: sin JS, la tabla con las
 * lecturas y el remate están a la vista. Con JS:
 *  · cada ronda enseña una fórmula tal como la leyó la máquina y lo que debería decir; el campo la trae escrita, mal;
 *  · al corregirla (Intro o [Corregir]) se tacha, se dice su gracia y en cuántas filas está, y llega la siguiente;
 *  · si no está bien, se dice desde dónde comparar, sin revelar más;
 *  · la última es una trampa: no es errata, y corregirla es «corregir al Diario»;
 *  · [Me rindo] lleva al remate cuando se quiera: cuántas corrigió, en cuánto tiempo y cuánto le llevaría revisarlas
 *    todas a ese ritmo.
 */
interface Ronda { clave: string; mal: string; bien: string | null; filas: number; dicho: string }
interface Textos {
  leyo: string; cuenta: string; filas: string; filasUna: string; casi: string; bien: string;
  trampa: string; cayo: string; acierto: string; hechas: string; una: string; cero: string; ritmo: string;
}

const limpia = (s: string) => s.replace(/\s+/g, ' ').trim();
const pinta = (x: string, v: Record<string, string>) => x.replace(/\{(\w+)\}/g, (_m, k: string) => v[k] ?? '');
const primeraDiferencia = (a: string, b: string) => {
  let k = 0;
  while (k < a.length && k < b.length && a[k] === b[k]) k++;
  return k;
};
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const R = JSON.parse(raiz.dataset.rondas || '[]') as Ronda[];
  if (!R.length) return;
  const loc = raiz.dataset.locale || 'es-ES';
  const formulas = Number(raiz.dataset.formulas || 0);
  const nf = new Intl.NumberFormat(loc);
  const unidad = (v: number, u: 'second' | 'minute' | 'hour') =>
    new Intl.NumberFormat(loc, { style: 'unit', unit: u, unitDisplay: 'long', maximumFractionDigits: 0 }).format(v);
  const q = <E extends Element>(s: string) => raiz.querySelector<E>(s)!;
  const juego = q<HTMLElement>('.err-juego');
  const cuenta = q<HTMLElement>('[data-err-cuenta]');
  const hoja = q<HTMLElement>('[data-err-hoja]');
  const mal = q<HTMLElement>('[data-err-mal]');
  const debe = q<HTMLElement>('[data-err-debe]');
  const bien = q<HTMLElement>('[data-err-bien]');
  const trampa = q<HTMLElement>('[data-err-trampa]');
  const form = q<HTMLFormElement>('[data-err-form]');
  const campo = q<HTMLInputElement>('[data-err-campo]');
  const dejar = q<HTMLButtonElement>('[data-err-dejar]');
  const rendirse = q<HTMLButtonElement>('[data-err-rendirse]');
  const aviso = q<HTMLElement>('[data-err-aviso]');
  const sr = q<HTMLElement>('[data-err-sr]');
  const final = q<HTMLElement>('[data-err-final]');
  const resumen = q<HTMLElement>('[data-err-resumen]');
  const otra = q<HTMLButtonElement>('[data-err-otra]');
  const otraP = otra.closest<HTMLElement>('p')!;
  let i = 0, hechas = 0, t0 = 0, pasando = false, temporizador = 0;

  raiz.classList.add('err--juego');
  juego.hidden = false;

  function ronda(): void {
    const r = R[i];
    const esTrampa = r.bien === null;
    cuenta.textContent = pinta(T.cuenta, { i: nf.format(i + 1) });
    mal.textContent = r.mal;
    debe.hidden = esTrampa;
    trampa.hidden = !esTrampa;
    dejar.hidden = !esTrampa;
    if (esTrampa) trampa.textContent = T.trampa;
    else bien.textContent = r.bien!;
    campo.value = r.mal;
    campo.removeAttribute('aria-invalid');
    hoja.classList.remove('corregida', 'entra');
    void hoja.offsetWidth;
    hoja.classList.add('entra');
  }
  // Para el lector de pantalla, la errata nueva (el foco sigue en el campo y su valor cambia sin avisar).
  const anuncia = () => { sr.textContent = `${T.leyo}: ${R[i].mal}`; };

  const empieza = () => { if (!t0) t0 = performance.now(); };

  /** El remate. `mensaje`: lo que se dice de la última ronda (la trampa); rendirse lo deja en blanco. */
  function fin(mensaje = ''): void {
    window.clearTimeout(temporizador);
    pasando = false;
    aviso.textContent = mensaje;
    const seg = t0 ? (performance.now() - t0) / 1000 : 0;
    const tiempo = seg < 120 ? unidad(Math.max(1, Math.round(seg)), 'second') : unidad(Math.round(seg / 60), 'minute');
    const partes = [hechas === 0 ? T.cero : hechas === 1 ? pinta(T.una, { tiempo }) : pinta(T.hechas, { n: nf.format(hechas), tiempo })];
    if (hechas > 0 && formulas > 0) {
      // A ese ritmo (segundos por fórmula corregida), todas las fórmulas distintas de la base.
      const total = (seg / hechas) * formulas;
      partes.push(pinta(T.ritmo, { total: total < 5400 ? unidad(Math.max(1, Math.round(total / 60)), 'minute') : unidad(Math.round(total / 3600), 'hour') }));
    }
    resumen.textContent = partes.join(' ');
    form.hidden = true;
    hoja.hidden = true;
    cuenta.hidden = true;
    final.hidden = false;
    otraP.hidden = false;
    raiz.classList.add('err--fin');
    otra.focus();
  }

  const trampaResuelta = (corrigio: boolean) => fin(corrigio ? T.cayo : T.acierto);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pasando) return;
    empieza();
    const r = R[i];
    const v = limpia(campo.value);
    if (r.bien === null) { trampaResuelta(v !== limpia(r.mal)); return; }
    if (v === r.bien) {
      hechas++;
      const filas = r.filas === 1 ? T.filasUna : pinta(T.filas, { n: nf.format(r.filas) });
      aviso.textContent = [T.bien, r.dicho, filas].filter(Boolean).join(' ');
      campo.removeAttribute('aria-invalid');
      hoja.classList.add('corregida');
      pasando = true;
      temporizador = window.setTimeout(() => {
        pasando = false;
        i++;
        if (i < R.length) { ronda(); anuncia(); campo.focus(); } else fin();
      }, reduce() ? 500 : 1300);
      return;
    }
    const k = primeraDiferencia(v, r.bien);
    aviso.textContent = pinta(T.casi, { desde: r.bien.slice(k, k + 10) || r.bien.slice(-8) });
    campo.setAttribute('aria-invalid', 'true');
    campo.classList.remove('mal');
    void campo.offsetWidth;
    campo.classList.add('mal');
  });
  campo.addEventListener('input', empieza);
  dejar.addEventListener('click', () => { empieza(); trampaResuelta(false); });
  rendirse.addEventListener('click', () => { empieza(); fin(); });
  otra.addEventListener('click', () => {
    i = 0; hechas = 0; t0 = 0;
    aviso.textContent = '';
    resumen.textContent = '';
    final.hidden = true;
    otraP.hidden = true;
    form.hidden = false;
    hoja.hidden = false;
    cuenta.hidden = false;
    raiz.classList.remove('err--fin');
    ronda();
    anuncia();
    campo.focus();
  });

  ronda();
}

document.querySelectorAll<HTMLElement>('[data-erratas]').forEach(iniciar);
