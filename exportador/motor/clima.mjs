// Uso: node clima.mjs <entrada.jsonl> <salida.jsonl>
// Acotaciones de cada fila con el MOTOR DEL EXPLORADOR (R2.diario.parse_speech + climate), el mismo que colorea
// el lector. Entrada: una fila por línea {id, speaker, rep_name, speech}. Salida: {id, n, ap, co, or, ne, lab,
// role, chair, grp} — el mismo formato que ~/.cache/luz_site/clima/*.jsonl — o {id, err} si el motor falla.
import fs from 'fs';
import vm from 'vm';
import readline from 'readline';
globalThis.R2 = {};
vm.runInThisContext(fs.readFileSync(new URL('./engine.js', import.meta.url), 'utf8'), { filename: 'engine.js' });
const D = globalThis.R2.diario;
const [inp, outp] = process.argv.slice(2);
const out = fs.createWriteStream(outp);
const rl = readline.createInterface({ input: fs.createReadStream(inp), crlfDelay: Infinity });
let n = 0, err = 0;
for await (const line of rl) {
  if (!line) continue;
  const r = JSON.parse(line);
  let rec;
  try {
    const doc = D.parse_speech(r.speech || '', r.speaker, r.rep_name);
    const cl = D.climate(doc);
    const sp = D.parse_speaker(r.speaker || '', r.rep_name || '');
    rec = { id: r.id, n: cl.n, ap: cl.applause, co: cl.conflict, or: cl.order, ne: cl.neutral, lab: cl.labels,
      role: sp && sp.role, chair: !!(sp && sp.is_chair), grp: !!(sp && sp.group) };
  } catch (e) {
    err++;
    rec = { id: r.id, err: String((e && e.message) || e).slice(0, 200) };
  }
  out.write(JSON.stringify(rec) + '\n');
  n++;
}
out.end();
console.error(`${inp}: ${n} filas, ${err} errores`);
