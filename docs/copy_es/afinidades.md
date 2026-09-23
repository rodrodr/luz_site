# Copy ES · Afinidades Elegidas (`/[lang]/afinidades/`)

> **Fase 2 (23-09-2026, grupo 6).** Antetítulos de sección convertidos en asientos con su base; claves nuevas de F21
> (leyenda de las siete ideologías, cofirmantes, buscador, grafías) y de F22 (tramo del centro); `fig.F21.titulo` cambia
> para no repetir el H2 de su sección; F22 pasa a una barra por legislatura con el tramo estricto desde el cero.
> Peticiones: `docs/peticiones/grupo6-explorador-afinidades.md`.
>
> **Estado (22-09-2026).** Borrador para la vista previa (Puerta 4). Dueño: copy de «Afinidades Elegidas». Sigue la
> narrativa §16 y la plantilla K del plan. **Todas las cifras son de CGOCUS V1.1, depositada** (D-3, decidida el 23-09-2026:
> se publica sobre la V1.1 con su sello y la corrección v2 se nombra «en preparación», sin cifras). Se recalcularon hoy sobre los archivos
> originales de CGOCUS V1.1, con su MD5 de Dataverse comprobado. Marcadores: `docs/marcadores/afinidades.md`.
>
> **Cómo se lee.** Como `explorador.md`: `<!-- clave -->`, `<!-- ↺ clave -->` para las frases fijas y los rótulos de
> `comun.md`, y `> [nota de diseño]` para lo que no es texto del lector. Ninguna cifra va tecleada. Las claves cuelgan
> del prefijo de su sección en la plantilla (`afinidades.firmar.*`, `afinidades.cruce.*`, `afinidades.limites.*`…); la
> cabecera lleva `afinidades.que_es`, `afinidades.nombre` y `afinidades.abrir`.
>
> **Lo que cambia respecto a la narrativa, y por qué** (recalculado hoy):
> 1. **«Firman»: 453 / 440 / 315, no 454 / 446 / 316.** La cifra antigua cuenta también a firmantes que el censo sitúa
>    en otra legislatura (1 / 6 / 1). Con ella, censo ≠ firman + aislados (475 ≠ 454 + 22). Ahora cuadra, y esos
>    firmantes van en su propia fila de la tabla.
> 2. **«En 1936-1939, casi todo el cruce estricto es de la izquierda con el PNV» es falso.** El PNV está en el 24,5 % de
>    esas relaciones (85 de 347); la CEDA, en 97. Se sustituye por dos hechos medidos: el peso del centro en el cruce
>    (79,8 % → 89,0 % → 21,5 %) y la concentración del cruce estricto de 1936-1939 en 16 de las 89 medidas.
> 3. **«Cuatro meses de Cámara y después la guerra»** se ancla en la base: 85 de las 89 medidas de 1936-1939 son
>    anteriores al 18 de julio de 1936.
> 4. **Nueva salvedad, ya presente en V1.1:** 175 de las 1.530 medidas llegan al Diario con la lista de firmas cortada
>    («Siguen las firmas hasta…»). Es el 13,2 % de las relaciones. Y 781 de las 13.452 firmas no se atribuyeron.
> 5. **Dentro de CGOCUS V1.1**, `2REP_cosponsorship` rotula la segunda legislatura «1933-1935» y los demás archivos
>    «1933-1936». Va en «Los datos», porque es una trampa al unir.

---

## Metadatos

<!-- afinidades.meta.titulo -->
Afinidades Elegidas

<!-- afinidades.meta.descripcion -->
Quién firmó con quién en el Congreso de la República, 1931–1939: tres redes de coautoría, dos maneras de medir el cruce y lo que la firma no dice.

