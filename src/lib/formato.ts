/**
 * Formato de las cifras: UNA sola vez y en un módulo puro (sin Vite), para que `scripts/check-formatos.mjs` pueda
 * comprobar con Node los casos de `src/data/formatos.json › pruebas` carácter a carácter.
 */
export type Lang = 'es' | 'en';
export type Tipo = 'n' | 'pct' | 'peso' | 'fecha' | 'texto' | 'id' | 'anio' | 'ratio' | 'i18n' | 'int' | 'bytes' | 'date' | 'text' | 'year';
export interface CifraFmt { v: unknown; t: Tipo; dec?: number }
const LOCALE: Record<Lang, string> = { es: 'es-ES', en: 'en-GB' };

// ── formato ───────────────────────────────────────────────────────────────────────────────
const NBSP = ' ';
// En femenino en español («seis votaciones», «una sesión»), como `formatos.py › LETRA`.
const LETRA: Record<Lang, string[]> = {
  es: ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
    'veintiuna', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta'],
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
    'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty'],
};
const ROMANO = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export const agrupado = (x: number, lang: Lang, dec = 0) =>
  new Intl.NumberFormat(LOCALE[lang], { useGrouping: 'always' as unknown as boolean, minimumFractionDigits: dec, maximumFractionDigits: dec }).format(x);
export const sinAgrupar = (x: number, lang: Lang) => new Intl.NumberFormat(LOCALE[lang], { useGrouping: false, maximumFractionDigits: 0 }).format(x);
export const porcentaje = (x: number, lang: Lang, dec = 2) => {
  const pct = lang === 'es' ? NBSP + '%' : '%';
  // Una cuota que no es cero no se imprime «0,000 %» (se leería «nadie»): por debajo de la última cifra, «<0,001 %».
  const minimo = 10 ** -dec;
  if (x > 0 && 100 * x < minimo / 2) return '<' + agrupado(minimo, lang, dec) + pct;
  return agrupado(100 * x, lang, dec) + pct;
};
/** La unidad de Harvard Dataverse: bytes / 1.024², rotulada MB; KB por debajo de 1 MB y GB desde 1.024 MB. */
export function peso(bytes: number, lang: Lang, dec = 1): string {
  const mb = bytes / 1048576;
  if (mb < 1) return agrupado(bytes / 1024, lang, 1) + NBSP + 'KB';
  return mb >= 1024 ? agrupado(mb / 1024, lang, 1) + NBSP + 'GB' : agrupado(mb, lang, dec) + NBSP + 'MB';
}
/**
 * Peso en unidades DECIMALES (1 KB = 1.000 B, 1 MB = 1.000.000 B): la que da el navegador y la que entiende el lector
 * sin nota. Para «unos 112 MB comprimidos» (plan D-26 (a); REVISION_FASE1 P1-4): 111.733.652 B → «112 MB», no los
 * «107 MB» de la unidad de Dataverse, que chocaban con 107.551. Formatos `peso_dec` (los decimales de la cifra, 0 por
 * omisión) y `peso_dec0`–`peso_dec2`.
 */
export function pesoDecimal(bytes: number, lang: Lang, dec = 0): string {
  if (bytes < 1e6) return agrupado(bytes / 1e3, lang, dec) + NBSP + 'KB';
  return bytes >= 1e9 ? agrupado(bytes / 1e9, lang, Math.max(dec, 1)) + NBSP + 'GB' : agrupado(bytes / 1e6, lang, dec) + NBSP + 'MB';
}
/**
 * «Más de…» (rediseño del 23-09-2026): el número redondeado HACIA ABAJO a UNA cifra significativa, para que valga en
 * las dos ediciones (107.551 filas V2 y 121.700 v3 → «más de 100.000»). Desde el millón, en millones: 24.335.896 →
 * «20 millones» · «20 million» (y no «24 millones», cifra vetada por ser la de la ayuda del explorador). Formato
 * `redondo`; lo reproduce `exportador/formatos.py › redondo` carácter a carácter.
 */
