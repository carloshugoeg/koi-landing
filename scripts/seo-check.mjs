#!/usr/bin/env node
/**
 * SEO smoke check against vite preview (or BASE_URL).
 * Asserts 200, unique title, canonical, and parseable JSON-LD per page.
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const paths = [
  '/',
  '/servicios/software-a-la-medida/',
  '/servicios/automatizacion/',
  '/servicios/asistentes-de-ia/',
  '/servicios/restaurantes-pos/',
  '/productos/koins/',
  '/productos/koicrm/',
  '/productos/nutrea/',
  '/productos/koipos/',
];

const candidates = [
  process.env.CHROMIUM_PATH,
  process.env.PLAYWRIGHT_CHROMIUM,
  '/usr/local/bin/google-chrome',
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
].filter(Boolean);
let executablePath;
for (const c of candidates) {
  try {
    const { accessSync, constants, statSync } = await import('node:fs');
    accessSync(c, constants.X_OK);
    if (statSync(c).isFile()) {
      executablePath = c;
      break;
    }
  } catch {
    /* next */
  }
}
const browser = await chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true });
const page = await browser.newPage();
const titles = new Map();
const rows = [];
let failed = 0;

for (const path of paths) {
  const url = BASE.replace(/\/$/, '') + path;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const status = res?.status() ?? 0;
  const title = await page.title();
  const canonical = await page.locator('link[rel=canonical]').getAttribute('href').catch(() => null);
  const desc = await page.locator('meta[name=description]').getAttribute('content').catch(() => null);
  const ldText = await page.locator('script[type="application/ld+json"]').first().textContent().catch(() => null);
  let ldOk = false;
  let ldErr = null;
  try {
    const data = JSON.parse(ldText || '');
    ldOk = !!(data['@context'] || data['@graph'] || data['@type']);
  } catch (e) {
    ldErr = String(e.message || e);
  }
  const unique = !titles.has(title);
  titles.set(title, (titles.get(title) || 0) + 1);
  const ok =
    status === 200 &&
    title &&
    unique &&
    canonical &&
    canonical.startsWith('https://koisoftware.com') &&
    desc &&
    ldOk;
  if (!ok) failed += 1;
  rows.push({ path, status, title, canonical, desc: desc?.slice(0, 80), ldOk, ldErr, unique, ok });
}

await browser.close();
console.log(JSON.stringify({ base: BASE, failed, rows }, null, 2));
process.exitCode = failed ? 1 : 0;
