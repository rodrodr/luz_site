# Copy ES · El explorador (`/[lang]/explorador/`)

> **Fase 2 (23-09-2026, grupo 6).** Antetítulos de sección convertidos en asientos con su base (regla del asiento de
> DESIGN.md); claves nuevas de figura (`fig.F17.leyenda.marca`, `.leyenda.salto`, `.ficha.*`, `fig.F29.leyenda.*`,
> `.nota`, `.tabla.col.*`). La captura `busqueda` abre la página, junto a la cabecera. Peticiones:
> `docs/peticiones/grupo6-explorador-afinidades.md`.
>
> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «El explorador». Sigue la
> narrativa §15 y la plantilla J del plan. Cada función que se describe está comprobada en el explorador publicado
> (`estudio/estudio_lyt_explorador.md`, el `LEEME.md` de las capturas y comprobaciones de hoy). Marcadores:
> `docs/marcadores/explorador.md`.
>
> **Cómo se lee.** Formato de ParlaIbero: `<!-- clave -->` abre cada texto; `<!-- ↺ clave -->` repite una frase fija
> o un rótulo de `comun.md`, idéntico, en el sitio donde se pinta; `> [nota de diseño]` no es texto para el lector.
> Ninguna cifra va tecleada: todas van con marcador. Las claves cuelgan del prefijo de su sección en la plantilla
> (`explorador.encontrar.*`, `explorador.leer.*`…), para que `Seccion` las pinte en este orden.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (medido hoy, 22-09-2026):
> 1. **Tendencia.** La captura es la vista Constituyentes con febrero de 1933 fijado (`tendencia.png`). La del plan,
>    la vista «Todo», enseña el hito 18 del explorador, «Martínez Barrio, presidente» (discrepancia 31).
> 2. **Bibliotecas.** Las 31 reúnen 24.029 **entradas**, no intervenciones: son 20.443 intervenciones distintas,
>    porque una puede estar en varias. El copy dice «entradas».
> 3. **«Cada debate reúne sesiones enteras».** Vale para 25 de los 26 debates (todo lo que se habla en sus sesiones).
>    «Reforma agraria y Sanjurjada» es una selección. El copy lo dice con marcadores.
> 4. **«Recordar la base» no se promete (C4).** Falla el guardado automático en Chromium y en WebKit con perfiles
>    nuevos (prueba de hoy, repetida por el grupo de capturas con el Chromium completo).
> 5. **H1 en pregunta** (regla 1 del amontonamiento). La frase de la narrativa, «Busque, lea y cite…», abre la entrada.
> 6. **F29 va como lista de consultas copiables** (`fig.F29.*`), con el recuento de cada una y la fecha una sola vez.

---

## Metadatos

<!-- explorador.meta.titulo -->
El explorador

<!-- explorador.meta.descripcion -->
Busque, lea y cite lo que se dijo en las Cortes de la República, sin programar: qué hace el explorador, con capturas reales, y qué no hace.

> [nota de diseño] Índice lateral con las secciones (sus `*.titulo`) y banda fija (`BandaCTA`: ↺ 3 + [Descargar los
> datos]; [Abrir el explorador ↗] + `comun.fija.explorador`). La cabecera lleva el sello v3 y `<NotaBases>` (↺ 13): las
> cifras de búsqueda y de bibliotecas de esta página son de la v3.

## 8.1 Cabecera

<!-- explorador.antetitulo -->
{{filas.v3}} intervenciones · unos {{explorador.gz.bytes|peso_dec0}} comprimidos · base construida el {{explorador.construido|fecha_corta}}

<!-- explorador.titulo -->
¿Qué hace el explorador, y qué no?

<!-- explorador.entrada -->
Busque, lea y cite lo que se dijo en las Cortes de la República. El explorador llega con los Diarios ya cargados, sin cuenta ni instalación.

<!-- ↺ comun.fija.local -->
Se abre en su navegador; lo que busca y guarda se queda en su equipo.

<!-- ↺ comun.boton.explorador -->
[Abrir el explorador ↗]

<!-- explorador.idioma -->
El explorador está solo en español.

> [nota de diseño] La cabecera pinta, tras la entrada, las tres ↺ ancladas (garantía, botón y NotaBases). No hacen
> falta `explorador.garantia` ni `explorador.abrir`: son ↺ de `comun.md`. `explorador.idioma` se pinta solo en `/en/`;
> existe en las dos lenguas para que `check-i18n` vea las mismas claves.

<!-- explorador.indice.encontrar -->
Encontrar

<!-- explorador.indice.busquedas -->
Búsquedas de muestra

<!-- explorador.indice.pico -->
¿Cuándo fue el pico?

<!-- explorador.indice.leer -->
Leer

