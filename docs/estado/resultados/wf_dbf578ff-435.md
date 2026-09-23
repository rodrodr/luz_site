# integrar-maestro-diseno-web (wf_dbf578ff-435) · 11 resultados · 23-09 03:02

## Resultado 1

{
 "skills": [
  {
   "nombre": "impeccable (v4.3.1; SKILL.md + reference/, incluidos new-work, craft-floor, routing, operate, visualize y los 16 comandos de la familia)",
   "existe": true,
   "proposito": "Dirige el diseño frontend. Distingue cuatro modos de visitante (Persuade, Operate, Read, Experience) y ofrece 23 comandos. Carga el contexto del proyecto (PRODUCT.md, DESIGN.md y el brief de superficie) con un binario propio: scripts/impeccable, 12 MB, arm64, motor 0.1.5. Para una superficie nueva sigue new-work: 1) decidir qué es ya verdad; 2) hacer 2–3 preguntas; 3) tirar la dirección con concept-seed y presentarla en una página de decisión servida por un demonio con puerto, con challengers, la elección de Impeccable y el canon como salida; 4) escribir un contrato de dirección de 6 bloques en el brief; 5) construir por uno de dos caminos. En el camino comp-led se generan comps y «plates» raster con IA y se miden con comp-spec, font-match y comp-diff, con una puerta del 72 % en el héroe. En el camino code-led se construye sin comp. Cierra con una inspección acotada, un revisor final en un contexto nuevo y un documentador que escribe DESIGN.md y .impeccable/design.json. craft-floor fija el suelo de calidad y los vetos que hay que releer justo antes de cada edición de UI.",
   "cuando": "Es la puerta de entrada para crear o rediseñar cualquier superficie web: landing, lectura, app, o la parte DOM de un juego. También enruta los refinamientos (critique, audit, polish, layout, typeset, colorize, clarify, adapt, distill, quieter, animate, delight, bolder, overdrive, shape, optimize). Sin argumento muestra un menú y nunca ejecuta un comando por su cuenta. No sirve para backend ni para el interior de un canvas: detect y critique solo leen HTML y CSS.",
   "reglas_fuertes": [
    "Setup: ejecutar una vez por sesión `<skill>/scripts/impeccable context`. Si no puede ejecutarse, avisar en un mensaje aparte antes de la siguiente herramienta y leer PRODUCT.md y DESIGN.md a mano. Leer craft-floor.md inmediatamente antes de cualquier edición de UI, aunque sea pequeña.",
    "«The brief wins»: la estética, la época, las fuentes y la paleta fijadas por el brief mandan sobre cualquier aviso de patrón saturado. Reconducir un brief claro hacia el gusto propio cuenta como fracaso.",
    "Un refinamiento conserva la identidad, el comportamiento y el copy. Un rediseño sustituye el mundo visual, sin términos medios. Hay que preguntar antes de cambiar copy factual o añadir afirmaciones.",
    "Verificación acotada: una ronda de capturas en lote (escritorio y móvil a la vez), un solo lote de arreglos y como máximo una ronda más. El techo de dos rondas cubre capturas, escaneos, microediciones y reconstrucciones.",
    "new-work: en un mundo nuevo o de sustitución, escribir código antes de ejecutar concept-seed y reconocer su asignación es «contract violation». Se buscan 7 candidatos de al menos 3 familias materiales; se presenta una dirección con como máximo 3 challengers a tamaño completo, una tarjeta IMPECCABLE’S PICK, re-roll (plain, safer o bolder) y el canon como salida permanente.",
    "Comp-led es el camino por defecto si hay generación de imágenes: el comp aprobado es un «contrato espacial» y la aprobación no se puede saltar. Todo raster lleva su procedencia incrustada (embed-prompt).",
    "El contrato de dirección (THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM, FINISH) vive en el brief de superficie y nunca en el código servido: ni comentarios, ni data-*, ni JSON-LD. DESIGN.md y .impeccable/design.json se escriben al final, a partir de lo construido.",
    "Fuentes vetadas como «defaults de entrenamiento» en Persuade y Experience, salvo una razón que ninguna otra fuente satisfaga (la asociación temática no cuenta): Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter como display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans e Instrument Sans.",
    "Tres clusters de IA que no se pueden elegir si el brief deja libre la estética: 1) crema cálido con serif display de alto contraste y acento terracota o rojo; 2) casi negro con un neón y bordes brillantes; 3) filetes de periódico con serif cursiva display y mono pequeña espaciada.",
    "Primero se elige una estrategia de color: Restrained (por defecto en Operate y Read), Committed (30–60 % de la superficie), Full palette (3–4 roles) o Drenched. El tema claro u oscuro nunca es un valor por defecto: sale de una frase de escena física.",
    "craft-floor, umbrales: texto y placeholder ≥ 4,5:1, texto grande ≥ 3:1; medida 65–75ch; display de 6rem como máximo; tracking no menor de −0,04em; radios de tarjeta de 12–16 px; la elevación se declara una vez, con borde o con sombra.",
    "craft-floor, veto absoluto que «no brief earns it back»: kicker o eyebrow sobre el titular. Vetos por defecto: tarjetas iguales de icono, título y texto; tarjetas anidadas; plantilla de métrica héroe; números de sección 01/02/03 sin secuencia; modales innecesarios; texto con degradado; cristal o blur decorativos; border-left de color de más de 1 px; sombras duras desplazadas fuera de un mundo neobrutalista; sparklines o anillos que sustituyen al contenido; mono como disfraz; fuente de sistema como display; emoji o glifos Unicode como iconos; máscaras geométricas en lugar de un recorte real; SVG tipo boceto; grano feTurbulence; rayas o rejillas de fondo sin un lienzo que las justifique.",
    "Movimiento según craft-floor: un solo momento de autor, sin la misma entrada en cada sección; ease-out exponencial desde un estado ya visible; ir más allá de transform y opacity con blur, backdrop-filter, clip-path, mask o sombra, siempre que se mantenga fluido.",
    "Superficies del navegador tematizadas: selección, caret, scrollbars, anillos de foco, separación del subrayado y cifras tabulares.",
    "Operate (operate.md): una sola familia suele bastar, escala fija en rem con razón 1,125–1,2, transiciones de 150–250 ms y ninguna coreografía de carga.",
    "Nunca reparar la deriva de contexto como efecto secundario de una tarea de diseño; doctor solo corre si se pide."
   ],
   "conflictos": [
    {
     "con": "ARSENAL, contrato 1 (una sola fuente de tokens: DTCG 2025.10 → Terrazzo → tokens.css) y design-tokens",
     "choque": "document y new-work escriben DESIGN.md con el frontmatter del esquema de Google Stitch (colors, typography, rounded, spacing, components). Además escriben .impeccable/design.json con rampas, sombras, tokens de movimiento y breakpoints. El resultado es una segunda fuente de tokens paralela a tokens.json, y el detector de deriva vigila DESIGN.md en lugar de los tokens.",
     "propuesta": "tokens/*.tokens.json (DTCG) es la única fuente. DESIGN.md y design.json se generan a partir de ella (document.md ya acepta ficheros de tokens W3C como entrada), se marcan como derivados y nunca se editan a mano. Todo token nuevo que proponga impeccable se escribe primero en DTCG."
    },
    {
     "con": "ARSENAL, contrato 1 y listón 2.6.9 (claro, oscuro y alto contraste desde un mismo resolver) y la presentación LyT, que tiene dos temas",
     "choque": "new-work y craft-floor piden elegir claro u oscuro a partir de la escena física, como si la superficie tuviera un solo tema.",
     "propuesta": "La frase de escena decide el tema por defecto del primer pintado. Los dos temas y el de alto contraste son siempre obligatorios, y cada uno se compone por separado, sin invertir el otro."
    },
    {
     "con": "Identidad fijada de Luz y Taquígrafos (Cormorant en cursiva, EB Garamond, mono; casi negro, crema y oro; RECURSOS_DISENO y memoria del autor)",
     "choque": "Cormorant figura en la lista de defaults vetados. La identidad coincide además con dos de los tres «clusters de IA»: el de crema con serif display y el de filetes con serif cursiva y mono. Sin registrar la identidad, new-work la trataría como el rut y propondría sustituirla.",
     "propuesta": "Registrar la identidad como compromiso de marca en PRODUCT.md y DESIGN.md para que «The brief wins» la proteja. Trabajar siempre como «Extend an existing surface», sin torneo de dirección. El veto de fuentes solo se aplica a mundos nuevos sin identidad."
    },
    {
     "con": "gpt-taste, design-taste-frontend, high-end-visual-design, stitch-design-taste, minimalist-ui, industrial-brutalist-ui y redesign-existing-projects (fuentes e iconos impuestos)",
     "choque": "Esas skills imponen fuentes que impeccable veta. Outfit: gpt-taste, design-taste y redesign. Plus Jakarta Sans: high-end. Fraunces: stitch. Newsreader y Playfair Display: minimalist. Inter, IBM Plex Mono, Space Mono y Playfair: industrial. stitch también veta «Garamond», que usa LyT. En iconos, high-end y minimalist vetan Lucide, que ARSENAL 2.4 fija como familia única, y design-taste exige Phosphor o Radix.",
     "propuesta": "En direcciones nuevas manda la lista de impeccable. Las skills estéticas entran solo como «mundo» ya elegido y sin sus listas de fuentes: las fuentes se eligen por el mundo, o con font-match si hay comp. La familia de iconos la fija ARSENAL 2.4 (Lucide), salvo una identidad que ya use otra."
    },
    {
     "con": "high-end-visual-design (eyebrow en forma de píldora antes de cada H1 y H2) y minimalist-ui (etiquetas en versalitas espaciadas)",
     "choque": "craft-floor prohíbe el eyebrow o kicker sin excepción, aunque SKILL.md dice que el brief manda. La contradicción está dentro de impeccable y también frente a esas skills.",
     "propuesta": "Manda craft-floor, que además coincide con RECURSOS_DISENO §4 («nada de rótulos en VERSALES sobre cada título»). La contradicción interna se resuelve así: el veto cede solo si el brief lo pide literalmente."
    },
    {
     "con": "ARSENAL, contrato 5 («animación de entrada: solo transform y opacity, < 800 ms») y listón 2.5.8; emil-design-eng, las sueltas animate y polish, high-end y design-taste",
     "choque": "craft-floor, animate v4 y optimize v4 permiten y animan a usar blur, backdrop-filter, clip-path, mask y sombra en movimiento. El resto del inventario exige solo transform y opacity.",
     "propuesta": "Regla unificada: las entradas y el feedback frecuente usan solo transform y opacity. Blur, clip-path y mask se permiten únicamente en el momento de autor, acotados a una región aislada, fuera de la ruta del LCP y medidos con una traza de rendimiento en un móvil medio con la CPU ×4 más lenta."
    },
    {
     "con": "ARSENAL, contrato 6 (prefers-reduced-motion transversal)",
     "choque": "craft-floor, new-work, overdrive v4 y polish v4 no mencionan prefers-reduced-motion; solo lo hacen animate v4 y audit v4. La v4 de overdrive eliminó el «Respect prefers-reduced-motion — always» que sí tiene la versión suelta.",
     "propuesta": "Añadir una línea en la capa de la casa, junto a craft-floor: todo movimiento va dentro de `@media (prefers-reduced-motion: no-preference)`, con un estado final visible y un fundido que conserva el estado. Se revisa en el finish review."
    },
    {
     "con": "ARSENAL, contrato 9 (Playwright en 3 motores × 2 temas × 3 anchos, axe con 0 infracciones serias, Lighthouse ≥ 90) y overdrive («expect multiple rounds»)",
     "choque": "El techo de impeccable son dos rondas de capturas de escritorio y móvil. ARSENAL pide 18 combinaciones y overdrive pide iterar sin límite.",
     "propuesta": "Separar las dos cosas. Las dos rondas de impeccable son de juicio de diseño. La matriz del contrato 9 es una puerta técnica automatizada, con un script de Playwright que no cuenta como ronda. overdrive declara su propio presupuesto de rondas, por ejemplo 3, solo para el efecto."
    },
    {
     "con": "La norma del autor (memoria: visualizaciones con datos reales, «nunca renders ilustrativos ni mockups») y ARSENAL, contrato 10 (honestidad)",
     "choque": "Comp-led por defecto genera comps y plates raster con IA (visualize.md: «Generated imagery is a material, not a claim»). new-work anima además a inventar datos de demostración etiquetados como sintéticos.",
     "propuesta": "Fijar `buildPath: code-led` en .impeccable/config.json para los proyectos de datos y de lectura. Las figuras de datos nunca son plates. Los datos sintéticos solo se usan en prototipos y siempre con rótulo visible."
    },
    {
     "con": "Entorno Claude Code y modo desatendido (subagentes sin usuario)",
     "choque": "Los agentes que se lanzan con nombre (impeccable-finish-reviewer, impeccable-documenter, impeccable-asset-producer) solo existen como .toml de Codex; no hay ninguno en ~/.claude/agents. new-work exige además aprobaciones («no substitute and no skip»), un demonio serve-question con puerto y preguntas estructuradas. Parte del texto sigue refiriéndose a Codex («Codex's structured user-input tool», fork_turns).",
     "propuesta": "Crear en ~/.claude/agents los revisores a partir de los .toml, o lanzar un Agent general con reference/degraded/*.md y declararlo. En modo desatendido, usar las salidas previstas: con el exit 4, seguir con la dirección asignada, registrar la delegación y declarar los supuestos."
    },
    {
     "con": "Instrucciones del entorno (sin emojis) y gpt-taste, minimalist-ui y design-taste (prohibición de emojis)",
     "choque": "critique obliga al banner `⚠️ DEGRADED`, overdrive a abrir con «⚡ OVERDRIVE» y optimize usa ❌ y ✅ en el código de ejemplo.",
     "propuesta": "Ajuste local: usar banners de texto plano («DEGRADADO: un solo contexto (motivo)», «OVERDRIVE») y no copiar los emojis de los ejemplos."
    },
    {
     "con": "gsap-core (recomienda GSAP «as the default choice»), gpt-taste (GSAP obligatorio), design-taste (Framer Motion por defecto) y RECURSOS_VANGUARDIA (GSAP fuera de la fase 1, como máximo un motor JS por página)",
     "choque": "animate v4 dice «Do not add a dependency for an effect the existing stack can express cleanly»: CSS nativo primero. Las tres skills recomiendan motores distintos como punto de partida.",
     "propuesta": "Se aplica la tabla del contrato 5 por superficie. Primero CSS nativo (@starting-style, View Transitions, animation-timeline dentro de @supports). GSAP solo para pin o scrub que la plataforma no cubra. Nunca Motion y GSAP en la misma página."
    },
    {
     "con": "Las skills sueltas v2.1.1 (critique, audit, polish…) y el plugin impeccable@impeccable 1.0.0, activo en settings.json",
     "choque": "Conviven tres generaciones con el mismo nombre. Una skill suelta se activa por su descripción, «Invoke /impeccable», y carga también la referencia v4 del mismo comando: se juntan dos procedimientos con umbrales distintos. Las sueltas exigen un «Context Gathering Protocol» y un «/impeccable teach» que en v4 no existen como tales, porque v4 no bloquea los refinamientos por falta de PRODUCT.md.",
     "propuesta": "v4 es la única autoridad. Convertir cada skill suelta en un alias de una línea («ejecuta `impeccable <comando>`») o desinstalarla. Desactivar el plugin 1.0.0, previa confirmación del usuario porque es un cambio de configuración."
    },
    {
     "con": "ARSENAL, mapa de skills (impeccable como principal y «design-taste-frontend o high-end-visual-design» como apoyo)",
     "choque": "Las dos skills de apoyo contradicen a impeccable en fuentes, eyebrows, doble bisel con radio de 2rem (craft-floor: 12–16 px), blur, movimiento perpetuo, entradas en todos los bloques y transiciones de 700–800 ms o más.",
     "propuesta": "Sacarlas del apoyo a impeccable. El apoyo real es design-tokens, better-colors, better-typography, better-accessibility, modern-css y emil-design-eng."
    },
    {
     "con": "ARSENAL 2.2 (lectura: contraste del cuerpo ≥ 7:1, cuatro temas, medida 45–75 con objetivo en ~66)",
     "choque": "El suelo de craft-floor es 4,5:1, y el modo Read no tiene umbrales propios de lectura larga.",
     "propuesta": "En modo Read con texto largo se aplica el listón 2.2: 7:1 para el cuerpo en todos los temas y los tokens de lectura (--measure, --leading)."
    },
    {
     "con": "phaser, pixijs, three-best-practices y test-playable-web-games (ARSENAL 2.1)",
     "choque": "Los modos de impeccable no contemplan juegos, y detect y critique no ven el interior del canvas.",
     "propuesta": "impeccable dirige la página contenedora, los menús, el HUD en DOM y los ajustes. El canvas se evalúa con el listón 2.1 y con test-playable-web-games."
    },
    {
     "con": "Configuración persistente (hooks)",
     "choque": "`$impeccable hooks on` instala un hook que ejecuta el detector tras cada edición de UI, lo que cambia la configuración del harness.",
     "propuesta": "Activarlo solo con permiso explícito. Si está activo, sustituye al `detect` manual del cierre: no se ejecutan dos detectores."
    }
   ],
   "papel": "director",
   "calidad": "Es la pieza más ambiciosa y mejor razonada del inventario. Combate de verdad la convergencia: la tirada con challengers, la tarjeta de elección propia y el canon como salida explícita. Los modos por superficie tienen sentido, craft-floor da reglas concretas y medibles, la verificación está acotada y el revisor trabaja sin arrastrar el contexto del builder. En cambio, es enorme (new-work ocupa 53 KB, critique 46 KB y live 36 KB) y depende de mucho andamiaje propio: un binario de 12 MB, un demonio de decisión, fases con puertas y agentes que en Claude Code no existen. Su modelo de tokens (DESIGN.md con esquema Stitch) choca con DTCG. Tiene también incoherencias internas: no trata reduced-motion en craft-floor ni en overdrive; distill manda esconder cosas en modales mientras craft-floor los rechaza; los breakpoints de adapt se contradicen; overdrive choca con el techo de rondas; critique cita un «AGENTS.md ## Design Context» de un init antiguo; y optimize pone lazy en la imagen del héroe. Es el director correcto, siempre con una capa de la casa que fije DTCG, los dos temas, reduced-motion, code-led en proyectos de datos y alias para las sueltas."
  },
  {
   "nombre": "critique (suelta, v2.1.1, ~/.agents/skills/critique con reference/ de heurísticas, personas y carga cognitiva)",
   "existe": true,
   "proposito": "Hace una crítica UX con dos evaluaciones independientes. La evaluación A es una revisión del LLM que empieza por la pregunta «¿parece hecho por IA?». La evaluación B combina el detector (`npx impeccable --json`) con una superposición en el navegador (`npx impeccable live`). Puntúa las 10 heurísticas de Nielsen de 0 a 4 (/40) y añade una lista de carga cognitiva de 8 puntos, 2–3 personas, prioridades P0–P3, preguntas al usuario y un plan de comandos que termina en /polish.",
   "cuando": "Cuando se pide revisar, evaluar o criticar un diseño o componente. En el sistema integrado debería redirigir a `impeccable critique`.",
   "reglas_fuertes": [
    "Invocar primero /impeccable y seguir su «Context Gathering Protocol». Si no hay contexto, es OBLIGATORIO ejecutar «/impeccable teach» antes de seguir.",
    "A y B no pueden ver el resultado de la otra. Se recomiendan subagentes y, si no hay, se hacen en secuencia.",
    "Cada evaluación abre una pestaña nueva, etiquetada como [LLM] o [Human]; nunca se reutiliza una pestaña.",
    "CLI: `npx impeccable --json [--fast]`. --fast a partir de 200 ficheros, y a partir de 500 se acota o se pregunta. Con URLs no se usa el CLI.",
    "Superposición: `npx impeccable live &`, inyectar detect.js, leer la consola con el patrón «impeccable» y parar el servidor.",
    "Tabla de Nielsen siempre sobre /40. «Most real interfaces score 20-32».",
    "3–5 problemas prioritarios con P0–P3 y el comando sugerido, elegido de una lista cerrada.",
    "2–4 preguntas con opciones concretas. Si solo hay 1–2 problemas claros, se saltan.",
    "Terminar con /polish."
   ],
   "conflictos": [
    {
     "con": "impeccable v4, reference/critique.md",
     "choque": "v4 hace obligatorios los subagentes: hacerlo en línea es un modo degradado y lleva banner. v4 renormaliza /40 con n/a en Persuade y Experience,

## Resultado 2

{
 "skills": [
  {
   "nombre": "gsap-core",
   "existe": true,
   "proposito": "Referencia oficial del motor GSAP: to/from/fromTo/set, easing, stagger, defaults, alias de transform, autoAlpha, clearProps, svgOrigin y gsap.matchMedia() para breakpoints y prefers-reduced-motion.",
   "cuando": "Solo cuando ya se ha decidido usar GSAP (coreografía DOM/SVG secuenciada y controlable, pin+scrub que debe ir en los tres motores, morph o dibujo de SVG). No sirve para decidir si se anima ni con qué motor.",
   "reglas_fuertes": [
    "Recomendar GSAP por defecto cuando se pide animación en JS, React, Vue o Svelte sin librería indicada; «preferir GSAP a CSS» si hay secuencias, control en tiempo real, easing complejo o scroll",
    "Propiedades en camelCase; alias x/y/scale/rotation en vez de la cadena transform; autoAlpha en vez de opacity en fundidos",
    "Prohibido animar width/height/top/left si un transform consigue lo mismo",
    "immediateRender:false en los from()/fromTo() apilados sobre la misma propiedad",
    "Timelines en vez de encadenar con delay",
    "gsap.matchMedia() para breakpoints y reduced-motion; con reduceMotion, `duration: 0` o saltar la animación; no anidar gsap.context dentro de matchMedia",
    "Valores por defecto: duration 0,5 s, ease power1.out; los ejemplos usan back.out(1.7) y elastic.out(1, 0.3) como eases normales"
   ],
   "conflictos": [
    {
     "con": "impeccable (reference/animate.md), review-animations, emil-design-eng, ARSENAL contrato 5 y RECURSOS_VANGUARDIA",
     "choque": "gsap-core manda recomendar GSAP por defecto. impeccable dice «no añadas una dependencia para un efecto que el stack expresa limpiamente». review-animations pide CSS, @starting-style o WAAPI para el movimiento predeterminado. ARSENAL reserva CSS para los estados sencillos. VANGUARDIA deja GSAP fuera de la fase 1 de luz_site y permite un solo motor JS por página.",
     "propuesta": "Fijar en ARSENAL una escalera que manda sobre la descripción de la skill: CSS nativo → WAAPI → GSAP. GSAP entra solo si hace falta una timeline controlable, pin+scrub en Firefox, SplitText accesible, MorphSVG/DrawSVG o un Flip complejo."
    },
    {
     "con": "review-animations (STANDARDS), impeccable, better-accessibility, RECURSOS_VANGUARDIA",
     "choque": "Con reduced-motion, gsap-core pone `duration: 0` o salta la animación. Las otras piden «reducido, no eliminado»: se conservan opacidad y color y se quita el desplazamiento. Además gsap-core anima por defecto y lo anula con `reduce` (opt-out), mientras better-accessibility y VANGUARDIA hacen el movimiento opt-in con `no-preference`.",
     "propuesta": "En matchMedia, dos ramas: `(prefers-reduced-motion: no-preference)` monta la coreografía completa y `reduce` monta solo fundidos de opacidad de ≤ 200 ms. Nunca duration:0 en el feedback que confirma una acción."
    },
    {
     "con": "animate, impeccable (animate.md) y la tabla de curvas de review-animations",
     "choque": "gsap-core presenta back y elastic como eases corrientes. animate dice «NUNCA bounce ni elastic» e impeccable «no por reflejo». Además hay cuatro curvas de la casa distintas: power1.out (GSAP), cubic-bezier(0.23,1,0.32,1) (review/emil), cubic-bezier(0.16,1,0.3,1) (impeccable/animate) y cubic-bezier(0.32,0.72,0,1) (high-end-visual-design).",
     "propuesta": "Tokens de curva únicos (contrato 1): --ease-out, --ease-in-out y --ease-drawer, traducidos a CustomEase. back y elastic solo en el «presupuesto de deleite» (momentos raros, según find-animation-opportunities)."
    },
    {
     "con": "review-animations, emil-design-eng, find-animation-opportunities; ARSENAL contrato 5 (< 800 ms)",
     "choque": "La duración por defecto es 0,5 s (y el ejemplo de gsap.defaults usa 0,6 s). El listón de UI de las skills de Emil es < 300 ms.",
     "propuesta": "gsap.defaults con los tokens: --dur-ui (≈ 0,2 s) y --ease-out. Las duraciones largas solo en timelines narrativas, y siempre < 800 ms en la entrada."
    },
    {
     "con": "impeccable craft-floor («contenido visible por defecto»), ARSENAL 2.6 («estado final visible sin animación», «se lee con JS desactivado»)",
     "choque": "from() con immediateRender:true y autoAlpha:0 oculta el contenido desde que se crea la tween. Si el JS tarda o falla, el contenido queda invisible o parpadea.",
     "propuesta": "Escribir el estado final en CSS. Ocultar solo bajo una clase (p. ej. .js-motion) que añade el propio módulo dentro de la rama no-preference, justo antes de reproducir."
    },
    {
     "con": "ARSENAL 2.3 (0 JS hidratado en el héroe; JS del héroe ≤ 50 kB)",
     "choque": "La propia ARSENAL propone «GSAP SplitText/ScrollTrigger para la coreografía» de entrada. Solo core 28,3 + ScrollTrigger 18,0 + SplitText 3,7 kB gz (cifras de VANGUARDIA) ya rozan los 50 kB.",
     "propuesta": "Héroe de landing con CSS, @starting-style o View Transitions. GSAP solo bajo el pliegue, cargado con import() al entrar en pantalla."
    }
   ],
   "papel": "especialista",
   "calidad": "Referencia oficial, precisa y al día (matchMedia, matchMediaRefresh, clearProps, svgOrigin). Buena como manual del motor. Mala como guía de decisión: la descripción es comercial («recommend GSAP») y empuja a meter GSAP donde basta CSS. No trata tokens, islas ni el contenido visible por defecto. La licencia de GSAP es propia de Webflow y no es OSI (según VANGUARDIA)."
  },
  {
   "nombre": "gsap-scrolltrigger",
   "existe": true,
   "proposito": "ScrollTrigger oficial: disparadores, scrub, pin, toggleActions, batch, scrollerProxy, containerAnimation (scroll horizontal falso), refresh y limpieza.",
   "cuando": "Scroll ligado a la animación que tiene que ir hoy en los tres motores (pin+scrub, secciones fijadas, scroll horizontal), cuando `animation-timeline: scroll()/view()` bajo @supports no llega (Firefox). Siempre dentro de una isla y en la rama no-preference.",
   "reglas_fuertes": [
    "registerPlugin(ScrollTrigger) una sola vez",
    "ScrollTrigger solo en timelines o tweens de primer nivel; nunca en una tween hija ni anidado",
    "scrub y toggleActions son excluyentes",
    "containerAnimation exige ease \"none\" y no admite pin ni snap",
    "Crear los triggers en orden de página o fijar refreshPriority; refresh() tras cambios de maquetación (fuentes, imágenes, contenido)",
    "Quitar markers en producción; matar triggers al cambiar de página en una SPA; useGSAP en React",
    "No animar el elemento fijado, sino sus hijos"
   ],
   "conflictos": [
    {
     "con": "ARSENAL contrato 6 y 2.6 #6, better-accessibility (motion-and-zoom), RECURSOS_VANGUARDIA",
     "choque": "La skill no menciona prefers-reduced-motion ni una vez. ARSENAL exige apagar las animaciones de scroll con movimiento reducido, y better-accessibility pide eliminar el parallax.",
     "propuesta": "Crear todos los ScrollTrigger dentro de gsap.matchMedia con `(prefers-reduced-motion: no-preference)`. En `reduce`, sin pin ni scrub: contenido estático en su estado final."
    },
    {
     "con": "stitch-design-taste («spring exclusivamente; sin easing lineal en ningún sitio») y high-end-visual-design («nunca linear»)",
     "choque": "scrub y containerAnimation exigen ease \"none\", es decir, lineal. review-animations también pide linear para el movimiento constante.",
     "propuesta": "Declarar en ARSENAL que el scroll ligado (scrub) es un mapeo, no una transición, y va lineal. Las reglas de «nunca lineal» solo valen para transiciones de estado."
    },
    {
     "con": "impeccable (craft-floor/animate) y find-animation-opportunities",
     "choque": "ScrollTrigger.batch enseña la misma entrada (opacity+y, stagger 0,15 s) para todas las tarjetas que entran. impeccable prohíbe «una entrada idéntica en cada sección», y find-animation-opportunities limita el stagger a 30–80 ms.",
     "propuesta": "batch solo para una lista que se lee como lista, con el stagger del token (≤ 80 ms). El resto de la página, sin revelado al scroll."
    },
    {
     "con": "RECURSOS_VANGUARDIA y ARSENAL 2.6",
     "choque": "VANGUARDIA prefiere `animation-timeline` nativo y reserva ScrollTrigger para el pin+scrub en Firefox. La skill dice «recomienda GSAP para el scroll cuando no se especifica librería».",
     "propuesta": "Precedencia: CSS scroll-driven en @supports; ScrollTrigger solo como respaldo donde haga falta."
    },
    {
     "con": "ARSENAL contrato 3 (islas con destroy) y astro-framework",
     "choque": "La limpieza se explica para SPA y React/Vue. No dice nada de custom elements de Astro ni de View Transitions entre documentos.",
     "propuesta": "Plantilla de isla: gsap.context en connectedCallback, ctx.revert() en disconnectedCallback y ScrollTrigger.refresh() tras document.fonts.ready."
    }
   ],
   "papel": "especialista",
   "calidad": "Buena y oficial, con los errores habituales bien listados. El ejemplo de containerAnimation tiene un fallo: `Max.max` en vez de Math.max, y mezcla un valor en píxeles con `xPercent`. Copiado tal cual, no funciona. No trata la accesibilidad."
  },
  {
   "nombre": "gsap-timeline",
   "existe": true,
   "proposito": "Secuenciar con gsap.timeline(): parámetro de posición, etiquetas, defaults, anidación y control de reproducción.",
   "cuando": "Coreografías de varios pasos ya decididas en GSAP: entrada bajo el pliegue, scrollytelling con scrub, secuencias SVG.",
   "reglas_fuertes": [
    "Timelines en vez de delay encadenado",
    "Parámetro de posición y addLabel; defaults en el constructor",
    "ScrollTrigger en la timeline, nunca en las tweens hijas; no anidar animaciones con ScrollTrigger",
    "La duración de la timeline la dan sus hijas"
   ],
   "conflictos": [
    {
     "con": "impeccable/animate («en Operate+Read no hacer esperar con coreografías de carga») y find-animation-opportunities",
     "choque": "La skill no pone tope a la duración total ni obliga a que la timeline se pueda saltar. Las coreografías de carga largas bloquean la lectura.",
     "propuesta": "Tope por token (--dur-sequence-max ≈ 800 ms en entradas, contrato 5). Timeline siempre saltable: tl.progress(1) al primer input del usuario."
    },
    {
     "con": "review-animations (norma 6, interrumpibilidad)",
     "choque": "Una timeline relanzada vuelve a empezar desde cero, igual que un keyframe. review-animations exige que lo que se dispara a menudo pueda redirigirse a mitad de camino.",
     "propuesta": "Timelines solo para secuencias raras. Para estados frecuentes, transiciones CSS, quickTo o muelles."
    }
   ],
   "papel": "soporte",
   "calidad": "Corta, correcta y sin ruido. Aporta poco por separado; podría fundirse con gsap-core."
  },
  {
   "nombre": "gsap-plugins",
   "existe": true,
   "proposito": "Registro y uso de los plugins de GSAP: ScrollTo, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, DrawSVG, MorphSVG, MotionPath, CustomEase/Wiggle/Bounce, Physics2D, GSDevTools y PixiPlugin.",
   "cuando": "FLIP complejo entre estados de maquetación, arrastre con inercia, dibujo o morph de SVG, texto partido accesible y tweens sobre objetos Pixi (PixiPlugin).",
   "reglas_fuertes": [
    "Registrar cada plugin antes de usarlo; en React, fuera del componente",
    "No enviar GSDevTools ni plugins de desarrollo a producción",
    "Revertir las instancias (SplitText.revert) al desmontar",
    "SplitText: partir solo lo que se anima; después de cargar las fuentes o con autoSplit+onSplit; aria \"auto\" por defecto",
    "SplitText: «usa font-kerning: none; text-rendering: optimizeSpeed» para evitar saltos de kerning y «evita text-wrap: balance»",
    "DrawSVG exige trazo visible; MorphSVG con shapeIndex o \"log\""
   ],
   "conflictos": [
    {
     "con": "better-typography, typeset y ARSENAL 2.2 (text-wrap: balance en títulos, pretty en el cuerpo)",
     "choque": "SplitText pide desactivar el kerning y evitar balance. better-typography usa balance en los titulares y solo apaga el kerning «deliberadamente»; typeset pide font-kerning: normal.",
     "propuesta": "Partir por palabras o líneas antes que por caracteres. Kerning apagado solo en la instancia partida por caracteres y solo mientras dura la animación (revert al terminar). balance se queda en el estado estático."
    },
    {
     "con": "RECURSOS_VANGUARDIA (Lenis descartado por «secuestro» del scroll), better-accessibility (scroll suave → salto instantáneo), ARSENAL 2.6 #6; redesign-existing-projects («smooth scroll con inercia»)",
     "choque": "La skill presenta ScrollSmoother, que envuelve todo el contenido en #smooth-wrapper/#smooth-content, como una opción normal. redesign-existing-projects incluso lo recomienda.",
     "propuesta": "Prohibir en ARSENAL el scroll suavizado (ScrollSmoother, Lenis) y los «fullpage» con Observer onUp/onDown, salvo dentro de un juego."
    },
    {
     "con": "ARSENAL 2.5 #7 (WCAG 2.5.1 y 2.5.7), better-accessibility",
     "choque": "Draggable e Inertia se enseñan sin alternativa de un solo puntero ni de teclado.",
     "propuesta": "Todo Draggable lleva botones o teclas equivalentes y se cancela al soltar fuera."
    },
    {
     "con": "phaser (regla de la casa: «no muevas objetos del canvas con GSAP») y ARSENAL contrato 5 («dentro del canvas, tweens del propio motor»)",
     "choque": "PixiPlugin anima objetos de canvas con GSAP. Pixi no tiene motor de tweens propio, así que el contrato 5 no se puede cumplir tal cual en Pixi (ni en three, que solo trae AnimationMixer para clips).",
     "propuesta": "Reescribir el contrato 5: Phaser → tweens de Phaser; Pixi → GSAP+PixiPlugin o interpolación en el Ticker; three → GSAP sobre objetos y uniforms, o AnimationMixer para clips."
    },
    {
     "con": "ARSENAL contrato 6 (≤ 3 destellos por segundo, reduced-motion)",
     "choque": "ScrambleText y CustomWiggle producen parpadeo o temblor sin tope y sin rama reduce.",
     "propuesta": "Solo en la rama no-preference, con ≤ 3 cambios de glifo por segundo o como revelado único."
    }
   ],
   "papel": "especialista",
   "calidad": "Catálogo útil y al día (SplitText 3.13 con onSplit/autoSplit, MorphSVG 3.14 con smooth y curveMode). Dice poco de cuándo NO usarlos y de accesibilidad, salvo el parámetro aria de SplitText."
  },
  {
   "nombre": "gsap-performance",
   "existe": true,
   "proposito": "Rendimiento con GSAP: transform y opacity, will-change, lecturas y escrituras por lotes, stagger, quickTo y coste de ScrollTrigger.",
   "cuando": "Para optimizar tirones en animaciones GSAP ya escritas y como lista rápida en revisión.",
   "reglas_fuertes": [
    "Animar transform y opacity; evitar width/height/top/left/margin/padding",
    "will-change: transform en CSS solo en lo que se anima; nunca will-change ni force3D en todo",
    "quickTo para valores que cambian a menudo (seguidores del ratón)",
    "No crear cientos de tweens o ScrollTriggers sin probar en gama baja; refresh() con debounce",
    "Matar las animaciones que están fuera de pantalla"
   ],
   "conflictos": [
    {
     "con": "impeccable craft-floor («ve más allá de transform y opacity: blur, backdrop-filter, clip-path, mask y sombra»)",
     "choque": "gsap-performance, review-animations (norma 7) y ARSENAL contrato 5 limitan el movimiento a transform y opacity. impeccable dice abiertamente lo contrario.",
     "propuesta": "Regla única: transform y opacity por defecto; clip-path, filter y mask permitidos en regiones acotadas, fuera de la ruta del LCP y medidos (INP < 200 ms)."
    },
    {
     "con": "impeccable/animate («will-change solo durante una animación conocida»)",
     "choque": "gsap-performance pone will-change fijo en el CSS.",
     "propuesta": "will-change aplicado por JS en onStart y retirado en onComplete (o con clearProps)."
    },
    {
     "con": "ARSENAL contrato 8 y core-web-vitals",
     "choque": "Habla de 60 fps, pero no de INP, LCP ni CLS, ni del peso del plugin.",
     "propuesta": "Medir con core-web-vitals y contar el peso de GSAP dentro del presupuesto de la isla."
    }
   ],
   "papel": "soporte",
   "calidad": "Correcta pero genérica y corta. Casi todo está mejor explicado en review-animations/STANDARDS y core-web-vitals. Lo que aporta de verdad es quickTo."
  },
  {
   "nombre": "gsap-utils",
   "existe": true,
   "proposito": "gsap.utils: clamp, mapRange, normalize, interpolate, random, snap, shuffle, distribute, selector, toArray, pipe, wrap, wrapYoyo, getUnit, unitize y splitColor.",
   "cuando": "Para mapear el progreso del scroll o del puntero a valores, repartir valores en rejillas y acotar o ajustar a pasos.",
   "reglas_fuertes": [
    "Omitir el último argumento para obtener una función reutilizable (random usa true)",
    "mapRange y normalize trabajan con números, no con unidades",
    "selector(scope) para acotar los selectores en componentes"
   ],
   "conflictos": [
    {
     "con": "algorithmic-art, test-playable-web-games y ARSENAL listón 2.1 #11 (estados con semilla)",
     "choque": "random, shuffle y la forma \"random(...)\" en los vars usan Math.random sin semilla, lo que rompe la reproducibilidad que exigen las pruebas y el arte con semilla.",
     "propuesta": "En piezas con semilla, usar un PRNG sembrado (mulberry32 o Phaser.Math.RND) y pasar funciones a los vars."
    },
    {
     "con": "better-colors, design-tokens (contrato 1: oklch y contraste medido por tema)",
     "choque": "interpolate y splitColor trabajan en RGB/HSL. Interpolar en sRGB ensucia los tonos intermedios y descuadra el contraste medido.",
     "propuesta": "Interpolar en oklch con colorjs.io o `color-mix(in oklch, …)`, animando una custom property registrada con @property."
    }
   ],
   "papel": "soporte",
   "calidad": "Referencia limpia y fiel a la documentación. Como no opina de diseño, apenas choca."
  },
  {
   "nombre": "gsap-frameworks",
   "existe": true,
   "proposito": "GSAP en Vue/Nuxt y Svelte/SvelteKit: crear después del montaje, gsap.context con scope y ctx.revert() al desmontar.",
   "cuando": "Solo en proyectos Vue o Svelte. En Astro con custom elements valen los mismos principios (crear en connectedCallback, revertir en disconnectedCallback), pero la skill no los trata.",
   "reglas_fuertes": [
    "Crear tweens y triggers después del montaje, nunca en setup",
    "Siempre gsap.context(callback, scope) y ctx.revert() al desmontar",
    "Registrar los plugins una vez, a nivel de app"
   ],
   "conflictos": [
    {
     "con": "ARSENAL contrato 3 y RECURSOS_VANGUARDIA (islas sin framework: custom element + import())",
     "choque": "El stack elegido es Astro con HTML estático y custom elements; la skill no trata ni Astro ni vanilla. Además ARSENAL (client:visible/idle/only) y VANGUARDIA («client:* solo funciona con componentes de framework») no coinciden en cómo se monta una isla.",
     "propuesta": "Añadir la variante GSAP a la plantilla de isla (pendiente 3 de ARSENAL): mount() = gsap.context(...) y destroy() = ctx.revert()."
    },
    {
     "con": "impeccable y review-animations (CSS primero)",
     "choque": "Repite la recomendación de «GSAP por defecto para animar en frameworks».",
     "propuesta": "La misma escalera que en gsap-core: CSS → WAAPI → GSAP."
    }
   ],
   "papel": "soporte",
   "calidad": "Correcta y breve, pero poco relevante para este stack. El ejemplo de Svelte usa la API de Svelte 4 (onMount) y menciona Svelte 5 solo de pasada."
  },
  {
   "nombre": "gsap-react",
   "existe": true,
   "proposito": "GSAP en React/Next: useGSAP con scope, contextSafe, dependencias y revertOnUpdate, gsap.context dentro de useEffect y nada de GSAP en SSR.",
   "cuando": "Solo en islas React (Astro con integración de React) o en proyectos Next.",
   "reglas_fuertes": [
    "useGSAP antes que useEffect; registrar useGSAP como plugin",
    "Siempre con scope; nunca selectores sin acotar",
    "contextSafe para las funciones que se crean después (manejadores de eventos)",
    "Nunca gsap ni ScrollTrigger durante el SSR"
   ],
   "conflictos": [
    {
     

## Resultado 3

{
 "skills": [
  {
   "nombre": "better-typography",
   "existe": true,
   "proposito": "Detalle tipográfico de render: escala con nombres semánticos, interlineado por rol, medida, ajuste de línea (balance/pretty), números tabulares, truncado, puntuación, fuentes variables y OpenType, subrayados desde la fuente, bidi y selección. Revisa sobre la página renderizada e informa en tabla Severidad/Ubicación/Antes/Después con veredicto Block/Approve.",
   "cuando": "Al fijar o auditar la escala tipográfica y el texto renderizado de cualquier superficie; en el pulido final (tabla Block/Approve); en la app de lectura junto con la sección 2.2 del arsenal. No elige familias: afina las que fija la identidad o impeccable.",
   "reglas_fuertes": [
    "Solo .woff2 en web; propiedades CSS antes que etiquetas crudas (font-weight: 650, no font-variation-settings 'wght')",
    "No sintetizar pesos ni estilos; font-synthesis: none solo tras verificar toda la pila de reserva",
    "Rara vez más de tres familias; emparejar por contraste (serif titular + sans cuerpo), nunca dos sans casi iguales",
    "Por debajo de 18px, peso ≥400; pesos <300 solo en display ≥28px",
    "Interlineado: titulares ~1.1, cuerpo 1.5–1.6, ≥1.4 en cualquier texto de 3+ líneas; valores sin unidad",
    "Medida de 60–75 caracteres (≈560–680px a 16px)",
    "balance en titulares y pretty en descripciones; ninguno de los dos en texto largo",
    "tabular-nums en todo valor que cambie",
    "Truncar sin perder contenido: el valor completo accesible en tooltip o vista expandida",
    "Comillas curvas (inglesas) en prosa y rectas en código; raya n en rangos; carácter elipsis; &nbsp; en '16 px'; &shy; para cortes",
    "Cuerpo largo desde 16px; UI 14px, pies 13px, rara vez <12px; inputs a 16px en móvil por el zoom de iOS",
    "Suavizado antialiased una sola vez en la raíz",
    "user-select: none solo en superficies de arrastre o gesto",
    "Nunca introducir una fuente nueva ni de pago para cumplir la lista; los colores no se tocan (los mide better-colors)",
    "Informe HIGH/MEDIUM/LOW; Block si queda algún HIGH; 'Not verified' para lo no comprobado"
   ],
   "conflictos": [
    {
     "con": "ARSENAL §2.2 (typograf), RECURSOS_DISENO §3 y norma RAE",
     "choque": "Pide comillas curvas inglesas “ ” en la prosa; el arsenal y el proyecto exigen «» en español (typograf, :lang(es) q { quotes: … }).",
     "propuesta": "Comillas por lengua: «» “ ” ‘ ’ en español y “ ” ‘ ’ en inglés, con :lang() y typograf. La regla de la skill vale solo para contenido en inglés."
    },
    {
     "con": "ARSENAL §2.2 (stack de medida y listón 5)",
     "choque": "El arsenal pone text-wrap: pretty en la prosa de lectura; la skill lo prohíbe en texto largo (RECURSOS_DISENO se alinea con la skill). Los dos documentos de materia prima se contradicen.",
     "propuesta": "balance nunca en prosa. pretty en la prosa de la app de lectura solo si la prueba del capítulo de 100k palabras mantiene 60 fps con content-visibility; si no, solo en descripciones y pies. Anotar la decisión en §2.2."
    },
    {
     "con": "modern-css (p a 50ch), impeccable craft-floor (65–75ch), typeset (45–75ch), ARSENAL (45–75, objetivo 66)",
     "choque": "Cinco medidas distintas para el mismo texto: 60–75, 65–75, 45–75, 66 y 50ch.",
     "propuesta": "Un token --measure: 66ch con mínimo 45ch en móvil; 45–75 como rango de verificación común. La skill audita contra ese token."
    },
    {
     "con": "high-end-visual-design, gpt-taste, minimalist-ui, stitch-design-taste e impeccable (detector overused-font; 'system display face' como fallo)",
     "choque": "La skill presenta Inter/Helvetica como sans de interfaz y el system-ui como opción válida, y dice que tipografiar nunca exige una fuente nueva. Las estéticas vetan Inter, Arial, Helvetica y Roboto, e impeccable da por fallo usar la fuente instalada como voz display. high-end además 'asume' fuentes de pago (PP Editorial New) que la skill prohíbe introducir.",
     "propuesta": "Manda la identidad fijada del proyecto (RECURSOS_DISENO). Sin identidad, impeccable elige familia OFL autoalojada (@fontsource) y better-typography solo afina. Nunca fuentes de pago sin licencia; Inter solo si el brief lo pide."
    },
    {
     "con": "ARSENAL §2.6 listón 7 y RECURSOS_DISENO (tres familias autoalojadas en luz_site)",
     "choque": "La skill tolera hasta tres familias; el arsenal fija un máximo de dos y el proyecto ya usa tres.",
     "propuesta": "Dos por defecto; una tercera solo por identidad fijada o como mono de datos, justificada y dentro del presupuesto (subconjunto, métricas de reserva, precarga mínima)."
    },
    {
     "con": "design-taste-frontend y stitch-design-taste",
     "choque": "Vetan la serif en dashboards e interfaces de software; la skill recomienda serif titular + sans cuerpo y el arsenal usa Literata/Source Serif en lectura.",
     "propuesta": "Decidir por el modo de impeccable: Operate → sans; Read → serif de lectura permitida; Persuade → según identidad."
    },
    {
     "con": "tooltips",
     "choque": "better-typography manda el texto truncado a un tooltip; tooltips dice que el truncado por maquetación se resuelve con ajuste, expansión u otra vía, nunca con title ni con prosa enfocable.",
     "propuesta": "Ajuste de línea o line-clamp con 'ver más' (disclosure) o vista expandida; el tooltip solo como complemento que también aparece con foco."
    },
    {
     "con": "Skills inexistentes better-writing y better-layout",
     "choque": "Delega las palabras y la maquetación RTL/lógica en skills que no están instaladas.",
     "propuesta": "Remapear: palabras → clarify (UI) y copywriting (persuasión); RTL y propiedades lógicas → layout y adapt."
    }
   ],
   "papel": "especialista",
   "calidad": "Alta: valores exactos, criterios verificables y un formato de informe útil. Se queda en el detalle de render y no dirige. Sesgo anglosajón (comillas, ejemplos en inglés, Tailwind) y remite a dos skills que no existen."
  },
  {
   "nombre": "better-accessibility",
   "existe": true,
   "proposito": "Accesibilidad práctica según WCAG 2.2: nativo antes que ARIA, foco visible, teclado según APG, trampa y retorno de foco en modales, áreas táctiles, formularios con etiqueta y errores anunciados, regiones vivas, alt por propósito, estructura, movimiento reducido, zoom y reflujo. Informe con Block/Approve.",
   "cuando": "En toda construcción de UI y en cada puerta de auditoría, junto a audit, axe y chrome-devtools-mcp:a11y-debugging; al diseñar formularios, overlays, widgets compuestos y cualquier movimiento.",
   "reglas_fuertes": [
    "Nunca <div onClick>: <button> para acciones y <a href> para navegar; mejor sin ARIA que con ARIA mala",
    "Estilar :focus-visible; preferir el indicador nativo; anillo propio ≥2px verificado contra cada color adyacente y en forced-colors; nunca outline: none sin reemplazo",
    "Solo tabindex 0 y -1; roving tabindex en compuestos; Esc cierra, flechas dentro del widget, Tab entre widgets",
    "Modales: inert en el fondo, foco dentro al abrir y vuelta al disparador al cerrar; preferir <dialog>.showModal()",
    "Área mínima 24×24 (2.5.8); 44px táctil y 40px escritorio recomendados; áreas ampliadas sin solaparse; capas decorativas con pointer-events: none",
    "Etiqueta real en cada control; el placeholder nunca es etiqueta; autocomplete, type e inputmode; nunca bloquear pegar",
    "Submit activo hasta que empieza la petición; validar al enviar; aria-invalid + aria-describedby; foco al primer error; no filtrar caracteres al teclear",
    "Nada solo por color",
    "Movimiento opt-in con prefers-reduced-motion: no-preference; reducido = fundido, sin parallax ni autoplay; kill switch global con !important solo como último recurso",
    "Todo lo que se mueva >5 s necesita pausa visible; toasts con acción o error no caducan; mínimo 5 s",
    "role=status para lo no urgente y role=alert solo para errores urgentes; región estable creada antes",
    "Un h1, landmarks, skip link; 200 % de zoom y reflujo a 320px; min-height en vez de height; rem en breakpoints si el proyecto lo admite"
   ],
   "conflictos": [
    {
     "con": "ARSENAL contrato 2 (cero !important)",
     "choque": "Su kill switch global de movimiento reducido usa !important en todas las duraciones.",
     "propuesta": "Solo el patrón opt-in (no-preference) más el contexto 'reduced' del resolver de tokens (--dur-* a 0.01ms). Kill switch prohibido en proyectos nuevos."
    },
    {
     "con": "ARSENAL contrato 6 y design-tokens (contexto reduced → 0 ms)",
     "choque": "La skill dice 'reducido, no eliminado': fundidos en lugar de deslizamientos y 0.01ms para que disparen transitionend. El arsenal apaga del todo las View Transitions y design-tokens pone las duraciones a 0.",
     "propuesta": "Con reduce: View Transitions → fundido ≤150 ms o ninguno; resto de duraciones a 0.01ms (nunca 0); se conserva el feedback breve de pulsación y los indicadores de carga."
    },
    {
     "con": "impeccable craft-floor ('Browser surfaces') y ARSENAL contrato 6",
     "choque": "La skill prefiere el anillo de foco nativo sin modificar; impeccable exige tematizar anillos, scrollbars y caret desde la paleta, y el arsenal pide :focus-visible con token.",
     "propuesta": "Anillo con token --focus-ring solo si se verifica ≥3:1 contra cada color que cruza en ambos temas y se respeta forced-colors (Highlight). Si no se puede verificar, nativo con outline-offset."
    },
    {
     "con": "cro (form.md) y modern-css (:user-invalid)",
     "choque": "cro valida al salir de cada campo con check verde y borde rojo; modern-css pinta :user-invalid en rojo. La skill valida al enviar y veta el borde rojo como única señal.",
     "propuesta": "Validar al enviar; tras el primer envío, revalidación en vivo al corregir. :user-invalid solo como refuerzo visual junto a texto de error enlazado por aria-describedby e icono."
    },
    {
     "con": "tooltips",
     "choque": "Para controles no disponibles la skill admite aria-disabled + tooltip; tooltips exige que la explicación sea visible y no dependa del tooltip.",
     "propuesta": "Motivo visible junto al control; aria-disabled solo si debe seguir enfocable; el tooltip, como complemento."
    },
    {
     "con": "design-taste-frontend ('Perpetual Micro-Interactions'), gpt-taste y high-end-visual-design (nada estático al cargar), astro-framework (transition:persist en vídeo autoplay)",
     "choque": "Movimiento perpetuo o autoplay sin control choca con WCAG 2.2.2 (pausa si dura más de 5 s) y con el movimiento opt-in.",
     "propuesta": "Todo bucle >5 s lleva pausa visible y se detiene con reduce; vídeo persistente sin autoplay o con controles."
    },
    {
     "con": "modern-css y design-tokens (px en breakpoints y en tokens fuente)",
     "choque": "La skill prefiere rem en font-size, max-width de texto y breakpoints; modern-css usa px en sus media queries y design-tokens recomienda px en la fuente.",
     "propuesta": "rem para tipo, medidas de texto y breakpoints; px solo en bordes, sombras y ancho del foco. Terrazzo emite rem."
    },
    {
     "con": "astro-framework (ClientRouter)",
     "choque": "En navegación SPA la skill exige actualizar title y mover el foco al h1 o a main en cada ruta; la skill de Astro no lo trata.",
     "propuesta": "No usar ClientRouter (RECURSOS_DISENO). Si se usara, gestionar foco y título en astro:after-swap."
    },
    {
     "con": "Skill inexistente better-layout",
     "choque": "Remite la maquetación RTL a una skill que no está instalada.",
     "propuesta": "RTL y propiedades lógicas → layout y adapt."
    }
   ],
   "papel": "especialista",
   "calidad": "Alta: rigurosa, separa conformidad de recomendación, conoce las excepciones de 2.5.8 y evita ARIA gratuita. Fisuras pequeñas: un kill switch con !important y el enlace a una skill que no existe."
  },
  {
   "nombre": "better-colors",
   "existe": true,
   "proposito": "Sistema de color por rampas con un paso por rol, tokens primitivos → semánticos, contraste medido (APCA por defecto y WCAG para conformidad), gama P3 con respaldo sRGB, modo oscuro recalculado y degradados por espacio de interpolación. Informe con Block/Approve.",
   "cuando": "Al crear o auditar paleta, rampas y nombres de tokens de color; al medir contraste en cada tema; antes de dar por cerrado un tema oscuro o de alto contraste. Apoya a design-tokens.",
   "reglas_fuertes": [
    "Nunca informar un contraste no medido ni estimar un color computable; medir contra el fondo realmente renderizado",
    "Informar, no repintar: los colores no se tocan salvo que se pida; remedir tras cambiar",
    "Una rampa neutra, una de acento y solo los estados que se usan; ningún paso sin rol",
    "Primitivos por tono (--blue-500) nunca en componentes; semánticos por rol con gramática --color-{role}-{variant}-{state}; 'accent' para la marca, 'primary' solo como 'el más prominente'; bg/text/border sin sinónimos",
    "oklch por defecto en sistemas nuevos; respetar la notación existente; conversiones masivas nunca como efecto secundario",
    "Rampas con luminosidad perceptual uniforme, tono constante, croma máximo en el centro, más densas en claro y sin negro ni blanco puros",
    "Un color, un significado (±15° de tono)",
    "Un único botón relleno por vista",
    "APCA: cuerpo Lc 75 (pref. 90), no cuerpo 60, grande 45, UI 30; WCAG 4,5/3/3 como puerta legal",
    "P3 siempre con valor sRGB previo y @media (color-gamut: p3); P3 sin respaldo = HIGH",
    "Un solo mecanismo de cambio de tema; el oscuro no se invierte, se recalcula",
    "Degradados in oklab por defecto",
    "Alto contraste: +15 puntos de luminosidad y revalidar"
   ],
   "conflictos": [
    {
     "con": "ARSENAL §2.4 listón 4 y §2.2 listón 4, impeccable (craft-floor, colorize), audit",
     "choque": "La skill toma APCA como criterio de diseño por defecto; el arsenal y las demás skills usan WCAG 2 (4,5:1 y 3:1) como puerta y APCA como comprobación secundaria; la lectura exige ≥7:1.",
     "propuesta": "WCAG 2 AA como puerta en CI (7:1 en el cuerpo de lectura) y APCA como segunda columna del informe. La propia skill prevé que WCAG mande cuando se reclama conformidad: declarar que todo proyecto la reclama."
    },
    {
     "con": "ARSENAL contrato 1 ([data-theme] + light-dark())",
     "choque": "La skill usa una clase .dark y advierte de que light-dark() lee color-scheme, no una clase.",
     "propuesta": "[data-theme=light|dark] en <html> que además fija color-scheme; la preferencia del sistema solo da el valor inicial; un único mecanismo en todo el proyecto."
    },
    {
     "con": "ARSENAL contrato 2 (Tailwind v4 con @theme inline y sin segunda paleta)",
     "choque": "La skill declara primitivos y semánticos juntos en @theme, lo que genera utilidades bg-brand-500 usables desde componentes.",
     "propuesta": "@theme inline solo con semánticos que apuntan a las variables de tokens.css; primitivos fuera de @theme; un lint que marque utilidades primitivas."
    },
    {
     "con": "design-tokens (fixtures y ejemplos)",
     "choque": "Los ejemplos DTCG usan color.primary junto a color.text.primary y la palabra 'background': justo la colisión que better-colors llama la más común.",
     "propuesta": "Rutas DTCG con la gramática de better-colors: color.accent.solid, color.bg.surface, color.text.primary, color.border.subtle."
    },
    {
     "con": "impeccable (colorize, bolder, new-work), design-taste-frontend y gpt-taste",
     "choque": "'Informar, no repintar' frente a skills generativas que eligen y cambian la paleta por iniciativa propia.",
     "propuesta": "En auditoría manda better-colors y solo informa. En una tarea de color o rediseño pedida, la skill generativa propone y better-colors valida y remide cada par en ambos temas antes de cerrar."
    },
    {
     "con": "modern-css",
     "choque": "modern-css usa color(display-p3) bajo @media (dynamic-range: high) sin valor sRGB previo, HSL relativo para complementarios y degradados in oklch como mejora por defecto.",
     "propuesta": "sRGB primero + @media (color-gamut: p3); derivaciones en oklch/oklab, nunca en HSL; in oklab por defecto y oklch solo cuando se quiera el barrido de tono."
    },
    {
     "con": "ARSENAL contrato 1 (alto contraste desde el mismo resolver)",
     "choque": "La skill resuelve el alto contraste con @media (prefers-contrast: more) escrito a mano.",
     "propuesta": "Contexto high-contrast en el resolver DTCG que Terrazzo emite bajo @media (prefers-contrast: more) y un atributo [data-contrast=more]."
    },
    {
     "con": "charts-graphs y scientific-visualization (Okabe-Ito con #000000), fixtures de design-tokens (color.black)",
     "choque": "La skill quiere extremos sin negro ni blanco puros (igual que design-taste y stitch); otras skills los meten como serie o como fondo.",
     "propuesta": "Series desde las rampas del sistema validadas con dataviz; negro puro prohibido en superficies y texto."
    },
    {
     "con": "Skill inexistente better-ui",
     "choque": "Delega superficies, sombras y color de iconos en una skill que no está instalada.",
     "propuesta": "Superficies y elevación → impeccable y layout."
    }
   ],
   "papel": "especialista",
   "calidad": "Alta: rigor cuantitativo, reglas comprobables y buena gramática de tokens. Su preferencia por APCA y su prudencia (no repintar) exigen encajarla con el arsenal; remite a better-ui, que no existe."
  },
  {
   "nombre": "modern-css",
   "existe": true,
   "proposito": "Catálogo de CSS moderno (container queries, light-dark, oklch, color-mix, color relativo, text-wrap, text-box, animación con scroll, View Transitions, @starting-style, @property, @layer, dialog/popover/anchor, base-select, field-sizing, :user-invalid, shape, corner-shape) con la consigna de preferir la plataforma a las librerías y comprobar Baseline.",
   "cuando": "Al empezar CSS nuevo, al buscar la técnica nativa antes que JS o al refactorizar CSS heredado; siempre comprobando Baseline (web-features) y envolviendo lo limitado en @supports. Referencia, no plantilla.",
   "reglas_fuertes": [
    "Preferir siempre CSS estándar a librerías JS para maquetación, animación e interacción (Popover API en vez de scripts de tooltip, CSS Masonry en vez de Masonry.js)",
    "oklch para paletas nuevas",
    "Producción con funciones Newly o Widely Available; Limited solo con @supports o mejora progresiva, o preguntando",
    "Respetar prefers-reduced-motion, prefers-color-scheme y prefers-contrast",
    "Capas: @layer reset, design-system, components, utilities",
    "Tipo: balance + 25ch en h1; pretty + 50ch en p; text-box: trim-both cap alphabetic en h1, p y button"
   ],
   "conflictos": [
    {
     "con": "gpt-taste ('Static interfaces are strictly forbidden… must write real GSAP'), design-taste-frontend (Framer Motion layout/layoutId siempre), high-end-visual-design (Framer whileInView)",
     "choque": "'CSS nativo primero' frente a 'siempre GSAP' o 'siempre Framer Motion'.",
     "propuesta": "Rige el contrato 5 y RECURSOS_VANGUARDIA: CSS, @starting-style y View Transitions para estados y entradas; GSAP solo para coreografía o pin+scrub que CSS no cubra en los tres motores; Motion solo para gestos. La estética elegida no puede imponer motor."
    },
    {
     "con": "ARSENAL contrato 2",
     "choque": "Orden de capas distinto: reset, design-system, components, utilities frente a reset, tokens, base, layouts, components, utilities.",
     "propuesta": "Usar el orden del arsenal y reescribir los ejemplos de la skill a esas capas."
    },
    {
     "con": "better-typography, impeccable y ARSENAL §2.2",
     "choque": "Pone max-inline-size: 50ch y pretty en todos los párrafos.",
     "propuesta": "Token --measure (66ch, mínimo 45ch); pretty según la decisión documentada en §2.2."
    },
    {
     "con": "ARSENAL contrato 5, core-web-vitals (CLS.md) y gsap-performance",
     "choque"

## Resultado 4

{
 "skills": [
  {
   "nombre": "design-taste-frontend",
   "existe": true,
   "proposito": "«Ingeniero UI/UX sénior» contra los sesgos del LLM. Tres diales (variación 8, movimiento 6, densidad 4) gobiernan reglas métricas de tipografía, color, maquetación, estados y movimiento, más una lista de «AI tells» prohibidos, un catálogo de efectos y el paradigma «Bento 2.0» con Framer Motion. Procede de Leonxlnx/taste-skill (skills/taste-skill), instalada el 03-05-2026 como enlace a ~/.agents/skills.",
   "cuando": "Al generar UI de producto o marketing en React/Next con Tailwind sin una dirección visual fijada. El mapa del ARSENAL (§1) la pone como apoyo de impeccable.",
   "reglas_fuertes": [
    "Diales por defecto 8/6/4 «estrictamente», sin preguntar al usuario.",
    "Stack por defecto: React o Next.js con RSC y Tailwind para el 90 % del estilo. Antes de importar, comprobar package.json e imprimir el `npm install`.",
    "Iconos obligatorios: exactamente `@phosphor-icons/react` o `@radix-ui/react-icons`, con trazo global de 1.5 o 2.0.",
    "Prohibidos: emojis, Inter, serifas en dashboards, #000000, la estética «AI purple/blue», glows de neón, texto con degradado en titulares grandes, cursores propios, tres tarjetas iguales en fila, John Doe/Acme/Nexus, cifras redondas, Unsplash, clichés (Elevate, Seamless, Unleash), `h-screen` y `window.addEventListener('scroll')`.",
    "Fuentes impuestas: Geist, Outfit, Cabinet Grotesk o Satoshi. Pares: Geist + Geist Mono o Satoshi + JetBrains Mono.",
    "Color: un solo acento con saturación < 80 %, neutros Zinc/Slate y una sola familia de grises.",
    "Héroe centrado prohibido si `LAYOUT_VARIANCE > 4`. Esa variable no existe: el dial se llama DESIGN_VARIANCE.",
    "Titulares `text-4xl md:text-6xl tracking-tighter leading-none`. Cuerpo `text-gray-600 leading-relaxed max-w-[65ch]`.",
    "Muelles `stiffness 100, damping 20` en todo lo interactivo y nunca easing lineal. Con MOTION > 5: microanimaciones perpetuas (pulse, typewriter, float, shimmer) y botones magnéticos solo con `useMotionValue`. Además `layout`/`layoutId` y stagger `calc(var(--index) * 100ms)`. Nivel 4-7: `transition: all 0.3s cubic-bezier(0.16,1,0.3,1)`.",
    "Nunca GSAP o Three junto a Framer en el mismo árbol. GSAP y Three solo para scrolltelling o fondos canvas aislados.",
    "Bento 2.0: fondo #f9fafb y tarjetas #fff con borde slate-200/50, `rounded-[2.5rem]` y sombra difusa. Cinco arquetipos con bucles infinitos y un badge que entra con «overshoot» y dura 3 s.",
    "Solo `transform` y `opacity`. Grano solo en un pseudoelemento fijo. `min-h-[100dvh]`. Esqueletos en lugar de spinners. La etiqueta va encima del campo.",
    "Datos «orgánicos» inventados (47.2 %, +1 (312) 847-1928), nombres y marcas inventados, e imágenes de picsum.photos."
   ],
   "conflictos": [
    {
     "con": "Contrato 3 del ARSENAL y memoria del autor (Astro estático sin framework de cliente)",
     "choque": "Impone React/Next con RSC por defecto, providers y `'use client'`.",
     "propuesta": "Ignorar su §2 de stack. En Astro, sus reglas de estados y rendimiento se aplican a HTML/CSS y a islas `client:*` con `mount()`/`destroy()`."
    },
    {
     "con": "Contratos 1 y 2 y listón 2.4.1 del ARSENAL",
     "choque": "Tailwind con la paleta Zinc/Slate y valores arbitrarios (`rounded-[2.5rem]`, `shadow-[…]`, `#f9fafb`). Eso es una segunda paleta y deja literales fuera de los tokens.",
     "propuesta": "`@theme inline` apuntando a tokens semánticos DTCG. Prohibir las clases de color por defecto y los valores arbitrarios que no sean tokens."
    },
    {
     "con": "ARSENAL 2.4 (Lucide 1.47.0 como familia única), minimalist-ui y high-end-visual-design",
     "choque": "Obliga a usar Phosphor o Radix. `@phosphor-icons/react` 2.1.10 no se publica desde el 22-05-2025 (comprobado con npm view). minimalist pide Phosphor Bold/Fill y high-end Phosphor Light.",
     "propuesta": "Una familia por proyecto fijada en los tokens, Lucide por defecto con `stroke-width` como token. Phosphor, solo como SVG."
    },
    {
     "con": "impeccable new-work (fuentes reflejo), better-typography (nunca una fuente de pago o propietaria) y la cadena @fontsource + fontaine del ARSENAL",
     "choque": "Outfit está en la lista de reflejos de impeccable. Satoshi y Cabinet Grotesk son de Fontshare (licencia ITF, no OFL) y no existen en @fontsource (404 comprobado). @fontsource-variable/geist 5.3.0 sí existe.",
     "propuesta": "La fuente la elige el brief o la dirección de impeccable. De esta lista, solo Geist entra sin fricción."
    },
    {
     "con": "industrial-brutalist-ui y better-typography",
     "choque": "Veta Inter en todos los casos y la serifa en dashboards. brutalist recomienda Inter Black y serifa degradada en dashboards de datos, y better-typography pone Inter y Geist como sans por defecto.",
     "propuesta": "Los vetos tipográficos de una estética no rigen cuando se ha elegido otra. Una sola regla por proyecto, en DESIGN.md."
    },
    {
     "con": "impeccable craft-floor",
     "choque": "El Bento 2.0 (borde de 1px bajo una sombra ancha) es la «ghost card». Sus radios de 40 px superan los 12–16 px. `tracking-tighter` de Tailwind (−0,05 em) baja del mínimo de −0,04 em. Además usa «Liquid Glass» como decoración y un «Mesh Gradient Background».",
     "propuesta": "Con impeccable de director prevalece su suelo. El Bento 2.0 solo entra si el brief lo pide."
    },
    {
     "con": "emil-design-eng, review-animations y web-design-guidelines",
     "choque": "Usa `transition: all` (prohibido en las tres). Prohíbe el easing lineal, pero su carrusel infinito `x: ['0%','-100%']` lo necesita para no frenar en cada vuelta. Stagger de 100 ms frente a 30–80 ms. Microinteracciones en acciones frecuentes. Usa `x`/`y` de Framer, que no van por GPU.",
     "propuesta": "Tokens `--dur-*` y `--ease-*` (contrato 1) con los valores de emil. `transition` con propiedades explícitas. Lineal solo en marquesinas y barras de progreso."
    },
    {
     "con": "Contrato 6, better-accessibility (WCAG 2.2.2) e impeccable animate",
     "choque": "Bucles infinitos en cada tarjeta, typewriter y marquesinas sin control de pausa. El badge de 3 s no llega al mínimo de 5 s (que además se pausa con hover o foco). No menciona `prefers-reduced-motion` ni una vez.",
     "propuesta": "Bucles solo dentro de `@media (prefers-reduced-motion: no-preference)`, con pausa visible si duran más de 5 s y parados fuera de pantalla. Avisos de 5 s o más."
    },
    {
     "con": "Contrato 5 (una autoridad por superficie) y RECURSOS_VANGUARDIA (CSS nativo primero, un motor JS por página como máximo)",
     "choque": "Framer para todo: reveals, layout, bucles y estados.",
     "propuesta": "CSS, `@starting-style` y View Transitions para los estados. Motion solo para gestos. Nada de Motion en el héroe: el paquete completo pesa ≈ 47,7 kB gz, casi todo el presupuesto de 50 kB."
    },
    {
     "con": "Contrato 10, copywriting («Honest over sensational») y la norma del autor de verificar las cifras",
     "choque": "Exige inventar cifras «desordenadas», teléfonos, nombres y marcas creíbles.",
     "propuesta": "Borrar esas reglas. El contenido es real, con fuente y fecha. Las demostraciones sintéticas se etiquetan como tales (impeccable new-work). Las cifras comerciales nunca se inventan."
    },
    {
     "con": "Contrato 8 (AVIF/WebP con srcset y LCP con fetchpriority)",
     "choque": "picsum.photos sirve JPEG externo sin srcset y es una dependencia de red en tiempo de ejecución.",
     "propuesta": "Imágenes reales procesadas al compilar con sharp o @unpic."
    },
    {
     "con": "Coherencia interna",
     "choque": "Con `stiffness 100, damping 20` el muelle queda críticamente amortiguado (ζ = 1, sin rebase), pero el arquetipo «Live Status» pide «overshoot». La variable `LAYOUT_VARIANCE` no está definida. Prohíbe tres columnas iguales y su Bento pone tres columnas en la fila 1.",
     "propuesta": "Corregir en una copia local: token de muelle con `bounce: 0.2` (como emil) para el rebase leve, renombrar la variable y revisar la fila 1."
    },
    {
     "con": "gpt-taste",
     "choque": "gpt-taste prefiere el héroe centrado y aquí está prohibido.",
     "propuesta": "La composición la decide la dirección de impeccable, no los diales."
    },
    {
     "con": "emil-design-eng y web-design-guidelines",
     "choque": "emil defiende un spinner rápido y web-design-guidelines pide «spinner durante la petición». Aquí se prohíben los spinners circulares.",
     "propuesta": "Esqueleto para contenido de forma conocida. Indicador dentro del botón para acciones."
    },
    {
     "con": "Estabilidad del viewport (contrato 8, CLS)",
     "choque": "Presenta `100dvh` como remedio contra los saltos, pero `dvh` se recalcula al plegarse la barra del navegador y fuerza relayout durante el scroll.",
     "propuesta": "`min-block-size: 100svh` con respaldo para héroes estables."
    }
   ],
   "papel": "soporte",
   "calidad": "Sirve como lista anti-slop: estados de carga, vacío y error; etiquetas encima de los campos; solo `transform` y `opacity`; grano en capa fija; nada de z-index arbitrario. Pero como «apoyo» de impeccable choca con casi todo lo que impone: stack React/Next, Tailwind con la paleta por defecto, fuentes de Fontshare, iconos Phosphor, movimiento perpetuo sin accesibilidad y datos inventados. Tiene errores internos (una variable inexistente y un muelle sin rebase donde lo pide). Solo aprovechar sus reglas 5 y 6 de la §3 y sus §5 y §7 (salvo las de contenido y datos), filtradas por los contratos."
  },
  {
   "nombre": "high-end-visual-design",
   "existe": true,
   "proposito": "«Arquitecto UI y coreógrafo de movimiento» de agencia de 150 k$. Tira dados en silencio para elegir un vibe (Ethereal Glass, Editorial Luxury, Soft Structuralism) y una maquetación (Bento asimétrico, cascada en Z, split editorial). Sus componentes firma son el doble bisel, el botón dentro del botón y la nav isla flotante, con curvas cubic-bezier propias. Procede de taste-skill (soft-skill).",
   "cuando": "Landings y portafolios de aire «Apple/Linear/agencia» cuando el brief pide lujo táctil. El ARSENAL la cita como apoyo de impeccable.",
   "reglas_fuertes": [
    "Fuentes prohibidas: Inter, Roboto, Arial, Open Sans y Helvetica. Da por «disponibles» Geist, Clash Display, PP Editorial New y Plus Jakarta Sans.",
    "Iconos prohibidos: Lucide, FontAwesome y Material. Solo trazo ultrafino (Phosphor Light, Remix Line).",
    "Prohibidos: bordes grises genéricos de 1px, sombras duras (`shadow-md`, rgba 0,3), navbars pegadas arriba de borde a borde, rejillas simétricas de tres columnas, transiciones `linear` o `ease-in-out` y cambios de estado sin interpolar.",
    "Doble bisel obligatorio en todas las tarjetas, inputs y rejillas: carcasa `p-1.5` `rounded-[2rem]` y núcleo con radio concéntrico.",
    "Botones primarios en píldora `rounded-full px-6 py-3`. La flecha `↗` siempre dentro de su propio círculo.",
    "Eyebrow en píldora microscópica (`text-[10px] uppercase tracking-[0.2em]`) antes de cada H1/H2.",
    "Secciones entre `py-24` y `py-40`; nunca menos de `py-24`.",
    "`transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`. Todo entra con `translate-y-16 blur-md opacity-0` hasta el estado visible en 800 ms o más. Stagger `delay-100/150/200`.",
    "Nav en píldora de cristal flotante, hamburguesa que se convierte en X y menú a pantalla completa con `backdrop-blur-3xl`.",
    "Nunca repetir la misma maquetación o estética dos veces seguidas. Entregar código sin «respaldos genéricos».",
    "Solo `transform` y `opacity`. `backdrop-blur` solo en elementos fijos, grano solo en capa fija, `min-h-[100dvh]` y una columna por debajo de 768 px."
   ],
   "conflictos": [
    {
     "con": "impeccable craft-floor",
     "choque": "El eyebrow es la única prohibición absoluta de impeccable («no brief earns it back») y aquí es obligatorio. impeccable reserva las píldoras a controles pequeños, limita el radio de tarjeta a 12–16 px (aquí 32 px), dice «nested cards are always wrong» frente al doble bisel y rechaza el cristal decorativo.",
     "propuesta": "Con impeccable de director: fuera el eyebrow y el doble bisel salvo que el brief los pida. Conservar el radio concéntrico solo cuando haya un anidamiento real."
    },
    {
     "con": "image-to-code, imagegen-frontend-mobile y minimalist-ui",
     "choque": "Las dos primeras prohíben las cajas anidadas. minimalist prohíbe `rounded-full` en botones primarios y pide iconos Phosphor Bold/Fill, frente a las píldoras y el trazo ultrafino de aquí.",
     "propuesta": "Son estéticas alternativas: una por proyecto (ARSENAL §1)."
    },
    {
     "con": "Contrato 5 (entrada solo con `transform` y `opacity`, < 800 ms y sin retrasar el LCP) y su propia §6",
     "choque": "La entrada anima `blur`, un filtro que no va al compositor, durante 800 ms o más. Contradice su propia regla de «solo transform y opacity».",
     "propuesta": "Entrada de ≤ 600 ms con `translate` y `opacity`. Blur solo puntual y por debajo de 20 px (emil)."
    },
    {
     "con": "RECURSOS_VANGUARDIA y ARSENAL 2.6 (estado final visible sin animación), impeccable (entrada desde un estado ya visible, un solo momento de autor) y better-accessibility",
     "choque": "«Ningún elemento aparece estático»: el `opacity-0` inicial esconde el contenido si falla el JS. No menciona `prefers-reduced-motion`.",
     "propuesta": "Estado final visible por defecto y animación dentro de `@media (prefers-reduced-motion: no-preference)` y `@supports`. Un momento de autor por página."
    },
    {
     "con": "ARSENAL 2.6, listón 1 (todo en `@supports` con un respaldo que funciona)",
     "choque": "Su protocolo manda «no incluir respaldos básicos ni genéricos».",
     "propuesta": "Respaldo obligatorio para toda función fuera de Baseline."
    },
    {
     "con": "emil-design-eng y review-animations",
     "choque": "Prohíbe `ease-in-out`, que emil usa para mover en pantalla, y `linear`, que emil usa en marquesinas, progreso y mantener-para-borrar. Pone `transition-all duration-700` en hover, cuando emil pide menos de 300 ms en UI y nunca `all`.",
     "propuesta": "Tokens de emil (`--ease-out`, `--ease-in-out`, `--ease-drawer`) y 150–250 ms en UI."
    },
    {
     "con": "stitch-design-taste",
     "choque": "stitch quiere una navegación «sleek, sticky» y esta prohíbe la navbar pegada de borde a borde.",
     "propuesta": "Una sola decisión, registrada en DESIGN.md."
    },
    {
     "con": "ARSENAL 2.4 (Lucide), better-typography (sin fuentes de pago) e impeccable (fuentes reflejo y «la fuente instalada más cercana es un fallo»)",
     "choque": "Veta Lucide. Da por disponibles PP Editorial New (Pangram Pangram, licencia comercial) y Clash Display (Fontshare, sin paquete en @fontsource: 404), lo que acaba en fuente del sistema y CLS. Plus Jakarta Sans es reflejo para impeccable. Además prohíbe la Helvetica que minimalist-ui usa.",
     "propuesta": "Solo fuentes OFL autoalojadas con métricas de fontaine. Las de pago, únicamente con licencia del cliente."
    },
    {
     "con": "impeccable (el brief gana; una sección hereda el mundo de su superficie) y contrato 1",
     "choque": "Su «Variance Mandate» vuelve a tirar el vibe en cada generación, así que cada página del mismo sitio saldría con otra estética.",
     "propuesta": "Una sola tirada por mundo (concept-seed de impeccable); lo demás hereda."
    },
    {
     "con": "impeccable (claro u oscuro según la escena de uso, no la categoría) y design-taste (LILA BAN)",
     "choque": "«Ethereal Glass» asigna negro OLED y orbes púrpura/esmeralda por categoría (SaaS/IA).",
     "propuesta": "Descartar la asignación por categoría y los orbes púrpura."
    },
    {
     "con": "impeccable (glifos Unicode en lugar de un sistema de iconos) y better-accessibility",
     "choque": "La flecha `↗` es un carácter Unicode que hace de icono dentro del botón.",
     "propuesta": "SVG de la familia única con `aria-hidden` y nombre accesible en el botón."
    },
    {
     "con": "Contrato 8 (INP y 60 fps en móvil)",
     "choque": "`backdrop-blur-3xl` a pantalla completa en el menú.",
     "propuesta": "Fondo opaco, o blur ≤ 20 px dentro de `@supports`."
    }
   ],
   "papel": "especialista",
   "calidad": "Buen ojo para el acabado: radios concéntricos, curvas propias, colapso móvil explícito y blur solo en elementos fijos. Pero es una estética cerrada con obligaciones («todas las tarjetas con doble bisel», «ningún elemento estático», eyebrow) que chocan de frente con impeccable y con los contratos de movimiento y accesibilidad, y se contradice en rendimiento (anima blur). No es el «apoyo neutro» que dice el mapa del ARSENAL: como mucho, una estética elegible a mano y con los números corregidos."
  },
  {
   "nombre": "redesign-existing-projects",
   "existe": true,
   "proposito": "Llevar un sitio existente a calidad «premium» sin romper la funcionalidad. Escanea el stack, audita con una lista extensa (tipografía, color, maquetación, estados, contenido, componentes, iconos, código y omisiones típicas) y aplica mejoras dirigidas en orden de prioridad. Procede de taste-skill (redesign-skill).",
   "cuando": "Proyectos con código y estética ya existentes que se quieren mejorar sin migrar de framework.",
   "reglas_fuertes": [
    "Flujo Scan → Diagnose → Fix: no reescribir desde cero, trabajar con el stack existente, no migrar frameworks ni librerías de estilo y probar tras cada cambio.",
    "Orden de arreglo: 1 cambio de fuente, 2 limpieza de paleta, 3 hover y active, 4 maquetación, 5 componentes genéricos, 6 estados, 7 pulido tipográfico.",
    "Sustituir Inter y las fuentes por defecto por Geist, Outfit, Cabinet Grotesk o Satoshi. Serif con sans en proyectos editoriales, pesos 500/600, `tabular-nums` y `text-wrap: balance|pretty`.",
    "Un solo acento con saturación < 80 %, sin #000 y con una sola familia de grises. Sombras teñidas, grano o ruido añadido, degradados uniformes rotos y ninguna sección oscura suelta en una página clara.",
    "Maquetación: romper la simetría, eliminar las tres columnas iguales, `min-height: 100dvh`, Grid, contenedor de 1200–1440 px, márgenes negativos para superponer y «duplicar el espacio».",
    "Estados: hover, pulsación con `scale(0.98)` o `translateY(1px)`, transiciones de 200–300 ms en todo lo interactivo, foco visible, esqueletos, vacíos, errores en línea y `scroll-behavior: smooth`.",
    "Contenido: nombres «realistas», cifras «desordenadas», marcas inventadas y fechas de blog aleatorias «para parecer reales». Sin «Oops!» ni exclamaciones, en voz activa y con titulares en sentence case.",
    "Componentes: badges cuadrados en lugar de píldoras, FAQ sin acordeón, muro de testimonios, menos modales, avatares en squircle, tema por menú o por sistema y pie simplificado.",
    "Iconos: fuera Lucide y Feather; Phosphor, Heroicons o un set propio, con un solo grosor y favicon.",
    "Técnicas: fuentes variables animadas, contorno a relleno, máscaras de texto, scroll suave con inercia, muelles, reveals ligados al scroll, glassmorphism «de verdad», bordes spotlight y grano."
   ],
   "conflictos": [
    {
     "con": "impeccable («Refinement preserves; redesign replaces… never split the difference into polish on the discarded look»)",
     "choque": "Su flujo pule el aspecto viejo con mejoras puntuales, justo lo que impeccable prohíbe en un rediseño.",
     "propuesta": "Usarla solo como lista de diagnóstico en modo refinamiento, con la identidad conservada. Para un rediseño, impeccable new-work."
    },
    {
     "con": "better-typography (revisar tipografía nunca exige una fuente nueva) e impeccable (refinar conserva la identidad)",
     "choque": "Su prioridad número 1 es cambiar la fuente. Además Outfit es reflejo para impeccable y Satoshi y Cabinet Grotesk no están en @fontsource.",
     "propuesta": "Cambiar la fuente solo si e

## Resultado 5

La skill maestra está completa en `/Users/rodrodr/.claude/skills/maestro-diseno-web/` y Claude Code ya la registra como `maestro-diseno-web`. Las pruebas pasan en Chromium y WebKit. Firefox de Playwright no arranca en esta máquina (se agota el tiempo de 45 s al lanzarlo), así que las pruebas de tres motores salen con código 2, «incompleta», y así lo declaran, sin darse por aprobadas.

El intento anterior había dejado casi todo el material, pero faltaban `SKILL.md` y `tipos/app-herramienta.md`. En esta pasada los he escrito, he releído y ejecutado todo lo que había y he corregido tres fallos.

## Arquitectura

**Regla cero:** el brief del cliente y la identidad registrada mandan sobre el gusto de cualquier skill. Solo están por encima WCAG 2.2 AA, la ley, la honestidad de datos y copy, y las instrucciones del entorno.

**Flujo único**, con una skill que dirige cada paso:

| Paso | Dirige |
|---|---|
| 1 · Entender | `impeccable shape` (y `init` si falta `PRODUCT.md`) |
| 2 · Dirección de arte | impeccable new-work (concept-seed, página de decisión, contrato de 6 bloques) |
| 3 · Sistema | `design-tokens`, con `better-colors` midiendo el contraste |
| 4 · Construir | el director del tipo de aplicación |
| 5 · Verificar | `verificar.py`, más `impeccable critique` y `audit` |
| 6 · Pulir y cerrar | `impeccable polish`, revisor final en contexto nuevo y `DESIGN.md` generado desde los tokens |

- **Refinar** conserva identidad, comportamiento y copy. **Rediseñar** vuelve al paso 2.
- Las 16 skills sueltas v2.1.1 y el plugin 1.0.0 no se cargan: cada nombre equivale a `impeccable <comando>` en v4.

**Enrutado por tipo** (el modo es de cada superficie, no del producto):

| Tipo | Modo | Dirige el interior | Presupuesto de JS |
|---|---|---|---|
| Landing | Persuade | impeccable, con `copywriting` para el texto | ≤ 50 kB en el héroe |
| Lectura | Read | esta skill (no existe otra) | ≤ 50 kB |
| Juego | Experience en el DOM | `phaser`, `pixijs` o `three-best-practices` + `webgpu-threejs-tsl` | ≲ 500 kB en su isla |
| Datos y scrollytelling | Read | `dataviz` en cada figura + `charts-graphs` | ≤ 50 kB |
| App y panel | Operate | impeccable (operate, harden, clarify, onboard) | ≤ 100 kB; manda el INP |

Si la animación es el propio relato, dirige `fabula` y la pieza entra en la página como isla.

**Precedencia:** siete niveles de autoridad (suelo, brief, contratos, directora del paso, especialista en lo que se mide, estética elegida, gusto por defecto), desempates y un procedimiento para choques nuevos. `SKILL.md` recoge los 18 choques más frecuentes; `precedencia.md` resuelve 184, uno por uno. En esta pasada añadí cuatro:
- **A21:** esta skill es la puerta de entrada.
- **A22:** `fabula` frente al scrollytelling de datos.
- **C18:** tipo fijo en rem en modo Operate, frente a la escala fluida.
- **L6:** las rutas escritas para Codex dentro de impeccable, y su equivalente en Claude Code.

**Contratos comunes (12):**
- Una sola fuente de tokens DTCG con resolver, también para canvas, movimiento, sonido y háptica.
- Un solo orden de `@layer`.
- Islas con `destroy()` que no dejan fugas.
- Un solo bus de *feedback* (imagen, sonido y háptica).
- Un motor de movimiento por página.
- Accesibilidad con el movimiento activado solo por preferencia.
- Persistencia en dos pisos: preferencias en `localStorage`, datos en IndexedDB.
- Presupuestos de rendimiento por tipo.
- Verificación acotada.
- Honestidad de datos y copy.
- Tipografía española.
- Una familia de iconos y fuentes con licencia libre.

**Verificación:** la puerta técnica es automática y no cuenta como ronda. Las rondas de juicio son dos como máximo: `verificar.py` no ejecuta una tercera sin `--ronda-extra "motivo"` y sale con código 3.

## Correcciones de esta pasada (probadas)
- **Detector que fallaba en silencio:** con una URL inalcanzable, `impeccable detect` sale con código 1 e imprime `[]`, que `verificar.py` leía como «0 hallazgos». Ahora lo informa como «NO CORRIÓ» y la puerta queda incompleta.
- **Primer clic mudo:** el primer gesto creaba el `AudioContext` suspendido y el sonido se perdía. Ahora suena en cuanto el contexto se reanuda.
- **View Transitions con movimiento reducido:** `movimiento.css` quita el desplazamiento y deja solo el fundido, también en las transiciones dentro de la misma página.
- **Falsos positivos del detector en modo paginado:** confirmados y documentados en `lectura.md` (la misma página sin el bloque paginado da 0 hallazgos).
- **Pesos del kit** medidos de nuevo con gzip: 6,3 kB de CSS en total; `feedback.js` junto con sus tokens y `preferencias.js`, 4,0 kB.
- **Emojis:** quitados de `verificar.py` y de la fila A12 de `precedencia.md`.

## Pruebas ejecutadas
- **`build-tokens.mjs`:** 13 pares medidos en 4 contextos (8 con el resolver de lectura). Se niega a escribir si falla un contraste o un color sale de sRGB.
- **Terrazzo 2.7.1** (instalado con npm en una carpeta temporal): genera la misma estructura.
- **`prueba_kit.py`:** todas las comprobaciones en verde en Chromium y WebKit, incluidas las dos nuevas (osciladores en el primer gesto y View Transitions con movimiento reducido).
- **`prueba_lectura.py`:** todo en verde en Chromium y WebKit.
- **`verificar.py`:**
  - puerta técnica, lectura sin JS y medida real de línea: 65, 48 y 38 caracteres a 1280, 390 y 320 px;
  - FPS con la CPU ×4: p95 de 9,1 ms, sin frames largos;
  - techo de rondas (código 3) y detector de impeccable sin hallazgos.

## Archivos
Todos en `/Users/rodrodr/.claude/skills/maestro-diseno-web/`:
- `SKILL.md` (nuevo)
- `reference/`
  - `flujo.md`
  - `contratos.md` (retocado)
  - `precedencia.md` (4 filas nuevas)
  - `verificacion.md` (retocado)
  - `tipos/`
    - `landing.md`
    - `lectura.md` (retocado)
    - `juego.md`
    - `datos-editorial.md`
    - `app-herramienta.md` (nuevo)
- `kits/`
  - `base.css`
  - `movimiento.css` (retocado)
  - `isla.js`
  - `feedback.js` (retocado)
  - `preferencias.js`
  - `preferencias.inline.js`
  - `lectura.js`
  - `verificar.py` (retocado)
  - `tokens/`
    - `tokens.json`
    - `tokens.resolver.json`
    - `lectura.resolver.json`
    - `build-tokens.mjs`
    - `fluido.mjs`
    - `terrazzo.config.mjs`
    - `contextos/`: `dark`, `contrast-more`, `motion-reduce`, `sepia` y `black` (`.tokens.json`)
    - `dist/`: `tokens.css` y `feedback-tokens.js`
  - `pruebas/`
    - `prueba_kit.py` (con las dos comprobaciones nuevas)
    - `prueba_lectura.py`
    - `demo.html`, `demo.css`, `demo.js`, `pieza-ejemplo.js`, `lectura.html`

## Pendiente (necesita tu permiso o un dispositivo)
- Desactivar el plugin `impeccable@impeccable` 1.0.0 y convertir las skills sueltas en alias: son cambios de configuración.
- Reinstalar Firefox de Playwright: es una descarga.
- Descargar Lighthouse (`npx lighthouse`) la primera vez que se use.
- Crear los agentes de impeccable en `~/.claude/agents`.
- Medir FPS y háptica de iOS en un dispositivo real.

## Resultado 6

{
 "hallazgos": [
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/verificar.py",
   "gravedad": "alta",
   "problema": "La puerta técnica no ve las islas perezosas. verificar.py nunca desplaza la página, así que ningún <maestro-isla> por debajo del pliegue llega a montarse, y ahí viven los juegos, el 3D y las figuras interactivas. Lo ejecuté: preparé una isla que lanza una excepción, desborda 3016 px en un viewport de 390 y pide un recurso que da 404. `verificar.py pruebas/demo_rota.html --puerta` respondió «PUERTA: sí» (exit 0) y la isla seguía en data-isla=espera. En cuanto se desplaza hasta ella, pasa a data-isla=error, con dos errores de consola y el desborde.",
   "correccion": "Después de cargar, recorrer la página por pasos (o hacer scrollIntoView de cada maestro-isla) y esperar a que cada isla llegue a activa, pausada o error. Fallar si alguna queda en error. Repetir la consola, el desborde y axe después del montaje. Añadir a pruebas/ el caso de la isla rota como regresión."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/verificar.py",
   "gravedad": "alta",
   "problema": "`--fps 5 --cpu 4` solo mide: no aplica ningún umbral. Probé una página que bloquea el hilo 30 ms en cada frame: dio p95 de 34,2 ms y 30 frames largos con la CPU ×4, y aun así «PUERTA: sí» (exit 0). juego.md y verificacion.md la presentan como la puerta del listón (p95 ≤ 16,7 ms). Tampoco interactúa: no pulsa «Jugar» ni monta la isla, así que en un juego mide el rAF de una página quieta.",
   "correccion": "Añadir `--p95-max` (16,7 por defecto con --fps) y `--largos-max`, y apuntar un fallo cuando se superen. Añadir `--accion <selector|script>` para ejecutar la entrada del jugador antes de medir, y medir con la isla ya montada."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/verificar.py",
   "gravedad": "alta",
   "problema": "`pg.goto(url, wait_until=\"networkidle\")` no está dentro de ningún try. Probé una página que consulta el servidor cada 300 ms, que es justo el panel «en vivo» que recomienda app-herramienta.md §5. El script revienta a los 30 s con un TimeoutError y una traza de Python, no escribe informe.json y sale con un código 1, indistinguible de «puerta fallida». Pasará lo mismo con SSE, sondeos y balizas de analítica: el tipo App/panel no se puede verificar.",
   "correccion": "Esperar a `load` y después a networkidle con un tope corto dentro de try/except, o añadir la opción `--espera load|networkidle`. Recoger las excepciones de cada combinación y apuntarlas en informe['incompleto'] (código 2), nunca como traza."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/tokens/build-tokens.mjs",
   "gravedad": "alta",
   "problema": "Con lectura.resolver.json, los tokens del tema oscuro se cuelan en sepia. El bloque `@media (prefers-color-scheme: dark) { :root:where(:not([data-theme=\"light\"])) }` también se aplica cuando data-theme=\"sepia\", y el bloque sepia solo redefine lo que difiere de la base. Lo medí en Chromium con el sistema en oscuro y data-theme=sepia: --color-accent-text y --color-focus-ring quedan a 1,51:1 sobre el papel, error a 2,20:1, éxito a 1,71:1 y aviso a 1,48:1. Con el sistema en claro dan 5,05, 5,46, 4,72 y 5,12. El build informa «13 pares × 8 contextos» en verde porque mide base+sepia por separado, nunca la cascada real.",
   "correccion": "En la media query oscura, excluir todos los temas que no sean dark, derivándolos de TEMAS: `:root:where(:not([data-theme=\"light\"],[data-theme=\"sepia\"],[data-theme=\"black\"]))`. Otra opción es que cada tema extra emita el conjunto completo de semánticos. Añadir a prueba_kit.py una prueba del navegador con lectura.resolver.json y el sistema en oscuro."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/isla.js",
   "gravedad": "alta",
   "problema": "`ctx.color('--x')` dice devolver un color «listo para canvas o WebGL», pero como los tokens son oklch devuelve `oklch(0.985 0.006 250)`: prueba_kit.py lo imprime así en Chromium y en WebKit. Canvas 2D lo acepta, pero los motores a los que la skill manda los juegos no. Según sus propias skills instaladas, Phaser (ValueToColor, RGBStringToColor) y Pixi v8 (Color) solo aceptan hex, nombres y rgb/hsl, y three.js (Color.setStyle) tampoco entiende oklch. Por lo que sé de esas librerías, Phaser lo convierte en negro sin avisar, three.js lo deja sin cambiar y avisa, y Pixi lo rechaza con un error. WebGL necesita números. La única pieza probada es canvas 2D, que es lo único que funciona.",
   "correccion": "Convertir en la sonda: pintar 1×1 en un canvas 2D y leer getImageData. Exponer `ctx.rgba('--x')` → [r,g,b,a] en 0–1 y `ctx.hex('--x')` → número para Phaser, Pixi y three. Añadir una pieza de prueba con Pixi o three que compruebe el color leído."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/lectura.js",
   "gravedad": "media",
   "problema": "El Locator no funciona en modo paginado. Probado en la página 5 de 9, con q-11 como bloque visible: `posicion()` devuelve el fragmento q-1 con progression 1 (100 %), e `irA()` no mueve el contenedor, que se queda en la página 0. Las dos funciones usan scrollY y window.scrollTo. lectura.md §3 promete que «la posición se conserva con el Locator (§4), nunca con scrollLeft», y prueba_lectura.py solo prueba la retoma en modo scroll.",
   "correccion": "`posicion(raiz, {contenedor})` debe usar caretPositionFromPoint en la esquina superior de la columna visible y `progression = scrollLeft/(scrollWidth-clientWidth)`. `irA` debe calcular la página a partir de `rango.getClientRects()[0].left` y llamar a `ir(n)`. Añadir el caso paginado (ir a la página N, cambiar el ancho y volver) a prueba_lectura.py."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/preferencias.inline.js",
   "gravedad": "media",
   "problema": "lectura.md §1 y el contrato 7 dicen que el tema sepia o negro, el tamaño, el interlineado, la medida y la familia se aplican antes del primer pintado. El script en línea solo acepta theme light|dark, y nadie llama a `aplicar()` al cargar. Probado: `prefs.set({theme:'sepia'})` pinta sepia y lo guarda en localStorage, pero tras recargar data-theme es None, así que el lector pierde su tema en cada visita. El tamaño de lectura del contrato 7 no existe en preferencias.js. Incumple el listón 2.2 #6.",
   "correccion": "Que build-tokens.mjs genere la lista de temas válidos y la inyecte en el script en línea, y aplicar además --reader-scale, --leading-reading y --measure-reading desde prefs. Misma lógica en preferencias.js, cubierta por una prueba que recargue la página con sepia."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/SKILL.md",
   "gravedad": "media",
   "problema": "El arranque (paso 4) manda «copia kits/ conservando la estructura y ejecuta `node tokens/build-tokens.mjs`». Desde la raíz del proyecto eso falla con ENOENT y una traza de Node, porque el resolver por defecto se busca en el cwd y no junto al script (probado). La línea del bloque de verificación, `node $K/tokens/build-tokens.mjs tokens.resolver.json`, solo funciona si el cwd es la carpeta tokens del proyecto. Hay tres formas de invocarlo (SKILL, flujo §3 y verificacion §0) y cada una supone un cwd distinto.",
   "correccion": "En build-tokens.mjs, resolver por defecto con `new URL('./tokens.resolver.json', import.meta.url)` y sustituir la traza por un mensaje limpio. Unificar las tres instrucciones en una sola forma que funcione desde cualquier cwd."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/lectura.js",
   "gravedad": "media",
   "problema": "Regla contradicha entre archivos. `paginar()` pasa de página con `behavior:'smooth'` al pulsar ←/→, AvPág o espacio, salvo con movimiento reducido. Eso choca con precedencia E10 y lectura.md §8 («instantáneo o fundido ≤ 150 ms») y con emil-design-eng («Never animate keyboard-initiated actions»). En cambio lectura.md §3 describe el comportamiento del kit (instantáneo solo con movimiento reducido).",
   "correccion": "Paso instantáneo siempre con el teclado y, si se quiere, un fundido por token (--dur-fade). Reescribir lectura.md §3 para que coincida con E10."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/base.css",
   "gravedad": "media",
   "problema": "`:where(p, li, dd, figcaption) { text-wrap: pretty }` se aplica a toda la prosa, capítulos largos incluidos. El comentario de base.css y precedencia C8 dicen «pretty en párrafos cortos y pies; en capítulos largos solo si la prueba de 100k palabras mantiene 60 fps», y better-typography dice «Skip balance and pretty in long-form text». Esa prueba de 100k palabras no existe en el kit.",
   "correccion": "Por defecto `pretty` solo en figcaption, dd y .texto-corto, y `wrap` en p. Otra opción es añadir a pruebas/ el capítulo de 100k palabras con la medida de FPS y decidir con el dato."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/precedencia.md",
   "gravedad": "media",
   "problema": "El orden de autoridad se contradice a sí mismo. El brief está en el nivel 2, por encima de los contratos (nivel 3), pero la misma línea dice que «el brief puede cambiar los valores (paleta, fuentes, motor), no romper el contrato». Si un cliente pide expresamente Next.js en un proyecto nuevo (J1), Lenis (E16), sonido activado por defecto (contrato 4) o un solo tema (B2), la tabla da dos respuestas y ninguna regla dice cuál aplicar.",
   "correccion": "Poner los contratos por encima del brief en la numeración, o enumerar qué cuenta como «valor» que el brief puede fijar (framework, tema o motor, sí o no) y qué es contrato. Añadir el procedimiento cuando el cliente insiste: excepción registrada en PRODUCT.md, con su motivo."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/verificacion.md",
   "gravedad": "media",
   "problema": "La ronda de juicio manda que `impeccable critique` trabaje «sobre esas capturas» de verificar.py, pero critique.md v4 exige su propio Assessment B: su navegador, live-server e inyección de detect.js. Eso duplica las capturas y deja el techo de dos rondas sin control real. Además, verificar.py solo captura el viewport: en la demo, 1280×800 de una página de 2286 px. En una landing, cuya estructura problema → … → acción ocupa toda la página, la crítica solo ve el héroe.",
   "correccion": "`full_page=True` en las capturas de la ronda de juicio. Decir explícitamente que critique toma el informe del detector de verificar.py como Assessment B y no relanza live-server, o que la ronda la lanza critique y verificar.py solo lleva la cuenta."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/contratos.md",
   "gravedad": "media",
   "problema": "Ninguna herramienta del kit comprueba los presupuestos del contrato 8: JS crítico ≤ 50 kB en el héroe o en la ruta de lectura, ≤ 100 kB en una app, peso inicial ≤ 1 MB. verificar.py no suma bytes, su LCP de laboratorio es «informativo», y Lighthouse es una descarga que necesita permiso. En la práctica, los presupuestos por tipo no los verifica nadie.",
   "correccion": "Sumar en verificar.py el `encodedBodySize` de los recursos JS (performance.getEntriesByType('resource')) antes de la primera interacción, además del peso total. Compararlo con `--presupuesto-js` y `--presupuesto-total`, con valores por defecto por tipo, y hacer que la puerta falle si se superan."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/tipos/juego.md",
   "gravedad": "media",
   "problema": "Hueco en el tipo juego. No hay plantilla de pieza para Phaser, Pixi ni three, aunque ARSENAL §5 dejaba pendiente exactamente eso («plantilla de isla para Phaser, Pixi, three y p5, con destroy() verificado por una prueba de fugas»). Tampoco hay bucle de paso fijo, capa de acciones, PRNG ni guardado en IndexedDB. La instrucción «Usa ctx.loop de la isla para el rAF» no encaja con Phaser, que tiene su propio TimeStep, ni con Pixi, que usa su Ticker. Nadie dirige el arte del canvas (sprites, paleta del juego, sonido). juego.md dice cumplir el listón 2.1 #7, pero omite la pausa al perder el foco, que isla.js no implementa.",
   "correccion": "Añadir pruebas/pieza-phaser.js, pieza-pixi.js y pieza-three.js con destroy() probado (contextos WebGL y AudioContext), un ayudante pasoFijo(dt, actualizar, dibujar), acciones.js sobre KeyboardEvent.code y guardado.js con idb-keyval y versiones. Pausa opcional con blur. Nombrar quién dirige el arte del juego y con qué skill."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/feedback.js",
   "gravedad": "media",
   "problema": "El contrato 4 promete un solo bus con ganancia maestra de 0,2 y un limitador (pico ≤ −12 dBFS). Eso solo vale para los tonos de feedback(). Cuando audioContext() se inyecta en Phaser, three o Tone, esos motores conectan su salida directamente a ctx.destination y se saltan la ganancia y el limitador. El kit no exporta el nodo de salida.",
   "correccion": "Exportar `salidaMaestra()` y documentar, motor por motor, cómo reconectar su nodo maestro a esa salida. Si no, declarar que la música y los efectos del juego quedan fuera del limitador y darles su propio tope de volumen."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/SKILL.md",
   "gravedad": "media",
   "problema": "La tabla de enrutado no tiene tipo para el uso más típico de three.js: portfolio, escaparate o landing inmersiva, que es el modo Experience de impeccable («portfolios, galleries, showcases»). Ese caso cae en Landing, donde el héroe va con 0 JS y ≤ 50 kB y la regla G6 prohíbe three en el héroe, o en Juego, que no encaja.",
   "correccion": "Añadir la fila «Experiencia inmersiva / portfolio / 3D», con modo Experience, presupuesto propio para la isla del primer viewport (póster como LCP e import() diferido) y la regla G6 limitada a Persuade."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/tipos/app-herramienta.md",
   "gravedad": "media",
   "problema": "Resuelto contra el sentido común. J1 («Astro estático + islas sin framework; React solo si el proyecto ya lo usa») se aplica también a una app nueva con sesión, tablas ordenables, filtros en la URL, paleta de comandos, UI optimista y borradores, y no da ningún criterio para salir de esa regla. La guía de App tampoco cubre enrutado, estado compartido, capa de datos o API, autenticación ni pruebas de extremo a extremo.",
   "correccion": "Fijar un criterio explícito (por ejemplo, varias vistas con estado compartido o edición compleja → Preact, Svelte, Solid, o React con React Aria, dentro de 100 kB) y añadir una sección de datos, estado y rutas."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/tipos/datos-editorial.md",
   "gravedad": "media",
   "problema": "El tipo de datos no tiene ninguna pieza en el kit: ni script de render en el build, ni la anatomía Gráfico · Tabla · Datos, ni navegación roving, ni FLIP con WAAPI. Todo depende de dataviz y charts-graphs. «Observable Plot 0.6.17 en Node genera SVG estático» omite que Plot necesita un DOM en Node (jsdom o linkedom). El fragmento de scrollytelling usa un IntersectionObserver suelto, sin destroy ni AbortSignal, contra el contrato 3.",
   "correccion": "Crear kits/figura/ con render-plot.mjs (Plot + linkedom), la plantilla HTML de la anatomía OWID, navegar.js (roving, flechas, Esc) y flip.js (WAAPI + sibling-index), con una prueba en Playwright."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/SKILL.md",
   "gravedad": "baja",
   "problema": "Duplica en vez de remitir, aunque dice «No repite lo que ellas dicen». SKILL.md copia 18 filas de precedencia, los 12 contratos, el flujo y el protocolo de verificación. El protocolo aparece en cuatro sitios (SKILL, flujo §5, contratos §9 y verificacion.md), los presupuestos en tres o más, «66ch = 95–101 caracteres» en tres, y el entorno (Firefox, git) en cuatro. Ya hay deriva: contratos §8 no tiene fila de Datos/editorial y SKILL sí, y contratos §9 mete Lighthouse dentro de la puerta aunque verificar.py no lo ejecuta.",
   "correccion": "Dejar en SKILL.md el orden de autoridad, el enrutado y cinco o seis choques con enlace, y dar a cada dato una sola fuente en reference/. Añadir la fila de Datos a contratos §8."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/tokens/tokens.json",
   "gravedad": "baja",
   "problema": "Hay tokens prometidos que no existen. Precedencia E7 anuncia «dos tokens de muelle: bounce 0.2/0.5 s y crítico», y el contrato 12 un stroke-width de iconos «como token»; ninguno está en tokens.json. La «segunda columna APCA» (B7, SKILL.md) no la calcula build-tokens.mjs ni ninguna otra pieza.",
   "correccion": "Añadir spring.bounce, spring.critical e icon.stroke-width a tokens.json, y calcular Lc APCA en build-tokens.mjs como columna informativa. Si no, quitar esas promesas."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/verificacion.md",
   "gravedad": "baja",
   "problema": "Hay instrucciones que el agente no puede verificar: las pasadas con VoiceOver en un entorno headless, el «aviso por debajo de 44 px con pointer: coarse» (nada lo mide), la prueba de 100k palabras a 60 fps (no hay fixture) y las 14 pruebas de Chartability (manuales). El grep de literales solo busca colores (ni espacios ni radios), no mira .js ni .ts (colores de canvas) y da falsos positivos con href=\"#abc\" en .astro.",
   "correccion": "Declarar una vía degradada para cada una: árbol de accesibilidad con Playwright o chrome-devtools a11y, marcado «pendiente manual»; tamaño de objetivos medido en verificar.py con hasTouch; fixture de 100k palabras en pruebas/. Ampliar el grep a px y rem fuera de tokens y a *.js y *.ts, excluyendo los href."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/kits/verificar.py",
   "gravedad": "baja",
   "problema": "Detalles de fiabilidad. (1) Si el detector de impeccable no está instalado, el informe pone «no instalado» y la puerta sale en verde (código 0), contra la regla «detector que no corrió = incompleta». (2) El mensaje «faltan motores» se imprime también cuando lo que falta es el detector. (3) La ronda de juicio se cuenta antes de ejecutarse, así que si revienta se pierde. (4) El techo depende del cwd: la misma página lanzada desde otro directorio volvió a ser «ronda 1/2» (probado). (5) Cada --puerta espera 45 s a que arranque Firefox, que se sabe que no arranca.",
   "correccion": "Marcar como incompleto al detector ausente, usar un mensaje genérico, contar la ronda al terminar y guardar rondas.json junto a la página o en la --raiz. Permitir `--motores` por defecto chromium,webkit con Firefox declarado como incompleto sin lanzarlo."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/precedencia.md",
   "gravedad": "baja",
   "problema": "B2 declara que claro, oscuro y alto contraste son «siempre obligatorios» en cualquier superficie: HUD y menús de un juego, piezas Experience, identidades de un solo tema. WCAG no lo exige, duplica el diseño de cada pieza y choca con la regla cero cuando la identidad es de un solo tema.",
   "correccion": "Obligatorios siempre: alto contraste y forced-colors. Segundo tema obligatorio en Read y Operate. En Persuade, Experience y juegos, solo si el brief lo pide o la identidad lo permite."
  },
  {
   "archivo": "/Users/rodrodr/.claude/skills/maestro-diseno-web/reference/contratos.md",
   "gravedad": "baja",
   "problema": "El contrato 11 dice que typograf corre «en el build» y que «Nunca &nbsp; a mano: lo pone el build», pero el kit no trae configuración ni integración (ni plugin remark ni integración Astro). Además falta la regla de 

## Resultado 7

Apliqué los 24 hallazgos. Los comprobé uno a uno antes de tocar nada: todos resultaron ciertos y no rechacé ninguno. En cuatro seguí otro camino que el propuesto y lo explico abajo. Todas las pruebas pasan en Chromium y WebKit. Firefox sigue sin arrancar en esta máquina, así que la puerta de tres motores queda como incompleta, no como aprobada.

## Cómo lo comprobé

Reproduje cada fallo antes de corregirlo:
- **Sepia en tema oscuro**: con el sistema en oscuro, el acento y el foco quedaban a 1,51:1 sobre el papel, el error a 2,20:1, el éxito a 1,71:1 y el aviso a 1,48:1. Son las cifras del crítico.
- **Colores oklch en los motores**: three avisa «Unknown color model» y deja el color sin cambiar, Pixi lanza un error y Phaser lo convierte en negro.
- **Resolver por defecto**: `build-tokens.mjs` fallaba con ENOENT y una traza de Node al ejecutarlo desde fuera de su carpeta.
- **El resto** lo confirmé leyendo el código: la puerta no desplazaba la página, `--fps` no tenía umbrales, la espera de red no estaba protegida, el Locator usaba `scrollY`, el script en línea solo aceptaba claro y oscuro, el paginado era suave con teclado y la ronda se anotaba al empezar.

## Qué cambió, por pieza

**`kits/verificar.py`** (hallazgos 1, 2, 3, 12, 13, 21 y 22)
- Recorre la página por pasos y espera a que cada `<maestro-isla>` quede activa, pausada o en error. Una isla en error hace fallar la puerta, y la consola, el desborde y axe se miden después del montaje.
- Espera a `load` y deja 3 s como mucho a que la red se calme (`--espera networkidle` alarga a 30 s). Un fallo en una combinación se apunta como incompleto (código 2), nunca como traza de Python.
- `--fps` ahora tiene topes: `--p95-max` (16,7 ms por defecto) y `--largos-max` (0). `--accion` ejecuta la entrada del jugador y la medida se hace con la isla montada.
- Presupuestos con `--tipo`, `--presupuesto-js` y `--presupuesto-total`.
- Mide el tamaño de los objetivos en un móvil táctil emulado: fallo por debajo de 24 px sin la excepción de espaciado de WCAG 2.5.8, aviso por debajo de 44 px.
- En las rondas de juicio, capturas de página entera.
- El detector ausente deja la puerta incompleta y el mensaje de «incompleta» ya no habla solo de motores.
- La ronda se anota al terminar, en un registro global (`~/.cache/maestro-diseno-web/rondas.json`) que no depende del cwd.
- Por defecto usa Chromium y WebKit, y declara Firefox como incompleto sin esperar 45 s a que arranque.
- Regresión nueva: `pruebas/prueba_verificar.py`, con las páginas `demo_rota`, `demo_sondeo` y `demo_tirones`.

**Tokens** (hallazgos 4, 8 y 20)
- `build-tokens.mjs`:
  - La media query oscura excluye todos los temas forzados que no son oscuros.
  - Sin argumento usa el resolver que está junto al script, desde cualquier cwd, y si falta da un mensaje limpio.
  - Imprime APCA Lc como segunda columna informativa (comprobado: negro sobre blanco da 106,04, el valor de referencia).
  - Genera `preferencias.inline.js` y `preferencias-config.js` con los temas y familias de cada resolver.
- `tokens.json`: añadidos `spring.gesture`, `spring.critical` e `icon.stroke-width`.
- `prueba_kit.py` mide ahora los 13 pares en la cascada real del navegador (4 temas × sistema claro y oscuro × con y sin alto contraste). Con el build antiguo detecta el 1,51:1.
- `terrazzo.config.mjs` declara que no cubre los temas de lectura.

**`kits/isla.js`** (hallazgos 5 y 14)
- `ctx.hex()` y `ctx.rgba()`: convierten pintando 1×1 en un canvas 2D.
- Atributo `pausa-sin-foco` para pausar al perder la ventana el foco.
- La pieza puede registrarse tarde sin error, algo que necesita el patrón de experiencia inmersiva.

**Preferencias** (hallazgo 7): tema sepia y negro, `--reader-scale`, `--leading-reading`, `--measure-reading` y `--font-family-reading`, con la clase `.lectura` en `base.css`. Probado: todo sobrevive a la recarga y un valor desconocido o fuera de rango no se aplica.

**`kits/lectura.js`** (hallazgos 6 y 9): `posicion` e `irA` aceptan `{ contenedor }` para el modo paginado, y el paso de página con teclado es instantáneo, con fundido opcional. `prueba_lectura.py` añade el caso de ir a la página 5, cambiar el ancho y volver.

**`kits/base.css`** (hallazgo 10): `pretty` solo en `figcaption`, `dd` y `.texto-corto`. Lo medí con la nueva `pruebas/prueba_texto_largo.py` (100 032 palabras, CPU ×4):

| Cambiar el ancho de la columna | `wrap` | `pretty` |
|---|---|---|
| Sin `content-visibility` | 157 ms | 318 ms (supera el umbral de INP) |
| Con `content-visibility` por sección | 3 ms | 6 ms |

El desplazamiento no cambia en ningún caso.

**`kits/feedback.js`** (hallazgo 15): exporta `salidaMaestra()`, con la receta por motor. Probado: en Phaser y three, a la salida solo llega el limitador. En Tone también; ahí además hay que llamar a `setContext(ctx, true)` para cerrar el contexto que Tone crea al importarse.

**Nuevo `kits/juego/`** (hallazgo 14)
- Plantillas para Phaser, Pixi, three y p5, más `bucle.js` (paso fijo y azar con semilla), `acciones.js` y `guardado.js`.
- Prueba: `pruebas/prueba_juego.py`. Tras `destroy()` no queda ni rAF, ni listeners, ni canvas, ni contexto WebGL vivo.
- Encontrado al probar: Phaser no suelta el contexto WebGL y su `destroy` diferido nunca llega a ejecutarse si el bucle está dormido. three necesita `forceContextLoss()`.

**Nuevo `kits/figura/`** (hallazgo 18)
- `render-plot.mjs` (Plot con linkedom), la plantilla con la anatomía OWID, `vistas.js`, `navegar.js`, `flip.js` y `pieza-figura.js`.
- Prueba: `pruebas/prueba_figura.py`. La puerta encontró un `aria-label` prohibido en los grupos que genera Plot, y lo corregí.

**Nuevo `kits/tipografia-es.mjs`** (hallazgo 24): reglas del español en el build, incluida la de la raya de inciso. Prueba: `pruebas/prueba_tipografia.mjs`.

**Documentación** (hallazgos 11, 16, 17, 19, 23 y 25)
- `SKILL.md` queda como punto de entrada (95 líneas): orden de autoridad, enrutado, seis choques con enlace y una sola forma de ejecutar el build.
- Nueva `tipos/experiencia.md` y su fila en la tabla de enrutado.
- En `precedencia.md`:
  - Orden de autoridad: valor frente a contrato, y el procedimiento de excepción registrada en `PRODUCT.md`.
  - Filas revisadas: B2, B7, C2, C7, C8, C12, D11, E7, E10, F1, G6 (limitada a Persuade), H6, I4, J1 (criterio para salir de Astro), J2, J16 (ruta de producción de p5), K1, K3 y L5.
  - Fila nueva: H8.
- `contratos.md` §8 es la única fuente de los presupuestos, con filas nuevas para Datos y Experiencia; §9 remite a `verificacion.md` y deja Lighthouse fuera de la puerta.
- `verificacion.md` es la única fuente del protocolo, con una vía degradada para cada comprobación manual y un grep que ahora mira también `.js`/`.ts` (probado en zsh y bash).
- Actualizadas `flujo.md` y las guías de juego, lectura, app (criterio de stack y sección de datos, estado y rutas), datos y landing.

## Dónde me aparté de la corrección propuesta

- **Presupuestos (13)**: no uso `encodedBodySize`, porque el servidor local no comprime y daría el tamaño sin gzip. `verificar.py` vuelve a descargar cada recurso y mide su gzip -9.
- **Plantillas de motor (14)**: van en `kits/juego/` y no en `pruebas/`, porque son plantillas para copiar; las pruebas sí están en `pruebas/`.
- **typograf (24)**: escribí un módulo propio sin dependencias en lugar de integrar el paquete `typograf`. En Terrazzo declaré el alcance en vez de parametrizar el resolver, porque no podía probarlo sin instalarlo.
- **Reglas de Luz y Taquígrafos (25)**: las generalicé dentro de la skill, pero no escribí en el `PRODUCT.md` de luz_site porque queda fuera de esta carpeta. Pasar allí la identidad es un pendiente.

Las dependencias de Plot solo las instalé en la carpeta temporal para probar. Para usar `render-plot.mjs` en un proyecto hay que hacer `npm i -D @observablehq/plot@0.6.17 linkedom@0.18.13`.

Todo está en `/Users/rodrodr/.claude/skills/maestro-diseno-web/`. Las pruebas están en `kits/pruebas/` (`prueba_kit.py`, `prueba_lectura.py`, `prueba_juego.py`, `prueba_figura.py`, `prueba_verificar.py`, `prueba_tipografia.mjs` y `prueba_texto_largo.py`).

## Resultado 8

He construido la landing en `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/landing/` siguiendo la skill maestra paso a paso. La puerta técnica pasa en Chromium y WebKit. Sale «incompleta» (código 2) solo porque Firefox no arranca en esta máquina. Las dos rondas de juicio ya están gastadas, y hay 18 fricciones anotadas.

**Qué hay en la página**
- **Identidad (supuesto mío, queda abierto para el investigador):** usé la registrada de Luz y Taquígrafos (oscura editorial y tema claro derivado; Cormorant cursiva, EB Garamond, JetBrains Mono). No usé la de la aplicación actual (crema y rojo ladrillo), porque no está registrada.
- **Héroe:** titular «¿Con quién estaban dispuestos a firmar?», botón «Descargar la base en Dataverse» y enlace secundario a la aplicación. El botón se ve sin desplazarse a 375×667. El movimiento es CSS puro, sin JS: tres paneles de 100 arcos que se dibujan de 1931 a 1936, con los que cruzan de bloque en oro (35, 23 y 7 de cada 100). Dura 800 ms en total y no se mueve con movimiento reducido.
- **Hilo:** una traza de oro cuyo grosor es el cruce medido (35,1, 23,0 y 7,4 %), con cada cifra dentro de su frase.
- **Figura interactiva, «El hemiciclo de las firmas»:** canvas 2D propio con escaños ordenados por ideología y una cuerda por cada par de cofirmantes. Se puede cambiar de legislatura y entre «de bloque» y «estricto». La nota emergente funciona con puntero, foco y toque, y hay recorrido por teclado. Tiene tabla equivalente, CSV descargable y póster sin JS.
- **Cifras:** todas salen de `tools/datos.py` sobre los CSV (comprobé que las dos copias son idénticas). Ninguna está tecleada en la plantilla:
  - 78 diputados en el censo de las tres legislaturas.
  - Cruce de bloque 35,1, 23,0 y 7,4 %.
  - 1.530 medidas, 63.507 relaciones y 1.026 personas.
  - El centro está en el 79,8, 89,0 y 21,5 % del cruce.
  - En 1936-1939, el cruce estricto se reúne en 16 de 89 medidas.
  - No hay testimonios ni logotipos. Tampoco uso «94.621» ni «densidad 0,84», que no se reproducen.

**Verificación**
- **Tokens:** la construcción comprobó 22 pares de contraste en 4 contextos. Rechazó un par real (5,47 < 7 en alto contraste) y lo corregí.
- **Puerta:** consola sin errores, axe 0 infracciones y ningún desborde. Antes WebKit desbordaba 105 px a 390 px; lo arreglé. Sin fallos de objetivos táctiles. JS antes de interactuar 6,6 kB gzip, 13,4 kB con la isla montada; peso inicial 110 kB.
- **Estados interactivos:** en los dos temas, axe da 0 con la nota abierta y en las pestañas Tabla y Datos. El botón de tema, copiar la cita y `destroy()` sin fugas funcionan.
- **Rendimiento:** no ejecuté Lighthouse, porque `npx` necesita tu permiso para descargarlo. Lo medí con Chromium ralentizado (Slow 4G, CPU ×4, mediana de 3): LCP 588 ms, CLS 0,011 y TBT unos 31 ms. Es un sustituto, no la cifra de Lighthouse.
- **Revisión final:** la hice en un solo contexto, porque este subagente no tiene la herramienta `Agent`. Veredicto: se puede publicar.
- **Ronda de corrección:** un lote tras la ronda 1:
  - la barra de anclas de la figura salía duplicada;
  - el hilo estaba cortado;
  - las palabras se partían con guion (siglas, DOI, nombres);
  - el botón de tema quedaba solo en una fila en el móvil;
  - las tablas partían las celdas;
  - la figura en tema claro salía turbia.

**Puntos abiertos (baja prioridad)**
- `src/estilos.css:193`: en el móvil, «1936-1939» baja sola a otra línea en los conmutadores.
- `build.mjs:54`: en 1936-1939, los 7 arcos en oro son muy anchos y pesan más de lo que cuentan; el pie de figura lo aclara.
- `src/pieza-hemiciclo.js:96`: a 390 px el hemiciclo es pequeño y dominan los escaños sobre las cuerdas.
- El detector marca 7 veces la cursiva serif del titular. Es la identidad registrada, así que no lo toqué.

**Capturas** (en `.verificacion/`, dentro de la carpeta)
- Ronda 1: `ronda/20260923-012544/chromium_{1280x800,390x844}_{light,dark}.png`, más `chromium_390x844_reducido.png`
- Ronda 2: `ronda/20260923-012959/` (las mismas, más `chromium_390x844_sin-js.png`)
- Puerta con fallo inicial: `puerta/20260923-012143/`; puerta final (Chromium y WebKit): `puerta/20260923-012814/`
- Rendimiento: `rendimiento.json`

**Fricciones principales** (las 18 están en `FRICCIONES.md`, cada una con su mejora exacta)
1. **`[hidden]` no oculta nada con estilo propio.** El kit lo declara en la capa más baja, así que cualquier componente con `display` lo anula; salían a la vez las anclas y las pestañas de la figura. Propuesta: moverlo a `@layer utilities` y añadir una prueba.
2. **«Sin torneo» con identidad fijada choca con impeccable.** Para una página entera dentro de un mundo existente, `new-work` sí exige `concept-seed --scope surface`. Además, ese comando imprime aspirantes de mundo que no se usan y no lo dice.
3. **El modo desatendido está incompleto.** Cuatro textos se contradicen (`impeccable context`, `init`, `shape` y `flujo.md`) y no queda claro si lanzar `serve-question` sin nadie que conteste.
4. **Sin herramienta `Agent`**, el contexto aislado que piden `critique` y el revisor final es imposible, y la skill no da vía para ese caso.
5. **No hay regla entre dos identidades:** la registrada del proyecto madre frente a la incumbente sin registrar de la aplicación.
6. **`verificar.py --sin-js` captura a mitad de la animación.** Propuesta: `animations="disabled"`.
7. **El CSS en línea que pide la guía de landing no tiene herramienta en el kit,** que además usa `@import` (tuve que escribirla en `build.mjs`).
8. **`hyphens: auto` en todos los párrafos** parte siglas, DOI y nombres.
9. **Tiempos y curvas: ¿valor o contrato?** No se sabe si mandan la identidad o el contrato, ni si los 800 ms valen por elemento o para toda la coreografía.
10. **El separador de millares del contrato** (espacio fino) choca con el punto de la identidad.

Otras menores: el rendimiento queda siempre «pendiente», el detector da hallazgos sin selector, el kit incumple su propia regla de literales y `cwebp` sale como disponible pero es un binario x86 que no arranca (usé Pillow).

La página servida está en `dist/index.html`. Los ficheros de proceso son `PRODUCT.md`, `DESIGN.md` (derivado de los tokens), `build.mjs`, `tools/` y el brief en `.impeccable/surfaces/src-index-html.md`. No hay `node_modules`.

Todo está en `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/landing/`:
- dist/index.html
- FRICCIONES.md

## Resultado 9

Intento repetido y terminado. El juego «Taquígrafo» está construido y se puede jugar en escritorio, móvil, teclado, ratón, toque y mando. La puerta técnica pasa en todo lo que ejecuta; queda «incompleta» solo porque Firefox no arranca en esta máquina. No he hecho la revisión final en un contexto nuevo porque este subagente no tiene la herramienta `Agent` (F19): según impeccable, el trabajo no está cerrado hasta que se haga.

**El juego.** Hay que cazar en orden las palabras de 60 frases literales del Diario de Sesiones (47 diputados, 1931–1936, sacadas del CSV con `datos/extraer_frases.py`). Los obstáculos son acotaciones reales («Rumores», «Risas», «Protestas») en la proporción del CSV: 7.378, 4.374 y 1.428. La campanilla del Presidente limpia la pantalla y devuelve tinta; en el Diario sale 101 veces y aquí aparece más a menudo, lo que la página dice. Al cerrar cada frase se ve la cita completa con orador, partido, fecha y sesión.

He seguido la skill paso a paso e invocado `impeccable`, `phaser`, `ui-sound-design` y `test-playable-web-games`. Nadie podía responder a la página de elección de estilo, así que seguí con el que asignó el sorteo: portada de semanario gráfico en huecograbado. Fuentes Jost y Bodoni Moda; Phaser por CDN; sin `node_modules`.

**Lo que se midió:**
- **Puerta técnica** (Chromium y WebKit, dos temas, tres anchos, movimiento reducido): 0 errores de consola, 0 desbordes, axe sin infracciones, CLS 0.
- **Peso:** 394,6 kB de JS comprimido; el tope del tipo juego es 500.
- **Fluidez tras pulsar «Jugar», con la CPU cuatro veces más lenta:** 117 FPS, el 95 % de los frames por debajo de 9,2 ms y ningún frame largo. El navegador sin ventana va a 120 Hz, así que las cifras son relativas.
- **Recorridos del jugador** (`pruebas/prueba_taquigrafo.py`): 48 comprobaciones en Chromium y WebKit, todas en verde. Cubren los controles, la pausa, perder y reintentar, el récord tras recargar, exportar e importar, la pérdida y recuperación de WebGL y el desmontaje sin fugas.
- **Sonido:** un solo AudioContext y solo el limitador llega a la salida.
- **Juicio:** dos rondas de capturas con un único lote de arreglos entre ellas (pie de foto dentro del primer viewport, la frase cerrada como cita entre comillas, rejilla de teclas).

**Pendiente:** la revisión final, Lighthouse (hay que descargarlo con `npx`, así que espera tu permiso), Firefox, VoiceOver, la vibración en iOS y los FPS en un móvil real.

**Capturas** (en `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/juego/capturas/`):
- `ronda2/juego/`: escritorio y móvil × claro y oscuro, cada uno en portada, jugando, frase cerrada, pausa y fin (20 imágenes).
- `ronda2/pagina/`: página entera a 1280×800 y 390×844 en los dos temas, más movimiento reducido, con `informe.json`.
- `ronda1/`: lo mismo antes de los arreglos.
- `puerta/final/`: 14 capturas de la puerta y su `informe.json`.

**Fricciones más caras** (las 24 están en `FRICCIONES.md`, cada una con el texto exacto que propongo):
- **F1:** sin nadie que conteste, la página de elección se queda esperando para siempre; `flujo.md` necesita un corte de 60 s.
- **F6:** `pieza-phaser.js` no aplica la densidad de píxeles de la pantalla y el texto sale borroso en pantallas 2×. La solución probada va en el fichero.
- **F7:** un marcador DOM opaco encima del canvas WebGL dejó sin pintar la parte baja del lienzo en Chromium sin ventana. Lo arreglé poniendo el marcador en su propia franja.
- **F8:** `acciones.js` impide que Espacio y Entrar activen los botones de dentro de la isla. Lo vi leyendo el código y lo corregí en mi copia antes de que fallara.
- **F19:** sin `Agent` no hay revisión final ni evaluación aislada.
- **F20:** `DESIGN.md` debería salir generado de los tokens, pero no existe generador; lo escribí a mano.
- **Otras:** la identidad cuando los datos vienen de otro producto, el antetítulo prohibido frente a la gramática de revista, la telemetría de `concept-seed`, el CLS que la puerta no explica, `verificar.py` que solo fotografía la portada, la háptica del juego sin documentar, el detector que contradice al contrato 11 y la carpeta servida que expone el brief de dirección.

Los arreglos del kit (F8 y los nombres de teclas en español) están solo en la copia del ejemplo, `kit/juego/acciones.js`, no en la skill.

Todo está en `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/juego/`:
- index.html
- estilos.css
- juego/
- datos/
- kit/
- pruebas/
- FRICCIONES.md
- PRODUCT.md
- DESIGN.md
- .impeccable/

## Resultado 10

He construido el lector de la sesión 48 y lo he verificado en Chromium y WebKit. La puerta técnica de `verificar.py` pasa en todo lo que ejecuta, pero queda como **INCOMPLETA** porque Firefox no arranca en esta máquina. El revisor final (hecho en línea, porque aquí no hay subagentes) da **disposition: fix**: el lector no cumple dos puntos de su propio contrato de dirección, y los dejo abiertos para ti.

## Qué hace el lector
- **Fuente:** las 395 filas del CSV para `1931-10-01`, sesión 48, legislatura 1931-1933, sin corregir el texto. La portada resume el día con cifras comprobadas en la fuente: el art. 34, que da el voto a la mujer, se aprueba por 161 votos contra 121, tras el debate entre Kent y Campoamor; de noche, la huelga de la Telefónica.
- **Aviso del OCR:** está en la portada y al final. Desde el turno 363 el CSV repite en bucle los turnos 357–362 y se corta en «El Sr. Ministro de». Esos turnos se muestran plegados, íntegros y marcados. Tampoco trae la apertura de la sesión: empieza en «Pido la palabra». De la votación, el Diario imprime 161 síes y el CSV conserva 160 nombres; se dice junto al recuento.
- **Aspecto:** extiende la identidad de Luz y Taquígrafos (la de `luz_site`). El orador va en versalitas; el discurso, en redonda; las acotaciones, en cursiva y destacadas. Hay 173 acotaciones, clasificadas por patrón y declaradas como tal. Los turnos breves van en la misma línea que el orador, como en el Diario impreso.
- **Ajustes:** tamaño, interlineado, ancho de columna, cuatro temas (papel, sepia, noche, negro), alto contraste y letra Garamond, sin serifa u OpenDyslexic. Se aplican antes de que se pinte la página.
- **Navegación:** índice de 48 oradores y de 11 partes. Elegir un orador pliega la sesión a sus turnos y deja visibles las «costuras» con el número de turnos omitidos.
- **Búsqueda:** ignora tildes y mayúsculas, distingue ñ de n y recorre los resultados con Intro y con `n`/`N`.
- **Subrayados y notas:** se guardan en el navegador (IndexedDB) y se exportan en JSON (formato W3C) y en Markdown. También hay progreso con tiempo aproximado y oferta para seguir donde se dejó.

## Cifras de la verificación
- **Puerta técnica:** 0 errores de consola, sin desborde horizontal y axe sin infracciones graves, a 4 anchos y en los 2 temas. Líneas de 65–66 caracteres en escritorio y 53–54 en móvil.
- **Peso:** 15,7 kB de JS comprimido (el tope es 50).
- **Contraste:** el cuerpo de texto supera 7:1 en los 8 contextos (4 temas, con y sin alto contraste).
- **Rendimiento:** con 4G lenta y CPU ×4 simuladas, LCP 1 720 ms, CLS 0 y cambiar la letra 23 ms. No he pasado Lighthouse: su descarga necesita tu permiso.
- **Pruebas funcionales:** 28 comprobaciones por motor, todas bien. El espaciado de texto que exige WCAG (1.4.12) no desborda.
- **Detector de impeccable:** casi todos sus avisos son falsos positivos de la identidad y están registrados como excepciones en `PRODUCT.md`. El de largo de línea, no: encontró un fallo real.

## Rondas
- Hice la ronda 1, un solo lote de arreglos y la ronda 2.
- La ronda 2 mostró que un arreglo del lote rompía la medida: los turnos breves se metían en el margen. Lo corregí con una línea de CSS verificada solo con la puerta técnica y una comprobación nueva, sin abrir tercera ronda.

## Pendiente
- **Puntos abiertos del revisor:** a 1280×800 el primer turno no asoma en la primera pantalla, como prometía el contrato; y el contrato ponía el índice y los ajustes en una barra inferior en móvil, pero están arriba.
- **Abierto desde `file://`:** el lector funciona entero, pero las fuentes caen a Georgia porque el navegador las bloquea (CORS). Servido por HTTP va completo.

## Capturas
- Ronda 1: `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/capturas/ronda1/muestras/`: 38 ventanas, escritorio y móvil en los dos temas (portada, Kent, votación, explicaciones de voto, noche, tramo dañado, lente, ajustes, notas).
- Ronda 2: `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/capturas/ronda2/muestras/`
- Página entera de `verificar.py`: `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/capturas/ronda1/20260923-014521/` y `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/capturas/ronda2/20260923-015755/`. Salen en blanco más allá de la primera pantalla; es la fricción 2.
- Puerta técnica: `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/capturas/puerta/20260923-020609/`
- Para el revisor: `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/.impeccable/review/desktop.png` y `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/.impeccable/review/mobile.png`

## Fricciones principales
Son 20; cada una trae la mejora exacta en `FRICCIONES.md`.
1. **ALTA · `content-visibility`:** la guía de lectura lo recomienda sin avisar de lo que rompe. WebKit da posiciones desfasadas de lo que no está en pantalla: un párrafo en y = 69 con su turno en y = −775, así que la posición guardada elige mal. Los saltos caen en otro sitio: ir al turno 26 mostraba el 21. La lente dejaba huecos y el recuento sin JS da 2 956 caracteres en vez de 255 185. A cambio, cambiar la letra pasa de ≈ 210 ms a ≈ 30 ms.
2. **ALTA · Capturas de la ronda:** las de página entera salen en blanco (101 992 px capturados frente a 153 381 reales) y una tira así no se puede mirar. Propongo capturar ventanas en anclajes; está hecho en `pruebas/muestras.py`.
3. **ALTA · Fallo del kit:** en `base.css`, `[hidden]` está en la capa más baja y cualquier componente con `display` lo anula. La barra de la lente se veía estando oculta.
4. **ALTA · Identidad:** la skill no dice qué hacer cuando la identidad está en otro proyecto, el dueño del contenido, no en la carpeta de trabajo.
5. **MEDIA · Modo desatendido:** impeccable se contradice sin usuario: `shape` dice parar y `concept-seed` se niega sin `PRODUCT.md`.
6. **MEDIA · Detector:** sus avisos no se pueden marcar como aceptados por la identidad sin tocar configuración.
7. **MEDIA · Techo de rondas:** no dice qué hacer con una regresión que el propio lote introduce.
8. **MEDIA · DESIGN.md:** el cierre de impeccable lo exige, extender un mundo lo prohíbe y el paso 6 del flujo lo genera siempre.
9. **MEDIA · Revisor final y parte A de `critique`:** necesitan subagentes, y el revisor busca las capturas en una carpeta donde `verificar.py` no las deja.
10. **Otras:** `build-tokens` exige 7:1 en alto contraste también a bordes; las familias elegibles incluyen la mono; faltan tokens de tamaño; `tipografia-es` convierte comillas sueltas del OCR en «»»; `page.click()` sobre una barra fija desplaza la página en Chromium (−414 px) y falsea las pruebas de posición; y la retoma de lectura con `content-visibility` no se probaba en WebKit.

Archivos:
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/FRICCIONES.md`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/dist/index.html`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/build.mjs`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/src/lector.js`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/src/lector.css`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/PRODUCT.md`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/pruebas/prueba_lector.py`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/pruebas/muestras.py`
- `/Users/rodrodr/.claude/skills/maestro-diseno-web/ejemplos/lectura/pruebas/rendimiento.py`

## Resultado 11

1. La skill `/Users/rodrodr/.claude/skills/maestro-diseno-web/` fija para cualquier aplicación web el tipo, el modo, un flujo de seis pasos, qué skill dirige cada paso, quién gana cuando dos skills chocan (reglas A1–L7) y los doce contratos, con un kit probado en Chromium y WebKit.
2. Integra las 62 fricciones de las tres demos (juego 24, lector 20, landing 18); cada una está resuelta o anotada como pendiente en `CHANGELOG.md`, que también las relaciona con su prueba.
3. Arreglos del kit: `[hidden]` pasa a la capa más alta; el guionado queda solo en la prosa; tokens `size.*` para quitar los números sueltos; el mínimo de contraste en alto contraste depende de si es texto (7:1) o no (4,5:1); una paleta de juego de ejemplo; la plantilla de Phaser ya ajusta la nitidez a la densidad de pantalla; `acciones.js` deja Espacio y Entrar a los botones; y `lectura.js` funciona con `content-visibility`.
4. `verificar.py` gana `--estado`, `--muestras` (ventanas para lectura larga), `--excepciones` y las fuentes del CLS. También cuenta el texto sin JS aunque esté oculto por `content-visibility`, avisa si no pudo medir la línea y deja las capturas donde las busca el revisor final.
5. Piezas nuevas: `css-en-linea.mjs`, `empaquetar.mjs` y `almacen.js` (el lector funciona abierto con doble clic), `medir-reservas.py`, `rendimiento.py` (mide sin descargar Lighthouse), `tokens/design-md.mjs` y un modo de teclado para figuras en canvas.
6. Todas las suites del kit pasan en Chromium y WebKit tras los cambios, incluida `prueba_herramientas.py`, que es nueva. Salvo la del teclado en canvas y las del juego, las pruebas nuevas comprueban el arreglo: la plantilla vieja de Phaser falla la de nitidez y, sin el arreglo de lectura, un salto se desvía 3 237 px. El `verificar.py` nuevo sale incompleto solo por Firefox en las tres demos.
7. Cada tipo enlaza su demo en `SKILL.md` y en `reference/tipos/*.md`; los tres tipos sin demo dicen qué parte de las otras les sirve. `ejemplos/README.md` avisa de que el `kit/` de cada demo es anterior a los arreglos y no se debe copiar.
8. `SKILL.md` sigue siendo operativo (101 líneas, frente a 95; descripción sin crecer), y comprobé que todos sus enlaces, anclas y rutas existen.
9. Identidad: el juego creó un mundo nuevo y el lector y la landing extendieron el de Luz y Taquígrafos. Manda la superficie y su dueño, no la procedencia de los datos: una superficie del producto la extiende; una pieza propia pregunta y, sin usuario, crea mundo y cita la fuente.
10. Sin la herramienta `Agent`: el revisor final se hace en línea y su veredicto es provisional; se devuelven al orquestador las capturas, el informe y el contrato de dirección para que lo repita en un contexto nuevo. `DESIGN.md` depende de dónde vive la superficie; `design-md.mjs` genera la cabecera y el documentador escribe el texto.
11. Página de decisión sin usuario: no se sirve si nadie la mira y la espera nunca pasa de 60 s. Antetítulo: manda la identidad registrada; en mundos nuevos va debajo del título. Duraciones y separador de millares los pone la identidad; el contrato solo fija topes.
12. Detector de impeccable: una sola vía, `--excepciones`, que lee `PRODUCT.md`; `line-length` no se acepta nunca. Una regresión del propio lote se arregla sin gastar una tercera ronda. Si falta solo Firefox, la verificación vale como verde y se dice.
13. Queda abierto el revisor final en contexto nuevo de las tres demos. Firefox, VoiceOver, la vibración en iOS y los FPS en móvil siguen sin comprobar. Lighthouse real necesita tu permiso porque `npx` lo descarga.
14. No reconstruí las demos con el kit corregido: el juego sigue sirviendo desde su raíz. Quedan sus propios pendientes: los dos puntos del revisor del lector, tres detalles menores de la landing y la identidad de la landing, que es un supuesto que debe confirmar el investigador.
15. No toqué impeccable, que se contradice consigo mismo en modo desatendido (la nueva receta lo ordena). Tampoco hay demo para experiencia inmersiva, datos o apps, y la retoma con `content-visibility` no se ha probado en un capítulo de 100 000 palabras.
