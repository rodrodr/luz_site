# Copy EN · The Diario de Sesiones (`/en/diario/`), F27 and F28

> [nota de diseño] Traducción de `docs/copy_es/diario.md` según el glosario. Las notas de diseño del original no se
> traducen: véanse en el archivo español. Las citas del Diario (claves `.cita.`) quedan en español, letra a letra;
> su traducción, en `_trad_pendientes.txt`, hasta que exista la clave `.trad`.

---

## 0. Header

<!-- diario.meta.titulo -->
The Diario de Sesiones

<!-- diario.meta.descripcion -->
What the Diario de Sesiones of the Cortes of the Republic records, what it leaves out and how to cite a passage: the source of Luz y Taquígrafos, set out with its limits.

<!-- diario.antetitulo -->
The source

<!-- diario.titulo -->
What does the Diario record, and what does it leave out?

<!-- diario.entrada -->
«Luz y taquígrafos» – literally ‘light and shorthand writers’ – is the promise that what is said in the plenary is written down. The *Diario de Sesiones*, the official printed record of the Cortes' proceedings, keeps it almost always.

<!-- diario.entrada.2 -->
Almost: the Chair could order that some words not be recorded, and the shorthand writer does not write what he does not hear. This page sets out the source with its limits, and how to cite it.

---

## 1. What is a Diario de Sesiones?

<!-- diario.que_es.titulo -->
What is a Diario de Sesiones?

<!-- diario.que_es.entrada -->
It is the printed version of each plenary session, turn by turn. Every row of the dataset comes from it.

<!-- diario.que_es.facsimil.titulo -->
From the printed Diario to the row

<!-- diario.que_es.facsimil.pie -->
Diario de Sesiones de las Cortes Constituyentes, no. {{sesion.1931-10-01-48.diario_num|id}}, 1 October 1931, p. {{fuente.facsimil.pagina|id}} (detail). The project's scan, unretouched: only the left-hand column has been removed.

<!-- diario.que_es.facsimil.alt -->
Detail of a printed page of the Diario de Sesiones: the Chair asks the Chamber to keep silent, and Clara Campoamor asks it to hear her in silence.

<!-- diario.que_es.facsimil.pagina -->
The number of the Diario and its page: what you cite.

<!-- diario.que_es.facsimil.interrupcion -->
An interruption, inside the turn of whoever is speaking.

<!-- diario.que_es.facsimil.rotulo -->
The printed speaker heading opens the turn and cuts the row.

<!-- diario.que_es.facsimil.acotacion -->
A bracketed note (acotación): what the shorthand writer hears in the Chamber.

<!-- diario.que_es.facsimil.filas -->
The two rows that come from that piece of paper

<!-- diario.que_es.facsimil.filas.nota -->
The same text, letter for letter, in the dataset and in the explorer. Method explains what each column holds.

<!-- diario.que_es.facsimil.col.id -->
Row

<!-- diario.que_es.facsimil.col.speaker -->
Printed heading

<!-- diario.que_es.facsimil.col.rep_name -->
Deputy, according to the dataset

<!-- diario.que_es.facsimil.col.speech -->
Text

<!-- diario.que_es.facsimil.col.nwords -->
Words

<!-- diario.que_es.rotulo -->
Each turn begins with the printed speaker heading: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». That heading is what cuts the rows, when the tagging recognises it.

<!-- diario.que_es.acotaciones -->
In brackets, the shorthand writer notes what he hears in the Chamber that no speaker says: «(Rumores.)», «(Risas.)», «(Muy bien.)» – murmurs, laughter, hear, hear.

<!-- diario.que_es.interrupcion -->
If someone interrupts, the shorthand writer notes it in brackets inside the turn of whoever is speaking:

<!-- diario.que_es.cita.interrupcion -->
«(El Sr. Guerra del Rio: Los cavernicolas hablan de pastel.)»

<!-- diario.que_es.cita.interrupcion.pie -->
In Victoria Kent's row, 1 October 1931

<!-- diario.que_es.interrupcion.2 -->
That is why a row can contain other people's voices.

<!-- diario.que_es.votaciones -->
In roll-call votes, the Diario prints the list of who said yes and who said no, with its total.

<!-- diario.que_es.sumario -->
Each session has its summary, and the Diario also prints documents read out or appended: motions, committee reports, letters.

<!-- diario.que_es.v3 -->
The explorer puts that material in rows of its own: {{v3.sumarios}} summaries and {{v3.comentarios}} rows of the Diario's comments.

