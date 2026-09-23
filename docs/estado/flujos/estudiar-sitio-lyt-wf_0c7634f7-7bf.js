export const meta = {
  name: 'estudiar-sitio-lyt',
  description: 'Estudio paralelo: ParlaIbero (proceso, código, sitio vivo) y material verificado de Luz y Taquígrafos, para planificar un sitio multipágina',
  phases: [
    { title: 'Estudiar', detail: 'seis lectores independientes, cada uno con su informe en disco' },
    { title: 'Criticar', detail: 'un crítico de completitud sobre los seis informes' },
  ],
}

const S = '/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/sitio'
const COMUN = `
CONTEXTO. Rodrigo Rodrigues-Silveira (Universidad de Salamanca) quiere un SITIO DE PRESENTACIÓN multipágina para la base
de datos histórica «Luz y Taquígrafos» (Diarios de Sesiones del Congreso de la Segunda República española, 1931–1945;
Harvard Dataverse doi:10.7910/DVN/THQCMI, V2.0, 107.551 filas; explorador web https://rodrodr.github.io/luz_explorer/
que sirve una matriz resegmentada v3 SIN DEPOSITAR de 121.700 filas; base derivada Afinidades Elegidas doi:10.7910/DVN/CGOCUS,
app https://rodrodr.github.io/afinidades/). Hasta ahora se le hizo una landing de UNA sola página
(/Users/rodrodr/Dropbox/Apps/aecpa2026/out/landing.html, fuentes en /Users/rodrodr/Dropbox/Apps/aecpa2026/landing/) y la
rechazó: «reducir la landing a una sola página restringe mucho las posibilidades y genera una interfaz demasiado cluttered;
se hizo algo mucho mejor en la landing de ParlaIbero (https://rodrodr.github.io/parlaibero/es); la actual es muy pobre, no hay
gráficos interactivos, todo tiene que caber en una sola página y resume demasiado cosas que no debería resumir».
ParlaIbero (otro proyecto suyo, DISTINTO pero hermano) tiene su código en /Users/rodrodr/Dropbox/Apps/parlaibero_site
(Astro estático, sin framework de cliente, docs de plan/narrativa/copy en docs/, figuras interactivas en src/components y src/viz).

REGLAS DURAS para Luz y Taquígrafos (LyT):
- NADA del prototipo de 1931: el grafo anotado del debate constituyente (90 sesiones, 3.874 nodos, 324 oradores), su libro
  de códigos (defiende/critica/menciona), actos afectivos (ironía, hostilidad…), «intensidad». No es el corpus; no se usa.
- Solo cifras verificadas sobre la fuente, con procedencia. Distinguir SIEMPRE V2 depositada (107.551) y v3 del explorador
  (121.700, sin depositar, ids renumerados).
- No prometer lo que el explorador publicado no hace hoy: la cabecera de sesión NO muestra Diario/páginas/Presidencia/Gobierno
  (el sidecar no se aplica); «Mismo diputado» es léxico (bm25), no semántico; no hay búsqueda por significado, ni comodín en el
  buscador principal, ni NOT, ni proximidad.
- Español de España. Estética preferida por el investigador: oscura editorial (crema sobre casi negro, oro de acento, serif
  cursiva de display) con tema claro; la portada actual (hemiciclo del Congreso con las minorías de 1936 según Gil Robles, SVG
  generado por /Users/rodrodr/Dropbox/Apps/aecpa2026/landing/hero_svg.py) le parece «perfecta» y se conserva.
- No inventes. Si algo no se puede verificar, dilo como tal.

ENTREGA: escribe tu informe COMPLETO en Markdown en el fichero indicado (crea el directorio si hace falta) y devuelve como
respuesta final ese mismo informe completo. Sé exhaustivo y concreto: rutas, nombres de componentes, cifras con su fuente.`

