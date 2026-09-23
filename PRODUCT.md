# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro estático, sin framework de cliente, sobre el esqueleto del sitio de ParlaIbero (`/Users/rodrodr/Dropbox/Apps/parlaibero_site`). Español e inglés (el español se congela antes de traducir). Publicación prevista en GitHub Pages, `rodrodr.github.io/luz/` (URL pendiente de confirmar por el investigador). Decidido por el investigador el 22-09-2026.

## Users

**Principal (confirmado, 22-09-2026):** la investigadora o el investigador que decide si usar la base: ciencia política, historia cuantitativa, humanidades digitales. Llega desde Dataverse, una cita o una búsqueda, evalúa la calidad y el método, y descarga y cita. Cuando haya que elegir, este lector sale mejor servido.

**Secundarios (del plan, no priorizados):** historiadores y docentes que entran por la historia (una etapa, una sesión, una frase) y leen en el explorador; periodistas y público culto que buscan hallazgos y citas verificadas.

## Product Purpose

Presentar «Luz y Taquígrafos», la base de datos de los Diarios de Sesiones del Congreso de la Segunda República española (1931–1945), y llevar a usarla: qué contiene, cómo se hizo, qué responde y dónde deja de responder, y cómo descargarla, leerla y citarla.

**Éxito (confirmado, 22-09-2026):** descargas y citas del CSV depositado (Harvard Dataverse, doi:10.7910/DVN/THQCMI).

## Positioning

> **Rediseño del 23-09-2026** (`docs/REDISENO_23-09.md`, aprobado por el investigador con sus cinco decisiones y la petición de gráficos que se manipulan y se juegan): el sitio presenta **una infraestructura para investigar la Segunda República desde su Parlamento**, no una base de datos que se justifica. Inicio enseña lo que permite hacer; las ediciones, el reconocimiento óptico y los límites se documentan en Método. Lo que sigue se lee con esa corrección.

Los Diarios de Sesiones se imprimieron enteros, con luz y taquígrafos, y por eso nadie pudo leerlos enteros. Luz y Taquígrafos los convierte en una tabla de turnos de palabra que se puede contar, leer y citar: 107.551 filas depositadas (V2), con el orador vinculado a su diputado, su partido y su posición, y un explorador en el navegador que devuelve cada cifra a su pasaje del Diario. El sitio no afirma novedad sin una búsqueda fechada de corpus comparables.

## Operating Context

- Flujo real: sitio → Harvard Dataverse (formulario obligatorio: nombre, correo e institución) → CSV de 158,1 MB → R o Python; y sitio → explorador en el navegador (descarga única de unos 112 MB; sin enlaces profundos: una URL no abre una búsqueda).
- Dos ediciones conviven: la depositada (V2, 107.551 filas) y la del explorador (v3, 121.700 filas, sin depositar, ids renumerados). Toda cifra lleva su base **en el HTML** (`data-k`, `data-base`, `procedencia.csv`), no en la frase: Inicio no nombra ninguna edición y usa solo cifras que valen en las dos (formato `|redondo`: «más de 100.000 intervenciones»); el detalle, en Datos y Método (rediseño del 23-09-2026).
- Base derivada: Afinidades Elegidas (coautorías, doi:10.7910/DVN/CGOCUS V1.1) y su aplicación.
- Proyecto hermano y distinto: ParlaIbero.

## Capabilities and Constraints

- Plan y narrativa: `docs/00_PLAN_sitio.md`, `docs/01_NARRATIVA_sitio.md`; contrato de construcción: `docs/CONTRATO_CONSTRUCCION.md`.
- Ninguna cifra tecleada: todas salen del exportador con su base y su fuente. Ninguna promesa que el explorador no cumpla (enlaces profundos, cabecera de sesión, búsqueda semántica, comodín, NOT, proximidad).
- Excluido por decisión del investigador: todo el prototipo de 1931 (grafo anotado, libro de códigos, actos afectivos).
- Sin mención de financiación. Se nombra a los diputados (figuras históricas), con su grafía correcta.
- Pendientes del investigador: URL definitiva, motivo del formulario de Dataverse, depósito de la corrección v2 de Afinidades, manejador `#q=` en el explorador, revisión de la tabla de grafías.

