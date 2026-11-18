#!/usr/bin/env node
/**
 * Generate service and product HTML pages with shared chrome.
 * Re-runnable. Copy is draft Spanish based on home/proy content.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const pub = join(repo, 'public');

const pages = [
  {
    path: 'servicios/software-a-la-medida/index.html',
    title: 'Software a la medida | Koi Software',
    description:
      'Diseñamos y construimos sistemas a la medida para cómo opera tu negocio en Guatemala: POS, CRM y plataformas internas.',
    canonical: 'https://koisoftware.com/servicios/software-a-la-medida/',
    h1: 'Software a la medida',
    lead: 'Sistemas construidos alrededor de tu operación, no al revés.',
    body: [
      'Hacemos software para cómo trabaja tu negocio: puntos de venta, CRM y plataformas internas.',
      'Partimos de una primera conversación sobre tu operación. Después armamos un preview que puedes probar antes de aprobar el resto.',
      'Trabajamos ronda por ronda, con entregas que puedes usar en el día a día.',
    ],
    related: [
      ['https://koisoftware.com/servicios/restaurantes-pos/', 'Restaurantes / POS'],
      ['https://koisoftware.com/productos/koicrm/', 'KoiCRM'],
      ['https://koisoftware.com/productos/nutrea/', 'Nutrea'],
    ],
  },
  {
    path: 'servicios/automatizacion/index.html',
    title: 'Automatización de procesos | Koi Software',
    description:
      'Conectamos herramientas y quitamos trabajo repetitivo de la operación diaria. Automatización para negocios locales en Guatemala.',
    canonical: 'https://koisoftware.com/servicios/automatizacion/',
    h1: 'Automatización',
    lead: 'Menos fricción entre las herramientas que ya usas.',
    body: [
      'Conectamos sistemas para que la información no se copie a mano entre WhatsApp, hojas de cálculo y paneles internos.',
      'El objetivo es quitar trabajo repetitivo de la operación diaria, sin inventar un stack que tu equipo no pueda mantener.',
      'Si ya tienes un flujo, lo ordenamos. Si no, lo diseñamos contigo a partir de cómo atiendes hoy.',
    ],
    related: [
      ['https://koisoftware.com/servicios/asistentes-de-ia/', 'Asistentes de IA'],
      ['https://koisoftware.com/servicios/software-a-la-medida/', 'Software a la medida'],
    ],
  },
  {
    path: 'servicios/asistentes-de-ia/index.html',
    title: 'Asistentes de IA | Koi Software',
    description:
      'Asistentes que responden y agendan en los canales donde ya están tus clientes: WhatsApp, web y más.',
    canonical: 'https://koisoftware.com/servicios/asistentes-de-ia/',
    h1: 'Asistentes de IA',
    lead: 'Atención en los canales donde ya te escriben.',
    body: [
      'Armamos asistentes que responden y agendan donde ya están tus clientes, sin pedirles que instalen otra app.',
      'Sirven para preguntas frecuentes, toma de datos y primeras citas. Un humano sigue al tanto cuando el caso lo pide.',
      'El alcance se define contigo: tono, horarios y qué puede resolver solo el asistente.',
    ],
    related: [
      ['https://koisoftware.com/servicios/automatizacion/', 'Automatización'],
      ['https://koisoftware.com/productos/koicrm/', 'KoiCRM'],
    ],
  },
  {
    path: 'servicios/restaurantes-pos/index.html',
    title: 'Software para restaurantes y POS | Koi Software',
    description:
      'Puntos de venta y operación para kioscos y restaurantes: pedidos, caja, inventario y reportes. Hecho en Guatemala.',
    canonical: 'https://koisoftware.com/servicios/restaurantes-pos/',
    h1: 'Restaurantes y POS',
    lead: 'Del kiosco a la caja, en un solo sistema.',
    body: [
      'KoiPOS nació para kioscos con varias sucursales: el pedido se toma en el kiosco, la caja abre y cierra con conteo físico, y el inventario descuenta insumos según las recetas.',
      'También cubrimos facturación electrónica FEL, reportes exportables y el día a día de cocina y mostrador.',
      'Si tu operación es distinta, partimos del mismo enfoque: software a la medida de cómo cocinas y cobras.',
    ],
    related: [
      ['https://koisoftware.com/productos/koipos/', 'KoiPOS'],
      ['https://koisoftware.com/productos/koins/', 'Koins'],
      ['https://koisoftware.com/servicios/software-a-la-medida/', 'Software a la medida'],
    ],
  },
  {
    path: 'productos/koins/index.html',
    title: 'Koins | Club de fans sin app | Koi Software',
    description:
      'Koins es el club de fans de tu negocio: sellos o puntos sin app ni cuenta. El cliente escanea un QR; el personal registra cada visita.',
    canonical: 'https://koisoftware.com/productos/koins/',
    h1: 'Koins',
    lead: 'El club de fans de tu negocio, sin app ni cuenta.',
    body: [
      'Tarjeta de sellos o de puntos según el monto en quetzales. El cliente se une con un QR; el personal sella con PIN y puede deshacer durante diez minutos.',
      'Panel con clientes que vuelven, visitas por día y premios canjeados. Informe del lunes descargable como imagen.',
      'Registra el origen de cada cliente: mostrador, póster o mesa.',
    ],
    related: [
      ['https://koisoftware.com/productos/koipos/', 'KoiPOS'],
      ['https://koisoftware.com/servicios/restaurantes-pos/', 'Restaurantes / POS'],
    ],
  },
  {
    path: 'productos/koicrm/index.html',
    title: 'KoiCRM | CRM de marca blanca | Koi Software',
    description:
      'KoiCRM: embudo configurable, clientes, calendario, cotizaciones y estadísticas por asesor. Marca blanca para varias empresas.',
    canonical: 'https://koisoftware.com/productos/koicrm/',
    h1: 'KoiCRM',
    lead: 'Cada cliente y cada seguimiento, en un solo lugar.',
    body: [
      'CRM de marca blanca para varias empresas. Cada una trabaja con su propio embudo, catálogos y campos; los datos quedan aislados del resto.',
      'Incluye ficha de cliente, calendario de seguimientos, cotizaciones y pagos ligados a cada oportunidad, y estadísticas por asesor y canal.',
      'Logo, colores y nombre propios por empresa, con roles y permisos.',
    ],
    related: [
      ['https://koisoftware.com/servicios/software-a-la-medida/', 'Software a la medida'],
      ['https://koisoftware.com/servicios/asistentes-de-ia/', 'Asistentes de IA'],
    ],
  },
  {
    path: 'productos/nutrea/index.html',
    title: 'Nutrea | Software para clínicas de nutrición | Koi Software',
    description:
      'Nutrea reúne expediente, citas, consultas con mediciones y plan nutricional, e ingresos de la clínica en un solo sistema.',
    canonical: 'https://koisoftware.com/productos/nutrea/',
    h1: 'Nutrea',
    lead: 'La consulta nutricional, sin papeleo disperso.',
    body: [
      'Expediente del paciente con datos personales, estilo de vida y perfil clínico. Agenda de citas con estados, incluida la inasistencia.',
      'Consultas con antropometría, notas y plan nutricional en PDF. Calculadora de IMC, gasto energético y macronutrientes.',
      'Finanzas ligadas a consultas y planes, reportes exportables y equipo con roles y marca propia.',
    ],
    related: [
      ['https://koisoftware.com/servicios/software-a-la-medida/', 'Software a la medida'],
      ['https://koisoftware.com/productos/koicrm/', 'KoiCRM'],
    ],
  },
  {
    path: 'productos/koipos/index.html',
    title: 'KoiPOS | Punto de venta para kioscos | Koi Software',
    description:
      'KoiPOS: kiosco y pedidos, caja con cortes, inventario por sucursal, recetas e insumos, reportes CSV y facturación FEL.',
    canonical: 'https://koisoftware.com/productos/koipos/',
    h1: 'KoiPOS',
    lead: 'Punto de venta para kioscos con varias sucursales.',
    body: [
      'El pedido se toma en el kiosco, la caja se abre y se cierra con conteo físico, y el inventario descuenta insumos según las recetas de cada producto.',
      'Pedidos activos por estado, historial de cortes, compras menores, mermas y auditoría. Reportes de ventas y finanzas exportables a CSV.',
      'Exportación de facturación electrónica FEL cuando tu operación lo requiere.',
    ],
    related: [
      ['https://koisoftware.com/servicios/restaurantes-pos/', 'Restaurantes / POS'],
      ['https://koisoftware.com/productos/koins/', 'Koins'],
    ],
  },
];

const localBusiness = {
  '@type': 'LocalBusiness',
  '@id': 'https://koisoftware.com/#localbusiness',
  name: 'Koi Software',
  url: 'https://koisoftware.com/',
  image: 'https://koisoftware.com/og.jpg',
  email: 'info@koisoftware.com',
  telephone: '+50258713903',
  areaServed: [
    { '@type': 'City', name: 'Quetzaltenango' },
    { '@type': 'Country', name: 'Guatemala' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Quetzaltenango',
    postalCode: '09001',
    addressCountry: 'GT',
  },
  openingHours: 'Mo-Sa 08:00-18:00',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://instagram.com/carloshugoeg',
    'https://www.linkedin.com/in/carloshugoeg',
  ],
  parentOrganization: { '@id': 'https://koisoftware.com/#organization' },
};

const jsonLd = (p) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: p.title,
        description: p.description,
        url: p.canonical,
        isPartOf: { '@type': 'WebSite', name: 'Koi Software', url: 'https://koisoftware.com/' },
        about: { '@id': 'https://koisoftware.com/#organization' },
        provider: { '@id': 'https://koisoftware.com/#localbusiness' },
      },
      localBusiness,
    ],
  });

function render(p) {
  const related = p.related
    .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
    .join('');
  const paras = p.body.map((t) => `<p>${t}</p>`).join('');
  return `<!doctype html>
<html lang=es>
<head>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>${p.title}</title>
<meta name=description content="${p.description}">
<link rel=canonical href="${p.canonical}">
<meta name=theme-color content="#EDE7DA">
<meta name=color-scheme content="only light">
<meta property=og:title content="${p.h1} | Koi Software">
<meta property=og:description content="${p.description}">
<meta property=og:url content="${p.canonical}">
<meta property=og:type content=website>
<meta property=og:image content="https://koisoftware.com/og.jpg">
<meta property=og:image:width content=1200>
<meta property=og:image:height content=630>
<meta property=og:image:alt content="Koi Software. Software hecho a la medida.">
<meta name=twitter:card content=summary_large_image>
<meta name=twitter:title content="${p.h1} | Koi Software">
<meta name=twitter:description content="${p.description}">
<meta name=twitter:image content="https://koisoftware.com/og.jpg">
<link rel=icon href="/favicon/icon.svg" type="image/svg+xml">
<link rel=icon href="/favicon.ico" sizes=any>
<link rel=apple-touch-icon sizes=180x180 href="/favicon/apple-touch-icon.png">
<link rel=manifest href="/site.webmanifest">
<link rel=preload href="/fonts/shippori-mincho-500.woff2" as=font type=font/woff2 crossorigin>
<link rel=preload href="/fonts/zen-kaku-gothic-new-400.woff2" as=font type=font/woff2 crossorigin>
<style>@font-face{font-family:'Shippori Mincho';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/shippori-mincho-400.woff2) format('woff2')}@font-face{font-family:'Shippori Mincho';font-style:normal;font-weight:500;font-display:swap;src:url(/fonts/shippori-mincho-500.woff2) format('woff2')}@font-face{font-family:'Shippori Mincho';font-style:normal;font-weight:700;font-display:swap;src:url(/fonts/shippori-mincho-700.woff2) format('woff2')}@font-face{font-family:'Zen Kaku Gothic New';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/zen-kaku-gothic-new-400.woff2) format('woff2')}@font-face{font-family:'Zen Kaku Gothic New';font-style:normal;font-weight:500;font-display:swap;src:url(/fonts/zen-kaku-gothic-new-500.woff2) format('woff2')}@font-face{font-family:'Zen Kaku Gothic New';font-style:normal;font-weight:700;font-display:swap;src:url(/fonts/zen-kaku-gothic-new-700.woff2) format('woff2')}</style>
<script type=application/ld+json>${jsonLd(p)}</script>
<style>
*{margin:0;box-sizing:border-box}
html,body{background:#EDE7DA;color:#121212;font-family:'Zen Kaku Gothic New',sans-serif}
body{min-height:100vh;display:flex;flex-direction:column}
a{color:inherit}
a:focus-visible{outline:2px solid #B8321E;outline-offset:3px}
.seal{background:#B8321E;color:#EDE7DA;display:inline-grid;place-items:center;font-family:'Shippori Mincho',serif;border-radius:3px}
header.top{padding:36px 72px;display:flex;justify-content:space-between;align-items:center;font-size:14px;letter-spacing:.12em}
header.top b{font-family:'Shippori Mincho',serif;font-weight:500;font-size:20px;display:flex;gap:12px;align-items:center}
header.top a{text-decoration:none}
header.top nav{display:flex;gap:28px;align-items:center}
main.page{flex:1;padding:48px 72px 96px;max-width:820px}
.lab{font-size:12px;letter-spacing:.3em;color:#5E5A53;margin-bottom:28px;display:flex;gap:14px;align-items:center}
h1{font-family:'Shippori Mincho',serif;font-weight:500;font-size:48px;line-height:1.15;margin-bottom:18px}
.lead{font-size:18px;line-height:1.7;color:#3d3a35;margin-bottom:28px}
.prose p{font-size:16px;line-height:1.85;color:#3d3a35;margin-bottom:18px}
.related{margin-top:48px;padding-top:28px;border-top:1px solid #c9c1b1}
.related .col-label{font-size:12px;letter-spacing:.3em;color:#5E5A53;margin-bottom:14px}
.related ul{list-style:none;padding:0;display:grid;gap:10px}
.related a{color:#B8321E;text-decoration:none;border-bottom:1px solid transparent}
.related a:hover{border-color:#B8321E}
.cta{display:inline-flex;gap:14px;align-items:center;font-size:15px;letter-spacing:.1em;margin-top:36px;text-decoration:none}
.cta i{width:56px;height:1px;background:#121212}
footer.ft{display:block;background:#121212;color:#EDE7DA;padding:72px 110px 34px;font-size:15px}
.ft .top{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:48px}
.ft .brand b{font-family:'Shippori Mincho',serif;font-weight:500;font-size:22px;display:flex;gap:12px;align-items:center}
.ft .brand p{color:#9C968B;margin-top:14px;line-height:1.7;max-width:320px}
.ft .col-label{font-size:12px;letter-spacing:.3em;color:#9C968B;font-weight:500;margin-bottom:16px}
.ft ul{list-style:none;padding:0;display:grid;gap:10px}
.ft a{color:#EDE7DA;text-decoration:none;border-bottom:1px solid transparent}
.ft a:hover,.ft a:focus-visible{border-color:#B8321E;outline:none}
.ft .bot{margin-top:56px;padding-top:22px;border-top:1px solid #2e2c29;display:flex;justify-content:space-between;font-size:12px;letter-spacing:.15em;color:#9C968B}
@media(max-width:900px){.ft .top{grid-template-columns:1fr 1fr}.ft .brand{grid-column:1/-1}}
@media(max-width:600px){
  header.top,main.page{padding-left:24px;padding-right:24px}
  header.top{padding-top:24px;padding-bottom:24px}
  header.top nav{display:none}
  h1{font-size:34px}
  footer.ft{padding:56px 24px 28px}
  .ft .top{gap:36px}
  .ft .bot{flex-direction:column;gap:8px}
}
</style>
</head>
<body>
<header class=top>
  <b><a href="https://koisoftware.com/"><span class=seal style="width:36px;height:36px;font-size:18px">鯉</span>Koi Software</a></b>
  <nav aria-label=Principal>
    <a href="https://koisoftware.com/#pj2">Trabajo</a>
    <a href="https://koisoftware.com/#servicios">Servicios</a>
    <a href="https://koisoftware.com/#ns">Nosotros</a>
    <a href="https://koisoftware.com/#contacto">Hablemos</a>
  </nav>
</header>
<main class=page>
  <div class=lab><span class=seal style="width:22px;height:22px;font-size:12px">鯉</span>KOI SOFTWARE</div>
  <h1>${p.h1}</h1>
  <p class=lead>${p.lead}</p>
  <div class=prose>${paras}</div>
  <a class=cta href="https://wa.me/50258713903" target=_blank rel=noopener><i></i>Hablemos por WhatsApp</a>
  <aside class=related>
    <p class=col-label>TAMBIÉN</p>
    <ul>${related}</ul>
  </aside>
</main>
<footer class=ft>
  <div class=top>
    <div class=brand>
      <b><span class=seal style="width:34px;height:34px;font-size:17px">鯉</span>Koi Software</b>
      <p>Estudio integral de software.</p>
    </div>
    <nav aria-label="Pie de página">
      <p class=col-label>NAVEGACIÓN</p>
      <ul>
        <li><a href="https://koisoftware.com/">Inicio</a></li>
        <li><a href="https://koisoftware.com/#servicios">Servicios</a></li>
        <li><a href="https://koisoftware.com/servicios/software-a-la-medida/">Software a la medida</a></li>
        <li><a href="https://koisoftware.com/servicios/automatizacion/">Automatización</a></li>
        <li><a href="https://koisoftware.com/servicios/asistentes-de-ia/">Asistentes de IA</a></li>
        <li><a href="https://koisoftware.com/servicios/restaurantes-pos/">Restaurantes / POS</a></li>
        <li><a href="https://koisoftware.com/productos/koipos/">KoiPOS</a></li>
        <li><a href="https://koisoftware.com/productos/koicrm/">KoiCRM</a></li>
        <li><a href="https://koisoftware.com/productos/koins/">Koins</a></li>
        <li><a href="https://koisoftware.com/productos/nutrea/">Nutrea</a></li>
        <li><a href="https://koisoftware.com/#contacto">Contacto</a></li>
      </ul>
    </nav>
    <div>
      <p class=col-label>CONTACTO</p>
      <ul>
        <li><a href="mailto:info@koisoftware.com">info@koisoftware.com</a></li>
        <li><a href="https://wa.me/50258713903" target=_blank rel=noopener>WhatsApp</a></li>
        <li><a href="https://instagram.com/carloshugoeg" target=_blank rel=noopener>Instagram</a></li>
        <li><a href="https://www.linkedin.com/in/carloshugoeg" target=_blank rel=noopener>LinkedIn</a></li>
      </ul>
    </div>
  </div>
  <div class=bot><span>© 2026 KOI SOFTWARE · HECHO EN GUATEMALA</span></div>
</footer>
</body>
</html>
`;
}

for (const p of pages) {
  const out = join(pub, p.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(p));
  console.log('wrote', p.path);
}
console.log('pages', pages.length);
