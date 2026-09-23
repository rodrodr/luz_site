# Peticiones del grupo 5 · Usar los datos y Versiones (fase 2, 23-09-2026)

Dueño: páginas `src/pages/[lang]/datos/index.astro` y `versiones.astro`; figuras `src/components/datos/`
(`FigColumnas` F32 · `FigRecuentos` F33 · `FigUnion` F34 · `FigLinea` F25 · `FigDestino` F18 · `FigEdiciones` F07 ·
`FigBases` F35 · `CitaPestanas`); geometría `src/viz/geom/escalas.ts`; módulo `exportador/modulos/datos.py`; copy
`docs/copy_es/datos.md` y `versiones.md`; LÉAME genérico `src/pages/datos/leame-[fig]-[lang].txt.ts`.
Nada de lo que sigue lo he tocado: son peticiones a su dueño.

## Hecho y que otros deben saber

- **REVISION_FASE1 P1-5, resuelto en la plantilla.** Versiones usa solo las claves de `versiones.md`
  (`versiones.donde.*`, `versiones.resultado.*`, `fig.F35.tabla.col.*`). F35 lo pinta `datos/FigBases.astro`.
  `components/TablaFiguras.astro` (claves `fig.F35.col.*`, que no existen) ya no lo usa nadie: **andamiaje**, puede
  retirarlo.
- **Anclas.** Datos: apartados `#empezar #camino #columnas #decisiones #palabra #unir #codigo #citar #erratas`; las
  figuras llevan `-fig` (`#columnas-fig`, `#palabra-fig`, `#unir-fig`), porque el ancla del registro es la del apartado.
  Versiones: apartados `#depositadas #v3 #resultado #identificadores #que-base #citar`; figuras con el ancla del registro
  (`#fechas`, `#destino-filas`, `#quien-habla`, `#bases`). Los destinos de `comun.md` § 3 siguen valiendo.
- **Títulos de figura cambiados** (frase de respuesta, para no repetir el H2): F32 «Cada columna, con su trampa»; F33
  «La misma base, cinco cifras de palabras»; F34 «Por diputado y legislatura, nunca solo por el diputado». H2 nuevos en
  Versiones: «¿Qué cambia en un resultado?» y «¿De qué base sale cada figura?». Los antetítulos de Datos y Versiones son
  ahora asientos con hechos (DESIGN.md, regla del asiento), no rótulos de género.
- **LÉAME.** Añade COLUMNAS (la cabecera real de cada CSV, con su definición si existe `fig.<id>.leame.col.<columna>`)
  y la línea de procedencia (`datos.leame.procedencia`). Las seis figuras del grupo 5 tienen su diccionario.

## Al andamiaje / integrador

1. `FiguraMarco`: enseñar la frase del teclado (`comun.fig.teclado`) solo si la figura es interactiva
   (`figura(id).interactiva`). Hoy sale en F34, que no se recorre; la oculto con una regla local
   (`FigUnion.astro › :global(#unir-fig .fig-teclado)`), que sobra en cuanto el marco lo haga.
2. `FiguraMarco`: la salvedad debería ser opcional (F35 no la lleva; por eso `FigBases` y `FigDestino` escriben su propio
   marco). Y una prop para no poner pestañas a una figura con datos (F18, «sin pestañas» por copy).
3. `.fig-id` («F32», «F07»…) sale en `audit-cifras` como «número sin procedencia» en todas las páginas con figuras:
   `data-audit-exento` en el `span` del marco o `/\bF\d{2}[a-z]?\b/` en `scripts/vetos.mjs › FORMAS_BLANCAS`.
4. Microtipografía común: un rótulo de años («1933-1935») se parte por el guion a final de línea en todo el sitio. En mis
   dos páginas lo evito con un envoltorio `.nw` sobre el texto (no en los atributos); convendría que lo hiciera
   `lib/remata.ts` para todas.
5. `lib/lectura.ts › destinoBoton('comun.boton.ver_auditoria_fechas')` lleva a `metodo/#m07`, y `comun.md` § 3 dice
   `#metodo-07`. Que Método y el copy fijen una sola ancla.
6. En el visor sin puntero fino (`hover: none`, p. ej. Chromium sin cabeza), la isla trata el paso del ratón como toque y
   la nota sale con su botón de cierre. En un navegador real no pasa; lo anoto por si las pruebas lo leen como fallo.

## Al exportador (`exportador/exportar.py`, `comun.py`)

7. **Cifras compartidas entre módulos.** `datos.py` da sus claves compartidas solo si ningún módulo anterior las ha dado
   (y, si las dieron, comprueba que valen lo mismo y tienen la misma base). Para verlas lee el acumulador `C` de
   `exportar.main` por introspección (`datos.py › _dadas`). Pido una API: `ctx.dadas` (solo lectura) con las cifras ya
   dadas por los módulos anteriores.
8. `datos.py` escribe `datos/fragmentos_salida.txt` con `ctx._registra` y escritura directa: falta un
   `ctx.escribir_texto(nombre, texto)` público.

## Al copy de Método y al guion de marcadores

9. `docs/marcadores/comprobar_metodo_datos.py`: `fragmentos.fecha` se escribe ahora como «(la de la exportación)»
   (la fija cada exportación, que vuelve a ejecutar los fragmentos); si no, el marcador fallaba al cambiar de día.
   He tocado solo esa línea del generador y la fila de `docs/marcadores/datos.md`.

## Al investigador

10. D-20 (el motivo del formulario) sigue pendiente: sale marcado en `#camino`, al margen de «Antes de descargar…».
