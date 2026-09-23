/**
 * Momentos pesados (DESIGN.md § Movimiento y medios expresivos): «De la tinta a la fila» (`<lyt-diario-fila>`) y
 * «Las redes se reordenan» (`<lyt-red>`). Cada uno es un *custom element* cuyo motor se importa SOLO cuando el elemento
 * entra en pantalla, se pausa fuera de ella y con `visibilitychange`, y no cuenta en los 35 KB de la isla: su peso va
 * aparte en `tests/peso.spec.ts`. La página está completa sin él: el elemento envuelve la versión estática (póster SVG,
 * tabla, lista) y el motor la sustituye o la anima encima.
 *
 * Uso (en el `<script>` del componente de su dueño):
 *   import { diferir } from '../scripts/pesado';
 *   diferir('lyt-red', () => import('./fig-red'));   // fig-red.ts exporta `monta(el) → { pausa(), sigue(), desmonta() }`
 */
export interface Motor { pausa?: () => void; sigue?: () => void; desmonta?: () => void }
type Cargador = () => Promise<{ monta: (el: HTMLElement) => Motor | Promise<Motor> }>;

export function diferir(nombre: string, cargar: Cargador): void {
  if (customElements.get(nombre)) return;
  customElements.define(nombre, class extends HTMLElement {
    #motor: Motor | null = null;
    #io: IntersectionObserver | null = null;
    #visible = () => (document.hidden ? this.#motor?.pausa?.() : this.#motor?.sigue?.());
    connectedCallback() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches && this.hasAttribute('data-solo-movimiento')) return;
      this.#io = new IntersectionObserver(async (vistos) => {
        const dentro = vistos.some((v) => v.isIntersecting);
        if (dentro && !this.#motor) {
          try { this.#motor = await (await cargar()).monta(this); } catch { this.setAttribute('data-error', ''); return; }
        }
        if (dentro) this.#motor?.sigue?.(); else this.#motor?.pausa?.();
      }, { rootMargin: '200px 0px' });
      this.#io.observe(this);
      document.addEventListener('visibilitychange', this.#visible);
    }
    disconnectedCallback() {
      this.#io?.disconnect();
      document.removeEventListener('visibilitychange', this.#visible);
      this.#motor?.desmonta?.();
      this.#motor = null;
    }
  });
}
