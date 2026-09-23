# Marcadores · sesiones (índice, ocho puertas, F26 y F30)

> **Recalculados el 22-09-2026** sobre las fuentes primarias, con su huella comprobada: V2 (`2REP_Diaries.csv`, MD5
> `360332a0ff1327671530f15eed46ac0c`), v3 (`~/.cache/luz_site/corpus.sqlite`, sha256 `3a0d8b2d…`), metadatos del
> proyecto (`sessions.json`, sha256 `b3295e99…`) y las bibliotecas publicadas del explorador
> (`2REP_Explorer/dist/bibliotecas/*.2replib`). Guion que lo recalcula todo y falla si algo cambia:
> `docs/marcadores/comprobar_sesiones_diario.py` (unos 15 s).
>
> Las búsquedas (`busqueda.*`) repiten la consulta del explorador sobre `speeches_fts` (FTS5, `unicode61
> remove_diacritics 2`): cada hoja entre comillas, `|` → `OR`, orden `bm25(speeches_fts), s.id`; «Solo lo que se
> habla» es `speaker NOT IN ('SUMARIO','COMENTARIOS')`; Desde y Hasta son `date >= ?` y `date <= ?`. El «papel» de
> cada fila V2 (Presidencia) sale de `parse_speaker` del motor del explorador.
>
> Claves de fuente, las de `exportador/formatos.py`: **C** recuento directo · **L** lectura de la fila, comprobada en
> cada ejecución · **M** metadato leído en su archivo · **R** regla del plan · **CALC** aritmética.

**Fase 2 (corrector del copy, 22-09-2026).** Nuevos: `puerta.estatuto-1932.umbral` («más de 17.000», REVISION_FASE1
P2-1), `ses.s48.cola.pantalla.desde/.hasta` (Método usa ya la familia `ses.s48.cola*`, P1-3) y el registro de listas
por etapa (`etapa.<id>.listas_nominales.*`, anexo adversarial R1). `puerta.estatuto-1932.fila.V2.palabras` y
`.fila.v3.palabras` ya no se imprimen: quedan como base del umbral.

Dueño en el exportador: `exportador/modulos/sesiones.py` (F26, F30, puertas y citas), salvo los de la familia
`sesion.<fecha>-<num>.<campo>`, que ya escribe `base.py` desde `sesiones.json`, y los de otros dueños (última
sección), que este copy usa tal cual. Los ids (`t` = `id`) no se agrupan nunca; los recuentos (`n`), siempre.


### 1 · Votaciones (F26)

