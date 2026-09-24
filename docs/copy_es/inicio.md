# Copy ES · Inicio (`/[lang]/`)

> **Estado (23-09-2026).** Rediseño aprobado por el investigador (`docs/REDISENO_23-09.md`, decisiones 1–5 del
> § 8: landing y seis páginas · cifras redondas · «Pruebe una palabra» · fichas de etapa en una página · el grito con
> tilde y sin la nota del OCR) y su petición del mismo día: **gráficos interactivos, atractivos, que se manipulan y se
> juegan**. Sustituye al Inicio de la vista previa del 22-09 (etiqueta `v0.1-antes-del-rediseno`, commit `240b401`).
>
> **Reglas de este archivo.** Una idea, una figura y una acción por bloque. Ni «V2» ni «v3» ni ids de fila: solo
> cifras que valen para las dos ediciones (`|redondo` redondea HACIA ABAJO a una cifra significativa, así que «más
> de…» es cierto en las dos). Las salvedades viven en Método. Presupuesto: 450 palabras visibles.
>
> Al final, **«Claves que usan otras páginas»**: el calendario, las votaciones, el registro de puertas, Método y la
> página de componentes leen claves `inicio.*` que Inicio ya no pinta. Se conservan tal cual.

---

## Metadatos

<!-- inicio.meta.titulo -->
Los Diarios de Sesiones de las Cortes, 1931–1945

<!-- inicio.meta.descripcion -->
Todo lo que se dijo en las Cortes de la Segunda República, de 1931 a 1945: {{sesiones}} sesiones para buscar, leer, contar y citar.

## 0 · Portada

<!-- inicio.portada.pregunta -->
¿Cómo discutía una democracia que se estaba inventando?

<!-- inicio.portada.entrada -->
Todo lo que se dijo en el Congreso de la Segunda República, de 1931 a 1945, listo para buscar, leer, contar y citar.

<!-- inicio.portada.llamada -->
[Abrir el explorador ↗] [Descargar los datos]

<!-- inicio.credencial -->
{{sesiones}} sesiones · más de {{filas.V2|redondo}} intervenciones · {{diputados.V2}} diputados · CC BY 4.0 · Harvard Dataverse

> [nota de diseño] El hemiciclo de 1936, sin cambios (la Cámara se sienta). La leyenda se pliega en sus cuatro
> bloques; las dieciocho minorías aparecen al elegir uno.

## 1 · El nombre (la única banda invertida)

<!-- inicio.nombre.grito -->
«Luz y taquígrafos.»

<!-- inicio.nombre.texto -->
Lo gritó un diputado el 8 de junio de 1934, cuando la Presidencia recordó que los suplicatorios se tratan en sesión secreta. Casi todo lo demás se imprimía en el Diario de Sesiones: más de {{palabras.V2|redondo}} de palabras que nadie podía leer enteras. Ahora se pueden buscar.

> [nota de diseño] Decisión 5: «taquígrafos» con tilde, como en el Diario impreso; la errata es del reconocimiento
> óptico, no de la fuente, y no se explica aquí.

## 2 · Más que una base de datos

<!-- inicio.piezas.titulo -->
Más que una base de datos

<!-- inicio.piezas.entrada -->
Una infraestructura para investigar la República desde su Parlamento.

<!-- inicio.piezas.diario -->
**El Diario entero.** Las {{sesiones}} sesiones, de las Constituyentes al exilio en México.

<!-- inicio.piezas.fila -->
**Cada intervención, una fila.** Quién habla, cuándo y en qué sesión, con su texto.

<!-- inicio.piezas.orador -->
**Los oradores, identificados.** {{diputados.V2}} diputados, con su partido y su ideología.

<!-- inicio.piezas.explorador -->
**Un explorador en el navegador.** Buscar, reunir, leer y comparar, sin instalar nada.

<!-- inicio.piezas.redes -->
**Redes de coautoría.** Afinidades Elegidas: quién firmó con quién.

<!-- inicio.piezas.abierto -->
**Abierto y citable.** Un CSV con DOI y licencia CC BY 4.0, listo para R o Python.

## 3 · El laboratorio de palabras (juego 1)

<!-- inicio.lab.titulo -->
¿Cuándo se habló de…?

<!-- inicio.lab.entrada -->
Escriba una palabra o elija una. La curva cuenta cuántas veces se dijo cada mes; el calendario se enciende donde más se habló.

<!-- inicio.lab.etiqueta -->
Palabra o expresión

<!-- inicio.lab.propuestas -->
Pruebe con

<!-- inicio.lab.comparar -->
Comparar

<!-- inicio.lab.quitar -->
Quitar

<!-- inicio.lab.ninguna -->
«{palabra}» no está entre las palabras de este laboratorio. El explorador lo busca todo.

<!-- inicio.lab.cargando -->
Cargando las palabras…

