# Pulido final · fase 2 (23-09-2026, 02:45)

Una ronda acotada con el método de impeccable (polish, con el suelo de craft-floor) sobre los 47 hallazgos de las tres
críticas: 20 de experiencia, 14 de técnica y 13 de datos, con algunos repetidos entre ellas. Cada hallazgo se comprobó
en el sitio antes de tocar nada. Se arreglaron los reales: el P0, los cuatro P1 (dos de experiencia, uno de técnica y
uno de datos) y los P2 y P3 baratos. Los que no se tocaron llevan su motivo.

**En una línea:** el P0 y los cuatro P1 están corregidos. De los 47 hallazgos, 36 se aplicaron entero o en parte, 2
eran falsos, 5 se rechazan con motivo y 4 pasan a su dueño. Todas las puertas quedan en verde salvo `peso.spec`, que es
decisión del investigador. axe da 0 violaciones en 176 pasadas.

## Puertas (después del pulido)

| puerta | resultado |
|---|---|
| `python3 exportador/exportar.py --estricto` | ✓ 1.492 marcadores declarados y comprobados, 0 sin cifra, 40 s. Siguen los dos avisos conocidos (la cita de DV es texto; el control de vicepresidencias) |
| `npm run i18n` · `check-i18n` | ✓ 2.434 claves: 4 nuevas y 2 quitadas. Sin números tecleados ni palabras vetadas. Sigue el aviso de tono de `cortes.1933.contexto.3.d` |
| `npm run formatos` | ✓ 48 casos |
| `npx astro check` | ✓ 0 errores, 0 avisos |
| `npm run build` | ✓ 48 páginas |
| `node scripts/audit-cifras.mjs` | ✓ Con `STRICT=1` solo fallan los 8 pendientes del investigador |
| `npx playwright test` | 242 ✓ · 3 ✗, las tres de `peso` (`/es/cortes/1931/` 257 KB, `/1933/` 233, `/explorador/` 358; con gzip, 43, 40 y 43 KB). `humo` comprueba ahora además que la marca salga una sola vez en el `<title>` |
| axe-core 4.13 (copia local) | ✓ **0 violaciones** en 22 páginas × pestaña Gráfico y pestaña Tabla × 1.440 y 360 px × dos temas (176 pasadas). Antes había `color-contrast` (80 nodos), `scrollable-region-focusable`, `landmark-unique` y `empty-table-header` |
| Recorrido funcional | Con el teclado, la marca activa ya no sale de la ventana: 0 de 40 pasos en F32, F29 y F17, y la nota no se cierra. En colores forzados, F01c y F01e dibujan barras y ausencias. En Método, los 11 `<pre>` se pueden enfocar. «Volver al índice» abre el índice plegado. La banda va fija a 1.440 y al final de la página a 375 |

Capturas: `docs/revision_fase2/capturas/pulido/`, 83 archivos. Son 18 vistas a 1.440 y 375 px en los dos temas, más
las de teclado, colores forzados, índice sin JS, F01c a 375 y «Volver al índice». Ninguna desborda y ninguna tiene
errores de consola.

## Hallazgo → decisión

### Experiencia

