"""Run: RESEARCHER_PASSWORD=... python3 server.py. Bind locally by default."""
import base64,csv,hashlib,hmac,io,json,os,secrets,sqlite3,time
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse
ROOT=Path(__file__).resolve().parent
DB=Path(os.environ.get('SURVEY_DB',str(ROOT/'private/responses.sqlite3')))
PASSWORD=os.environ.get('RESEARCHER_PASSWORD','')
if len(PASSWORD)<12: raise SystemExit('Set RESEARCHER_PASSWORD to at least 12 characters.')
DB.parent.mkdir(parents=True,exist_ok=True);os.chmod(DB.parent,0o700)
with sqlite3.connect(DB) as c:
 c.execute('CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY, token TEXT NOT NULL, created INTEGER, submitted INTEGER, payload TEXT NOT NULL)')
os.chmod(DB,0o600)
ITEMS=json.loads((ROOT/'public/items.json').read_text())
IDS={x['id'] for x in ITEMS}
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*a,**kw):super().__init__(*a,directory=str(ROOT/'public'),**kw)
 def log_message(self,*a):pass
 def reply(self,status,data,kind='application/json'):
  body=data if isinstance(data,bytes) else json.dumps(data).encode();self.send_response(status);self.send_header('Content-Type',kind);self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(body)
 def auth(self):
  try: value=base64.b64decode(self.headers.get('Authorization','').split(' ',1)[1]).decode();user,pw=value.split(':',1)
  except Exception:return False
  return user=='researcher' and hmac.compare_digest(pw,PASSWORD)
 def do_GET(self):
  path=urlparse(self.path).path
  if path.startswith('/researcher'):
   if not self.auth():
    self.send_response(401);self.send_header('WWW-Authenticate','Basic realm="Study researchers"');self.end_headers();return
   with sqlite3.connect(DB) as c:rows=c.execute('SELECT id,created,submitted,payload FROM sessions ORDER BY created DESC').fetchall()
   if path=='/researcher/export.csv':
    out=io.StringIO();w=csv.writer(out);w.writerow(['session_id','created','submitted','position','image_id','response'])
    for sid,created,submitted,payload in rows:
     d=json.loads(payload)
     for i,item in enumerate(d['order']):
      v=d['responses'].get(item,'')
      if v.startswith(('=','+','-','@','\t','\r')):v="'"+v
      w.writerow([sid,created,submitted,i+1,item,v])
    self.reply(200,out.getvalue().encode(),'text/csv; charset=utf-8');return
   if path=='/researcher/image-map':return self.reply(200,json.loads((ROOT/'researcher-image-map.json').read_text()))
   if path=='/researcher/data':self.reply(200,[{'id':a,'created':b,'submitted':c,'data':json.loads(d)} for a,b,c,d in rows]);return
   return self.reply(200,b'<!doctype html><meta charset="utf-8"><title>Research dashboard</title><h1>Research dashboard</h1><p><a href="/researcher/export.csv">Download response CSV</a> | <a href="/researcher/image-map">Image ID map for coding</a></p><pre id="data"></pre><script>fetch("/researcher/data").then(r=>r.json()).then(d=>document.querySelector("#data").textContent=JSON.stringify(d,null,2))</script>','text/html; charset=utf-8')
  if path=='/':self.path='/index.html'
  super().do_GET()
 def do_POST(self):
  if urlparse(self.path).path!='/api/session':return self.reply(404,{'error':'Not found'})
  if self.headers.get('Content-Type','').split(';')[0]!='application/json':return self.reply(415,{'error':'JSON required'})
  origin=self.headers.get('Origin')
  if origin and urlparse(origin).netloc!=self.headers.get('Host'):return self.reply(403,{'error':'Origin mismatch'})
  try:
   n=int(self.headers.get('Content-Length','0'))
   if n<2 or n>100000:raise ValueError()
   d=json.loads(self.rfile.read(n));order=d['order'];responses=d['responses']
   if not isinstance(order,list) or len(order)!=len(IDS) or set(order)!=IDS:raise ValueError()
   if not isinstance(responses,dict) or not set(responses)<=IDS:raise ValueError()
   if any(not isinstance(v,str) or len(v)>200 for v in responses.values()):raise ValueError()
   sid=d.get('id');token=d.get('token');now=int(time.time());payload=json.dumps({'order':order,'responses':responses,'version':'draft-2026-10-29'})
   with sqlite3.connect(DB) as c:
    if sid:
     row=c.execute('SELECT token,submitted FROM sessions WHERE id=?',(sid,)).fetchone()
     if not row or not isinstance(token,str) or not hmac.compare_digest(row[0],hashlib.sha256(token.encode()).hexdigest()):return self.reply(403,{'error':'Invalid session'})
     if row[1]:return self.reply(409,{'error':'Session already submitted'})
     c.execute('UPDATE sessions SET payload=?,submitted=? WHERE id=?',(payload,now if d.get('complete') else None,sid))
    else:
     if d.get('complete'):raise ValueError()
     sid=secrets.token_urlsafe(18);token=secrets.token_urlsafe(32)
     c.execute('INSERT INTO sessions VALUES(?,?,?,?,?)',(sid,hashlib.sha256(token.encode()).hexdigest(),now,None,payload))
   return self.reply(200,{'id':sid,'token':token,'saved':True})
  except (ValueError,KeyError,TypeError,json.JSONDecodeError):return self.reply(400,{'error':'Invalid request'})
if __name__=='__main__':
 print('Survey: http://127.0.0.1:4184 | Researchers: /researcher (username researcher)')
 ThreadingHTTPServer((os.environ.get('BIND','127.0.0.1'),int(os.environ.get('PORT','4184'))),Handler).serve_forever()
