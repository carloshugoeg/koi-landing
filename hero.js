(()=>{const im=document.getElementById('hk'),hero=document.querySelector('.hero'),hm=document.getElementById('hm');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,pad=i=>String(i).padStart(2,'0');
const frame=(s,i)=>'koi-lib/'+s+'/'+pad(i)+'.png';
const clamp=v=>Math.max(0,Math.min(1,v));
['swim','turn-left','turn-right'].forEach(s=>{for(let i=0;i<(s=='swim'?16:12);i++)new Image().src=frame(s,i)});
for(let i=0;i<12;i++)new Image().src='circ/'+pad(i)+'.png';
const P=[[1000,560],[780,500],[520,640],[260,600]];
function cubic(t){const u=1-t;return[0,1].map(k=>u*u*u*P[0][k]+3*u*u*t*P[1][k]+3*u*t*t*P[2][k]+t*t*t*P[3][k])}
let narrow,size,distance=0,lastY=scrollY,frameId=0;
const pointAt=t=>{if(narrow){const a=-Math.PI/2+t*2*Math.PI;return[200+100*Math.cos(a),640+100*Math.sin(a)]}return cubic(t)};
const angleAt=t=>{const a=pointAt(Math.max(0,t-.003)),b=pointAt(Math.min(1,t+.003));return Math.atan2(b[1]-a[1],b[0]-a[0])};
function renderMobile(time){const progress=reduce?0:clamp(scrollY/(hero.offsetHeight*.9));distance+=Math.abs(scrollY-lastY);lastY=scrollY;
 const index=reduce?0:Math.floor(time/1000*5+distance/18)%12,src='circ/'+pad(index)+'.png';if(hm.dataset.s!==src){hm.src=src;hm.dataset.s=src}
 const scale=.56,imageSize=900*scale;hm.style.width=hm.style.height=imageSize+'px';
 hm.style.transform=`translate(${212-500*scale}px,${630-450*scale}px) rotate(${-progress*360}deg)`}
function renderDesktop(){const progress=reduce?0:clamp(scrollY/(hero.offsetHeight*.8));
 const [x,y]=pointAt(progress),angle=angleAt(progress);let turn=angleAt(Math.min(1,progress+.02))-angleAt(Math.max(0,progress-.02));turn=Math.atan2(Math.sin(turn),Math.cos(turn));
 const traveled=progress*1100;let src=frame('swim',Math.floor(traveled/12)%16);
 if(Math.abs(turn)>.06)src=frame(turn>0?'turn-right':'turn-left',Math.min(6,Math.round(Math.abs(turn)/.25*6)));
 if(reduce)src=frame('swim',0);if(im.dataset.s!==src){im.src=src;im.dataset.s=src}
 im.style.width=im.style.height=size+'px';im.style.transform=`translate(${x-size*.45}px,${y-size*.4}px) rotate(${angle*180/Math.PI+90}deg)`}
function layout(){narrow=innerWidth<600;size=narrow?330:700;im.style.width=im.style.height=size+'px'}
function paint(time){if(narrow)renderMobile(time);else renderDesktop()}
function tick(time){frameId=0;const rect=hero.getBoundingClientRect(),visible=rect.bottom>0&&rect.top<innerHeight;
 if(narrow&&!reduce&&visible){paint(time);frameId=requestAnimationFrame(tick);return}paint(time)}
function onScroll(){if(!frameId)frameId=requestAnimationFrame(tick)}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{layout();onScroll()});
layout();frameId=requestAnimationFrame(tick)})();
