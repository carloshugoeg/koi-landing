#!/usr/bin/env node
/**
 * Asserts "Más sobre KoiPOS" shares the left inset of neighbouring
 * case-study copy (.tx) at mobile / tablet / desktop widths.
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { accessSync, constants, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const VIEWPORTS = [375, 768, 1440];
const TOLERANCE_PX = 1;
const LINK_TEXT = 'Más sobre KoiPOS';
const REPO = join(fileURLToPath(new URL('.', import.meta.url)), '..');

function chromePath() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/opt/google/chrome/chrome',
    '/opt/pw-browsers/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  const cacheRoot = process.env.PLAYWRIGHT_BROWSERS_PATH || join(homedir(), '.cache/ms-playwright');
  try {
    for (const name of readdirSync(cacheRoot)) {
      if (!name.startsWith('chromium')) continue;
      candidates.push(join(cacheRoot, name, 'chrome-linux', 'chrome'));
    }
  } catch {
    /* no cache */
  }

  for (const c of candidates) {
    try {
      accessSync(c, constants.X_OK);
      if (statSync(c).isFile()) return c;
    } catch {
      /* next */
    }
  }
  return undefined;
}

function freePort() {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address();
      s.close((err) => (err ? reject(err) : resolve(port)));
    });
    s.on('error', reject);
  });
}

async function waitForHttp(url, ms = 20000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`server not ready: ${url}`);
}

const port = await freePort();
const base = `http://127.0.0.1:${port}`;
const preview = spawn(
  'npx',
  ['vite', '--port', String(port), '--strictPort', '--host', '127.0.0.1'],
  { stdio: 'pipe', cwd: REPO, detached: true },
);
preview.stderr.on('data', () => {});

const results = [];
let failed = false;

function stopPreview() {
  if (!preview.pid) return;
  try {
    process.kill(-preview.pid, 'SIGTERM');
  } catch {
    try {
      preview.kill('SIGTERM');
    } catch {
      /* already gone */
    }
  }
}

try {
  await waitForHttp(base + '/');
  const executablePath = chromePath();
  const browser = await chromium.launch({
    ...(executablePath ? { executablePath } : {}),
    headless: true,
  });

  for (const width of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    });
    await page.goto(base + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('.pjx .more a', { timeout: 15000 });
    // proy.js lay() runs on load; wait for its marginLeft on .tx
    await page.waitForFunction(
      () => {
        const tx = document.querySelector('.pjx .tx');
        if (!tx) return false;
        const ml = tx.style.marginLeft;
        return ml !== '' || innerWidth < 600;
      },
      { timeout: 10000 },
    );
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r())));

    const measured = await page.evaluate((text) => {
      const item = [...document.querySelectorAll('.pjx')].find((el) =>
        el.textContent.includes('KoiPOS'),
      );
      if (!item) return { error: 'KoiPOS case study not found' };
      const link = [...item.querySelectorAll('.more a')].find((a) =>
        a.textContent.trim().includes(text),
      );
      const neighbour = item.querySelector('.tx h3') || item.querySelector('.tx');
      if (!link || !neighbour) return { error: 'link or neighbour missing' };
      return {
        linkLeft: link.getBoundingClientRect().left,
        neighbourLeft: neighbour.getBoundingClientRect().left,
        linkText: link.textContent.trim(),
      };
    }, LINK_TEXT);

    await page.close();

    if (measured.error) {
      results.push({ width, ok: false, detail: measured.error });
      failed = true;
      continue;
    }

    const delta = Math.abs(measured.linkLeft - measured.neighbourLeft);
    const ok = delta <= TOLERANCE_PX;
    if (!ok) failed = true;
    results.push({
      width,
      ok,
      linkLeft: measured.linkLeft,
      neighbourLeft: measured.neighbourLeft,
      delta,
      linkText: measured.linkText,
      detail: ok
        ? `aligned within ${TOLERANCE_PX}px`
        : `link left ${measured.linkLeft}px vs neighbour ${measured.neighbourLeft}px (Δ=${delta}px)`,
    });
  }

  await browser.close();
} finally {
  stopPreview();
}

for (const r of results) {
  const mark = r.ok ? 'PASS' : 'FAIL';
  console.log(`[${mark}] ${r.width}px — ${r.detail}`);
}

if (failed || results.length !== VIEWPORTS.length) {
  console.error('\npjx-more-padding-check: FAILED');
  console.error(JSON.stringify({ results }, null, 2));
  process.exit(1);
}

console.log('\npjx-more-padding-check: ok');
console.log(JSON.stringify({ results }, null, 2));
