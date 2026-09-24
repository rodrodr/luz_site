# Copy EN · Afinidades Elegidas (`/[lang]/afinidades/`)

> [nota de diseño] Traducción de `docs/copy_es/afinidades.md` (congelado, 23-09-2026), según
> `docs/03a_GLOSARIO_es-en.md`. Las notas de diseño y las tablas que pinta la plantilla están en el archivo español.
> Los rótulos de legislatura de CGOCUS (1931-1933 · 1933-1936 · 1936-1939) se copian tal cual.

---

## Metadata

<!-- afinidades.meta.titulo -->
Afinidades Elegidas

<!-- afinidades.meta.descripcion -->
Who signed with whom in the Congress of the Republic, 1931–1939: three co-authorship networks, two ways of measuring crossing and what a signature does not tell you.

## Header

<!-- afinidades.antetitulo -->
doi:10.7910/DVN/CGOCUS · {{dv.cgocus.version.fecha|fecha_corta}}

<!-- afinidades.titulo -->
Whom were they willing to sign with?

<!-- afinidades.entrada -->
Speaking against someone is public and cheap; signing a measure with another deputy requires prior agreement, nearly always reached off the record.

<!-- ↺ comun.sello.afin -->
Afinidades Elegidas (CGOCUS)

<!-- afinidades.que_es -->
Afinidades Elegidas is a dataset derived from Luz y Taquígrafos, with its own deposit. It records who signed with whom in the Congress, from 1931 to 1939. The numbers on this page come from its deposit.

<!-- afinidades.nombre -->
The name – literally *Elective Affinities* – comes from Goethe's elective affinity, which Max Weber brought into sociology. «Elegidas» (chosen), rather than «electivas» (elective), stresses the decision of the person who signs. It also allows another reading: the affinities of those elected.

<!-- afinidades.abrir -->
[Open Afinidades ↗]

<!-- afinidades.indice.firmar -->
Signing is not speaking

<!-- afinidades.indice.cifras -->
Three legislatures

<!-- afinidades.indice.cruce -->
Did they cross blocs?

<!-- afinidades.indice.redes -->
Three networks

<!-- afinidades.indice.puentes -->
The bridges

<!-- afinidades.indice.limites -->
What it does not measure

<!-- afinidades.indice.datos -->
The data

## 2. Signing is not speaking

<!-- afinidades.firmar.antetitulo -->
CGOCUS · {{afin.relaciones}} pair–measure relations · {{afin.medidas}} measures

<!-- afinidades.firmar.titulo -->
Signing is not speaking

<!-- afinidades.firmar.medida -->
A measure is a bill, an amendment, a collective request, an interpellation or another document signed by two or more deputies. Afinidades takes them from the same *Diarios de Sesiones*, the official printed record of the Cortes' proceedings, and identifies each signatory.

<!-- afinidades.firmar.relacion -->
Two deputies who sign the same measure form a relation. Its weight is the number of measures they share.

<!-- afinidades.firmar.total -->
The dataset holds {{afin.relaciones}} pair–measure relations: one for each pair of signatories to each measure.

<!-- afinidades.firmar.identificar -->
Each signature is attributed to a deputy by name, automatically and with review of doubtful cases. Of the {{afin.firmas}} signatures, {{afin.firmas_sin_diputado}} were left unattributed.

<!-- afinidades.firmar.sin_relacion -->
There are {{afin.medidas_sin_relacion}} measures that do not reach two identified signatories; they form no relation.

<!-- afinidades.firmar.periodo -->
It covers the three legislatures of the Republic, from 1931 to 1939. The sessions held in Mexico, in 1945, are not included.

## 3. Three legislatures in numbers

<!-- afinidades.cifras.antetitulo -->
CGOCUS · {{afin.personas}} people · {{afin.tres_leg}} in all three legislatures

<!-- afinidades.cifras.titulo -->
Three legislatures in numbers

