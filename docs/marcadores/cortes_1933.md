# Marcadores del grupo cortes_a · Ficha II (la legislatura elegida en 1933)

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
| `{{etapa.II.fecha.desde\|fecha_corta}}` | 8-XII-1933 | V2 | primera fecha · módulo: base.py (ya en `base.md`) |
| `{{etapa.II.fecha.hasta\|fecha_corta}}` | 10-XII-1935 | V2 | última fecha · módulo: base.py (ya en `base.md`) |
| `etapa.II.sesiones` | 276 | V2 | claves de sesión de la etapa · módulo: base.py (ya en `base.md`) |
| `etapa.II.serie` | Diario de las Sesiones de Cortes. Congreso de los Diputados | proyecto | título del Diario (sessions.json › diario) · módulo: base.py (etapas) |
| `{{etapa.II.num.desde\|id}}` | 1 | V2 | primer num_session (sin huecos) · módulo: base.py (etapas) |
| `{{etapa.II.num.hasta\|id}}` | 276 | V2 | último num_session (sin huecos) · módulo: base.py (etapas) |
| `etapa.II.palabras` | 9.476.120 | V2 | suma de nwords · módulo: base.py (ya en `base.md`) |
| `etapa.II.palabras.pct` | 38,94 % | V2 | palabras de la etapa / palabras del CSV · módulo: base.py (ya en `base.md`) |
| `etapa.II.diputados` | 390 | V2 | rep_id distintos, con quien preside · módulo: base.py (ya en `base.md`) |
| `{{ideologia.etapa.I.d_ed.pct\|pct1}}` | 6,1 % | V2 | palabras de ideology D o ED / palabras sin Presidencia · módulo: cortes.py |
| `{{ideologia.etapa.II.d_ed.pct\|pct1}}` | 30,0 % | V2 | palabras de ideology D o ED / palabras sin Presidencia · módulo: cortes.py |
| `{{etapa.II.meses.sin_sesion\|letra}}` | 4 → «cuatro» | V2 | meses de la etapa sin sesión · módulo: base.py (etapas) |
| `etapa.II.pres.alba` | 274 | proyecto | sesiones con presidente titular «Santiago Alba Bonifaz» · módulo: base.py (ya en `base.md`) |
| `{{etapa.II.pres.casanueva\|letra}}` | 1 → «una» | proyecto | sesiones con presidente titular «Cándido Casanueva» · módulo: base.py (etapas) |
| `etapa.II.vice_ses` | 218 | V2 | sesiones con alguna fila vicechair (parse_speaker del explorador) · módulo: base.py (etapas) |
| `{{etapa.II.gobiernos\|letra}}` | 8 → «ocho» | proyecto | Gobiernos distintos en la etapa · módulo: base.py (etapas) |
| `oradores.etapa.II.1.pal` | 233.136 | v3 | palabras de habla del primero (chair = false, role ∉ {summary, remark}) · módulo: cortes.py |
| `{{familias.etapa.II.conservadores.pct\|pct1}}` | 27,7 % | V2 | palabras de la familia Conservadores / palabras sin Presidencia · módulo: cortes.py |
| `etapa.II.debates` | 7 | v3 | bibliotecas «Debate · …» cuyas sesiones caen en la etapa · módulo: base.py (ya en `base.md`) |
| `correcciones.sesion77.filas` | 91 | V2 | ids 68678–68768 · módulo: cortes.py |
| `{{etapa.II.dobles\|letra}}` | 3 → «tres» | V2 | fechas con dos sesiones · módulo: base.py (etapas) |
| `oradores.etapa.II.den` | 8.116.358 | v3 | palabras de habla de la etapa, sin la Presidencia · módulo: cortes.py |

## Votaciones y elecciones leídas en el texto de la fila

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `eleccion.alba1933.votos` | 234 | V2 | texto de V2 61358 · módulo: cortes.py |
| `eleccion.alba1933.votantes` | 248 | V2 | texto de V2 61358 · módulo: cortes.py |
| `voto.265-45.si` | 265 | V2 | texto de V2 68299 · módulo: cortes.py |
| `voto.265-45.no` | 45 | V2 | texto de V2 68299 · módulo: cortes.py |

