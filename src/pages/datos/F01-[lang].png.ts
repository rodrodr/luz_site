/**
 * F01 · la imagen descargable en PNG (`datos/F01-<lang>.png`): el mismo SVG, rasterizado a doble densidad con sharp en la
 * compilación (las fuentes, las del sistema que compila: EB Garamond si está instalada; si no, Georgia).
 */
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { imagenCalendario } from '../../viz/imagen-calendario';
import { LANGS, type Lang } from '../../lib/idiomas';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const svg = imagenCalendario(params.lang as Lang, site);
  const png = await sharp(Buffer.from(svg), { density: 144 }).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
