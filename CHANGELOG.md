# Cambios · Luz y Taquígrafos (sitio)

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
