(()=>{const im=document.getElementById('hk'),hero=document.querySelector('.hero'),L='koi-lib/';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,f=(s,i)=>L+s+'/'+String(i).padStart(2,'0')+'.png';
['swim','turn-left','turn-right'].forEach(s=>{for(let i=0;i<(s=='swim'?16:12);i++)new Image().src=f(s,i)});
let mob,S,path;
function cr(pts,t){const n=pts.length-1,x=Math.min(.9999,Math.max(0,t))*n,i=x|0,u=x-i,p=k=>pts[Math.max(0,Math.min(n,k))],a=p(i-1),b=p(i),c=p(i+1),d=p(i+2);
 return[0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*u+(2*a[k]-5*b[k]+4*c[k]-d[k])*u*u+(-a[k]+3*b[k]-3*c[k]+d[k])*u*u*u))}
function layout(){mob=innerWidth<900;S=mob?330:700;im.style.width=im.style.height=S+'px';
 if(mob){const cx=200,cy=640,r=100;path=t=>{const a=-Math.PI/2+t*2*Math.PI;return[cx+r*Math.cos(a),cy+r*Math.sin(a)]}}
 else{const W=innerWidth,sx=x=>x*W/1440;
  const pts=[[1320,110],[1165,117],[1010,158],[855,237],[700,342],[545,446],[390,525],[235,566],[80,573]].map(([x,y])=>[sx(x),y]);
  path=t=>cr(pts,t)}}
const ang=t=>{const a=path(Math.max(0,t-.003)),b=path(Math.min(1,t+.003));return Math.atan2(b[1]-a[1],b[0]-a[0])};
const hm=document.getElementById('hm'),K=.56,IMG=900,CX=500,CY=450,PCX=212,PCY=630;let dist=0,lastY=scrollY;
function renderM(ts){const t=RM?0:Math.max(0,Math.min(1,scrollY/(hero.offsetHeight*.9)));dist+=Math.abs(scrollY-lastY);lastY=scrollY;
 const i=RM?0:Math.floor(((ts||0)/1000*5+dist/18))%12,src='circ/'+String(i).padStart(2,'0')+'.png';if(hm.dataset.s!==src){hm.src=src;hm.dataset.s=src}
 hm.style.width=hm.style.height=IMG*K+'px';hm.style.transform=`translate(${PCX-CX*K}px,${PCY-CY*K}px) rotate(${-t*360}deg)`}
function loopM(ts){if(mob){renderM(ts)}if(!RM)requestAnimationFrame(loopM)}requestAnimationFrame(loopM);
for(let i=0;i<12;i++)new Image().src='circ/'+String(i).padStart(2,'0')+'.png';
function render(){if(mob){im.style.position='';renderM(performance.now());return}im.style.position=RM?'':'fixed';const H=hero.offsetHeight,t=RM?0:Math.max(0,Math.min(1,scrollY/H));
 const [x,y]=path(t),a=ang(t);let k=ang(Math.min(1,t+.02))-ang(Math.max(0,t-.02));k=Math.atan2(Math.sin(k),Math.cos(k));
 const d=t*(mob?660:1100);let src;
 if(mob){const ph=Math.floor(d/14)%8,i=ph<4?3+ph:10-ph;src=(Math.floor(d/120)%3==2)?f('swim',Math.floor(d/10)%16):f('turn-right',i)}
 else if(Math.abs(k)>.06){src=f(k>0?'turn-right':'turn-left',Math.min(6,Math.round(Math.abs(k)/.25*6)))}else src=f('swim',Math.floor(d/12)%16);
 if(RM)src=f('swim',0);if(im.dataset.s!==src){im.src=src;im.dataset.s=src}
 const drop=RM?0:Math.max(0,scrollY-H);
 im.style.transform=`translate(${x-S*.45}px,${y-S*.40-drop}px) rotate(${a*180/Math.PI+90}deg)`}
let raf=0;addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;render()})},{passive:true});
addEventListener('resize',()=>{layout();render()});layout();render();addEventListener('load',render)})();
