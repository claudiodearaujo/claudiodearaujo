// Helpers shared by the content build. Everything below `walk` is pure and
// free of I/O so it can be unit tested directly.
import { readdir } from 'node:fs/promises';
import path from 'node:path';

/** Recursively lists every .md file under `directory`, used by both the content build and the OG image build. */
export async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    }),
  );
  return files.flat().filter((file) => file.endsWith('.md'));
}

const namedEntities = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

// marked escapes heading text, so entities must be decoded before they reach the
// table of contents (interpolated as plain text) or the anchor slug.
export const decodeEntities = (value) =>
  value
    .replace(/&#x([0-9a-f]+);/gi, (_match, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (match, name) => namedEntities[name.toLowerCase()] ?? match);

export const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Repeated headings inside one document would otherwise emit duplicate ids,
// which is invalid HTML and makes every table-of-contents link jump to the first one.
export const uniqueId = (base, used) => {
  const seed = base || 'section';
  let candidate = seed;
  let suffix = 2;
  while (used.has(candidate)) candidate = `${seed}-${suffix++}`;
  used.add(candidate);
  return candidate;
};

/**
 * Adds a stable id to every h2/h3 and collects them as the table of contents.
 * The closing tag is matched by backreference so mismatched levels and
 * multi-line headings cannot be mis-parsed.
 */
export const withHeadingAnchors = (html) => {
  const headings = [];
  const used = new Set();

  const anchored = html.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_match, tag, inner) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).trim();
    const id = uniqueId(slugify(text), used);
    headings.push({ level: Number(tag[1]), id, text });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });

  return { html: anchored, headings };
};

// decodeEntities turns entities into raw characters for display; this turns
// raw characters back into safe attribute content (the aria-label value).
const escapeAttribute = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Appends a visible-on-hover/focus "#" permalink inside every heading that
 * withHeadingAnchors already gave an id. Kept as its own pass (rather than
 * folded into withHeadingAnchors) so the id/TOC contract that function's
 * tests pin down doesn't have to change shape.
 */
export const addHeadingAnchorLinks = (html) =>
  html.replace(/<(h[23]) id="([^"]+)">([\s\S]*?)<\/\1>/g, (_match, tag, id, inner) => {
    const label = decodeEntities(inner.replace(/<[^>]+>/g, '')).trim();
    const link = `<a class="heading-anchor" href="#${id}" aria-label="Link para a seção ${escapeAttribute(label)}">#</a>`;
    return `<${tag} id="${id}">${inner}${link}</${tag}>`;
  });

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The info string after a fence's language is normally discarded by marked's
// default renderer. This is the one place it survives, so a ```text fence
// can optionally carry `title="..."` for its figcaption — e.g.:
//   ```text title="Evidence Pipeline"
export const parseFenceInfo = (lang) => {
  const [language = '', ...rest] = (lang ?? '').trim().split(/\s+/);
  const title = rest.join(' ').match(/title="([^"]*)"/)?.[1];
  return { language, title };
};

/**
 * A marked `code` token renderer (`new Marked({ renderer: { code: renderCode } })`).
 *
 * Every fenced block in this repo's content is tagged ```text — they are
 * ASCII architecture diagrams, not source code (docs/SITE-EVOLUTION-PLAN.md
 * D13) — so it gets a labeled <figure> instead of a bare <pre>, with the
 * fence's own title when it declares one and a generic fallback otherwise.
 * A real ```language fence (actual code) renders as plain code, untouched,
 * for E3's build-time syntax highlighter.
 */
export const renderCode = ({ text, lang }) => {
  const { language, title } = parseFenceInfo(lang);
  const escaped = escapeHtml(text);

  if (language === 'text') {
    const caption = escapeHtml(title || 'Diagram');
    return `<figure class="diagram-frame"><figcaption class="diagram-frame__label">${caption}</figcaption><pre><code class="language-text">${escaped}</code></pre></figure>`;
  }

  const classAttr = language ? ` class="language-${escapeHtml(language)}"` : '';
  return `<pre><code${classAttr}>${escaped}</code></pre>`;
};

// A `display: block` table (the previous mobile-overflow fix) drops table
// semantics for parts of the AT tree. Wrapping the untouched <table> in a
// scrollable, labeled region keeps `display: table` intact instead.
export const wrapTables = (html) =>
  html.replace(
    /<table>([\s\S]*?)<\/table>/g,
    (_match, inner) =>
      `<div class="table-scroll" role="region" tabindex="0" aria-label="Tabela com rolagem horizontal"><table>${inner}</table></div>`,
  );

export const routeFor = (meta) =>
  meta.route ??
  {
    project: `/pt/work/${meta.slug}`,
    article: `/pt/writing/${meta.slug}`,
    lab: `/pt/labs/${meta.slug}`,
    decision: `/pt/engineering/decisions/${meta.slug}`,
  }[meta.type];
