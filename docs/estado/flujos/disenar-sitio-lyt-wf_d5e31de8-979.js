export const meta = {
  name: 'disenar-sitio-lyt',
  description: 'Jurado de tres arquitecturas para el sitio multipágina de Luz y Taquígrafos, síntesis en plan y narrativa, verificación adversarial y corrección',
  phases: [
    { title: 'Proponer', detail: 'tres arquitectos independientes, cada uno desde un ángulo' },
    { title: 'Juzgar', detail: 'tres jueces con lentes distintas puntúan las tres propuestas' },
    { title: 'Sintetizar', detail: 'plan y narrativa en luz_site/docs' },
    { title: 'Verificar', detail: 'tres revisores adversariales' },
    { title: 'Corregir', detail: 'aplicar lo confirmado' },
  ],
}

const D = '/Users/rodrodr/Dropbox/Apps/luz_site/docs'
const E = D + '/estudio'
const CTX = `
CONTEXTO. Rodrigo Rodrigues-Silveira (Universidad de Salamanca) necesita el SITIO DE PRESENTACIÓN, multipágina, de la base
histórica «Luz y Taquígrafos» (LyT): Diarios de Sesiones del Congreso de la Segunda República española, 1931–1945. Depósito:
Harvard Dataverse doi:10.7910/DVN/THQCMI, V2.0 (15-09-2026), un CSV de 107.551 filas. Explorador en el navegador
https://rodrodr.github.io/luz_explorer/ (sirve la matriz resegmentada v3, 121.700 filas, SIN depositar). Base derivada
Afinidades Elegidas doi:10.7910/DVN/CGOCUS (V1.1) y app https://rodrodr.github.io/afinidades/.

LO QUE RECHAZÓ (su crítica literal a la landing de una página, /Users/rodrodr/Dropbox/Apps/aecpa2026/out/landing.html):
«¿Por qué estás reduciendo el landing a una sola página? Esto restringe mucho las posibilidades y genera una interfaz demasiado
cluttered. Se hizo algo mucho mejor en la landing page de ParlaIbero (https://rodrodr.github.io/parlaibero/es). La actual aún es
muy pobre. No hay gráficos interactivos, la organización hace con que todo tenga que caber en una sola página y resume demasiado
cosas que no debería resumir.»
Su memoria de preferencias: narrativa primero (pregunta, tensión, resolución) y después gráficos; visualizaciones con DATOS
REALES, nunca ilustrativas; cifras verificadas sobre la fuente; estética oscura editorial (crema sobre casi negro, oro de acento,
serif cursiva de display) con tema claro. La portada con el hemiciclo del Congreso y las minorías de 1936 según Gil Robles
(/Users/rodrodr/Dropbox/Apps/aecpa2026/landing/hero_svg.py) le parece «perfecta»: se conserva como portada de Inicio.

DECISIONES YA TOMADAS POR ÉL (22-09-2026): español e inglés (el español se congela antes de traducir); repositorio propio en
/Users/rodrodr/Dropbox/Apps/luz_site (hermano de /Users/rodrodr/Dropbox/Apps/parlaibero_site); SIN mención de financiación;
SÍ se nombra a los diputados (figuras históricas). Pila: Astro estático sin framework de cliente, reutilizando el esqueleto de
ParlaIbero (salvo que una propuesta justifique otra cosa).

ESTUDIO PREVIO — LÉELO ENTERO antes de proponer (es tu base de hechos; no inventes fuera de él sin verificarlo tú):
${E}/estudio_critica.md (veredicto, discrepancias cerradas, decisiones abiertas D-1…D-7 — PREVALECE sobre los demás si chocan)
${E}/estudio_parla_proceso.md (proceso por puertas, plantillas, reglas editoriales, antipatrones de ParlaIbero)
${E}/estudio_parla_vivo.md (ParlaIbero leído como lector, con capturas en /private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio/capturas_parla/)
${E}/estudio_parla_codigo.md (código de ParlaIbero y propuesta técnica para LyT)
${E}/estudio_lyt_datos.md (25 figuras candidatas F01–F25 con datos calculados en ${E}/datos/*.json; hechos verificados; lo vetado)
${E}/estudio_lyt_relato.md (espina narrativa, contexto histórico con marcas de verificación, 16 puertas de lectura, Afinidades)
${E}/estudio_lyt_explorador.md (cada función del explorador con 54 capturas reales en ${E}/capturas_explorador/)
Datos primarios si necesitas comprobar algo: CSV V2 /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv (sep ';');
base v3 /Users/rodrodr/.cache/luz_site/corpus.sqlite (tabla speeches, FTS5 speeches_fts); rol de Presidencia por fila en
/Users/rodrodr/.cache/luz_site/clima/*.jsonl (campo chair); ParlaIbero en /Users/rodrodr/Dropbox/Apps/parlaibero_site.

REGLAS DURAS: nada del prototipo de 1931 (grafo anotado, libro de códigos, posturas, actos afectivos, ironía, intensidad, 90
sesiones/3.874 nodos); ninguna cifra sin fuente ni sin su base (V2 o v3) y su denominador; no prometer lo que el explorador no hace
(no hay enlaces profundos: una URL no abre una búsqueda ni una intervención; la cabecera de sesión no muestra Diario/páginas/
Presidencia/Gobierno; «Mismo diputado» es léxico; no hay búsqueda semántica, comodín en el buscador, NOT ni proximidad); la sesión
del 1-X-1931 está truncada al final en el acta digitalizada; «34 millones de palabras» vetado; 78 (no 80) diputados en las tres
legislaturas de Afinidades; Afinidades V1.1 depositada frente a v2 corregida sin depositar. Español de España, sin anglicismos
innecesarios; prohibido «innovador» y el tono de folleto.`

