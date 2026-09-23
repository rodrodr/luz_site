# Marcadores del grupo cortes_a · Ficha I (Las Cortes Constituyentes)

Formato del contrato (`clave | valor esperado | base | cómo se calcula`), el de `base.md`: valores escritos como los
verá el lector; dentro de una celda, la barra del formato va como `\|`. **Todos los valores se recalcularon hoy sobre las
fuentes** con `docs/marcadores/cortes_a_comprobar.py` (huellas de V2, v3 y proyecto comprobadas; 0 fallos). El script
lee estas tablas y marca ✗ cualquier valor o base que no coincida: el exportador debe dar lo mismo.

Anclas (`fila.*`): el valor es el id de la fila; «cómo se calcula» da la fecha, la sesión y el fragmento que el aserto de
la compilación debe encontrar **letra a letra** en la fila V2 y en la v3. Las variables de las notas emergentes
(`{{nombre}}`, `{{n}}`, `{{den}}`, `{{mes}}`…) no son marcadores de `cifras.json` y no van aquí.

## Cabecera, cifras, calendario y palabra

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `{{etapa.I.fecha.desde\|fecha_corta}}` | 14-VII-1931 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.I.fecha.hasta\|fecha_corta}}` | 3-X-1933 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.I.sesiones` | 405 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `etapa.I.serie` | Diario de Sesiones de las Cortes Constituyentes de la República Española | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `{{etapa.I.num.desde\|id}}` | 1 | V2 | primer num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.I.num.hasta\|id}}` | 405 | V2 | último num_session (sin huecos) · módulo: base.py (etapas) |
| `etapa.I.palabras` | 12.966.290 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.I.palabras.pct` | 53,28 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.I.diputados` | 417 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `etapa.I.listas_nominales.filas` | 532 | V2 | filas cuyo texto plegado contiene «señores que dijeron|han dicho» + «sí|no» · módulo: base.py (etapas) |
| `etapa.I.listas_nominales.sesiones` | 206 | V2 | sesiones de esas filas · módulo: base.py (etapas) |
| `{{etapa.I.gob.lerroux_1\|letra}}` | 2 → «dos» | proyecto | sesiones del Gobierno Lerroux I · módulo: base.py (etapas) |
| `etapa.I.meses.con_sesion` | 27 | V2 | meses de la etapa con sesión · módulo: base.py (etapas) |
| `etapa.I.meses` | 28 | V2 | 1931-07 → 1933-10 · módulo: base.py (ya en `base.md`) |
| `etapa.I.pres.besteiro` | 401 | proyecto | sesiones con presidente titular «Julián Besteiro Fernández» · módulo: base.py (ya en `base.md`) |
| `{{etapa.I.pres.barnes\|letra}}` | 3 → «tres» | proyecto | sesiones con presidente titular «Francisco Barnés» · módulo: base.py (etapas) |
| `{{etapa.I.pres.lara\|letra}}` | 1 → «una» | proyecto | sesiones con presidente titular «Antonio Lara y Zárate» · módulo: base.py (etapas) |
| `etapa.I.vice_ses` | 322 | V2 | sesiones con alguna fila vicechair (parse_speaker del explorador) · módulo: base.py (etapas) |
| `oradores.etapa.I.1.pal` | 426.392 | v3 | palabras de habla del primero (chair = false, role ∉ {summary, remark}) · módulo: cortes.py |
| `{{familias.etapa.I.republicanos.pct\|pct1}}` | 51,3 % | V2 | palabras de la familia Republicanos / palabras sin Presidencia (familia normalizada como el explorador) · módulo: cortes.py |
| `etapa.I.debates` | 13 | v3 | bibliotecas «Debate · …» cuyas sesiones caen en la etapa · módulo: base.py (ya en `base.md`) |
| `{{correcciones.fechas.n\|letra}}` | 7 → «siete» | V2 | sesiones con fecha corregida (changelog de la V2) · módulo: cortes.py |
| `{{correcciones.fechas.I\|letra}}` | 6 → «seis» | V2 | de ellas, en la legislatura 1931-1933 · módulo: cortes.py |
| `oradores.etapa.I.den` | 11.444.854 | v3 | palabras de habla de la etapa, sin la Presidencia · módulo: cortes.py |

## Votaciones y elecciones leídas en el texto de la fila

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `eleccion.besteiro1931.votos` | 363 | V2 | texto de V2 5 · módulo: cortes.py |
| `eleccion.besteiro1931.votantes` | 371 | V2 | texto de V2 5 · módulo: cortes.py |
| `voto.178-59.si` | 178 | V2 | texto de V2 6994 · módulo: cortes.py |
| `voto.178-59.no` | 59 | V2 | texto de V2 6994 · módulo: cortes.py |
| `voto.constitucion.prometidos` | 466 | V2 | texto de V2 13531 · módulo: cortes.py |
| `voto.constitucion.si` | 368 | V2 | texto de V2 13531 · módulo: cortes.py |
| `eleccion.presidente1931.votos` | 362 | V2 | texto de V2 13613 · módulo: cortes.py |
| `eleccion.presidente1931.votantes` | 410 | V2 | texto de V2 13613 · módulo: cortes.py |
| `voto.318-19.si` | 318 | V2 | texto de V2 37177 · módulo: cortes.py |
| `voto.318-19.no` | 19 | V2 | texto de V2 37177 · módulo: cortes.py |
| `voto.314-24.si` | 314 | V2 | texto de V2 37178: «Total, N.» de la lista del sí · módulo: cortes.py |
| `voto.314-24.no` | 24 | V2 | texto de V2 37178: «Total, N.» de la lista del no · módulo: cortes.py |
| `voto.187-91.si` | 187 | V2 | texto de V2 61320 · módulo: cortes.py |
| `voto.187-91.no` | 91 | V2 | texto de V2 61320 · módulo: cortes.py |

## Explorador: búsquedas y debates preparados (v3, 22-09-2026)

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `{{cortes.fichas.recuento.fecha\|fecha_larga}}` | (la de la exportación) | v3 | fecha de los recuentos de «Hoy puede» de las fichas · módulo: fichas.py |
| `busqueda.divorcio.1931-1933` | 485 | v3 | «divorcio» con la faceta Legislatura 1931-1933 · módulo: cortes.py |
| `biblioteca.sufragio.entradas` | 770 | v3 | entradas de la biblioteca · módulo: cortes.py |
| `{{biblioteca.casas_viejas.sesiones\|letra}}` | 9 → «nueve» | v3 | sesiones de la biblioteca · módulo: cortes.py |

## Sesiones citadas

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `{{sesion.1931-12-09-88.diario\|id}}` | 88 | proyecto | sessions.json › diario_num · módulo: cortes.py |
| `{{sesion.1931-12-09-88.pag.desde\|id}}` | 2895 | proyecto | sessions.json › page_start · módulo: cortes.py |
| `{{sesion.1931-12-09-88.pag.hasta\|id}}` | 2913 | proyecto | sessions.json › page_end · módulo: cortes.py |
| `{{sesion.1931-12-09-88.id.desde\|id}}` | 13471 | V2 | primer id de la sesión · módulo: cortes.py |
| `{{sesion.1931-12-09-88.id.hasta\|id}}` | 13554 | V2 | último id de la sesión · módulo: cortes.py |

## Anclas: id de fila V2 y v3, con el fragmento comprobado

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `{{fila.I.mesa_edad.V2\|id}}` | 1 | V2 | fila de 14-VII-1931 (sesión 1) con «Abrese la sesión» · módulo: cortes.py |
| `{{fila.I.mesa_edad.v3\|id}}` | 2 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `fila.I.alcala_resigna.palabras` | 3715 | V2 | nwords de la fila (igual en la v3) · módulo: cortes.py |
| `{{fila.I.alcala_resigna.V2\|id}}` | 2 | V2 | fila de 14-VII-1931 (sesión 1) con «resignar sus Poderes en fecha próxima» · módulo: cortes.py |
| `{{fila.I.alcala_resigna.v3\|id}}` | 3 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.besteiro_elegido.V2\|id}}` | 5 | V2 | fila de 14-VII-1931 (sesión 1) con «D. Julián Besteiro, 363» · módulo: cortes.py |
| `{{fila.I.besteiro_elegido.v3\|id}}` | 9 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.besteiro_ovacion.V2\|id}}` | 10 | V2 | fila de 14-VII-1931 (sesión 1) · módulo: cortes.py. **La cita «acogido con una gran ovación» está en la columna `speaker`** («El Sr. PRESIDENTE (Al ocupar su sitial es acogido con una gran ovación.):»), no en `speech`: el aserto de citas la busca en `speaker` (REVISION_FASE1 P3-10) |
| `{{fila.I.besteiro_ovacion.v3\|id}}` | 18 | v3 | misma sesión · módulo: cortes.py. También en `speaker`, con el mismo texto |
| `fila.I.asua_proyecto.palabras` | 5188 | V2 | nwords de la fila (igual en la v3) · módulo: cortes.py |
| `{{fila.I.asua_proyecto.V2\|id}}` | 2725 | V2 | fila de 27-VIII-1931 (sesión 28) con «es una Constitución de izquierda» · módulo: cortes.py |
| `{{fila.I.asua_proyecto.v3\|id}}` | 3006 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.art24.V2\|id}}` | 6994 | V2 | fila de 13-X-1931 (sesión 55) con «quedó aprobado el artículo 24 por 178 votos contra 59» · módulo: cortes.py |
| `{{fila.I.art24.v3\|id}}` | 7800 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.azana_baja.V2\|id}}` | 7022 | V2 | fila de 14-X-1931 (sesión 56) con «la sensible baja que nos ha forzado hoy a este cambio ministerial» · módulo: cortes.py |
| `{{fila.I.azana_baja.v3\|id}}` | 7833 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.constitucion.V2\|id}}` | 13531 | V2 | fila de 9-XII-1931 (sesión 88) con «Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí» · módulo: cortes.py |
| `{{fila.I.constitucion.v3\|id}}` | 15043 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.presidente_republica.V2\|id}}` | 13613 | V2 | fila de 10-XII-1931 (sesión 89) con «D. Niceto Alcalá-Zamora queda elegido Presidente de la República española» · módulo: cortes.py |
| `{{fila.I.presidente_republica.v3\|id}}` | 15140 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.centro_gravedad.V2\|id}}` | 20689 | V2 | fila de 9-III-1932 (sesión 132) con «El centro de gravedad de la política de la República española está en el Parlamento, aquí en este salón» · módulo: cortes.py |
| `{{fila.I.centro_gravedad.v3\|id}}` | 23023 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.conllevar.V2\|id}}` | 25527 | V2 | fila de 13-V-1932 (sesión 165) con «es un problema que no se puede resolver, que sólo se puede conllevar» · módulo: cortes.py |
| `{{fila.I.conllevar.v3\|id}}` | 28500 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.campalans.V2\|id}}` | 25529 | V2 | fila de 13-V-1932 (sesión 165) con «después de hacerlo el ilustre maestro de todos» · módulo: cortes.py |
| `{{fila.I.campalans.v3\|id}}` | 28502 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.sanjurjo.V2\|id}}` | 32910 | V2 | fila de 10-VIII-1932 (sesión 215) con «los sucesos acaecidos esta madrugada en Madrid» · módulo: cortes.py |
| `{{fila.I.sanjurjo.v3\|id}}` | 36780 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.agraria.V2\|id}}` | 37177 | V2 | fila de 9-IX-1932 (sesión 233) con «votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19» · módulo: cortes.py |
| `{{fila.I.agraria.v3\|id}}` | 41627 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.estatuto_voto.V2\|id}}` | 37178 | V2 | fila de 9-IX-1932 (sesión 233) con «Total, 314.» · módulo: cortes.py |
| `{{fila.I.estatuto_voto.v3\|id}}` | 41629 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.lerroux_gobierno.V2\|id}}` | 61223 | V2 | fila de 2-X-1933 (sesión 404) con «el mejor acto de acatamiento» · módulo: cortes.py |
| `{{fila.I.lerroux_gobierno.v3\|id}}` | 68793 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `fila.I.azana_1933.palabras` | 12127 | V2 | nwords de la fila (igual en la v3) · módulo: cortes.py |
| `{{fila.I.azana_1933.V2\|id}}` | 61237 | V2 | fila de 2-X-1933 (sesión 404) con «a ninguno de vosotros se os ocultará» · módulo: cortes.py |
| `{{fila.I.azana_1933.v3\|id}}` | 68809 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.van_a_morir.V2\|id}}` | 61277 | V2 | fila de 3-X-1933 (sesión 405) con «Señores Diputados, los que van a morir os saludan.» · módulo: cortes.py |
| `{{fila.I.van_a_morir.v3\|id}}` | 68855 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.gobierno_se_retira.V2\|id}}` | 61309 | V2 | fila de 3-X-1933 (sesión 405) con «el Gobierno se retira» · módulo: cortes.py |
| `{{fila.I.gobierno_se_retira.v3\|id}}` | 68887 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.voto_187.V2\|id}}` | 61320 | V2 | fila de 3-X-1933 (sesión 405) con «fue aprobada la proposición por 187 votos contra 91» · módulo: cortes.py |
| `{{fila.I.voto_187.v3\|id}}` | 68900 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.suspenden.V2\|id}}` | 61355 | V2 | fila de 3-X-1933 (sesión 405) con «En vista de la declaración del Gobierno, se suspenden las sesiones de Cortes» · módulo: cortes.py |
| `{{fila.I.suspenden.v3\|id}}` | 68942 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.bucle9.V2\|id}}` | 976 | V2 | fila de 27-VII-1931 (sesión 9) con «Sánchez Guerra, Ossorio y Gallardo, Sánchez Guerra» · módulo: cortes.py |
| `{{fila.I.bucle9.v3\|id}}` | 1081 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.I.estatuto_presidencia.V2\|id}}` | 25979 | V2 | fila de 27-V-1932 (sesión 173) · módulo: cortes.py |
| `{{fila.I.estatuto_presidencia.v3\|id}}` | 29042 | v3 | misma sesión · módulo: cortes.py |
