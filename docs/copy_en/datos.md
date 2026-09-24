# Copy EN · Using the data (`/[lang]/datos/`)

> [nota de diseño] Traducción de `docs/copy_es/datos.md` (congelado, 23-09-2026), según `docs/03a_GLOSARIO_es-en.md`.
> Las notas de diseño, el estado y los cambios respecto al plan están en el archivo español; aquí no se repiten.
> En los fragmentos de código se traducen solo los comentarios; el código y lo que imprime quedan como en el español.

---

## Metadata

<!-- datos.meta.titulo -->
Using the data

<!-- datos.meta.descripcion -->
Where to start, how to open the CSV, what each column means, how to join it with Afinidades Elegidas and how to cite it.

## Side contents

<!-- datos.indice.titulo -->
On this page

<!-- datos.indice.empezar -->
Where to start

<!-- datos.indice.camino -->
The route to the file

<!-- datos.indice.columnas -->
The columns

<!-- datos.indice.decisiones -->
Before you count

<!-- datos.indice.unir -->
Joining with Afinidades

<!-- datos.indice.codigo -->
Two snippets

<!-- datos.indice.citar -->
How to cite

<!-- datos.indice.erratas -->
Errors and contact

## Header

<!-- datos.antetitulo -->
CSV · {{filas.V2}} rows · {{columnas.V2}} columns · {{dv.csv.bytes|peso}}

<!-- datos.titulo -->
How do I open it, what does each column mean, how do I join it and how do I cite it?

<!-- datos.entrada -->
Everything you need to work with the dataset: opening it, reading each column, deciding before counting, joining it with Afinidades Elegidas and citing it.

<!-- datos.entrada.2 -->
Each step comes with its line of code.

---

## 1 · Where to start (`#empezar`)

<!-- datos.empezar.titulo -->
Where to start

<!-- datos.empezar.entrada -->
Choose by what you already know how to do.

<!-- datos.empezar.s1.titulo -->
Without programming

<!-- datos.empezar.s1.texto -->
Every figure on this site carries its data in its «Data» tab: CSV and Excel, with its README and its citation. They weigh a few KB.

<!-- ↺ comun.fija.sin_formulario -->
No form: these are aggregate data.

<!-- datos.empezar.s2.titulo -->
Without programming, with the text

<!-- datos.empezar.s2.texto -->
Open the explorer: it comes with the *Diarios de Sesiones*, the official printed record of the Cortes' proceedings, already loaded. Search, read each session as in the *Diario* and export what you find, with its citation.

<!-- datos.empezar.s2.peso -->
The first time, it downloads about {{explorador.gz.bytes|peso_dec0}} compressed, with no form.

<!-- ↺ comun.fija.explorador -->
It runs in a computer's web browser.

<!-- ↺ comun.fija.local -->
It opens in your browser; what you search for and save stays on your device.

<!-- datos.empezar.s2.accion -->
[Open the explorer ↗]

<!-- datos.empezar.s3.titulo -->
With R or Python

<!-- datos.empezar.s3.texto -->
The deposited CSV: {{filas.V2}} rows and {{columnas.V2}} columns. The two snippets on this page load it, count it and join it.

<!-- datos.empezar.s3.peso -->
A single file of {{dv.csv.bytes|peso}}.

<!-- datos.empezar.s3.accion -->
[Download from Dataverse ↗]

<!-- datos.empezar.s4.titulo -->
With network methods

<!-- datos.empezar.s4.texto -->
Afinidades Elegidas: who signed each motion, amendment, request or interpellation with whom. It is a derived dataset with its own deposit, joined to this one by deputy and legislature.

<!-- datos.empezar.s4.accion -->
[See Afinidades Elegidas]

<!-- datos.empezar.cierre -->
Two people with the same dataset can reach different results without either being wrong. The analytical decisions are yours, and this page shows them.

<!-- ↺ comun.fija.formulario -->
Before you download, Harvard Dataverse will ask for your name, email address and institution.

---

## 2 · The route to the file (`#camino`)

