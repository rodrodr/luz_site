# Copy EN · Sessions and votes (index), gateway template, F26 and F30

> [nota de diseño] Traducción de `docs/copy_es/sesiones.md` (español congelado, 23-09-2026), según
> `docs/03a_GLOSARIO_es-en.md`. Las notas de diseño del original no se traducen: véanse en el archivo español.
> Las traducciones de las citas del Diario están en `_trad_pendientes.txt`, hasta que exista la clave `.trad`.

---

## 1. Sessions and votes · index (`/en/cortes/sesiones/`)

### 1.0 Header

<!-- sesiones.meta.titulo -->
Sessions and votes

<!-- sesiones.meta.descripcion -->
What the Cortes of the Republic voted on by name, moments of the Diario to read in full, and how to find any session.

<!-- sesiones.antetitulo -->
The Cortes · Sessions and votes

<!-- sesiones.h1 -->
What was said that day, and what was voted?

<!-- sesiones.entrada -->
The dataset does not hold the vote in a column. The Diario holds it, in the text of the session: who said yes, who said no and how many they were.

<!-- sesiones.entrada.2 -->
This page shows how to read that text, opens up some moments of the Diario and explains how to reach any other session.

### 1.1 What was voted aloud (F26, full) · anchor `#votaciones`

<!-- sesiones.votos.antetitulo -->
Roll-call votes

<!-- sesiones.votos.titulo -->
What was voted aloud

<!-- sesiones.votos.entrada -->
In a roll-call vote, the Diario prints two lists, «Señores que dijeron sí» and «Señores que dijeron no» (‘Members who said yes’ and ‘Members who said no’), each with its total.

<!-- sesiones.votos.cuantas -->
There are lists of this kind in at least {{voto.listas.sesiones}} of the {{sesiones.n}} sessions of the dataset.

<!-- sesiones.votos.seleccion -->
Here are {{voto.n|letra}} of them, in {{voto.sesiones|letra}} sessions, chosen because they close debates that this site tells.

<!-- sesiones.votos.etapas.entrada -->
These are all the rows with a list that this search finds, stage by stage:

<!-- sesiones.votos.etapas -->
- Constituent Cortes, 1931–1933: {{etapa.I.listas_nominales.filas}} rows, in {{etapa.I.listas_nominales.sesiones}} sessions.
- 1933–1935: {{etapa.II.listas_nominales.filas}} rows, in {{etapa.II.listas_nominales.sesiones}} sessions.
- Cortes of 1936: {{etapa.III.listas_nominales.filas}} rows, in {{etapa.III.listas_nominales.sesiones}} sessions.
- The Cortes at war: {{etapa.IV.listas_nominales.filas|letra}} rows, in {{etapa.IV.listas_nominales.sesiones|letra}} sessions.
- Mexico, 1945: none.

<!-- sesiones.votos.etapas.salvedad -->
It is a lower bound: optical character recognition breaks some headings, and some are printed differently. In Figueres, the list begins «Señores Diputados que dijeron SI», and the search does not find it.

<!-- sesiones.votos.ordinaria -->
On the same day, 1 October 1931, before the roll-call vote, an ordinary vote (by standing and sitting) rejected a motion of the Socialist group by {{voto.141-106.si}} votes to {{voto.141-106.no}}.

<!-- sesiones.votos.ordinaria.2 -->
For that vote the Diario gives no names: only the result.

<!-- sesiones.votos.kent -->
In the list for art. 34, Victoria Kent votes no and Clara Campoamor votes yes.

<!-- sesiones.votos.destitucion -->
On 7 April 1936 the Chamber votes on a motion declaring the January dissolution decree unnecessary.

<!-- sesiones.votos.destitucion.2 -->
The article of the Standing Orders read out in the session treats it as the removal from office of the President of the Republic, and requires a roll-call vote.

<!-- sesiones.votos.destitucion.no -->
{{voto.238-5.no|letra}} deputies vote no, and the list names them: Becerra, Portela, Benítez de Lugo, Canals and Rosado.

<!-- sesiones.votos.mas -->
The full lists will reach this same figure in edition 0.2, with one dot per printed name.

### 1.2 Eight reading gateways