<!-- diario.que_es.v2 -->
The dataset has no summary rows; the rest of that material sits inside the speakers' rows, often the Chair's.

<!-- diario.que_es.ejemplo -->
Example: the list of the vote of 1 October 1931 has a row of its own, one of the Diario's comments.

<!-- ↺ comun.fija.ocr -->
The text comes from optical character recognition and has not been corrected by hand.

---

## 2. The series of the Diario

<!-- diario.series.titulo -->
The series of the Diario

<!-- diario.series.entrada -->
The corpus brings together {{fuente.series.n|letra}} printed series: {{fuente.series.diarios|letra}} of the full Diario and {{fuente.series.extractos|letra}} of official summaries.

<!-- diario.series.serie.constituyentes -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, from 14 July 1931 to 3 October 1933: {{fuente.serie.constituyentes}} sessions.

<!-- diario.series.serie.cortes -->
Diario de las Sesiones de Cortes. Congreso de los Diputados, from 8 December 1933 to 10 July 1936: {{fuente.serie.cortes}} sessions.

<!-- diario.series.serie.guerra -->
Extracto oficial de las sesiones, from 1 October 1936 to 1 February 1939: {{fuente.serie.extracto_guerra|letra}} sessions.

<!-- diario.series.serie.mexico -->
Extracto oficial de las sesiones de Cortes celebradas en México, from January to November 1945: {{fuente.serie.extracto_mexico|letra}} sessions.

<!-- diario.series.numero -->
Within each legislature, the number of the Diario is that of the session: Diario no. {{sesion.1931-10-01-48.diario_num|id}} of the Constituent Cortes is session {{sesion.1931-10-01-48.num|id}}.

<!-- diario.series.verificada -->
A session's pages count as verified when their numbering links up with that of the previous and the next Diario; if it does not, they are not given.

<!-- diario.series.extractos -->
After July 1936 there is no full Diario, only official summaries.

<!-- diario.series.paginas -->
The Diario's page numbers are verified in {{fuente.paginas.verificadas}} of the {{fuente.paginas.den}} sessions: all those before the war.

<!-- diario.series.total -->
The project's files add up to {{fuente.paginas.total}} digitised pages.

<!-- ↺ comun.sello.proyecto -->
Project metadata (not deposited; not shown in the explorer)

---

## 3. «Luz y taquígrafos», ten times (F27)

<!-- diario.indice.luz -->
«Luz y taquígrafos»

<!-- diario.luz.titulo -->
«Luz y taquígrafos», {{f27.n|letra}} times

<!-- diario.luz.entrada -->
The phrase asks for something to be dealt with in public and put on record. It appears in {{f27.n|letra}} rows of the dataset, between 1931 and 1936.

<!-- diario.luz.escena -->
On 8 June 1934 the Chamber is discussing a request to waive a deputy's immunity. The Chair recalls the rule:

<!-- diario.luz.cita.secreta -->
«Con arreglo al Reglamento, los suplicatorios han de tratarse en sesión secreta;»

<!-- diario.luz.cita.secreta.pie -->
The Chair (Alba)

<!-- diario.luz.escena.2 -->
A voice interrupts with {{cita.diario.grito.palabras|letra}} words, which make up a whole row:

<!-- diario.luz.cita.grito -->
«Luz y taquigrafos.»

<!-- diario.luz.cita.grito.pie -->
The Diario attributes it to «El Sr. JIMÉNEZ FERNÁNDEZ». Without the accent, as in the row: this is how optical character recognition read it.

<!-- diario.luz.escena.3 -->
The dataset identifies that speaker as the CEDA deputy for Badajoz Manuel Giménez Fernández. The Chair replies:

<!-- diario.luz.cita.reglamento -->
«El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías…»

<!-- diario.luz.cita.reglamento.pie -->
The Chair (Alba)

<!-- diario.luz.escena.4 -->
Prieto answers for the Socialists:

<!-- diario.luz.cita.prieto -->
«La minoría socialista no tiene inconveniente en que esto se discuta públicamente.»

<!-- diario.luz.cita.prieto.pie -->
Indalecio Prieto

<!-- diario.luz.royo -->
In August 1933, Royo Villanova had attributed it to Maura:

<!-- diario.luz.cita.royo -->
«…aquí se liquida todo con luz y taquigrafos, como decía Maura…»