| # | pri | hallazgo | decisión |
|---|---|---|---|
| E1 | P1 | La portada no enseña los botones | **Aplicado.** La columna de texto arranca arriba (`align-items: start` y e7), el H1 va en 4 líneas (13,5 ch) y bajo los botones hay un asiento: «V2 · un CSV de 158,1 MB · CC BY 4.0 · Harvard Dataverse» (`inicio.portada.asiento`, marcador `dv.csv.bytes`). Los botones caen en y = 684–728 a 1.440×900 y en 655–699 a 1.280×800. **107.551 no se añade**, porque el copy lo veta en portada |
| E2 | P1 | El camino de descarga empuja al explorador | **Aplicado.** El primario oro de la portada es «Descargar los datos», que sigue yendo a `/datos/#empezar` (regla 6 del plan), y el explorador pasa a secundario con su icono. La escalera de Inicio cierra con ese primario (`Salidas` tiene la prop nueva `primario`). En Datos, «Descargar en Dataverse» ya está en la primera pantalla, con ↺ 3 encima, en la columna derecha de la cabecera. **La acción primaria la ratifica el investigador** |
| E3 | P2 | La primera pantalla de las páginas interiores es solo título | **Aplicado en parte.** El H1 pasa a 16 ch (tope de DESIGN.md) con `text-wrap: balance`, y el primer apartado baja de `--aire` a e7, tanto con índice como sin él; el índice se alinea. El primer H2 ya entra en la primera pantalla en Método, la ficha I y Las Cortes. La cabecera a dos columnas se hizo solo en Datos: en todas las plantillas sería rediseño, y queda para diseño |
| E4 | P2 | «Cómo leer el calendario» retrasa F01 | **Aplicado.** Deja de ser un H2 y pasa a ser la nota al margen de la entrada de F01, con sus cuatro muestras y la regla. El calendario sube unos 500 px. El H2 y la entrada siguen juntos (fila flexible) |
| E5 | P2 | La ficha abre con «Hoy puede» y repite la consulta | **Reordenar: rechazado.** La narrativa § 8.1 pone «Hoy puede» primero y manda sobre el plan; queda como pregunta al investigador. **La consulta repetida: aplicado**, en I y III: «Seguir una palabra» remite a la consulta de la primera tarea. «Copiar la consulta» pasa a secundario, como fija DESIGN.md para «Copiar», y así no hay dos primarios oro |
| E6 | P2 | La tabla de MD5 no se lee a 375 | **Aplicado.** Por debajo de 48 rem, cada archivo es una ficha clave-valor con el MD5 entero en una línea y roles ARIA explícitos. En escritorio sigue siendo tabla, con el MD5 sin partir |
| E7 | P2 | La marca se repite en el título | **Aplicado.** Se quita « · Luz y Taquígrafos» de 11 claves `*.meta.titulo`, `Base.astro` no la repite si el copy la trae, y `humo.spec` lo vigila |
| E8 | P2 | Los desplegables no parecen desplegables | **Aplicado.** Todos los `<summary>` llevan la marca del índice («+», y «–» abierto); F19 conserva su cheurón. El de Método ya no va subrayado y dice «Cómo se carga el CSV depositado: …» |
| E9 | P2 | La NotaBases de las puertas habla de «cifra» | **Aplicado el texto.** Hay una variante nueva, ↺ 13 bis (`comun.fija.notabases.ids`): «Los números v3 de estas citas son filas de la edición del explorador…». Queda al margen de la última cita con id v3 |
| E10 | P2 | En el móvil, las páginas largas no tienen índice | **Aplicado.** Por debajo de 64 rem, «Volver al índice» cierra cada apartado (componente nuevo `VolverIndice`) y abre el `<details>`. Por debajo de 48 rem, la banda de Método y Explorador deja de ir fija y queda al final, con sus avisos |
| E11 | P2 | F01 baja de 12 px a 375 | **Aplicado.** Todo el texto de F01 va a 0,75 rem o más, los meses se rotulan I · IV · VII · X y la leyenda gana ancho |
| E12 | P3 | Frases de teclado y de tacto siempre a la vista | **Aplicado.** La del teclado sale solo con el foco dentro y en la pestaña Gráfico; la táctil, solo con puntero grueso |
| E13 | P3 | Migas incoherentes | **Aplicado.** Las fichas llevan «Las Cortes / I» en caja normal y enlazado, como las puertas, porque la prop de la página manda en `CabezaPagina` |
| E14 | P3 | El título de F30 repite el H2 | **Aplicado.** `fig.F30.titulo`: «Las filas de la sesión: quien habla, encima; la Presidencia, debajo» |
| E15 | P3 | Las chapas de base | **Pendiente de diseño.** Es un cambio del sistema de figuras (`Sello` y `FiguraMarco`), no un pulido |
| E16 | P3 | «→» en «Por qué hay dos» | **Falso.** Es el icono dibujado `i-flecha` del sprite (`conIcono`), no el carácter |
| E17 | P3 | La escalera se lee como un error | **Aplicado en parte.** El H2 de Inicio tiene entrada («Elija por lo que ya sabe hacer.») y la escalera cierra con el primario. El filete en escalón queda para diseño |
| E18 | P3 | F01 anima `height` | **Rechazado.** Solo anima al conmutar la medida y solo con `no-preference`, con un INP medido de 32–120 ms. Con `scaleY` se deformarían el contorno de la marca activa y el anillo de puerta |
| E19 | P3 | EN promete una lengua que no está | **Aplicado en parte.** Mientras no exista `en.json`, `/en/` lleva `noindex` y sale del sitemap. El conmutador se queda: la fase inglesa es la siguiente y el texto prestado va marcado |
| E20 | P3 | El índice marca dos apartados | **Aplicado.** `view-timeline-inset: 40% 59%` hace que sin JS se marque uno solo, igual que el IntersectionObserver de la isla |

