// Mirrors tools/content/markdown.mjs's `slugify` exactly — both sides need
// to agree on the same tag → route-slug mapping. This one runs in the
// browser/prerender (ContentCard, ContentDetailPage, TopicPage); that one
// runs in the Node build (tools/content/build-content.mjs, which generates
// the topic routes this slug has to match).
export const slugifyTag = (tag: string): string =>
  tag
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
