const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const page=await browser.newPage({viewport:{width:1400,height:800}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4183/');await page.waitForFunction(()=>!document.querySelector('#begin').disabled,{}, {timeout:60000});
  await page.evaluate(async()=>{requestAnimationFrame=()=>0;document.querySelector('#intro').remove();window.entries=await Promise.all((await TenzerConfig.load('config.json')).entries.map(TenzerScenes.prepare))});await page.waitForTimeout(100);
  for(const id of ['tree','fire','moon','snow','wind','river','ocean','water']){
   for(const life of [1,6]){
    await page.evaluate(({id,life})=>{const g=document.querySelector('canvas').getContext('2d');g.clearRect(0,0,innerWidth,innerHeight);drawStockScene(g,{entry:entries.find(e=>e.id===id),life,x:700,y:400,stockVariant:0},1,innerWidth,innerHeight,false)},{id,life});
    await page.screenshot({path:`/private/tmp/nature-${id}-${life}.png`});
   }
   const result=await page.evaluate(id=>{
    const c=document.createElement('canvas');c.width=700;c.height=400;const g=c.getContext('2d'),entry=entries.find(e=>e.id===id);
    const render=(life,reduced=false,fade=1)=>{g.clearRect(0,0,700,400);drawStockScene(g,{entry,life,x:350,y:200,stockVariant:0},fade,700,400,reduced);return c.toDataURL()};
    const blank=c.toDataURL();return {moving:render(1)!==render(6),reduced:render(1,true)===render(6,true),exit:render(6,false,0)===blank};
   },id);assert.ok(result.moving&&result.reduced&&result.exit,JSON.stringify({id,...result}));
  }
  const bird=await page.evaluate(()=>{
   for(const crop of entries.find(e=>e.id==='bird').crops){
    const [x,y]=crop.wing.pivot;
    for(const phase of [-1,-.5,0,.5,1]){const p=TenzerScenes.wingPoint(x,y,crop.wing,phase);if(Math.hypot(p[0]-x,p[1]-y)>1e-9)return false;}
   }return true;
  });assert.ok(bird,'Wing shoulder must stay fixed');
  assert.deepEqual(errors,[]);console.log(JSON.stringify({scenes:8,animated:true,reducedMotion:true,cleanExits:true,shouldersAnchored:bird,errors}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
