/**
 * Geometría de F22 (dos cruces): una escala lineal de porcentaje, de 0 a un tope redondo por encima del mayor valor, y
 * sus marcas de eje (como mucho cuatro líneas de rejilla, DESIGN.md § Sistema de figuras).
 */
export function escalaPct(maximo: number, paso = 0.1): { tope: number; marcas: number[]; x: (p: number) => number } {
  const tope = Math.max(paso, Math.ceil(maximo / paso) * paso);
  const n = Math.round(tope / paso);
  const salto = n > 4 ? Math.ceil(n / 4) : 1;
  const marcas: number[] = [];
  for (let i = 0; i <= n; i += salto) marcas.push(Math.round(i * paso * 1000) / 1000);
  return { tope, marcas, x: (p: number) => Math.round((p / tope) * 10000) / 100 };
}
