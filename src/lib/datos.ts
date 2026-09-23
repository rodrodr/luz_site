/**
 * Lectura de `src/data/` (lo escribe `exportador/exportar.py`; aquí NUNCA se escribe).
 *
 * Todo archivo de datos es OPCIONAL para la compilación de vista previa: el sitio se construye mientras el exportador
 * aún no ha escrito sus archivos y pinta lo que haya. Por eso se leen con `import.meta.glob` (un archivo que falta no
 * rompe la compilación) y no con `import` directo. En publicación (STRICT=1) quien necesite un archivo lo exige con
 * `datoObligatorio()`, y su falta sí para la compilación.
 */
const MODULOS = import.meta.glob<{ default: unknown }>('../data/**/*.json', { eager: true });
const ESTRICTO = process.env.STRICT === '1';

const PORNOMBRE = new Map<string, unknown>();
for (const [ruta, mod] of Object.entries(MODULOS)) {
  const nombre = ruta.replace(/^\.\.\/data\//, '').replace(/\.json$/, '');
  PORNOMBRE.set(nombre, mod.default);
}

/** Archivos de datos que alguien pidió y no estaban (los lista la vista previa). */
export const datosQueFaltan = new Set<string>();

/** El contenido de `src/data/<nombre>.json`, o `null` si el exportador aún no lo ha escrito. `dato('afinidades/F22')` */
export function dato<T = unknown>(nombre: string): T | null {
  if (PORNOMBRE.has(nombre)) return PORNOMBRE.get(nombre) as T;
  datosQueFaltan.add(nombre);
  return null;
}

/** Como `dato()`, pero en publicación su falta PARA la compilación. */
export function datoObligatorio<T = unknown>(nombre: string): T | null {
  const d = dato<T>(nombre);
  if (d === null && ESTRICTO) throw new Error(`Falta src/data/${nombre}.json: lo escribe el exportador (python3 exportador/exportar.py).`);
  return d;
}

/** ¿Existe ya el archivo? */
export const hayDato = (nombre: string) => PORNOMBRE.has(nombre);

/** Nombres de todos los archivos de datos presentes (para la tabla de Versiones y las guardas). */
export const datosPresentes = () => [...PORNOMBRE.keys()].sort();

/**
 * El sello del exportador: `{exportado, v2_md5, v3_sha256, proyecto_sha256, afin_version, puertas, …}`.
 * De él salen la huella y la fecha de cada base en el LÉAME, en la cita de una figura y en la tabla F35.
 */
export interface Sello { exportado?: string; v2_md5?: string; v3_sha256?: string; proyecto_sha256?: string; afin_version?: string; puertas?: number; [k: string]: unknown }
export const sello = () => dato<Sello>('sello');
