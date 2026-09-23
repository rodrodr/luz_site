// Uso: node papel.mjs <pares.json> <salida.json>
// Papel de cada etiqueta de orador con el MOTOR DEL EXPLORADOR (engine.js: copia literal del motor de
// 2REP_Explorer/standalone/src; sha256 comprobado por exportar.py). Entrada: [[speaker, rep_name], ...].
// Salida: [[role, is_chair, group], ...] en el mismo orden (role = null si el analizador no reconoce la etiqueta).
import fs from 'fs';
import vm from 'vm';
globalThis.R2 = {};
vm.runInThisContext(fs.readFileSync(new URL('./engine.js', import.meta.url), 'utf8'), { filename: 'engine.js' });
const D = globalThis.R2.diario;
const [entrada, salida] = process.argv.slice(2);
const pares = JSON.parse(fs.readFileSync(entrada, 'utf8'));
const out = pares.map(([s, r]) => {
  const sp = D.parse_speaker(s || '', r || '');
  return [(sp && sp.role) || null, sp && sp.is_chair ? 1 : 0, sp && sp.group ? 1 : 0];
});
fs.writeFileSync(salida, JSON.stringify(out));