<!-- inicio.lab.mes -->
{mes}: {n} veces, {d} por cada diez mil palabras

<!-- inicio.lab.nada -->
{mes}: sin sesiones

<!-- inicio.lab.nota -->
Apariciones por cada diez mil palabras, contadas como en el explorador; los meses con poco texto, en trazo fino.

<!-- inicio.lab.calendario -->
Cada casilla es un mes con sesiones. Los anillos abren ocho momentos.

<!-- inicio.lab.alt -->
Curva de las apariciones mensuales de la palabra elegida, de 1931 a 1945, y calendario de los meses con sesión coloreado según esa frecuencia.

> [nota de diseño] Juego 1. El título es la pregunta y el eco de la palabra elegida. Sin JS: ocho palabras con radios
> (curva y calendario pre-dibujados). Con JS: cualquier palabra de las más frecuentes o de las expresiones del
> explorador, hasta tres a la vez, recorrer la curva con el puntero o el teclado. Datos:
> `public/datos/laboratorio.json` (exportador › laboratorio.py, recontado sobre el índice FTS5 del explorador).

## 4 · ¿Cuántos votaron sí? (juego 2)

<!-- inicio.apuesta.titulo -->
¿Cuántos votaron sí?

<!-- inicio.apuesta.entrada -->
Seis votaciones nominales, de 1931 a 1936. Arrastre la barra hasta donde crea que llegó el sí y compruébelo con el Diario.

<!-- inicio.apuesta.su -->
Su apuesta

<!-- inicio.apuesta.si -->
sí

<!-- inicio.apuesta.no -->
no

<!-- inicio.apuesta.comprobar -->
Comprobar

<!-- inicio.apuesta.todas -->
Ver todos los resultados

<!-- inicio.apuesta.otra -->
Volver a jugar

<!-- inicio.apuesta.cerca -->
Casi exacto: a {d} puntos.

<!-- inicio.apuesta.lejos -->
A {d} puntos del resultado.

<!-- inicio.apuesta.marcador -->
{n} de {total} a menos de diez puntos.

<!-- inicio.apuesta.pie -->
Resultados como los imprime el Diario de Sesiones. [Ver las sesiones y votaciones]

> [nota de diseño] Juego 2. Una fila por votación nominal (rótulos `inicio.f26.v.*`), con un deslizador que llena la
> barra mientras se arrastra. «Comprobar» revela el reparto real de síes y noes y la distancia en puntos. Sin JS: los
> resultados, a la vista.

## 5 · La red de las firmas (juego 3)

<!-- inicio.red.titulo -->
¿Con quién firmaba cada diputado?

<!-- inicio.red.entrada -->
Cada punto es un diputado; cada línea, una proposición firmada juntos. Cambie de legislatura o busque a un diputado.

<!-- ↺ comun.boton.ver_afinidades --> [Ver Afinidades Elegidas]

> [nota de diseño] Juego 3. F21, la figura de Afinidades que el investigador considera lograda, en su versión de
> escaparate: sin sellos, sin código de figura y sin salvedad; con el cambio de legislatura, el buscador y la red viva.

## 6 · Empiece hoy

<!-- inicio.empezar.titulo -->
Empiece hoy

<!-- inicio.empezar.sin_programar -->
**Sin programar.** El explorador, en su navegador.

<!-- ↺ comun.boton.explorador --> [Abrir el explorador ↗]

<!-- inicio.empezar.programar -->
**Con R o Python.** El CSV, con su DOI.

<!-- ↺ comun.boton.descargar --> [Descargar los datos]

<!-- inicio.empezar.redes -->
**Con redes.** Afinidades Elegidas: quién firmó con quién.

<!-- ↺ comun.boton.ver_afinidades --> [Ver Afinidades Elegidas]

<!-- inicio.empezar.remate -->
Los datos están publicados. Haga sus preguntas.

> [nota de diseño] Tras la escalera, la cita oficial con [Copiar la cita] (la pinta la plantilla) y el remate (D-24).

---

## Claves que usan otras páginas

> Inicio ya no las pinta. Las leen `FigCalendario` (títulos de las puertas), `FigVotaciones` (rótulos cortos),
> `RegistroPuertas`, Método (las cuatro cajas de lo que la base no trae) y la página de componentes. Se conservan tal
> cual estaban el 23-09-2026.

<!-- inicio.f01c.titulo --> Las sesiones, mes a mes, por etapa

<!-- inicio.f01c.nota.etapa --> {{etapa}} · {{n}} sesiones · abre su página

<!-- inicio.f01c.alt -->
Calendario en rejilla de año por mes, agrupado por etapas. Cada mes con sesión lleva un tono según las palabras impresas; los meses sin sesión llevan contorno. Los mismos datos están en la pestaña Tabla.