<!-- datos.camino.titulo -->
The route to the file

<!-- datos.camino.entrada -->
Three steps: the DOI page, a single file and a reading with the right parameters.

<!-- ↺ comun.fija.formulario.motivo -->
We use these details to learn who uses the dataset and for what, so that we can improve it and announce updates.

<!-- datos.camino.texto -->
**Go to the DOI page.** The buttons on this site take you there, not to a loose file.

**Download only the CSV.** It is called `2REP_Diaries.csv` and weighs {{dv.csv.bytes|peso}}. The other files in the version are documentation.

**Read it with these parameters.** Semicolon as the separator, UTF-8 without a byte order mark and every field in double quotes.

Quotes inside a field are doubled. Each record ends in CRLF, and the text keeps its line breaks inside the quotes.

An empty field is a missing value. Python reads it as `NaN`; R reads it as `NA` in numeric columns and as an empty string in the rest.

**Check your copy.** If you have read it correctly, it should give you the numbers in this table, legislature by legislature. They are the ones the two snippets on this page print.

<!-- datos.camino.comprobar.col.legislatura -->
Legislature

<!-- datos.camino.comprobar.col.sesiones -->
Sessions

<!-- datos.camino.comprobar.col.filas -->
Rows

<!-- datos.camino.comprobar.col.palabras -->
Words (`nwords`)

<!-- datos.camino.comprobar.total -->
All three

<!-- datos.camino.comprobar.aria -->
Sessions, rows and words for each legislature in the deposited CSV

<!-- datos.camino.no_trae -->
**What the file does not contain.** Not the pages of the *Diario*, nor who was in the Chair at each session, nor the Government. These are project metadata, not deposited, and the explorer does not show them either.

<!-- datos.camino.accion -->
[Download from Dataverse ↗]

<!-- datos.camino.tabla.titulo -->
The files in the deposit

<!-- datos.camino.tabla.col.archivo -->
File

<!-- datos.camino.tabla.col.bytes -->
Bytes

<!-- datos.camino.tabla.col.md5 -->
MD5

<!-- datos.camino.tabla.col.que -->
What it is

<!-- datos.camino.archivo.csv -->
The data: one row per printed turn.

<!-- datos.camino.archivo.changelog_es -->
The change log, in Spanish.

<!-- datos.camino.archivo.changelog_en -->
The same, in English.

<!-- datos.camino.archivo.readme -->
The documentation, in English.

<!-- datos.camino.integridad -->
To check that your copy is the deposited one, compare its MD5 with the one in the table.

<!-- datos.camino.excel -->
**Do not open it in a spreadsheet.** {{csv.celdas_largas}} rows exceed the maximum number of characters in an Excel cell. The longest has {{csv.fila_mas_larga.caracteres}}.

---

## 3 · The columns (F32, `#columnas`)

<!-- datos.columnas.titulo -->
The {{columnas.V2}} columns

<!-- datos.columnas.entrada -->
Each column, with its definition and its value in two real rows.

<!-- datos.columnas.texto -->
The two example rows come one after the other in the session of 1 October 1931. In the first, the Chair calls for silence; in the second, Clara Campoamor begins to speak.

<!-- datos.columnas.id.definicion -->
The row number, from one to {{filas.V2}}, with no gaps. It follows reading order: date, session and place in the session.

<!-- datos.columnas.num_session.definicion -->
The number of the session within its legislature, as the *Diario* prints it. It starts again in each legislature: a session is identified by its date and number together.

<!-- datos.columnas.order.definicion -->
The place of the row in its session, counted from zero.

<!-- datos.columnas.date.definicion -->
The date of the session, in YYYY-MM-DD format. Some days had two sessions.

<!-- datos.columnas.speaker.definicion -->
The printed speaker heading, as optical character recognition read it: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». It is the only column that gives the office.

<!-- datos.columnas.speech.definicion -->
The text of the row, neither summarised nor corrected by hand, with the shorthand writer's bracketed notes.

