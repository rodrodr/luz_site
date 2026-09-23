export const meta = {
  name: 'construir-lyt-fase2',
  description: 'Fase 2 del sitio Luz y Taquígrafos: diseño aplicado a la base, copy corregido, figuras y páginas por seis dueños, integración, panel de diseño y pulido',
  phases: [
    { title: 'Preparar', detail: 'integrador de diseño y corrector de copy en paralelo' },
    { title: 'Construir', detail: 'seis dueños de figuras y páginas' },
    { title: 'Integrar', detail: 'compilación, exportación estricta, pruebas' },
    { title: 'Revisar', detail: 'crítica de experiencia, auditoría técnica, fidelidad de datos' },
    { title: 'Pulir', detail: 'una ronda acotada con todo lo confirmado' },
  ],
}

const R = '/Users/rodrodr/Dropbox/Apps/luz_site'
const M = '/Users/rodrodr/.claude/skills/maestro-diseno-web'
const CTX = `
Construyes el SITIO MULTIPÁGINA de «Luz y Taquígrafos» en ${R} (Astro estático, islas sin framework; español ahora, inglés después).
El investigador (Rodrigo Rodrigues-Silveira) exige «máxima calidad en el menor tiempo», con diseño de experiencia e interfaz de primer
nivel, figuras interactivas con datos reales y nada resumido que no deba resumirse. LEE ANTES DE EMPEZAR:
- ${R}/docs/CONTRATO_CONSTRUCCION.md (dueños y formatos; manda sobre el plan) y ${R}/docs/ESTADO_TRABAJO.md (estado).
- ${R}/DESIGN.md (sistema visual «el Diario, anotado al margen»: MANDA en todo lo visual), ${R}/PRODUCT.md, ${R}/.impeccable/surfaces/*.md
  (briefs por superficie) y la implementación de referencia ${R}/docs/diseno/muestra.html (+ docs/diseno/fuente/gen_muestra.py).
- ${R}/docs/00_PLAN_sitio.md (incluido su ANEXO FINAL «Revisión adversarial», que corrige el plan) y ${R}/docs/01_NARRATIVA_sitio.md.
- ${R}/docs/REVISION_FASE1.md (problemas priorizados con su dueño).
- ${R}/docs/RECURSOS_DISENO.md, ${R}/docs/RECURSOS_VANGUARDIA.md (estrategia de movimiento: momentos, técnica, peso, degradación) y sus
  prototipos en ${R}/docs/diseno/prototipos/.
- Si existe ${M}/SKILL.md (skill maestra de diseño web que se está integrando ahora mismo), léela y aplica sus contratos y kits; si aún no
  existe, sigue DESIGN.md. Usa las skills instaladas con la herramienta Skill cuando toque: impeccable (craft-floor antes de editar UI),
  charts-graphs y tooltips (figuras y notas accesibles), better-typography, better-accessibility, better-colors, modern-css,
  astro-framework, emil-design-eng, three-best-practices, find-animation-opportunities.
REGLAS DURAS: nada del prototipo de 1931; toda cifra con marcador y base, verificada sobre la fuente (V2 CSV
/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv; v3 /Users/rodrodr/.cache/luz_site/corpus.sqlite; papel de fila
/Users/rodrodr/.cache/luz_site/clima/*.jsonl); no prometer lo que el explorador no hace; figuras con pestañas Gráfico·Tabla·Datos,
teclado, táctil, nota emergente accesible (WCAG 1.4.13: persistente, recorrible con el puntero, descartable con Esc) y versión sin JS;
movimiento solo con prefers-reduced-motion: no-preference; nada desborda a 360 px; dos temas cuidados por igual; español de España.
No escribas fuera de ${R}. No toques archivos de otro dueño: si necesitas un cambio ajeno, anótalo en ${R}/docs/peticiones/<tu-papel>.md.
Al terminar, VERIFICA lo tuyo (npm run i18n, python3 exportador/exportar.py si tocaste el exportador, npm run build, y tus páginas con
Playwright en Python a 1.440 y 375 px en los dos temas: MIRA las capturas; una ronda de corrección como mucho) y devuelve un informe breve:
archivos, verificación, capturas (rutas en ${R}/docs/revision_fase2/capturas/), pendientes.`

