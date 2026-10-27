(()=>{const im=document.getElementById('hk'),box=document.getElementById('hkf'),hero=document.querySelector('.hero'),nav=document.querySelector('.hero nav'),L='koi-lib/';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,f=(s,i)=>L+s+'/'+String(i).padStart(2,'0')+'.png';
const pix=new Map();
function bake(src,img){if(pix.has(src)||!img.naturalWidth)return;const c=document.createElement('canvas');c.width=c.height=700;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(img,0,0,700,700);const d=g.getImageData(0,0,700,700).data,o=[];
 for(let p=0,i=0;p<490000;p+=2,i+=8){const a=d[i+3]/255;if(a<.02)continue;const r=d[i]*a+237*(1-a),gc=d[i+1]*a+231*(1-a),b=d[i+2]*a+218*(1-a);if(Math.abs(r*237/255-237)+Math.abs(gc*231/255-231)+Math.abs(b*218/255-218)>80)o.push(p%700,(p/700)|0)}
 pix.set(src,Int16Array.from(o))}
function vis(pts,tx,ty,deg,nb){const th=deg*Math.PI/180,co=Math.cos(th),si=Math.sin(th),ox=S*.54,oy=S*.24,W=innerWidth,H=innerHeight;let sx=0,sy=0,n=0;
 for(let i=0;i<pts.length;i+=2){const dx=pts[i]-ox,dy=pts[i+1]-oy,x=tx+ox+dx*co-dy*si,y=ty+oy+dx*si+dy*co;if(x<0||y<0||x>=W||y>=H||(nb>0&&y<nb))continue;sx+=x;sy+=y;n++}
 return n>80?[sx/n,sy/n]:null}
let mob,S,path,turnAng=()=>0;
function cr(pts,t){const n=pts.length-1,x=Math.min(.9999,Math.max(0,t))*n,i=x|0,u=x-i,p=k=>pts[Math.max(0,Math.min(n,k))],a=p(i-1),b=p(i),c=p(i+1),d=p(i+2);
 return[0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*u+(2*a[k]-5*b[k]+4*c[k]-d[k])*u*u+(-a[k]+3*b[k]-3*c[k]+d[k])*u*u*u))}
function layout(){mob=innerWidth<900;S=mob?330:700;im.style.width=im.style.height=S+'px';
 if(mob){const cx=200,cy=640,r=100;path=t=>{const a=-Math.PI/2+t*2*Math.PI;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]}}
 else{const W=innerWidth,sx=x=>x*W/1440;
  const pts=[[1320,94],[1165,101],[1010,142],[855,221],[700,326],[545,430],[390,509],[235,550],[80,557]].map(([x,y])=>[sx(x),y]);
  path=t=>cr(pts,t);
  const pose=[[1160,320],[1048,328],[935,372],[823,458],[710,570],[598,682],[485,768],[373,812],[260,820]].map(([x,y])=>[sx(x),y]);
  const pp=t=>cr(pose,t);
  turnAng=t=>{const a=pp(Math.max(0,t-.003)),b=pp(Math.min(1,t+.003));return Math.atan2(b[1]-a[1],b[0]-a[0])}}}
const ang=t=>{const a=path(Math.max(0,t-.003)),b=path(Math.min(1,t+.003));return Math.atan2(b[1]-a[1],b[0]-a[0])};
const hm=document.getElementById('hm'),K=.56,IMG=900,CX=500,CY=450,PCX=212,PCY=630;let dist=0,lastY=scrollY;
function renderM(ts){const t=RM?0:Math.max(0,Math.min(1,scrollY/(hero.offsetHeight*.9)));dist+=Math.abs(scrollY-lastY);lastY=scrollY;
 const i=RM?0:Math.floor(((ts||0)/1000*5+dist/18))%12,src='circ/'+String(i).padStart(2,'0')+'.png';if(hm.dataset.s!==src){hm.src=src;hm.dataset.s=src}
 hm.style.width=hm.style.height=IMG*K+'px';hm.style.transform=`translate(${PCX-CX*K}px,${PCY-CY*K}px) rotate(${-t*360}deg)`}
