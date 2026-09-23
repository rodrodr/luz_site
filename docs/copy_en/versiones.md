# Copy EN · Versions (`/[lang]/datos/versiones/`)

> [nota de diseño] Traducción de `docs/copy_es/versiones.md` (congelado, 23-09-2026), según
> `docs/03a_GLOSARIO_es-en.md`. Las notas de diseño y los cambios respecto al plan están en el archivo español.

---

## Metadata

<!-- versiones.meta.titulo -->
Versions

<!-- versiones.meta.descripcion -->
What changed in each deposited version, what the explorer edition is, where each row goes and which source each figure on the site uses.

## Source badges (↺ 2)

<!-- ↺ comun.sello.V2 -->
Deposited edition (V2)

<!-- ↺ comun.sello.v3 -->
Explorer edition (v3, not deposited)

<!-- ↺ comun.sello.proyecto -->
Project metadata (not deposited; not shown in the explorer)

<!-- ↺ comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, deposited)

## Side contents

<!-- versiones.indice.titulo -->
On this page

<!-- versiones.indice.depositadas -->
Deposited versions

<!-- versiones.indice.v3 -->
The explorer edition

<!-- versiones.indice.resultado -->
What changes in a result

<!-- versiones.indice.ids -->
Identifiers

<!-- versiones.indice.bases -->
Which source each figure uses

<!-- versiones.indice.citar -->
How to cite each edition

## Header

<!-- versiones.antetitulo -->
Deposited: THQCMI {{dv.version}} · explorer: v3, not deposited

<!-- versiones.titulo -->
Which edition do I cite, and why are there two numbers?

<!-- versiones.entrada -->
The CSV you download and the dataset the explorer serves are not the same edition. This page sets out what changed, where each row goes and which source each figure uses.

<!-- versiones.entrada.2 -->
Neither is ‘the right one’. One is deposited and is cited with its DOI; the other corrects defects in the first and is not yet deposited.

<!-- versiones.donde.titulo -->
Which edition you see where

<!-- versiones.donde.texto -->
- **Harvard Dataverse** delivers the deposited edition, V2.0.
- **The explorer** serves v3, not deposited.
- **This site** uses V2 by default. Where it uses v3, it says so next to the number.
- **The Afinidades Elegidas application** uses the files of CGOCUS V1.1, the deposited version.
- **The project's session metadata** (*Diario* issue, pages, President of the Cortes and Government) is neither deposited nor visible in the explorer.

---

## 1 · Three deposited versions (F25, `#fechas`)

<!-- versiones.depositadas.titulo -->
{{dv.thqcmi.versiones|letra}} deposited versions

<!-- versiones.depositadas.entrada -->
The dataset has {{dv.thqcmi.versiones|letra}} versions on Harvard Dataverse. The current one is {{dv.version}}.

<!-- versiones.depositadas.tabla.col.version -->
Version

<!-- versiones.depositadas.tabla.col.fecha -->
Published

<!-- versiones.depositadas.tabla.col.licencia -->
Licence

<!-- versiones.depositadas.tabla.col.cambio -->
What changed

<!-- versiones.depositadas.v10 -->
First publication.

<!-- versiones.depositadas.v11 -->
Change of licence. The CSV is the same.

<!-- versiones.depositadas.v20 -->
Corrected dates. Adds the changelogs in Spanish and English.

<!-- versiones.depositadas.texto -->
From V1 to V2 only two columns change, `date` and `legislature`. The text, the identifiers and the other columns stay the same.

{{fechas.sesiones|letra}} sessions changed, with {{fechas.filas}} rows between them. In one, session 77, the legislature changed as well.

**If you worked with V1.** Your counts of rows and words do not change. Those that depend on the date or the legislature do.

By legislature, {{fechas.filas.legislatura}} rows move from the first to the second: those of session 77. By month, the months of the {{fechas.sesiones|letra}} corrected dates change.

The README has been the same since the first version, and it describes that version.

**What V2 carries uncorrected.** The site declares it and does not change it: correcting the deposit is a task for its author.