<!-- diario.luz.cita.royo.pie -->
Antonio Royo Villanova, 3 August 1933

<!-- diario.luz.royo.salvedad -->
The attribution is his. This site does not claim to know where the phrase comes from.

<!-- diario.luz.maurin -->
The last time is on 8 July 1936, and it draws a reply from the benches:

<!-- diario.luz.cita.maurin -->
«Hay luz y taquigrafos, los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)»

<!-- diario.luz.cita.maurin.pie -->
Joaquín Maurín

<!-- diario.luz.balbontin -->
No one repeats it as often as José Antonio Balbontín: {{f27.balbontin|letra}} of the {{f27.n|letra}} rows are his.

<!-- diario.luz.lectura -->
Read one by one, in all {{f27.n|letra}} the phrase asks for the same thing: that something be said or done in full view, and put on record.

---

## 3 bis. The applause meter (game)

> [design note] Game requested by the researcher (24-09-2026): `components/diario/Aplausometro.astro`. The twenty
> sentences and their bracketed notes come from `src/data/aplausos.json`, letter for letter from their rows; each game
> draws two of each note. No counts of bracketed notes by class (D-11). Without JS, a table.

<!-- diario.indice.aplausos -->
The applause meter

<!-- diario.aplausos.titulo -->
The applause meter

<!-- diario.aplausos.entrada -->
In brackets, the shorthand writer notes how the Chamber receives what it hears. These sentences are real, each with its row: guess what he noted.

<!-- diario.aplausos.juego.pregunta -->
What did the shorthand writer note?

<!-- diario.aplausos.juego.op.aplausos -->
[Applause]

<!-- diario.aplausos.juego.op.muy_bien -->
[Hear, hear]

<!-- diario.aplausos.juego.op.risas -->
[Laughter]

<!-- diario.aplausos.juego.op.rumores -->
[Murmurs]

<!-- diario.aplausos.juego.op.protestas -->
[Protests]

<!-- diario.aplausos.juego.cuenta -->
Sentence {{i}} of {{n}} · Right: {{a}}

<!-- diario.aplausos.juego.quien -->
{{orador}} ({{partido}}), {{fecha}}

<!-- diario.aplausos.juego.exacto -->
Spot on!

<!-- diario.aplausos.juego.cerca -->
Close: the mood was right.

<!-- diario.aplausos.juego.fallo -->
No.

<!-- diario.aplausos.juego.anoto -->
The shorthand writer noted:

<!-- diario.aplausos.juego.fila -->
Row {{id}} of the dataset

<!-- diario.aplausos.juego.siguiente -->
[Next]

<!-- diario.aplausos.juego.ver -->
[See the result]

<!-- diario.aplausos.juego.resumen -->
You got {{n}} of {{total}}.

<!-- diario.aplausos.juego.dedica -->
The Chamber responds:

<!-- diario.aplausos.juego.veredicto.0 -->
(Protests.)

<!-- diario.aplausos.juego.veredicto.1 -->
(Murmurs.)

<!-- diario.aplausos.juego.veredicto.2 -->
(Hear, hear.)

<!-- diario.aplausos.juego.veredicto.3 -->
(Applause.)

<!-- diario.aplausos.juego.veredicto.4 -->
(Loud and prolonged applause.)

<!-- diario.aplausos.juego.otra -->
[Another sitting]

<!-- diario.aplausos.juego.tabla -->
The game's sentences and what the shorthand writer noted

<!-- diario.aplausos.juego.tabla.col.frase -->
Sentence

<!-- diario.aplausos.juego.tabla.col.quien -->
Who and when

<!-- diario.aplausos.juego.tabla.col.acotacion -->
Bracketed note

<!-- diario.aplausos.juego.leccion -->
No column of the dataset records these reactions: they are in the text, in brackets, as the shorthand writer noted them.

---

## 4. What the Diario leaves out (F28)

<!-- diario.calla.titulo -->
What the Diario leaves out

<!-- diario.calla.entrada -->
A deputy recalls it in 1934, speaking about the Standing Orders of the Chamber:

<!-- diario.calla.cita.sainz -->
«…ese Reglamento determina que el Presidente puede incluso mandar callar a un Diputado, puede ordenar que no consten en el Diario de Sesiones sus palabras…»

<!-- diario.calla.cita.sainz.pie -->
Pedro Sainz Rodríguez, 5 December 1934