phase('Preparar')
const prep = await parallel([
  () => agent(CTX + `

TU PAPEL: INTEGRADOR DE DISEÑO (dueño del andamiaje en esta fase). Aplica ${R}/docs/peticiones/diseno.md ENTERO (tokens, base.css,
Base.astro, los componentes genéricos, la isla de figuras con nota emergente recorrible y descartable, las pruebas), las peticiones dirigidas
al andamiaje en ${R}/docs/peticiones/*.md y los puntos de ${R}/docs/REVISION_FASE1.md cuyo dueño sea el andamiaje (rótulos y enlaces
duplicados o sin destino, [Escribirnos] con el contacto rodrodr@usal.es, check-i18n, audit-cifras…). Añade las transiciones nativas entre
páginas (@view-transition entre documentos) y las utilidades de movimiento de DESIGN.md con degradación. Corrige las comillas colgadas
de las citas grandes para que no invadan el margen. Deja un catálogo visual de componentes en ${R}/src/pages/[lang]/_componentes.astro
(o ruta equivalente, excluida del sitemap) para que los dueños de la fase siguiente vean el sistema. NO toques plantillas de página de los
grupos (Inicio, Cortes, Sesiones, Diario, Método, Datos, Versiones, Explorador, Afinidades) salvo lo mínimo para que compilen, ni el copy,
ni el exportador. El build debe pasar al terminar.`, { label: 'integrador-diseno', phase: 'Preparar' }),
  () => agent(CTX + `

TU PAPEL: CORRECTOR DEL COPY (dueño de ${R}/docs/copy_es/*.md y ${R}/docs/marcadores/*.md en esta fase). Aplica: (1) todos los puntos de
${R}/docs/REVISION_FASE1.md cuyo dueño sea un grupo de copy (P1: tesis «Casi nunca fue secreto: sobre todo, inabarcable» con «salvo lo que
la Presidencia mandó borrar»; «El discurso de Azaña, a nombre de otro»; cola de la sesión 48 con claves ses.s48.cola*; peso del explorador
según D-26 (a) «unos 112 MB comprimidos» en unidad decimal —cambia el formato del marcador, no la cifra—; y todos los P2 y P3 de copy:
«más de 17.000» en el Estatuto, «Haga sus preguntas», Ventosa Calvell, los seis números tecleados, «Sobre este corpus», D-3 en Datos…);
(2) el ANEXO «Revisión adversarial» de ${R}/docs/00_PLAN_sitio.md en todo lo que afecte al copy (cifras corregidas, citas letra a letra,
Figueres, Ortega, votaciones «escogidas» con su total, 735 turnos rescatados, 586 sesiones con vicepresidente…); (3) la frase fija ↺ 10
según la medición del crítico. Pasa las pruebas de rechazo: Inicio ≤ 700 palabras y ≤ 120 de límites; ninguna frase de más de 30 palabras;
check-i18n limpio. Deja la clave de Versiones sin tocar (la resuelve su dueño). Actualiza los marcadores y vuelve a pasar los guiones de
comprobación de ${R}/docs/marcadores/ y ${R}/docs/revision_fase1/recalcula_muestra.py.`, { label: 'corrector-copy', phase: 'Preparar' }),
])
log('Preparación: ' + prep.map(x => x ? 'ok' : 'falló').join(', '))

