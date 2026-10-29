const {chromium}=require('playwright');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1400,height:700}}), errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4181/',{waitUntil:'networkidle'});
await page.evaluate(()=>{const draw=window.drawStockScene;window.sceneSamples=[];window.drawStockScene=(...args)=>{window.sceneSamples.push({kind:args[1].kind,life:args[1].life,fade:args[2],at:performance.now()});draw(...args)}});
await page.click('#begin');await page.waitForTimeout(700);await page.keyboard.press('Enter');await page.waitForTimeout(1500);await page.keyboard.press('Enter');await page.waitForTimeout(1000);
const result=await page.evaluate(()=>({kinds:[...new Set(sceneSamples.map(s=>s.kind))],recent:sceneSamples.filter(s=>s.at>performance.now()-100).map(s=>s.kind)}));
if(result.kinds.length<2||new Set(result.recent).size!==1)throw Error('Transition failed: '+JSON.stringify(result));
await page.evaluate(()=>{window.requestAnimationFrame=()=>0});await page.waitForTimeout(100);
for(const [kind,count]of [['flower',5],['sun',3],['bird',3],['mountain',3]])for(let i=0;i<count;i++){
 await page.evaluate(({kind,i})=>{const g=document.querySelector('canvas').getContext('2d');g.clearRect(0,0,innerWidth,innerHeight);window.drawStockScene(g,{kind,life:5,x:innerWidth/2,y:innerHeight/2,stockVariant:i},1,innerWidth,innerHeight,false)},{kind,i});
}
await page.setViewportSize({width:7680,height:2160});
await page.evaluate(()=>{const g=document.querySelector('canvas').getContext('2d');for(const kind of ['flower','sun','bird','mountain'])window.drawStockScene(g,{kind,life:4,x:3840,y:1080,stockVariant:0},1,7680,2160,true)});
console.log(JSON.stringify({transition:result,variants:14,wallResolution:'7680x2160',errors}));
await browser.close();if(errors.length)process.exitCode=1;
})();