Mismas claves que `marcadores/inicio.md` § 3 (una por votación: `voto.<sí>-<no>`); allí están también las que solo usa Inicio. Los ids son de la fila que imprime el resultado; la lista puede ir en otra (`.lista.*`).

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `voto.141-106.V2` | 5453 | id | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.141-106.no` | 106 | n | V2 | [L] texto de V2 5453: «…por 141 votos contra 106.» (ídem) |
| `voto.141-106.si` | 141 | n | V2 | [L] texto de V2 5453: «…por 141 votos contra 106.» |
| `voto.141-106.v3` | 6110 | id | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.161-121.V2` | 5453 | id | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.161-121.no` | 121 | n | V2 | [L] texto de V2 5453: «Total, 121.» tras «Señores que dijeron no:» |
| `voto.161-121.si` | 161 | n | V2 | [L] texto de V2 5453: «Total, 161.» tras «Señores que dijeron si:» |
| `voto.161-121.v3` | 6110 | id | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.178-59.V2` | 6994 | id | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.178-59.no` | 59 | n | V2 | [L] texto de V2 6994: «…por 178 votos contra 59» (ídem) |
| `voto.178-59.si` | 178 | n | V2 | [L] texto de V2 6994: «…por 178 votos contra 59» |
| `voto.178-59.v3` | 7800 | id | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.238-5.V2` | 102358 | id · formato `id` | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.238-5.mitad` | 209 | n | V2 | [L] texto de V2 102359: «la mitad más uno, 209» |
| `voto.238-5.mitad.V2` | 102359 | id | V2 | [C] fila V2 que imprime la mitad más uno |
| `voto.238-5.mitad.v3` | 115676 | id | v3 | [C] fila V2 que imprime la mitad más uno (ídem en v3) |
| `voto.238-5.no` | 5 → «cinco» | n · formato `letra` | V2 | [L] texto de V2 102358 |
| `voto.238-5.proposicion.V2` | 102304 | id · formato `id` | V2 | [C] fila V2 con el texto de la proposición |
| `voto.238-5.proposicion.v3` | 115618 | id · formato `id` | v3 | [C] fila V2 con el texto de la proposición (ídem en v3) |
| `voto.238-5.reglamento.V2` | 102309 | id · formato `id` | V2 | [C] fila V2 en que el Secretario lee el art. 106 del Reglamento |
| `voto.238-5.reglamento.v3` | 115623 | id · formato `id` | v3 | [C] fila V2 en que el Secretario lee el art. 106 del Reglamento (ídem en v3) |
| `voto.238-5.si` | 238 | n | V2 | [L] texto de V2 102358 |
| `voto.238-5.total` | 417 | n | V2 | [L] texto de V2 102359: «…son 417» |
| `voto.238-5.v3` | 115675 | id · formato `id` | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.314-24.V2` | 37178 | id | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.314-24.no` | 24 | n | V2 | [L] texto de V2 37178: «Total, 24.» |
| `voto.314-24.si` | 314 | n | V2 | [L] texto de V2 37178: «Total, 314.» (lista del Estatuto) |
| `voto.314-24.v3` | 41629 | id | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.318-19.V2` | 37177 | id | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.318-19.mitad` | 232 | n | V2 | [L] texto de V2 37178: «La mitad mas uno son 232» |
| `voto.318-19.mitad.V2` | 37178 | id | V2 | [C] fila V2 que imprime la mitad más uno |
| `voto.318-19.mitad.v3` | 41628 | id | v3 | [C] fila V2 que imprime la mitad más uno (ídem en v3) |
| `voto.318-19.no` | 19 | n | V2 | [L] texto de V2 37177 |
| `voto.318-19.si` | 318 | n | V2 | [L] texto de V2 37177 |
| `voto.318-19.total` | 462 | n | V2 | [L] texto de V2 37178: «…suma 462» |
| `voto.318-19.v3` | 41627 | id | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.368-466.V2` | 13531 | id | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.368-466.lista.V2` | 13525 | id | V2 | [C] fila V2 con la lista («Total, 368.») |
| `voto.368-466.lista.v3` | 15037 | id | v3 | [C] fila v3 con la lista |
| `voto.368-466.mitad` | 234 | n | V2 | [L] texto de V2 13531: «la mitad más uno, 234» |
| `voto.368-466.no` | 0 | n | V2 | [L] texto de V2 13531: «Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí» (ídem: los 368 votantes votan sí) |
| `voto.368-466.si` | 368 | n | V2 | [L] texto de V2 13531: «Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí» |
| `voto.368-466.total` | 466 | n | V2 | [L] texto de V2 13531: «…suman 466» |
| `voto.368-466.v3` | 15043 | id | v3 | [C] id de la fila v3 con el mismo texto |
| `voto.listas.sesiones` | 405 | n | V2 | [C] sesiones (date, num_session) con al menos una fila cuyo texto plegado contiene «señores que dijeron/han dicho sí/no» |
| `voto.n` | 6 → «seis» | n · formato `letra` | V2 | [R] selección editorial de F26: 161–121, 178–59, 368, 318–19, 314–24, 238–5 |
| `voto.sesiones` | 5 → «cinco» | n · formato `letra` | V2 | [R] sesiones de esas seis votaciones: 1-X-1931, 13-X-1931, 9-XII-1931, 9-IX-1932, 7-IV-1936 |

**Registro de todas las listas, por etapa** (`sesiones.votos.etapas`; narrativa §9, punto 3; plan, anexo adversarial
R1). Misma definición que `voto.listas.sesiones` (patrón `senores que (?:dijeron|han dicho) (?:si|no)\b` sobre el texto
plegado de la V2); etapas por legislatura y, en 1936-1939, por número de sesión (≤ 60 · 61–69 · 70–74). Recalculado por
el corrector del copy el 22-09-2026: las cinco suman 1.023 filas y 405 sesiones. Las de las etapas I y III están
declaradas también en `cortes_1931.md` y `cortes_1936.md`, con el mismo valor. Módulo: `base.py` (etapas).

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `etapa.I.listas_nominales.filas` | 532 | n | V2 | [C] filas de la etapa I con la definición común |
| `etapa.I.listas_nominales.sesiones` | 206 | n | V2 | [C] sesiones (date, num_session) de esas filas |
| `etapa.II.listas_nominales.filas` | 408 | n | V2 | [C] ídem, etapa II (legislatura 1933-1935) |
| `etapa.II.listas_nominales.sesiones` | 165 | n | V2 | [C] ídem |
| `etapa.III.listas_nominales.filas` | 81 | n | V2 | [C] ídem, etapa III (1936-1939, sesiones 1–60) |
| `etapa.III.listas_nominales.sesiones` | 32 | n | V2 | [C] ídem |
| `etapa.IV.listas_nominales.filas` | 2 → «dos» | n · formato `letra` | V2 | [C] ídem, etapa IV (sesiones 61–69). No ve la lista de Figueres, «Señores Diputados que dijeron SI» (V2 107340) |
| `etapa.IV.listas_nominales.sesiones` | 2 → «dos» | n · formato `letra` | V2 | [C] ídem |
| `etapa.V.listas_nominales.filas` | 0 | n | V2 | [C] ídem, etapa V (sesiones 70–74). El copy dice «ninguna» |


### 2 · Índice de Sesiones y límites

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `ses.paginas_sin_verificar` | 14 → «catorce» | n · formato `letra` | proyecto | [M] sesiones con page_status «unverified» en sessions.json (61–74 de 1936-1939) |
| `ses.puertas` | 8 → «ocho» | n · formato `letra` | V2 | [R] puertas de lectura de la edición 0.1 |
| `ses.puertas.sesiones` | 12 → «doce» | n · formato `letra` | V2 | [R] sesiones que cubren las ocho puertas |
| `ses.s48.cola` | 5 → «cinco» | n · formato `letra` | V2 | [L] filas finales repetidas de la sesión 48 (V2 5788–5792 · v3 6460–6464) |
| `ses.s48.cola.V2.desde` | 5788 | id · formato `id` | V2 | [C] extremo de la cola repetida (incidencia truncated_end de sessions.json) |
| `ses.s48.cola.V2.hasta` | 5792 | id · formato `id` | V2 | [C] extremo de la cola repetida (incidencia truncated_end de sessions.json) |
| `ses.s48.cola.v3.desde` | 6460 | id · formato `id` | v3 | [C] extremo de la cola repetida (incidencia truncated_end de sessions.json) |
| `ses.s48.cola.v3.hasta` | 6464 | id · formato `id` | v3 | [C] extremo de la cola repetida (incidencia truncated_end de sessions.json) |
| `ses.s48.cola.pantalla.desde` | 411 | id · formato `id` | explorador | [CALC] «Orden» que enseña el explorador para v3 6460: `ord` (410) + 1 (plan R20). Lo usa `metodo.03.pruebelo.explorador` |
| `ses.s48.cola.pantalla.hasta` | 415 | id · formato `id` | explorador | [CALC] «Orden» que enseña el explorador para v3 6464: `ord` (414) + 1 |
| `ses.s9.bucle.V2` | 976 | id · formato `id` | V2 | [C] fila V2 con el bucle (incidencia ocr_loop) |
| `ses.s9.bucle.v3` | 1081 | id · formato `id` | v3 | [C] la misma fila en v3 |
| `ses.s9.bucle.veces` | 6 → «seis» | n · formato `letra` | V2 | [L] veces que la fila V2 976 repite «Sánchez Guerra, Ossorio y Gallardo» |
| `ses.umbral.largas` | 300 | n | V2 | [R] umbral de «fila larga» (palabras) en F30 |


### 3 · Sesiones de las puertas (familia `sesion.*` de `base.py`)

`diputados_sp` = `rep_id` distintos fuera de la Presidencia. `paginas` es texto «primera–última» (con raya corta) y solo existe si `page_status` es `contiguous`, `verso_blank` o `corrected`.

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `sesion.1931-10-01-48.diario_num` | 48 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1931-10-01-48.diputados_sp` | 46 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1931-10-01-48.filas` | 395 | n | V2 | [C] filas V2 de (1931-10-01, 48) |
| `sesion.1931-10-01-48.filas_v3` | 415 | n | v3 | [C] filas v3 de (1931-10-01, 48), con sumario y comentarios |
| `sesion.1931-10-01-48.habla_v3` | 395 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1931-10-01-48.largas` | 34 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1931-10-01-48.num` | 48 | id · formato `id` | V2 | [C] num_session de 1931-10-01 |
| `sesion.1931-10-01-48.paginas` | 1347–1394 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status verso_blank) |
| `sesion.1931-10-01-48.palabras` | 41963 → «41.963» | n | V2 | [C] suma de nwords de (1931-10-01, 48) |
| `sesion.1931-10-13-55.diario_num` | 55 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1931-10-13-55.diputados_sp` | 50 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1931-10-13-55.filas` | 378 | n | V2 | [C] filas V2 de (1931-10-13, 55) |
| `sesion.1931-10-13-55.filas_v3` | 421 | n | v3 | [C] filas v3 de (1931-10-13, 55), con sumario y comentarios |
| `sesion.1931-10-13-55.habla_v3` | 380 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1931-10-13-55.largas` | 51 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1931-10-13-55.num` | 55 | id · formato `id` | V2 | [C] num_session de 1931-10-13 |
| `sesion.1931-10-13-55.paginas` | 1641–1721 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status contiguous) |
| `sesion.1931-10-13-55.palabras` | 64068 → «64.068» | n | V2 | [C] suma de nwords de (1931-10-13, 55) |
| `sesion.1932-05-27-173.diario_num` | 173 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1932-05-27-173.diputados_sp` | 11 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1932-05-27-173.filas` | 44 | n | V2 | [C] filas V2 de (1932-05-27, 173) |
| `sesion.1932-05-27-173.filas_v3` | 49 | n | v3 | [C] filas v3 de (1932-05-27, 173), con sumario y comentarios |
| `sesion.1932-05-27-173.habla_v3` | 45 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1932-05-27-173.largas` | 9 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1932-05-27-173.num` | 173 | id · formato `id` | V2 | [C] num_session de 1932-05-27 |
| `sesion.1932-05-27-173.paginas` | 5835–5877 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status verso_blank) |
| `sesion.1932-05-27-173.palabras` | 41004 → «41.004» | n | V2 | [C] suma de nwords de (1932-05-27, 173) |
| `sesion.1933-02-02-288.diario_num` | 288 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1933-02-02-288.diputados_sp` | 19 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1933-02-02-288.filas` | 155 | n | V2 | [C] filas V2 de (1933-02-02, 288) |
| `sesion.1933-02-02-288.filas_v3` | 166 | n | v3 | [C] filas v3 de (1933-02-02, 288), con sumario y comentarios |
| `sesion.1933-02-02-288.habla_v3` | 156 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1933-02-02-288.largas` | 20 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1933-02-02-288.num` | 288 | id · formato `id` | V2 | [C] num_session de 1933-02-02 |
| `sesion.1933-02-02-288.paginas` | 10883–10916 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status contiguous) |
| `sesion.1933-02-02-288.palabras` | 28420 → «28.420» | n | V2 | [C] suma de nwords de (1933-02-02, 288) |
| `sesion.1934-07-04-112.diario_num` | 112 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1934-07-04-112.diputados_sp` | 44 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1934-07-04-112.filas` | 255 | n | V2 | [C] filas V2 de (1934-07-04, 112) |
| `sesion.1934-07-04-112.filas_v3` | 282 | n | v3 | [C] filas v3 de (1934-07-04, 112), con sumario y comentarios |
| `sesion.1934-07-04-112.habla_v3` | 255 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1934-07-04-112.largas` | 37 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1934-07-04-112.num` | 112 | id · formato `id` | V2 | [C] num_session de 1934-07-04 |
| `sesion.1934-07-04-112.paginas` | 4405–4468 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status contiguous) |
| `sesion.1934-07-04-112.palabras` | 51616 → «51.616» | n | V2 | [C] suma de nwords de (1934-07-04, 112) |
| `sesion.1936-06-16-45.diario_num` | 45 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1936-06-16-45.diputados_sp` | 21 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1936-06-16-45.filas` | 159 | n | V2 | [C] filas V2 de (1936-06-16, 45) |
| `sesion.1936-06-16-45.filas_v3` | 172 | n | v3 | [C] filas v3 de (1936-06-16, 45), con sumario y comentarios |
| `sesion.1936-06-16-45.habla_v3` | 159 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1936-06-16-45.largas` | 27 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1936-06-16-45.num` | 45 | id · formato `id` | V2 | [C] num_session de 1936-06-16 |
| `sesion.1936-06-16-45.paginas` | 1359–1413 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status verso_blank) |
| `sesion.1936-06-16-45.palabras` | 48458 → «48.458» | n | V2 | [C] suma de nwords de (1936-06-16, 45) |
| `sesion.1936-07-01-54.diario_num` | 54 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1936-07-01-54.diputados_sp` | 25 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1936-07-01-54.filas` | 125 | n | V2 | [C] filas V2 de (1936-07-01, 54) |
| `sesion.1936-07-01-54.filas_v3` | 137 | n | v3 | [C] filas v3 de (1936-07-01, 54), con sumario y comentarios |
| `sesion.1936-07-01-54.habla_v3` | 125 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1936-07-01-54.largas` | 42 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1936-07-01-54.num` | 54 | id · formato `id` | V2 | [C] num_session de 1936-07-01 |
| `sesion.1936-07-01-54.paginas` | 1721–1821 | texto | proyecto | [M] page_start–page_end en sessions.json (page_status contiguous) |
| `sesion.1936-07-01-54.palabras` | 97055 → «97.055» | n | V2 | [C] suma de nwords de (1936-07-01, 54) |
| `sesion.1939-02-01-69.diario_num` | 69 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1939-02-01-69.diputados_sp` | 7 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1939-02-01-69.filas` | 16 → «dieciséis» | n · formato `letra` | V2 | [C] filas V2 de (1939-02-01, 69) |
| `sesion.1939-02-01-69.filas_v3` | 20 → «veinte» | n · formato `letra` | v3 | [C] filas v3 de (1939-02-01, 69), con sumario y comentarios |
| `sesion.1939-02-01-69.habla_v3` | 16 → «dieciséis» | n · formato `letra` | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1939-02-01-69.largas` | 6 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1939-02-01-69.num` | 69 | id · formato `id` | V2 | [C] num_session de 1939-02-01 |
| `sesion.1939-02-01-69.palabras` | 10452 → «10.452» | n | V2 | [C] suma de nwords de (1939-02-01, 69) |
| `sesion.1945-08-17-71.diario_num` | 71 | id · formato `id` | proyecto | [M] diario_num en sessions.json |
| `sesion.1945-08-17-71.diputados_sp` | 0 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1945-08-17-71.filas` | 5 → «cinco» | n · formato `letra` | V2 | [C] filas V2 de (1945-08-17, 71) |
| `sesion.1945-08-17-71.filas_v3` | 10 | n | v3 | [C] filas v3 de (1945-08-17, 71), con sumario y comentarios |
| `sesion.1945-08-17-71.habla_v3` | 5 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1945-08-17-71.largas` | 2 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1945-08-17-71.num` | 71 | id · formato `id` | V2 | [C] num_session de 1945-08-17 |
| `sesion.1945-08-17-71.palabras` | 1473 → «1.473» | n | V2 | [C] suma de nwords de (1945-08-17, 71) |
| `sesion.1945-11-07-72.diario_num` | 72 | id | proyecto | [M] diario_num en sessions.json |
| `sesion.1945-11-07-72.diputados_sp` | 14 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1945-11-07-72.filas` | 56 | n | V2 | [C] filas V2 de (1945-11-07, 72) |
| `sesion.1945-11-07-72.filas_v3` | 63 | n | v3 | [C] filas v3 de (1945-11-07, 72), con sumario y comentarios |
| `sesion.1945-11-07-72.habla_v3` | 56 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1945-11-07-72.largas` | 14 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1945-11-07-72.num` | 72 | id | V2 | [C] num_session de 1945-11-07 |
| `sesion.1945-11-07-72.palabras` | 29413 → «29.413» | n | V2 | [C] suma de nwords de (1945-11-07, 72) |
| `sesion.1945-11-08-73.diario_num` | 73 | id | proyecto | [M] diario_num en sessions.json |
| `sesion.1945-11-08-73.diputados_sp` | 5 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1945-11-08-73.filas` | 27 | n | V2 | [C] filas V2 de (1945-11-08, 73) |
| `sesion.1945-11-08-73.filas_v3` | 33 | n | v3 | [C] filas v3 de (1945-11-08, 73), con sumario y comentarios |
| `sesion.1945-11-08-73.habla_v3` | 28 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1945-11-08-73.largas` | 6 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1945-11-08-73.num` | 73 | id | V2 | [C] num_session de 1945-11-08 |
| `sesion.1945-11-08-73.palabras` | 15307 → «15.307» | n | V2 | [C] suma de nwords de (1945-11-08, 73) |
| `sesion.1945-11-09-74.diario_num` | 74 | id | proyecto | [M] diario_num en sessions.json |
| `sesion.1945-11-09-74.diputados_sp` | 16 | n | V2 | [C] rep_id distintos fuera de la Presidencia (parse_speaker del explorador) |
| `sesion.1945-11-09-74.filas` | 95 | n | V2 | [C] filas V2 de (1945-11-09, 74) |
| `sesion.1945-11-09-74.filas_v3` | 100 | n | v3 | [C] filas v3 de (1945-11-09, 74), con sumario y comentarios |
| `sesion.1945-11-09-74.habla_v3` | 95 | n | v3 | [C] filas v3 sin SUMARIO ni COMENTARIOS («Solo lo que se habla») |
| `sesion.1945-11-09-74.largas` | 24 | n | V2 | [C] filas con nwords > 300 |
| `sesion.1945-11-09-74.num` | 74 | id · formato `id` | V2 | [C] num_session de 1945-11-09 |
| `sesion.1945-11-09-74.palabras` | 21238 → «21.238» | n | V2 | [C] suma de nwords de (1945-11-09, 74) |


