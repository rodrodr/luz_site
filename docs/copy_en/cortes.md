# Copy EN · The Cortes, 1931–1945 (`/[lang]/cortes/`), stage page template and stage figures

> Traducción del copy español congelado (`docs/copy_es/cortes.md`), según `docs/03a_GLOSARIO_es-en.md`. Las notas de
> diseño y el anexo siguen en el archivo español.

---

## 1. The Cortes · index (`/[lang]/cortes/`)

<!-- cortes.meta.titulo --> The Cortes, 1931–1945
<!-- cortes.meta.descripcion --> The {{sesiones}} sessions of the Congress between 1931 and 1945, month by month, and the stages of its legislatures: what each one holds and what it lacks.

<!-- cortes.antetitulo --> V2 · {{sesiones}} sessions · {{sesion.primera|fecha_corta}} → {{sesion.ultima|fecha_corta}}
<!-- cortes.titulo --> Which Cortes are here, and when did they meet?

<!-- cortes.entrada -->
The dataset brings together {{legislaturas.V2|letra}} legislatures, divided here into {{etapas.n|letra}} stages. There are {{sesiones}} sessions, from July 1931 to November 1945. Each block of the calendar opens the page for its stage.

<!-- cortes.subnav.etapas --> Stages
<!-- cortes.subnav.sesiones --> Sessions and votes

### 1.1 How to read the calendar

<!-- cortes.leer.titulo --> How to read the calendar

<!-- cortes.leer.con_sesion -->
**Month with a session.** It is shaded and holds one bar per session. The height of the bar shows how many words the Diario printed that day.

<!-- cortes.leer.sin_sesion -->
**Month without a session within its stage.** Outline and label, no colour.

<!-- cortes.leer.fuera -->
**Month outside any stage.** Empty.

<!-- cortes.leer.salto -->
**‘//’.** The gap from March 1939 to December 1944: the corpus has no session in those months.

<!-- cortes.leer.regla -->
Absence carries no colour, and its cause is not labelled: it does not come from the corpus.

### 1.2 F01 · The full calendar

<!-- cortes.calendario.titulo --> When they met, session by session

<!-- cortes.calendario.entrada -->
One mark per session, from July 1931 to November 1945. The rings mark the sessions that have a reading gateway.

<!-- cortes.calendario.dice.I -->
The Constituent Cortes met in {{etapa.I.meses.con_sesion}} of their {{etapa.I.meses}} months; the missing one is January 1933.

<!-- cortes.calendario.dice.II -->
The legislature elected in 1933 left {{etapa.II.meses.sin_sesion|letra}} months without a session: August and September 1934, April and August 1935.

<!-- cortes.calendario.dice.III -->
The Chamber of 1936 met in each of the {{etapa.III.meses|letra}} months it had before the war.

<!-- cortes.calendario.dice.IV -->
From the war, {{etapa.IV.sesiones|letra}} sessions remain in {{etapa.IV.meses}} months.

<!-- cortes.calendario.dice.hueco -->
Then come {{meses.salto}} months without any session in the corpus, until January 1945.

<!-- cortes.calendario.dice.V -->
In 1945 there are {{etapa.V.sesiones|letra}} sessions, held in Mexico, in {{etapa.V.meses.con_sesion|letra}} of the stage's {{etapa.V.meses}} months.

<!-- ↺ comun.boton.ver_sesiones --> [See the sessions and votes]

### 1.3 From legislatures to stages

<!-- cortes.etapas.titulo --> Legislatures and stages

<!-- cortes.etapas.entrada -->
The CSV labels each row with its legislature. The third, 1936-1939, brings together three different things: the Chamber of 1936, the sessions of the war and those of Mexico.

<!-- cortes.etapas.corte -->
Here that legislature is divided by its own numbering: sessions {{etapa.III.num.desde|id}} to {{etapa.III.num.hasta|id}}, {{etapa.IV.num.desde|id}} to {{etapa.IV.num.hasta|id}} and {{etapa.V.num.desde|id}} to {{etapa.V.num.hasta|id}}.

<!-- cortes.etapas.corte_fechas -->
The division by number matches the division by date: no session of one stretch falls between those of another.

<!-- cortes.etapas.extractos -->
For the war and for Mexico there is no full Diario, only official extracts. The project metadata say so; the explorer does not show them.

