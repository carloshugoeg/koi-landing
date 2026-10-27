(()=>{
const LIB='koi-lib/',sec=document.querySelector('.ola'),stage=sec.querySelector('.stage'),cv=document.getElementById('wave'),cx=cv.getContext('2d');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fr=(s,i)=>LIB+s+'/'+String(i).padStart(2,'0')+'.png';
['rise','dive','swim'].forEach(s=>{for(let i=0;i<(s=='swim'?16:12);i++)new Image().src=fr(s,i)});
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const vn=(()=>{const r=rng(7),g=Array.from({length:512},r);return x=>{const i=Math.floor(x),f=x-i,s=f*f*(3-2*f);return g[i&511]*(1-s)+g[(i+1)&511]*s}})();
let PV=0,W,H,mob,wy,dwy,PTS,LEAPS,TX;
const kois=[...stage.querySelectorAll('.k')],spl=[...stage.querySelectorAll('.sp')],svs=[...stage.querySelectorAll('.svc')];
function layout(){W=stage.clientWidth;H=stage.clientHeight;mob=W<600;const d=devicePixelRatio||1;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
 const y0=H*(mob?.36:.50),A=H*(mob?.035:.065),k=Math.PI*2/(mob?W*1.1:W*.85);
 wy=x=>y0+A*Math.sin(k*x+.9)+A*.35*Math.sin(k*2.3*x+2);dwy=x=>(wy(x+1)-wy(x-1))/2;
 // brush stroke samples (deterministic, so the texture never changes between frames)
 PTS=[];const r=rng(11);for(let x=-10;x<=W+10;x+=1.5){const t=(x+10)/(W+20),taper=Math.min(1,t*9,(1-t)*5);
  PTS.push({x,y:wy(x),w:(mob?5:7.5)*(.65+.55*vn(x*.013))*taper,dry:vn(x*.02+40),r:r()})}
 TX=mob?[[H*.44],[H*.615],[H*.79]]:[[W*.07],[W*.39],[W*.70]];
 svs.forEach((s,i)=>{if(mob){s.style.top=TX[i][0]+'px'}else{const x=TX[i][0];s.style.left=x+'px';s.style.top=(Math.max(wy(x),wy(x+280))+46)+'px'}});
 const leap=(x0,x1,p0,dp,h,s)=>({x0,x1,p0,dp,h,s});
 const L=mob?[leap(.05,.62,.30,.22,150,.22),leap(.40,.95,.24,.18,120,.26),leap(.12,.55,.40,.26,95,.18),leap(.55,1.0,.50,.18,130,.24),leap(.0,.45,.62,.20,85,.17),leap(.48,.9,.72,.22,110,.22)]
  :[leap(.06,.30,.26,.28,240,.17),leap(.36,.58,.33,.22,200,.15),leap(.20,.38,.45,.30,150,.11),leap(.60,.86,.52,.26,260,.18),leap(.47,.64,.64,.20,140,.12),leap(.75,.96,.74,.24,210,.15)];
 LEAPS=L.map(l=>({x0:l.x0*W,x1:l.x1*W,p0:(l.p0-.26)*.85,dp:l.dp*.85,h:l.h*(mob?.9:1)*H/900,S:(mob?W*2.3:W*1.7)*l.s}));
}
function brush(upto){cx.clearRect(0,0,W,H);
 for(const p of PTS){if(p.x>upto)break;const nx=-dwy(p.x),n=Math.hypot(nx,1),ox=nx/n,oy=1/n;
  cx.fillStyle='rgba(18,18,18,.10)';cx.beginPath();cx.arc(p.x,p.y,p.w*1.25,0,7);cx.fill();
  for(let b=0;b<9;b++){const o=(b/8-.5)*2*p.w,gap=vn(p.x*.05+b*13.7);if(gap<.25+.4*p.dry*Math.abs(b/8-.5)*2)continue;
   cx.fillStyle=`rgba(18,18,18,${.30+.35*gap})`;cx.beginPath();cx.arc(p.x+ox*o,p.y+oy*o,p.w*.32,0,7);cx.fill()}}
}
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),ss=t=>t*t*(3-2*t);
function render(p){
 const reveal=RM?W+20:-10+(W+30)*ss(cl(p/.16));brush(reveal);
 svs.forEach((s,i)=>{const t=RM?1:ss(cl((p-(.17+i*.27))/.11));s.style.opacity=t;s.style.transform=`translateY(${(1-t)*18}px)`});
 LEAPS.forEach((L,i)=>{const im=kois[i],u=(p-.12-L.p0*1.4)/(L.dp*1.2),a=spl[i*2],b=spl[i*2+1];
  if(RM||u<=0||u>=1){im.style.opacity=0}else{
   const x=L.x0+(L.x1-L.x0)*u,y=wy(x)-L.h*4*u*(1-u),dx=(L.x1-L.x0),dy=dwy(x)*dx/ (W) * W/1 - L.h*4*(1-2*u);
   const ang=Math.atan2(dy,dx)*180/Math.PI+90;let src;
   if(u<.34)src=fr('rise',Math.min(11,Math.floor(u/.34*12)));else if(u<.66)src=fr('swim',Math.floor((u-.34)/.32*16)%16);else src=fr('dive',Math.min(11,Math.floor((u-.66)/.34*12)));
   if(im.dataset.s!==src){im.src=src;im.dataset.s=src}
   im.style.width=im.style.height=L.S+'px';im.style.opacity=ss(cl(u/.08))*ss(cl((1-u)/.08));
   im.style.transformOrigin='45% 40%';im.style.transform=`translate(${x-L.S*.45}px,${y-L.S*.40}px) rotate(${ang}deg)`}
  [[a,L.x0,u/.22],[b,L.x1,(u-.86)/.26]].forEach(([e,x,t])=>{if(RM||t<=0||t>=1){e.style.opacity=0;return}
   e.style.opacity=(.75*(1-t)).toFixed(3);e.style.transform=`translate(${x-45}px,${wy(x)-46}px) scale(${.55+.6*ss(t)})`})});
}
// r7 pinned progress: 0 when section top hits viewport top, 1 when the sticky stage releases
function prog(){const r=sec.getBoundingClientRect(),cs=getComputedStyle(sec),pt=parseFloat(cs.paddingTop),pb=parseFloat(cs.paddingBottom),d=sec.offsetHeight-pt-pb-stage.offsetHeight;return d>0?cl((pt-r.top)/d):1}
let raf=0;const tick=()=>{raf=0;render(prog())};
addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(tick)},{passive:true});
addEventListener('resize',()=>{layout();tick()});
layout();const m=location.hash.match(/y=(\d+)/);if(m)scrollTo(0,+m[1]);tick();
addEventListener('load',()=>{if(m)scrollTo(0,+m[1]);tick();});
})();
