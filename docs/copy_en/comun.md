# Copy EN · Common (header, footer, fixed phrases, labels, components, island, glossary, root and 404)

> Traducción del copy español congelado (`docs/copy_es/comun.md`), según `docs/03a_GLOSARIO_es-en.md`. Las notas de
> diseño se han quitado: siguen en el archivo español.

---

## 1. Header and navigation

<!-- comun.nav.saltar --> [Skip to content]
<!-- comun.cabecera.nombre --> Luz y Taquígrafos
<!-- comun.cabecera.descriptor --> The Diarios de Sesiones of the Congress of Deputies, 1931–1945
<!-- comun.cabecera.inicio.aria --> Luz y Taquígrafos: go to Home
<!-- comun.nav.aria --> Main navigation
<!-- comun.nav.historia.aria --> The story
<!-- comun.nav.base.aria --> The dataset
<!-- comun.nav.cortes --> [The Cortes]
<!-- comun.nav.diario --> [The Diario]
<!-- comun.nav.metodo --> [Method]
<!-- comun.nav.datos --> [Data]
<!-- comun.nav.explorador --> [Explorer]
<!-- comun.nav.afinidades --> [Afinidades]
<!-- comun.idioma.aria --> Language
<!-- comun.idioma.es --> [Español]
<!-- comun.idioma.en --> [English]
<!-- comun.nav.tema.oscuro --> Dark theme
<!-- comun.nav.tema.claro --> Light theme

### 1.1 Sub-navigation

<!-- comun.subnav.cortes.aria --> The Cortes, by section
<!-- comun.subnav.cortes.etapas --> [Stages]
<!-- comun.subnav.cortes.sesiones --> [Sessions and votes]
<!-- comun.subnav.datos.aria --> Data, by section
<!-- comun.subnav.datos.usar --> [Using the data]
---

## 2. Fixed phrases ↺

<!-- comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

<!-- comun.sello.proyecto -->
Project metadata (not deposited; not shown in the explorer)

<!-- comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, deposited)

<!-- comun.fija.formulario -->
Before you download, Harvard Dataverse will ask for your name, email address and institution.

<!-- comun.fija.formulario.motivo -->
We use these details to learn who uses the dataset and for what, so that we can improve it and announce updates.

<!-- comun.fija.enlace -->
The explorer cannot open a search from a link: copy the query and paste it into its search box (/ key).

<!-- comun.fija.contar -->
Counting a word does not tell you who defends it or in what tone.

<!-- comun.fija.ocr -->
The text comes from optical character recognition and has not been corrected by hand.

<!-- comun.fija.sesion48 -->
Session 48 as it stands in the corpus: the end of the digitised minutes was lost in optical character recognition.

<!-- comun.fija.novalida -->
Their presence here does not validate their content.

<!-- comun.fija.legislatura -->
The census and the relations of Afinidades Elegidas call 1933-1936 the legislature that this dataset calls 1933-1935; the Diario's sessions end on 10 December 1935.

<!-- comun.fija.sin_formulario -->
No form: these are aggregate data.

### 2.1 Three more fixed phrases, shared between pages

<!-- comun.fija.tono -->
Shading shows how many words were printed, not how much they mattered.

<!-- comun.fija.explorador -->
It runs in a computer's web browser.

<!-- comun.fija.local -->
It opens in your browser; what you search for and save stays on your device.

---

## 3. Labels: one label per destination

<!-- comun.boton.descargar --> [Download the data]
<!-- comun.boton.dataverse --> [Download from Dataverse ↗]
<!-- comun.boton.explorador --> [Open the explorer ↗]
<!-- comun.boton.consulta --> [Copy the query]
<!-- comun.boton.afinidades --> [Open Afinidades ↗]
<!-- comun.boton.datos_figura --> [Download the figure data]
<!-- comun.boton.imagen --> [Download the image]
<!-- comun.boton.cita --> [Copy the citation]
<!-- comun.boton.ver_cortes --> [See the Cortes, stage by stage]
<!-- comun.boton.ver_sesiones --> [See the sessions and votes]
<!-- comun.boton.ver_votaciones --> [See the votes]
<!-- comun.boton.ver_diario --> [See what the Diario records]
<!-- comun.boton.ver_metodo --> [See how it was made]
<!-- comun.boton.ver_columnas --> [See what each column holds]
<!-- comun.boton.ver_explorador --> [See what the explorer does]
<!-- comun.boton.ver_afinidades --> [See Afinidades Elegidas]
<!-- comun.boton.unir --> [Join with THQCMI]
<!-- comun.boton.ir_inicio --> [Go to Home]
<!-- comun.boton.errata --> [Report an error]
<!-- comun.boton.escribirnos --> [Contact us]
<!-- comun.boton.cargar --> [Load the figure]

