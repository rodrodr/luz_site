# Copy ES · El Diario de Sesiones (`/es/diario/`), F27 y F28

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el mismo de `sesiones.md`. Sigue la
> narrativa § 11 (manda sobre el plan, plantilla F) y el contrato de construcción. Unas 1.500 palabras de copy en
> `<main>` sin contar las listas de F27 y F28 (tope 1.600–2.000; con ellas, unas 1.850), en seis apartados con índice
> lateral.
>
> **Cifras** en `docs/marcadores/diario.md`; **citas** en `docs/marcadores/citas.md` (claves `diario.*`, `f27.*`,
> `f28.*` y dos de `figueres.*`), cada una comprobada letra a letra en su fila V2 y en su fila v3. Las claves con
> `.cita.` son texto del Diario (ver la cabecera de `sesiones.md`).
>
> **Correcciones y ampliaciones sobre la narrativa, comprobadas hoy:**
> - «(Campanilla.)» no está en la V2; se ponen «(Rumores.)», «(Risas.)» y «(Muy bien.)», que sí están;
> - las acotaciones de palabras quitadas por orden de la Presidencia son **cinco**, no tres: tres dicen «no se
>   consigna(n) por orden» y dos «no constan por orden» (V2 103250 y 105310). F28 marca cinco;
> - las órdenes con la fórmula son **ocho**, no siete: el 15-IV-1936 la Presidencia la da tres veces, y una dice «no
>   constarán esas palabras en el Diario» (V2 102486), que la búsqueda pegada no veía. F28 busca «no constará(n)» con
>   «el Diario» en la misma frase: diez filas (ocho órdenes, una petición y una ajena);
> - la cita de Maurín va sin tildes, como en el texto («Hay luz y taquigrafos, los taquigrafos recogeran eso»), y quien
>   apostilla «Pobres taquigrafos» es Comín, que el Diario nombra;
> - la raya de la Presidencia del 8-VI-1934 va pegada, como en el texto: «señores Diputados—no he visto…»;
> - la contradicción de Figueres la resuelve el propio corpus: una nota final dice que el extracto se obtuvo después,
>   en fotocopia (V2 107341 · v3 121465). Ya no queda pendiente del PDF;
> - no se dice que la de Galarza sea «la más conocida» (juicio sin fuente).

---

## 0. Cabecera

<!-- diario.meta.titulo -->
El Diario de Sesiones

<!-- diario.meta.descripcion -->
Qué recoge el Diario de Sesiones de las Cortes de la República, qué calla y cómo citar un pasaje: la fuente de Luz y Taquígrafos, dicha con sus límites.

<!-- diario.antetitulo -->
La fuente

<!-- diario.titulo -->
¿Qué recoge el Diario, y qué calla?

<!-- diario.entrada -->
«Luz y taquígrafos» es la promesa de que lo dicho en el pleno queda escrito. El Diario de Sesiones la cumple casi siempre.

<!-- diario.entrada.2 -->
Casi: la Presidencia podía mandar que unas palabras no constaran, y el taquígrafo no escribe lo que no oye. Esta página cuenta la fuente con sus límites, y cómo citarla.

> [nota de diseño] Índice lateral con los seis apartados (`diario.<sección>.titulo`: `que_es`, `series`, `luz`, `calla`, `habla`, `citar`, las de la plantilla). Figuras: F27 en el apartado 3 y F28 en
> el 4, con sus pestañas Lista · Datos. `NotaBases` (↺ 13) al pie: hay cifras de la v3.

---

## 1. ¿Qué es un Diario de Sesiones?

<!-- diario.que_es.titulo -->
¿Qué es un Diario de Sesiones?

<!-- diario.que_es.entrada -->
Es la versión impresa de cada sesión del pleno, turno a turno. De ella sale cada fila de la base.

> [nota de diseño] Fase 2 (grupo 4): bajo la entrada va el momento «Del Diario impreso a la fila» (`DiarioAFila`): un
> detalle de la p. 1353 del núm. 48, el escaneo del proyecto sin retocar (la tinta, en el color de tinta del sitio), con
> cuatro anotaciones al margen sacadas de la capa de texto del PDF, y las dos filas que salen de ese trozo de papel.
> Sustituye al prototipo P2 de three.js (véase `docs/peticiones/diario-metodo.md`). Claves `diario.que_es.facsimil.*`.

<!-- diario.que_es.facsimil.titulo -->
Del Diario impreso a la fila

<!-- diario.que_es.facsimil.pie -->
Diario de Sesiones de las Cortes Constituyentes, núm. {{sesion.1931-10-01-48.diario_num|id}}, 1 de octubre de 1931, p. {{fuente.facsimil.pagina|id}} (detalle). El escaneo del proyecto, sin retocar: solo se ha quitado la columna de la izquierda.