### Técnica

| # | pri | hallazgo | decisión |
|---|---|---|---|
| T1 | P0 | La Tabla de F27 y F28 hereda los glifos | **Aplicado.** Los selectores se acotan a `.cr-glifo` y `.cr-marca`, también los de colores forzados. axe da 0 `color-contrast` con las pestañas Tabla abiertas y las filas ya no giran |
| T2 | P1 | Los `<pre>` de Método no se enfocan | **Aplicado en el origen.** `tBloques` emite `<pre tabindex="0">` en todo el sitio |
| T3 | P2 | Con el teclado, la marca sale de la vista | **Aplicado.** `muestra()` trae la marca con `scrollIntoView({block: 'nearest'})`, el `scroll` que eso provoca no cierra la nota durante 200 ms y `[data-paso]` lleva `scroll-margin-block: 5.5rem` |
| T4 | P2 | F01 se vacía en colores forzados | **Aplicado.** Barras, celdas y muestras usan `forced-color-adjust: none` con su rampa, y la ausencia pasa a contorno `CanvasText`. Lo mismo en las muestras de Las Cortes |
| T5 | P2 | Títulos duplicados | **Aplicado** (es E7) |
| T6 | P2 | `peso.spec` bloquea `publicar` | **Rechazado: decide el investigador.** El plan (§ amontonamiento, regla 6) dice «el peso mide solo el HTML sin comprimir», y cambiar la métrica para ponerla en verde sería saltarse la regla. Los datos para decidir están en `peticiones/integrador.md` § 2.1 y en la tabla de puertas |
| T7 | P2 | La sección y su figura comparten id | **Aplicado.** Se renombran las secciones: `turno-a-turno`, `en-voz-alta`, `muestra`, `enfocar`, `cruzar` y `tres-redes`. `#votaciones`, `#turnos` y `#<id>-tabla` siguen llevando a la figura. `dist/es` no tiene ningún id repetido |
| T8 | P2 | 1.4.12 recorta F12 y F01e | **Pasa a su dueño** (`peticiones/pulidor.md`). Los pies van en absoluto sobre anchos calculados y dejarlos partir obliga a rehacer esa maqueta. El dato está en la Tabla |
| T9 | P3 | `landmark-unique` en las notas de fila | **Aplicado.** La nota de fila es `role="note"` con el primer asiento en su nombre. También se renombran las regiones que repetían nombre con las pestañas Tabla abiertas: F05/F09, F27/F28, Versiones y Afinidades |
| T10 | P3 | 11 marcas de F28 sin teclado | **Falso.** Son las mismas sesiones de la primavera de 1936 repetidas en la lupa, que va `aria-hidden`, y en la línea principal sí se recorren. La Tabla, que ya se lee, las trae todas |
| T11 | P3 | Contraste de `g-trad`, `g-pce` y `--bg-3` | **Rechazado.** Es la paleta del hemiciclo (`hero_vars.css`), que no se retoca (DESIGN.md), y la leyenda nombra cada minoría. Ningún texto usa `--mute` ni `--accent` sobre `--bg-3` (axe 0) |
| T12 | P3 | La animación de `height` | Es E18 |
| T13 | P3 | La frase del teclado en Tabla y Datos | **Aplicado** (es E12) |
| T14 | P3 | `/en/` en el sitemap | **Aplicado** (es E19) |