<!-- sesiones.puertas.antetitulo -->
Reading gateways

<!-- sesiones.puertas.titulo -->
Moments to read in full

<!-- sesiones.puertas.entrada -->
Each gateway opens a moment of the Diario: what happened, what was said, how the floor was shared and how to find it in the explorer.

<!-- sesiones.puertas.cobertura -->
The {{ses.puertas|letra}} gateways cover {{ses.puertas.sesiones|letra}} sessions, from 1931 to 1945.

<!-- ↺ comun.fija.novalida -->
Their presence here does not validate their content.

<!-- sesiones.lista.sufragio-1931.fecha --> 1-X-1931
<!-- sesiones.lista.sufragio-1931.titulo --> Votes for women
<!-- sesiones.lista.sufragio-1931.linea --> Kent asks for it to be postponed; Campoamor, for it to be recognised now. The roll-call vote approves it.
<!-- sesiones.lista.sufragio-1931.filas --> {{sesion.1931-10-01-48.filas}} rows

<!-- sesiones.lista.cuestion-religiosa-1931.fecha --> 13-X-1931
<!-- sesiones.lista.cuestion-religiosa-1931.titulo --> «España ha dejado de ser católica»
<!-- sesiones.lista.cuestion-religiosa-1931.linea --> ‘Spain has ceased to be Catholic’ (our translation). Azaña speaks on the religious article. The session ends the next morning.
<!-- sesiones.lista.cuestion-religiosa-1931.filas --> {{sesion.1931-10-13-55.filas}} rows

<!-- sesiones.lista.estatuto-1932.fecha --> 27-V-1932
<!-- sesiones.lista.estatuto-1932.titulo --> The Statute of Catalonia
<!-- sesiones.lista.estatuto-1932.linea --> Azaña defends it in the longest spoken intervention in the corpus.
<!-- sesiones.lista.estatuto-1932.filas --> {{sesion.1932-05-27-173.filas}} rows

<!-- sesiones.lista.casas-viejas-1933.fecha --> 2-II-1933
<!-- sesiones.lista.casas-viejas-1933.titulo --> Casas Viejas
<!-- sesiones.lista.casas-viejas-1933.linea --> Azaña answers in the Chamber for the events. The minorities protest.
<!-- sesiones.lista.casas-viejas-1933.filas --> {{sesion.1933-02-02-288.filas}} rows

<!-- sesiones.lista.pistola-1934.fecha --> 4-VII-1934
<!-- sesiones.lista.pistola-1934.titulo --> Prieto's pistol
<!-- sesiones.lista.pistola-1934.linea --> An incident ends in blows, and Prieto admits that he drew his pistol. It is the last session before the summer.
<!-- sesiones.lista.pistola-1934.filas --> {{sesion.1934-07-04-112.filas}} rows

<!-- sesiones.lista.antesala-1936.fecha --> 16-VI and 1-VII-1936
<!-- sesiones.lista.antesala-1936.titulo --> The prelude
<!-- sesiones.lista.antesala-1936.linea --> Two debates on public order, weeks before the war. Some words are not recorded in the Diario.
<!-- sesiones.lista.antesala-1936.filas --> {{sesion.1936-06-16-45.filas}} and {{sesion.1936-07-01-54.filas}} rows

<!-- sesiones.lista.figueres-1939.fecha --> 1-II-1939
<!-- sesiones.lista.figueres-1939.titulo --> Figueres
<!-- sesiones.lista.figueres-1939.linea --> The last session of the Cortes in Spain, in the castle of Figueres. Only the official summary survives.
<!-- sesiones.lista.figueres-1939.filas --> {{sesion.1939-02-01-69.filas}} rows

<!-- sesiones.lista.mexico-1945.fecha --> 17-VIII and 7–9-XI-1945
<!-- sesiones.lista.mexico-1945.titulo --> Mexico
<!-- sesiones.lista.mexico-1945.linea --> In {{puerta.mexico-1945.sesiones|letra}} sessions, Martínez Barrio takes the oath as acting President of the Republic and Giral presents his Government.
<!-- sesiones.lista.mexico-1945.filas --> {{puerta.mexico-1945.filas}} rows