### 4 · Puertas (agregados y hechos propios)

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `puerta.antesala-1936.filas` | 284 | n | V2 | [CALC] suma de las filas V2 de sus sesiones |
| `puerta.antesala-1936.palabras` | 145513 → «145.513» | n | V2 | [CALC] suma de las palabras V2 de sus sesiones |
| `puerta.antesala-1936.sesiones` | 2 | n | V2 | [R] sesiones de la puerta |
| `puerta.casas-viejas-1933.feb.sesiones` | 16 | n | V2 | [C] sesiones de febrero de 1933 |
| `puerta.casas-viejas-1933.primera_feb` | 287 | id | V2 | [C] num_session de 1933-02-01, primera sesión de 1933 |
| `puerta.estatuto-1932.documento.palabras` | 21111 → «21.111» | n | v3 | [C] nwords de v3 61932 |
| `puerta.estatuto-1932.documento.v3` | 61932 | id · formato `id` | v3 | [C] fila COMENTARIOS v3 que recibe el documento leído por Prieto |
| `puerta.estatuto-1932.fila.V2.palabras` | 17152 → «17.152» | n | V2 | [C] nwords de V2 25979 (fila a nombre de «El Sr. PRESIDENTE:») |
| `puerta.estatuto-1932.fila.V2.puesto` | 2 | n | V2 | [C] puesto de V2 25979 por nwords entre las 107.551 filas |
| `puerta.estatuto-1932.fila.v3.palabras` | 17142 → «17.142» | n | v3 | [C] nwords de v3 29042 (Azaña) |
| `puerta.estatuto-1932.fila.v3.presidencia.palabras` | 10 → «diez» | n · formato `letra` | v3 | [C] nwords de v3 29041 (la Presidencia da la palabra) |
| `puerta.estatuto-1932.primera.V2` | 55221 | id · formato `id` | V2 | [C] la fila V2 más larga (Prieto, 12-VII-1933) |
| `puerta.estatuto-1932.primera.palabras` | 25371 → «25.371» | n | V2 | [C] nwords de V2 55221 |
| `puerta.estatuto-1932.umbral` | 17000 → «17.000» | n | V2 | [CALC] millar entero por debajo de la menor de las dos filas del discurso: ⌊min(nwords V2 25979 = 17.152, nwords v3 29042 = 17.142) / 1.000⌋ × 1.000. El copy dice «más de 17.000» (narrativa §10.3, plan R17): si una fila bajara de 17.000, el valor cambia y el aserto falla. Base V2 y v3 |
| `puerta.figueres-1939.lista.V2` | 107340 | id · formato `id` | V2 | [L] fila V2 del 1-II-1939 con «Señores Diputados que dijeron SI:» y la lista de nombres (fase 2) |
| `puerta.figueres-1939.lista.v3` | 121463 | id · formato `id` | v3 | [L] la misma lista en la v3 (fila de comentarios) |
| `puerta.mexico-1945.filas` | 183 | n | V2 | [CALC] suma de las filas V2 de sus sesiones |
| `puerta.mexico-1945.filas_v3` | 206 | n | v3 | [C] filas v3 con date >= 1945-08-17 (Desde 17/08/1945, sin Hasta) |
| `puerta.mexico-1945.habla_v3` | 184 | n | v3 | [C] suma de las filas V2 de sus sesiones (ídem con «Solo lo que se habla») |
| `puerta.mexico-1945.palabras` | 67431 → «67.431» | n | V2 | [CALC] suma de las palabras V2 de sus sesiones |
| `puerta.mexico-1945.sesiones` | 4 → «cuatro» | n · formato `letra` | V2 | [R] sesiones de la puerta |
| `puerta.pistola-1934.siguiente` | 1-X-1934 → «1 de octubre de 1934» | fecha · formato `fecha_larga` | V2 | [C] primera sesión posterior al 4-VII-1934 |