<!-- diario.que_es.facsimil.alt -->
Detalle de una página impresa del Diario de Sesiones: la Presidencia pide a la Cámara que guarde silencio, y Clara Campoamor le pide que la escuche en silencio.

<!-- diario.que_es.facsimil.pagina -->
El número del Diario y su página: lo que se cita.

<!-- diario.que_es.facsimil.interrupcion -->
Una interrupción, dentro del turno de quien habla.

<!-- diario.que_es.facsimil.rotulo -->
El rótulo del orador abre el turno y corta la fila.

<!-- diario.que_es.facsimil.acotacion -->
Una acotación: lo que el taquígrafo oye en la sala.

<!-- diario.que_es.facsimil.filas -->
Las dos filas que salen de ese trozo de papel

<!-- diario.que_es.facsimil.filas.nota -->
Mismo texto, letra a letra, en la base y en la del explorador. Método cuenta qué trae cada columna.

<!-- diario.que_es.facsimil.col.id -->
Fila

<!-- diario.que_es.facsimil.col.speaker -->
Rótulo impreso

<!-- diario.que_es.facsimil.col.rep_name -->
Diputado, según la base

<!-- diario.que_es.facsimil.col.speech -->
Texto

<!-- diario.que_es.facsimil.col.nwords -->
Palabras

<!-- diario.que_es.rotulo -->
Cada turno empieza con el rótulo impreso del orador: «El Sr. PRESIDENTE:», «La Srta. CAMPOAMOR:». Ese rótulo es el que corta las filas, cuando el etiquetado lo reconoce.

<!-- diario.que_es.acotaciones -->
Entre paréntesis, el taquígrafo anota lo que oye en la sala y no dice ningún orador: «(Rumores.)», «(Risas.)», «(Muy bien.)».

<!-- diario.que_es.interrupcion -->
Si alguien interrumpe, el taquígrafo lo anota entre paréntesis dentro del turno de quien habla:

<!-- diario.que_es.cita.interrupcion -->
«(El Sr. Guerra del Rio: Los cavernicolas hablan de pastel.)»

<!-- diario.que_es.cita.interrupcion.pie -->
En la fila de Victoria Kent, 1 de octubre de 1931

<!-- diario.que_es.interrupcion.2 -->
Por eso una fila puede llevar dentro la voz de otros.

<!-- diario.que_es.votaciones -->
En las votaciones nominales, el Diario imprime la lista de quién dijo sí y quién dijo no, con su total.

<!-- diario.que_es.sumario -->
Cada sesión lleva su sumario, y el Diario imprime también documentos leídos o adjuntos: proposiciones, dictámenes, cartas.

<!-- diario.que_es.v3 -->
El explorador pone ese material en filas propias: {{v3.sumarios}} sumarios y {{v3.comentarios}} filas de comentarios del Diario.

<!-- diario.que_es.v2 -->
La base no tiene filas de sumario; el resto de ese material va dentro de las filas de los oradores, a menudo de la Presidencia.

> [nota de diseño] «Las votaciones nominales» enlaza a `/{lang}/cortes/sesiones/#votaciones` ([Ver las votaciones],
> `comun.boton.ver_votaciones`). Ejemplo al margen, en mono: «V2 5453 · la lista del 1 de octubre de 1931, dentro de
> una fila de la Presidencia» (`diario.que_es.ejemplo`).

<!-- diario.que_es.ejemplo -->
Ejemplo: la lista de la votación del 1 de octubre de 1931 tiene fila propia, de comentarios del Diario.

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

---

## 2. Las series del Diario

<!-- diario.series.titulo -->
Las series del Diario

<!-- diario.series.entrada -->
El corpus reúne {{fuente.series.n|letra}} series impresas: {{fuente.series.diarios|letra}} del Diario completo y {{fuente.series.extractos|letra}} de extractos oficiales.

<!-- diario.series.serie.constituyentes -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, del 14 de julio de 1931 al 3 de octubre de 1933: {{fuente.serie.constituyentes}} sesiones.

<!-- diario.series.serie.cortes -->
Diario de las Sesiones de Cortes. Congreso de los Diputados, del 8 de diciembre de 1933 al 10 de julio de 1936: {{fuente.serie.cortes}} sesiones.

<!-- diario.series.serie.guerra -->
Extracto oficial de las sesiones, del 1 de octubre de 1936 al 1 de febrero de 1939: {{fuente.serie.extracto_guerra|letra}} sesiones.

<!-- diario.series.serie.mexico -->
Extracto oficial de las sesiones de Cortes celebradas en México, de enero a noviembre de 1945: {{fuente.serie.extracto_mexico|letra}} sesiones.