<!-- cortes.etapas.tabla.titulo --> The stages, in numbers
<!-- cortes.etapas.tabla.col.etapa --> Stage
<!-- cortes.etapas.tabla.col.sesiones --> Sessions
<!-- cortes.etapas.tabla.col.fechas --> Dates
<!-- cortes.etapas.tabla.col.serie --> Diario series
<!-- cortes.etapas.tabla.col.filas --> Rows (V2)
<!-- cortes.etapas.tabla.col.palabras --> Words (V2)
<!-- cortes.etapas.tabla.col.pct --> Share of corpus
<!-- cortes.etapas.tabla.col.diputados --> Deputies who speak
<!-- cortes.etapas.tabla.col.filas_v3 --> Rows (v3)

<!-- cortes.etapas.tabla.pie -->
‘Deputies who speak’ counts distinct deputy identifiers, including whoever is in the Chair. Across the whole corpus there are {{diputados.V2}}.

<!-- cortes.etapas.tabla.pie_leg -->
By CSV legislature there are {{leg.1931-1933.diputados}}, {{leg.1933-1935.diputados}} and {{leg.1936-1939.diputados}}: the sum by stage counts twice anyone who speaks in more than one.

<!-- ↺ comun.fija.notabases -->
This number comes from the explorer edition (v3, {{filas.v3}} rows, not deposited); the deposited edition is V2 ({{filas.V2}} rows). Why there are two →

### 1.4 What is not here

<!-- cortes.ausente.titulo --> What is not here

<!-- cortes.ausente.permanente -->
The Constitution of 1931 created a Standing Committee (Diputación Permanente) of the Cortes, in Article 62. When the Cortes were dissolved, it decided in their place on the suspension of guarantees (Article 42).

<!-- cortes.ausente.permanente_corpus -->
Its meetings are not in the corpus.

<!-- cortes.ausente.caratula -->
The title page of the Mexico volume lists those it held there, from 1939 to 1943. And it adds: «sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia».

<!-- cortes.ausente.caratula_fila -->
That title page opens the summary of 10 January 1945, and it is only in the explorer edition (v3 {{fila.mexico_caratula.v3|id}}).

<!-- cortes.ausente.discursos -->
Nor are the speeches made outside Parliament.

<!-- cortes.ausente.fuentes -->
External source: [I] *Constitución de la República Española*, Articles 42 and 62. *Gaceta de Madrid*, no. 344, 10 December 1931, pp. 1578–1588.

<!-- cortes.margen -->
That no number is missing does not prove that the last one is the last published.

### 1.5 The stages, one by one

<!-- cortes.etapa.I.nombre --> The Constituent Cortes (1931–1933)
<!-- cortes.etapa.II.nombre --> The legislature elected in 1933
<!-- cortes.etapa.III.nombre --> The Cortes of 1936, until the war
<!-- cortes.etapa.IV.nombre --> The Cortes at war (1936–1939)
<!-- cortes.etapa.V.nombre --> The Cortes in Mexico (1945)

<!-- cortes.etapa.registro --> The {{etapas.n|letra}} stages, one by one
<!-- cortes.etapa.recuento --> {{n}} sessions
<!-- cortes.puertas.registro --> The gateways, session by session

<!-- cortes.etapa.I.corto --> Constituent
<!-- cortes.etapa.II.corto --> 1933-1935
<!-- cortes.etapa.III.corto --> 1936
<!-- cortes.etapa.IV.corto --> War
<!-- cortes.etapa.V.corto --> Mexico

<!-- cortes.etapa.I.linea -->
The Chamber that wrote the Constitution, and then legislated under it.

<!-- cortes.etapa.II.linea -->
Another majority, other speakers; the stage with the most months without a session.

<!-- cortes.etapa.III.linea -->
The Diario of the new Chamber, from March to 10 July 1936.

<!-- cortes.etapa.IV.linea -->
Official extracts of the sessions held during the war.

<!-- cortes.etapa.V.linea -->
The sessions held in Mexico in 1945.

---

## 2. Stage page template, shared by the five stages (`/[lang]/cortes/<etapa>/`)

<!-- cortes.ficha.miga --> The Cortes / {{romano}}

<!-- cortes.ficha.antetitulo.proyecto --> project metadata