- Diego Martínez Barrio appears in the AR party in 1931-1933, in {{pendiente.martinez_barrio_ar.filas}} rows.
- The «Liberal» family, with {{familias.liberal.filas}} rows, is kept apart from «Liberales»; the explorer merges them.
- The Lliga is CD in {{pendiente.lliga_cd.filas}} rows of the CSV, and D in the README.
- Identifier {{rep836.id|id}} carries two different names.
- The README counts {{etiquetas.diferencia|letra}} more labels than the CSV has rows, without explaining the difference.
- {{v3.turnos}} turns were left inside the preceding row; v3 separates them.

<!-- ↺ comun.fija.readme -->
The deposited README describes the first version; the differences are set out here.

<!-- versiones.depositadas.metodo -->
[See how the dates were audited]

<!-- fig.F25.titulo -->
{{fechas.sesiones|letra}} corrected dates

<!-- fig.F25.pregunta -->
What changed from V1 to V2?

<!-- fig.F25.que_mide -->
Each session that V1 dated wrongly, with its date in V1 and its corrected date in V2.

<!-- fig.F25.denominador -->
The {{sesiones}} sessions, audited one by one.

<!-- fig.F25.eje -->
Date of the session

<!-- fig.F25.leyenda.v1 -->
Date in V1

<!-- fig.F25.leyenda.v2 -->
Date in V2

<!-- fig.F25.nota -->
Session {{num}} · {{fecha_v1}} → {{fecha_v2}}

<!-- fig.F25.nota.cifras -->
{{filas}} rows · V2 {{ids}}

<!-- fig.F25.nota.legislatura -->
It also changes legislature: {{leg_v1}} → {{leg_v2}}.

<!-- fig.F25.prueba.cabeceras -->
The running heads of its pages give the corrected date.

<!-- fig.F25.prueba.errata -->
The session heading has a printing error.

<!-- fig.F25.prueba.danada -->
The day number is damaged in the session heading, and optical character recognition misread it.

<!-- fig.F25.prueba.portada -->
The V1 date came from the title page of the volume, which gives the date those Cortes began.

<!-- fig.F25.prueba.serie -->
The number belongs to the *Diario*'s 1933-1935 series, not to that of the Constituent Cortes.

<!-- fig.F25.dias -->
{{dias}} days

<!-- fig.F25.tabla.col.sesion -->
Session

<!-- fig.F25.tabla.col.v1 -->
Date in V1

<!-- fig.F25.tabla.col.v2 -->
Date in V2

<!-- fig.F25.tabla.col.filas -->
Rows

<!-- fig.F25.tabla.col.ids -->
Identifiers

<!-- fig.F25.tabla.col.prueba -->
Why

<!-- fig.F25.salvedad -->
The audit does not detect a date error that is consistent with the sequence. The deposited changelog gives the row ranges; its table of evidence is not deposited.

<!-- fig.F25.alt -->
Arrows on a timeline, from the date V1 gave to the corrected date in V2, one per session.

---

## 2 · The explorer edition (F18, `#destino-filas`)

<!-- versiones.v3.titulo -->
The explorer edition

<!-- versiones.v3.entrada -->
The explorer does not serve the deposited CSV. It serves v3: the same source, divided differently.

<!-- versiones.v3.texto -->
v3 starts from V2 and corrects its segmentation: it recovers buried turns and separates what is not speech (Method, ‘Two editions’).

It does not change the text. Each piece of v3 is a literal stretch of a V2 row.

It has the same {{sesiones}} sessions, with the same date and number. It adds each session's summary, which V2 did not include.

It has {{filas.v3}} rows. It is not deposited, and its identifiers are not those of V2.

**How it was made.** v3 comes from two project audits. One looked for turns that V2 did not separate; the other, for printed material inside the rows.

The corrections were applied to the original text, in this order: the dates, the turn breaks and the printed blocks.

The words of each V2 row are shared out among its pieces in proportion to their text. That is why they add up to the same total in both editions.

<!-- ↺ comun.fija.ids -->
Row identifiers differ between the deposited edition (V2) and the explorer edition (v3); the session – date and number – is the same in both.

<!-- fig.F18.titulo -->
Where the V2 rows go

<!-- fig.F18.pregunta -->
What is the difference between what is deposited and what the explorer serves?

<!-- fig.F18.tabla.col.que -->
What it is

<!-- fig.F18.tabla.col.filas -->
Rows in v3

