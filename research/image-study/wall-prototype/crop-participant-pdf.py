from pathlib import Path
import re,json
import numpy as np
from PIL import Image
from pypdf import PdfReader,PdfWriter
from pypdf.generic import DecodedStreamObject
root=Path('/Users/eggquakes/Documents/ChatGPT/tenzer-wall')
source=root/'research/image-study/output/participant-image-preview.pdf'
reader=PdfReader(source);writer=PdfWriter();writer.clone_document_from_reader(reader)
ids=[f'IMG_{i:03}' for i in range(1,106)]
refs=np.stack([np.asarray(Image.open('/private/tmp/tenzer-original-previews/'+id+'.jpg').convert('RGB').resize((32,32)),dtype=np.float32) for id in ids])
mapping=[]
for num,page in enumerate(writer.pages[1:],1):
 image=page.images[0];small=np.asarray(image.image.convert('RGB').resize((32,32)),dtype=np.float32)
 errors=((refs-small)**2).mean(axis=(1,2,3));index=int(errors.argmin());id=ids[index];mapping.append(id)
 crop=Image.open('/private/tmp/tenzer-subject-wall/assets/wall-review-crops/'+id+'.jpg')
 image.replace(crop,quality=90)
 content=page.get_contents().get_data()
 def resize(m):
  width,height,x,y=map(float,m.groups());newh=width*540/1920;newy=y+(height-newh)/2
  return f'{width:g} 0 0 {newh:g} {x:g} {newy:g} cm'.encode()
 content,count=re.subn(rb'([\d.]+) 0 0 ([\d.]+) ([\d.]+) ([\d.]+) cm(?=\s*/FormXob)',resize,content)
 if count!=1:raise RuntimeError(f'Expected one image matrix on page {num+1}, found {count}')
 stream=DecodedStreamObject();stream.set_data(content);page.replace_contents(stream)
assert len(mapping)==105 and len(set(mapping))==105
out=root/'output/pdf/participant-image-preview-cropped.pdf';out.parent.mkdir(parents=True,exist_ok=True)
with out.open('wb') as f:writer.write(f)
Path('/private/tmp/participant-crop-order.json').write_text(json.dumps(mapping))
print(str(out));print('Verified 105 unique image matches and 106 pages; first IDs:',mapping[:5]);print('bytes',out.stat().st_size)