### 1.3 Any other session

<!-- sesiones.otra.antetitulo -->
Any other session

<!-- sesiones.otra.titulo -->
How to find a session in the explorer

<!-- sesiones.otra.entrada -->
All {{sesiones.n}} sessions are in the explorer, as the dataset holds them.

<!-- sesiones.otra.pasos -->
Open «Filtros › Fecha y sesión» (filters › date and session) and enter the same date in «Desde» (from) and «Hasta» (to). The list then shows the whole session, in order.

<!-- sesiones.otra.dobles -->
On some days there were two sessions; this happens on {{sesiones.fechas_dobles|letra}} dates. To separate them, also type the number in «Nº de sesión» (session no.).

<!-- sesiones.otra.habla -->
If you tick «Solo lo que se habla» (speech only), the summary and the Diario's comments disappear; they sit in rows of their own.

<!-- sesiones.otra.citar -->
To cite a session, its date and number are enough. To cite a passage, add the Diario, its pages and the row.

### 1.4 Present does not mean complete

<!-- sesiones.entera.antetitulo -->
Limits

<!-- sesiones.entera.titulo -->
Present does not mean complete

<!-- sesiones.entera.entrada -->
Each session is in the dataset as it came out of optical character recognition. Three cases show what that can cost.

<!-- sesiones.entera.s48 -->
The minutes of 1 October 1931 lost their end: the last {{ses.s48.cola|letra}} rows repeat «Pido la palabra.» (‘I ask for the floor.’), and the last one ends in «El Sr. Ministro de».

<!-- sesiones.entera.s9 -->
In the session of 27 July 1931, a single row repeats «Sánchez Guerra, Ossorio y Gallardo» {{ses.s9.bucle.veces|letra}} times in a row.

<!-- sesiones.entera.paginas -->
In the {{ses.paginas_sin_verificar|letra}} sessions after July 1936, the Diario's page numbers are unverified.

<!-- ↺ comun.sello.proyecto -->
Project metadata (not deposited; not shown in the explorer)

<!-- ↺ comun.fija.ocr -->
The text comes from optical character recognition and has not been corrected by hand.

---

## 2. Gateway template (`/en/cortes/sesiones/<name>/`)

<!-- sesiones.puerta.que_paso -->
What happened

<!-- sesiones.puerta.diario -->
What the Diario says

<!-- sesiones.puerta.turnos -->
The session, turn by turn

<!-- sesiones.puerta.votacion -->
The vote

<!-- sesiones.puerta.explorador -->
How to find it in the explorer

<!-- sesiones.puerta.no_esta -->
What is not there

<!-- sesiones.puerta.fuentes -->
Sources

<!-- sesiones.puerta.citar -->
How to cite a passage

<!-- sesiones.puerta.antetitulo.paginas -->
{{sigla}} no. {{diario}}, pp. {{paginas}}

<!-- sesiones.puerta.antetitulo.sinpaginas -->
{{serie}}, pages unverified

<!-- sesiones.puerta.serie.guerra --> Official summary
<!-- sesiones.puerta.serie.mexico --> Official summary of the sessions held in Mexico

### 2.1 The numbers beside F30

<!-- sesiones.puerta.cifras.titulo --> The session in numbers
<!-- sesiones.puerta.cifras.filas --> rows
<!-- sesiones.puerta.cifras.palabras --> words
<!-- sesiones.puerta.cifras.diputados --> deputies who speak outside the Chair
<!-- sesiones.puerta.cifras.largas --> rows of more than {{ses.umbral.largas}} words
### 2.2 The caption of each quotation

<!-- sesiones.puerta.cita.pie -->
{{orador}}

<!-- sesiones.puerta.cita.pie.palabras -->
{{orador}} · {{palabras}} words

<!-- sesiones.puerta.cita.pie.solo_v3 -->
{{orador}}

<!-- sesiones.puerta.cita.sic -->
[sic]: as in the digitised text.

### 2.3 How to find it

<!-- sesiones.puerta.fecha -->
In the explorer: «Filtros › Fecha y sesión», «Desde» and «Hasta» {{fecha}}.