<!-- diario.series.numero -->
Dentro de cada legislatura, el número del Diario es el de la sesión: el Diario núm. {{sesion.1931-10-01-48.diario_num|id}} de las Constituyentes es la sesión {{sesion.1931-10-01-48.num|id}}.

<!-- diario.series.verificada -->
Las páginas de una sesión se dan por verificadas cuando su numeración enlaza con la del Diario anterior y la del siguiente; si no enlaza, no se dan.

<!-- diario.series.extractos -->
Después de julio de 1936 no hay Diario completo, solo extractos oficiales.

<!-- diario.series.paginas -->
Las páginas del Diario están verificadas en {{fuente.paginas.verificadas}} de las {{fuente.paginas.den}} sesiones: todas las anteriores a la guerra.

<!-- diario.series.total -->
Los archivos del proyecto suman {{fuente.paginas.total}} páginas digitalizadas.

<!-- ↺ comun.sello.proyecto -->
Metadatos del proyecto (no depositados; el explorador no los muestra)

> [nota de diseño] Las cuatro series van como lista de calendario (nombre de la serie · recuento al margen), sin
> tarjetas. El sello `comun.sello.proyecto` va junto al apartado entero: series, páginas y recuento salen de
> `sessions.json`. «Comprobadas»: los estados `contiguous`, `verso_blank` y `corrected`; las catorce restantes,
> de octubre de 1936 a 1945, están `unverified`.

---

## 3. «Luz y taquígrafos», diez veces (F27)

<!-- diario.indice.luz -->
«Luz y taquígrafos»

<!-- diario.luz.titulo -->
«Luz y taquígrafos», {{f27.n|letra}} veces

<!-- diario.luz.entrada -->
La fórmula pide que algo se trate en público y quede escrito. Aparece en {{f27.n|letra}} filas de la base, entre 1931 y 1936.

<!-- diario.luz.escena -->
El 8 de junio de 1934 se discute un suplicatorio. La Presidencia recuerda la regla:

<!-- diario.luz.cita.secreta -->
«Con arreglo al Reglamento, los suplicatorios han de tratarse en sesión secreta;»

<!-- diario.luz.cita.secreta.pie -->
La Presidencia (Alba)

<!-- diario.luz.escena.2 -->
Una voz interrumpe con {{cita.diario.grito.palabras|letra}} palabras, que son una fila entera:

<!-- diario.luz.cita.grito -->
«Luz y taquigrafos.»

<!-- diario.luz.cita.grito.pie -->
El Diario la atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ». Sin tilde, como en la fila: así salió del reconocimiento óptico.

<!-- diario.luz.escena.3 -->
La base identifica a ese orador con el diputado de la CEDA por Badajoz Manuel Giménez Fernández. La Presidencia contesta:

<!-- diario.luz.cita.reglamento -->
«El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías…»

<!-- diario.luz.cita.reglamento.pie -->
La Presidencia (Alba)

<!-- diario.luz.escena.4 -->
Prieto responde por los socialistas:

<!-- diario.luz.cita.prieto -->
«La minoría socialista no tiene inconveniente en que esto se discuta públicamente.»

<!-- diario.luz.cita.prieto.pie -->
Indalecio Prieto

> [nota de diseño] La escena va entera, en cuatro filas seguidas del Diario (V2 71329–71332 · v3 80305–80308), con un
> filete fino entre ellas. El nombre de `diario.luz.escena.3` sale de la tabla de grafías (`rep_id` 456; D-22, adoptada
> el 23-09-2026): la base escribe «Manuel Jimenez Fernandez» y el Diario imprime «JIMÉNEZ FERNÁNDEZ»; la tabla da
> «Manuel Giménez Fernández», grafía probable, que se adopta. Que Alba diga no haber visto quién interrumpe es la
> salvedad de la atribución: se deja a la vista.

<!-- diario.luz.royo -->
En agosto de 1933, Royo Villanova la había atribuido a Maura:

<!-- diario.luz.cita.royo -->
«…aquí se liquida todo con luz y taquigrafos, como decía Maura…»

<!-- diario.luz.cita.royo.pie -->
Antonio Royo Villanova, 3 de agosto de 1933

<!-- diario.luz.royo.salvedad -->
La atribución es suya. De dónde viene la fórmula, este sitio no lo afirma.

<!-- diario.luz.maurin -->
La última vez es del 8 de julio de 1936, y la contestan desde los escaños:

<!-- diario.luz.cita.maurin -->
«Hay luz y taquigrafos, los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)»

<!-- diario.luz.cita.maurin.pie -->
Joaquín Maurín

<!-- diario.luz.balbontin -->
Nadie la repite tanto como José Antonio Balbontín: {{f27.balbontin|letra}} de las {{f27.n|letra}} filas son suyas.

