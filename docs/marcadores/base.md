# Marcadores del grupo base (exportador)

Cifras de control del plan (`00_PLAN_sitio.md` § Procedencia de las cifras principales y § Datos de las cinco
fichas), escritas a mano tal como las verá el lector. `python3 exportador/exportar.py` recalcula cada una sobre su
fuente y **falla** si el valor o la base no coinciden. Es también el modelo de formato para los demás grupos:
`clave | valor esperado | base | cómo se calcula`. Dentro de una celda, la barra del formato se escribe `\|`.

Una diferencia con el plan: con `parse_speaker` del explorador, el método que el plan cita, un vicepresidente preside
algún tramo en 586 sesiones (`pres.vice_ses`, fecha y número), 584 fechas (`pres.vice_fechas`) y 10.025 filas
(`pres.vice_filas`). El «584 (10.009 filas)» del plan cuenta la cadena «VICEPRESIDENTE» y pierde las etiquetas con
erratas del reconocimiento óptico. El copy usa siempre el marcador.

## Totales

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `filas.V2` | 107.551 | V2 | recuento del CSV |
| `columnas.V2` | 14 | V2 | columnas del CSV |
| `filas.v3` | 121.700 | v3 | `count(*)` de `speeches` |
| `habla.v3` | 108.291 | v3 | `role ∉ {summary, remark}` con el motor del explorador |
| `palabras.habla.v3` | 22.096.389 | v3 | suma de `nwords` de las filas de habla |
| `palabras.v3` | 25.364.144 | v3 | suma de `nwords` |
| `v3.sumarios` | 755 | v3 | filas SUMARIO |
| `v3.comentarios` | 12.654 | v3 | filas COMENTARIOS |
| `sesiones` | 755 | V2 | claves (`date`, `num_session`) |
| `sesiones.fechas` | 752 | V2 | fechas distintas |
| `sesiones.fechas_dobles` | 3 | V2 | fechas con dos sesiones |
| `sesion.primera` | 14-VII-1931 | V2 | primera fecha |
| `sesion.ultima` | 9-XI-1945 | V2 | última fecha |
| `palabras.V2` | 24.335.896 | V2 | suma de `nwords` |
| `diputados.V2` | 773 | V2 | `rep_id` distintos |
| `filas.sin_diputado` | 147 | V2 | `rep_id` vacío |
| `sesiones.tras_18jul` | 14 | V2 | fecha posterior al 18-VII-1936 |
| `palabras.tras_18jul` | 203.167 | V2 | ídem, palabras |
| `palabras.tras_18jul.pct` | 0,83 % | V2 | 203.167 / 24.335.896 |
| `meses.total` | 173 | V2 | de 1931-07 a 1945-11 |
| `meses.con_sesion` | 64 | V2 | meses con alguna sesión |
| `meses.salto` | 70 | V2 | 1939-03 → 1944-12 |
| `meses.fuera_de_etapa` | 5 | V2 | 1933-11, 1936-01, 1936-02, 1936-08, 1936-09 |
| `presidencia.filas.pct` | 44,85 % | V2 | `parse_speaker`: chair, vicechair, chair_age |
| `presidencia.palabras.pct` | 10,24 % | V2 | ídem, palabras |
| `pres.vice_ses` | 586 | V2 | sesiones con alguna fila `vicechair` |
| `pres.vice_filas` | 10.025 | V2 | filas `vicechair` |
| `pres.vice_fechas` | 584 | V2 | fechas con alguna fila `vicechair` |
| `paginas.total` | 28.780 | proyecto | suma de `pdf_pages` |
| `paginas.verificadas.sesiones` | 741 | proyecto | `page_status` verificado |
| `paginas.sin_verificar.sesiones` | 14 | proyecto | `page_status` unverified |
| `bib.n` | 31 | v3 | bibliotecas del proyecto |
| `bib.entradas` | 24.029 | v3 | suma de entradas |
| `bib.debates` | 26 | v3 | bibliotecas L2 |
| `filas.con_diputado` | 107.404 | V2 | `rep_id` no vacío |
| `sesiones.num1` | 3 | V2 | `num_session` = 1 |

