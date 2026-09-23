export const meta = {
  name: 'arsenal-diseno-web',
  description: 'Buscar, verificar e instalar los mejores recursos (consagrados y de vanguardia) para juegos web, aplicaciones de lectura, landing pages, sistemas de diseño, sonido e interacción y plataforma web moderna',
  phases: [
    { title: 'Buscar', detail: 'seis buscadores en paralelo, uno por dominio' },
    { title: 'Seleccionar', detail: 'verificar, instalar y documentar' },
  ],
}

const OUT = '/Users/rodrodr/.claude/skills/_arsenal'
const CTX = `
OBJETIVO: el investigador quiere que Claude sea excelente diseñando CUALQUIER aplicación web —juegos interactivos, aplicaciones de lectura,
landing pages— con los recursos más destacados de cada aspecto: los consagrados y también los DE VANGUARDIA con perspectiva de futuro
(p. ej. three.js, p5.js), y que todo quede INTEGRADO para funcionar en armonía (otra fase posterior hará la integración; tú aportas la
materia prima mejor seleccionada y verificada).

CRITERIOS por recurso: excelencia real (calidad del resultado, no solo popularidad), madurez y mantenimiento (versión, fecha, licencia,
estrellas), peso y rendimiento, accesibilidad, encaje con proyectos estáticos o con islas (Astro/Vite, JS moderno sin framework, y React
cuando el proyecto lo pida), y potencial de futuro. HERRAMIENTAS: WebSearch/WebFetch (docs oficiales, GitHub, ejemplos punteros);
buscador de skills \`npx -y skills find "<consulta>" </dev/null\` (https://skills.sh). YA INSTALADAS en ~/.claude/skills (léelas si
compiten con lo que encuentres): impeccable (+ critique, audit, polish, layout, typeset, colorize, clarify, adapt, distill, quieter,
animate, delight, bolder, overdrive, shape, optimize), design-taste-frontend, high-end-visual-design, redesign-existing-projects,
minimalist-ui, industrial-brutalist-ui, stitch-design-taste, gpt-taste, image-to-code, imagegen-frontend-web, imagegen-frontend-mobile,
scientific-visualization, gsap-* (core, scrolltrigger, timeline, plugins, performance, utils, frameworks, react), motion-graphics,
hyperframes*, web-design-guidelines; y otros dos equipos están buscando ahora recursos de diseño web general, dataviz, tipografía,
accesibilidad, Astro, three.js, p5.js, motores de movimiento y CSS nativo (no repitas eso). SEGURIDAD: una skill corre con todos los
permisos del agente: lee su SKILL.md y scripts; rechaza la que haga peticiones de red injustificadas, descargue binarios o pida
credenciales. NO instales en esta fase. Termina en 12 minutos.

ENTREGA (texto): (1) STACK RECOMENDADO para tu dominio (bibliotecas y técnicas, con URL, versión, licencia, peso gz, por qué, y la
alternativa de vanguardia); (2) las mejores SKILLS (owner/repo@skill, instalaciones, estrellas, veredicto de seguridad tras leerla,
solapes con las instaladas, instalar sí/no); (3) LISTÓN DE CALIDAD: 8-12 criterios verificables de un resultado excelente en tu dominio;
(4) 4-6 referencias ejemplares con URL.`

