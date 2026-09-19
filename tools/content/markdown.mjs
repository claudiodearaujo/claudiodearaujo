// Pure helpers shared by the content build. Kept free of I/O so they can be unit tested.

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

// Every fenced block in this repo's content is tagged ```text — they are
// ASCII architecture diagrams, not source code (see docs/SITE-EVOLUTION-PLAN.md
// D13). Framing them as a labeled figure instead of a bare <pre> gives them
// their own visual identity without inventing a new authoring syntax; a real
// ```language fence (actual code) is left untouched for E3's highlighter.
export const wrapDiagramBlocks = (html) =>
  html.replace(
    /<pre><code class="language-text">([\s\S]*?)<\/code><\/pre>/g,
    (_match, code) =>
      `<figure class="diagram-frame"><figcaption class="diagram-frame__label">Diagram</figcaption><pre><code class="language-text">${code}</code></pre></figure>`,
  );

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