## Legislaturas y etapas

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `leg.1931-1933.sesiones` | 405 | V2 | `legislature` |
| `leg.1933-1935.sesiones` | 276 | V2 | `legislature` |
| `leg.1936-1939.sesiones` | 74 | V2 | `legislature` |
| `leg.1931-1933.palabras` | 12.966.290 | V2 | suma de `nwords` |
| `leg.1933-1935.palabras` | 9.476.120 | V2 | suma de `nwords` |
| `leg.1936-1939.palabras` | 1.893.486 | V2 | suma de `nwords` |
| `leg.1931-1933.diputados` | 417 | V2 | `rep_id` distintos |
| `leg.1933-1935.diputados` | 390 | V2 | `rep_id` distintos |
| `leg.1936-1939.diputados` | 253 | V2 | `rep_id` distintos |
| `leg.1931-1933.paginas` | 15.272 | proyecto | suma de `pdf_pages` |
| `leg.1933-1935.paginas` | 11.177 | proyecto | suma de `pdf_pages` |
| `leg.1936-1939.paginas` | 2.331 | proyecto | suma de `pdf_pages` |
| `etapa.I.sesiones` | 405 | V2 | legislatura 1931-1933 |
| `etapa.II.sesiones` | 276 | V2 | legislatura 1933-1935 |
| `etapa.III.sesiones` | 60 | V2 | 1936-1939, sesiones 1–60 |
| `etapa.IV.sesiones` | 9 | V2 | 1936-1939, sesiones 61–69 |
| `etapa.V.sesiones` | 5 | V2 | 1936-1939, sesiones 70–74 |
| `etapa.IV.num_desde` | 61 | V2 | regla del plan (D-8) |
| `etapa.I.fecha.desde` | 14-VII-1931 | V2 | primera fecha |
| `etapa.I.desde` | 14-VII-1931 | V2 | alias de `etapa.I.fecha.desde` |
| `etapa.I.fecha.hasta` | 3-X-1933 | V2 | última fecha |
| `etapa.II.fecha.desde` | 8-XII-1933 | V2 | primera fecha |
| `etapa.II.fecha.hasta` | 10-XII-1935 | V2 | última fecha |
| `etapa.III.fecha.desde` | 16-III-1936 | V2 | primera fecha |
| `etapa.III.fecha.hasta` | 10-VII-1936 | V2 | última fecha |
| `etapa.IV.fecha.desde` | 1-X-1936 | V2 | primera fecha |
| `etapa.IV.fecha.hasta` | 1-II-1939 | V2 | última fecha |
| `etapa.V.fecha.desde` | 10-I-1945 | V2 | primera fecha |
| `etapa.V.fecha.hasta` | 9-XI-1945 | V2 | última fecha |
| `etapa.I.filas` | 61.355 | V2 | filas |
| `etapa.II.filas` | 40.342 | V2 | filas |
| `etapa.III.filas` | 5.368 | V2 | filas |
| `etapa.IV.filas` | 276 | V2 | filas |
| `etapa.V.filas` | 210 | V2 | filas |
| `etapa.I.palabras` | 12.966.290 | V2 | suma de `nwords` |
| `etapa.II.palabras` | 9.476.120 | V2 | suma de `nwords` |
| `etapa.III.palabras` | 1.690.319 | V2 | suma de `nwords` |
| `etapa.IV.palabras` | 127.709 | V2 | suma de `nwords` |
| `etapa.V.palabras` | 75.458 | V2 | suma de `nwords` |
| `etapa.I.palabras.pct` | 53,28 % | V2 | palabras de la etapa / palabras |
| `etapa.II.palabras.pct` | 38,94 % | V2 | ídem |
| `etapa.III.palabras.pct` | 6,95 % | V2 | ídem |
| `etapa.IV.palabras.pct` | 0,52 % | V2 | ídem |
| `etapa.V.palabras.pct` | 0,31 % | V2 | ídem |
| `etapa.I.diputados` | 417 | V2 | `rep_id` distintos, con quien preside |
| `etapa.II.diputados` | 390 | V2 | ídem |
| `etapa.III.diputados` | 243 | V2 | ídem |
| `etapa.IV.diputados` | 44 | V2 | ídem |
| `etapa.V.diputados` | 29 | V2 | ídem |
| `etapa.I.meses_con_sesion` | 27 | V2 | de 28 meses |
| `etapa.I.meses` | 28 | V2 | 1931-07 → 1933-10 |
| `etapa.II.meses_sin_sesion` | 4 | V2 | 1934-08, 1934-09, 1935-04, 1935-08 |
| `etapa.IV.meses` | 29 | V2 | 1936-10 → 1939-02 |
| `etapa.I.debates` | 13 | v3 | bibliotecas L2 por fechas |
| `etapa.II.debates` | 7 | v3 | ídem |
| `etapa.III.debates` | 4 | v3 | ídem |
| `etapa.IV.debates` | 1 | v3 | ídem |
| `etapa.V.debates` | 1 | v3 | ídem |
| `serie.constituyentes.sesiones` | 405 | proyecto | título del Diario |
| `serie.cortes.sesiones` | 336 | proyecto | ídem |
| `serie.extracto.sesiones` | 9 | proyecto | ídem |
| `serie.mexico.sesiones` | 5 | proyecto | ídem |
| `etapa.I.pres.besteiro` | 401 | proyecto | sesiones con Besteiro como presidente titular |
| `etapa.II.pres.alba` | 274 | proyecto | ídem, Alba |
| `etapa.III.pres.martinez_barrio` | 49 | proyecto | ídem, Martínez Barrio |
| `etapa.I.gob.azana_2` | 262 | proyecto | sesiones bajo Azaña II |
| `etapa.IV.gob.negrin_2` | 3 | proyecto | sesiones bajo Negrín II |
| `etapa.V.gob.giral_exilio` | 3 | proyecto | sesiones bajo Giral |
| `legislaturas.V2` | 3 | V2 | valores de `legislature` |
| `etapas.n` | 5 | V2 | regla D-8 |

