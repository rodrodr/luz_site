# Copy ES · Inicio (`/[lang]/`)

> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: el copy de «comun», «inicio», la raíz y el
> 404. Sigue la narrativa §6 (beats 0–7) y la plantilla A del plan. Cifras: `docs/marcadores/inicio.md`, recalculadas
> hoy sobre la V2, la v3, los metadatos del proyecto y la API de Dataverse
> (`docs/marcadores/comprobar_comun_inicio.py`: 94 de 94 correctas).
>
> **Cómo se lee.** Formato de ParlaIbero (véase la cabecera de `comun.md`). Las claves son las que pinta
> `src/pages/[lang]/index.astro`: `inicio.portada.*`, `inicio.tesis.*` e `inicio.credencial`, y una sección por prefijo
> (`inicio.calendario`, `.votaciones`, `.fila`, `.puertas`, `.falta`, `.empezar`) que `Seccion` pinta en el orden del
> copy. `<!-- ↺ clave -->` repite una frase fija o un rótulo de `comun.md` justo donde debe caer; la redacción que manda
> es la de allí. Los botones finales de cada sección los pone la plantilla (`botones`), tras la figura.
>
> **Tests de rechazo (anexo A):** 700 palabras de copy de 700 (23-09-2026, con la nota al margen del grito; el anexo es del 22-09) · 114 de límites de 120 · la pregunta, en la primera
> pantalla · ningún límite antes del primer hallazgo · ninguna frase de más de 30 palabras.
>
> **Lo que cambia respecto a la narrativa y al plan, y por qué** (comprobado hoy sobre la fuente):
> 1. **El grito va sin tilde: «Luz y taquigrafos.»** Así está en la V2 71330 y en la v3 80306 (`speech` =
>    `Luz y taquigrafos.`). Las citas conservan las erratas del reconocimiento óptico y la tilde no cambia el sentido:
>    no lleva [sic]; para que no parezca errata del sitio, su asiento al margen lo explica (decisión 4 del
>    investigador, 23-09-2026). La marca del sitio, «Luz y Taquígrafos», conserva la suya.
> 2. **«Seis votaciones nominales» es una selección, no el total.** El texto de la V2 trae al menos 962 listas
>    encabezadas por «Señores que dijeron sí», en 387 sesiones. Inicio dice «cientos» y «aquí van seis».
>    **Fase 2 (corrector):** con la definición común de Sesiones («señores que dijeron / han dicho» + «sí / no», sobre
>    el texto sin acentos), son 1.023 filas en 405 sesiones. Inicio da ese total (`voto.listas.sesiones`) y dice que
>    las seis están «escogidas» (plan, anexo adversarial H3 y R1).
> 3. **La destitución del 7-IV-1936 sí sale del corpus.** La proposición pide declarar, «para los fines del último
>    párrafo del artículo 81», que no era necesario el decreto de disolución (V2 102304). Tras la votación, el Diario
>    dice que el Presidente de las Cortes «pasa a ser Presidente de la República» (V2 102368). El rótulo es el de
>    Sesiones.
> 4. **«Todo lo que se dijo en sesión pública quedó impreso» pasa a «se imprimía».** El propio sitio cuenta lo que la
>    Presidencia mandó borrar (F28, El Diario).
> 5. **«Posición»: la ideología no es siempre la del partido.** En la V2, las filas de la CEDA llevan D (7.656), CD
>    (255) y C (51); en 10 de 81 pares partido y legislatura hay más de un valor. La caja dice lo que sí es cierto: la
>    ideología clasifica al diputado, no lo que dijo.
> 6. **«Dentro de cada serie del Diario» pasa a «en cada legislatura».** La numeración recomienza por legislatura
>    (1–405, 1–276, 1–74) y una serie del proyecto, la del Diario de las Sesiones de Cortes, abarca dos.
> 7. **El movimiento 5 se titula «¿Qué sesión leo primero?»**, como la narrativa tras el anexo adversarial (V30): así
>    no casi repite el H1 de Sesiones, «¿Qué se dijo aquel día, y qué se votó?». Su botón es [Ver las sesiones y
>    votaciones]: [Ver las sesiones] llevaba al mismo destino con otro rótulo.
>
> **Fase 2 (corrector del copy, 22-09-2026).** Tesis como la narrativa §6 mov. 1: «Casi nunca fue secreto: sobre todo,
> inabarcable», con «salvo lo que la Presidencia mandó borrar» (P1-1), y la fila definida por lo que reconoce el
> etiquetado, con su fecha y su sesión (P2-3, H21); la puerta del Estatuto, «El discurso de Azaña, a nombre de otro»
> (P1-2); las votaciones, «escogidas» y con su total al lado (H3); «unos 112 MB comprimidos» en unidad decimal
> (P1-4, D-26 (a)); «Haga sus preguntas» (P2-2).
> 8. **Una magnitud por frase.** «Seis votaciones en cinco sesiones» se parte; «siete palabras y 1.460» se queda,
>    porque compara una sola magnitud.

