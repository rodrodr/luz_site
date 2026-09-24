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
The dates

<!-- metodo.indice.07 -->
Party, family and ideology

<!-- metodo.indice.08 -->
What it does not claim

<!-- metodo.indice.09 -->
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

<!-- metodo.01.pruebelo.consulta -->
"me escuche en silencio"

<!-- metodo.01.pruebelo.explorador -->
Search for the phrase in quotation marks and open the result. The reader numbers it «Orden {{fila.campoamor.orden.pantalla|id}} de {{sesion.1931-10-01-48.filas_v3}}»: it is the same row, counted in the explorer. [Open the explorer ↗]

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

<!-- ↺ comun.fija.ocr -->
The text comes from optical character recognition and has not been corrected by hand.

<!-- metodo.03.texto.2 -->
Reading errors are in the text and also in the speaker headings, which are what tell us who is speaking. Try correcting a few yourself.

> [design note] See the Spanish copy: the order is texto · ↺ fija.ocr · texto.2 · the «Proofread the Diario» game
> (`metodo.03.juego.*`) · `metodo.03.incidencias` · ↺ fija.sesion48 · the last five rows of session 48.

<!-- metodo.03.juego.titulo -->
Proofread the Diario

<!-- metodo.03.juego.entrada -->
This is how the machine read a speaker heading. Correct it: every reading is in the dataset, exactly as shown.

<!-- metodo.03.juego.leyo -->
The machine read

<!-- metodo.03.juego.debe -->
It should say

<!-- metodo.03.juego.campo -->
Your correction

<!-- metodo.03.juego.corregir -->
[Correct]

<!-- metodo.03.juego.dejar -->
[Leave it]

<!-- metodo.03.juego.rendirse -->
[I give up]

<!-- metodo.03.juego.cuenta -->
Heading {{i}} of {{formulas}}

<!-- metodo.03.juego.filas -->
It appears like this in {{n}} rows of the dataset.

<!-- metodo.03.juego.filas.una -->
It appears like this in one row of the dataset.

<!-- metodo.03.juego.casi -->
Not yet. Compare letter by letter from «{{desde}}».

<!-- metodo.03.juego.bien -->
Corrected.

<!-- metodo.03.juego.r.punto -->
A full stop. Easy. But the Diario has more pages.

<!-- metodo.03.juego.r.coma -->
A comma where a full stop should be. The machine has its habits, and it repeats them.

<!-- metodo.03.juego.r.ei -->
On worn paper, an l and an i look far too alike.

<!-- metodo.03.juego.r.persidente -->
Two letters swap places: it happens to anyone, machines included.

<!-- metodo.03.juego.r.siete -->
A seven in the middle of the word. Nobody knows where it came from.

<!-- metodo.03.juego.r.articulo -->
A single letter, and the President gets a feminine article.

<!-- metodo.03.juego.r.residente -->
Without the P, the President becomes a resident.

<!-- metodo.03.juego.r.campoamor -->
Names do not escape either: Campoamor, with an o.

<!-- metodo.03.juego.r.gil_robles -->
Of «GIL», the machine only recognised the L.

<!-- metodo.03.juego.trampa -->
And this one? Do you correct it or leave it as it is?

<!-- metodo.03.juego.trampa.cayo -->
Stop! It was not an error: the extracts of 1938 and 1939 and the Mexico sessions spell out «señor» in full. You have just corrected the Diario.

<!-- metodo.03.juego.trampa.bien -->
Well spotted: it was not an error. The extracts of 1938 and 1939 and the Mexico sessions spell out «señor» in full.

<!-- metodo.03.juego.resumen.hechas -->
You corrected {{n}} headings in {{tiempo}}.

<!-- metodo.03.juego.resumen.una -->
You corrected one heading in {{tiempo}}.

<!-- metodo.03.juego.resumen.cero -->
You corrected none. We do not blame you.

<!-- metodo.03.juego.resumen.dimension -->
The Chair's heading alone is written in {{formas}} different ways in the dataset, and there are {{formulas}} distinct speaker headings.

<!-- metodo.03.juego.resumen.ritmo -->
At your pace, checking them all would take you {{total}}.

<!-- metodo.03.juego.leccion -->
That is why the text is not corrected by hand. The tagging accepts the reading variants, and the link between each heading and its deputy was checked row by row.