<!-- afinidades.cifras.entrada -->
The Afinidades census has one record per deputy and legislature. It covers {{afin.personas}} people.

<!-- afinidades.cifras.tabla.titulo -->
Deputies, signatures and measures by legislature

<!-- afinidades.cifras.tabla.col.leg -->
Legislature

<!-- afinidades.cifras.tabla.censo -->
Deputies in the census

<!-- afinidades.cifras.tabla.firman -->
Sign at least one measure

<!-- afinidades.cifras.tabla.aislados -->
Sign none (isolated)

<!-- afinidades.cifras.tabla.medidas -->
Measures signed by two or more

<!-- afinidades.cifras.tabla.relaciones -->
Pair–measure relations

<!-- afinidades.cifras.tabla.fuera -->
Signatories with no record in that legislature

<!-- afinidades.cifras.tabla.nota -->
The last row counts signatories whom the census places in another legislature. They are not included in the rows above.

<!-- afinidades.cifras.tres -->
{{afin.tres_leg}} deputies sit in all three legislatures.

<!-- afinidades.cifras.guerra -->
The 1936-1939 legislature left {{afin.1936.medidas}} measures signed by two or more deputies, against {{afin.1933.medidas}} in the previous one.

<!-- ↺ comun.fija.legislatura -->
The census and the relations of Afinidades Elegidas call 1933-1936 the legislature that this dataset calls 1933-1935; the Diario's sessions end on 10 December 1935.

## 4. Did they cross blocs?

<!-- afinidades.cruce.antetitulo -->
CGOCUS · denominator: the edgelist rows of each legislature

<!-- afinidades.cruce.titulo -->
Did they cross blocs?

<!-- afinidades.cruce.entrada -->
There are two ways of measuring whether deputies signed with the other side of the Chamber, and they tell different stories.

<!-- afinidades.cruce.bloques -->
Each deputy falls into a bloc according to the ideology in their record. The left brings together the far left, the left and the centre-left; the right, the centre-right, the right and the far right. The centre lies between them.

<!-- afinidades.cruce.dos -->
Cross-bloc counts any pair from different blocs, the centre included. Strict counts only the left with the right.

<!-- afinidades.cruce.bloque -->
The share of relations that cross blocs falls from {{afin.1931.cruce_bloque|pct1}} in 1931-1933 to {{afin.1936.cruce_bloque|pct1}} in 1936-1939.

<!-- afinidades.cruce.estricto -->
Strict crossing does not fall steadily: {{afin.1931.cruce_estricto|pct1}}, {{afin.1933.cruce_estricto|pct1}} and {{afin.1936.cruce_estricto|pct1}}, legislature by legislature.

<!-- afinidades.cruce.centro -->
Until the war, most crossing goes through the centre. In the Constituent Cortes, {{afin.1931.cruce_centro|pct1}} of the cross-bloc relations have a signatory from the centre. In 1933-1936, {{afin.1933.cruce_centro|pct1}}.

<!-- afinidades.cruce.centro_1936 -->
In 1936-1939 the centre almost disappears: it is present in {{afin.1936.cruce_centro|pct1}} of the crossing. What remains is strict crossing.

<!-- afinidades.cruce.concentrado -->
And that strict crossing is concentrated in {{afin.1936.medidas_estricto}} of the legislature's {{afin.1936.medidas}} measures.

<!-- afinidades.cruce.pnv -->
The PNV counts on the right, because the census codes it as centre-right. In 1936-1939 it is present in {{afin.1936.estricto_pnv|pct1}} of the strict-crossing relations.

<!-- afinidades.cruce.lectura -->
This is a reading of the data by bloc, made for this page; the blocs are not a CGOCUS category.

### F22 · Two kinds of crossing

<!-- fig.F22.titulo -->
Two kinds of crossing

<!-- fig.F22.pregunta -->
Did deputies sign with the other bloc?

<!-- fig.F22.que_mide -->
In each legislature, the share of pair–measure relations that link signatories from different blocs, and the share that link left with right.