---

## Metadatos

<!-- inicio.meta.titulo -->
Los Diarios de Sesiones de las Cortes, 1931–1945

<!-- inicio.meta.descripcion -->
Los Diarios de Sesiones de las Cortes de la Segunda República, 1931–1945, en una tabla abierta: {{sesiones}} sesiones para contar, leer y citar.

> [nota de diseño] `Base.astro` antepone la marca en Inicio: «Luz y Taquígrafos · Los Diarios de Sesiones de las
> Cortes, 1931–1945». La descripción resuelta mide 135 caracteres (tope, 155).

## 0 · Portada

<!-- inicio.portada.pregunta -->
¿Cómo discutía una democracia que se estaba inventando?

<!-- inicio.portada.entrada -->
Lo que se dijo en las Cortes de la República, sesión a sesión, de 1931 a 1945.

<!-- inicio.portada.llamada -->
[Abrir el explorador ↗] [Descargar los datos]

<!-- inicio.portada.asiento -->
V2 · un CSV de {{dv.csv.bytes|peso}} · CC BY 4.0 · Harvard Dataverse

> [nota de diseño] El H1 va en la primera pantalla, con el hemiciclo sin cambios al lado (textos en `comun.md` § 8:
> título, descripción, pie, crédito del plano, radios y minorías). Sin antetítulo ni `comun.hemiciclo.rotulo`.
> NINGUNA cifra sobre la figura. Destinos de la llamada, por orden: el explorador (el primario, en oro: decisión 2 del
> investigador, 23-09-2026) y `/{lang}/datos/#empezar`. Bajo los botones, el asiento de lo que se descarga con el
> secundario (pulido de la fase 2, `docs/revision_fase2/PULIDO.md`); 107.551 sigue fuera de la portada. Sin portada rotativa (D-5).

## 1 · Tesis (banda invertida: no hay otra en el sitio)

<!-- inicio.tesis.grito -->
«Luz y taquigrafos.»

<!-- inicio.tesis.grito.pie -->
8 de junio de 1934 · V2 {{fila.luz.id.V2|id}} · v3 {{fila.luz.id.v3|id}}. Sin tilde, como en la fila: así salió del reconocimiento óptico.

<!-- inicio.tesis.contexto -->
{{fila.luz.nwords|letra}} palabras con que un diputado interrumpió a la Presidencia, que recordaba que los suplicatorios se tratan en sesión secreta.

<!-- inicio.tesis.inabarcable -->
Lo dicho en sesión pública se imprimía en el Diario, salvo lo que la Presidencia mandó borrar. Casi nunca fue secreto: sobre todo, inabarcable.

<!-- inicio.tesis.resolucion -->
Ahora el Diario es una tabla: una fila cada vez que el etiquetado reconoce la fórmula impresa de un orador, con su fecha y su sesión para volver al impreso.

<!-- inicio.tesis.remate -->
La lectura no se elimina: se aplaza.

<!-- inicio.credencial -->
{{sesiones}} sesiones · 1931–1945 · doi:10.7910/DVN/THQCMI · CC BY 4.0 · Universidad de Salamanca · Harvard Dataverse

