// Visual verification matrix. Requires `npm run build` first; serves dist/ via
// `vite preview`. Usage: node scripts/screenshots.mjs [outDir]
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';

const OUT = process.argv[2] ?? 'screenshots';
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'desktop', width: 1920, height: 1080 },
];
const ANCHORS = ['', '#work', '#automations', '#about', '#services', '#contact'];

mkdirSync(OUT, { recursive: true });

const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'pipe',
});
await new Promise((resolve, reject) => {
  preview.stdout.on('data', (d) => d.toString().includes('Local:') && resolve());
  preview.on('exit', () => reject(new Error('vite preview failed to start')));
  setTimeout(() => reject(new Error('vite preview timed out')), 15000);
});

const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const browser = await chromium.launch({ executablePath });

try {
  for (const lang of ['es', 'en']) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      await context.addInitScript((lng) => localStorage.setItem('koi-lang', lng), lang);
      const page = await context.newPage();
      await page.goto(BASE, { waitUntil: 'networkidle' });

      for (const anchor of ANCHORS) {
        if (anchor) {
          await page.evaluate((a) => {
            document.querySelector(a)?.scrollIntoView({ behavior: 'instant', block: 'start' });
          }, anchor);
        }
        await page.waitForTimeout(1200); // let reveals settle
        const label = anchor ? anchor.slice(1) : 'hero';
        await page.screenshot({ path: `${OUT}/${lang}-${vp.name}-${label}.png` });
      }
      await context.close();
    }
  }

  // Reduced-motion pass (laptop, es)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  await context.addInitScript(() => localStorage.setItem('koi-lang', 'es'));
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/es-laptop-hero-reduced-motion.png` });
  await context.close();

  console.log(`[screenshots] written to ${OUT}/`);
} finally {
  await browser.close();
  preview.kill();
}