<!-- fig.F22.denominador -->
The pair–measure relations of each legislature: {{afin.1931.relaciones}}, {{afin.1933.relaciones}} and {{afin.1936.relaciones}}.

<!-- fig.F22.leyenda.bloque -->
Cross-bloc

<!-- fig.F22.leyenda.estricto -->
Strict: left with right

<!-- fig.F22.nota -->
{{legislatura}} · {{serie}}: {{pct}} · {{n}} of {{den}} pair–measure relations

<!-- fig.F22.leyenda.centro -->
Cross-bloc, with a signatory from the centre

<!-- fig.F22.leyenda.lectura -->
Each bar is the cross-bloc share for its legislature. Its gold segment, the strict share, always starts from zero, so it can be compared across legislatures.

<!-- fig.F22.nota.centro -->
With a signatory from the centre: {{pct}} of cross-bloc · {{n}} of {{den}}

<!-- fig.F22.tabla.col.centro -->
With the centre, within crossing

<!-- fig.F22.tabla.col.leg -->
Legislature

<!-- fig.F22.tabla.col.bloque -->
Cross-bloc

<!-- fig.F22.tabla.col.estricto -->
Strict

<!-- fig.F22.tabla.col.relaciones -->
Pair–measure relations

<!-- fig.F22.salvedad -->
‘Cross-bloc’ counts any pair from left, centre and right; ‘strict’, only left with right. In 1936-1939 there are only {{afin.1936.medidas}} measures: it is not a comparable third snapshot.

<!-- fig.F22.alt -->
One bar per legislature: the share of relations that cross blocs, with its left-with-right segment (strict crossing) marked from zero.

## 5. Three networks

<!-- afinidades.redes.antetitulo -->
CGOCUS · {{afin.1931.censo}} · {{afin.1933.censo}} · {{afin.1936.censo}} deputies in the census

<!-- afinidades.redes.titulo -->
Three networks

<!-- afinidades.redes.entrada -->
Each legislature has its network: one point per deputy in the census and one line for each pair who signed together.

<!-- afinidades.redes.buscar -->
Look up a deputy in the census list: the network highlights those who signed with them.

<!-- afinidades.redes.aislados -->
The 1936-1939 network has many loose points. They are the {{afin.1936.aislados}} deputies who signed no measure.

<!-- afinidades.redes.una -->
In 1931-1933 and 1933-1936, everyone who signs forms a single network: anyone can reach anyone through co-signatories. In 1936-1939, {{afin.1936.fuera_principal|letra}} signatories remain in loose groups, with no link to the main network.

<!-- afinidades.redes.partidos -->
In 1936-1939 signatures are more confined within each party. Modularity by party, which measures that concentration, rises to {{afin.1936.modularidad}}, against {{afin.1931.modularidad}} in the Constituent Cortes.

<!-- afinidades.redes.app -->
The Afinidades application draws the networks with filters for legislature, ideology, party, district, family and role.

<!-- afinidades.redes.llamada -->
[Open Afinidades ↗]

### F21 · Three networks

<!-- fig.F21.titulo -->
Co-authorship networks, legislature by legislature

<!-- fig.F21.pregunta -->
Who signed with whom?

<!-- fig.F21.que_mide -->
Who signed a measure with whom, in each legislature. Each line links two deputies who signed together.

<!-- fig.F21.denominador -->
The deputies in the census of each legislature: {{afin.1931.censo}}, {{afin.1933.censo}} and {{afin.1936.censo}}.

<!-- fig.F21.conmuta.titulo -->
Legislature

<!-- fig.F21.buscar -->
Find a deputy in the census

<!-- fig.F21.buscar.vacio -->
No one with that name in this legislature's census.

<!-- fig.F21.nota -->
{{nombre}} · {{partido}} · {{familia}} · signed with {{grado}} deputies

<!-- fig.F21.nota.aislado -->
{{nombre}} · {{partido}} · {{familia}} · signed no measure with another deputy