<!-- datos.columnas.rep_id.definicion -->
The deputy, according to the project's table of deputies. It is a person, not a seat; in the Chair's rows, the deputy who was presiding.

<!-- datos.columnas.rep_name.definicion -->
The deputy's full name, without accents and with each word capitalised.

<!-- datos.columnas.district.definicion -->
The constituency for which the deputy was elected.

<!-- datos.columnas.party.definicion -->
The initials of the deputy's party in that legislature.

<!-- datos.columnas.party_family.definicion -->
The deputy's party family.

<!-- datos.columnas.ideology.definicion -->
The position of the deputy's party, from EI, far left, to ED, far right.

<!-- datos.columnas.nwords.definicion -->
The words in the text, split on the space character.

<!-- datos.columnas.legislature.definicion -->
Legislature: 1931-1933, 1933-1935 or 1936-1939. The third includes the wartime sessions and those in Mexico.

<!-- datos.columnas.speech.dentro -->
**Inside the text.** The *Diario*'s paragraphs are separated by a blank line. The shorthand writer's bracketed notes stay in parentheses, as on paper: «(Muy bien.—Aplausos.)».

Words that the *Diario* split with a hyphen at the end of a line have been rejoined. Reading errors have not been corrected.

<!-- ↺ comun.fija.legislatura -->
The census and the relations of Afinidades Elegidas call 1933-1936 the legislature that this dataset calls 1933-1935; the Diario's sessions end on 10 December 1935.

<!-- fig.F32.titulo -->
What each column holds

<!-- fig.F32.pregunta -->
What does each column mean?

<!-- fig.F32.tabla.col.columna -->
Column

<!-- fig.F32.tabla.col.definicion -->
What it is

<!-- fig.F32.tabla.col.silencio -->
The Chair

<!-- fig.F32.tabla.col.campoamor -->
Clara Campoamor

<!-- fig.F32.vacio -->
empty

<!-- fig.F32.tipo.entero -->
integer

<!-- fig.F32.tipo.texto -->
text

<!-- fig.F32.tipo.fecha -->
date

<!-- fig.F32.vacios -->
{{n}} empty

<!-- fig.F32.sin_vacios -->
none empty

<!-- fig.F32.distintos -->
{{n}} distinct values

<!-- fig.F32.tabla.col.tipo -->
Type

<!-- fig.F32.tabla.col.vacios -->
Empty

<!-- fig.F32.tabla.col.distintos -->
Distinct

<!-- fig.F32.cortado -->
{{n}} characters in total

<!-- fig.F32.nota -->
{{columna}} · {{vacios}} empty out of {{den}} rows

<!-- fig.F32.que_mide -->
The {{columnas.V2}} columns of the deposited CSV: their type, their empty cells, their distinct values and their value in two real rows.

<!-- fig.F32.denominador -->
The {{filas.V2}} rows.

<!-- fig.F32.salvedad -->
Definitions from the deposited README.

<!-- fig.F32.alt -->
Table of the columns of the deposited CSV, with the definition of each and its value in two example rows.

---

## 4 · Before you count (`#decisiones`)

<!-- datos.decisiones.titulo -->
Before you count: four decisions that change the result

<!-- datos.decisiones.entrada -->
None has a right answer for everyone. Each comes with its number and the line that applies it.

<!-- datos.decisiones.1.titulo -->
The Chair

<!-- datos.decisiones.1.texto -->
{{presidencia.filas.pct}} of the rows belong to the Chair. They take {{presidencia.palabras.pct}} of the words.

To count speakers, remove it. Keep it if you study how the debate was run: who gave the floor, who called to order.

The site identifies it with the explorer's heading parser, which also reads the reading errors.

One line of pandas comes close: it flags {{presidencia.aprox.filas}} rows. The parser flags {{presidencia.filas}}, because it also reads headings such as «PERSIDENTE».

<!-- datos.decisiones.1.codigo -->
```python
pres = d.speaker.str.contains("PRESIDENTE") & ~d.speaker.str.contains("CONSEJO|GOBIERNO|REPÚBLICA")
oradores = d[~pres]
```

