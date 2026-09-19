// Fonts for the OG image renderer, kept separate from the site's own
// self-hosted fonts (src/styles/_fonts.scss / public/fonts/).
//
// Satori's bundled font parser (@shuding/opentype.js) fails on the site's
// variable fonts — it can't parse the `fvar` axis table our Inter/Manrope/
// JetBrains Mono Variable files carry — so this build-time-only tool uses
// one static weight per family from the non-variable @fontsource packages
// instead. This never touches the browser bundle or the runtime font stack;
// it exists purely to rasterize a PNG during the build.
import { readFile } from 'node:fs/promises';
import { decompress } from 'wawoff2';

const sources = [
  {
    name: 'Manrope',
    weight: 800,
    path: 'node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff2',
  },
  {
    name: 'Inter',
    weight: 400,
    path: 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
  },
  {
    name: 'JetBrains Mono',
    weight: 700,
    path: 'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2',
  },
];

let cached;

/** @returns {Promise<{ name: string, data: Buffer, weight: number, style: 'normal' }[]>} */
export async function loadOgFonts() {
  if (cached) return cached;
  cached = await Promise.all(
    sources.map(async (source) => {
      const woff2 = await readFile(source.path);
      const data = Buffer.from(await decompress(woff2));
      return { name: source.name, data, weight: source.weight, style: 'normal' };
    }),
  );
  return cached;
}