phase('Construir')
const GRUPOS = [
  { k: 'inicio_cortes', t: `GRUPO 1 · Inicio, raíz (selector de lengua), 404 y Las Cortes (índice). Figuras: F01 FigCalendario en sus tres escalas
(F01c compacta en Inicio, F01 completa en Las Cortes, F01e recorte de etapa CON las bandas F16 de presidente titular y Gobierno, que usará
el grupo 2 con la interfaz <FigCalendario escala="etapa" etapa="I|II|III|IV|V" />) y el hemiciclo de portada con el momento de movimiento
«La Cámara se sienta» (CSS, 0 KB) de RECURSOS_VANGUARDIA/DESIGN. Módulo del exportador: exportador/modulos/cortes.py SOLO para F01/F16
(y los datos de Inicio que falten). Copy: docs/copy_es/inicio.md, cortes.md, comun.md solo para textos de tus figuras. Datos descargables de
F01 (CSV, XLSX, LÉAME, SVG, PNG).` },
  { k: 'fichas', t: `GRUPO 2 · Las cinco fichas de etapa (/cortes/1931/, /1933/, /1936/, /guerra/, /mexico/) con su plantilla completa (contexto
por apartados con índice lateral, cifras de etapa, «Hoy puede», «Cómo citar», vecinas) y las figuras F05 FigOradores (quién tomó la palabra
en la etapa, v3, sin Presidencia, «no es una medida de importancia») y F09 FigFamilias (qué familias ocupan la palabra, V2). Inserta la F01e
del grupo 1 con <FigCalendario escala="etapa" etapa="…" /> (si aún no existe cuando compiles, deja el hueco y anótalo). Módulo:
exportador/modulos/cortes.py SOLO funciones de F05/F09 (en un archivo aparte exportador/modulos/fichas.py si prefieres no compartir).
Copy: docs/copy_es/cortes_*.md.` },
  { k: 'sesiones', t: `GRUPO 3 · Sesiones y votaciones (índice con el registro de votaciones por etapa) y la plantilla de PUERTA con sus 8
instancias (sufragio-1931, cuestion-religiosa-1931, estatuto-1932, casas-viejas-1933, pistola-1934, antesala-1936, figueres-1939,
mexico-1945): pasaje literal con el aserto de cita, «Cómo encontrarla en el explorador» con [Copiar la consulta] y recuento, vecinas.
Figuras: F26 FigVotaciones (las escogidas, con su total al lado y los umbrales de la mitad más uno; datos descargables SVG/PNG/CSV) y F30
FigTurnos (la sesión turno a turno). Módulo: exportador/modulos/sesiones.py (votaciones.json, puertas.json, citas.json). Copy:
docs/copy_es/sesiones*.md.` },
  { k: 'diario_metodo', t: `GRUPO 4 · El Diario (/diario/) y Método (/metodo/, 10 apartados con índice lateral y banda fija). Figuras: F27 («Luz y
taquígrafos», diez veces) y F28 (lo que el Diario calla) como líneas de tiempo; F19 FigPasos (del Diario a la fila, pasos desplegables); F20
FigFila (anatomía de una fila, conmutador V2/v3); F10/F11 FigLongitud (trámite frente a discurso); F12 (la fila más larga no es un discurso).
Y el momento de movimiento «Del Diario impreso a la fila» (prototipo P2 de three.js en docs/diseno/prototipos/p2_diario_a_fila.html):
llévalo a producción SOLO si cumple DESIGN.md (carga al entrar en pantalla, peso medido, degradación sin JS y con movimiento reducido,
tabla estática equivalente, composición final digna y sin maqueta falsa del Diario); si no, sustitúyelo por la versión nativa ligera y
explica por qué. Módulos: exportador/modulos/diario.py y metodo.py. Copy: docs/copy_es/diario.md y metodo.md.` },
  { k: 'datos_versiones', t: `GRUPO 5 · Usar los datos (/datos/) y Versiones (/datos/versiones/). Figuras y piezas: F32 Columnas (las 14 columnas
con su trampa, notas al margen, sin tira de llenado), F33 (cinco maneras de contar «palabra»), F34 (unir con Afinidades: la correcta y la
incorrecta), fragmentos R y Python que la compilación vuelve a ejecutar, cita en texto/BibTeX/RIS; F25 (siete fechas corregidas), F18
(adónde van las 107.551 filas), F07 FigEdiciones (quién habla más según la base), F35 (qué base usa cada figura, desde lib/figuras.ts).
Resuelve el desajuste de claves de Versiones entre plantilla y copy (REVISION_FASE1 P1-5). Endpoints genéricos de datos descargables
(LÉAME por figura y lengua, procedencia.csv). Módulo: exportador/modulos/datos.py. Copy: docs/copy_es/datos.md y versiones.md.` },
  { k: 'explorador_afinidades', t: `GRUPO 6 · El explorador (/explorador/, 9 secciones con las 12 capturas reales de src/assets/explorador/ y su
LEEME, banda fija, D-17 Menciones solo matriz con límites, D-18 aviso de la cita «V2» sobre datos v3) con F17 FigBibliotecas (los 31
debates y sesiones preparados, en el tiempo) y F29 (búsquedas de muestra con [Copiar la consulta] y recuentos fechados); y Afinidades
Elegidas (/afinidades/) con F22 FigCruces (dos cruces) y F21 FigRed (tres redes de coautoría por legislatura con sigma.js 3 + graphology,
posiciones ForceAtlas2 precalculadas en el exportador e interpoladas al cambiar de legislatura, carga al entrar en pantalla, alternativa
sin JS y tabla; CGOCUS V1.1 con su sello; regenera los nodos desde CGOCUS para que cuadren con el censo). Módulos: exportador/modulos/
explorador.py y afinidades.py. Copy: docs/copy_es/explorador.md y afinidades.md.` },
]
const hechos = (await parallel(GRUPOS.map(g => () => agent(CTX + `

TU PAPEL: DUEÑO DEL ${g.t}
Construye las figuras como componentes Astro en src/components/ (SVG emitido en compilación + texto HTML encima con marcadores y data-base;
estilos con ámbito; geometría en src/viz/geom/; comportamiento propio en src/scripts/fig-<nombre>.ts), y las plantillas de página de tu
grupo con el sistema de DESIGN.md (usa el catálogo de componentes del integrador si existe). Rellena tus módulos del exportador con los
marcadores que tu copy declara en docs/marcadores/ (el exportador falla si un valor esperado no coincide). Aplica a tu copy lo que el anexo
«Revisión adversarial» del plan y REVISION_FASE1 digan de tu grupo si el corrector no lo cubrió (coordina anotándolo en peticiones).
Consigue un resultado de ARTE Y OFICIO: jerarquía clara, aire, una figura protagonista por página, anotaciones editoriales al margen,
microtipografía española impecable, interacción precisa y sobria.`, { label: 'dueño:' + g.k, phase: 'Construir' }).then(r => ({ k: g.k, r }))))).filter(Boolean)