---

## 4. Footer

<!-- comun.pie.autoria -->
{{dv.thqcmi.autores}} · [University of Salamanca]

<!-- comun.pie.depositos -->
Deposited in Harvard Dataverse: Luz y Taquígrafos ([doi:10.7910/DVN/THQCMI]) and Afinidades Elegidas ([doi:10.7910/DVN/CGOCUS]).

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

<!-- comun.pie.licencias -->
Data, [CC BY 4.0]. Site code, [MIT].

<!-- comun.pie.ediciones -->
Page, ed. {{edicion_pagina}} · Data: Luz y Taquígrafos, on Harvard Dataverse

<!-- comun.pie.privacidad -->
This site uses no cookies and no analytics; Dataverse asks for details when you download, and we tell you before you get there.

<!-- comun.pie.enlaces -->
[How to cite] [Where each number comes from] [Report an error] [Contact us] [ParlaIbero], a sister project, separate from this one

<!-- comun.enlace.otra_pestana -->
Links marked ↗ open in a new tab.

<!-- comun.vista_previa.pendientes -->
Preview. Awaiting the researcher's decision:

---

## 5. Shared components

### 5.1 Fixed band (`BandaCTA`, Method and Explorer only)

<!-- comun.banda.aria --> Download the data or open the explorer

### 5.3 CopiarConsulta

<!-- comun.consulta.etiqueta --> Query for the explorer's search box
<!-- comun.consulta.filtros --> Filters
<!-- comun.consulta.recuento --> Count of {{fecha}}: {{n}} interventions in the explorer.
<!-- comun.consulta.recuento.una --> Count of {{fecha}}: one intervention in the explorer.
<!-- comun.consulta.copiada --> Query copied. In the explorer, press / and paste it.
<!-- comun.consulta.sinjs --> Select the query and copy it.

### 5.4 Source badge

<!-- comun.sello.titulo --> Source
<!-- comun.sello.base --> Luz y Taquígrafos
<!-- comun.sello.huella --> Checksum
<!-- comun.sello.exportado --> Numbers exported on {{fecha}}
<!-- comun.sello.dv --> Harvard Dataverse metadata, read from its API
<!-- comun.sello.explorador --> Published explorer: its manifest and its headers
<!-- comun.sello.croquis --> Gil Robles's sketch, transferred to the plan of the Congress

### 5.5 Citation

<!-- comun.cita.titulo --> How to cite
<!-- comun.cita.formatos.aria --> Citation format
<!-- comun.cita.texto --> Text
<!-- comun.cita.bibtex --> BibTeX
<!-- comun.cita.ris --> RIS
<!-- comun.cita.copiada --> Citation copied.
<!-- comun.cita.dataverse --> As given by Harvard Dataverse.
<!-- comun.cita.cgocus.nota --> Harvard Dataverse cites the major version, ‘V1’; the current one is V1.1.

<!-- comun.cita.figura -->
{{dv.thqcmi.autores}}. ‘{{titulo}}’. Figure from Luz y Taquígrafos. {{url}}. Source: {{base}}. Exported on {{fecha}}.

<!-- comun.cita.pasaje -->
{{diario}}, no. {{numero}}, {{fecha}}, pp. {{paginas}} (project metadata). Luz y Taquígrafos, row {{id}}.

### 5.6 Explorer screenshot

<!-- comun.captura.ampliar --> Enlarge the screenshot
<!-- comun.captura.cerrar --> Close the screenshot
<!-- comun.captura.pie --> Published explorer, captured on {{fecha}}.
<!-- comun.enlace.ampliar --> Opens the screenshot at full size, in a new tab.

### 5.7 Side index, neighbours and exits

