/**
 * Resolutor de marcadores `{{clave|formato}}`. NINGUNA cifra del sitio se teclea: todas pasan por aquí, salen de
 * `src/data/cifras.json` (que escribe el exportador) y se formatean UNA sola vez, en la lengua de la página.
 *
 * Forma de cada cifra (contrato de construcción, § Cifras):
 *   { "v": número|texto, "t": "n|pct|peso|fecha|texto|id|anio|ratio", "base": "V2|v3|proyecto|afin|dv|explorador|croquis",
 *     "clave": "<letra de fuente>", "f": "<fórmula legible>", "d": "AAAA-MM-DD", "dec"?: decimales }
 *   · `pct` se guarda como PROPORCIÓN (0,0083 → «0,83 %»); `dec` fija los decimales (2 por omisión).
 *   · `peso` se guarda en BYTES y se pinta en la unidad de Harvard Dataverse (bytes / 1.024², rotulada MB).
 *   · `fecha`, como AAAA-MM-DD.
 *   · `id` (ids de fila, números de sesión) y `anio` NO se agrupan nunca (D-16); `n` se agrupa siempre («1.460»).
 *
 * Toda cifra se emite como `<data class="cifra" value data-k data-base>texto</data>`; un valor de texto, como
 * `<span class="dato-texto" data-k data-base>`. Así `scripts/audit-cifras.mjs` comprueba sobre `dist/` que ningún
 * número llega al lector sin procedencia y que toda cifra dice su base.
 *
 * Formatos admitidos tras la barra (src/data/formatos.json › formatos): `n` · `id` · `anio` · `letra` (0–30, femenino en
 * español) · `pct` (los decimales de la cifra) · `pct0`–`pct3` · `peso` (los de la cifra) · `peso0`–`peso2` · `fecha` y
 * `fecha_larga` · `fecha_corta` (1-X-1931) · `mes` (octubre de 1931) · `texto` · `peso_dec`, `peso_dec0`–`peso_dec2` (peso en
 * unidades decimales: «112 MB»). Los casos de `formatos.json › pruebas`
 * se reproducen carácter a carácter (scripts/check-formatos.mjs).
 */
import { dato } from './datos';
import { PENDIENTES_DEL_INVESTIGADOR } from '../config/enlaces';
import type { Lang } from './idiomas';
import { formatea, tipo, agrupado, sinAgrupar, porcentaje, peso, pesoDecimal, fechaLarga, fechaCorta, mesLargo, type Tipo } from './formato';

export type { Tipo };
export type Base = 'V2' | 'v3' | 'proyecto' | 'afin' | 'dv' | 'explorador' | 'croquis';
export const BASES: Base[] = ['V2', 'v3', 'proyecto', 'afin', 'dv', 'explorador', 'croquis'];
/**
 * Las dos ediciones de la base (la depositada y la del explorador). Siguen en `data-base` y en procedencia.csv, pero el
 * sitio no las nombra: presenta la base corregida (24-09-2026, docs/REDISENO_23-09.md).
 */
export const esEdicion = (b: string) => b === 'V2' || b === 'v3';
export interface Cifra { v: unknown; t: Tipo; base?: Base; clave?: string; f?: string; d?: string; dec?: number; n?: number; den?: number; alias_de?: string }
export interface Contexto {
  /** Sustituciones de comodines en la CLAVE: `{{etapa.<etapa>.sesiones}}` con `{ sub: { etapa: 'I' } }`. */
  sub?: Record<string, string>;
  /** Valores ya resueltos por la plantilla: `{{n}}` con `{ vars: { n: '<data …>' } }`. Se insertan TAL CUAL (HTML). */
  vars?: Record<string, string>;
}

const ESTRICTO = process.env.STRICT === '1';
const CIFRAS = (dato<Record<string, Cifra>>('cifras') ?? {}) as Record<string, Cifra>;

const avisadas = new Set<string>();
/** Marcadores que no se pudieron resolver en esta compilación (los pinta la vista previa; en STRICT, fallan). */
export const sinResolver = new Set<string>();

/** La cifra cruda (para componentes que dibujan con ella). `null` si el exportador aún no la ha escrito. */
export const cifra = (clave: string): Cifra | null => CIFRAS[clave] ?? null;
/** Todas las claves de una familia: `clavesCifra('etapa.I.')`. */
export const clavesCifra = (prefijo: string) => Object.keys(CIFRAS).filter((k) => k.startsWith(prefijo)).sort();

export { formatea };

export const escapa = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Marca de lo que falta, para la vista previa. En publicación, quien llama ya ha fallado antes. */
export const marcaPendiente = (clave: string, tipoFalta: 'dato' | 'copy' | 'investigador' = 'dato') =>
  `<mark class="pendiente" data-pendiente="${escapa(tipoFalta)}" title="${escapa(tipoFalta === 'copy' ? 'texto pendiente del copy' : tipoFalta === 'investigador' ? 'pendiente del investigador' : 'dato pendiente del exportador')}">⟦${escapa(clave)}⟧</mark>`;

