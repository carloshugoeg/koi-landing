// Copies the variable-font woff2 files from @fontsource-variable packages into
// public/fonts/ so index.html can preload them with stable, unhashed URLs.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'fonts');

const FONTS = [
  ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'inter-var.woff2'],
  ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2', 'playfair-var.woff2'],
  ['@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2', 'playfair-var-italic.woff2'],
];

mkdirSync(outDir, { recursive: true });

let copied = 0;
for (const [src, dest] of FONTS) {
  const from = join(root, 'node_modules', src);
  if (!existsSync(from)) {
    console.warn(`[sync-fonts] missing ${src} — run npm install first`);
    continue;
  }
  copyFileSync(from, join(outDir, dest));
  copied++;
}
console.log(`[sync-fonts] ${copied}/${FONTS.length} fonts copied to public/fonts/`);
