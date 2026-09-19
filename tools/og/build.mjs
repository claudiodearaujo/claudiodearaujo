// Generates every Open Graph image the site references, at build time, with
// no browser and no runtime cost (docs/SITE-EVOLUTION-PLAN.md D4).
//
// Two sources:
//  1. every content entry under src/content — one image per entry, at
//     public/og/<type>/<slug>.png, matching the path SeoService.setContent
//     derives from the entry's own type/slug;
//  2. the handful of routes that aren't markdown content (Home, and the
//     Work/Engineering/Writing/Labs landings) — at public/og/site/<name>.png.
//     Their title/summary are hand-kept in sync with each page's own
//     SeoService.setPage()/setHome() call; there are only five of them.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { categoryLabelFor } from './template.mjs';
import { renderOgImage } from './render.mjs';
import { walk } from '../content/markdown.mjs';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const ogRoot = path.join(root, 'public', 'og');

const staticPages = [
  {
    name: 'home',
    title: 'Cláudio Araújo',
    summary:
      'Software Engineer com 20+ anos de experiência em arquitetura, AI Engineering, sistemas autônomos e liderança técnica.',
  },
  {
    name: 'work',
    title: 'Selected Work',
    summary: 'Projetos e sistemas que representam minha trajetória em engenharia.',
  },
  {
    name: 'engineering',
    title: 'How I Engineer',
    summary: 'Princípios, decisões e práticas que orientam meu trabalho.',
  },
  {
    name: 'writing',
    title: 'Writing',
    summary: 'Ensaios sobre engenharia, arquitetura e inteligência artificial.',
  },
  {
    name: 'labs',
    title: 'Labs',
    summary: 'Experimentos e pesquisas em sistemas inteligentes.',
  },
  {
    name: 'engineering-decisions',
    title: 'Architecture Decisions',
    summary: 'Decisões técnicas públicas, com contexto, alternativas e consequências.',
  },
];

async function buildContentImages() {
  const files = await walk(contentRoot);
  let count = 0;

  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    // build-content.mjs has already validated this front matter against the
    // full schema in the same `assets:build` chain; re-parsing it here for
    // just these four fields keeps the OG build independent without
    // duplicating that validation.
    const { title, type, slug, summary } = matter(raw).data;

    const png = await renderOgImage({ category: categoryLabelFor(type), title, summary });
    const dir = path.join(ogRoot, type);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${slug}.png`), png);
    count++;
  }

  return count;
}

async function buildStaticImages() {
  const dir = path.join(ogRoot, 'site');
  await mkdir(dir, { recursive: true });

  for (const page of staticPages) {
    const png = await renderOgImage({ title: page.title, summary: page.summary });
    await writeFile(path.join(dir, `${page.name}.png`), png);
  }

  return staticPages.length;
}

const [contentCount, staticCount] = await Promise.all([buildContentImages(), buildStaticImages()]);
console.log(`Rendered ${contentCount} content OG images and ${staticCount} site OG images.`);