> [nota de diseño] Índice lateral con las ocho secciones (sus `*.titulo`). **Se construye la última** (D-3). Ninguna
> cifra de esta página sale de ella, tampoco a Inicio. La plantilla pone el sello `comun.sello.afin` (↺ 2) bajo el H1,
> sin marca de pendiente (D-3 cerrada). Si se deposita CGOCUS V2.0, el exportador vuelve a calcular y el sello cambia;
> entonces se quita de `afinidades.que_es` la frase «en preparación».

## Cabecera

<!-- afinidades.antetitulo -->
doi:10.7910/DVN/CGOCUS · {{dv.cgocus.version}} · {{dv.cgocus.version.fecha|fecha_corta}}

<!-- afinidades.titulo -->
¿Con quién estaban dispuestos a firmar?

<!-- afinidades.entrada -->
Hablar en contra es público y barato; firmar una medida con otro exige un acuerdo previo, casi siempre fuera del acta.

<!-- ↺ comun.sello.afin -->
Afinidades Elegidas (CGOCUS V1.1, depositada)

<!-- afinidades.que_es -->
Afinidades Elegidas es una base derivada de Luz y Taquígrafos, con su propio depósito. Reúne quién firmó con quién en el Congreso, de 1931 a 1939. Las cifras de esta página son de la V1.1 depositada; hay una versión corregida en preparación.

<!-- afinidades.nombre -->
El nombre viene de la afinidad electiva de Goethe, que Max Weber llevó a la sociología. «Elegidas», y no «electivas», subraya la decisión de quien firma. Y deja oír otra lectura: las afinidades de los electos.

<!-- afinidades.abrir -->
[Abrir Afinidades ↗]

> [nota de diseño] La cabecera pinta `afinidades.que_es`, `afinidades.nombre` y `afinidades.abrir` (sus `extras`), con
> el sello ↺ 2 anclado tras la entrada. `afinidades.nombre` resume «Sobre el nombre» de `METHODOLOGY.md` (CGOCUS): es la
> explicación del proyecto, no un hecho externo. [Abrir Afinidades ↗] va a `#red`, en otra pestaña.

<!-- afinidades.indice.firmar -->
Firmar no es hablar

<!-- afinidades.indice.cifras -->
Tres legislaturas

<!-- afinidades.indice.cruce -->
¿Se cruzaba de bloque?

<!-- afinidades.indice.redes -->
Tres redes

<!-- afinidades.indice.puentes -->
Los puentes

<!-- afinidades.indice.limites -->
Lo que no mide

<!-- afinidades.indice.datos -->
Los datos

## 2. Firmar no es hablar

<!-- afinidades.firmar.antetitulo -->
CGOCUS {{dv.cgocus.version}} · {{afin.relaciones}} relaciones par-medida · {{afin.medidas}} medidas

<!-- afinidades.firmar.titulo -->
Firmar no es hablar

<!-- afinidades.firmar.medida -->
Una medida es una proposición de ley, una enmienda, un ruego colectivo, una interpelación u otro documento que firman dos o más diputados. Afinidades las saca de los mismos Diarios de Sesiones y reconoce a cada firmante.

<!-- afinidades.firmar.relacion -->
Dos diputados que firman la misma medida forman una relación. Su peso es el número de medidas que comparten.

<!-- afinidades.firmar.total -->
La base reúne {{afin.relaciones}} relaciones par-medida: una por cada par de firmantes de cada medida.

<!-- afinidades.firmar.identificar -->
Cada firma se atribuye a un diputado por su nombre, de forma automática y con revisión de los casos dudosos. De las {{afin.firmas}} firmas, {{afin.firmas_sin_diputado}} se quedaron sin atribuir.

<!-- afinidades.firmar.sin_relacion -->
Hay {{afin.medidas_sin_relacion}} medidas que no llegan a dos firmantes identificados; no forman ninguna relación.

<!-- afinidades.firmar.periodo -->
Cubre las tres legislaturas de la República, de 1931 a 1939. Las sesiones de México, en 1945, no entran.

## 3. Tres legislaturas en cifras

