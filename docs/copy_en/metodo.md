# Copy EN · Method (`/[lang]/metodo/`)

> [nota de diseño] Traducción de `docs/copy_es/metodo.md` según el glosario. Las notas de diseño del original no se
> traducen: véanse en el archivo español. Consultas, cadenas del explorador y código quedan como en el español; solo
> se traducen los comentarios del código.

---

## Metadata

<!-- metodo.meta.titulo -->
Method

<!-- metodo.meta.descripcion -->
How the printed Diario became {{filas.V2}} rows, what went wrong, what counts as speech and what does not, and what the dataset does not claim. Each section can be checked.

## Side index

<!-- metodo.indice.titulo -->
On this page

<!-- metodo.indice.01 -->
What a row is

<!-- metodo.indice.02 -->
From the Diario to the row

<!-- metodo.indice.03 -->
Optical character recognition

<!-- metodo.indice.04 -->
Who speaks

<!-- metodo.indice.05 -->
Speech and non-speech

<!-- metodo.indice.06 -->
Two editions

<!-- metodo.indice.07 -->
Corrected dates

<!-- metodo.indice.08 -->
Party, family and ideology

<!-- metodo.indice.09 -->
What it does not claim

<!-- metodo.indice.10 -->
Documentation

## Header

<!-- metodo.antetitulo -->
Method

<!-- metodo.titulo -->
How was it made, and where can it go wrong?

<!-- metodo.entrada -->
This page does not walk through the process stage by stage. It answers what a reviewer would ask, and each section ends in something you can check.

<!-- metodo.entrada.2 -->
It starts from one particular row: Clara Campoamor's on 1 October 1931, the day women's suffrage was voted.

<!-- metodo.pruebelo.rotulo -->
Try it

<!-- metodo.pruebelo.rotulo.explorador -->
In the explorer

<!-- metodo.pruebelo.rotulo.codigo -->
In Python, on the deposited CSV

<!-- metodo.pruebelo.carga.texto -->
How to load the deposited CSV: the lines of code assume it is loaded as `d`

<!-- metodo.pruebelo.carga.codigo -->
```python
import pandas as pd
d = pd.read_csv("2REP_Diaries.csv", sep=";", dtype={"rep_id": "Int64"})
```

---

## 01 · What is a row?

<!-- metodo.01.titulo -->
What is a row?

<!-- metodo.01.entrada -->
A row is what the Diario prints between one speaker heading that the tagging recognises and the next.

<!-- metodo.01.texto -->
The heading is the one that opens each turn on paper: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». What follows, up to the next heading the tagging recognises, is the text of a row.

The two rows in the figure are consecutive in the session of 1 October 1931. In the first, the Chair says {{fila.presidencia.nwords|letra}} words: «Ruego a la Cámara que guarde silencio.» (‘I ask the Chamber to keep silent.’)

In the second, Clara Campoamor says {{fila.campoamor.nwords}}. It begins: «Yo ruego a la Cámara que me escuche en silencio» (‘I ask the Chamber to hear me in silence’). Counting rows is not counting speech.

The text is neither summarised nor lemmatised. The order is kept, and the order is information: first the Chair asks for silence, then Campoamor asks for it for herself.

Each row has {{columnas.V2|letra}} columns. They give the session and the row's place in it, the printed heading and the text. If the speaker was identified, they add the deputy, party and district.

<!-- metodo.01.salvedad -->
A row may contain more than one turn, or a document that nobody read aloud. ‘Two editions’, below, explains this.

<!-- metodo.01.pruebelo.consulta -->
"me escuche en silencio"

<!-- metodo.01.pruebelo.explorador -->
Search for the phrase in quotation marks and open the result. The reader numbers it «Orden {{fila.campoamor.orden.pantalla|id}} de {{sesion.1931-10-01-48.filas_v3}}»: it is the same row, counted in the explorer edition. [Open the explorer ↗]

<!-- metodo.01.pruebelo.codigo -->
```python
d[d.id.isin([5423, 5424])].T
```

---

## 02 · How does the printed Diario become a row?

<!-- metodo.02.titulo -->
How does the printed Diario become a row?

<!-- metodo.02.entrada -->
In five steps, each with its number. None of them corrects the text by hand.