## Explorador: búsquedas y debates preparados (v3, 22-09-2026)

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `{{cortes.fichas.recuento.fecha\|fecha_larga}}` | (la de la exportación) | v3 | fecha de los recuentos de «Hoy puede» de las fichas · módulo: fichas.py |
| `busqueda.amnistia.1933-1935` | 351 | v3 | «amnistía» con la faceta Legislatura 1933-1935 · módulo: cortes.py |
| `biblioteca.amnistia.entradas` | 1.085 | v3 | entradas de la biblioteca · módulo: cortes.py |
| `{{biblioteca.amnistia.sesiones\|letra}}` | 6 → «seis» | v3 | sesiones de la biblioteca · módulo: cortes.py |
| `busqueda.strauss.1935` | 32 | v3 | «strauss», del 1-X al 31-XII-1935 · módulo: cortes.py |
| `busqueda.straperlo.1935` | 11 | v3 | «straperlo», del 1-X al 31-XII-1935 · módulo: cortes.py |

## Sesiones citadas

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `sesion.1935-12-07-275.palabras` | 89.870 | V2 | suma de nwords de la sesión · módulo: cortes.py |
| `{{sesion.1934-04-20-72.diario\|id}}` | 72 | proyecto | sessions.json › diario_num · módulo: cortes.py |
| `{{sesion.1934-04-20-72.pag.desde\|id}}` | 2435 | proyecto | sessions.json › page_start · módulo: cortes.py |
| `{{sesion.1934-04-20-72.pag.hasta\|id}}` | 2473 | proyecto | sessions.json › page_end · módulo: cortes.py |
| `{{sesion.1934-04-20-72.id.desde\|id}}` | 68253 | V2 | primer id de la sesión · módulo: cortes.py |
| `{{sesion.1934-04-20-72.id.hasta\|id}}` | 68346 | V2 | último id de la sesión · módulo: cortes.py |

## Anclas: id de fila V2 y v3, con el fragmento comprobado

