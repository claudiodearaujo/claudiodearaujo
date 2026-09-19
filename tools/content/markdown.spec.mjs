import { describe, expect, it } from 'vitest';
import { decodeEntities, routeFor, slugify, uniqueId, withHeadingAnchors } from './markdown.mjs';

describe('decodeEntities', () => {
  it('decodes the named entities marked emits', () => {
    expect(decodeEntities('AI &amp; Systems')).toBe('AI & Systems');
    expect(decodeEntities('&lt;boundary&gt;')).toBe('<boundary>');
    expect(decodeEntities('&quot;evidence&quot;')).toBe('"evidence"');
  });

  it('decodes decimal and hexadecimal references', () => {
    expect(decodeEntities('What I&#39;m exploring')).toBe("What I'm exploring");
    expect(decodeEntities('What I&#x27;m exploring')).toBe("What I'm exploring");
  });

  it('leaves unknown entities untouched', () => {
    expect(decodeEntities('&unknownentity;')).toBe('&unknownentity;');
  });

  it('does not re-decode the output of a previous decode', () => {
    expect(decodeEntities('&amp;lt;')).toBe('&lt;');
  });
});

describe('slugify', () => {
  it('strips accents and lowercases', () => {
    expect(slugify('Decisões de Arquitetura')).toBe('decisoes-de-arquitetura');
  });

  it('drops apostrophes instead of turning them into separators', () => {
    expect(slugify("What I'm exploring next")).toBe('what-im-exploring-next');
    expect(slugify('What I’m exploring next')).toBe('what-im-exploring-next');
  });

  it('collapses punctuation and trims edge separators', () => {
    expect(slugify('  AI, Agents & Autonomy!  ')).toBe('ai-agents-autonomy');
  });

  it('returns an empty string when nothing sluggable remains', () => {
    expect(slugify('— · —')).toBe('');
  });
});

describe('uniqueId', () => {
  it('returns the base id the first time', () => {
    expect(uniqueId('narration', new Set())).toBe('narration');
  });

  it('suffixes repeated ids instead of colliding', () => {
    const used = new Set();
    expect(uniqueId('narration', used)).toBe('narration');
    expect(uniqueId('narration', used)).toBe('narration-2');
    expect(uniqueId('narration', used)).toBe('narration-3');
  });

  it('falls back to a placeholder when the slug is empty', () => {
    const used = new Set();
    expect(uniqueId('', used)).toBe('section');
    expect(uniqueId('', used)).toBe('section-2');
  });

  it('skips a suffix already taken by a literal heading', () => {
    const used = new Set(['retry', 'retry-2']);
    expect(uniqueId('retry', used)).toBe('retry-3');
  });
});

describe('withHeadingAnchors', () => {
  it('anchors h2 and h3 and collects them in document order', () => {
    const { html, headings } = withHeadingAnchors('<h2>Overview</h2><p>x</p><h3>Details</h3>');

    expect(html).toBe('<h2 id="overview">Overview</h2><p>x</p><h3 id="details">Details</h3>');
    expect(headings).toEqual([
      { level: 2, id: 'overview', text: 'Overview' },
      { level: 3, id: 'details', text: 'Details' },
    ]);
  });

  it('decodes entities for both the anchor and the table-of-contents label', () => {
    const { html, headings } = withHeadingAnchors('<h2>What I&#39;m working on now</h2>');

    expect(html).toContain('id="what-im-working-on-now"');
    expect(headings[0].text).toBe("What I'm working on now");
  });

  it('keeps the original inner markup untouched', () => {
    const { html, headings } = withHeadingAnchors('<h2>The <code>Retry</code> path</h2>');

    expect(html).toBe('<h2 id="the-retry-path">The <code>Retry</code> path</h2>');
    expect(headings[0].text).toBe('The Retry path');
  });

  it('deduplicates ids when a heading repeats', () => {
    const { headings } = withHeadingAnchors('<h2>Narration</h2><h3>Narration</h3>');

    expect(headings.map((heading) => heading.id)).toEqual(['narration', 'narration-2']);
  });

  it('handles headings that span multiple lines', () => {
    const { headings } = withHeadingAnchors('<h2>Evidence\nBefore Autonomy</h2>');

    expect(headings).toEqual([
      { level: 2, id: 'evidence-before-autonomy', text: 'Evidence\nBefore Autonomy' },
    ]);
  });

  it('does not match across mismatched heading levels', () => {
    const { headings } = withHeadingAnchors('<h2>Open</h2><p>body</p><h3>Close</h3>');

    expect(headings).toHaveLength(2);
  });

  it('ignores h1 and h4, which are not part of the table of contents', () => {
    const { html, headings } = withHeadingAnchors('<h1>Title</h1><h4>Aside</h4>');

    expect(headings).toEqual([]);
    expect(html).toBe('<h1>Title</h1><h4>Aside</h4>');
  });
});

describe('routeFor', () => {
  it('derives the route from the content type', () => {
    expect(routeFor({ type: 'project', slug: 'lucyos' })).toBe('/pt/work/lucyos');
    expect(routeFor({ type: 'article', slug: 'evidence' })).toBe('/pt/writing/evidence');
    expect(routeFor({ type: 'lab', slug: 'memory' })).toBe('/pt/labs/memory');
    expect(routeFor({ type: 'decision', slug: 'mcp-first' })).toBe(
      '/pt/engineering/decisions/mcp-first',
    );
  });

  it('prefers an explicit route from the front matter', () => {
    expect(routeFor({ type: 'project', slug: 'lucyos', route: '/pt/custom' })).toBe('/pt/custom');
  });

  it('has no derived route for pages, which must declare one', () => {
    expect(routeFor({ type: 'page', slug: 'about' })).toBeUndefined();
  });
});