<!-- explorador.indice.bibliotecas -->
Bibliotecas

<!-- explorador.indice.coocurrencias -->
Coocurrencias

<!-- explorador.indice.menciones -->
Menciones

<!-- explorador.indice.llevar -->
Llevárselo, citado

<!-- explorador.indice.empezar -->
Cómo empezar

<!-- explorador.indice.limites -->
Lo que no hace

## 8.2 Primero, encontrar

<!-- explorador.encontrar.antetitulo -->
{{habla.v3}} de las {{filas.v3}} intervenciones son de habla

<!-- explorador.encontrar.titulo -->
Primero, encontrar

<!-- explorador.encontrar.entrada -->
Antes de leer hay que encontrar. El explorador busca por el texto, por quién habla y por el calendario.

<!-- explorador.p1.titulo -->
¿Qué se dijo?

<!-- explorador.p1.texto -->
Busca en el texto completo de cada intervención, sin distinguir tildes ni mayúsculas. Las comillas buscan la frase exacta; `+` exige las dos palabras y `|` admite cualquiera de ellas. Una línea bajo el buscador dice cómo ha entendido la consulta.

<!-- explorador.p2.titulo -->
¿Quién, cuándo y de qué grupo?

<!-- explorador.p2.texto -->
Filtra por fecha, número de sesión, legislatura, familia política, ideología, partido, diputado, distrito y longitud. «Solo lo que se habla» deja fuera el sumario de cada sesión. También lo que el Diario imprime sin que nadie lo diga: listas de votación, dictámenes leídos, el relato de la Mesa. Una barra reparte los resultados por ideología, y un clic en un tramo filtra.

<!-- explorador.p3.titulo -->
¿En qué momento del debate?

<!-- explorador.p3.texto -->
Cada resultado se abre como una página del Diario, con los turnos que la rodean o con la sesión entera. Lo cuenta el apartado siguiente.

<!-- explorador.p4.titulo -->
¿Cuándo se habló de esto?

<!-- explorador.p4.texto -->
Tendencia dibuja la frecuencia de uno o varios términos, mes a mes o año a año, por cada diez mil palabras. Los meses sin sesión salen rayados, y un clic en un mes lista sus intervenciones. Aquí el asterisco sí vale: `agrari*` reúne agraria, agrario, agrarios y las demás formas.

<!-- explorador.p4.hitos -->
Los hitos numerados los pone el explorador; no son una cronología revisada por este sitio.

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

> [nota de diseño] Las cuatro preguntas son `explorador.p1` a `p4` (la plantilla las pinta con `tambien`: el
> `.titulo` como H3). A dos columnas en escritorio, sin iconos. Capturas: `busqueda.png` bajo la primera;
> `tendencia.png` bajo la cuarta.

## 8.2 bis · Búsquedas de muestra (F29)

<!-- explorador.busquedas.antetitulo -->recuentos del {{busquedas.fecha|fecha_corta}}

<!-- explorador.busquedas.titulo -->
Búsquedas de muestra

<!-- explorador.busquedas.entrada -->
Son consultas reales, contadas en el explorador. Cópielas, péguelas en el buscador y compare el recuento.

<!-- ↺ comun.fija.enlace -->
El explorador no abre una búsqueda desde un enlace: cópiela y péguela en su buscador (tecla /).

<!-- fig.F29.titulo -->
Consultas y recuentos

<!-- fig.F29.pregunta -->
¿Qué devuelve el buscador con consultas reales?

<!-- fig.F29.que_mide -->
Cuántas intervenciones devuelve cada consulta en el buscador del explorador, con y sin «Solo lo que se habla».

<!-- fig.F29.denominador -->
Las {{filas.v3}} intervenciones del explorador; con «Solo lo que se habla», {{habla.v3}}.

<!-- fig.F29.voto_femenino.consulta -->
"voto femenino"

<!-- fig.F29.voto_femenino.recuento -->
{{busqueda.voto_femenino.n}} intervenciones.

<!-- fig.F29.voto_femenino.nota -->
La frase exacta, entre comillas.

<!-- fig.F29.voto_mujer.consulta -->
"voto de la mujer"

<!-- fig.F29.voto_mujer.recuento -->
{{busqueda.voto_mujer.n}} intervenciones.

<!-- fig.F29.voto_mujer.nota -->
La misma idea, con otras palabras.

<!-- fig.F29.voto_union.consulta -->
"voto femenino" | "voto de la mujer"

<!-- fig.F29.voto_union.recuento -->
{{busqueda.voto_union.n}} intervenciones.

<!-- fig.F29.voto_union.nota -->
Las dos frases, unidas con `|`. No suman sin más: {{busqueda.voto_ambas.n}} intervenciones traen las dos.