### Datos

| # | pri | hallazgo | decisión |
|---|---|---|---|
| D1 | P1 | F30 con dos escalas | **Aplicado.** Arriba y abajo comparten una sola escala porque se quita el piso de 12 unidades (`viz/geom/turnos.ts`). En la cuestión religiosa, las filas de la Presidencia pasan de ×2,4 a su alto real y en Figueres de ×3,2. Las demás puertas no cambian |
| D2 | P2 | F09 no dice su denominador | **Aplicado.** Lo dicen la pregunta («…sin contar a la Presidencia») y las cuatro cabeceras de la tabla, que ahora se parten en dos líneas |
| D3 | P2 | El eje de F10 dice «se duplican» | **Aplicado:** «en tramos cada vez más anchos» |
| D4 | P2 | Cinco figuras sin pestañas | **Rechazado.** El plan las define así: F26 «ligera» y «mínima», secundarias, con enlace a la F26 completa, que sí tiene pestañas y CSV; F18 «tabla con nota»; F19 «pasos desplegables». Si el investigador lo prefiere, se les quita el número F |
| D5 | P3 | «0,000 %» | **Aplicado.** `porcentaje()` escribe «<0,001 %» si la cuota no es cero |
| D6 | P3 | Rótulo de Campoamor en el explorador | **Aplicado:** el rótulo desarrollado y, aparte, el literal («La Srta. CAMPOAMOR:») |
| D7 | P3 | Ejemplo de Besteiro en la nota de Alba (F07) | **Aplicado:** «…por ejemplo, la fila 5423, de Besteiro» |
| D8 | P3 | BibTeX y RIS con el título alternativo | **Aplicado.** Llevan el título principal de Dataverse, el mismo de la cita |
| D9 | P3 | Base de F01c y F18 en su cabecera; columna de diputados de F01c | **Pasa a sus dueños** (comun-inicio, datos) |
| D10 | P3 | Salvedad de F16 (586) | **Aplicado:** dos frases, cada una con su base |
| D11 | P3 | 706 claves sin procedencia | **Pasa al exportador** |
| D12 | P3 | Suelo de alto en F17 | **Aplicado:** «…las sesiones con pocas entradas llevan una altura mínima» |
| D13 | P3 | `/en/` indexable | **Aplicado** (es E19) |

## Archivos tocados

- **Andamiaje:** `layouts/Base.astro`, `components/{Seccion,IndiceLateral,CabezaPagina,NotaBases,BandaCTA,FiguraMarco,Salidas}.astro`, `components/VolverIndice.astro` (nuevo), `lib/{i18n,formato,piezas,margen,cita}.ts`, `scripts/figuras.ts`, `styles/{base,figuras}.css`, `astro.config.mjs` y `tests/humo.spec.ts`.
- **Figuras y páginas:** `FigCronologia`, `FigCalendario`, `FigFamilias`, `FigOradores` y `FigDespiece` (`.astro`), `viz/geom/turnos.ts`, y las páginas `[lang]/{index,metodo,explorador,afinidades}.astro`, `[lang]/datos/{index,versiones}.astro` y `[lang]/cortes/{index,[etapa]}.astro`, además de `cortes/sesiones/{index,[puerta]}.astro`.
- **Copy:** en `docs/copy_es/` se tocaron `comun`, `inicio`, `cortes` y las cinco fichas `cortes_*`, además de `sesiones`, `metodo`, `datos`, `explorador`, `afinidades` y `versiones`. `src/i18n/es.json` sale de ellos. Claves nuevas: `inicio.portada.asiento`, `inicio.empezar.entrada`, `comun.fija.notabases.ids` y `comun.indice.volver`. Quitadas: `cortes.{1931,1936}.hoy.tendencia.consulta`.

No se tocó el exportador (se ejecutó en modo estricto) ni nada fuera de `luz_site/`.
