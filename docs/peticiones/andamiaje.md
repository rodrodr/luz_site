# Peticiones y avisos del grupo «andamiaje»

Dueño de la estructura Astro, `src/lib`, `src/config`, `src/styles`, los componentes genéricos, la isla, `scripts/` y `tests/`.

22-09-2026. El andamiaje está hecho y compila: 46 páginas (22 por lengua, la raíz y el 404). Esto es lo que otros dueños
necesitan saber para colgar de él su trabajo, y lo que el andamiaje necesita de ellos.

## Cómo se usa

| orden | qué hace |
|---|---|
| `npm run i18n` | `docs/copy_es/*.md` → `src/i18n/es.json` (y `copy_en` → `en.json`), en el orden del copy; comprueba claves, marcadores, formatos y las frases fijas ↺; escribe también `src/i18n/anclas/<lang>.json` (qué ↺ repite cada archivo y detrás de qué clave) |
| `npm run build` | compila la vista previa: lo que falta se pinta ⟦así⟧ y no rompe nada |
| `npm run check` | `astro check` + `check-i18n` (números tecleados, vetos, frases de más de 30 palabras, es/en) + `formatos` (los 48 casos de `formatos.json`) |
| `npm run audit` | auditoría de `dist/`: toda cifra con `data-base`; NotaBases donde hay v3; nada del prototipo; ningún recurso de terceros; lista de pendientes |
| `npm test` | Playwright contra `astro preview` (4322): humo (46 rutas a 360 px oscuro y 375 px claro), sin JS, solapes, peso, guardas, movimiento. Usa el Chrome del equipo (`PW_CHANNEL`) |
| `npm run og` · `npm run lectura` | imagen social y favicono · `docs/lectura/es.md` (el copy con las cifras de hoy puestas) |
| `npm run publicar` | la puerta de publicación entera, con `STRICT=1`: hoy falla, como debe (falta el inglés, las figuras y D-20) |

## A los dueños de las plantillas de página (`src/pages/[lang]/…`)

1. **Las plantillas ya son suyas.** Pintan lo que haya: `Seccion` recorre, **en el orden del copy**, todo lo que cuelga
   de su prefijo (`lib/lectura.ts`) y decide cómo pintar cada clave por su último segmento: `titulo` → H3 ·
   `consulta` (+ `filtros`, `recuento` hermanos) → consulta copiable · `fuentes`, `anclas`, `pie`, `nota`, `ids` → nota ·
   `salvedad` → nota al margen · `accion`, `llamada`, `enlace` → botones · `cita` → cita copiable. Lo que es de una figura
   (`tabla`, `col`, `leyenda`, `conmuta`, `eje`, `alt`) no se pinta. Tras cada clave van las frases fijas y los rótulos
   que el copy repitió con ↺ justo detrás: los rótulos únicos (`comun.boton.*`) salen como botón con su destino.
2. Lo que el copy trae y la plantilla aún no coloca sale al final en una caja rayada, **«⟦sin sitio en la plantilla⟧»**
   (solo en la vista previa). Cuando su página esté hecha a mano, esa caja debe quedar vacía.
3. Cada `<FigHueco id="F01" …>` (con su comentario `<!-- FIG F01 … -->`) se sustituye por el componente de la figura.
   En publicación un hueco para la compilación.
4. Márgenes: dentro de una sección, las notas (`.al-margen`, `.nota-m`, `.salvedad`, `NotaMargen`, `NotaBases`) suben
   solas a la columna del margen en escritorio (10–12; 7–9 en las lecturas con índice) y van detrás en el móvil. Las
   figuras, los registros y las consultas ocupan el ancho del cuerpo.
5. Componentes a mano: `CabezaPagina`, `Seccion`, `SubNav`, `IndiceLateral`, `BandaCTA` (solo Método y Explorador),
   `Salidas` (la escalera), `Cita`, `CopiarConsulta`, `NotaBases`, `Sello`, `NotaMargen`, `CitaDiario`, `FilaDatos`,
   `CifraFrase`, `Registro`, `RegistroPuertas`, `ficha/Tareas`, `ficha/Vecinas`, `Captura` (tallas `ancha`, `media`,
   `estrecha`), `Hemiciclo`, `TablaFiguras` (F35, generada del registro).
6. La auditoría exige NotaBases en toda página que pinte una cifra de la v3 fuera del pie. Los ids dobles de las citas
   no cuentan si van en una cita (`data-autoria` o en un bloque `cita` del copy).

## A los dueños de las figuras

1. **Marco común:** envuelva su figura en `<FiguraMarco lang id="F01" plantilla={…} tactil>` con las ranuras `grafico`,
   `tabla`, `datos` (opcional: por omisión pinta descarga, ↺ 12, archivos, base con huella y fecha, y la cita de la
   figura) y `barra` (la única conmutación). Estilos propios en el `<style>` del componente; geometría en
   `src/viz/geom/<figura>.ts`; comportamiento propio en `src/scripts/fig-<nombre>.ts`.
2. **La isla** (`src/scripts/figuras.ts`, contrato en su cabecera): nota emergente invertida de tres líneas por
   plantilla (`data-plantilla-t` · `data-plantilla` · `data-plantilla-b`, con huecos `{nombre}` y valores `data-v-*`),
   teclado (`data-recorre` + `data-paso`, ← → ↑ ↓ Inicio Fin Esc; aria-live solo al recorrer, con «3 de 12»), dianas
   enfocables (`data-diana`, 44 px), toque (primer toque enseña, segundo navega), pestañas ↔ hash (`#calendario-tabla`),
   entrada del calendario (`data-entra-fig` y `--n`/`data-n` en cada celda), y vuelve a enlazar si la figura se sustituye.
