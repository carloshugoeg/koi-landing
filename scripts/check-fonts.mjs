import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'public/fonts/shippori-mincho-latin-400.woff2',
  'public/fonts/shippori-mincho-latin-500.woff2',
  'public/fonts/shippori-mincho-jp-400.woff2',
  'public/fonts/shippori-mincho-jp-500.woff2',
  'public/fonts/shippori-mincho-arrows-400.woff2',
  'public/fonts/zen-kaku-gothic-new-latin-400.woff2',
  'public/fonts/zen-kaku-gothic-new-arrows-400.woff2',
];

const missing = required.filter((file) => !existsSync(join(root, file)));
if (missing.length) {
  console.error(`[fonts] missing ${missing.join(', ')}`);
  process.exit(1);
}
