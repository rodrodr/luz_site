/**
 * Piezas de HTML compartidas por los componentes (`CopiarConsulta`, `Cita`) y por el pintor genérico del copy
 * (`lib/lectura.ts`): UNA sola marca para cada una, la use quien la use. Los scripts que las hacen copiables
 * (`scripts/copiar.ts`) los incluye quien las pinta (`<script>` de `CopiarConsulta`, `Cita`, `Seccion`).
 */
import { t, plano, rotulo } from './i18n';
import { escapa } from './cifras';
import { ENLACES, ENLACES_PROFUNDOS, enlaceProfundo } from '../config/enlaces';
import { ID_NOTA_PESTANA } from './remata';
import type { Lang } from './idiomas';

export interface Consulta {
  /** Lo que se escribe en el buscador del explorador, tal cual (texto plano). */
  consulta?: string;
  /** Filtros (HTML ya resuelto), con los nombres del explorador: Legislatura, Desde, Hasta, Nº de sesión. */
  filtros?: string;
  /** Recuento (HTML ya resuelto), con su fecha y su base (v3). */
  recuento?: string;
  /** La frase ↺ 5 bajo los botones (se omite si la página ya la dice una vez). */
  aviso?: boolean;
  compacta?: boolean;
}

/**
 * [Copiar la consulta] · [Abrir el explorador ↗] (D-4). Sin JS, la consulta queda en un `<code>` seleccionable y se
 * lee `comun.consulta.sinjs`; [Copiar la consulta] nace oculto y lo destapa `scripts/copiar.ts`.
 * Si `ENLACES_PROFUNDOS` pasa a `true`, el botón abre la consulta en el explorador (el copy de ↺ 5 se reescribe entonces).
 */
export function htmlConsulta(lang: Lang, c: Consulta): string {
  const partes: string[] = [];
  if (c.consulta) {
    partes.push(`<p class="consulta-caja"><span class="consulta-rotulo">${t(lang, 'comun.consulta.etiqueta')}</span>`
      + `<code class="consulta-texto" data-copiar-texto translate="no">${escapa(c.consulta)}</code></p>`);
  }
  if (c.filtros) partes.push(`<p class="consulta-filtros"><span class="consulta-rotulo">${t(lang, 'comun.consulta.filtros')}</span> ${c.filtros}</p>`);
  if (c.recuento) partes.push(`<p class="consulta-recuento nota">${c.recuento}</p>`);
  // DESIGN.md § Buttons: «Copiar», secundario con icono de copia. En «Hoy puede» hay varias cajas por pantalla y cada
  // una pintaba un primario oro.
  const explorador = `<a class="boton sec" href="${escapa(ENLACES.explorador)}" target="_blank" rel="noopener external" aria-describedby="${ID_NOTA_PESTANA}">${rotulo(lang, 'comun.boton.explorador')}</a>`;
  const botones = ENLACES_PROFUNDOS && c.consulta
    ? `<a class="boton" href="${escapa(enlaceProfundo(c.consulta))}" target="_blank" rel="noopener external" aria-describedby="${ID_NOTA_PESTANA}">${rotulo(lang, 'comun.boton.explorador')}</a>`
    : `${c.consulta ? `<button type="button" class="boton sec" data-copiar hidden><svg class="icono" aria-hidden="true" focusable="false"><use href="#i-copiar"></use></svg><span>${rotulo(lang, 'comun.boton.consulta')}</span></button>` : ''}${explorador}`;
  const sinjs = c.consulta && !ENLACES_PROFUNDOS ? `<span class="consulta-sinjs nota" data-sinjs>${t(lang, 'comun.consulta.sinjs')}</span>` : '';
  partes.push(`<p class="botones no-imprimir">${botones}<span class="consulta-aviso" role="status" data-copiar-aviso data-copiada="${escapa(plano(lang, 'comun.consulta.copiada'))}" data-no-copiada="${escapa(plano(lang, 'comun.isla.no_copiado'))}"></span>${sinjs}</p>`);
  if ((c.aviso ?? true) && !ENLACES_PROFUNDOS) partes.push(`<p class="nota consulta-fija">${t(lang, 'comun.fija.enlace')}</p>`);
  return `<div class="consulta${c.compacta ? ' compacta' : ''}" data-copiable>${partes.join('')}</div>`;
}

export interface CitaOpts { texto: string; bibtex?: string | null; ris?: string | null; lenguaTexto?: string; id?: string; nota?: string }

/**
 * Cita copiable: el texto a la vista y, plegados en `<details>`, BibTeX y RIS. Sin JS, el texto se selecciona de un
 * toque (`user-select: all`). `data-autoria`: una cita nombra a sus AUTORES, no a quien figura en los datos.
 */
export function htmlCita(lang: Lang, c: CitaOpts): string {
  const yaEsHtml = /<(mark|data|span|strong|em|code|time|a)\b|&(amp|lt|gt|quot);/.test(c.texto);
  const texto = yaEsHtml ? c.texto : escapa(c.texto);
  const det = (clave: string, cuerpo?: string | null) => cuerpo
    ? `<details><summary>${t(lang, clave)}</summary><pre data-copiar-texto translate="no"><code>${escapa(cuerpo)}</code></pre></details>` : '';
  const formatos = c.bibtex || c.ris ? `<div class="cita-formatos" role="group" aria-label="${escapa(plano(lang, 'comun.cita.formatos.aria'))}">${det('comun.cita.bibtex', c.bibtex)}${det('comun.cita.ris', c.ris)}</div>` : '';
  return `<div class="cita" data-copiable data-autoria${c.id ? ` id="${escapa(c.id)}"` : ''}>`
    + `<p class="cita-texto" data-copiar-texto translate="no"${c.lenguaTexto ? ` lang="${escapa(c.lenguaTexto)}"` : ''}>${texto}</p>`
    + (c.nota ? `<p class="nota cita-nota">${c.nota}</p>` : '')
    + formatos
    + `<p class="cita-acciones no-imprimir"><button type="button" class="boton sec" data-copiar hidden><svg class="icono" aria-hidden="true" focusable="false"><use href="#i-copiar"></use></svg><span>${rotulo(lang, 'comun.boton.cita')}</span></button>`
    + `<span class="cita-aviso" role="status" data-copiar-aviso data-copiada="${escapa(plano(lang, 'comun.cita.copiada'))}" data-no-copiada="${escapa(plano(lang, 'comun.isla.no_copiado'))}"></span></p>`
    + `</div>`;
}