<!-- diario.luz.lectura -->
Leídas una a una, en las {{f27.n|letra}} la fórmula pide lo mismo: que algo se diga o se haga a la vista, y quede escrito.

> [nota de diseño] Aquí va F27 (§ 7 de este archivo). Las citas van sin tildes en «taquigrafos», como en el texto
> digitalizado; el título y la prosa las llevan.

---

## 3 bis. El aplausómetro (juego)

> [nota de diseño] Juego de la petición del investigador (24-09-2026): `components/diario/Aplausometro.astro`. Las
> veinte frases y sus acotaciones salen de `src/data/aplausos.json` (exportador/modulos/aplausos.py), letra a letra de
> su fila; cada partida saca dos de cada acotación. Sin cuentas de acotaciones por clase (D-11). Sin JS, una tabla.

<!-- diario.indice.aplausos -->
El aplausómetro

<!-- diario.aplausos.titulo -->
El aplausómetro

<!-- diario.aplausos.entrada -->
Entre paréntesis, el taquígrafo anota cómo recibe la Cámara lo que oye. Estas frases son reales, cada una con su fila: adivine qué anotó.

<!-- diario.aplausos.juego.pregunta -->
¿Qué anotó el taquígrafo?

<!-- diario.aplausos.juego.op.aplausos -->
[Aplausos]

<!-- diario.aplausos.juego.op.muy_bien -->
[Muy bien]

<!-- diario.aplausos.juego.op.risas -->
[Risas]

<!-- diario.aplausos.juego.op.rumores -->
[Rumores]

<!-- diario.aplausos.juego.op.protestas -->
[Protestas]

<!-- diario.aplausos.juego.cuenta -->
Frase {{i}} de {{n}} · Aciertos: {{a}}

<!-- diario.aplausos.juego.quien -->
{{orador}} ({{partido}}), {{fecha}}

<!-- diario.aplausos.juego.exacto -->
¡Exacto!

<!-- diario.aplausos.juego.cerca -->
Casi: el sentido era ese.

<!-- diario.aplausos.juego.fallo -->
No.

<!-- diario.aplausos.juego.anoto -->
El taquígrafo anotó:

<!-- diario.aplausos.juego.fila -->
Fila {{id}} de la base

<!-- diario.aplausos.juego.siguiente -->
[Siguiente]

<!-- diario.aplausos.juego.ver -->
[Ver el resultado]

<!-- diario.aplausos.juego.resumen -->
Ha acertado {{n}} de {{total}}.

<!-- diario.aplausos.juego.dedica -->
La Cámara le dedica:

<!-- diario.aplausos.juego.veredicto.0 -->
(Protestas.)

<!-- diario.aplausos.juego.veredicto.1 -->
(Rumores.)

<!-- diario.aplausos.juego.veredicto.2 -->
(Muy bien.)

<!-- diario.aplausos.juego.veredicto.3 -->
(Aplausos.)

<!-- diario.aplausos.juego.veredicto.4 -->
(Grandes y prolongados aplausos.)

<!-- diario.aplausos.juego.otra -->
[Otra sesión]

<!-- diario.aplausos.juego.tabla -->
Las frases del juego y lo que anotó el taquígrafo

<!-- diario.aplausos.juego.tabla.col.frase -->
Frase

<!-- diario.aplausos.juego.tabla.col.quien -->
Quién y cuándo

<!-- diario.aplausos.juego.tabla.col.acotacion -->
Acotación

<!-- diario.aplausos.juego.leccion -->
Ninguna columna de la base guarda estas reacciones: están en el texto, entre paréntesis, tal como las anotó el taquígrafo.

---

## 4. Lo que el Diario calla (F28)

<!-- diario.calla.titulo -->
Lo que el Diario calla

<!-- diario.calla.entrada -->
Un diputado lo recuerda en 1934, al hablar del Reglamento de la Cámara:

<!-- diario.calla.cita.sainz -->
«…ese Reglamento determina que el Presidente puede incluso mandar callar a un Diputado, puede ordenar que no consten en el Diario de Sesiones sus palabras…»

<!-- diario.calla.cita.sainz.pie -->
Pedro Sainz Rodríguez, 5 de diciembre de 1934

<!-- diario.calla.formula -->
«No constará» o «no constarán», seguidas de «el Diario» en la misma frase, aparecen en {{f28.formula.filas|letra}} filas de la base.

<!-- diario.calla.ordenes -->
De ellas, {{f28.ordenes|letra}} son órdenes de la Presidencia.

<!-- diario.calla.ordenes.1936 -->
De esas órdenes, {{f28.ordenes.1936|letra}} son de abril a julio de 1936.

