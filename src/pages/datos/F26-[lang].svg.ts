/**
 * F26 · la imagen descargable en SVG (`datos/F26-<lang>.svg`), con su cita al pie. La compone `viz/imagen-votaciones.ts`
 * con los mismos datos que la figura de la página. Dueño: grupo 3 (Sesiones).
 */
import type { APIRoute } from 'astro';
import { imagenVotaciones } from '../../viz/imagen-votaciones';
import { LANGS, type Lang } from '../../lib/idiomas';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = ({ params, site }) =>
  new Response(imagenVotaciones(params.lang as Lang, site), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
