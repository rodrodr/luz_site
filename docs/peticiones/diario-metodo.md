# Peticiones del grupo 4 · El Diario y Método (fase 2, 23-09-2026)

Dueño: El Diario (`/diario/`) y Método (`/metodo/`): plantillas `src/pages/[lang]/diario.astro` y `metodo.astro`,
figuras `FigCronologia` (F27, F28), `FigPasos` (F19), `FigFila` (F20), `FigLongitud` (F10/F11), `FigDespiece` (F12), el
momento `DiarioAFila`, la geometría `src/viz/geom/cronologia.ts` y `longitud.ts`, los módulos
`exportador/modulos/diario.py` y `metodo.py`, el copy `docs/copy_es/diario.md` y `metodo.md` y los marcadores
`docs/marcadores/diario.md`. No he tocado nada fuera de eso; lo que sigue son peticiones a su dueño.

## 1. El momento «Del Diario impreso a la fila»: por qué no va el prototipo P2 (three.js)

Sustituido por la versión nativa ligera, `src/components/DiarioAFila.astro`, en El Diario § 1. Motivos, contra las
condiciones de DESIGN.md § Movimiento:

| condición | P2 (three.js r186) | versión nativa |
|---|---|---|
| sin maqueta falsa del Diario | **no la cumple**: la página es una maqueta tipográfica (bloques por renglones) | cumple: el escaneo real del núm. 48, p. 1353 (PDF del proyecto, sha256 `ac506387…`), sin retocar; la tinta pasa a canal alfa y se pinta con el color de tinta de cada tema |
| peso medido | ≈194 KB gz de JS en una página de lectura (tope del tipo: 50 KB) | 0 KB de JS; 44 KB de WebP (852 × 606) |
| datos reales | la fila de Gil Robles del 16-VI-1936, sin relación con el resto de la página | las filas V2 5423 y 5424 (v3 6078 y 6079), las mismas que F20 y que la cita de § 6 |
| degradación | lienzo `aria-hidden` y tabla aparte; en el móvil la tabla desbordaba | sin JS, sin `animation-timeline` o con movimiento reducido, la pieza está en su estado final desde el principio; la tabla de las dos filas es HTML real |
| composición final digna | nube de puntos que se asienta en una fila de texto | el papel anotado al margen (rótulo, interrupción, acotación, página), que es el Norte del sitio |

Movimiento: solo con `prefers-reduced-motion: no-preference` y `@supports (animation-timeline: view())`; las cajas se
trazan sobre el papel y las filas llegan al pasar por la pantalla (una línea de tiempo con nombre, `--daf`). Pasar el
puntero o el foco por una fila ilumina en el papel su rótulo y su texto (`:has()`). Cada caja sale de la capa de texto
del PDF y el exportador comprueba lo que dice dentro (`diario.py › FACSIMIL_CAJAS`).

Va en El Diario § 1 y no en Método 02, como decía el brief de superficie: § 1 es donde el copy dice «De ella sale cada
fila de la base», y las dos filas del facsímil son las de F20 (Método 01). Método conserva su figura de pasos (F19).

## 2. Al investigador

1. **Derechos del escaneo.** El facsímil es un detalle del PDF del archivo histórico del Congreso que tiene el proyecto
   (`2REP_Base/PDF/D_D_1931_1933_C-0048-01347.pdf`, sin depositar). El Diario de 1931 es una publicación oficial, pero
   conviene confirmar la atribución que pide el archivo del Congreso para su digitalización antes de publicar. El pie
   dice hoy «El escaneo del proyecto, sin retocar».
2. **D-22.** La fila de tres palabras (V2 71330) se rotula en F27 como la imprime el Diario («JIMÉNEZ FERNÁNDEZ», en
   versalitas); la base la une a Manuel Giménez Fernández (rep_id 456). La nota emergente dice «“El Sr. JIMÉNEZ
   FERNÁNDEZ”, según el Diario» (`fig.F27.orador.atribuido`).

## 3. Al andamiaje (integrador)

