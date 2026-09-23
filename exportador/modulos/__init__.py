"""Módulos del exportador: uno por dueño (contrato § Exportador). Cada uno define `exportar(ctx) -> dict[str, dict]`.

Orden de ejecución (exportar.py › MODULOS): base primero; los demás leen `ctx.compartido` y las utilidades de
`comun.Contexto`. Una clave de cifra repetida entre módulos, o un archivo que escriben dos módulos, hace fallar la
exportación.
"""
