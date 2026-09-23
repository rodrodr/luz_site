/**
 * Todas las URL externas del sitio viven aquí, y solo aquí. `enlaces.yml` (semanal) las comprueba.
 * ⛔ Nada se toca en Dataverse, en el explorador ni en la app de Afinidades: lo que les afectaría queda como petición
 * al autor, no como pendiente del sitio (D-3, D-4, D-18, D-19; decisiones del 23-09-2026).
 */
export const DOI = {
  thqcmi: '10.7910/DVN/THQCMI',
  cgocus: '10.7910/DVN/CGOCUS',
} as const;

export const ENLACES = {
  /** Página del DOI: los botones van a la página del conjunto, nunca a archivos sueltos (la API da 400 sin formulario). */
  thqcmi: `https://doi.org/${DOI.thqcmi}`,
  cgocus: `https://doi.org/${DOI.cgocus}`,
  explorador: 'https://rodrodr.github.io/luz_explorer/',
  /** La app de Afinidades solo restaura estas dos vistas desde la URL (D-4). */
  afinidades: 'https://rodrodr.github.io/afinidades/',
  afinidadesRed: 'https://rodrodr.github.io/afinidades/#red',
  afinidadesDiputados: 'https://rodrodr.github.io/afinidades/#diputados',
  /** Proyecto hermano, distinto (pie). */
  parlaibero: 'https://rodrodr.github.io/parlaibero/',
  /** D-21 (decidida, 23-09-2026): repositorio `luz` → rodrodr.github.io/luz/. Lo crea y lo publica el investigador. */
  repositorio: 'https://github.com/rodrodr/luz',
  erratas: 'https://github.com/rodrodr/luz/issues',
  licenciaDatos: 'https://creativecommons.org/licenses/by/4.0/',
  licenciaCodigo: 'https://opensource.org/license/mit',
  usal: 'https://www.usal.es/',
  doi: (doi: string) => `https://doi.org/${doi}`,
} as const;

/**
 * D-4 (a): el explorador NO abre una búsqueda desde un enlace. Mientras valga `false`, `CopiarConsulta` ofrece
 * [Copiar la consulta] · [Abrir el explorador ↗] y la frase ↺ 5. Si el autor añade el manejador `#q=` / `#sesion=`,
 * se cambia ESTE valor y ningún texto del copy.
 */
export const ENLACES_PROFUNDOS = false;
/** Cómo se construiría el enlace profundo si ENLACES_PROFUNDOS pasa a `true` (forma pedida al autor, D-4). */
export const enlaceProfundo = (consulta: string) => `${ENLACES.explorador}#q=${encodeURIComponent(consulta)}`;

/**
 * Lo que solo puede dar o decidir el investigador (contrato de construcción, 22-09-2026). Mientras un valor sea `null`,
 * el sitio lo pinta como pendiente en la vista previa (`data-pendiente`) y la compilación de publicación (STRICT=1) FALLA.
 * Las claves con texto para el lector (el motivo del formulario, D-20) NO van aquí: van en el copy, que se traduce.
 * 23-09-2026: todas decididas (docs/DECISIONES_23-09.md). El valor dice la decisión, para quien lea el código; no se
 * pinta en ninguna página (ningún copy cita `{{D-…}}`).
 */
export const PENDIENTES_DEL_INVESTIGADOR: Record<string, string | null> = {
  /** D-3: Afinidades se publica sobre CGOCUS V1.1, depositada, con su sello; la v2 se nombra «en preparación», sin cifras. */
  'D-3': 'CGOCUS V1.1 con su sello; v2 en preparación (se reexporta al depositarse)',
  /** D-4: sin enlaces profundos (`ENLACES_PROFUNDOS = false`): [Copiar la consulta] + [Abrir el explorador ↗]. */
  'D-4': 'Copiar la consulta + Abrir el explorador; el manejador #q= queda como petición al explorador',
  /** D-18: la cita «V2» que el explorador pone sobre datos v3 se resuelve con el aviso de la página Explorador (opción b). */
  'D-18': 'aviso en la página Explorador (opción b)',
  /** D-19: sin V2.1 de THQCMI; la frase fija ↺ 11 dice que el README describe la primera versión. */
  'D-19': 'se deja como está, con la frase fija ↺ 11',
  /** D-21: la URL definitiva (astro.config: SITE + BASE `/luz`). */
  'D-21': 'https://rodrodr.github.io/luz/',
  /** D-22: grafías confirmadas y probables adoptadas; las «por revisar», con la forma del Diario (exportador/modulos/base.py). */
  'D-22': 'adoptadas; por revisar con la forma que imprime el Diario (docs/02c_GRAFIAS.md)',
  /** D-25: los pendientes de datos se declaran con su cifra en Versiones (#fechas), no se corrigen en origen. */
  'D-25': 'declarados en Versiones con su cifra',
  /**
   * Vía de [Escribirnos] del pie: el correo institucional del investigador principal, el mismo que dio para ParlaIbero
   * (21-09-2026). Fijado por la integración de la fase 2 (REVISION_FASE1 P2-12); si prefiere otra vía, se cambia aquí.
   */
  contacto: 'rodrodr@usal.es',
  /** Edición de las páginas: se sube con cada publicación (CHANGELOG.md). */
  edicion_pagina: '0.1',
};

/** La vía de contacto como `href`, o `null` si aún no la hay. */
export function hrefContacto(): string | null {
  const via = PENDIENTES_DEL_INVESTIGADOR.contacto;
  if (!via) return null;
  return /^https?:/.test(via) ? via : /^[^@\s]+@[^@\s]+$/.test(via) ? `mailto:${via}` : null;
}

/** Los pendientes aún abiertos, para la vista previa y para la puerta de publicación. */
export const pendientesAbiertos = () => Object.entries(PENDIENTES_DEL_INVESTIGADOR).filter(([, v]) => v === null).map(([k]) => k);