<!-- afinidades.cifras.antetitulo -->
CGOCUS {{dv.cgocus.version}} · {{afin.personas}} personas · {{afin.tres_leg}} en las tres legislaturas

<!-- afinidades.cifras.titulo -->
Tres legislaturas en cifras

<!-- afinidades.cifras.entrada -->
El censo de Afinidades tiene una ficha por diputado y legislatura. Reúne {{afin.personas}} personas.

<!-- afinidades.cifras.tabla.titulo -->
Diputados, firmas y medidas por legislatura

<!-- afinidades.cifras.tabla.col.leg -->
Legislatura

<!-- afinidades.cifras.tabla.censo -->
Diputados en el censo

<!-- afinidades.cifras.tabla.firman -->
Firman al menos una medida

<!-- afinidades.cifras.tabla.aislados -->
No firman ninguna (aislados)

<!-- afinidades.cifras.tabla.medidas -->
Medidas firmadas por dos o más

<!-- afinidades.cifras.tabla.relaciones -->
Relaciones par-medida

<!-- afinidades.cifras.tabla.fuera -->
Firmantes sin ficha en esa legislatura

<!-- afinidades.cifras.tabla.nota -->
La última fila cuenta a firmantes que el censo sitúa en otra legislatura. No entran en las filas de arriba.

> [nota de diseño] Tabla que pinta la plantilla (filas = claves; celdas = marcadores). Las claves con el segmento
> `tabla` no las pinta `lectura.ts`: son de la tabla.
>
> | | 1931-1933 | 1933-1936 | 1936-1939 |
> |---|---:|---:|---:|
> | `afinidades.cifras.tabla.censo` | {{afin.1931.censo}} | {{afin.1933.censo}} | {{afin.1936.censo}} |
> | `afinidades.cifras.tabla.firman` | {{afin.1931.firman}} | {{afin.1933.firman}} | {{afin.1936.firman}} |
> | `afinidades.cifras.tabla.aislados` | {{afin.1931.aislados}} | {{afin.1933.aislados}} | {{afin.1936.aislados}} |
> | `afinidades.cifras.tabla.medidas` | {{afin.1931.medidas}} | {{afin.1933.medidas}} | {{afin.1936.medidas}} |
> | `afinidades.cifras.tabla.relaciones` | {{afin.1931.relaciones}} | {{afin.1933.relaciones}} | {{afin.1936.relaciones}} |
> | `afinidades.cifras.tabla.fuera` | {{afin.1931.fuera_censo}} | {{afin.1933.fuera_censo}} | {{afin.1936.fuera_censo}} |
>
> Las cabeceras de columna son los rótulos de legislatura de CGOCUS, tal cual (D-6). Aserto de compilación: censo =
> firman + aislados en cada columna.

<!-- afinidades.cifras.tres -->
En las tres legislaturas están {{afin.tres_leg}} diputados.

<!-- afinidades.cifras.guerra -->
La legislatura de 1936-1939 dejó {{afin.1936.medidas}} medidas firmadas por dos o más diputados, frente a {{afin.1933.medidas}} en la anterior.

<!-- ↺ comun.fija.legislatura -->
El censo y las relaciones de Afinidades Elegidas llaman 1933-1936 a la legislatura que esta base llama 1933-1935; las sesiones del Diario terminan el 10 de diciembre de 1935.

## 4. ¿Se cruzaba de bloque?

<!-- afinidades.cruce.antetitulo -->
CGOCUS {{dv.cgocus.version}} · denominador: las filas del edgelist de cada legislatura

<!-- afinidades.cruce.titulo -->
¿Se cruzaba de bloque?

<!-- afinidades.cruce.entrada -->
Hay dos maneras de medir si se firmaba con el otro lado de la Cámara, y cuentan historias distintas.

