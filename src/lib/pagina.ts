/**
 * Metadatos de una página desde su copy: `<prefijo>.meta.titulo` (para <title>; si falta, el H1 en texto plano) y
 * `<prefijo>.meta.descripcion` (≤ 155 caracteres; la auditoría lo vigila).
 */
import { plano, existe } from './i18n';
import type { Lang } from './idiomas';
import type { Contexto } from './cifras';

export function meta(lang: Lang, prefijo: string, ctx: Contexto = {}) {
  const titulo = existe(`${prefijo}.meta.titulo`) ? plano(lang, `${prefijo}.meta.titulo`, ctx) : plano(lang, `${prefijo}.titulo`, ctx);
  const descripcion = plano(lang, `${prefijo}.meta.descripcion`, ctx);
  return { titulo, descripcion };
}