<!-- fig.F18.tabla.col.origen -->
Where it comes from

<!-- fig.F18.fila.habla -->
Speech pieces

<!-- fig.F18.fila.habla.origen -->
From the V2 rows, split where another turn or a printed block begins

<!-- fig.F18.fila.turnos -->
Recovered turns

<!-- fig.F18.fila.turnos.origen -->
Turns that V2 left inside the preceding row

<!-- fig.F18.fila.comentarios -->
*Diario* comments

<!-- fig.F18.fila.comentarios.origen -->
Tables, lists, documents and narrative printed inside the V2 rows

<!-- fig.F18.fila.sumarios -->
Summaries

<!-- fig.F18.fila.sumarios.origen -->
What the *Diario* prints before the first speaker, one per session; V2 did not include it

<!-- fig.F18.fila.total -->
Total

<!-- fig.F18.nota.piezas -->
The speech pieces come from {{v3.filas_v2_con_habla}} V2 rows. The other {{v3.filas_v2_solo_comentario}} were comment only.

<!-- fig.F18.nota.continuaciones -->
Another {{v3.piezas_extra}} pieces continue their speaker's speech after a printed block.

<!-- fig.F18.nota.habla -->
With «Solo lo que se habla» (only what is spoken), the explorer keeps {{habla.v3}} rows: the speech pieces and the recovered turns.

<!-- fig.F18.nota.palabras -->
The words of V2 are shared out among the pieces and add up to the same total. The summaries add {{palabras.sumarios.v3}}.

<!-- fig.F18.que_mide -->
The rows of the explorer edition, divided by what they are: speech, recovered turns, *Diario* comments and summaries.

<!-- fig.F18.denominador -->
The {{filas.v3}} rows of v3.

<!-- fig.F18.tabla.col.parte -->
Part

<!-- fig.F18.tabla.col.palabras -->
Words

<!-- fig.F18.salvedad -->
The project documents do not give the same count of recovered turns; this is the count in the v3 that the explorer serves. The row-by-row correspondence is not published.

<!-- fig.F18.alt -->
Table dividing the rows of the explorer edition into speech pieces, recovered turns, Diario comments and summaries.

---

## 3 · What changes in a result (F07, `#quien-habla`)

<!-- versiones.resultado.titulo -->
What changes in a result?

<!-- versiones.resultado.entrada -->
The same question gets a different answer in each edition. It is the best evidence that the choice of edition matters.

<!-- versiones.resultado.texto -->
In V2, Julián Besteiro has {{orador.besteiro.palabras.V2}} words. Of these, {{orador.besteiro.presidencia.V2}} are in rows of the Chair.

Santiago Alba, President of the Cortes in the second legislature, has {{orador.alba.palabras.V2}}.

In v3, Besteiro loses {{orador.besteiro.perdida|pct1}} of his words. Alba loses {{orador.alba.perdida|pct1}}.

They were turns by other speakers and printed material that V2 left in the rows of whoever was in the Chair.

Without the Chair, Indalecio Prieto leads in V2, with {{orador.prieto.sp.V2}} words. But his longest row is mostly printed tables.

In v3, without the Chair, Antonio Royo Villanova leads, with {{orador.royo.sp.v3}}.

Juan Negrín gains {{orador.negrin.ganancia|pct1}} in v3. v3 gives him back wartime speeches that V2 put under the Chair's name.

**What to do with V2.** Any count of speakers on V2 should remove the Chair first. And it is advisable to read its longest rows before adding them up.

<!-- fig.F07.titulo -->
Who speaks most? It depends on the edition

<!-- fig.F07.pregunta -->
Why do Besteiro and Alba ‘speak’ more than anyone else in V2?

<!-- fig.F07.que_mide -->
Rows or words under each deputy's name in V2 and in v3, for the ten with the highest totals in V2.

<!-- fig.F07.denominador -->
All the rows of each edition, with the Chair included.

<!-- fig.F07.conmutador.leyenda -->
Count

<!-- fig.F07.conmutador.filas -->
Rows

<!-- fig.F07.conmutador.palabras -->
Words

<!-- fig.F07.leyenda.v2 -->
Deposited edition (V2)

<!-- fig.F07.leyenda.v3 -->
Explorer edition (v3)

