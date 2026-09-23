export const meta = {
  name: 'integrar-maestro-diseno-web',
  description: 'Inventariar todas las skills de diseño, resolver solapes y conflictos, escribir la skill maestra integrada con kits, y probarla con tres demos reales (juego, lectura, landing)',
  phases: [
    { title: 'Inventario', detail: 'cuatro lectores sobre todas las skills de diseño' },
    { title: 'Arquitectura', detail: 'sistema integrado, precedencias y kits: skill maestra' },
    { title: 'Crítica', detail: 'revisión adversarial de coherencia' },
    { title: 'Pruebas', detail: 'tres demos reales construidas con la skill' },
    { title: 'Corregir', detail: 'la skill aprende de las fricciones' },
  ],
}

const SK = '/Users/rodrodr/.claude/skills'
const M = SK + '/maestro-diseno-web'
const LYT = '/Users/rodrodr/Dropbox/Apps/luz_site'
const CTX = `
OBJETIVO DEL INVESTIGADOR (Rodrigo Rodrigues-Silveira): «Quiero que, al final, seas una máquina de matar en el diseño de cualquier aplicación
web: de juegos interactivos a aplicaciones de lectura y landing pages», con los recursos más destacados, consagrados y de vanguardia
(three.js, p5.js…), y «no basta con solo seleccionar, hay que integrar todo de modo que funcionen bien y en armonía».
MATERIA PRIMA ya reunida y verificada: ${SK}/_arsenal/ARSENAL.md (10 contratos comunes, stacks por dominio, listones, mapa de qué skill
manda), ${LYT}/docs/RECURSOS_DISENO.md, ${LYT}/docs/RECURSOS_VANGUARDIA.md (estrategia de movimiento y prototipos en
${LYT}/docs/diseno/prototipos/), y las skills instaladas en ${SK}/ (cada carpeta con SKILL.md). Entorno: macOS, node 22, python3 con
Playwright (chromium), sin git funcional (usa CDN jsdelivr/esm.sh o npm en carpetas de trabajo). Escribe en español de España.`

const LOTES = [
  { k: 'impeccable', t: 'impeccable (lee SKILL.md y su reference/: new-work, craft-floor, critique, audit, polish, routing…) y las skills sueltas de su familia: critique, audit, polish, layout, typeset, colorize, clarify, adapt, distill, quieter, animate, delight, bolder, overdrive, shape, optimize.' },
  { k: 'gusto_visual', t: 'design-taste-frontend, high-end-visual-design, redesign-existing-projects, minimalist-ui, industrial-brutalist-ui, stitch-design-taste, gpt-taste, image-to-code, imagegen-frontend-web, imagegen-frontend-mobile, emil-design-eng, web-design-guidelines, brandkit, figma (si existe).' },
  { k: 'sistemas_calidad', t: 'better-typography, better-accessibility, better-colors, modern-css, design-tokens, core-web-vitals, tooltips, charts-graphs, astro-framework, copywriting, cro, tiptap, scientific-visualization.' },
  { k: 'movimiento_juego', t: 'gsap-core, gsap-scrolltrigger, gsap-timeline, gsap-plugins, gsap-performance, gsap-utils, gsap-frameworks, gsap-react, motion-graphics, find-animation-opportunities, review-animations, three-best-practices, webgpu-threejs-tsl, algorithmic-art, phaser, pixijs, test-playable-web-games, web-haptics, ui-sound-design (y hyperframes solo para decir si aplica a la web).' },
]
const FICHA = { type: 'object', properties: { skills: { type: 'array', items: { type: 'object', properties: {
  nombre: { type: 'string' }, existe: { type: 'boolean' }, proposito: { type: 'string' }, cuando: { type: 'string' },
  reglas_fuertes: { type: 'array', items: { type: 'string' }, description: 'prohibiciones, fuentes/paletas/técnicas impuestas, umbrales' },
  conflictos: { type: 'array', items: { type: 'object', properties: { con: { type: 'string' }, choque: { type: 'string' }, propuesta: { type: 'string' } }, required: ['con', 'choque', 'propuesta'] } },
  papel: { type: 'string', enum: ['director', 'soporte', 'especialista', 'redundante', 'fuera_de_alcance'] },
  calidad: { type: 'string', description: 'juicio honesto del valor real de la skill' } },
  required: ['nombre', 'existe', 'proposito', 'cuando', 'reglas_fuertes', 'conflictos', 'papel', 'calidad'] } } }, required: ['skills'] }