<!-- datos.decisiones.2.titulo -->
Rows are not speeches

<!-- datos.decisiones.2.texto -->
{{longitud.hasta50.pct}} of the rows have {{longitud.umbral}} words or fewer. There are {{longitud.mas300}} rows of more than {{longitud.umbral300}} words.

Those long rows hold {{longitud.mas300.palabras.pct}} of all the words. If you study speeches, set a minimum and say so.

If you study interruptions or procedure, the short rows are exactly your data.

<!-- datos.decisiones.2.codigo -->
```python
largas = d[d.nwords > 300]
```

<!-- datos.decisiones.3.titulo -->
What a word is

<!-- datos.decisiones.3.texto -->
`nwords` splits the text on spaces; `split()` also splits on line breaks and gives more words. Say which one you use.

<!-- datos.decisiones.3.codigo -->
```python
d.speech.str.split().str.len().sum()   # compared with d.nwords.sum()
```

<!-- datos.decisiones.4.titulo -->
Unequal legislatures

<!-- datos.decisiones.4.texto -->
The first legislature holds {{leg.1931-1933.palabras.pct}} of the words. Compare rates, not volumes: words per session, or each group's share within its legislature.

A rate can reverse the order. Per session, the first legislature has {{leg.1931-1933.palabras_por_sesion}} words.

The second, with fewer words in total, has {{leg.1933-1935.palabras_por_sesion}} per session.

The third legislature, 1936-1939, brings together three very different stages. To separate them, cut by session number: up to session 60, the Cortes of 1936, until 10 July.

Sessions 61 to 69 are the Cortes at war, from October 1936 to February 1939. Sessions 70 to 74 are those held in Mexico, in 1945.

<!-- datos.decisiones.4.codigo -->
```python
d.groupby("legislature").nwords.sum() / d.nwords.sum()
etapa = pd.cut(d.num_session, [0, 60, 69, 74], labels=["1936", "guerra", "México"])
d[d.legislature == "1936-1939"].groupby(etapa).nwords.sum()
```

---

## 6 · Joining with Afinidades Elegidas (F34, `#unir`)

<!-- datos.unir.titulo -->
Joining with Afinidades Elegidas

<!-- datos.unir.entrada -->
Afinidades Elegidas has one record per deputy and legislature. It is joined to this dataset by both, never by the deputy alone.

<!-- datos.unir.texto -->
The key is the deputy, `rep_id`, called `id_dip` there, plus the legislature. Before joining, recode the second legislature as the census calls it: 1933-1935 becomes 1933-1936.

A few deputy–legislature pairs have no record in the Afinidades census: their rows are left without Afinidades attributes. The table below counts them, with the version they come from.

If you join by the deputy alone, each row is repeated once for every legislature of its deputy, and any sum comes out inflated.

The Afinidades table gives, for each deputy and legislature, the name, district, party, family and ideology, with the Afinidades codes.

They do not always match those of this dataset: sometimes the party is written differently, nearly always «Indep.» against «Independiente».

If you use those attributes, say which dataset they come from.

<!-- datos.unir.archivo -->
The Afinidades Elegidas table of deputies is downloaded as `representative_metadata.tab`, tab-separated, from the CGOCUS V1.1 deposit.

<!-- datos.unir.accion -->
[Download from Dataverse ↗]

<!-- fig.F34.titulo -->
By deputy and legislature, never by the deputy alone

<!-- fig.F34.pregunta -->
How do you join the dataset with Afinidades Elegidas without multiplying rows?

<!-- fig.F34.tabla.col.paso -->
Step

<!-- fig.F34.tabla.col.resultado -->
Result

<!-- fig.F34.paso.recodificar -->
Recode legislature 1933-1935 as 1933-1936

<!-- fig.F34.paso.recodificar.resultado -->
Both datasets refer to the same legislature

<!-- fig.F34.paso.unir -->
Join by deputy and legislature