<!-- afinidades.cruce.bloques -->
Cada diputado cae en un bloque según la ideología de su ficha. Izquierda reúne la extrema izquierda, la izquierda y el centro-izquierda; derecha, el centro-derecha, la derecha y la extrema derecha. Entre las dos queda el centro.

<!-- afinidades.cruce.dos -->
El cruce de bloque cuenta cualquier par de bloques distintos, centro incluido. El estricto cuenta solo la izquierda con la derecha.

<!-- afinidades.cruce.bloque -->
La parte de las relaciones que cruza de bloque cae del {{afin.1931.cruce_bloque|pct1}} en 1931-1933 al {{afin.1936.cruce_bloque|pct1}} en 1936-1939.

<!-- afinidades.cruce.estricto -->
El cruce estricto no cae de forma continua: {{afin.1931.cruce_estricto|pct1}}, {{afin.1933.cruce_estricto|pct1}} y {{afin.1936.cruce_estricto|pct1}}, legislatura a legislatura.

<!-- afinidades.cruce.centro -->
Hasta la guerra, la mayor parte del cruce pasa por el centro. En la Constituyente, el {{afin.1931.cruce_centro|pct1}} de las relaciones que cruzan de bloque tiene un firmante del centro. En 1933-1936, el {{afin.1933.cruce_centro|pct1}}.

<!-- afinidades.cruce.centro_1936 -->
En 1936-1939 el centro casi desaparece: está en el {{afin.1936.cruce_centro|pct1}} del cruce. Lo que queda es cruce estricto.

<!-- afinidades.cruce.concentrado -->
Y ese cruce estricto se reúne en {{afin.1936.medidas_estricto}} de las {{afin.1936.medidas}} medidas de la legislatura.

<!-- afinidades.cruce.pnv -->
El PNV cuenta en la derecha, porque el censo lo codifica en el centro-derecha. En 1936-1939 está en el {{afin.1936.estricto_pnv|pct1}} de las relaciones de cruce estricto.

<!-- afinidades.cruce.lectura -->
Es una lectura de los datos por bloques, hecha para esta página; los bloques no son una categoría de CGOCUS.

> [nota de diseño] F22 va tras `afinidades.cruce.estricto` si la plantilla la coloca a mano; si pinta «lo que haya», al
> final de la sección. Las frases del centro, de la concentración y del PNV son su lectura.

### F22 · Dos cruces

<!-- fig.F22.titulo -->
Dos cruces

<!-- fig.F22.pregunta -->
¿Se firmaba con el otro bloque?

<!-- fig.F22.que_mide -->
En cada legislatura, la parte de las relaciones par-medida que une a firmantes de bloques distintos, y la parte que une izquierda con derecha.

<!-- fig.F22.denominador -->
Las relaciones par-medida de cada legislatura: {{afin.1931.relaciones}}, {{afin.1933.relaciones}} y {{afin.1936.relaciones}}.

<!-- fig.F22.leyenda.bloque -->
De bloque

<!-- fig.F22.leyenda.estricto -->
Estricto: izquierda con derecha

<!-- fig.F22.nota -->
{{legislatura}} · {{serie}}: {{pct}} · {{n}} de {{den}} relaciones par-medida

<!-- fig.F22.leyenda.centro -->
De bloque, con un firmante del centro

<!-- fig.F22.leyenda.lectura -->
Cada barra es el cruce de bloque de su legislatura. Su tramo en oro, el estricto, sale siempre del cero: se puede comparar de una legislatura a otra.

<!-- fig.F22.nota.centro -->
Con un firmante del centro: {{pct}} del cruce de bloque · {{n}} de {{den}}

<!-- fig.F22.tabla.col.centro -->
Con el centro, dentro del cruce

<!-- fig.F22.tabla.col.leg -->
Legislatura

<!-- fig.F22.tabla.col.bloque -->
De bloque

<!-- fig.F22.tabla.col.estricto -->
Estricto

<!-- fig.F22.tabla.col.relaciones -->
Relaciones par-medida

