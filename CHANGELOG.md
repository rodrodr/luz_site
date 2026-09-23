# Cambios · Luz y Taquígrafos (sitio)

## 2026-09-23 · rediseño de Inicio: una infraestructura que se juega

**Huella del copy:** `src/i18n/es.json`, SHA-256 `162c9aa22b398bd716ca528841b998b3619005eb587b9efa7aff42815d785582` (2.453 claves). Cambia `docs/copy_es/inicio.md` (y su borrador
inglés); el resto del copy, igual que en el congelado de abajo.

El investigador pidió una landing que presente la infraestructura, no un apéndice metodológico: menos texto, ninguna
comparación de ediciones y gráficos interactivos que se manipulan y se juegan. Propuesta y decisiones:
`docs/REDISENO_23-09.md` (decisiones 1–5 del § 8: landing y seis páginas · cifras redondas · «Pruebe una palabra» ·
fichas de etapa en una página · el grito con tilde y sin la nota del OCR). La versión anterior queda en la etiqueta
`v0.1-antes-del-rediseno` (commit `240b401`).

- **Inicio, en siete bloques:** portada (hemiciclo, sin cambios; la leyenda se pliega en sus cuatro bloques) · la banda
  «Luz y taquígrafos.» · «Más que una base de datos» (las seis piezas) · juego 1, **«¿Cuándo se habló de…?»**
  (laboratorio de palabras con su calendario y los ocho momentos) · juego 2, **«¿Cuántos votaron sí?»** (seis votaciones
  nominales para apostar) · juego 3, **la red de las firmas** (F21 en escaparate) · «Empiece hoy».
- **Menos y más ligero:** 447 palabras de copy (tope nuevo en `tests/rutas.ts`: 450; antes, 700) y unas 8 pantallas a
  1.440 px (antes, 11). Ni «V2» ni «v3» fuera de la cita oficial (prueba nueva, `tests/rediseno.spec.ts`).
- **Datos nuevos:** `exportador/modulos/laboratorio.py` → `public/datos/laboratorio.json` (3.405 términos × 64 meses,
  recontados sobre el índice FTS5 del explorador y comprobados contra él: tokens por intervención, `fts5vocab` y `MATCH`).
  Se ejecuta con el exportador o suelto (`python3 exportador/modulos/laboratorio.py --db …`). El JSON se pide cuando la
  sección se acerca a la pantalla.
- **Formato nuevo `|redondo`** («más de…»): hacia abajo a una cifra significativa, para que valga en las dos ediciones
  (`src/lib/formato.ts` y `exportador/formatos.py`, con siete pruebas nuevas en `formatos.json`). «Más de 20 millones de
  palabras», no «24 millones», que sigue vetado.
- **Componentes:** `components/inicio/Laboratorio.astro` + `scripts/laboratorio.ts`, `components/inicio/Apuesta.astro` +
  `scripts/apuesta.ts`, geometría `viz/geom/laboratorio.ts`; `FiguraMarco` y `FigRed` aceptan `escaparate`.
- **Reglas:** `PRODUCT.md` (principios 2 y 4 revisados, 6 nuevo) y `DESIGN.md` (cabecera del rediseño).
- **Otras páginas:** conservan las claves `inicio.{puertas,f26,f01c,falta,fila}.*` que leen; la de componentes lee el
  grito en `inicio.nombre.grito`. Lista blanca: «type 77» del borrador inglés de Método.

Verificado: `npm run check` (astro check 0 errores, check-i18n, formatos) · build (48 páginas) · `npm run audit` ·
Playwright 250/250 (las 245 de antes y 5 nuevas) · Inicio en STRICT: 447 de 450 palabras, 27 KB en gzip.

Pendiente del rediseño (fases siguientes): la cabecera y las seis páginas (Momentos, «La República en las Cortes» con las
cinco etapas, Datos, «Cómo se hizo» con Método, El Diario y Versiones), y la revisión del inglés.

## 2026-09-23 · español congelado

**Huella del copy:** `src/i18n/es.json`, SHA-256
`ceb6286b8a6f81b8873891d8b5fe83e90062841e6675c9ded72fbd451e4ed257` (2.437 claves, desde 24 archivos de
`docs/copy_es/`). Versión de lectura: `docs/lectura/es.md` (`npm run lectura`).

El español queda congelado tras aplicar las decisiones del investigador y del director (`docs/DECISIONES_23-09.md`) y la
ronda final de diseño. A partir de aquí, el inglés se traduce desde este estado. Cualquier cambio en `docs/copy_es/` o en
`src/i18n/es.json` cambia la huella: hay que abrir una entrada nueva aquí y decir qué se cambió y por qué.

Qué entra en el congelado:

- **Decisiones del investigador** (1-5): el tope de `peso.spec` se mide en gzip; la acción primaria es el explorador, en
  oro (`inicio.portada.llamada` ya dice `[Abrir el explorador ↗] [Descargar los datos]`); la ficha abre con «Hoy
  puede»; el grito «Luz y taquigrafos.» lleva nota al margen, sin [sic]; la frase del motivo del formulario de Dataverse
  (D-20) va junto a ↺ 3.
- **Decisiones del director:** D-3, D-4, D-18, D-19, D-21, D-22 y D-25 cerradas en el copy y en
  `src/config/enlaces.ts`; la vista previa ya no pinta ningún pendiente.
- **Claves nuevas en la verificación:** `fig.F21.rotulo.1936.izquierda` («Las izquierdas») y
  `fig.F21.rotulo.1936.derecha` («Las derechas»), los rótulos de la red de 1936-1939; `cortes.puertas.registro` («Las
  puertas, sesión a sesión»), el registro de puertas bajo F01 en `/cortes/`, que da a cada puerta un enlace de tamaño
  completo (WCAG 2.5.8, excepción «Equivalente», registrada en `PRODUCT.md`).
- **Presupuesto de palabras** (`tests/rutas.ts`): nueve páginas pasaban el tope del plan. Donde se pasaban, el tope es
  ahora el recuento congelado, redondeado a la cincuentena de arriba: ficha I 1.600, ficha III 1.500, guerra 1.250,
  México 1.150, Sesiones 800, puertas 550, Método 2.950 y Explorador 1.750. Así el copy no puede crecer. Es una decisión
  de la verificación, con el criterio que delegó el investigador, y el director puede revisarla.

Verificado en ese estado:

- exportador `--estricto`: 1.497 marcadores comprobados, 0 sin cifra;
- `npm run i18n`, `check-i18n`, `formatos` y `astro check` (0 errores);
- `astro build`: 48 páginas;
- `claves_figura --estricto`: 738 filas;
- `audit-cifras`, también en estricto: 7.785 cifras con su base;
- Playwright: 245 de 245, y con `STRICT=1` 236, con 8 omitidas del inglés;
- puerta del kit (Chromium y WebKit, 375 y 1.440 px, los dos temas, axe) en Inicio, Afinidades, Método, `/cortes/` y la
  ficha I: sin errores, sin desborde y 0 infracciones graves de axe. La única marca es la de 2.5.8 en `/cortes/` y en la
  ficha I, que es la excepción registrada. Firefox no arranca en este entorno.

## 23-09-2026 · congelación del español REVOCADA

El investigador revisará y reformulará el texto antes de dar la versión por publicable. Los borradores de `docs/copy_en/` se rehacen después.
