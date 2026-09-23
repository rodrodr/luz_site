/**
 * Textos del sitio. Los diccionarios `src/i18n/<lang>.json` se GENERAN desde `docs/copy_<lang>/*.md`
 * (`npm run i18n`) y no se editan a mano.
 *
 * PINTA LO QUE HAYA. Mientras el copy se escribe, una clave que aún no existe se pinta como `⟦clave⟧` (vista previa)
 * y la página compila igual; en publicación (STRICT=1) la compilación FALLA. Una clave que existe en español y no en
 * inglés se pinta en español, marcada con `data-sin-traducir`, y también falla en publicación.
 *
 * El arreglo del ESCAPE (plan § Arquitectura): ParlaIbero escapaba el texto entero y resolvía después los marcadores,
 * así que `<iso>` llegaba al resolutor como `&lt;iso&gt;`. Aquí los marcadores se apartan ANTES sobre el texto crudo,
 * se escapa y se marca solo lo de fuera, y el HTML de cada cifra se devuelve a su sitio al final.
 */
import { escapa, resuelve, marcaPendiente, cifra, formatea, type Contexto } from './cifras';
import type { Lang } from './idiomas';

const modulos = import.meta.glob<{ default: Record<string, string> }>('../i18n/*.json', { eager: true });
const DIC: Partial<Record<Lang, Record<string, string>>> = {};
for (const [ruta, mod] of Object.entries(modulos)) DIC[ruta.match(/(\w+)\.json$/)![1] as Lang] = mod.default;

const ESTRICTO = process.env.STRICT === '1';
/** Claves pedidas que no existen en la lengua (en vista previa caen al español, marcadas). */
export const sinTraducir = new Set<string>();
/** Claves pedidas que aún no existen en el copy español (se pintan como ⟦clave⟧). */
export const sinCopy = new Set<string>();

function crudo(lang: Lang, clave: string): { texto: string; prestado: boolean } | null {
  const propio = DIC[lang]?.[clave];
  if (propio !== undefined) return { texto: propio, prestado: false };
  const es = DIC.es?.[clave];
  if (es === undefined) {
    sinCopy.add(clave);
    if (ESTRICTO) throw new Error(`La clave «${clave}» no existe en el copy (docs/copy_es/*.md → npm run i18n).`);
    return null;
  }
  sinTraducir.add(`${lang}:${clave}`);
  if (ESTRICTO) throw new Error(`Falta «${clave}» en ${lang} (docs/copy_${lang}/*.md).`);
  return { texto: es, prestado: true };
}

/** Marcas mínimas del copy: **negrita**, *cursiva*, `código`. Recibe texto YA escapado y sin marcadores. */
function marcas(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*(?![*\w])/g, '$1<em>$2</em>');
}

// Los marcadores se apartan con caracteres del área privada de Unicode: sobreviven al escape y a las marcas.
const ABRE = '', CIERRA = '';
const RE_HUECO = new RegExp(`${ABRE}(\\d+)${CIERRA}`, 'g');

/** Texto crudo → HTML en línea: marcadores resueltos sobre el texto crudo, escape y marcas solo por fuera. */
function enLinea(crudoTexto: string, lang: Lang, ctx: Contexto): string {
  const marcadores: string[] = [];
  const apartado = crudoTexto.replace(/\{\{([^{}]+)\}\}/g, (_todo, m: string) => `${ABRE}${marcadores.push(m) - 1}${CIERRA}`);
  const html = marcas(escapa(apartado));
  return html.replace(RE_HUECO, (_todo, i: string, pos: number) => {
    const m = marcadores[Number(i)];
    let out = resuelve(m, lang, ctx);
    // `|letra` a principio de frase se escribe con mayúscula inicial. Tras dos puntos, no.
    const antes = html.slice(0, pos).replace(/(<[^>]+>|\s)+$/g, '');
    if (/\|\s*letra/.test(m) && (antes === '' || /[.!?¿¡]$/.test(antes))) out = out.replace(/(>|^)(\p{L})/u, (_x, a: string, b: string) => a + b.toUpperCase());
    return out;
  });
}

/** Texto EN LÍNEA de una clave, como HTML. Úsese con `set:html`. Si la clave no existe: `⟦clave⟧` (vista previa). */
export function t(lang: Lang, clave: string, ctx: Contexto = {}): string {
  const c = crudo(lang, clave);
  if (!c) return marcaPendiente(clave, 'copy');
  const html = enLinea(c.texto, lang, ctx).replace(/\n/g, ' ');
  return c.prestado ? `<span lang="es" data-sin-traducir>${html}</span>` : html;
}