<!-- fig.F22.salvedad -->
«De bloque» cuenta cualquier par de izquierda, centro y derecha; «estricto», solo izquierda con derecha. En 1936-1939 hay solo {{afin.1936.medidas}} medidas: no es una tercera foto comparable.

<!-- fig.F22.alt -->
Una barra por legislatura: la parte de las relaciones que cruza de bloque, con su tramo de izquierda con derecha (el cruce estricto) marcado desde el cero.

> [nota de diseño] F22: tres paneles con dos barras (serie única en `--dato` y resaltada en `--dato-2`, sin colores de
> ideología). Nota emergente con el numerador y el denominador (`n`, `den` de cada cifra). Tabla y Datos en pestañas;
> sin JS, barras y tabla. ⚠ No escribir en la figura que el cruce estricto de 1936-1939 es «casi todo con el PNV»:
> es falso con V1.1.

## 5. Tres redes

<!-- afinidades.redes.antetitulo -->
CGOCUS {{dv.cgocus.version}} · {{afin.1931.censo}} · {{afin.1933.censo}} · {{afin.1936.censo}} diputados en el censo

<!-- afinidades.redes.titulo -->
Tres redes

<!-- afinidades.redes.entrada -->
Cada legislatura tiene su red: un punto por diputado del censo y una línea por cada par que firmó junto.

<!-- afinidades.redes.buscar -->
Busque a un diputado en la lista del censo: la red resalta a quienes firmaron con él.

<!-- afinidades.redes.aislados -->
La red de 1936-1939 tiene muchos puntos sueltos. Son los {{afin.1936.aislados}} diputados que no firmaron ninguna medida.

<!-- afinidades.redes.una -->
En 1931-1933 y en 1933-1936, todos los que firman forman una sola red: cualquiera llega a cualquiera a través de cofirmantes. En 1936-1939, {{afin.1936.fuera_principal|letra}} firmantes quedan en grupos sueltos, sin enlace con la red principal.

<!-- afinidades.redes.partidos -->
En 1936-1939 las firmas se encierran más en cada partido. La modularidad por partidos, que mide esa concentración, sube a {{afin.1936.modularidad}}, frente a {{afin.1931.modularidad}} en la Constituyente.

<!-- afinidades.redes.app -->
La aplicación de Afinidades dibuja las redes con filtros por legislatura, ideología, partido, distrito, familia y rol.

<!-- afinidades.redes.llamada -->
[Abrir Afinidades ↗]

> [nota de diseño] F21 se carga bajo demanda ([Cargar la figura], `comun.boton.cargar`), una legislatura cada vez.
> [Abrir Afinidades ↗] va a `#red`.

### F21 · Tres redes

<!-- fig.F21.titulo -->
Las redes de coautoría, legislatura a legislatura

<!-- fig.F21.pregunta -->
¿Quién firmó con quién?

<!-- fig.F21.que_mide -->
Quién firmó alguna medida con quién, en cada legislatura. Cada línea une a dos diputados que firmaron juntos.

<!-- fig.F21.denominador -->
Los diputados del censo de cada legislatura: {{afin.1931.censo}}, {{afin.1933.censo}} y {{afin.1936.censo}}.

<!-- fig.F21.conmuta.titulo -->
Legislatura

<!-- fig.F21.buscar -->
Buscar a un diputado del censo

<!-- fig.F21.buscar.vacio -->
Nadie con ese nombre en el censo de esta legislatura.

<!-- fig.F21.nota -->
{{nombre}} · {{partido}} · {{familia}} · firmó con {{grado}} diputados

<!-- fig.F21.nota.aislado -->
{{nombre}} · {{partido}} · {{familia}} · no firmó ninguna medida con otro diputado

<!-- fig.F21.leyenda.titulo -->
Ideología, según su ficha

<!-- fig.F21.leyenda.aislados -->
Sueltos, en el anillo exterior: los que no firmaron con nadie

