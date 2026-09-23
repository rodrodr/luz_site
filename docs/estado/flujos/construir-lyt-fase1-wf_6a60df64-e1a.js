export const meta = {
  name: 'construir-lyt-fase1',
  description: 'Fase 1 del sitio Luz y Taquígrafos: andamiaje Astro, exportador, copy en español por grupos, grafías y capturas, en paralelo',
  phases: [
    { title: 'Cimientos', detail: 'diez dueños en paralelo, cada uno con sus archivos' },
    { title: 'Revisar', detail: 'crítico de coherencia entre copy, marcadores y exportador' },
  ],
}

const R = '/Users/rodrodr/Dropbox/Apps/luz_site'
const CTX = `
Eres parte del equipo que construye el SITIO MULTIPÁGINA de «Luz y Taquígrafos» (Diarios de Sesiones del Congreso de la
Segunda República, 1931–1945; Harvard Dataverse doi:10.7910/DVN/THQCMI V2.0; explorador https://rodrodr.github.io/luz_explorer/;
Afinidades Elegidas doi:10.7910/DVN/CGOCUS V1.1). El investigador, Rodrigo Rodrigues-Silveira, rechazó una landing de una sola
página por pobre, amontonada, sin gráficos interactivos y demasiado resumida, y pidió un sitio al nivel del de ParlaIbero
(/Users/rodrodr/Dropbox/Apps/parlaibero_site, solo lectura). Ahora ha ordenado: «máxima calidad en el menor tiempo posible».

LEE ANTES DE EMPEZAR, EN ESTE ORDEN:
1. ${R}/docs/CONTRATO_CONSTRUCCION.md — reparto de dueños, formatos del copy, de las cifras y del exportador. MANDA sobre el plan.
2. ${R}/docs/00_PLAN_sitio.md — plan (mapa del sitio, plantilla por plantilla, figuras, reglas editoriales, frases fijas ↺,
   palabras vetadas, diseño visual, arquitectura). Si al final tiene un anexo «Revisión adversarial», aplícalo: corrige el plan.
3. ${R}/docs/01_NARRATIVA_sitio.md — la narrativa beat a beat de cada página (manda sobre el plan).
Usa también ${R}/docs/estudio/ (informes, datos calculados, capturas) y las fuentes primarias listadas en el contrato.

REGLAS DURAS: nada del prototipo de 1931 (grafo anotado, libro de códigos, posturas, actos afectivos, ironía, intensidad, 90 sesiones,
3.874 nodos…); toda cifra con base (V2/v3/proyecto/afin/dv/explorador) y verificada sobre la fuente, nunca copiada de un informe sin
recalcularla; no prometer lo que el explorador no hace (sin enlaces profundos, sin cabecera de sesión con Diario/páginas/Presidencia/
Gobierno, «Mismo diputado» léxico, sin búsqueda semántica, comodín en el buscador, NOT ni proximidad); la sesión del 1-X-1931 está
truncada al final del acta digitalizada; español de España, «usted», frases de ≤ 30 palabras, sin «innovador» ni tono de folleto,
sin anglicismos innecesarios. No escribas fuera de ${R}. No toques archivos de otro dueño (ver contrato); si necesitas algo de otro,
anótalo en ${R}/docs/peticiones/<tu-grupo>.md. Al terminar devuelve un informe breve: qué archivos creaste, qué verificaste, qué quedó
pendiente y por qué.`