<!-- fig.F29.casas_viejas.consulta -->
"casas viejas"

<!-- fig.F29.casas_viejas.recuento -->
{{busqueda.casas_viejas.n}} intervenciones.

<!-- fig.F29.casas_viejas.nota -->
El nombre aparece por primera vez el {{busqueda.casas_viejas.primera|fecha_larga}}. Con «Solo lo que se habla», {{busqueda.casas_viejas.habla}}.

<!-- fig.F29.divorcio.consulta -->
divorcio

<!-- fig.F29.divorcio.recuento -->
{{busqueda.divorcio.n}} intervenciones.

<!-- fig.F29.divorcio.nota -->
Una sola palabra. Con «Solo lo que se habla», {{busqueda.divorcio.habla}}.

<!-- fig.F29.reforma_agraria.consulta -->
"reforma agraria"

<!-- fig.F29.reforma_agraria.recuento -->
{{busqueda.reforma_agraria.n}} intervenciones.

<!-- fig.F29.reforma_agraria.nota -->
Con comillas, la frase exacta. Sin comillas basta con que estén las dos palabras: {{busqueda.reforma_agraria_y.n}}.

<!-- fig.F29.estatuto.consulta -->
"estatuto de cataluña"

<!-- fig.F29.estatuto.recuento -->
{{busqueda.estatuto.n}} intervenciones.

<!-- fig.F29.estatuto.nota -->
Con «Solo lo que se habla», {{busqueda.estatuto.habla}}: el resto son sumarios y comentarios del Diario.

<!-- fig.F29.catolica.consulta -->
"España ha dejado de ser católica"

<!-- fig.F29.catolica.recuento -->
{{busqueda.catolica.n}} intervenciones.

<!-- fig.F29.catolica.nota -->
La de Azaña, del 13 de octubre de 1931, sale en el puesto {{busqueda.catolica.puesto_azana}}: la lista se ordena por relevancia, salvo que usted elija la fecha.

<!-- fig.F29.salvedad -->
Recuentos del {{busquedas.fecha|fecha_larga}} sobre la base del explorador con huella {{v3.huella}}; cambian si cambia esa base.

<!-- fig.F29.alt -->
Lista de consultas para el buscador del explorador, cada una con su número de intervenciones y una nota.

<!-- fig.F29.leyenda.habla -->
Lo que se habla

<!-- fig.F29.leyenda.resto -->
Sumarios y comentarios del Diario

<!-- fig.F29.leyenda.lectura -->
La barra entera es el recuento del buscador; su tramo en oro, lo que queda con «Solo lo que se habla». Todas van a la misma escala.

<!-- fig.F29.nota -->
{{n}} intervenciones · {{habla}} con «Solo lo que se habla» · {{resto}} de sumarios y comentarios

<!-- fig.F29.tabla.col.consulta -->
Consulta

<!-- fig.F29.tabla.col.n -->
Intervenciones

<!-- fig.F29.tabla.col.habla -->
Solo lo que se habla

<!-- fig.F29.tabla.col.resto -->
Sumarios y comentarios

<!-- fig.F29.tabla.col.fechas -->
Primera y última

> [nota de diseño] F29 es una **lista tipográfica**, no un gráfico. Cada entrada: la consulta en `<code>` seleccionable
> (`.consulta`, un literal de código que se copia tal cual), su `.recuento`, [Copiar la consulta] (nace oculto; lo
> destapa la isla) y su `.nota`. ↺ 5 va **una vez**, sobre la lista (arriba, tras `explorador.busquedas.entrada`), no en
> cada entrada. La fecha va una vez, en la salvedad. Datos descargables: `busquedas.csv` (id, consulta, n, habla) con su
> LÉAME (`fig.F29.que_mide`, `.denominador`, `.salvedad`). Si el componente usa `restoDe(lang, 'fig.F29')`, estas
> claves ya salen en su orden.

## 2 bis. ¿Cuándo fue el pico? (juego)

> [nota de diseño] Juego de la petición del investigador (24-09-2026): `components/explorador/Pico.astro`, con los datos del laboratorio (`public/datos/laboratorio.json`). Diez términos; cinco por partida. Sin JS, una tabla.

<!-- explorador.pico.titulo -->
¿Cuándo fue el pico?

<!-- explorador.pico.entrada -->
La Tendencia del explorador cuenta, mes a mes, cuántas veces aparece un término. Adivine en qué mes se habló más de cada uno.

<!-- explorador.pico.juego.reglas -->
Tres puntos por el mes justo; dos si se queda a dos meses o menos; uno si se queda a seis.

<!-- explorador.pico.juego.cuenta -->
Término {{i}} de {{n}} · Puntos: {{p}}