> [nota de diseño] El grito, en cursiva grande (es lo que alguien dijo); su pie y la credencial, en mono. El aserto de
> citas compara el grito letra a letra, sin las comillas angulares, con la V2 71330 y la v3 80306. No se dice quién
> gritó: el Diario lo atribuye a «JIMÉNEZ FERNÁNDEZ», pero la Presidencia contesta que no ha visto quién interrumpía
> (V2 71331), y eso se cuenta en El Diario. Tampoco va 107.551 (la escala no es portada) ni «cada turno es una fila»:
> en la V2 hay turnos dentro de filas ajenas y documentos dentro de filas.

## 2 · ¿Cuándo se reunieron las Cortes?

<!-- inicio.calendario.titulo -->
¿Cuándo se reunieron las Cortes?

<!-- inicio.calendario.entrada -->
Hay {{sesiones}} sesiones, del {{sesion.primera|fecha_larga}} al {{sesion.ultima|fecha_larga}}.

<!-- inicio.calendario.como -->
Cada bloque del calendario es una etapa y abre su página.

<!-- inicio.calendario.numeracion -->
En cada legislatura, la numeración de las sesiones no se salta ningún número.

<!-- inicio.calendario.cotejo -->
Que la última sesión del corpus sea la última que se imprimió no lo hemos cotejado.

<!-- inicio.calendario.guerra -->
Después del 18 de julio de 1936 quedan {{sesiones.tras_18jul|letra}} sesiones, y son extractos oficiales, no el Diario íntegro.

<!-- inicio.calendario.palabras -->
Suman el {{palabras.tras_18jul.pct}} de las palabras del corpus.

> [nota de diseño] El texto va antes de la figura (F01c): la frase dice qué buscar antes de que llegue el gráfico. El
> botón, [Ver las Cortes, etapa a etapa], lo pone la plantilla al final. Lo que la figura enseña sin decirlo: la Cámara
> constituyente se reunió casi todos los meses, la de 1933 tuvo huecos, tras julio de 1936 quedan marcas sueltas y
> entre 1939 y 1945 hay un salto rotulado. NO se dicen las causas de un mes vacío (receso, disolución, guerra): no
> salen del corpus. «Extractos oficiales» es la serie de esas catorce sesiones en los metadatos del proyecto (9 y 5).

### F01c · el calendario compacto (rótulos propios de Inicio)

<!-- inicio.f01c.titulo --> Las sesiones, mes a mes, por etapa
<!-- inicio.f01c.nota.etapa --> {{etapa}} · {{n}} sesiones · abre su página

<!-- inicio.f01c.alt -->
Calendario en rejilla de año por mes, agrupado por etapas. Cada mes con sesión lleva un tono según las palabras impresas; los meses sin sesión llevan contorno. Los mismos datos están en la pestaña Tabla.

<!-- inicio.f01c.anota.I --> El único mes sin sesión de las Constituyentes: enero de 1933.
<!-- inicio.f01c.anota.II --> El mes con más palabras: {{f01.mes_max|mes}}, con {{f01.mes_max.palabras}} en {{f01.mes_max.sesiones}} sesiones.
<!-- inicio.f01c.anota.IV --> De la guerra quedan {{etapa.IV.sesiones|letra}} sesiones en {{etapa.IV.meses}} meses, y son extractos oficiales.

> [nota de diseño] Fase 2 (grupo 1): tres anotaciones editoriales como mucho (DESIGN.md § Sistema de figuras), en la
> columna derecha de la figura en escritorio y entre filas en el móvil, cada una junto a la fila de año de la que habla:
> la del único mes vacío de la etapa I (1933), la del mes con más palabras (1934) y la de la guerra (1936). Solo dicen lo
> que el dato sostiene (`meses.json`, V2; `etapa.I.meses.sin_sesion` = 1). No cuentan en el tope de palabras de Inicio.

