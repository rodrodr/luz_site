# Revisión en vivo del director (23-09-2026, 03:20)

Recorrido en `npm run preview` (puerto 4322) a 1.440 px, tema oscuro: Inicio, ficha I, puerta del sufragio, Afinidades.

## Bien
- Portada: el hemiciclo se enciende al cargar; H1, subtítulo y las dos llamadas caben en la primera pantalla; leyenda por bloques.
- Banda de la tesis con el grito «Luz y taquigrafos.» y su asiento al margen (8-VI-1934 · V2 71330 · v3 80306).
- Calendario de Inicio con su pestaña y sus anotaciones al margen.
- Afinidades: cabecera con pregunta, sello de base, índice lateral numerado, F21 con conmutador de legislatura y buscador.

## Para la próxima ronda (diseño)
1. **F21, legibilidad de la red.** 1931-1933 se lee como una madeja uniforme; 1936-1939 queda pequeña y aplastada en el
   centro del lienzo, con mucho vacío. Propuesta: encuadre automático al cambiar de legislatura, nodos algo mayores, aristas
   más tenues (y aún más con muchas), color de ideología más saturado en los nodos, y dos o tres rótulos editoriales sobre
   los grupos (por ejemplo, «izquierda» y «derecha» en 1936-1939, donde la red se parte). Mantener la tabla y la versión sin JS.
2. **Grafía literal del grito.** «Luz y taquigrafos.» va sin tilde porque es la fila tal cual; considerar un [sic] discreto o
   una nota al margen («así en la fila; el Diario impreso…») para que no parezca errata del sitio. Decisión editorial.
3. **Marcadores de pendientes a la vista** (⟦D-3⟧ en Afinidades…): correcto en la vista previa; recordar que la compilación
   de publicación falla mientras existan.

## Resuelto el 23-09-2026
- **2. Grafía literal del grito:** nota al margen, sin [sic], en el asiento del grito (Inicio) y en el pie de la cita
  (El Diario): «Sin tilde, como en la fila: así salió del reconocimiento óptico.» (decisión 4 del investigador).
- **3. Marcadores de pendientes:** todos los D-* cerrados en `src/config/enlaces.ts`; ya no se pinta ninguno.
- **1. F21, legibilidad de la red** (diseño y verificación):
  - encuadre por legislatura, nodos mayores con orla, aristas más tenues y color saturado (`src/viz/red-encuadre.ts`,
    `src/scripts/fig-red.ts`);
  - rótulos «Las izquierdas» y «Las derechas» en 1936-1939, con sus claves de copy;
  - el ancla ya no sube a un vacío por un componente suelto.

  Pendiente: los pósteres sin JS con posiciones encuadradas (exportador, `diseno_final.md`).