<!-- fig.F21.leyenda.EI -->
Extrema izquierda

<!-- fig.F21.leyenda.I -->
Izquierda

<!-- fig.F21.leyenda.CI -->
Centro-izquierda

<!-- fig.F21.leyenda.C -->
Centro

<!-- fig.F21.leyenda.CD -->
Centro-derecha

<!-- fig.F21.leyenda.D -->
Derecha

<!-- fig.F21.leyenda.ED -->
Extrema derecha

<!-- fig.F21.rotulo.1936.izquierda -->
Las izquierdas

<!-- fig.F21.rotulo.1936.derecha -->
Las derechas

<!-- fig.F21.leyenda.tamano -->
El tamaño del punto crece con el número de diputados con que firmó.

<!-- fig.F21.nota.uno -->
{{nombre}} · {{partido}} · {{familia}} · firmó con un diputado

<!-- fig.F21.coautores.titulo -->
Con quién firmó más

<!-- fig.F21.coautores.medidas -->
{{n}} medidas

<!-- fig.F21.coautores.una -->
una medida

<!-- fig.F21.coautores.resto -->
y {{n}} diputados más

<!-- fig.F21.buscar.limpiar -->
Quitar la selección

<!-- fig.F21.teclado -->
Con el teclado: Tab lleva a la red; ← y → recorren a los diputados, de más a menos cofirmantes; Inicio y Fin, al primero y al último; Esc suelta.

<!-- fig.F21.cargar.nota -->
La red se puede recorrer y buscar en un ordenador o una tableta. Aquí va su imagen fija, con la tabla de grados en la pestaña Tabla.

<!-- fig.F21.tabla.titulo -->
Los veinte diputados que firmaron con más compañeros, en {{legislatura}}

<!-- fig.F21.tabla.nota -->
El censo completo, con el grado de cada diputado en las tres legislaturas, va en la pestaña Datos.

<!-- fig.F21.sin_grafia -->
De las {{afin.personas}} personas del censo, {{afin.sin_grafia}} aún no tienen su grafía revisada: su nombre va como lo escribe CGOCUS, sin tildes.

<!-- fig.F21.tabla.col.nombre -->
Diputado

<!-- fig.F21.tabla.col.partido -->
Partido

<!-- fig.F21.tabla.col.familia -->
Familia

<!-- fig.F21.tabla.col.grado -->
Firmó con

<!-- fig.F21.salvedad -->
Coautoría no es voto ni acuerdo ideológico. Faltan las firmas sin atribuir y las de firmantes sin ficha en esa legislatura.

<!-- fig.F21.alt -->
Tres redes de coautoría, una por legislatura: cada punto es un diputado del censo y cada línea une a dos que firmaron juntos; los que no firmaron quedan sueltos.

> [nota de diseño] F21: nodos = censo de la legislatura (475 · 470 · 501), color por ideología (tokens de ideología del
> plan; los nombres de las siete categorías, los del glosario), posición precalculada y aristas rasterizadas en la
> compilación. Radios por legislatura con los rótulos de CGOCUS (1931-1933 · 1933-1936 · 1936-1939). La búsqueda
> resalta a los vecinos. Nombres con la grafía de `grafias.json`. Pestañas: Tabla de grados · Datos.

## 6. Personas: los puentes

<!-- afinidades.puentes.antetitulo -->
CGOCUS {{dv.cgocus.version}} · índice de transversalidad, por legislatura

<!-- afinidades.puentes.titulo -->
Personas: los puentes

<!-- afinidades.puentes.indice -->
Afinidades mide también a cada diputado. Su índice de transversalidad combina varias medidas de cuánto firma con otros partidos, dentro de cada legislatura.

<!-- afinidades.puentes.que_mide -->
No mide si sus ideas eran moderadas, sino si su manera de firmar saltaba las fronteras de su partido.

