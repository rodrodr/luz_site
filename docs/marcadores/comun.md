# Marcadores · comun (cabecera, pie, frases fijas, componentes, glosario, raíz y 404)

**Recalculados el 22-09-2026** sobre las fuentes primarias, con su huella comprobada, por
`docs/marcadores/comprobar_comun_inicio.py` (94 de 94 comprobaciones correctas, junto con los de Inicio). El exportador
(`exportador/modulos/base.py`) debe escribir en `src/data/cifras.json` exactamente estos valores y **fallar** si el que
calcula es otro.

Forma de cada cifra (contrato § Cifras): `{ "v", "t", "base", "clave", "f", "d" }`. Tipos de `lib/cifras.ts`: `n`
(agrupado: «107.551») · `id` y `anio` (sin agrupar) · `pct` (proporción) · `peso` (bytes) · `fecha` (AAAA-MM-DD) ·
`texto`.

## 1. Cifras de `src/data/cifras.json`

| clave | valor esperado | t | base | cómo se calcula |
|---|---|---|---|---|
| `filas.V2` | 107551 → «107.551» | n | V2 | Número de filas de `2REP_Diaries.csv` (THQCMI V2.0, MD5 `360332a0ff1327671530f15eed46ac0c`), leído con `sep=";"`. Lo usan el pie, ↺ 13 y Inicio 4 |
| `filas.v3` | 121700 → «121.700» | n | v3 | `select count(*) from speeches` en `corpus.sqlite` (sha256 `3a0d8b2d…`); coincide con `n_speeches` del manifiesto del explorador publicado. Lo usan el pie y ↺ 13 |
| `dv.thqcmi.autores` | «Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo» | texto | dv | La cita que da la API (`/api/datasets/:persistentId/versions/:latest-published/citation`), con las entidades HTML decodificadas (`&iacute;` → «í») y sin etiquetas, hasta «, 2026,». Es la lista `author` de los metadatos, unida con «; ». La usan `comun.pie.autoria` y `comun.cita.figura` |
| `dv.version` | «V2.0» | texto | dv | `"V" + latestVersion.versionNumber + "." + versionMinorNumber` de THQCMI |
| `dv.cgocus.version` | «V1.1» | texto | dv | Ídem, de CGOCUS. Cambia a «V2.0» si se deposita (D-3); ↺ 2 y ↺ 10 se revisan entonces |
| `dv.thqcmi.cita` | «Rodrigues-Silveira, Rodrigo; García-Díez, Fátima; Llamazares, Iván; Martínez-Barahona, Elena; Barreto Martín, Eduardo, 2026, "Luz y Taquígrafos: Parliamentary Debates in the Second Spanish Republic, 1931–1945", https://doi.org/10.7910/DVN/THQCMI, Harvard Dataverse, V2» | texto | dv | La misma respuesta de la API, decodificada y sin la etiqueta `<a>`, entera. Se copia tal cual, con su «V2» (plan § La escalera, regla 5). La usa Inicio 7 y `lib/cita.ts` |
| `dv.cgocus.cita` | «… 2026, "Afinidades Elegidas: Parliamentary Cosponsorship Networks of the Spanish Second Republic (1931-1939)", https://doi.org/10.7910/DVN/CGOCUS, Harvard Dataverse, V1, UNF:6:CMFrKjuOq5l9fBChyzsMsQ== [fileUNF]» | texto | dv | Ídem, de CGOCUS: termina en «V1» y su UNF; se rotula aparte «CGOCUS V1.1» (`comun.cita.cgocus.nota`) |
| `dv.csv.bytes` | 165785782 → «158,1 MB» (formato `peso`) | peso | dv | `filesize` de `2REP_Diaries.csv` en la API, / 1.024², un decimal (la unidad de Dataverse). Lo usan `inicio.empezar.programar` y `datos.empezar.s3.peso` |
| `explorador.gz.bytes` | 111733652 | peso · formato `peso_dec0` | explorador | `corpus_servido.bytes_gz` del manifiesto del explorador publicado. Se imprime en unidad decimal (bytes / 10⁶, sin decimales): «unos 112 MB comprimidos» (plan D-26 (a), regla de la crítica). Lo usan `inicio.empezar.sin_programar`, `datos.empezar.s2.peso` y `explorador.empezar.paso2` |

