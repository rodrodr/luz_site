# Integrador final · fase 2 (23-09-2026)

Qué ha resuelto la integración de las peticiones de los seis dueños, qué ha tocado en archivos ajenos (solo para
resolver un choque o poner una puerta en verde) y qué queda abierto, con su dueño. Estado de cada puerta y de cada
página: `docs/revision_fase2/INTEGRACION.md`.

## 1. Peticiones resueltas

| petición | qué se hizo | dónde |
|---|---|---|
| inicio_cortes A.1 · fichas 1.6 · fichas 3.2 | Regla 3 de la auditoría: un id de fila v3 (`t: "id"`) junto a su par V2 no exige NotaBases si la página lleva ↺ 4 (`comun.fija.ids`), que ya explica el doble id | `scripts/audit-cifras.mjs` |
| inicio_cortes A.3 · fichas 2.1 · grupo6 A.3 · datos 3 | El código de figura lleva `data-audit-exento="código de figura"` (también en el marco propio de F18) | `FiguraMarco.astro`, `datos/FigDestino.astro` |
| inicio_cortes A.2 (en parte) · sesiones 6.2 | `FiguraMarco` acepta `titulo` y `pregunta` (claves que sustituyen a `fig.<id>.titulo|pregunta`). Ya cableadas: la F26 ligera de Inicio lleva `inicio.f26.titulo`; F30 lleva `fig.F30.pregunta.varias` en las puertas de varias sesiones | `FiguraMarco.astro`, `FigVotaciones.astro`, `FigTurnos.astro` |
| diario-metodo 3.1 · datos 1 | Prop `teclado`: por omisión, la frase «← y → recorren…» solo sale si la figura es `interactiva` en el registro. F19 pasa `teclado={false}`; fuera las dos reglas locales que la escondían (una con `!important`) | `FiguraMarco.astro`, `FigPasos.astro`, `datos/FigUnion.astro` |
| datos 2 | Prop `salvedad={false}` (F35 puede volver al marco común cuando su dueño quiera; para quitar las pestañas ya sirve `ligera`) | `FiguraMarco.astro` |
| sesiones 6.1 | F30 con `archivos: []`; el marco pone pestañas también cuando la figura trae su ranura `datos`. Ya no se genera `leame-F30-*.txt`, que nombraba `turnos.csv`, inexistente | `lib/figuras.ts`, `FiguraMarco.astro` |
| grupo6 A.2 · fichas 2.3 · datos 6 | `.fig-tip-cierra[hidden] { display: none }`: la × de la nota salía también con el puntero | `styles/figuras.css` |
| grupo6 A.4 | El sello anclado en el copy (`.pieza-sello .sello`) tiene estilo global, con el filete discontinuo de la v3 | `styles/piezas.css` |
| diario-metodo 3.2 | `IndiceLateral` envuelve el rótulo en un `<span>`: una cifra dentro del título ya no cae bajo el número | `IndiceLateral.astro` |
| diario-metodo 3.3 | `animation-timeline` en regla aparte (y con más especificidad que el atajo, que lo reinicia): el minificador lo fundía en `animation: … view()` y Chrome descartaba la animación de `.entra` y `.entra-figura` en todo el sitio | `styles/movimiento.css` |
| datos 4 | Un rótulo de años («1933-1935») ya no se parte por el guion en todo el sitio: `remata()` lo envuelve en `.nw` (global en `base.css`) | `lib/remata.ts`, `styles/base.css` |
| datos 7-8 · diario-metodo 4.1 · sesiones 7.2 | API oficial del exportador: `ctx.dadas` (vista viva y de solo lectura de las cifras ya dadas) y `ctx.escribir_texto()`. `diario.py`, `metodo.py`, `datos.py` y `sesiones.py` la usan; la introspección de la pila queda solo de respaldo | `exportador/comun.py`, `exportar.py`, `modulos/*.py` |
| fichas 1.2 | `fig.F05.titulo` repetía el H2 de su sección: pasa a «Los diez que más hablaron» (el mismo rótulo que ya usaba el índice lateral) | `docs/copy_es/cortes.md` |
| choque de tipos (astro check: 11 errores) | Cuatro guiones sin `import`/`export` compartían el ámbito global (`function enlaza` tres veces): `export {};` al principio. `FigCronologia`: `Fila` como alias de tipo, para caber en el `Evento` genérico. `FigCalendario`: `sub` tipado | `scripts/{copiar,fig-bibliotecas,fig-calendario,fig-red-carga}.ts`, `FigCronologia.astro`, `FigCalendario.astro` |
| peso (Método, 239 → 185 KB) | Los ejes y la tabla de F10/F11 llevan la procedencia en el contenedor (`data-k` + `data-base`) y no un `<data>` por número; anchos con dos decimales | `FigLongitud.astro` |
| peso (todo el sitio) | `scripts/compacta-cid.mjs`: al terminar la compilación, `data-astro-cid-<8>` → `data-c-<n>` en todo `dist/` (HTML, CSS y JS a la vez). 686 KB menos en el sitio, sin cambiar marcado ni cascada | `scripts/compacta-cid.mjs`, `astro.config.mjs` |
| capturas (tema claro) | El póster de F21 se salía del lienzo y tapaba la leyenda: Astro pone la clase de tema en el `<img>`, y el `<picture>` oculto seguía ocupando su alto. Los dos `<picture>` se apilan ahora en la misma caja | `FigRed.astro` |
| pruebas | `humo`: el 404 exige el bloque inglés solo cuando exista `en.json` (comun-inicio A.8). `solapes`: la cabecera pegajosa de una figura sobre sus propias filas cuenta como la de una tabla (TH), como ya hacía la prueba; F20 la usa a propósito | `tests/humo.spec.ts`, `tests/solapes.spec.ts` |

