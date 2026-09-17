import { readdir, readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');
const generatedRoot = path.join(root, 'src', 'app', 'generated');
const entriesRoot = path.join(generatedRoot, 'entries');
const publicRoot = path.join(root, 'public');
const siteOrigin = (process.env.SITE_ORIGIN ?? '').replace(/\/$/, '');
const isPagesPreview = process.env.CF_PAGES === '1' && !siteOrigin;

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

const routeFor = (meta) =>
  meta.route ??
  {
    project: `/pt/work/${meta.slug}`,
    article: `/pt/writing/${meta.slug}`,
    lab: `/pt/labs/${meta.slug}`,
    decision: `/pt/engineering/decisions/${meta.slug}`,
  }[meta.type];

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    }),
  );
  return files.flat().filter((file) => file.endsWith('.md'));
}

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
  const headings = [];
  let html = String(await marked.parse(body));
  html = html.replace(/<(h[23])>(.*?)<\/h[23]>/g, (_match, tag, inner) => {
    const text = inner
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .trim();
    const id = slugify(text);
    headings.push({ level: Number(tag[1]), id, text });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  html = sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      h2: ['id'],
      h3: ['id'],
      code: ['class'],
      img: ['src', 'alt', 'title', 'loading'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
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
    `// Generated. Do not edit.\nexport const content = ${JSON.stringify({ ...summary, headings, html }, null, 2)} as const;\n`,
    'utf8',
  );
  routes.push({ path: route.replace(/^\//, ''), moduleName });
}

manifest.sort((a, b) => a.route.localeCompare(b.route));
routes.sort((a, b) => a.path.localeCompare(b.path));

await writeFile(
  path.join(generatedRoot, 'content-manifest.generated.ts'),
  `// Generated. Do not edit.\nexport const contentManifest = ${JSON.stringify(manifest, null, 2)} as const;\n`,
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
  `// Generated. Do not edit.\nexport const siteOrigin = ${JSON.stringify(siteOrigin)} as const;\nexport const isPagesPreview = ${JSON.stringify(isPagesPreview)} as const;\n`,
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

const robots = isPagesPreview
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
