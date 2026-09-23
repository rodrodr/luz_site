export const meta = {
  name: 'cerrar-y-traducir-lyt',
  description: 'Aplicar las decisiones del investigador, ronda de diseño, congelar el español, traducir al inglés y preparar la publicación del sitio de Luz y Taquígrafos',
  phases: [
    { title: 'Aplicar', detail: 'contenido y configuración · diseño' },
    { title: 'Congelar', detail: 'todo en verde y español congelado' },
    { title: 'Traducir', detail: 'glosario, tres traductores, verificación en inglés' },
    { title: 'Publicar', detail: 'compilación estricta, despliegue, README' },
  ],
}

const R = '/Users/rodrodr/Dropbox/Apps/luz_site'
const CTX = `
Trabajas en el sitio de «Luz y Taquígrafos» en ${R} (Astro estático; 22 páginas en español ya construidas, criticadas y pulidas).
LEE PRIMERO: ${R}/docs/DECISIONES_23-09.md (decisiones del investigador tras la vista previa y las del director: MANDAN), la sección 5 de
${R}/docs/ESTADO_TRABAJO.md, y solo las secciones de ${R}/docs/CONTRATO_CONSTRUCCION.md, ${R}/DESIGN.md y ${R}/docs/00_PLAN_sitio.md que
tu tarea necesite. Pendientes a resolver: ${R}/docs/peticiones/pulidor.md y ${R}/docs/peticiones/revision_director.md.
ECONOMÍA: el presupuesto de uso es justo. No releas documentos enteros sin necesidad, no repitas verificaciones ya hechas, captura solo
lo que cambies, y termina cuanto antes con calidad. Reglas de siempre: nada del prototipo de 1931; toda cifra con marcador, base y
fuente; no prometer lo que el explorador no hace; accesibilidad AA en los dos temas; nada desborda a 360 px; español de España.
Para diseño, usa la skill maestro-diseno-web (/Users/rodrodr/.claude/skills/maestro-diseno-web/SKILL.md) y su kit. Devuelve un informe
breve: archivos, verificación, pendientes.`

phase('Aplicar')
const aplic = await parallel([
  () => agent(CTX + `

TU PAPEL: CONTENIDO, CONFIGURACIÓN Y DATOS. (1) D-20: redacta en el copy (docs/copy_es/, datos.md y donde aparezca el aviso ↺ 3) una frase
con el motivo del formulario: conocer a los usuarios y los usos de la base para mejorarla y comunicar novedades, sin prometer más; quita
su pendiente. (2) Nota al margen del grito «Luz y taquigrafos.» en Inicio (y donde aparezca como cita destacada): explica que la cita es
la fila tal cual, salida del reconocimiento óptico, sin tocar el texto citado. (3) Resuelve en el copy y en src/config/enlaces.ts
(PENDIENTES_DEL_INVESTIGADOR) los pendientes D-3, D-4, D-18, D-19, D-21, D-22, D-25 según DECISIONES_23-09.md (texto sobrio donde haga
falta: Afinidades sobre V1.1 con la v2 «en preparación» sin cifras; los pendientes de datos declarados con su cifra en Versiones o en
«Antes de usarla»; URL rodrodr.github.io/luz/). (4) tests/peso.spec.ts: el tope se mide sobre el HTML comprimido con gzip; el sin
comprimir se informa sin bloquear. (5) Exportador: las 706 claves de figura que faltan en procedencia.csv; aplica la adopción de grafías
(D-22). (6) Aclara en F35 qué figuras no llevan pestañas. Verifica: exportador estricto, npm run i18n, check-i18n, build, audit-cifras
(STRICT=1 debe pasar salvo por la falta de inglés). No toques componentes visuales ni estilos (los lleva el otro agente).`, { label: 'contenido', phase: 'Aplicar' }),
  () => agent(CTX + `

TU PAPEL: DISEÑO. (1) Acción primaria: el oro pasa a «Abrir el explorador» en la portada, la cabecera y donde Inicio ofrezca las dos
acciones; «Descargar los datos» queda como secundaria (mismo peso visual que las demás secundarias). (2) F21 (red de Afinidades):
legibilidad según docs/peticiones/revision_director.md: encuadre automático al cambiar de legislatura (que la red ocupe el lienzo),
nodos algo mayores, aristas más tenues según su número, color de ideología más legible en los nodos, y 2-3 rótulos editoriales sobre
los grupos donde la red se parte (1936-1939), manteniendo tabla, versión sin JS y teclado. (3) WCAG 1.4.12: pies de F12 y rótulos de F16
(«Negrín I») sin recortes con el espaciado de texto aumentado. (4) Chapas de base y cabecera a dos columnas en las plantillas que aún no
las tienen, como en Datos; las cabeceras de F01c y F18 muestran todas sus bases. (5) Pasa el kit de verificación de la skill maestra
(kits/verificar.py, en Chromium y WebKit) sobre las páginas que cambies e Inicio, y corrige lo que salga. No toques el copy ni el
exportador (los lleva el otro agente); si necesitas un texto, anótalo en docs/peticiones/diseno_final.md.`, { label: 'diseno', phase: 'Aplicar' }),
])

