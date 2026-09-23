// Uso: node clima_v2.mjs <entrada.jsonl> <salida.jsonl>
// Entrada: una fila V2 por línea {id, speaker, rep_name, speech}. Salida: recuento de acotaciones por clase
// con el MISMO motor que colorea el lector del explorador (R2.diario.parse_speech + climate).
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
const t0 = Date.now();
for await (const line of rl) {
  if (!line) continue;
  const r = JSON.parse(line);
  let rec;
  try {
    const doc = D.parse_speech(r.speech || '', r.speaker, r.rep_name);
    const cl = D.climate(doc);
    rec = { id: r.id, n: cl.n, ap: cl.applause, co: cl.conflict, or: cl.order, ne: cl.neutral, lab: cl.labels };
  } catch (e) {
    err++;
    rec = { id: r.id, err: String((e && e.message) || e).slice(0, 200) };
  }
  out.write(JSON.stringify(rec) + '\n');
  n++;
}
out.end();
console.error(`${inp}: ${n} filas, ${err} errores, ${((Date.now() - t0) / 1000).toFixed(1)} s`);
