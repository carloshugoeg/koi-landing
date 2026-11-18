#!/usr/bin/env node
/**
 * Per-page title / description / h1 contract (Carlos-approved table, Nov 18).
 * Separate from perf-seo-check.mjs — do not fold into that file.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const TITLE_MAX = 60;
const DESC_MAX = 155;

/** Exact values. One check group per page. */
const PAGES = [
  {
    id: 'home',
    file: 'index.html',
    title: 'Software a la medida en Quetzaltenango | Koi Software',
    description:
      'Estudio de software en Quetzaltenango, Guatemala. Sistemas a la medida, automatización, asistentes de IA y puntos de venta para negocios locales.',
    h1: 'Software hecho a la medida en Quetzaltenango.',
  },
  {
    id: 'servicios-software-a-la-medida',
    file: 'public/servicios/software-a-la-medida/index.html',
    title: 'Software a la medida en Guatemala | Koi Software',
    description:
      'Desarrollo de software a la medida en Guatemala: POS, CRM y plataformas internas, construidos alrededor de cómo opera tu negocio.',
    h1: 'Software a la medida',
  },
  {
    id: 'servicios-automatizacion',
    file: 'public/servicios/automatizacion/index.html',
    title: 'Automatización de procesos en Guatemala | Koi Software',
    description:
      'Automatizamos procesos en Guatemala: conectamos WhatsApp, hojas de cálculo y sistemas internos para quitar el trabajo repetitivo.',
    h1: 'Automatización de procesos',
  },
  {
    id: 'servicios-asistentes-de-ia',
    file: 'public/servicios/asistentes-de-ia/index.html',
    title: 'Chatbot WhatsApp y asistentes de IA | Koi Software',
    description:
      'Chatbot y asistentes de IA en WhatsApp para negocios en Guatemala: responden, toman datos y agendan citas, con una persona al tanto.',
    h1: 'Asistentes de IA para WhatsApp',
  },
  {
    id: 'servicios-restaurantes-pos',
    file: 'public/servicios/restaurantes-pos/index.html',
    title: 'Software para restaurantes en Guatemala | Koi Software',
    description:
      'Software y punto de venta para restaurantes y kioscos en Guatemala: pedidos, caja, inventario, recetas y facturación electrónica FEL.',
    h1: 'Software para restaurantes y POS',
  },
  {
    id: 'productos-koipos',
    file: 'public/productos/koipos/index.html',
    title: 'KoiPOS | Punto de venta para kioscos | Koi Software',
    description:
      'Punto de venta para kioscos con varias sucursales: pedidos, cortes de caja, inventario por recetas y facturación FEL en Guatemala.',
    h1: 'KoiPOS: punto de venta para kioscos',
  },
  {
    id: 'productos-koicrm',
    file: 'public/productos/koicrm/index.html',
    title: 'CRM de marca blanca en Guatemala | Koi Software',
    description:
      'CRM de marca blanca en Guatemala: embudo, clientes, calendario, cotizaciones y estadísticas por asesor, con datos aislados por empresa.',
    h1: 'CRM de marca blanca para tu empresa',
  },
  {
    id: 'productos-koins',
    file: 'public/productos/koins/index.html',
    title: 'Koins | Tarjeta de lealtad digital | Koi Software',
    description:
      'Tarjeta de lealtad digital sin app ni cuenta: sellos o puntos, el cliente se une con un QR y el personal registra cada visita.',
    h1: 'Tarjeta de lealtad digital, sin app ni cuenta',
  },
  {
    id: 'productos-nutrea',
    file: 'public/productos/nutrea/index.html',
    title: 'Nutrea | Software para nutricionistas | Koi Software',
    description:
      'Software para nutricionistas: expediente, citas, mediciones, plan nutricional en PDF e ingresos de la clínica en un solo sistema.',
    h1: 'Nutrea: software para nutricionistas',
  },
];

const checks = [];
function check(id, ok, detail) {
  checks.push({ id, ok: !!ok, detail: detail || '' });
}

function meta(html, nameOrProp, attr) {
  const esc = nameOrProp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `<meta\\s+${attr}\\s*=\\s*["']?${esc}["']?\\s+content\\s*=\\s*["']([^"']*)["']`,
    'i',
  );
  const re2 = new RegExp(
    `<meta\\s+content\\s*=\\s*["']([^"']*)["']\\s+${attr}\\s*=\\s*["']?${esc}["']?`,
    'i',
  );
  const m = html.match(re) || html.match(re2);
  return m ? m[1] : null;
}

function readPage(rel) {
  const p = join(repo, rel);
  if (!existsSync(p)) return null;
  return readFileSync(p, 'utf8');
}

function h1Text(html) {
  const m = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  return m[1]
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const page of PAGES) {
  const html = readPage(page.file);
  if (!html) {
    check(`copy-${page.id}`, false, `missing file ${page.file}`);
    continue;
  }

  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
  const description = meta(html, 'description', 'name');
  const ogTitle = meta(html, 'og:title', 'property');
  const ogDesc = meta(html, 'og:description', 'property');
  const twTitle = meta(html, 'twitter:title', 'name');
  const twDesc = meta(html, 'twitter:description', 'name');
  const h1 = h1Text(html);

  const titleOk =
    title === page.title && title.length > 0 && title.length <= TITLE_MAX;
  const descOk =
    description === page.description &&
    description.length > 0 &&
    description.length <= DESC_MAX;
  const h1Ok = h1 === page.h1;
  const ogOk = ogTitle === page.title && ogDesc === page.description;
  const twOk = twTitle === page.title && twDesc === page.description;
  const ok = titleOk && descOk && h1Ok && ogOk && twOk;

  const parts = [];
  if (!titleOk) parts.push(`title="${title}" (len ${title.length}, want "${page.title}")`);
  if (!descOk)
    parts.push(
      `description len=${description?.length ?? 0} mismatch=${description !== page.description}`,
    );
  if (!h1Ok) parts.push(`h1="${h1}" want "${page.h1}"`);
  if (!ogOk) parts.push(`og title/desc mismatch (og:title="${ogTitle}")`);
  if (!twOk) parts.push(`twitter title/desc mismatch (twitter:title="${twTitle}")`);

  check(`copy-${page.id}`, ok, ok ? 'ok' : parts.join('; '));
}

const failed = checks.filter((c) => !c.ok);
const report = {
  failed: failed.length,
  passed: checks.length - failed.length,
  titleMax: TITLE_MAX,
  descMax: DESC_MAX,
  checks,
};
console.log(JSON.stringify(report, null, 2));
process.exitCode = failed.length ? 1 : 0;
