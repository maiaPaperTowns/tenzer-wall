const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const sources = new Map(require('./manifest.json').map(([name,file]) => ['/assets/stock/'+name,file]));
sources.set('/assets/aoyagi-kouzan.ttf',path.resolve(__dirname,'../dist/assets/aoyagi-kouzan.ttf'));
for(const name of ['flower-atlas-v2.png','flower-clusters-v3.png','flower-mixed-v4.png','mountain-atlas-v2.png','lightning-storm-v1.png','rainbow-artistic-v2.png','rainbow-layer-v1.png'])sources.set('/assets/derived/'+name,path.join(__dirname,'assets/derived',name));
for(const name of ['rain-roof.jpg','rain-purple.jpg','rain-umbrella.jpg'])sources.set('/assets/stock/'+name,path.join(__dirname,'assets/stock',name));
const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf'};
for(const dir of ['derived','stock'])for(const name of fs.readdirSync(path.join(__dirname,'assets',dir)))sources.set('/assets/'+dir+'/'+name,path.join(__dirname,'assets',dir,name));
for(const dir of ['derived','stock'])for(const name of fs.readdirSync(path.join(__dirname,'../dist/assets',dir))){const key='/assets/'+dir+'/'+name;if(!sources.has(key)||!fs.existsSync(sources.get(key)))sources.set(key,path.join(__dirname,'../dist/assets',dir,name))}
sources.set('/nature-scenes.js',path.join(__dirname,'nature-scenes.js'));
sources.set('/world-scenes.js',path.join(__dirname,'world-scenes.js'));
sources.set('/dream-scenes.js',path.join(__dirname,'dream-scenes.js'));
sources.set('/render-budget.js',path.join(__dirname,'render-budget.js'));
sources.set('/assets/derived/river-channels-v1.png',path.join(__dirname,'assets/derived/river-channels-v1.png'));
sources.set('/assets/stock/water-pattern.jpg',path.join(__dirname,'assets/stock/water-pattern.jpg'));
for(const name of ['tree-leaves-v1.png','snowflake-v1.png'])sources.set('/assets/derived/'+name,path.join(__dirname,'assets/derived',name));
for(const name of ['fire-pit.jpg','fire-nebula.jpg','moon-disc.jpg','moon-atmosphere.jpg','snow-road.jpg','snow-oak.jpg','river-meadow.jpg','ocean-rocks.jpg','ocean-waves.jpg'])sources.set('/assets/stock/'+name,path.join(__dirname,'assets/stock',name));
sources.set('/assets/derived/rain-surface-v2.png',path.join(__dirname,'assets/derived/rain-surface-v2.png'));
for(const name of ['rain-purple-surface-v2.png','rain-umbrella-surface-v2.png']) sources.set('/assets/derived/'+name,path.join(__dirname,'assets/derived',name));
// Warm current artwork once; cloud-synced filesystem reads must not stall six browser slots.
const artworkCache=new Map();
for(const asset of new Set(JSON.parse(fs.readFileSync(path.join(__dirname,'config.json'),'utf8')).entries.flatMap(e=>e.assets))){const url='/'+asset,file=sources.get(url)||path.join(__dirname,asset);artworkCache.set(url,fs.readFileSync(file));}
http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost').pathname;
  const file=sources.get(url)||(/^\/assets\/(derived|stock)\/[\w.-]+$/.test(url)?path.join(__dirname,url):null)||(['/', '/index.html','/app.js','/styles.css','/stock-scenes.js','/config-loader.js','/config.json'].includes(url)?path.join(__dirname,url==='/'?'index.html':url):null);
  if(!file||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  if(artworkCache.has(url)){const data=artworkCache.get(url);res.setHeader('Content-Length',data.length);res.end(data);return;}
  fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
}).listen(4183,'127.0.0.1',()=>console.log('Preview on http://127.0.0.1:4183'));
