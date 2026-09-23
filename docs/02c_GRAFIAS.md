# Tabla de grafías · D-22

**Dueño:** grupo de grafías. **Fecha:** 2026-09-22. **Estado:** adoptada (D-22, decisión del director, 23-09-2026).

> **D-22 (23-09-2026).** Se adoptan las grafías confirmadas y probables tal cual. Las 11 «por revisar» usan la forma
> que imprime el Diario, con sus tildes: en siete, la propuesta de abajo ya es esa forma; en cuatro, el exportador pone
> la del Diario (`exportador/modulos/base.py › GRAFIA_DEL_DIARIO`, comprobada contra el texto de la V2 en cada
> exportación): Campaláns (174), Nicoláu d'Olwer (654), Pildain Zapiain (735) y Roma y Rubies (814). La propuesta
> se guarda en `grafias.json › propuesta`. La lista de la § 1 queda para una revisión posterior, sin bloquear.
La tabla vive en `exportador/grafias.csv`; `exportador/modulos/base.py` la convierte en `src/data/grafias.json`.
La regenera `docs/grafias/construir_grafias.py`, con las fuentes descargadas en `docs/grafias/fuentes/`.

## En una frase

La base escribe los nombres sin tildes y con alguna errata; esta tabla da la grafía de los 773 diputados que hablan en la V2.
De esas grafías, 265 están confirmadas, 497 son probables y 11 quedan por revisar.
El núcleo que pedía el encargo son 224 nombres: 139 grafías confirmadas, 77 probables y 8 por revisar.

## Lo que le pedimos revisar

### 1. Los 11 nombres por revisar

| rep_id | la base | grafía propuesta | por qué hay duda |
|---|---|---|---|
| 65 | Mariano Anso Zunzarren | **Mariano Ansó Zunzarren** | El Diario imprime «Ansó» en el 90 % del texto y el 62 % de las etiquetas; la RAH titula «Anso y Zunzarren», sin tilde. |
| 135 | Crescenciano Bilbao Castellano | **Crescenciano Bilbao Castellanos** | El Congreso y la base escriben CASTELLANO; el Diario imprime «Castellanos» en todas sus etiquetas y en 138 de 152 casos del texto. Sin biografía en la RAH. |
| 143 | Sigfrido Blasco Blasco | **Sigfrido Blasco-Ibáñez Blasco** | El Congreso y la base escriben BLASCO BLASCO; el Diario lo nombra «Sigfrido Blasco-Ibáñez» o «Sigfrido Blasco Ibáñez» 19 veces (6 con «Blasco» detrás) y «Sigfrido Blasco Blasco» 7. La fila V2 97389 (28-X-1935, «El Sr. BLASCO-IBANEZ:») no tiene rep_id y es, probablemente, suya. |
| 174 | Rafael Campalans Puig | **Rafael Campalans Puig** | El Diario castellaniza «Campaláns» (422 frente a 18); la RAH y la forma catalana, «Campalans». Se propone la de la RAH. |
| 236 | Jesus Comin Sagues | **Jesús Comín Sagües** | El Diario imprime «Sagües» (14), «Sagués» (4) y «Sagues» (3): la sílaba tónica no queda clara. Sin biografía en la RAH. |
| 654 | Luis Nicolau D'olwer | **Luis Nicolau d'Olwer** | El Diario imprime «Nicoláu» (441) y «Nicolau» (88); la forma catalana no lleva tilde. Sin biografía en la RAH con este nombre. |
| 735 | Antonio Pildain Zapiain | **Antonio Pildáin Zapiáin** | La RAH titula «Pildáin Zapiáin»; el Diario imprime casi siempre «Pildain» (562 frente a 19) y nunca «Zapiáin». Se propone la forma de la RAH. |
| 814 | Antonio Roma Y Rubies | **Antonio Romá y Rubíes** | El Diario imprime sobre todo «Roma y Rubies», pero también «Rubíes» (134 de 830) y «Romá» (19); la RAH titula «Romá Rubies». |
| 836 | Amos Ruiz Lecina | **Amós Ruiz Lecina** | El rep_id 836 es Amós Ruiz Lecina, pero 92 de sus 184 filas llevan rep_name «Mariano Ruiz Funes Garcia» y son de Ruiz-Funes (rep_id 835): errata de la base pendiente del autor (D-25). Una figura que agrupe por rep_id debe separarlas por rep_name y dar a esas filas la grafía de 835. |
| 908 | Ramon Serrano Suñer | **Ramón Serrano Suñer** | El Diario imprime «Suñer» en 1.205 de 1.211 casos; la RAH titula «Súñer». |
| 956 | Jose Antonio Trabal Y Saus | **José Antonio Trabal y Sans** | El Congreso y la base escriben SAUS; el Diario imprime «Trabal Sans» 9 veces y «Trabal y Sans» 1, y nunca «Saus». Sin biografía en la RAH. |

### 2. Cuatro criterios, con la opción que aplicamos primero

1. **Composición del nombre.** (a) La del Congreso, que es la de la base: «Clara Campoamor y Rodríguez», «Manuel Irujo Ollo».
   (b) La de uso actual, sin «y» entre apellidos y con el «de» que imprimen el Diario y la RAH: «Clara Campoamor Rodríguez», «Manuel de Irujo Ollo».
   Con (a), la columna `uso` ya da la forma de la primera mención en el copy («Clara Campoamor»).
   Pasar a (b) es una regla para la «y» y una lista para el «de».
   El Diario pone y quita ese «de» (Aguirre, Irujo, Leizaola, Madariaga, Zulueta, Jáuregui).
2. **Diputados catalanes, vascos y gallegos.** (a) El nombre de pila en la forma del Diario y del Congreso: «Luis Companys Jover», «Juan Ventosa Calvell».
   (b) La forma de la lengua propia, que usa la RAH: «Lluís Companys i Jover». Con (a), los apellidos llevan las tildes de su lengua (Cambó, Lluhí, Santaló) y la grave pasa a aguda, como la imprime el Diario («Juliá», «Vallescá»).
3. **Tildes que el Diario añade a apellidos catalanes.** (a) No se adoptan: «Campalans», «Nicolau», «Palau», «Xirau», «Romeu», aunque el Diario imprima a menudo «Campaláns» o «Xiráu».
   (b) Se adoptan, como imprime el Diario. Solo afecta a los casos anotados.
4. **Guiones.** (a) Los que imprime el Diario en la mayoría de los casos: «Alcalá-Zamora», «Ruiz-Funes», «Sánchez-Covisa», «Fernández-Osorio Tafall».
   (b) Los de la RAH: «Gil-Robles», «Sánchez-Albornoz», «Álvarez-Valdés», «Fernández Osorio Tafall». La tabla anota la variante en la fuente cuando la RAH difiere.

### 3. Los 6 nombres cuyas letras cambian respecto de la base

No son tildes: son otra letra, otro apellido o un guion que une dos palabras.

| rep_id | la base | grafía | estado |
|---|---|---|---|
| 135 | Crescenciano Bilbao Castellano | **Crescenciano Bilbao Castellanos** | por revisar |
| 143 | Sigfrido Blasco Blasco | **Sigfrido Blasco-Ibáñez Blasco** | por revisar |
| 454 | Luis Jimenez Canga Arguelles | **Luis Giménez Canga-Argüelles** | confirmada |
| 456 | Manuel Jimenez Fernandez | **Manuel Giménez Fernández** | confirmada |
| 676 | Angel Osorio Gallardo | **Ángel Ossorio Gallardo** | confirmada |
| 956 | Jose Antonio Trabal Y Saus | **José Antonio Trabal y Sans** | por revisar |

### 4. Erratas de la base que ha encontrado la tabla (para el autor)

- **rep_id 836** (D-25). Es Amós Ruiz Lecina, pero 92 de sus 184 filas V2 llevan `rep_name` «Mariano Ruiz Funes Garcia».
  Esas filas son de Ruiz-Funes (rep_id 835). La tabla da a 836 la grafía de Ruiz Lecina; quien agrupe por `rep_id` debe separarlas por `rep_name`.
