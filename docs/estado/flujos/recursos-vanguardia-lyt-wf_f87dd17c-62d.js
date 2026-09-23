export const meta = {
  name: 'recursos-vanguardia-lyt',
  description: 'Buscar, verificar y seleccionar recursos de vanguardia (animación, 3D, programación creativa, scroll, dataviz de nueva generación) para el sitio de Luz y Taquígrafos',
  phases: [
    { title: 'Buscar', detail: 'cinco buscadores en paralelo' },
    { title: 'Seleccionar', detail: 'verificar, probar, instalar skills y redactar el documento' },
  ],
}

const R = '/Users/rodrodr/Dropbox/Apps/luz_site'
const CTX = `
CONTEXTO: sitio multipágina (Astro estático, islas sin framework, ES/EN) de «Luz y Taquígrafos», base de datos histórica de los Diarios
de Sesiones de las Cortes de la Segunda República española (1931–1945). Identidad fijada: oscura editorial (crema sobre casi negro, oro,
serif cursiva de display) con tema claro; portada con la planta vectorial del hemiciclo del Congreso (SVG, 227 escaños coloreados por
minorías de 1936). Figuras de datos reales: calendario de 755 sesiones, votaciones nominales, series por mes, redes de coautoría de tres
legislaturas (hasta ~500 nodos y ~16.000 aristas), el paso de la página impresa del Diario a la fila de datos. El investigador pide un
resultado ARTÍSTICO y PROFESIONAL y recursos no solo consagrados sino DE VANGUARDIA, con perspectiva de futuro, incluida la integración
de ANIMACIÓN en las páginas (three.js, p5.js, etc.).

CRITERIOS para juzgar cada recurso (en este orden): 1) ¿sirve al relato y a los datos, o es decoración? 2) calidad y madurez (mantenimiento,
versión, comunidad, licencia); 3) coste (KB gz en el cliente, CPU/GPU, batería en móvil); 4) accesibilidad (prefers-reduced-motion,
teclado, alternativa sin JS, contraste); 5) encaje con Astro (islas, carga diferida con client:visible/idle); 6) potencial de futuro.
HERRAMIENTAS: WebSearch y WebFetch (documentación oficial, GitHub: estrellas, última versión, licencia; ejemplos punteros: Awwwards,
The Pudding, NYT/Reuters/FT Graphics, Codrops, Observable); el buscador de skills \`npx -y skills find "<consulta>" </dev/null\`
(https://skills.sh). YA INSTALADAS en ~/.claude/skills: gsap-core, gsap-scrolltrigger, gsap-timeline, gsap-plugins, gsap-performance,
gsap-utils, gsap-frameworks, animate, motion-graphics, impeccable, design-taste-frontend, high-end-visual-design, scientific-visualization,
web-design-guidelines (y otras). SEGURIDAD: una skill corre con todos los permisos del agente: LEE su SKILL.md y sus scripts; rechaza las
que hagan peticiones de red injustificadas, descarguen binarios o pidan credenciales. NO instales nada en esta fase. Termina en 12 minutos.

ENTREGA (texto): (1) los 4-6 mejores recursos de tu dominio (librería, técnica o API) con URL, versión, licencia, estrellas, peso gz, qué
momento CONCRETO de este sitio mejorarían y cómo (una propuesta de 2-3 frases), riesgos y degradación; (2) las mejores SKILLS de tu dominio
(owner/repo@skill, instalaciones, estrellas, veredicto de seguridad tras leerla, instalar sí/no); (3) 3-5 ejemplos de referencia con URL.`

