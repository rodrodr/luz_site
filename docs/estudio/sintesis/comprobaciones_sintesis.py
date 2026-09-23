"""Comprobaciones hechas el 22-09-2026 para 00_PLAN_sitio.md y 01_NARRATIVA_sitio.md.
Lee la V2 depositada (CSV, MD5 360332a0...) y la v3 del explorador (corpus.sqlite).
Uso: python3 comprobaciones_sintesis.py   (≈ 30 s; pandas 3.0.3)
"""
import hashlib, json, re, sqlite3, unicodedata
import pandas as pd

V2 = '/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/2REP_Diaries.csv'
V3 = '/Users/rodrodr/.cache/luz_site/corpus.sqlite'
EST = '/Users/rodrodr/Dropbox/Apps/luz_site/docs/estudio'
AFIN = '/Users/rodrodr/Dropbox/Apps/aecpa2026/figs/afinidades/data'

def fold(s): return unicodedata.normalize('NFKD', str(s)).encode('ascii', 'ignore').decode().lower()
def titulo(t): print('\n==', t)

md5 = hashlib.md5(open(V2, 'rb').read()).hexdigest()
assert md5 == '360332a0ff1327671530f15eed46ac0c', md5
d = pd.read_csv(V2, sep=';'); assert len(d) == 107551
d['f'] = d.speech.map(fold)
con = sqlite3.connect(V3)

titulo('1. Votaciones: texto de las filas V2 (ordinaria frente a nominal)')
for i in (5453, 6994, 13531, 37177, 37178, 102358):
    f = d.loc[d.id == i, 'f'].iloc[0]
    print(i, 'ordinaria' if 'votacion ordinaria' in f else '', 'nominal' if 'nominal' in f else '',
          re.findall(r'total, \d+|\d+ votos contra \d+|suman \d+|votacion \d+', f)[:4])

titulo('2. «no constará(n) en el Diario» y «no se consigna(n) por orden» (V2 y v3)')
for nombre, p in (('constar', r'no constar(?:a|an) en el diario'), ('consigna', r'no se consigna(?:n)? por orden')):
    m = d[d.f.str.contains(p, regex=True)]
    print(nombre, 'V2:', list(zip(m.id, m.date, m.speaker)))
    ids = [r[0] for r in con.execute('select id, speech from speeches') if re.search(p, fold(r[1]))]
    print(nombre, 'v3:', ids)
print('FTS frase exacta en plural:', con.execute("select count(*) from speeches_fts where speeches_fts match '\"no constaran en el diario\"'").fetchone())

titulo('3. «luz y taquígrafos»: V2 y v3')
m = d[d.f.str.contains('luz y taquigrafos')]
print('V2', len(m), list(m.id))
print('v3 FTS', con.execute("select count(*) from speeches_fts where speeches_fts match '\"luz y taquigrafos\"'").fetchone())
print(d.loc[d.id == 71330, ['speaker', 'rep_id', 'rep_name', 'party', 'district']].to_dict('records'))

titulo('4. Orden de Campoamor en las dos ediciones')
print('V2', d.loc[d.id.isin([5423, 5424]), ['id', 'order']].to_dict('records'))
print('v3', con.execute('select id, ord from speeches where id in (6078, 6079)').fetchall())

titulo('5. rep_id 836: dos nombres y dos partidos')
print(d[d.rep_id == 836].groupby(['rep_name', 'party', 'legislature']).size())

titulo('6. Bibliotecas del proyecto por etapa (fechas de sus sesiones)')
def etapa(f):
    return 'I' if f <= '1933-10-03' else 'II' if f <= '1935-12-10' else 'III' if f <= '1936-07-10' else 'IV' if f <= '1939-02-01' else 'V'
for b in json.load(open(f'{EST}/datos/bibliotecas_v3.json'))['bibliotecas']:
    print(b['clave'], b['nombre'], b['entradas'], ','.join(sorted({etapa(s[0]) for s in b['sesiones']})))

titulo('7. Red de Afinidades frente al censo de CGOCUS V1.1')
censo = pd.read_csv(f'{EST}/critica/afin_diputados_basico.csv', sep=';').groupby('legislatura').size()
for leg in ('1931-1933', '1933-1936', '1936-1939'):
    print(leg, 'nodos', len(json.load(open(f'{AFIN}/afin_red_{leg}.json'))['nodes']), 'censo', censo[leg])

titulo('8. Pesos en la unidad de Dataverse (bytes / 1.024²)')
for n, b in (('2REP_Diaries.csv', 165785782), ('corpus.sqlite.gz (3 trozos)', 111733652),
             ('corpus.sqlite', 282316800), ('representatives_metrics.json', 17748967)):
    print(n, f'{b / 1024**2:.1f} MB')
