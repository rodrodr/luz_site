(function () {
  'use strict';
  var MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  function mil(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- tema: el rótulo nombra el estado al que lleva */
  var root = document.documentElement, btn = document.querySelector('.tema');
  function actual() { return root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); }
  function rotular() { btn.setAttribute('aria-label', actual() === 'dark' ? 'Tema claro' : 'Tema oscuro'); }
  if (btn) {
    btn.hidden = false; rotular();
    btn.addEventListener('click', function () {
      var t = actual() === 'dark' ? 'light' : 'dark';
      var cambiar = function () { root.dataset.theme = t; try { localStorage.setItem('tema', t); } catch (e) {} rotular(); };
      if (document.startViewTransition && !reducido) document.startViewTransition(cambiar); else cambiar();
    });
  }

  /* ---------- hemiciclo: «Todos» quita el resalte */
  var todos = document.querySelector('.ley-todos');
  if (todos) { todos.hidden = false; todos.addEventListener('click', function () { document.querySelectorAll('input[name=hemi-b]').forEach(function (r) { r.checked = false; }); }); }

  /* ---------- F01c: nota emergente por plantilla, teclado y entrada */
  document.querySelectorAll('[data-fig=f01c]').forEach(function (fig) {
    var cal = fig.querySelector('.cal'), em = fig.querySelector('.emergente'), vivo = fig.querySelector('[aria-live]');
    fig.querySelector('.fig-teclado').hidden = false;
    var activa = null;
    function texto(c) {
      var k = c.dataset.m, y = k.slice(0, 4), m = MES[+k.slice(5) - 1];
      var s = +c.dataset.s;
      if (!s) return { t: m + ' de ' + y, d: 'Sin sesión en el corpus, dentro de la etapa.', b: 'V2 · la causa no sale del corpus' };
      return { t: m + ' de ' + y, d: s + (s === 1 ? ' sesión' : ' sesiones') + ' · ' + mil(c.dataset.f) + ' filas · ' + mil(c.dataset.p) + ' palabras', b: 'V2 · 2REP_Diaries.csv' };
    }
    function mostrar(c, teclado) {
      if (activa) activa.classList.remove('activa');
      activa = c; c.classList.add('activa');
      var x = texto(c);
      em.innerHTML = '<p class="em-t"></p><p class="em-d"></p><p class="em-b"></p>';
      em.children[0].textContent = x.t.charAt(0).toUpperCase() + x.t.slice(1);
      em.children[1].textContent = x.d; em.children[2].textContent = x.b;
      var rc = cal.getBoundingClientRect(), r = c.getBoundingClientRect();
      var w = em.offsetWidth, h = em.offsetHeight;
      var cx = r.left - rc.left + r.width / 2;
      var left = Math.max(0, Math.min(rc.width - w, cx - w / 2));
      var top = r.top - rc.top - h - 10, abajo = false;
      if (r.top - h - 14 < 0) { top = r.bottom - rc.top + 10; abajo = true; }
      em.style.left = left + 'px'; em.style.top = top + 'px';
      em.style.setProperty('--flecha', (cx - left) + 'px');
      em.classList.toggle('abajo', abajo); em.classList.add('ver');
      if (teclado && vivo) vivo.textContent = x.t + '. ' + x.d;
    }
    function ocultar() { em.classList.remove('ver'); if (activa) activa.classList.remove('activa'); activa = null; }
    cal.addEventListener('pointerover', function (e) { var c = e.target.closest('.c[data-m]'); if (c && e.pointerType === 'mouse') mostrar(c); });
    cal.addEventListener('pointerleave', function () { if (!cal.contains(document.activeElement)) ocultar(); });
    cal.addEventListener('click', function (e) { var c = e.target.closest('.c[data-m]'); if (c) mostrar(c); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') ocultar(); });
    fig.querySelectorAll('.cal-etapa').forEach(function (et) {
      var celdas = Array.prototype.slice.call(et.querySelectorAll('.c[data-m]'));
      var i = 0;
      et.addEventListener('focus', function (e) { if (e.target === et) { i = Math.max(0, celdas.findIndex(function (c) { return +c.dataset.s > 0; })); mostrar(celdas[i], true); } });
      et.addEventListener('blur', function (e) { if (!et.contains(e.relatedTarget)) ocultar(); });
      et.addEventListener('keydown', function (e) {
        if (e.target !== et) return;
        var k = e.key, j = i;
        if (k === 'ArrowRight' || k === 'ArrowDown') j = Math.min(celdas.length - 1, i + 1);
        else if (k === 'ArrowLeft' || k === 'ArrowUp') j = Math.max(0, i - 1);
        else if (k === 'Home') j = 0; else if (k === 'End') j = celdas.length - 1;
        else return;
        e.preventDefault(); i = j; mostrar(celdas[i], true);
      });
    });
    /* el tiempo corre: solo si el calendario aún no se ve y el lector no pidió menos movimiento */
    if (!reducido && 'IntersectionObserver' in window) {
      var rr = cal.getBoundingClientRect();
      if (rr.top > window.innerHeight) {
        cal.classList.add('espera');
        var io = new IntersectionObserver(function (en) {
          en.forEach(function (x) { if (x.isIntersecting) { cal.classList.add('entra'); cal.classList.remove('espera'); io.disconnect(); } });
        }, { threshold: .25 });
        io.observe(cal);
      }
    }
  });

  /* ---------- copiar */
  document.querySelectorAll('[data-copiar]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-copiar'), et = b.querySelector('span');
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () {
        var o = et.textContent; et.textContent = 'Copiada'; setTimeout(function () { et.textContent = o; }, 1600);
      }).catch(function () {});
    });
  });
})();