phase('Inventario')
const inv = (await parallel(LOTES.map(l => () => agent(CTX + `

TAREA: lee ENTERAS (SKILL.md y los archivos de referencia que enlacen) estas skills de ${SK}: ${l.t}
Para cada una, rellena la ficha. Busca con lupa las CONTRADICCIONES con las demás skills del inventario completo (fuentes o paletas
prohibidas frente a impuestas, «siempre GSAP» frente a «CSS nativo primero», comillas inglesas frente a españolas, umbrales distintos de
contraste o de duración de animación, flujos de trabajo incompatibles, orden de pasos) y con los 10 contratos de ARSENAL.md.`,
  { label: 'inventario:' + l.k, phase: 'Inventario', schema: FICHA })))).filter(Boolean)
const fichas = inv.flatMap(x => x.skills)
log(`Fichas: ${fichas.length}; conflictos declarados: ${fichas.reduce((a, s) => a + s.conflictos.length, 0)}`)

phase('Arquitectura')
const arq = await agent(CTX + `

TAREA: eres el ARQUITECTO del sistema integrado. Con el inventario (abajo) y la materia prima, crea la skill maestra en ${M}/ (crea la
carpeta). Debe convertir un montón de skills en UN MÉTODO que funcione en armonía:
- ${M}/SKILL.md (frontmatter name: maestro-diseno-web; description que la dispare para CUALQUIER trabajo de diseño o construcción web:
  juegos, lectura, landing, sitios de datos, apps y paneles). Cuerpo breve y operativo: el flujo único (entender → dirección de arte →
  sistema → construir → verificar → pulir), qué skill dirige en cada paso y cuáles asisten, la TABLA DE PRECEDENCIA (cuando dos skills
  chocan, cuál manda y por qué; el brief del cliente manda sobre el gusto de cualquier skill), el enrutado por TIPO DE APLICACIÓN, y los
  contratos comunes. Enlaza a reference/ para el detalle; no dupliques el contenido de las skills: remite a ellas.
- ${M}/reference/: precedencia.md (matriz de conflictos resueltos, uno por uno, con la regla que gana), flujo.md, contratos.md (tokens DTCG
  únicos también para canvas/movimiento/sonido/háptica; orden de @layer; islas con ciclo de vida y destroy(); bus de feedback único;
  una autoridad de movimiento por superficie; presupuestos de rendimiento; accesibilidad; verificación; honestidad de datos y copy),
  verificacion.md (protocolo acotado: capturas escritorio+móvil×claro+oscuro, detector de impeccable, axe, métricas de rendimiento, FPS en
  juegos; «pases acotados, no bucles»), y un archivo por tipo: tipos/landing.md, tipos/lectura.md (crea aquí la guía de LECTURA que no
  existe como skill: medida, ritmo, modos de lectura, paginación frente a scroll, anotaciones, progreso, búsqueda, EPUB), tipos/juego.md,
  tipos/datos-editorial.md (visualización y scrollytelling), tipos/app-herramienta.md (productos, paneles, formularios).
- ${M}/kits/: piezas de código mínimas, probadas y agnósticas que aplican los contratos: tokens.json (DTCG) + build a CSS; base.css con el
  orden de @layer, reset moderno, tipografía fluida y temas claro/oscuro; isla.js (plantilla de isla con carga al entrar en pantalla,
  prefers-reduced-motion, destroy()); feedback.js (bus imagen+sonido+háptica, silenciable); movimiento.css (utilidades nativas: view
  transitions, scroll-driven, @starting-style, con degradación); verificar.py (Playwright: capturas en 2 anchos × 2 temas, errores de
  consola, desbordes, axe desde jsdelivr, y llamada al detector de impeccable si existe). PRUEBA cada pieza del kit (ejecútala).
Escribe con precisión y sin relleno. Devuelve un resumen de la arquitectura y la lista de archivos.

INVENTARIO:
${JSON.stringify(fichas, null, 1)}`, { label: 'arquitecto', phase: 'Arquitectura' })

phase('Crítica')
const HALL = { type: 'object', properties: { hallazgos: { type: 'array', items: { type: 'object', properties: {
  archivo: { type: 'string' }, problema: { type: 'string' }, correccion: { type: 'string' }, gravedad: { type: 'string', enum: ['alta', 'media', 'baja'] } },
  required: ['archivo', 'problema', 'correccion', 'gravedad'] } } }, required: ['hallazgos'] }
const crit = await agent(CTX + `

TAREA: CRÍTICO ADVERSARIAL de la skill maestra en ${M}/. Léela entera y contrástala con las skills que cita (ábrelas). Busca: conflictos que
quedaron sin resolver o resueltos contra el sentido común; reglas que se contradicen entre archivos; remisiones a skills o archivos que no
existen; kits que no funcionan (EJECÚTALOS); huecos por tipo de aplicación (¿sabría hacer un juego, un lector, una landing, un sitio de
datos y una app con esto?); texto que duplica en vez de remitir; instrucciones vagas que no se pueden verificar. No edites; informa.`,
  { label: 'critico', phase: 'Crítica', schema: HALL })