<!-- comun.indice.titulo --> On this page
<!-- comun.indice.volver --> Back to contents
<!-- comun.vecinas.aria --> Previous and next
<!-- comun.vecinas.etapa.anterior --> Previous stage
<!-- comun.vecinas.etapa.siguiente --> Next stage
<!-- comun.vecinas.puerta.anterior --> Previous gateway
<!-- comun.vecinas.puerta.siguiente --> Next gateway
<!-- comun.salidas.titulo --> Where next
<!-- comun.vecinas.cortes --> [See the Cortes, stage by stage]
<!-- comun.vecinas.sesiones --> [See the sessions and votes]
<!-- comun.pruebelo --> Try it

---

## 6. Figures: tabs, data and the island

<!-- comun.fig.pestanas --> [Chart] [Table] [Data]
<!-- comun.fig.datos.nota --> CSV and Excel, with a README in Spanish and in English.
<!-- comun.fig.imagen.nota --> The image, in SVG and PNG, carries its citation at the foot.
<!-- comun.fig.tabla.nota --> The same data as the chart, in rows.
<!-- comun.fig.filtro.etapa --> Stage
<!-- comun.fig.filtro.todas --> All
<!-- comun.fig.medida.aria --> What is measured
<!-- comun.fig.base --> Source
<!-- comun.fig.salvedad --> Before you read it

<!-- comun.leame.que_mide --> What it measures
<!-- comun.leame.denominador --> Denominator
<!-- comun.leame.salvedad --> Caveat
<!-- comun.leame.base --> Source
<!-- comun.leame.cita --> How to cite

### 6.1 The island (`scripts/figuras.ts`)

<!-- comun.fig.teclado -->
With the keyboard: Tab moves to the figure; ← and → step through its marks; Home and End go to the first and the last; Esc closes the note.

<!-- comun.isla.tactil -->
Tap a mark to see its note; tap it again to open its page.

<!-- comun.isla.posicion --> {{i}} of {{total}}
<!-- comun.isla.cerrar --> Close the note
<!-- comun.isla.cargando --> Loading the figure…
<!-- comun.isla.error --> The figure could not be loaded. Its data are still in the Table tab.
<!-- comun.isla.copiado --> Copied.
<!-- comun.isla.no_copiado --> Could not copy. Select the text and copy it by hand.

---

## 7. The five stages: shared names

<!-- comun.etapa.I.nombre --> The Constituent Cortes
<!-- comun.etapa.I.corto --> Constituent
<!-- comun.etapa.I.anos --> 1931–1933
<!-- comun.etapa.II.nombre --> The legislature elected in 1933
<!-- comun.etapa.II.corto --> 1933-1935
<!-- comun.etapa.II.anos --> 1933–1935
<!-- comun.etapa.III.nombre --> The Cortes of 1936, until the war
<!-- comun.etapa.III.corto --> Cortes of 1936
<!-- comun.etapa.III.anos --> 1936
<!-- comun.etapa.IV.nombre --> The Cortes at war
<!-- comun.etapa.IV.corto --> War
<!-- comun.etapa.IV.anos --> 1936–1939
<!-- comun.etapa.V.nombre --> The Cortes in Mexico
<!-- comun.etapa.V.corto --> Mexico
<!-- comun.etapa.V.anos --> 1945

---

## 8. The 1936 hemicycle (Home cover and root)

<!-- comun.hemiciclo.titulo --> Hemicycle of the Congress of Deputies

<!-- comun.hemiciclo.desc -->
Floor plan of the hemicycle showing where the parliamentary minorities of the 1936 Cortes sat, according to José María Gil Robles's sketch.

<!-- comun.hemiciclo.pie -->
The minorities of the 1936 Cortes according to Gil Robles's sketch (*No fue posible la paz*, 1968, p. 524), transferred to the plan of the Congress. Each colour is a seat on the plan, not a deputy.

<!-- comun.hemiciclo.plano -->
Plan: Congress of Deputies, floor plan of the hemicycle (accessibility proposal by F. Pardo Calvo).

<!-- comun.hemiciclo.bloques.aria --> Highlight a bloc of the hemicycle
<!-- comun.hemiciclo.bloque.todos --> All
<!-- comun.hemiciclo.bloque.der --> Right
<!-- comun.hemiciclo.bloque.cen --> Centre
<!-- comun.hemiciclo.bloque.izq --> Left
<!-- comun.hemiciclo.bloque.gob --> Government

