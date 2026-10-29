const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process'),crypto=require('node:crypto');
const files=["dream-scenes.js","nature-scenes.js","world-scenes.js","stock-scenes.js","config.json","index.html","layered-motion-check.cjs","nature-reference-check.cjs","perf-budget-check.cjs","LAYERED-MOTION-20261007.md","assets/derived/horse-gallop-v2.webp","assets/derived/ice-plate-v2.webp","assets/derived/ice-clusters-v2.webp","assets/derived/wind-plate-v3.webp","assets/derived/wind-ribbons-v3.webp","assets/derived/star-sky-v4.webp","assets/derived/storm-sky-v3.webp","assets/derived/ocean-plate-v4.webp","assets/derived/ocean-crests-v4.webp","assets/derived/lotus-plate-v2.webp","assets/derived/lotus-floats-v2.webp","assets/derived/leaf-plate-v4.webp","assets/derived/wisteria-plate-v2.webp","assets/derived/wisteria-clusters-v2.webp","assets/derived/sand-world-v2.webp","assets/derived/cat-seated-v4.webp","assets/derived/flower-plate-v6.webp","assets/derived/rain-plate-v4.webp","assets/derived/sakura-plate-v5.webp","assets/derived/fire-frames-v4.webp","assets/derived/bamboo-cutouts-v3.webp","assets/derived/tree-cutouts-v3.webp","assets/derived/water-plate-v2.webp","app.js","assets/derived/sakura-clusters-v6.webp"];
const reviewed={'maiaPaperTowns/tenzer-wall-site':'62a4cb0d8aa0311a9a06dc0766a8296b2baf2bbb','maiaPaperTowns/tenzer-wall':'170cb255c395ae99a462d02e48a83ac6e155e7ad'};
if(process.argv[3]==='white-calico')files.splice(0,files.length,'dream-scenes.js','app.js','config.json','config.test.cjs','index.html','WHITE-SAKURA-CALICO-20261008.md','assets/derived/flower-white-atlas-v2.webp','assets/derived/cat-calico-v5.webp','assets/derived/sakura-painted-atlas-v1.webp','assets/derived/sakura-bridge-v1.webp');
if(process.argv[3]==='peony')files.splice(0,files.length,'dream-scenes.js','app.js','config.json','config.test.cjs','index.html','FLOWER-WATERCOLOR-20261008.md','assets/derived/flower-watercolor-atlas-v1.webp','assets/derived/flower-watercolor-paper-v1.webp');
if(process.argv[3]==='atmosphere')files.splice(0,files.length,'world-scenes.js','dream-scenes.js','nature-scenes.js','stock-scenes.js','index.html');
if(process.argv[3]==='balanced')files.splice(0,files.length,'app.js','styles.css','index.html','render-budget.js','balanced-falling-check.cjs','perf-budget-check.cjs','assets/derived/wall-ink-wash-dawn.png');
if(process.argv[3]==='clouds-only')files.splice(0,files.length,'dream-scenes.js','index.html');
if(process.argv[3]==='forest-only')files.splice(0,files.length,'world-scenes.js');
if(process.argv[3]==='final')files.splice(0,files.length,'app.js','dream-scenes.js','world-scenes.js','config.json','index.html','LAYERED-MOTION-20261007.md','assets/derived/bamboo-cutouts-v4.webp');
if(process.argv[3]==='sound-button')files.splice(0,files.length,'styles.css','index.html');
if(process.argv[3]==='welcome-about')files.splice(0,files.length,'app.js','styles.css','index.html','wall-ui-check.cjs');
if(process.argv[3]==='watercolor')files.splice(0,files.length,'app.js','styles.css','index.html','dream-scenes.js','world-scenes.js','config.json','prototype2.test.cjs','LAYERED-MOTION-20261007.md','assets/derived/sakura-branches-v1.webp','assets/derived/about-watercolor-v1.webp');
const repo=process.argv[2];if(!reviewed[repo])throw Error('Unexpected repository');
function api(route,payload,method='POST'){return JSON.parse(execFileSync('gh',['api',route,...(payload?['--method',method,'--input','-']:[])],{input:payload?JSON.stringify(payload):undefined,encoding:'utf8',maxBuffer:80*1024*1024}))}
const base='repos/'+repo,head=api(base+'/git/ref/heads/main').object.sha;if(head!==reviewed[repo])throw Error('Remote changed: review before publishing');
const commit=api(base+'/git/commits/'+head),old=api(base+'/git/trees/'+commit.tree.sha+'?recursive=1').tree,prefix=repo.endsWith('-site')?'':'dist/';
const sources=files.map(n=>[prefix+n,path.join(__dirname,n)]);sources.push(['README.md',path.resolve(__dirname,'../README.md')]);
// Read every selected source before remote writes. Never remove remote paths.
const inputs=sources.map(([name,file])=>[name,fs.readFileSync(file)]),updates=[];
for(const [name,data] of inputs){const sha=crypto.createHash('sha1').update('blob '+data.length+'\0').update(data).digest('hex');if(old.some(x=>x.path===name&&x.sha===sha))continue;
 const blob=api(base+'/git/blobs',{content:data.toString('base64'),encoding:'base64'});updates.push({path:name,mode:'100644',type:'blob',sha:blob.sha});console.log('Uploaded '+name)}
if(!updates.length){console.log('Already current');process.exit(0)}
const tree=api(base+'/git/trees',{base_tree:commit.tree.sha,tree:updates}),next=api(base+'/git/commits',{message:'Animate layered nature scenes and preserve responsive artwork proportions',tree:tree.sha,parents:[head]});
api(base+'/git/refs/heads/main',{sha:next.sha,force:false},'PATCH');console.log(JSON.stringify({repo,commit:next.sha,files:updates.length}));
