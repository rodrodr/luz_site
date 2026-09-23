import pandas as pd, pickle
B='/Users/rodrodr/Dropbox/Apps/2REP/2REP_Base/'
v2=pd.read_csv(B+'2REP_Diaries.csv',sep=';',dtype={'speech':str})
v3=pd.read_csv(B+'2REP_Diaries_v3.csv',sep=';',dtype={'speech':str})
v2.to_pickle('v2.pkl'); v3.to_pickle('v3.pkl')
print(v2.shape, v3.shape)
print(v2.legislature.value_counts().to_dict(), v3.legislature.value_counts().to_dict())
print(v2.groupby('legislature').apply(lambda d: d[['date','num_session']].drop_duplicates().shape[0]).to_dict())
print('nwords V2', v2.nwords.sum(), 'v3', v3.nwords.sum())
print('rep V2', v2.rep_id.nunique(), 'rep v3', v3.rep_id.nunique())
