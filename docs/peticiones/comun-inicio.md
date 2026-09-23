# Peticiones del grupo «comun e inicio» (copy de comun, Inicio, raíz y 404) · 22-09-2026

Quien escribe: el dueño de `docs/copy_es/comun.md`, `docs/copy_es/inicio.md`, `docs/marcadores/comun.md` e
`inicio.md`. No he tocado ningún archivo de otro dueño. Cada petición dice a quién va, qué cambia y por qué.

## A · Andamiaje (plantillas, componentes, `lib/`, auditorías)

1. **Nombres de las frases fijas en las plantillas: resuelto.** Las plantillas ya usan `comun.fija.diario` (↺ 1),
   `comun.fija.ids` (↺ 4) y `comun.fija.enlace` (↺ 5), como el copy de todos los grupos.
2. **Inicio (`src/pages/[lang]/index.astro`).** La plantilla ya pinta todas las claves de `inicio.md` (comprobado a
   las 19:30 con Playwright: ninguna ⟦inicio.*⟧ ni ⟦comun.*⟧ pendiente, sin desbordes a 375 px, sin errores de
   consola, en los dos temas). Quedan tres mejoras de forma:
   - **La fila, en tipografía.** `inicio.fila.presidencia` y `.campoamor` salen hoy como párrafos pequeños: la
     narrativa pide la Presidencia en pequeño y Campoamor en cursiva grande, cada una con su pie en mono.
   - **Las cuatro cajas** (`inicio.falta.tema|tono|posicion|voto`) salen como párrafos: van en cajas vacías de
     filete discontinuo, con el nombre en negrita como rótulo en mono.
   - **Títulos de la escalera.** `Salidas` toma como título la negrita entera, con su punto («Sin programar.»): que
     quite el punto final del título.
   - `inicio.tesis.tabla` pasó a `inicio.tesis.resolucion`: el pintor genérico se salta el segmento `tabla`.
3. **↺ 11 y ↺ 13 van sin corchetes**, tal cual el plan y como las repiten todos los grupos. `NotaBases` convierte el
   final de ↺ 13, «Por qué hay dos →», en el enlace a `/{lang}/datos/versiones/`; donde se pinte ↺ 11, «aquí» lleva a
   la misma página.
4. **Auditoría (`audit-cifras.mjs`).** Un id de fila v3 con formato `id` junto a su par V2 (el doble id de una cita) no
   debería obligar a pintar `NotaBases`: Inicio lleva los de la tesis y la fila, y ↺ 4 en su último movimiento.
5. **`edicion_pagina`.** `resuelve()` lo devuelve como texto plano, sin envoltorio: la auditoría de dígitos lo verá sin
   procedencia en el pie. Envolverlo o eximirlo.
6. **Variables que se llaman como una cifra.** `fig.F01.nota.mes` y `fig.F01.alt` usan `{{sesiones}}`, que también es
   una cifra de `cifras.json` (755). `resuelve()` mira antes `ctx.vars`; si un componente no pasa la variable, se
   pinta 755 sin aviso. Conviene que `resuelve()` falle si una clave de plantilla coincide con una cifra y no llega
   en `vars`, o renombrar las variables (en `inicio.f01c.nota.etapa` ya se llama `{{n}}`).
7. **404.** `404.astro` no pinta aún `comun.404.errata` («Si llegó aquí desde un enlace de este mismo sitio,
   avísenos: [Avisar de una errata]»), cuyo destino es `ENLACES.erratas`.
8. **Raíz.** El descriptor inglés sale de `en.json`, que aún no existe: mientras falte, que la raíz no pinte la versión
   española marcada «sin traducir» bajo [English].
9. **`comun.hemiciclo.rotulo` no se define, a propósito:** la portada no lleva antetítulo sobre la figura.
10. **`Cita`: los bloques BibTeX y RIS** (`<pre><code>`) miden más que la pantalla a 375 px (1.108 y 718 px); no
    desbordan la página, pero conviene `overflow-x: auto` o `white-space: pre-wrap` en su contenedor.
11. **`[Unir con THQCMI]`** (`comun.boton.unir`, plan § Afinidades) no está en `destinoBoton()` de `lib/lectura.ts`:
    su destino es `/{lang}/datos/#unir`.
12. **Hemiciclo en la portada.** En la captura de hoy (1.440 px, tema oscuro) se ven solo tres escaños de color; los
    demás no se pintan. Puede ser la carga de las variables `--g-*` del tema.
