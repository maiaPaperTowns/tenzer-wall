const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage();await page.goto('http://127.0.0.1:4183/');
  await page.waitForFunction(()=>!document.querySelector('#begin').disabled,{}, {timeout:60000});
  const result=await page.evaluate(async()=>{
   requestAnimationFrame=()=>0;
   const entries=await Promise.all((await TenzerConfig.load('config.json')).entries.map(TenzerScenes.prepare));
   const sheet=document.createElement('canvas');sheet.width=1400;sheet.height=500;const out=sheet.getContext('2d');out.fillStyle='#eee8d9';out.fillRect(0,0,1400,500);
   const cat=entries.find(e=>e.id==='cat'),size=Math.min(600*.35,400*.46),speed=(600+size*2)/cat.options.crossSeconds,period=size*.24/(speed*.65),frames=[];
   for(let i=0;i<8;i++){
    const life=8+i*period/8,c=document.createElement('canvas');c.width=350;c.height=250;const g=c.getContext('2d'),x=-size+(life/cat.options.crossSeconds)%1*(600+size*2);
    g.translate(175-x,215-400*.79);drawStockScene(g,{entry:cat,life,stockVariant:0},1,600,400,false);frames.push(c.toDataURL());out.drawImage(c,i%4*350,Math.floor(i/4)*250);
   }
   sheet.id='gait-sheet';document.body.replaceChildren(sheet);sheet.style.cssText='position:fixed;left:0;top:0;width:1400px;height:500px';
   const bird=entries.find(e=>e.id==='bird');let single=true;const unique=[];
   for(let variant=0;variant<3;variant++){
    const images=new Set();
    for(let i=0;i<12;i++){const c=document.createElement('canvas');c.width=c.height=400;const g=c.getContext('2d'),native=g.drawImage;let draws=0;
     g.drawImage=function(img,...args){draws++;images.add(img.toDataURL());return native.call(this,img,...args)};
     drawStockScene(g,{entry:{...bird,options:{...bird.options,count:1}},life:3+i*.85/12,stockVariant:variant},1,400,400,false);single&&=draws===1;
    }unique.push(images.size);
   }
   return {catUnique:new Set(frames).size,singleBirdDraw:single,birdFrameCounts:unique};
  });
  await page.setViewportSize({width:1400,height:500});await page.screenshot({path:'/private/tmp/cat-gait-cycle.png'});
  assert.equal(result.catUnique,8);assert.ok(result.singleBirdDraw);assert.ok(result.birdFrameCounts.every(n=>n>=6));console.log(JSON.stringify(result));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