## 2. Valores de configuración (no están en `cifras.json`)

`lib/cifras.ts` los resuelve desde `config/enlaces.ts › PENDIENTES_DEL_INVESTIGADOR` (dueño: andamiaje).

| clave | valor hoy | uso | nota |
|---|---|---|---|
| `edicion_pagina` | «0.1» | `comun.pie.ediciones` | Se sube con cada publicación (`CHANGELOG.md`) |
| ~~`D-20`~~ | — | `comun.fija.formulario.motivo` | Ya no es un marcador: el investigador dio el motivo el 23-09-2026 y va como texto del copy |

## 3. Variables de plantilla (las rellena el componente, no `cifras.json`)

Cada una llega ya formateada; si es una cifra, con su envoltorio `fmt.dato(…, base)`.

| clave del copy | variables | de dónde salen |
|---|---|---|
| `comun.consulta.recuento`, `.una` | `{{n}}` (n, base v3) · `{{fecha}}` (fecha larga) | `busquedas.json` de cada página (dueños: sesiones, explorador), con la fecha de la consulta |
| `comun.sello.exportado` | `{{fecha}}` | `sello.json › exportado` |
| `comun.cita.figura` | `{{titulo}}` · `{{url}}` · `{{base}}` · `{{fecha}}` | `lib/cita.ts › citaFigura` (título de `figuras.md`, base con huella del sello) |
| `comun.cita.pasaje` | `{{diario}}` · `{{numero}}` · `{{fecha}}` · `{{paginas}}` · `{{edicion}}` · `{{id}}` | `lib/cita.ts › citaPasaje`; los cuatro primeros, metadatos del proyecto (base proyecto); el id, con formato `id` y su edición |
| `comun.captura.pie` | `{{fecha}}` | `LEEME.md` de las capturas del explorador |
| `comun.isla.posicion` | `{{i}}` · `{{total}}` | la isla, al recorrer una figura con el teclado |

## 4. Lista blanca de `check-i18n` para estos textos (cadenas con dígitos que no son cifras)

- **Título del depósito:** «1931–1945» (`comun.cabecera.descriptor`).
- **Versiones y conjuntos:** «V1», «V1.1», «V2», «V2.0», «v3», «CGOCUS V1.1», «THQCMI».
- **Identificadores:** «doi:10.7910/DVN/THQCMI», «doi:10.7910/DVN/CGOCUS».
- **Números de figura del registro** (F35 los enseña en su tabla; `versiones.bases.entrada` nombra las figuras sin
  pestañas, decisión del 23-09-2026): «F18», «F19», «F26».
- **Licencias:** «CC BY 4.0».
- **Rótulos de la columna `legislature` y de CGOCUS:** «1931-1933», «1933-1935», «1936-1939», «1933-1936». ↺ 10
  (fase 2) dice qué archivos de CGOCUS usan «1933-1936»: el censo (`representative_metadata`) y las relaciones
  (`2REP_coauthor_edgelist`); `2REP_cosponsorship` dice «1933-1935» (6.528 filas). Medido el 22-09-2026 sobre las copias
  locales cuyo MD5 comprueba el exportador.
- **Frases fijas del plan:** «sesión 48» (↺ 8) y «10 de diciembre de 1935» (↺ 10).
- **Referencia bibliográfica:** «(*No fue posible la paz*, 1968, p. 524)» (`comun.hemiciclo.pie`).
- **Años de un hecho:** los de las etapas (`comun.etapa.*.anos`, «elegida en 1933», «Cortes de 1936»,
  «hasta la guerra») y el «1936» del hemiciclo.
- **Tecla del explorador:** «/» (↺ 5).

## 5. Qué NO lleva marcador, a propósito

- El pie del hemiciclo y la raíz no llevan ninguna cifra (plan, ficha H).
- `comun.glosario.*` define términos sin cifras: las cifras de cada término viven en su página.

## 6. Estado en `src/data/cifras.json` (19:18 del 22-09-2026)

Las nueve claves de § 1 y las dos de peso ya están exportadas, con el valor esperado y su base.