<!-- inicio.f01c.anota.I --> El único mes sin sesión de las Constituyentes: enero de 1933.

<!-- inicio.f01c.anota.II --> El mes con más palabras: {{f01.mes_max|mes}}, con {{f01.mes_max.palabras}} en {{f01.mes_max.sesiones}} sesiones.

<!-- inicio.f01c.anota.IV --> De la guerra quedan {{etapa.IV.sesiones|letra}} sesiones en {{etapa.IV.meses}} meses, y son extractos oficiales.

<!-- inicio.f26.titulo --> Votaciones nominales, con el resultado que imprime el Diario

<!-- inicio.f26.v.161-121 --> Art. 34: el voto de las mujeres

<!-- inicio.f26.v.178-59 --> Art. 24: la cuestión religiosa

<!-- inicio.f26.v.368-466 --> La Constitución

<!-- inicio.f26.v.318-19 --> La Reforma agraria

<!-- inicio.f26.v.314-24 --> El Estatuto de Cataluña

<!-- inicio.f26.v.238-5 --> Art. 81: la destitución del Presidente de la República

<!-- inicio.f26.alt -->
Barras horizontales con los síes y los noes de cada votación nominal, por orden de fecha. Los mismos datos, con el texto literal del Diario, están en la pestaña Tabla.

<!-- inicio.fila.titulo -->
¿Qué es una fila?

<!-- inicio.fila.presidencia -->
«Ruego a la Cámara que guarde silencio.»

<!-- inicio.fila.presidencia.pie -->
La Presidencia

<!-- inicio.fila.campoamor -->
«Yo ruego a la Cámara que me escuche en silencio…»

<!-- inicio.fila.campoamor.pie -->
Clara Campoamor

<!-- inicio.fila.dos -->
Son dos de las {{filas.V2}} filas de la base, una detrás de otra en la sesión del 1 de octubre de 1931.

<!-- inicio.fila.palabras -->
La de la Presidencia tiene {{fila.presidencia.nwords|letra}} palabras; la de Campoamor, {{fila.campoamor.nwords}}.

<!-- inicio.fila.leccion -->
Contar filas no es contar discurso.

<!-- inicio.puertas.titulo -->
¿Qué sesión leo primero?

<!-- inicio.puertas.entrada -->
Cada momento tiene su página, con sus citas y cómo leerlo entero en el explorador.

<!-- inicio.puertas.sufragio-1931.fecha --> 1-X-1931

<!-- inicio.puertas.sufragio-1931.que --> El voto de las mujeres

<!-- inicio.puertas.sufragio-1931.filas --> {{sesion.1931-10-01-48.filas}} filas

<!-- inicio.puertas.cuestion-religiosa-1931.fecha --> 13-X-1931

<!-- inicio.puertas.cuestion-religiosa-1931.que --> «España ha dejado de ser católica»

<!-- inicio.puertas.cuestion-religiosa-1931.filas --> {{sesion.1931-10-13-55.filas}} filas

<!-- inicio.puertas.estatuto-1932.fecha --> 27-V-1932

<!-- inicio.puertas.estatuto-1932.que --> El Estatuto de Cataluña

<!-- inicio.puertas.estatuto-1932.filas --> {{sesion.1932-05-27-173.filas}} filas

<!-- inicio.puertas.casas-viejas-1933.fecha --> 2-II-1933

<!-- inicio.puertas.casas-viejas-1933.que --> Casas Viejas

<!-- inicio.puertas.casas-viejas-1933.filas --> {{sesion.1933-02-02-288.filas}} filas

<!-- inicio.puertas.pistola-1934.fecha --> 4-VII-1934

<!-- inicio.puertas.pistola-1934.que --> La pistola de Prieto

<!-- inicio.puertas.pistola-1934.filas --> {{sesion.1934-07-04-112.filas}} filas

<!-- inicio.puertas.antesala-1936.fecha --> 16-VI y 1-VII-1936

<!-- inicio.puertas.antesala-1936.que --> La antesala

<!-- inicio.puertas.antesala-1936.filas --> {{sesion.1936-06-16-45.filas}} y {{sesion.1936-07-01-54.filas}} filas

<!-- inicio.puertas.figueres-1939.fecha --> 1-II-1939

<!-- inicio.puertas.figueres-1939.que --> Figueres

<!-- inicio.puertas.figueres-1939.filas --> {{sesion.1939-02-01-69.filas}} filas

<!-- inicio.puertas.mexico-1945.fecha --> 17-VIII y 7–9-XI-1945

<!-- inicio.puertas.mexico-1945.que --> México

<!-- inicio.puertas.mexico-1945.filas --> {{puerta.mexico-1945.filas}} filas

<!-- inicio.puertas.salvedad -->
Que estén no valida su contenido: el acta digitalizada del 1 de octubre de 1931 perdió su final en el reconocimiento óptico.

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