<!-- metodo.02.texto -->
**The source.** There are {{sesiones}} issues of the Diario de Sesiones of the Congress, scanned to PDF from its historical archive. They add up to {{paginas.total}} pages, according to the count of the project's files.

**The reading.** Each page was turned into an image and read by an optical character recognition model, GLM-OCR. What failed, and how it was recovered, is set out below.

**The cleaning.** A program removed from each page the running header, with its folio and date, and the folio at the foot. It then rejoined words hyphenated at the end of a line.

It also joined the short lines of the Diario's columns into paragraphs. None of these steps corrects reading errors.

**The turns.** A regular expression looks for the printed speaker heading: «El Sr.», «La Sra.», «La Srta.», «Los Sres.». It also accepts misread variants, such as «Ei Sr.» or «E1 Sr.».

Each heading must contain at least one word of {{etiquetas.filtro.letras|letra}} capital letters. That filter discarded {{etiquetas.falsos_positivos}} false positives.

That left {{etiquetas.n}} speaker tags. The CSV has {{filas.V2}} rows; the difference of {{etiquetas.diferencia|letra}} is not documented.

**The linking.** Each heading was linked to a deputy, with party, district and ideology. This is set out in ‘Who speaks’ and in ‘Party, family and ideology’.

<!-- metodo.02.salvedad -->
The pages and the reading failures come from the project's working files, which are not deposited.

<!-- metodo.02.pruebelo.explorador -->
Open any intervention. Under the deputy's name, «Consta en el diario como» (recorded in the Diario as) gives the printed heading that opened the row. [Open the explorer ↗]

<!-- metodo.02.pruebelo.codigo -->
```python
d.speaker.value_counts().head(10)   # the most frequent printed headings
```

---

## 03 · What went wrong in optical character recognition?

<!-- metodo.03.titulo -->
What went wrong in optical character recognition?

<!-- metodo.03.entrada -->
No page was left without text, but not all of them came out at the first attempt.

<!-- metodo.03.texto -->
Each page was read by GLM-OCR, a vision model that the project ran on its own machines. While the model was writing, a watchdog checked whether it had fallen into a loop, repeating the same text.

If it had, the page was run again with more variation. This happened on {{ocr.bucles.paginas}} pages.

In the first pass, {{ocr.fallidas.paginas}} pages failed. They were spread across {{ocr.fallidas.sesiones}} sessions.

GLM-OCR recovered {{ocr.recuperadas}} on retrying them. The remaining {{ocr.tesseract.paginas}} were read with Tesseract, a classic recognition program, with its models for modern and historical Spanish.

Those Tesseract pages are in {{ocr.tesseract.sesiones}} sessions. None of them went through any automatic correction afterwards.

<!-- metodo.03.texto.2 -->
Reading errors are in the text and also in the speaker headings: «El Sr. PERSIDENTE:», «El Sr. VICFPRESIDENTE».

The project's session metadata declare {{ocr.incidencias|letra}} incidents. Both can be seen in the corpus:

- Session 9, of 27 July 1931, ends in a loop: it repeats «Sánchez Guerra, Ossorio y Gallardo» {{ocr.bucle9.repeticiones|letra}} times, inside V2 row {{fila.bucle9.id.V2|id}}.
- Session 48, of 1 October 1931, lost its end. Its last {{ses.s48.cola|letra}} rows repeat «Pido la palabra», and the last one breaks off at «El Sr. Ministro de».

Those rows are {{ses.s48.cola.V2.desde|id}}–{{ses.s48.cola.V2.hasta|id}} in V2 and {{ses.s48.cola.v3.desde|id}}–{{ses.s48.cola.v3.hasta|id}} in v3. The re-segmentation of v3 does not repair that end.

<!-- ↺ comun.fija.ocr -->
The text comes from optical character recognition and has not been corrected by hand.

<!-- ↺ comun.fija.sesion48 -->
Session 48 as it stands in the corpus: the end of the digitised minutes was lost in optical character recognition.

<!-- metodo.03.cola.rotulo -->
The last {{ses.s48.cola|letra}} rows of session 48, as they stand in both editions

