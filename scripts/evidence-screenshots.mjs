#!/usr/bin/env node
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const OUT = process.env.OUT_DIR || '/opt/cursor/artifacts/screenshots';
mkdirSync(OUT, { recursive: true });

const candidates = [
  process.env.CHROMIUM_PATH,
  '/usr/bin/google-chrome',
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

const browser = await chromium.launch({
  ...(executablePath ? { executablePath } : {}),
  headless: true,
});

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  await page.goto(BASE.replace(/\/$/, '') + '/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);
  const path = join(OUT, `home-${vp.name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log('wrote', path);
  await page.close();
}

await browser.close();
