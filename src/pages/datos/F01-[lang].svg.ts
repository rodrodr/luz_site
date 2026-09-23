/**
 * F01 · la imagen descargable en SVG (`datos/F01-<lang>.svg`): el calendario completo, con su leyenda y su cita al pie.
 * La construye `viz/imagen-calendario.ts` con la misma geometría que la figura de Las Cortes.
 */
import type { APIRoute } from 'astro';
import { imagenCalendario } from '../../viz/imagen-calendario';
import { LANGS, type Lang } from '../../lib/idiomas';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = ({ params, site }) =>
  new Response(imagenCalendario(params.lang as Lang, site), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
