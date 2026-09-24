/**
 * Rutas del sitio (plan § Mapa del sitio · Rutas). Los segmentos son LOS MISMOS en las dos lenguas: ninguna URL
 * citada cambia al cambiar de lengua y `hreflang` es trivial. Ningún enlace interno lleva la base escrita a mano.
 */
import type { Lang } from './idiomas';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL interna con la base del despliegue y barra final. `url('es', 'cortes/1931')` → `/luz/es/cortes/1931/` */
export function url(lang: Lang, ruta = ''): string {
  const limpia = ruta.replace(/^\/|\/$/g, '');
  const [camino, ancla] = limpia.split('#');
  const c = (camino ?? '').replace(/\/$/, '');
  return `${BASE}/${lang}/${c ? c + '/' : ''}${ancla ? '#' + ancla : ''}`;
}

/** Recurso estático de `public/`. `recurso('datos/F01-es.csv')` */
export const recurso = (ruta: string) => `${BASE}/${ruta.replace(/^\//, '')}`;

/** La raíz del sitio (selector de lengua). */
export const raiz = () => `${BASE}/`;

/** Las plantillas. La clave es también el prefijo de su copy (`cortes.*`, `diario.*`…). */
export const PAGINAS = {
  inicio: '',
  cortes: 'cortes',
  sesiones: 'cortes/sesiones',
  diario: 'diario',
  metodo: 'metodo',
  datos: 'datos',
  explorador: 'explorador',
  afinidades: 'afinidades',
} as const;
export type Pagina = keyof typeof PAGINAS;

/**
 * Las cinco etapas (D-8). `id` es el numeral con que el exportador nombra sus cifras (`etapa.I.palabras`); `slug` es el
 * segmento de la URL: el año de la elección para las tres Cortes elegidas y un nombre para las dos que las continúan,
 * de modo que la URL no depende del rótulo pendiente de la segunda legislatura (D-6).
 */
export const ETAPAS = [
  { id: 'I', slug: '1931' },
  { id: 'II', slug: '1933' },
  { id: 'III', slug: '1936' },
  { id: 'IV', slug: 'guerra' },
  { id: 'V', slug: 'mexico' },
] as const;
export type Etapa = (typeof ETAPAS)[number];
export const etapaPorSlug = (slug: string) => ETAPAS.find((e) => e.slug === slug);
export const etapaPorId = (id: string) => ETAPAS.find((e) => e.id === id);

/**
 * Las puertas de lectura (D-9). Se nombran por un nombre y no por una fecha: tres abarcan más de una.
 * Solo se GENERAN las de la edición 0.1; las de la 0.2 quedan reservadas y ocultas (nunca «próximamente»).
 */
export const PUERTAS = [
  { slug: 'sufragio-1931', etapa: 'I', ed: '0.1' },
  { slug: 'cuestion-religiosa-1931', etapa: 'I', ed: '0.1' },
  { slug: 'estatuto-1932', etapa: 'I', ed: '0.1' },
  { slug: 'casas-viejas-1933', etapa: 'I', ed: '0.1' },
  { slug: 'pistola-1934', etapa: 'II', ed: '0.1' },
  { slug: 'antesala-1936', etapa: 'III', ed: '0.1' },
  { slug: 'figueres-1939', etapa: 'IV', ed: '0.1' },
  { slug: 'mexico-1945', etapa: 'V', ed: '0.1' },
  { slug: 'apertura-1931', etapa: 'I', ed: '0.2' },
  { slug: 'constitucion-1931', etapa: 'I', ed: '0.2' },
  { slug: 'conllevar-1932', etapa: 'I', ed: '0.2' },
  { slug: 'dos-votaciones-1932', etapa: 'I', ed: '0.2' },
  { slug: 'acusacion-1935', etapa: 'II', ed: '0.2' },
  { slug: 'destitucion-1936', etapa: 'III', ed: '0.2' },
  { slug: 'abril-1936', etapa: 'III', ed: '0.2' },
] as const;
export type Puerta = (typeof PUERTAS)[number];
/** Edición de las páginas que se publican ahora. Subirla a '0.2' destapa las siete puertas reservadas. */
export const EDICION = '0.1';
export const PUERTAS_PUBLICADAS = PUERTAS.filter((p) => p.ed <= EDICION);
export const puertasDeEtapa = (id: string) => PUERTAS_PUBLICADAS.filter((p) => p.etapa === id);

/** Todas las rutas de una lengua, en orden de recorrido: las recorren `humo.spec` y `peso.spec`. */
export function todasLasRutas(): string[] {
  return [
    PAGINAS.inicio,
    PAGINAS.cortes,
    ...ETAPAS.map((e) => `${PAGINAS.cortes}/${e.slug}`),
    PAGINAS.sesiones,
    ...PUERTAS_PUBLICADAS.map((p) => `${PAGINAS.sesiones}/${p.slug}`),
    PAGINAS.diario,
    PAGINAS.metodo,
    PAGINAS.datos,
    PAGINAS.explorador,
    PAGINAS.afinidades,
  ];
}
