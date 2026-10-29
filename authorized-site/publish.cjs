const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
function api(route,payload) {
  return JSON.parse(execFileSync('gh',['api',route,...(payload?['--method','POST','--input','-']:[])],{input:payload?JSON.stringify(payload):undefined,maxBuffer:80*1024*1024,encoding:'utf8'}));
}
const repo=process.argv[2];
if(!['maiaPaperTowns/tenzer-wall-site','maiaPaperTowns/tenzer-wall'].includes(repo))throw Error('Unexpected repository');
const prefix=repo.endsWith('-site')?'':'dist/';
const head=api('repos/'+repo+'/git/ref/heads/main').object.sha;
const commit=api('repos/'+repo+'/git/commits/'+head);
const tree=api('repos/'+repo+'/git/trees/'+commit.tree.sha+'?recursive=1').tree;
const reviewedHeads={'maiaPaperTowns/tenzer-wall-site':'9b78613a341a4fb2d223c8381f60e136e3bcd635','maiaPaperTowns/tenzer-wall':'b1c672ff48719de1fa0f3618be98258f11e66b11'};
if(head!==reviewedHeads[repo])throw Error('Repository changed remotely; inspect before publishing');
const entries=[];
const files=['app.js','stock-scenes.js','config-loader.js','config.json','index.html','styles.css','CONFIGURATION.md','ASSET-SOURCES.md','IMAGE-EDIT-PROMPTS.md','assets/derived/flower-atlas-v2.png','assets/derived/mountain-atlas-v2.png'].map(name=>[name,path.join(__dirname,name)]);
for(const name of ['WEATHER-PROMPTS.md','CLUSTER-PROMPTS.md','assets/derived/lightning-storm-v1.png','assets/derived/rainbow-artistic-v2.png','assets/derived/rainbow-layer-v1.png','assets/derived/flower-clusters-v3.png','assets/derived/flower-mixed-v4.png','assets/stock/rain-roof.jpg','assets/stock/rain-purple.jpg','assets/stock/rain-umbrella.jpg'])files.push([name,path.join(__dirname,name)]);
if(prefix) for(const name of ['config.test.cjs','prototype2.test.cjs','motion-check.cjs','weather-check.cjs'])files.push([name,path.join(__dirname,name)]);
// Validate all input files before any remote writes.
for(const name of ['RAIN-SURFACE-PROMPT.md','assets/derived/rain-surface-v2.png','assets/derived/rain-purple-surface-v2.png','assets/derived/rain-umbrella-surface-v2.png'])files.push([name,path.join(__dirname,name)]);
for(const [,file] of files)fs.accessSync(file,fs.constants.R_OK);
for(const name of ['nature-scenes.js','NATURE-ASSETS.md','assets/derived/tree-leaves-v1.png','assets/derived/snowflake-v1.png',...['fire-pit','fire-nebula','moon-disc','moon-atmosphere','snow-road','snow-oak','river-meadow','ocean-rocks','ocean-waves','water-pattern'].map(n=>'assets/stock/'+n+'.jpg')])files.push([name,path.join(__dirname,name)]);
if(prefix)files.push(['nature-check.cjs',path.join(__dirname,'nature-check.cjs')]);
files.push(['assets/derived/river-channels-v1.png',path.join(__dirname,'assets/derived/river-channels-v1.png')]);
for(const name of ['NATURE-REFRESH-PROMPTS.md','assets/stock/starburst.jpg','assets/stock/starfield.png',...['snow-landscape-v2','moon-cutout-v2','tree-natural-v2','fire-atlas-v2','bamboo-spray-v1','koi-atlas-v1','cloud-atlas-v1','leaf-atlas-v1','cat-walk-v1','ocean-wave-v1','wind-trees-v1','sakura-atlas-v1','rainbow-sky-v3'].map(n=>'assets/derived/'+n+'.png')])files.push([name,path.join(__dirname,name)]);
if(prefix)files.push(['refresh-check.cjs',path.join(__dirname,'refresh-check.cjs')]);
for(const name of ['NATURAL-MOTION-PROMPTS.md',...['cat-rig-v2','tree-reference-v3','pond-water-v2'].map(n=>'assets/derived/'+n+'.png')])files.push([name,path.join(__dirname,name)]);
if(prefix)files.push(['gait-check.cjs',path.join(__dirname,'gait-check.cjs')]);
for(const name of ['TREE-GROVE-PROMPT.md','assets/derived/tree-grove-atlas-v1.png'])files.push([name,path.join(__dirname,name)]);
for(const [,file] of files)fs.accessSync(file,fs.constants.R_OK);
for(const [name,file] of files) {
 const buffer=fs.readFileSync(file);
 const expected=require('node:crypto').createHash('sha1').update('blob '+buffer.length+'\0').update(buffer).digest('hex');
 if(tree.some(item=>item.path===prefix+name&&item.sha===expected))continue;
 const content=buffer.toString('base64');
 const blob=api('repos/'+repo+'/git/blobs',{content,encoding:'base64'});
 entries.push({path:prefix+name,mode:'100644',type:'blob',sha:blob.sha});
 console.log('Uploaded '+name);
}
const nextTree=api('repos/'+repo+'/git/trees',{base_tree:commit.tree.sha,tree:entries});
const nextCommit=api('repos/'+repo+'/git/commits',{message:'Add layered growing grove and faster paired lightning strikes',tree:nextTree.sha,parents:[head]});
execFileSync('gh',['api','repos/'+repo+'/git/refs/heads/main','--method','PATCH','--input','-'],{input:JSON.stringify({sha:nextCommit.sha,force:false}),encoding:'utf8'});
console.log(JSON.stringify({repo,commit:nextCommit.sha,removed:entries.filter(e=>e.sha===null).map(e=>e.path)}));