1. **`FiguraMarco`: una prop para no pintar la frase del teclado.** F19 no tiene marcas que recorrer (se abre cada paso
   con Tab e Intro) y la frase «← y → recorren sus marcas» no es verdad ahí. Hoy la oculto desde `FigPasos` con
   `:global(#pasos .fig-teclado) { display: none }`; con la prop, esa regla sobra.
2. **`IndiceLateral`: envolver el rótulo en un `<span>`.** El enlace es una rejilla de dos columnas (número · rótulo); un
   rótulo con marcado dentro (una cifra `<data>` de un título con marcador) parte el texto en celdas y la cifra cae bajo
   el número. En El Diario lo he evitado con `diario.indice.luz`, pero pasará en cualquier título con cifra.
3. **Minificador y `animation-timeline`.** Al compilar, `animation: x linear both` y `animation-timeline: view()` en la
   MISMA regla se funden en el atajo (`animation: linear both x view()`), y Chrome descarta el atajo con línea de tiempo:
   la animación no corre. Hay que declarar `animation-timeline` en una regla aparte (lo hace `DiarioAFila`). Conviene
   revisar `styles/movimiento.css` y el calendario.
4. **Enlaces dentro de la prosa.** `diario.calla.galarza` («la cuenta la puerta «La antesala»») debería enlazar a
   `/cortes/sesiones/antesala-1936/` sin corchetes (nota de diseño del copy); el pintor genérico no lo permite. Un
   formato de enlace en línea del copy (o `destinos` para párrafos) lo resolvería.
5. **Compilaciones a la vez.** Dos `astro build` simultáneos en el mismo proyecto chocan en `.astro/.prerender/` (un
   `InvalidImageService … sharp_*.mjs` que no es de nadie). Mientras trabajen varios dueños, que cada uno compile con
   `npx astro build --outDir <dir propio>` y que `npm run build` lo corra uno solo.

## 4. Al exportador (dueño de `exportar.py`)

1. **Cifras compartidas.** `diario.py` y `metodo.py` no repiten las cifras que ya dio un módulo anterior: leen el
   diccionario `C` de `exportar.py › main` subiendo por la pila (`diario.py › _ya_dadas`; `datos.py` hace lo mismo con su
   `_dadas`). Funciona, pero es frágil: pido que `Contexto` exponga las cifras ya dadas (`ctx.dadas`) y que los tres
   módulos lo usen.
2. **Imágenes en `src/data/`.** El facsímil se escribe con `ctx.copiar_a_data()` en `src/data/facsimil/` y lo importa
   `DiarioAFila` (Astro lo sirve con su huella). Si el exportador prefiere otra carpeta para binarios, que la diga.

## 5. Cifras que da este grupo

- `diario.py`: `f27.*`, `f28.*`, `fuente.*` (con `fuente.facsimil.pagina`, nueva) y los ids de las citas de El Diario
  (`cita.diario.*`, `cita.f27.*`, `cita.f28.*`, más `cita.figueres.fotocopia.*`, `cita.mexico.permanente.v3` y
  `cita.sufragio.campoamor.ciudadana.V2` si sesiones.py no las ha dado ya). Archivos: `diario.json` (F27, F28 y el
  facsímil), `facsimil/diario_1931-10-01_p1353.webp`, `luz_y_taquigrafos.csv|xlsx`, `no_constara.csv|xlsx`.
- `metodo.py`: `fila.*`, `longitud.*`, `ocr.*`, `etiquetas.*`, `vinculo.*`, `ideologia.ceda.*`, `familias.liberal.filas`,
  `filas.sin_diputado.ministerio`, `diputados.comparten_apellido`, `v3.comentarios.en_presidencia`,
  `v3.turnos.en_presidencia`, `fila.lista.nwords` y las de la cola de la sesión 48 si sesiones.py no las dio. Archivos:
  `fila_ejemplo.json|csv`, `longitud.json|csv`, `despiece.json`, `fila_larga.csv`, `pasos.csv`, `cola48.json`.
- Las de Datos y Versiones que usa Método (`fechas.*`, `familias.V2|v3`, `ideologia.partidos_varios`, `v3.turnos`) las
  da `datos.py`; las votaciones (`voto.161-121.*`), `sesiones.py`.