const ANGULOS = [
  { k: 'historia', t: `ÁNGULO: EL LECTOR DE HISTORIA. Diseña el sitio para que un historiador, un profesor o un lector culto entre por la
historia de las Cortes y descubra la base. Piensa el equivalente LyT de las «fichas de país» de ParlaIbero: por ejemplo fichas por
legislatura (Constituyentes 1931-33, 1933-35, 1936 y la guerra, el exilio de 1945), y «puertas de lectura» (sesiones/debates
memorables verificados) que llevan al explorador. Que el contexto histórico se cuente con amplitud, no resumido.` },
  { k: 'datos', t: `ÁNGULO: QUIEN USA LOS DATOS. Diseña el sitio para investigadores de ciencia política, historia cuantitativa y humanidades
digitales que deciden si usar la base y cómo: método de profundidad (sin resumir: OCR, segmentación, vinculación, revisión,
auditoría de fechas, resegmentación v3), usar los datos (diccionario de las 14 variables con sus trampas de SIGNIFICADO, unión con
Afinidades, fragmentos R/Python probados, versiones y cita), límites, escalera de descarga con datos de cada figura sin formulario,
página del explorador con capturas reales, y Afinidades como base derivada con su página.` },
  { k: 'interactivo', t: `ÁNGULO: PERIODISMO DE DATOS INTERACTIVO (tipo The Pudding / ParlaIbero). Diseña el sitio a partir de sus FIGURAS
INTERACTIVAS con datos reales: qué 6-10 figuras justifican el sitio (p. ej. calendario/rejilla de las 755 sesiones, curvas de términos
precalculadas tipo Ngram, quién habla sin la Presidencia, trámite frente a discurso, clima de sala, votaciones nominales escogidas,
tres redes de Afinidades), en qué página vive cada una, qué pregunta responde, qué interacción ofrece (hover/foco con cifra y
denominador, filtros por legislatura, búsqueda en una lista precalculada, clic → copiar consulta para el explorador), con pestañas
Gráfico · Tabla · Datos y funcionamiento sin JS, y cómo cada figura lleva a una página de profundidad.` },
]