### 5 · Búsquedas en el explorador (v3)

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `busqueda.ses.barriga.n` | 2 | n | v3 | [C] FTS5 MATCH '"tiros a la barriga"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; todo el corpus |
| `busqueda.ses.casas_viejas.m1933_03` | 126 | n | v3 | [C] FTS5 MATCH '"casas viejas"' {'desde': '1933-03-01', 'hasta': '1933-03-31'} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; marzo de 1933, todas las filas |
| `busqueda.ses.casas_viejas.m1933_03_habla` | 108 | n | v3 | [C] FTS5 MATCH '"casas viejas"' {'desde': '1933-03-01', 'hasta': '1933-03-31', 'habla': True} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; marzo de 1933, «Solo lo que se habla» |
| `busqueda.ses.otra_manera.n` | 2 | n | v3 | [C] FTS5 MATCH '"vivir de otra manera"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; consulta: "vivir de otra manera" |
| `busqueda.ses.pistola.dia` | 3 → «tres» | n · formato `letra` | v3 | [C] FTS5 MATCH '"pistola"' {'desde': '1934-07-04', 'hasta': '1934-07-04'} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; Desde y Hasta 04/07/1934 |
| `busqueda.ses.pistola.n` | 164 | n | v3 | [C] FTS5 MATCH '"pistola"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; todo el corpus |
| `busqueda.ses.presidente_interino.n` | 6 → «seis» | n · formato `letra` | v3 | [C] FTS5 MATCH '"presidente interino de la republica"' {'desde': '1945-01-01'} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; Desde 01/01/1945 |
| `busqueda.ses.suprimidas.n` | 5 → «cinco» | n · formato `letra` | v3 | [C] FTS5 MATCH '"no constan por orden" OR "no se consigna por orden" OR "no se consignan por orden"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; acotaciones de palabras suprimidas |
| `busqueda.ses.suprimidas.puerta` | 3 → «tres» | n · formato `letra` | v3 | [C] de ellas, en 16-VI y 1-VII-1936 |
| `busqueda.ses.tenia_que_ocurrir.n` | 2 → «dos» | n · formato `letra` | v3 | [C] FTS5 MATCH '"no ha ocurrido sino lo que tenia que ocurrir"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; consulta: "no ha ocurrido sino lo que tenía que ocurrir" |
| `busqueda.ses.tierra_catalana.habla` | 0 | n | v3 | [C] FTS5 MATCH '"trozo de la tierra catalana"' {'habla': True} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; con «Solo lo que se habla» |
| `busqueda.ses.tierra_catalana.n` | 1 → «una» | n · formato `letra` | v3 | [C] FTS5 MATCH '"trozo de la tierra catalana"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; todo el corpus, todas las filas |
| `busqueda.ses.voto_union.campoamor` | 6 → «seis» | n · formato `letra` | v3 | [C] de los 40, filas de rep_name Clara Campoamor |
| `busqueda.ses.voto_union.fechas` | 15 | n | v3 | [C] fechas distintas de los 40 |


