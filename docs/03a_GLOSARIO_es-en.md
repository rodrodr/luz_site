# Glosario vinculante ES → EN · Luz y Taquígrafos

> **Estado (23-09-2026).** Vinculante para `docs/copy_en/` (Puerta 3). Sale del español congelado
> (`src/i18n/es.json`, huella `ceb6286b…`), de `docs/copy_es/comun.md` (§ 2 frases fijas, § 3 rótulos, § 7 etapas,
> § 8 hemiciclo, § 9 glosario de interfaz) y del plan (§ Dos lenguas, § Frases fijas ↺, § Un rótulo por destino).
> Si el español cambia, se abre entrada en `CHANGELOG.md` y se revisa aquí la línea afectada.
>
> **Regla de oro.** Una redacción por término y por frase fija. Quien traduce no elige sinónimos: si un contexto no
> encaja con la equivalencia de aquí, se anota en `docs/peticiones/glosario.md` y se decide antes de escribir.

---

## 0. Variante y estilo del inglés

- **Inglés británico** (`en-GB`, el que ya usa `src/lib/formato.ts`): *-ise* (digitised, organised), *colour*,
  *centre*, *programme*, *catalogue*. Registro académico claro: frases cortas, voz activa, sin contracciones
  (*does not*, no *doesn't*), sin adjetivos de promoción.
- **Tratamiento.** «Usted» → *you*. Imperativos directos en instrucciones (*Copy the query*).
- **Comillas.** Texto inglés: simples ‘…’ y, dentro, dobles “…”. **Lo que es español literal conserva «…»** y va
  marcado como español (véase § 5): citas del Diario, cadenas de la interfaz del explorador, nombres de biblioteca y
  consultas.
- **Incisos.** Raya española → **guion medio con espacios** ( – ). Rangos de años con guion medio sin espacios
  (1931–1945), salvo los **valores de la columna `legislature`**, que se copian tal cual con guion (1933-1935).
- **Cifras.** Las pone `{{marcador|formato}}` con `en-GB`: coma de millares (107,551), punto decimal, `%` sin espacio.
  No se teclea ninguna cifra del corpus. Fechas en prosa: *1 October 1931* (día, mes, año; sin coma ni ordinal). Los
  asientos compactos (8-VI-1934 · V2 71330 · v3 80306) se copian tal cual. Ids, años y números de sesión sin separador.
- ***data*** es plural: *the data are*. ***metadata***, singular de masa: *project metadata is not deposited*.
- **Mayúsculas.** Títulos y encabezados en *sentence case* (solo la primera palabra y los nombres propios).

---

## 1. Términos del sitio (glosario de interfaz, `comun.glosario.*`)

| español | inglés (única redacción) | nota |
|---|---|---|
| Diario de Sesiones | *Diario de Sesiones* | Se conserva, en cursiva en la prosa; primera mención de cada página con glosa: *the Diario de Sesiones, the official printed record of the Cortes' proceedings*. Forma corta: *the Diario*. En redonda en navegación, botones y `<title>`. Plural: *Diarios de Sesiones*. |
| el Diario (manda sobre la base) | *the Diario prevails* | Véase ↺ 1. |
| fila | **row** | Nunca *record*, *entry* ni *line*. «Una fila» = *a row*; «fila 71330» = *row 71330*. |
| intervención (solo del explorador) | **intervention** | Solo al hablar del explorador, con su base; primera mención: *intervention (the explorer's term, *intervención*)*. |
| sesión | **session** | Una reunión del pleno con fecha y número. No *sitting*: la numeración del Diario y las columnas de la base dicen *session*. |
| etapa | **stage** | Los cinco tramos del sitio (§ 3). |
| legislatura | **legislature** | El valor de la columna `legislature` (1931-1933, 1933-1935, 1936-1939). Nunca *term*, que en inglés también es el mandato de un Gobierno o de una persona. |
| Presidencia (quien modera) | **the Chair** | *whoever is in the Chair*; *the Chair's rows*. El cargo con nombre propio: *President of the Cortes*; *Vice-President*. |
| Presidente titular | **President of the Cortes** | En F16, frente al vicepresidente que preside de hecho. |
| edición depositada | **deposited edition** | La V2. *the deposited edition (V2)*. |
| edición del explorador | **explorer edition** | La v3. *the explorer edition (v3, not deposited)*. |
| sin depositar | **not deposited** | Nunca *unpublished*: la v3 está publicada en el explorador. |
| metadatos del proyecto | **project metadata** | |
| acotación | **bracketed note** | Lo que el Diario anota entre paréntesis: «(Rumores.)». No *stage direction* (choca con *stage* = etapa). Primera mención: *bracketed note (*acotación*)*. |
| puerta de lectura | **reading gateway** | Forma corta: *gateway*. Vecinas: *Previous gateway* · *Next gateway*. |
| debate preparado | **ready-made debate** | Una biblioteca del explorador. |
| biblioteca (del explorador) | **library** | Su nombre se queda en español (§ 5). |
| palabras (`nwords`) | **words** | *the word count in the `nwords` column*. |
| diputados que intervienen | **deputies who speak** | Los `rep_id` distintos con al menos una fila; incluyen a quien preside. |
| tomar la palabra | **take the floor** | F05: *Who took the floor*. |
| base (los datos en conjunto) | **dataset** | *the dataset*; nunca *database* salvo al hablar de software. |
| Base (rótulo del sello, del LÉAME y de las figuras) | **Source** | El sello de base: *source badge* (solo en notas). |
| cifra | **number** | **Nunca *figure***, que es la gráfica. «Esta cifra sale de…» → *This number comes from…* |
| figura | **figure** | F01, F21…: *Figure F21* en la prosa; los números F no cambian. |
| marca (de una figura) | **mark** | |
| huella | **checksum** | *SHA-256 checksum*. |
| reconocimiento óptico | **optical character recognition** | Escrito entero en las frases fijas; *OCR* solo en Método y Datos, tras la primera mención. |
| etiquetado | **tagging** | *the tagging recognises the printed speaker heading*. |
| fórmula impresa de un orador («El Sr. …:») | **printed speaker heading** | |
| orador | **speaker** | |
| grafía | **spelling** | *normalised spelling* para los nombres del sitio. |
| turno | **turn** | |
| trámite / discurso | **procedural turn** / **speech** | F10/F11: *Procedure versus speech*. |
| consulta | **query** | |
| buscador (del explorador) | **search box** | |
| LÉAME | **README** | El de las figuras es bilingüe. Rótulos: *What it measures* · *Denominator* · *Caveat* · *Source* · *How to cite*. |
| Antes de leerla (salvedad de figura) | **Before you read it** | |
| exportadas el {{fecha}} | **exported on {{fecha}}** | |

---

## 2. Instituciones, política y procedimiento

| español | inglés | nota |
|---|---|---|
| las Cortes | **the Cortes** | Se conserva; concuerda en plural: *the Cortes were*. |
| Cortes Constituyentes | **Constituent Cortes** | |
| Congreso de los Diputados | **Congress of Deputies** | |
| la Cámara | **the Chamber** | |
| pleno | **plenary** | |
| diputado, diputada | **deputy** | |
| hemiciclo | **hemicycle** | |
| minoría (parlamentaria) | **parliamentary minority** | Primera mención de la página; después *minority*: *the Socialist parliamentary minority* → *the Socialist minority*. |
| banco azul | **government bench** | En el hemiciclo: *Government bench (banco azul)*. |
| Gobierno | **Government** | Con mayúscula si es un gabinete concreto. Los rótulos de gabinete de los datos (*Negrín I*) se copian tal cual. |
| Presidente de la República | **President of the Republic** | |
| II República | **the Second Republic** | |
| la guerra | **the Civil War** | *the war* tras la primera mención. |
| Diputación Permanente | **Standing Committee (Diputación Permanente)** | |
| Comisión / dictamen | **committee** / **committee report** | |
| enmienda / voto particular | **amendment** / **minority report** | |
| proposición | **motion** | |
| interpelación | **interpellation** | |
| ruegos y preguntas | **requests and questions** | |
| orden del día | **order of the day** | |
| votación nominal | **roll-call vote** | |
| votación ordinaria | **ordinary vote** | Primera mención con glosa: *ordinary vote (by standing and sitting)*. |
| actas (de diputado, 1936) | **credentials** | *the review of credentials (actas)*. |
| acta (de la sesión) | **minutes** | ↺ 8: *digitised minutes*. |
| destitución (de Alcalá-Zamora) | **removal from office** | |
| las izquierdas / las derechas | **the left** / **the right** | F21: *The left* · *The right*. |
| Centro (bloque) | **Centre** | |

**Nombres propios de partidos y minorías.** Se conservan los nombres propios (CEDA, Lliga Regionalista, Esquerra,
Izquierda Republicana, Unión Republicana, Bloque Nacional, PNV, PSOE); se traducen los descriptivos. Hemiciclo
(`comun.hemiciclo.g.*`):

Tradicionalistas → *Traditionalists* · Bloque Nacional → *Bloque Nacional* · CEDA → *CEDA* · Agrarios → *Agrarians* ·
Independientes de derecha → *Right-wing independents* · Lliga Regionalista → *Lliga Regionalista* · Centro → *Centre* ·
Independientes y conservadores → *Independents and Conservatives* · Progresistas → *Progressives* · Radicales →
*Radicals* · Nacionalistas vascos → *Basque Nationalists* · Esquerra y otros partidos catalanes → *Esquerra and other
Catalan parties* · Socialistas → *Socialists* · Comunistas → *Communists* · Republicanos independientes → *Independent
Republicans* · Unión Republicana → *Unión Republicana* · Izquierda Republicana → *Izquierda Republicana* · Banco azul
(Gobierno) → *Government bench (banco azul)*. Bloques: Todos → *All* · Derechas → *Right* · Centro → *Centre* ·
Izquierdas → *Left* · Gobierno → *Government*.

**Nombres de proyectos y lugares.** *Luz y Taquígrafos* se conserva; una glosa en Inicio: *literally ‘light and
shorthand writers’, the Spanish phrase for proceedings held in full public view*. *Afinidades Elegidas* se conserva
(glosa en su página: *Elective Affinities*). *ParlaIbero*, *Harvard Dataverse*, THQCMI, CGOCUS, DOI: tal cual.
Universidad de Salamanca → *University of Salamanca*. Figueres, Casas Viejas: tal cual. México → *Mexico*. Títulos de
obras, en su lengua y cursiva (*No fue posible la paz*), sin traducir el título.

---

## 3. Navegación, páginas y secciones

| español | inglés |
|---|---|
| Luz y Taquígrafos: ir a Inicio | Luz y Taquígrafos: go to Home |
| Los Diarios de Sesiones del Congreso, 1931–1945 (descriptor) | The Diarios de Sesiones of the Congress of Deputies, 1931–1945 |
| Saltar al contenido | Skip to content |
| Navegación principal · La historia · La base | Main navigation · The story · The dataset |
| Inicio | Home |
| Las Cortes · El Diario · Método · Datos · Explorador · Afinidades | The Cortes · The Diario · Method · Data · Explorer · Afinidades |
| Etapas · Sesiones y votaciones | Stages · Sessions and votes |
| Usar los datos · Versiones | Using the data · Versions |
| Lengua · Español · English | Language · Español · English |
| Tema oscuro · Tema claro | Dark theme · Light theme |
| Las Cortes, 1931–1945 | The Cortes, 1931–1945 |
| El Diario de Sesiones | The Diario de Sesiones |
| El explorador | The explorer |
| En esta página · Volver al índice | On this page · Back to contents |
| Para seguir | Where next |
| Etapa anterior · Etapa siguiente | Previous stage · Next stage |
| Hoy puede | Today you can |
| Cifras | In numbers |
| Lo que pasó en la Cámara | What happened in the Chamber |
| Cuándo se reunió | When it met |
| Quién tomó la palabra | Who took the floor |
| Puertas de esta etapa | Reading gateways for this stage |
| Debates preparados en el explorador | Ready-made debates in the explorer |
| Antes de usarla | Before you use it |
| Para leer más | Further reading |
| Cómo citar | How to cite |
| Lo que no está aquí | What is not here |
| Pruébelo | Try it |
| Esta página no está. | This page does not exist. |

**Las cinco etapas** (`comun.etapa.*`; el H1 de cada ficha coincide con el nombre):

| id | nombre | corto |
|---|---|---|
| I | The Constituent Cortes | Constituent |
| II | The legislature elected in 1933 | 1933-1935 |
| III | The Cortes of 1936, until the war | Cortes of 1936 |
| IV | The Cortes at war | War |
| V | The Cortes in Mexico | Mexico |

**Puertas de lectura** (títulos): El voto de las mujeres → *Votes for women* · «España ha dejado de ser católica» → se
conserva en español en el H1 y en `<title>`; la traducción va en la entradilla, marcada (§ 5) · El discurso de Azaña, a
nombre de otro → *Azaña's speech, under another speaker's name* · Casas Viejas → *Casas Viejas* · La pistola de Prieto
→ *Prieto's pistol* · La antesala → *The prelude* · Figueres → *Figueres* · México → *Mexico*. Fechas: *· 1 October
1931*.

---

## 4. Rótulos: un rótulo por destino (`comun.boton.*` y rótulos de página)

Verbo en imperativo + objeto; pestañas con sustantivo. «Ver …» → **See …** (dice qué se verá). ↗ se conserva.

| clave | inglés |
|---|---|
| `comun.boton.descargar` | [Download the data] |
| `comun.boton.dataverse` | [Download from Dataverse ↗] |
| `comun.boton.explorador` | [Open the explorer ↗] |
| `comun.boton.consulta` | [Copy the query] |
| `comun.boton.afinidades` | [Open Afinidades ↗] |
| `comun.boton.datos_figura` | [Download the figure data] |
| `comun.boton.imagen` | [Download the image] |
| `comun.boton.cita` · `datos.citar.copiar` | [Copy the citation] |
| `comun.boton.ver_cortes` · `comun.vecinas.cortes` | [See the Cortes, stage by stage] |
| `comun.boton.ver_sesiones` · `comun.vecinas.sesiones` | [See the sessions and votes] |
| `comun.boton.ver_votaciones` | [See the votes] |
| `comun.boton.ver_diario` | [See what the Diario records] |
| `comun.boton.ver_metodo` | [See how it was made] |
| `comun.boton.ver_columnas` · `fig.F20.enlace` | [See what each column holds] |
| `comun.boton.ver_versiones` | [See why there are two editions] |
| `comun.boton.ver_explorador` | [See what the explorer does] |
| `comun.boton.ver_afinidades` | [See Afinidades Elegidas] |
| `comun.boton.unir` · `afinidades.datos.llamada` | [Join with THQCMI] |
| `comun.boton.ir_inicio` | [Go to Home] |
| `comun.boton.errata` | [Report an error] |
| `comun.boton.escribirnos` | [Contact us] |
| `comun.boton.cargar` | [Load the figure] |
| `versiones.citar.enlace` | [See how to cite] |
| `explorador.llevar.enlace` | [See how to cite each edition] |
| `metodo.10.enlace` y pie | [Where each number comes from] |
| `metodo.04.enlace` | [See who speaks most, by edition] |
| `metodo.06.enlace` | [See where each V2 row goes] |
| `metodo.07.enlace` | [See the corrected dates] |
| `versiones.depositadas.metodo` | [See how the dates were audited] |
| `explorador.no_hace.enlace` | [See how words are counted] |
| `datos.empezar.s1.accion` | [See the data for each figure] |
| `fig.F01e.ver_todo` | [See the full calendar] |
| `fig.F17.ficha.copiar` | [Copy the debate name] |
| [Copiar el nombre de la biblioteca] · [Copiar el código] · [Copiar] | [Copy the library name] · [Copy the code] · [Copy] |
| [Descargar la salida de los dos fragmentos] | [Download the output of both snippets] |
| [Ver las sesiones] | [See the sessions] |
| Pie: [Cómo citar] [De dónde sale cada cifra] [Avisar de una errata] [Escribirnos] [ParlaIbero] | [How to cite] [Where each number comes from] [Report an error] [Contact us] [ParlaIbero] |
| Pestañas: [Gráfico] [Tabla] [Datos] | [Chart] [Table] [Data] |
| Cita: Texto · BibTeX · RIS | Text · BibTeX · RIS |

---

## 5. Citas del Diario y otros textos en español

- **Las citas del Diario NO se traducen en el texto.** Van en español, letra a letra como en `es.json` (el sitio las
  asierta contra `citas.json`: una letra distinta rompe la compilación), con `lang="es"`.
- **La traducción va al pie**, en una clave hermana `<clave de la cita>.trad` (solo en inglés), en comillas simples y
  terminada en ** (our translation)**: *‘I feel myself a citizen before I am a woman…’ (our translation)*. Se traduce
  con fidelidad y sin modernizar; los puntos suspensivos y los cortes, como en el original. El mecanismo está pedido en
  `docs/peticiones/glosario.md`: hasta que exista, no se escribe ninguna clave `.trad`.
- En títulos (H1, `<title>`) que son una cita, la cita se queda en español y la traducción va en la entradilla, con la
  misma marca.
- **Cadenas del explorador** (la herramienta está solo en español; la página Explorador lo dice: *The explorer is in
  Spanish only.*): botones, diálogos, nombres de biblioteca («Sufragio femenino», «Sesiones más crispadas») y consultas
  se citan en español entre «», con una glosa inglesa entre paréntesis la primera vez si hace falta:
  «Sufragio femenino» (women's suffrage).
- La nota del grito sin tilde (decisión 4): *Without the accent, as in the row: this is how optical character
  recognition read it.*

---

## 6. Frases fijas ↺ (una redacción en inglés cada una)

Se escriben una vez en `docs/copy_en/comun.md` y se repiten con `<!-- ↺ clave -->`, idénticas letra a letra.

| clave | inglés |
|---|---|
| `comun.fija.diario` (↺ 1) | A derived edition for research: wherever it differs, the *Diario de Sesiones* prevails. |
| `comun.sello.V2` (↺ 2) | Deposited edition (V2) |
| `comun.sello.v3` (↺ 2) | Explorer edition (v3, not deposited) |
| `comun.sello.proyecto` (↺ 2) | Project metadata (not deposited; not shown in the explorer) |
| `comun.sello.afin` (↺ 2) | Afinidades Elegidas (CGOCUS V1.1, deposited) |
| `comun.fija.formulario` (↺ 3) | Before you download, Harvard Dataverse will ask for your name, email address and institution. |
| `comun.fija.formulario.motivo` (D-20) | We use these details to learn who uses the dataset and for what, so that we can improve it and announce updates. |
| `comun.fija.ids` (↺ 4) | Row identifiers differ between the deposited edition (V2) and the explorer edition (v3); the session – date and number – is the same in both. |
| `comun.fija.enlace` (↺ 5, apagado) | The explorer cannot open a search from a link: copy the query and paste it into its search box (/ key). |
| ↺ 5, encendido (por aprobar) | This button opens the explorer with the search already typed in. |
| `comun.fija.contar` (↺ 6) | Counting a word does not tell you who defends it or in what tone. |
| `comun.fija.ocr` (↺ 7) | The text comes from optical character recognition and has not been corrected by hand. |
| `comun.fija.sesion48` (↺ 8) | Session 48 as it stands in the corpus: the end of the digitised minutes was lost in optical character recognition. |
| `comun.fija.novalida` (↺ 9) | Their presence here does not validate their content. |
| `comun.fija.legislatura` (↺ 10) | The census and the relations of Afinidades Elegidas call 1933-1936 the legislature that this dataset calls 1933-1935; the Diario's sessions end on 10 December 1935. |
| `comun.fija.readme` (↺ 11) | The deposited README describes the first version; the differences are set out here. |
| `comun.fija.sin_formulario` (↺ 12) | No form: these are aggregate data. |
| `comun.fija.notabases` (↺ 13) | This number comes from the explorer edition (v3, {{filas.v3}} rows, not deposited); the deposited edition is V2 ({{filas.V2}} rows). Why there are two → |
| `comun.fija.notabases.ids` | The v3 numbers in these quotations are rows of the explorer edition (v3, {{filas.v3}} rows, not deposited); the V2 numbers are rows of the deposited edition ({{filas.V2}} rows). Why there are two → |
| `comun.fija.tono` | Shading shows how many words were printed, not how much they mattered. |
| `comun.fija.explorador` | It serves the v3 edition, not deposited; it needs a computer. |
| `comun.fija.local` | It opens in your browser; what you search for and save stays on your device. |
| `comun.enlace.otra_pestana` | Links marked ↗ open in a new tab. |
| Remate de Inicio (D-24) | The data are published. Ask your questions. |

En ↺ 11, *here* es el enlace a Versiones; en ↺ 13, *Why there are two →*. Los marcadores `{{…}}` se copian sin tocar.

---

## 7. Vetos también en inglés (`scripts/vetos.mjs`)

Fuera de `explorador.no_hace.*` y `*.limites.*`: *semantic search*, *by meaning*, *semantically*, *wildcard*,
*proximity*, *NOT* como operador, *this link opens*, *works offline*. Del prototipo: *codebook*, *annotated graph*,
*irony*, *hostility*, *intensity*, *reaction index*, *affective act*, y *defends/criticises/mentions* como categorías.
Cifras superadas: *34 million*, *24 million* (explorador), *107,000*, *774 deputies*, *1,446 deputies* y las demás del
plan. Tono: *innovative*, *revolutionary*, *coming soon*, *unique*, *groundbreaking*, *cutting-edge*.
