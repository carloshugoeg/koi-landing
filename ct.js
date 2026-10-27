(()=>{const v=(new URLSearchParams(location.search).get('c')||'c3').toLowerCase();if(!/^c[123]$/.test(v))return;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const s=document.createElement('section');s.className='ct '+v;s.id='ct';s.setAttribute('aria-labelledby','cth');
const lab='<div class="lab2 rv"><span class=seal>四</span>CONTACTO</div>';
const ph=t=>`<i class=ph title="Placeholder: dato real">${t}</i>`;
const rows=`<a class="row rv" href="https://wa.me/50258713903" target=_blank rel=noopener><span>WHATSAPP</span><b>+502 5871 3903</b></a><a class="row rv" href="mailto:info@koisoftware.com"><span>CORREO</span><b>info@koisoftware.com</b></a><a class="row rv" href="https://instagram.com/carloshugoeg" target=_blank rel=noopener><span>INSTAGRAM</span><b>@carloshugoeg</b></a>`;
const koi=`<img class=kw src="circ/00.png" alt="" aria-hidden=true>`;
let h='';
if(v==='c1')h=lab+`<h2 id=cth class=rv>¿Qué necesitas <em>resolver</em>?</h2><div class=g><div><p class="lead rv">Cuéntanos cómo trabaja tu negocio hoy. En la primera llamada vemos qué conviene construir primero.</p><a class=stamp href="#">Agenda<br>una llamada<small>PRIMERA RONDA</small></a></div><div>${rows}</div></div>${koi}`;
if(v==='c2')h=`<div>${lab}<h2 id=cth class=rv>Escríbenos<br>como le <em>contarías</em><br>a un amigo.</h2><p class="lead rv">Sin formularios largos. Tres datos y te respondemos para agendar la primera llamada.</p><div class=alt>${rows}</div></div>
<form class="sheet rv" onsubmit="return false"><label for=n>TU NOMBRE</label><input id=n autocomplete=name><label for=b>TU NEGOCIO</label><input id=b autocomplete=organization><label for=q>¿QUÉ NECESITAS RESOLVER?</label><textarea id=q rows=3></textarea><button type=submit><i></i>Enviar</button></form>${koi}`;
if(v==='c3')h=lab+`<h2 id=cth class=rv>Empecemos por la <em>primera ronda</em>.</h2><p class="lead rv">Una llamada para entender tu operación. Después, un preview funcionando que puedes probar antes de aprobar nada.</p><a class="big rv" href="https://wa.me/50258713903" target=_blank rel=noopener><span class=seal>鯉</span>Agenda una primera llamada</a><div class=rows>${rows}</div>${koi}`;
s.innerHTML=h;const f=document.querySelector('footer');f.before(s);
const rv=[...s.querySelectorAll('.rv,.stamp')],k=s.querySelector('.kw');
function t(){const H=innerHeight;rv.forEach(e=>{if(rm||e.getBoundingClientRect().top<H*.9)e.classList.add('in')});if(!rm){const r=s.getBoundingClientRect(),q=Math.min(1,Math.max(0,(H-r.top)/(r.height+H)));k.style.transform=`rotate(${-30+q*120}deg)`}}
addEventListener('scroll',t,{passive:true});t()})();