<!-- explorador.pico.juego.pregunta -->
¿En qué mes se habló más de «{{termino}}»?

<!-- explorador.pico.juego.anio -->
El año

<!-- explorador.pico.juego.mes -->
El mes

<!-- explorador.pico.juego.exacto -->
¡En el mes justo!

<!-- explorador.pico.juego.distancia -->
Se ha quedado a {{n}} meses.

<!-- explorador.pico.juego.distancia.uno -->
Se ha quedado a un mes.

<!-- explorador.pico.juego.pico -->
El pico: {{mes}}, con {{n}} apariciones.

<!-- explorador.pico.juego.leyenda -->
Apariciones por mes. En color, el pico; en negro, su apuesta.

<!-- explorador.pico.juego.siguiente -->
[Siguiente]

<!-- explorador.pico.juego.ver -->
[Ver el resultado]

<!-- explorador.pico.juego.resumen -->
Ha sumado {{p}} de {{max}} puntos.

<!-- explorador.pico.juego.nivel.0 -->
Se enteró por la radio.

<!-- explorador.pico.juego.nivel.1 -->
Lee el Diario con unos meses de retraso.

<!-- explorador.pico.juego.nivel.2 -->
Buen olfato para la actualidad parlamentaria.

<!-- explorador.pico.juego.nivel.3 -->
Hemeroteca andante.

<!-- explorador.pico.juego.otra -->
[Otra partida]

<!-- explorador.pico.juego.salvedad -->
Cuenta las apariciones como la Tendencia del explorador: sin tildes ni mayúsculas, y las expresiones como frase exacta.

<!-- explorador.pico.juego.tabla -->
Los términos del juego y su pico

<!-- explorador.pico.juego.tabla.col.termino -->
Término

<!-- explorador.pico.juego.tabla.col.pico -->
Mes con más apariciones

<!-- explorador.pico.juego.tabla.col.n -->
Apariciones ese mes

---

## 8.3 Leer como en el Diario

<!-- explorador.leer.antetitulo -->
Capturas del {{explorador.capturas.fecha|fecha_corta}} · sesión 48, 1-X-1931

<!-- explorador.leer.titulo -->
Leer como en el Diario

<!-- explorador.leer.entrada -->
Encontrar es la mitad del trabajo; la otra mitad es leer. El explorador enseña cada intervención como una página del Diario, dentro de su sesión.

<!-- explorador.leer.lector -->
El lector trae el rótulo del orador, desarrollado («La señorita CAMPOAMOR»), y aparte el literal que imprimió el Diario («La Srta. CAMPOAMOR:»); además, la sesión, la fecha, el partido y el distrito. Los párrafos van numerados para poder citarlos. Debajo, el hilo de la sesión enseña los turnos anteriores y los siguientes.

<!-- explorador.leer.acotaciones -->
Las acotaciones del Diario van señaladas por clase: los aplausos en verde, los rumores en teja, los gestos y las risas en gris.

<!-- explorador.leer.corrida -->
«Sesión corrida» abre la sesión entera, de principio a fin, con la intervención enmarcada en su sitio.

<!-- explorador.leer.careo -->
«Carear» pone dos intervenciones frente a frente, cada una con su propio desplazamiento. En la misma sesión propone réplicas por alusión al apellido o al cargo, por interrupción transcrita, por cercanía en el debate y por distancia política.

<!-- explorador.leer.careo_limite -->
Son propuestas, no diálogos probados, y el propio explorador lo advierte. A veces propone como réplica el sumario de la sesión o los comentarios del Diario, que no son palabras de nadie.

<!-- explorador.leer.mismo -->
«Mismo diputado» busca intervenciones del mismo orador, en otras sesiones, con un vocabulario parecido.

> [nota de diseño] Es la sección central: más aire y las cuatro capturas de lectura (`lector`, `acotaciones`,
> `corrida`, `careo`) en fila de dos en escritorio. ↺ 8 va pegada al pie de `corrida` (se repite abajo, tras su pie).

## 8.4 Después, enfocar: las bibliotecas

<!-- explorador.bibliotecas.antetitulo -->
{{bib.n}} bibliotecas · {{bib.entradas}} entradas

<!-- explorador.bibliotecas.titulo -->
Después, enfocar: las bibliotecas

<!-- explorador.bibliotecas.entrada -->
Un corpus entero no es una pregunta. Una biblioteca sí.

<!-- explorador.bibliotecas.que_es -->
Una biblioteca es su propia selección de intervenciones sobre un asunto. La reúne con búsquedas, la afina leyendo y la guarda con sus notas y etiquetas.

<!-- explorador.bibliotecas.guardar -->
Se guarda en su navegador. Para compartirla o tener una copia aparte, se exporta a un archivo `.2replib`.