const TAREAS = [
{ k: 'andamiaje', p: `TU PAPEL: dueño del ANDAMIAJE técnico (Astro). Crea en ${R} el proyecto Astro reutilizando el esqueleto de ParlaIbero según
el plan (§ Arquitectura técnica: qué se copia, qué se adapta, qué sobra) y el contrato:
- package.json (astro 7 como ParlaIbero, @astrojs/sitemap, @fontsource-variable/cormorant-garamond, eb-garamond, jetbrains-mono,
  sharp declarado, @playwright/test, typescript, @astrojs/check), astro.config.mjs (SITE_URL por defecto https://rodrodr.github.io,
  BASE_PATH /luz, trailingSlash always, i18n es/en), tsconfig, playwright.config.ts, .gitignore (node_modules, dist, .astro), git init
  (sin commits), .claude/launch.json con astro dev en 4321; marca node_modules para que Dropbox lo ignore (xattr com.dropbox.ignored 1).
- src/lib: cifras.ts (con base y data-base), i18n.ts (con el arreglo del escape), idiomas.ts (es, en), rutas.ts, remata.ts, figuras.ts
  (registro de figuras), cita.ts; src/config/enlaces.ts (DOIs, explorador, app, ENLACES_PROFUNDOS=false, PENDIENTES_DEL_INVESTIGADOR).
- Tokens: src/data/tokens.json NO (es del exportador) → usa src/styles/tokens.json propio o scripts/tokens.mjs que genere base.css
  desde un JSON en src/styles/; paleta del plan § Diseño visual (oscuro editorial oro/crema y claro; rampa de oro; foco azul; ideología;
  --ausencia; --atenua), tipografías autoalojadas, tema ◐ con preferencia del sistema y elección guardada, movimiento solo con
  prefers-reduced-motion: no-preference.
- Base.astro: cabecera con marca y descriptor, SEIS pestañas en dos grupos (Las Cortes · El Diario | Método · Datos · Explorador ·
  Afinidades), ES·EN, ◐, saltar al contenido; pie del plan (sin financiación); hreflang; JSON-LD; og.
- Componentes genéricos: Pestanas (Gráfico·Tabla·Datos con radios y :has()), IndiceLateral, BandaCTA, SubNav, Captura, Cita, Salidas,
  NotaBases, CopiarConsulta, Sello, Hemiciclo (a partir del SVG que genera /Users/rodrodr/Dropbox/Apps/aecpa2026/landing/hero_svg.py:
  ejecútalo o porta su lógica; colores por variables --g-* en los dos temas; leyenda; rótulo; pie del croquis), ficha/Vecinas,
  ficha/Tareas; styles/figuras.css común; scripts/figuras.ts: la ISLA genérica (nota emergente por data-plantilla + data-v-*, teclado
  ← → Inicio Fin Esc, toque, dianas enfocables ≥ 44 px, vuelve a enlazar tras sustituir, aria-live solo al recorrer con teclado).
- Páginas: todas las rutas del plan (§ Rutas) para es y en como plantillas que leen sus textos de i18n con t()/tBloques() y
  PINTAN LO QUE HAYA (si una clave aún no existe, un marcador visible ⟦clave⟧ en vista previa, como ParlaIbero); raíz = selector de lengua
  sobre el hemiciclo; 404 bilingüe. Deja en cada página un hueco claro (comentario <!-- FIG Fxx -->) donde irá cada figura.
- scripts: copy2i18n.py (concatena docs/copy_es/*.md → src/i18n/es.json y docs/copy_en/*.md → en.json; comprueba claves, marcadores y
  frases fijas), copy_lectura.py, check-i18n.mjs (dos lenguas + vetos de LyT), audit-cifras.mjs (data-base obligatorio, NotaBases donde
  hay v3, lista negra del prototipo, recursos de terceros), og.mjs; package.json scripts como ParlaIbero (i18n, dev, build, check, audit, test).
- tests: humo (todas las rutas × 2 lenguas, un h1, 360 px sin desborde, 0 errores de consola), sinjs, solapes, peso, guardas.
- npm install; que npm run build PASE aunque el copy y los datos aún estén incompletos (placeholders visibles, no errores).
NO toques src/data (salvo leerlo), src/assets/explorador, docs/copy_*, docs/marcadores, exportador/.
Verifica con Playwright en Python que Inicio y dos páginas abren a 1440 y 375 px en los dos temas.` },
{ k: 'exportador', p: `TU PAPEL: dueño del EXPORTADOR (${R}/exportador/). Construye exportar.py y la estructura de módulos del contrato:
- exportar.py: verifica huellas (MD5 V2, sha256 v3 3a0d8b2d…, sha256 de sessions.json del proyecto, versión/MD5 de CGOCUS V1.1,
  sha256 de hemiciclo_1936.json), calcula/lee el papel de cada fila v3 (chair, role) con el motor del explorador (reutiliza
  ~/.cache/luz_site/clima/*.jsonl si su huella cuadra), ejecuta cada modulos/*.py, fusiona cifras en src/data/cifras.json con el
  formato del contrato, escribe src/data/sello.json y public/datos/procedencia.csv, valida (cifra sin base/f/d, suma de etapas ≠ total,
  archivo de figs/data distinto del hemiciclo, marcadores de docs/marcadores/*.md cuyo valor esperado no coincide → FALLA con informe).
- modulos/base.py COMPLETO: filas.V2, filas.v3, habla.v3, sesiones (755 en 752 fechas), por legislatura y por ETAPA (I–V: 405/276/60/9/5
  con num_session ≤60 / 61–69 / 70–74 en 1936-1939), palabras V2 (24.335.896) y por legislatura/etapa, meses (173; 64 con sesión),
  presidencia (filas y palabras), páginas del proyecto (28.780; 741 verificadas), diputados (773), dv (peso 158,1 MB, versión, cita,
  visitas/descargas con fecha), explorador (bytes .gz y base), etapas.json, sesiones.json (755), meses.json (173 con estado), jsonld
  thqcmi/cgocus, hemiciclo_1936.json copiado, grafias.json (desde ${R}/exportador/grafias.csv que escribirá el dueño «grafias»; si aún
  no existe, déjalo vacío sin fallar), y los formatos (|n |pct |peso |fecha) que usará cifras.ts.
- Crea los demás módulos (cortes, sesiones, diario, metodo, datos, explorador, afinidades) como ESQUELETOS que devuelven {} con un
  docstring que enumere sus figuras y archivos según el plan § El exportador; sus dueños los rellenarán en la fase 2. PERO deja ya
  calculados en base.py o en helpers (exportador/comun.py) los agregados que varias figuras comparten.
- Porta y reutiliza ${R}/docs/estudio/datos/comun.py y calc_*.py (y critica/cobertura_mes_v2.json como control).
Verifica: python3 exportador/exportar.py corre de principio a fin; imprime un resumen; las cifras de control del plan (§ Procedencia de
las cifras principales) coinciden. NO toques src/ salvo src/data/ y public/datos/.` },
{ k: 'copy_inicio', p: `TU PAPEL: dueño del COPY de «comun» e «inicio» y de la RAÍZ y el 404: escribe ${R}/docs/copy_es/comun.md y
${R}/docs/copy_es/inicio.md con el formato de ParlaIbero (estudia parlaibero_site/docs/02_COPY_es.md y scripts/copy2i18n.py) y
${R}/docs/marcadores/comun.md e inicio.md. comun: cabecera (marca, descriptor, pestañas, ES·EN, tema, saltar), pie (plan § Navegación
global), las 13 frases fijas ↺ del plan tal cual, rótulos de botones (tabla «Un rótulo por destino»), textos de la isla (instrucciones
de teclado, estados), NotaBases, CopiarConsulta, Sello, glosario de interfaz, raíz (selector de lengua) y 404. inicio: los beats 0–7 de
la narrativa §6 (≤ 700 palabras de copy, ≤ 120 de límites), con la tesis en banda abierta por «Luz y taquígrafos.» (8-VI-1934, fila V2
71330: VERIFICA el texto literal en el CSV), las remisiones a cada página y los textos de las figuras que viven en Inicio (F01c, F26 en
su versión de Inicio, hemiciclo). Recalcula tú cada cifra que uses (CSV V2 / base v3) y pon su valor esperado en el archivo de marcadores.` },
{ k: 'copy_cortes_a', p: `TU PAPEL: dueño del COPY de «Las Cortes» (índice) y de las FICHAS I (Constituyentes 1931–1933) y II (legislatura
elegida en 1933): escribe ${R}/docs/copy_es/cortes.md, cortes_1931.md, cortes_1933.md y los marcadores correspondientes en
${R}/docs/marcadores/. Sigue la narrativa §7, §8.1 y §8.2 y el plan (plantilla de ficha: topes por etapa, secciones, «Hoy puede», «Cómo
citar», vecinas), sin RESUMIR el contexto histórico: es lo que el investigador echó en falta. Cada hecho parlamentario, anclado en su
fila del Diario (id V2 y v3, VERIFICADOS en el CSV y en la base); cada hecho externo, solo con referencia académica [A] o institucional
[I] que compruebes (usa WebSearch/WebFetch; si no la encuentras, recorta la frase). Registra las referencias en
${R}/docs/02b_BIBLIOGRAFIA.md (sección de tus fichas). Incluye los textos de las figuras de tus páginas (F01 completa y F01e, F16, F05,
F09 en su versión por etapa: títulos, entradas, leyendas, plantillas de nota emergente, salvedades). Nombres de diputados con su grafía
correcta (con tildes; coordina anotando los nombres que uses en ${R}/docs/peticiones/grafias_cortes_a.md).` },
{ k: 'copy_cortes_b', p: `TU PAPEL: dueño del COPY de las FICHAS III (Cortes de 1936 hasta la guerra), IV (Cortes en guerra, 1936–1939) y V
(México, 1945): escribe ${R}/docs/copy_es/cortes_1936.md, cortes_guerra.md, cortes_mexico.md y sus marcadores en ${R}/docs/marcadores/.
Sigue la narrativa §8.3–8.5 y el plan (plantilla de ficha), sin RESUMIR el contexto histórico. Cada hecho parlamentario, anclado en su
fila del Diario (id V2 y v3, VERIFICADOS en el CSV y en la base; lee las filas de las sesiones de guerra y de México); cada hecho
externo, solo con referencia académica [A] o institucional [I] que compruebes (WebSearch/WebFetch; si no hay, se recorta). Registra
referencias en ${R}/docs/02b_BIBLIOGRAFIA.md (sección de tus fichas; si el archivo existe, añade tu sección sin borrar otras). Textos de
F01e/F16/F05/F09 de tus etapas. Nombres con su grafía correcta (anótalos en ${R}/docs/peticiones/grafias_cortes_b.md).` },
{ k: 'copy_sesiones', p: `TU PAPEL: dueño del COPY de «Sesiones y votaciones» (índice), de las OCHO PUERTAS de lectura de la 0.1 (sufragio-1931,
cuestion-religiosa-1931, estatuto-1932, casas-viejas-1933, pistola-1934, antesala-1936, figueres-1939, mexico-1945) y de «El Diario»:
escribe ${R}/docs/copy_es/sesiones.md (puede partirse en sesiones_<puerta>.md) y diario.md, y sus marcadores. Sigue la narrativa §9, §10
y §11. Cada cita LITERAL, copiada letra a letra de su fila V2 y comprobada también en su fila v3 (registra ids y texto en
${R}/docs/marcadores/citas.md para el aserto del build); cada consulta de [Copiar la consulta] con su recuento real en la base v3 (FTS5,
como el explorador; indica filtro y base). Textos de F26 (votaciones: 161–121 del 1-X-1931 y las demás seleccionadas; VERIFICA totales
en el texto de las filas), F30, F27 («Luz y taquígrafos», diez veces: localiza las 10 filas) y F28 («no constará»: 9 filas).
Nombres con su grafía correcta (anótalos en ${R}/docs/peticiones/grafias_sesiones.md).` },
{ k: 'copy_metodo_datos', p: `TU PAPEL: dueño del COPY de «Método», «Usar los datos» y «Versiones»: escribe ${R}/docs/copy_es/metodo.md,
datos.md, versiones.md y sus marcadores. Sigue la narrativa §12, §13, §14 y el plan (Método en 10 apartados, sin resumir: fuente, OCR con
GLM-OCR y reserva Tesseract con sus recuentos, limpieza, turnos, vinculación en cascada, atributos, revisión manual, auditoría de fechas
V2, resegmentación v3 y habla/no habla, qué no afirma el corpus; Datos: escalera de descarga y formulario (frase ↺ 3; D-20 pendiente del
investigador, márcalo), las 14 columnas con sus trampas de significado (F32), cinco maneras de contar «palabra» (F33), unión con
Afinidades correcta e incorrecta (F34), fragmentos en R y Python QUE EJECUTES de verdad sobre el CSV V2 (guarda su salida en
${R}/docs/marcadores/fragmentos_salida.txt), cita en texto/BibTeX/RIS; Versiones: V1.0/V1.1/V2.0 y la v3, las 7 fechas corregidas (F25),
adónde van las 107.551 filas (F18), quién habla más según la base (F07), qué base usa cada figura (F35)). Textos de todas esas figuras y
de F19, F20, F10/F11 y F12.` },
{ k: 'copy_explorador', p: `TU PAPEL: dueño del COPY de «El explorador» y de «Afinidades Elegidas»: escribe ${R}/docs/copy_es/explorador.md,
afinidades.md y sus marcadores. Explorador: narrativa §15 y plan (9 secciones con capturas reales de ${R}/docs/estudio/capturas_explorador/
y el informe ${R}/docs/estudio/estudio_lyt_explorador.md; cada función comprobada; D-17: Menciones solo con la matriz y su bloque de
límites; D-18: aviso de la cita «V2» sobre datos v3; frase ↺ 5; F17 bibliotecas; F29 búsquedas de muestra con recuentos reales en la base
v3, con fecha). Afinidades: narrativa §16 y plan (CGOCUS V1.1 con su sello; 78 en las tres legislaturas; cruce de bloque y cruce estricto;
63.507 relaciones par-medida; frase ↺ 10; la corrección v2 sin depositar como pendiente del investigador; F21 tres redes, F22 dos cruces;
[Abrir Afinidades ↗] solo a #red o #diputados). Recalcula las cifras de Afinidades desde los archivos de CGOCUS V1.1. Nombres con grafía
correcta (anótalos en ${R}/docs/peticiones/grafias_explorador.md).` },
{ k: 'grafias', p: `TU PAPEL: dueño de la TABLA DE GRAFÍAS (D-22): ${R}/docs/02c_GRAFIAS.md y ${R}/exportador/grafias.csv
(rep_id;rep_name_base;grafia;fuente;estado). La base escribe los nombres sin tildes y a veces con errores («Clara Campoamor Y Rodriguez»,
«Manuel Jimenez Fernandez» → Giménez Fernández). Cubre: los 150 diputados con más palabras en la V2 (sin Presidencia) y en la v3, todos
los presidentes y vicepresidentes de la Cámara, los presidentes del Consejo y ministros que intervienen, y todo nombre que aparezca en
${R}/docs/01_NARRATIVA_sitio.md y en ${R}/docs/peticiones/grafias_*.md (vuelve a leer esa carpeta al final: otros agentes la llenan mientras
trabajas). Fuente para cada grafía: cómo lo imprime el Diario (con tildes en mayúsculas; léelo en el texto de las filas), el histórico de
diputados del Congreso (https://www.congreso.es/es/historico-diputados) o la Real Academia de la Historia (dbe.rah.es); estado:
confirmada / probable / por revisar (el investigador revisará las dudosas).` },
{ k: 'capturas', p: `TU PAPEL: dueño de las CAPTURAS del explorador: ${R}/src/assets/explorador/. Del inventario de
${R}/docs/estudio/capturas_explorador/ (54 PNG) y de ${R}/docs/estudio/estudio_lyt_explorador.md, elige las 10–12 que pide el plan para la
página Explorador (§ plantilla Explorador y narrativa §15), recórtalas si hace falta para que se lea la función, y guárdalas optimizadas
(PNG o WebP de ancho ≤ 1.600 px, peso razonable). Si faltan capturas oscuras «limpias» o algún estado que el plan pide (estudio_critica.md
§E3–E4), REHAZLAS con Playwright en Python contra https://rodrodr.github.io/luz_explorer/ (la primera carga descarga ~112 MB; espera).
Escribe ${R}/src/assets/explorador/LEEME.md con: archivo, qué enseña, estado reproducido (consulta, filtros, id), fecha, texto alternativo
en español, y una versión de pie de foto. MIRA cada imagen final y confirma que enseña lo que dice.` },
]

