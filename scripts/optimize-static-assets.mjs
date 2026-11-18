#!/usr/bin/env node
/**
 * Convert static animation/decoration PNGs to WebP (quality 82).
 * Re-runnable. Leaves PNG in place as optional fallback; callers prefer .webp.
 */
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { join, relative, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const roots = [
  join(repo, 'public/koi-lib'),
  join(repo, 'public/circ'),
  join(repo, 'public/as'),
];
const singles = [
  join(repo, 'public/pool-desktop-bleed.png'),
  join(repo, 'public/pool-mobile-bleed.png'),
];

const QUALITY = 82;

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (extname(p).toLowerCase() === '.png') acc.push(p);
  }
  return acc;
}

const files = [...roots.flatMap((r) => walk(r)), ...singles];
let before = 0;
let after = 0;
const rows = [];

for (const png of files) {
  const webp = png.replace(/\.png$/i, '.webp');
  const input = readFileSync(png);
  before += input.length;
  const out = await sharp(input).webp({ quality: QUALITY, alphaQuality: 90 }).toBuffer();
  writeFileSync(webp, out);
  after += out.length;
  rows.push({
    file: relative(repo, png),
    png: input.length,
    webp: out.length,
    ratio: +(out.length / input.length).toFixed(3),
  });
}

const report = {
  quality: QUALITY,
  files: rows.length,
  pngBytes: before,
  webpBytes: after,
  pngMB: +(before / 1024 / 1024).toFixed(2),
  webpMB: +(after / 1024 / 1024).toFixed(2),
  savedMB: +((before - after) / 1024 / 1024).toFixed(2),
  rows,
};
mkdirSync(join(repo, 'scripts/out'), { recursive: true });
writeFileSync(join(repo, 'scripts/out/webp-convert.json'), JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      files: report.files,
      pngMB: report.pngMB,
      webpMB: report.webpMB,
      savedMB: report.savedMB,
    },
    null,
    2,
  ),
);