<!-- explorador.bibliotecas.proyecto -->
El explorador trae {{bib.n}} bibliotecas preparadas por el proyecto. Son debates, selecciones de sesiones, los discursos principales y una de anécdotas y amenazas. Se añaden desde «Mis bibliotecas › Añadir bibliotecas del proyecto…». En ese diálogo, cada debate lleva delante «Debate · »; este sitio lo nombra sin él.

<!-- explorador.bib.entradas -->
Reúnen {{bib.entradas}} entradas; una misma intervención puede estar en más de una biblioteca.

<!-- explorador.bibliotecas.f17 -->
El gráfico las sitúa en el tiempo: un carril por biblioteca y una marca por sesión, mayor cuantas más entradas trae.

<!-- explorador.bibliotecas.enteras -->
{{bib.debates_enteros|letra}} de los {{bib.debates}} debates reúnen sus sesiones enteras, todo lo que se habla en ellas. Por eso el del sufragio femenino trae también la pena de muerte y la huelga de Telefónica.

<!-- explorador.bibliotecas.lexico -->
Sobre una biblioteca se calcula su léxico: las palabras que la distinguen del resto del corpus, medidas con el G² de Dunning y el log-ratio.

> [nota de diseño] F17 (base v3) va tras `explorador.bibliotecas.f17`; las capturas `bibliotecas` (talla media) y
> `lexico`, tras `explorador.bibliotecas.lexico`.

### F17 · Las bibliotecas del proyecto, en el tiempo

<!-- fig.F17.titulo -->
Las bibliotecas del proyecto, en el tiempo

<!-- fig.F17.pregunta -->
¿Qué trae el explorador ya preparado, y cuándo ocurrió?

<!-- fig.F17.que_mide -->
Las sesiones que reúne cada biblioteca del proyecto, con sus entradas por sesión.

<!-- fig.F17.denominador -->
Las {{bib.n}} bibliotecas que ofrece el explorador, con {{bib.entradas}} entradas.

<!-- fig.F17.leyenda.discursos -->
Discursos

<!-- fig.F17.leyenda.debates -->
Debates

<!-- fig.F17.leyenda.sesiones -->
Sesiones

<!-- fig.F17.leyenda.anecdotas -->
Anécdotas y amenazas

<!-- fig.F17.nota -->
{{nombre}} · {{entradas}} entradas en {{sesiones}} sesiones · del {{desde}} al {{hasta}}

<!-- fig.F17.nota.sesion -->
{{nombre}} · {{fecha}}, sesión {{num}} · {{entradas}} entradas

<!-- fig.F17.ficha.oradores -->
Quién tiene más palabras, sin la Presidencia

<!-- fig.F17.ficha.copiar -->
[Copiar el nombre del debate]

<!-- fig.F17.ficha.copiar_bib -->
[Copiar el nombre de la biblioteca]

<!-- fig.F17.ficha.como -->
En el explorador: «Mis bibliotecas › Añadir bibliotecas del proyecto…», y marque esta.

<!-- fig.F17.tabla.col.nombre -->
Biblioteca

<!-- fig.F17.tabla.col.grupo -->
Grupo

<!-- fig.F17.tabla.col.entradas -->
Entradas

<!-- fig.F17.tabla.col.sesiones -->
Sesiones

<!-- fig.F17.tabla.col.desde -->
Desde

<!-- fig.F17.tabla.col.hasta -->
Hasta

<!-- fig.F17.salvedad -->
Una intervención puede estar en más de una biblioteca. Las selecciones de sesiones traen también los sumarios y los comentarios del Diario; los debates, no.

<!-- fig.F17.alt -->
Carriles horizontales sobre los años 1931 a 1945, uno por biblioteca del proyecto, agrupados en discursos, debates, sesiones y anécdotas; cada sesión es una marca, mayor cuantas más entradas trae.

<!-- fig.F17.leyenda.marca -->
Cada marca es una sesión; su altura crece con las entradas que trae (con su raíz cuadrada), y las sesiones con pocas entradas llevan una altura mínima. La más alta, {{max}}.

<!-- fig.F17.leyenda.salto -->
De {{meses.salto.desde|mes}} a {{meses.salto.hasta|mes}}, sin sesiones: el eje se corta.

<!-- fig.F17.abrir -->
Ver su ficha

<!-- fig.F17.ficha.resumen -->
{{entradas}} entradas en {{sesiones}} sesiones, del {{desde}} al {{hasta}}.

<!-- fig.F17.ficha.enteras -->
Reúne sus sesiones enteras: todo lo que se habla en ellas.

<!-- fig.F17.ficha.seleccion -->
Es una selección: solo los tramos de cada sesión que tratan del asunto.

