# Copy EN · The explorer (`/[lang]/explorador/`)

> [nota de diseño] Traducción de `docs/copy_es/explorador.md` (congelado, 23-09-2026), según
> `docs/03a_GLOSARIO_es-en.md`. Las notas de diseño están en el archivo español. La herramienta está solo en español:
> sus botones, paneles, diálogos, nombres de biblioteca y consultas se citan en español entre «», con glosa inglesa
> entre paréntesis la primera vez. Las consultas de F29 (`fig.F29.*.consulta`) no se traducen.

---

## Metadata

<!-- explorador.meta.titulo -->
The explorer

<!-- explorador.meta.descripcion -->
Search, read and cite what was said in the Cortes of the Republic, without programming: what the explorer does, with real screenshots, and what it does not do.

## 8.1 Header

<!-- explorador.antetitulo -->
{{filas.v3}} interventions · about {{explorador.gz.bytes|peso_dec0}} compressed · dataset built on {{explorador.construido|fecha_corta}}

<!-- explorador.titulo -->
What does the explorer do, and what does it not do?

<!-- explorador.entrada -->
Search, read and cite what was said in the Cortes of the Republic. The explorer comes with the *Diarios de Sesiones*, the official printed record of the Cortes' proceedings, already loaded, with no account and no installation.

<!-- ↺ comun.fija.local -->
It opens in your browser; what you search for and save stays on your device.

<!-- ↺ comun.boton.explorador -->
[Open the explorer ↗]

<!-- explorador.idioma -->
The explorer is in Spanish only.

<!-- explorador.indice.encontrar -->
Finding

<!-- explorador.indice.busquedas -->
Sample searches

<!-- explorador.indice.leer -->
Reading

<!-- explorador.indice.bibliotecas -->
Libraries

<!-- explorador.indice.coocurrencias -->
Co-occurrences

<!-- explorador.indice.menciones -->
Mentions

<!-- explorador.indice.llevar -->
Taking it away, cited

<!-- explorador.indice.empezar -->
How to start

<!-- explorador.indice.limites -->
What it does not do

## 8.2 First, finding

<!-- explorador.encontrar.antetitulo -->
{{habla.v3}} of the {{filas.v3}} interventions are speech

<!-- explorador.encontrar.titulo -->
First, finding

<!-- explorador.encontrar.entrada -->
Before reading, you have to find. The explorer searches by text, by who is speaking and by the calendar.

<!-- explorador.p1.titulo -->
What was said?

