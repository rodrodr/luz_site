export {};
/**
 * Isla de «¿Cuántos votaron sí?» (juego 2 de Inicio; `components/inicio/Apuesta.astro`). SOLO AÑADE: sin JS, los
 * resultados están a la vista. Con JS, cada fila es una apuesta:
 *  · el deslizador (nativo: puntero, dedo o ← →) llena la barra mientras se arrastra y dice el porcentaje;
 *  · al soltarlo con el puntero, con Intro o con [Comprobar], la barra corre hasta el resultado real, queda una marca
 *    donde apostó el lector y se dice a cuántos puntos se quedó;
 *  · con las seis comprobadas, el marcador; [Ver todos los resultados] y [Volver a jugar].
 */
interface Textos { su: string; cerca: string; lejos: string; marcador: string; si: string }

function iniciar(raiz: HTMLElement): void {
  const T = JSON.parse(raiz.dataset.textos || '{}') as Textos;
  const nf = new Intl.NumberFormat(raiz.dataset.locale || 'es-ES', { maximumFractionDigits: 0 });
  const pc = new Intl.NumberFormat(raiz.dataset.locale || 'es-ES', { style: 'percent', maximumFractionDigits: 0 });
  const filas = [...raiz.querySelectorAll<HTMLElement>('.ap-fila')];
  const marcador = raiz.querySelector<HTMLElement>('.ap-marcador')!;
  const todas = raiz.querySelector<HTMLButtonElement>('.ap-todas')!;
  const otra = raiz.querySelector<HTMLButtonElement>('.ap-otra')!;
  const apuestas = new Map<HTMLElement, number | null>();

  raiz.classList.add('ap--juego');
  todas.hidden = false;

  function preparar(f: HTMLElement): void {
    const r = f.querySelector<HTMLInputElement>('.ap-rango')!;
    const valor = f.querySelector<HTMLElement>('.ap-valor')!;
    const boton = f.querySelector<HTMLButtonElement>('.ap-comprobar')!;
    const dif = f.querySelector<HTMLElement>('.ap-dif')!;
    f.classList.remove('revelada');
    r.hidden = false;
    r.disabled = false;
    r.value = '50';
    f.style.setProperty('--apuesta', '50');
    valor.textContent = `${pc.format(0.5)} ${T.si}`;
    dif.textContent = '';
    boton.hidden = true;
    apuestas.set(f, null);
  }

  function revelar(f: HTMLElement, contar = true): void {
    if (f.classList.contains('revelada')) return;
    const r = f.querySelector<HTMLInputElement>('.ap-rango')!;
    const boton = f.querySelector<HTMLButtonElement>('.ap-comprobar')!;
    const dif = f.querySelector<HTMLElement>('.ap-dif')!;
    const real = Number(f.dataset.real);
    const apuesta = Number(r.value);
    f.classList.add('revelada');
    f.style.setProperty('--apuesta', String(apuesta));
    r.disabled = true;
    boton.hidden = true;
    if (contar && apuestas.get(f) !== null) {
      const d = Math.round(Math.abs(apuesta - real));
      dif.textContent = (d <= 3 ? T.cerca : T.lejos).replace('{d}', nf.format(d));
    } else {
      apuestas.set(f, null);
    }
    if (filas.every((x) => x.classList.contains('revelada'))) terminar();
  }

  function terminar(): void {
    const jugadas = filas.filter((f) => apuestas.get(f) !== null);
    todas.hidden = true;
    otra.hidden = false;
    if (!jugadas.length) { marcador.textContent = ''; return; }
    const buenas = jugadas.filter((f) => Math.abs(Number(f.querySelector<HTMLInputElement>('.ap-rango')!.value) - Number(f.dataset.real)) < 10).length;
    marcador.textContent = T.marcador.replace('{n}', nf.format(buenas)).replace('{total}', nf.format(jugadas.length));
  }

  for (const f of filas) {
    const r = f.querySelector<HTMLInputElement>('.ap-rango')!;
    const valor = f.querySelector<HTMLElement>('.ap-valor')!;
    const boton = f.querySelector<HTMLButtonElement>('.ap-comprobar')!;
    preparar(f);
    r.addEventListener('input', () => {
      f.style.setProperty('--apuesta', r.value);
      valor.textContent = `${pc.format(Number(r.value) / 100)} ${T.si}`;
      apuestas.set(f, Number(r.value));
      boton.hidden = false;
    });
    // Con el puntero, soltar es apostar; con el teclado, Intro o el botón.
    r.addEventListener('pointerup', () => { if (apuestas.get(f) !== null) revelar(f); });
    r.addEventListener('keydown', (e) => { if (e.key === 'Enter' && apuestas.get(f) !== null) { e.preventDefault(); revelar(f); } });
    boton.addEventListener('click', () => revelar(f));
  }
  todas.addEventListener('click', () => filas.forEach((f) => revelar(f, false)));
  otra.addEventListener('click', () => {
    filas.forEach(preparar);
    marcador.textContent = '';
    otra.hidden = true;
    todas.hidden = false;
    filas[0]?.querySelector<HTMLInputElement>('.ap-rango')?.focus();
  });
}

document.querySelectorAll<HTMLElement>('[data-apuesta]').forEach(iniciar);