> [nota de diseño] F01c comparte familia con F01: sus leyendas, su nota de mes, el rótulo del salto y su tabla son los
> de `cortes.md` (`fig.F01.leyenda.*`, `fig.F01.nota.mes*`, `fig.F01.salto`, `fig.F01.tabla.*`), y la leyenda del tono
> es ↺ `comun.fija.tono`. Aquí van solo el título de Inicio, la nota del bloque de etapa (variables `{{etapa}}` y
> `{{n}}`) y el texto alternativo. Cinco bloques rotulados con `comun.etapa.<id>.corto` y `.anos`, con numeral romano;
> cada bloque es un enlace a su ficha. Cinco clases por cuantiles sin interpolar, con los cortes impresos. La ausencia
> nunca es un color. Sin barras por sesión y sin conmutador: eso es F01, en Las Cortes.

## 3 · ¿Qué se decidía allí?

<!-- inicio.votaciones.titulo -->
¿Qué se decidía allí?

<!-- inicio.votaciones.entrada -->
En al menos {{voto.listas.sesiones}} sesiones, el Diario imprime votaciones nominales, con la lista de quien dijo sí y de quien dijo no.

<!-- inicio.votaciones.seleccion -->
Aquí van {{voto.n|letra}}, escogidas, de 1931 a 1936.

<!-- inicio.votaciones.mujeres -->
El 1 de octubre de 1931, el artículo 34 del proyecto de Constitución, el del voto de las mujeres, se aprobó por {{voto.161-121.si}} votos contra {{voto.161-121.no}}.

<!-- inicio.votaciones.salvedad -->
La base no trae el voto como variable: las listas están en el texto.

> [nota de diseño] «Al menos 405 sesiones»: las que tienen una fila con «señores que dijeron / han dicho» seguido de
> «sí» o «no» en el texto sin acentos de la V2 (1.023 filas; la misma definición que Sesiones). Es cota inferior: el
> reconocimiento óptico rompe algún encabezado, como el de la lista del Estatuto. NO se dice «siete
> votaciones»: el 141–106 del mismo 1 de octubre fue ordinaria y se cuenta en Sesiones. Tampoco la equivalencia con el
> art. 36 de la Constitución [EXT], ni quién votó qué (llega en la 0.2). La salvedad va al margen, tras la figura, y
> hace también de salvedad de F26 en Inicio. Botón final: [Ver las votaciones].

### F26 · las votaciones, en su versión de Inicio (rótulos propios)

<!-- inicio.f26.titulo --> Votaciones nominales, con el resultado que imprime el Diario
<!-- inicio.f26.v.161-121 --> Art. 34: el voto de las mujeres
<!-- inicio.f26.v.178-59 --> Art. 24: la cuestión religiosa
<!-- inicio.f26.v.368-466 --> La Constitución
<!-- inicio.f26.v.318-19 --> La Reforma agraria
<!-- inicio.f26.v.314-24 --> El Estatuto de Cataluña
<!-- inicio.f26.v.238-5 --> Art. 81: la destitución del Presidente de la República

<!-- inicio.f26.alt -->
Barras horizontales con los síes y los noes de cada votación nominal, por orden de fecha. Los mismos datos, con el texto literal del Diario, están en la pestaña Tabla.

> [nota de diseño] Es F26 sin la votación ordinaria del 141–106 y con rótulos cortos (`inicio.f26.v.<clave>` en lugar
> de `fig.F26.v.<clave>`); sus notas, su leyenda y su tabla son las de `sesiones.md` (`fig.F26.*`). Seis barras en
> orden de fecha: 1-X-1931, 13-X-1931, 9-XII-1931, 9-IX-1932 (dos) y 7-IV-1936. Línea de «mitad más uno» donde el
> Diario la imprime: 234 de 466, 232 de 462 y 209 de 417. Cada barra enlaza a su puerta si la tiene en la 0.1 (161–121
> → `sufragio-1931`; 178–59 → `cuestion-religiosa-1931`) y, si no, a su fila en la tabla de Sesiones.

## 4 · ¿Qué es una fila?

<!-- inicio.fila.titulo -->
¿Qué es una fila?

