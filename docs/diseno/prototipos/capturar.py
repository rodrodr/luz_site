"""Captura fotogramas de los prototipos y mide FPS aproximados (Chromium headless, Playwright)."""
import asyncio, json, pathlib
from playwright.async_api import async_playwright
D = pathlib.Path(__file__).parent; C = D / 'capturas'; C.mkdir(exist_ok=True)
FPS_JS = """async () => { const H = document.documentElement.scrollHeight - innerHeight; window.scrollTo(0,0);
  let n=0, t0=performance.now(), y=0; const dur=3000;
  await new Promise(r => { (function f(t){ n++; const k=(t-t0)/dur; window.scrollTo(0, Math.min(1,k)*H*0.95); if (k<1) requestAnimationFrame(f); else r(); })(t0); });
  return n*1000/(performance.now()-t0); }"""
async def run():
    out = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--enable-gpu', '--use-angle=metal', '--ignore-gpu-blocklist'])
        for name, frames in [('p1_hemiciclo_portada', [0, .3, .6, .95]), ('p2_diario_a_fila', [0, .25, .5, .75, 1])]:
            for scheme in ['dark']:
                pg = await b.new_page(viewport={'width': 1280, 'height': 800}, color_scheme=scheme)
                errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: m.type=='error' and errs.append(m.text))
                await pg.goto((D / f'{name}.html').as_uri()); await pg.wait_for_timeout(2500)
                H = await pg.evaluate('document.querySelector(".stage").offsetHeight - innerHeight')
                for i, f in enumerate(frames):
                    await pg.evaluate(f'window.scrollTo(0,{int(H*f)})'); await pg.wait_for_timeout(400)
                    await pg.screenshot(path=str(C / f'{name}_{i}.png'))
                fps = await pg.evaluate(FPS_JS)
                gl = await pg.evaluate("(()=>{const c=document.createElement('canvas').getContext('webgl2'); if(!c) return 'sin webgl2'; const e=c.getExtension('WEBGL_debug_renderer_info'); return e? c.getParameter(e.UNMASKED_RENDERER_WEBGL): 'webgl2'})()")
                out[name] = {'fps_scroll': round(fps, 1), 'renderer': gl, 'errores': errs}
                await pg.close()
        # reducido: ambos con prefers-reduced-motion
        for name in ['p1_hemiciclo_portada', 'p2_diario_a_fila']:
            pg = await b.new_page(viewport={'width': 390, 'height': 844}, reduced_motion='reduce', color_scheme='light')
            await pg.goto((D / f'{name}.html').as_uri()); await pg.wait_for_timeout(1500)
            await pg.screenshot(path=str(C / f'{name}_reducido_movil.png'), full_page=False)
            out[name + '_reducido'] = await pg.evaluate('document.documentElement.scrollWidth <= innerWidth')
            await pg.close()
        await b.close()
    print(json.dumps(out, ensure_ascii=False, indent=1))
asyncio.run(run())
