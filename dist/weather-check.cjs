const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try {
  const page=await browser.newPage({viewport:{width:1400,height:800}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4183/');await page.waitForFunction(()=>!document.querySelector('#begin').disabled);
  await page.evaluate(async()=>{requestAnimationFrame=()=>0;document.querySelector('#intro').remove();window.weatherEntries=await Promise.all((await TenzerConfig.load('config.json')).entries.map(TenzerScenes.prepare))});
  await page.waitForTimeout(100);
  for(const id of ['rain','lightning','rainbow','sun'])for(const life of [0.9,2,5]){
   await page.evaluate(({id,life})=>{const g=document.querySelector('canvas').getContext('2d');g.clearRect(0,0,innerWidth,innerHeight);drawStockScene(g,{entry:weatherEntries.find(e=>e.id===id),life,stockVariant:0},1,innerWidth,innerHeight,false)}, {id,life});
   await page.screenshot({path:`/private/tmp/weather-${id}-${life}.png`});
  }
  const result=await page.evaluate(()=>{
   const c=document.createElement('canvas');c.width=700;c.height=400;const g=c.getContext('2d');
   const render=(id,t,reduce,fade=1)=>{g.clearRect(0,0,700,400);drawStockScene(g,{entry:weatherEntries.find(e=>e.id===id),life:t,stockVariant:0},fade,700,400,reduce);return c.toDataURL()};
   const reducedStable=['lightning','rain'].every(id=>render(id,2,true)===render(id,4,true));
   const moving=['rain','lightning','rainbow'].every(id=>render(id,.9,false)!==render(id,2,false));
   const blank=(()=>{g.clearRect(0,0,700,400);return c.toDataURL()})();
   const cleanExit=['rain','lightning','rainbow'].every(id=>render(id,2,false,0)===blank);
   const img=weatherEntries.find(e=>e.id==='rainbow').images[1];g.clearRect(0,0,700,400);g.drawImage(img,0,0,700,400);
   return {reducedStable,moving,cleanExit,alpha:g.getImageData(699,0,1,1).data[3]};
  });
  const impacts=await page.evaluate(()=>{
   for(let i=0;i<100;i++){
    const initial=TenzerScenes.rainSample(i,0),hit=initial.flight-initial.age+initial.period;
    const before=TenzerScenes.rainSample(i,hit-.0001),after=TenzerScenes.rainSample(i,hit+.0001);
    if(before.phase!=='fall'||after.phase!=='impact'||Math.abs(before.dropX-after.x)>.001||Math.abs(before.dropY-after.y)>.001)return false;
   }return true;
  });
  assert.ok(impacts,'Drops must meet their own splash positions');
  assert.ok(result.reducedStable&&result.moving&&result.cleanExit);assert.equal(result.alpha,0);assert.deepEqual(errors,[]);
  console.log(JSON.stringify({...result,impactsAligned:impacts,errors}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