<!-- diario.calla.abril -->
El 15 de abril de 1936, tras una protesta de Calvo Sotelo, la Presidencia da la orden {{f28.15abril.ordenes|letra}} veces en pocos turnos. Varios diputados contestan:

<!-- diario.calla.cita.abril -->
«Eso no basta.»

<!-- diario.calla.cita.abril.pie -->
Varios diputados

<!-- diario.calla.peticion -->
Otra es la petición de un diputado: Calvo Sotelo, el 3 de junio de 1936, pide que no consten unas palabras contra las «hermanas de la Caridad».

<!-- diario.calla.ajena -->
La que queda usa la fórmula en otro sentido, y no cuenta.

<!-- diario.calla.acotaciones -->
El taquígrafo lo anota también entre paréntesis. En {{f28.acotaciones|letra}} acotaciones, todas de mayo a julio de 1936, escribe que unas palabras «no se consignan» o «no constan» por orden de la Presidencia.

<!-- diario.calla.galarza -->
La del 1 de julio de 1936 corta a Galarza a media frase: la cuenta la puerta «La antesala».

<!-- diario.calla.prieto -->
No todos querían ese silencio. El 7 de febrero de 1933, Besteiro ordena que unas palabras no consten, y Prieto contesta:

<!-- diario.calla.cita.prieto -->
«Por mí, que consten.»

<!-- diario.calla.cita.prieto.pie -->
Indalecio Prieto

> [nota de diseño] Aquí va F28 (§ 8 de este archivo). «La antesala» enlaza a `/{lang}/cortes/sesiones/antesala-1936/` (sin corchetes: no es un rótulo único).

<!-- diario.calla.tachado -->
No todo lo que se quita deja rastro. En febrero de 1935, un diputado protesta porque no encuentra en el Diario lo que dijo:

<!-- diario.calla.cita.tachado -->
«…eso se ha tachado en el Diario de Sesiones.»

<!-- diario.calla.cita.tachado.pie -->
Dionisio Cano López, 19 de febrero de 1935

<!-- diario.calla.tachado.2 -->
Es su queja; el Diario no permite comprobarla.

<!-- diario.calla.no_oye -->
Lo que el taquígrafo no oye tampoco queda. En {{fuente.no_perciben.filas}} filas de la base, el Diario anota que alguien «pronuncia palabras que no se perciben».

<!-- diario.calla.no_oye.ejemplo -->
El 6 de mayo de 1936 pasan las dos cosas en un mismo pasaje:

<!-- diario.calla.cita.no_oye -->
«(Un Sr. Diputado pronuncia palabras que no se perciben)» … «Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.»

<!-- diario.calla.cita.no_oye.pie -->
Acotaciones en la fila de Calvo Sotelo

<!-- diario.calla.ausencias -->
Lo que el Diario no recoge no existe para ninguna cuenta de la base.

<!-- diario.calla.ausencias.ibarruri -->
La frase que a veces se atribuye a Dolores Ibárruri el 16 de junio de 1936, «Este hombre ha hablado por última vez», no aparece en ninguna fila.

<!-- diario.calla.ausencias.barriga -->
Buscada en el corpus, «tiros a la barriga» no sale en 1933: la primera fila que la trae es un grito del 31 de mayo de 1934.

> [nota de diseño] Las dos ausencias enlazan a sus puertas (`antesala-1936` y `casas-viejas-1933`), donde van con su
> pie. «A veces se atribuye» espera su referencia [A] en la puerta de bibliografía; sin ella, la frase se queda en lo
> que prueba el corpus. Lo que otras fuentes cuentan del 9 de octubre de 1934 (narrativa § 11.4) NO va en la 0.1: no
> tiene aún referencia (`peticiones/sesiones.md`).

<!-- ↺ comun.fija.contar -->
Contar una palabra no dice quién la defiende ni en qué tono.

---

## 5. La fuente habla de sí misma

<!-- diario.habla.titulo -->
La fuente habla de sí misma

<!-- diario.habla.entrada -->
El Diario no solo recoge lo que se dice: también deja notas sobre sí mismo, y los diputados lo usan como registro.

<!-- diario.habla.nota -->
El volumen de la guerra se abre con una nota:

<!-- diario.habla.cita.volumen -->
«EN ESTE VOLUMEN FIGURAN LOS EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO.»

<!-- diario.habla.cita.volumen.pie -->
Nota del volumen, en el sumario del 1 de octubre de 1936

<!-- diario.habla.figueras -->
Sigue diciendo que de la sesión de Figueras «NO EXISTE DATO ALGUNO». Otra nota, al final del extracto de esa sesión, lo corrige:

<!-- diario.habla.cita.fotocopia -->
«Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión…»

<!-- diario.habla.cita.fotocopia.pie -->
Nota final del extracto del 1 de febrero de 1939