<!-- diario.calla.formula -->
«No constará» or «no constarán» (‘will not be recorded’), followed by «el Diario» in the same sentence, appear in {{f28.formula.filas|letra}} rows of the dataset.

<!-- diario.calla.ordenes -->
Of these, {{f28.ordenes|letra}} are orders from the Chair.

<!-- diario.calla.ordenes.1936 -->
Of those orders, {{f28.ordenes.1936|letra}} date from April to July 1936.

<!-- diario.calla.abril -->
On 15 April 1936, after a protest by Calvo Sotelo, the Chair gives the order {{f28.15abril.ordenes|letra}} times within a few turns. Several deputies reply:

<!-- diario.calla.cita.abril -->
«Eso no basta.»

<!-- diario.calla.cita.abril.pie -->
Several deputies

<!-- diario.calla.peticion -->
Another is a deputy's request: on 3 June 1936, Calvo Sotelo asks that some words against the «hermanas de la Caridad» (Sisters of Charity) not be recorded.

<!-- diario.calla.ajena -->
The remaining one uses the phrase in another sense, and does not count.

<!-- diario.calla.acotaciones -->
The shorthand writer also notes it in brackets. In {{f28.acotaciones|letra}} bracketed notes, all from May to July 1936, he writes that some words «no se consignan» or «no constan» (‘are not recorded’) on the Chair's orders.

<!-- diario.calla.galarza -->
The one of 1 July 1936 cuts Galarza off mid-sentence: the gateway ‘The prelude’ tells it.

<!-- diario.calla.prieto -->
Not everyone wanted that silence. On 7 February 1933, Besteiro orders that some words not be recorded, and Prieto replies:

<!-- diario.calla.cita.prieto -->
«Por mí, que consten.»

<!-- diario.calla.cita.prieto.pie -->
Indalecio Prieto

<!-- diario.calla.tachado -->
Not everything that is removed leaves a trace. In February 1935, a deputy protests because he cannot find in the Diario what he said:

<!-- diario.calla.cita.tachado -->
«…eso se ha tachado en el Diario de Sesiones.»

<!-- diario.calla.cita.tachado.pie -->
Dionisio Cano López, 19 February 1935

<!-- diario.calla.tachado.2 -->
It is his complaint; the Diario does not allow it to be checked.

<!-- diario.calla.no_oye -->
What the shorthand writer does not hear is not kept either. In {{fuente.no_perciben.filas}} rows of the dataset, the Diario notes that someone «pronuncia palabras que no se perciben» (‘utters words that cannot be made out’).

<!-- diario.calla.no_oye.ejemplo -->
On 6 May 1936 both things happen in a single passage:

<!-- diario.calla.cita.no_oye -->
«(Un Sr. Diputado pronuncia palabras que no se perciben)» … «Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.»

<!-- diario.calla.cita.no_oye.pie -->
Bracketed notes in Calvo Sotelo's row

<!-- diario.calla.ausencias -->
What the Diario does not record does not exist for any count in the dataset.

<!-- diario.calla.ausencias.ibarruri -->
The phrase sometimes attributed to Dolores Ibárruri on 16 June 1936, «Este hombre ha hablado por última vez» (‘This man has spoken for the last time’), does not appear in any row.

<!-- diario.calla.ausencias.barriga -->
Searched for in the corpus, «tiros a la barriga» (‘shots to the belly’) does not appear in 1933: the first row to contain it is a shout of 31 May 1934.

<!-- ↺ comun.fija.contar -->
Counting a word does not tell you who defends it or in what tone.

---

## 5. The source speaks of itself

<!-- diario.habla.titulo -->
The source speaks of itself

<!-- diario.habla.entrada -->
The Diario does not only record what is said: it also leaves notes about itself, and deputies use it as a record.

<!-- diario.habla.nota -->
The war volume opens with a note:

<!-- diario.habla.cita.volumen -->
«EN ESTE VOLUMEN FIGURAN LOS EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO.»

<!-- diario.habla.cita.volumen.pie -->
Volume note, in the summary of 1 October 1936

<!-- diario.habla.figueras -->
It goes on to say that of the Figueres session «NO EXISTE DATO ALGUNO» (‘no record whatsoever exists’). Another note, at the end of the summary of that session, corrects it:

<!-- diario.habla.cita.fotocopia -->
«Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión…»

<!-- diario.habla.cita.fotocopia.pie -->
Closing note of the summary of 1 February 1939