const DOMINIOS = [
  { k: 'webgl_3d', t: 'DOMINIO: 3D y WebGL/WebGPU en la web editorial: three.js (y r3f solo como referencia, no hay React), OGL, regl, TSL/WebGPU renderer, shaders de texto y de tinta, partículas; p. ej. un hemiciclo en 3D o partículas de tinta que se ordenan en filas. Busca skills tipo freshtechbro/claudedesignskills@threejs-webgl y similares.' },
  { k: 'creative_coding', t: 'DOMINIO: programación creativa y generativa: p5.js (y su modo instancia), canvas 2D generativo, Paper.js, Two.js, ruido y campos de flujo; p. ej. la escritura taquigráfica generativa, la imprenta del Diario, un fondo vivo del hemiciclo. Busca skills de p5.js y creative coding.' },
  { k: 'motion', t: 'DOMINIO: motores de movimiento y coreografía: GSAP 3.13 (ScrollTrigger, SplitText, MorphSVG, DrawSVG, Flip; ahora gratuitos), Motion (motion.dev, antes Framer Motion vanilla), anime.js v4, Theatre.js, Lenis (desplazamiento suave), Rive y Lottie; compáralos en peso y control. Busca skills de motion design web.' },
  { k: 'css_nativo', t: 'DOMINIO: movimiento nativo de la plataforma, sin librerías: CSS scroll-driven animations (animation-timeline: view()/scroll()), View Transitions API entre páginas en Astro (ClientRouter/transition:name, cross-document view transitions con @view-transition), @property y animación de variables, anchor positioning para notas emergentes, :has(), container queries, text-wrap: balance/pretty; soporte real por navegador (Baseline) y degradación.' },
  { k: 'dataviz_nueva', t: 'DOMINIO: visualización de datos y relato de nueva generación: Observable Plot, D3 v7 modular, Mosaic/vgplot con DuckDB-WASM, deck.gl, cosmos.gl/Cosmograph y sigma.js/graphology para redes grandes, Scrollama y técnicas de scrollytelling, transiciones animadas entre estados de un gráfico, sonificación; qué usar para el calendario de 755 sesiones, las redes de Afinidades y las series por mes en un sitio estático sin framework.' },
]

phase('Buscar')
const res = (await parallel(DOMINIOS.map(d => () => agent(CTX + '\n\n' + d.t, { label: 'vanguardia:' + d.k, phase: 'Buscar' }).then(r => ({ k: d.k, r }))))).filter(Boolean)

phase('Seleccionar')
const sel = await agent(CTX + `

TU PAPEL: SELECCIONADOR FINAL DE VANGUARDIA. Con los cinco informes de abajo:
1. Diseña una ESTRATEGIA DE MOVIMIENTO Y MEDIOS EXPRESIVOS para el sitio: 3-5 momentos concretos (p. ej. portada del hemiciclo, del
   Diario impreso a la fila, calendario de sesiones, votaciones, redes de Afinidades, transiciones entre páginas) con la técnica elegida
   para cada uno, por qué esa y no otra, peso, degradación (sin JS y con prefers-reduced-motion) y accesibilidad. Prioriza lo nativo
   (CSS/View Transitions) y usa una librería solo donde aporte algo que lo nativo no da. Mide el peso real de las librerías elegidas
   (tamaño gz de su build ESM mínimo).
2. HAZ UNA PRUEBA DE CONCEPTO mínima de los 2 momentos más prometedores en ${R}/docs/diseno/prototipos/ (HTML autocontenido; librerías
   por CDN de jsdelivr o cdnjs solo en el prototipo; datos reales: el hemiciclo desde /Users/rodrodr/Dropbox/Apps/aecpa2026/figs/data/hemiciclo_1936.json
   o /Users/rodrodr/Dropbox/Apps/aecpa2026/landing/hero_hemiciclo.svg, el calendario desde ${R}/docs/estudio/critica/cobertura_mes_v2.json o
   ${R}/docs/estudio/datos/sesiones_v2.json); captúralas con Playwright en Python (varios fotogramas) y MÍRALAS; mide FPS aproximados.
3. INSTALA las skills de vanguardia que de verdad aporten (máximo 5, verificadas: vuelve a leer su SKILL.md y scripts), a nivel de usuario
   para Claude Code con el comando no interactivo correcto (\`npx -y skills add --help </dev/null\`; la forma \`-g -y\` falló por un aviso
   interactivo: prueba a indicar el agente de destino, p. ej. \`--agent claude-code\`, o clona el repositorio y copia la carpeta de la
   skill a ~/.claude/skills/<nombre>/). Comprueba que cada SKILL.md queda legible en ~/.claude/skills.
4. Escribe ${R}/docs/RECURSOS_VANGUARDIA.md: estrategia de movimiento (momentos, técnica, peso, degradación, accesibilidad), librerías
   elegidas y descartadas con motivo, skills instaladas y descartadas, prototipos con sus capturas y FPS, y enlaces de referencia.
Devuelve la lista de skills instaladas (nombre y ruta), los momentos elegidos y un resumen de 10 líneas.

INFORMES:
${res.map(x => '### ' + x.k + '\n' + x.r).join('\n\n')}`, { label: 'seleccionar-vanguardia', phase: 'Seleccionar' })

return { dominios: res.map(x => x.k), seleccion: sel }
