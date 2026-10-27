// Reference graph for the revamp page.
// Seeds at index.html, follows local href/src/url() and the manifest, and
// expands the frame loops the live scripts actually run. Prints orphans
// under public/ and the root page files. Pass --delete to remove orphans.
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distMode = process.argv.includes('--dist');
const root = distMode ? join(repo, 'dist') : repo;
const deleteOrphans = process.argv.includes('--delete');

const KEEP = new Set([
  'public/robots.txt',
  'public/sitemap.xml',
  'robots.txt',
  'sitemap.xml',
  'index.html',
]);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function norm(raw) {
  let s = raw.split('#')[0].split('?')[0].trim();
  if (!s || s.startsWith('data:') || s.startsWith('http://') || s.startsWith('https://') || s.startsWith('mailto:') || s.startsWith('#')) {
    if (s.startsWith('https://koisoftware.com/')) s = s.slice('https://koisoftware.com/'.length);
    else return null;
  }
  s = s.replace(/^\.\//, '').replace(/^\//, '');
  return s || null;
}

function literals(text) {
  const out = new Set();
  const re = /(?:url\(\s*|href\s*=\s*|src\s*=\s*|content\s*=\s*)['"]?([^'")\s>]+)/gi;
  let m;
  while ((m = re.exec(text))) {
    const n = norm(m[1]);
    if (n && !n.includes('$') && !n.includes('{') && /\.[a-z0-9]+$/i.test(n)) out.add(n);
  }
  const manifestIcons = /"src"\s*:\s*"([^"]+)"/g;
  while ((m = manifestIcons.exec(text))) {
    const n = norm(m[1]);
    if (n) out.add(n);
  }
  return out;
}

function pad(i) {
  return String(i).padStart(2, '0');
}

function dynamics(text) {
  const out = new Set();
  const frame = text.includes('koi-lib/')
    ? [...text.matchAll(/\['([^\]]+)'\]\.forEach\(s=>\{for\(let i=0;i<\(s=='swim'\?(\d+):(\d+)\);i\+\+\)/g)]
    : [];
  for (const m of frame) {
    const names = m[1].split(',').map((s) => s.replace(/'/g, ''));
    const swimN = Number(m[2]);
    const otherN = Number(m[3]);
    for (const name of names) {
      const n = name === 'swim' ? swimN : otherN;
      for (let i = 0; i < n; i++) out.add(`koi-lib/${name}/${pad(i)}.png`);
    }
  }
  if (/circ\/'\+pad\(/.test(text) || /circ\/'\+String\(Math\.min\(11/.test(text) || /src="circ\/"/.test(text)) {
    for (let i = 0; i < 12; i++) out.add(`circ/${pad(i)}.png`);
  }
  if (text.includes('as/pad${i+1}.png')) {
    const projects = (text.match(/\{k:'/g) || []).length;
    for (let i = 1; i <= projects; i++) {
      out.add(`as/pad${i}.png`);
      out.add(`as/stroke${i}.png`);
    }
  }
  for (const m of text.matchAll(/\["([a-z0-9-]+)","/g)) out.add(`shots/${m[1]}.jpg`);
  return out;
}

const queue = ['index.html'];
const seen = new Set();
const refs = new Set();

while (queue.length) {
  const rel = queue.pop();
  if (seen.has(rel)) continue;
  seen.add(rel);
  const path = [join(root, rel), join(root, 'public', rel)].find((p) => {
    try {
      return statSync(p).isFile();
    } catch {
      return false;
    }
  });
  if (!path) {
    refs.add(rel);
    continue;
  }
  const text = readFileSync(path, 'utf8');
  const found = new Set([...literals(text), ...dynamics(text)]);
  for (const ref of found) {
    refs.add(ref);
    if (/\.(css|js|webmanifest)$/.test(ref) && !seen.has(ref)) queue.push(ref);
  }
}

const scope = walk(root).filter((p) => {
  const rel = relative(root, p);
  if (distMode) return true;
  if (rel.startsWith('src/') || rel.startsWith('scripts/') || rel.startsWith('.github/')) return false;
  if (rel.startsWith('public/')) return true;
  return /^(index\.html|[^./]+\.(css|js))$/.test(rel);
});

const orphans = [];
let orphanBytes = 0;
for (const p of scope) {
  const rel = relative(root, p);
  const pub = rel.startsWith('public/') ? rel.slice('public/'.length) : rel;
  const hit = refs.has(pub) || refs.has(rel) || KEEP.has(rel);
  if (!hit) {
    const n = statSync(p).size;
    orphans.push({ rel, n });
    orphanBytes += n;
  }
}
orphans.sort((a, b) => a.rel.localeCompare(b.rel));

const missing = [];
for (const ref of [...refs].sort()) {
  const atPublic = join(root, 'public', ref);
  const atRoot = join(root, ref);
  const ok = [atPublic, atRoot].some((p) => {
    try {
      return statSync(p).isFile();
    } catch {
      return false;
    }
  });
  if (!ok) missing.push(ref);
}

console.log(`refs ${refs.size}`);
console.log(`scope ${scope.length}`);
console.log(`orphans ${orphans.length} bytes ${orphanBytes}`);
for (const o of orphans) console.log(`orphan ${o.n} ${o.rel}`);
console.log(`missing ${missing.length}`);
for (const m of missing) console.log(`missing ${m}`);

if (deleteOrphans) {
  for (const o of orphans) rmSync(join(root, o.rel));
  console.log(`deleted ${orphans.length}`);
}

if (orphans.length || missing.length) process.exitCode = deleteOrphans ? 0 : 1;