### 6 · Debates preparados (bibliotecas del explorador, v3)

`bib.<k>.entradas` = número de `items` del `.2replib`; `.sesiones` = claves (`date`, `num_session`) distintas de sus items.

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `bib.casas_viejas.entradas` | 943 | n | v3 | [C] items de L2-B7_debate-casas-viejas.2replib |
| `bib.casas_viejas.nombre` | Debate · Casas Viejas | texto | v3 | [M] L2-B7_debate-casas-viejas.2replib › collection.name |
| `bib.casas_viejas.sesiones` | 9 → «nueve» | n · formato `letra` | v3 | [C] sesiones (date, num_session) de sus items |
| `bib.estatuto.entradas` | 307 | n | v3 | [C] items de L2-B5_debate-estatuto-de-cataluna.2replib |
| `bib.estatuto.nombre` | Debate · Estatuto de Cataluña | texto | v3 | [M] L2-B5_debate-estatuto-de-cataluna.2replib › collection.name |
| `bib.estatuto.sesiones` | 6 → «seis» | n · formato `letra` | v3 | [C] sesiones (date, num_session) de sus items |
| `bib.exilio.entradas` | 211 | n | v3 | [C] items de L2-B16_debate-las-cortes-en-el-exilio.2replib |
| `bib.exilio.nombre` | Debate · Las Cortes en el exilio | texto | v3 | [M] L2-B16_debate-las-cortes-en-el-exilio.2replib › collection.name |
| `bib.exilio.sesiones` | 5 → «cinco» | n · formato `letra` | v3 | [C] sesiones (date, num_session) de sus items |
| `bib.guerra.entradas` | 280 | n | v3 | [C] items de L2-B15_debate-las-cortes-en-guerra.2replib |
| `bib.guerra.nombre` | Debate · Las Cortes en guerra | texto | v3 | [M] L2-B15_debate-las-cortes-en-guerra.2replib › collection.name |
| `bib.guerra.sesiones` | 9 → «nueve» | n · formato `letra` | v3 | [C] sesiones (date, num_session) de sus items |
| `bib.orden_publico.entradas` | 604 | n | v3 | [C] items de L2-B14_debate-orden-publico-en-la-primavera-de-1936.2replib |
| `bib.orden_publico.nombre` | Debate · Orden público en la primavera de 1936 | texto | v3 | [M] L2-B14_debate-orden-publico-en-la-primavera-de-1936.2replib › collection.name |
| `bib.orden_publico.sesiones` | 5 → «cinco» | n · formato `letra` | v3 | [C] sesiones (date, num_session) de sus items |
| `bib.religiosa.entradas` | 486 | n | v3 | [C] items de L2-B3_debate-cuestion-religiosa-art-26.2replib |
| `bib.religiosa.nombre` | Debate · Cuestión religiosa (art. 26) | texto | v3 | [M] L2-B3_debate-cuestion-religiosa-art-26.2replib › collection.name |
| `bib.religiosa.sesiones` | 4 → «cuatro» | n · formato `letra` | v3 | [C] sesiones (date, num_session) de sus items |
| `bib.sufragio.entradas` | 770 | n | v3 | [C] items de L2-B2_debate-sufragio-femenino.2replib |
| `bib.sufragio.nombre` | Debate · Sufragio femenino | texto | v3 | [M] L2-B2_debate-sufragio-femenino.2replib › collection.name |
| `bib.sufragio.sesiones` | 2 | n | v3 | [C] sesiones (date, num_session) de sus items |


