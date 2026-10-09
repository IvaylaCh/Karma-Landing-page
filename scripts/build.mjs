// Builds the static page: content.json + index.html template -> dist/index.html,
// Tailwind -> dist/styles.css, and copies the fonts and logos beside them.
// Everything is built in a temporary folder first; dist/ is replaced only when
// every step has succeeded, so a failed build never damages the committed demo copy.
// Run with: npm run build

import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync, renameSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { fill } from './fill.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = join(root, 'src');
const dist = join(root, 'dist');
const work = join(root, '.dist-build');

const FONTS = ['Geologica-Sharp-Variable.woff2', 'OverpassMono-Variable.woff2'];
const LOGOS = ['karma-lockup-solid.svg', 'karma-lockup-reversed.svg', 'karma-lockup.svg', 'karma-icon.svg'];
const FORBIDDEN = ['http://', 'https://', 'googleapis'];

function stop(message) {
  rmSync(work, { recursive: true, force: true });
  console.error(`Build stopped: ${message}`);
  process.exit(1);
}

// 1. Fill the template first. A missing key stops the build before anything is written.
let html;
try {
  const content = JSON.parse(readFileSync(join(src, 'content.json'), 'utf8'));
  html = fill(readFileSync(join(src, 'index.html'), 'utf8'), content);
} catch (error) {
  stop(error.message);
}

const cli = join(root, 'node_modules', '@tailwindcss', 'cli', 'dist', 'index.mjs');
if (!existsSync(cli)) stop('the Tailwind CLI is not installed; run npm install first.');

// 2. Build into an empty working folder.
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });
writeFileSync(join(work, 'index.html'), html);

// 3. Compile the stylesheet with the pinned Tailwind CLI.
const result = spawnSync(
  process.execPath,
  [cli, '--input', join(src, 'styles.css'), '--output', join(work, 'styles.css'), '--minify'],
  { cwd: root, stdio: 'inherit' },
);
if (result.status !== 0) {
  const why = result.error ? result.error.message : result.signal ? `signal ${result.signal}` : `exit code ${result.status}`;
  stop(`Tailwind failed (${why}).`);
}

// Tailwind's licence banner carries its website address. Keep the notice, drop the URL.
const cssPath = join(work, 'styles.css');
writeFileSync(cssPath, readFileSync(cssPath, 'utf8').replace(/\s*\|\s*https?:\/\/tailwindcss\.com\s*/, ' '));

// 4. The two fonts sit beside styles.css, where the theme's @font-face rules expect them.
//    The four logos are copied unchanged. Each file is named, so a missing one stops the build.
const copies = [
  ...FONTS.map((file) => [join(root, 'design-system', 'fonts', file), file]),
  ...LOGOS.map((file) => [join(src, 'logos', file), file]),
];
for (const [from, file] of copies) {
  if (!existsSync(from)) stop(`missing ${from}`);
  copyFileSync(from, join(work, file));
}

// 5. The page must load nothing from the network.
for (const file of ['index.html', 'styles.css']) {
  const text = readFileSync(join(work, file), 'utf8');
  const found = FORBIDDEN.find((needle) => text.includes(needle));
  if (found) stop(`dist/${file} contains "${found}".`);
}

// 6. Every step succeeded: swap the new build in for dist/.
rmSync(dist, { recursive: true, force: true });
renameSync(work, dist);

console.log('Built dist/index.html and dist/styles.css.');
