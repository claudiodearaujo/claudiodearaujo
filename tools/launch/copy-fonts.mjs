// Copies the self-hosted font files this design system needs from their npm
// packages into public/fonts/, so Angular's asset glob ships them as static
// files. Fonts are never committed to the repo: they're reproduced from
// node_modules on every install/build, the same way generated content is.
//
// Only the "latin" cut of each variable font is needed. Its unicode-range
// (U+0000-00FF plus a handful of punctuation/currency code points) already
// covers every character used by pt-BR and en-US content — "latin-ext"
// exists for languages like Polish or Vietnamese and would roughly double
// the payload for zero visible benefit here.
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const fontsOut = path.join(root, 'public', 'fonts');

const fonts = [
  {
    package: '@fontsource-variable/manrope',
    file: 'manrope-latin-wght-normal.woff2',
  },
  {
    package: '@fontsource-variable/inter',
    file: 'inter-latin-wght-normal.woff2',
  },
  {
    package: '@fontsource-variable/jetbrains-mono',
    file: 'jetbrains-mono-latin-wght-normal.woff2',
  },
];

await mkdir(fontsOut, { recursive: true });

for (const font of fonts) {
  const source = path.join(root, 'node_modules', font.package, 'files', font.file);
  const destination = path.join(fontsOut, font.file);
  await copyFile(source, destination);
}

console.log(`Copied ${fonts.length} self-hosted font files into public/fonts/.`);
