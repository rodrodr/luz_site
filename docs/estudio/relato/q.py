import pandas as pd, re, unicodedata, sys
v3=pd.read_pickle('v3.pkl')
def fold(s): return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if unicodedata.category(c)!='Mn')
v3['f']=v3.speech.fillna('').map(fold)
def q(pat, date=None, n=3, w=180):
    d=v3 if not date else v3[v3.date.str.startswith(date)]
    h=d[d.f.str.contains(pat,regex=True)]
    print(f'\n>>> {pat!r} {date or ""}: {len(h)} filas')
    for _,r in h.head(n).iterrows():
        m=re.search(pat,r.f); k=m.start()
        print(f'  v3 {r.id} {r.date} s{r.num_session} {r.speaker[:45]} | {r.rep_name} | {r.nwords}w | …{r.speech[max(0,k-w):k+w]}…'.replace('\n',' '))
for a in sys.argv[1:]:
    p,_,d=a.partition('@'); q(p,d or None)
