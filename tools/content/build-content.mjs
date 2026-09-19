import { readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import {
  addHeadingAnchorLinks,
  renderCode,
  routeFor,
  walk,
  withHeadingAnchors,
  wrapTables,
} from './markdown.mjs';

const markdown = new Marked({ renderer: { code: renderCode } });

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const generatedRoot = path.join(root, 'src', 'app', 'generated');
const entriesRoot = path.join(generatedRoot, 'entries');
const publicRoot = path.join(root, 'public');
const isPreview = process.env.IS_PULL_REQUEST === 'true';
const configuredOrigin = isPreview
  ? ''
  : (process.env.SITE_ORIGIN ?? process.env.RENDER_EXTERNAL_URL ?? '');
const siteOrigin = configuredOrigin.replace(/\/$/, '');

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  locale: z.enum(['pt', 'en']),
  type: z.enum(['project', 'article', 'lab', 'decision', 'page']),
  route: z.string().startsWith('/').optional(),
  summary: z.string().min(1),
  status: z.string().optional(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

await rm(generatedRoot, { recursive: true, force: true });
await mkdir(entriesRoot, { recursive: true });
await mkdir(publicRoot, { recursive: true });

const files = await walk(contentRoot);
const manifest = [];
const routes = [];
const seenRoutes = new Set();

for (const file of files) {
  const raw = await readFile(file, 'utf8');
  const parsed = matter(raw);
  const meta = schema.parse(parsed.data);
  const route = routeFor(meta);
  if (!route) throw new Error(`Content page ${meta.slug} requires a route.`);
  if (seenRoutes.has(route)) throw new Error(`Duplicate content route: ${route}`);
  seenRoutes.add(route);

  const body = parsed.content.replace(/^\s*#\s+[^\r\n]+(?:\r?\n)+/, '');
  const { html: anchored, headings } = withHeadingAnchors(String(await markdown.parse(body)));
  const withPermalinks = addHeadingAnchorLinks(anchored);
  const withTables = wrapTables(withPermalinks);
  let html = sanitizeHtml(withTables, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      'img',
      // Hand-authored inline diagrams (docs/SITE-EVOLUTION-PLAN.md E3). Content
      // is repo-controlled, never user input, so allowing a fixed, minimal SVG
      // vocabulary here is the same trust level as the rest of this Markdown.
      'svg',
      'title',
      'desc',
      'line',
      'circle',
      'text',
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      h2: ['id'],
      h3: ['id'],
      a: [...(sanitizeHtml.defaults.allowedAttributes.a ?? []), 'class', 'aria-label'],
      div: ['class', 'role', 'tabindex', 'aria-label'],
      figure: ['class'],
      figcaption: ['class'],
      code: ['class'],
      img: ['src', 'alt', 'title', 'loading'],
      svg: ['viewBox', 'role', 'aria-labelledby', 'xmlns'],
      title: ['id'],
      desc: ['id'],
      line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
      circle: ['cx', 'cy', 'r', 'fill'],
      text: ['x', 'y', 'fill', 'font-size', 'font-family'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    // SVG's own attributes (viewBox, and any future addition like
    // preserveAspectRatio) are case-sensitive; the default lowercasing this
    // parser applies to plain HTML would silently break them.
    parser: { lowerCaseAttributeNames: false },
  });

  const summary = {
    ...meta,
    route,
    source: path.relative(root, file).replaceAll('\\', '/'),
  };
  manifest.push(summary);

  const moduleName = `${meta.type}-${meta.slug}.generated`;
  await writeFile(
    path.join(entriesRoot, `${moduleName}.ts`),
    `// Generated. Do not edit.\nimport { ContentEntry } from '../../core/content/content.models';\nexport const content: ContentEntry = ${JSON.stringify({ ...summary, headings, html }, null, 2)};\n`,
    'utf8',
  );
  routes.push({ path: route.replace(/^\//, ''), moduleName });
}

manifest.sort((a, b) => a.route.localeCompare(b.route));
routes.sort((a, b) => a.path.localeCompare(b.path));

await writeFile(
  path.join(generatedRoot, 'content-manifest.generated.ts'),
  `// Generated. Do not edit.\nimport { ContentSummary } from '../core/content/content.models';\nexport const contentManifest: readonly ContentSummary[] = ${JSON.stringify(manifest, null, 2)};\n`,
  'utf8',
);

const routeSource = routes
  .map(
    ({ path: routePath, moduleName }) => `  {
    path: '${routePath}',
    resolve: { content: () => import('./entries/${moduleName}').then((m) => m.content) },
    loadComponent: () => import('../features/content-detail/content-detail.page').then((m) => m.ContentDetailPage),
  }`,
  )
  .join(',\n');

await writeFile(
  path.join(generatedRoot, 'content-routes.generated.ts'),
  `// Generated. Do not edit.\nimport { Routes } from '@angular/router';\nexport const contentRoutes: Routes = [\n${routeSource}\n];\n`,
  'utf8',
);

await writeFile(
  path.join(generatedRoot, 'site-config.generated.ts'),
  `// Generated. Do not edit.\nexport const siteOrigin = ${JSON.stringify(siteOrigin)} as const;\nexport const isPreview = ${JSON.stringify(isPreview)} as const;\n`,
  'utf8',
);

const publicRoutes = Array.from(
  new Set([
    '/',
    '/pt',
    '/pt/work',
    '/pt/engineering',
    '/pt/writing',
    '/pt/labs',
    ...manifest.map((entry) => entry.route),
  ]),
);

// Single source of truth for the routes the deployment validator expects to
// find in the published sitemap.
await writeFile(
  path.join(generatedRoot, 'public-routes.generated.json'),
  `${JSON.stringify(publicRoutes, null, 2)}\n`,
  'utf8',
);

const robots = isPreview
  ? 'User-agent: *\nDisallow: /\n'
  : siteOrigin
    ? `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`
    : 'User-agent: *\nAllow: /\n';
await writeFile(path.join(publicRoot, 'robots.txt'), robots, 'utf8');

if (siteOrigin) {
  const urls = publicRoutes
    .map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`)
    .join('\n');
  await writeFile(
    path.join(publicRoot, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  );
} else {
  await rm(path.join(publicRoot, 'sitemap.xml'), { force: true });
}

console.log(`Validated and rendered ${manifest.length} content entries into lazy route modules.`);
