# Marcadores · inicio (`/[lang]/`)

**Recalculados el 22-09-2026** sobre las fuentes primarias, con su huella comprobada: V2 (MD5 `360332a0…`), v3
(`corpus.sqlite`, sha256 `3a0d8b2d…`), metadatos del proyecto (`sessions.json`, sha256 `b3295e99…`), API de Dataverse y
manifiesto del explorador (`exportador/instantaneas/2026-09-22/`). Guion: `docs/marcadores/comprobar_comun_inicio.py`
(94 de 94 correctas; la 94.ª, `voto.listas.sesiones`, desde la fase 2). Recuento de palabras: `docs/marcadores/contar_inicio.py`.

**Fase 2 (corrector del copy, 22-09-2026):** `voto.listas.sesiones` nuevo en Inicio (el total al lado de las seis
«escogidas», plan H3); `explorador.gz.bytes` con formato `peso_dec0` (D-26 (a)); la nota de `voto.n` ya no da 962 / 387,
que solo contaban «dijeron sí» (REVISION_FASE1 P3-12).

El exportador debe escribir exactamente estos valores y **fallar** si el que calcula es otro. Dueño de cada clave en el
exportador: `base.py` salvo `voto.*`, que es de `sesiones.py` (F26). Tipos y formatos, los de `lib/cifras.ts`.

## 1. Cifras de `src/data/cifras.json`

### 0 y 1 · Portada y tesis

| clave | valor esperado | t · formato en el copy | base | cómo se calcula |
|---|---|---|---|---|
| `fila.luz.id.V2` | 71330 | id · formato `id` | V2 | Fila V2 cuyo `speech` es exactamente `Luz y taquigrafos.` (sin tilde), `date` 1934-06-08, sesión 96, `order` 39, `speaker` «El Sr. JIMÉNEZ FERNÁNDEZ:», `rep_id` 456 |
| `fila.luz.id.v3` | 80306 | id · formato `id` | v3 | Fila v3 del 1934-06-08 con el mismo `speech` (`ord` 48). Aserto: el texto de las dos filas es idéntico |
| `fila.luz.nwords` | 3 → «tres» | n · formato `letra` | V2 | `nwords` de V2 71330 |
| `sesiones` | 755 | n | V2 | Claves distintas (`date`, `num_session`); 752 fechas (tres días con dos sesiones). También en la credencial y en la descripción. Mismo nombre que en `marcadores/base.md` |

Controles del guion, sin marcador: V2 71329 (Alba) dice «los suplicatorios han de tratarse en sesión secreta»; V2 71331
dice «no he visto quién ha interrumpido».

### 2 · Calendario (F01c)

| clave | valor esperado | t · formato | base | cómo se calcula |
|---|---|---|---|---|
| `sesion.primera` | 1931-07-14 → «14 de julio de 1931» | fecha · formato `fecha_larga` | V2 | `min(date)` |
| `sesion.ultima` | 1945-11-09 → «9 de noviembre de 1945» | fecha · formato `fecha_larga` | V2 | `max(date)` |
| `sesiones.tras_18jul` | 14 → «catorce» | n · formato `letra` | V2 | Sesiones con `date` > 1936-07-18: las 61–74 de 1936-1939 |
| `palabras.tras_18jul.pct` | 0,0083484 → «0,83 %» | pct (dec 2) | V2 | Σ `nwords` de esas sesiones / Σ `nwords` del corpus = 203.167 / 24.335.896 |
| `meses.salto` | 70 | n | V2 | Meses de 1939-03 a 1944-12 (ambos incluidos); ninguno tiene sesión. Lo usa `fig.F01.salto` (`cortes.md`) |
| `meses.con_sesion` | 64 | n | V2 | Meses AAAA-MM distintos con al menos una fila (de 173 entre 1931-07 y 1945-11). Lo usa la tabla de F01c |

Controles sin marcador: la numeración de cada legislatura va de 1 al último (405, 276, 74) sin huecos ni repetidos, y
cada número tiene una sola fecha; las 14 sesiones posteriores al 18-VII-1936 son «Extracto oficial» en los metadatos
del proyecto (9 de guerra y 5 de México).

### 3 · Votaciones (F26 en su versión de Inicio)

Una clave por votación: `voto.<sí>-<no>` (la Constitución, `voto.368-466`, porque no hubo noes y el Diario da el total
de la Cámara). Las ids son de la fila con el resultado; la lista puede ir en otra (nota).

