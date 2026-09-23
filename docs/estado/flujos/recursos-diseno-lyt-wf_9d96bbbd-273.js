export const meta = {
  name: 'recursos-diseno-lyt',
  description: 'Localizar, verificar e instalar las mejores skills y recursos de diseño, visualización, tipografía, accesibilidad y Astro para el sitio de Luz y Taquígrafos',
  phases: [
    { title: 'Buscar', detail: 'cinco buscadores en paralelo, uno por dominio' },
    { title: 'Seleccionar', detail: 'verificar, instalar y redactar el documento de recursos' },
  ],
}

const R = '/Users/rodrodr/Dropbox/Apps/luz_site'
const CTX = `
CONTEXTO: se construye el sitio multipágina (Astro estático, sin framework de cliente, ES/EN) de «Luz y Taquígrafos», base de datos
histórica de los Diarios de Sesiones de las Cortes de la Segunda República española (1931–1945). Identidad fijada por el investigador:
oscura editorial (crema sobre casi negro, oro de acento, serif cursiva de display Cormorant Garamond, lectura EB Garamond, JetBrains Mono)
con tema claro; portada con el hemiciclo del Congreso. Figuras interactivas en SVG (calendario de 755 sesiones, votaciones nominales,
barras, líneas, redes de coautoría) con nota emergente, teclado, táctil, pestañas Gráfico·Tabla·Datos y funcionamiento sin JS. Modelo de
calidad: el sitio de ParlaIbero (/Users/rodrodr/Dropbox/Apps/parlaibero_site). El investigador pide un resultado ARTÍSTICO y PROFESIONAL,
«máxima calidad en el menor tiempo», y quiere que se busquen y SELECCIONEN los mejores recursos, en la web si hace falta.

YA INSTALADAS en ~/.claude/skills (no las repitas; sí compáralas): impeccable (y sus comandos critique, audit, polish, layout, typeset,
colorize, clarify, adapt, distill, quieter, animate, delight, bolder, overdrive, shape, optimize), design-taste-frontend,
high-end-visual-design, redesign-existing-projects, minimalist-ui, scientific-visualization, gsap-*, web-design-guidelines (vercel-labs).

HERRAMIENTAS: el buscador del ecosistema abierto de skills: \`npx -y skills find "<consulta>" </dev/null\` (lista owner/repo@skill con
instalaciones; https://skills.sh/). WebSearch y WebFetch para la web y para leer cada SKILL.md en GitHub (raw.githubusercontent.com).
SEGURIDAD: una skill se ejecuta con todos los permisos del agente. Solo propón skills de fuentes con reputación (organizaciones oficiales
o autores reconocidos, muchas instalaciones y estrellas) y LEE su SKILL.md y los scripts que traiga: rechaza cualquiera con scripts que
hagan peticiones de red no justificadas, descarguen binarios, pidan credenciales o den instrucciones sospechosas. NO instales nada en esta
fase. Termina en 12 minutos como mucho.

ENTREGA (texto): (1) las 3-5 mejores skills de tu dominio con: owner/repo@skill, instalaciones, estrellas del repo, qué aporta de verdad a
ESTE sitio (no genérico), solapamiento con las ya instaladas, veredicto de seguridad tras leerla, y recomendación (instalar / no); (2) los
3-6 mejores RECURSOS WEB de referencia (guías, artículos, sistemas de diseño, ejemplos de sitios de archivos históricos o de periodismo de
datos) con URL y la idea concreta que aplicar aquí.`

const DOMINIOS = [
  { k: 'diseno_web', t: 'DOMINIO: diseño de interfaz y dirección de arte web de alto nivel (editorial, archivos y bibliotecas digitales, sitios de datos y museos). Consulta, por ejemplo, anthropics/skills@frontend-design, vercel-labs/agent-skills, leonxlnx/taste-skill y ejemplos de referencia (The Pudding, NYT/FT/Reuters Graphics, Library of Congress, Europeana, sitios de corpus parlamentarios).' },
  { k: 'dataviz', t: 'DOMINIO: visualización de datos interactiva en SVG/D3 accesible y periodística (anthropics/knowledge-work-plugins@data-visualization, skills de d3, principios de Tufte/Cairo/Datawrapper/FT Visual Vocabulary, gráficos accesibles con teclado y lector de pantalla, notas emergentes, pequeños múltiplos, calendarios, redes).' },
  { k: 'tipografia', t: 'DOMINIO: tipografía web editorial (escalas, medida, interlineado, cifras tabulares y de estilo antiguo, cursiva de display, microtipografía española: comillas latinas, rayas, espacios finos), con skills como jakubkrehel/skills@better-typography, wondelai/skills@web-typography y referencias (Butterick, Bringhurst aplicado a la web, Fontsource).' },
  { k: 'accesibilidad', t: 'DOMINIO: accesibilidad y calidad web (WCAG 2.2 AA, gráficos accesibles, foco, movimiento reducido, contraste en dos temas, rendimiento y Core Web Vitals), con skills como addyosmani/web-quality-skills@accessibility (y el resto de ese repositorio), jakubkrehel/skills@better-accessibility y referencias (W3C WAI, Chartability, Deque).' },
  { k: 'astro_movimiento', t: 'DOMINIO: Astro (islas, i18n, rendimiento, imágenes, View Transitions) y movimiento sutil sin librerías (CSS scroll-driven animations, View Transitions API), con skills como astrolicious/agent-skills@astro y referencias oficiales. Averigua además el COMANDO NO INTERACTIVO correcto de `npx skills add` para instalar a nivel de usuario para Claude Code (la prueba `npx skills add <x> -g -y` falló con «Canceled» por un aviso interactivo; mira `npx -y skills add --help` y la documentación).' },
]

phase('Buscar')
const res = (await parallel(DOMINIOS.map(d => () => agent(CTX + '\n\n' + d.t, { label: 'buscar:' + d.k, phase: 'Buscar' }).then(r => ({ k: d.k, r }))))).filter(Boolean)

phase('Seleccionar')
const sel = await agent(CTX + `

TU PAPEL: SELECCIONADOR FINAL. Con los cinco informes de abajo:
1. Elige el conjunto MÍNIMO y MEJOR de skills nuevas que de verdad elevan este sitio (evita solapamientos con las instaladas; máximo 8).
   Para cada una, vuelve a LEER su SKILL.md y sus scripts y confirma el veredicto de seguridad.
2. INSTÁLALAS a nivel de usuario para Claude Code con el comando no interactivo que haya encontrado el buscador de Astro (compruébalo tú:
   \`npx -y skills add --help </dev/null\`); verifica que cada una queda en ~/.claude/skills (o enlazada desde ~/.agents/skills) con su
   SKILL.md legible. Si una falla, inténtalo una vez más con otra forma documentada; si vuelve a fallar, anótalo y sigue.
3. Escribe ${R}/docs/RECURSOS_DISENO.md: tabla de skills instaladas (y descartadas, con motivo), cuándo usar cada una en este proyecto
   (crítica, auditoría, figuras, tipografía, accesibilidad, Astro, pulido), y los mejores recursos web con la idea concreta que aplicar a
   cada página o figura del sitio. Breve, práctico, en español.
Devuelve la lista final de skills instaladas (nombre y ruta) y un resumen de 10 líneas.

INFORMES:
${res.map(x => '### ' + x.k + '\n' + x.r).join('\n\n')}`, { label: 'seleccionar', phase: 'Seleccionar' })

return { dominios: res.map(x => x.k), seleccion: sel }
