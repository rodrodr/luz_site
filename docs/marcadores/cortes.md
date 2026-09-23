# Marcadores del grupo cortes_a · Las Cortes (índice), plantilla de ficha y figuras

Formato del contrato (`clave | valor esperado | base | cómo se calcula`), el de `base.md`: valores escritos como los
verá el lector; dentro de una celda, la barra del formato va como `\|`. **Todos los valores se recalcularon hoy sobre las
fuentes** con `docs/marcadores/cortes_a_comprobar.py` (huellas de V2, v3 y proyecto comprobadas; 0 fallos). El script
lee estas tablas y marca ✗ cualquier valor o base que no coincida: el exportador debe dar lo mismo.

Anclas (`fila.*`): el valor es el id de la fila; «cómo se calcula» da la fecha, la sesión y el fragmento que el aserto de
la compilación debe encontrar **letra a letra** en la fila V2 y en la v3. Las variables de las notas emergentes
(`{{nombre}}`, `{{n}}`, `{{den}}`, `{{mes}}`…) no son marcadores de `cifras.json` y no van aquí.

Este archivo cubre `docs/copy_es/cortes.md`. Las fichas I y II están en `cortes_1931.md` y `cortes_1933.md` de esta carpeta.

## Marcadores del texto

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `sesiones` | 755 | V2 | claves (date, num_session) · módulo: base.py (ya en `base.md`) |
| `{{legislaturas.V2\|letra}}` | 3 → «tres» | V2 | valores de legislature · módulo: base.py (ya en `base.md`) |
| `{{etapas.n\|letra}}` | 5 → «cinco» | V2 | regla del plan (D-8): legislaturas 1 y 2, y la 3.ª partida por num_session ≤60/61–69/70–74 · módulo: base.py (ya en `base.md`) |
| `etapa.I.meses.con_sesion` | 27 | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.I.meses` | 28 | V2 | 1931-07 → 1933-10 · módulo: base.py (ya en `base.md`) |
| `{{etapa.II.meses.sin_sesion\|letra}}` | 4 → «cuatro» | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `{{etapa.III.meses\|letra}}` | 5 → «cinco» | V2 | 1936-03 → 1936-07 · módulo: base.py (etapas) |
| `{{etapa.IV.sesiones\|letra}}` | 9 → «nueve» | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `etapa.IV.meses` | 29 | V2 | 1936-10 → 1939-02 · módulo: base.py (ya en `base.md`) |
| `meses.salto` | 70 | V2 | 1939-03 → 1944-12, sin ninguna sesión · módulo: base.py (ya en `base.md`) |
| `{{etapa.V.sesiones\|letra}}` | 5 → «cinco» | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `{{etapa.V.meses.con_sesion\|letra}}` | 3 → «tres» | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.V.meses` | 11 | V2 | 1945-01 → 1945-11 · módulo: base.py (etapas) |
| `{{etapa.III.num.desde\|id}}` | 1 | V2 | primer num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.III.num.hasta\|id}}` | 60 | V2 | último num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.IV.num.desde\|id}}` | 61 | V2 | primer num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.IV.num.hasta\|id}}` | 69 | V2 | último num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.V.num.desde\|id}}` | 70 | V2 | primer num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.V.num.hasta\|id}}` | 74 | V2 | último num_session (sin huecos) · módulo: base.py (etapas) |
| `diputados.V2` | 773 | V2 | rep_id distintos · módulo: base.py (ya en `base.md`) |
| `leg.1931-1933.diputados` | 417 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `leg.1933-1935.diputados` | 390 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `leg.1936-1939.diputados` | 253 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `filas.v3` | 121.700 | v3 | count(*) de speeches · módulo: base.py (ya en `base.md`) |
| `filas.V2` | 107.551 | V2 | recuento del CSV · módulo: base.py (ya en `base.md`) |
| `{{fila.mexico_caratula.v3\|id}}` | 121466 | v3 | fila SUMARIO de 10-I-1945, solo en la v3, con «sólo tenemos noticia de ellas por citas …» · módulo: cortes.py |
| `meses.con_sesion` | 64 | V2 | meses con alguna sesión · módulo: base.py (ya en `base.md`) |
| `pres.vice_ses` | 586 | V2 | sesiones con alguna fila vicechair (parse_speaker del explorador) · módulo: base.py (ya en `base.md`) |

## Celdas de la tabla «Las etapas, en cifras» y del calendario (F01)

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `etapa.I.sesiones` | 405 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `{{etapa.I.fecha.desde\|fecha_corta}}` | 14-VII-1931 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.I.fecha.hasta\|fecha_corta}}` | 3-X-1933 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.I.serie` | Diario de Sesiones de las Cortes Constituyentes de la República Española | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `etapa.I.filas` | 61.355 | V2 | filas · módulo: base.py (ya en `base.md`) |
| `etapa.I.palabras` | 12.966.290 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.I.palabras.pct` | 53,28 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.I.diputados` | 417 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `etapa.I.filas_v3` | 68.943 | v3 | filas de la etapa en speeches · módulo: base.py (etapas) |
| `etapa.II.sesiones` | 276 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `{{etapa.II.fecha.desde\|fecha_corta}}` | 8-XII-1933 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.II.fecha.hasta\|fecha_corta}}` | 10-XII-1935 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.II.serie` | Diario de las Sesiones de Cortes. Congreso de los Diputados | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `etapa.II.filas` | 40.342 | V2 | filas · módulo: base.py (ya en `base.md`) |
| `etapa.II.palabras` | 9.476.120 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.II.palabras.pct` | 38,94 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.II.diputados` | 390 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `etapa.II.filas_v3` | 45.930 | v3 | filas de la etapa en speeches · módulo: base.py (etapas) |
| `etapa.III.sesiones` | 60 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `{{etapa.III.fecha.desde\|fecha_corta}}` | 16-III-1936 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.III.fecha.hasta\|fecha_corta}}` | 10-VII-1936 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.III.serie` | Diario de las Sesiones de Cortes. Congreso de los Diputados | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `etapa.III.filas` | 5.368 | V2 | filas · módulo: base.py (ya en `base.md`) |
| `etapa.III.palabras` | 1.690.319 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.III.palabras.pct` | 6,95 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.III.diputados` | 243 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `etapa.III.filas_v3` | 6.236 | v3 | filas de la etapa en speeches · módulo: base.py (etapas) |
| `etapa.IV.sesiones` | 9 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `{{etapa.IV.fecha.desde\|fecha_corta}}` | 1-X-1936 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.IV.fecha.hasta\|fecha_corta}}` | 1-II-1939 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.IV.serie` | Extracto oficial de las sesiones. Congreso de los Diputados | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `etapa.IV.filas` | 276 | V2 | filas · módulo: base.py (ya en `base.md`) |
| `etapa.IV.palabras` | 127.709 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.IV.palabras.pct` | 0,52 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.IV.diputados` | 44 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `etapa.IV.filas_v3` | 356 | v3 | filas de la etapa en speeches · módulo: base.py (etapas) |
| `etapa.V.sesiones` | 5 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `{{etapa.V.fecha.desde\|fecha_corta}}` | 10-I-1945 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.V.fecha.hasta\|fecha_corta}}` | 9-XI-1945 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.V.serie` | Extracto oficial de las sesiones de Cortes celebradas en México (exilio) | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `etapa.V.filas` | 210 | V2 | filas · módulo: base.py (ya en `base.md`) |
| `etapa.V.palabras` | 75.458 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.V.palabras.pct` | 0,31 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.V.diputados` | 29 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `etapa.V.filas_v3` | 235 | v3 | filas de la etapa en speeches · módulo: base.py (etapas) |
| `{{meses.salto.desde\|mes}}` | 1939-03 | V2 | primer mes del salto · módulo: base.py (etapas) |
| `{{meses.salto.hasta\|mes}}` | 1944-12 | V2 | último mes del salto · módulo: base.py (etapas) |
| `etapa.I.meses.sin_sesion` | 1 | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `etapa.II.meses.con_sesion` | 21 | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.II.meses.sin_sesion` | 4 | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `etapa.III.meses.con_sesion` | 5 | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.III.meses.sin_sesion` | 0 | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `etapa.IV.meses.con_sesion` | 8 | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.IV.meses.sin_sesion` | 21 | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `etapa.V.meses.con_sesion` | 3 | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.V.meses.sin_sesion` | 8 | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `etapa.II.meses` | 25 | V2 | 1933-12 → 1935-12 · módulo: base.py (etapas) |
| `etapa.III.meses` | 5 | V2 | 1936-03 → 1936-07 · módulo: base.py (etapas) |

## Figuras F01 y F16 (fase 2, grupo 1 · `exportador/modulos/cortes.py`)

Los rótulos de la leyenda del tono, las anotaciones de F01c y la escala de las barras de F01 salen de estas cifras
(el componente las pinta con su `data-k`). Recalculadas el 23-09-2026 sobre `meses.json` y `sesiones.json` (V2) y los
tramos de `sessions.json` (proyecto).

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `f01.clase.0.desde` | 1.473 | V2 | cinco clases por cuantiles sin interpolar de las palabras de los 64 meses con sesión: mínimo · módulo: cortes.py |
| `f01.clase.0.hasta` | 53.132 | V2 | valor de la posición ⌈64·1/5⌉ = 13 de la lista ordenada · módulo: cortes.py |
| `f01.clase.1.desde` | 53.133 | V2 | corte anterior + 1 · módulo: cortes.py |
| `f01.clase.1.hasta` | 315.121 | V2 | posición ⌈64·2/5⌉ = 26 · módulo: cortes.py |
| `f01.clase.2.desde` | 315.122 | V2 | corte anterior + 1 · módulo: cortes.py |
| `f01.clase.2.hasta` | 512.213 | V2 | posición ⌈64·3/5⌉ = 39 · módulo: cortes.py |
| `f01.clase.3.desde` | 512.214 | V2 | corte anterior + 1 · módulo: cortes.py |
| `f01.clase.3.hasta` | 606.144 | V2 | posición ⌈64·4/5⌉ = 52 · módulo: cortes.py |
| `f01.clase.4.desde` | 606.145 | V2 | corte anterior + 1 · módulo: cortes.py |
| `f01.clase.4.hasta` | 870.822 | V2 | máximo · módulo: cortes.py |
| `f01.clase.0.meses` | 13 | V2 | meses con sesión en la clase · módulo: cortes.py |
| `f01.clase.4.meses` | 12 | V2 | meses con sesión en la clase · módulo: cortes.py |
| `{{f01.mes_max\|mes}}` | 1934-06 | V2 | mes con más palabras · módulo: cortes.py |
| `f01.mes_max.palabras` | 870.822 | V2 | palabras de junio de 1934 · módulo: cortes.py |
| `f01.mes_max.sesiones` | 19 | V2 | sesiones de junio de 1934 · módulo: cortes.py |
| `f01.mes_max.filas` | 3.511 | V2 | filas de junio de 1934 · módulo: cortes.py |
| `f01.sesion_max.palabras` | 97.055 | V2 | la sesión con más palabras (1-VII-1936, núm. 54): la barra más alta de F01 · módulo: cortes.py |
| `f01.sesion_max.diputados` | 61 | V2 | la sesión con más diputados que intervienen, con quien preside (25-IX-1931, núm. 45) · módulo: cortes.py |
| `f16.verificar.presidente` | 15 | proyecto | sesiones con presidente titular marcado «verificar» en sessions.json (14 Jiménez de Asúa, 1 Fernández Clérigo) · módulo: cortes.py |
| `f16.verificar.gobierno` | 3 | proyecto | sesiones con el Gobierno Giral (en el exilio), marcado «verificar» · módulo: cortes.py |
| `f16.tramos.presidente` | 17 | proyecto | tramos de sesiones consecutivas, dentro de su etapa, con el mismo presidente titular · módulo: cortes.py |
| `f16.tramos.gobierno` | 22 | proyecto | tramos de sesiones consecutivas, dentro de su etapa, con el mismo Gobierno · módulo: cortes.py |