const fix1 = await agent(CTX + `

TAREA: aplica a ${M}/ los hallazgos confirmados del crítico (compruébalos antes; rechaza los falsos con motivo). Devuelve qué cambió.
HALLAZGOS:
${JSON.stringify(crit ? crit.hallazgos : [], null, 1)}`, { label: 'arquitecto-correcciones', phase: 'Crítica' })

phase('Pruebas')
const DEMOS = [
  { k: 'juego', t: `un JUEGO interactivo pulido y jugable (PixiJS v8 o Phaser 4, lo que la skill recomiende), con sensación de juego (juice),
sonido y háptica por el bus de feedback, teclado + táctil, pausa, accesibilidad, guardado de récord, y datos reales si encajan (por ejemplo,
frases literales del Diario de Sesiones de 1931-1936 leídas del CSV depositado /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv,
sep ';'). Mide FPS y pruébalo con test-playable-web-games.` },
  { k: 'lectura', t: `una APLICACIÓN DE LECTURA de primer nivel para leer una sesión real del Diario de Sesiones (la del 1-X-1931, sesión 48,
legislatura 1931-1933, desde el CSV depositado /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv, sep ';': cada fila es un turno;
avisa de que el final del acta está truncado por el OCR): tipografía de lectura, modos (tamaño, interlineado, tema, fuente para dislexia),
índice de oradores, subrayados y notas guardados en local, progreso y retoma, búsqueda en el texto, acotaciones del Diario destacadas.` },
  { k: 'landing', t: `una LANDING PAGE de nivel de premio para Afinidades Elegidas (base de coautorías de las Cortes de la República,
doi:10.7910/DVN/CGOCUS V1.1, app https://rodrodr.github.io/afinidades/), con persuasión honesta: SOLO cifras verificadas desde sus archivos
(${LYT}/docs/estudio/critica/afin_*.csv y /Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/data/; 78 diputados en las tres legislaturas;
cruce de bloque 35,1/23,0/7,4 %), ningún testimonio ni logotipo inventado, héroe con movimiento con sentido, una figura interactiva y un
rendimiento excelente (LCP).` },
]
const pruebas = (await parallel(DEMOS.map(d => () => agent(CTX + `

TAREA: eres un CONSTRUCTOR que pone a prueba la skill maestra. PRIMERO lee ${M}/SKILL.md y síguela al pie de la letra (invoca las skills
que te indique con la herramienta Skill cuando corresponda). Construye ${d.t}
Hazlo en ${M}/ejemplos/${d.k}/ (autocontenido; dependencias por CDN o npm local en esa carpeta, sin dejar node_modules pesados: si usas npm,
genera un build estático y borra node_modules). Verifica con el protocolo de la skill (kits/verificar.py): capturas escritorio y móvil en
los dos temas, consola limpia, axe, detector de impeccable, rendimiento; MIRA las capturas y haz UNA ronda de corrección.
Escribe ${M}/ejemplos/${d.k}/FRICCIONES.md: dónde la skill maestra fue confusa, contradictoria, incompleta o equivocada, con la mejora
exacta que propones. Devuelve un resumen, las rutas de las capturas y las fricciones.`, { label: 'demo:' + d.k, phase: 'Pruebas' }).then(r => ({ k: d.k, r }))))).filter(Boolean)

phase('Corregir')
const fin = await agent(CTX + `

TAREA: integra en ${M}/ las FRICCIONES de las tres demos (${M}/ejemplos/*/FRICCIONES.md y los informes de abajo): corrige la skill, sus
referencias y sus kits para que la próxima construcción no tropiece en lo mismo; añade a cada tipo de aplicación un enlace a su demo como
implementación de referencia. Comprueba que ${M}/SKILL.md sigue siendo breve y operativo y que todas las rutas que cita existen.
Añade ${M}/CHANGELOG.md. Devuelve un resumen final de 15 líneas: qué hace la skill, qué integra, cómo se resolvieron los conflictos
principales y qué queda abierto.

INFORMES DE LAS DEMOS:
${pruebas.map(p => '### ' + p.k + '\n' + p.r).join('\n\n')}`, { label: 'integrar-fricciones', phase: 'Corregir' })

return { fichas: fichas.length, hallazgos: crit ? crit.hallazgos.length : 0, demos: pruebas.map(p => p.k), resumen: fin }