3. **Plantillas de la nota desde el copy:** `plantillaNota(lang, 'fig.F01.nota.mes')` convierte `{{n}}` en `{n}` y
   resuelve las cifras de `cifras.json` que haya dentro.
4. **Momentos pesados** (`<lyt-diario-fila>`, `<lyt-red>`): `diferir('lyt-red', () => import('./fig-red'))` de
   `src/scripts/pesado.ts` (carga al verse, pausa fuera de pantalla y con `visibilitychange`).
5. **Registro** `src/lib/figuras.ts`: id, ancla, página, base, archivos. Si una figura cambia de ancla o de archivos, se
   cambia ahí: de ahí salen el LÉAME (`/datos/leame-<id>-<lang>.txt`), la cita y F35.

## Al copy (todos los grupos)

1. Claves que leen los componentes genéricos (las de `comun.md` ya están alineadas con ellos): `comun.fig.pestanas`,
   `comun.fig.datos.nota`, `comun.fig.imagen.nota`, `comun.fig.base`, `comun.fig.salvedad`, `comun.isla.*`,
   `comun.consulta.*`, `comun.cita.*`, `comun.sello.*`, `comun.hemiciclo.*`, `comun.vecinas.*`, `comun.indice.titulo`,
   `comun.boton.*`, `comun.fija.*`. Por figura: `fig.<id>.titulo`, `.pregunta`, `.salvedad` y, para el LÉAME,
   `.que_mide` y `.denominador` (o `.leame.que_mide`, `.leame.denominador`).
2. `check-i18n` da hoy **6 números tecleados** que piden marcador o una forma de la lista blanca:
   `datos.decisiones.5.texto` («hasta la 60…»), `metodo.02.texto` («E1 Sr.», mejor entre acentos graves: es código de
   lectura), `metodo.07.texto` y `metodo.07.pruebelo.explorador` («La 77», «la 321»: «la sesión 77»),
   `sesiones.cuestion-religiosa-1931.explorador.biblioteca` («del 24»: «del art. 24»), `sesiones.mexico-1945.que_paso.3`
   («El 8, …; el 9, …»: «El 8 de noviembre»). Y un aviso de tono, `cortes.1933.contexto.3.d` («revolucionaria»; si es
   «la huelga general revolucionaria», es correcto).
3. Las citas del Diario y la bibliografía pueden llevar dígitos: van en claves con un segmento `cita`/`citas` o
   `leer`/`fuentes` (la guarda de citas y la bibliografía responden de ellas).

## Al exportador

1. Los archivos de figura en `public/datos/`: `<archivo>.csv` y `<archivo>.xlsx` con los nombres de
   `src/lib/figuras.ts › archivos` (p. ej. `sesiones`, `meses`, `votaciones`, `oradores_etapa`…); el LÉAME lo genera el
   sitio. Las imágenes de F01 y F26 van como `datos/<id>-<lang>.svg|png`.
2. Hecho según su petición: `peso` en KB bajo 1 MB, `letra` hasta 30 en femenino, formatos `fecha`, `anio`, `texto`,
   `pct`, `peso1`, `peso2` (48 de 48 casos de `formatos.json` idénticos); JSON-LD `{es, en}` por lengua; `alias_de`
   admitido. La auditoría compara `value` y `base` de cada `<data>` con `cifras.json`.

## Respuesta a dirección de arte (`diseno.md`)

Aplicado: tokens (oro invertido, ausencia a 3,8:1, escala tipográfica, rejilla de 84 rem, `--e1…--e9`, `--aire`, curva
exponencial, sin sombra de nota; contrastes medidos en cada compilación), enlaces que subraya el oro, asiento en caja
normal (`.kicker` queda como alias), botones en EB Garamond, versalitas simuladas, comillas por lengua, secciones sin
filetes, notas al margen por colocación automática, lectura en 12 columnas, cabecera y pie de DESIGN.md, sprite de
iconos dibujados (se retiran ◐ y ↗; la «↗» y la «→» finales de un rótulo pasan a icono), fuentes solo latin y
latin-ext con respaldo métrico y precarga en Inicio, cambio de tema con `startViewTransition`, hemiciclo que se sienta
(`--o` y `pathLength`), nota emergente invertida con flecha y 150 ms de gracia, pestañas ↔ hash, entrada del calendario,
`@view-transition`, impresión, y los componentes nuevos (NotaMargen, CitaDiario, FilaDatos, Registro, CifraFrase).
Diferencias, a propósito: la clave del tema es `lyt-tema` y no `tema` (rodrodr.github.io es un solo origen para
ParlaIbero, el explorador y este sitio); el hemiciclo conserva un radio «Todos» porque sin JS un radio no se desmarca;
`Cabecera`, `Pie` y `BandaTesis` viven en `Base.astro` e Inicio y no como archivos propios; el contraste lo mide
`scripts/tokens.mjs` en cada compilación en lugar de un `contraste.spec`.

## Al investigador

- **Git.** `/usr/bin/git` y `/usr/local/bin/git` no arrancan en este equipo (binarios x86 sin Rosetta). El repositorio
  (`.git`, rama `main`, sin commits) se creó a mano con la estructura que deja `git init`; conviene reinstalar las
  herramientas de línea de órdenes de Xcode.
- **[Escribirnos].** `PENDIENTES_DEL_INVESTIGADOR.contacto` vale `null`: en ParlaIbero usted dio su correo institucional
  (21-09-2026); confírmelo aquí y el enlace del pie queda resuelto.
