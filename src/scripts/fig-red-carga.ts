export {};
/**
 * F21 · carga del motor de las redes (`<lyt-red>`). La figura está entera sin él (póster por legislatura, leyenda,
 * tabla). En pantallas anchas con puntero fino, el motor (sigma.js + graphology, en su propio trozo) se importa cuando
 * la figura se acerca a la pantalla; en las estrechas o táctiles, al pulsar [Cargar la figura]: ahorra la descarga a quien
 * solo quería leer (plan § F21: «bajo demanda»). Se pausa sin coste: sigma solo pinta cuando algo cambia.
 */
type Motor = { desmonta?: () => void };

class LytRed extends HTMLElement {
  #motor: Motor | null = null;
  #io: IntersectionObserver | null = null;
  #cargando = false;

  connectedCallback(): void {
    const boton = this.querySelector<HTMLButtonElement>('.f21-cargar');
    const bajoDemanda = matchMedia('(max-width: 47.99rem), (pointer: coarse)').matches;
    if (bajoDemanda && boton) {
      boton.hidden = false;
      boton.addEventListener('click', () => { boton.hidden = true; void this.#arranca(); }, { once: true });
      return;
    }
    this.#io = new IntersectionObserver((vistos) => {
      if (vistos.some((v) => v.isIntersecting)) { this.#io?.disconnect(); void this.#arranca(); }
    }, { rootMargin: '300px 0px' });
    this.#io.observe(this);
  }

  async #arranca(): Promise<void> {
    if (this.#cargando || this.#motor) return;
    this.#cargando = true;
    this.setAttribute('data-cargando', '');
    try {
      const { monta } = await import('./fig-red');
      this.#motor = await monta(this);
    } catch {
      this.setAttribute('data-error', '');
    } finally {
      this.removeAttribute('data-cargando');
      this.#cargando = false;
    }
  }

  disconnectedCallback(): void {
    this.#io?.disconnect();
    this.#motor?.desmonta?.();
    this.#motor = null;
  }
}

if (!customElements.get('lyt-red')) customElements.define('lyt-red', LytRed);