<!-- fig.F34.paso.unir.resultado -->
{{filas.V2}} rows, the same as before

<!-- fig.F34.paso.casan -->
Deputy–legislature pairs that match

<!-- fig.F34.paso.casan.resultado -->
{{union.pares.casan}} of {{union.pares}}

<!-- fig.F34.paso.sin_ficha -->
Pairs with no record in Afinidades

<!-- fig.F34.paso.sin_ficha.resultado -->
{{union.pares.sin_ficha}} pairs, {{union.filas.sin_ficha}} rows

<!-- fig.F34.paso.mal -->
Join by the deputy alone (wrong)

<!-- fig.F34.paso.mal.resultado -->
{{union.solo_id.filas}} rows

<!-- fig.F34.paso.partido -->
Pairs with a different party label

<!-- fig.F34.paso.partido.resultado -->
{{union.pares.otro_partido}}

<!-- fig.F34.barra.v2 -->
The deposited CSV, before joining

<!-- fig.F34.barra.bien -->
Joined by deputy and legislature

<!-- fig.F34.barra.mal -->
Joined by the deputy alone

<!-- fig.F34.barra.repetidas -->
{{n}} repeated rows

<!-- fig.F34.barra.sin_ficha -->
Of these, with no record in Afinidades

<!-- fig.F34.que_mide -->
The deputy–legislature pairs in the dataset that have no record in Afinidades Elegidas, and those that have one with a different party label.

<!-- fig.F34.denominador -->
The {{union.pares}} deputy–legislature pairs in the dataset, with the legislature recoded as the census calls it.

<!-- fig.F34.otros.resumen -->
The pairs with a different party label, one by one

<!-- fig.F34.otros.col.v2 -->
Party in the dataset

<!-- fig.F34.otros.col.afin -->
Party in Afinidades

<!-- fig.F34.casos.resumen -->
The pairs with no record, one by one

<!-- fig.F34.casos.col.diputado -->
Deputy

<!-- fig.F34.casos.col.legislatura -->
Legislature

<!-- fig.F34.casos.col.filas -->
Rows

<!-- fig.F34.salvedad -->
Numbers from the deposited version of Afinidades Elegidas, CGOCUS V1.1. They will change if another version is deposited.

<!-- fig.F34.alt -->
Table with the steps for joining the two datasets: recode the legislature, join by deputy and legislature, and what happens if you join by the deputy alone.

---

## 7 · Two snippets (`#codigo`)

<!-- datos.codigo.titulo -->
Two snippets, in R and in Python

<!-- datos.codigo.entrada -->
They load the CSV, check its rows, count each legislature and perform both joins with Afinidades, the right one and the wrong one. They give the same result in both languages.

<!-- datos.codigo.reproduce -->
They reproduce numbers from this site: the sessions, rows and words of each legislature, and the {{meses.con_sesion}} months with a session.

They also reproduce February 1933, the month of Casas Viejas: {{mes.1933-02.sesiones}} sessions. That month has {{mes.1933-02.filas}} rows.

Its rows hold {{mes.1933-02.palabras}} words.

<!-- datos.codigo.archivos -->
They need two files in the same folder: `2REP_Diaries.csv`, from THQCMI, and `representative_metadata.tab`, from CGOCUS. Both require the Dataverse form.

<!-- datos.codigo.r.rotulo -->
R, no packages

