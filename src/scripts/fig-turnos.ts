/**
 * F30 · diana por columna (DESIGN.md § Sistema de figuras; plan, anexo V5: excepción de las marcas densas). SOLO AÑADE:
 * sin este script, la figura se lee igual, la isla genérica ya muestra la nota al pasar por una barra y la tabla trae
 * todos los valores. Aquí, cada columna del panel es la diana de su barra: en una sesión de 395 filas, una barra mide
 * 1–2 px (menos de 1 px en el móvil) y no se puede apuntar. El puntero o el dedo en cualquier punto de la columna
 * enseña la nota de su barra, con la misma isla (`window.LyTFiguras.muestra`), así que la nota sigue siendo recorrible,
 * persistente y descartable con Esc (WCAG 1.4.13). Sin rAF ni temporizadores vivos; un escuchador por panel.
 */
type Isla = { muestra: (el: Element, anuncia?: boolean, pos?: { i: number; total: number }, porToque?: boolean) => void; oculta: () => void };

function enlaza(lienzo: HTMLElement): void {
  if (lienzo.hasAttribute('data-f30-listo')) return;
  lienzo.setAttribute('data-f30-listo', '');
  const barras = Array.from(lienzo.querySelectorAll<SVGRectElement>('rect[data-paso]'));
  const ancho = Number(lienzo.getAttribute('data-f30-n')) || barras.length;
  if (!barras.length) return;
  let reloj = 0;
  const isla = () => (window as unknown as { LyTFiguras?: Isla }).LyTFiguras;
  const svg = lienzo.querySelector('svg') ?? lienzo;
  const barraEn = (clientX: number): Element | null => {
    const r = svg.getBoundingClientRect(); // el lienzo deja a la derecha el canal de los rótulos: cuenta el dibujo
    const i = Math.floor(((clientX - r.left) / r.width) * ancho);
    return i >= 0 && i < barras.length ? barras[i] : null;
  };
  lienzo.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const b = barraEn(e.clientX);
    window.clearTimeout(reloj);
    if (!b) return;
    // La isla programa ocultar la nota (150 ms de gracia) cuando el puntero pasa de una barra al fondo de su columna;
    // `muestra` cancela ese plazo, así que se llama mientras el puntero siga en la columna.
    isla()?.muestra(b);
  });
  lienzo.addEventListener('pointerleave', () => {
    window.clearTimeout(reloj);
    // 150 ms de gracia: el puntero puede pasar a la nota sin que desaparezca.
    reloj = window.setTimeout(() => { if (!document.querySelector('.fig-tip:hover')) isla()?.oculta(); }, 150);
  });
  lienzo.addEventListener('click', (e) => {
    const tactil = (e as PointerEvent).pointerType === 'touch' || matchMedia('(hover: none)').matches;
    if (!tactil) return;
    const b = barraEn(e.clientX);
    if (b) isla()?.muestra(b, false, undefined, true);
  });
}

function arranca(): void {
  document.querySelectorAll<HTMLElement>('[data-f30-lienzo]').forEach(enlaza);
}
arranca();

export {}; // módulo: sus nombres no chocan con los de otros guiones