<!-- inicio.fila.presidencia -->
«Ruego a la Cámara que guarde silencio.»

<!-- inicio.fila.presidencia.pie -->
La Presidencia · V2 {{fila.presidencia.id.V2|id}} · v3 {{fila.presidencia.id.v3|id}}

<!-- inicio.fila.campoamor -->
«Yo ruego a la Cámara que me escuche en silencio…»

<!-- inicio.fila.campoamor.pie -->
Clara Campoamor · V2 {{fila.campoamor.id.V2|id}} · v3 {{fila.campoamor.id.v3|id}}

<!-- inicio.fila.dos -->
Son dos de las {{filas.V2}} filas de la edición depositada, una detrás de otra en la sesión del 1 de octubre de 1931.

<!-- inicio.fila.palabras -->
La de la Presidencia tiene {{fila.presidencia.nwords|letra}} palabras; la de Campoamor, {{fila.campoamor.nwords}}.

<!-- inicio.fila.leccion -->
Contar filas no es contar discurso.

<!-- ↺ comun.fija.ocr -->
El texto sale del reconocimiento óptico y no está corregido a mano.

> [nota de diseño] Composición tipográfica, sin figura: arriba, en pequeño, la Presidencia; debajo, en cursiva
> grande, Campoamor; cada una con su pie en mono (petición a la plantilla: hoy el pintor genérico las deja como
> párrafos). El aserto de citas compara las dos, sin comillas ni «…», con la V2 5423 y 5424 y la v3 6078 y 6079. NO se
> dice el orden en la sesión: cambia entre ediciones (V2 `order` 26; v3 `ord` 29; pantalla del explorador, «Orden 30»)
> y se explica en Datos. Botón final: [Ver qué trae cada columna].

## 5 · ¿Qué sesión leo primero?

<!-- inicio.puertas.titulo -->
¿Qué sesión leo primero?

<!-- inicio.puertas.entrada -->
Cada momento tiene su página, con sus citas y cómo leerlo entero en el explorador.

<!-- inicio.puertas.sufragio-1931.fecha --> 1-X-1931
<!-- inicio.puertas.sufragio-1931.que --> El voto de las mujeres
<!-- inicio.puertas.sufragio-1931.filas --> {{sesion.1931-10-01-48.filas}} filas (V2)
<!-- inicio.puertas.cuestion-religiosa-1931.fecha --> 13-X-1931
<!-- inicio.puertas.cuestion-religiosa-1931.que --> «España ha dejado de ser católica»
<!-- inicio.puertas.cuestion-religiosa-1931.filas --> {{sesion.1931-10-13-55.filas}} filas (V2)
<!-- inicio.puertas.estatuto-1932.fecha --> 27-V-1932
<!-- inicio.puertas.estatuto-1932.que --> El discurso de Azaña, a nombre de otro
<!-- inicio.puertas.estatuto-1932.filas --> {{sesion.1932-05-27-173.filas}} filas (V2)
<!-- inicio.puertas.casas-viejas-1933.fecha --> 2-II-1933
<!-- inicio.puertas.casas-viejas-1933.que --> Casas Viejas
<!-- inicio.puertas.casas-viejas-1933.filas --> {{sesion.1933-02-02-288.filas}} filas (V2)
<!-- inicio.puertas.pistola-1934.fecha --> 4-VII-1934
<!-- inicio.puertas.pistola-1934.que --> La pistola de Prieto
<!-- inicio.puertas.pistola-1934.filas --> {{sesion.1934-07-04-112.filas}} filas (V2)
<!-- inicio.puertas.antesala-1936.fecha --> 16-VI y 1-VII-1936
<!-- inicio.puertas.antesala-1936.que --> La antesala
<!-- inicio.puertas.antesala-1936.filas --> {{sesion.1936-06-16-45.filas}} y {{sesion.1936-07-01-54.filas}} filas (V2)
<!-- inicio.puertas.figueres-1939.fecha --> 1-II-1939
<!-- inicio.puertas.figueres-1939.que --> Figueres
<!-- inicio.puertas.figueres-1939.filas --> {{sesion.1939-02-01-69.filas}} filas (V2)
<!-- inicio.puertas.mexico-1945.fecha --> 17-VIII y 7–9-XI-1945
<!-- inicio.puertas.mexico-1945.que --> México
<!-- inicio.puertas.mexico-1945.filas --> {{puerta.mexico-1945.filas}} filas (V2)

