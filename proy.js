(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const D=[
{k:'pos',cat:"Punto de venta",n:"KoiPOS",s:"一",
 p:"Punto de venta para kioscos con varias sucursales. El pedido se toma en el kiosco, la caja se abre y se cierra con conteo físico, y el inventario descuenta insumos según las recetas de cada producto.",
 t:["Kiosco y pedidos","Caja y cortes","Inventario por sucursal","Recetas e insumos","Reportes y CSV","Facturación FEL"],
 f:["Kiosco con catálogo, modificadores y pedidos por delivery.","Pedidos activos: pendiente, en preparación, entregado.","Caja con apertura, cierre por conteo físico e historial de cortes.","Inventario por sucursal, compras menores, mermas y auditoría.","Reportes de ventas y finanzas, exportables a CSV.","Exportación de facturación electrónica FEL."],
 st:["Next.js","React","TypeScript","Prisma","PostgreSQL","Tailwind CSS"],
 g:[["pos-1","Kiosco: catálogo y pedido"],["pos-2","Reportes de ventas"],["pos-3","Finanzas"],["pos-4","Historial de cierres de caja"]]},
{k:'crm',cat:"CRM y ventas",n:"KoiCRM",s:"二",
 p:"CRM de marca blanca para varias empresas. Cada una trabaja con su propio embudo de ventas, catálogos y campos personalizados, y sus datos quedan aislados del resto.",
 t:["Embudo configurable","Clientes y seguimientos","Calendario","Cotizaciones y pagos","Estadísticas por asesor","Marca propia"],
 f:["Embudo visual por etapas, con valores y alertas de seguimiento.","Ficha de cliente con sus oportunidades.","Calendario de seguimientos por asesor.","Cotizaciones y pagos ligados a cada oportunidad.","Estadísticas: resumen, embudo, equipo, canal y productos.","Logo, colores y nombre propios por empresa; roles y permisos."],
 st:["Next.js","TypeScript","Prisma","PostgreSQL con RLS","Auth.js","Tailwind CSS","shadcn/ui"],
 g:[["crm-1","Embudo de ventas"],["crm-2","Clientes"],["crm-3","Estadísticas: resumen"],["crm-4","Estadísticas: embudo"]]},
{k:'koins',cat:"Producto propio",n:"Koins",s:"三",
 p:"El club de fans de tu negocio. Tarjeta de sellos o de puntos sin app ni cuenta: el cliente escanea un QR y deja su teléfono, y el personal registra cada visita desde el mostrador.",
 t:["Sellos o puntos","QR en mesa y mostrador","Sin app ni cuenta","Deshacer visita","Panel semanal","Informe del lunes"],
 f:["Tarjeta de sellos, o de puntos según el monto en quetzales.","El cliente se une con un QR, sin código ni cuenta.","El personal sella con PIN y puede deshacer durante diez minutos.","Panel con clientes que vuelven, visitas por día y premios canjeados.","Informe del lunes descargable como imagen.","Registra el origen de cada cliente: mostrador, póster o mesa."],
 st:["Next.js","React","TypeScript","Supabase"],
 g:[["koins-1","Página de Koins"],["koins-2","Mostrador del personal"],["koins-3","Registro del cliente"],["koins-4","Panel del negocio"]]},
{k:'nutrea',cat:"Clínica de nutrición",n:"Nutrea",s:"四",
 p:"Sistema para clínicas de nutrición. Reúne en un solo lugar el expediente de cada paciente, sus citas, las consultas con mediciones y plan nutricional, y los ingresos y egresos de la clínica.",
 t:["Expediente del paciente","Agenda de citas","Consultas y mediciones","Calculadora nutricional","Finanzas","Analíticas y reportes"],
 f:["Expediente con datos personales, estilo de vida y perfil clínico.","Calendario de citas con estados, incluida la inasistencia.","Consultas con antropometría, notas clínicas y plan nutricional en PDF.","Calculadora de IMC, gasto energético y macronutrientes.","Registro de ingresos y egresos ligados a consultas y planes.","Analíticas, reportes exportables y equipo con roles y marca propia."],
 st:["Next.js","React","TypeScript","Prisma","PostgreSQL","Auth.js","Tailwind CSS","Recharts"],
 g:[["nut-1","Panel principal"],["nut-2","Agenda de citas"],["nut-3","Pacientes"],["nut-4","Finanzas"]]}];
const host=document.getElementById('pj2');
const items=D.map((d,i)=>{const el=document.createElement('div');el.className='pjx';el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-haspopup','dialog');el.setAttribute('aria-label','Ver proyecto '+d.n);
el.innerHTML=`<img class=pad src="as/pad${i+1}.png" alt=""><img class=stk src="as/stroke${i+1}.png" alt=""><div class=tx><em><span class=seal>${d.s}</span>${d.cat}</em><h3>${d.n}</h3><p>${d.p}</p>${d.t.length?`<ul>${d.t.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}<span class=go><span class=gs>${d.g.length} capturas</span>Ver proyecto <b>→</b></span></div>`;
el.addEventListener('click',()=>open(i,el));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i,el)}});
host.appendChild(el);return el});
let mob;function lay(){mob=innerWidth<600;const W=innerWidth;
items.forEach((el,i)=>{const R=i%2==1,tx=el.querySelector('.tx'),pad=el.querySelector('.pad'),stk=el.querySelector('.stk');
 tx.style.marginLeft=mob?'0':(R?W*.52:W*.16)+'px';
 const x=mob?24:(R?W*.52:W*.16),y=el.querySelector('.tx').offsetTop,th=tx.offsetHeight,tw=mob?W-48:440;
 const sc=[1,.8,1.05,.75][i],pw=(mob?W*.9:Math.min(640,W*.42))*sc,ph=pw*460/760;
 Object.assign(pad.style,{width:pw+'px',left:(mob?(R?W*.35:-W*.2):(R?x+tw*.5:x-pw*.45))+'px',top:(y+th*.45-ph/2)+'px'});
 const sw=mob?W*2.2:tw*2.0,sh=sw*520/900,cx=mob?W/2-40:x+tw/2-10,cy=mob?y-40+.42*sh*.5:y+th*.5;
 Object.assign(stk.style,{width:sw+'px',left:(cx-sw/2)+'px',top:(cy-sh/2)+'px',transform:mob?`scale(-1,.5) rotate(${[-2,3,-3,2][i]}deg)`:`rotate(${[-4,6,-8,3][i]}deg)`});
 el._stkTop=cy-sh*.42})}
const cl=v=>Math.max(0,Math.min(1,v)),ease=t=>1-Math.pow(1-t,3);
function tick(){const vh=innerHeight;items.forEach(el=>{const r=el.getBoundingClientRect();const p=RM?1:cl((vh*.95-r.top)/(vh*.55));
 const s=el.querySelector('.stk'),pad=el.querySelector('.pad'),tx=el.querySelector('.tx'),q=ease(cl(p/.75));
 s.style.clipPath=`inset(0 ${100-q*100}% 0 0)`;s.style.opacity=.5;pad.style.opacity=.35*ease(cl((p-.15)/.5));
 const t=ease(cl((p-.25)/.45));tx.style.opacity=t;if(!tx.matches(':hover'))tx.style.translate=`0 ${(1-t)*12}px`});if(!RM)requestAnimationFrame(tick)}
const pm=document.createElement('div');pm.className='pm';pm.innerHTML=`<div class=bk></div><div class=card role=dialog aria-modal=true aria-labelledby=pmh tabindex=-1><span class=grab></span><div class=gal></div><div class=inf></div></div>`;document.body.appendChild(pm);
const card=pm.querySelector('.card');let last=null;
function show(d,j){const g=pm.querySelector('.gal');if(!d.g.length){g.innerHTML=`<div class=main><div class=ph>Capturas en preparación.<br></div></div><p class=cap>Imagen de referencia pendiente</p>`;return}
 g.innerHTML=`<div class=main><img src="shots/${d.g[j][0]}.jpg" alt="${d.n}: ${d.g[j][1]}"></div><div class=th>${d.g.map((x,k)=>`<button aria-label="${x[1]}" aria-current=${k==j}><img src="shots/${x[0]}.jpg" alt=""></button>`).join('')}</div><p class=cap>${d.g[j][1]} · Datos de ejemplo, anonimizados.</p>`;
 g.querySelectorAll('.th button').forEach((b,k)=>b.onclick=()=>{show(d,k);g.querySelectorAll('.th button')[k].focus()})}
function open(i,el){const d=D[i];last=el;
 pm.querySelector('.inf').innerHTML=`<button class=x aria-label="Cerrar">×</button><em style="font-style:normal;font-size:12px;letter-spacing:.28em;color:#5E5A53;display:flex;gap:12px;align-items:center"><span class=seal style="width:18px;height:18px;font-size:10px">${d.s}</span>${d.cat.toUpperCase()}</em><h2 id=pmh>${d.n}</h2><p>${d.p}</p>${d.f.length?`<h4>Qué hace</h4><ul>${d.f.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<h4>Detalle</h4><p></p>'}${d.st.length?`<h4>Stack</h4><div class=stack>${d.st.map(x=>`<span>${x}</span>`).join('')}</div>`:''}<h4>¿Algo así para tu negocio?</h4><p><a href="mailto:info@koisoftware.com" style="color:#121212">info@koisoftware.com</a></p>`;
 pm.querySelector('.x').onclick=close;show(d,0);pm.classList.add('on');document.documentElement.style.overflow='hidden';
 requestAnimationFrame(()=>requestAnimationFrame(()=>pm.classList.add('vis')));card.scrollTop=0;setTimeout(()=>pm.querySelector('.x').focus({preventScroll:true}),RM?0:60)}
function close(){pm.classList.remove('vis');document.documentElement.style.overflow='';setTimeout(()=>pm.classList.remove('on'),RM?0:420);last&&last.focus({preventScroll:true})}
pm.querySelector('.bk').onclick=close;
addEventListener('keydown',e=>{if(!pm.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='Tab'){const f=[...card.querySelectorAll('button,a')];const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
window.__openP=i=>open(i,items[i]);
addEventListener('load',lay);lay();addEventListener('resize',lay);requestAnimationFrame(tick);if(RM)addEventListener('scroll',tick);
})();