<!-- metodo.03.juego.otra -->
[Start again]

<!-- metodo.03.juego.tabla -->
Some of the machine's readings, as they stand in the dataset

<!-- metodo.03.juego.tabla.col.leyo -->
The machine read

<!-- metodo.03.juego.tabla.col.debe -->
It should say

<!-- metodo.03.juego.tabla.col.filas -->
Rows

<!-- metodo.03.juego.tabla.no_errata -->
not an error

<!-- metodo.03.incidencias -->
The project's session metadata declare {{ocr.incidencias|letra}} incidents. Both can be seen in the corpus:

- Session 9, of 27 July 1931, ends in a loop: it repeats «Sánchez Guerra, Ossorio y Gallardo» {{ocr.bucle9.repeticiones|letra}} times.
- Session 48, of 1 October 1931, lost its end. Its last {{ses.s48.cola|letra}} rows repeat «Pido la palabra», and the last one breaks off at «El Sr. Ministro de».

<!-- ↺ comun.fija.sesion48 -->
Session 48 as it stands in the corpus: the end of the digitised minutes was lost in optical character recognition.

<!-- metodo.03.cola.rotulo -->
The last {{ses.s48.cola|letra}} rows of session 48, as they stand in the dataset

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
{{longitud.hasta50.pct}} of the rows have {{longitud.umbral}} words or fewer. The median is {{longitud.mediana|letra}} words.

More than half of those short rows belong to the Chair: {{longitud.hasta50.presidencia.pct}}.

At the other end, sort the rows from longest to shortest and take the first {{longitud.curva.corte|pct0}}. That slice holds {{longitud.curva.palabras|pct1}} of the words.

Length is not importance. A short row may be a vote or a decisive interruption.

**What is not speech.** The Diario also prints what nobody said aloud: voting lists, committee reports, written requests, tables and the account of the session.