<!-- fig.F07.leyenda.presidencia -->
Of these, in rows of the Chair

<!-- fig.F07.nota -->
{{nombre}} · V2: {{v2}} · v3: {{v3}} · {{cambio}}

<!-- fig.F07.nota.presidencia -->
In V2, «El Sr. PRESIDENTE:» goes under the name of whoever is in the Chair: row {{fila.presidencia.id.V2|id}}, Besteiro's, for example, begins that way.

<!-- fig.F07.tabla.col.nombre -->
Deputy

<!-- fig.F07.tabla.col.v2 -->
V2

<!-- fig.F07.tabla.col.v2_presidencia -->
V2, in the Chair

<!-- fig.F07.tabla.col.v3 -->
v3

<!-- fig.F07.tabla.col.cambio -->
Change

<!-- fig.F07.salvedad -->
This figure shows why editions matter; it is not a measure of importance.

<!-- fig.F07.alt -->
Paired bars for ten deputies, V2 and v3 side by side. Besteiro and Alba lead in V2 and fall in v3; the others barely change.

---

## 4 · Identifiers (`#identificadores`)

<!-- versiones.ids.titulo -->
Identifiers

<!-- versiones.ids.entrada -->
The session is the key the two editions share. The row is not.

<!-- versiones.ids.texto -->
The two editions have the same {{sesiones}} sessions, with the same date and number. Matching them by session is safe.

The rows do not match: v3 renumbers them all. The row-by-row correspondence exists within the project, but it is not published.

An example: Campoamor is row {{fila.campoamor.id.V2|id}} in V2 and row {{fila.campoamor.id.v3|id}} in v3.

To cite, give the date and the session number, and the id with its edition: ‘V2, row…’ or ‘v3, row…’.

