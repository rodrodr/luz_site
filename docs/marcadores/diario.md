# Marcadores · diario (El Diario de Sesiones, F27 y F28)

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

Dueño en el exportador: `exportador/modulos/diario.py` (F27, F28 y las cifras `fuente.*`), salvo los de otros dueños
(última sección). F28 marca **trece** filas (ocho órdenes y cinco acotaciones; `f28.marcas`) y una petición en contorno; la fila
ajena (V2 64659) va en la tabla y no se dibuja.


### 1 · La fuente, F27 y F28

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `f27.1.fecha` | 20-VII-1931 → «20 de julio de 1931» | fecha | V2 | [C] date de la fila |
| `f27.10.fecha` | 8-VII-1936 → «8 de julio de 1936» | fecha | V2 | [C] date de la fila |
| `f27.2.fecha` | 9-IV-1932 → «9 de abril de 1932» | fecha | V2 | [C] date de la fila |
| `f27.3.fecha` | 3-V-1932 → «3 de mayo de 1932» | fecha | V2 | [C] date de la fila |
| `f27.4.fecha` | 19-VII-1933 → «19 de julio de 1933» | fecha | V2 | [C] date de la fila |
| `f27.5.fecha` | 3-VIII-1933 → «3 de agosto de 1933» | fecha | V2 | [C] date de la fila |
| `f27.6.fecha` | 8-VI-1934 → «8 de junio de 1934» | fecha | V2 | [C] date de la fila |
| `f27.7.fecha` | 13-XI-1934 → «13 de noviembre de 1934» | fecha | V2 | [C] date de la fila |
| `f27.8.fecha` | 29-I-1935 → «29 de enero de 1935» | fecha | V2 | [C] date de la fila |
| `f27.9.fecha` | 22-XI-1935 → «22 de noviembre de 1935» | fecha | V2 | [C] date de la fila |
| `f27.balbontin` | 3 → «tres» | n · formato `letra` | V2 | [C] de las diez filas de F27, las de José Antonio Balbontín (rep_id 98) |
| `f27.desde` | 20-VII-1931 → «20 de julio de 1931» | fecha | V2 | [C] primera fila |
| `f27.hasta` | 8-VII-1936 → «8 de julio de 1936» | fecha | V2 | [C] última fila |
| `f27.n` | 10 → «diez» | n · formato `letra` | V2 | [C] filas V2 con «luz y taquígrafos» (texto plegado); las mismas diez en v3 por FTS5 |
| `f28.15abril.ordenes` | 3 → «tres» | n · formato `letra` | V2 | [L] órdenes del 15-IV-1936: V2 102484, 102486 y 102492 (v3 115828, 115830, 115836) |
| `f28.acotacion.1.fecha` | 6-V-1936 → «6 de mayo de 1936» | fecha | V2 | [C] fecha |
| `f28.acotacion.2.fecha` | 6-V-1936 → «6 de mayo de 1936» | fecha | V2 | [C] fecha |
| `f28.acotacion.3.fecha` | 16-VI-1936 → «16 de junio de 1936» | fecha | V2 | [C] fecha |
| `f28.acotacion.4.fecha` | 16-VI-1936 → «16 de junio de 1936» | fecha | V2 | [C] fecha |
| `f28.acotacion.5.fecha` | 1-VII-1936 → «1 de julio de 1936» | fecha | V2 | [C] fecha |
| `f28.acotaciones` | 5 → «cinco» | n · formato `letra` | V2 | [C] acotaciones «no se consigna(n) por orden» (3) y «no constan por orden» (2) |
| `f28.acotaciones.consigna` | 3 | n | V2 | [C] acotaciones «no se consigna(n) por orden» |
| `f28.acotaciones.constan` | 2 | n | V2 | [C] acotaciones «no constan por orden» |
| `f28.ajena` | 1 | n | V2 | [L] fila con la fórmula en otro sentido (V2 64659) |
| `f28.ajena.fecha` | 21-II-1934 → «21 de febrero de 1934» | fecha | V2 | [C] fecha de la fila ajena |
| `f28.formula.filas` | 10 → «diez» | n · formato `letra` | V2 | [C] filas V2 cuyo texto plegado dice «no constará(n)» y, a menos de 60 caracteres, «diario»; las mismas diez en v3 (FTS5 NEAR) |
| `f28.fts_plural` | 7 → «siete» | n · formato `letra` | v3 | [C] FTS5 exacta «no constarán en el Diario» en v3 |
| `f28.marcas` | 13 | n | V2 | [CALC] marcas de F28: órdenes + acotaciones |
| `f28.orden.1.fecha` | 10-XII-1931 → «10 de diciembre de 1931» | fecha | V2 | [C] fecha |
| `f28.orden.2.fecha` | 7-II-1933 → «7 de febrero de 1933» | fecha | V2 | [C] fecha |
| `f28.orden.3.fecha` | 9-II-1933 → «9 de febrero de 1933» | fecha | V2 | [C] fecha |
| `f28.orden.4.fecha` | 15-IV-1936 → «15 de abril de 1936» | fecha | V2 | [C] fecha |
| `f28.orden.5.fecha` | 15-IV-1936 → «15 de abril de 1936» | fecha | V2 | [C] fecha |
| `f28.orden.6.fecha` | 15-IV-1936 → «15 de abril de 1936» | fecha | V2 | [C] fecha |
| `f28.orden.7.fecha` | 6-V-1936 → «6 de mayo de 1936» | fecha | V2 | [C] fecha |
| `f28.orden.8.fecha` | 1-VII-1936 → «1 de julio de 1936» | fecha | V2 | [C] fecha |
| `f28.ordenes` | 8 → «ocho» | n · formato `letra` | V2 | [L] de esas nueve, órdenes de la Presidencia, leídas una a una |
| `f28.ordenes.1936` | 5 → «cinco» | n · formato `letra` | V2 | [L] órdenes entre abril y julio de 1936 |
| `f28.peticion` | 1 | n | V2 | [L] petición de un diputado (Calvo Sotelo, V2 104406) |
| `f28.peticion.fecha` | 3-VI-1936 → «3 de junio de 1936» | fecha | V2 | [C] fecha de la petición |
| `fuente.barriga.v2.filas` | 1 | n | V2 | [C] filas V2 con «tiros a la barriga» (texto plegado, sin coma) |
| `fuente.cita_diario.filas` | 1508 → «1.508» | n | V2 | [C] filas V2 cuyo texto plegado contiene «diario de sesiones» |
| `fuente.cita_diario.sesiones` | 559 | n | V2 | [C] sesiones de esas filas |
| `fuente.comentarios.v3` | 12654 → «12.654» | n | v3 | [C] filas COMENTARIOS de la v3 |
| `fuente.facsimil.pagina` | 1353 | id · formato `id` | proyecto | [M] página impresa del detalle del núm. 48 (PDF del proyecto, pág. 8 del archivo; dentro del rango de páginas de la sesión en sessions.json) |
| `fuente.ibarruri.V2` | 105336 | id | V2 | [C] fila V2 de Dolores Ibárruri el 16-VI-1936 |
| `fuente.no_perciben.filas` | 1521 → «1.521» | n | V2 | [C] filas V2 cuyo texto plegado contiene «palabras que no se perciben» |
| `fuente.no_perciben.filas_v3` | 1524 → «1.524» | n | v3 | [C] FTS5 «palabras que no se perciben» en v3 |
| `fuente.no_perciben.sesiones` | 577 | n | V2 | [C] sesiones de esas filas |
| `fuente.paginas.den` | 755 | n | proyecto | [M] sesiones en sessions.json |
| `fuente.paginas.total` | 28780 → «28.780» | n | proyecto | [M] suma de pdf_pages (páginas de los archivos del proyecto, portadas incluidas) |
| `fuente.paginas.verificadas` | 741 | n | proyecto | [M] sesiones con page_status contiguous, verso_blank o corrected |
| `fuente.serie.constituyentes` | 405 | n | proyecto | [M] sesiones con ese título de Diario en sessions.json |
| `fuente.serie.cortes` | 336 | n | proyecto | [M] sesiones con ese título de Diario en sessions.json (ídem) |
| `fuente.serie.extracto_guerra` | 9 → «nueve» | n · formato `letra` | proyecto | [M] sesiones con ese título de Diario en sessions.json (ídem) |
| `fuente.serie.extracto_mexico` | 5 → «cinco» | n · formato `letra` | proyecto | [M] sesiones con ese título de Diario en sessions.json (ídem) |
| `fuente.series.diarios` | 2 → «dos» | n · formato `letra` | proyecto | [M] títulos que empiezan por «Diario» |
| `fuente.series.extractos` | 2 → «dos» | n · formato `letra` | proyecto | [M] títulos que empiezan por «Extracto» |
| `fuente.series.n` | 4 → «cuatro» | n · formato `letra` | proyecto | [M] títulos de Diario distintos en sessions.json |
| `fuente.sumarios.v3` | 755 | n | v3 | [C] filas SUMARIO de la v3 |


