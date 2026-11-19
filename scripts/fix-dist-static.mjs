#!/usr/bin/env node
/** Keep the Hostinger upload tree free of Vite-injected React/Tailwind CSS. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const htmlPath = join(dist, 'index.html');
if (!existsSync(htmlPath)) {
  console.error('missing dist/index.html');
  process.exit(1);
}
let html = readFileSync(htmlPath, 'utf8');
const before = html;
html = html.replace(/\s*<link[^>]+href="\/assets\/index-[^"]+\.css"[^>]*>/g, '');
// Prefer stable public path for deferred CSS (not hashed assets/)
html = html.replace(
  /href="\/assets\/defer\.min-[^"]+\.css"/g,
  'href="/defer.min.css"',
);
if (html !== before) {
  writeFileSync(htmlPath, html);
  console.log('fix-dist-static: cleaned index.html CSS links');
} else {
  console.log('fix-dist-static: no changes');
}