<!-- datos.codigo.r -->
```r
# The deposited CSV (THQCMI V2.0): ";" as separator, UTF-8, every field in quotes.
d <- read.csv2("2REP_Diaries.csv", fileEncoding = "UTF-8")
stopifnot(nrow(d) == 107551)

# CAVEAT. A row is what the Diario prints between two speaker headings, not a speech.
# The Chair's rows go under the name of whoever is in the Chair. nwords counts pieces separated
# by the space character. A session is (date, num_session): num_session restarts at 1 in each legislature.
ses <- unique(d[, c("legislature", "date", "num_session")])
t <- data.frame(sesiones = c(table(ses$legislature)),
                filas    = c(table(d$legislature)),
                palabras = c(tapply(d$nwords, d$legislature, sum)))
print(t)

mes <- substr(d$date, 1, 7)
cat("meses con sesión:", length(unique(mes)), "\n")
feb <- d[mes == "1933-02", ]
cat("febrero de 1933:", nrow(unique(feb[, c("date", "num_session")])), "sesiones,",
    nrow(feb), "filas,", sum(feb$nwords), "palabras\n")

# Afinidades Elegidas (CGOCUS V1.1): one record per deputy AND legislature.
a <- read.delim("representative_metadata.tab", fileEncoding = "UTF-8")
names(a)[names(a) == "id_dip"] <- "rep_id"

# WRONG: by the deputy alone. Each row is repeated once for every legislature of its deputy.
mal <- merge(d, a, by = "rep_id", all.x = TRUE)
cat("unión solo por el id:", nrow(mal), "filas\n")

# RIGHT: by deputy and legislature. The CGOCUS census calls 1933-1936 what is 1933-1935 here.
d$legislatura <- ifelse(d$legislature == "1933-1935", "1933-1936", d$legislature)
bien <- merge(d, a, by = c("rep_id", "legislatura"), all.x = TRUE)
sin <- bien[!is.na(bien$rep_id) & is.na(bien$nombre_completo), ]
cat("unión por id y legislatura:", nrow(bien), "filas;", nrow(sin), "filas y",
    nrow(unique(sin[, c("rep_id", "legislatura")])), "pares sin ficha en CGOCUS\n")
```

<!-- datos.codigo.python.rotulo -->
Python, with pandas

<!-- datos.codigo.python -->
```python
import pandas as pd

# The deposited CSV (THQCMI V2.0): ";" as separator, UTF-8, every field in quotes.
d = pd.read_csv("2REP_Diaries.csv", sep=";", dtype={"rep_id": "Int64"})
assert len(d) == 107551

# CAVEAT. A row is what the Diario prints between two speaker headings, not a speech.
# The Chair's rows go under the name of whoever is in the Chair. nwords counts pieces separated
# by the space character. A session is (date, num_session): num_session restarts at 1 in each legislature.
ses = d[["legislature", "date", "num_session"]].drop_duplicates()
t = pd.DataFrame({"sesiones": ses.groupby("legislature").size(),
                  "filas": d.groupby("legislature").size(),
                  "palabras": d.groupby("legislature")["nwords"].sum()})
print(t)

mes = d["date"].str[:7]
print("meses con sesión:", mes.nunique())
feb = d[mes == "1933-02"]
print("febrero de 1933:", len(feb[["date", "num_session"]].drop_duplicates()), "sesiones,",
      len(feb), "filas,", feb["nwords"].sum(), "palabras")

# Afinidades Elegidas (CGOCUS V1.1): one record per deputy AND legislature.
a = pd.read_csv("representative_metadata.tab", sep="\t").rename(columns={"id_dip": "rep_id"})

# WRONG: by the deputy alone. Each row is repeated once for every legislature of its deputy.
mal = d.merge(a, on="rep_id", how="left")
print("unión solo por el id:", len(mal), "filas")

# RIGHT: by deputy and legislature. The CGOCUS census calls 1933-1936 what is 1933-1935 here.
d["legislatura"] = d["legislature"].replace({"1933-1935": "1933-1936"})
bien = d.merge(a, on=["rep_id", "legislatura"], how="left", validate="many_to_one")
sin = bien[bien["rep_id"].notna() & bien["nombre_completo"].isna()]
print("unión por id y legislatura:", len(bien), "filas;", len(sin), "filas y",
      len(sin[["rep_id", "legislatura"]].drop_duplicates()), "pares sin ficha en CGOCUS")
```

<!-- datos.codigo.copiar -->
[Copy the code]

<!-- datos.codigo.salida.archivo -->
[Download the output of both snippets]

<!-- datos.codigo.salida.rotulo -->
Output, the same for both, run on {{fragmentos.fecha|fecha_larga}}

