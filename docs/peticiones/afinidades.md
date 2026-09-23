# Peticiones del copy de «Afinidades Elegidas» (22-09-2026)

Lo que necesita `docs/copy_es/afinidades.md` de otros dueños, y lo que queda para el investigador. Todas las cifras
citadas aquí están recalculadas hoy sobre CGOCUS V1.1 (`docs/marcadores/afinidades.md`). Los textos de F21 y F22
(`fig.F21.*`, `fig.F22.*`) están en mi archivo: `figuras.md` no necesita escribirlos.

## A `comun.md`

1. Rótulo nuevo: [Unir con THQCMI] → `/{lang}/datos/#unir` (plan, plantilla K, movimiento 8). Si entra en § 3, lo
   repito con ↺.

## A la plantilla `src/pages/[lang]/afinidades.astro` (versión de las 19:20)

2. **Claves alineadas con la plantilla**: cabecera `afinidades.{antetitulo,titulo,entrada}` con el sello ↺
   `comun.sello.afin` anclado tras la entrada, y los `extras` `afinidades.que_es`, `afinidades.nombre` y
   `afinidades.abrir`; `afinidades.indice.*` para el índice; secciones `firmar`, `cifras`, `cruce`, `redes`, `puentes`,
   `limites` y `datos`. Probado con `astro dev` en una copia local: todo el copy se pinta, sin desborde a 375 px.
3. **Sección «datos»**: [Descargar en Dataverse ↗] va en `afinidades.datos.descargar` (no con ↺
   `comun.boton.dataverse`: `htmlFija` no pasa contexto a `destinoBoton` y daría el DOI de THQCMI). El único corchete
   sin rótulo único es [Unir con THQCMI] (`afinidades.datos.llamada`): la sección necesita
   `destinos={[url(lang, \`${PAGINAS.datos}#unir\`)]}`, o que `comun.md` lo registre (punto 1).
4. **Tabla de archivos** de «datos»: `afinidades.datos.tabla.*` (segmento `tabla`, que `lectura.ts` no pinta) con
   `dv.cgocus.<archivo>.bytes|peso`. Hace falta un hueco o un componente, como `afin-cifras` en «cifras».
5. **Tabla de «cifras»**: filas `afinidades.cifras.tabla.*` y celdas `afin.<leg>.*`. Aserto: censo = firman + aislados.
6. F22 al final de «cruce»; F21 bajo demanda ([Cargar la figura]).

## A `afinidades.py` (exportador de F21 y F22)

7. Nombres y valores en `docs/marcadores/afinidades.md` (reglas de cálculo al principio). El esqueleto dice
   `afin.aristas` y `afin.fichas`: el copy usa **`afin.relaciones`** (63.507) y no usa `afin.fichas`.
8. **Firman = firmantes ∩ censo** (453 · 440 · 315), no los 454 · 446 · 316 de `afin_resumen.json`. Los firmantes sin
   ficha en la legislatura (1 · 6 · 1) van en `afin.<leg>.fuera_censo`.
9. **F21: nodos = censo** (475 · 470 · 501). Los firmantes sin ficha no se dibujan, ni sus relaciones. Los cruces de F22
   sí cuentan todas las filas del edgelist: su denominador es el total de la legislatura.
10. F22: cada cifra con su `n` y su `den` (la nota emergente los pide).

## Para el investigador

11. **D-3 sigue abierta.** La página publica CGOCUS V1.1 con su sello. Si deposita la V2.0, se reexporta y cambian las
    cifras, no el copy.
12. **Correcciones a la narrativa §16**, hechas en el copy con la cifra recalculada:
    - «Firman 454 / 446 / 316» mezcla firmantes sin ficha en la legislatura. Dentro del censo son 453 / 440 / 315.
    - «En 1936-1939, casi todo el cruce estricto es de la izquierda con el PNV» es falso con V1.1 (24,5 %; la CEDA
      suma más). La página cuenta, en su lugar, el peso del centro en el cruce (79,8 → 89,0 → 21,5 %) y que el cruce
      estricto de 1936-1939 se reúne en 16 de 89 medidas.
13. **Emparejamiento de Marial en V1.1** (lo corrige la v2, sin depositar): 448 firmas de «José María…» (Gil Robles,
    Lamamié de Clairac, Cid, Álvarez Mendizábal…) y de «Ramón María Aldasoro» están atribuidas a Melchor Marial Mundet
    (`match_type` `fuzzy_first:MARIAL`). En 1931-1933 le dan 385 relaciones, el puesto 22 de 454. La página lo cubre con
    una frase general (`afinidades.limites.emparejamiento`). **Decida** si, mientras no haya V2.0, se declara con nombre.
14. **781 de las 13.452 firmas** de `2REP_cosponsorship` no tienen `id_dip`. La página lo dice
    (`afinidades.firmar.identificar`).
15. **Documentación depositada que no cuadra con los archivos**: la metodología dice 94.621 registros de firma (el
    archivo tiene 13.452) y 63.508 aristas (el edgelist, 63.507 filas par × medida), y «Versión 1.0» (la vigente es la
    V1.1). El `METHODOLOGY.md` local (`2REP_Coautorias/documents/`) mide lo mismo que el depositado, pero su MD5 es otro
    (`4982e653…` frente a `1a364c23…`): la paráfrasis de «Sobre el nombre» se hizo sobre el local.
16. **Portada de la app de Afinidades** (no se repite en el sitio): «Densidad: 0.84», las «Cortes Republicanas en el
    exilio… reunidas en México y París», que el programa extrae «votaciones» y los porcentajes sin definición.
