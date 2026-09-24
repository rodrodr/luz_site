# Rediseño · de la documentación al escaparate

> 23-09-2026 · Propuesta para decidir. No toca nada publicado: la versión actual queda en `main` (commit `240b401`)
> y en tu ordenador.
>
> **Estado (23-09-2026, tarde).** Decisiones del § 8: **1 sí · 2 sí · 3 sí · 4 sí · 5 sí**. Petición añadida: gráficos
> interactivos y atractivos, que se manipulan y se juegan; la red de coautorías de la polarización (F21), «muy lograda»,
> entra en Inicio. **Hecha la fase 1: la nueva Inicio** (`CHANGELOG.md`). Pendiente: la cabecera y las seis páginas (§ 5)
> y el inglés. Cambio sobre este texto: la banda dice «más de 20 millones de palabras» (formato `|redondo`, una cifra
> significativa), porque «24 millones» está vetado como cifra de la ayuda del explorador.
>
> **24-09-2026.** El sitio presenta la base corregida y no habla de ediciones: fuera la página Versiones (el § 5 ya no
> la cuenta) y las comparaciones V2/v3 de todas las páginas; juego «Corrija al Diario» en Método 03 (`CHANGELOG.md`).
> Siguen: los juegos pedidos (`docs/ESTADO_TRABAJO.md`), la cabecera y las páginas del § 5, y el inglés.

## En una frase

La página actual explica y defiende la base; la nueva tiene que **enseñar lo que permite hacer**. Lo que hoy ocupa
Inicio —ediciones, salvedades, definiciones de la tabla— se muda a una página de documentación y deja sitio a los
temas, las figuras y el explorador.

## 1. Diagnóstico, con números

Medido hoy sobre el sitio compilado (`npm run build`: 48 páginas), en Chromium a 1.440 × 900 y a 375 px:

| | Inicio | Método | Datos | Versiones | Explorador |
|---|---:|---:|---:|---:|---:|
| Pantallas a 1.440 px | 11,1 | 25,1 | 20,5 | 13,9 | 18,5 |
| Palabras visibles | 1.561 | 4.254 | 3.724 | 2.374 | 2.561 |

- **Tamaño.** 22 páginas por lengua y 2.437 claves de texto. En el móvil, Inicio son 14 pantallas. El peso en KB no
  es el problema (Inicio: 25 KB de HTML comprimido); lo pesado es la longitud y la carga de lectura.
- **Ediciones por todas partes.** En el HTML de las páginas en español, «V2» aparece 793 veces y «v3», 564; solo en
  Inicio, 26 y 7. Cada figura lleva sus chapas («Edición depositada (V2)», «Edición del explorador (v3, sin
  depositar)») y cada sesión su «(V2)». Una página entera, Versiones, compara ediciones.
- **Salvedades antes que hallazgos.** Lo primero que se lee tras la portada es una explicación del OCR («Sin tilde,
  como en la fila: así salió del reconocimiento óptico») con dos identificadores de fila. Siguen «Que la última sesión
  del corpus sea la última que se imprimió no lo hemos cotejado», «La base no trae el voto como variable», «Contar
  filas no es contar discurso», «Que estén no valida su contenido» y una sección entera, «¿Qué no trae la base?».
- **Títulos sobre las tripas de la tabla**, no sobre la República: «¿Qué es una fila?», «¿Qué no trae la base?».
- **Aire y leyendas.** Hasta 16 rem entre secciones; la leyenda del hemiciclo (18 minorías) ocupa media pantalla.

### Por qué salió así

La verbosidad no es un fallo de ejecución: **está en el encargo**.

1. `PRODUCT.md`, principios 2 y 4: «Cada cifra con su base, su denominador y su salvedad en la misma frase» y «Se
   enseña la costura».
2. `DESIGN.md`: la idea rectora es «El Diario, anotado al margen», y la «regla del margen vivo» pide un asiento
   (fila V2 y v3, base, salvedad) junto a **toda** afirmación.