export function redondo(x: number, lang: Lang): string {
  const v = Math.trunc(x);
  if (v <= 0) return agrupado(v, lang);
  const p = 10 ** (String(v).length - 1);
  const r = Math.floor(v / p) * p;
  if (r < 1e6) return agrupado(r, lang);
  const m = r / 1e6;
  const txt = Number.isInteger(m) ? agrupado(m, lang) : agrupado(m, lang, 1);
  return txt + NBSP + (lang === 'es' ? (m === 1 ? 'millón' : 'millones') : 'million');
}
const aFecha = (iso: string) => new Date(iso.slice(0, 10) + 'T00:00:00Z');
export const fechaLarga = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(aFecha(iso));
/** «1-X-1931»: la forma del registro de calendario, igual en las dos lenguas. */
export const fechaCorta = (iso: string) => { const [y, m, d] = iso.slice(0, 10).split('-'); return `${Number(d)}-${ROMANO[Number(m) - 1]}-${y}`; };
export const mesLargo = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(LOCALE[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(aFecha(iso.length === 7 ? iso + '-01' : iso));

/** Normaliza los tipos heredados de ParlaIbero a los de este contrato. */
export function tipo(t: Tipo): Tipo {
  return ({ int: 'n', bytes: 'peso', date: 'fecha', text: 'texto', year: 'anio' } as Record<string, Tipo>)[t] ?? t;
}

export function formatea(c: CifraFmt, lang: Lang, fmt = ''): string {
  const v = c.v as any;
  const t = tipo(c.t);
  if (fmt === 'letra' && typeof v === 'number' && Number.isInteger(v) && v >= 0 && v < LETRA[lang].length) return LETRA[lang][v];
  if (fmt === 'fecha_larga' || fmt === 'fecha') return fechaLarga(String(v), lang);
  if (fmt === 'fecha_corta') return fechaCorta(String(v));
  if (fmt === 'mes') return mesLargo(String(v), lang);
  if (fmt === 'anio') return t === 'fecha' ? String(v).slice(0, 4) : sinAgrupar(Number(v), lang);
  if (fmt === 'peso_dec') return pesoDecimal(Number(v), lang, c.dec ?? 0);
  if (/^peso_dec[0-2]$/.test(fmt)) return pesoDecimal(Number(v), lang, Number(fmt.slice(8)));
  if (fmt === 'peso') return peso(Number(v), lang, c.dec ?? 1);
  if (/^peso[0-2]$/.test(fmt)) return peso(Number(v), lang, Number(fmt.slice(4)));
  if (fmt === 'pct') return porcentaje(Number(v), lang, c.dec ?? 2);
  if (/^pct[0-3]$/.test(fmt)) return porcentaje(Number(v), lang, Number(fmt.slice(3)));
  if (fmt === 'redondo') return redondo(Number(v), lang);
  if (fmt === 'id') return sinAgrupar(Number(v), lang);
  if (fmt === 'n') return agrupado(Number(v), lang, Number.isInteger(Number(v)) ? 0 : (c.dec ?? 1));
  if (fmt === 'texto') return typeof v === 'object' && v ? String(v[lang] ?? v.es ?? '') : String(v);
  switch (t) {
    case 'n': return agrupado(Number(v), lang, Number.isInteger(Number(v)) ? 0 : (c.dec ?? 1));
    case 'id': case 'anio': return sinAgrupar(Number(v), lang);
    case 'pct': return porcentaje(Number(v), lang, c.dec ?? 2);
    case 'ratio': return agrupado(Number(v), lang, c.dec ?? 1);
    case 'peso': return peso(Number(v), lang, c.dec ?? 1);
    case 'fecha': return fechaLarga(String(v), lang);
    case 'i18n': return String(v?.[lang] ?? v?.es ?? '');
    case 'texto': return typeof v === 'object' && v ? String(v[lang] ?? v.es ?? '') : String(v);
    default: return String(v);
  }
}

