/**
 * F01 · la imagen descargable (SVG y PNG) del calendario completo (plan § F01: «una sola imagen exportable, la de Las
 * Cortes»). Es un archivo para llevarse, no la figura de la página: aquí SÍ va el texto dentro del SVG (título, ejes,
 * leyenda con los cortes, etapas y la cita al pie), en la paleta clara del sitio, para imprimir y pegar en un artículo.
 * Misma geometría que la página (`geom/calendario.ts`); textos del copy (`fig.F01.*`, `comun.*`).
 */
import { dato } from '../lib/datos';
import { plano, existe } from '../lib/i18n';
import { fmt } from '../lib/cifras';
import { url } from '../lib/rutas';
import { mesLargo } from '../lib/formato';
import { huella } from '../lib/cita';
import type { Lang } from '../lib/idiomas';
import { rejilla, type MesDato, type SesionDato, type CalendarioDato } from './geom/calendario';

const C = {
  papel: '#F6F2E9', papel2: '#EFE9DB', tinta: '#1A1C16', tinta2: '#45483D', apagado: '#676A61', filete: '#D6D0C2',
  ausencia: '#7D7C70', oro: '#8C6100', rampa: ['#AC8031', '#976B16', '#805903', '#684702', '#513601'],
};
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SERIF = "'EB Garamond', 'EB Garamond Variable', Georgia, serif";
const MONO = "'JetBrains Mono', 'JetBrains Mono Variable', Menlo, monospace";
const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export function imagenCalendario(lang: Lang, site?: URL): string {
  const S = dato<{ sesiones: SesionDato[] }>('sesiones');
  const M = dato<{ meses: MesDato[] }>('meses');
  const CAL = dato<CalendarioDato>('calendario');
  if (!S || !M || !CAL) return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="60"><text x="10" y="30">F01: faltan datos del exportador</text></svg>`;
  const R = rejilla(M.meses, S.sesiones, CAL);
  const p = (k: string, vars: Record<string, string> = {}) => (existe(k) ? plano(lang, k, { vars }) : k);
  const n = (x: number) => fmt.n(x, lang);

  const W = 1600, X0 = 48, ANIO = 64, G = 4;
  const areaW = W - 2 * X0 - ANIO;
  const colW = (areaW - 11 * G) / 12;
  const CELDA = 46;
  const out: string[] = [];
  let y = 64;
  const texto = (x: number, yy: number, s: string, o: { size?: number; font?: string; color?: string; weight?: number; anchor?: string; italic?: boolean } = {}) =>
    out.push(`<text x="${x.toFixed(1)}" y="${yy.toFixed(1)}" font-family="${o.font ?? SERIF}" font-size="${o.size ?? 16}" fill="${o.color ?? C.tinta}"${o.weight ? ` font-weight="${o.weight}"` : ''}${o.anchor ? ` text-anchor="${o.anchor}"` : ''}${o.italic ? ' font-style="italic"' : ''}>${esc(s)}</text>`);

  texto(X0, y, 'F01', { font: MONO, size: 14, color: C.apagado });
  texto(X0 + 44, y, p('fig.F01.titulo'), { size: 30, weight: 600 });
  y += 30;
  texto(X0, y, p('fig.F01.pregunta'), { size: 18, color: C.tinta2 });
  y += 40;
  // leyenda del tono, con sus cortes
  texto(X0, y, p('fig.F01.leyenda.tono', {}), { size: 15, color: C.tinta2 });
  y += 12;
  CAL.clases.forEach((c, i) => {
    const x = X0 + i * 150;
    out.push(`<rect x="${x}" y="${y}" width="146" height="12" fill="${C.rampa[i]}"/>`);
    texto(x, y + 30, `${n(c.desde)}–${n(c.hasta)}`, { font: MONO, size: 12, color: C.tinta2 });
  });
  const lx = X0 + 5 * 150 + 40;
  out.push(`<rect x="${lx}" y="${y}" width="22" height="14" fill="none" stroke="${C.ausencia}"/>`);
  texto(lx + 30, y + 12, p('fig.F01.leyenda.sin_sesion'), { font: MONO, size: 12, color: C.tinta2 });
  out.push(`<circle cx="${lx + 11}" cy="${y + 34}" r="4.5" fill="${C.papel}" stroke="${C.oro}" stroke-width="1.5"/>`);
  texto(lx + 30, y + 38, p('fig.F01.leyenda.puerta'), { font: MONO, size: 12, color: C.tinta2 });
  y += 58;
  texto(X0, y, p('fig.F01.leyenda.altura'), { font: MONO, size: 12, color: C.tinta2 });
  y += 30;
  // meses en romanos
  ROM.forEach((r, i) => texto(X0 + ANIO + i * (colW + G) + colW / 2, y, r, { font: MONO, size: 12, color: C.apagado, anchor: 'middle' }));
  y += 10;
  out.push(`<line x1="${X0}" x2="${W - X0}" y1="${y}" y2="${y}" stroke="${C.filete}"/>`);
  y += 30;

  for (const b of R.bloques) {
    if (b.id === 'V' && R.salto) {
      out.push(`<line x1="${X0}" x2="${W - X0}" y1="${y - 14}" y2="${y - 14}" stroke="${C.ausencia}" stroke-dasharray="4 3"/>`);
      texto(X0, y + 8, '//', { font: MONO, size: 16, color: C.apagado });
      texto(X0 + ANIO, y + 8, p('fig.F01.salto', { desde: mesLargo(R.salto.desde, lang), hasta: mesLargo(R.salto.hasta, lang), n: n(R.salto.n) }), { size: 16, color: C.tinta2 });
      out.push(`<line x1="${X0}" x2="${W - X0}" y1="${y + 24}" y2="${y + 24}" stroke="${C.ausencia}" stroke-dasharray="4 3"/>`);
      y += 64;
    }
    texto(X0 + ANIO, y, b.id, { size: 20, color: C.oro, italic: true, weight: 600 });
    texto(X0 + ANIO + 30, y, p(`cortes.etapa.${b.id}.nombre`), { size: 18, weight: 500 });
    texto(W - X0, y, p('fig.F01.cabecera', { n: n(b.sesiones), palabras: n(b.palabras) }), { font: MONO, size: 12, color: C.apagado, anchor: 'end' });
    y += 14;
    for (const f of b.filas) {
      texto(X0, y + CELDA / 2 + 5, String(f.anio), { font: MONO, size: 13, color: C.apagado });
      f.celdas.forEach((c, i) => {
        if (!c) return;
        const x = X0 + ANIO + i * (colW + G);
        if (c.estado !== 'sesion') { out.push(`<rect x="${x.toFixed(1)}" y="${y}" width="${colW.toFixed(1)}" height="${CELDA}" fill="none" stroke="${C.ausencia}"/>`); return; }
        out.push(`<rect x="${x.toFixed(1)}" y="${y}" width="${colW.toFixed(1)}" height="${CELDA}" fill="${C.papel2}"/>`);
        const col = C.rampa[c.clase ?? 2];
        for (const br of c.barras) {
          const bx = x + br.x0 * colW, bw = Math.max(0.8, (br.x1 - br.x0) * colW - 0.6);
          const bh = Math.max(1.5, br.h * CELDA);
          out.push(`<rect x="${bx.toFixed(2)}" y="${(y + CELDA - bh).toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" fill="${col}"/>`);
          if (br.puerta) out.push(`<circle cx="${(bx + bw / 2).toFixed(2)}" cy="${(y + CELDA - bh - 7).toFixed(2)}" r="3.5" fill="${C.papel}" stroke="${C.oro}" stroke-width="1.4"/>`);
        }
      });
      y += CELDA + 6;
    }
    y += 30;
  }
  // pie: salvedad, base con su huella y la cita de la figura
  out.push(`<line x1="${X0}" x2="${W - X0}" y1="${y - 8}" y2="${y - 8}" stroke="${C.filete}"/>`);
  y += 18;
  texto(X0, y, p('fig.F01.salvedad'), { size: 15, color: C.tinta2 });
  y += 24;
  const h = huella('V2');
  const enlace = site ? new URL(url(lang, 'cortes#calendario'), site).href : url(lang, 'cortes#calendario');
  texto(X0, y, `${p('comun.sello.V2')}${h.huella ? ` · ${h.huella}` : ''} · ${p('comun.sello.proyecto')}${h.fecha ? ` · ${h.fecha}` : ''}`, { font: MONO, size: 12, color: C.apagado });
  y += 20;
  texto(X0, y, `${p('fig.F01.titulo')} · ${p('comun.cabecera.nombre')} · ${enlace}`, { font: MONO, size: 12, color: C.apagado });
  y += 30;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}" lang="${lang}"><title>${esc(p('fig.F01.titulo'))}</title><desc>${esc(p('fig.F01.alt'))}</desc><rect width="100%" height="100%" fill="${C.papel}"/>${out.join('')}</svg>`;
}