<!-- sesiones.puerta.fecha.recuento -->
This gives {{n}} interventions in the explorer; with «Solo lo que se habla», {{habla}}.

<!-- sesiones.puerta.biblioteca -->
The ready-made debate «{{nombre}}» is under «Mis bibliotecas › Añadir bibliotecas del proyecto…».

<!-- sesiones.puerta.biblioteca.recuento -->
It gathers {{n}} interventions from {{sesiones}} sessions.

<!-- sesiones.puerta.biblioteca.donde -->
The ready-made debates are in the explorer, under «Mis bibliotecas › Añadir bibliotecas del proyecto…», with their names preceded by «Debate · ».

### 2.4 How to cite a passage

<!-- sesiones.puerta.citar.entrada -->
Give the Diario, its number, the date and the pages. If you work with the dataset, add the row id.

<!-- sesiones.puerta.citar.sinpaginas -->
{{diario}}, {{fecha}}. Luz y Taquígrafos, {{edicion}}, row {{id}}.

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

---

## 3. F26 · What was voted aloud (figure texts)

<!-- fig.F26.titulo -->
What was voted aloud

<!-- fig.F26.pregunta -->
What was voted on by name, and by how much?

<!-- fig.F26.asiento -->
{{voto.n}} selected votes · roll-call lists in at least {{voto.listas.sesiones}} of the {{sesiones.n}} sessions

<!-- fig.F26.leyenda.aria --> How to read each row

<!-- fig.F26.leyenda.si --> Said yes

<!-- fig.F26.leyenda.no --> Said no

<!-- fig.F26.leyenda.mitad --> Half plus one, where the Diario prints it

<!-- fig.F26.leyenda.total --> Up to the number of deputies the Diario gives

<!-- fig.F26.leyenda.ordinaria --> Ordinary vote: the Diario gives the result, not the names

<!-- fig.F26.filas.aria --> The votes, in date order

<!-- fig.F26.v.141-106 --> Motion of the Socialist group · ordinary vote
<!-- fig.F26.v.161-121 --> Art. 34 of the draft Constitution: votes for women
<!-- fig.F26.v.178-59 --> Art. 24 of the draft Constitution: the religious question
<!-- fig.F26.v.368-466 --> The Constitution, final vote
<!-- fig.F26.v.318-19 --> Agrarian Reform Bill (Ley de Bases), final vote
<!-- fig.F26.v.314-24 --> Statute of Catalonia Bill, final vote
<!-- fig.F26.v.238-5 --> Motion under art. 81: removal from office of the President of the Republic

<!-- fig.F26.valor -->
{{si}} yes · {{no}} no

<!-- fig.F26.valor.ordinaria -->
{{si}} to {{no}}

<!-- fig.F26.valor.total -->
of {{total}}

<!-- fig.F26.valor.mitad -->
half plus one: {{mitad}}

<!-- fig.F26.nota.t -->
{{votacion}}

<!-- fig.F26.nota -->
{{si}} yes · {{no}} no · {{fecha}}

<!-- fig.F26.nota.mitad -->
{{si}} yes · {{no}} no, of {{total}} deputies; half plus one, {{mitad}} · {{fecha}}

<!-- fig.F26.nota.ordinaria -->
ordinary vote, no list · {{si}} to {{no}} · {{fecha}}

<!-- fig.F26.nota.b -->
«{{literal}}»

<!-- fig.F26.tabla.caption --> The votes in the figure, with the text of the result as the Diario prints it
<!-- fig.F26.tabla.votacion --> Vote
<!-- fig.F26.tabla.fecha --> Date
<!-- fig.F26.tabla.sesion --> Session
<!-- fig.F26.tabla.si --> Yes
<!-- fig.F26.tabla.no --> No
<!-- fig.F26.tabla.mitad --> Half plus one
<!-- fig.F26.tabla.V2 --> Row
<!-- fig.F26.tabla.literal --> Text of the result in the Diario
<!-- fig.F26.tabla.ordinaria --> ordinary

<!-- fig.F26.minima.tabla --> The table, with the text of the result in the Diario

<!-- fig.F26.salvedad -->
These are {{voto.n|letra}} selected votes, not all of them: the Diario prints roll-call lists in at least {{voto.listas.sesiones}} sessions. The lists are in the text, not in a column: the dataset does not hold the vote as a variable.