<!-- diario.habla.liberacion -->
The first note also speaks of the «LIBERACION DE BARCELONA» (‘liberation of Barcelona’) of 26 January 1939. Who wrote it, and when, has yet to be checked against the printed volume.

<!-- diario.habla.mexico -->
The cover of the Mexico volume warns of what is missing: of the meetings of the Standing Committee (Diputación Permanente) there, «no se dispone de los textos ni en forma de fotocopia» (‘the texts are not available, not even as photocopies’).

<!-- diario.habla.mexico.pie -->
Cover of the Mexico volume

<!-- diario.habla.censura -->
Deputies also defended the Diario outside the Chamber. In February 1935, Honorio Maura asks the Minister of the Interior in writing to have the censorship comply with a resolution of the Cortes:

<!-- diario.habla.cita.censura -->
«…que los textos integros tomados del Diario de Sesiones no sean tachados ni mutilados por aquélla…»

<!-- diario.habla.cita.censura.pie -->
Written request by Honorio Maura, 20 February 1935

<!-- diario.habla.registro -->
Deputies also read the Diario and cite it: the «Diario de Sesiones» appears in {{fuente.cita_diario.filas}} rows of the dataset.

<!-- diario.habla.campoamor -->
On 1 October 1931, Campoamor answers a speech she did not hear:

<!-- diario.habla.cita.campoamor -->
«En ausencia mía y leyendo el Diario de Sesiones, pude ver en él que un doctor hablaba aquí de que no había ecuación posible…»

<!-- diario.habla.cita.campoamor.pie -->
Clara Campoamor

---

## 6. How to cite a passage · anchor `#citar`

<!-- diario.citar.titulo -->
How to cite a passage

<!-- diario.citar.entrada -->
Cite the Diario, not the dataset. Give the series, the number, the date and the pages. If you have worked with the dataset, add the row id.

<!-- diario.citar.paginas -->
Number and pages come from the project metadata. The explorer does not show them, and after July 1936 the pages are unverified.

<!-- diario.citar.ejemplo -->
Example, with Campoamor's row:

<!-- diario.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, no. {{sesion.1931-10-01-48.diario_num|id}}, 1 October 1931, pp. {{sesion.1931-10-01-48.paginas}} (project metadata). Luz y Taquígrafos, row {{cita.sufragio.campoamor.ciudadana.V2|id}}.

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

---

## 7. F27 · «Luz y taquígrafos», ten times (figure texts)

<!-- fig.F27.titulo -->
«Luz y taquígrafos», {{f27.n|letra}} times

<!-- fig.F27.pregunta -->
When did deputies invoke the phrase?

<!-- fig.F27.leyenda -->
One mark per row of the Diario in which «luz y taquígrafos» appears, from 1931 to 1936.

<!-- fig.F27.nota.t -->
«{{fragmento}}»

<!-- fig.F27.nota -->
{{fecha}} · {{orador}}

<!-- fig.F27.orador.atribuido -->
«El Sr. JIMÉNEZ FERNÁNDEZ», according to the Diario

<!-- fig.F27.meses.con -->
Month with plenary sessions

<!-- fig.F27.meses.sin -->
Month without a session

<!-- fig.F27.anota.grito -->
On 8 June 1934, the phrase is a whole row: {{cita.diario.grito.palabras|letra}} words.

<!-- fig.F27.anota.balbontin -->
{{f27.balbontin|letra}} of the {{f27.n|letra}} are by José Antonio Balbontín, in 1932 and 1933.

<!-- fig.F27.anota.guerra -->
None after July 1936: neither the war summaries nor the Mexico ones contain it.

<!-- fig.F27.tabla.col.fecha -->
Date

<!-- fig.F27.tabla.col.orador -->
Who, according to the dataset

<!-- fig.F27.tabla.col.fragmento -->
What it says

<!-- fig.F27.tabla.col.filas -->
Row