3. Dos ediciones conviven (V2 depositada, v3 del explorador) y «toda cifra lleva su base».
4. El lector principal se definió como quien **evalúa** la calidad y el método: el sitio se optimizó para ser
   auditado, no para atraer.
5. Cada ronda de revisión adversarial (81 hallazgos en el plan, 47 en la fase 2) premiaba lo inatacable: todas
   añadían salvedades y ninguna quitaba.

Si esas reglas no cambian, cualquier reescritura volverá a crecer.

### Lo que funciona y se queda

- La identidad: crema sobre casi negro, oro que anota, Cormorant cursiva.
- La portada: el hemiciclo de Gil Robles y «la Cámara se sienta».
- Las figuras que ya son visuales, reales e interactivas: el calendario de sesiones (F01c), las votaciones nominales
  (F26) y la red de Afinidades (F21).
- Los ocho momentos, del voto de las mujeres a México, y las citas del Diario.
- El explorador como acción principal (decisión del 23-09).
- Toda la maquinaria: exportador, marcadores con procedencia, auditorías y pruebas. **El rigor se queda, pero sale
  de la cara del lector**: cada cifra conserva su fuente en el HTML y en `procedencia.csv`.

## 2. El cambio de posición

De «una base de datos que se justifica» a «**una infraestructura para investigar la Segunda República desde su
Parlamento**». Son seis piezas, y la landing las enseña juntas:

| pieza | qué permite |
|---|---|
| El Diario entero | las 755 sesiones, de las Constituyentes al exilio en México |
| Cada intervención, una fila | quién habla, cuándo y en qué sesión, con su texto |
| Cada orador, identificado | 773 diputados, con su partido y su ideología |
| Un explorador en el navegador | buscar, reunir, leer y comparar sin instalar nada |
| Redes de coautoría | Afinidades Elegidas: quién firmó con quién |
| Abierto y citable | CSV con DOI y licencia CC BY 4.0, listo para R o Python |

## 3. Reglas nuevas para la landing

1. **Una idea, una figura y una acción por bloque.** Si un bloque necesita una salvedad para sostenerse, no va en la
   landing.
2. **Cero ediciones.** Ni «V2», ni «v3», ni identificadores de fila. Solo cifras que valen para las dos ediciones:
   755 sesiones, 773 diputados, más de 100.000 intervenciones, más de 20 millones de palabras. El detalle, en Datos.
3. **Las salvedades se documentan, no se exhiben.** Viven en «Cómo se hizo», enlazada desde el pie.
4. **Los títulos hablan de la República o de lo que se puede hacer**, nunca de la estructura de la tabla.
5. **Presupuesto de Inicio:** 450 palabras visibles y unas 5 pantallas a 1.440 px (hoy, 1.561 y 11).
6. **Cifras redondas en la landing** («más de 100.000»); las exactas, en Datos.
7. **Menos aire:** entre secciones, 6–8 rem en vez de hasta 16.
8. **Se mantiene** lo que ya estaba bien: «usted» al lector, frases cortas, nada de «innovador», y ni tarjetas, ni
   iconos, ni bandas de cifras (los rechazaste en la versión anterior).

## 4. La nueva Inicio, bloque a bloque

```
1440 ┌ cabecera: marca │ Explorador · Momentos · Datos · Afinidades │ ES EN ◐ ─────────────────────────┐
     │ H1 (col 1–5) · entrada · [Abrir el explorador] [Descargar] │ HEMICICLO (col 6–12), se sienta   │
     │ credencial en una línea                                     │ leyenda plegada en cuatro bloques │
     ├──────────────── BANDA: «Luz y taquígrafos.» y tres frases ──────────────────────────────────────┤
     │ H2 Más que una base de datos · seis piezas en recorrido, del Diario a su análisis (sin tarjetas)│
     │ H2 De 1931 a 1945, mes a mes · CALENDARIO F01c a lo ancho, con los ocho momentos marcados       │
     │ H2 Temas para empezar · seis temas (col 1–6) │ VOTACIONES F26, sin chapas (col 7–12)            │
     │ H2 Pruebe una palabra · seis términos │ curva mensual │ [Buscarla en el explorador]  (opcional)  │
     │ H2 Empiece hoy · tres puertas en una fila · cita y [Copiar la cita]                             │
     └ pie: autores · USAL · licencia · Cómo se hizo · Versiones · Erratas ────────────────────────────┘
```

