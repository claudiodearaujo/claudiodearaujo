import { readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import {
  addHeadingAnchorLinks,
  escapeXml,
  readingTimeMinutes,
  wordCount,
  renderCode,
  routeFor,
  slugify,
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

// Types that are meant to be read once and dated (as opposed to `page`,
// which is a standing page like About or Contact) must declare when they
// were published — otherwise index sorting has nothing but the slug to go
// on, per docs/SITE-EVOLUTION-PLAN.md D8.
const datedTypes = ['article', 'lab', 'decision'];
// An unquoted YYYY-MM-DD in YAML is auto-coerced to a JS Date by gray-matter's
// parser (the classic YAML 1.1 timestamp footgun) — accept that shape too and
// normalize it back to a plain ISO date string, rather than making every
// author remember to quote the date.
const isoDate = z
  .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date, YYYY-MM-DD'), z.date()])
  .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value));
const adrStatuses = ['Proposed', 'Accepted', 'Rejected', 'Superseded', 'Deprecated'];

const schema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    locale: z.enum(['pt', 'en']),
    type: z.enum(['project', 'article', 'lab', 'decision', 'page']),
    // Relative to the locale, without a leading slash: `engineering/principles`
    // becomes `/pt/engineering/principles`. Writing the locale in here would
    // pin the file to one language (E7).
    route: z
      .string()
      .regex(/^(?!\/)[a-z0-9/-]+$/, 'must be a locale-relative path, without a leading slash')
      .optional(),
    summary: z.string().min(1),
    status: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    // Promotes this entry into the Home narrative — see ContentRepository.featured().
    featured: z.boolean().default(false),
    publishedAt: isoDate.optional(),
    updatedAt: isoDate.optional(),
    // Explicit editorial cross-references, checked against the whole
    // manifest once every file's route is known — see validateRelated below.
    related: z.array(z.string().startsWith('/')).default([]),
  })
  .superRefine((meta, ctx) => {
    if (datedTypes.includes(meta.type) && !meta.publishedAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['publishedAt'],
        message: `publishedAt is required for type "${meta.type}"`,
      });
    }
    if (meta.type === 'decision' && meta.status && !adrStatuses.includes(meta.status)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['status'],
        message: `an ADR's status must be one of: ${adrStatuses.join(', ')} (got "${meta.status}")`,
      });
    }
  });

await rm(generatedRoot, { recursive: true, force: true });
await mkdir(entriesRoot, { recursive: true });
await mkdir(publicRoot, { recursive: true });

const files = await walk(contentRoot);
const manifest = [];
const routes = [];
const seenRoutes = new Set();

// Pass 1: parse and validate every file's own front matter, and learn every
// route that will exist — `related` can only be checked once all of them are
// known, which rules out validating it in the same pass that reads the file.
// Reading stays parallel (Promise.all); the duplicate-route check below it
// still runs in file order, since that array resolves in the order given.
const parsedFiles = await Promise.all(
  files.map(async (file) => {
    const raw = await readFile(file, 'utf8');
    const parsed = matter(raw);
    const meta = schema.parse(parsed.data);
    const route = routeFor(meta);
    if (!route) throw new Error(`Content page ${meta.slug} requires a route.`);
    return { file, parsed, meta, route };
  }),
);

for (const { meta, route } of parsedFiles) {
  if (seenRoutes.has(route)) throw new Error(`Duplicate content route: ${route}`);
  seenRoutes.add(route);
}

for (const { file, meta, route } of parsedFiles) {
  for (const relatedRoute of meta.related) {
    if (relatedRoute === route) {
      throw new Error(`${meta.slug} lists itself in \`related\`.`);
    }
    if (!seenRoutes.has(relatedRoute)) {
      throw new Error(
        `${meta.slug} (${path.relative(root, file)}) has a \`related\` entry pointing to ` +
          `${relatedRoute}, which is not a route any content declares.`,
      );
    }
  }
}

