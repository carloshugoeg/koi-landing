// One-off pipeline: converts the oversized client-logo PNGs at the repo root of
// public/ into WebP files sized for their display box (192×64 CSS px @2x) and
// prints the width/height manifest to paste into LogoMarquee's data array.
// Run with: npm run optimize:logos
import { mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'public');
const outDir = join(root, 'public', 'logos');

// 2× of the ~192×64 display box in LogoMarquee
const MAX_W = 384;
const MAX_H = 128;

mkdirSync(outDir, { recursive: true });

const pngs = readdirSync(srcDir).filter((f) => f.endsWith('.png'));
const manifest = [];

for (const file of pngs) {
  const name = file.replace(/\.png$/, '').replace(/-logo$/, '');
  const out = join(outDir, `${name}.webp`);
  const { width, height } = await sharp(join(srcDir, file))
    .resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  manifest.push({ name, src: `/logos/${name}.webp`, width, height });
}

console.log('[optimize-logos] manifest:');
console.log(JSON.stringify(manifest, null, 2));