### 7 · Ids y palabras de las citas

Una terna por cita de `citas.md`: `cita.<clave>.V2`, `.v3` y `.palabras` (nwords de la fila V2). El aserto de la compilación comprueba antes que cada fragmento está letra a letra en esas dos filas.

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `cita.antesala.calvo.V2` | 105356 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `antesala.calvo` (citas.md) |
| `cita.antesala.calvo.palabras` | 1718 → «1.718» | n | V2 | [C] nwords de la fila V2 105356 |
| `cita.antesala.calvo.v3` | 119131 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `antesala.calvo` (citas.md) |
| `cita.antesala.casares.V2` | 105330 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `antesala.casares` (citas.md) |
| `cita.antesala.casares.v3` | 119104 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `antesala.casares` (citas.md) |
| `cita.antesala.galarza.V2` | 106289 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `antesala.galarza` (citas.md) |
| `cita.antesala.galarza.v3` | 120221 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `antesala.galarza` (citas.md) |
| `cita.antesala.galarza2.V2` | 106291 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `antesala.galarza2` (citas.md) |
| `cita.antesala.galarza2.v3` | 120223 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `antesala.galarza2` (citas.md) |
| `cita.antesala.presidencia.V2` | 106290 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `antesala.presidencia` (citas.md) |
| `cita.antesala.presidencia.v3` | 120222 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `antesala.presidencia` (citas.md) |
| `cita.casasviejas.azana.V2` | 44922 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `casasviejas.azana` (citas.md) |
| `cita.casasviejas.azana.hurgue.V2` | 44922 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `casasviejas.azana.hurgue` (citas.md) |
| `cita.casasviejas.azana.hurgue.palabras` | 528 | n | V2 | [C] nwords de la fila V2 44922 |
| `cita.casasviejas.azana.hurgue.v3` | 50255 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `casasviejas.azana.hurgue` (citas.md) |
| `cita.casasviejas.barriga.V2` | 70714 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `casasviejas.barriga` (citas.md) |
| `cita.casasviejas.barriga.v3` | 79606 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `casasviejas.barriga` (citas.md) |
| `cita.casasviejas.martinezbarrio.V2` | 46426 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `casasviejas.martinezbarrio` (citas.md) |
| `cita.casasviejas.martinezbarrio.v3` | 51919 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `casasviejas.martinezbarrio` (citas.md) |
| `cita.estatuto.azana.V2` | 25979 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `estatuto.azana` (citas.md) |
| `cita.estatuto.azana.v3` | 29042 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `estatuto.azana` (citas.md) |
| `cita.estatuto.v2.palabra.v3` | 29041 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `estatuto.v2.palabra` (citas.md) |
| `cita.estatuto.v2.rotulo.V2` | 25979 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `estatuto.v2.rotulo` (citas.md) |
| `cita.figueres.castillo.V2` | 107337 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `figueres.castillo` (citas.md) |
| `cita.figueres.castillo.v3` | 121459 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.castillo` (citas.md) |
| `cita.figueres.fotocopia.V2` | 107341 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `figueres.fotocopia` (citas.md) |
| `cita.figueres.fotocopia.v3` | 121465 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.fotocopia` (citas.md) |
| `cita.figueres.martinezbarrio.v3` | 121446 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.martinezbarrio` (citas.md) |
| `cita.figueres.negrin.V2` | 107326 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `figueres.negrin` (citas.md) |
| `cita.figueres.negrin.palabras` | 5291 → «5.291» | n | V2 | [C] nwords de la fila V2 107326 |
| `cita.figueres.negrin.v3` | 121447 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.negrin` (citas.md) |
| `cita.figueres.nota.v3` | 121110 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.nota` (citas.md) |
| `cita.figueres.votacion.V2` | 107341 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `figueres.votacion` (citas.md) |
| `cita.figueres.votacion.v3` | 121464 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.votacion` (citas.md) |
| `cita.mexico.giral.V2` | 107375 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `mexico.giral` (citas.md) |
| `cita.mexico.giral.palabras` | 7446 → «7.446» | n | V2 | [C] nwords de la fila V2 107375 |
| `cita.mexico.giral.v3` | 121507 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `mexico.giral` (citas.md) |
| `cita.mexico.lugar.v3` | 121495 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `mexico.lugar` (citas.md) |
| `cita.mexico.orden.V2` | 107371 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `mexico.orden` (citas.md) |
| `cita.mexico.orden.v3` | 121500 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `mexico.orden` (citas.md) |
| `cita.mexico.permanente.v3` | 121466 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `mexico.permanente` (citas.md) |
| `cita.mexico.promesa.V2` | 107372 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `mexico.promesa` (citas.md) |
| `cita.mexico.promesa.v3` | 121502 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `mexico.promesa` (citas.md) |
| `cita.pistola.oriol.V2` | 74621 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `pistola.oriol` (citas.md) |
| `cita.pistola.oriol.v3` | 84041 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `pistola.oriol` (citas.md) |
| `cita.pistola.prieto.V2` | 74619 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `pistola.prieto` (citas.md) |
| `cita.pistola.prieto.golpes.V2` | 74619 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `pistola.prieto.golpes` (citas.md) |
| `cita.pistola.prieto.golpes.palabras` | 293 | n | V2 | [C] nwords de la fila V2 74619 |
| `cita.pistola.prieto.golpes.v3` | 84039 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `pistola.prieto.golpes` (citas.md) |
| `cita.pistola.tumulto.V2` | 74608 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `pistola.tumulto` (citas.md) |
| `cita.pistola.tumulto.v3` | 84026 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `pistola.tumulto` (citas.md) |
| `cita.religiosa.apertura.v3` | 7387 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `religiosa.apertura` (citas.md) |
| `cita.religiosa.art24.V2` | 6628 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `religiosa.art24` (citas.md) |
| `cita.religiosa.art24.v3` | 7398 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `religiosa.art24` (citas.md) |
| `cita.religiosa.azana.V2` | 6748 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `religiosa.azana` (citas.md) |
| `cita.religiosa.azana.palabras` | 6009 → «6.009» | n | V2 | [C] nwords de la fila V2 6748 |
| `cita.religiosa.azana.v3` | 7531 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `religiosa.azana` (citas.md) |
| `cita.religiosa.cierre.V2` | 6999 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `religiosa.cierre` (citas.md) |
| `cita.religiosa.cierre.v3` | 7807 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `religiosa.cierre` (citas.md) |
| `cita.religiosa.resultado.V2` | 6994 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `religiosa.resultado` (citas.md) |
| `cita.religiosa.resultado.v3` | 7800 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `religiosa.resultado` (citas.md) |
| `cita.sufragio.art34.texto.V2` | 12785 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.art34.texto` (citas.md) |
| `cita.sufragio.art34.texto.v3` | 14216 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.art34.texto` (citas.md) |
| `cita.sufragio.campoamor.antes.V2` | 5422 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.campoamor.antes` (citas.md) |
| `cita.sufragio.campoamor.antes.v3` | 6077 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.campoamor.antes` (citas.md) |
| `cita.sufragio.campoamor.ciudadana.V2` | 5424 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.campoamor.ciudadana` (citas.md) |
| `cita.sufragio.campoamor.silencio.V2` | 5424 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.campoamor.silencio` (citas.md) |
| `cita.sufragio.campoamor.silencio.palabras` | 1460 → «1.460» | n | V2 | [C] nwords de la fila V2 5424 |
| `cita.sufragio.campoamor.silencio.v3` | 6079 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.campoamor.silencio` (citas.md) |
| `cita.sufragio.kent.V2` | 5419 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.kent` (citas.md) |
| `cita.sufragio.kent.palabras` | 1053 → «1.053» | n | V2 | [C] nwords de la fila V2 5419 |
| `cita.sufragio.kent.v3` | 6074 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.kent` (citas.md) |
| `cita.sufragio.ordinaria.V2` | 5453 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.ordinaria` (citas.md) |
| `cita.sufragio.ordinaria.v3` | 6110 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.ordinaria` (citas.md) |
| `cita.sufragio.presidencia.V2` | 5423 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.presidencia` (citas.md) |
| `cita.sufragio.presidencia.v3` | 6078 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.presidencia` (citas.md) |
| `cita.sufragio.resultado.V2` | 5453 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.resultado` (citas.md) |
| `cita.sufragio.resultado.v3` | 6110 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `sufragio.resultado` (citas.md) |