/** Envoltorio auditable de una cifra ya formateada. */
function envuelve(c: Cifra, clave: string, texto: string, fmt: string): string {
  const base = c.base ?? '';
  const t = tipo(c.t);
  if (t === 'texto' || t === 'i18n') return `<span class="dato-texto" data-k="${escapa(clave)}" data-base="${escapa(base)}">${escapa(texto)}</span>`;
  const enLetra = fmt === 'letra' && !/\d/.test(texto) ? ' data-fmt="letra"' : '';
  const valor = typeof c.v === 'object' ? '' : String(c.v);
  return `<data class="cifra"${enLetra} value="${escapa(valor)}" data-k="${escapa(clave)}" data-base="${escapa(base)}">${escapa(texto)}</data>`;
}

/** Resuelve UN marcador (el contenido entre llaves dobles) y devuelve HTML. */
export function resuelve(marcador: string, lang: Lang, ctx: Contexto = {}): string {
  let [clave, fmt = ''] = marcador.split('|').map((s) => s.trim());
  clave = clave.replace(/^NUEVO:/, '');
  if (ctx.sub) clave = clave.replace(/<(\w+)>/g, (todo, k: string) => ctx.sub?.[k] ?? todo);
  if (ctx.vars && clave in ctx.vars) return ctx.vars[clave];
  // Quien pasa `vars` está rellenando una plantilla: un hueco de una sola palabra que no llega en `vars` y se llama como
  // una cifra de cifras.json (`{{sesiones}}` = las del mes, no las 755) se pintaría con la cifra homónima sin avisar
  // (petición comun-inicio A.6). Avisa una vez por clave: puede ser a propósito (una frase que cita las 755 sesiones).
  if (ctx.vars && /^[a-z_]+$/.test(clave) && CIFRAS[clave] && !avisadas.has(clave)) {
    avisadas.add(clave);
    console.warn(`⚠ {{${clave}}} se resuelve con la cifra homónima de cifras.json, pero la plantilla pasó variables sin «${clave}»: si es un hueco de la plantilla, páselo en \`vars\`.`);
  }

  const c = CIFRAS[clave];
  if (c) {
    if (!c.base) {
      if (ESTRICTO) throw new Error(`La cifra «${clave}» no trae «base» en src/data/cifras.json: toda cifra dice su base (contrato § Cifras).`);
    }
    return envuelve(c, clave, formatea(c, lang, fmt), fmt);
  }
  // Lo que da el investigador: texto, salvo una FECHA, que lleva su envoltorio como toda cifra.
  if (clave in PENDIENTES_DEL_INVESTIGADOR) {
    const dado = PENDIENTES_DEL_INVESTIGADOR[clave];
    // Un texto del investigador (la edición de las páginas, el contacto) lleva también su envoltorio: la auditoría ve
    // de dónde sale y no lo toma por un número tecleado (petición comun-inicio A.5).
    if (dado) return /^\d{4}-\d{2}-\d{2}$/.test(dado)
      ? envuelve({ v: dado, t: 'fecha', base: 'proyecto' }, clave, formatea({ v: dado, t: 'fecha' }, lang, fmt), fmt)
      : envuelve({ v: dado, t: 'texto', base: 'proyecto' }, clave, dado, fmt);
    sinResolver.add(clave);
    if (ESTRICTO) throw new Error(`Pendiente del investigador sin resolver: {{${marcador}}} (src/config/enlaces.ts).`);
    return marcaPendiente(clave, 'investigador');
  }
  sinResolver.add(clave);
  if (ESTRICTO) throw new Error(`Marcador sin resolver: {{${marcador}}}. Falta en src/data/cifras.json (exportador/exportar.py).`);
  return marcaPendiente(clave, 'dato');
}

/**
 * Formato suelto para componentes que pintan cifras fuera del copy (ejes, tablas, leyendas, notas emergentes).
 * `fmt.dato()` devuelve la cifra con su envoltorio auditable; los demás, solo el texto (para `data-v-*`).
 */
export const fmt = {
  n: (x: number, lang: Lang) => agrupado(x, lang),
  id: (x: number, lang: Lang) => sinAgrupar(x, lang),
  pct: (x: number, lang: Lang, dec = 2) => porcentaje(x, lang, dec),
  peso: (b: number, lang: Lang, dec = 1) => peso(b, lang, dec),
  pesoDecimal: (b: number, lang: Lang, dec = 0) => pesoDecimal(b, lang, dec),
  fechaLarga, fechaCorta, mesLargo,
  /** Cifra de componente: `fmt.dato(1843, '1.843', 'mes.1933-02.filas', 'V2')`. */
  dato: (v: number | string, texto: string, clave: string, base: Base | string) =>
    `<data class="cifra" value="${escapa(String(v))}" data-k="${escapa(clave)}" data-base="${escapa(String(base))}">${escapa(texto)}</data>`,
  /** Una cifra de `cifras.json` por su clave, formateada y envuelta (o la marca de pendiente). */
  clave: (clave: string, lang: Lang, formato = '') => resuelve(formato ? `${clave}|${formato}` : clave, lang),
};

/**
 * Un hueco que solo puede llenar el investigador (D-20, D-21…): en la vista previa, marcado con `data-pendiente`; en
 * publicación, la compilación FALLA.
 */
export function faltaDelInvestigador(codigo: string, que = ''): string {
  if (ESTRICTO) throw new Error(`Pendiente del investigador: ${codigo}${que ? ` (${que})` : ''}. Véase src/config/enlaces.ts › PENDIENTES_DEL_INVESTIGADOR.`);
  return marcaPendiente(codigo, 'investigador');
}
