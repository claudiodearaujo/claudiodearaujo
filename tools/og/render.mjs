import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { loadOgFonts } from './fonts.mjs';
import { buildOgTree, OG_HEIGHT, OG_WIDTH } from './template.mjs';

/**
 * Renders one Open Graph PNG (1200×630) for the given content.
 * @param {{ category?: string, title: string, summary: string }} data
 * @returns {Promise<Buffer>}
 */
export async function renderOgImage(data) {
  const fonts = await loadOgFonts();
  const svg = await satori(buildOgTree(data), { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } });
  return resvg.render().asPng();
}