<!-- explorador.p1.texto -->
It searches the full text of each intervention (the explorer's term, *intervención*), ignoring accents and capitals. Quotation marks search for the exact phrase; `+` requires both words and `|` accepts either. A line under the search box says how the query has been understood.

<!-- explorador.p2.titulo -->
Who, when and from which group?

<!-- explorador.p2.texto -->
It filters by date, session number, legislature, political family, ideology, party, deputy, district and length. «Solo lo que se habla» (only what is spoken) leaves out each session's summary. It also leaves out what the *Diario* prints without anyone saying it: voting lists, committee reports read out, the Bureau's account. A bar divides the results by ideology, and a click on a segment filters them.

<!-- explorador.p3.titulo -->
At what point in the debate?

<!-- explorador.p3.texto -->
Each result opens like a page of the *Diario*, with the turns around it or with the whole session. The next section describes this.

<!-- explorador.p4.titulo -->
When was this discussed?

<!-- explorador.p4.texto -->
«Tendencia» (trend) plots the frequency of one or more terms, month by month or year by year, per ten thousand words. Months without a session are hatched, and a click on a month lists its interventions. Here the asterisk does work: `agrari*` gathers agraria, agrario, agrarios and the other forms.

<!-- explorador.p4.hitos -->
The numbered milestones are placed by the explorer; they are not a chronology reviewed by this site.

<!-- ↺ comun.fija.contar -->
Counting a word does not tell you who defends it or in what tone.

## 8.2 bis · Sample searches (F29)

<!-- explorador.busquedas.antetitulo -->counts of {{busquedas.fecha|fecha_corta}}

<!-- explorador.busquedas.titulo -->
Sample searches

<!-- explorador.busquedas.entrada -->
These are real queries, counted in the explorer. Copy them, paste them into the search box and compare the count.

<!-- ↺ comun.fija.enlace -->
The explorer cannot open a search from a link: copy the query and paste it into its search box (/ key).

<!-- fig.F29.titulo -->
Queries and counts

<!-- fig.F29.pregunta -->
What does the search box return for real queries?

<!-- fig.F29.que_mide -->
How many interventions each query returns in the explorer's search box, with and without «Solo lo que se habla».

<!-- fig.F29.denominador -->
The {{filas.v3}} interventions of the explorer; with «Solo lo que se habla», {{habla.v3}}.

<!-- fig.F29.voto_femenino.consulta -->
"voto femenino"

<!-- fig.F29.voto_femenino.recuento -->
{{busqueda.voto_femenino.n}} interventions.

<!-- fig.F29.voto_femenino.nota -->
The exact phrase (‘women's vote’), in quotation marks.

<!-- fig.F29.voto_mujer.consulta -->
"voto de la mujer"

<!-- fig.F29.voto_mujer.recuento -->
{{busqueda.voto_mujer.n}} interventions.

<!-- fig.F29.voto_mujer.nota -->
The same idea (‘the vote of women’), in other words.

<!-- fig.F29.voto_union.consulta -->
"voto femenino" | "voto de la mujer"

<!-- fig.F29.voto_union.recuento -->
{{busqueda.voto_union.n}} interventions.

<!-- fig.F29.voto_union.nota -->
Both phrases, joined with `|`. They do not simply add up: {{busqueda.voto_ambas.n}} interventions contain both.

<!-- fig.F29.casas_viejas.consulta -->
"casas viejas"

<!-- fig.F29.casas_viejas.recuento -->
{{busqueda.casas_viejas.n}} interventions.

<!-- fig.F29.casas_viejas.nota -->
The name first appears on {{busqueda.casas_viejas.primera|fecha_larga}}. With «Solo lo que se habla», {{busqueda.casas_viejas.habla}}.

<!-- fig.F29.divorcio.consulta -->
divorcio

<!-- fig.F29.divorcio.recuento -->
{{busqueda.divorcio.n}} interventions.

<!-- fig.F29.divorcio.nota -->
A single word (‘divorce’). With «Solo lo que se habla», {{busqueda.divorcio.habla}}.

<!-- fig.F29.reforma_agraria.consulta -->
"reforma agraria"

<!-- fig.F29.reforma_agraria.recuento -->
{{busqueda.reforma_agraria.n}} interventions.

<!-- fig.F29.reforma_agraria.nota -->
With quotation marks, the exact phrase (‘agrarian reform’). Without them, it is enough for both words to appear: {{busqueda.reforma_agraria_y.n}}.

<!-- fig.F29.estatuto.consulta -->
"estatuto de cataluña"

<!-- fig.F29.estatuto.recuento -->
{{busqueda.estatuto.n}} interventions.

<!-- fig.F29.estatuto.nota -->
With «Solo lo que se habla», {{busqueda.estatuto.habla}}: the rest are summaries and *Diario* comments.

<!-- fig.F29.catolica.consulta -->
"España ha dejado de ser católica"

<!-- fig.F29.catolica.recuento -->
{{busqueda.catolica.n}} interventions.

<!-- fig.F29.catolica.nota -->
Azaña's, of 13 October 1931, comes out in position {{busqueda.catolica.puesto_azana}}: the list is sorted by relevance unless you choose the date.

<!-- fig.F29.salvedad -->
Counts of {{busquedas.fecha|fecha_larga}} on the explorer dataset with checksum {{v3.huella}}; they change if that dataset changes.

<!-- fig.F29.alt -->
List of queries for the explorer's search box, each with its number of interventions and a note.

<!-- fig.F29.leyenda.habla -->
What is spoken

<!-- fig.F29.leyenda.resto -->
Summaries and *Diario* comments

<!-- fig.F29.leyenda.lectura -->
The whole bar is the search box count; its gold segment, what remains with «Solo lo que se habla». All bars share the same scale.

<!-- fig.F29.nota -->
{{n}} interventions · {{habla}} with «Solo lo que se habla» · {{resto}} from summaries and comments

<!-- fig.F29.tabla.col.consulta -->
Query

<!-- fig.F29.tabla.col.n -->
Interventions

<!-- fig.F29.tabla.col.habla -->
Only what is spoken

<!-- fig.F29.tabla.col.resto -->
Summaries and comments

<!-- fig.F29.tabla.col.fechas -->
First and last

## 8.3 Reading as in the Diario

<!-- explorador.leer.antetitulo -->
Screenshots of {{explorador.capturas.fecha|fecha_corta}} · session 48, 1-X-1931

<!-- explorador.leer.titulo -->
Reading as in the Diario

<!-- explorador.leer.entrada -->
Finding is half the work; the other half is reading. The explorer shows each intervention as a page of the *Diario*, within its session.

<!-- explorador.leer.lector -->
The reader gives the speaker label in full («La señorita CAMPOAMOR») and, separately, the literal heading the *Diario* printed («La Srta. CAMPOAMOR:»); it also gives the session, the date, the party and the district. Paragraphs are numbered so that they can be cited. Below, the session thread shows the preceding and following turns.

<!-- explorador.leer.acotaciones -->
The *Diario*'s bracketed notes (*acotaciones*) are marked by class: applause in green, murmurs in terracotta, gestures and laughter in grey.

<!-- explorador.leer.corrida -->
«Sesión corrida» (full session) opens the whole session, from beginning to end, with the intervention framed in its place.

<!-- explorador.leer.careo -->
«Carear» (compare) sets two interventions side by side, each with its own scrolling. Within the same session it suggests replies based on mentions of a surname or office, transcribed interruptions, closeness in the debate and political distance.

<!-- explorador.leer.careo_limite -->
These are suggestions, not proven exchanges, and the explorer itself warns of this. Sometimes it suggests the session summary or the *Diario*'s comments as a reply, although they are nobody's words.

<!-- explorador.leer.mismo -->
«Mismo diputado» (same deputy) looks for interventions by the same speaker, in other sessions, with similar vocabulary.

## 8.4 Then, focusing: the libraries

<!-- explorador.bibliotecas.antetitulo -->
{{bib.n}} libraries · {{bib.entradas}} entries

<!-- explorador.bibliotecas.titulo -->
Then, focusing: the libraries

<!-- explorador.bibliotecas.entrada -->
A whole corpus is not a question. A library is.

<!-- explorador.bibliotecas.que_es -->
A library is your own selection of interventions on a subject. You gather it with searches, refine it by reading and save it with your notes and tags.

<!-- explorador.bibliotecas.guardar -->
It is saved in your browser. To share it or keep a separate copy, export it to a `.2replib` file.

<!-- explorador.bibliotecas.proyecto -->
The explorer comes with {{bib.n}} libraries prepared by the project. They are debates, selections of sessions, the main speeches and one of anecdotes and threats. They are added from «Mis bibliotecas › Añadir bibliotecas del proyecto…» (My libraries › Add project libraries…). In that dialogue, each debate is preceded by «Debate · »; this site names it without that prefix.

<!-- explorador.bib.entradas -->
They hold {{bib.entradas}} entries; the same intervention can be in more than one library.

<!-- explorador.bibliotecas.f17 -->
The chart places them in time: one lane per library and one mark per session, larger the more entries it holds.

<!-- explorador.bibliotecas.enteras -->
{{bib.debates_enteros|letra}} of the {{bib.debates}} debates gather their sessions whole, everything spoken in them. That is why the one on votes for women also includes the death penalty and the Telefónica strike.

<!-- explorador.bibliotecas.lexico -->
For a library, the explorer calculates its lexicon: the words that set it apart from the rest of the corpus, measured with Dunning's G² and the log-ratio.

### F17 · The project's libraries, over time

<!-- fig.F17.titulo -->
The project's libraries, over time

<!-- fig.F17.pregunta -->
What does the explorer come with ready-made, and when did it happen?

<!-- fig.F17.que_mide -->
The sessions that each project library gathers, with its entries per session.

<!-- fig.F17.denominador -->
The {{bib.n}} libraries the explorer offers, with {{bib.entradas}} entries.

<!-- fig.F17.leyenda.discursos -->
Speeches

<!-- fig.F17.leyenda.debates -->
Debates

<!-- fig.F17.leyenda.sesiones -->
Sessions

<!-- fig.F17.leyenda.anecdotas -->
Anecdotes and threats

<!-- fig.F17.nota -->
{{nombre}} · {{entradas}} entries in {{sesiones}} sessions · from {{desde}} to {{hasta}}

<!-- fig.F17.nota.sesion -->
{{nombre}} · {{fecha}}, session {{num}} · {{entradas}} entries

<!-- fig.F17.ficha.oradores -->
Who has the most words, without the Chair

<!-- fig.F17.ficha.copiar -->
[Copy the debate name]

<!-- fig.F17.ficha.copiar_bib -->
[Copy the library name]

<!-- fig.F17.ficha.como -->
In the explorer: «Mis bibliotecas › Añadir bibliotecas del proyecto…», and tick this one.

<!-- fig.F17.tabla.col.nombre -->
Library

<!-- fig.F17.tabla.col.grupo -->
Group

<!-- fig.F17.tabla.col.entradas -->
Entries

<!-- fig.F17.tabla.col.sesiones -->
Sessions

<!-- fig.F17.tabla.col.desde -->
From

<!-- fig.F17.tabla.col.hasta -->
To

<!-- fig.F17.salvedad -->
An intervention can be in more than one library. The selections of sessions also include the summaries and the *Diario* comments; the debates do not.

<!-- fig.F17.alt -->
Horizontal lanes over the years 1931 to 1945, one per project library, grouped into speeches, debates, sessions and anecdotes; each session is a mark, larger the more entries it holds.

<!-- fig.F17.leyenda.marca -->
Each mark is a session; its height grows with the entries it holds (as their square root), and sessions with few entries have a minimum height. The tallest, {{max}}.

<!-- fig.F17.leyenda.salto -->
From {{meses.salto.desde|mes}} to {{meses.salto.hasta|mes}}, no sessions: the axis is broken.

<!-- fig.F17.abrir -->
See its record

<!-- fig.F17.ficha.resumen -->
{{entradas}} entries in {{sesiones}} sessions, from {{desde}} to {{hasta}}.

<!-- fig.F17.ficha.enteras -->
It gathers its sessions whole: everything spoken in them.

<!-- fig.F17.ficha.seleccion -->
It is a selection: only the parts of each session that deal with the subject.

<!-- fig.F17.ficha.acta -->
It includes the full minutes: the summary and the *Diario* comments as well ({{n}} entries).

<!-- fig.F17.ficha.descripcion -->
What the explorer says, without its internal references

<!-- fig.F17.ficha.criterio -->
This is the name the explorer gives it; its criterion is not described here.

<!-- fig.F17.ficha.en_explorador -->
In the explorer it is called «{{nombre}}».

<!-- fig.F17.ficha.palabras -->
{{n}} words

<!-- fig.F17.ficha.cerrar -->
Close the record

## 8.5 Co-occurrences

<!-- explorador.coocurrencias.titulo -->
Co-occurrences: what is discussed within a library

<!-- explorador.coocurrencias.que_es -->
Which words appear together? The explorer takes the library's characteristic vocabulary and calculates which terms share an intervention. Where that network clusters, it suggests a candidate topic.

<!-- explorador.coocurrencias.temas -->
Each topic comes with its terms, how many interventions contain it and what share of the text it takes up. You review it in the list, mark it or search for it across the whole corpus.

<!-- explorador.coocurrencias.partidos -->
Each topic also has a party axis: how much each party uses that vocabulary, in multiples of the mean. It is an axis of topics, not an ideological axis.

<!-- explorador.coocurrencias.lector -->
In the reader, the «Tema» (topic) option colours each term with the colour of its topic.

<!-- explorador.coocurrencias.metodo -->
The method is in view, with its parameters, and the same parameters give the same result. The network is calculated and exported; it is not drawn.

<!-- explorador.coocurrencias.aviso -->
In a library of whole sessions, not every topic belongs to the debate: in those on votes for women, the death penalty and the strike also appear.

## 8.6 Mentions

<!-- explorador.menciones.titulo -->
Mentions: who names whom

<!-- explorador.menciones.que_es -->
In a debate, speakers name one another. The explorer recognises those mentions and counts them between parties, per ten thousand words.

<!-- explorador.menciones.solo_matriz -->
It also draws a network and some conversation clusters. We do not show them here: in this example they merge misread names of different people.

<!-- explorador.menciones.limites.titulo -->
Before you read the table

<!-- explorador.menciones.limites.tono -->
It says who names whom, not whether they do so in favour or against.

<!-- explorador.menciones.limites.focos -->
Conversation clusters are not coalitions.

<!-- explorador.menciones.limites.precision -->
The precision it states was measured by hand in other parliaments, not in this corpus. It does not count indirect references, such as «su señoría» (your honour).

<!-- explorador.menciones.limites.cargos -->
Offices mentioned without a name, such as «el señor ministro» (the minister), are left unattributed.

<!-- explorador.menciones.limites.externos -->
A misread name, or one spelt differently, counts as a person ‘external’ to the Chamber.

## 8.7 Taking it away, cited

<!-- explorador.llevar.titulo -->
Taking it away, cited

<!-- explorador.llevar.formatos -->
It exports results to CSV, to a readable Markdown document, to JSON and to a reference list. Libraries can also be exported as `.2replib`.

<!-- explorador.llevar.en_cada -->
Each file carries the corpus citation. In the CSV it is in the header lines and in two columns of every row.

<!-- explorador.llevar.copiar_pasaje -->
If you copy a passage with the keyboard, the clipboard also takes the source.

<!-- explorador.llevar.enlace -->
[See how to cite]

## 8.8 How to start

<!-- explorador.empezar.titulo -->
How to start

<!-- explorador.empezar.paso1 -->
**Open the explorer on a computer.** It asks for no account and no form: the *Diarios* come with it.

<!-- explorador.empezar.paso2 -->
**Wait while it prepares the dataset.** It downloads about {{explorador.gz.bytes|peso_dec0}} compressed and builds the dataset in your browser.

<!-- explorador.empezar.paso3 -->
**Search.** The / key takes you to the search box, and Enter runs the query.

<!-- explorador.empezar.botones -->
[Open the explorer ↗] [Download the data]

## 8.9 What it needs, and what it does not do

<!-- explorador.limites.titulo -->
What it needs, and what it does not do

<!-- explorador.no_hace.equipo -->
It needs a computer, not a phone: on a narrow screen, the reader does not fit.

<!-- explorador.no_hace.significado -->
It does not search by meaning: it finds words exactly as they are written. For variants, join them with `|`.

<!-- explorador.no_hace.operadores -->
The search box does not accept the asterisk, NOT or proximity search. The asterisk works only in «Tendencia».

<!-- explorador.no_hace.mismo_diputado -->
«Mismo diputado» compares words, not meanings, although the help speaks of similarity by meaning.

<!-- explorador.no_hace.cabecera -->
The full session view does not give the *Diario* issue number, the pages, the Chair or the Government, although the help announces them.

<!-- explorador.no_hace.filtros -->
It does not filter by sex or by type of session.

<!-- explorador.no_hace.nombres -->
It writes deputies' names without accents, as they are in the dataset.

<!-- explorador.no_hace.palabras -->
The help, «Tendencia» and «Léxico» (lexicon) give different word totals, because they count in different ways.

<!-- explorador.no_hace.enlace -->
[See how words are counted]

<!-- ↺ comun.fija.ocr -->
The text comes from optical character recognition and has not been corrected by hand.

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

## Captions and alternative texts for the screenshots

<!-- explorador.img.busqueda.pie -->
`"voto femenino" | "voto de la mujer"`: {{busqueda.voto_union.n}} interventions, from {{busqueda.voto_union.desde|fecha_larga}} to {{busqueda.voto_union.hasta|fecha_larga}}. Above the list, their distribution by ideology.

<!-- explorador.img.busqueda.alt -->
The search for «voto femenino» or «voto de la mujer» in the explorer: {{busqueda.voto_union.n}} interventions, their distribution by ideology and the results with the phrase highlighted.

<!-- explorador.img.tendencia.pie -->
«Casas viejas» month by month in the Constituent Cortes: nothing in January 1933, because there were no sessions. In February, {{busqueda.casas_viejas.m1933_02}} interventions, counting summaries and comments. With «Solo lo que se habla» and «aplicar filtros» (apply filters), {{busqueda.casas_viejas.m1933_02_habla}}.

<!-- explorador.img.tendencia.alt -->
The «Tendencia» panel with «casas viejas» month by month in the Constituent Cortes: January 1933 hatched, with no sessions, and the February 1933 note with {{busqueda.casas_viejas.m1933_02}} interventions.

<!-- explorador.img.lector.pie -->
Clara Campoamor, 1 October 1931, in the reader: the *Diario* heading, the intervention's record and the numbered paragraphs.

<!-- explorador.img.lector.alt -->
The explorer's reader with Clara Campoamor's intervention of 1 October 1931: the label «La señorita CAMPOAMOR», its record and the first numbered paragraph.

<!-- explorador.img.acotaciones.pie -->
The same intervention, close up: applause in green, a gesture in grey and murmurs in terracotta, as the *Diario* noted them.

<!-- explorador.img.acotaciones.alt -->
Three paragraphs of Campoamor's intervention in the reader: a bracketed note of applause in green, a gesture in grey and a block of murmurs in terracotta.

<!-- explorador.img.corrida.pie -->
The full session, with Campoamor's intervention framed in its place.

<!-- ↺ comun.fija.sesion48 -->
Session 48 as it stands in the corpus: the end of the digitised minutes was lost in optical character recognition.

<!-- explorador.img.corrida.alt -->
The full session of 1 October 1931 in the explorer, with Clara Campoamor's intervention framed in gold as the reference intervention.

<!-- explorador.img.careo.pie -->
Campoamor facing Victoria Kent: a suggested reply, not a proven exchange. Above, the other suggestions, among them the summary and the *Diario* comments.

<!-- explorador.img.careo.alt -->
The explorer's comparison view: on the left, Clara Campoamor's intervention; on the right, Victoria Kent's, marked as a suggested reply; above, the other suggestions.

<!-- explorador.img.bibliotecas.pie -->
The project's libraries, in the dialogue that adds them to yours.

<!-- explorador.img.bibliotecas.alt -->
The explorer dialogue that adds the libraries prepared by the project, with the one on votes for women, of {{bib.sufragio.n}} interventions, ticked.

<!-- explorador.img.lexico.pie -->
The lexicon of the sessions on votes for women, 30 September and 1 October 1931, compared with the rest of the corpus. «Pena de muerte» (death penalty) comes right after «mujer» (woman): these are the whole sessions.

<!-- explorador.img.lexico.alt -->
The lexicon table of the library on votes for women: «mujer» heads the list and «pena de muerte» comes right after it.

<!-- explorador.img.coocurrencias.pie -->
A candidate topic from the sessions on votes for women, with its terms and the parties according to how much they use that vocabulary.

<!-- explorador.img.coocurrencias.alt -->
A candidate topic from the sessions on votes for women, «mujer española, mujer, femenina»: its terms and an axis with the parties according to how much they use that vocabulary.

<!-- explorador.img.menciones.pie -->
Mentions between parties in the sessions on votes for women, per ten thousand words. The diagonal is how often each party names itself.

<!-- explorador.img.menciones.alt -->
Table of mentions between parties in the sessions on votes for women, per ten thousand words, with each party's cell with itself outlined.

<!-- explorador.img.exportar.pie -->
Exporting a search: the CSV carries the citation in its header lines and in every row.

<!-- explorador.img.exportar.alt -->
The explorer's export dialogue: CSV with the full text, and a box explaining that the file carries the citation at the start and in every row.