<!-- fig.F27.cita.1 --> «…fechorias, que no suelen hacerse con luz y taquigrafos…»
<!-- fig.F27.cita.1.pie --> 20-VII-1931 · Gabriel Franco
<!-- fig.F27.cita.2 --> «…se discutiese ampliamente con luz y taquigrafos y en presencia de todos los Sres. Diputados de las demás minorías…»
<!-- fig.F27.cita.2.pie --> 9-IV-1932 · José Antonio Balbontín
<!-- fig.F27.cita.3 --> «…la máxima garantía es la oposición libre, con luz y taquigrafos…»
<!-- fig.F27.cita.3.pie --> 3-V-1932 · José Antonio Balbontín
<!-- fig.F27.cita.4 --> «…yo aquí he levantado mi voz, con luz y taquigrafos, contra los pistoleros…»
<!-- fig.F27.cita.4.pie --> 19-VII-1933 · José Antonio Balbontín
<!-- fig.F27.cita.5 --> «…aquí se liquida todo con luz y taquigrafos, como decía Maura…»
<!-- fig.F27.cita.5.pie --> 3-VIII-1933 · Antonio Royo Villanova
<!-- fig.F27.cita.6 --> «Luz y taquigrafos.»
<!-- fig.F27.cita.6.pie --> 8-VI-1934 · the Diario attributes it to «El Sr. JIMÉNEZ FERNÁNDEZ»
<!-- fig.F27.cita.7 --> «…no hay ningún reparo, ningún obstaculo ni ninguna dificultad para que se examine el presupuesto con luz y taquigrafos…»
<!-- fig.F27.cita.7.pie --> 13-XI-1934 · Abilio Calderón
<!-- fig.F27.cita.8 --> «…que realiza el Parlamento suele decir que hacen falta “luz y taquigrafos”…»
<!-- fig.F27.cita.8.pie --> 29-I-1935 · Santiago Fuentes Pila
<!-- fig.F27.cita.9 --> «El que está agazapado en su escaño, con luz y taquigrafos, naturalmente que no quiere valerse de nocturnidad ni de obscuridad de ninguna clase.»
<!-- fig.F27.cita.9.pie --> 22-XI-1935 · José Calvo Sotelo
<!-- fig.F27.cita.10 --> «Hay luz y taquigrafos, los taquigrafos recogeran eso.»
<!-- fig.F27.cita.10.pie --> 8-VII-1936 · Joaquín Maurín

<!-- fig.F27.salvedad -->
A search for the phrase in the text without accents; variants misread by optical character recognition are not counted. The origin of the phrase is not claimed here.

<!-- fig.F27.alt -->
Timeline from 1931 to 1936 with {{f27.n|letra}} marks, one for each row in which a deputy says «luz y taquígrafos». The list is in the ‘List’ tab.

<!-- fig.F27.leame.que_mide -->
The rows of the dataset in which the phrase «luz y taquígrafos» appears, with their date, their speaker according to the dataset and the fragment.

<!-- fig.F27.leame.denominador -->
There is no denominator: it is a list of rows.

<!-- fig.F27.leame.columnas -->
fecha, num_session, orador_rotulo, rep_id, rep_name, party, fragmento, id_V2, id_v3.

<!-- fig.F27.leame.salvedad -->
Phrase searched for in the text without accents or capitals. Optical character recognition may have broken some occurrences: it is a lower bound.

---

## 8. F28 · What the Diario leaves out (figure texts)

<!-- fig.F28.titulo -->
What the Diario leaves out

<!-- fig.F28.pregunta -->
What did the Chair order to be left out of the Diario?

<!-- fig.F28.leyenda.orden -->
Order from the Chair: «no constarán en el Diario» (‘will not be recorded in the Diario’).

<!-- fig.F28.leyenda.acotacion -->
Shorthand writer's bracketed note: words that «no se consignan» or «no constan» on the Chair's orders.

<!-- fig.F28.leyenda.peticion -->
In outline, a deputy who asks for it.

<!-- fig.F28.nota.t -->
«{{fragmento}}»

<!-- fig.F28.nota.orden -->
{{fecha}} · order from the Chair ({{preside}})

<!-- fig.F28.nota.acotacion -->
{{fecha}} · shorthand writer's bracketed note, in the row of {{orador}}

<!-- fig.F28.nota.peticion -->
{{fecha}} · requested by {{orador}}

<!-- fig.F28.lupa -->
From 16 March to 10 July 1936, day by day

<!-- fig.F28.anota.abril -->
On 15 April 1936, the Chair gives the order {{f28.15abril.ordenes|letra}} times in the same session.

<!-- fig.F28.anota.primavera -->
From April to July 1936: {{f28.ordenes.1936|letra}} of the {{f28.ordenes|letra}} orders and all {{f28.acotaciones|letra}} bracketed notes.

<!-- fig.F28.tabla.col.fecha -->
Date

<!-- fig.F28.tabla.col.tipo -->
What it is