## 2. Abierto, con su dueño

1. **Peso de tres páginas (plan § amontonamiento, regla 6: HTML sin comprimir).** Tras la compactación siguen por
   encima: `/es/explorador/` 356 KB (tope 200), `/es/cortes/1931/` 255 KB (tope 200), `/es/cortes/1933/` 230 KB
   (tope 200). No se arreglan sin quitar función, y eso decide el dueño o el investigador:
   - **Explorador (grupo 6).** F17 pesa ~250 KB: las 31 fichas (`popover`) suman ~150 KB (lista de sesiones de cada
     biblioteca ~49 KB, cinco oradores ~44 KB, bloque de copia ~23 KB) y los carriles ~78 KB (245 espigas con dos
     `line` cada una). Propuesta: la lista de sesiones de cada ficha va a `bibliotecas.csv` (el plan: «ninguna tabla por
     sesión en el HTML»), los oradores con la procedencia en el `<ol>` y no en cada `<data>`, y una espiga por sesión
     (sin la `diana` aparte). Aun así, hace falta ~80 KB más: o las fichas en una página propia enlazada, o el tope del
     explorador a 300 KB.
   - **Fichas I y II (grupos 1 y 2).** F01e de la etapa I son 405 barras (~130 KB; ya sin tabla por sesión) y F09 ~46–55 KB.
     El tope de 200 KB no preveía F01e a escala de sesión. Opciones: (a) tope de 260 KB para las fichas I y II;
     (b) F01e por meses en las fichas y por sesiones solo en Las Cortes; (c) las barras de F01e bajo demanda (JSON) con
     los meses como versión sin JS.
2. **inicio_cortes A.2 (resto).** `FigCalendario` puede pasar a `FiguraMarco` con `titulo`/`pregunta`; no se ha tocado.
3. **fichas 1.5.** F01e a 375 px en la etapa V: la fila de 1945 sale casi vacía y las bandas de F16 muy estrechas (grupo 1).
4. **diario-metodo 3.4.** Enlaces dentro de la prosa del copy (`diario.calla.galarza` → «La antesala») sin corchetes:
   el pintor genérico no lo admite todavía (andamiaje, siguiente fase).
5. **datos 5.** El código usa `#m07` en todos los enlaces; la tabla de destinos de `comun.md` § 3 dice `#metodo-07`
   (nota del copy, no se pinta). Que el copy lo corrija.
6. **`components/TablaFiguras.astro`** ya no la usa nadie (la sustituye `datos/FigBases.astro`); no se ha borrado.
7. **integrador-diseno 7-8.** Los corchetes con destino provisional (`lib/lectura.ts › PROVISIONALES`) siguen esperando
   su clave en `comun.md`.
8. **Compilaciones a la vez** (sesiones 6.4, diario-metodo 3.5): con los dueños en paralelo, cada uno compila con
   `--outDir` propio; `npm run build` y las pruebas, solo la integración.