phase('Congelar')
const cong = await agent(CTX + `

TU PAPEL: VERIFICADOR Y CONGELACIÓN DEL ESPAÑOL. Integra lo de los dos agentes anteriores (informes abajo), resuelve conflictos y deja
en verde: exportador estricto, npm run i18n, check-i18n, astro check, build, audit-cifras, Playwright (con peso comprimido) y axe en las
páginas cambiadas. Mira en el navegador (Playwright) Inicio, Afinidades y una ficha a 1.440 y 375 px en los dos temas y corrige lo que
esté mal (una ronda). Después CONGELA el español: entrada en CHANGELOG.md («español congelado», fecha y huella de src/i18n/es.json),
genera la versión de lectura del copy si existe el script (copy_lectura.py) y actualiza la sección 5 de docs/ESTADO_TRABAJO.md.
INFORMES:
${aplic.map((x, i) => '### ' + ['contenido', 'diseño'][i] + '\n' + (x || '(falló)').slice(0, 3000)).join('\n\n')}`, { label: 'congelar', phase: 'Congelar' })

phase('Traducir')
const glos = await agent(CTX + `

TU PAPEL: GLOSARIO ES→EN vinculante (${R}/docs/03a_GLOSARIO_es-en.md), a partir de docs/copy_es/ y del plan (§ Dos lenguas): Diario de
Sesiones (se conserva, con glosa), Cortes Constituyentes, minoría → parliamentary minority, Presidencia → the Chair, banco azul →
government bench, fila → row, sesión, etapa → stage, legislatura → legislature/term, puerta de lectura, acotación, edición depositada /
del explorador, frases fijas ↺ en inglés (una redacción cada una), nombres de secciones y rótulos de botones. Inglés académico claro
(británico o americano, elige uno y dilo). Las citas del Diario NO se traducen en el texto: van en español con traducción al pie marcada
«(our translation)». Crea también ${R}/docs/copy_en/ vacía con las instrucciones para los traductores en un LEEME.md.`, { label: 'glosario', phase: 'Traducir', effort: 'medium' })

const LOTES = [
  'comun.md, inicio.md, cortes.md y todos los cortes_*.md',
  'sesiones.md, todos los sesiones_*.md, diario.md y metodo.md',
  'datos.md, versiones.md, explorador.md y afinidades.md',
]
const trad = await parallel(LOTES.map((l, i) => () => agent(CTX + `

TU PAPEL: TRADUCTOR ES→EN del lote: ${l} de ${R}/docs/copy_es/ → mismos nombres en ${R}/docs/copy_en/. Sigue ${R}/docs/03a_GLOSARIO_es-en.md
AL PIE DE LA LETRA. Mantén exactamente las mismas claves y los mismos marcadores {{…}} con su formato; no traduzcas ids, nombres de
variables, DOIs ni consultas del explorador; las citas del Diario quedan en español con su traducción al pie «(our translation)».
Registro académico claro, frases cortas, sin tono de folleto. Al terminar, ejecuta el control de claves y marcadores
(python3 scripts/copy2i18n.py y node scripts/check-i18n.mjs) y corrige lo que falle en tu lote.`, { label: 'traductor:' + (i + 1), phase: 'Traducir', effort: 'medium' })))

const verEn = await agent(CTX + `

TU PAPEL: VERIFICADOR DEL INGLÉS. (1) Retrotraducción a ciegas de una muestra de 40 claves (de todos los lotes): tradúcelas de vuelta al
español SIN mirar el original y compara el sentido; corrige en docs/copy_en/ cada desvío real. (2) npm run i18n, check-i18n --strict,
astro check, build, audit-cifras y Playwright (humo en /en/) en verde; quita el noindex de /en/ y mételo en el sitemap si la
configuración lo gobierna. (3) Mira Inicio, una ficha y Métodos en inglés a 1.440 y 375 px (una ronda de corrección). Informa.`, { label: 'verificar-ingles', phase: 'Traducir' })

phase('Publicar')
const pub = await agent(CTX + `

TU PAPEL: PREPARAR LA PUBLICACIÓN (sin publicar: el push y GitHub Pages los hace el investigador). STRICT=1 npm run build y todas las
puertas en verde; .github/workflows/deploy.yml (y enlaces.yml semanal) listos para el repositorio rodrodr/luz con SITE_URL
https://rodrodr.github.io y BASE_PATH /luz; imágenes sociales og-es.png y og-en.png al día; README.md del repositorio (qué es, cómo se
compila, cómo se actualizan datos y textos, puertas, licencias: código MIT y contenidos CC BY 4.0) y LICENSE si faltan; CHANGELOG.md
con la edición 0.1. Escribe ${R}/docs/PUBLICAR.md con los pasos exactos que debe dar el investigador (crear el repositorio, primer push
desde luz_site —atención: en este equipo git no funciona hasta que se reinstalen las herramientas de línea de órdenes de Xcode—,
activar Pages con GitHub Actions, enlazar desde Dataverse y desde el explorador). Actualiza docs/ESTADO_TRABAJO.md (hecho y siguiente)
y devuelve un resumen de 15 líneas del estado final.`, { label: 'publicar', phase: 'Publicar' })

return { aplicar: aplic.map(x => (x || '').slice(0, 800)), congelar: (cong || '').slice(0, 1500), glosario: !!glos, traductores: trad.map(x => !!x), ingles: (verEn || '').slice(0, 1500), publicar: pub }