const TAREAS = [
  { k: 'parla_proceso', f: 'estudio_parla_proceso.md', p: `TAREA: estudia el PROCESO y la NARRATIVA de ParlaIbero para extraer lo transferible a LyT.
Lee enteros /Users/rodrodr/Dropbox/Apps/parlaibero_site/README.md, docs/00_PLAN_landing.md, docs/01_NARRATIVA_landing.md,
docs/02_COPY_es.md (y ojea 02a_MARCADORES.md y CHANGELOG.md). Extrae:
1) la arquitectura de páginas (cada plantilla: propósito, público, movimientos/secciones en orden, presupuesto de palabras,
   figuras, llamadas a la acción), la navegación (pestañas, índice lateral, banda fija) y el «camino ligero»/escalera de descarga;
2) las reglas editoriales (p. ej. cifra con denominador, límite en la misma frase, el método pegado a un hecho, nada de
   «innovador», el fragmento como argumento…) y los ANTIPATRONES que el investigador rechazó y por qué;
3) el proceso por puertas (narrativa → copy congelado → construcción → revisión) y qué se aprueba en cada una;
4) cómo es cada página de profundidad (Metodología ≈1.500-1.800 palabras, Usar los datos, Instituciones, Explorador con
   capturas reales, fichas) — qué contenido lleva cada una, con ejemplos literales cortos del copy.
5) Una tabla «qué se transfiere a LyT / qué no (y por qué)». Ojo: la regla de ParlaIbero de no nombrar a parlamentarios
   es una directiva para ESE proyecto (datos contemporáneos); señala que en LyT es una decisión abierta para el investigador.
Informe en ${S}/estudio_parla_proceso.md` },
  { k: 'parla_codigo', f: 'estudio_parla_codigo.md', p: `TAREA: estudia el CÓDIGO del sitio de ParlaIbero como arquitectura reutilizable para LyT.
Lee /Users/rodrodr/Dropbox/Apps/parlaibero_site/astro.config.mjs, package.json, src/layouts/Base.astro, src/styles/base.css,
src/lib/*.ts, TODOS los componentes de src/components (incluidos inicio/ y ficha/), src/viz/**, src/pages/**, scripts/*.mjs,
tests/*.spec.ts. Explica con precisión:
1) cómo se hace cada figura interactiva SIN framework (FigVoz, FigRejilla, FigTermino, TiraAnual, VozDecadas…): SVG emitido
   en build + script de isla, eventos hover/foco/clic, teclado, tooltips, pestañas Gráfico·Tabla·Descargar, fallback sin JS,
   datos de figura descargables (src/pages/datos/*.ts genera CSV/SVG/PNG/léame), tamaños;
2) el sistema de cifras con procedencia (cifras.ts, <data class="cifra" data-k>, audit-cifras.mjs) y el de textos (i18n
   desde docs/02_COPY_es.md con copy2i18n.py);
3) componentes de navegación/lectura (IndiceLateral, Pestanas, Escalera, Salidas, BandaCTA, Captura, Columnas, Cita) y qué
   resuelve cada uno;
4) tokens de diseño, tipografías autoalojadas, modo claro/oscuro, movimiento;
5) pruebas (humo, sinjs, solapes) y puertas del build.
6) Propón una ARQUITECTURA TÉCNICA para el sitio LyT que reutilice lo mejor (misma pila Astro), qué se copia tal cual, qué se
   adapta (p. ej. su tema oscuro editorial oro/crema en vez del granate; i18n: ¿solo español al principio?), qué sobra
   (AEI solo si el investigador confirma financiación), y una estimación del trabajo por pieza.
Informe en ${S}/estudio_parla_codigo.md` },
  { k: 'parla_vivo', f: 'estudio_parla_vivo.md', p: `TAREA: recorre el SITIO PUBLICADO de ParlaIbero como lo vería un lector y describe por qué funciona mejor que una
landing de una sola página. Usa Playwright en Python (python3; la librería está instalada; chromium headless) para abrir y
capturar a 1440 px y a 390 px, en tema claro y oscuro si hay conmutador: https://rodrodr.github.io/parlaibero/es/ ,
/es/paises/ , una ficha (/es/paises/es/ y /es/paises/sv/), /es/metodologia/ , /es/usar/ , /es/instituciones/ , /es/explorador/ .
Guarda capturas en ${S}/capturas_parla/ (a pantalla completa y por secciones) y MÍRALAS (léelas como imágenes). Para cada
página: estructura visual de arriba abajo, densidad (palabras aproximadas, nº de figuras), qué es interactivo y cómo responde
(prueba hover/clic/teclado en las figuras con Playwright y describe el resultado), navegación entre páginas, llamadas a la
acción, cómo evita el «cluttered» (espacio, jerarquía, una idea por bloque, pestañas, índices), y detalles de oficio
(microtipografía, leyendas, rótulos, estados vacíos). Termina con una lista priorizada de 15-25 patrones concretos que el
sitio LyT debería adoptar, cada uno con la página de ParlaIbero donde se ve.
Informe en ${S}/estudio_parla_vivo.md (con rutas de las capturas relevantes)` },
  { k: 'lyt_datos', f: 'estudio_lyt_datos.md', p: `TAREA: haz el INVENTARIO DE DATOS Y HECHOS VERIFICABLES de LyT disponibles para figuras INTERACTIVAS y para el copy
de un sitio multipágina. Fuentes (léelas; recalcula lo que puedas):
- /private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/landing/investigacion.json
  (síntesis contrastada: metodologia, explorador, limites_corpus, contradicciones, cifras_verificadas — ÚSALA como base);
- /Users/rodrodr/Dropbox/Apps/aecpa2026/landing/datos_explorador.json y agregados_corpus.json;
- el CSV DEPOSITADO V2 /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv (sep ';', QUOTE_ALL, UTF-8, 14 columnas;
  pandas lo lee con pd.read_csv(f, sep=';')) — es la fuente reproducible preferida para figuras del sitio;
- la base v3 del explorador: .../scratchpad/landing/corpus/corpus.sqlite (tabla speeches, FTS5 speeches_fts) y el rol de
  Presidencia por fila en .../scratchpad/landing/clima/*.jsonl (campo chair, calculado con el motor del explorador);
- README depositado /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/Luz_y_Taquigrafos_README.txt, changelogs en
  /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/Dataverse_V2_2026-09-15/, documentación del explorador en
  /Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Explorer/ (README.md, tools/*.md, docs/);
- Afinidades Elegidas: /Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/data/*.json.
Produce: (1) catálogo de 15-25 FIGURAS INTERACTIVAS candidatas para el sitio, cada una con: pregunta que responde, dato exacto
(fichero/consulta), fuente V2 o v3, granularidad (sesión/mes/año/legislatura/diputado/partido), interacción propuesta (hover,
filtro por legislatura, búsqueda de un término, clic → abre el explorador), tamaño del JSON, riesgo o salvedad (p. ej. la
Presidencia se atribuye al partido de quien preside; ideología asignada por partido; cobertura desigual; guerra y exilio casi
sin texto). Incluye ideas como: calendario de las 755 sesiones (una celda por sesión, color por palabras), curvas de términos
(tipo Ngram) con una lista curada de términos históricos precalculados por mes, ranking de oradores sin Presidencia, reparto
por familia/ideología por legislatura, longitud de las intervenciones, clima de sala (acotaciones) por sesión, las 31
bibliotecas del proyecto, red de Afinidades por legislatura… CALCULA de verdad 4-6 de ellas sobre el CSV V2 y guarda los JSON
en ${S}/datos/ para demostrar viabilidad (con script reproducible en ${S}/datos/calc_*.py).
(2) Tabla de HECHOS verificados útiles para el copy (cifra, significado, fuente, V2/v3), y (3) lista de lo que NO debe usarse
(prototipo, cifras sin respaldo como «34 millones de palabras», contradicciones abiertas).
Informe en ${S}/estudio_lyt_datos.md` },
  { k: 'lyt_relato', f: 'estudio_lyt_relato.md', p: `TAREA: reúne el MATERIAL NARRATIVO de LyT para un sitio multipágina (no una sola página).
Lee: la landing actual y su contenido (/Users/rodrodr/Dropbox/Apps/aecpa2026/landing/contenido.json, out/landing.html), la
presentación scrollytelling (/Users/rodrodr/Dropbox/Apps/aecpa2026/lyt_src/ — lyt_src.html, scenes/*.js, CONTRACT*.md — y
out/presenta.html), el guion del vídeo (/Users/rodrodr/Dropbox/Apps/aecpa2026/video/, busca guion/texto/srt), y la memoria del
proyecto (/Users/rodrodr/.claude/projects/-Users-rodrodr-Dropbox-Apps-aecpa2026/memory/*.md). Extrae:
1) la espina narrativa que ya aprobó el investigador (pregunta → fuente → fila → … ) SIN el prototipo de 1931;
2) el contexto histórico que el sitio debe contar con amplitud y no resumido (qué decidieron las Constituyentes, la legislatura
   de 1933, la de 1936, la guerra, el exilio en México en 1945, qué es un Diario de Sesiones, la fórmula «luz y taquígrafos»),
   señalando qué afirmaciones históricas están en el material y cuáles habría que verificar;
3) escenas de la presentación que usan el CORPUS PRINCIPAL o Afinidades (no el prototipo) y podrían convertirse en figuras
   interactivas del sitio (con su fichero de escena y sus datos);
4) momentos/ejemplos concretos del corpus ya verificados (p. ej. Campoamor 1-oct-1931, Azaña 13-oct-1931 «España ha dejado de
   ser católica», Estatuto de Cataluña 27-may-1932, Casas Viejas 1933, las sesiones de México 1945) utilizables como «puertas»
   de lectura, con lo que está verificado de cada uno;
5) Afinidades Elegidas: su historia (tres legislaturas, cruce de bloques, aislados) y qué merece página propia.
Informe en ${S}/estudio_lyt_relato.md` },
  { k: 'lyt_explorador', f: 'estudio_lyt_explorador.md', p: `TAREA: prepara el material para una PÁGINA «EXPLORADOR» del sitio LyT al estilo de la de ParlaIbero
(/Users/rodrodr/Dropbox/Apps/parlaibero_site/src/pages/[lang]/explorador.astro y su copy §8 en docs/02_COPY_es.md: funciones
con CAPTURAS REALES). Abre con Playwright en Python (chromium headless) https://rodrodr.github.io/luz_explorer/ ; la primera carga
descarga ~111 MB y construye la base en el navegador: espera lo necesario (hasta varios minutos; comprueba que la lista de
resultados aparece). Reproduce y CAPTURA a 1440×900 (y alguna a 390 px) estos estados, guardando PNG en ${S}/capturas_explorador/:
(a) estado inicial con el espectro ideológico; (b) búsqueda "voto femenino" | "voto de la mujer" con resultados; (c) el lector
de la intervención de Clara Campoamor del 1-oct-1931 (id v3 6079) con sus acotaciones coloreadas; (d) la sesión corrida (tecla s);
(e) el careo (tecla c); (f) Tendencia (tecla t) con "casas viejas"; (g) añadir la biblioteca del proyecto «Debate · Sufragio
femenino» y abrir Léxico; (h) Coocurrencias y temas; (i) Menciones; (j) el diálogo de exportación; (k) el panel «Sobre este
corpus». Si un estado no se alcanza, dilo y explica por qué. MIRA cada captura y describe lo que se ve realmente. Para cada
función: qué hace (comprobado en la interfaz), el ejemplo real con sus cifras tal como aparecen en pantalla, y las salvedades.
Contrasta con la sección «explorador» de investigacion.json
(/private/tmp/claude-501/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0/scratchpad/landing/investigacion.json)
y señala discrepancias. NO modifiques nada del explorador ni del proyecto.
Informe en ${S}/estudio_lyt_explorador.md` },
]

phase('Estudiar')
const informes = await parallel(TAREAS.map(t => () =>
  agent(COMUN + '\n\n' + t.p, { label: t.k, phase: 'Estudiar' })
    .then(r => ({ k: t.k, f: `${S}/${t.f}`, ok: !!r, largo: r ? r.length : 0 }))))

phase('Criticar')
const critica = await agent(COMUN + `

TAREA: eres el CRÍTICO DE COMPLETITUD. Lee los informes ya escritos en ${S}/ (estudio_*.md) y responde: ¿qué falta para poder
diseñar con garantías un sitio multipágina de LyT tan bueno o mejor que el de ParlaIbero? Lista huecos concretos (fuente no leída,
cifra sin verificar, figura sin datos calculados, página de ParlaIbero no analizada, estado del explorador no capturado,
contradicción entre informes) y, para los 5 más importantes, CIÉRRALOS tú mismo ahora (lee, calcula, captura) y documenta el
resultado. Escribe ${S}/estudio_critica.md y devuélvelo.`, { label: 'critico', phase: 'Criticar' })

return { informes, critica_largo: critica ? critica.length : 0 }
