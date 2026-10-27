// Rasterize public/favicon/icon.svg into the png sizes and the ico the
// page links. With --trace <png>, rebuild icon.svg from that master first.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'favicon');
const svgPath = join(dir, 'icon.svg');

function pngIco(images) {
  const count = images.length;
  let offset = 6 + 16 * count;
  const entries = images.map((img) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.buf.length;
    return e;
  });
  const h = Buffer.alloc(6);
  h.writeUInt16LE(1, 2);
  h.writeUInt16LE(count, 4);
  return Buffer.concat([h, ...entries, ...images.map((img) => img.buf)]);
}

async function trace(master) {
  const { data, info } = await sharp(master).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const rowBytes = Math.ceil(w / 8);
  const bits = Buffer.alloc(rowBytes * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const cream = data[i + 3] > 180 && data[i] > 200 && data[i + 1] > 180 && data[i + 2] > 150;
      if (cream) bits[y * rowBytes + (x >> 3)] |= 1 << (7 - (x & 7));
    }
  }
  const pbm = Buffer.concat([Buffer.from(`P4\n${w} ${h}\n`), bits]);
  const traced = spawnSync('potrace', ['-s', '--flat'], { input: pbm, maxBuffer: 8_000_000 });
  if (traced.status !== 0) throw new Error(traced.stderr.toString());
  const svg = traced.stdout.toString();
  const d = svg.match(/d="([^"]+)"/)[1].replace(/\s+/g, ' ');
  const group = svg.match(/transform="([^"]+)"/)[1];
  if (!/translate\(0(?:\.0+)?,\s*512(?:\.0+)?\) scale\(0\.1/.test(group)) {
    throw new Error('unexpected potrace transform ' + group);
  }
  const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#B8321E"/><g transform="${group}" fill="#EDE7DA"><path d="${d}"/></g></svg>\n`;
  const rend = await sharp(Buffer.from(out)).resize(w, h).ensureAlpha().raw().toBuffer();
  let both = 0;
  let onlyA = 0;
  let onlyB = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3] > 180 && data[i] > 200 && data[i + 1] > 180 && data[i + 2] > 150;
    const b = rend[i + 3] > 180 && rend[i] > 200 && rend[i + 1] > 180 && rend[i + 2] > 150;
    if (a && b) both++;
    else if (a) onlyA++;
    else if (b) onlyB++;
  }
  const iou = both / (both + onlyA + onlyB);
  if (iou < 0.9) throw new Error('trace does not match the master, iou ' + iou);
  writeFileSync(svgPath, out);
  console.log('traced', svgPath, 'iou', iou.toFixed(3), 'bytes', out.length);
}

const traceAt = process.argv.indexOf('--trace');
if (traceAt !== -1) await trace(process.argv[traceAt + 1]);

const svg = readFileSync(svgPath);
const sizes = [16, 32, 180, 192, 512];
const pngs = [];
for (const size of sizes) {
  const buf = await sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();
  const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  writeFileSync(join(dir, name), buf);
  pngs.push({ size, buf });
  console.log(name, buf.length);
}
const ico = pngIco(pngs.filter((p) => p.size === 16 || p.size === 32));
writeFileSync(join(dir, 'favicon.ico'), ico);
console.log('favicon.ico', ico.length);
