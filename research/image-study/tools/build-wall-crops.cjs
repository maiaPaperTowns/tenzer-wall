// Deterministic 32:9 crops of supplied previews. No generated/retouched pixels.
const fs=require('node:fs/promises'),path=require('node:path');
const sharp=require(process.env.TENZER_SHARP||'sharp');
async function main(){
 const root=path.resolve(__dirname,'../../..');
 const input=JSON.parse(await fs.readFile(process.argv[2],'utf8'));
 const out=path.join(root,'authorized-site/assets/wall-crops');
 await fs.mkdir(out,{recursive:true});
 const chosen=new Set(['IMG_105','IMG_099','IMG_062','IMG_010','IMG_084']);
 const vertical={Snow:.65,Fire:.65,Water:.54,Waterfall:.52,Cloud:.45,Horse:.48,Bird:.47,Moon:.43};
 const manifest=[];
 for(const r of input){
  const item=Array.isArray(r)?{concept:r[0],kanji:r[1],candidate:Number(r[2]),id:r[4],credit:r[5],sourceUrl:r[6],set:r[11],assetId:r[12]}:r;
  const {id,concept}=item;
  if(!id)continue;
  const file=path.join(root,'research/image-study/survey/public/images',id+'.jpg');
  const {width,height}=await sharp(file).metadata();
  const cw=Math.min(width,Math.round(height*32/9)),ch=Math.min(height,Math.round(width*9/32));
  const left=Math.round((width-cw)/2),top=Math.max(0,Math.min(height-ch,Math.round(height*(vertical[concept]||.5)-ch/2)));
  await sharp(file).extract({left,top,width:cw,height:ch}).resize(1920,540).jpeg({quality:86}).toFile(path.join(out,id+'.jpg'));
  manifest.push({...item,selected:chosen.has(id),crop:{left,top,width:cw,height:ch},sourceSize:{width,height},outputSize:{width:1920,height:540},file:'assets/wall-crops/'+id+'.jpg'});
 }
 await fs.writeFile(path.join(root,'research/image-study/wall-prototype/crops.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log('Prepared '+manifest.length+' crops at 1920 x 540.');
}
main().catch(e=>{console.error(e);process.exitCode=1});