To take an intervention (the explorer's term, *intervención*) from the explorer to the CSV, look up the session by date and number. Within it, find the beginning of the text.

<!-- versiones.ids.tabla.titulo -->
One session, two editions

<!-- versiones.ids.tabla.col.que -->
What

<!-- versiones.ids.tabla.fila.sesion -->
The session, by its date and number

<!-- versiones.ids.tabla.fila.presidencia -->
The Chair calls for silence

<!-- versiones.ids.tabla.fila.campoamor -->
Campoamor begins to speak

<!-- versiones.ids.tabla.fila.orden -->
Campoamor's place in the session

<!-- versiones.ids.tabla.sesion -->
1 October 1931, session 48, in both

<!-- versiones.ids.tabla.igual -->
the same

<!-- versiones.ids.tabla.pantalla -->
«Orden {{fila.campoamor.orden.pantalla|id}}» on screen

<!-- versiones.depositadas.vigente -->
current

---

## 5 · Which source each figure uses (F35, `#bases`)

<!-- versiones.bases.titulo -->
Which source does each figure come from?

<!-- versiones.bases.entrada -->
Each figure gives its source next to its title. This table brings them together, with each source's checksum and the date of calculation. Three keep their number without the Chart, Table and Data tabs. F18 and F19 are their own table; F26, on Home and in the gateways, is a reduced version of the one in Sessions.

<!-- fig.F35.titulo -->
Which source each figure uses

<!-- fig.F35.tabla.col.figura -->
Figure

<!-- fig.F35.tabla.col.pagina -->
Page

<!-- fig.F35.tabla.col.base -->
Source

<!-- fig.F35.tabla.col.archivo -->
Data

<!-- fig.F35.tabla.col.huella -->
Source checksum

<!-- fig.F35.tabla.col.fecha -->
Calculated

<!-- fig.F35.huella.V2 -->
MD5 of the deposited CSV

<!-- fig.F35.huella.v3 -->
sha256 of the explorer dataset

<!-- fig.F35.huella.proyecto -->
sha256 of the session metadata

<!-- fig.F35.huella.afin -->
Deposited version of CGOCUS

<!-- fig.F35.huella.croquis -->
sha256 of the sketch

<!-- fig.F35.sin_datos -->
No downloadable data

<!-- fig.F35.pagina.inicio -->
Home

<!-- fig.F35.pagina.cortes -->
The Cortes

<!-- fig.F35.pagina.etapa -->
Stage pages

<!-- fig.F35.pagina.sesiones -->
Sessions and votes

<!-- fig.F35.pagina.puerta -->
Session gateways

<!-- fig.F35.pagina.diario -->
The Diario

<!-- fig.F35.pagina.metodo -->
Method

<!-- fig.F35.pagina.datos -->
Using the data

<!-- fig.F35.pagina.versiones -->
Versions

<!-- fig.F35.pagina.explorador -->
The explorer

<!-- fig.F35.pagina.afinidades -->
Afinidades Elegidas

<!-- fig.F35.base.V2 -->
V2

<!-- fig.F35.base.v3 -->
v3

<!-- fig.F35.base.proyecto -->
Project

<!-- fig.F35.base.afin -->
CGOCUS V1.1

<!-- fig.F35.base.croquis -->
Sketch

<!-- fig.F35.huellas.titulo -->
The checksum of each source

<!-- fig.F35.alt -->
Table with each figure on the site, its page, the source it comes from, its data, the checksum of that source and the date of calculation.

---

## 6 · How to cite each edition (`#citar`)

<!-- versiones.citar.titulo -->
How to cite each edition

<!-- versiones.citar.texto -->
**V2.** With its DOI and its version, as Harvard Dataverse gives it. This is the one to cite for any number calculated on the CSV.

**v3.** It has no DOI. Cite the explorer with its address and the date of access, and state that it serves v3, not deposited.

The citation the explorer adds to what it exports says ‘Harvard Dataverse, V2’, but its identifiers are those of v3. Correct it before you publish.

**The session metadata** (*Diario* issue, pages, President of the Cortes and Government) is not deposited. Cite it as project metadata.

<!-- versiones.citar.enlace -->
[See how to cite]

---

## README of the Versions figures (columns of each CSV)

<!-- fig.F25.leame.col.num_session -->
Number of the session within its legislature.

<!-- fig.F25.leame.col.legislatura_v1 -->
Legislature given in V1.

<!-- fig.F25.leame.col.legislatura_v2 -->
Legislature in V2.

<!-- fig.F25.leame.col.fecha_v1 -->
Date given in V1 (YYYY-MM-DD).

<!-- fig.F25.leame.col.fecha_v2 -->
Corrected date in V2 (YYYY-MM-DD).

<!-- fig.F25.leame.col.dias -->
Days between the two dates, with sign.

<!-- fig.F25.leame.col.id_min -->
First id of the session in V2.

<!-- fig.F25.leame.col.id_max -->
Last id of the session in V2.

<!-- fig.F25.leame.col.filas -->
Rows in the session.

<!-- fig.F25.leame.col.prueba -->
The evidence for the correction. `cabeceras`: the running heads give the corrected date. `danada`: the day number is damaged in the session heading. `errata`: that heading has a printing error. `portada`: V1 took the date from the title page of the volume. `serie`: the number belongs to the 1933-1935 series.

<!-- fig.F18.leame.col.clase -->
habla (speech pieces), turnos (recovered turns), comentarios (printed material from the Diario), sumarios (summaries), or the total.

<!-- fig.F18.leame.col.filas_v3 -->
Rows of that class in v3.

<!-- fig.F18.leame.col.palabras_v3 -->
Words (nwords) of those rows in v3.

<!-- fig.F18.leame.col.base -->
Edition the number comes from.

<!-- fig.F07.leame.col.rep_id -->
Identifier of the deputy in V2 and in v3.

<!-- fig.F07.leame.col.nombre -->
Name of the deputy according to the site's spelling table.

<!-- fig.F07.leame.col.filas_v2 -->
Rows under the deputy's name in V2, with the Chair included.

<!-- fig.F07.leame.col.palabras_v2 -->
Words (nwords) of those rows in V2.

<!-- fig.F07.leame.col.filas_v2_presidencia -->
Of these, rows of the Chair (according to the explorer's heading parser).

<!-- fig.F07.leame.col.palabras_v2_presidencia -->
Words of those rows of the Chair.

<!-- fig.F07.leame.col.filas_v3 -->
Rows under the deputy's name in v3, all pieces.

<!-- fig.F07.leame.col.palabras_v3 -->
Words of those rows in v3.

<!-- fig.F07.leame.col.cambio_palabras -->
`palabras_v3 / palabras_v2 − 1`, as a proportion.
