"""Comprobaciones de la revisión adversarial del 22-09-2026 (anexo final de 00_PLAN_sitio.md).

Cada bloque verifica en la fuente un hallazgo de los revisores antes de aplicarlo.
Lee la V2 depositada (CSV, MD5 360332a0...), la v3 del explorador (corpus.sqlite), el papel de cada fila v3
(clima/*.jsonl, campos role y chair), CGOCUS V1.1 (censo y edgelist) y los ficheros del proyecto.
Uso: python3 comprobaciones_revision.py   (≈ 1–2 min; pandas 3.0.3; node para parse_speaker)
"""
import glob, hashlib, json, re, sqlite3, sys, unicodedata
import pandas as pd

sys.path.insert(0, '/Users/rodrodr/Dropbox/Apps/luz_site/docs/estudio/datos')
from comun import roles_presidencia  # parse_speaker del explorador, vía node

V2 = '/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv'
V3 = '/Users/rodrodr/.cache/luz_site/corpus.sqlite'
CLIMA = '/Users/rodrodr/.cache/luz_site/clima/*.jsonl'
CRIT = '/Users/rodrodr/Dropbox/Apps/luz_site/docs/estudio/critica'
EST = '/Users/rodrodr/Dropbox/Apps/luz_site/docs/estudio/datos'
BASE = '/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base'


def fold(s):
    s = unicodedata.normalize('NFD', str(s).lower())
    return ''.join(c for c in s if unicodedata.category(c) != 'Mn')


def titulo(t): print('\n==', t)


assert hashlib.md5(open(V2, 'rb').read()).hexdigest() == '360332a0ff1327671530f15eed46ac0c'
d = pd.read_csv(V2, sep=';', dtype={'rep_id': 'Int64'}); assert len(d) == 107551
d['f'] = d.speech.fillna('').map(fold)
d = roles_presidencia(d)
D = d.set_index('id')
con = sqlite3.connect(V3)
v = pd.read_sql('select id, num_session, ord, date, legislature, speaker, rep_id, rep_name, nwords, speech from speeches', con)
papel = pd.DataFrame([json.loads(l) for p in sorted(glob.glob(CLIMA)) for l in open(p)])[['id', 'role', 'chair']]
v = v.merge(papel, on='id', how='left'); assert len(v) == 121700
v['f'] = v.speech.fillna('').map(fold)
V = v.set_index('id')


def etapa(leg, n):
    return 'I' if leg == '1931-1933' else 'II' if leg == '1933-1935' else 'III' if n <= 60 else 'IV' if n <= 69 else 'V'


def literal(ed, i, frase):
    t = (D if ed == 'V2' else V).loc[i, 'speech']
    return 'exacta' if frase in t else ('plegada' if fold(frase) in fold(t) else 'NO')


titulo('H1 · Monserrat (1-II-1938)')
for ed, i in (('V2', 107245), ('V2', 107248), ('V2', 107251), ('v3', 121341), ('v3', 121345), ('v3', 121350)):
    print(ed, i, literal(ed, i, 'Monserrat'))
print('«montserrat» en la V2:', int(d.f.str.contains('montserrat').sum()), 'filas; ninguna del 1-II-1938')

titulo('H2 · Castillo de Figueras y la nota posterior')
print(literal('V2', 107337, 'Castillo de Figueras'), literal('v3', 121459, 'Castillo de Figueras'))
print(literal('V2', 107341, 'las cuatro de la Diputación Permanente, celebradas en París'),
      literal('v3', 121465, 'las cuatro de la Diputación Permanente, celebradas en París'), D.loc[107341, 'speaker'])

titulo('H3 · Listas nominales')
p = r'senores que (?:dijeron|han dicho) si'
for nombre, x in (('V2', d), ('v3', v)):
    m = x[x.f.str.contains(p, regex=True)]
    print(nombre, len(m), 'filas', m.groupby(['date', 'num_session']).ngroups, 'sesiones')