| clave | valor esperado | t | base | cómo se calcula |
|---|---|---|---|---|
| `voto.n` | 6 → «seis» | n · formato `letra` | V2 | Filas de `votaciones.json` (las seis de F26). **Es una selección**, «escogidas»: el total va al lado (`voto.listas.sesiones`) |
| `voto.listas.sesiones` | 405 | n | V2 | Sesiones (`date`, `num_session`) con al menos una fila cuyo `speech`, sin acentos y en minúsculas, contiene «señores que dijeron» o «señores que han dicho» seguido de «sí» o «no»: 1.023 filas en 405 sesiones (por legislatura, 532 / 408 / 83 filas). La misma definición y el mismo valor que en `marcadores/sesiones.md`. Cota inferior: el reconocimiento óptico rompe algún encabezado (el del Estatuto, V2 37178) |
| `voto.161-121.si` · `.no` | 161 · 121 | n | V2 | V2 5453: «Total, 161.» … «Total, 121.» (art. 34 del proyecto, 1-X-1931) |
| `voto.161-121.V2` · `.v3` | 5453 · 6110 | id | V2 · v3 | En la V2, dentro de la fila de la Presidencia; en la v3, fila COMENTARIOS |
| `voto.178-59.si` · `.no` | 178 · 59 | n | V2 | V2 6994: «quedó aprobado el artículo 24 por 178 votos contra 59» (13-X-1931) |
| `voto.178-59.V2` · `.v3` | 6994 · 7800 | id | V2 · v3 | — |
| `voto.368-466.si` · `.no` | 368 · 0 | n | V2 | V2 13531: «suman 466; la mitad más uno, 234. Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí» (9-XII-1931) |
| `voto.368-466.total` · `.mitad` | 466 · 234 | n | V2 | Ídem |
| `voto.368-466.V2` · `.v3` | 13531 · 15043 | id | V2 · v3 | La lista (Total, 368) está en V2 13525 y en v3 15037 |
| `voto.318-19.si` · `.no` | 318 · 19 | n | V2 | V2 37177: «Total, 318.» … «Total, 19.» (Reforma agraria, 9-IX-1932) |
| `voto.318-19.total` · `.mitad` | 462 · 232 | n | V2 | V2 37178: «suma 462. La mitad mas uno son 232» |
| `voto.318-19.V2` · `.v3` | 37177 · 41627 | id | V2 · v3 | El resultado con la mitad: V2 37178 · v3 41628 |
| `voto.314-24.si` · `.no` | 314 · 24 | n | V2 | V2 37178: «Total, 314.» … «Total, 24.» (Estatuto de Cataluña, 9-IX-1932; el encabezado «dijeron sí» lo perdió el reconocimiento óptico) |
| `voto.314-24.V2` · `.v3` | 37178 · 41629 | id | V2 · v3 | — |
| `voto.238-5.si` · `.no` | 238 · 5 | n | V2 | V2 102358: «Total, 238.» … «Total, 5.» (7-IV-1936) |
| `voto.238-5.total` · `.mitad` | 417 · 209 | n | V2 | V2 102359 (v3 115676): «son 417; la mitad más uno, 209». **El plan no la recogía** |
| `voto.238-5.V2` · `.v3` | 102358 · 115675 | id | V2 · v3 | — |

Controles sin marcador: V2 5335 («uno y otro sexo»: el art. 34 es el del voto); V2 6968 («Ordenes religiosas»: el art.
24); V2 102304 (la proposición invoca el art. 81 y el decreto de disolución).

### 4 · La fila

| clave | valor esperado | t · formato | base | cómo se calcula |
|---|---|---|---|---|
| `filas.V2` | 107551 → «107.551» | n | V2 | Véase `marcadores/comun.md` |
| `fila.presidencia.id.V2` · `.id.v3` | 5423 · 6078 | id · formato `id` | V2 · v3 | «Ruego a la Cámara que guarde silencio.», idéntico en las dos; sesión 48, 1-X-1931 |
| `fila.presidencia.nwords` | 7 → «siete» | n · formato `letra` | V2 | `nwords` de V2 5423 |
| `fila.campoamor.id.V2` · `.id.v3` | 5424 · 6079 | id · formato `id` | V2 · v3 | Las dos empiezan por «Yo ruego a la Cámara que me escuche en silencio» |
| `fila.campoamor.nwords` | 1460 → «1.460» | n | V2 | `nwords` de V2 5424 |

Control: 5424 va justo detrás de 5423 (`order` 25 → 26) en la misma sesión.

### 5 · Puertas (registro)

| clave | valor esperado | t | base | cómo se calcula |
|---|---|---|---|---|
| `sesion.1931-10-01-48.filas` | 395 | n | V2 | Filas con `date` 1931-10-01 y `num_session` 48 |
| `sesion.1931-10-13-55.filas` | 378 | n | V2 | Ídem, 1931-10-13, 55 |
| `sesion.1932-05-27-173.filas` | 44 | n | V2 | Ídem, 1932-05-27, 173 |
| `sesion.1933-02-02-288.filas` | 155 | n | V2 | Ídem, 1933-02-02, 288 |
| `sesion.1934-07-04-112.filas` | 255 | n | V2 | Ídem, 1934-07-04, 112 |
| `sesion.1936-06-16-45.filas` | 159 | n | V2 | Ídem, 1936-06-16, 45 |
| `sesion.1936-07-01-54.filas` | 125 | n | V2 | Ídem, 1936-07-01, 54 |
| `sesion.1939-02-01-69.filas` | 16 | n | V2 | Ídem, 1939-02-01, 69 |
| `puerta.mexico-1945.filas` | 183 | n | V2 | 5 + 56 + 27 + 95: sesiones 71 (17-VIII), 72, 73 y 74 (7, 8 y 9-XI-1945) |
| `puerta.mexico-1945.sesiones` | 4 → «cuatro» | n · formato `letra` | V2 | Sesiones de esa puerta con filas. Hoy no lo usa Inicio (sí `sesiones.md`) |

