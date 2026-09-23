/** Las dos lenguas del sitio. El español se congela antes de traducir (Puerta 3). */
export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/**
 * Configuración regional para Intl: números, porcentajes y fechas se formatean UNA vez, en `cifras.ts`.
 * El inglés usa la convención británica (día, mes, año), la de la historiografía europea: «1 October 1931».
 */
export const LOCALE: Record<Lang, string> = { es: 'es-ES', en: 'en-GB' };
/** Valor del atributo `lang` y de `hreflang`. */
export const HTML_LANG: Record<Lang, string> = { es: 'es', en: 'en' };
/** `og:locale`. */
export const OG_LOCALE: Record<Lang, string> = { es: 'es_ES', en: 'en_GB' };

export const esLang = (x: string | undefined): x is Lang => LANGS.includes(x as Lang);

/** Rutas estáticas para las páginas `[lang]`. */
export const rutasPorIdioma = () => LANGS.map((lang) => ({ params: { lang } }));
