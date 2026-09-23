/**
 * Filas de la pestaña Tabla de F01 (meses con sesión y una fila por hueco, con su rango), en HTML de cadena: sin los
 * atributos de ámbito de Astro en cada celda, que en 64 meses y sus huecos pesan. Las cifras van bajo el `<tbody>` que
 * declara su fuente (`data-k="meses.csv"`, `data-base="V2"`).
 */
import { t } from '../lib/i18n';
import { fmt, escapa } from '../lib/cifras';
import { mesLargo } from '../lib/formato';
import type { Lang } from '../lib/idiomas';
import type { filasTabla } from './geom/calendario';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function filasMeses(lang: Lang, tabla: ReturnType<typeof filasTabla>, conEtapa: boolean): string {
  const n = (x: number) => fmt.n(x, lang);
  return tabla.map((r) => {
    if (r.tipo === 'mes') {
      const m = r.m;
      return `<tr><th scope="row">${escapa(cap(mesLargo(m.mes, lang)))}</th>${conEtapa ? `<td>${m.e ?? ''}</td>` : ''}`
        + `<td class="num">${n(m.sesiones)}</td><td class="num">${n(m.filas)}</td><td class="num">${n(m.pal)}</td><td class="num">${n(m.dip)}</td></tr>`;
    }
    const rotulo = r.n === 1
      ? t(lang, 'fig.F01.tabla.hueco_uno', { vars: { mes: escapa(cap(mesLargo(r.desde, lang))) } })
      : t(lang, 'fig.F01.tabla.hueco', { vars: { desde: escapa(cap(mesLargo(r.desde, lang))), hasta: escapa(mesLargo(r.hasta, lang)), n: n(r.n) } });
    return `<tr class="t-hueco"><th scope="row" colspan="${conEtapa ? 6 : 5}">${rotulo}</th></tr>`;
  }).join('');
}