<!-- metodo.03.salvedad -->
These numbers come from the project's working files, which are not deposited. The incidents are recorded in its session metadata.

<!-- metodo.03.pruebelo.explorador -->
Open the running session of any intervention of 1 October 1931 and scroll to the end. Orders {{ses.s48.cola.pantalla.desde|id}} to {{ses.s48.cola.pantalla.hasta|id}} repeat the same request. [Open the explorer ↗]

<!-- metodo.03.pruebelo.codigo -->
```python
s48 = d[(d.date == "1931-10-01") & (d.num_session == 48)]
s48.tail(5)[["id", "speaker", "speech"]]
```

---

## 04 · Who speaks?

<!-- metodo.04.titulo -->
Who speaks?

<!-- metodo.04.entrada -->
The Diario prints the speaker's surname, almost never the first name or party. Linking each heading to a person is the most delicate step.

<!-- metodo.04.texto -->
The difficulty can be measured in the project's table of deputies: {{diputados.comparten_apellido}} of those who speak share their first surname with someone else.

Each heading was looked up in the project's table of deputies in steps, from the strictest to the most flexible:

1. identical surnames;
2. printed surnames as the beginning of the full ones;
3. the first surname;
4. an approximate similarity between surnames, with a threshold of {{vinculo.umbral}};
5. the same similarity, on the first surname.

If several deputies matched, the legislature decided. The Chair, the Vice-Presidents and the ministers were resolved separately, with the context of each session.

The deposited README calls that similarity Jaro-Winkler. The code uses the one in Python's `difflib` library.

Then all rows were reviewed by hand. The review corrected {{vinculo.corregidas}} assignments.

As a result, {{filas.con_diputado.pct}} of the rows have a deputy. {{filas.sin_diputado}} are left without one.

The README says those rows belong to ministers without a seat. Read one by one, {{filas.sin_diputado.ministerio}} do indeed carry a ministry's heading.

The rest belong to secretaries, to the Chair without a name, or to headings damaged in reading.

**The Chair has a party.** «El Sr. PRESIDENTE:» goes to the deputy who was in the Chair, with party and ideology. In {{pres.vice_ses}} of the {{sesiones}} sessions, a Vice-President took the Chair for part of the session.

That is why the Presidents of the Chamber top any unfiltered word count.

<!-- metodo.04.enlace -->
[See who speaks most, by edition]

<!-- metodo.04.salvedad -->
Whoever is in the Chair orders the debate, but does not carry it. To count speakers, remove the Chair first.

<!-- metodo.04.pruebelo.consulta -->
"guarde silencio"

<!-- metodo.04.pruebelo.explorador -->
Search for the phrase and open a result from the Chair. The record attributes it to the deputy who was in the Chair; «Consta en el diario como» says only «El Sr. PRESIDENTE:». [Open the explorer ↗]

<!-- metodo.04.pruebelo.codigo -->
```python
d[d.rep_id.isna()].speaker.value_counts()   # the rows without a deputy
```

---

## 05 · What is speech and what is not?

<!-- metodo.05.titulo -->
What is speech and what is not?

<!-- metodo.05.entrada -->
A short row is usually procedure; a long row may not be speech.

<!-- metodo.05.texto -->
{{longitud.hasta50.pct}} of the V2 rows have {{longitud.umbral}} words or fewer. The median is {{longitud.mediana|letra}} words.

More than half of those short rows belong to the Chair: {{longitud.hasta50.presidencia.pct}}.

At the other end, sort the rows from longest to shortest and take the first {{longitud.curva.corte|pct0}}. That slice holds {{longitud.curva.palabras|pct1}} of the words.

Length is not importance. A short row may be a vote or a decisive interruption.

**What is not speech.** The Diario also prints what nobody said aloud: voting lists, committee reports, written requests, tables and the account of the session.

V2 leaves that material inside the previous row. Most of the time it is the row of whoever was in the Chair: {{v3.comentarios.en_presidencia|pct0}}.

