(()=>{const v=(new URLSearchParams(location.search).get('n')||'b1').toLowerCase();if(!/^b[123]$/.test(v))return;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sec=document.createElement('section');sec.className='ns2 '+v;sec.id='ns';sec.setAttribute('aria-labelledby','nsh');
const lab='<div class="lab2 rv"><span class=seal>三</span>NOSOTROS</div>';
const ph='<i class=ph title="Placeholder: completar con dato real">[N proyectos entregados]</i>';
const koi='<img class=koi1 src="circ/00.png" alt="" aria-hidden=true>';
let h='';
if(v==='b1'){const S=[['01','一','Estrategia','Entender cómo opera tu negocio antes de decidir qué construir.'],['02','二','Diseño','Pantallas pensadas para quien las usa ocho horas al día.'],['03','三','Desarrollo','Código a la medida y la nube donde va a correr.'],['04','四','Entrega por rondas','Recibes un preview funcionando. Lo pruebas, lo apruebas y sigue la próxima.']];
h=lab+`<div class=hd><h2 id=nsh class=rv>Se construye en capas.<br>Tú apruebas <em>cada una</em>.</h2>
<p class="lead rv">Un estudio integral de software: estrategia, diseño, desarrollo y nube en un mismo proceso. Ninguna capa se pega sobre la anterior sin tu visto bueno.</p></div>
<div class=pile>${S.map((s,i)=>`<article class="leaf l${i} torn"><span class=tape aria-hidden=true></span><span class=k aria-hidden=true>${s[1]}</span><span class=n>${s[0]}</span><h3>${s[2]}</h3><p>${s[3]}</p></article>`).join('')}</div>
<div class=foot>
<div class=ctaw><span class=hanko aria-hidden=true>承認</span><a class=cta2 href="#"><i></i>Agenda una primera llamada</a></div></div>${koi}`}
if(v==='b2'){h=lab+`<div class=g><h2 id=nsh class=rv><span>Software</span> <span>que apruebas</span> <span><em>viéndolo</em></span> <span>funcionar.</span></h2>
<aside class="note torn rv"><span class=tape aria-hidden=true></span><p>Un estudio integral de software. Estrategia, diseño, desarrollo y nube en un mismo proceso, sin pasar el proyecto de mano en mano.</p></aside></div>
<img class=strk src="as/stroke2.png" alt="" aria-hidden=true>
<ol class=steps>
<li class=rv><span class=n>01</span><h3>Estrategia</h3><p>Primero tu operación. Después, qué vale la pena construir y qué sobra.</p></li>
<li class=rv><span class=n>02</span><h3>Diseño</h3><p>Flujos claros para la persona que va a usar el sistema todo el día.</p></li>
<li class=rv><span class=n>03</span><h3>Desarrollo</h3><p>Código a la medida, con la infraestructura en la nube incluida.</p></li>
<li class="rv big4"><span class=n>04</span><h3>Entrega por rondas</h3><p>Cada ronda es un preview en línea. Lo usas, lo comentas y lo apruebas antes de la siguiente.</p><span class=mark aria-hidden=true>済</span></li></ol>
<div class=tail><p class=pq><b>KoiPOS</b> y <b>Nutrea</b> se entregaron así, ronda por ronda. ${ph}.</p><a class=cta2 href="#"><i></i>Platiquemos qué necesitas resolver</a></div>${koi}`}
if(v==='b3'){const S=[['01','一','Estrategia','Un mapa de cómo trabaja tu negocio hoy y de qué conviene construir primero.','Hoja de ruta'],['02','二','Diseño','Cada pantalla, pensada para quien la va a usar a diario.','Prototipo'],['03','三','Desarrollo','Código a la medida, montado en la nube donde va a vivir.','Sistema en línea'],['04','四','Entrega por rondas','Cada ronda llega como un preview funcionando. Tú lo pruebas y lo apruebas.','Tu visto bueno']];
h=lab+`<div class=intro><h2 id=nsh class=rv>Cuatro pliegos.<br>Un sistema completo.</h2><p class="lead rv">Un estudio integral de software. Baja y mira cómo se arma un proyecto, hoja por hoja.</p></div>
<div class=track><div class=stage><div class=meter aria-hidden=true>${S.map(s=>`<b>${s[1]}</b>`).join('')}</div>
<div class=desk>${S.map((s,i)=>`<article class="pg p${i} torn"><span class=n>${s[0]}</span><h3>${s[2]}</h3><p>${s[3]}</p><span class=out><small>SALE DE AQUÍ</small>${s[4]}</span><span class=k aria-hidden=true>${s[1]}</span></article>`).join('')}</div></div></div>
<div class=close><p><b>KoiPOS</b> y <b>Nutrea</b> se armaron con estos cuatro pliegos. ${ph}.</p><a class=cta2 href="#"><i></i>Empieza por el primer pliego</a></div>${koi}`}
sec.innerHTML=h;document.querySelector('footer').before(sec);
const g=`url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="f"><feTurbulence type="fractalNoise" baseFrequency=".9 .04" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .37 0 0 0 0 .35 0 0 0 0 .32 0 0 0 -1.4 .9"/></filter><rect width="100%" height="100%" filter="url(#f)"/></svg>')}")`;
const fib=`url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><filter id="f"><feTurbulence type="turbulence" baseFrequency=".012 .3" numOctaves="2" seed="8"/><feColorMatrix values="0 0 0 0 .55 0 0 0 0 .5 0 0 0 0 .42 0 0 0 -2 1.1"/></filter><rect width="100%" height="100%" filter="url(#f)"/></svg>')}")`;
sec.style.setProperty('--grain',g);sec.style.setProperty('--fib',fib);
let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
sec.querySelectorAll('.torn').forEach(el=>{const p=[],st=26,a=2.6;for(let i=0;i<=st;i++)p.push(`${i/st*100}% ${rnd()*a}%`);for(let i=0;i<=st;i++)p.push(`${100-rnd()*1.4}% ${i/st*100}%`);for(let i=st;i>=0;i--)p.push(`${i/st*100}% ${100-rnd()*a}%`);for(let i=st;i>=0;i--)p.push(`${rnd()*1.4}% ${i/st*100}%`);el.style.clipPath=`polygon(${p.join(',')})`});
const rvs=[...sec.querySelectorAll('.rv')];const cl=(x)=>Math.min(1,Math.max(0,x));
if(!rm&&matchMedia('(hover:hover)').matches)sec.querySelectorAll('.leaf,.note,.pg').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--tx',((e.clientX-r.left)/r.width-.5)*4+'deg');el.style.setProperty('--ty',((e.clientY-r.top)/r.height-.5)*-4+'deg')});el.addEventListener('pointerleave',()=>{el.style.setProperty('--tx','0deg');el.style.setProperty('--ty','0deg')})});
function t(){const H=innerHeight,r=sec.getBoundingClientRect();
 rvs.forEach(e=>{if(rm||e.getBoundingClientRect().top<H*.88)e.classList.add('in')});
 const k=sec.querySelector('.koi1');const kq=rm?1:cl((H-r.top)/(r.height+H));k.style.transform=`rotate(${60+kq*90}deg)`;
 if(v==='b1')sec.querySelectorAll('.leaf').forEach((l,i)=>{const y=l.getBoundingClientRect().top;const q=rm?1:cl((H*.95-y)/(H*.45));l.style.setProperty('--q',q);l.classList.toggle('on',q>.98)});
 if(v==='b1'){const hk=sec.querySelector('.hanko');if(rm||hk.getBoundingClientRect().top<H*.8)hk.classList.add('on')}
 if(v==='b2'){const s=sec.querySelector('.strk'),sq=rm?1:cl((H*.9-s.getBoundingClientRect().top)/(H*.5));s.style.clipPath=`inset(0 ${100-sq*100}% 0 0)`;const m=sec.querySelector('.big4');if(rm||m.getBoundingClientRect().top<H*.65)m.classList.add('on');
  if(!rm){const n=sec.querySelector('.note'),y=n.getBoundingClientRect().top/H-.5;n.style.translate=`0 ${y*-60}px`}}
 if(v==='b3'){const tr=sec.querySelector('.track');if(rm){sec.classList.add('st');return}const tb=tr.getBoundingClientRect();const p=cl(-tb.top/(tb.height-H));
  sec.querySelectorAll('.pg').forEach((g,i)=>{const q=cl(p*4.4-i*1.05);g.style.setProperty('--q',q);g.classList.toggle('on',q>.95)});
  sec.querySelectorAll('.meter b').forEach((b,i)=>b.classList.toggle('on',p*4.4-i*1.05>.95))}}
addEventListener('scroll',t,{passive:true});addEventListener('resize',t);t()})();