13. **Claves nuevas de `comun.md` que ya piden los componentes:** `comun.fig.teclado` (antes `comun.isla.teclado`),
    `comun.leame.que_mide|denominador|salvedad|base|cita`, `comun.enlace.ampliar`, `comun.pruebelo`,
    `comun.vecinas.cortes|sesiones` y `comun.boton.unir`. Las claves `comun.escalera.*` y `comun.registro.filas` ya no
    existen: Inicio y Datos escriben cada uno su escalera y su registro.

## B · Exportador (`base.py`, `sesiones.py`)

1. **Claves que usa el copy de comun e Inicio y aún no están en `cifras.json`:**
   - `fila.luz.id.V2|id.v3|nwords`, `fila.presidencia.id.V2|id.v3|nwords`, `fila.campoamor.id.V2|id.v3|nwords`;
   - `voto.n`, `voto.161-121.si|no` (y el resto de `voto.*`, si `sesiones.py` las exporta);
   - `puerta.mexico-1945.filas` (183) y `puerta.mexico-1945.sesiones` (4). Las ocho `sesion.<fecha>-<num>.filas` ya
     están, con su valor.
2. **Los nombres que ya exporta `base.py`** (comprobado en `src/data/cifras.json` a las 19:18) son los que usa el
   copy: `sesiones`, `sesion.primera|ultima`, `sesiones.tras_18jul`, `palabras.tras_18jul.pct`, `meses.salto`,
   `meses.con_sesion`, `dv.version`, `dv.cgocus.version`, `dv.csv.bytes`, `explorador.gz.bytes`, `dv.thqcmi.autores`,
   `dv.thqcmi.cita` y `dv.cgocus.cita`; todos con el valor esperado. `marcadores/base.md` usa otros nombres para cuatro de
   ellas (`sesiones.primera|ultima`, `desde_guerra.*`): conviene poner el `.md` al día.
3. `docs/marcadores/comprobar_comun_inicio.py` recalcula todas estas cifras sobre las fuentes, con sus huellas
   (93 de 93 correctas hoy): puede servir de prueba del módulo.

## C · Sesiones (copy y F26)

1. **Ids de F26, comprobados hoy.** La lista de la Constitución está en la V2 13525 (v3 15037); el resultado, en
   13531 (15043). Reforma agraria: lista V2 37177 · v3 41627; resultado con la mitad más uno, V2 37178 · v3 41628.
   Estatuto: V2 37178 · v3 41629. La mitad más uno del 7-IV-1936 (209 de 417) está en la V2 102359 · v3 115676.
2. **La destitución sale del corpus.** Para el rótulo del 238–5, además de la proposición (V2 102304, «para los fines
   del último párrafo del artículo 81»), el Diario dice que el Presidente de las Cortes «pasa a ser Presidente de la
   República» (V2 102368). Inicio usa vuestro rótulo, en corto.
3. **`sesiones_pistola-1934.md` rompe `copy2i18n`:** formato desconocido `|fecha` en
   `{{puerta.pistola-1934.siguiente|fecha}}` (valen `fecha_larga` o `fecha_corta`).

## D · Versiones y Afinidades (copy)

1. **Sello.** Repetís ↺ 2 como `comun.fija.sello.v2|v3|proyecto|afin`; la frase fija se llama
   `comun.sello.V2|v3|proyecto|afin`, que es lo que leen `Sello.astro` y `lib/cita.ts` (`comun.sello.<base>`).
   `copy2i18n` avisa de que esas claves no se definen en ningún sitio.

## E · Cortes (copy y F01)

1. **Nombres de etapa compartidos:** `comun.etapa.<I…V>.nombre|corto|anos`. El H1 de cada ficha debería coincidir
   con `nombre`.
2. **`{{sesiones}}` como variable** en `fig.F01.nota.mes` y `fig.F01.alt`: véase A.6.

## F · Explorador (copy)

1. **Un peso, dos claves.** `explorador.md` usa `{{explorador.gz.mb}}`; `base.md` e Inicio, `{{explorador.gz.bytes|peso0}}`
   («107 MB»). Mejor una sola.

## G · Inglés (quien escriba `docs/copy_en/`)

1. La raíz y el 404 son bilingües desde ya: necesitan en `en.json` `comun.cabecera.nombre|descriptor`,
   `comun.idioma.es|en`, `comun.raiz.*` y `comun.404.*`.
