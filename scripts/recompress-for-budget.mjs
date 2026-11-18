#!/usr/bin/env node
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

async function recompressDir(dir, quality) {
  let before = 0;
  let after = 0;
  let n = 0;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.png')) continue;
    const png = join(dir, name);
    const webp = png.replace(/\.png$/i, '.webp');
    before += statSync(webp).size;
    const out = await sharp(readFileSync(png)).webp({ quality, alphaQuality: 80 }).toBuffer();
    writeFileSync(webp, out);
    after += out.length;
    n += 1;
  }
  return { dir, n, before, after, saved: before - after };
}

async function encode(srcPng, width, fmt, opts) {
  let pipeline = sharp(srcPng);
  if (width) pipeline = pipeline.resize({ width });
  if (fmt === 'webp') return pipeline.webp(opts).toBuffer();
  if (fmt === 'avif') return pipeline.avif(opts).toBuffer();
  throw new Error(fmt);
}

async function poolVariants(srcPng, basename) {
  const meta = await sharp(srcPng).metadata();
  const widths = basename.includes('mobile') ? [390, 780] : [768, 1080, 1440];
  const outs = [];
  for (const w of widths) {
    const target = Math.min(w, meta.width);
    for (const [fmt, ext, opts] of [
      ['webp', 'webp', { quality: 74, alphaQuality: 80 }],
      ['avif', 'avif', { quality: 55, effort: 4 }],
    ]) {
      const buf = await encode(srcPng, target, fmt, opts);
      const name = `public/${basename}-w${target}.${ext}`;
      writeFileSync(name, buf);
      outs.push({ name, size: buf.length, w: target, ext });
    }
  }
  for (const [fmt, ext, opts] of [
    ['webp', 'webp', { quality: 74, alphaQuality: 80 }],
    ['avif', 'avif', { quality: 55, effort: 4 }],
  ]) {
    const buf = await encode(srcPng, null, fmt, opts);
    writeFileSync(`public/${basename}.${ext}`, buf);
    outs.push({ name: `public/${basename}.${ext}`, size: buf.length, w: meta.width, ext });
  }
  return outs;
}

const results = [];
for (const [dir, q] of [
  ['public/circ', 68],
  ['public/koi-lib/swim', 72],
  ['public/koi-lib/rise', 72],
  ['public/koi-lib/turn-left', 72],
  ['public/koi-lib/turn-right', 72],
  ['public/koi-lib/dive', 72],
  ['public/as', 75],
]) {
  results.push(await recompressDir(dir, q));
}

const pools = [
  ...(await poolVariants('public/pool-mobile-bleed.png', 'pool-mobile-bleed')),
  ...(await poolVariants('public/pool-desktop-bleed.png', 'pool-desktop-bleed')),
];

mkdirSync('scripts/out', { recursive: true });
const report = { results, pools };
writeFileSync('scripts/out/recompress.json', JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      frames: results.map((r) => ({
        dir: r.dir,
        n: r.n,
        beforeKB: Math.round(r.before / 1024),
        afterKB: Math.round(r.after / 1024),
      })),
      pools: pools.map((p) => ({ name: p.name, KB: Math.round(p.size / 1024), w: p.w })),
    },
    null,
    2,
  ),
);