<!-- afinidades.puentes.1931 -->
En 1931-1933, los {{afin.1931.puentes.n|letra}} primeros son Melquíades Álvarez, Estelrich y Unamuno.

<!-- afinidades.puentes.1933 -->
En 1933-1936, encabezan la lista Chapaprieta, Cano López e Iranzo.

<!-- afinidades.puentes.1936 -->
En 1936-1939, entre los {{afin.1936.puentes.n|letra}} primeros están Aguirre e Irujo, del PNV, que el censo codifica en el centro-derecha.

<!-- afinidades.puentes.lectura -->
El índice dice con quién firmaron, no qué defendían.

<!-- afinidades.puentes.roles -->
La aplicación da además a cada diputado un rol, de «diputado aislado» a «líder de Cámara», según su actividad, su influencia y su transversalidad.

<!-- afinidades.puentes.ficha -->
Su vista Diputados busca a cada uno por su nombre y filtra por familia, partido, distrito y rol.

<!-- afinidades.puentes.llamada -->
[Abrir Afinidades ↗]

> [nota de diseño] Nombres con la grafía de la tabla (`exportador/grafias.csv`; D-22: se adoptan las confirmadas y probables, y en las once por revisar, la forma que imprime el Diario). [Abrir Afinidades ↗] va a
> `#diputados`: la aplicación no abre una ficha concreta desde un enlace.

## 7. Lo que no mide

<!-- afinidades.limites.antetitulo -->
CGOCUS {{dv.cgocus.version}} · {{afin.truncadas.medidas}} de {{afin.medidas}} medidas con la lista de firmas cortada

<!-- afinidades.limites.titulo -->
Lo que no mide, y cómo se mide

<!-- afinidades.limites.voto -->
Coautoría no es voto ni acuerdo ideológico. Firmar juntos una enmienda no dice cómo votó cada uno.

<!-- afinidades.limites.guerra -->
La legislatura de 1936-1939 no es una tercera foto comparable. De sus {{afin.1936.medidas}} medidas, {{afin.1936.medidas_antes}} se firmaron antes del 18 de julio de 1936.

<!-- afinidades.limites.truncadas -->
De las {{afin.medidas}} medidas, {{afin.truncadas.medidas}} llegan al Diario con la lista de firmas cortada: «Siguen las firmas hasta…». Solo cuentan las firmas impresas.

<!-- afinidades.limites.emparejamiento -->
El emparejamiento de nombres también se equivoca a veces. La fila de firmantes sin ficha en su legislatura lo deja ver.

<!-- afinidades.limites.roles -->
Los roles de la aplicación se asignan por percentiles dentro de cada legislatura. Que bajen de una a otra no es un hallazgo; que crezcan los aislados, sí.

<!-- afinidades.limites.ideologia -->
La ideología de cada diputado es la de su ficha, una por legislatura. Los bloques de esta página son una agrupación nuestra.

<!-- afinidades.limites.metodologia -->
Cada métrica, con su fórmula, está en la metodología del depósito (`METHODOLOGY.md`).

## 8. Los datos

<!-- afinidades.datos.antetitulo -->
Harvard Dataverse · doi:10.7910/DVN/CGOCUS · {{dv.cgocus.archivos}} archivos

<!-- afinidades.datos.titulo -->
Los datos

<!-- afinidades.datos.entrada -->
Afinidades Elegidas se descarga en Harvard Dataverse, con el mismo formulario que Luz y Taquígrafos. Son {{dv.cgocus.archivos|letra}} archivos.

<!-- afinidades.datos.tabla.col.archivo -->
Archivo

<!-- afinidades.datos.tabla.col.que -->
Qué trae

<!-- afinidades.datos.tabla.col.peso -->
Peso

<!-- afinidades.datos.tabla.readme -->
El léame del depósito.

<!-- afinidades.datos.tabla.edgelist -->
Las relaciones par-medida, una por fila, con la ideología de los dos firmantes.