<!-- diario.habla.liberacion -->
La primera nota habla además de la «LIBERACION DE BARCELONA» del 26 de enero de 1939. Quién la escribió, y cuándo, está por cotejar en el volumen impreso.

<!-- diario.habla.mexico -->
La carátula del volumen de México avisa de lo que falta: de las reuniones de la Diputación Permanente allí, «no se dispone de los textos ni en forma de fotocopia».

<!-- diario.habla.mexico.pie -->
Carátula del volumen de México

<!-- diario.habla.censura -->
Los diputados también defendían el Diario fuera de la Cámara. En febrero de 1935, Honorio Maura pide por escrito al ministro de la Gobernación que la censura cumpla un acuerdo de las Cortes:

<!-- diario.habla.cita.censura -->
«…que los textos integros tomados del Diario de Sesiones no sean tachados ni mutilados por aquélla…»

<!-- diario.habla.cita.censura.pie -->
Ruego escrito de Honorio Maura, 20 de febrero de 1935

<!-- diario.habla.registro -->
Los diputados también leen el Diario y lo citan: el «Diario de Sesiones» aparece en {{fuente.cita_diario.filas}} filas de la base.

<!-- diario.habla.campoamor -->
Campoamor, el 1 de octubre de 1931, responde a un discurso que no oyó:

<!-- diario.habla.cita.campoamor -->
«En ausencia mía y leyendo el Diario de Sesiones, pude ver en él que un doctor hablaba aquí de que no había ecuación posible…»

<!-- diario.habla.cita.campoamor.pie -->
Clara Campoamor

> [nota de diseño] Las dos notas del volumen se pintan una frente a otra, en mayúsculas como en el original. La
> puerta «Figueres» cuenta la sesión. `diario.habla.registro` cuenta filas V2 con «diario de sesiones» sobre el texto sin
> acentos: incluye también las órdenes de F28, que nombran el Diario.

---

## 6. Cómo citar un pasaje · ancla `#citar`

<!-- diario.citar.titulo -->
Cómo citar un pasaje

<!-- diario.citar.entrada -->
Cite el Diario, no la base. Dé la serie, el número, la fecha y las páginas. Si ha trabajado con la base, añada el id de la fila.

<!-- diario.citar.paginas -->
Número y páginas salen de los metadatos del proyecto. El explorador no los muestra, y después de julio de 1936 las páginas están sin verificar.

<!-- diario.citar.ejemplo -->
Ejemplo, con la fila de Campoamor:

<!-- diario.citar.cita -->
Diario de Sesiones de las Cortes Constituyentes de la República Española, núm. {{sesion.1931-10-01-48.diario_num|id}}, 1 de octubre de 1931, pp. {{sesion.1931-10-01-48.paginas}} (metadatos del proyecto). Luz y Taquígrafos, fila {{cita.sufragio.campoamor.ciudadana.V2|id}}.

> [nota de diseño] `diario.citar.cita` se pinta como cita copiable. Es `comun.cita.pasaje` rellenado con: diario = «Diario de Sesiones de
> las Cortes Constituyentes de la República Española»; numero = `sesion.1931-10-01-48.diario_num`; fecha = «1 de
> octubre de 1931»; paginas = `sesion.1931-10-01-48.paginas`; edicion = «edición depositada (V2)»; id =
> `cita.sufragio.campoamor.ciudadana.V2`. Con [Copiar la cita] (`comun.boton.cita`). Debajo, ↺ 4 y ↺ 1.

<!-- ↺ comun.fija.diario -->
Edición derivada para investigación: ante cualquier discrepancia, vale el Diario de Sesiones.

---

## 7. F27 · «Luz y taquígrafos», diez veces (textos de la figura)

> [nota de diseño] Datos: `diario.json › f27` (exportador, módulo `diario.py`): las diez filas V2 con su par v3, fecha,
> orador según la base y el fragmento literal (`citas.md`, claves `f27.1`–`f27.10`). Línea de tiempo 1931–1936 con
> una marca por fila; los años sin marca no se colorean. Sin JS, la lista. Pestañas Gráfico · Tabla · Datos (la Tabla es
> la lista, con las citas enteras); la nota emergente va en tres líneas (`.nota.t` · `.nota` · `.nota.b`).

<!-- fig.F27.titulo -->
«Luz y taquígrafos», {{f27.n|letra}} veces

<!-- fig.F27.pregunta -->
¿Cuándo invocaron los diputados la fórmula?

<!-- fig.F27.leyenda -->
Una marca por fila del Diario en que aparece «luz y taquígrafos», de 1931 a 1936.

<!-- fig.F27.nota.t -->
«{{fragmento}}»

<!-- fig.F27.nota -->
{{fecha}} · {{orador}}

