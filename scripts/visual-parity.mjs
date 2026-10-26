import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'proof');
const widths = [375, 768, 1440];
const sections = [
  ['hero', '.hero'],
  ['servicios', '#servicios, .ola'],
  ['proyectos', '#proyectos, #pj2'],
  ['nosotros', '#nosotros, #ns'],
  ['contacto', '#contacto, #ct'],
];

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function staticServer(dir, port) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`);
    const file = join(dir, decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('missing');
    }
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

async function shoot(page, dir) {
  mkdirSync(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    for (const [name, selector] of sections) {
      const target = page.locator(selector).first();
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await target.screenshot({ path: join(dir, `${name}-${width}.png`) });
    }
    await page.screenshot({ path: join(dir, `full-${width}.png`), fullPage: true });
  }
}

const reference = await staticServer('/tmp/koi-final/final', 4181);
const preview = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  cwd: root,
  stdio: 'pipe',
});
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('preview timed out')), 20000);
  preview.stdout.on('data', (chunk) => {
    if (String(chunk).includes('Local:')) {
      clearTimeout(timer);
      resolve();
    }
  });
  preview.on('exit', () => reject(new Error('preview exited')));
});

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce', deviceScaleFactor: 1 });
const refPage = await context.newPage();
await refPage.goto('http://127.0.0.1:4181/index.html?n=b1', { waitUntil: 'networkidle' });
await shoot(refPage, join(out, 'reference'));
const appPage = await context.newPage();
await appPage.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await shoot(appPage, join(out, 'app'));
await browser.close();
preview.kill();
reference.close();

const rows = [];
for (const width of widths) {
  for (const [name] of sections) {
    const a = PNG.sync.read(await readFile(join(out, 'reference', `${name}-${width}.png`)));
    const b = PNG.sync.read(await readFile(join(out, 'app', `${name}-${width}.png`)));
    const widthPx = Math.min(a.width, b.width);
    const heightPx = Math.min(a.height, b.height);
    const crop = (png) => {
      const next = new PNG({ width: widthPx, height: heightPx });
      PNG.bitblt(png, next, 0, 0, widthPx, heightPx, 0, 0);
      return next;
    };
    const left = crop(a);
    const right = crop(b);
    const diff = new PNG({ width: widthPx, height: heightPx });
    const count = pixelmatch(left.data, right.data, diff.data, widthPx, heightPx, { threshold: 0.1 });
    const side = new PNG({ width: widthPx * 2, height: heightPx });
    PNG.bitblt(left, side, 0, 0, widthPx, heightPx, 0, 0);
    PNG.bitblt(right, side, 0, 0, widthPx, heightPx, widthPx, 0);
    writeFileSync(join(out, `${name}-${width}-side.png`), PNG.sync.write(side));
    writeFileSync(join(out, `${name}-${width}-diff.png`), PNG.sync.write(diff));
    rows.push({ name, width, count, pixels: widthPx * heightPx, ratio: count / (widthPx * heightPx) });
  }
}
writeFileSync(join(out, 'report.json'), JSON.stringify(rows, null, 2));
console.table(rows.map((row) => ({ ...row, ratio: Number(row.ratio.toFixed(4)) })));