phase('Cimientos')
const rs = await parallel(TAREAS.map(t => () => agent(CTX + '\n\n' + t.p, { label: t.k, phase: 'Cimientos' }).then(r => ({ k: t.k, r }))))
const ok = rs.filter(Boolean)
log('Terminados: ' + ok.map(x => x.k).join(', '))

phase('Revisar')
const rev = await agent(CTX + `

TU PAPEL: CRÍTICO DE COHERENCIA de la fase 1. Revisa lo producido en ${R}: (1) ¿compila? ejecuta npm run i18n (o python3 scripts/copy2i18n.py)
y npm run build y python3 exportador/exportar.py y anota los errores; (2) ¿las claves que usan las páginas existen en el copy y viceversa?;
(3) ¿cada marcador de docs/copy_es tiene su fila en docs/marcadores y su valor esperado coincide con lo que calcula el exportador o con el
CSV/base (comprueba al menos 40 al azar y TODAS las de inicio)?; (4) ¿quedan palabras o cifras vetadas, restos del prototipo, promesas
falsas del explorador, citas no literales (comprueba 15 citas contra el CSV V2)?; (5) ¿contradicciones entre grupos (misma cifra con dos
valores, mismo nombre con dos grafías)? No corrijas el copy de otros: escribe ${R}/docs/REVISION_FASE1.md con la lista priorizada de
problemas (archivo, clave, problema, corrección propuesta) y devuélvela.

Informes de los dueños:
${ok.map(x => '### ' + x.k + '\n' + (x.r || '').slice(0, 4000)).join('\n\n')}`, { label: 'critico-fase1', phase: 'Revisar' })

return { terminados: ok.map(x => x.k), revision: rev }