Borrador del texto (lo que ve el lector va en cursiva). Con las seis piezas del § 2, los títulos y la cita suma
unas 450 palabras: justo el presupuesto.

**1 · Portada.** Casi igual que hoy.
- H1: *¿Cómo discutía una democracia que se estaba inventando?*
- Entrada: *Todo lo que se dijo en el Congreso de la Segunda República, de 1931 a 1945, listo para buscar, leer, contar
  y citar.*
- [Abrir el explorador] en oro · [Descargar los datos].
- Credencial: *755 sesiones · más de 100.000 intervenciones · 773 diputados · CC BY 4.0 · DOI*.
- Cambia: sale «V2 · un CSV de 158,1 MB» de debajo de los botones, y la leyenda del hemiciclo se pliega en cuatro
  bloques (Derechas, Centro, Izquierdas, Gobierno).

**2 · El nombre.** La banda invertida, en tres frases.
- *«Luz y taquígrafos.»*
- *Lo gritó un diputado el 8 de junio de 1934, cuando la Presidencia recordó que los suplicatorios se tratan en sesión
  secreta. Casi todo lo demás quedaba impreso en el Diario de Sesiones: más de 20 millones de palabras que nadie podía
  leer enteras. Ahora se pueden buscar.*
- Cambia: salen el pie del OCR y los identificadores V2 y v3. «Taquígrafos» lleva tilde, como en el Diario impreso;
  la errata es del reconocimiento óptico, no de la fuente.

**3 · Más que una base de datos.**
- Entrada: *Una infraestructura para investigar la República desde su Parlamento.*
- Las seis piezas del § 2, una línea cada una, como un recorrido del Diario a su análisis. Si se quiere movimiento,
  aquí cabe una versión ligera, en CSS, de «la tinta se vuelve fila».
- Sustituye a «¿Qué es una fila?» y a la tesis larga.

**4 · De 1931 a 1945, mes a mes.**
- Entrada: *Cada casilla es un mes con sesiones: cuanto más intenso el oro, más se habló. Las marcas son ocho momentos
  que puede leer enteros.*
- F01c a lo ancho, con los ocho momentos marcados (`calendario.json` ya trae las puertas) y sin los rangos numéricos
  en la leyenda. Cada marca abre su momento.
- Sustituye a «¿Cuándo se reunieron las Cortes?» y a «¿Qué sesión leo primero?».

**5 · Temas para empezar.** Junto a la figura de las votaciones nominales.
- Entrada: *Cada tema lleva a su sesión, con sus citas, y sigue en el explorador.*
- *El voto de las mujeres. 1 de octubre de 1931, aprobado por 161 votos contra 121. «Yo ruego a la Cámara que me
  escuche en silencio…», Clara Campoamor.*
- *Iglesia y Estado. 13 de octubre de 1931: «España ha dejado de ser católica».*
- *Las autonomías. El Estatuto de Cataluña, aprobado el 9 de septiembre de 1932 por 314 votos contra 24.*
- *La tierra. La Reforma agraria, aprobada ese mismo día por 318 votos contra 19.*
- *Orden público y violencia. Casas Viejas (1933), la pistola de Prieto (1934), la antesala de la guerra (1936).*
- *Guerra y exilio. Las Cortes en Figueres (1939) y en México (1945).*
- Sustituye a «¿Qué se decidía allí?».

**6 · Pruebe una palabra.** Opcional; es la única pieza nueva.
- Seis términos de la época (por ejemplo «reforma agraria», «orden público», «Cataluña», «Iglesia», «paro»,
  «fascismo»). Al pulsar uno aparece su curva mensual, con [Buscarla en el explorador], que copia la consulta y abre
  la herramienta, como decidiste en D-4.
- Es la prueba de potencia en cinco segundos. Hace falta que el exportador saque la frecuencia mensual de esos
  términos.