/**
 * Iconos dibujados en lugar de glifos (DESIGN.md): la «↗» final de un rótulo (se abre en otra pestaña) y la «→» final de
 * un enlace pasan a ser el icono del sprite (`Sprite.astro`). Solo al FINAL de un rótulo: una «→» en mitad de un texto
 * («14-VII-1931 → 3-X-1933») es tipografía, no icono.
 */
const ICONO = (id: string) => `<svg class="icono" aria-hidden="true" focusable="false"><use href="#${id}"></use></svg>`;
export const conIcono = (etiqueta: string) =>
  etiqueta.replace(/\s*↗\s*((?:<\/span>)?)\s*$/, `\u00a0${ICONO('i-ext')}$1`).replace(/\s*→\s*((?:<\/span>)?)\s*$/, `\u00a0${ICONO('i-flecha')}$1`);

/** Texto plano (para `<title>`, `alt`, `aria-label`, metadatos): sin etiquetas ni corchetes. */
export function plano(lang: Lang, clave: string, ctx: Contexto = {}): string {
  return aPlano(t(lang, clave, ctx));
}
export const aPlano = (html: string) =>
  html.replace(/<[^>]+>/g, '').replace(/\s*[↗→]\s*$/, '').replace(/[\[\]]/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

/**
 * Rótulo de un botón o enlace: el copy lo escribe entre corchetes, `[Descargar los datos]`. Se quitan los corchetes,
 * también por dentro del envoltorio de «sin traducir».
 */
export const rotulo = (lang: Lang, clave: string, ctx: Contexto = {}) =>
  conIcono(t(lang, clave, ctx).replace(/^(\s*<span [^>]*data-sin-traducir>)?\s*\[/, '$1').replace(/\]\s*(<\/span>)?\s*$/, '$1'));

/**
 * Texto con enlaces. El copy marca cada enlace entre corchetes; aquí se le da destino POR ORDEN.
 * `tEnlaces('es', 'inicio.portada.llamada', [ENLACES.explorador, url('es', 'datos#empezar')])`
 * Un corchete sin destino no se queda como texto muerto: en vista previa se marca; en publicación, falla.
 */
export function tEnlaces(lang: Lang, clave: string, destinos: (string | null | undefined)[], ctx: Contexto = {}, clase = ''): string {
  let i = 0;
  // Solo los corchetes que el COPY escribe: los de una marca ⟦…⟧ o de una cifra no son enlaces.
  return t(lang, clave, ctx).replace(/(?<!⟦)\[([^\]⟦⟧]+)\](?!⟧)/g, (_todo, etiqueta: string) => {
    const href = destinos[i++];
    if (!href) {
      if (ESTRICTO) throw new Error(`«${clave}» (${lang}): el enlace [${etiqueta}] no tiene destino.`);
      return `<mark class="pendiente" data-pendiente="destino">${etiqueta}</mark>`;
    }
    const externo = /^https?:/.test(href);
    return `<a href="${escapa(href)}"${clase ? ` class="${clase}"` : ''}${externo ? ' rel="noopener external"' : ''}>${conIcono(etiqueta)}</a>`;
  });
}

