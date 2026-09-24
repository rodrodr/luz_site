/**
 * Registro ÚNICO de las figuras (plan § Figuras · Contrato común). De aquí salen:
 *  · el `id` y el ancla con que cada componente monta su figura;
 *  · la URL que imprime su LÉAME y la cita de la figura;
 *  · la huella y la fecha de su base en la pestaña Datos (sello del exportador).
 * Si cada componente escribiera la suya, la cita, el LÉAME y la tabla acabarían diciendo cosas distintas.
 *
 * `archivos`: los nombres base de `public/datos/` (el exportador escribe `<archivo>.csv`, `<archivo>.xlsx`; el sitio
 * genera `leame-<id>-<lang>.txt`). `imagen`: SVG y PNG exportables (solo F01 y F26).
 */
import type { Base } from './cifras';
import { PAGINAS } from './rutas';

export interface FiguraReg {
  id: string;
  /** Ancla en su página (sin #). */
  ancla: string;
  /** Página principal donde vive (ruta sin lengua); `otras`, donde se repite en otra escala. */
  ruta: string;
  otras?: string[];
  /** Base o bases; la primera es la principal. */
  base: Base[];
  interactiva: boolean;
  archivos: string[];
  imagen?: boolean;
  /** Prefijo de su copy (`fig.F01.titulo`, `fig.F01.salvedad`, `fig.F01.leame.*`). */
  familia: string;
  /** Edición en que se publica. */
  ed: '0.1' | '0.2';
}

const F = (id: string, o: Omit<FiguraReg, 'id' | 'familia' | 'ed'> & { ed?: '0.1' | '0.2' }): FiguraReg => ({ id, familia: `fig.${id}`, ed: '0.1', ...o });

export const FIGURAS: FiguraReg[] = [
  F('H', { ancla: 'hemiciclo', ruta: PAGINAS.inicio, base: ['croquis'], interactiva: true, archivos: [] }),
  F('F01', { ancla: 'calendario', ruta: PAGINAS.cortes, otras: [PAGINAS.inicio, 'cortes/<etapa>'], base: ['V2', 'proyecto'], interactiva: true, archivos: ['sesiones', 'meses'], imagen: true }),
  F('F16', { ancla: 'presidencia-gobierno', ruta: 'cortes/<etapa>', base: ['proyecto'], interactiva: true, archivos: ['presidencia_gobierno'] }),
  F('F26', { ancla: 'votaciones', ruta: PAGINAS.sesiones, otras: [PAGINAS.inicio, 'cortes/sesiones/<puerta>'], base: ['V2', 'v3'], interactiva: true, archivos: ['votaciones'], imagen: true }),
  F('F05', { ancla: 'oradores', ruta: 'cortes/<etapa>', base: ['v3'], interactiva: true, archivos: ['oradores_etapa'] }),
  F('F09', { ancla: 'familias', ruta: 'cortes/<etapa>', base: ['V2'], interactiva: true, archivos: ['familias_etapa'] }),
  F('F30', { ancla: 'turnos', ruta: 'cortes/sesiones/<puerta>', base: ['V2'], interactiva: true, archivos: [] }), // sin CSV (anexo V10, D-23): su Datos la pone FigTurnos
  F('F27', { ancla: 'luz-y-taquigrafos', ruta: PAGINAS.diario, base: ['V2', 'v3'], interactiva: true, archivos: ['luz_y_taquigrafos'] }),
  F('F28', { ancla: 'lo-que-calla', ruta: PAGINAS.diario, base: ['V2', 'v3'], interactiva: true, archivos: ['no_constara'] }),
  F('F20', { ancla: 'fila', ruta: PAGINAS.metodo, base: ['V2', 'v3'], interactiva: true, archivos: ['fila_ejemplo'] }),
  F('F19', { ancla: 'pasos', ruta: PAGINAS.metodo, base: ['V2', 'proyecto'], interactiva: true, archivos: ['pasos'] }),
  F('F10', { ancla: 'tramite', ruta: PAGINAS.metodo, base: ['V2'], interactiva: true, archivos: ['longitud'] }),
  F('F32', { ancla: 'columnas', ruta: PAGINAS.datos, base: ['V2'], interactiva: true, archivos: ['columnas'] }),
  F('F34', { ancla: 'unir', ruta: PAGINAS.datos, base: ['V2', 'afin'], interactiva: false, archivos: ['union'] }),
  F('F17', { ancla: 'bibliotecas', ruta: PAGINAS.explorador, base: ['v3'], interactiva: true, archivos: ['bibliotecas'] }),
  F('F29', { ancla: 'busquedas', ruta: PAGINAS.explorador, base: ['v3'], interactiva: true, archivos: ['busquedas'] }),
  F('F22', { ancla: 'cruces', ruta: PAGINAS.afinidades, base: ['afin'], interactiva: true, archivos: ['cruces'] }),
  F('F21', { ancla: 'redes', ruta: PAGINAS.afinidades, base: ['afin'], interactiva: true, archivos: ['redes'] }),
];

export const figura = (id: string) => FIGURAS.find((f) => f.id === id);
/** Figuras con datos descargables (las que tienen pestaña Datos y LÉAME). */
export const FIGURAS_CON_DATOS = FIGURAS.filter((f) => f.archivos.length > 0);
/** Ruta de la página de una figura, con su ancla: lista para `url(lang, …)`. Las de plantilla (`<etapa>`) necesitan `sub`. */
export function paginaDe(id: string, sub: Record<string, string> = {}): string {
  const f = figura(id);
  if (!f) throw new Error(`Figura desconocida: ${id} (src/lib/figuras.ts)`);
  return `${f.ruta.replace(/<(\w+)>/g, (_t, k: string) => sub[k] ?? '')}#${f.ancla}`;
}
/**
 * Archivos de una figura en `public/datos/` (convención pedida al exportador en docs/peticiones/andamiaje.md):
 *  · datos: `datos/<archivo>.csv` y `datos/<archivo>.xlsx`, sin lengua (las cabeceras son los nombres de columna);
 *  · LÉAME: `datos/leame-<id>-<lang>.txt`, que genera el sitio (src/pages/datos/leame-[fig]-[lang].txt.ts);
 *  · imagen (F01 y F26): `datos/<id>-<lang>.svg` y `.png`.
 */
export const rutaDatos = (archivoBase: string, ext: 'csv' | 'xlsx') => `datos/${archivoBase}.${ext}`;
export const rutaLeame = (id: string, lang: string) => `datos/leame-${id}-${lang}.txt`;
export const rutaImagen = (id: string, lang: string, ext: 'svg' | 'png') => `datos/${id}-${lang}.${ext}`;
