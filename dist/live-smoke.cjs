const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try {
  const page=await browser.newPage();
  await page.goto('https://maiapapertowns.github.io/tenzer-wall-site/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.TenzerConfig && !document.querySelector('#begin').disabled,{}, {timeout:60000});
  const result=await page.evaluate(async()=>{const event=new MouseEvent('contextmenu',{bubbles:true,cancelable:true});document.querySelector('#art').dispatchEvent(event);const c=await TenzerConfig.load('config.json');return {title:document.title,menuPrevented:event.defaultPrevented,status:document.querySelector('#dataset-status').textContent,flowerAsset:c.entries.find(e=>e.id==='flower').assets[0],mountainBehavior:c.entries.find(e=>e.id==='mountain').behavior,sunVariants:c.entries.find(e=>e.id==='sun').variants.length}});
  console.log(JSON.stringify(result));if(!result.menuPrevented||result.status)process.exitCode=1;
 } finally {await browser.close()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
