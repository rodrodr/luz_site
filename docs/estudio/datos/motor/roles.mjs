// Uso: node roles.mjs <pares.json>  →  JSON con el rol de cada [speaker, rep_name]
// Motor: engine.js, copia del motor del explorador (2REP_Explorer/standalone/src: worker/transformar.js,
// engine/py, engine/generated y engine/diario.js), el mismo que se usó en landing/scripts/.
import fs from 'fs';
import vm from 'vm';
globalThis.R2 = {};
vm.runInThisContext(fs.readFileSync(new URL('./engine.js', import.meta.url), 'utf8'), { filename: 'engine.js' });
const D = globalThis.R2.diario;
const pares = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const out = pares.map(([s, r]) => {
  const sp = D.parse_speaker(s || '', r || '');
  return (sp && sp.role) || null;
});
process.stdout.write(JSON.stringify(out));