<!-- comun.hemiciclo.g.trad --> Traditionalists
<!-- comun.hemiciclo.g.bn --> Bloque Nacional
<!-- comun.hemiciclo.g.ceda --> CEDA
<!-- comun.hemiciclo.g.agr --> Agrarians
<!-- comun.hemiciclo.g.indder --> Right-wing independents
<!-- comun.hemiciclo.g.lliga --> Lliga Regionalista
<!-- comun.hemiciclo.g.centro --> Centre
<!-- comun.hemiciclo.g.indcons --> Independents and Conservatives
<!-- comun.hemiciclo.g.prog --> Progressives
<!-- comun.hemiciclo.g.rad --> Radicals
<!-- comun.hemiciclo.g.pnv --> Basque Nationalists
<!-- comun.hemiciclo.g.esq --> Esquerra and other Catalan parties
<!-- comun.hemiciclo.g.soc --> Socialists
<!-- comun.hemiciclo.g.pce --> Communists
<!-- comun.hemiciclo.g.repind --> Independent Republicans
<!-- comun.hemiciclo.g.ur --> Unión Republicana
<!-- comun.hemiciclo.g.ir --> Izquierda Republicana
<!-- comun.hemiciclo.g.banco --> Government bench (banco azul)

---

## 9. Interface glossary

<!-- comun.glosario.diario -->
**Diario.** The printed *Diario de Sesiones* of the Cortes, the official record of their proceedings. It is capitalised, and it prevails over the dataset.

<!-- comun.glosario.fila -->
**Row.** One row of the CSV. Most are turns of speech, from one printed speaker heading to the next. The rest hold what the Diario prints without anyone saying it: the summary, the lists, the documents.

<!-- comun.glosario.intervencion -->
**Intervention.** The explorer's term (*intervención*) for each of its rows. This site uses it only when speaking of the explorer.

<!-- comun.glosario.sesion -->
**Session.** A meeting of the plenary, with its date and its number. Date and number, together, identify it.

<!-- comun.glosario.etapa -->
**Stage.** Each of the stretches into which this site divides the Cortes: the Constituent Cortes, the 1933-1935 legislature, the Cortes of 1936 until the war, the war and Mexico.

<!-- comun.glosario.legislatura -->
**Legislature.** The value of the `legislature` column: 1931-1933, 1933-1935 or 1936-1939. The third covers the Cortes of 1936, the war and Mexico.

<!-- comun.glosario.presidencia -->
**The Chair.** The office that moderates the session, whether held by the President of the Cortes or by a Vice-President. Whoever is in the Chair is a deputy, and carries their party in the dataset.

<!-- comun.glosario.metadatos -->
**Project metadata.** The Diario, the number, the pages, the President of the Cortes and the Government for each session. The project compiled them; they are not deposited and the explorer does not show them.

<!-- comun.glosario.acotacion -->
**Bracketed note.** What the Diario records in brackets without anyone saying it as a speaker (*acotación*): «(Rumores.)», «(Aplausos.)».

<!-- comun.glosario.puerta -->
**Reading gateway.** A page of this site on one moment of the Diario, from one or several sessions. It has its quotations checked and the way to read it in full in the explorer.

<!-- comun.glosario.debate -->
**Ready-made debate.** A library that the explorer offers already built, with the name of a debate and its sessions.

<!-- comun.glosario.palabras -->
**Words.** The word count in the `nwords` column. Other ways of counting give other numbers; each figure states its own.

<!-- comun.glosario.diputados -->
**Deputies who speak.** The distinct `rep_id` values with at least one row in the period. They include whoever is in the Chair.

---

## 10. Root (`/`)

<!-- comun.raiz.titulo --> Luz y Taquígrafos · Elija lengua · Choose a language
<!-- comun.raiz.aria --> Lengua · Language

---

## 11. Page not found (`/404.html`)

<!-- comun.404.titulo --> This page does not exist.

<!-- comun.404.texto -->
The link may be old or contain a typo. The data have not moved: they are still at their DOI.

<!-- comun.404.salidas -->
[Go to Home] [See the Cortes, stage by stage] [Download the data]

<!-- comun.404.errata -->
If you reached this page from a link on this site, please tell us: [Report an error]
