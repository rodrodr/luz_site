export {};
/**
 * F17 · comportamiento propio (SOLO AÑADE: sin este script, cada carril es un botón que abre su ficha con `popover`, y
 * todo se alcanza con Tab). Con él:
 *  · los 31 carriles son UNA parada de teclado (DESIGN.md § Sistema de figuras: una parada por grupo); ← → los recorren
 *    con su nota (la isla genérica, `data-recorre`) e Intro o Espacio abren la ficha del carril activo;
 *  · al abrirse una ficha se cierra la nota emergente, el foco va a su título y, al cerrarse, vuelve a los carriles.
 */
type Isla = { oculta?: () => void };
const isla = () => (window as unknown as { LyTFiguras?: Isla }).LyTFiguras;

function enlaza(fig: HTMLElement): void {
  if (fig.hasAttribute('data-f17')) return;
  fig.setAttribute('data-f17', '');
  const lista = fig.querySelector<HTMLElement>('.f17-carriles');
  if (!lista) return;
  const teclado = fig.querySelector<HTMLElement>('.fig-teclado[id]');
  lista.tabIndex = 0;
  lista.setAttribute('data-recorre', '');
  if (teclado) lista.setAttribute('aria-describedby', teclado.id);
  fig.querySelectorAll<HTMLButtonElement>('.f17-boton').forEach((b) => { b.tabIndex = -1; });
  let volver: HTMLElement | null = null;

  const abre = (boton: HTMLElement) => {
    const ficha = document.getElementById(boton.getAttribute('popovertarget') ?? '');
    if (!ficha || !('showPopover' in ficha)) return;
    volver = lista;
    (ficha as HTMLElement & { showPopover: () => void }).showPopover();
    ficha.querySelector<HTMLElement>('h4')?.focus();
  };
  lista.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target !== lista) return;
    const activo = lista.querySelector<HTMLElement>('.f17-boton.fig-activa');
    if (!activo) return;
    e.preventDefault();
    abre(activo);
  });
  // Con el ratón o el dedo, el botón abre su ficha solo (popovertarget); aquí se recuerda a dónde volver.
  lista.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('.f17-boton');
    if (b) volver = lista;
  });
  fig.querySelectorAll<HTMLElement>('.f17-ficha').forEach((ficha) => {
    ficha.addEventListener('toggle', (ev) => {
      const estado = (ev as Event & { newState?: string }).newState;
      if (estado === 'open') {
        isla()?.oculta?.();
        ficha.querySelector<HTMLElement>('h4')?.focus({ preventScroll: true });
      } else if (volver) {
        volver.focus({ preventScroll: true });
        volver = null;
      }
    });
  });
}

document.querySelectorAll<HTMLElement>('[data-figura="F17"]').forEach(enlaza);