<!-- fig.F17.ficha.acta -->
Trae el acta entera: también el sumario y los comentarios del Diario ({{n}} entradas).

<!-- fig.F17.ficha.descripcion -->
Lo que dice el explorador, sin sus referencias internas

<!-- fig.F17.ficha.criterio -->
Es el nombre que le da el explorador; su criterio no se describe aquí.

<!-- fig.F17.ficha.en_explorador -->
En el explorador se llama «{{nombre}}».

<!-- fig.F17.ficha.palabras -->
{{n}} palabras

<!-- fig.F17.ficha.cerrar -->
Cerrar la ficha

> [nota de diseño] F17: un carril por biblioteca, en cuatro grupos (`fig.F17.leyenda.*`, en ese orden), sobre el eje
> 1931–1945; marca por sesión con tamaño por entradas. Nota emergente con `fig.F17.nota` (carril) o
> `fig.F17.nota.sesion` (marca). Un clic abre la ficha: descripción **sin rutas internas** (el exportador quita las
> frases «Selección y fichas: docs/…» y «Ficha B2 en docs/…»), los cinco con más palabras sin la Presidencia
> (`fig.F17.ficha.oradores`, con la grafía de `grafias.json`) y [Copiar el nombre del debate] con `fig.F17.ficha.como`.
> Los nombres de las bibliotecas van tal cual los da el explorador; sus claves (`L2-B2`…) no se enseñan. Tabla y Datos
> en pestañas; sin JS, carriles y tabla. Comprobado: las tres selecciones de sesiones traen 226, 493 y 25 filas de
> sumario o comentarios; los 26 debates, ninguna.

## 8.5 Coocurrencias

<!-- explorador.coocurrencias.titulo -->
Coocurrencias: de qué se habla dentro de una biblioteca

<!-- explorador.coocurrencias.que_es -->
¿Qué palabras aparecen juntas? El explorador toma el vocabulario característico de la biblioteca y calcula qué términos comparten intervención. Donde esa red se agrupa, propone un tema candidato.

<!-- explorador.coocurrencias.temas -->
Cada tema trae sus términos, cuántas intervenciones lo contienen y qué parte del texto ocupa. Usted lo revisa en la lista, lo marca o lo busca en todo el corpus.

<!-- explorador.coocurrencias.partidos -->
Cada tema lleva también un eje de partidos: cuánto usa cada uno ese vocabulario, en veces la media. Es un eje de temas, no un eje ideológico.

<!-- explorador.coocurrencias.lector -->
En el lector, la opción «Tema» tiñe cada término del color de su tema.

<!-- explorador.coocurrencias.metodo -->
El método está a la vista, con sus parámetros, y los mismos parámetros dan el mismo resultado. La red se calcula y se exporta; no se dibuja.

<!-- explorador.coocurrencias.aviso -->
En una biblioteca de sesiones enteras, no todos los temas son del debate: en las del sufragio salen también la pena de muerte y la huelga.

> [nota de diseño] Captura `coocurrencias` a todo lo ancho, tras `explorador.coocurrencias.partidos`.

## 8.6 Menciones

<!-- explorador.menciones.titulo -->
Menciones: quién nombra a quién

<!-- explorador.menciones.que_es -->
En un debate, los oradores se nombran unos a otros. El explorador reconoce esas menciones y las cuenta entre partidos, por cada diez mil palabras.

<!-- explorador.menciones.solo_matriz -->
También dibuja una red y unos focos de conversación. Aquí no los enseñamos: en este ejemplo toman nombres mal leídos por personas distintas.

<!-- explorador.menciones.limites.titulo -->
Antes de leer la tabla

<!-- explorador.menciones.limites.tono -->
Dice quién nombra a quién, no si lo hace a favor o en contra.

<!-- explorador.menciones.limites.focos -->
Los focos de conversación no son coaliciones.

<!-- explorador.menciones.limites.precision -->
La precisión que declara se midió a mano en otros parlamentos, no en este corpus. No cuenta las referencias indirectas, como «su señoría».

<!-- explorador.menciones.limites.cargos -->
Los cargos citados sin nombre, como «el señor ministro», se quedan sin atribuir.

<!-- explorador.menciones.limites.externos -->
Un nombre mal leído, o escrito de otra forma, cuenta como una persona «externa» a la Cámara.

> [nota de diseño] Decisión D-17 (a): solo la matriz entre partidos (captura `menciones`), con este bloque de límites
> en recuadro con filete. Sin la red, sin «externas» y sin focos. Ninguna figura interactiva.

## 8.7 Llevárselo, citado

<!-- explorador.llevar.titulo -->
Llevárselo, citado

<!-- explorador.llevar.formatos -->
Exporta los resultados a CSV, a un documento legible en Markdown, a JSON y a una lista de referencias. Las bibliotecas se exportan, además, en `.2replib`.