<!-- inicio.puertas.salvedad -->
Que estén no valida su contenido: el acta digitalizada del 1 de octubre de 1931 perdió su final en el reconocimiento óptico.

> [nota de diseño] Registro de calendario (`RegistroPuertas`, familia «inicio»), no tarjetas: fecha en mono · qué
> pasó · filas en versalitas; cada línea enlaza a su puerta. Títulos y fechas iguales a los de `sesiones.md`
> (`sesiones.lista.<ruta>.*`), sin la línea de resumen. El título es el de la narrativa §10.3, «El discurso de Azaña, a
> nombre de otro»: «el discurso más largo» solo vale en la v3 y va, con su base, en el cuerpo de la puerta. La salvedad
> empieza por ↺ 9 letra a letra y la ata al ejemplo comprobado: filas V2 5788–5792 (cinco «Pido la palabra.»; la
> última acaba en «El Sr. Ministro de»), incidencia `truncated_end`. Las ocho puertas cubren doce sesiones: nunca
> «dieciséis sesiones». En México, la línea de filas no dice «en cuatro sesiones»: las cuatro fechas ya lo dicen, y a
> 375 px la columna de filas, que no se parte, desbordaba la página. Botón final: [Ver las sesiones y votaciones].

## 6 · ¿Qué no trae la base?

<!-- inicio.falta.titulo -->
¿Qué no trae la base?

<!-- inicio.falta.entrada -->
No trae estas columnas; habría que construirlas.

<!-- inicio.falta.tema -->
**Tema.** No hay columna de tema: cada búsqueda es una hipótesis suya.

<!-- inicio.falta.tono -->
**Tono.** Las acotaciones están en el texto; el tono no se mide.

<!-- inicio.falta.posicion -->
**Posición.** La ideología clasifica al diputado, no lo que dijo.

<!-- inicio.falta.voto -->
**Voto.** Las listas nominales están en el texto, no en una columna.

<!-- inicio.falta.afinidades -->
Una base derivada ya existe: Afinidades Elegidas, quién firmó con quién.

<!-- inicio.falta.usted -->
Aquí entra usted.

> [nota de diseño] Cuatro cajas vacías con filete discontinuo: el vacío es el contenido; el nombre en negrita, en mono
> (petición a la plantilla: hoy son párrafos). Sin iconos. Las cajas dicen lo que falta, no lo que se hizo con el
> prototipo de 1931. NINGUNA cifra de Afinidades en Inicio mientras siga abierta la D-3. Botón final: [Ver Afinidades
> Elegidas].

## 7 · ¿Por dónde empiezo?

<!-- inicio.empezar.titulo -->
¿Por dónde empiezo?

<!-- inicio.empezar.entrada -->
Elija por lo que ya sabe hacer.

<!-- ↺ comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- ↺ comun.fija.formulario.motivo -->
Con esos datos queremos saber quién usa la base y con qué fin, para poder mejorarla y comunicar novedades.

<!-- inicio.empezar.sin_programar -->
**Sin programar.** Los datos de cada figura, en su pestaña Datos, o el explorador: unos {{explorador.gz.bytes|peso_dec0}} comprimidos la primera vez, sin formulario.

<!-- ↺ comun.fija.explorador -->
Sirve la edición v3, sin depositar; pide un ordenador.

<!-- ↺ comun.boton.explorador --> [Abrir el explorador ↗]

<!-- inicio.empezar.programar -->
**Con R o Python.** El CSV depositado: {{dv.csv.bytes|peso}}.

<!-- ↺ comun.boton.descargar --> [Descargar los datos]

<!-- inicio.empezar.redes -->
**Con métodos de redes.** Afinidades Elegidas: quién firmó con quién.