<!-- datos.codigo.reejecuta -->
The site's exporter runs both snippets again at every build. If their output stops matching the numbers on these pages, the build fails.

---

## 8 · How to cite (`#citar`)

<!-- datos.citar.titulo -->
How to cite

<!-- datos.citar.entrada -->
Cite what you used. The citation of a figure also gives its date.

<!-- datos.citar.thqcmi -->
**The dataset.** The official Harvard Dataverse citation, as text, BibTeX or RIS.

<!-- datos.citar.cgocus -->
**Afinidades Elegidas.** Copy it as Dataverse gives it: it says ‘V1’ and carries a UNF, but it corresponds to the deposited version, CGOCUS V1.1.

<!-- datos.citar.figura -->
**A figure.** Its title, the address of its anchor and the date of calculation. Each figure gives its own in the Data tab.

<!-- datos.citar.pasaje -->
**A passage.** The date and number of the session, and the row id. For example: Diario de Sesiones, 1 October 1931, session 48; Luz y Taquígrafos, row {{fila.campoamor.id.V2|id}}.

<!-- datos.citar.pasaje.2 -->
If you cite the printed *Diario*, add its issue number and the page. The explorer gives neither.

<!-- datos.citar.pestana.texto -->
Text

<!-- datos.citar.pestana.bibtex -->
BibTeX

<!-- datos.citar.pestana.ris -->
RIS

<!-- datos.citar.copiar -->
[Copy the citation]

<!-- datos.citar.licencia -->
Both datasets are licensed under CC BY 4.0: you may use, adapt and redistribute the data if you cite the source.

<!-- ↺ comun.fija.diario -->
A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails.

---

## README of the Data and Versions figures (columns of each CSV)

<!-- datos.leame.columnas -->
Columns

<!-- datos.leame.procedencia -->
Every number on the site, with its source, its formula and its date, is in procedencia.csv.

<!-- fig.F32.leame.col.columna -->
Name of the column in the deposited CSV.

<!-- fig.F32.leame.col.tipo -->
Integer, text or date (YYYY-MM-DD).

<!-- fig.F32.leame.col.vacios -->
Rows with an empty cell.

<!-- fig.F32.leame.col.distintos -->
Distinct values, not counting empty ones.

<!-- fig.F32.leame.col.filas -->
Rows in the deposited CSV.

<!-- fig.F32.leame.col.fila_5423 -->
Value in row {{fila.presidencia.id.V2|id}}: the Chair calls for silence (1 October 1931, session 48).

<!-- fig.F32.leame.col.fila_5424 -->
Value in row {{fila.campoamor.id.V2|id}}: Clara Campoamor begins to speak, in the same session.

<!-- fig.F34.leame.col.caso -->
sin_ficha: the pair has no record in Afinidades Elegidas; otro_partido: it has one, with a different party label.

<!-- fig.F34.leame.col.rep_id -->
Identifier of the deputy (rep_id in the dataset, id_dip in Afinidades Elegidas).

<!-- fig.F34.leame.col.nombre -->
Name of the deputy according to the site's spelling table.

<!-- fig.F34.leame.col.legislatura_cgocus -->
Legislature with the label of the Afinidades Elegidas census (1933-1936 where the dataset says 1933-1935).

<!-- fig.F34.leame.col.filas_v2 -->
Rows of that pair in the dataset that are left without Afinidades attributes.

<!-- fig.F34.leame.col.party_v2 -->
The deputy's most frequent party in that legislature, in the dataset.

<!-- fig.F34.leame.col.partido_cgocus -->
The deputy's party in that legislature, in Afinidades Elegidas.

---

## 9 · Errors and contact (`#erratas`)

<!-- datos.erratas.titulo -->
Errors and contact

<!-- datos.erratas.texto -->
If you find an error, tell us the date, the session number, the row id and what the printed *Diario* says. If you are not sure where to start, write to us as well.

<!-- datos.erratas.acciones -->
[Report an error] [Contact us]
