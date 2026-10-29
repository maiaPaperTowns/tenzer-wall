const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  for(const blocked of [false,true]){
   const page=await browser.newPage({viewport:{width:1400,height:800}});
   if(blocked)await page.route('https://use.typekit.net/**',route=>route.abort());
   await page.goto(process.env.FONT_TEST_URL||'http://127.0.0.1:4183/');
   await page.waitForFunction(()=>!document.querySelector('#begin').disabled,{}, {timeout:90000});
   if(!blocked)await page.evaluate(()=>document.fonts.load('400 120px "uddigikyokasho-pro"','木花雪風水'));
   const result=await page.evaluate(()=>({
    classes:document.documentElement.className,
    fonts:[...document.fonts].filter(f=>f.family.includes('uddigikyokasho')).map(f=>({family:f.family,status:f.status,weight:f.weight})),
    family:getComputedStyle(document.querySelector('h1')).fontFamily,
    weight:getComputedStyle(document.querySelector('button')).fontWeight,
    status:document.querySelector('#dataset-status').textContent
   }));
   assert.ok(result.family.includes('uddigikyokasho-pro'));assert.equal(result.weight,'400');assert.equal(result.status,'');
   if(!blocked){await page.click('#begin');await page.waitForTimeout(2500);await page.screenshot({path:'/private/tmp/tenzer-adobe-font.png'});}
   console.log(JSON.stringify({blocked,...result}));await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