<!-- fig.F27.orador.atribuido -->
«El Sr. JIMÉNEZ FERNÁNDEZ», según el Diario

<!-- fig.F27.meses.con -->
Mes con sesiones del pleno

<!-- fig.F27.meses.sin -->
Mes sin sesión

<!-- fig.F27.anota.grito -->
El 8 de junio de 1934, la fórmula es una fila entera: {{cita.diario.grito.palabras|letra}} palabras.

<!-- fig.F27.anota.balbontin -->
{{f27.balbontin|letra}} de las {{f27.n|letra}} son de José Antonio Balbontín, de 1932 y 1933.

<!-- fig.F27.anota.guerra -->
Ninguna después de julio de 1936: ni los extractos de la guerra ni los de México la traen.

<!-- fig.F27.tabla.col.fecha -->
Fecha

<!-- fig.F27.tabla.col.orador -->
Quién, según la base

<!-- fig.F27.tabla.col.fragmento -->
Lo que dice

<!-- fig.F27.tabla.col.filas -->
Fila

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
<!-- fig.F27.cita.6.pie --> 8-VI-1934 · el Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ»
<!-- fig.F27.cita.7 --> «…no hay ningún reparo, ningún obstaculo ni ninguna dificultad para que se examine el presupuesto con luz y taquigrafos…»
<!-- fig.F27.cita.7.pie --> 13-XI-1934 · Abilio Calderón
<!-- fig.F27.cita.8 --> «…que realiza el Parlamento suele decir que hacen falta “luz y taquigrafos”…»
<!-- fig.F27.cita.8.pie --> 29-I-1935 · Santiago Fuentes Pila
<!-- fig.F27.cita.9 --> «El que está agazapado en su escaño, con luz y taquigrafos, naturalmente que no quiere valerse de nocturnidad ni de obscuridad de ninguna clase.»
<!-- fig.F27.cita.9.pie --> 22-XI-1935 · José Calvo Sotelo
<!-- fig.F27.cita.10 --> «Hay luz y taquigrafos, los taquigrafos recogeran eso.»
<!-- fig.F27.cita.10.pie --> 8-VII-1936 · Joaquín Maurín

<!-- fig.F27.salvedad -->
Búsqueda de la expresión sobre el texto sin acentos; las variantes mal leídas por el reconocimiento óptico no se cuentan. El origen de la fórmula no se afirma aquí.

<!-- fig.F27.alt -->
Línea de tiempo de 1931 a 1936 con {{f27.n|letra}} marcas, una por cada fila en que un diputado dice «luz y taquígrafos». La lista está en la pestaña «Lista».

<!-- fig.F27.leame.que_mide -->
Las filas de la base en que aparece la expresión «luz y taquígrafos», con su fecha, su orador según la base y el fragmento.

<!-- fig.F27.leame.denominador -->
No hay denominador: es una lista de filas.

<!-- fig.F27.leame.columnas -->
fecha, num_session, orador_rotulo, rep_id, rep_name, party, fragmento, id_V2, id_v3.

<!-- fig.F27.leame.salvedad -->
Expresión buscada sobre el texto sin acentos ni mayúsculas. El reconocimiento óptico puede haber roto alguna aparición: es una cota inferior.

---

## 8. F28 · Lo que el Diario calla (textos de la figura)

> [nota de diseño] Datos: `diario.json › f28` (módulo `diario.py`). Línea de tiempo 1931–1936 con trece marcas: las
> ocho órdenes (relleno), las cinco acotaciones (otro trazo, no solo otro color) y, en contorno, la petición de Calvo
> Sotelo. La fila ajena (V2 64659) NO se dibuja; va en la tabla, rotulada. Cambio sobre el plan, que decía diez
> marcas: son trece, porque las órdenes son ocho (la fórmula se busca con «el Diario» en la misma frase, no pegado:
> así entra «no constarán esas palabras en el Diario», V2 102486) y las acotaciones, cinco (tres «no se consigna(n)» y
> dos «no constan»).

<!-- fig.F28.titulo -->
Lo que el Diario calla

<!-- fig.F28.pregunta -->
¿Qué ordenó la Presidencia que no constara en el Diario?

<!-- fig.F28.leyenda.orden -->
Orden de la Presidencia: «no constarán en el Diario».

<!-- fig.F28.leyenda.acotacion -->
Acotación del taquígrafo: palabras que «no se consignan» o «no constan» por orden de la Presidencia.

<!-- fig.F28.leyenda.peticion -->
En contorno, un diputado que lo pide.

<!-- fig.F28.nota.t -->
«{{fragmento}}»

<!-- fig.F28.nota.orden -->
{{fecha}} · orden de la Presidencia ({{preside}})

<!-- fig.F28.nota.acotacion -->
{{fecha}} · acotación del taquígrafo, en la fila de {{orador}}

