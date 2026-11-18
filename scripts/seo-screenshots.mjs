#!/usr/bin/env node
/**
 * SEO visual evidence: home + one product page at 375 / 768 / 1440.
 * Expects vite preview already running at BASE_URL (default :4173).
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { join } from 'node:path';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const OUT = process.argv[2] || 'scripts/out/seo-shots';
const VIEWPORTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'koipos', path: '/productos/koipos/' },
];

mkdirSync(OUT, { recursive: true });

const candidates = [
  process.env.CHROMIUM_PATH,
  process.env.PLAYWRIGHT_CHROMIUM,
  '/opt/pw-browsers/chromium',
  '/opt/pw-browsers/chromium/chrome-linux/chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
].filter(Boolean);

let executablePath;
for (const c of candidates) {
  try {
    const { accessSync, constants, statSync } = await import('node:fs');
    accessSync(c, constants.X_OK);
    const st = statSync(c);
    if (st.isFile()) {
      executablePath = c;
      break;
    }
  } catch {
    /* try next */
  }
}

const browser = await chromium.launch(executablePath ? { executablePath } : {});
try {
  for (const pageDef of PAGES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      await page.goto(BASE.replace(/\/$/, '') + pageDef.path, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(600);
      const file = join(OUT, `${pageDef.name}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log('wrote', file);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