// Pass 2: render each body now that every reference in it is known-good.
for (const { file, parsed, meta, route } of parsedFiles) {
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

  const { related, ...restMeta } = meta;
  const summary = {
    ...restMeta,
    route,
    relatedRoutes: related,
    readingTime: readingTimeMinutes(parsed.content),
    // Published in the Article JSON-LD; readingTime is derived from the same
    // count, so carrying both costs nothing.
    wordCount: wordCount(parsed.content),
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

// One explicit route per tag actually in use — not a `:tag` param route —
// so every topic page stays prerendered like everything else instead of
// needing an enumerable-params hook or falling back to client rendering.
// First-seen spelling of a tag (by manifest order, already route-alphabetical)
// becomes that topic's display label.
// A tag used by a single entry has no topic to collect: the page would list
// the one item the reader just came from. Those tags still render — as plain
// text, not links (ContentRepository.hasTopic decides that from this same
// threshold) — so the site never publishes a thin dead-end page or links to
// a route that was not generated.
const TOPIC_MIN_ENTRIES = 2;

// Locales are whatever the content actually declares, never a fixed list: a
// locale exists here the moment a file is published in it, and disappears
// when the last one goes (E7).
const publishedLocales = [...new Set(manifest.map((entry) => entry.locale))].sort();

// Tags are counted within a locale. A Portuguese and an English article
// sharing the tag "Agents" are not the same topic page, and counting them
// together would publish a topic route listing content the reader cannot read.
const topicsByLocale = new Map(
  publishedLocales.map((locale) => {
    const labelBySlug = new Map();
    const countBySlug = new Map();
    for (const entry of manifest.filter((candidate) => candidate.locale === locale)) {
      for (const tag of entry.tags) {
        const slug = slugify(tag);
        if (!labelBySlug.has(slug)) labelBySlug.set(slug, tag);
        countBySlug.set(slug, (countBySlug.get(slug) ?? 0) + 1);
      }
    }
    const topics = [...labelBySlug.entries()]
      .filter(([slug]) => countBySlug.get(slug) >= TOPIC_MIN_ENTRIES)
      .map(([slug, label]) => ({ slug, label }))
      .sort((a, b) => a.slug.localeCompare(b.slug));
    return [locale, topics];
  }),
);

const topicRouteSource = publishedLocales
  .flatMap((locale) =>
    topicsByLocale.get(locale).map(
      ({ slug, label }) => `  {
    path: '${locale}/topics/${slug}',
    data: { locale: '${locale}', tagSlug: ${JSON.stringify(slug)}, tagLabel: ${JSON.stringify(label)} },
    loadComponent: () => import('../features/topic/topic.page').then((m) => m.TopicPage),
  }`,
    ),
  )
  .join(',\n');

await writeFile(
  path.join(generatedRoot, 'topic-routes.generated.ts'),
  `// Generated. Do not edit.\nimport { Routes } from '@angular/router';\nexport const topicRoutes: Routes = [\n${topicRouteSource}\n];\n`,
  'utf8',
);

await writeFile(
  path.join(generatedRoot, 'site-config.generated.ts'),
  `// Generated. Do not edit.\nexport const siteOrigin = ${JSON.stringify(siteOrigin)} as const;\nexport const isPreview = ${JSON.stringify(isPreview)} as const;\n`,
  'utf8',
);

// What the app needs to know about languages, derived from the content rather
// than configured: which locales exist, and which one `/` resolves to.
await writeFile(
  path.join(generatedRoot, 'locales.generated.ts'),
  `// Generated. Do not edit.\nimport { Locale } from '../core/i18n/locale';\nexport const publishedLocales: readonly Locale[] = ${JSON.stringify(publishedLocales)};\n`,
  'utf8',
);

// The pages that exist once per locale and are not content files, as paths
// below the locale. app.routes.ts builds its routes from this same shape.
const staticSections = ['', 'work', 'engineering', 'engineering/decisions', 'writing', 'labs'];

const publicRoutes = Array.from(
  new Set([
    '/',
    ...publishedLocales.flatMap((locale) =>
      staticSections.map((section) => (section ? `/${locale}/${section}` : `/${locale}`)),
    ),
    ...manifest.map((entry) => entry.route),
    ...publishedLocales.flatMap((locale) =>
      topicsByLocale.get(locale).map(({ slug }) => `/${locale}/topics/${slug}`),
    ),
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

// `lastmod` only where a date is actually declared. A content route carries
// its own `updatedAt ?? publishedAt`; an index or a topic page has no date of
// its own, and inventing one (the build date, say) would tell crawlers the
// whole site changes on every deploy.
const lastmodByRoute = new Map(
  manifest
    .map((entry) => [entry.route, entry.updatedAt ?? entry.publishedAt])
    .filter(([, date]) => Boolean(date)),
);

if (siteOrigin) {
  const urls = publicRoutes
    .map((route) => {
      const lastmod = lastmodByRoute.get(route);
      return `  <url><loc>${siteOrigin}${route}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  await writeFile(
    path.join(publicRoot, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  );
} else {
  await rm(path.join(publicRoot, 'sitemap.xml'), { force: true });
}

// The feed carries what is actually published on a date — articles, labs and
// decisions. A project is ongoing rather than dated, and a standing page
// (About, Now) is not an item a subscriber wants delivered again.
const feedItems = manifest
  .filter((entry) => datedTypes.includes(entry.type))
  .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));

if (siteOrigin) {
  // Dates in front matter are plain YYYY-MM-DD; RSS wants RFC 822, and
  // parsing them as UTC keeps the day from shifting under a negative offset.
  const rfc822 = (date) => new Date(`${date}T00:00:00Z`).toUTCString();
  const items = feedItems
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${siteOrigin}${entry.route}</link>
      <guid isPermaLink="true">${siteOrigin}${entry.route}</guid>
      <pubDate>${rfc822(entry.publishedAt)}</pubDate>
      <description>${escapeXml(entry.summary)}</description>
${entry.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`,
    )
    .join('\n');

  await writeFile(
    path.join(publicRoot, 'rss.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cláudio Araújo</title>
    <link>${siteOrigin}/pt</link>
    <description>Engenharia de software, arquitetura, inteligência artificial e liderança técnica.</description>
    <language>pt-BR</language>
    <atom:link href="${siteOrigin}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`,
    'utf8',
  );
} else {
  await rm(path.join(publicRoot, 'rss.xml'), { force: true });
}

console.log(
  `Validated and rendered ${manifest.length} content entries into lazy route modules` +
    `${siteOrigin ? `, with ${feedItems.length} of them in the feed` : ''}.`,
);