## Una sesión y un mes (familias)

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `sesion.1931-10-01-48.filas` | 395 | V2 | `sesiones.json` |
| `sesion.1931-10-01-48.palabras` | 41.963 | V2 | `sesiones.json` |
| `sesion.1931-10-01-48.filas_v3` | 415 | v3 | `sesiones.json` |
| `{{sesion.1931-10-01-48.diario\|id}}` | 48 | proyecto | `sesiones.json › meta.num` |
| `etapa.I.sigla` | DSCCRE | proyecto | sigla del Diario de la etapa |
| `paginas.estado.contiguous` | 373 | proyecto | `page_status` |
| `paginas.estado.verso_blank` | 365 | proyecto | `page_status` |
| `paginas.estado.corrected` | 3 | proyecto | `page_status` |
| `{{sesion.1931-10-01-48.pag.desde\|id}}` | 1347 | proyecto | `sesiones.json › meta.paginas` |
| `{{sesion.1931-10-01-48.pag.hasta\|id}}` | 1394 | proyecto | `sesiones.json › meta.paginas` |
| `mes.1933-02.sesiones` | 16 | V2 | `meses.json` |
| `mes.1933-02.filas` | 1.843 | V2 | `meses.json` |
| `mes.1933-02.palabras` | 574.317 | V2 | `meses.json` |

## Dataverse y explorador

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `dv.csv.bytes` | 158,1 MB | dv | 165.785.782 / 1.024² |
| `dv.thqcmi.version` | «V2.0» | dv | API, `latestVersion` |
| `dv.thqcmi.version.fecha` | 15-IX-2026 | dv | API, `releaseTime` |
| `dv.thqcmi.versiones` | 3 | dv | API, `versions` |
| `dv.cgocus.version` | V1.1 | dv | API, `latestVersion` |
| `dv.cgocus.archivos` | 8 | dv | API, `files` |
| `dv.cgocus.edgelist.bytes` | 5,3 MB | dv | `filesize` |
| `dv.cgocus.cosponsorship.bytes` | 15,9 MB | dv | `filesize` |
| `dv.cgocus.metrics.bytes` | 16,9 MB | dv | `filesize` |
| `explorador.gz.bytes` | 106,6 MB | explorador | 111.733.652 / 1.024² |
| `{{explorador.gz.bytes\|peso_dec0}}` | 111733652 | explorador | «unos 112 MB comprimidos»: unidad decimal (bytes / 10⁶), regla de la crítica mientras rige D-26 (a); el valor esperado va en bytes para que el aserto no lo lea en MB binarios |
| `{{explorador.db.bytes\|peso_dec0}}` | 282316800 | explorador | «unos 282 MB» si se recuerda la base, en unidad decimal (D-26 (a)); hoy ningún texto lo usa |
| `v3.huella` | 3a0d8b2d | v3 | sha256 de `corpus.sqlite` |
| `explorador.gz.mb` | 107 | explorador | redondeo de 106,6 (MB binarios). **Ningún texto lo usa desde la fase 2**: el copy imprime `explorador.gz.bytes` con `peso_dec0` |