## Brand Commitments

- Nombre: «Luz y Taquígrafos». Autores: Rodrigues-Silveira, García-Díez, Llamazares, Martínez-Barahona y Barreto Martín (Universidad de Salamanca).
- Voz: español de España, «usted» al lector y «nosotros» del proyecto; sobria, precisa, sin tono de folleto ni «innovador»; frases de 30 palabras como mucho.
- Identidad fijada por el investigador: oscura editorial (crema sobre casi negro, oro de acento, serif cursiva de display) con tema claro derivado; portada con la planta del hemiciclo del Congreso y las minorías de 1936 según el croquis de Gil Robles, que considera «perfecta».
- Narrativa antes que gráficos; visualizaciones con datos reales, nunca ilustrativas; cifras verificadas sobre la fuente.

## Evidence on Hand

- Datos: CSV V2 (`2REP/2REP_Base/2REP_Diaries.csv`), base v3 del explorador (`~/.cache/luz_site/corpus.sqlite`), metadatos de sesión del proyecto, CGOCUS V1.1.
- Estudio previo con agregados calculados y 54 capturas reales del explorador: `docs/estudio/`.
- Portada: `aecpa2026/landing/hero_svg.py` y `figs/data/hemiciclo_1936.json`.
- Uso de Dataverse a 22-09-2026: 1.820 visitas y 373 descargas (THQCMI).
- No existen: testimonios, reseñas, citas en publicaciones de terceros aparte de CGOCUS, ni una búsqueda de corpus comparables. No se fabrican.

## Product Principles

1. El sitio lleva a descargar y citar la base depositada: cada página termina en el Diario, en el explorador o en el depósito.
2. Cada cifra es verificable a un clic (su base y su fuente van en el HTML y en `procedencia.csv`), pero la frase no se
   justifica: la salvedad va donde cambia lo que hace el lector (Datos, Método), no junto a cada dato. *(Rediseño del
   23-09-2026; antes: «su base, su denominador y su salvedad en la misma frase».)*
3. La profundidad vive en páginas propias; Inicio es la puerta, no el resumen.
4. La costura se documenta, no se exhibe: lo que el corpus no hace se explica en Método. *(Rediseño del 23-09-2026; antes:
   «se enseña la costura, dicho junto al dato que matiza».)*
5. El lector del Diario (la cita literal, la fila, la sesión) es el argumento; el número, su prueba.
6. Las figuras de Inicio se juegan: el lector manipula (escribe una palabra, apuesta una votación, mueve una red) y la
   base contesta. Cada juego funciona también sin JavaScript en su estado estático. *(Petición del investigador,
   23-09-2026.)*

## Accessibility & Inclusion

WCAG 2.2 AA en los dos temas; figuras recorribles con teclado, con tabla equivalente y funcionamiento sin JavaScript; movimiento solo con `prefers-reduced-motion: no-preference`; nada desborda a 360 px.

### Excepciones registradas

- **WCAG 2.5.8, excepción «Equivalente» (F01 en `/cortes/` y en la ficha I, por debajo de 48 rem).** En octubre de 1931
  las barras de las puertas del sufragio (1-X) y de la cuestión religiosa (13-X) miden 1 px y quedan a menos de 24 px
  una de otra: el ancho de la barra es el dato y no se puede separar. Cada una de esas puertas tiene en la misma página
  un enlace de tamaño completo: en `/cortes/`, el registro «Las puertas, sesión a sesión» bajo F01; en la ficha I, otros dos enlaces
  a cada una (su registro de puertas, entre ellos). La puerta técnica del kit (`verificar.py`) no sabe ver esta excepción y marca
  `a.b 1×15, a.b 1×22` en esas dos páginas: es el único fallo esperado (verificación del 23-09-2026).
