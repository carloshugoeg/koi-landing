#!/usr/bin/env node
/**
 * Behavioral checks for the static Hostinger site (index.html + public/).
 * Fails when home SEO/perf regressions land. Run against the source tree
 * that is zipped for upload (not the React app under src/).
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const homePath = join(repo, 'index.html');
const htaccessPath = join(repo, 'public/.htaccess');
const notFoundPath = join(repo, 'public/404.html');

/** Eager unique bytes for first paint + first koi sequence (mobile + desktop). */
const HOME_PAYLOAD_BUDGET_BYTES = 1.5 * 1024 * 1024;

const checks = [];
function check(id, ok, detail) {
  checks.push({ id, ok: !!ok, detail: detail || '' });
}

function read(p) {
  return readFileSync(p, 'utf8');
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function size(rel) {
  const p = join(repo, rel);
  try {
    return statSync(p).size;
  } catch {
    return 0;
  }
}

function pad(i) {
  return String(i).padStart(2, '0');
}

const home = read(homePath);
const headMatch = home.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
const head = headMatch ? headMatch[1] : '';
const body = headMatch ? home.slice(headMatch.index + headMatch[0].length) : home;

// --- 1. No render-blocking font/CSS in <head> ---
const blockingStylesheets = [...head.matchAll(/<link\b[^>]*>/gi)]
  .map((m) => m[0])
  .filter((tag) => {
    if (!/\brel\s*=\s*["']?stylesheet/i.test(tag)) return false;
    if (/\bmedia\s*=\s*["']print["']/i.test(tag)) return false;
    if (/\bonload\s*=/i.test(tag)) return false;
    return true;
  });
const googleFontBlocking = blockingStylesheets.some((t) => /fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(t));
const externalCssBlocking = blockingStylesheets.filter((t) => !/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(t));
check(
  'no-render-blocking-font-css',
  !googleFontBlocking && externalCssBlocking.length === 0,
  googleFontBlocking
    ? 'Google Fonts stylesheet still render-blocking in <head>'
    : externalCssBlocking.length
      ? `blocking stylesheet(s): ${externalCssBlocking.join(' | ')}`
      : 'ok',
);

// --- 2. LCP preload + fetchpriority ---
const hasLcpPreload =
  /<link\b[^>]*rel\s*=\s*["']?preload[^>]*>/i.test(head) &&
  /as\s*=\s*["']?image/i.test(head) &&
  /pool-(?:mobile|desktop)-bleed\.(?:webp|avif|png)/i.test(head) &&
  /fetchpriority\s*=\s*["']?high/i.test(head);
const lcpImgs = [...home.matchAll(/<img\b[^>]*pool-(?:mobile|desktop)-bleed[^>]*>/gi)].map((m) => m[0]);
const lcpNeverLazy = lcpImgs.length > 0 && lcpImgs.every((t) => !/\bloading\s*=\s*["']?lazy/i.test(t));
const lcpHasFetchPriority = /<img\b[^>]*pool-(?:mobile|desktop)-bleed[^>]*fetchpriority\s*=\s*["']?high/i.test(home);
check(
  'lcp-preload-fetchpriority',
  hasLcpPreload && lcpNeverLazy && lcpHasFetchPriority,
  !hasLcpPreload
    ? 'missing <link rel=preload as=image> for pool bleed with fetchpriority=high'
    : !lcpNeverLazy
      ? 'LCP pool img must not use loading=lazy'
      : !lcpHasFetchPriority
        ? 'LCP pool img missing fetchpriority=high'
        : 'ok',
);

// --- 3. Every img has width and height ---
const imgs = [...home.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
const imgsMissing = imgs.filter((t) => !/\bwidth\s*=/i.test(t) || !/\bheight\s*=/i.test(t));
check(
  'img-width-height',
  imgsMissing.length === 0,
  imgsMissing.length ? `${imgsMissing.length} img(s) missing width/height: ${imgsMissing[0].slice(0, 80)}` : `ok (${imgs.length} imgs)`,
);

// --- 4. title <= 60 ---
const title = (home.match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
check('title-len-le-60', title.length > 0 && title.length <= 60, `len=${title.length} title="${title}"`);
check(
  'title-has-required-phrases',
  /Koi Software/i.test(title) && /software a la medida/i.test(title) && /Quetzaltenango/i.test(title),
  title,
);

// --- 5. twitter == og ---
function meta(nameOrProp, attr = 'name') {
  const re = new RegExp(
    `<meta\\s+${attr}\\s*=\\s*["']?${nameOrProp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\s+content\\s*=\\s*["']([^"']*)["']`,
    'i',
  );
  const re2 = new RegExp(
    `<meta\\s+content\\s*=\\s*["']([^"']*)["']\\s+${attr}\\s*=\\s*["']?${nameOrProp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?`,
    'i',
  );
  const m = home.match(re) || home.match(re2);
  return m ? m[1] : null;
}
const pairs = [
  ['twitter:title', 'og:title'],
  ['twitter:description', 'og:description'],
  ['twitter:image', 'og:image'],
];
const twitterMismatches = pairs
  .map(([tw, og]) => {
    const a = meta(tw, 'name');
    const b = meta(og, 'property');
    return { tw, og, a, b, ok: a != null && b != null && a === b };
  })
  .filter((p) => !p.ok);
check(
  'twitter-eq-og',
  twitterMismatches.length === 0,
  twitterMismatches.length
    ? twitterMismatches.map((p) => `${p.tw}="${p.a}" vs ${p.og}="${p.b}"`).join('; ')
    : 'ok',
);

// --- 6. h1 contains Quetzaltenango ---
const h1 = (home.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
const h1Text = h1.replace(/<[^>]+>/g, '').trim();
check('h1-quetzaltenango', /Quetzaltenango/i.test(h1Text), `h1="${h1Text}"`);

// --- 7. JSON-LD logo absolute + reachable shape ---
let logoOk = false;
let logoDetail = 'no JSON-LD';
try {
  const ldRaw = (home.match(/<script\s+type=["']?application\/ld\+json["']?>([\s\S]*?)<\/script>/i) || [])[1];
  const data = JSON.parse(ldRaw || 'null');
  const nodes = data?.['@graph'] || (data ? [data] : []);
  const org = nodes.find((n) => n['@type'] === 'Organization') || nodes[0];
  const logo = org?.logo;
  const logoUrl = typeof logo === 'string' ? logo : logo?.url;
  if (!logoUrl) logoDetail = 'Organization.logo missing';
  else if (!/^https:\/\/koisoftware\.com\//i.test(logoUrl)) logoDetail = `logo not absolute https://koisoftware.com/: ${logoUrl}`;
  else if (/\/og\.jpg$/i.test(logoUrl)) logoDetail = `logo still points at og.jpg (social card), use a real logo asset: ${logoUrl}`;
  else {
    logoOk = true;
    logoDetail = logoUrl;
  }
} catch (e) {
  logoDetail = String(e.message || e);
}
check('jsonld-logo-absolute', logoOk, logoDetail);

// --- 8. 404.html + ErrorDocument ---
const htaccess = existsSync(htaccessPath) ? read(htaccessPath) : '';
check('404-html-exists', existsSync(notFoundPath), existsSync(notFoundPath) ? 'public/404.html' : 'missing public/404.html');
check(
  'htaccess-errordocument-404',
  /ErrorDocument\s+404\s+\/404\.html/i.test(htaccess),
  /ErrorDocument\s+404/i.test(htaccess) ? htaccess.match(/ErrorDocument\s+404[^\n]*/i)?.[0] : 'missing ErrorDocument 404 /404.html',
);
check(
  'htaccess-no-force-https',
  !(/RewriteCond\s+%\{HTTPS\}\s*!=on/i.test(htaccess) && /RewriteRule\s+\^\s+https:\/\/%\{HTTP_HOST\}/i.test(htaccess)),
  /RewriteCond\s+%\{HTTPS\}/i.test(htaccess) ? 'Force HTTPS rewrite still present' : 'ok',
);
check(
  'htaccess-www-to-apex',
  /www\\.koisoftware\\.com/i.test(htaccess) && /koisoftware\.com%\{REQUEST_URI\}/i.test(htaccess),
  'www→apex rule',
);
check(
  'htaccess-cache-headers',
  /Cache-Control/i.test(htaccess) &&
    /max-age=300/i.test(htaccess) &&
    /FilesMatch/i.test(htaccess) &&
    /woff2/i.test(htaccess) &&
    /max-age=(604800|2592000|31536000)/i.test(htaccess),
  'short HTML + long static Cache-Control',
);

// --- 9. No http:// or slash-less internal links (path links) ---
const hrefs = [...home.matchAll(/\b(?:href|content)\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
const badHttp = hrefs.filter((h) => /^http:\/\/koisoftware\.com/i.test(h));
const internalPath = hrefs.filter((h) => /^https:\/\/koisoftware\.com(\/|$)/i.test(h) || /^\/(servicios|productos|favicon|shots|as)\b/.test(h));
const slashless = internalPath.filter((h) => {
  if (/^https:\/\/koisoftware\.com\/?$/i.test(h)) return false; // apex ok with or without — canonical uses /
  if (/#/.test(h)) return false;
  if (/\.[a-z0-9]+$/i.test(h.split('?')[0])) return false; // file asset
  const path = h.replace(/^https:\/\/koisoftware\.com/i, '') || '/';
  if (path === '/') return false;
  return !path.endsWith('/');
});
const relativeInternal = hrefs.filter((h) => /^\/(servicios|productos)\b/.test(h));
check(
  'no-http-or-slashless-internal',
  badHttp.length === 0 && slashless.length === 0 && relativeInternal.length === 0,
  badHttp.length
    ? `http:// links: ${badHttp.slice(0, 3).join(', ')}`
    : relativeInternal.length
      ? `relative internal (need https://koisoftware.com/.../): ${relativeInternal.slice(0, 5).join(', ')}`
      : slashless.length
        ? `slash-less: ${slashless.slice(0, 5).join(', ')}`
        : 'ok',
);

// --- 10. Home payload under budget ---
const eager = [];
eager.push('index.html', 'proy.css', 'nos2.css', 'ct.css', 'ola.js', 'hero.js', 'proy.js', 'nos2.js', 'ct.js');
eager.push('public/pool-desktop-bleed.webp', 'public/pool-mobile-bleed.webp', 'public/as/brush-h.webp');
for (let i = 0; i < 16; i++) eager.push(`public/koi-lib/swim/${pad(i)}.webp`);
for (let i = 0; i < 12; i++) eager.push(`public/circ/${pad(i)}.webp`);
for (let i = 0; i < 12; i++) eager.push(`public/koi-lib/rise/${pad(i)}.webp`);
// Prefer AVIF when present (count smaller of avif/webp for pool)
for (const base of ['public/pool-desktop-bleed', 'public/pool-mobile-bleed']) {
  const avif = size(`${base}.avif`);
  const webp = size(`${base}.webp`);
  if (avif > 0 && avif < webp) {
    const wi = eager.indexOf(`${base}.webp`);
    if (wi >= 0) eager[wi] = `${base}.avif`;
  }
}
const uniq = [...new Set(eager)];
const payloadBytes = uniq.reduce((n, f) => n + size(f), 0);
check(
  'home-payload-under-budget',
  payloadBytes > 0 && payloadBytes <= HOME_PAYLOAD_BUDGET_BYTES,
  `${(payloadBytes / 1024 / 1024).toFixed(2)} MB / budget ${(HOME_PAYLOAD_BUDGET_BYTES / 1024 / 1024).toFixed(2)} MB (${uniq.filter((f) => size(f) > 0).length} files)`,
);

// --- 11. Forced-reflow ink script removed ---
const hasInkReflowScript =
  /querySelectorAll\(['"]body \*['"]\)/.test(body) && /getComputedStyle\(el\)/.test(body);
check('no-forced-reflow-ink-script', !hasInkReflowScript, hasInkReflowScript ? 'ink getComputedStyle walk still in index.html' : 'ok');

// --- 12. Self-hosted fonts referenced (woff2) ---
const hasWoff2 = /fonts\/[^"' ]+\.woff2/i.test(home) || existsSync(join(repo, 'public/fonts'));
const fontFiles = existsSync(join(repo, 'public/fonts'))
  ? readdirSync(join(repo, 'public/fonts')).filter((f) => f.endsWith('.woff2'))
  : [];
check(
  'self-hosted-woff2',
  hasWoff2 && fontFiles.length >= 2 && !/fonts\.googleapis\.com/i.test(home),
  fontFiles.length ? `fonts: ${fontFiles.join(', ')}` : 'missing public/fonts/*.woff2 or still on Google Fonts',
);

const failed = checks.filter((c) => !c.ok);
const report = {
  root: relative(process.cwd(), repo) || '.',
  failed: failed.length,
  passed: checks.length - failed.length,
  budgetBytes: HOME_PAYLOAD_BUDGET_BYTES,
  payloadBytes,
  checks,
};
console.log(JSON.stringify(report, null, 2));
process.exitCode = failed.length ? 1 : 0;
