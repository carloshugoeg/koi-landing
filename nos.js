(()=>{const v=(new URLSearchParams(location.search).get('n')||'a').toLowerCase();if(/^b[123]$/.test(v))return;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sec=document.createElement('section');sec.className='ns '+v;sec.id='ns';sec.setAttribute('aria-labelledby','nsh');
const lab='<div class="lab2 rv"><span class=seal>三</span>NOSOTROS</div>';
const defs=`<svg width=0 height=0 style="position:absolute" aria-hidden=true><filter id=stampy><feTurbulence type=fractalNoise baseFrequency=.05 numOctaves=2 seed=2 result=w /><feDisplacementMap in=SourceGraphic in2=w scale=4 /></filter></svg>`;
const S=[['01','一','Estrategia','Primero, cómo opera tu negocio. Después, qué vale la pena construir y qué no.'],['02','二','Diseño','Pantallas claras para la persona que las usa todo el día.'],['03','三','Desarrollo','Código a la medida, con la infraestructura en la nube incluida.'],['04','四','Entrega por rondas','Cada ronda es un preview funcionando. Lo pruebas y lo apruebas antes de seguir.']];
if(v==='a'){sec.innerHTML=defs+lab+`<div class=gr><div class=rail aria-hidden=true><i class=ln></i><div class=vt><b>一 二 三 四</b>　estrategia · diseño · desarrollo · entrega</div></div><div>
<h2 id=nsh class=rv>Del primer boceto al servidor, sin cambiar de manos.</h2>
<p class=rv><b>Koi Software</b> es un estudio integral. Estrategia, diseño, desarrollo y nube en un mismo lugar.</p>
<p class=rv>Trabajas por rondas: en cada una ves tu sistema funcionando y nada avanza sin tu aprobación.</p>
<ol>${S.map(s=>`<li class=rv><span class=n>${s[0]}</span><div><strong>${s[2]} <span class=st aria-hidden=true>${s[1]}</span></strong><span class=d>${s[3]}</span></div></li>`).join('')}</ol>
<a class=cta2 href="#"><i></i>Cuéntanos qué necesitas</a></div>
<div class=big><div class=hk aria-hidden=true>一貫</div><small>DE PRINCIPIO A FIN</small></div></div><img class=sigk src="circ/00.png" alt="">`}
else if(v==='b'){sec.innerHTML=lab+`<div class=head><h2 id=nsh class=rv>Lo ves funcionar <em>antes</em> de aprobarlo.</h2>
<p class="lead rv"><b>Koi Software</b> es un estudio integral de software. El proyecto avanza por rondas de previews: cada una es software real, en línea, que pruebas y apruebas antes de la siguiente.</p></div>
<div class=stack><div class="sheet back torn" aria-hidden=true></div><div class="sheet front torn"><dl>${S.map(s=>`<dt>${s[2]}</dt><dd>${s[3]}</dd>`).join('')}</dl></div></div>
<div class="proof torn"><span class=tag>HECHO EN CASA</span><p><b>KoiPOS</b> y <b>Nutrea</b> salieron de este mismo proceso, ronda por ronda. <i class=ph>[N proyectos entregados]</i>.</p></div>
<a class=cta2 href="#"><i></i>Hablemos de tu proyecto</a>`}
else{sec.innerHTML=lab+`<h2 id=nsh class=rv>Todo el sistema.<br>Un solo estudio.</h2><img class=bru src="as/brush-h.png" alt="" aria-hidden=true>
<div class=intro><p class=rv>Sin sorpresas al final: apruebas cada ronda viéndola funcionar.</p><div><p class=rv><b>Koi Software</b> es un estudio integral. Estrategia, diseño, desarrollo y la nube donde corre tu sistema, en un mismo estudio y un solo proceso.</p></div></div>
<div class=rows>${S.map(s=>`<div class="row rv"><span class=n aria-hidden=true>${s[0]}</span><h3>${s[2]}</h3><p>${s[3]}</p></div>`).join('')}</div>
<svg class=drip viewBox="0 0 1200 70" preserveAspectRatio=none aria-hidden=true><path d="M0 8 H1200" stroke=#121212 stroke-width=1.2 fill=none /><path d="M180 8 q2 18 0 30 " stroke=#121212 stroke-width=2 fill=none /><circle cx=180 cy=40 r=3.5 fill=#121212 /><path d="M612 8 q2 30 0 46 " stroke=#B8321E stroke-width=2.4 fill=none /><circle cx=612 cy=57 r=4.5 fill=#B8321E /><path d="M960 8 q1 10 0 16" stroke=#121212 stroke-width=1.6 fill=none /></svg>
<div class=end><p>Proyectos públicos: <b>KoiPOS</b> y <b>Nutrea</b>.</p><a class=cta2 href="#"><i></i>Empecemos por una llamada</a></div>`}
document.querySelector('footer').before(sec);
// torn edges + washi grain
const g=`url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="f"><feTurbulence type="fractalNoise" baseFrequency=".9 .04" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .37 0 0 0 0 .35 0 0 0 0 .32 0 0 0 -1.4 .9"/></filter><rect width="100%" height="100%" filter="url(#f)"/></svg>')}")`;
sec.style.setProperty('--grain',g);
let seed=3;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
sec.querySelectorAll('.torn').forEach(el=>{const p=[];const st=28;for(let i=0;i<=st;i++)p.push(`${i/st*100}% ${rnd()*2.2}%`);for(let i=0;i<=st;i++)p.push(`${100-rnd()*1.2}% ${i/st*100}%`);for(let i=st;i>=0;i--)p.push(`${i/st*100}% ${100-rnd()*2.6}%`);el.style.clipPath=`polygon(${p.join(',')})`});
sec.querySelectorAll('.drip path').forEach(p=>p.style.setProperty('--l',p.getTotalLength()+1));
const rvs=[...sec.querySelectorAll('.rv')];
function t(){const h=innerHeight,r=sec.getBoundingClientRect();let q=Math.min(1,Math.max(0,(h-r.top)/(r.height*.8+h*.2)));if(rm)q=1;
 rvs.forEach((e,i)=>{if(rm||e.getBoundingClientRect().top<h*.88)e.classList.add('in')});
 if(v==='a'){const ln=sec.querySelector('.ln');ln.style.height=q*100+'%';sec.querySelectorAll('li').forEach(li=>{if(rm||li.getBoundingClientRect().top<h*.7)li.classList.add('on')});const b=sec.querySelector('.big');if(rm||b.getBoundingClientRect().top<h*.75)b.classList.add('on');const k=sec.querySelector('.sigk');k.src='circ/'+String(Math.min(11,Math.floor(q*11.99))).padStart(2,'0')+'.png'}
 if(v==='b'&&!rm){const s=sec.querySelector('.stack').getBoundingClientRect().top/h-.5;sec.querySelector('.back').style.transform=`rotate(${-2.2-s*2}deg) translateY(${s*40}px)`;sec.querySelector('.proof').style.transform=`rotate(${-1.4+s*1.5}deg) translateY(${s*-50}px)`}
 if(v==='c'){const b=sec.querySelector('.bru'),bq=rm?1:Math.min(1,Math.max(0,(h*.9-b.getBoundingClientRect().top)/(h*.4)));b.style.clipPath=`inset(0 ${100-bq*100}% 0 0)`;
  sec.querySelectorAll('.row').forEach(rw=>{const y=rw.getBoundingClientRect().top;rw.classList.toggle('on',y>h*.3&&y<h*.6)});
  const d=sec.querySelector('.drip'),dq=rm?1:Math.min(1,Math.max(0,(h*.95-d.getBoundingClientRect().top)/(h*.35)));d.style.setProperty('--dq',Math.max(0,dq*2-1));d.querySelectorAll('path').forEach((p,i)=>{const L=+p.style.getPropertyValue('--l');const qq=i?Math.max(0,dq*1.6-.6):dq;p.style.strokeDashoffset=L*(1-qq)})}}
addEventListener('scroll',t,{passive:true});addEventListener('resize',t);t()})();
