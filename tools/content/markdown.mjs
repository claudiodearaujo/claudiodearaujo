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

export const routeFor = (meta) =>
  meta.route ??
  {
    project: `/pt/work/${meta.slug}`,
    article: `/pt/writing/${meta.slug}`,
    lab: `/pt/labs/${meta.slug}`,
    decision: `/pt/engineering/decisions/${meta.slug}`,
  }[meta.type];
