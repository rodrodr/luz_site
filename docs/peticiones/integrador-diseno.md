# Integrador de diseño · fase 2 (22-09-2026)

Dueño en esta fase del andamiaje: `src/styles/`, `src/layouts/Base.astro`, los componentes genéricos, `src/lib/`,
`src/scripts/figuras.ts` (la isla), `src/scripts/movimiento.ts`, `scripts/` (salvo el exportador) y `tests/`.
Norma: `DESIGN.md`. Catálogo vivo del sistema: **`/es/componentes/`** (`src/pages/[lang]/componentes.astro`; no se
publica, no entra en el mapa del sitio y con `STRICT=1` no se genera). Ábralo antes de maquetar su página.

## 1. Qué está hecho (lo que pueden usar ya)

| pieza | qué cambia para ustedes |
|---|---|
| `peticiones/diseno.md` | Aplicada entera (tokens, `base.css`, `Base.astro`, componentes, isla, pruebas). Diferencias a propósito, en § 4 |
| `FiguraMarco` | La **barra** lleva el código en mono y el título a la izquierda y las pestañas a la derecha; la pregunta va debajo, común a los tres paneles. Props nuevas: `plantillaT` (línea «qué», garamond 600) y `plantillaB` (base y fuente). La frase del teclado sale de `comun.fig.teclado` |
| `Pestanas` | Ranuras nuevas `cabeza` (en la barra) y `pregunta` (bajo la barra). `barra` (la conmutación) va en su propia línea |
| Isla `scripts/figuras.ts` | Nota emergente WCAG 1.4.13 completa: se recorre con el puntero (150 ms de gracia), no caduca, Esc la descarta sin mover foco ni puntero; abierta con el dedo trae [Cerrar la nota] (`comun.isla.cerrar`, que el marco pasa en `data-cerrar`) y se cierra al tocar fuera. Probada en `tests/nota.spec.ts` |
| `Boton.astro` *(nuevo)* | `variante` (`primario` · `sec`), `externo` (icono `i-ext`, otra pestaña y su aviso), `copiar` (nace oculto; «Copiada» 1,6 s), `descarga` (`i-bajar`) |
| `CitaDiario` | La comilla cuelga **dentro** de su caja (`--cuelga`): ya no invade el margen de la página ni la calle del índice. Si la cita trae sus «», no se añaden las de `<q>` (salían dobles) |
| Pintor genérico (`lib/lectura.ts`) | Las claves `….cita.<nombre>` se pintan como **pasaje** (cursiva de libro, comilla colgada contenida) y su `.pie` sube al margen. `[Unir con THQCMI]` → `datos/#unir`. ↺ 13 enlaza «Por qué hay dos →» (flecha dibujada) y ↺ 11 enlaza «aquí» |
| `Seccion` | Con `tambien`, el título compartido ya no sale dos veces («Debates preparados en el explorador», cortes_b § 7.1). El antetítulo es un `.asiento` |
| `Salidas` | El título del peldaño va sin el punto de la negrita |
| `Registro` | En el móvil el recuento parte su línea (México medía 492 px a 375). Cada línea lleva `data-transicion`: su título crece hasta el H1 de destino |
| `ficha/Vecinas` | Flechas dibujadas (no ← →); un espacio separa la vecina del índice («México 1945Ver…», P3-13); la página nueva entra por su lado |
| `IndiceLateral` | Subapartados H3 sin número: `entradas: [{ id, rotulo, sub: [{ id, rotulo }] }]` |
| `Captura` | Lee `comun.enlace.ampliar` (la clave `comun.captura.ampliar` no existe) |
| `Base.astro` | `movimiento.css` enlazado; transiciones entre documentos (`@view-transition`, tipos `adelante`/`atras` por `rel`, ES ↔ EN sin animar, foco al H1 de destino); prop `noindex`; el pie ya no separa «ParlaIbero» de su «, proyecto hermano y distinto» |
| `scripts/movimiento.ts` *(nuevo)* | `alVer()` y `.escalona[data-escalona]` (los hijos llegan en orden al verse; quietos si ya se veían o con menos movimiento) |
| `lib/cifras.ts` | Lo que da el investigador (edición, contacto) lleva envoltorio `data-k` + `data-base="proyecto"`. Aviso si una plantilla pasa `vars` y un hueco de una palabra se resolvería con la cifra homónima (comun-inicio A.6) |
| `copy2i18n.py` | ↺ 10 con la redacción nueva («El censo y las relaciones de Afinidades Elegidas llaman 1933-1936…») |
| `[Escribirnos]` | `mailto:rodrodr@usal.es` (`config/enlaces.ts › PENDIENTES_DEL_INVESTIGADOR.contacto`) |
| Pruebas | `humo` a 360 y 375 px en los **dos** temas (y el catálogo); `nota.spec` (1.4.13, teclado, táctil, pestañas ↔ hash); `movimiento` también en el catálogo |

