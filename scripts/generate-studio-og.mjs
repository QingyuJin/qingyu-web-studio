import { mkdirSync, writeFileSync } from "node:fs"
import { deflateSync } from "node:zlib"
const W=1200,H=630,pix=Buffer.alloc(W*H*3)
const ink=[23,26,22], lime=[214,239,157], paper=[246,245,239], soft=[157,170,140]
function dot(x,y,c,a=1){x=Math.round(x);y=Math.round(y);if(x<0||x>=W||y<0||y>=H)return;let i=(y*W+x)*3;for(let k=0;k<3;k++)pix[i+k]=Math.round(pix[i+k]*(1-a)+c[k]*a)}
for(let y=0;y<H;y++)for(let x=0;x<W;x++){let i=(y*W+x)*3,g=Math.max(0,1-Math.hypot((x-940)/460,(y-315)/410));pix[i]=ink[0]+Math.round(17*g);pix[i+1]=ink[1]+Math.round(24*g);pix[i+2]=ink[2]+Math.round(7*g)}
function line(x1,y1,x2,y2,c,width=1,a=1){let dx=x2-x1,dy=y2-y1,n=Math.max(1,Math.ceil(Math.hypot(dx,dy)*1.3)),r=width/2;for(let i=0;i<=n;i++){let x=x1+dx*i/n,y=y1+dy*i/n;for(let yy=Math.floor(y-r-1);yy<=Math.ceil(y+r+1);yy++)for(let xx=Math.floor(x-r-1);xx<=Math.ceil(x+r+1);xx++){let q=Math.max(0,Math.min(1,r+.6-Math.hypot(xx-x,yy-y)));if(q)dot(xx,yy,c,q*a)}}}
function path(pts,c,w,a=1){for(let i=1;i<pts.length;i++)line(...pts[i-1],...pts[i],c,w,a)}
function ellipse(cx,cy,rx,ry,rot,c,w,a){let p=[];for(let j=0;j<=360;j++){let t=j*Math.PI/180,X=rx*Math.cos(t),Y=ry*Math.sin(t);p.push([cx+X*Math.cos(rot)-Y*Math.sin(rot),cy+X*Math.sin(rot)+Y*Math.cos(rot)])}path(p,c,w,a)}
for(let x=680;x<W;x+=62)line(x,0,x,H,soft,1,.09)
for(let y=0;y<H;y+=62)line(670,y,W,y,soft,1,.09)
for(let i=0;i<32;i++)ellipse(930,315,243-i*.7,72+i*1.15,i*Math.PI/32,i%5===0?lime:soft,i%5===0?1.6:.8,i%5===0?.65:.24)
ellipse(930,315,269,269,0,soft,1,.19)
for(let i=0;i<8;i++){let a=i*Math.PI/4;line(930+Math.cos(a)*263,315+Math.sin(a)*263,930+Math.cos(a)*275,315+Math.sin(a)*275,lime,1.4,.8)}
for(let x=925;x<=935;x++)for(let y=310;y<=320;y++)if(Math.hypot(x-930,y-315)<=5)dot(x,y,lime)
const G={A:[[0,1,.5,0,1,1],[.2,.6,.8,.6]],B:[[0,1,0,0,.65,0,1,.2,.8,.48,0,.48],[.78,.48,1,.7,.85,.94,0,1]],C:[[1,.15,.77,0,.27,0,0,.26,0,.75,.27,1,.8,1,1,.85]],D:[[0,1,0,0,.61,0,1,.3,1,.7,.61,1,0,1]],E:[[1,0,0,0,0,1,1,1],[0,.5,.78,.5]],F:[[1,0,0,0,0,1],[0,.5,.78,.5]],G:[[1,.16,.78,0,.25,0,0,.25,0,.75,.25,1,.78,1,1,.78,1,.56,.54,.56]],H:[[0,0,0,1],[1,0,1,1],[0,.5,1,.5]],I:[[.15,0,.85,0],[.5,0,.5,1],[.15,1,.85,1]],J:[[1,0,1,.75,.8,1,.2,1,0,.77]],K:[[0,0,0,1],[1,0,0,.55,1,1]],L:[[0,0,0,1,1,1]],M:[[0,1,0,0,.5,.52,1,0,1,1]],N:[[0,1,0,0,1,1,1,0]],O:[[.25,0,.75,0,1,.25,1,.75,.75,1,.25,1,0,.75,0,.25,.25,0]],P:[[0,1,0,0,.73,0,1,.23,.73,.5,0,.5]],Q:[[.25,0,.75,0,1,.25,1,.75,.75,1,.25,1,0,.75,0,.25,.25,0],[.62,.68,1.1,1.12]],R:[[0,1,0,0,.73,0,1,.23,.73,.5,0,.5],[.57,.5,1,1]],S:[[1,.13,.8,0,.2,0,0,.2,.15,.42,.85,.58,1,.8,.8,1,.2,1,0,.86]],T:[[0,0,1,0],[.5,0,.5,1]],U:[[0,0,0,.77,.25,1,.75,1,1,.77,1,0]],V:[[0,0,.5,1,1,0]],W:[[0,0,.22,1,.5,.52,.78,1,1,0]],X:[[0,0,1,1],[1,0,0,1]],Y:[[0,0,.5,.52,1,0],[.5,.52,.5,1]],Z:[[0,0,1,0,0,1,1,1]],"/":[[1,0,0,1]],".":[[.4,.95,.45,.95]],"-":[[.1,.5,.9,.5]]}
function text(s,x,y,h,c,weight=2,gap=.35){for(let ch of s){if(ch===" "){x+=h*.47;continue}let g=G[ch];if(g)for(let poly of g){let points=[];for(let i=0;i<poly.length;i+=2)points.push([x+poly[i]*h*.69,y+poly[i+1]*h]);path(points,c,weight)}x+=h*(.69+gap)}}
text("INDEPENDENT DIGITAL STUDIO",72,65,13,soft,1.5,.26)
text("QINGYU",72,190,91,paper,13,.24)
text("STUDIO",72,310,91,lime,13,.24)
text("DESIGN   DEVELOPMENT   AI",75,448,18,paper,2,.28)
line(72,519,620,519,soft,1,.38)
text("QINGYUWEB.COM",72,548,15,soft,1.8,.28)
line(72,115,128,115,lime,4,1)
const table=Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0})
function chunk(type,data){const t=Buffer.from(type),b=Buffer.concat([t,data]);let crc=0xffffffff;for(let v of b)crc=table[(crc^v)&255]^(crc>>>8);let h=Buffer.alloc(4),z=Buffer.alloc(4);h.writeUInt32BE(data.length);z.writeUInt32BE((crc^0xffffffff)>>>0);return Buffer.concat([h,b,z])}
const hdr=Buffer.alloc(13);hdr.writeUInt32BE(W,0);hdr.writeUInt32BE(H,4);hdr[8]=8;hdr[9]=2
const raw=Buffer.alloc((W*3+1)*H);for(let y=0;y<H;y++)pix.copy(raw,y*(W*3+1)+1,y*W*3,(y+1)*W*3)
mkdirSync("public",{recursive:true});writeFileSync("public/og-studio-2026.png",Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",hdr),chunk("IDAT",deflateSync(raw,{level:9})),chunk("IEND",Buffer.alloc(0))]))
console.log("Generated 1200 × 630 studio social card")