<!-- fig.F28.nota.peticion -->
{{fecha}} · lo pide {{orador}}

<!-- fig.F28.lupa -->
Del 16 de marzo al 10 de julio de 1936, día a día

<!-- fig.F28.anota.abril -->
El 15 de abril de 1936, la Presidencia da la orden {{f28.15abril.ordenes|letra}} veces en la misma sesión.

<!-- fig.F28.anota.primavera -->
De abril a julio de 1936: {{f28.ordenes.1936|letra}} de las {{f28.ordenes|letra}} órdenes y las {{f28.acotaciones|letra}} acotaciones.

<!-- fig.F28.tabla.col.fecha -->
Fecha

<!-- fig.F28.tabla.col.tipo -->
Qué es

<!-- fig.F28.tabla.col.quien -->
Preside · en la fila de

<!-- fig.F28.tabla.col.fragmento -->
Lo que dice el Diario

<!-- fig.F28.tabla.col.filas -->
Fila

<!-- fig.F28.tipo.orden -->
Orden de la Presidencia

<!-- fig.F28.tipo.acotacion -->
Acotación del taquígrafo

<!-- fig.F28.tipo.peticion -->
Petición de un diputado

<!-- fig.F28.tipo.ajena -->
La fórmula en otro sentido; no se dibuja

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
<!-- fig.F28.cita.acotacion.1.pie --> 6-V-1936 · en la fila de Jesús Pabón
<!-- fig.F28.cita.acotacion.2 --> «Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.»
<!-- fig.F28.cita.acotacion.2.pie --> 6-V-1936 · en la fila de Calvo Sotelo
<!-- fig.F28.cita.acotacion.3 --> «(El orador pronuncia palabras que no constan por orden del Sr. Presidente…»
<!-- fig.F28.cita.acotacion.3.pie --> 16-VI-1936 · en la fila de Calvo Sotelo
<!-- fig.F28.cita.acotacion.4 --> «(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)»
<!-- fig.F28.cita.acotacion.4.pie --> 16-VI-1936 · en la fila de Fernando Suárez de Tangil
<!-- fig.F28.cita.acotacion.5 --> «(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)»
<!-- fig.F28.cita.acotacion.5.pie --> 1-VII-1936 · en la fila de Ángel Galarza
<!-- fig.F28.cita.peticion --> «…ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones.»
<!-- fig.F28.cita.peticion.pie --> 3-VI-1936 · José Calvo Sotelo
<!-- fig.F28.cita.ajena --> «…por parecerne injusto que no constara en el Diario de Sesión…»
<!-- fig.F28.cita.ajena.pie --> 21-II-1934 · Luis Rodríguez de Viguri · la fórmula en otro sentido; no se dibuja

<!-- fig.F28.salvedad -->
Al menos: las variantes del reconocimiento óptico no se detectan. La búsqueda exacta de la frase en plural devuelve {{f28.fts_plural|letra}} filas, que no son las mismas {{f28.ordenes|letra}}.

<!-- fig.F28.alt -->
Línea de tiempo de 1931 a 1936 con {{f28.ordenes|letra}} órdenes de la Presidencia, {{f28.acotaciones|letra}} acotaciones del taquígrafo y una petición de un diputado. La lista está en la pestaña «Lista».

<!-- fig.F28.leame.que_mide -->
Las filas en que la Presidencia ordena que unas palabras no consten en el Diario, las acotaciones que lo anotan y una petición de un diputado.

<!-- fig.F28.leame.denominador -->
No hay denominador: es una lista construida leyendo las filas una a una. La columna `tipo` dice orden, acotación, petición o ajena.

<!-- fig.F28.leame.columnas -->
fecha, num_session, tipo, preside, orador_fila, fragmento, id_V2, id_v3.

<!-- fig.F28.leame.salvedad -->
Cota inferior: la búsqueda no ve las variantes que el reconocimiento óptico escribió mal, ni otras fórmulas para lo mismo.

---

## Anexo A · Recuentos y comprobaciones (no se publica)

- **Palabras de copy en `<main>`** (§ 0–6, sin rótulos de figura ni pies en mono): unas 1.500; con las listas de F27
  y F28, que se leen sin JS, unas 1.850. Tope 1.600–2.000.
- **Frases de más de 30 palabras:** ninguna en la prosa; las citas largas del Diario no cuentan.
- **Palabras vetadas:** ninguna. «Presidencia» se usa como cargo. «Defiende» solo aparece dentro de ↺ 6.
- **Cifras tecleadas en prosa:** ninguna fuera de las citas; las series, las palabras del grito y las órdenes de 1936
  van con marcador (`fuente.series.*`, `cita.diario.grito.palabras`, `f28.ordenes.1936`).