phase('Integrar')
const integ = await agent(CTX + `

TU PAPEL: INTEGRADOR FINAL. Pon el sitio en verde de punta a punta: python3 exportador/exportar.py --estricto (o el modo estricto que
exista), npm run i18n, node scripts/check-i18n.mjs (español), astro check, npm run build, node scripts/audit-cifras.mjs, y las pruebas
de Playwright (humo, sinjs, solapes, peso, guardas; con PW_CHANNEL=chrome si hace falta). Resuelve los conflictos entre dueños y las
peticiones pendientes de ${R}/docs/peticiones/*.md. Captura TODAS las páginas en español a 1.440 y 375 px en los dos temas en
${R}/docs/revision_fase2/capturas/ (nombre: <ruta>_<ancho>_<tema>.png) y escribe ${R}/docs/revision_fase2/INTEGRACION.md con el estado
de cada puerta y cada página. Informes de los dueños:
${hechos.map(h => '### ' + h.k + '\n' + (h.r || '').slice(0, 3000)).join('\n\n')}`, { label: 'integrador-final', phase: 'Integrar' })

phase('Revisar')
const HALL = { type: 'object', properties: { hallazgos: { type: 'array', items: { type: 'object', properties: {
  pagina: { type: 'string' }, problema: { type: 'string' }, correccion: { type: 'string' }, prioridad: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'] },
  evidencia: { type: 'string' } }, required: ['pagina', 'problema', 'correccion', 'prioridad', 'evidencia'] } },
  puntuacion: { type: 'string' } }, required: ['hallazgos', 'puntuacion'] }