const DOMINIOS = [
  { k: 'juegos', t: 'DOMINIO: JUEGOS INTERACTIVOS WEB y experiencias lúdicas: Phaser 4, PixiJS v8, Kaplay, Excalibur, three.js/Babylon.js para 3D, física (Rapier WASM, Matter.js, Planck), entrada (teclado, táctil, mando), audio de juego, «game feel»/juice, accesibilidad en juegos, rendimiento (bucle, requestAnimationFrame, OffscreenCanvas, WebGPU), guardado de estado; skills de desarrollo de juegos web.' },
  { k: 'lectura', t: 'DOMINIO: APLICACIONES DE LECTURA y edición de texto largo: tipografía de lectura y medida, modos de lectura (tema, tamaño, interlineado, fuente para dislexia), paginación con CSS columns frente a desplazamiento, anotaciones y subrayados, notas al margen, lectores EPUB (Readium, foliate-js), progreso y retoma, búsqueda en texto, texto multilingüe, hyphens, text-wrap: pretty, variable fonts; referencias como Readwise Reader, Medium, iA Writer, Standard Ebooks, Craig Mod.' },
  { k: 'landing', t: 'DOMINIO: LANDING PAGES y páginas de producto de primer nivel: estructura de persuasión honesta, héroe, prueba social verificable, precios, llamadas a la acción, rendimiento (LCP), imagen y vídeo optimizados, dirección de arte de nivel Awwwards/SiteInspire/Godly, movimiento de entrada, copy (skills de copywriting y de conversión con reputación), y pruebas A/B sin romper el diseño.' },
  { k: 'sistemas', t: 'DOMINIO: SISTEMAS DE DISEÑO y componentes accesibles: tokens (formato W3C Design Tokens, Style Dictionary), escalas fluidas (Utopia), composición intrínseca (Every Layout), Open Props, primitivas accesibles (Radix, Ark UI/Zag.js sin framework, React Aria, Headless UI, Base UI), shadcn/ui cuando hay React, Tailwind v4 y CSS moderno (cascade layers, @scope, color-mix, oklch, relative color), iconografía (Lucide, Phosphor), temas claro/oscuro; skills de design systems.' },
  { k: 'sonido_interaccion', t: 'DOMINIO: SONIDO, HÁPTICA y MICROINTERACCIÓN: Web Audio API, Tone.js, Howler.js, sonificación de datos, vibración y háptica, gestos (Use Gesture sin React, Pointer Events), física de muelles (spring), microinteracciones y estados, cursores y feedback; referencias de interfaces con sonido cuidado; skills de interacción.' },
  { k: 'plataforma_estado_arte', t: 'DOMINIO: ESTADO DEL ARTE DE LA PLATAFORMA WEB 2025-2026 aplicable al diseño: Baseline (web.dev), View Transitions entre documentos, scroll-driven animations, anchor positioning, popover y <dialog>, customizable <select>, container queries y style queries, @starting-style, interpolate-size, field-sizing, CSS nesting, :has(), Speculation Rules, imágenes AVIF/responsive, fuentes variables y font-display, WebGPU, WASM; y herramientas de verificación visual y de calidad (Playwright, Lighthouse, axe-core, pa11y, Chrome DevTools MCP). Qué se puede usar ya con degradación elegante.' },
]

phase('Buscar')
const res = (await parallel(DOMINIOS.map(d => () => agent(CTX + '\n\n' + d.t, { label: 'arsenal:' + d.k, phase: 'Buscar' }).then(r => ({ k: d.k, r }))))).filter(Boolean)

phase('Seleccionar')
const sel = await agent(CTX + `

TU PAPEL: SELECCIONADOR. Con los seis informes de abajo:
1. Elige las skills que de verdad elevan el diseño en esos dominios (máximo 10 en total, sin solapes innecesarios con las instaladas).
   Vuelve a LEER el SKILL.md y los scripts de cada una y confirma su seguridad. INSTÁLALAS a nivel de usuario para Claude Code con un
   método no interactivo que funcione (\`npx -y skills add --help </dev/null\`; la forma \`-g -y\` falló por un aviso interactivo: prueba
   indicando el agente, p. ej. \`--agent claude-code\`, o clona el repositorio en /tmp y copia la carpeta de la skill a
   ~/.claude/skills/<nombre>/). Comprueba que cada SKILL.md queda legible en ~/.claude/skills/<nombre>/SKILL.md.
2. Escribe ${OUT}/ARSENAL.md (crea la carpeta): por dominio, el stack recomendado (consagrado + vanguardia), el listón de calidad, las
   skills instaladas y descartadas con motivo, y las referencias. Es materia prima para la fase de integración: sé preciso y compacto.
Devuelve la lista de skills instaladas (nombre y ruta) y un resumen de 10 líneas.

INFORMES:
${res.map(x => '### ' + x.k + '\n' + x.r).join('\n\n')}`, { label: 'seleccionar-arsenal', phase: 'Seleccionar' })

return { dominios: res.map(x => x.k), seleccion: sel }