| clave | valor esperado | base | cómo se calcula |
|---|---|---|---|
| `fila.II.alba_reglamento.V2` | 71331 | V2 | 8-VI-1934 (sesión 96) con «no he visto quién ha interrumpido» · módulo: fichas.py (sustituye a `cita.diario.alba.reglamento.*`, corrección P2-6) |
| `fila.II.alba_reglamento.v3` | 80307 | v3 | misma sesión, mismo fragmento · módulo: fichas.py |
| `{{fila.II.riesgo.V2\|id}}` | 61356 | V2 | fila de 8-XII-1933 (sesión 1) con «Abrese la sesión» · módulo: cortes.py |
| `{{fila.II.riesgo.v3\|id}}` | 68945 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.alba_interino.V2\|id}}` | 61358 | V2 | fila de 8-XII-1933 (sesión 1) con «D. Santiago Alba Bonifaz, 234» · módulo: cortes.py |
| `{{fila.II.alba_interino.v3\|id}}` | 68949 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.alba_proclamado.V2\|id}}` | 62053 | V2 | fila de 28-XII-1933 (sesión 12) con «Queda proclamado Presidente de la Cámara D. Santiago Alba Bonifaz» · módulo: cortes.py |
| `{{fila.II.alba_proclamado.v3\|id}}` | 69744 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.gil_robles_fraccion.V2\|id}}` | 61598 | V2 | fila de 19-XII-1933 (sesión 6) con «la fracción numéricamente más importante de la Cámara» · módulo: cortes.py |
| `{{fila.II.gil_robles_fraccion.v3\|id}}` | 69230 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.inicuo.V2\|id}}` | 68270 | V2 | fila de 20-IV-1934 (sesión 72) con «¿Por qué es inicuo el acto que van a realizar las Cortes al aprobar este proyecto de ley?» · módulo: cortes.py |
| `{{fila.II.inicuo.v3\|id}}` | 76798 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.amnistia_voto.V2\|id}}` | 68299 | V2 | fila de 20-IV-1934 (sesión 72) con «quedó aprobado el artículo y con él el dictamen, por 265 votos contra 45» · módulo: cortes.py |
| `{{fila.II.amnistia_voto.v3\|id}}` | 76829 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.samper.V2\|id}}` | 68466 | V2 | fila de 2-V-1934 (sesión 75) · módulo: cortes.py |
| `{{fila.II.samper.v3\|id}}` | 77029 | v3 | misma sesión · módulo: cortes.py |
| `{{fila.II.tiros.V2\|id}}` | 70714 | V2 | fila de 31-V-1934 (sesión 91) con «Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!» · módulo: cortes.py |
| `{{fila.II.tiros.v3\|id}}` | 79606 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.sesion_secreta.V2\|id}}` | 71329 | V2 | fila de 8-VI-1934 (sesión 96) con «han de tratarse en sesión secreta» · módulo: cortes.py |
| `{{fila.II.sesion_secreta.v3\|id}}` | 80305 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.luz.V2\|id}}` | 71330 | V2 | fila de 8-VI-1934 (sesión 96) con «Luz y taquigrafos.» · módulo: cortes.py |
| `{{fila.II.luz.v3\|id}}` | 80306 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.esquerra.V2\|id}}` | 71609 | V2 | fila de 12-VI-1934 (sesión 97) con «esta minoría catalana, integrada por la Esquerra, federales y Unió Socialista» · módulo: cortes.py |
| `{{fila.II.esquerra.v3\|id}}` | 80615 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.se_retiran.V2\|id}}` | 71611 | V2 | fila de 12-VI-1934 (sesión 97) con «¿por qué se retiran los Sres. Diputados de la Esquerra catalana?» · módulo: cortes.py |
| `{{fila.II.se_retiran.v3\|id}}` | 80617 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.vascos.V2\|id}}` | 71613 | V2 | fila de 12-VI-1934 (sesión 97) con «La minoría vasca se retira del salón» · módulo: cortes.py |
| `{{fila.II.vascos.v3\|id}}` | 80619 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.cuatro_julio.V2\|id}}` | 74646 | V2 | fila de 1-X-1934 (sesión 113) con «dijerase que acaba de transcurrir la noche del 4 de Julio en que el Parlamento acordó suspender sus tareas» · módulo: cortes.py |
| `{{fila.II.cuatro_julio.v3\|id}}` | 84075 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.ese_camino.V2\|id}}` | 74648 | V2 | fila de 1-X-1934 (sesión 113) con «ha puesto de relieve que no es posible seguir por ese camino» · módulo: cortes.py |
| `{{fila.II.ese_camino.v3\|id}}` | 84079 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.huelga.V2\|id}}` | 74669 | V2 | fila de 9-X-1934 (sesión 114) con «hasta completar la pacificación y el imperio de la Ley, interrumpida por la huelga revolucionaria» · módulo: cortes.py |
| `{{fila.II.huelga.v3\|id}}` | 84109 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.asturias.V2\|id}}` | 74673 | V2 | fila de 9-X-1934 (sesión 114) con «nuestros compañeros Diputados por Asturias» · módulo: cortes.py |
| `{{fila.II.asturias.v3\|id}}` | 84113 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.vivas.V2\|id}}` | 74703 | V2 | fila de 9-X-1934 (sesión 114) con «son contestados con unánimes aplausos y aclamaciones» · módulo: cortes.py |
| `{{fila.II.vivas.v3\|id}}` | 84145 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.azana_1935.V2\|id}}` | 85330 | V2 | fila de 20-III-1935 (sesión 173) con «un presunto acusado y culpable» · módulo: cortes.py |
| `{{fila.II.azana_1935.v3\|id}}` | 96282 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `fila.II.azana_1935.palabras` | 14131 | V2 | nwords de la fila (igual en la v3) · módulo: cortes.py |
| `{{fila.II.straperlo.V2\|id}}` | 97387 | V2 | fila de 28-X-1935 (sesión 250) con «aparato de juego de salón que ha motivado todo este asunto» · módulo: cortes.py |
| `{{fila.II.straperlo.v3\|id}}` | 110040 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.salazar.V2\|id}}` | 97391 | V2 | fila de 28-X-1935 (sesión 250) con «vengo apesadumbrado por una grave acusación» · módulo: cortes.py |
| `{{fila.II.salazar.v3\|id}}` | 110044 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.nombela.V2\|id}}` | 101450 | V2 | fila de 7-XII-1935 (sesión 275) con «denuncia del Sr. Nombela» · módulo: cortes.py |
| `{{fila.II.nombela.v3\|id}}` | 114599 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.nuevo_aviso.V2\|id}}` | 101697 | V2 | fila de 10-XII-1935 (sesión 276) con «las sesiones hasta nuevo aviso» · módulo: cortes.py |
| `{{fila.II.nuevo_aviso.v3\|id}}` | 114872 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
| `{{fila.II.lerroux_declaracion.V2\|id}}` | 61596 | V2 | fila de 19-XII-1933 (sesión 6) con «cumplimos el grato deber de comparecer a vuestra presencia» · módulo: cortes.py |
| `{{fila.II.lerroux_declaracion.v3\|id}}` | 69228 | v3 | misma sesión, mismo fragmento · módulo: cortes.py |