const LENTES = [
  { k: 'experiencia', t: `CRÍTICA DE EXPERIENCIA Y DE INTERFAZ con la skill impeccable (comando critique: lee su reference/critique.md y
aplícalo con puntuación heurística y pruebas por personas: el investigador que decide usar la base, el historiador, el periodista). Mira las
capturas de ${R}/docs/revision_fase2/capturas/ y navega el sitio compilado (npx astro preview o dist/ con un servidor estático) con
Playwright: recorrido real Inicio → Las Cortes → ficha → puerta → Método → Datos → descarga. Juzga jerarquía, amontonamiento, ritmo,
tipografía, coherencia con DESIGN.md, calidad artística y lo que resume o se queda corto.` },
  { k: 'tecnica', t: `AUDITORÍA TÉCNICA con impeccable audit (reference/audit.md), better-accessibility y core-web-vitals: axe en todas las
páginas y los dos temas, teclado en cada figura, notas emergentes (WCAG 1.4.13), foco visible, contraste, movimiento reducido, sin JS,
360 px, peso por página, LCP/CLS medidos con Playwright, errores de consola, y el detector de impeccable
(/Users/rodrodr/.claude/skills/impeccable/scripts/impeccable detect --json sobre dist/).` },
  { k: 'datos', t: `FIDELIDAD DE DATOS Y DE TEXTO: recalcula sobre las fuentes al menos 60 cifras al azar del dist/ (y todas las de Inicio),
comprueba 30 citas letra a letra en su fila V2 y v3, que cada figura dice su base y su denominador, que ninguna promesa del explorador es
falsa, que no queda nada del prototipo de 1931, y que las figuras dibujan exactamente lo que dicen sus tablas.` },
]
const revs = (await parallel(LENTES.map(l => () => agent(CTX + '\n\nTU PAPEL: REVISOR (no edites). ' + l.t,
  { label: 'revisor:' + l.k, phase: 'Revisar', schema: HALL }).then(r => r ? { k: l.k, ...r } : null)))).filter(Boolean)
const todos = revs.flatMap(r => r.hallazgos.map(h => ({ ...h, lente: r.k })))
log(`Hallazgos: ${todos.length} (P0 ${todos.filter(h => h.prioridad === 'P0').length}, P1 ${todos.filter(h => h.prioridad === 'P1').length})`)

phase('Pulir')
const pulido = await agent(CTX + `

TU PAPEL: PULIDOR FINAL, en UNA ronda acotada (método impeccable polish: reference/polish.md; lee craft-floor.md antes de editar).
Comprueba cada hallazgo de abajo en el sitio y corrígelo si es real (todos los P0 y P1, y los P2 baratos); rechaza con motivo los falsos.
Después vuelve a pasar TODAS las puertas (exportación estricta, i18n, check-i18n, astro check, build, audit-cifras, Playwright) y rehaz las
capturas. Escribe ${R}/docs/revision_fase2/PULIDO.md (hallazgo → aplicado/rechazado y por qué) y actualiza la sección «Hecho» y «En curso
y siguiente» de ${R}/docs/ESTADO_TRABAJO.md. Devuelve un resumen de 20 líneas del estado del sitio y lo que falta (inglés, pendientes del
investigador).
PUNTUACIONES: ${revs.map(r => r.k + ': ' + r.puntuacion).join(' | ')}
HALLAZGOS:
${JSON.stringify(todos, null, 1)}`, { label: 'pulidor', phase: 'Pulir' })

return { preparacion: prep.map(x => (x || '').slice(0, 1500)), dueños: hechos.map(h => h.k), integracion: (integ || '').slice(0, 3000), hallazgos: todos.length, pulido }