**7 · Empiece hoy.**
- *Sin programar. El explorador, en su navegador.* [Abrir el explorador]
- *Con R o Python. El CSV, con su DOI.* [Descargar los datos], y debajo: *Harvard Dataverse le pedirá nombre, correo e
  institución.*
- *Con redes. Afinidades Elegidas: quién firmó con quién.* [Ver la red]
- Cómo citar, con [Copiar la cita].
- Sustituye a «¿Por dónde empiezo?». «¿Qué no trae la base?» sale de Inicio.

**Sale de Inicio:** «¿Qué es una fila?» y «¿Qué no trae la base?» (van a «Cómo se hizo»), todas las chapas de
edición, las notas de OCR, los identificadores de fila, los rangos numéricos de la leyenda del calendario y la
leyenda larga del hemiciclo.

## 5. El resto del sitio: de 22 páginas a 15

| hoy | propuesta |
|---|---|
| Inicio | Inicio nueva |
| Las Cortes y cinco fichas de etapa (la de 1931 mide 18 pantallas) | «La República en las Cortes»: una sola página, con las cinco etapas como secciones |
| Sesiones y ocho puertas | «Momentos»: el índice y ocho páginas de 400 palabras como mucho (contexto, dos o tres citas, la figura y [Leerla en el explorador]) |
| Explorador | Explorador: qué hace, en capturas con una línea de pie |
| Afinidades | Afinidades: la red interactiva por delante, el texto al mínimo |
| Datos | Datos: descargar, citar, un fragmento de código y las columnas plegadas |
| Método, El Diario y Versiones (casi 13.000 palabras visibles) | «Cómo se hizo»: la documentación técnica en una página plegable, enlazada desde el pie |

Cabecera: Explorador (en oro) · Momentos · Datos · Afinidades. «Cómo se hizo» va en el pie.

## 6. Qué cambia en `PRODUCT.md`, `DESIGN.md` y las pruebas

| dónde | hoy | propuesta |
|---|---|---|
| PRODUCT · posición | base de datos | infraestructura de datos para investigar la Segunda República |
| PRODUCT · principio 2 | cifra con base, denominador y salvedad en la misma frase | cifra verificable a un clic; la frase no se justifica |
| PRODUCT · principio 4 | se enseña la costura | la costura se documenta en «Cómo se hizo» |
| PRODUCT · contexto | dos ediciones; toda cifra lleva su base | la landing habla de una sola base; las ediciones, en Datos y en «Cómo se hizo» |
| DESIGN · idea rectora | «El Diario, anotado al margen» | «El Diario, abierto»: la misma tipografía de impreso, sin el aparato de márgenes |
| DESIGN · margen vivo | un asiento junto a toda afirmación | solo en las citas (orador y fecha) y en la documentación |
| pruebas | Inicio: 700 palabras de copy | Inicio: 450 palabras visibles y ninguna «V2» o «v3» (prueba nueva) |

## 7. Cómo lo haría

1. Decides sobre esta propuesta: las preguntas del § 8.
2. Escribo el copy nuevo de Inicio para tu visto bueno.
3. Monto Inicio en una rama, con capturas en escritorio y en móvil, en los dos temas. `main` no se toca.
4. Después, «Cómo se hizo», Datos y Momentos; al final, el inglés.

Nada se publica sin tu visto bueno expreso (instrucción del 23-09).

## 8. Decisiones que necesito

1. **Alcance.** ¿Landing y seis páginas (lo que recomiendo), o solo landing y documentación?
2. **Cifras.** ¿En la landing, redondas y válidas para las dos ediciones? Lo recomiendo.
3. **«Pruebe una palabra».** ¿Se hace? Pide un dato nuevo al exportador.
4. **Fichas de etapa.** ¿Una sola página (lo que recomiendo) o fuera de la primera versión?
5. **La banda.** ¿«Luz y taquígrafos.» con tilde y sin la nota del OCR? Lo recomiendo.

ParlaIbero comparte el esqueleto y las reglas: si este rediseño funciona, se puede trasladar.
