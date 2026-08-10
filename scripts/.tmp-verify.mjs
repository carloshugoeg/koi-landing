import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const OUT = '/tmp/claude-0/-home-user-koi-landing/85fc7789-33b0-52c9-a8b2-4e95522eb6db/scratchpad/shots2';
import { mkdirSync } from 'node:fs';
mkdirSync(OUT, { recursive: true });

const preview = spawn('npx', ['vite', 'preview', '--port', '4174', '--strictPort'], { cwd: '/home/user/koi-landing', stdio: 'pipe' });
await new Promise((resolve, reject) => {
  preview.stdout.on('data', (d) => d.toString().includes('Local:') && resolve());
  setTimeout(() => reject(new Error('preview timeout')), 15000);
});
const BASE = 'http://localhost:4174';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

// 1) og.png — hero at exactly 1200×630
const ogCtx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await ogCtx.addInitScript(() => localStorage.setItem('koi-lang', 'es'));
const ogPage = await ogCtx.newPage();
await ogPage.goto(BASE, { waitUntil: 'networkidle' });
await ogPage.waitForTimeout(2500);
await ogPage.screenshot({ path: '/home/user/koi-landing/public/og.png' });
await ogCtx.close();

// 2) verify mockup clip fix — each case study scrolled into view
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => localStorage.setItem('koi-lang', 'es'));
const page = await ctx.newPage();
await page.goto(BASE, { waitUntil: 'networkidle' });
const articles = await page.locator('#work article').count();
for (let i = 0; i < articles; i++) {
  await page.locator('#work article').nth(i).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await page.locator('#work article').nth(i).screenshot({ path: `${OUT}/case-${i}.png` });
}
await page.evaluate(() => document.querySelector('#services')?.scrollIntoView());
await page.waitForTimeout(1400);
await page.screenshot({ path: `${OUT}/services.png` });

// 3) IximChat card
await page.evaluate(() => document.querySelector('#automations')?.scrollIntoView({ block: 'end' }));
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/iximchat.png` });

await browser.close();
preview.kill();
console.log('done');