<!-- afinidades.datos.tabla.cosponsorship -->
Las firmas: una fila por diputado y medida, con el texto de la medida.

<!-- afinidades.datos.tabla.metadata -->
El censo: una ficha por diputado y legislatura, con partido, familia, ideología y distrito.

<!-- afinidades.datos.tabla.metrics -->
Las métricas de cada diputado, por legislatura y en total.

<!-- afinidades.datos.tabla.roles -->
El rol de cada diputado en cada legislatura.

<!-- afinidades.datos.tabla.methodology -->
La metodología, en español y en inglés.

<!-- afinidades.datos.tabla.codebook -->
La descripción de cada campo.

> [nota de diseño] Tabla de archivos, en el orden del depósito (celdas = claves y marcadores; el nombre de archivo es
> un literal de código):
>
> | `afinidades.datos.tabla.col.archivo` | `afinidades.datos.tabla.col.que` | `afinidades.datos.tabla.col.peso` |
> |---|---|---:|
> | `00_README.txt` | `afinidades.datos.tabla.readme` | {{dv.cgocus.readme.bytes|peso}} |
> | `2REP_coauthor_edgelist.tab` | `afinidades.datos.tabla.edgelist` | {{dv.cgocus.edgelist.bytes|peso}} |
> | `2REP_cosponsorship.tab` | `afinidades.datos.tabla.cosponsorship` | {{dv.cgocus.cosponsorship.bytes|peso}} |
> | `representative_metadata.tab` | `afinidades.datos.tabla.metadata` | {{dv.cgocus.metadata.bytes|peso}} |
> | `representatives_metrics.json` | `afinidades.datos.tabla.metrics` | {{dv.cgocus.metrics.bytes|peso}} |
> | `representatives_roles.json` | `afinidades.datos.tabla.roles` | {{dv.cgocus.roles.bytes|peso}} |
> | `METHODOLOGY.md` | `afinidades.datos.tabla.methodology` | {{dv.cgocus.methodology.bytes|peso}} |
> | `CODEBOOK.md` | `afinidades.datos.tabla.codebook` | {{dv.cgocus.codebook.bytes|peso}} |
>
> Pesos en la unidad de Dataverse (bytes / 1.024², MB o KB), con `|peso`. Los nombres de archivo salen de
> `dv.cgocus.<archivo>.nombre`.

<!-- afinidades.datos.texto -->
El archivo de firmas trae el texto de cada medida: sirve para leer qué se firmó, no solo quién.

<!-- afinidades.datos.trampa -->
Una trampa al unir: `2REP_cosponsorship` llama «1933-1935» a la segunda legislatura, y los demás archivos, «1933-1936».

<!-- ↺ comun.fija.formulario -->
Antes de descargar, Harvard Dataverse le pedirá nombre, correo e institución.

<!-- afinidades.datos.descargar -->
[Descargar en Dataverse ↗]

<!-- afinidades.datos.unir -->
Para unirla con las filas de Luz y Taquígrafos, la clave es el diputado y la legislatura. Usar los datos lo explica, con el error que hay que evitar.

<!-- afinidades.datos.llamada -->
[Unir con THQCMI]

> [nota de diseño] ↺ 3 va **encima** de [Descargar en Dataverse ↗], que lleva al DOI de CGOCUS
> (`https://doi.org/10.7910/DVN/CGOCUS`), nunca a un archivo suelto: la plantilla no debe pintar ↺ 3 otra vez a mano.
> La cita la pone el componente `Cita` con `{{dv.cgocus.cita}}` tal cual, `comun.cita.dataverse` y
> `comun.cita.cgocus.nota` (texto; BibTeX y RIS en `<details>`). [Unir con THQCMI] va a `/{lang}/datos/#unir`: es el
> único corchete de la sección sin rótulo único, así que los `destinos` de la plantilla deben ser solo ese.