<!-- fig.F26.alt -->
Bars for {{voto.n|letra}} roll-call votes and one ordinary vote, from 1931 to 1936, with the votes for and against in each. The values are in the ‘Table’ tab.

<!-- fig.F26.datos.votaciones -->
The votes in the figure, with their totals and the text of the result.

<!-- fig.F26.datos.listas -->
All sessions with roll-call lists: date, number, rows with a list and their ids.

<!-- fig.F26.leame.que_mide -->
The votes for and against in {{voto.n|letra}} roll-call votes and one ordinary vote, as printed in the Diario de Sesiones.

<!-- fig.F26.leame.denominador -->
There is no common denominator. Where the Diario prints the number of deputies and the half plus one, they go in their columns; where it does not, the columns are empty.

<!-- fig.F26.leame.columnas -->
votacion, fecha, num_session, legislatura, si, no, total, mitad_mas_uno, nominal (sí/no), id_V2, id_v3, literal.

<!-- fig.F26.leame.salvedad -->
An editorial selection of {{voto.n|letra}} votes: the Diario prints roll-call lists in at least {{voto.listas.sesiones}} sessions. The totals are read in the text of the row; the dataset does not hold the vote as a column.

---

## 4. F30 · The session, turn by turn (figure texts)

<!-- fig.F30.titulo -->
The rows of the session: the speaker above; the Chair below

<!-- fig.F30.pregunta -->
How was the floor shared in this session?

<!-- fig.F30.pregunta.varias -->
How was the floor shared in these sessions?

<!-- fig.F30.leyenda.aria --> How to read each panel

<!-- fig.F30.leyenda.orador --> Above the line, each row of whoever has the floor

<!-- fig.F30.leyenda.presidencia --> Below, the rows of the Chair

<!-- fig.F30.leyenda.larga --> More than {{ses.umbral.largas}} words

<!-- fig.F30.leyenda.truncada --> Under the bracket, the repeated end of the digitised minutes

<!-- fig.F30.rotulo.truncada --> repeated end

<!-- fig.F30.cifras.aria --> The session in numbers

<!-- fig.F30.panel -->
Session no. {{num}}

<!-- fig.F30.eje.orden --> order {{orden}}

<!-- fig.F30.eje.palabras --> {{n}} words

<!-- fig.F30.eje.unidad --> words

<!-- fig.F30.presidencia --> Chair

<!-- fig.F30.nota.t -->
{{orador}}

<!-- fig.F30.nota -->
order {{orden}} · {{palabras}} words

<!-- fig.F30.nota.truncada -->
Repeated end of the minutes: «Pido la palabra.»

<!-- fig.F30.nota.estatuto -->
Under «El Sr. PRESIDENTE»: inside is Azaña's speech

<!-- fig.F30.tabla.caption --> The rows of the session, in order
<!-- fig.F30.tabla.orden --> Order
<!-- fig.F30.tabla.orador --> Who speaks
<!-- fig.F30.tabla.palabras --> Words
<!-- fig.F30.tabla.V2 --> Row
<!-- fig.F30.tabla.rotulo --> No deputy: heading from the Diario

<!-- fig.F30.salvedad -->
One row each time the tagging recognises the printed speaker heading.

<!-- fig.F30.alt -->
Bars for the {{n}} rows of the session of {{fecha}}, in order, with height by number of words. The values are in the ‘Table’ tab.

<!-- fig.F30.datos.texto -->
This figure has no download of its own: it would be the rows of one session, not aggregate data.

<!-- fig.F30.datos.explorador -->
The whole session, with its text, is in the explorer: «Filtros › Fecha y sesión», with the same date in «Desde» and «Hasta». From that list, «Exportar» downloads it with its citation; its ids are those of the explorer.

<!-- fig.F30.leame.que_mide -->
The words in each row of a session, in the Diario's order, according to the dataset.

<!-- fig.F30.leame.denominador -->
The rows of the session. The Chair's role comes from the same heading parser that the explorer uses.

<!-- fig.F30.leame.salvedad -->
The order and id of each row, as they stand in the dataset.