/** Parte un texto por líneas en blanco, SALVO dentro de un bloque de código. */
function partesDe(texto: string): string[] {
  const out: string[] = [];
  let buf: string[] = [], enCodigo = false;
  const cierra = () => { if (buf.length) out.push(buf.join('\n')); buf = []; };
  for (const l of texto.split('\n')) {
    if (/^\s*```/.test(l)) {
      if (!enCodigo) cierra();
      buf.push(l.trimStart());
      enCodigo = !enCodigo;
      if (!enCodigo) cierra();
    } else if (!enCodigo && l.trim() === '') cierra();
    else buf.push(l);
  }
  cierra();
  return out;
}

/**
 * Texto EN BLOQUES: párrafos, listas (`- ` y `1. `), apartados `### ` y bloques de código. Para las unidades largas
 * (fichas, Método, Datos). Si la clave no existe, un párrafo con `⟦clave⟧` (vista previa).
 */
export function tBloques(lang: Lang, clave: string, ctx: Contexto = {}): string {
  const c = crudo(lang, clave);
  if (!c) return `<p>${marcaPendiente(clave, 'copy')}</p>`;
  const html = partesDe(c.texto).map((parte) => {
    const cod = parte.match(/^```(\w*)\n([\s\S]*?)\n?```$/);
    // tabindex: el bloque desplaza en horizontal y quien usa solo el teclado tiene que poder llegar a él (WCAG 2.1.1).
    if (cod) return `<pre tabindex="0"><code class="language-${cod[1] || 'text'}">${escapa(cod[2])}</code></pre>`;
    const lineas = parte.split('\n');
    const h3 = parte.match(/^###\s+(.+)$/);
    if (h3 && lineas.length === 1) return `<h3>${enLinea(h3[1], lang, ctx)}</h3>`;
    if (lineas.every((l) => /^\s*[-*] /.test(l)))
      return '<ul>' + lineas.map((l) => `<li>${enLinea(l.replace(/^\s*[-*] /, ''), lang, ctx)}</li>`).join('') + '</ul>';
    if (lineas.every((l) => /^\s*\d+\. /.test(l)))
      return '<ol>' + lineas.map((l) => `<li>${enLinea(l.replace(/^\s*\d+\. /, ''), lang, ctx)}</li>`).join('') + '</ol>';
    return `<p>${enLinea(parte, lang, ctx).replace(/\n/g, ' ')}</p>`;
  }).join('\n');
  return c.prestado ? `<div lang="es" data-sin-traducir>${html}</div>` : html;
}

/** ¿Existe la clave en el copy español? (para textos opcionales). */
export const existe = (clave: string) => DIC.es?.[clave] !== undefined;
/**
 * Todas las claves de una familia: `claves('cortes.1931.contexto.')`. Por omisión, en orden natural; con `enOrden`,
 * en el orden en que las escribió el copy (el que conserva `copy2i18n.py`).
 */
export const claves = (prefijo: string, enOrden = false) => {
  const ks = Object.keys(DIC.es ?? {}).filter((k) => k.startsWith(prefijo));
  return enOrden ? ks : ks.sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
};
/** ¿Existe la clave en ESA lengua (sin prestarla del español)? */
export const existeEn = (lang: Lang, clave: string) => DIC[lang]?.[clave] !== undefined;
/** Los números de apartado de una familia: `apartados('metodo.')` → ['01', '02', …] si existen `metodo.01.*`… */
export const apartados = (prefijo: string) =>
  [...new Set(claves(prefijo).map((k) => k.slice(prefijo.length).split('.')[0]).filter((x) => /^\d+$/.test(x)))].sort((a, b) => Number(a) - Number(b));
/** ¿Hay copy español cargado? (en un proyecto recién creado, aún no). */
export const hayCopy = () => Object.keys(DIC.es ?? {}).length > 0;
/** ¿Tiene la lengua su propio diccionario? Sin él (el inglés, hasta su fase), sus páginas sirven el español prestado. */
export const hayLengua = (lang: Lang) => Object.keys(DIC[lang] ?? {}).length > 0;

/**
 * Plantilla de una NOTA EMERGENTE, en texto plano, para `data-plantilla` (la rellena la isla con los `data-v-*` de cada
 * marca). En el copy, sus huecos son `{{nombre}}`: los que son cifras de `cifras.json` se resuelven aquí (con su
 * formato); los demás quedan como `{nombre}`, que es lo que entiende la isla. Sin marcas de negrita ni de código.
 * `huecos`: los nombres que son de la figura aunque coincidan con una cifra (`['sesiones', 'mes']`).
 */
export function plantillaNota(lang: Lang, clave: string, huecos: string[] = []): string {
  const c = crudo(lang, clave);
  if (!c) return `⟦${clave}⟧`;
  return c.texto
    .replace(/\{\{([^{}]+)\}\}/g, (_t, m: string) => {
      const [k, fmt = ''] = m.split('|').map((x) => x.trim());
      // Un hueco que la figura declara (`{{sesiones}}` = las del mes) nunca se toma por la cifra homónima de
      // cifras.json (755): sin esa declaración, la nota diría 755 en cada mes sin avisar (petición comun-inicio A.6).
      if (huecos.includes(k)) return `{${k}}`;
      const x = cifra(k);
      if (x && !fmt && /^[a-z_]+$/.test(k) && !ESTRICTO) console.warn(`plantillaNota(${clave}): «{{${k}}}» se resuelve con la cifra homónima de cifras.json; si es un hueco de la figura, declárelo en \`huecos\`.`);
      return x ? formatea(x, lang, fmt) : `{${k}}`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ').trim();
}