function loopM(ts){if(mob){renderM(ts)}if(!RM)requestAnimationFrame(loopM)}requestAnimationFrame(loopM);
for(let i=0;i<12;i++)new Image().src='circ/'+String(i).padStart(2,'0')+'.png';
// Ink centre of each frame in the 700px box. A swap used to slide the body because this point is not the transform origin.
const INK={swim:[[370,340],[368,340],[364,340],[359,342],[352,343],[346,344],[329,343],[326,341],[325,340],[327,339],[331,340],[336,341],[343,342],[349,342],[366,341],[369,340]],tl:[[365,341],[378,335],[387,329],[393,325],[396,324],[398,325],[398,327],[396,330],[392,333],[385,336],[376,339],[364,342]],tr:[[365,341],[346,343],[315,340],[298,330],[287,320],[283,312],[283,310],[288,314],[297,323],[312,334],[332,342],[364,342]]};
function arm(src,th){const p=src.split('/'),k=p[1]=='turn-left'?'tl':p[1]=='turn-right'?'tr':'swim',c=INK[k][parseInt(p[2],10)],lx=c[0]-S*.54,ly=c[1]-S*.24,co=Math.cos(th),si=Math.sin(th);return[lx*co-ly*si,lx*si+ly*co]}
// The integral ends above and right of the accepted centre. Ease onto it after the headline, with the derivative zero at both ends.
function drift(s){if(s<=320)return[0,0];const u=Math.min(1,(s-320)/580),m=u*u*(3-2*u);return[-84*m,66*m]}
function place(src,deg,nb,x,y,df){const th=deg*Math.PI/180,b=arm(src,th),r=arm(f('swim',0),th),oy=.24;let tx=x-S*.54-(b[0]-r[0])+df[0],ty=y-S*oy-(b[1]-r[1])+df[1];
 const cur=pix.get(src),ref=pix.get(f('swim',0));if(cur&&ref){const tgt=vis(ref,x-S*.54+df[0],y-S*oy+df[1],deg,nb);if(tgt)for(let i=0;i<3;i++){const c=vis(cur,tx,ty,deg,nb);if(!c)break;tx+=tgt[0]-c[0];ty+=tgt[1]-c[1]}}
 return[tx,ty]}
function fade(s){if(s<=1040)return 1;if(s>=1160)return 0;const u=(s-1040)/120,m=u*u*(3-2*u);return 1-m}
function render(){if(mob){im.style.position='';box.style.position='absolute';box.style.opacity=1;renderM(performance.now());if(window.__koiRepaint)window.__koiRepaint();return}const fixed=!RM;im.style.position=fixed?'fixed':'';box.style.position=fixed?'fixed':'absolute';const H=hero.offsetHeight,travel=RM?0:scrollY/H,t=Math.max(0,Math.min(1,travel));
 const [x,y]=path(t),a=ang(t);let k=turnAng(Math.min(1,t+.02))-turnAng(Math.max(0,t-.02));k=Math.atan2(Math.sin(k),Math.cos(k));
 const d=travel*(mob?660:1100);let src;
 if(mob){const ph=Math.floor(d/14)%8,i=ph<4?3+ph:10-ph;src=(Math.floor(d/120)%3==2)?f('swim',Math.floor(d/10)%16):f('turn-right',i)}
 else if(travel<1&&Math.abs(k)>.06){src=f(k>0?'turn-right':'turn-left',Math.min(6,Math.round(Math.abs(k)/.25*6)))}else src=f('swim',Math.floor(d/12)%16);
 if(RM)src=f('swim',0);
 if(im.dataset.s!==src){im.src=src;im.dataset.s=src}
 const oy=.24,nb=nav.getBoundingClientRect().bottom;
 if(nb<=0)box.style.maskImage=box.style.webkitMaskImage='none';
 else{const g=`linear-gradient(to bottom,transparent ${nb}px,#000 ${nb+40}px)`;box.style.maskImage=box.style.webkitMaskImage=g}
 box.style.opacity=RM?1:fade(scrollY);
 im.style.transformOrigin=`54% ${oy*100}%`;
 const deg=a*180/Math.PI+90,df=RM?[0,0]:drift(scrollY),p=place(src,deg,nb,x,y,df);
 // The ink model still misses the screenshot. Past the path, cancel that miss so the cycle stays on one point.
 let px=p[0],py=p[1];if(travel>=1){const i=+src.slice(-6,-4),c=FIX[i];px+=c[0];py+=c[1];if(scrollY>1040){const e=FADE[i];px+=e[0];py+=e[1]}}
 im.style.transform=`translate(${px}px,${py}px) rotate(${deg}deg)`;if(window.__koiRepaint)window.__koiRepaint()}
const FIX=[[15.62,-12.94],[9.44,-11.3],[4.14,-9.57],[-0.11,-7.79],[-4.92,-6.09],[-7.17,-5.62],[-6.08,-2.12],[-8.2,-2.29],[-7.02,-2.27],[-6.89,-2.33],[-7.95,-2.69],[-0.9,-3.37],[1.02,-4.73],[3.6,-6.43],[8.57,-9.8],[12.35,-11.88]];
const FADE=[[-10.21,4.25],[-8.04,2.19],[-2.87,0.81],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[-3.7,0.79],[-7.01,2.17],[-8.44,3.34],[-7.76,2.12],[-10.67,4.07]];
let raf=0;addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;render()})},{passive:true});
['swim','turn-left','turn-right'].forEach(s=>{for(let i=0;i<(s=='swim'?16:12);i++){const im2=new Image();const src=f(s,i);im2.onload=()=>{bake(src,im2);render()};im2.src=src}});
addEventListener('resize',()=>{layout();render()});layout();render();addEventListener('load',render)})();
