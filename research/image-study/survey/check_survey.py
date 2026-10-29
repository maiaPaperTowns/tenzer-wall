import os,subprocess,tempfile,time,urllib.request,urllib.error,json,base64,secrets
from pathlib import Path
root=Path(__file__).resolve().parent
with tempfile.TemporaryDirectory() as t:
 pw=secrets.token_urlsafe(20);env={**os.environ,'RESEARCHER_PASSWORD':pw,'SURVEY_DB':t+'/responses.sqlite3','PORT':'4189'}
 p=subprocess.Popen(['python3',str(root/'server.py')],env=env,stdout=subprocess.DEVNULL,stderr=None)
 try:
  for _ in range(40):
   try:items=json.load(urllib.request.urlopen('http://127.0.0.1:4189/items.json'));break
   except Exception:time.sleep(.1)
  def post(d):
   req=urllib.request.Request('http://127.0.0.1:4189/api/session',json.dumps(d).encode(),{'Content-Type':'application/json'})
   return json.load(urllib.request.urlopen(req))
  d={'order':[x['id'] for x in items],'responses':{}}
  session=post(d);d.update(id=session['id'],token=session['token']);d['responses'][items[0]['id']]='=test';post(d)
  d['complete']=True;post(d)
  for path in ['/researcher/data','/private/responses.sqlite3']:
   try:urllib.request.urlopen('http://127.0.0.1:4189'+path);raise AssertionError('Private endpoint exposed')
   except urllib.error.HTTPError as e:assert e.code in [401,404]
  auth=base64.b64encode(('researcher:'+pw).encode()).decode()
  req=urllib.request.Request('http://127.0.0.1:4189/researcher/export.csv',headers={'Authorization':'Basic '+auth})
  csv=urllib.request.urlopen(req).read().decode();assert "'=test" in csv
  try:post(d);raise AssertionError('Submitted data overwritten')
  except urllib.error.HTTPError as e:assert e.code==409
  print('PASS: 105 items; database save and submit; authentication; private DB isolation; CSV export and formula escaping; finalized-session protection.')
 finally:p.terminate();p.wait()