- **rep_id 956.** El Congreso y la base escriben «Trabal y Saus»; el Diario, «Trabal Sans» o «Trabal y Sans», nunca «Saus».
- **rep_id 135.** El Congreso y la base escriben «Bilbao Castellano»; el Diario imprime «Castellanos» en todas sus etiquetas.
- **V2 97389** (28-X-1935). «El Sr. BLASCO-IBANEZ:» no tiene `rep_id`; es, probablemente, Sigfrido Blasco-Ibáñez (rep_id 143), que en la base solo tiene 3 filas de 1931-1933.

## Cómo se lee la tabla

`exportador/grafias.csv`, separado por punto y coma, en UTF-8, una fila por `rep_id` (lo exige `base.py`).

| columna | qué es |
|---|---|
| `rep_id` | El id del diputado en la V2 y en la v3 (el mismo en las dos). |
| `rep_name_base` | El `rep_name` de la base, tal cual. Los CSV del sitio lo conservan (D-22 a). |
| `grafia` | El nombre completo, con tildes, para el texto y los rótulos visibles. |
| `fuente` | De dónde sale: una fila del Diario con su etiqueta, las tildes que respalda, la ficha del Congreso y la biografía de la RAH. |
| `estado` | `confirmada`, `probable` o `por revisar` (abajo). |
| `corto` | Cómo lo rotula el Diario («Giménez Fernández», «Azaña», «Trifón Gómez»): para barras y notas emergentes. |
| `uso` | Nombre de pila más `corto` («Manuel Azaña», «Clara Campoamor»): para la primera mención en el copy. |

`corto` y `uso` son dos columnas más que las del contrato. `base.py` las pasa a `grafias.json` sin cambios.

**Los estados.**
- **confirmada:** la RAH tiene su biografía y sus letras y tildes coinciden con las del Diario; o el caso se ha decidido con las tres fuentes a la vista (anotado).
  La composición sigue siendo la del Congreso (criterio 1), aunque la RAH añada o quite un «y» o un «de».
- **probable:** sin biografía en la RAH; letras del Congreso y tildes del Diario (o de la ortografía en las mayúsculas).
- **por revisar:** las fuentes discrepan o la base tiene una errata. La propuesta dice cuál elegimos y por qué.

**Las citas no se tocan.** Una cita del Diario conserva la grafía impresa: la fila V2 71330 atribuye «Luz y taquigrafos.» a «JIMÉNEZ FERNÁNDEZ», y así se cita.
Fuera de la cita, el sitio escribe «Giménez Fernández» (rep_id 456), la grafía confirmada.

## Cómo se ha hecho

**Fuentes.**
- **El Diario**: las etiquetas de orador de la V2 depositada (MD5 `360332a0ff1327671530f15eed46ac0c`) y su texto corrido, más las filas de sumario y comentario de la v3 (sha256 `3a0d8b2d…`).
  Se cuentan todas las formas impresas de cada apellido, con y sin tilde.
- **El Congreso de los Diputados**, Histórico de diputados 1810-1977 (congreso.es/es/historico-diputados): las 1.449 fichas de las elecciones de 1931, 1933 y 1936, descargadas el 22-09-2026.
  Da la composición del nombre. Escribe en mayúsculas sin tildes, así que no decide ninguna tilde.
- **La Real Academia de la Historia**, Diccionario Biográfico electrónico (historia-hispanica.rah.es, antes dbe.rah.es), consultado el 22-09-2026.
  Tiene biografía de 270 de los 773. Se acepta solo si casan el primer nombre, los apellidos en orden y el año de nacimiento; se descartaron a mano cuatro homónimos.

**Reglas.**
1. Composición: la de la ficha del Congreso. Partículas en minúscula («y», «e», «de», «del», «la», «da»).
2. Letras: las del Congreso, salvo que el Diario imprima otra cosa de forma abrumadora y la RAH o el texto lo confirmen. Cada caso va en la sección 3.
3. Tildes: la que el Diario imprime al menos en el 20 % de las apariciones del apellido en minúscula, o en el 5 % de sus etiquetas.
   La tilde tiene que ser posible en español: una tilde de ruido del reconocimiento óptico («Ortíz», «Siérra») no cuenta.
   La tipografía del Diario suprimía a menudo las tildes, así que su ausencia no prueba nada; su presencia, sí.
4. Si la RAH pone una tilde que el Diario también imprime, se adopta («Ibárruri»). Si discrepan de verdad, el nombre queda por revisar.
5. Mayúsculas: llevan la tilde de la ortografía actual («Álvarez», «Ángel», «Álvaro»), que el Diario no imprimía.
6. Nombres de pila: en la forma del Congreso y del Diario, con la tilde de la ortografía actual.
7. Guiones: los del Diario, si aparecen en la mayoría de sus etiquetas o de su texto.

**Alcance.** El encargo pedía el núcleo: los 150 primeros en palabras sin Presidencia (V2 y v3), la Presidencia y la Mesa, el Gobierno, y los nombres de la narrativa y de las peticiones.
La tabla cubre los 773 de la V2 porque F30 (turno a turno), F05 y F07 pueden rotular a cualquiera.
Además, `valida_grafias` (en `exportar.py`) falla ante cualquier `rep_id` de `src/data/` sin entrada.
No incluye a quien no habla en la V2 (las personas de CGOCUS sin filas): `base.py` rechaza un `rep_id` que no esté en la V2 (D-22 b).

## Respuesta a las peticiones (`peticiones/grafias_*.md`)

Todos los `rep_id` pedidos están en la tabla. Las formas de las peticiones son, casi siempre, la columna `uso` o la `corto`.
Las diferencias:
- **Composición (criterio 1).** `grafias_explorador.md` pide «Clara Campoamor Rodríguez», «Joaquín Chapaprieta Torregrosa» y «Manuel de Irujo Ollo».
  La tabla da «Clara Campoamor y Rodríguez», «Joaquín Chapaprieta y Torregrosa» (el Diario imprime las dos formas, 12 y 12) y «Manuel Irujo Ollo».
  El Diario imprime más «Manuel de Irujo» (194 frente a 134). Si usted elige (b) en el criterio 1, las tres cambian.
  `grafias_cortes_b.md` escribe «Fernández-Osorio y Tafall», como el acta; la tabla, «Bibiano Fernández-Osorio Tafall» (Congreso), con `corto` «Fernández-Osorio».
- **Guion.** 50 va sin guion, «Melquíades Álvarez González Posada»: el Diario nunca lo pone («González Posada», 4) y la RAH tampoco.
- **«José Tomás y Piera»** (944), con «y», como piden `grafias_cortes_a.md` y `grafias_sesiones.md`: es la excepción al criterio 1, anotada en la tabla.
- **Diputados catalanes.** Forma castellana del Diario («Juan Estelrich Artigues», «José Antonio Trabal y Sans»), como proponen `grafias_explorador.md` y `grafias_cortes_b.md` (criterio 2).
- **Trabal** (956): la base dice «Saus»; la tabla corrige a «Sans», que es también lo que usa `grafias_cortes_b.md`. Queda por revisar.
- **Dionisio Cano López** es el `rep_id` 184 (Congreso «CANO LOPEZ, DIONISIO»), como ya dice `grafias_sesiones.md`.
- **Ibárruri** (441) y **Giménez Fernández** (456): las dos peticiones que las proponen coinciden con la tabla, que las da por confirmadas.

Una vinculación dudosa que señala `grafias_cortes_a.md` y que la tabla no resuelve: V2 74696 («El Sr. VENTOSA», 9-X-1934) va a 994 (Ventosa Roig) y, por el contexto, parece de 993 (Ventosa Calvell). Es para el autor (D-25).

## Nombres sin `rep_id`

Ministros sin escaño que hablan en el Diario (sus filas V2 no tienen `rep_id`) y nombres citados que no son diputados de estas Cortes. No van en el CSV, porque `base.py` exige un `rep_id` de la V2.

