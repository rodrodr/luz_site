#!/usr/bin/env python3
"""Instantánea del trabajo en curso: flujos, agentes terminados y archivos cambiados.
Se ejecuta a mano en cada hito: python3 docs/estado/instantanea.py
Escribe docs/estado/AUTO.md y docs/estado/resultados/<run>.md (el texto devuelto por cada agente)."""
import json, pathlib, time, datetime

SES = pathlib.Path("/Users/rodrodr/.claude/projects/-Users-rodrodr-Dropbox-Apps-aecpa2026/55ab8dc3-605f-4c6d-92bf-bf467b5556d0")
WF = SES / "subagents" / "workflows"
SCRIPTS = SES / "workflows" / "scripts"
OUT = pathlib.Path(__file__).resolve().parent
RAICES = [pathlib.Path("/Users/rodrodr/Dropbox/Apps/luz_site"), pathlib.Path("/Users/rodrodr/.claude/skills/maestro-diseno-web")]
OMITIR = ("node_modules", "/dist/", "/.astro/", "/docs/estado/", "__pycache__", "/.git/")

(OUT / "resultados").mkdir(parents=True, exist_ok=True)
ahora = datetime.datetime.now()
nombres = {}
for s in SCRIPTS.glob("*.js"):
    if "-wf_" in s.stem:
        base, run = s.stem.rsplit("-wf_", 1)
        nombres["wf_" + run] = base

lineas = [f"# Instantánea · {ahora:%d-%m-%Y %H:%M}", "",
          f"Guiones de los flujos: `{SCRIPTS}`", "",
          "| flujo | run | agentes terminados | última actividad |", "|---|---|---|---|"]
for d in sorted(WF.glob("wf_*"), key=lambda p: p.stat().st_mtime):
    j = d / "journal.jsonl"
    if not j.exists():
        continue
    res = []
    for l in j.read_text(encoding="utf-8", errors="ignore").splitlines():
        try:
            o = json.loads(l)
        except Exception:
            continue
        if o.get("type") == "result":
            res.append(o.get("result"))
    mt = datetime.datetime.fromtimestamp(j.stat().st_mtime)
    lineas.append(f"| {nombres.get(d.name, '?')} | {d.name} | {len(res)} | {mt:%d-%m %H:%M} |")
    txt = [f"# {nombres.get(d.name, d.name)} ({d.name}) · {len(res)} resultados · {ahora:%d-%m %H:%M}", ""]
    for i, r in enumerate(res, 1):
        s = r if isinstance(r, str) else json.dumps(r, ensure_ascii=False, indent=1)
        txt += [f"## Resultado {i}", "", s[:20000], ""]
    (OUT / "resultados" / f"{d.name}.md").write_text("\n".join(txt), encoding="utf-8")

lineas += ["", "## Archivos cambiados en las últimas tres horas", ""]
lim = time.time() - 3 * 3600
for raiz in RAICES:
    if not raiz.exists():
        continue
    cambiados = []
    for p in raiz.rglob("*"):
        if any(x in str(p) for x in OMITIR):
            continue
        try:
            if p.is_file() and p.stat().st_mtime > lim:
                cambiados.append(p)
        except OSError:
            pass
    cambiados.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    lineas.append(f"**{raiz}** ({len(cambiados)}):")
    lineas += [f"- {p.relative_to(raiz)} · {datetime.datetime.fromtimestamp(p.stat().st_mtime):%H:%M}" for p in cambiados[:80]]
    lineas.append("")
lineas.append("Para retomar, lea primero `docs/ESTADO_TRABAJO.md`.")
(OUT / "AUTO.md").write_text("\n".join(lineas), encoding="utf-8")
print(f"{OUT / 'AUTO.md'} · {len(list((OUT / 'resultados').glob('*.md')))} flujos volcados")