v3 separates it into {{v3.comentarios}} rows of «Comentarios del Diario» (the Diario's comments). It also adds, at the start of each session, its summary, which V2 did not have.

In the explorer, the «Solo lo que se habla» (speech only) box leaves out summaries and comments. That leaves {{habla.v3}} of the {{filas.v3}} interventions.

The separation follows an audit by the project. That a row is kept as speech does not prove that all its text was spoken in the plenary.

<!-- metodo.05.salvedad -->
With v3, the share of short rows changes: {{longitud.hasta50.pct.v3}} have {{longitud.umbral}} words or fewer. Each figure states which edition it counts.

<!-- metodo.05.pruebelo.consulta -->
"casas viejas"

<!-- metodo.05.pruebelo.explorador -->
Search for the phrase twice, with the «Solo lo que se habla» box ticked and without it. The difference is summaries and comments from the Diario, not anyone's speech. [Open the explorer ↗]

<!-- metodo.05.pruebelo.codigo -->
```python
(d.nwords <= 50).mean()   # the share of short rows in V2
```

---

## 06 · Why are there two editions?

<!-- metodo.06.titulo -->
Why are there two editions?

<!-- metodo.06.entrada -->
The deposited V2 has two segmentation defects. The explorer's v3 corrects them without changing a letter of the text.

<!-- metodo.06.texto -->
**Buried turns.** When the tagger did not recognise a heading, the next turn was left inside the previous row. v3 rescues {{v3.turnos}} turns.

Most of them were inside a row of the Chair: {{v3.turnos.en_presidencia|pct0}}.

**Printed material inside rows.** Tables, voting lists and documents went into the row of whoever spoke before. v3 moves them to rows of the Diario's comments.

The three rows in the figure show this.

- The longest row in V2, {{fila.prieto.id.V2|id}}, adds up to {{fila.prieto.nwords}} words under the name of Indalecio Prieto, on 12 July 1933.
- His speech is {{fila.prieto.habla}} words. The rest, {{fila.prieto.documentos}}, are tables and «documentos complementarios» (supplementary documents) that the Diario prints with it.
- Manuel Azaña's speech on the Statute of Catalonia, on 27 May 1932, sits in V2 inside a row of the Chair, {{fila.estatuto.id.V2|id}}.
- v3 gives it a row of its own, {{fila.estatuto.id.v3|id}}, with {{fila.estatuto.nwords.v3}} words.
- Azaña's speech of 20 March 1935 was already right in V2: {{fila.azana1935.nwords}} words in a single row, the same in both editions.

**The text does not change.** Each piece of v3 is a literal stretch of a V2 row. Together, in order and with the headings that were split off, they rebuild the {{filas.V2}} rows.

The words of each V2 row are shared out among its pieces and add up to the same: {{palabras.V2}}. What v3 adds is the summaries.

v3 is not deposited.

<!-- metodo.06.enlace -->
[See where each V2 row goes]

<!-- ↺ comun.fija.ids -->
Row identifiers differ between the deposited edition (V2) and the explorer edition (v3); the session – date and number – is the same in both.

<!-- metodo.06.salvedad -->
The row-by-row correspondence between the two editions is not published. The v3 numbers in this section were read from v3 itself, with its checksum.

<!-- metodo.06.pruebelo.consulta -->
"es preciso reconocer sres diputados que en esta campaña"

<!-- metodo.06.pruebelo.explorador -->
Search for the phrase and open the result: it is Azaña, on 27 May 1932, in a row of his own. In V2, that text is under the Chair's name. [Open the explorer ↗]

<!-- metodo.06.pruebelo.codigo -->
```python
print(d.loc[d.id == 25979, "speech"].iloc[0][:400])   # the Chair and, inside, Azaña
```

---

## 07 · Which dates were corrected?

<!-- metodo.07.titulo -->
Which dates were corrected?

<!-- metodo.07.entrada -->
The first version gave some sessions the wrong date. V2 corrected them after auditing all of them, one by one.

<!-- metodo.07.texto -->
The audit cross-checked four independent sources for each session:

- the running headers of each printed page;
- the session heading, «SESIÓN CELEBRADA…» (session held…);
- the dates cited in the text itself;
- the sequence of Diario numbers, with the day of the week.

To correct a date it required two independent indications, or an unambiguous printed header.

{{fechas.sesiones|letra}} sessions changed. They add up to {{fechas.filas}} rows.

Only the `date` and `legislature` columns change; the text and the other columns stay the same.

One session also changed legislature. Session 77, which V1 dated 1 June 1933, is from 4 May 1934.

V1 dated session 321 to 14 July 1931: it took the date from the title page of Volume XX, which says when those Cortes began. It is from 31 March 1933.

In several, the error came from the session heading: a printer's error or a damaged digit that optical character recognition misread.

The audit has a limit: it does not detect a date error that is consistent with the sequence.

<!-- metodo.07.enlace -->
[See the corrected dates]

<!-- metodo.07.salvedad -->
The deposited changelog gives the ranges of corrected rows. The table of evidence it cites, `erratas_fechas_V1.csv`, is not deposited.

<!-- metodo.07.pruebelo.explorador -->
With no search text, choose the 1933-1935 legislature and type 77 in «Nº de sesión» (session no.). All its interventions are from 4 May 1934. [Open the explorer ↗]

<!-- metodo.07.pruebelo.codigo -->
```python
d[(d.legislature == "1933-1935") & (d.num_session == 77)].date.unique()
```

---

## 08 · What do party, family and ideology mean?

<!-- metodo.08.titulo -->
What do party, family and ideology mean?

<!-- metodo.08.entrada -->
The three columns describe the deputy, not the row. They come from the project's table of deputies.

<!-- metodo.08.texto -->
**Party** is given by deputy and legislature. Anyone who changed party between legislatures also changes in the dataset.

**Family** groups parties. In the CSV it has {{familias.V2}} distinct values, with spelling variants such as «Repubicanos» or «Republicanoses».

The explorer reduces them to {{familias.v3}} families.

**Ideology** is coded from EI, far left, to ED, far right, with C in the centre. It is assigned to the deputy according to party; it does not measure what was said.

It is not always uniform within a party. In {{ideologia.partidos_varios|letra}} parties, different codes coexist.

The CEDA, for example, is D in {{ideologia.ceda.D}} rows. But it is CD in {{ideologia.ceda.CD}}. And it is C in {{ideologia.ceda.C}}.

«Republicanos» groups parties coded from the left to the centre-right.

The Chair carries the party and ideology of whoever is in the Chair.

Some labels are pending review by the author:

- Diego Martínez Barrio appears in the AR party in 1931-1933;
- the «Liberal» family, with {{familias.liberal.filas}} rows, which the explorer merges with «Liberales»;
- the Lliga, which is CD in the CSV and D in the README.

<!-- metodo.08.salvedad -->
A broad category serves to compare blocs, not to classify a person.

<!-- metodo.08.pruebelo.explorador -->
Choose the CEDA party in the filters and open the «Ideología» facet. You will see more than one code. [Open the explorer ↗]

<!-- metodo.08.pruebelo.codigo -->
```python
d[d.party == "CEDA"].ideology.value_counts()
```

---

## 09 · What does the corpus not claim, and how should you compare?

<!-- metodo.09.titulo -->
What does the corpus not claim, and how should you compare?

<!-- metodo.09.entrada -->
The dataset says who spoke, when and how much. It does not say about what, in what tone, from what position or how they voted.

<!-- metodo.09.texto -->
**Legislatures are unequal.** The first holds {{leg.1931-1933.palabras.pct}} of the words in V2.

Compare rates, not volumes: words per session, or each group's share within its legislature.

**The vote is not a column.** Roll-call votes are in the text, as lists of names.

In V2, the {{voto.161-121.si}} to {{voto.161-121.no}} list of 1 October 1931 sits inside a row of the Chair, {{voto.161-121.V2|id}}.

That row records {{fila.lista.nwords}} words in `nwords`. The names are on separate lines, and `nwords` only splits on spaces (Data, ‘Five ways to count a “word”’).

**Tone is not measured.** The shorthand writer's bracketed notes, «(Rumores.)», «(Aplausos.)», are in the text. Nobody has turned them into a variable of the dataset.

<!-- ↺ comun.fija.contar -->
Counting a word does not tell you who defends it or in what tone.

<!-- metodo.09.salvedad -->
That the Diario records something does not make it true: the dataset transcribes what was printed; it does not verify it.

<!-- metodo.09.pruebelo.consulta -->
"total 161"

<!-- metodo.09.pruebelo.explorador -->
Search for the phrase with the «Solo lo que se habla» box ticked and without it. With the box ticked, the list disappears: v3 keeps it as a comment from the Diario. [Open the explorer ↗]

<!-- metodo.09.pruebelo.codigo -->
```python
print(d.loc[d.id == 5453, "speech"].iloc[0])   # the list, inside the Chair's row
```

---

## 10 · Where is the full documentation?

<!-- metodo.10.titulo -->
Where is the full documentation?

<!-- metodo.10.entrada -->
What is deposited, what is not, and what this site publishes.

<!-- metodo.10.texto -->
**Deposited in Harvard Dataverse**, with V2.0: the CSV, the changelogs in Spanish and English, and the README.

<!-- metodo.10.texto.2 -->
Its coverage table is that of V1. It calls the similarity between surnames Jaro-Winkler, while the code computes it with `difflib`.

It speaks of a structured instruction to the reading model, which the code does not send: GLM-OCR uses its own template.

And it calls the sessions in Valencia and Barcelona exile. In this dataset, exile means the Mexico sessions, in 1945.

**Not deposited.** These parts of the project are not in Dataverse:

- the v3 that the explorer serves;
- the row-by-row correspondence between V2 and v3;
- the session metadata: Diario, pages, President of the Cortes and Government;
- the table of deputies against which each heading was linked, which the README offers on request.

**On this site:** the exporter that computes each number, and a file, `procedencia.csv`, with the source, formula and date of all of them.

What has no public address is not linked.

<!-- metodo.10.enlace -->
[Where each number comes from]

<!-- ↺ comun.fija.readme -->
The deposited README describes the first version; the differences are set out here.

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

<!-- metodo.10.pruebelo.explorador -->
Open «Sobre este corpus» (about this corpus), in the explorer's side panel. It says which edition it serves: v3, not deposited. [Open the explorer ↗]

<!-- metodo.10.pruebelo.codigo -->
```python
d.shape   # compare it with the README: rows and columns
```

---

## Method figures

### F20 · Anatomy of a row (section 01)

<!-- fig.F20.titulo -->
Anatomy of a row

<!-- fig.F20.pregunta -->
What does each row of the CSV hold?

<!-- fig.F20.que_mide -->
Two consecutive rows of the session of 1 October 1931, with their {{columnas.V2}} columns, as they stand in the deposited CSV.

<!-- fig.F20.conmutador.csv -->
As in the CSV

<!-- fig.F20.conmutador.explorador -->
As in the explorer

<!-- fig.F20.conmutador.leyenda -->
View the row

<!-- fig.F20.nota.columna -->
{{columna}} · {{definicion}}

<!-- fig.F20.explorador.texto -->
The explorer edition keeps the same rows with a different number and order. It adds the heading and the name without accents or capitals, for searching, and keeps the family and ideology as they came.

<!-- fig.F20.explorador.ordenes -->
In V2, the orders are {{fila.presidencia.orden.V2|id}} and {{fila.campoamor.orden.V2|id}}, because they start at zero. In v3 they are {{fila.presidencia.orden.v3|id}} and {{fila.campoamor.orden.v3|id}}: the session opens with its summary and v3 rescues earlier turns.

<!-- fig.F20.explorador.pantalla -->
The explorer's screen counts from one: «Orden {{fila.campoamor.orden.pantalla|id}}».

<!-- fig.F20.campo.ord -->
Position in the session, in v3. It counts from zero; the screen, from one.

<!-- fig.F20.campo.speaker_fold -->
The printed heading, without accents or capitals, for searching.

<!-- fig.F20.campo.rep_name_fold -->
The deputy's name, without accents or capitals, for searching.

<!-- fig.F20.campo.party_family_raw -->
The family as it comes in the CSV, before its spelling is normalised.

<!-- fig.F20.campo.ideology_raw -->
The ideology as it comes in the CSV, with its spaces.

<!-- fig.F20.campo.year -->
The year of the session, for filtering.

<!-- fig.F20.enlace -->
[See what each column holds]

<!-- fig.F20.texto.cortado -->
The text continues; only its beginning is shown here.

<!-- fig.F20.salvedad -->
The row number changes between editions; the session does not. Campoamor's ideology is C because it is that of her party, the Radical Party.

<!-- fig.F20.alt -->
Two rows of the CSV laid out in their columns: the Chair asks for silence in {{fila.presidencia.nwords|letra}} words and Clara Campoamor begins her speech, of {{fila.campoamor.nwords}} words.

<!-- fig.F20.grupo.sesion -->
The session and the row's place

<!-- fig.F20.grupo.texto -->
What was printed

<!-- fig.F20.grupo.diputado -->
The deputy, if identified

<!-- fig.F20.solo_v3 -->
v3 only

<!-- fig.F20.tabla.col.columna -->
Column

<!-- fig.F20.tabla.col.definicion -->
What it says

### F19 · From the Diario to the row, in five steps (section 02)

<!-- fig.F19.titulo -->
From the Diario to the row, in five steps

<!-- fig.F19.pregunta -->
How do {{sesiones}} issues of the Diario become {{filas.V2}} rows?

<!-- fig.F19.paso1.titulo -->
The issues of the Diario

<!-- fig.F19.paso1.cifra -->
{{sesiones}} issues, one per session

<!-- fig.F19.paso1.detalle -->
Scanned to PDF from the historical archive of the Congress. They are the sessions of the three legislatures and those of Mexico, in 1945. Source: V2.

<!-- fig.F19.paso2.titulo -->
The pages, read

<!-- fig.F19.paso2.cifra -->
{{paginas.total}} pages

<!-- fig.F19.paso2.detalle -->
Count from the project's files, not deposited. In the first pass {{ocr.fallidas.paginas}} failed; all were recovered later.

<!-- fig.F19.paso3.titulo -->
The speaker headings

<!-- fig.F19.paso3.cifra -->
{{etiquetas.n}} tags

<!-- fig.F19.paso3.detalle -->
After discarding {{etiquetas.falsos_positivos}} false positives with the capital-letter filter. Number from the deposited README.

<!-- fig.F19.paso4.titulo -->
The rows

<!-- fig.F19.paso4.cifra -->
{{filas.V2}} rows

<!-- fig.F19.paso4.detalle -->
The deposited CSV. The difference of {{etiquetas.diferencia|letra}} from the tags is not documented.

<!-- fig.F19.paso5.titulo -->
The speaker, identified

<!-- fig.F19.paso5.cifra -->
{{filas.con_diputado}} rows with a deputy

<!-- fig.F19.paso5.detalle -->
After reviewing all rows by hand and correcting {{vinculo.corregidas}} assignments.

<!-- fig.F19.salvedad -->
The difference of {{etiquetas.diferencia|letra}} between tags and rows is not documented. The pages are not deposited.

<!-- fig.F19.alt -->
Five steps in a line: the issues of the Diario, the pages read, the speaker headings, the rows and the rows with an identified deputy, each with its number.

### F10/F11 · Procedure versus speech (section 05)

<!-- fig.F10.titulo -->
Procedure versus speech

<!-- fig.F10.pregunta -->
How many rows are short, and how much text do the long ones take?

<!-- fig.F10.que_mide -->
How many V2 rows fall into each length band, or how many words they add up to, with the Chair's rows shown separately.

<!-- fig.F10.denominador -->
The {{filas.V2}} rows of V2, or their {{palabras.V2}} words counted with `nwords`.

<!-- fig.F10.conmutador.leyenda -->
Count

<!-- fig.F10.conmutador.filas -->
Rows

<!-- fig.F10.conmutador.palabras -->
Words

<!-- fig.F10.eje.x -->
Words per row, in ever wider bands

<!-- fig.F10.eje.y.filas -->
Rows

<!-- fig.F10.eje.y.palabras -->
Words

<!-- fig.F10.leyenda.presidencia -->
From the Chair

<!-- fig.F10.leyenda.resto -->
From other speakers

<!-- fig.F10.filtro.leyenda -->
Legislature

<!-- fig.F10.filtro.todas -->
All

<!-- fig.F10.nota.filas -->
{{tramo}} words · {{n}} of {{den}} rows · {{pres}} from the Chair

<!-- fig.F10.nota.palabras -->
{{tramo}} words · {{n}} of {{den}} words · {{pres}} from the Chair

<!-- fig.F10.tramo.mas -->
more than

<!-- fig.F10.umbral -->
Up to {{longitud.umbral}} words: {{longitud.hasta50}} of {{filas.V2}} rows.

<!-- fig.F11.titulo -->
Where the words are concentrated

<!-- fig.F11.que_mide -->
What share of all words the longest rows hold, from the longest to the shortest.

<!-- fig.F11.eje.x -->
Rows, from longest to shortest

<!-- fig.F11.eje.y -->
Share of all words

<!-- fig.F11.punto.p10 -->
The first {{longitud.curva.corte|pct0}} of rows holds {{longitud.curva.palabras|pct1}} of the words.

<!-- fig.F11.punto.p20 -->
The first {{longitud.curva.corte2|pct0}} holds {{longitud.curva.palabras2|pct1}}.

<!-- fig.F11.nota -->
{{pct_filas}} of the longest rows · {{pct_palabras}} of the words

<!-- fig.F10.tabla.col.tramo -->
Words per row

<!-- fig.F10.tabla.col.presidencia -->
Rows from the Chair

<!-- fig.F10.tabla.col.resto -->
Rows from the rest

<!-- fig.F10.tabla.col.pal_presidencia -->
Words from the Chair

<!-- fig.F10.tabla.col.pal_resto -->
Words from the rest

<!-- fig.F10.v3 -->
In v3, which separates summaries and comments, {{longitud.hasta50.pct.v3}} of the rows have {{longitud.umbral}} words or fewer.

<!-- fig.F10.salvedad -->
What is measured is length; ‘procedural’ is an interpretation. The Chair is recognised by its printed heading, with the explorer's parser.

<!-- fig.F10.alt -->
Histogram of the length of the V2 rows. Most are short and belong to the Chair; when words are counted, the mass shifts to the long rows.

### F12 · The longest row is not a speech (section 06)

<!-- fig.F12.titulo -->
The longest row is not a speech

<!-- fig.F12.pregunta -->
Why was v3 needed?

<!-- fig.F12.que_mide -->
Three V2 rows, split into the pieces into which v3 divides them, with the words of each piece.

<!-- fig.F12.denominador -->
The words of each V2 row, shared out among its v3 pieces.

<!-- fig.F12.fila.prieto -->
Prieto, 12 July 1933 · V2 row {{fila.prieto.id.V2|id}}

<!-- fig.F12.fila.estatuto -->
Azaña, 27 May 1932 · V2 row {{fila.estatuto.id.V2|id}}

<!-- fig.F12.fila.azana1935 -->
Azaña, 20 March 1935 · V2 row {{fila.azana1935.id.V2|id}}

<!-- fig.F12.leyenda.habla -->
The speaker's speech

<!-- fig.F12.leyenda.documento -->
Comment from the Diario: tables, documents, lists

<!-- fig.F12.leyenda.turno -->
Rescued turn

<!-- fig.F12.leyenda.presidencia -->
Chair

<!-- fig.F12.nota -->
{{tipo}} · v3 row {{id_v3}} · {{n}} words · «{{comienzo}}»

<!-- fig.F12.tabla.col.v2 -->
V2 row

<!-- fig.F12.tabla.col.v3 -->
Piece in v3

<!-- fig.F12.tabla.col.tipo -->
What it is

<!-- fig.F12.tabla.col.orador -->
Under the name of

<!-- fig.F12.tabla.col.palabras -->
Words

<!-- fig.F12.anota.prieto -->
Of the {{fila.prieto.nwords}} words in Prieto's row, {{fila.prieto.documentos}} are tables and documents that the Diario prints with his speech.

<!-- fig.F12.anota.estatuto -->
Azaña's speech was under the Chair's name.

<!-- fig.F12.anota.azana1935 -->
A genuinely long speech: the same row in both editions.

<!-- fig.F12.salvedad -->
The v3 words are shared out in proportion to the text of each piece. The row-by-row correspondence is not published.

<!-- fig.F12.alt -->
Three bars, one per V2 row. Prieto's splits into speech and documents; the Statute one, into the Chair and Azaña's speech; the 1935 one stays whole.