m = d[d.f.str.contains(p, regex=True)].copy()
m['et'] = [etapa(a, b) for a, b in zip(m.legislature, m.num_session)]
print('V2 por etapa:', m.groupby('et').size().to_dict(), m.groupby('et').apply(lambda g: g.groupby(['date', 'num_session']).ngroups).to_dict())

titulo('H4 · Control de F05 (v3, chair = false, role ∉ {summary, remark})')
h = v[~v.role.isin(['summary', 'remark'])]
hc = h[~h.chair.astype(bool)].copy()
hc['et'] = [etapa(a, b) for a, b in zip(hc.legislature, hc.num_session)]
print('habla', len(h), int(h.nwords.sum()), '· sin Presidencia', len(hc), int(hc.nwords.sum()), '·', hc.rep_id.nunique(), 'rep_id')
print(hc.groupby('et').nwords.sum().to_dict(), hc.groupby('et').rep_id.nunique().to_dict())

titulo('H5 · Negrín dentro de filas de la Presidencia en la V2')
for i in (107148, 107232, 107268, 107326): print(i, D.loc[i, 'speaker'], D.loc[i, 'nwords'])

titulo('H7 · «luz y taquígrafos», contexto de las diez filas')
for i in d[d.f.str.contains('luz y taquigrafos')].id:
    f = D.loc[i, 'f']; k = f.find('luz y taquigrafos'); print(i, D.loc[i, 'date'], '…' + f[max(0, k - 70):k + 40] + '…')

titulo('H8, H9, H26 · Afinidades (CGOCUS V1.1)')
e = pd.read_csv(f'{CRIT}/afin_coauthor_edgelist.csv'); c = pd.read_csv(f'{CRIT}/afin_diputados_basico.csv', sep=';')
B = {'EI': 'izq', 'I': 'izq', 'CI': 'izq', 'C': 'cen', 'CD': 'der', 'D': 'der', 'ED': 'der'}
for leg in ('1931-1933', '1933-1936', '1936-1939'):
    ee, cc = e[e.id_legislature == leg], c[c.legislatura == leg]
    f, cen = set(ee.id_dip1) | set(ee.id_dip2), set(cc.id_dip)
    b1, b2 = ee.ideo_dip1.map(B), ee.ideo_dip2.map(B)
    est = ((b1 == 'izq') & (b2 == 'der')) | ((b1 == 'der') & (b2 == 'izq'))
    print(leg, 'censo', len(cen), 'firman en censo', len(f & cen), 'sin ficha', len(f - cen), 'aislados', len(cen - f),
          'filas', len(ee), 'estricto', int(est.sum()))
    if leg == '1936-1939':
        s = ee[est]; par = cc.set_index('id_dip').partido.to_dict()
        der = [r.id_dip2 if B.get(r.ideo_dip2) == 'der' else r.id_dip1 for r in s.itertuples()]
        print('  lado derecho:', pd.Series(der).map(par).value_counts().to_dict())

titulo('H10 · README depositado')
t = open(f'{BASE}/Luz_y_Taquigrafos_README.txt', encoding='utf-8').read()
print('MD5', hashlib.md5(t.encode()).hexdigest()[:8], '· LLaVA:', 'llava' in t.lower(), '· prompt:', 'structured prompt' in t,
      '· Jaro-Winkler:', 'Jaro-Winkler' in t)

titulo('H12 · Filas sin rep_id, por papel (parse_speaker)')
print(d[d.rep_id.isna()].rol.value_counts().to_dict())

titulo('H14 · Ortega, las botas, la horca y las réplicas')
print(literal('V2', 1215, 'ni el payaso, ni el tenor, ni el jabali'), D.loc[1215, 'date'], '· filas del 14-VII-1931:', int((d.date == '1931-07-14').sum()))
print(literal('V2', 102493, 'le pondremos las botas'), literal('V2', 102481, 'En la horca'))
print(D.loc[85423, 'speaker'], D.loc[85423, 'nwords'], D.loc[85427, 'speaker'], D.loc[85427, 'nwords'])

