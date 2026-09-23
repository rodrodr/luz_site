# Citas literales · sesiones, puertas y El Diario

> **Para el aserto de la compilación** (`exportador/exportar.py › valida_citas` y `src/data/citas.json`). Cada cita es
> una lista de **fragmentos**; cada fragmento está, letra a letra, en el `speech` de su fila V2 **y** en el de su fila
> v3 (o solo en una, cuando la otra edición no trae esa fila: la columna lo dice). Comprobado el 22-09-2026 con
> `docs/marcadores/comprobar_sesiones_diario.py` sobre la V2 (MD5 `360332a0…`) y la v3 (sha256 `3a0d8b2d…`):
> **105 citas, 116 fragmentos, ninguno falla**. También se comprueba que la fecha de cada fila es la de la cita y que,
> si hay varios fragmentos, van en ese orden dentro de la fila.
>
> **Cómo se pasa del fragmento a lo que lee el lector** (lo que el aserto debe aceptar y nada más): el copy pone la cita
> entre «»; puede cortar con «…» (entre fragmentos o en los bordes), puede insertar «[sic]» (errata que cambia el
> sentido) y escribe “ ” donde el texto trae comillas rectas ("). Nada más cambia: ni tildes, ni mayúsculas, ni
> puntuación. Las erratas del reconocimiento óptico se conservan («taquigrafos», «quien», «Si, prometo»,
> «novceientos»).
>
> **Saltos de línea.** Dos fragmentos llevan saltos de línea del texto (`\n`); en la tabla se ven como `⏎`. El bloque
> JSON del final es la fuente para las máquinas.
>
> Las cifras de las citas (ids y palabras) están en `marcadores/sesiones.md` § 7 y `marcadores/diario.md` § 3 como
> `cita.<clave>.V2`, `.v3` y `.palabras`.


## Puerta `sufragio-1931`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `sufragio.kent` | 5419 | 6074 | Victoria Kent · 1931-10-01 | `que creo que el voto femenino debe aplazarse.` |  |
| `sufragio.presidencia` | 5423 | 6078 | La Presidencia (Besteiro) · 1931-10-01 | `Ruego a la Cámara que guarde silencio.` |  |
| `sufragio.campoamor.silencio` | 5424 | 6079 | Clara Campoamor · 1931-10-01 | `Yo ruego a la Cámara que me escuche en silencio` | el original sigue con «;»: se corta con «…» |
| `sufragio.campoamor.ciudadana` | 5424 | 6079 | Clara Campoamor · 1931-10-01 | `Yo, Sres. Diputados, me siento ciudadana antes que mujer, y considero que sería un profundo error político dejar a la mujer al margen de ese derecho` |  |
| `sufragio.resultado` | 5453 | 6110 | Diario (lista de la votación) · 1931-10-01 | `Total, 161.` ‖ `Total, 121.` | dos fragmentos unidos por «…» |
| `sufragio.ordinaria` | 5453 | 6110 | Diario · 1931-10-01 | `En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106.` |  |
| `sufragio.art34` | 5453 | 6110 | Diario · 1931-10-01 | `art. 34 (numeración antigua) del dictamen de la Comisión` |  |
| `sufragio.lista.campoamor` | 5453 | 6110 | Diario (lista del sí) · 1931-10-01 | `Srta. Campoamor.` | está antes de «Total, 161.» |
| `sufragio.lista.kent` | 5453 | 6110 | Diario (lista del no) · 1931-10-01 | `Srta. Victoria Kent.` | está entre «Total, 161.» y «Total, 121.» |
| `sufragio.art34.texto` | 12785 | 14216 | Clara Campoamor · 1931-12-01 | `Los ciudadanos de uno y otro sexo, mayores de veintitrés años, tendrán los mismos derechos electorales` | v3 se busca por texto |
| `sufragio.final` | 5792 | 6464 | Diario (final truncado) · 1931-10-01 | `El Sr. Ministro de` | la fila TERMINA así |
| `sufragio.campoamor.antes` | 5422 | 6077 | Clara Campoamor · 1931-10-01 | `Sres. Diputados, lejos yo de censurar ni de atacar las manifestaciones de mi colega, Srta. Kent;` |  |

## Puerta `cuestion-religiosa-1931`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `religiosa.azana` | 6748 | 7531 | Manuel Azaña · 1931-10-13 | `España ha dejado de ser católica: el problema político consiguiente es organizar el Estado en forma tal que puede` ‖ `adecuado a esta fase nueva e histórica del pueblo español.` | [sic] entre los dos fragmentos |
| `religiosa.resultado` | 6994 | 7800 | Diario · 1931-10-13 | `quedó aprobado el artículo 24 por 178 votos contra 59` |  |
| `religiosa.lista.no` | 6994 | 7800 | Diario (lista del no) · 1931-10-13 | `Señores que han dicho no:⏎⏎Alcalá-Zamora.⏎⏎Maura.` | comprobación, no se cita |
| `religiosa.cierre` | 6999 | 7807 | Diario · 1931-10-13 | `Eran las siete y treinta y cinco minutos de la mañana del día 14.` |  |
| `religiosa.apertura` | — (no está en la V2) | 7387 | Sumario · 1931-10-13 | `Abierta la sesión a las cuatro y treinta minutos de la tarde` | solo v3 (sumario) |
| `religiosa.art24` | 6628 | 7398 | Lectura del Secretario (Ramos) · 1931-10-13 | `Art. 24. Todas las confesiones religiosas serán consideradas como Asociaciones sometidas a una ley especial.` | en la v3, fila de comentarios |

## Puerta `estatuto-1932`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `estatuto.v2.palabra` | 25979 | 29041 | La Presidencia (Besteiro) · 1932-05-27 | `El Sr. Presidente del Consejo de Ministros tiene la palabra.` |  |
| `estatuto.v2.rotulo` | 25979 | — (solo V2) | rótulo cortado dentro de la fila V2 · 1932-05-27 | `El Sr. Presidente del CONSEJO DE MINIS⏎` | solo V2: en la v3 es el orador de la fila 29042 |
| `estatuto.azana` | 25979 | 29042 | Manuel Azaña · 1932-05-27 | `Cataluña dice, los catalanes dicen: “quieremos` ‖ `vivir de otra manera dentro del Estado español”. La pretensión es legítima; es legítima porque la autoriza la ley, nada menos que la ley constitucional.` | [sic] tras «quieremos» |

## Puerta `casas-viejas-1933`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `casasviejas.azana.hurgue` | 44922 | 50255 | Manuel Azaña · 1933-02-02 | `por mucho que se hurgue no se encontrará un atisbo de responsabilidad para el Gobierno.` |  |
| `casasviejas.azana` | 44922 | 50255 | Manuel Azaña · 1933-02-02 | `En Casas Viejas no ha ocurrido sino lo que tenía que ocurrir. (Fuertes rumores y protestas en los bancos de las minorías; contraprotestas en la mayoría.)` |  |
| `casasviejas.barriga` | 70714 | 79606 | Varios diputados (acotación en la fila de José Tomás y Piera) · 1934-05-31 | `Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!` |  |
| `casasviejas.martinezbarrio` | 46426 | 51919 | Diego Martínez Barrio · 1933-02-23 | `nos dijo: "En los sucesos de Casas Viejas, Sres. Diputados, por mucho que se hurgue` |  |

## Puerta `pistola-1934`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `pistola.prieto.golpes` | 74619 | 84039 | Indalecio Prieto · 1934-07-04 | `Estos incidentes limitados a palabras son corrientes; el de hoy se ha convertido en golpes.` |  |
| `pistola.prieto` | 74619 | 84039 | Indalecio Prieto · 1934-07-04 | `es exacto, Sr. Presidente, que ha salido a luz alguna pistola, por lo menos la mía` |  |
| `pistola.oriol` | 74621 | 84041 | Jaime Oriol de la Puerta · 1934-07-04 | `Invito al Sr. Prieto a que diga quien ha sacado la pistola; lo que es un hecho completamente cierto, que saben todos los presentes, es que el Sr. Prieto la tenía.` | «quien» sin tilde, como en el texto |
| `pistola.tumulto` | 74608 | 84026 | Diario (acotación en la fila de Gil Robles) · 1934-07-04 | `Entre los Sres. Tirado y Oriol de la Puerta se produjo un violento altercado, llegando a agredirse dichos Sres. Diputados.—Esto determinó un verdadero tumulto en la Cámara.` |  |

## Puerta `antesala-1936`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `antesala.calvo` | 105356 | 119131 | José Calvo Sotelo · 1936-06-16 | `Yo digo lo que Santo Domingo de Silos contestó a un rey castellano: ` ‖ `Señor, la vida podéis quitarme, pero más no podéis.` | las comillas rectas del texto se escriben “ ” |
| `antesala.casares` | 105330 | 119104 | Santiago Casares Quiroga · 1936-06-16 | `haré responsable ante el país a S. S.` |  |
| `antesala.calvo.suprimidas` | 105310 | 119084 | Diario (acotación en la fila de Calvo Sotelo) · 1936-06-16 | `(El orador pronuncia palabras que no constan por orden del Sr. Presidente y que dan motivo a grandes protestas e increpaciones.)` |  |
| `antesala.carrillo.suprimidas` | 105324 | 119098 | Diario (acotación en la fila de Suárez de Tangil) · 1936-06-16 | `(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)` |  |
| `antesala.galarza` | 106289 | 120221 | Ángel Galarza · 1936-07-01 | `¡Ah!, pero yo proclamo una cosa: la violencia... (El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)` |  |
| `antesala.presidencia` | 106290 | 120222 | La Presidencia (Martínez Barrio) · 1936-07-01 | `Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones.` |  |
| `antesala.galarza2` | 106291 | 120223 | Ángel Galarza · 1936-07-01 | `esas palabras, que en el Diario de Sesiones no figurarán, el país las conocerá` |  |

## Puerta `figueres-1939`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `figueres.apertura.sumario` | — (no está en la V2) | 121446 | Sumario del extracto · 1939-02-01 | `Abierta la sesión a las veintidos horas treinta minutos` | solo v3 |
| `figueres.apertura.texto` | — (no está en la V2) | 121446 | Extracto · 1939-02-01 | `Abierta la sesión a las 22 horas 39` | solo v3 |
| `figueres.martinezbarrio` | — (no está en la V2) | 121446 | Diego Martínez Barrio (dentro del sumario) · 1939-02-01 | `Lo hacemos en un trozo de la tierra catalana que, como otras distintas de España, se encuentra actualmente nuancilada` ‖ `y hollada por la planta de los invasores extranjeros` | solo v3; [sic] tras «nuancilada» |
| `figueres.negrin` | 107326 | 121447 | Juan Negrín · 1939-02-01 | `Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra.` |  |
| `figueres.nota` | — (no está en la V2) | 121110 | Nota que abre el volumen de la guerra · 1936-10-01 | `DE LA ULTILLA SESION QUE TUVO LUGAR EN LA CIUDAD DE FIGUERAS A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939, NO EXISTE DATO ALGUNO.` | solo v3 (sumario de la sesión 61); [sic] tras «ULTILLA» |
| `figueres.castillo` | 107337 | 121459 | Proposición leída en la sesión · 1939-02-01 | `Castillo de Figueras, a primero de Febrero, de mil novceientos treinta y nueve.` | «novceientos» [sic] |
| `figueres.fotocopia` | 107341 | 121465 | Nota al final del extracto · 1939-02-01 | `se indicaba que no había sido posible obtener el número 69, que contenía la sesión celebrada en el Castillo de Figueras.` ‖ `Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión` | en la V2, dentro de la última fila de la Presidencia |
| `figueres.votacion` | 107341 | 121464 | La Presidencia (Martínez Barrio) · 1939-02-01 | `Han votado afirmativamente los sesenta y dos señores Diputados.` |  |

## Puerta `mexico-1945`

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `mexico.lugar` | — (no está en la V2) | 121495 | Carátula del extracto · 1945-08-17 | `de la sesión extraordinaria celebrada en la Ciudad de México el viernes 17 de agosto de 1945` | solo v3 |
| `mexico.orden` | 107371 | 121500 | La Presidencia (Fernández Clérigo) · 1945-08-17 | `Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española.` |  |
| `mexico.promesa` | 107372 | 121502 | La Presidencia · Diego Martínez Barrio · 1945-08-17 | `¿Prometéis solemnemente fidelidad a la República y a la Constitución?` ‖ `Si, prometo.` | «Si» sin tilde, como en el texto |
| `mexico.giral` | 107375 | 121507 | José Giral · 1945-11-07 | `al presentarse ante las Cortes españolas el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente desde el día en que el infortunio nos hizo cruzar la frontera de nuestra patria amada` |  |
| `mexico.permanente` | — (no está en la V2) | 121466 | Carátula del volumen de México · 1945-01-10 | `sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia.` | solo v3 |
| `mexico.editor` | — (no está en la V2) | 121466 | Carátula del volumen de México · 1945-01-10 | `(México D.F.: B. Costa i Amic)` | solo v3 |
| `mexico.declaracion` | — (no está en la V2) | 121568 | Sumario del 8-XI-1945 · 1945-11-08 | `Se aprueba, en votación ordinaria, la propuesta sobre la declaración del Gobierno de la República.` | solo v3 |
| `mexico.galicia` | — (no está en la V2) | 121601 | Sumario del 9-XI-1945 · 1945-11-09 | `Debate sobre el Estatuto de Galicia.` | solo v3 |

## F26 · literales del resultado

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `voto.141-106` | 5453 | 6110 | Diario · 1931-10-01 | `En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106.` |  |
| `voto.161-121` | 5453 | 6110 | Diario · 1931-10-01 | `Total, 161.` ‖ `Total, 121.` |  |
| `voto.178-59` | 6994 | 7800 | Diario · 1931-10-13 | `quedó aprobado el artículo 24 por 178 votos contra 59` |  |
| `voto.368-466` | 13531 | 15043 | La Presidencia (Besteiro) · 1931-12-09 | `Los Sres. Diputados que han prometido en estas Cortes suman 466; la mitad más uno, 234. Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí.` |  |
| `voto.318-19` | 37177 | 41627 | Diario · 1932-09-09 | `votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19` |  |
| `voto.318-19.mitad` | 37178 | 41628 | La Presidencia (Besteiro) · 1932-09-09 | `El número de Diputados que han prometido suma 462. La mitad mas uno son 232.` |  |
| `voto.314-24` | 37178 | 41629 | Diario · 1932-09-09 | `Total, 314.` ‖ `Total, 24.` |  |
| `voto.238-5` | 102358 | 115675 | Diario · 1936-04-07 | `resultado que habían votado a favor de la proposición 238 Sres. Diputados y en contra 5` |  |
| `voto.238-5.mitad` | 102359 | 115676 | La Presidencia (Jiménez de Asúa) · 1936-04-07 | `Los Sres. Diputados en el ejercicio del cargo son 417; la mitad más uno, 209.` |  |
| `voto.238-5.reglamento` | 102309 | 115623 | El Secretario lee el Reglamento · 1936-04-07 | `Se entenderá acordada la destitución del Presidente cuando a favor de ella se pronuncien, en votación nominal.` |  |

## El Diario

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `diario.alba.secreta` | 71329 | 80305 | La Presidencia (Alba) · 1934-06-08 | `Con arreglo al Reglamento, los suplicatorios han de tratarse en sesión secreta;` |  |
| `diario.grito` | 71330 | 80306 | El Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ» · 1934-06-08 | `Luz y taquigrafos.` | sin tilde, como en el texto |
| `diario.alba.reglamento` | 71331 | 80307 | La Presidencia (Alba) · 1934-06-08 | `El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías` | raya pegada, como en el texto |
| `diario.prieto.publica` | 71332 | 80308 | Indalecio Prieto · 1934-06-08 | `La minoría socialista no tiene inconveniente en que esto se discuta públicamente.` |  |
| `diario.royo` | 57506 | 64595 | Antonio Royo Villanova · 1933-08-03 | `aquí se liquida todo con luz y taquigrafos, como decía Maura` |  |
| `diario.maurin` | 106747 | 120751 | Joaquín Maurín · Comín · 1936-07-08 | `Hay luz y taquigrafos, los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)` |  |
| `diario.prieto.consten` | 45116 | 50467 | Indalecio Prieto · 1933-02-07 | `Por mí, que consten.` |  |
| `diario.besteiro.consten` | 45115 | 50466 | La Presidencia (Besteiro) · 1933-02-07 | `Esas palabras, que no constarán en el Diario de Sesiones.` |  |
| `diario.calvo.peticion` | 104406 | 118058 | José Calvo Sotelo · 1936-06-03 | `supongo, Sr. Presidente de la misma, que ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones.` |  |
| `diario.perciben.y.constan` | 103250 | 116697 | Diario (acotaciones en la fila de Calvo Sotelo) · 1936-05-06 | `(Un Sr. Diputado pronuncia palabras que no se perciben)` ‖ `Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.` |  |
| `diario.sainz` | 77318 | 87096 | Pedro Sainz Rodríguez · 1934-12-05 | `ese Reglamento determina que el Presidente puede incluso mandar callar a un Diputado, puede ordenar que no consten en el Diario de Sesiones sus palabras` |  |
| `diario.nota.liberacion` | — (no está en la V2) | 121110 | Nota que abre el volumen de la guerra · 1936-10-01 | `A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939` | solo v3 |
| `diario.nota.volumen` | — (no está en la V2) | 121110 | Nota que abre el volumen de la guerra · 1936-10-01 | `EN ESTE VOLUMEN FIGURAN LOS EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO.` | solo v3 |
| `diario.campoamor.lee` | 5424 | 6079 | Clara Campoamor · 1931-10-01 | `En ausencia mía y leyendo el Diario de Sesiones, pude ver en él que un doctor hablaba aquí de que no había ecuación posible` |  |
| `diario.eso_no_basta` | 102492 | 115837 | Varios diputados · 1936-04-15 | `Eso no basta.` | en la V2, dentro de la fila de la Presidencia |
| `diario.cano.tachado` | 82129 | 92599 | Dionisio Cano López · 1935-02-19 | `eso se ha tachado en el Diario de Sesiones.` |  |
| `diario.kent.interrupcion` | 5419 | 6074 | Acotación en la fila de Victoria Kent · 1931-10-01 | `(El Sr. Guerra del Rio: Los cavernicolas hablan de pastel.)` | sin tildes, como en el texto |
| `diario.maura.censura` | 82369 | 92880 | Ruego escrito de Honorio Maura · 1935-02-20 | `que los textos integros tomados del Diario de Sesiones no sean tachados ni mutilados por aquélla` | en la V2, dentro de una fila de la Presidencia |

## F27 · «Luz y taquígrafos»

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `f27.1` | 420 | 472 | Gabriel Franco · 1931-07-20 | `En la imposibilidad de recoger notarialmente la prueba de estas fechorias, que no suelen hacerse con luz y taquigrafos` |  |
| `f27.2` | 23898 | 26612 | José Antonio Balbontín · 1932-04-09 | `se discutiese ampliamente con luz y taquigrafos y en presencia de todos los Sres. Diputados de las demás minorías` |  |
| `f27.3` | 24658 | 27477 | José Antonio Balbontín · 1932-05-03 | `la máxima garantía es la oposición libre, con luz y taquigrafos` |  |
| `f27.4` | 55902 | 62718 | José Antonio Balbontín · 1933-07-19 | `yo aquí he levantado mi voz, con luz y taquigrafos, contra los pistoleros` |  |
| `f27.5` | 57506 | 64595 | Antonio Royo Villanova · 1933-08-03 | `aquí se liquida todo con luz y taquigrafos, como decía Maura` |  |
| `f27.6` | 71330 | 80306 | El Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ» · 1934-06-08 | `Luz y taquigrafos.` |  |
| `f27.7` | 75263 | 84760 | Abilio Calderón · 1934-11-13 | `no hay ningún reparo, ningún obstaculo ni ninguna dificultad para que se examine el presupuesto con luz y taquigrafos` |  |
| `f27.8` | 79803 | 89910 | Santiago Fuentes Pila · 1935-01-29 | `que realiza el Parlamento suele decir que hacen falta ` ‖ `luz y taquigrafos` | comillas rectas del texto → “ ” |
| `f27.9` | 99859 | 112827 | José Calvo Sotelo · 1935-11-22 | `El que está agazapado en su escaño, con luz y taquigrafos, naturalmente que no quiere valerse de nocturnidad ni de obscuridad de ninguna clase.` |  |
| `f27.10` | 106747 | 120751 | Joaquín Maurín · 1936-07-08 | `Hay luz y taquigrafos, los taquigrafos recogeran eso.` |  |

## F28 · Lo que el Diario calla

| clave | V2 | v3 | quién · fecha | fragmentos literales | nota |
|---|---|---|---|---|---|
| `f28.orden.1` | 13605 | 15129 | La Presidencia (Besteiro) · 1931-12-10 | `Que no constaran en el Diario de Sesiones.` |  |
| `f28.orden.2` | 45115 | 50466 | La Presidencia (Besteiro) · 1933-02-07 | `Esas palabras, que no constarán en el Diario de Sesiones.` |  |
| `f28.orden.3` | 45440 | 50818 | La Presidencia (Besteiro) · 1933-02-09 | `le aseguro que las palabras que ha pronunciado no constarán en el Diario de Sesiones.` |  |
| `f28.orden.4` | 102484 | 115828 | La Presidencia (Jiménez de Asúa) · 1936-04-15 | `Esas palabras no constarán en el Diario de Sesiones.` |  |
| `f28.orden.5` | 102486 | 115830 | La Presidencia (Jiménez de Asúa) · 1936-04-15 | `Ya se ha dicho que no constarán esas palabras en el Diario de Sesiones.` |  |
| `f28.orden.6` | 102492 | 115836 | La Presidencia (Jiménez de Asúa) · 1936-04-15 | `Ya ha advertido la Presidencia que no constarán en el Diario de Sesiones esas palabras.` |  |
| `f28.orden.7` | 103251 | 116698 | La Presidencia (Jiménez de Asúa) · 1936-05-06 | `No constará en el Diario de Sesiones.` |  |
| `f28.orden.8` | 106290 | 120222 | La Presidencia (Martínez Barrio) · 1936-07-01 | `Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones.` |  |
| `f28.acotacion.1` | 103182 | 116626 | Diario (fila de Jesús Pabón) · 1936-05-06 | `(El Sr. Muñoz de Zafra pronuncia palabras que no se consignan por orden del Sr. Presidente` |  |
| `f28.acotacion.2` | 103250 | 116697 | Diario (fila de Calvo Sotelo) · 1936-05-06 | `Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente.` |  |
| `f28.acotacion.3` | 105310 | 119084 | Diario (fila de Calvo Sotelo) · 1936-06-16 | `(El orador pronuncia palabras que no constan por orden del Sr. Presidente` |  |
| `f28.acotacion.4` | 105324 | 119098 | Diario (fila de Suárez de Tangil) · 1936-06-16 | `(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)` |  |
| `f28.acotacion.5` | 106289 | 120221 | Diario (fila de Galarza) · 1936-07-01 | `(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)` |  |
| `f28.peticion` | 104406 | 118058 | José Calvo Sotelo · 1936-06-03 | `ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones.` |  |
| `f28.ajena` | 64659 | 72690 | Luis Rodríguez de Viguri · 1934-02-21 | `por parecerne injusto que no constara en el Diario de Sesión` | la fórmula en otro sentido |

## Bloque para las máquinas

```json
[
 {
  "clave": "sufragio.kent",
  "v2": 5419,
  "v3": 6074,
  "fragmentos": [
   "que creo que el voto femenino debe aplazarse."
  ],
  "orador": "Victoria Kent",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "sufragio.presidencia",
  "v2": 5423,
  "v3": 6078,
  "fragmentos": [
   "Ruego a la Cámara que guarde silencio."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "sufragio.campoamor.silencio",
  "v2": 5424,
  "v3": 6079,
  "fragmentos": [
   "Yo ruego a la Cámara que me escuche en silencio"
  ],
  "orador": "Clara Campoamor",
  "fecha": "1931-10-01",
  "nota": "el original sigue con «;»: se corta con «…»"
 },
 {
  "clave": "sufragio.campoamor.ciudadana",
  "v2": 5424,
  "v3": 6079,
  "fragmentos": [
   "Yo, Sres. Diputados, me siento ciudadana antes que mujer, y considero que sería un profundo error político dejar a la mujer al margen de ese derecho"
  ],
  "orador": "Clara Campoamor",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "sufragio.resultado",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "Total, 161.",
   "Total, 121."
  ],
  "orador": "Diario (lista de la votación)",
  "fecha": "1931-10-01",
  "nota": "dos fragmentos unidos por «…»"
 },
 {
  "clave": "sufragio.ordinaria",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106."
  ],
  "orador": "Diario",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "sufragio.art34",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "art. 34 (numeración antigua) del dictamen de la Comisión"
  ],
  "orador": "Diario",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "sufragio.lista.campoamor",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "Srta. Campoamor."
  ],
  "orador": "Diario (lista del sí)",
  "fecha": "1931-10-01",
  "nota": "está antes de «Total, 161.»"
 },
 {
  "clave": "sufragio.lista.kent",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "Srta. Victoria Kent."
  ],
  "orador": "Diario (lista del no)",
  "fecha": "1931-10-01",
  "nota": "está entre «Total, 161.» y «Total, 121.»"
 },
 {
  "clave": "sufragio.art34.texto",
  "v2": 12785,
  "v3": 14216,
  "fragmentos": [
   "Los ciudadanos de uno y otro sexo, mayores de veintitrés años, tendrán los mismos derechos electorales"
  ],
  "orador": "Clara Campoamor",
  "fecha": "1931-12-01",
  "nota": "v3 se busca por texto"
 },
 {
  "clave": "sufragio.final",
  "v2": 5792,
  "v3": 6464,
  "fragmentos": [
   "El Sr. Ministro de"
  ],
  "orador": "Diario (final truncado)",
  "fecha": "1931-10-01",
  "nota": "la fila TERMINA así"
 },
 {
  "clave": "religiosa.azana",
  "v2": 6748,
  "v3": 7531,
  "fragmentos": [
   "España ha dejado de ser católica: el problema político consiguiente es organizar el Estado en forma tal que puede",
   "adecuado a esta fase nueva e histórica del pueblo español."
  ],
  "orador": "Manuel Azaña",
  "fecha": "1931-10-13",
  "nota": "[sic] entre los dos fragmentos"
 },
 {
  "clave": "religiosa.resultado",
  "v2": 6994,
  "v3": 7800,
  "fragmentos": [
   "quedó aprobado el artículo 24 por 178 votos contra 59"
  ],
  "orador": "Diario",
  "fecha": "1931-10-13",
  "nota": ""
 },
 {
  "clave": "religiosa.lista.no",
  "v2": 6994,
  "v3": 7800,
  "fragmentos": [
   "Señores que han dicho no:\n\nAlcalá-Zamora.\n\nMaura."
  ],
  "orador": "Diario (lista del no)",
  "fecha": "1931-10-13",
  "nota": "comprobación, no se cita"
 },
 {
  "clave": "religiosa.cierre",
  "v2": 6999,
  "v3": 7807,
  "fragmentos": [
   "Eran las siete y treinta y cinco minutos de la mañana del día 14."
  ],
  "orador": "Diario",
  "fecha": "1931-10-13",
  "nota": ""
 },
 {
  "clave": "religiosa.apertura",
  "v2": null,
  "v3": 7387,
  "fragmentos": [
   "Abierta la sesión a las cuatro y treinta minutos de la tarde"
  ],
  "orador": "Sumario",
  "fecha": "1931-10-13",
  "nota": "solo v3 (sumario)"
 },
 {
  "clave": "estatuto.v2.palabra",
  "v2": 25979,
  "v3": 29041,
  "fragmentos": [
   "El Sr. Presidente del Consejo de Ministros tiene la palabra."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1932-05-27",
  "nota": ""
 },
 {
  "clave": "estatuto.v2.rotulo",
  "v2": 25979,
  "v3": null,
  "fragmentos": [
   "El Sr. Presidente del CONSEJO DE MINIS\n"
  ],
  "orador": "rótulo cortado dentro de la fila V2",
  "fecha": "1932-05-27",
  "nota": "solo V2: en la v3 es el orador de la fila 29042"
 },
 {
  "clave": "estatuto.azana",
  "v2": 25979,
  "v3": 29042,
  "fragmentos": [
   "Cataluña dice, los catalanes dicen: “quieremos",
   "vivir de otra manera dentro del Estado español”. La pretensión es legítima; es legítima porque la autoriza la ley, nada menos que la ley constitucional."
  ],
  "orador": "Manuel Azaña",
  "fecha": "1932-05-27",
  "nota": "[sic] tras «quieremos»"
 },
 {
  "clave": "casasviejas.azana.hurgue",
  "v2": 44922,
  "v3": 50255,
  "fragmentos": [
   "por mucho que se hurgue no se encontrará un atisbo de responsabilidad para el Gobierno."
  ],
  "orador": "Manuel Azaña",
  "fecha": "1933-02-02",
  "nota": ""
 },
 {
  "clave": "casasviejas.azana",
  "v2": 44922,
  "v3": 50255,
  "fragmentos": [
   "En Casas Viejas no ha ocurrido sino lo que tenía que ocurrir. (Fuertes rumores y protestas en los bancos de las minorías; contraprotestas en la mayoría.)"
  ],
  "orador": "Manuel Azaña",
  "fecha": "1933-02-02",
  "nota": ""
 },
 {
  "clave": "casasviejas.barriga",
  "v2": 70714,
  "v3": 79606,
  "fragmentos": [
   "Casas Viejas! Casas Viejas! Tiros a la barriga, a la barriga!"
  ],
  "orador": "Varios diputados (acotación en la fila de José Tomás y Piera)",
  "fecha": "1934-05-31",
  "nota": ""
 },
 {
  "clave": "pistola.prieto.golpes",
  "v2": 74619,
  "v3": 84039,
  "fragmentos": [
   "Estos incidentes limitados a palabras son corrientes; el de hoy se ha convertido en golpes."
  ],
  "orador": "Indalecio Prieto",
  "fecha": "1934-07-04",
  "nota": ""
 },
 {
  "clave": "pistola.prieto",
  "v2": 74619,
  "v3": 84039,
  "fragmentos": [
   "es exacto, Sr. Presidente, que ha salido a luz alguna pistola, por lo menos la mía"
  ],
  "orador": "Indalecio Prieto",
  "fecha": "1934-07-04",
  "nota": ""
 },
 {
  "clave": "pistola.oriol",
  "v2": 74621,
  "v3": 84041,
  "fragmentos": [
   "Invito al Sr. Prieto a que diga quien ha sacado la pistola; lo que es un hecho completamente cierto, que saben todos los presentes, es que el Sr. Prieto la tenía."
  ],
  "orador": "Jaime Oriol de la Puerta",
  "fecha": "1934-07-04",
  "nota": "«quien» sin tilde, como en el texto"
 },
 {
  "clave": "antesala.calvo",
  "v2": 105356,
  "v3": 119131,
  "fragmentos": [
   "Yo digo lo que Santo Domingo de Silos contestó a un rey castellano: ",
   "Señor, la vida podéis quitarme, pero más no podéis."
  ],
  "orador": "José Calvo Sotelo",
  "fecha": "1936-06-16",
  "nota": "las comillas rectas del texto se escriben “ ”"
 },
 {
  "clave": "antesala.casares",
  "v2": 105330,
  "v3": 119104,
  "fragmentos": [
   "haré responsable ante el país a S. S."
  ],
  "orador": "Santiago Casares Quiroga",
  "fecha": "1936-06-16",
  "nota": ""
 },
 {
  "clave": "antesala.calvo.suprimidas",
  "v2": 105310,
  "v3": 119084,
  "fragmentos": [
   "(El orador pronuncia palabras que no constan por orden del Sr. Presidente y que dan motivo a grandes protestas e increpaciones.)"
  ],
  "orador": "Diario (acotación en la fila de Calvo Sotelo)",
  "fecha": "1936-06-16",
  "nota": ""
 },
 {
  "clave": "antesala.carrillo.suprimidas",
  "v2": 105324,
  "v3": 119098,
  "fragmentos": [
   "(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)"
  ],
  "orador": "Diario (acotación en la fila de Suárez de Tangil)",
  "fecha": "1936-06-16",
  "nota": ""
 },
 {
  "clave": "antesala.galarza",
  "v2": 106289,
  "v3": 120221,
  "fragmentos": [
   "¡Ah!, pero yo proclamo una cosa: la violencia... (El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)"
  ],
  "orador": "Ángel Galarza",
  "fecha": "1936-07-01",
  "nota": ""
 },
 {
  "clave": "antesala.presidencia",
  "v2": 106290,
  "v3": 120222,
  "fragmentos": [
   "Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Martínez Barrio)",
  "fecha": "1936-07-01",
  "nota": ""
 },
 {
  "clave": "antesala.galarza2",
  "v2": 106291,
  "v3": 120223,
  "fragmentos": [
   "esas palabras, que en el Diario de Sesiones no figurarán, el país las conocerá"
  ],
  "orador": "Ángel Galarza",
  "fecha": "1936-07-01",
  "nota": ""
 },
 {
  "clave": "figueres.apertura.sumario",
  "v2": null,
  "v3": 121446,
  "fragmentos": [
   "Abierta la sesión a las veintidos horas treinta minutos"
  ],
  "orador": "Sumario del extracto",
  "fecha": "1939-02-01",
  "nota": "solo v3"
 },
 {
  "clave": "figueres.apertura.texto",
  "v2": null,
  "v3": 121446,
  "fragmentos": [
   "Abierta la sesión a las 22 horas 39"
  ],
  "orador": "Extracto",
  "fecha": "1939-02-01",
  "nota": "solo v3"
 },
 {
  "clave": "figueres.martinezbarrio",
  "v2": null,
  "v3": 121446,
  "fragmentos": [
   "Lo hacemos en un trozo de la tierra catalana que, como otras distintas de España, se encuentra actualmente nuancilada",
   "y hollada por la planta de los invasores extranjeros"
  ],
  "orador": "Diego Martínez Barrio (dentro del sumario)",
  "fecha": "1939-02-01",
  "nota": "solo v3; [sic] tras «nuancilada»"
 },
 {
  "clave": "figueres.negrin",
  "v2": 107326,
  "v3": 121447,
  "fragmentos": [
   "Señores Diputados, se reúne hoy la Cámara en un severo ambiente de guerra."
  ],
  "orador": "Juan Negrín",
  "fecha": "1939-02-01",
  "nota": ""
 },
 {
  "clave": "figueres.nota",
  "v2": null,
  "v3": 121110,
  "fragmentos": [
   "DE LA ULTILLA SESION QUE TUVO LUGAR EN LA CIUDAD DE FIGUERAS A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939, NO EXISTE DATO ALGUNO."
  ],
  "orador": "Nota que abre el volumen de la guerra",
  "fecha": "1936-10-01",
  "nota": "solo v3 (sumario de la sesión 61); [sic] tras «ULTILLA»"
 },
 {
  "clave": "mexico.lugar",
  "v2": null,
  "v3": 121495,
  "fragmentos": [
   "de la sesión extraordinaria celebrada en la Ciudad de México el viernes 17 de agosto de 1945"
  ],
  "orador": "Carátula del extracto",
  "fecha": "1945-08-17",
  "nota": "solo v3"
 },
 {
  "clave": "mexico.orden",
  "v2": 107371,
  "v3": 121500,
  "fragmentos": [
   "Promesa del Excmo. señor don Diego Martínez Barrio, Presidente de las Cortes, como Presidente interino de la República Española."
  ],
  "orador": "La Presidencia (Fernández Clérigo)",
  "fecha": "1945-08-17",
  "nota": ""
 },
 {
  "clave": "mexico.promesa",
  "v2": 107372,
  "v3": 121502,
  "fragmentos": [
   "¿Prometéis solemnemente fidelidad a la República y a la Constitución?",
   "Si, prometo."
  ],
  "orador": "La Presidencia · Diego Martínez Barrio",
  "fecha": "1945-08-17",
  "nota": "«Si» sin tilde, como en el texto"
 },
 {
  "clave": "mexico.giral",
  "v2": 107375,
  "v3": 121507,
  "fragmentos": [
   "al presentarse ante las Cortes españolas el primer Gobierno de la República que ha sido posible instrumentar constitucionalmente desde el día en que el infortunio nos hizo cruzar la frontera de nuestra patria amada"
  ],
  "orador": "José Giral",
  "fecha": "1945-11-07",
  "nota": ""
 },
 {
  "clave": "mexico.permanente",
  "v2": null,
  "v3": 121466,
  "fragmentos": [
   "sólo tenemos noticia de ellas por citas bibliográficas pero no se dispone de los textos ni en forma de fotocopia."
  ],
  "orador": "Carátula del volumen de México",
  "fecha": "1945-01-10",
  "nota": "solo v3"
 },
 {
  "clave": "mexico.editor",
  "v2": null,
  "v3": 121466,
  "fragmentos": [
   "(México D.F.: B. Costa i Amic)"
  ],
  "orador": "Carátula del volumen de México",
  "fecha": "1945-01-10",
  "nota": "solo v3"
 },
 {
  "clave": "diario.alba.secreta",
  "v2": 71329,
  "v3": 80305,
  "fragmentos": [
   "Con arreglo al Reglamento, los suplicatorios han de tratarse en sesión secreta;"
  ],
  "orador": "La Presidencia (Alba)",
  "fecha": "1934-06-08",
  "nota": ""
 },
 {
  "clave": "diario.grito",
  "v2": 71330,
  "v3": 80306,
  "fragmentos": [
   "Luz y taquigrafos."
  ],
  "orador": "El Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ»",
  "fecha": "1934-06-08",
  "nota": "sin tilde, como en el texto"
 },
 {
  "clave": "diario.alba.reglamento",
  "v2": 71331,
  "v3": 80307,
  "fragmentos": [
   "El Reglamento, señores Diputados—no he visto quién ha interrumpido—, ampara principalmente a las minorías"
  ],
  "orador": "La Presidencia (Alba)",
  "fecha": "1934-06-08",
  "nota": "raya pegada, como en el texto"
 },
 {
  "clave": "diario.prieto.publica",
  "v2": 71332,
  "v3": 80308,
  "fragmentos": [
   "La minoría socialista no tiene inconveniente en que esto se discuta públicamente."
  ],
  "orador": "Indalecio Prieto",
  "fecha": "1934-06-08",
  "nota": ""
 },
 {
  "clave": "diario.royo",
  "v2": 57506,
  "v3": 64595,
  "fragmentos": [
   "aquí se liquida todo con luz y taquigrafos, como decía Maura"
  ],
  "orador": "Antonio Royo Villanova",
  "fecha": "1933-08-03",
  "nota": ""
 },
 {
  "clave": "diario.maurin",
  "v2": 106747,
  "v3": 120751,
  "fragmentos": [
   "Hay luz y taquigrafos, los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)"
  ],
  "orador": "Joaquín Maurín · Comín",
  "fecha": "1936-07-08",
  "nota": ""
 },
 {
  "clave": "diario.prieto.consten",
  "v2": 45116,
  "v3": 50467,
  "fragmentos": [
   "Por mí, que consten."
  ],
  "orador": "Indalecio Prieto",
  "fecha": "1933-02-07",
  "nota": ""
 },
 {
  "clave": "diario.besteiro.consten",
  "v2": 45115,
  "v3": 50466,
  "fragmentos": [
   "Esas palabras, que no constarán en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1933-02-07",
  "nota": ""
 },
 {
  "clave": "diario.calvo.peticion",
  "v2": 104406,
  "v3": 118058,
  "fragmentos": [
   "supongo, Sr. Presidente de la misma, que ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones."
  ],
  "orador": "José Calvo Sotelo",
  "fecha": "1936-06-03",
  "nota": ""
 },
 {
  "clave": "diario.perciben.y.constan",
  "v2": 103250,
  "v3": 116697,
  "fragmentos": [
   "(Un Sr. Diputado pronuncia palabras que no se perciben)",
   "Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente."
  ],
  "orador": "Diario (acotaciones en la fila de Calvo Sotelo)",
  "fecha": "1936-05-06",
  "nota": ""
 },
 {
  "clave": "diario.sainz",
  "v2": 77318,
  "v3": 87096,
  "fragmentos": [
   "ese Reglamento determina que el Presidente puede incluso mandar callar a un Diputado, puede ordenar que no consten en el Diario de Sesiones sus palabras"
  ],
  "orador": "Pedro Sainz Rodríguez",
  "fecha": "1934-12-05",
  "nota": ""
 },
 {
  "clave": "diario.nota.liberacion",
  "v2": null,
  "v3": 121110,
  "fragmentos": [
   "A RAIZ DE LA LIBERACION DE BARCELONA EL 26 DE ENERO DE 1.939"
  ],
  "orador": "Nota que abre el volumen de la guerra",
  "fecha": "1936-10-01",
  "nota": "solo v3"
 },
 {
  "clave": "diario.nota.volumen",
  "v2": null,
  "v3": 121110,
  "fragmentos": [
   "EN ESTE VOLUMEN FIGURAN LOS EXTRACTOS DE LAS SESIONES CELEBRADAS POR LAS CORTES DE 1.936, CON POSTERIORIDAD AL 18 DE JULIO."
  ],
  "orador": "Nota que abre el volumen de la guerra",
  "fecha": "1936-10-01",
  "nota": "solo v3"
 },
 {
  "clave": "f27.1",
  "v2": 420,
  "v3": 472,
  "fragmentos": [
   "En la imposibilidad de recoger notarialmente la prueba de estas fechorias, que no suelen hacerse con luz y taquigrafos"
  ],
  "orador": "Gabriel Franco",
  "fecha": "1931-07-20",
  "nota": ""
 },
 {
  "clave": "f27.2",
  "v2": 23898,
  "v3": 26612,
  "fragmentos": [
   "se discutiese ampliamente con luz y taquigrafos y en presencia de todos los Sres. Diputados de las demás minorías"
  ],
  "orador": "José Antonio Balbontín",
  "fecha": "1932-04-09",
  "nota": ""
 },
 {
  "clave": "f27.3",
  "v2": 24658,
  "v3": 27477,
  "fragmentos": [
   "la máxima garantía es la oposición libre, con luz y taquigrafos"
  ],
  "orador": "José Antonio Balbontín",
  "fecha": "1932-05-03",
  "nota": ""
 },
 {
  "clave": "f27.4",
  "v2": 55902,
  "v3": 62718,
  "fragmentos": [
   "yo aquí he levantado mi voz, con luz y taquigrafos, contra los pistoleros"
  ],
  "orador": "José Antonio Balbontín",
  "fecha": "1933-07-19",
  "nota": ""
 },
 {
  "clave": "f27.5",
  "v2": 57506,
  "v3": 64595,
  "fragmentos": [
   "aquí se liquida todo con luz y taquigrafos, como decía Maura"
  ],
  "orador": "Antonio Royo Villanova",
  "fecha": "1933-08-03",
  "nota": ""
 },
 {
  "clave": "f27.6",
  "v2": 71330,
  "v3": 80306,
  "fragmentos": [
   "Luz y taquigrafos."
  ],
  "orador": "El Diario lo atribuye a «El Sr. JIMÉNEZ FERNÁNDEZ»",
  "fecha": "1934-06-08",
  "nota": ""
 },
 {
  "clave": "f27.7",
  "v2": 75263,
  "v3": 84760,
  "fragmentos": [
   "no hay ningún reparo, ningún obstaculo ni ninguna dificultad para que se examine el presupuesto con luz y taquigrafos"
  ],
  "orador": "Abilio Calderón",
  "fecha": "1934-11-13",
  "nota": ""
 },
 {
  "clave": "f27.8",
  "v2": 79803,
  "v3": 89910,
  "fragmentos": [
   "que realiza el Parlamento suele decir que hacen falta ",
   "luz y taquigrafos"
  ],
  "orador": "Santiago Fuentes Pila",
  "fecha": "1935-01-29",
  "nota": "comillas rectas del texto → “ ”"
 },
 {
  "clave": "f27.9",
  "v2": 99859,
  "v3": 112827,
  "fragmentos": [
   "El que está agazapado en su escaño, con luz y taquigrafos, naturalmente que no quiere valerse de nocturnidad ni de obscuridad de ninguna clase."
  ],
  "orador": "José Calvo Sotelo",
  "fecha": "1935-11-22",
  "nota": ""
 },
 {
  "clave": "f27.10",
  "v2": 106747,
  "v3": 120751,
  "fragmentos": [
   "Hay luz y taquigrafos, los taquigrafos recogeran eso."
  ],
  "orador": "Joaquín Maurín",
  "fecha": "1936-07-08",
  "nota": ""
 },
 {
  "clave": "f28.orden.1",
  "v2": 13605,
  "v3": 15129,
  "fragmentos": [
   "Que no constaran en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1931-12-10",
  "nota": ""
 },
 {
  "clave": "f28.orden.2",
  "v2": 45115,
  "v3": 50466,
  "fragmentos": [
   "Esas palabras, que no constarán en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1933-02-07",
  "nota": ""
 },
 {
  "clave": "f28.orden.3",
  "v2": 45440,
  "v3": 50818,
  "fragmentos": [
   "le aseguro que las palabras que ha pronunciado no constarán en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1933-02-09",
  "nota": ""
 },
 {
  "clave": "f28.orden.4",
  "v2": 102484,
  "v3": 115828,
  "fragmentos": [
   "Esas palabras no constarán en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Jiménez de Asúa)",
  "fecha": "1936-04-15",
  "nota": ""
 },
 {
  "clave": "f28.orden.5",
  "v2": 102486,
  "v3": 115830,
  "fragmentos": [
   "Ya se ha dicho que no constarán esas palabras en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Jiménez de Asúa)",
  "fecha": "1936-04-15",
  "nota": ""
 },
 {
  "clave": "f28.orden.6",
  "v2": 102492,
  "v3": 115836,
  "fragmentos": [
   "Ya ha advertido la Presidencia que no constarán en el Diario de Sesiones esas palabras."
  ],
  "orador": "La Presidencia (Jiménez de Asúa)",
  "fecha": "1936-04-15",
  "nota": ""
 },
 {
  "clave": "f28.orden.7",
  "v2": 103251,
  "v3": 116698,
  "fragmentos": [
   "No constará en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Jiménez de Asúa)",
  "fecha": "1936-05-06",
  "nota": ""
 },
 {
  "clave": "f28.orden.8",
  "v2": 106290,
  "v3": 120222,
  "fragmentos": [
   "Las palabras de S. S., en lo que a eso respecta, no constarán en el Diario de Sesiones."
  ],
  "orador": "La Presidencia (Martínez Barrio)",
  "fecha": "1936-07-01",
  "nota": ""
 },
 {
  "clave": "f28.acotacion.1",
  "v2": 103182,
  "v3": 116626,
  "fragmentos": [
   "(El Sr. Muñoz de Zafra pronuncia palabras que no se consignan por orden del Sr. Presidente"
  ],
  "orador": "Diario (fila de Jesús Pabón)",
  "fecha": "1936-05-06",
  "nota": ""
 },
 {
  "clave": "f28.acotacion.2",
  "v2": 103250,
  "v3": 116697,
  "fragmentos": [
   "Un Sr. Diputado pronuncia palabras que producen protestas de las minorías y que no constan por orden del Sr. Presidente."
  ],
  "orador": "Diario (fila de Calvo Sotelo)",
  "fecha": "1936-05-06",
  "nota": ""
 },
 {
  "clave": "f28.acotacion.3",
  "v2": 105310,
  "v3": 119084,
  "fragmentos": [
   "(El orador pronuncia palabras que no constan por orden del Sr. Presidente"
  ],
  "orador": "Diario (fila de Calvo Sotelo)",
  "fecha": "1936-06-16",
  "nota": ""
 },
 {
  "clave": "f28.acotacion.4",
  "v2": 105324,
  "v3": 119098,
  "fragmentos": [
   "(El Sr. Carrillo replica con palabras que levantan grandes protestas y que no se consignan por orden de la Presidencia.)"
  ],
  "orador": "Diario (fila de Suárez de Tangil)",
  "fecha": "1936-06-16",
  "nota": ""
 },
 {
  "clave": "f28.acotacion.5",
  "v2": 106289,
  "v3": 120221,
  "fragmentos": [
   "(El final de la frase no se consigna por orden del Sr. Presidente.—Aplausos.—Rumores.)"
  ],
  "orador": "Diario (fila de Galarza)",
  "fecha": "1936-07-01",
  "nota": ""
 },
 {
  "clave": "f28.peticion",
  "v2": 104406,
  "v3": 118058,
  "fragmentos": [
   "ciertas palabras insultantes e incalificables con que se ha injuriado a las hermanas de la Caridad no constarán en el Diario de Sesiones."
  ],
  "orador": "José Calvo Sotelo",
  "fecha": "1936-06-03",
  "nota": ""
 },
 {
  "clave": "f28.ajena",
  "v2": 64659,
  "v3": 72690,
  "fragmentos": [
   "por parecerne injusto que no constara en el Diario de Sesión"
  ],
  "orador": "Luis Rodríguez de Viguri",
  "fecha": "1934-02-21",
  "nota": "la fórmula en otro sentido"
 },
 {
  "clave": "pistola.tumulto",
  "v2": 74608,
  "v3": 84026,
  "fragmentos": [
   "Entre los Sres. Tirado y Oriol de la Puerta se produjo un violento altercado, llegando a agredirse dichos Sres. Diputados.—Esto determinó un verdadero tumulto en la Cámara."
  ],
  "orador": "Diario (acotación en la fila de Gil Robles)",
  "fecha": "1934-07-04",
  "nota": ""
 },
 {
  "clave": "figueres.castillo",
  "v2": 107337,
  "v3": 121459,
  "fragmentos": [
   "Castillo de Figueras, a primero de Febrero, de mil novceientos treinta y nueve."
  ],
  "orador": "Proposición leída en la sesión",
  "fecha": "1939-02-01",
  "nota": "«novceientos» [sic]"
 },
 {
  "clave": "figueres.fotocopia",
  "v2": 107341,
  "v3": 121465,
  "fragmentos": [
   "se indicaba que no había sido posible obtener el número 69, que contenía la sesión celebrada en el Castillo de Figueras.",
   "Después de prolijas y constantes gestiones, se ha podido obtener fotocopia del ejemplar del Extracto de dicha sesión"
  ],
  "orador": "Nota al final del extracto",
  "fecha": "1939-02-01",
  "nota": "en la V2, dentro de la última fila de la Presidencia"
 },
 {
  "clave": "figueres.votacion",
  "v2": 107341,
  "v3": 121464,
  "fragmentos": [
   "Han votado afirmativamente los sesenta y dos señores Diputados."
  ],
  "orador": "La Presidencia (Martínez Barrio)",
  "fecha": "1939-02-01",
  "nota": ""
 },
 {
  "clave": "casasviejas.martinezbarrio",
  "v2": 46426,
  "v3": 51919,
  "fragmentos": [
   "nos dijo: \"En los sucesos de Casas Viejas, Sres. Diputados, por mucho que se hurgue"
  ],
  "orador": "Diego Martínez Barrio",
  "fecha": "1933-02-23",
  "nota": ""
 },
 {
  "clave": "diario.campoamor.lee",
  "v2": 5424,
  "v3": 6079,
  "fragmentos": [
   "En ausencia mía y leyendo el Diario de Sesiones, pude ver en él que un doctor hablaba aquí de que no había ecuación posible"
  ],
  "orador": "Clara Campoamor",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "religiosa.art24",
  "v2": 6628,
  "v3": 7398,
  "fragmentos": [
   "Art. 24. Todas las confesiones religiosas serán consideradas como Asociaciones sometidas a una ley especial."
  ],
  "orador": "Lectura del Secretario (Ramos)",
  "fecha": "1931-10-13",
  "nota": "en la v3, fila de comentarios"
 },
 {
  "clave": "sufragio.campoamor.antes",
  "v2": 5422,
  "v3": 6077,
  "fragmentos": [
   "Sres. Diputados, lejos yo de censurar ni de atacar las manifestaciones de mi colega, Srta. Kent;"
  ],
  "orador": "Clara Campoamor",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "mexico.declaracion",
  "v2": null,
  "v3": 121568,
  "fragmentos": [
   "Se aprueba, en votación ordinaria, la propuesta sobre la declaración del Gobierno de la República."
  ],
  "orador": "Sumario del 8-XI-1945",
  "fecha": "1945-11-08",
  "nota": "solo v3"
 },
 {
  "clave": "mexico.galicia",
  "v2": null,
  "v3": 121601,
  "fragmentos": [
   "Debate sobre el Estatuto de Galicia."
  ],
  "orador": "Sumario del 9-XI-1945",
  "fecha": "1945-11-09",
  "nota": "solo v3"
 },
 {
  "clave": "diario.eso_no_basta",
  "v2": 102492,
  "v3": 115837,
  "fragmentos": [
   "Eso no basta."
  ],
  "orador": "Varios diputados",
  "fecha": "1936-04-15",
  "nota": "en la V2, dentro de la fila de la Presidencia"
 },
 {
  "clave": "diario.cano.tachado",
  "v2": 82129,
  "v3": 92599,
  "fragmentos": [
   "eso se ha tachado en el Diario de Sesiones."
  ],
  "orador": "Dionisio Cano López",
  "fecha": "1935-02-19",
  "nota": ""
 },
 {
  "clave": "diario.kent.interrupcion",
  "v2": 5419,
  "v3": 6074,
  "fragmentos": [
   "(El Sr. Guerra del Rio: Los cavernicolas hablan de pastel.)"
  ],
  "orador": "Acotación en la fila de Victoria Kent",
  "fecha": "1931-10-01",
  "nota": "sin tildes, como en el texto"
 },
 {
  "clave": "diario.maura.censura",
  "v2": 82369,
  "v3": 92880,
  "fragmentos": [
   "que los textos integros tomados del Diario de Sesiones no sean tachados ni mutilados por aquélla"
  ],
  "orador": "Ruego escrito de Honorio Maura",
  "fecha": "1935-02-20",
  "nota": "en la V2, dentro de una fila de la Presidencia"
 },
 {
  "clave": "voto.141-106",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "En votación ordinaria fue desechada la proposición del grupo socialista por 141 votos contra 106."
  ],
  "orador": "Diario",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "voto.161-121",
  "v2": 5453,
  "v3": 6110,
  "fragmentos": [
   "Total, 161.",
   "Total, 121."
  ],
  "orador": "Diario",
  "fecha": "1931-10-01",
  "nota": ""
 },
 {
  "clave": "voto.178-59",
  "v2": 6994,
  "v3": 7800,
  "fragmentos": [
   "quedó aprobado el artículo 24 por 178 votos contra 59"
  ],
  "orador": "Diario",
  "fecha": "1931-10-13",
  "nota": ""
 },
 {
  "clave": "voto.368-466",
  "v2": 13531,
  "v3": 15043,
  "fragmentos": [
   "Los Sres. Diputados que han prometido en estas Cortes suman 466; la mitad más uno, 234. Han tomado parte en la votación 368 señores Diputados y este mismo número ha votado que sí."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1931-12-09",
  "nota": ""
 },
 {
  "clave": "voto.318-19",
  "v2": 37177,
  "v3": 41627,
  "fragmentos": [
   "votaron en pro del proyecto de Reforma agraria 318 Sres. Diputados, y en contra, 19"
  ],
  "orador": "Diario",
  "fecha": "1932-09-09",
  "nota": ""
 },
 {
  "clave": "voto.318-19.mitad",
  "v2": 37178,
  "v3": 41628,
  "fragmentos": [
   "El número de Diputados que han prometido suma 462. La mitad mas uno son 232."
  ],
  "orador": "La Presidencia (Besteiro)",
  "fecha": "1932-09-09",
  "nota": ""
 },
 {
  "clave": "voto.314-24",
  "v2": 37178,
  "v3": 41629,
  "fragmentos": [
   "Total, 314.",
   "Total, 24."
  ],
  "orador": "Diario",
  "fecha": "1932-09-09",
  "nota": ""
 },
 {
  "clave": "voto.238-5",
  "v2": 102358,
  "v3": 115675,
  "fragmentos": [
   "resultado que habían votado a favor de la proposición 238 Sres. Diputados y en contra 5"
  ],
  "orador": "Diario",
  "fecha": "1936-04-07",
  "nota": ""
 },
 {
  "clave": "voto.238-5.mitad",
  "v2": 102359,
  "v3": 115676,
  "fragmentos": [
   "Los Sres. Diputados en el ejercicio del cargo son 417; la mitad más uno, 209."
  ],
  "orador": "La Presidencia (Jiménez de Asúa)",
  "fecha": "1936-04-07",
  "nota": ""
 },
 {
  "clave": "voto.238-5.reglamento",
  "v2": 102309,
  "v3": 115623,
  "fragmentos": [
   "Se entenderá acordada la destitución del Presidente cuando a favor de ella se pronuncien, en votación nominal."
  ],
  "orador": "El Secretario lee el Reglamento",
  "fecha": "1936-04-07",
  "nota": ""
 }
]
```
