/** Las rutas del sitio para las pruebas: las mismas que genera Astro (src/lib/rutas.ts › todasLasRutas), sin la base. */
export const LANGS = ['es', 'en'] as const;
const ETAPAS = ['1931', '1933', '1936', 'guerra', 'mexico'];
const PUERTAS = ['sufragio-1931', 'cuestion-religiosa-1931', 'estatuto-1932', 'casas-viejas-1933', 'pistola-1934', 'antesala-1936', 'figueres-1939', 'mexico-1945'];
export const RUTAS = [
  '', 'cortes/', ...ETAPAS.map((e) => `cortes/${e}/`), 'cortes/sesiones/', ...PUERTAS.map((p) => `cortes/sesiones/${p}/`),
  'diario/', 'metodo/', 'datos/', 'datos/versiones/', 'explorador/', 'afinidades/',
];
/**
 * Presupuestos de `peso.spec` (plan § Cómo se evita el amontonamiento, regla 6): palabras de copy en <main> y KB del HTML
 * comprimido con gzip (decisión 1 del investigador, 23-09-2026). Español congelado (23-09-2026, CHANGELOG.md): los topes
 * del plan eran una estimación anterior al copy; nueve páginas revisadas y pulidas los pasaban (de 1.500 a 1.554 en la
 * ficha I, de 800 a 1.245 en la de la guerra). Donde se pasaban, el tope es ahora el recuento congelado redondeado a la
 * cincuentena de arriba, para que el copy no crezca; los demás siguen como en el plan.
 */
export function presupuesto(ruta: string): { palabras: number; kb: number } {
  if (ruta === '') return { palabras: 700, kb: 300 };
  if (ruta === 'cortes/') return { palabras: 800, kb: 250 };
  const ficha: Record<string, number> = { 'cortes/1931/': 1600, 'cortes/1933/': 1500, 'cortes/1936/': 1500, 'cortes/guerra/': 1250, 'cortes/mexico/': 1150 };
  if (ruta in ficha) return { palabras: ficha[ruta], kb: 200 };
  if (ruta.startsWith('cortes/sesiones/') && ruta !== 'cortes/sesiones/') return { palabras: 550, kb: 150 };
  const resto: Record<string, number> = { 'cortes/sesiones/': 800, 'diario/': 2000, 'metodo/': 2950, 'datos/': 3000, 'datos/versiones/': 1400, 'explorador/': 1750, 'afinidades/': 1500 };
  return { palabras: resto[ruta] ?? 2000, kb: ruta === 'afinidades/' ? 250 : 200 };
}