const FORMATO = `
ENTREGA una PROPUESTA COMPLETA en Markdown (en español) con:
1. Tesis del sitio en una frase y el porqué de su organización (respuesta explícita a cada punto de la crítica del investigador).
2. MAPA DEL SITIO: cada página/plantilla con ruta, propósito, público, y su esqueleto de arriba abajo (movimientos/secciones en orden),
   presupuesto de palabras, figuras (con id F.. del estudio o nueva, dato exacto y fichero, interacción), llamadas a la acción.
   Incluye navegación global (cabecera, pestañas, índice lateral, banda fija, pie) y cómo se evita el amontonamiento.
3. Para Inicio: los movimientos concretos tras el hemiciclo, con la cifra de cada uno y su salvedad en la misma frase.
4. Figuras: tabla con pregunta, dato (fichero ya calculado o consulta exacta), base V2/v3, interacción, versión sin JS, riesgo.
5. La escalera de descarga y el trato del formulario de Dataverse.
6. Qué contenido se amplía respecto a la landing rechazada y dónde (lista concreta: lo que allí se resumía y aquí tiene página o
   sección propia).
7. Qué decisiones D-1…D-7 del estudio resuelves y cómo (con tu recomendación) y cuáles quedan para el investigador.
8. Riesgos y estimación de trabajo por pieza.
Sé concreto y fiel al estudio. Tu respuesta final ES la propuesta.`

const JUECES = [
  { k: 'critica', t: `LENTE DEL JUEZ: RESPUESTA A LA CRÍTICA Y ALTURA DE PARLAIBERO. ¿Deja de ser «una sola página»? ¿Evita el amontonamiento?
¿Deja de resumir lo que no debe resumirse (método, explorador, uso de datos, contexto histórico, límites, Afinidades)? ¿Tiene gráficos
interactivos que justifican el sitio? ¿Iguala o supera al sitio de ParlaIbero en profundidad y oficio (compáralo con estudio_parla_vivo.md
y estudio_parla_proceso.md)? ¿Respeta «narrativa primero»?` },
  { k: 'verdad', t: `LENTE DEL JUEZ: VERDAD Y VIABILIDAD DE LOS DATOS. Para cada figura y cada cifra propuesta: ¿existe el dato (fichero
calculado en ${E}/datos/ o en critica/) o se puede calcular sin ambigüedad? ¿Declara base V2/v3 y denominador? ¿Choca con alguna regla
dura (prototipo, promesas del explorador, sesión 48 truncada, 34 M, 78/80, Afinidades V1.1/v2, Presidencia inflada)? Comprueba en las
fuentes al menos 8 cifras clave de cada propuesta (lee los JSON o consulta el CSV/SQLite) y penaliza lo inventado o no verificable.` },
  { k: 'lectura', t: `LENTE DEL JUEZ: ARQUITECTURA DE INFORMACIÓN, LECTURA Y COSTE. ¿La navegación es clara y cada página tiene un propósito
y un público? ¿Cada bloque dice una sola cosa? ¿Funciona en móvil (360-390 px) y sin JS? ¿Es accesible (teclado, contraste, tablas
equivalentes)? ¿El coste de construcción es realista (compárese con la estimación de estudio_parla_codigo.md §6.10) y la propuesta se
puede construir por piezas reutilizando el código de ParlaIbero?` },
]

const PUNTOS = {
  type: 'object',
  properties: {
    evaluaciones: { type: 'array', items: { type: 'object', properties: {
      propuesta: { type: 'string', enum: ['historia', 'datos', 'interactivo'] },
      puntuacion: { type: 'number', description: '0-10' },
      fortalezas: { type: 'array', items: { type: 'string' } },
      defectos: { type: 'array', items: { type: 'string' } },
      injertar: { type: 'array', items: { type: 'string' }, description: 'ideas concretas de esta propuesta que la síntesis debe conservar' },
    }, required: ['propuesta', 'puntuacion', 'fortalezas', 'defectos', 'injertar'] } },
    cifras_comprobadas: { type: 'array', items: { type: 'object', properties: {
      cifra: { type: 'string' }, propuesta: { type: 'string' }, correcta: { type: 'boolean' }, nota: { type: 'string' } },
      required: ['cifra', 'propuesta', 'correcta', 'nota'] } },
    recomendacion: { type: 'string', description: 'cómo debería ser la síntesis, en un párrafo' },
  },
  required: ['evaluaciones', 'cifras_comprobadas', 'recomendacion'],
}