| grafía | corto | quién es | RAH |
|---|---|---|---|
| **Agustín Viñuales Pardo** | Viñuales | «Ministro de HACIENDA (Viñuales)»: 13 etiquetas, del 16-VI al 6-IX-1933 | 46117 |
| **Joaquín Dualde Gómez** | Dualde | «Ministro de INSTRUCCIÓN PÚBLICA (Dualde)»: 16 etiquetas, del 26-III al 28-VI-1935 | 13821 |
| **José Oriol Anguera de Sojo** | Anguera de Sojo | «Ministro de TRABAJO (Anguera de Sojo)»: 12 etiquetas, del 14-XI-1934 al 27-III-1935; la RAH titula «Josep Oriol Anguera de Sojo» | 3588 |
| **César Jalón Aragón** | Jalón | «Ministro de COMUNICACIONES (Jalón)»: 7 etiquetas, en noviembre y diciembre de 1934 | 23558 |
| **Carlos Masquelet Lacaci** | Masquelet | «Ministro de la GUERRA (Masquelet)»: 2 etiquetas, en abril y mayo de 1936 | 29131 |
| **Juan Moles Ormella** | Moles | «Ministro de la GOBERNACIÓN (Moles)»: 2 etiquetas, en junio de 1936 | 31444 |
| **Antonio Maura y Montaner** | Maura | no es diputado de estas Cortes: lo cita Royo Villanova («como decía Maura», V2 57506) | 29034 |

## El núcleo (224 nombres)

«Por qué está»: puesto en palabras sin Presidencia (V2 y v3), Presidencia o Mesa, Gobierno, narrativa o petición. Los demás, en el CSV.