### 8 · Marcadores de otros dueños que usa este copy

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `busqueda.casas_viejas.m1933_02` | 114 | n | v3 | [C] FTS5 MATCH '"casas viejas"' {'desde': '1933-02-01', 'hasta': '1933-02-28'} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; febrero de 1933, todas las filas |
| `busqueda.casas_viejas.m1933_02_habla` | 102 | n | v3 | [C] FTS5 MATCH '"casas viejas"' {'desde': '1933-02-01', 'hasta': '1933-02-28', 'habla': True} sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; febrero de 1933, «Solo lo que se habla» |
| `busqueda.casas_viejas.n` | 375 | n | v3 | [C] FTS5 MATCH '"casas viejas"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; todo el corpus, todas las filas |
| `busqueda.catolica.n` | 6 | n | v3 | [C] FTS5 MATCH '"españa ha dejado de ser catolica"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; consulta: "España ha dejado de ser católica" |
| `busqueda.catolica.puesto_azana` | 4 | n | v3 | [C] puesto de v3 7531 (Azaña) con ORDER BY bm25(speeches_fts), s.id |
| `busqueda.voto_union.n` | 40 | n | v3 | [C] FTS5 MATCH '"voto femenino" OR "voto de la mujer"'  sobre speeches_fts (unicode61, remove_diacritics 2), como el explorador; consulta del explorador: "voto femenino" \| "voto de la mujer" |
| `busquedas.fecha` | 22-IX-2026 → «22 de septiembre de 2026» | fecha · formato `fecha_larga` | v3 | [M] fecha de los recuentos del buscador |
| `sesiones.fechas_dobles` | 3 → «tres» | n · formato `letra` | V2 | marcador de otro dueño: base.py; se usa tal cual |
| `sesiones.n` | 755 | n | V2 | [C] sesiones de la V2 (claves date, num_session) |