phase('Proponer')
const props = await parallel(ANGULOS.map(a => () =>
  agent(CTX + '\n\n' + a.t + '\n' + FORMATO, { label: 'arquitecto:' + a.k, phase: 'Proponer' })
    .then(txt => ({ k: a.k, txt }))))
const P = props.filter(p => p && p.txt)
log(`Propuestas recibidas: ${P.map(p => p.k).join(', ')}`)
const bloque = P.map(p => `\n\n======== PROPUESTA «${p.k}» ========\n${p.txt}`).join('')

phase('Juzgar')
const votos = (await parallel(JUECES.map(j => () =>
  agent(CTX + '\n\n' + j.t + '\n\nPuntúa las tres propuestas siguientes (0-10), con fortalezas, defectos y las ideas que la síntesis debe injertar de cada una.' + bloque,
    { label: 'juez:' + j.k, phase: 'Juzgar', schema: PUNTOS })))).filter(Boolean)
const tabla = {}
for (const v of votos) for (const e of v.evaluaciones) (tabla[e.propuesta] = tabla[e.propuesta] || []).push(e.puntuacion)
const medias = Object.fromEntries(Object.entries(tabla).map(([k, xs]) => [k, xs.reduce((a, b) => a + b, 0) / xs.length]))
log('Medias: ' + JSON.stringify(medias))

phase('Sintetizar')
const sintesis = await agent(CTX + `

TAREA: eres el SINTETIZADOR. Tienes tres propuestas y el veredicto de tres jueces (abajo). Construye la mejor arquitectura partiendo de la
propuesta mejor puntuada (medias: ${JSON.stringify(medias)}) e injertando lo que los jueces mandan conservar de las otras; corrige los
defectos y las cifras que los jueces marcaron como incorrectas.
ESCRIBE dos documentos, en español, con el rigor y el formato de los de ParlaIbero (/Users/rodrodr/Dropbox/Apps/parlaibero_site/docs/00_PLAN_landing.md
y 01_NARRATIVA_landing.md: léelos para imitar su estructura, sus tablas y su nivel de detalle):
  ${D}/00_PLAN_sitio.md — estado y puertas; contexto; decisiones tomadas (las del investigador, con fecha) y decisiones ABIERTAS en una tabla
  con opciones y la recomendada primero (D-1 base de figuras V2/v3, D-3 Afinidades V1.1/v2, D-4 enlaces profundos, D-5 qué abre tras el
  hemiciclo, D-6 rótulo 1933-1935/1936, y las que no bloquean); reglas editoriales; MAPA DEL SITIO con cada plantilla (ruta ES y EN, propósito,
  público, movimientos en orden, presupuesto de palabras, figuras, llamadas); especificación de CADA FIGURA interactiva (pregunta, dato y
  fichero, base, codificación, interacción de ratón/teclado/táctil, pestañas Gráfico·Tabla·Datos, versión sin JS, datos descargables, salvedad
  rotulada); escalera de descarga y formulario; datos: de dónde sale cada cifra y el exportador (scripts reproducibles que leen el CSV V2 y la base
  v3 y escriben src/data/); tabla de discrepancias cerrada (regla para el copy); diseño visual (tokens oscuro editorial oro/crema y claro,
  tipografías, movimiento); arquitectura técnica (árbol de luz_site, qué se copia de ParlaIbero, i18n ES/EN, pruebas y puertas del build);
  plan de trabajo por etapas con estimación; riesgos.
  ${D}/01_NARRATIVA_sitio.md — la narrativa página a página para la Puerta 1: la pregunta y el arco de cada página, beat a beat, con los
  hechos y ejemplos verificados que usa (con su id V2/v3 o su fichero y su salvedad en la misma frase), qué dice cada figura, y qué NO se dice.
  Que se note que el contenido NO está resumido donde no debe: método, explorador, uso de datos, contexto histórico por legislatura, límites
  y Afinidades tienen su espacio. Inicio es la puerta, breve y clara; la profundidad vive en sus páginas.
Al final, devuelve un resumen de 15-25 líneas de lo que has decidido y por qué.
` + bloque + '\n\n======== VEREDICTOS ========\n' + JSON.stringify(votos, null, 1), { label: 'sintetizador', phase: 'Sintetizar' })