| rep_id | la base | grafía | corto | uso | estado | por qué está | RAH |
|---|---|---|---|---|---|---|---|
| 1 | Gerardo Abad Conde | **Gerardo Abad Conde** | Abad Conde | Gerardo Abad Conde | confirmada | V2 n.º 48 · v3 n.º 52 · Gobierno | RAH 46 |
| 16 | Jose Antonio Aguirre Y Lecube | **José Antonio Aguirre y Lecube** | Aguirre | José Antonio Aguirre | confirmada | narrativa · petición | RAH 860 |
| 18 | Rafael Aizpun Santafe | **Rafael Aizpún Santafé** | Aizpún | Rafael Aizpún | confirmada | V2 n.º 68 · v3 n.º 69 · Gobierno | RAH 1744 |
| 20 | Santiago Alba Bonifaz | **Santiago Alba Bonifaz** | Alba | Santiago Alba | confirmada | V2 n.º 61 · v3 n.º 64 · Presidencia · narrativa · petición | RAH 1380 |
| 25 | Jose Maria Albiñana Sanz | **José María Albiñana Sanz** | Albiñana | José María Albiñana | confirmada | v3 n.º 149 | RAH 1549 |
| 26 | Alvaro De Albornoz Y Liminiana | **Álvaro de Albornoz y Liminiana** | Albornoz | Álvaro de Albornoz | confirmada | V2 n.º 50 · v3 n.º 50 · Gobierno · petición | RAH 1640 |
| 28 | Niceto Alcala Zamora Y Torres | **Niceto Alcalá-Zamora y Torres** | Alcalá-Zamora | Niceto Alcalá-Zamora | confirmada | V2 n.º 59 · v3 n.º 59 · Gobierno · narrativa · petición | RAH 1404 |
| 30 | Ramon Maria Aldasoro Y Galarza | **Ramón María Aldasoro y Galarza** | Aldasoro | Ramón María Aldasoro | probable | Secretaría | — |
| 32 | Edmundo Alfaro Gironda | **Edmundo Alfaro Gironda** | Alfaro | Edmundo Alfaro | probable | V2 n.º 78 · Secretaría | — |
| 33 | Jose Algora Gorbea | **José Algora Gorbea** | Algora | José Algora | probable | V2 n.º 95 · v3 n.º 94 | — |
| 39 | Tomas Alonso De Armiño Y Calleja | **Tomás Alonso de Armiño y Calleja** | Alonso de Armiño | Tomás Alonso de Armiño | confirmada | V2 n.º 139 · v3 n.º 136 | RAH 2701 |
| 43 | Elfidio Alonso Rodriguez | **Elfidio Alonso Rodríguez** | Alonso Rodríguez | Elfidio Alonso Rodríguez | probable | V2 n.º 121 · v3 n.º 122 | — |
| 47 | Tomas Alvarez Angulo | **Tomás Álvarez Angulo** | Álvarez Angulo | Tomás Álvarez Angulo | confirmada | V2 n.º 92 · v3 n.º 90 | RAH 2306 |
| 48 | Jose Alvarez Buylla Y Godino | **José Álvarez Buylla y Godino** | Álvarez Buylla | José Álvarez Buylla | probable | Gobierno | — |
| 50 | Melquiades Alvarez Gonzalez Posada | **Melquíades Álvarez González Posada** | Melquíades Álvarez | Melquíades Álvarez | confirmada | narrativa · petición | RAH 2133 |
| 52 | Jose Maria Alvarez Mendizabal Y Bonilla | **José María Álvarez Mendizábal y Bonilla** | Álvarez Mendizábal | José María Álvarez Mendizábal | confirmada | V2 n.º 26 · v3 n.º 27 | RAH 1869 |
| 54 | Antonio Alvarez Robles | **Antonio Álvarez Robles** | Álvarez Robles | Antonio Álvarez Robles | probable | V2 n.º 106 · v3 n.º 103 | — |
| 55 | Basilio Alvarez Rodriguez | **Basilio Álvarez Rodríguez** | Basilio Álvarez | Basilio Álvarez | confirmada | V2 n.º 77 · v3 n.º 84 | RAH 2142 |
| 57 | Ramon Alvarez Valdes Y Castañon | **Ramón Álvarez Valdés y Castañón** | Álvarez Valdés | Ramón Álvarez Valdés | confirmada | V2 n.º 80 · v3 n.º 81 · Gobierno | RAH 2236 |
| 59 | Andres Amado Y Reygondaud De Villebardet | **Andrés Amado y Reygondaud de Villebardet** | Amado | Andrés Amado | confirmada | V2 n.º 129 · v3 n.º 126 | RAH 2194 |
| 64 | Jose Andres Manso | **José Andrés Manso** | Andrés Manso | José Andrés Manso | confirmada | V2 n.º 94 · v3 n.º 93 | RAH 3582 |
| 65 | Mariano Anso Zunzarren | **Mariano Ansó Zunzarren** | Ansó | Mariano Ansó | por revisar | Secretaría | RAH 3506 |
| 77 | Pedro Armasa Briales | **Pedro Armasa Briales** | Armasa | Pedro Armasa | probable | V2 n.º 75 · v3 n.º 77 | — |
| 80 | Gregorio Arranz Olalla | **Gregorio Arranz Olalla** | Arranz | Gregorio Arranz | probable | V2 n.º 126 · v3 n.º 124 · Presidencia | — |
| 87 | Manuel Hilario Ayuso E Iglesias | **Manuel Hilario Ayuso e Iglesias** | Ayuso | Manuel Hilario Ayuso | confirmada | V2 n.º 85 · v3 n.º 95 | RAH 5355 |
| 89 | Manuel Azaña Diaz | **Manuel Azaña Díaz** | Azaña | Manuel Azaña | confirmada | V2 n.º 3 · v3 n.º 3 · Gobierno · narrativa · petición | RAH 5420 |
| 94 | Mateo Azpeitia Esteban | **Mateo Azpeitia Esteban** | Azpeitia | Mateo Azpeitia | probable | V2 n.º 69 · v3 n.º 67 | — |
| 96 | Carlos Badia Malagrida | **Carlos Badía Malagrida** | Badía | Carlos Badía | confirmada | V2 n.º 82 · v3 n.º 79 | RAH 5122 |
| 97 | Emilio Baeza Medina | **Emilio Baeza Medina** | Baeza Medina | Emilio Baeza Medina | probable | V2 n.º 72 · v3 n.º 71 · Presidencia | — |
| 98 | Jose Antonio Balbontin Y Gutierrez | **José Antonio Balbontín y Gutiérrez** | Balbontín | José Antonio Balbontín | confirmada | V2 n.º 5 · v3 n.º 5 · narrativa · petición | RAH 4793 |
| 103 | Augusto Barcia Y Trelles | **Augusto Barcia y Trelles** | Barcia | Augusto Barcia | confirmada | V2 n.º 8 · v3 n.º 8 · Gobierno · narrativa · petición | RAH 4631 |
| 104 | Luis Bardaji Lopez | **Luis Bardají López** | Bardají | Luis Bardají | confirmada | Gobierno | RAH 4654 |
| 107 | Francisco Barnes Salinas | **Francisco Barnés Salinas** | Barnés | Francisco Barnés | confirmada | Presidencia · Gobierno · narrativa · petición | RAH 4684 |
| 112 | Eduardo Barriobero Herran | **Eduardo Barriobero Herrán** | Barriobero | Eduardo Barriobero | confirmada | V2 n.º 39 · v3 n.º 41 | RAH 6342 |
| 121 | Manuel Becerra Fernandez | **Manuel Becerra Fernández** | Becerra | Manuel Becerra | confirmada | narrativa | RAH 5897 |
| 125 | Felix Eleuterio Benitez De Lugo Y Rodriguez | **Félix Eleuterio Benítez de Lugo y Rodríguez** | Benítez de Lugo | Félix Eleuterio Benítez de Lugo | probable | narrativa | — |
| 130 | Antonio Bermudez Cañete | **Antonio Bermúdez Cañete** | Bermúdez Cañete | Antonio Bermúdez Cañete | probable | V2 n.º 148 · v3 n.º 145 · narrativa · petición | — |
| 133 | Julian Besteiro Fernandez | **Julián Besteiro Fernández** | Besteiro | Julián Besteiro | confirmada | Presidencia · narrativa · petición | RAH 7180 |
| 143 | Sigfrido Blasco Blasco | **Sigfrido Blasco-Ibáñez Blasco** | Blasco-Ibáñez | Sigfrido Blasco-Ibáñez | por revisar | narrativa | — |
| 144 | Manuel Blasco Garzon | **Manuel Blasco Garzón** | Blasco Garzón | Manuel Blasco Garzón | confirmada | Gobierno | RAH 6424 |
| 148 | Cayetano Bolivar Escribano | **Cayetano Bolívar Escribano** | Bolívar | Cayetano Bolívar | probable | V2 n.º 120 · v3 n.º 120 | — |
| 155 | Juan Botella Asensi | **Juan Botella Asensi** | Botella | Juan Botella | confirmada | V2 n.º 42 · v3 n.º 43 | RAH 8184 |
| 166 | Abilio Calderon Rojo | **Abilio Calderón Rojo** | Calderón | Abilio Calderón | confirmada | V2 n.º 22 · v3 n.º 23 · petición | RAH 8724 |
| 170 | Jose Calvo Sotelo | **José Calvo Sotelo** | Calvo Sotelo | José Calvo Sotelo | confirmada | V2 n.º 9 · v3 n.º 9 · narrativa · petición | RAH 8233 |
| 172 | Miguel De Camara Cendoya | **Miguel de Cámara Cendoya** | Cámara | Miguel de Cámara | probable | Gobierno | — |
| 173 | Francisco De Asis Cambo Y Batlle | **Francisco de Asís Cambó y Batlle** | Cambó | Francisco de Asís Cambó | confirmada | V2 n.º 138 · v3 n.º 132 | RAH 8621 |
| 174 | Rafael Campalans Puig | **Rafael Campalans Puig** | Campalans | Rafael Campalans | por revisar | narrativa · petición | RAH 8359 |
| 175 | Clara Campoamor Y Rodriguez | **Clara Campoamor y Rodríguez** | Campoamor | Clara Campoamor | confirmada | V2 n.º 98 · v3 n.º 99 · narrativa · petición | RAH 8249 |
| 178 | Juan Canales Gonzalez | **Juan Canales González** | Juan Canales | Juan Canales | probable | V2 n.º 112 · v3 n.º 110 | — |
| 179 | Jose Antonio Canals Alvarez | **José Antonio Canals Álvarez** | Canals | José Antonio Canals | probable | narrativa | — |
| 184 | Dionisio Cano Lopez | **Dionisio Cano López** | Cano López | Dionisio Cano López | probable | petición | — |
| 186 | Vicente Cantos Figuerola | **Vicente Cantos Figuerola** | Cantos Figuerola | Vicente Cantos Figuerola | confirmada | Gobierno | RAH 9567 |
| 187 | Ramon Cantos Saiz De Carlos | **Ramón Cantos Saiz de Carlos** | Cantos Saiz de Carlos | Ramón Cantos Saiz de Carlos | probable | Gobierno | — |
| 190 | Jaime Carner Romeu | **Jaime Carner Romeu** | Carner | Jaime Carner | confirmada | V2 n.º 36 · v3 n.º 38 · Gobierno | RAH 9335 |
| 191 | Ramon De Carranza Y Fernandez Reguera | **Ramón de Carranza y Fernández Reguera** | Carranza | Ramón de Carranza | confirmada | Presidencia · narrativa · petición | RAH 9317 |
| 201 | Wenceslao Carrillo Alonso | **Wenceslao Carrillo Alonso** | Carrillo | Wenceslao Carrillo | confirmada | petición | RAH 9534 |
| 208 | Candido Casanueva Y Gorjon | **Cándido Casanueva y Gorjón** | Casanueva | Cándido Casanueva | confirmada | V2 n.º 11 · v3 n.º 11 · Presidencia · Gobierno · narrativa · petición | RAH 10581 |
| 209 | Santiago Casares Quiroga | **Santiago Casares Quiroga** | Casares Quiroga | Santiago Casares Quiroga | confirmada | V2 n.º 18 · v3 n.º 16 · Gobierno · narrativa · petición | RAH 10653 |
| 218 | Juan Castrillo Santos | **Juan Castrillo Santos** | Castrillo | Juan Castrillo | probable | V2 n.º 54 · v3 n.º 54 · Presidencia | — |
| 229 | Joaquin Chapaprieta Y Torregrosa | **Joaquín Chapaprieta y Torregrosa** | Chapaprieta | Joaquín Chapaprieta | confirmada | V2 n.º 15 · v3 n.º 14 · Gobierno · narrativa · petición | RAH 11484 |
| 231 | Jose Maria Cid Ruiz Zorrilla | **José María Cid Ruiz Zorrilla** | Cid | José María Cid | confirmada | V2 n.º 23 · v3 n.º 24 · Gobierno | RAH 11379 |
| 236 | Jesus Comin Sagues | **Jesús Comín Sagües** | Comín | Jesús Comín | por revisar | v3 n.º 147 · narrativa · petición | — |
| 239 | Luis Companys Jover | **Luis Companys Jover** | Companys | Luis Companys | confirmada | Gobierno | RAH 12636 |
| 244 | Luis Cornide Quiroga | **Luis Cornide Quiroga** | Cornide | Luis Cornide | probable | V2 n.º 100 · v3 n.º 100 | — |
| 245 | Pedro Corominas Y Montaña | **Pedro Corominas y Montaña** | Corominas | Pedro Corominas | confirmada | v3 n.º 150 · petición | RAH 12129 |
| 257 | Fermin Daza Diaz Del Castillo | **Fermín Daza Díaz del Castillo** | Daza | Fermín Daza | probable | V2 n.º 51 · v3 n.º 51 | — |
| 266 | Jose Diaz Ramos | **José Díaz Ramos** | Díaz Ramos | José Díaz Ramos | confirmada | narrativa | RAH 14079 |
| 272 | Marcelino Domingo Sanjuan | **Marcelino Domingo Sanjuán** | Domingo | Marcelino Domingo | confirmada | V2 n.º 122 · v3 n.º 117 · Gobierno | RAH 13903 |
| 280 | Francisco Javier Elola Y Diaz Varela | **Francisco Javier Elola y Díaz Varela** | Elola | Francisco Javier Elola | confirmada | V2 n.º 86 · v3 n.º 86 | RAH 15123 |
| 289 | Jose Estadella Arno | **José Estadella Arnó** | Estadella | José Estadella | confirmada | Gobierno | RAH 15976 |
| 290 | Juan Estelrich Artigues | **Juan Estelrich Artigues** | Estelrich | Juan Estelrich | confirmada | V2 n.º 113 · v3 n.º 105 · narrativa · petición | RAH 16211 |
| 298 | Joaquin Fanjul Goñi | **Joaquín Fanjul Goñi** | Fanjul | Joaquín Fanjul | confirmada | V2 n.º 38 · v3 n.º 37 | RAH 15932 |
| 301 | Ramon Feced Gresa | **Ramón Feced Gresa** | Feced | Ramón Feced | confirmada | V2 n.º 31 · v3 n.º 34 · Gobierno | RAH 15629 |
| 304 | Antonio Fernandez Bolaños Mora | **Antonio Fernández-Bolaños Mora** | Fernández-Bolaños | Antonio Fernández-Bolaños | probable | V2 n.º 149 | — |
| 305 | Federico Fernandez Castillejo | **Federico Fernández Castillejo** | Fernández Castillejo | Federico Fernández Castillejo | confirmada | V2 n.º 37 · v3 n.º 39 | RAH 46915 |
| 306 | Luis Fernandez Clerigo | **Luis Fernández Clérigo** | Fernández Clérigo | Luis Fernández Clérigo | probable | V2 n.º 73 · v3 n.º 74 · Presidencia · narrativa · petición | — |
| 319 | Bibiano Fernandez Osorio Tafall | **Bibiano Fernández-Osorio Tafall** | Fernández-Osorio | Bibiano Fernández-Osorio | confirmada | V2 n.º 137 · v3 n.º 135 · petición | RAH 16752 |
| 322 | Felix Fernandez Vega | **Félix Fernández Vega** | Fernández Vega | Félix Fernández Vega | confirmada | petición | RAH 16470 |
| 337 | Jose Franchy Roca | **José Franchy Roca** | Franchy Roca | José Franchy Roca | confirmada | Gobierno | RAH 17299 |
| 340 | Gabriel Franco Lopez | **Gabriel Franco López** | Franco López | Gabriel Franco López | confirmada | Gobierno · petición | RAH 17221 |
| 341 | Eduardo Frapolli Y Ruiz De La Herran | **Eduardo Frápolli y Ruiz de la Herrán** | Frápolli | Eduardo Frápolli | probable | Secretaría | — |
| 342 | Santiago Fuentes Pila | **Santiago Fuentes Pila** | Fuentes Pila | Santiago Fuentes Pila | probable | V2 n.º 91 · v3 n.º 88 · petición | — |
| 345 | Angel Galarza Gago | **Ángel Galarza Gago** | Galarza | Ángel Galarza | confirmada | V2 n.º 30 · v3 n.º 29 · narrativa · petición | RAH 18608 |
| 359 | Jeronimo Garcia Gallego | **Jerónimo García Gallego** | García Gallego | Jerónimo García Gallego | confirmada | V2 n.º 57 · v3 n.º 61 | RAH 18330 |
| 362 | Luis Garcia Guijarro | **Luis García Guijarro** | García Guijarro | Luis García Guijarro | probable | V2 n.º 74 · v3 n.º 72 | — |
| 380 | Jose Maria Gil Robles Y Quiñones De Leon | **José María Gil Robles y Quiñones de León** | Gil Robles | José María Gil Robles | confirmada | V2 n.º 7 · v3 n.º 7 · Gobierno · narrativa · petición | RAH 18934 |
| 383 | Bernardo Giner De Los Rios Garcia | **Bernardo Giner de los Ríos García** | Giner de los Ríos | Bernardo Giner de los Ríos | confirmada | Gobierno | RAH 20485 |
| 384 | Jose Giral Pereira | **José Giral Pereira** | Giral | José Giral | confirmada | V2 n.º 96 · v3 n.º 92 · Gobierno · narrativa · petición | RAH 20541 |
| 385 | Antonio Goicoechea Y Cosculluela | **Antonio Goicoechea y Cosculluela** | Goicoechea | Antonio Goicoechea | confirmada | V2 n.º 33 · v3 n.º 33 · petición | RAH 20308 |
| 386 | Jeronimo Gomariz Latorre | **Jerónimo Gomariz Latorre** | Gomariz | Jerónimo Gomariz | probable | V2 n.º 21 · v3 n.º 20 | — |
| 392 | Laureano Gomez Paratcha | **Laureano Gómez Paratcha** | Gómez Paratcha | Laureano Gómez Paratcha | confirmada | Presidencia | RAH 19968 |
| 393 | Ricardo Gomez Roji | **Ricardo Gómez Roji** | Gómez Roji | Ricardo Gómez Roji | probable | V2 n.º 58 · v3 n.º 57 | — |
| 394 | Trifon Gomez San Jose | **Trifón Gómez San José** | Trifón Gómez | Trifón Gómez | confirmada | V2 n.º 145 · v3 n.º 137 | RAH 20096 |
| 399 | Jose Gonzalez Fernandez De La Bandera | **José González Fernández de la Bandera** | González Fernández de la Bandera | José González Fernández de la Bandera | probable | V2 n.º 63 · v3 n.º 70 · Secretaría | — |
| 405 | Manuel Gonzalez Ramos | **Manuel González Ramos** | González Ramos | Manuel González Ramos | probable | V2 n.º 131 · v3 n.º 131 | — |
| 412 | Felix Gordon Ordas | **Félix Gordón Ordás** | Gordón Ordás | Félix Gordón Ordás | confirmada | V2 n.º 81 · v3 n.º 76 · narrativa | RAH 21089 |
| 417 | Miguel Granados Ruiz | **Miguel Granados Ruiz** | Granados | Miguel Granados | probable | Secretaría | — |
| 420 | Antonio Guallar Poza | **Antonio Guallar Poza** | Antonio Guallar | Antonio Guallar | probable | V2 n.º 97 · v3 n.º 96 | — |
| 421 | Santiago Guallar Poza | **Santiago Guallar Poza** | Santiago Guallar | Santiago Guallar | probable | V2 n.º 79 · v3 n.º 78 | — |
| 422 | Rafael Guerra Del Rio | **Rafael Guerra del Río** | Guerra del Río | Rafael Guerra del Río | confirmada | V2 n.º 4 · v3 n.º 4 · Gobierno · petición | RAH 20651 |
| 423 | Juan Bautista Guerra Garcia | **Juan Bautista Guerra García** | Guerra | Juan Bautista Guerra | probable | V2 n.º 147 · v3 n.º 143 · narrativa · petición | — |
| 435 | Diego Hidalgo Duran | **Diego Hidalgo Durán** | Hidalgo | Diego Hidalgo | confirmada | V2 n.º 49 · v3 n.º 49 · Gobierno | RAH 22997 |
| 436 | Jose Horn Areilza | **José Horn Areilza** | Horn | José Horn | probable | V2 n.º 117 · v3 n.º 129 | — |
| 441 | Dolores Ibarruri Gomez | **Dolores Ibárruri Gómez** | Ibárruri | Dolores Ibárruri | confirmada | narrativa · petición | RAH 22432 |
| 446 | Vicente Iranzo Enguita | **Vicente Iranzo Enguita** | Iranzo | Vicente Iranzo | confirmada | V2 n.º 119 · v3 n.º 115 · Gobierno · petición | RAH 24116 |
| 448 | Manuel Irujo Ollo | **Manuel Irujo Ollo** | Irujo | Manuel Irujo | confirmada | V2 n.º 64 · v3 n.º 66 · Gobierno · narrativa · petición | RAH 23976 |
| 449 | Enrique Izquierdo Jimenez | **Enrique Izquierdo Jiménez** | Izquierdo Jiménez | Enrique Izquierdo Jiménez | probable | V2 n.º 67 · v3 n.º 65 | — |
| 450 | Antonio Jaen Morente | **Antonio Jaén Morente** | Jaén | Antonio Jaén | confirmada | V2 n.º 125 · v3 n.º 119 | RAH 23465 |
| 452 | Julio Jauregui Lasanta | **Julio Jáuregui Lasanta** | Jáuregui Lasanta | Julio Jáuregui Lasanta | probable | narrativa | — |
| 455 | Luis Jimenez De Asua | **Luis Jiménez de Asúa** | Jiménez de Asúa | Luis Jiménez de Asúa | confirmada | V2 n.º 44 · v3 n.º 45 · Presidencia · narrativa · petición | RAH 23449 |
| 456 | Manuel Jimenez Fernandez | **Manuel Giménez Fernández** | Giménez Fernández | Manuel Giménez Fernández | confirmada | V2 n.º 12 · v3 n.º 12 · Presidencia · Gobierno · narrativa · petición | RAH 20317 |
| 461 | Mariano Joven Hernandez | **Mariano Joven Hernández** | Joven | Mariano Joven | probable | Secretaría | — |
| 467 | Victoria Kent Siano | **Victoria Kent Siano** | Kent | Victoria Kent | confirmada | narrativa · petición | RAH 24638 |
| 470 | Jose Maria Lamamie De Clairac Y De La Colina | **José María Lamamié de Clairac y de la Colina** | Lamamié de Clairac | José María Lamamié de Clairac | confirmada | V2 n.º 6 · v3 n.º 6 · petición | RAH 24514 |
| 472 | Ramon Lamoneda Fernandez | **Ramón Lamoneda Fernández** | Lamoneda | Ramón Lamoneda | confirmada | Secretaría · narrativa · petición | RAH 24595 |
| 477 | Antonio Lara Zarate | **Antonio Lara Zárate** | Lara | Antonio Lara | confirmada | V2 n.º 46 · v3 n.º 48 · Presidencia · Gobierno · narrativa · petición | RAH 24443 |
| 479 | Francisco Largo Caballero | **Francisco Largo Caballero** | Largo Caballero | Francisco Largo Caballero | confirmada | V2 n.º 89 · v3 n.º 87 · Gobierno · narrativa · petición | RAH 24554 |
| 480 | Jose Maria Lasarte Arana | **José María Lasarte Arana** | Lasarte Arana | José María Lasarte Arana | probable | petición | — |
| 485 | Jesus Maria Leizaola Sanchez | **Jesús María Leizaola Sánchez** | Leizaola | Jesús María Leizaola | confirmada | V2 n.º 34 · v3 n.º 30 | RAH 26035 |
| 487 | Alejandro Lerroux Garcia | **Alejandro Lerroux García** | Lerroux | Alejandro Lerroux | confirmada | V2 n.º 32 · v3 n.º 32 · Gobierno · narrativa · petición | RAH 25738 |
| 491 | Rodolfo Llopis Ferrandiz | **Rodolfo Llopis Ferrándiz** | Llopis | Rodolfo Llopis | confirmada | Secretaría | RAH 25587 |
| 492 | Juan Lluhi Vallesca | **Juan Lluhí Vallescá** | Lluhí | Juan Lluhí | confirmada | V2 n.º 128 · v3 n.º 140 · Gobierno | RAH 25241 |
| 495 | Francisco Lopez De Goicoechea E Inchaurrandieta | **Francisco López de Goicoechea e Inchaurrandieta** | López de Goicoechea | Francisco López de Goicoechea | confirmada | V2 n.º 53 · v3 n.º 53 | RAH 26572 |
| 503 | Jose Lopez Varela | **José López Varela** | López Varela | José López Varela | probable | V2 n.º 62 · v3 n.º 44 | — |
| 509 | Luis Lucia Lucia | **Luis Lucía Lucía** | Lucía | Luis Lucía | confirmada | Gobierno | RAH 27613 |
| 512 | Dimas Madariaga Almendros | **Dimas Madariaga Almendros** | Dimas Madariaga | Dimas Madariaga | probable | V2 n.º 27 · v3 n.º 31 · Gobierno · Secretaría | — |
| 513 | Salvador Madariaga Rojo | **Salvador Madariaga Rojo** | Salvador Madariaga | Salvador Madariaga | confirmada | Gobierno | RAH 27474 |
| 521 | Joaquin Manglano Y Cucalo De Montull | **Joaquín Manglano y Cucaló de Montull** | Manglano | Joaquín Manglano | confirmada | V2 n.º 66 · v3 n.º 63 | RAH 27396 |
| 522 | Daniel Mangrane Escardo | **Daniel Mangrané Escardó** | Mangrané | Daniel Mangrané | probable | V2 n.º 56 · v3 n.º 60 | — |
| 534 | Melchor Marial Mundet | **Melchor Marial Mundet** | Marial | Melchor Marial | probable | V2 n.º 71 · v3 n.º 75 · petición | — |
| 538 | Manuel Marraco Ramon | **Manuel Marraco Ramón** | Marraco | Manuel Marraco | confirmada | V2 n.º 19 · v3 n.º 22 · Presidencia · Gobierno | RAH 28115 |
| 548 | Pedro Martin Y Martin | **Pedro Martín y Martín** | Martín y Martín | Pedro Martín y Martín | probable | V2 n.º 20 · v3 n.º 19 · petición | — |
| 550 | Diego Martinez Barrio | **Diego Martínez Barrio** | Martínez Barrio | Diego Martínez Barrio | confirmada | V2 n.º 70 · v3 n.º 68 · Presidencia · Gobierno · narrativa · petición | RAH 27958 |
| 556 | Jose Martinez De Velasco Escolar | **José Martínez de Velasco Escolar** | Martínez de Velasco | José Martínez de Velasco | confirmada | V2 n.º 114 · v3 n.º 116 · Presidencia · Gobierno | RAH 29631 |
| 557 | Alfredo Martinez Garcia Arguelles | **Alfredo Martínez García Argüelles** | Martínez García Argüelles | Alfredo Martínez García Argüelles | confirmada | Presidencia | RAH 29686 |
| 558 | Lucio Martinez Gil | **Lucio Martínez Gil** | Martínez Gil | Lucio Martínez Gil | confirmada | V2 n.º 43 · v3 n.º 40 | RAH 29691 |
| 559 | Esteban Martinez Hervas | **Esteban Martínez Hervás** | Martínez Hervás | Esteban Martínez Hervás | probable | V2 n.º 115 · v3 n.º 113 | — |
| 565 | Salvador Martinez Moya Crespo | **Salvador Martínez Moya Crespo** | Martínez Moya | Salvador Martínez Moya | probable | V2 n.º 35 · v3 n.º 35 | — |
| 581 | Miguel Maura Gamazo | **Miguel Maura Gamazo** | Miguel Maura | Miguel Maura | confirmada | V2 n.º 28 · v3 n.º 26 · Gobierno · narrativa · petición | RAH 29009 |
| 582 | Honorio Maura Gamazo | **Honorio Maura Gamazo** | Honorio Maura | Honorio Maura | confirmada | petición | RAH 29008 |
| 583 | Joaquin Maurin Julia | **Joaquín Maurín Juliá** | Maurín | Joaquín Maurín | confirmada | narrativa · petición | RAH 29089 |
| 588 | Juan Antonio Mendez Martinez | **Juan Antonio Méndez Martínez** | Méndez Martínez | Juan Antonio Méndez Martínez | probable | Gobierno | — |
| 607 | Ramon Molina Nieto | **Ramón Molina Nieto** | Molina | Ramón Molina | probable | V2 n.º 143 · v3 n.º 144 | — |
| 622 | Jose Morales Robles | **José Morales Robles** | Morales Robles | José Morales Robles | probable | Gobierno | — |
| 644 | Manuel Muñoz Martinez | **Manuel Muñoz Martínez** | Muñoz Martínez | Manuel Muñoz Martínez | confirmada | petición | RAH 31736 |
| 646 | Amancio Muñoz Zafra | **Amancio Muñoz Zafra** | Muñoz Zafra | Amancio Muñoz Zafra | probable | petición | — |
| 652 | Juan Negrin Lopez | **Juan Negrín López** | Negrín | Juan Negrín | confirmada | v3 n.º 107 · Gobierno · narrativa · petición | RAH 33054 |
| 654 | Luis Nicolau D'olwer | **Luis Nicolau d'Olwer** | Nicolau d'Olwer | Luis Nicolau d'Olwer | por revisar | Gobierno | — |
| 655 | Emilio Niembro Gutierrez | **Emilio Niembro Gutiérrez** | Niembro | Emilio Niembro | probable | V2 n.º 135 · v3 n.º 128 | — |
| 666 | Marcelino De Oreja Y Elosegui | **Marcelino de Oreja y Elósegui** | Oreja Elósegui | Marcelino de Oreja Elósegui | confirmada | V2 n.º 150 · v3 n.º 146 · Gobierno | RAH 33867 |
| 668 | Jaime Oriol De La Puerta | **Jaime Oriol de la Puerta** | Oriol de la Puerta | Jaime Oriol de la Puerta | probable | narrativa · petición | — |
| 670 | Andres Orozco Batista | **Andrés Orozco Batista** | Orozco | Andrés Orozco | confirmada | V2 n.º 110 · v3 n.º 108 · Gobierno | RAH 33718 |
| 672 | Eduardo Ortega Y Gasset | **Eduardo Ortega y Gasset** | Eduardo Ortega y Gasset | Eduardo Ortega y Gasset | confirmada | V2 n.º 10 · v3 n.º 10 · narrativa · petición | RAH 33609 |
| 673 | Jose Ortega Y Gasset | **José Ortega y Gasset** | Ortega y Gasset | José Ortega y Gasset | confirmada | V2 n.º 41 · v3 n.º 42 · narrativa · petición | RAH 33632 |
| 674 | Tomas Ortiz De Solorzano Y Ortiz De La Puente | **Tomás Ortiz de Solórzano y Ortiz de la Puente** | Ortiz de Solórzano | Tomás Ortiz de Solórzano | probable | V2 n.º 52 · v3 n.º 55 | — |
| 676 | Angel Osorio Gallardo | **Ángel Ossorio Gallardo** | Ossorio Gallardo | Ángel Ossorio Gallardo | confirmada | V2 n.º 29 · v3 n.º 28 | RAH 33472 |
| 681 | Joaquin De Pablo Blanco Torres | **Joaquín de Pablo-Blanco Torres** | de Pablo-Blanco | Joaquín de Pablo-Blanco | confirmada | Gobierno | RAH 35086 |
| 683 | Jesus Pabon Y Suarez De Urbina | **Jesús Pabón y Suárez de Urbina** | Jesús Pabón | Jesús Pabón | confirmada | petición | RAH 35145 |
| 696 | Jose Pareja Yevenes | **José Pareja Yévenes** | Pareja Yévenes | José Pareja Yévenes | probable | Gobierno | — |
| 700 | Alvaro Pascual Leone | **Álvaro Pascual Leone** | Pascual Leone | Álvaro Pascual Leone | probable | V2 n.º 141 · v3 n.º 138 | — |
| 703 | Tomas Peire Cabaleiro | **Tomás Peire Cabaleiro** | Peire | Tomás Peire | probable | V2 n.º 118 · v3 n.º 118 | — |
| 722 | Joaquin Perez Madrigal | **Joaquín Pérez Madrigal** | Pérez Madrigal | Joaquín Pérez Madrigal | probable | V2 n.º 16 · v3 n.º 18 · petición | — |
| 730 | Angel Pestaña Nuñez | **Ángel Pestaña Núñez** | Pestaña | Ángel Pestaña | confirmada | narrativa · petición | RAH 36697 |
| 741 | Leandro Pita Romero | **Leandro Pita Romero** | Pita Romero | Leandro Pita Romero | confirmada | V2 n.º 144 · v3 n.º 141 · Gobierno | RAH 36476 |
| 745 | Manuel Portela Valladares | **Manuel Portela Valladares** | Portela Valladares | Manuel Portela Valladares | confirmada | Gobierno · narrativa | RAH 36183 |
| 747 | Joaquin Poza Juncal | **Joaquín Poza Juncal** | Poza Juncal | Joaquín Poza Juncal | probable | V2 n.º 107 · v3 n.º 104 | — |
| 749 | Jose Prat Garcia | **José Prat García** | Prat | José Prat | confirmada | V2 n.º 108 · v3 n.º 112 | RAH 37791 |
| 754 | Indalecio Prieto Tuero | **Indalecio Prieto Tuero** | Prieto | Indalecio Prieto | confirmada | V2 n.º 1 · v3 n.º 2 · Gobierno · narrativa · petición | RAH 37677 |
| 755 | Jose Antonio Primo De Rivera Y Saenz De Heredia | **José Antonio Primo de Rivera y Sáenz de Heredia** | Primo de Rivera | José Antonio Primo de Rivera | confirmada | V2 n.º 104 · v3 n.º 102 · narrativa | RAH 37745 |
| 767 | Pedro Rahola Y Molinas | **Pedro Rahola y Molinas** | Rahola | Pedro Rahola | confirmada | V2 n.º 140 · v3 n.º 134 · Presidencia · Gobierno | RAH 37385 |
| 772 | Enrique Ramos Ramos | **Enrique Ramos Ramos** | Ramos | Enrique Ramos | confirmada | Gobierno · Secretaría | RAH 38530 |
| 774 | Luis Recasens Siches | **Luis Recaséns Siches** | Recaséns Siches | Luis Recaséns Siches | confirmada | V2 n.º 83 · v3 n.º 80 | RAH 38903 |
| 783 | Fernando Rey Mora | **Fernando Rey Mora** | Rey Mora | Fernando Rey Mora | probable | V2 n.º 102 · v3 n.º 114 | — |
| 784 | Manuel Rico Avello | **Manuel Rico Avello** | Rico Avello | Manuel Rico Avello | confirmada | V2 n.º 146 · v3 n.º 148 · Gobierno | RAH 38509 |
| 789 | Honorio Riesgo Garcia | **Honorio Riesgo García** | Riesgo | Honorio Riesgo | probable | Presidencia · petición | — |
| 790 | Cirilo Del Rio Rodriguez | **Cirilo del Río Rodríguez** | del Río | Cirilo del Río | confirmada | V2 n.º 13 · v3 n.º 15 · Gobierno · Secretaría | RAH 38213 |
| 791 | Fernando De Los Rios Urruti | **Fernando de los Ríos Urruti** | de los Ríos | Fernando de los Ríos | confirmada | V2 n.º 40 · v3 n.º 36 · Gobierno | RAH 38394 |
| 797 | Francisco Roca Yevenes | **Francisco Roca Yévenes** | Roca | Francisco Roca | probable | Gobierno | — |
| 798 | Juan Jose Rocha Garcia | **Juan José Rocha García** | Rocha | Juan José Rocha | confirmada | V2 n.º 84 · v3 n.º 82 · Gobierno | RAH 38358 |
| 804 | Luis Rodriguez De Viguri | **Luis Rodríguez de Viguri** | Rodríguez de Viguri | Luis Rodríguez de Viguri | confirmada | V2 n.º 14 · v3 n.º 13 · petición | RAH 39624 |
| 808 | Antonio Rodriguez Perez | **Antonio Rodríguez Pérez** | Rodríguez Pérez | Antonio Rodríguez Pérez | probable | V2 n.º 87 · v3 n.º 83 | — |
| 809 | Santiago Rodriguez Piñero | **Santiago Rodríguez Piñero** | Rodríguez Piñero | Santiago Rodríguez Piñero | probable | V2 n.º 109 · v3 n.º 111 | — |
| 819 | Jose Rosado Gil | **José Rosado Gil** | Rosado Gil | José Rosado Gil | probable | Presidencia · narrativa | — |
| 821 | Antonio Royo Villanova Morales | **Antonio Royo Villanova Morales** | Royo Villanova | Antonio Royo Villanova | confirmada | V2 n.º 2 · v3 n.º 1 · Gobierno · narrativa · petición | RAH 39172 |
| 823 | Jose Tomas Rubio Chavarri | **José Tomás Rubio Chávarri** | Rubio Chávarri | José Tomás Rubio Chávarri | probable | V2 n.º 116 · v3 n.º 106 | — |
| 835 | Mariano Ruiz Funes Garcia | **Mariano Ruiz-Funes García** | Ruiz-Funes | Mariano Ruiz-Funes | confirmada | V2 n.º 111 · v3 n.º 109 · Gobierno · narrativa | RAH 38997 |
| 836 | Amos Ruiz Lecina | **Amós Ruiz Lecina** | Ruiz Lecina | Amós Ruiz Lecina | por revisar | V2 n.º 130 · v3 n.º 127 · narrativa | — |
| 841 | Amos Sabras Gurrea | **Amós Sabrás Gurrea** | Sabrás | Amós Sabrás | confirmada | V2 n.º 134 · v3 n.º 130 | RAH 40430 |
| 847 | Pedro Sainz Rodriguez | **Pedro Sainz Rodríguez** | Sainz Rodríguez | Pedro Sainz Rodríguez | confirmada | petición | RAH 40623 |
| 850 | Pelayo Sala Y Berenguer | **Pelayo Sala y Berenguer** | Sala y Berenguer | Pelayo Sala y Berenguer | probable | Gobierno | — |
| 851 | Rafael Salazar Alonso | **Rafael Salazar Alonso** | Salazar Alonso | Rafael Salazar Alonso | confirmada | V2 n.º 25 · v3 n.º 21 · Gobierno · petición | RAH 40031 |
| 857 | Federico Salmon Amorin | **Federico Salmón Amorín** | Salmón | Federico Salmón | confirmada | V2 n.º 93 · v3 n.º 91 · Gobierno | RAH 40180 |
| 863 | Ricardo Samper Ibañez | **Ricardo Samper Ibáñez** | Samper | Ricardo Samper | confirmada | V2 n.º 24 · v3 n.º 25 · Gobierno · narrativa · petición | RAH 40224 |
| 865 | Claudio Sanchez Albornoz Menduiña | **Claudio Sánchez Albornoz Menduiña** | Sánchez Albornoz | Claudio Sánchez Albornoz | confirmada | V2 n.º 103 · v3 n.º 101 · Presidencia | RAH 41351 |
| 868 | Jose Sanchez Covisa Y Sanchez Covisa | **José Sánchez-Covisa y Sánchez-Covisa** | Sánchez-Covisa | José Sánchez-Covisa | confirmada | Secretaría | RAH 41176 |
| 874 | Felipe Sanchez Roman Y Gallifa | **Felipe Sánchez Román y Gallifa** | Sánchez Román | Felipe Sánchez Román | confirmada | V2 n.º 17 · v3 n.º 17 · petición | RAH 41362 |
| 883 | Juan Jose Santa Cruz Garces | **Juan José Santa Cruz Garcés** | Santa Cruz | Juan José Santa Cruz | confirmada | V2 n.º 133 · v3 n.º 125 | RAH 48449 |
| 884 | Miguel Santalo Y Parvorell | **Miguel Santaló y Parvorell** | Santaló | Miguel Santaló | confirmada | V2 n.º 90 · v3 n.º 89 · petición | RAH 40954 |
| 899 | Juan Sentis Nogues | **Juan Sentís Nogués** | Sentís Nogués | Juan Sentís Nogués | probable | petición | — |
| 908 | Ramon Serrano Suñer | **Ramón Serrano Suñer** | Serrano Suñer | Ramón Serrano Suñer | por revisar | V2 n.º 124 · v3 n.º 121 | RAH 42239 |
| 911 | Tomas Sierra Rustarazo | **Tomás Sierra Rustarazo** | Sierra Rustarazo | Tomás Sierra Rustarazo | probable | V2 n.º 55 · v3 n.º 56 | — |
| 923 | Fernando Suarez De Tangil Y Angulo | **Fernando Suárez de Tangil y Angulo** | Suárez de Tangil | Fernando Suárez de Tangil | confirmada | V2 n.º 88 · v3 n.º 85 · Presidencia · petición | RAH 43435 |
| 925 | Ramon Suarez Picallo | **Ramón Suárez Picallo** | Suárez Picallo | Ramón Suárez Picallo | confirmada | V2 n.º 76 · v3 n.º 73 · narrativa · petición | RAH 43380 |
| 930 | Antonio Taboada Tundidor | **Antonio Taboada Tundidor** | Taboada | Antonio Taboada | probable | V2 n.º 105 · Secretaría | — |
| 940 | Juan Tirado Figueroa | **Juan Tirado Figueroa** | Tirado | Juan Tirado | probable | petición | — |
| 942 | Romualdo De Toledo Y Robles | **Romualdo de Toledo y Robles** | Toledo | Romualdo de Toledo | probable | V2 n.º 101 · v3 n.º 98 | — |
| 944 | Jose Tomas Piera | **José Tomás y Piera** | Tomás y Piera | José Tomás y Piera | confirmada | petición | RAH 43064 |
| 953 | Manuel Torres Campaña | **Manuel Torres Campaña** | Torres Campaña | Manuel Torres Campaña | probable | V2 n.º 136 · v3 n.º 133 | — |
| 956 | Jose Antonio Trabal Y Saus | **José Antonio Trabal y Sans** | Trabal | José Antonio Trabal | por revisar | V2 n.º 132 · v3 n.º 142 · Secretaría · narrativa · petición | — |
| 958 | Antonio Tuñon De Lara | **Antonio Tuñón de Lara** | Tuñón de Lara | Antonio Tuñón de Lara | probable | Presidencia | — |
| 960 | Miguel De Unamuno Y Jugo | **Miguel de Unamuno y Jugo** | Unamuno | Miguel de Unamuno | confirmada | narrativa · petición | RAH 44412 |
| 965 | Juan Usabiaga Lasquibar | **Juan Usabiaga Lasquíbar** | Usabiaga | Juan Usabiaga | confirmada | Gobierno | RAH 43941 |
| 973 | Bernardino Valle Gracia | **Bernardino Valle Gracia** | Valle | Bernardino Valle | probable | V2 n.º 99 · v3 n.º 97 | — |
| 975 | Eloy Vaquero Cantillo | **Eloy Vaquero Cantillo** | Vaquero | Eloy Vaquero | confirmada | V2 n.º 142 · v3 n.º 139 · Gobierno | RAH 45378 |
| 980 | Narciso Vazquez Lemus | **Narciso Vázquez Lemus** | Vázquez Lemus | Narciso Vázquez Lemus | probable | Presidencia · narrativa · petición | — |
| 985 | Francisco Vega De La Iglesia Manteca | **Francisco Vega de la Iglesia Manteca** | Vega de la Iglesia | Francisco Vega de la Iglesia | probable | V2 n.º 127 · v3 n.º 123 | — |
| 988 | Antonio Velao Oñate | **Antonio Velao Oñate** | Velao | Antonio Velao | confirmada | Gobierno | RAH 45373 |
| 991 | Nicasio Velayos Y Velayos | **Nicasio Velayos y Velayos** | Velayos | Nicasio Velayos | confirmada | V2 n.º 65 · v3 n.º 62 · Gobierno | RAH 45080 |
| 993 | Juan Ventosa Calvell | **Juan Ventosa Calvell** | Ventosa Calvell | Juan Ventosa Calvell | confirmada | V2 n.º 47 · v3 n.º 46 · narrativa · petición | RAH 44855 |
| 998 | Miguel Vidal Guardiola | **Miguel Vidal Guardiola** | Vidal Guardiola | Miguel Vidal Guardiola | confirmada | V2 n.º 60 · v3 n.º 58 | RAH 44666 |
| 1000 | Juan Simeon Vidarte Franco Romero | **Juan Simeón Vidarte Franco-Romero** | Vidarte | Juan Simeón Vidarte | confirmada | V2 n.º 123 · Secretaría | RAH 46839 |
| 1006 | Filiberto Villalobos Gonzalez | **Filiberto Villalobos González** | Villalobos | Filiberto Villalobos | confirmada | Gobierno | RAH 46326 |
| 1011 | Justo Villanueva Y Gomez | **Justo Villanueva y Gómez** | Villanueva | Justo Villanueva | probable | V2 n.º 45 · v3 n.º 47 | — |
| 1026 | Luis Zulueta Y Escolano | **Luis Zulueta y Escolano** | Luis Zulueta | Luis Zulueta | confirmada | Gobierno | RAH 45560 |

## El resto (549 nombres)

Solo en `exportador/grafias.csv`: 126 grafías confirmadas, 420 probables y 3 por revisar (van en la sección 1).

## Regenerar

```
python3 docs/grafias/construir_grafias.py --escribir
```
Comprueba las huellas de la V2 y la v3, recalcula la evidencia del Diario (unos dos minutos la primera vez; caché en `~/.cache/luz_site/grafias/`) y reescribe el CSV y este documento.
Las fichas del Congreso y los candidatos de la RAH están guardados en `docs/grafias/fuentes/`, con su fecha de consulta.
Las decisiones caso a caso están en el diccionario `DECISION` del constructor, cada una con su motivo.
