/**
 * Geometría de F29 (búsquedas de muestra): una escala LINEAL común a todas las consultas, de 0 al mayor recuento. Se
 * dibuja como porcentaje del ancho de la columna, así que no depende del ancho de la pantalla. Una escala logarítmica
 * haría parecidas 6 y 2.028 intervenciones: no se usa.
 */
export function escala(valores: number[]): (v: number) => number {
  const max = Math.max(1, ...valores);
  return (v: number) => Math.round((v / max) * 10000) / 100;
}