phase('Verificar')
const LENTES = [
  { k: 'hechos', t: `Comprueba CADA cifra, fecha, id y afirmación histórica o técnica de ${D}/00_PLAN_sitio.md y ${D}/01_NARRATIVA_sitio.md contra
las fuentes (JSON del estudio, CSV V2, base v3, depósitos). Recalcula lo que puedas. Informa solo errores reales, con la corrección exacta.` },
  { k: 'reglas', t: `Busca en ${D}/00_PLAN_sitio.md y ${D}/01_NARRATIVA_sitio.md cualquier violación de las REGLAS DURAS (prototipo, promesas del
explorador, enlaces profundos, sesión 48, 34 M, 78/80, base V2/v3 sin rotular, Afinidades V1.1/v2, Presidencia inflada, nombres con grafía
incorrecta, «innovador», tono de folleto), cualquier contradicción interna entre los dos documentos y cualquier punto donde se vuelva a
RESUMIR lo que el investigador pidió no resumir o a amontonar en una página.` },
  { k: 'viabilidad', t: `Evalúa si ${D}/00_PLAN_sitio.md se puede CONSTRUIR tal cual: cada figura tiene datos y geometría factibles, cada componente
tiene su equivalente o su adaptación en /Users/rodrodr/Dropbox/Apps/parlaibero_site, el i18n ES/EN y las pruebas están bien planteados,
las estimaciones son realistas, y no falta ninguna pieza (404, selector de lengua, imágenes sociales, sitemap, JSON-LD de los dos
conjuntos, favicon, datos de figura descargables). Señala huecos y errores concretos.` },
]
const HALLAZGOS = { type: 'object', properties: { hallazgos: { type: 'array', items: { type: 'object', properties: {
  documento: { type: 'string' }, donde: { type: 'string' }, problema: { type: 'string' }, correccion: { type: 'string' },
  gravedad: { type: 'string', enum: ['alta', 'media', 'baja'] } }, required: ['documento', 'donde', 'problema', 'correccion', 'gravedad'] } } },
  required: ['hallazgos'] }
const revs = (await parallel(LENTES.map(l => () =>
  agent(CTX + '\n\nTAREA: eres un REVISOR ADVERSARIAL. ' + l.t + ' No modifiques los documentos.', { label: 'revisor:' + l.k, phase: 'Verificar', schema: HALLAZGOS })
    .then(r => r ? r.hallazgos.map(h => ({ ...h, lente: l.k })) : [])))).flat()
log(`Hallazgos: ${revs.length} (${revs.filter(h => h.gravedad === 'alta').length} de gravedad alta)`)

phase('Corregir')
const correccion = revs.length ? await agent(CTX + `

TAREA: aplica a ${D}/00_PLAN_sitio.md y ${D}/01_NARRATIVA_sitio.md los hallazgos de los revisores (abajo). Antes de aplicar cada uno,
compruébalo tú en la fuente: si es correcto, corrígelo; si es falso, no lo apliques y anótalo. Añade al final de 00_PLAN_sitio.md un anexo
«Revisión adversarial (22-09-2026)» con la lista de hallazgos: aplicado / rechazado y por qué. Devuelve un resumen de lo cambiado.

HALLAZGOS:
${JSON.stringify(revs, null, 1)}`, { label: 'corrector', phase: 'Corregir' }) : 'sin hallazgos'

return { medias, sintesis, hallazgos: revs.length, altas: revs.filter(h => h.gravedad === 'alta').length, correccion }
