# Peticiones de la ronda final de diseño (23-09-2026)

Lo que el diseño necesita de otros dueños tras aplicar `docs/DECISIONES_23-09.md` y la revisión del director. El
diseño no toca el copy ni el exportador.

## Al copy

1. **`inicio.portada.llamada`: invertir el orden** a `[Abrir el explorador ↗] [Descargar los datos]` (decisión 2).
   No bloquea: `src/pages/[lang]/index.astro` elige el destino de cada corchete por su rótulo y pone delante el
   explorador, en oro, sea cual sea el orden del copy. Invertirlo solo deja el copy en el orden en que se lee. El
   asiento de debajo («V2 · un CSV de … · CC BY 4.0 · Harvard Dataverse») describe ahora el botón secundario:
   valorar si sigue ahí o pasa a la escalera.
2. **Rótulos editoriales de F21 (1936-1939)**, dos claves nuevas en `docs/copy_es/afinidades.md`:
   - `fig.F21.rotulo.1936.izquierda`, sobre el bloque de EI, I y CI;
   - `fig.F21.rotulo.1936.derecha`, sobre el bloque de CD, D y ED.
   Mientras no existan, la figura usa las de la leyenda («Izquierda», «Derecha»), que son las que propuso el director.
   Deben ser rótulos cortos (una o dos palabras, caben a 360 px en cursiva de 0,84 rem); propuesta: «Las izquierdas»
   y «Las derechas». En inglés, las mismas claves en `docs/copy_en/`.
3. **Tercera anotación de F21 (opcional).** El dato que sostiene «la red se parte» en 1936-1939: de 5.026 pares de
   cofirmantes, 328 unen un diputado de EI/I/CI con uno de CD/D/ED (en 1931-1933, 1.488 de 16.124; en 1933-1936, 550
   de 14.635). Si se quiere como anotación con cifra, antes tiene que exportarla el exportador (abajo) con su base
   (CGOCUS V1.1) y su marcador; el diseño la pinta con la misma pieza que los otros dos rótulos.

## Al exportador

1. **Pósteres de F21 (versión sin JS).** La red viva se encuadra al cambiar de legislatura (`src/viz/red-encuadre.ts`:
   la caja del 1-99 % de los que firman llena el marco, el eje corto se estira hasta el doble y los sueltos van a un
   anillo casi rectangular que la ciñe). Los pósteres `src/data/afinidades/red-<leg>-<tema>.png` siguen con las
   posiciones sin encuadrar, así que 1936-1939 aún sale pequeña en el póster. Para igualarlos, basta dibujar el póster
   con las posiciones de `encuadre()` (la misma función, portada a Python, o un JSON de posiciones encuadradas que
   escriba el exportador y lean los dos). Los rótulos del póster ya se colocan en la compilación sobre las posiciones
   del póster, así que siguen bien en cualquiera de los dos casos.
2. Si se quiere la anotación 3 de arriba: `afin.<leg>.aristas.cruzan` (pares entre EI/I/CI y CD/D/ED) en
   `procedencia.csv`, con su base.

## Al director (decisión)

1. **WCAG 2.5.8 en F01 de Las Cortes (`/cortes/`), por debajo de 48 rem.** Cada puerta se enlaza ya una sola vez por
   figura (antes, cada sesión de una puerta era un enlace de 1-8 px pegado al siguiente; resuelto en 1933, 1936,
   guerra y México). Queda un caso: en octubre de 1931 las barras del sufragio (1-X) y de la cuestión religiosa (13-X)
   miden 1 px y están a menos de 24 px una de otra a 390 px, en `/cortes/` y en la ficha I. En la ficha I cada puerta
   tiene otros dos enlaces en la página, así que vale la excepción «Equivalente» de 2.5.8 (el kit no la sabe ver y
   falla la puerta). En `/cortes/` no hay ningún otro enlace a las puertas. Opciones: (a) poner el registro de
   puertas (`RegistroPuertas`, como en Inicio) o una lista de sus enlaces bajo F01 en Las Cortes; (b) aceptar la
   excepción «Esencial» (el tamaño de la barra es el dato) y registrarla en `PRODUCT.md`. El diseño recomienda (a).

## Resuelto en la verificación (23-09-2026, 09:45)

- **Copy 1:** llamada invertida en `docs/copy_es/inicio.md`, con su nota de diseño al día. El asiento de debajo se queda
  porque describe lo que se descarga.
- **Copy 2:** `fig.F21.rotulo.1936.izquierda` es «Las izquierdas» y `fig.F21.rotulo.1936.derecha` es «Las derechas».
  En inglés, con el resto del copy.
- **Director 1:** opción (a). Hay un registro «Las puertas, sesión a sesión» bajo F01 en `/cortes/`
  (`RegistroPuertas` con `fijas={false}`, clave `cortes.puertas.registro`). La excepción «Equivalente» está en
  `PRODUCT.md` § Excepciones registradas. El kit la sigue marcando en `/cortes/` y en la ficha I: es lo esperado.
- **Sigue abierto:** los pósteres encuadrados y la tercera anotación (exportador).
