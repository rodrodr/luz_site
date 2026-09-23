/**
 * Utilidades de movimiento que necesitan saber si algo se ve (DESIGN.md § Movimiento y medios expresivos;
 * styles/movimiento.css). SOLO AÑADEN: sin JavaScript, sin IntersectionObserver o con `prefers-reduced-motion: reduce`,
 * todo está en su estado final desde el primer pintado. Nada se mueve en bucle y nada se mueve si ya se veía al cargar
 * (un contenido que el lector ya está mirando no se esconde para volver a entrar).
 *
 *  · `alVer(el, hecho, umbral)`: llama a `hecho()` una vez, cuando `el` entra en pantalla; devuelve cómo desengancharlo.
 *  · `.escalona[data-escalona]`: si empieza por debajo del pliegue, espera (`.espera`) y, al verse al 25 %, sus hijos
 *    llegan en orden (`.entra-fig`, retardo `--n` × `--paso-escalon`, con tope de 1,4 s). Cada hijo lleva `--n` en el
 *    HTML (su índice) o lo toma de `sibling-index()` donde exista.
 * Uso: `<script>import '../scripts/movimiento.ts';</script>` en el componente que lo necesite.
 */
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function alVer(el: Element, hecho: () => void, umbral = 0.25): () => void {
  if (!('IntersectionObserver' in window)) { hecho(); return () => {}; }
  const io = new IntersectionObserver((vistos) => {
    if (vistos.some((v) => v.isIntersecting)) { io.disconnect(); hecho(); }
  }, { threshold: umbral });
  io.observe(el);
  return () => io.disconnect();
}

export function escalona(raiz: ParentNode = document): void {
  if (reducido()) return;
  raiz.querySelectorAll<HTMLElement>('.escalona[data-escalona]:not([data-escalona-listo])').forEach((el) => {
    el.setAttribute('data-escalona-listo', '');
    if (el.getBoundingClientRect().top <= window.innerHeight) return; // ya se ve: se queda quieto
    el.classList.add('espera');
    alVer(el, () => { el.classList.add('entra-fig'); el.classList.remove('espera'); });
  });
}

escalona();