<!-- explorador.llevar.en_cada -->
Cada archivo lleva la cita del corpus. En el CSV va en las líneas de cabecera y en dos columnas de cada fila.

<!-- explorador.llevar.copiar_pasaje -->
Si copia un pasaje con el teclado, el portapapeles se lleva también la fuente.

<!-- explorador.llevar.enlace -->
[Ver cómo citar]

> [nota de diseño] `explorador.llevar.aviso` es el aviso de D-18, decidida el 23-09-2026 (opción b): el aviso se queda
> en esta página, sin marca de pendiente, porque cambiar el explorador está fuera de este trabajo. Se retira solo si el
> autor corrige un día la cita del explorador. [Ver cómo citar cada edición] →
> `/{lang}/datos/versiones/#citar`. Capturas `exportar` (talla media) y `sobre` (talla estrecha, recortada antes de
> «Construido»). Los segmentos finales evitan `cita` y `copiar`, que `lectura.ts` pinta como cita y como botón.

## 8.8 Cómo empezar

<!-- explorador.empezar.titulo -->
Cómo empezar

<!-- explorador.empezar.paso1 -->
**Abra el explorador en un ordenador.** No pide cuenta ni formulario: los Diarios vienen con él.

<!-- explorador.empezar.paso2 -->
**Espere a que prepare la base.** Descarga unos {{explorador.gz.bytes|peso_dec0}} comprimidos y construye la base en su navegador.

<!-- explorador.empezar.paso3 -->
**Busque.** La tecla / lleva al buscador, e Intro lanza la consulta.

<!-- explorador.empezar.botones -->
[Abrir el explorador ↗] [Descargar los datos]

> [nota de diseño] Tres pasos en fila en escritorio y en columna en el móvil. Sin tiempos de carga: dependen del
> equipo. **Sin «Recordar la base»** mientras no se cierre C4. [Descargar los datos] va a `/{lang}/datos/#empezar`.

## 8.9 Lo que pide, y lo que no hace

<!-- explorador.limites.titulo -->
Lo que pide, y lo que no hace

<!-- explorador.no_hace.equipo -->
Pide un ordenador, no un teléfono: en una pantalla estrecha, el lector no cabe.

<!-- explorador.no_hace.significado -->
No busca por significado: encuentra las palabras tal como están escritas. Para las variantes, únalas con `|`.

<!-- explorador.no_hace.operadores -->
El buscador no admite el asterisco, NOT ni la búsqueda por proximidad. El asterisco solo vale en Tendencia.

<!-- explorador.no_hace.mismo_diputado -->
«Mismo diputado» compara palabras, no significados, aunque la ayuda hable de parecido por significado.

<!-- explorador.no_hace.cabecera -->
La sesión corrida no da el número del Diario, las páginas, la Presidencia ni el Gobierno, aunque la ayuda lo anuncie.

<!-- explorador.no_hace.filtros -->
No filtra por sexo ni por tipo de sesión.

<!-- explorador.no_hace.nombres -->
Escribe los nombres de los diputados sin tildes, como están en la base.

<!-- explorador.no_hace.palabras -->
La ayuda, Tendencia y el Léxico dan totales de palabras distintos, porque cuentan de maneras distintas.

<!-- explorador.no_hace.enlace -->
[Ver cómo se cuentan las palabras]

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

> [nota de diseño] Sección `explorador.limites` (su título) con `tambien: no_hace`. Lista literal, sin iconos. Las
> claves `explorador.no_hace.*` son las únicas donde `check-i18n`
> admite «por significado», «NOT», «proximidad» y la cabecera de sesión con «Diario», «páginas», «Presidencia» o
> «Gobierno». [Ver cómo se cuentan las palabras] → `/{lang}/datos/#palabra` (F33). ↺ 7 y ↺ 1 cierran la página: la
> plantilla no debe pintarlas otra vez a mano.

## Pies y textos alternativos de las capturas

> [nota de diseño] Doce capturas de `src/assets/explorador/` (grupo «capturas»; `LEEME.md` con URL, fecha, `build_id`
> `1857031ae8c04b3d` y sha256 del corpus servido), en tema claro sobre `--placa`. El archivo se llama como su clave:
> `busqueda`, `tendencia`, `lector`, `acotaciones`, `corrida`, `careo`, `bibliotecas`, `lexico`, `coocurrencias`,
> `menciones`, `exportar`, `sobre`. Tallas: `bibliotecas` y `exportar`, media; `sobre`, estrecha; el resto, ancha. La
> fecha común de las capturas la pone `comun.captura.pie`.