The dataset keeps it in {{v3.comentarios}} rows of their own, «Comentarios del Diario» (the Diario's comments). Each session also opens with its summary.

In the explorer, the «Solo lo que se habla» (speech only) box leaves out summaries and comments. That leaves {{habla.v3}} of the {{filas.v3}} interventions.

The separation follows an audit by the project. That a row is kept as speech does not prove that all its text was spoken in the plenary.

<!-- metodo.05.pruebelo.consulta -->
"casas viejas"

<!-- metodo.05.pruebelo.explorador -->
Search for the phrase twice, with the «Solo lo que se habla» box ticked and without it. The difference is summaries and comments from the Diario, not anyone's speech. [Open the explorer ↗]

<!-- metodo.05.pruebelo.codigo -->
```python
(d.nwords <= 50).mean()   # the share of short rows
```

---

## 06 · How was each session dated?

<!-- metodo.06.titulo -->
How was each session dated?

<!-- metodo.06.entrada -->
Each date was checked against four sources, session by session.

<!-- metodo.06.texto -->
The audit cross-checked four independent sources for each session:

- the running headers of each printed page;
- the session heading, «SESIÓN CELEBRADA…» (session held…);
- the dates cited in the text itself;
- the sequence of Diario numbers, with the day of the week.

To settle a date it required two independent indications, or an unambiguous printed header.

The paper makes mistakes too. The title page of a volume may give the date on which those Cortes began, not that of the session. And some headings carry a printer's error or a damaged digit that optical character recognition misread.

The audit has a limit: it does not detect a date error that is consistent with the sequence.

<!-- metodo.06.salvedad -->
The audit's table of evidence is not deposited.

<!-- metodo.06.pruebelo.explorador -->
With no search text, choose the 1933-1935 legislature and type 77 in «Nº de sesión» (session no.). All its interventions are from 4 May 1934. [Open the explorer ↗]

<!-- metodo.06.pruebelo.codigo -->
```python
d[(d.legislature == "1933-1935") & (d.num_session == 77)].date.unique()
```

---

## 07 · What do party, family and ideology mean?

<!-- metodo.07.titulo -->
What do party, family and ideology mean?

<!-- metodo.07.entrada -->
The three columns describe the deputy, not the row. They come from the project's table of deputies.

<!-- metodo.07.texto -->
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

<!-- metodo.07.salvedad -->
A broad category serves to compare blocs, not to classify a person.

<!-- metodo.07.pruebelo.explorador -->
Choose the CEDA party in the filters and open the «Ideología» facet. You will see more than one code. [Open the explorer ↗]

<!-- metodo.07.pruebelo.codigo -->
```python
d[d.party == "CEDA"].ideology.value_counts()
```

---

## 08 · What does the corpus not claim, and how should you compare?

<!-- metodo.08.titulo -->
What does the corpus not claim, and how should you compare?

<!-- metodo.08.entrada -->
The dataset says who spoke, when and how much. It does not say about what, in what tone, from what position or how they voted.

<!-- metodo.08.texto -->
**Legislatures are unequal.** The first holds {{leg.1931-1933.palabras.pct}} of the words.

Compare rates, not volumes: words per session, or each group's share within its legislature.

**The vote is not a column.** Roll-call votes are in the text, as lists of names, in rows of the Diario's comments.

**Tone is not measured.** The shorthand writer's bracketed notes, «(Rumores.)», «(Aplausos.)», are in the text. Nobody has turned them into a variable of the dataset.

<!-- ↺ comun.fija.contar -->
Counting a word does not tell you who defends it or in what tone.

<!-- metodo.08.salvedad -->
That the Diario records something does not make it true: the dataset transcribes what was printed; it does not verify it.

<!-- metodo.08.pruebelo.consulta -->
"total 161"

<!-- metodo.08.pruebelo.explorador -->
Search for the phrase with the «Solo lo que se habla» box ticked and without it. With the box ticked, the list disappears: it is a comment from the Diario. [Open the explorer ↗]

<!-- metodo.08.pruebelo.codigo -->
```python
print(d.loc[d.id == 5453, "speech"].iloc[0])   # the list, inside the Chair's row
```

---

## 09 · Where is the full documentation?

<!-- metodo.09.titulo -->
Where is the full documentation?

<!-- metodo.09.entrada -->
What is deposited, what is not, and what this site publishes.

<!-- metodo.09.texto -->
**Deposited in Harvard Dataverse:** the CSV, the README and the change logs, in Spanish and English.

<!-- metodo.09.texto.2 -->
**Not deposited.** The session metadata (Diario, pages, President of the Cortes and Government) and the table of deputies against which each heading was linked, which the README offers on request.

**On this site:** the exporter that computes each number, and a file, `procedencia.csv`, with the formula and date of all of them.

What has no public address is not linked.

<!-- metodo.09.enlace -->
[Where each number comes from]

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

<!-- metodo.09.pruebelo.explorador -->
Open «Sobre este corpus» (about this corpus), in the explorer's side panel: it gives the dataset's citation. [Open the explorer ↗]

<!-- metodo.09.pruebelo.codigo -->
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

<!-- fig.F20.nota.columna -->
{{columna}} · {{definicion}}

<!-- fig.F20.enlace -->
[See what each column holds]

<!-- fig.F20.texto.cortado -->
The text continues; only its beginning is shown here.

<!-- fig.F20.salvedad -->
Campoamor's ideology is C because it is that of her party, the Radical Party.

<!-- fig.F20.alt -->
Two rows of the CSV laid out in their columns: the Chair asks for silence in {{fila.presidencia.nwords|letra}} words and Clara Campoamor begins her speech, of {{fila.campoamor.nwords}} words.

<!-- fig.F20.grupo.sesion -->
The session and the row's place

<!-- fig.F20.grupo.texto -->
What was printed

<!-- fig.F20.grupo.diputado -->
The deputy, if identified

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
Scanned to PDF from the historical archive of the Congress. They are the sessions of the three legislatures and those of Mexico, in 1945.

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
How many rows fall into each length band, or how many words they add up to, with the Chair's rows shown separately.

<!-- fig.F10.denominador -->
The {{filas.V2}} rows, or their {{palabras.V2}} words counted with `nwords`.

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

<!-- fig.F10.salvedad -->
What is measured is length; ‘procedural’ is an interpretation. The Chair is recognised by its printed heading, with the explorer's parser.

<!-- fig.F10.alt -->
Histogram of the length of the rows. Most are short and belong to the Chair; when words are counted, the mass shifts to the long rows.

### F12 · The longest row is not a speech (section 06)
