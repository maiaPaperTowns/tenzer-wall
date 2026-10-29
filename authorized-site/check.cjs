const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const page=await browser.newPage({viewport:{width:1400,height:700}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 await page.goto('http://127.0.0.1:4181/',{waitUntil:'networkidle'});
 await page.evaluate(()=>{document.querySelector('#intro').remove();window.requestAnimationFrame=()=>0});
 await page.waitForTimeout(100);
 for(const kind of ['flower','sun','bird','mountain']){
  await page.evaluate(kind=>{const c=document.querySelector('canvas');const g=c.getContext('2d');g.clearRect(0,0,innerWidth,innerHeight);window.drawStockScene(g,{kind,life:5,x:innerWidth/2,y:innerHeight/2,stockVariant:0},1,innerWidth,innerHeight,false)},kind);
  await page.screenshot({path:'/private/tmp/tenzer-'+kind+'.png'});
 }
 console.log(JSON.stringify({errors}));await browser.close();if(errors.length)process.exitCode=1;
})();