<!-- fig.F28.tabla.col.quien -->
In the Chair · in the row of

<!-- fig.F28.tabla.col.fragmento -->
What the Diario says

<!-- fig.F28.tabla.col.filas -->
Row

<!-- fig.F28.tipo.orden -->
Order from the Chair

<!-- fig.F28.tipo.acotacion -->
Shorthand writer's bracketed note

<!-- fig.F28.tipo.peticion -->
A deputy's request

<!-- fig.F28.tipo.ajena -->
The phrase in another sense; not drawn

<!-- fig.F28.cita.orden.1 --> «Que no constaran en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.1.pie --> 10-XII-1931 · Besteiro
<!-- fig.F28.cita.orden.2 --> «Esas palabras, que no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.2.pie --> 7-II-1933 · Besteiro
<!-- fig.F28.cita.orden.3 --> «…le aseguro que las palabras que ha pronunciado no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.3.pie --> 9-II-1933 · Besteiro
<!-- fig.F28.cita.orden.4 --> «Esas palabras no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.4.pie --> 15-IV-1936 · Jiménez de Asúa
<!-- fig.F28.cita.orden.5 --> «Ya se ha dicho que no constarán esas palabras en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.5.pie --> 15-IV-1936 · Jiménez de Asúa
<!-- fig.F28.cita.orden.6 --> «Ya ha advertido la Presidencia que no constarán en el Diario de Sesiones esas palabras.»
<!-- fig.F28.cita.orden.6.pie --> 15-IV-1936 · Jiménez de Asúa
<!-- fig.F28.cita.orden.7 --> «No constará en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.7.pie --> 6-V-1936 · Jiménez de Asúa
<!-- fig.F28.cita.orden.8 --> «Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.orden.8.pie --> 1-VII-1936 · Martínez Barrio
<!-- fig.F28.cita.acotacion.1 --> «(El Sr. Muñoz de Zafra pronuncia palabras que no se consignan por orden del Sr. Presidente…»
<!-- fig.F28.cita.acotacion.1.pie --> 6-V-1936 · in the row of Jesús Pabón
<!-- fig.F28.cita.acotacion.2 --> «Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.»
<!-- fig.F28.cita.acotacion.2.pie --> 6-V-1936 · in the row of Calvo Sotelo
<!-- fig.F28.cita.acotacion.3 --> «(El orador pronuncia palabras que no constan por orden del Sr. Presidente…»
<!-- fig.F28.cita.acotacion.3.pie --> 16-VI-1936 · in the row of Calvo Sotelo
<!-- fig.F28.cita.acotacion.4 --> «(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)»
<!-- fig.F28.cita.acotacion.4.pie --> 16-VI-1936 · in the row of Fernando Suárez de Tangil
<!-- fig.F28.cita.acotacion.5 --> «(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)»
<!-- fig.F28.cita.acotacion.5.pie --> 1-VII-1936 · in the row of Ángel Galarza
<!-- fig.F28.cita.peticion --> «…ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.peticion.pie --> 3-VI-1936 · José Calvo Sotelo
<!-- fig.F28.cita.ajena --> «…por parecerne injusto que no constara en el Diario de Sesión…»
<!-- fig.F28.cita.ajena.pie --> 21-II-1934 · Luis Rodríguez de Viguri · the phrase in another sense; not drawn

<!-- fig.F28.salvedad -->
At least: variants produced by optical character recognition are not detected. An exact search for the phrase in the plural returns {{f28.fts_plural|letra}} rows, which are not the same as the {{f28.ordenes|letra}}.

<!-- fig.F28.alt -->
Timeline from 1931 to 1936 with {{f28.ordenes|letra}} orders from the Chair, {{f28.acotaciones|letra}} shorthand writer's bracketed notes and one deputy's request. The list is in the ‘List’ tab.

<!-- fig.F28.leame.que_mide -->
The rows in which the Chair orders that some words not be recorded in the Diario, the bracketed notes that record it and one deputy's request.

<!-- fig.F28.leame.denominador -->
There is no denominator: it is a list built by reading the rows one by one. The `tipo` column says orden, acotación, petición or ajena (order, bracketed note, request or other sense).

<!-- fig.F28.leame.columnas -->
fecha, num_session, tipo, preside, orador_fila, fragmento, id_V2, id_v3.

<!-- fig.F28.leame.salvedad -->
Lower bound: the search does not see variants that optical character recognition misspelled, nor other phrasings for the same thing.
