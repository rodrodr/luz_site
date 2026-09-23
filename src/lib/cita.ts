/**
 * Citas: del conjunto (THQCMI, CGOCUS), de una figura y de un pasaje del Diario.
 *
 * · La cita del CONJUNTO se copia TAL COMO LA DA Harvard Dataverse (plan § La escalera, regla 5): «V2» para THQCMI y
 *   «V1» para CGOCUS, rotulada «CGOCUS V1.1». Su texto sale de `src/data/cifras.json` (`dv.<conjunto>.cita`, base `dv`),
 *   y BibTeX y RIS se construyen desde `src/data/jsonld/<conjunto>.json` (el Dataset de schema.org que exporta Dataverse).
 * · La cita de una FIGURA dice su ancla, su base (con huella) y su fecha: `comun.cita.figura` con {titulo} {url} {base} {fecha}.
 * · La cita de un PASAJE: Diario, número, fecha y páginas (metadatos del proyecto, rotulados) más el id de la fila con su
 *   edición: `comun.cita.pasaje` con {diario} {numero} {fecha} {paginas} {id} {edicion}.
 * Si falta un dato, lo que falta se pinta como pendiente (vista previa) y falla en publicación.
 */
import { dato, sello } from './datos';
import { cifra, resuelve, escapa, marcaPendiente, type Base } from './cifras';
import { t } from './i18n';
import { figura, paginaDe } from './figuras';
import { url } from './rutas';
import type { Lang } from './idiomas';

const ESTRICTO = process.env.STRICT === '1';
export type Conjunto = 'thqcmi' | 'cgocus';

interface JsonLd {
  name?: string; identifier?: string | string[]; '@id'?: string; datePublished?: string; version?: string | number;
  creator?: { name?: string; givenName?: string; familyName?: string }[] | { name?: string };
  author?: { name?: string }[]; publisher?: { name?: string }; license?: string;
}
/** El exportador escribe `jsonld/<conjunto>.json` como `{es, en}` (petición del exportador, 22-09-2026); se admite también plano. */
const jsonldLang = (c: Conjunto, lang: Lang = 'es'): JsonLd | null => {
  const j = dato<Record<string, unknown>>(`jsonld/${c}`);
  if (!j) return null;
  return (j[lang] ?? j.es ?? j) as JsonLd;
};
const jsonld = (c: Conjunto) => jsonldLang(c, 'es');
/** El título PRINCIPAL del depósito, el que da la cita de Dataverse (en inglés); el español es su título alternativo. */
const tituloPrincipal = (c: Conjunto, j: JsonLd) => jsonldLang(c, 'en')?.name ?? j.name ?? '';

/** El JSON-LD del conjunto en la lengua de la página, tal cual, para `<script type="application/ld+json">` (o `null`). */
export const jsonldDe = (c: Conjunto, lang: Lang = 'es') => jsonldLang(c, lang);

/** Texto de la cita del conjunto, tal como la da Dataverse (HTML con su envoltorio o ⟦pendiente⟧). */
export function citaConjunto(c: Conjunto, lang: Lang): string {
  return resuelve(`dv.${c}.cita`, lang);
}
/** La misma cita, en texto plano (para copiar). */
export function citaConjuntoPlana(c: Conjunto): string | null {
  const x = cifra(`dv.${c}.cita`);
  return x ? String(x.v) : null;
}

function autores(j: JsonLd): string[] {
  const lista = Array.isArray(j.creator) ? j.creator : j.creator ? [j.creator] : j.author ?? [];
  return lista.map((a: any) => a.name ?? [a.familyName, a.givenName].filter(Boolean).join(', ')).filter(Boolean);
}
const doiDe = (j: JsonLd) => {
  const ids = [j['@id'], ...(Array.isArray(j.identifier) ? j.identifier : [j.identifier])].filter(Boolean) as string[];
  return ids.map((i) => i.replace(/^https?:\/\/doi\.org\//, '').replace(/^doi:/, '')).find((i) => /^10\./.test(i)) ?? null;
};

/** BibTeX del conjunto, o `null` si el exportador aún no ha escrito su JSON-LD. */
export function bibtex(c: Conjunto): string | null {
  const j = jsonld(c);
  if (!j) return null;
  const anio = (j.datePublished ?? '').slice(0, 4);
  const doi = doiDe(j);
  const campos = [
    ['title', `{${tituloPrincipal(c, j)}}`],
    ['author', `{${autores(j).join(' and ')}}`],
    ['year', `{${anio}}`],
    ['publisher', `{${j.publisher?.name ?? 'Harvard Dataverse'}}`],
    ['version', `{${j.version ?? ''}}`],
    ...(doi ? [['doi', `{${doi}}`], ['url', `{https://doi.org/${doi}}`]] : []),
  ];
  return `@dataset{${c}_${anio},\n${campos.map(([k, v]) => `  ${k} = ${v}`).join(',\n')}\n}`;
}

/** RIS del conjunto, o `null`. */
export function ris(c: Conjunto): string | null {
  const j = jsonld(c);
  if (!j) return null;
  const doi = doiDe(j);
  return [
    'TY  - DATA',
    `TI  - ${tituloPrincipal(c, j)}`,
    ...autores(j).map((a) => `AU  - ${a}`),
    `PY  - ${(j.datePublished ?? '').slice(0, 4)}`,
    `PB  - ${j.publisher?.name ?? 'Harvard Dataverse'}`,
    `ET  - ${j.version ?? ''}`,
    ...(doi ? [`DO  - ${doi}`, `UR  - https://doi.org/${doi}`] : []),
    'ER  - ',
  ].join('\n');
}

/** Huella corta y fecha de una base, del sello del exportador. */
export function huella(base: Base): { huella: string | null; fecha: string | null } {
  const s = sello();
  if (!s) return { huella: null, fecha: null };
  const h = ({ V2: s.v2_md5, v3: s.v3_sha256, proyecto: s.proyecto_sha256, afin: s.afin_version } as Record<string, unknown>)[base];
  return { huella: h ? String(h).slice(0, 12) : null, fecha: s.exportado ? String(s.exportado).slice(0, 10) : null };
}

/** Cita de una figura (HTML), con su URL absoluta, su base principal con huella y la fecha de exportación. */
export function citaFigura(lang: Lang, id: string, site: URL | undefined, sub: Record<string, string> = {}): string {
  const f = figura(id);
  if (!f) throw new Error(`Figura desconocida: ${id}`);
  const base = f.base[0];
  const { huella: h, fecha } = huella(base);
  if (!h && ESTRICTO) throw new Error(`La cita de ${id} necesita la huella de ${base} (src/data/sello.json).`);
  const href = site ? new URL(url(lang, paginaDe(id, sub)), site).href : url(lang, paginaDe(id, sub));
  return t(lang, 'comun.cita.figura', {
    vars: {
      titulo: t(lang, `${f.familia}.titulo`),
      url: escapa(href),
      base: `${t(lang, `comun.sello.${base}`)}${h ? ` · <code>${escapa(h)}</code>` : ''}`,
      fecha: fecha ? `<time datetime="${fecha}">${escapa(fecha)}</time>` : marcaPendiente('sello.exportado'),
    },
  });
}

/** Cita de un pasaje (HTML). Los valores llegan ya resueltos (con su envoltorio) desde la plantilla de la puerta. */
export function citaPasaje(lang: Lang, v: { diario: string; numero: string; fecha: string; paginas: string; id: string; edicion: string }): string {
  return t(lang, 'comun.cita.pasaje', { vars: v });
}