<!-- ↺ comun.boton.ver_afinidades --> [Ver Afinidades Elegidas]

<!-- inicio.empezar.remate -->
Los datos están publicados. Haga sus preguntas.

<!-- inicio.empezar.salvedad -->
Los identificadores de fila cambian entre la edición depositada (V2) y la del explorador (v3); la sesión —fecha y número— es la misma en las dos.

> [nota de diseño] ↺ 3 y el motivo del formulario (D-20) van ENCIMA de la escalera. Tres peldaños, titulados
> por lo que la persona sabe hacer (`Salidas`: la negrita es el título), cada uno con su botón de rótulo único; el de
> «Con R o Python» lleva a Usar los datos (`#empezar`), donde se elige el archivo antes del formulario. Tras la
> escalera, la cita oficial tal como la da Dataverse, con su «V2», y [Copiar la cita] (la pinta la plantilla); luego
> el remate (D-24) y, al margen, ↺ 4 con la misma redacción: explica el doble id de la tesis y de la fila. «Unos
> 112 MB comprimidos» es lo que descarga el explorador (111.733.652 B), en unidad decimal: regla de la crítica mientras
> el investigador decide D-26, opción (a). En la unidad de Dataverse serían 106,6 MB. NO se dicen
> visitas ni descargas, ni «funciona sin conexión».

## Anexo A · Tests de rechazo (recuento del 22-09-2026)

Recuento con `docs/marcadores/contar_inicio.py` (rehecho por el corrector de la fase 2), sobre el texto resuelto con los valores de
`docs/marcadores/inicio.md`. Cuenta el copy de `<main>`: títulos, entradas, frases, citas con su pie, credencial,
registro de puertas, cajas, escalera, frases fijas y remate. No cuenta los rótulos de botón, los rótulos y notas de
las figuras, los textos alternativos, la cita oficial ni el motivo del formulario (D-20).

| movimiento | palabras | tope del plan | de ellas, límites |
|---|---:|---:|---:|
| 0 · Portada (con el pie del hemiciclo) | 61 | 60 | 0 |
| 1 · Tesis (con su pie y la credencial) | 105 | 90 | 7 |
| 2 · ¿Cuándo se reunieron las Cortes? | 86 | 100 | 24 |
| 3 · ¿Qué se decidía allí? | 74 | 90 | 14 |
| 4 · ¿Qué es una fila? | 85 | 90 | 12 |
| 5 · ¿Qué sesión leo primero? (con el registro) | 108 | 110 | 22 |
| 6 · ¿Qué no trae la base? | 72 | 70 | 0 |
| 7 · ¿Por dónde empiezo? (con la escalera) | 98 | 90 | 35 |
| **Total** | **689** | **700** | **114 de 120** |

- **Límites contados:** «salvo lo que la Presidencia mandó borrar», en la tesis; el cotejo de la numeración; «y son extractos oficiales, no el Diario íntegro»; la salvedad de
  las listas; ↺ 7; la salvedad de las puertas (↺ 9 con el acta truncada); ↺ 4 y ↺ «Sirve la edición v3, sin
  depositar; pide un ordenador». Ninguno va antes del primer hallazgo, que es el grito de la tesis.
- **Varios movimientos rozan su tope, y la página no lo pasa.** La tesis cuenta su pie (fecha e ids, 9 palabras) y la
  credencial (13), que son líneas de datos en mono; sin ellas son 83, y su texto es el de la narrativa §6. El 5 cuenta el registro de las ocho puertas y queda en su tope. El
  7 lleva enteras ↺ 3 y ↺ 4 (38 palabras de frases fijas que la narrativa pone ahí).
- **La primera pregunta**, el H1, va en la primera pantalla a 1.440 y a 375 px (comprobado con Playwright).
- **Ninguna frase pasa de 30 palabras.** La más larga es `inicio.tesis.resolucion` (30, con los dos puntos: la frase de la narrativa).
- **La descripción** resuelta mide 135 caracteres (tope, 155).