<!-- explorador.img.busqueda.pie -->
`"voto femenino" | "voto de la mujer"`: {{busqueda.voto_union.n}} intervenciones, del {{busqueda.voto_union.desde|fecha_larga}} al {{busqueda.voto_union.hasta|fecha_larga}}. Encima de la lista, su reparto por ideología.

<!-- explorador.img.busqueda.alt -->
La búsqueda de «voto femenino» o «voto de la mujer» en el explorador: {{busqueda.voto_union.n}} intervenciones, su reparto por ideología y los resultados con la frase resaltada.

<!-- explorador.img.tendencia.pie -->
«Casas viejas» mes a mes en las Constituyentes: nada en enero de 1933, porque no hubo sesiones. En febrero, {{busqueda.casas_viejas.m1933_02}} intervenciones, contando sumarios y comentarios. Con «Solo lo que se habla» y «aplicar filtros», {{busqueda.casas_viejas.m1933_02_habla}}.

<!-- explorador.img.tendencia.alt -->
El panel Tendencia con «casas viejas» mes a mes en las Constituyentes: enero de 1933 rayado, sin sesiones, y la nota de febrero de 1933 con {{busqueda.casas_viejas.m1933_02}} intervenciones.

<!-- explorador.img.lector.pie -->
Clara Campoamor, 1 de octubre de 1931, en el lector: el rótulo del Diario, la ficha de la intervención y los párrafos numerados.

<!-- explorador.img.lector.alt -->
El lector del explorador con la intervención de Clara Campoamor del 1 de octubre de 1931: el rótulo «La señorita CAMPOAMOR», su ficha y el primer párrafo numerado.

<!-- explorador.img.acotaciones.pie -->
La misma intervención, de cerca: los aplausos en verde, un gesto en gris y los rumores en teja, como los anotó el Diario.

<!-- explorador.img.acotaciones.alt -->
Tres párrafos de la intervención de Campoamor en el lector: una acotación de aplausos en verde, un gesto en gris y un bloque de rumores en teja.

<!-- explorador.img.corrida.pie -->
La sesión corrida, con la intervención de Campoamor enmarcada en su sitio.

<!-- ↺ comun.fija.sesion48 -->
La sesión 48 tal como está en el corpus: el final del acta digitalizada se perdió en el reconocimiento óptico.

<!-- explorador.img.corrida.alt -->
La sesión corrida del 1 de octubre de 1931 en el explorador, con la intervención de Clara Campoamor enmarcada en oro como intervención de referencia.

<!-- explorador.img.careo.pie -->
Campoamor frente a Victoria Kent: una réplica propuesta, no un diálogo probado. Arriba, las demás propuestas, entre ellas el sumario y los comentarios del Diario.

<!-- explorador.img.careo.alt -->
El careo del explorador: a la izquierda, la intervención de Clara Campoamor; a la derecha, la de Victoria Kent, marcada como réplica propuesta; arriba, las demás propuestas.

<!-- explorador.img.bibliotecas.pie -->
Las bibliotecas del proyecto, en el diálogo que las añade a las suyas.

<!-- explorador.img.bibliotecas.alt -->
El diálogo del explorador que añade las bibliotecas preparadas por el proyecto, con la del sufragio femenino, de {{bib.sufragio.n}} intervenciones, marcada.

<!-- explorador.img.lexico.pie -->
El léxico de las sesiones del sufragio femenino, 30 de septiembre y 1 de octubre de 1931, frente al resto del corpus. «Pena de muerte» sale justo detrás de «mujer»: son las sesiones enteras.

<!-- explorador.img.lexico.alt -->
La tabla de léxico de la biblioteca del sufragio femenino: «mujer» encabeza la lista y «pena de muerte» va justo detrás.

<!-- explorador.img.coocurrencias.pie -->
Un tema candidato de las sesiones del sufragio, con sus términos y los partidos según cuánto usan ese vocabulario.

<!-- explorador.img.coocurrencias.alt -->
Un tema candidato de las sesiones del sufragio, «mujer española, mujer, femenina»: sus términos y un eje con los partidos según cuánto usan ese vocabulario.

<!-- explorador.img.menciones.pie -->
Menciones entre partidos en las sesiones del sufragio, por cada diez mil palabras. La diagonal es lo que cada partido se nombra a sí mismo.

<!-- explorador.img.menciones.alt -->
Tabla de menciones entre partidos en las sesiones del sufragio, por cada diez mil palabras, con la casilla de cada partido consigo mismo recuadrada.

<!-- explorador.img.exportar.pie -->
Exportar una búsqueda: el CSV lleva la cita en sus líneas de cabecera y en cada fila.

<!-- explorador.img.exportar.alt -->
El diálogo de exportar del explorador: CSV con el texto completo, y un recuadro que explica que el archivo lleva la cita al principio y en cada fila.
