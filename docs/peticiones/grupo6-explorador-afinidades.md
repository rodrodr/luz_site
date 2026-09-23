# Peticiones del grupo 6 · El explorador y Afinidades Elegidas (fase 2, 23-09-2026)

Lo que el grupo 6 necesita de otros dueños, lo que ha cambiado y deben saber, y lo que queda para el investigador.
Nada de esto lo ha tocado el grupo 6 en archivos ajenos, salvo `package.json` (§ A.1), que no tiene dueño en el contrato.

## A. Al integrador (andamiaje y proyecto)

1. **Dependencias nuevas en `package.json`**: `sigma` 3.0.3 y `graphology` 0.26.0 (exactas), instaladas con
   `npm install --save-exact`. Las usa solo F21, en su propio trozo (`src/scripts/fig-red.ts`, ≈ 40 KB gz), que se importa
   bajo demanda desde `src/scripts/fig-red-carga.ts`. Para `tests/peso.spec.ts`: ese trozo va aparte, como pide
   `scripts/pesado.ts`.
2. **`styles/figuras.css` · la nota emergente enseña siempre la ×**: `.fig-tip-cierra { display: grid }` pisa el atributo
   `hidden`. Falta `.fig-tip-cierra[hidden] { display: none; }` (o `:not([hidden])` en la regla). Se ve en todas las figuras
   al pasar el ratón (capturas `explorador-f29-nota_1440_oscuro.png`, `afinidades-f22-nota_1440_claro.png`).
3. **`FiguraMarco.astro` · el código de figura** (`<span class="fig-id">F22</span>`) sale en `audit-cifras` como «número sin
   procedencia» («F22Dos», «F17Las»…) en TODAS las páginas con figura. Propuesta: `data-audit-exento="código de figura"` en
   ese `span`, o añadir la forma `F\d{2}` a `FORMAS_BLANCAS` de `scripts/vetos.mjs`.
4. **`lib/lectura.ts › htmlFija` · el sello ↺ 2 anclado en el copy** (`<p class="pieza-sello"><span class="sello">`) no
   tiene estilo global: el de `Sello.astro` es con ámbito. En Afinidades lo he suplido en la página; conviene moverlo a
   `piezas.css` (`.pieza-sello .sello` con la forma de `Sello`, y el filete discontinuo para v3).
5. **API de la isla que uso**: `window.LyTFiguras.muestra(el, anuncia, {i, total})` y `.oculta()` (F21 ancla la nota a un
   `span` que mueve sobre el nodo; F17 cierra la nota al abrir una ficha). Si cambia la firma, avísenme.
6. **Asientos, no antetítulos.** DESIGN.md («La regla del asiento») veta los antetítulos de género en mono («Buscar»,
   «La unidad»). En `explorador.md` y `afinidades.md` los he cambiado por asientos con su base y marcadores
   («v3 · 31 bibliotecas · 24.029 entradas»). El corrector de copy o los demás dueños pueden querer hacer lo mismo.
7. `busquedas.fecha` ya no es la fecha de la exportación: es la de la comprobación en pantalla para la huella de la v3
   (`FECHA_COMPROBADA` en `explorador.py`; hoy 2026-09-22). Así pasa también el marcador de `marcadores/sesiones.md`, que
   la declaraba con valor fijo. Si cambia la v3, el exportador avisa y usa la fecha del día.

## B. A `base.py` (exportador) y al grupo «capturas»

- `explorador.capturas.fecha` (2026-09-22, base `explorador`) la define ahora **`explorador.py`**, leyendo el `LEEME.md`
  de las capturas. `base.py` no debe definirla también: el exportador falla con una cifra repetida entre módulos.

## C. Al grupo de grafías (D-22)

- F21 nombra a los 1.026 diputados del censo de CGOCUS. `grafias.json` cubre a los 773 oradores de la V2; los **253**
  restantes (`afin.sin_grafia`) van como los escribe CGOCUS, con las partículas en minúscula («Miguel de Unamuno y
  Jugo»), sin tildes, y la figura lo dice (`fig.F21.sin_grafia`). La lista completa, con la columna `grafia`
  («sin revisar (CGOCUS)»), está en `public/datos/redes.csv`.

## D. Para el investigador

1. **Errata en el explorador**: diez descripciones de bibliotecas dicen «Mercedes Cabrera Calvo-Solelo». La ficha de F17
   la corrige (Calvo-Sotelo) y quita las rutas internas («Ficha B2 en docs/…», «Método: docs/…») y las notas de trabajo
   («que no cubría ninguna biblioteca»). «Sesiones más crispadas» y «Sesiones decisivas» se definen con el índice de
   reacción: su ficha dice que el criterio no se describe aquí, sin describirlo.
2. **D-18** sigue abierta: el aviso va en «Llevárselo, citado» con `data-pendiente="D-18"`.
3. **D-3** sigue abierta: toda la página de Afinidades es de CGOCUS V1.1, con su sello. Si se deposita la V2.0, basta
   volver a exportar (las posiciones de F21 se recalculan con la misma semilla).
4. En las redes, **Manuel Azaña** (`id_dip` 89) firma con 11 diputados en 1931-1933 y con ninguno en 1933-1936 ni en
   1936-1939 (anillo exterior). Es lo que dice CGOCUS V1.1; conviene confirmarlo cuando se deposite la V2.0.