titulo('H16 · V2 55221 en la v3')
for i in range(61929, 61933): print(i, V.loc[i, 'role'], V.loc[i, 'nwords'], V.loc[i, 'speech'][:60].replace('\n', ' '))

titulo('H17 · Citas letra a letra')
for ed, i, q in (('V2', 71330, 'Luz y taquigrafos.'), ('V2', 106747, 'los taquigrafos recogeran eso. (El señor Comín: Pobres taquigrafos.)'),
                 ('V2', 107372, 'Si, prometo.'), ('V2', 71331, 'Diputados—no he visto'),
                 ('V2', 106289, 'Presidente.—Aplausos.—Rumores.)'), ('V2', 20689, 'aquí en este salón (Muy bien);'),
                 ('V2', 37178, 'La mitad mas uno son 232'), ('v3', 121446, 'veintidos horas'),
                 ('V2', 70714, 'Tiros a la barriga, a la barriga!'), ('v3', 115674, 'El Reglamento dispone que se haga nominalmente'),
                 ('V2', 102359, 'son 417; la mitad más uno, 209'), ('V2', 74621, 'acepto las explicaciones del Sr. Prieto')):
    print(ed, i, literal(ed, i, q), q)

titulo('H18 · «nuevo aviso» y otras citas con id V2')
for i in (101697, 97549): print(i, D.loc[i, 'date'], D.loc[i, 'speaker'], literal('V2', i, 'hasta nuevo aviso'))
print(literal('V2', 107095, 'al pueblo de Valencia'), literal('V2', 107303, 'San Cugat del Vallés'),
      literal('V2', 6999, 'siete y treinta y cinco minutos de la mañana del día 14'))

titulo('H19 · Vicepresidente en algún tramo')
vc = d[d.rol == 'vicechair']; print('parse_speaker', len(vc), vc.groupby(['date', 'num_session']).ngroups)
lit = d[d.speaker.fillna('').map(fold).str.contains('vicepresidente')]; print('literal', len(lit), lit.groupby(['date', 'num_session']).ngroups)

titulo('H22 · «Diario de Sesiones» por papel')
print(d[d.f.str.contains('diario de sesiones')].rol.value_counts().to_dict())

titulo('H24 · Sufragio femenino: entradas frente a filas v3')
b = {x['clave']: x for x in json.load(open(f'{EST}/bibliotecas_v3.json'))['bibliotecas']}
print(b['L2-B2']['nombre'], b['L2-B2']['entradas'], '·', int(v.date.isin(['1931-09-30', '1931-10-01']).sum()), 'filas v3')

titulo('R9 · Marcas «verificar» en sessions.json')
S = json.load(open(f'{BASE}/2REP_Explorer/standalone/data/sessions.json'))['sessions']
print({k: sum(1 for s in S if (s.get(k) or {}).get('verificar')) for k in ('presidente', 'gobierno')})

titulo('R20, R22 · Orden en pantalla y filas más largas')
print(V.loc[6460:6464, 'ord'].tolist(), '→ en pantalla', [o + 1 for o in V.loc[6460:6464, 'ord']])
print(d.nlargest(2, 'nwords')[['id', 'nwords']].values.tolist(), h.nlargest(1, 'nwords')[['id', 'nwords']].values.tolist())

titulo('V18 · Umbrales de la mitad más uno')
for i in (13531, 37178, 102359): print(i, re.findall(r'(?:suman?|son) \d+[.;] [Ll]a mitad m[aá]s uno,? (?:son )?\d+', D.loc[i, 'speech']))

titulo('V19 · Sesión 56 (14-X-1931)')
print(int((d.date == '1931-10-14').sum()), 'filas V2', bool((d.id == 7022).any() and D.loc[7022, 'date'] == '1931-10-14'))

titulo('V20 · Turnos rescatados')
print(json.load(open(f'{BASE}/2REP_Explorer/tools/mapa_v2_v3.json'))['resumen'])