Controles sin marcador: las cinco últimas filas del 1-X-1931 (V2 5788–5792) empiezan por «Pido la palabra.» y la última
acaba en «El Sr. Ministro de»; la sesión 48 tiene la incidencia `truncated_end` en los metadatos del proyecto; V2 6748
contiene «España ha dejado de ser católica».

### 7 · Por dónde empezar

| clave | valor esperado | t · formato | base | cómo se calcula |
|---|---|---|---|---|
| `explorador.gz.bytes` | 111733652 | peso · formato `peso_dec0` | explorador | `corpus_servido.bytes_gz` del manifiesto del explorador publicado (tres partes: 45.000.000 + 45.000.000 + 21.733.652). Se imprime en **unidad decimal** (bytes / 10⁶, sin decimales): «unos 112 MB comprimidos», regla de la crítica mientras rige D-26 (a). En la unidad de Dataverse serían 106,6 MB. El valor esperado va en bytes para que el aserto no lo lea en MB binarios |
| `dv.csv.bytes` | 165785782 → «158,1 MB» | peso · formato `peso` | dv | `filesize` de `2REP_Diaries.csv` en la API de Dataverse, / 1.024², un decimal |
| `dv.thqcmi.cita` | la cita entera | texto | dv | Véase `marcadores/comun.md` |

## 2. Variables de plantilla (las rellena el componente)

| clave del copy | variables | de dónde salen |
|---|---|---|
| `inicio.f01c.nota.etapa` | `{{etapa}}` (`comun.etapa.<id>.nombre`) · `{{n}}` (sesiones de la etapa, base V2; no se llama `sesiones` para no chocar con la cifra `sesiones`) | `etapas.json` (dueño: `base.py`) |

Las demás notas de F01c y de F26 en Inicio son las de su familia: `fig.F01.nota.*` (`cortes.md`) y `fig.F26.nota*`
(`sesiones.md`), con sus variables.

## 3. Lista blanca de `check-i18n` para Inicio

- Fechas de sesión: «8 de junio de 1934», «1 de octubre de 1931», «18 de julio de 1936» y las del registro
  («1-X-1931», «13-X-1931», «27-V-1932», «2-II-1933», «4-VII-1934», «16-VI y 1-VII-1936», «1-II-1939»,
  «17-VIII y 7–9-XI-1945»).
- Números de artículo: «artículo 34», «Art. 34», «Art. 24», «Art. 81».
- Años de un hecho: «1931» y «1936» en `inicio.votaciones.seleccion`; «1939» y «1944» en `inicio.f01c.salto`; «1936»
  en `inicio.f26.voto.238-5`; «1931–1945» del título del depósito (meta, credencial).
- Los nombres de la lista blanca de `comun` (V2, v3, DOI, CC BY 4.0).

## 4. Citas que el aserto de la compilación debe comprobar letra a letra

| clave | texto (sin comillas ni «…») | V2 | v3 |
|---|---|---|---|
| `inicio.tesis.grito` | `Luz y taquigrafos.` (sin tilde, así en las dos filas) | 71330 | 80306 |
| `inicio.fila.presidencia` | `Ruego a la Cámara que guarde silencio.` | 5423 | 6078 |
| `inicio.fila.campoamor` | `Yo ruego a la Cámara que me escuche en silencio` (comienzo de la fila) | 5424 | 6079 |
| `inicio.puertas.cuestion-religiosa-1931.que` | `España ha dejado de ser católica` (dentro de la fila) | 6748 | 7531 |

### F01c · anotaciones editoriales (fase 2, grupo 1)

| clave | valor esperado | t · formato | base | cómo se calcula |
|---|---|---|---|---|
| `f01.mes_max` | 1934-06 → «junio de 1934» | fecha · formato `mes` | V2 | mes con más palabras (suma de `nwords` por mes) · módulo: cortes.py |
| `f01.mes_max.palabras` | 870.822 | n | V2 | palabras de junio de 1934 · módulo: cortes.py |
| `f01.mes_max.sesiones` | 19 | n | V2 | sesiones de junio de 1934 · módulo: cortes.py |
| `etapa.IV.sesiones` | 9 → «nueve» | n · formato `letra` | V2 | claves de sesión de la etapa IV · módulo: base.py |
| `etapa.IV.meses` | 29 | n | V2 | 1936-10 → 1939-02 · módulo: base.py |
| `f01.clase.0.meses` | 13 → «trece» | n · formato `letra` | V2 | leyenda del tono de F01 (clase 1) · módulo: cortes.py |
| `f01.clase.4.meses` | 12 → «doce» | n · formato `letra` | V2 | leyenda del tono de F01 (clase 5) · módulo: cortes.py |