<!-- fig.F21.leyenda.titulo -->
Ideology, according to the record

<!-- fig.F21.leyenda.aislados -->
Loose, on the outer ring: those who signed with no one

<!-- fig.F21.leyenda.EI -->
Far left

<!-- fig.F21.leyenda.I -->
Left

<!-- fig.F21.leyenda.CI -->
Centre-left

<!-- fig.F21.leyenda.C -->
Centre

<!-- fig.F21.leyenda.CD -->
Centre-right

<!-- fig.F21.leyenda.D -->
Right

<!-- fig.F21.leyenda.ED -->
Far right

<!-- fig.F21.rotulo.1936.izquierda -->
The left

<!-- fig.F21.rotulo.1936.derecha -->
The right

<!-- fig.F21.leyenda.tamano -->
The size of the point grows with the number of deputies they signed with.

<!-- fig.F21.nota.uno -->
{{nombre}} · {{partido}} · {{familia}} · signed with one deputy

<!-- fig.F21.coautores.titulo -->
Signed most often with

<!-- fig.F21.coautores.medidas -->
{{n}} measures

<!-- fig.F21.coautores.una -->
one measure

<!-- fig.F21.coautores.resto -->
and {{n}} more deputies

<!-- fig.F21.buscar.limpiar -->
Clear the selection

<!-- fig.F21.teclado -->
With the keyboard: Tab moves to the network; ← and → step through the deputies, from most to fewest co-signatories; Home and End go to the first and the last; Esc releases.

<!-- fig.F21.cargar.nota -->
The network can be explored and searched on a computer or a tablet. Here is its static image, with the table of degrees in the Table tab.

<!-- fig.F21.tabla.titulo -->
The twenty deputies who signed with the most colleagues, in {{legislatura}}

<!-- fig.F21.tabla.nota -->
The full census, with each deputy's degree in all three legislatures, is in the Data tab.

<!-- fig.F21.sin_grafia -->
Of the {{afin.personas}} people in the census, {{afin.sin_grafia}} do not yet have a reviewed spelling: their name appears as CGOCUS writes it, without accents.

<!-- fig.F21.tabla.col.nombre -->
Deputy

<!-- fig.F21.tabla.col.partido -->
Party

<!-- fig.F21.tabla.col.familia -->
Family

<!-- fig.F21.tabla.col.grado -->
Signed with

<!-- fig.F21.salvedad -->
Co-authorship is not a vote or ideological agreement. Unattributed signatures and those of signatories with no record in that legislature are missing.

<!-- fig.F21.alt -->
Three co-authorship networks, one per legislature: each point is a deputy in the census and each line links two who signed together; those who did not sign are left loose.

## 6. People: the bridges

<!-- afinidades.puentes.antetitulo -->
CGOCUS · transversality index, by legislature

<!-- afinidades.puentes.titulo -->
People: the bridges

<!-- afinidades.puentes.indice -->
Afinidades also measures each deputy. Its transversality index combines several measures of how much a deputy signs with other parties, within each legislature.

<!-- afinidades.puentes.que_mide -->
It does not measure whether their ideas were moderate, but whether their way of signing crossed the boundaries of their party.

<!-- afinidades.puentes.1931 -->
In 1931-1933, the top {{afin.1931.puentes.n|letra}} are Melquíades Álvarez, Estelrich and Unamuno.

<!-- afinidades.puentes.1933 -->
In 1933-1936, Chapaprieta, Cano López and Iranzo head the list.

<!-- afinidades.puentes.1936 -->
In 1936-1939, the top {{afin.1936.puentes.n|letra}} include Aguirre and Irujo, of the PNV, which the census codes as centre-right.

<!-- afinidades.puentes.lectura -->
The index says whom they signed with, not what they stood for.

<!-- afinidades.puentes.roles -->
The application also gives each deputy a role, from «diputado aislado» (isolated deputy) to «líder de Cámara» (Chamber leader), according to their activity, influence and transversality.