<!-- cortes.ficha.hoy.titulo --> Today you can
<!-- cortes.ficha.hoy.consulta --> Query
<!-- cortes.ficha.hoy.recuento --> results in the explorer on {{fecha}}

<!-- ↺ comun.fija.enlace -->
The explorer cannot open a search from a link: copy the query and paste it into its search box (/ key).

<!-- cortes.ficha.cifras.titulo --> In numbers
<!-- cortes.ficha.contexto.titulo --> What happened in the Chamber

<!-- cortes.ficha.contexto.ids -->
Each event in the Chamber carries its row: ‘V2’ is the identifier in the deposited edition; ‘v3’, in the explorer edition.

<!-- ↺ comun.fija.ids -->
Row identifiers differ between the deposited edition (V2) and the explorer edition (v3); the session – date and number – is the same in both.

<!-- cortes.ficha.contexto.externas --> External sources for this section
<!-- cortes.ficha.contexto.puerta --> It has its own reading gateway →

<!-- cortes.ficha.calendario.titulo --> When it met
<!-- cortes.ficha.palabra.titulo --> Who took the floor
<!-- cortes.ficha.puertas.titulo --> Reading gateways for this stage
<!-- cortes.ficha.debates.titulo --> Ready-made debates in the explorer

<!-- cortes.ficha.debates.como -->
Add them from «Mis bibliotecas» (my libraries), with «Añadir bibliotecas del proyecto…» (add the project's libraries).

<!-- cortes.ficha.debates.salvedad -->
Each debate gathers the interventions of its key sessions, not only those on the matter that gives it its name.

<!-- cortes.ficha.antes.titulo --> Before you use it
<!-- cortes.ficha.leer.titulo --> Further reading

<!-- cortes.ficha.leer.nota -->
Only works we have checked. [A], academic; [I], institutional.

<!-- cortes.ficha.citar.titulo --> How to cite

<!-- cortes.ficha.citar.conjunto -->
Cite the dataset with the Harvard Dataverse reference:

<!-- cortes.ficha.citar.sesion -->
Cite a session by its date and number, and check it against the Diario:

<!-- cortes.ficha.citar.paginas -->
Diario number and pages: project metadata (not deposited; not shown in the explorer).

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

<!-- cortes.ficha.vecinas.anterior --> Previous stage
<!-- cortes.ficha.vecinas.siguiente --> Next stage
<!-- cortes.ficha.vecinas.indice --> All stages

---

## 3. Figures for The Cortes and the stage pages

### F01 · Session calendar (full on The Cortes; F01e excerpt on each stage page)

<!-- fig.F01.titulo --> Session calendar, 1931–1945
<!-- fig.F01.pregunta --> When did the Cortes meet, how much was said in each session and what is missing?
<!-- fig.F01.alt -->
Calendar of {{sesiones}} sessions, from July 1931 to November 1945, grouped by stage, with one bar per session. Months without a session are outlined.

<!-- fig.F01.conmuta.titulo --> Bar height
<!-- fig.F01.conmuta.palabras --> Words
<!-- fig.F01.conmuta.diputados --> Deputies who speak

<!-- fig.F01.leyenda.con_sesion --> Month with a session
<!-- fig.F01.leyenda.sin_sesion --> No session within the stage
<!-- fig.F01.leyenda.fuera --> Outside any stage
<!-- fig.F01.leyenda.puerta --> Session with a reading gateway
<!-- fig.F01.leyenda.doble --> Two sessions on the same day
<!-- fig.F01.leyenda.salto --> Gap: no month with a session between 1939 and 1944
<!-- fig.F01.leyenda.tono --> Words printed in the month (V2), in five classes of {{f01.clase.4.meses|letra}} or {{f01.clase.0.meses|letra}} months with a session
<!-- fig.F01.leyenda.altura --> Bar height: words in the session (V2). The highest, {{f01.sesion_max.palabras}}.
<!-- fig.F01.leyenda.altura_dip --> Bar height: deputies who speak, including the Chair (V2). The highest, {{f01.sesion_max.diputados}}.
<!-- fig.F01.leyenda.barra --> One session

<!-- fig.F01.salto -->
{{desde}} → {{hasta}}: {{n}} months; the corpus contains no session.

<!-- fig.F01.nota.mes -->
{{sesiones}} sessions · {{filas}} rows · {{palabras}} words · {{diputados}} deputies speak

<!-- fig.F01.nota.mes_una -->
one session · {{filas}} rows · {{palabras}} words · {{diputados}} deputies speak

<!-- fig.F01.nota.mes_vacio -->
no session in the corpus, within its stage

<!-- fig.F01.nota.base -->
V2 · 2REP_Diaries.csv · the deputies include the Chair

<!-- fig.F01.nota.base_vacio -->
V2 · 2REP_Diaries.csv · the cause does not come from the corpus

<!-- fig.F01.nota.sesion -->
session {{num}} · {{filas}} rows · {{palabras}} words · {{diputados}} deputies speak

<!-- fig.F01.nota.sesion.base -->
V2 · {{sigla}} no. {{diario}}, pp. {{p1}}–{{p2}} (project metadata)

<!-- fig.F01.nota.sesion_sin_paginas.base -->
V2 · {{sigla}} no. {{diario}}, pages not verified (project metadata)

<!-- fig.F01.nota.puerta --> It has a reading gateway: select to open it.

<!-- fig.F01.breve.titulo --> {{fecha}} · session {{num}}
<!-- fig.F01.breve.como -->
To open it in the explorer, enter that date in «Desde» (from) and «Hasta» (to), open an intervention and press `s`.
<!-- fig.F01.breve.cerrar --> Close

<!-- fig.F01.tabla.titulo --> The months with a session, and the gaps
<!-- fig.F01.tabla.col.mes --> Month
<!-- fig.F01.tabla.col.etapa --> Stage
<!-- fig.F01.tabla.col.sesiones --> Sessions
<!-- fig.F01.tabla.col.filas --> Rows (V2)
<!-- fig.F01.tabla.col.palabras --> Words (V2)
<!-- fig.F01.tabla.col.diputados --> Deputies who speak (V2)
<!-- fig.F01.tabla.hueco --> {{desde}} → {{hasta}} · {{n}} months without a session
<!-- fig.F01.tabla.hueco_uno --> {{mes}} · no session
<!-- fig.F01.tabla.sesiones.resumen --> The sessions of this stage, one by one
<!-- fig.F01.tabla.sesiones.col.fecha --> Date
<!-- fig.F01.tabla.sesiones.col.num --> Session
<!-- fig.F01.tabla.sesiones.col.diario --> Diario and pages (project)

<!-- ↺ comun.fija.tono -->
Shading shows how many words were printed, not how much they mattered.

<!-- fig.F01.salvedad.causas -->
The causes of a month without a session – recess, dissolution, war – do not come from the corpus and are not labelled.

<!-- fig.F01.salvedad.extractos -->
Official extracts, not the full Diario; pages not verified.

<!-- fig.F01.salvedad -->
Shading shows how many words were printed, not how much they mattered. The causes of a month without a session – recess, dissolution, war – do not come from the corpus and are not labelled.

<!-- fig.F01.cabecera --> {{n}} sessions · {{palabras}} words

<!-- fig.F01.breve.mes --> The sessions of {{mes}}

<!-- fig.F01.leame.que_mide -->
The sessions of the Congress from 1931 to 1945, one per row in sesiones.csv, and the months with their status in meses.csv. They count rows, words and deputies in the deposited edition (V2).

<!-- fig.F01.leame.denominador -->
These are counts, with no denominator: rows, the sum of nwords and distinct rep_id values per session or per month. The shading class divides the {{meses.con_sesion}} months with a session into five quantile groups.

<!-- fig.F16.leame.que_mide -->
The runs of consecutive sessions with the same President of the Cortes and the same Government, stage by stage, according to the project metadata.

<!-- fig.F16.leame.denominador -->
Sessions in each run; no denominator. A run marked ‘to be verified’ is marked so in the project metadata.

### F01e · Stage excerpt (stage pages)

<!-- fig.F01e.titulo --> When this stage met
<!-- fig.F01e.pregunta --> When did it meet, how much was said in each session, who was in the Chair and who governed?
<!-- fig.F01e.alt -->
Calendar of the stage, with one bar per session and, below, two bands: the President of the Cortes for each session and the Government.

<!-- fig.F01e.ver_todo --> [See the full calendar]

### F16 · President of the Cortes and Government (bands under F01e)

<!-- fig.F16.titulo --> Who presided, and who governed
<!-- fig.F16.pregunta --> Who presided over the session and who governed in the meantime?
<!-- fig.F16.banda.presidente --> President of the Cortes
<!-- fig.F16.banda.gobierno --> Government
<!-- ↺ comun.sello.proyecto -->
Project metadata (not deposited; not shown in the explorer)

<!-- fig.F16.nota -->
{{desde}} → {{hasta}} · {{n}} sessions

<!-- fig.F16.nota_una -->
{{fecha}} · one session

<!-- fig.F16.nota.base -->
Project metadata

<!-- fig.F16.nota.verificar -->
Project metadata · to be verified

<!-- fig.F16.leyenda.verificar --> To be verified in the project metadata
<!-- fig.F16.leyenda.bandas --> Under each year, two bands: President of the Cortes and Government

<!-- fig.F16.accion --> Select to highlight its sessions in the calendar.

<!-- fig.F16.tabla.presidentes --> Presidents of the Cortes
<!-- fig.F16.tabla.gobiernos --> Governments
<!-- fig.F16.tabla.col.nombre --> Name
<!-- fig.F16.tabla.col.desde --> First session
<!-- fig.F16.tabla.col.hasta --> Last session
<!-- fig.F16.tabla.col.sesiones --> Sessions

<!-- fig.F16.salvedad -->
The band gives the President of the Cortes for the session (project metadata). In {{pres.vice_ses}} of {{sesiones}} sessions a Vice-President was in the Chair for some stretch (V2). Days when the Government changed count for the incoming one.

### F05 · Who took the floor in the stage

<!-- fig.F05.titulo --> The ten who spoke most
<!-- fig.F05.pregunta --> Who spoke most in this stage, leaving out the Chair?
<!-- fig.F05.alt -->
Horizontal bars with the ten deputies with the most spoken words in the stage, leaving out the Chair, in the explorer edition.

<!-- fig.F05.nota -->
{{nombre}} · {{n}} of {{den}} spoken words in the stage, leaving out the Chair (v3)

<!-- fig.F05.nota_partido --> {{partido}} · {{familia}}

<!-- fig.F05.tabla.col.puesto --> Rank
<!-- fig.F05.tabla.col.nombre --> Deputy
<!-- fig.F05.tabla.col.partido --> Party
<!-- fig.F05.tabla.col.palabras --> Spoken words (v3)
<!-- fig.F05.tabla.col.pct --> Share of stage

<!-- fig.F05.salvedad -->
Spoken words in the explorer edition, leaving out the Chair, summaries and documents. Speaking a lot is not the same as carrying weight.

<!-- fig.F05.datos -->
The figure data include all {{diputados.V2}} deputies who speak, stage by stage.

### F09 · Which political families take the floor

<!-- fig.F09.titulo --> Which political families take the floor
<!-- fig.F09.pregunta --> Which political families take the floor in the stage, leaving out the Chair?
<!-- fig.F09.alt -->
A strip at one hundred per cent, divided by political family, with each family's share of the words spoken outside the Chair.

<!-- fig.F09.conmuta.titulo --> Measure by
<!-- fig.F09.conmuta.palabras --> Words
<!-- fig.F09.conmuta.filas --> Rows

<!-- fig.F09.nota.palabras -->
{{familia}} · {{pct}} · {{n}} of {{den}} words outside the Chair (V2)

<!-- fig.F09.nota.filas -->
{{familia}} · {{pct}} · {{n}} of {{den}} rows outside the Chair (V2)

<!-- fig.F09.tabla.col.familia --> Family
<!-- fig.F09.tabla.col.palabras --> Words outside the Chair (V2)
<!-- fig.F09.tabla.col.pct_palabras --> Share of words outside the Chair
<!-- fig.F09.tabla.col.filas --> Rows outside the Chair (V2)
<!-- fig.F09.tabla.col.pct_filas --> Share of rows outside the Chair

<!-- fig.F09.salvedad -->
«Republicanos» (Republicans) mixes positions of the left, the centre and the right. Ideology and family are those of the party.

<!-- fig.F09.salvedad.normalizacion -->
The families follow the explorer's normalisation; the merging of «Liberal» into «Liberales» is pending review.
