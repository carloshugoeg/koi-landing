#!/usr/bin/env node
/**
 * Measure unique bytes of the eager animation/decoration payload.
 * Before = historical PNG preload set (hero + ola + pools + brush).
 * After  = first sequences in WebP + pools + brush (desktop and mobile).
 */
import { statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const pad = (i) => String(i).padStart(2, '0');
const size = (rel) => {
  try {
    return statSync(join(repo, rel)).size;
  } catch {
    return 0;
  }
};

function sum(files) {
  const uniq = [...new Set(files)];
  return { files: uniq.length, bytes: uniq.reduce((n, f) => n + size(f), 0) };
}

const before = [];
for (const [s, n] of [
  ['swim', 16],
  ['turn-left', 12],
  ['turn-right', 12],
  ['rise', 12],
  ['dive', 12],
]) {
  for (let i = 0; i < n; i++) before.push(`public/koi-lib/${s}/${pad(i)}.png`);
}
for (let i = 0; i < 12; i++) before.push(`public/circ/${pad(i)}.png`);
before.push('public/pool-desktop-bleed.png', 'public/pool-mobile-bleed.png', 'public/as/brush-h.png');

const afterDesktop = [];
for (let i = 0; i < 16; i++) afterDesktop.push(`public/koi-lib/swim/${pad(i)}.webp`);
for (let i = 0; i < 12; i++) afterDesktop.push(`public/koi-lib/rise/${pad(i)}.webp`);
afterDesktop.push('public/pool-desktop-bleed.webp', 'public/as/brush-h.webp');

const afterMobile = [];
for (let i = 0; i < 12; i++) afterMobile.push(`public/circ/${pad(i)}.webp`);
for (let i = 0; i < 12; i++) afterMobile.push(`public/koi-lib/rise/${pad(i)}.webp`);
afterMobile.push('public/pool-mobile-bleed.webp', 'public/as/brush-h.webp');

const b = sum(before);
const d = sum(afterDesktop);
const m = sum(afterMobile);
const mb = (n) => +(n / 1024 / 1024).toFixed(2);

const report = {
  claim:
    'Eager unique payload (hero first sequence + ola first sequence + visible pool + brush), not full site disk size.',
  before: { ...b, MB: mb(b.bytes) },
  afterDesktop: { ...d, MB: mb(d.bytes) },
  afterMobile: { ...m, MB: mb(m.bytes) },
  reductionDesktop: {
    savedMB: mb(b.bytes - d.bytes),
    ratio: +((d.bytes / b.bytes) * 100).toFixed(1) + '% of before',
  },
  limiter: 'Network transfer of frame PNGs on first paint; WebP + deferred sequences remove the rest from the critical path.',
  runs: 1,
  note: 'Disk byte sum of unique files the scripts warm before idle. Not a timed Lighthouse run.',
};

mkdirSync(join(repo, 'scripts/out'), { recursive: true });
writeFileSync(join(repo, 'scripts/out/payload-measure.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