<!-- afinidades.puentes.ficha -->
Its «Diputados» (deputies) view finds each one by name and filters by family, party, district and role.

<!-- afinidades.puentes.llamada -->
[Open Afinidades ↗]

## 7. What it does not measure

<!-- afinidades.limites.antetitulo -->
CGOCUS · {{afin.truncadas.medidas}} of {{afin.medidas}} measures with the list of signatures cut short

<!-- afinidades.limites.titulo -->
What it does not measure, and how it measures

<!-- afinidades.limites.voto -->
Co-authorship is not a vote or ideological agreement. Signing an amendment together does not tell you how each signatory voted.

<!-- afinidades.limites.guerra -->
The 1936-1939 legislature is not a comparable third snapshot. Of its {{afin.1936.medidas}} measures, {{afin.1936.medidas_antes}} were signed before 18 July 1936.

<!-- afinidades.limites.truncadas -->
Of the {{afin.medidas}} measures, {{afin.truncadas.medidas}} reach the *Diario* with the list of signatures cut short: «Siguen las firmas hasta…» (the signatures continue up to…). Only printed signatures count.

<!-- afinidades.limites.emparejamiento -->
Name matching also goes wrong at times. The row of signatories with no record in their legislature makes this visible.

<!-- afinidades.limites.roles -->
The application's roles are assigned by percentiles within each legislature. That they fall from one legislature to the next is not a finding; that the isolated grow in number is.

<!-- afinidades.limites.ideologia -->
Each deputy's ideology is the one in their record, one per legislature. The blocs on this page are our own grouping.

<!-- afinidades.limites.metodologia -->
Each metric, with its formula, is in the deposit's methodology (`METHODOLOGY.md`).

## 8. The data

<!-- afinidades.datos.antetitulo -->
Harvard Dataverse · doi:10.7910/DVN/CGOCUS · {{dv.cgocus.archivos}} files

<!-- afinidades.datos.titulo -->
The data

<!-- afinidades.datos.entrada -->
Afinidades Elegidas is downloaded from Harvard Dataverse, with the same form as Luz y Taquígrafos. There are {{dv.cgocus.archivos|letra}} files.

<!-- afinidades.datos.tabla.col.archivo -->
File

<!-- afinidades.datos.tabla.col.que -->
What it contains

<!-- afinidades.datos.tabla.col.peso -->
Size

<!-- afinidades.datos.tabla.readme -->
The deposit's README.

<!-- afinidades.datos.tabla.edgelist -->
The pair–measure relations, one per row, with the ideology of both signatories.

<!-- afinidades.datos.tabla.cosponsorship -->
The signatures: one row per deputy and measure, with the text of the measure.

<!-- afinidades.datos.tabla.metadata -->
The census: one record per deputy and legislature, with party, family, ideology and district.

<!-- afinidades.datos.tabla.metrics -->
The metrics for each deputy, by legislature and in total.

<!-- afinidades.datos.tabla.roles -->
The role of each deputy in each legislature.

<!-- afinidades.datos.tabla.methodology -->
The methodology, in Spanish and English.

<!-- afinidades.datos.tabla.codebook -->
The description of each field.

<!-- afinidades.datos.texto -->
The signatures file contains the text of each measure: it lets you read what was signed, not only who signed it.

<!-- afinidades.datos.trampa -->
When joining, note that `2REP_cosponsorship` calls the second legislature «1933-1935», and the other files call it «1933-1936».

<!-- ↺ comun.fija.formulario -->
Before you download, Harvard Dataverse will ask for your name, email address and institution.

<!-- afinidades.datos.descargar -->
[Download from Dataverse ↗]

<!-- afinidades.datos.unir -->
To join it with the rows of Luz y Taquígrafos, the key is the deputy and the legislature. Using the data explains how, with the error to avoid.

<!-- afinidades.datos.llamada -->
[Join with THQCMI]