Utilidades de CSS nuevas: `.cuelga` (comilla colgada contenida), `.pasaje`, `.icono.atras`. La banda de la tesis tiene
en `base.css` su selección invertida y el **límite de su comilla colgada**: desde 64 rem cuelga en el margen de la página
pero nunca más allá de él (a 1.024 px tocaba el borde de la ventana).

## 2. Peticiones a otros dueños

### A la plantilla de Inicio (`src/pages/[lang]/index.astro`)
1. Quitar de su `<style>` la regla `@media (min-width: 64rem) { .grito p { text-indent: -.36em; } }`: la sustituye la de
   `base.css › .tesis .rejilla blockquote.grito.cita-diario > p`, que limita el cuelgue al margen disponible (hoy manda
   la de `base.css` porque es más específica: (0,4,2) frente a (0,4,1)). Con la suya retirada, la de `base.css` puede
   bajar a `.tesis .grito > p`.
2. Lo pendiente de `comun-inicio.md` § A.2 (la fila en tipografía con `CitaDiario`, las cuatro cajas con filete
   discontinuo) es de la plantilla: el componente ya está; véalo en el catálogo, § Citas.
3. 404 y raíz (`comun-inicio.md` A.7 y A.8) siguen abiertos: son plantillas de este grupo.

### A Método (`src/pages/[lang]/metodo.astro`)
4. `.rotulo-mitad` se pinta a 10,56 px: por debajo del suelo de 12 px (`--fs-mono-s`, DESIGN.md § Dato).
5. Usa `<p class="kicker">` para «Pruébelo»: `.kicker` es alias de `.asiento` y se retirará; cambie a `asiento`.

### A Datos y Versiones (`datos/index.astro`, `datos/versiones.astro`)
6. REVISION_FASE1 P1-5 sigue abierto: la plantilla de Versiones y `versiones.md` no casan (`versiones.cambia.*`,
   `fig.F35.col.*` frente a `versiones.donde.*`, `versiones.resultado.*`). Es un solo juego de claves que acuerdan la
   plantilla y el copy; el andamiaje no lo toca.

### Al copy (`comun.md` § 3, un rótulo por destino; REVISION_FASE1 P2-12)
7. Mientras no tengan fila, estos corchetes reciben destino por su rótulo (`lib/lectura.ts › PROVISIONALES`): denles
   clave con estos nombres y la tabla provisional sobra: `comun.boton.ver_citar` (datos/#citar),
   `.ver_citar_ediciones` (datos/versiones/#citar), `.ver_procedencia` (datos/procedencia.csv), `.ver_calendario`
   (página de F01), `.ver_palabras` (de F33), `.ver_destino_filas` (de F18), `.ver_fechas` (de F25),
   `.ver_quien_habla` (de F07), `.ver_auditoria_fechas` (metodo/#m07).
8. Unificar los duplicados: [Ver cómo citar] y [Ver cómo citar cada edición] (¿mismo destino?); [Ver qué significa cada
   columna] duplica [Ver qué trae cada columna]; [Ver las figuras de Las Cortes] y [Ver el calendario completo] van al
   mismo sitio.
9. `check-i18n` aún puede fallar por números tecleados que son del copy (REVISION_FASE1 P2-9): se corrigen en el copy
   o con la Lista blanca de `docs/marcadores/<grupo>.md`, no en la puerta.

### A los dueños de figuras
10. Envuelvan su figura en `FiguraMarco`; pasen `plantillaT`/`plantilla`/`plantillaB`; marcas con `data-nota` y
    `data-v-*`; grupo recorrible con `data-recorre` + `tabindex="0"` y pasos `data-paso`. Una marca que lleva a una
    página es un `<a tabindex="-1">` (el teclado entra por el grupo; la tabla lleva los enlaces). Ejemplo completo en
    el catálogo, § Sistema de figuras.
11. Un momento de movimiento por página como mucho (`.entra` una vez; el calendario con `data-entra-fig`).

## 3. Al investigador
12. Confirmar `rodrodr@usal.es` como vía de [Escribirnos] (ya cableado; si prefiere otra, se cambia en
    `config/enlaces.ts`).

## 4. Diferencias a propósito con `peticiones/diseno.md`
- La comilla de `CitaDiario` cuelga dentro de su caja y no fuera (lo pedía esta fase): el orador y el asiento se
  alinean con las letras, y la comilla con el borde de la columna.
- `Cabecera`, `Pie` y `BandaTesis` siguen en `Base.astro` e Inicio, no en archivos propios. El pie no lleva títulos de
  columna (`pie-t`): el copy no los tiene.
- El contraste lo mide `scripts/tokens.mjs` en cada compilación (y el catálogo lo enseña) en lugar de un
  `contraste.spec`.
- La nota abierta con el dedo deja de estar `aria-hidden` y trae su botón de cierre; con puntero o teclado sigue
  oculta al lector de pantalla, que la oye por la región viva.