### 2 · Votaciones citadas

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `voto.161-121.V2` | 5453 | id · formato `id` | V2 | [C] id de la fila V2 que imprime el resultado |
| `voto.161-121.v3` | 6110 | id · formato `id` | v3 | [C] id de la fila v3 con el mismo texto |


### 3 · Ids y palabras de las citas

Como en `marcadores/sesiones.md` § 7.

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `cita.diario.alba.reglamento.V2` | 71331 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.alba.reglamento` (citas.md) |
| `cita.diario.alba.reglamento.v3` | 80307 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.alba.reglamento` (citas.md) |
| `cita.diario.alba.secreta.V2` | 71329 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.alba.secreta` (citas.md) |
| `cita.diario.alba.secreta.v3` | 80305 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.alba.secreta` (citas.md) |
| `cita.diario.campoamor.lee.V2` | 5424 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.campoamor.lee` (citas.md) |
| `cita.diario.campoamor.lee.v3` | 6079 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.campoamor.lee` (citas.md) |
| `cita.diario.cano.tachado.V2` | 82129 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.cano.tachado` (citas.md) |
| `cita.diario.cano.tachado.v3` | 92599 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.cano.tachado` (citas.md) |
| `cita.diario.eso_no_basta.V2` | 102492 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.eso_no_basta` (citas.md) |
| `cita.diario.eso_no_basta.v3` | 115837 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.eso_no_basta` (citas.md) |
| `cita.diario.grito.V2` | 71330 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.grito` (citas.md) |
| `cita.diario.grito.palabras` | 3 → «tres» | n · formato `letra` | V2 | [C] nwords de la fila V2 71330 |
| `cita.diario.grito.v3` | 80306 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.grito` (citas.md) |
| `cita.diario.kent.interrupcion.V2` | 5419 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.kent.interrupcion` (citas.md) |
| `cita.diario.kent.interrupcion.v3` | 6074 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.kent.interrupcion` (citas.md) |
| `cita.diario.maura.censura.V2` | 82369 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.maura.censura` (citas.md) |
| `cita.diario.maura.censura.v3` | 92880 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.maura.censura` (citas.md) |
| `cita.diario.maurin.V2` | 106747 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.maurin` (citas.md) |
| `cita.diario.maurin.v3` | 120751 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.maurin` (citas.md) |
| `cita.diario.nota.volumen.v3` | 121110 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.nota.volumen` (citas.md) |
| `cita.diario.perciben.y.constan.V2` | 103250 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.perciben.y.constan` (citas.md) |
| `cita.diario.perciben.y.constan.v3` | 116697 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.perciben.y.constan` (citas.md) |
| `cita.diario.prieto.consten.V2` | 45116 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.prieto.consten` (citas.md) |
| `cita.diario.prieto.consten.v3` | 50467 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.prieto.consten` (citas.md) |
| `cita.diario.prieto.publica.V2` | 71332 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.prieto.publica` (citas.md) |
| `cita.diario.prieto.publica.v3` | 80308 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.prieto.publica` (citas.md) |
| `cita.diario.royo.V2` | 57506 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.royo` (citas.md) |
| `cita.diario.royo.v3` | 64595 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.royo` (citas.md) |
| `cita.diario.sainz.V2` | 77318 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `diario.sainz` (citas.md) |
| `cita.diario.sainz.v3` | 87096 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `diario.sainz` (citas.md) |
| `cita.f27.1.V2` | 420 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.1` (citas.md) |
| `cita.f27.1.v3` | 472 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.1` (citas.md) |
| `cita.f27.10.V2` | 106747 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.10` (citas.md) |
| `cita.f27.10.v3` | 120751 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.10` (citas.md) |
| `cita.f27.2.V2` | 23898 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.2` (citas.md) |
| `cita.f27.2.v3` | 26612 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.2` (citas.md) |
| `cita.f27.3.V2` | 24658 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.3` (citas.md) |
| `cita.f27.3.v3` | 27477 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.3` (citas.md) |
| `cita.f27.4.V2` | 55902 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.4` (citas.md) |
| `cita.f27.4.v3` | 62718 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.4` (citas.md) |
| `cita.f27.5.V2` | 57506 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.5` (citas.md) |
| `cita.f27.5.v3` | 64595 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.5` (citas.md) |
| `cita.f27.6.V2` | 71330 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.6` (citas.md) |
| `cita.f27.6.v3` | 80306 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.6` (citas.md) |
| `cita.f27.7.V2` | 75263 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.7` (citas.md) |
| `cita.f27.7.v3` | 84760 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.7` (citas.md) |
| `cita.f27.8.V2` | 79803 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.8` (citas.md) |
| `cita.f27.8.v3` | 89910 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.8` (citas.md) |
| `cita.f27.9.V2` | 99859 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f27.9` (citas.md) |
| `cita.f27.9.v3` | 112827 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f27.9` (citas.md) |
| `cita.f28.acotacion.1.V2` | 103182 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.acotacion.1` (citas.md) |
| `cita.f28.acotacion.1.v3` | 116626 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.acotacion.1` (citas.md) |
| `cita.f28.acotacion.2.V2` | 103250 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.acotacion.2` (citas.md) |
| `cita.f28.acotacion.2.v3` | 116697 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.acotacion.2` (citas.md) |
| `cita.f28.acotacion.3.V2` | 105310 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.acotacion.3` (citas.md) |
| `cita.f28.acotacion.3.v3` | 119084 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.acotacion.3` (citas.md) |
| `cita.f28.acotacion.4.V2` | 105324 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.acotacion.4` (citas.md) |
| `cita.f28.acotacion.4.v3` | 119098 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.acotacion.4` (citas.md) |
| `cita.f28.acotacion.5.V2` | 106289 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.acotacion.5` (citas.md) |
| `cita.f28.acotacion.5.v3` | 120221 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.acotacion.5` (citas.md) |
| `cita.f28.ajena.V2` | 64659 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.ajena` (citas.md) |
| `cita.f28.ajena.v3` | 72690 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.ajena` (citas.md) |
| `cita.f28.orden.1.V2` | 13605 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.1` (citas.md) |
| `cita.f28.orden.1.v3` | 15129 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.1` (citas.md) |
| `cita.f28.orden.2.V2` | 45115 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.2` (citas.md) |
| `cita.f28.orden.2.v3` | 50466 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.2` (citas.md) |
| `cita.f28.orden.3.V2` | 45440 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.3` (citas.md) |
| `cita.f28.orden.3.v3` | 50818 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.3` (citas.md) |
| `cita.f28.orden.4.V2` | 102484 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.4` (citas.md) |
| `cita.f28.orden.4.v3` | 115828 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.4` (citas.md) |
| `cita.f28.orden.5.V2` | 102486 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.5` (citas.md) |
| `cita.f28.orden.5.v3` | 115830 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.5` (citas.md) |
| `cita.f28.orden.6.V2` | 102492 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.6` (citas.md) |
| `cita.f28.orden.6.v3` | 115836 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.6` (citas.md) |
| `cita.f28.orden.7.V2` | 103251 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.7` (citas.md) |
| `cita.f28.orden.7.v3` | 116698 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.7` (citas.md) |
| `cita.f28.orden.8.V2` | 106290 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.orden.8` (citas.md) |
| `cita.f28.orden.8.v3` | 120222 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.orden.8` (citas.md) |
| `cita.f28.peticion.V2` | 104406 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `f28.peticion` (citas.md) |
| `cita.f28.peticion.v3` | 118058 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `f28.peticion` (citas.md) |
| `cita.figueres.fotocopia.V2` | 107341 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `figueres.fotocopia` (citas.md) |
| `cita.figueres.fotocopia.v3` | 121465 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `figueres.fotocopia` (citas.md) |
| `cita.mexico.permanente.v3` | 121466 | id · formato `id` | v3 | [L] fila v3 donde está, letra a letra, la cita `mexico.permanente` (citas.md) |
| `cita.sufragio.campoamor.ciudadana.V2` | 5424 | id · formato `id` | V2 | [L] fila V2 donde está, letra a letra, la cita `sufragio.campoamor.ciudadana` (citas.md) |


### 4 · Marcadores de otros dueños que usa este copy

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `v3.comentarios` | 12654 → «12.654» | n | v3 | marcador de otro dueño: base.py; se usa tal cual |
| `v3.sumarios` | 755 | n | v3 | marcador de otro dueño: base.py; se usa tal cual |
