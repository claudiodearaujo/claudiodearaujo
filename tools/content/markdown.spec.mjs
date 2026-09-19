import { describe, expect, it } from 'vitest';
import {
  escapeXml,
  wordCount,
  addHeadingAnchorLinks,
  decodeEntities,
  parseFenceInfo,
  readingTimeMinutes,
  renderCode,
  routeFor,
  slugify,
  uniqueId,
  withHeadingAnchors,
  wrapTables,
} from './markdown.mjs';

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

describe('addHeadingAnchorLinks', () => {
  it('appends a permalink pointing at the heading id', () => {
    const html = addHeadingAnchorLinks('<h2 id="overview">Overview</h2>');

    expect(html).toBe(
      '<h2 id="overview">Overview<a class="heading-anchor" href="#overview" aria-label="Link para a seção Overview">#</a></h2>',
    );
  });

  it('leaves headings without an id untouched', () => {
    expect(addHeadingAnchorLinks('<h2>No id</h2>')).toBe('<h2>No id</h2>');
  });

  it('strips inner markup and decodes entities for the aria-label', () => {
    const html = addHeadingAnchorLinks(
      '<h3 id="x">The <code>Retry</code> &amp; Fallback path</h3>',
    );

    expect(html).toContain('aria-label="Link para a seção The Retry &amp; Fallback path"');
  });

  it('escapes a literal quote in the heading text for the attribute', () => {
    const html = addHeadingAnchorLinks('<h2 id="x">Say &quot;hi&quot;</h2>');

    expect(html).toContain('aria-label="Link para a seção Say &quot;hi&quot;"');
  });
});

describe('parseFenceInfo', () => {
  it('reads the language alone when there is no extra info', () => {
    expect(parseFenceInfo('text')).toEqual({ language: 'text', title: undefined });
  });

  it('reads an optional title out of the rest of the info string', () => {
    expect(parseFenceInfo('text title="Evidence Pipeline"')).toEqual({
      language: 'text',
      title: 'Evidence Pipeline',
    });
  });

  it('handles a missing info string', () => {
    expect(parseFenceInfo(undefined)).toEqual({ language: '', title: undefined });
    expect(parseFenceInfo('')).toEqual({ language: '', title: undefined });
  });
});

describe('renderCode', () => {
  it('wraps a ```text fence in a figure with a generic label by default', () => {
    const html = renderCode({ text: 'A -> B', lang: 'text' });

    expect(html).toBe(
      '<figure class="diagram-frame"><figcaption class="diagram-frame__label">Diagram</figcaption>' +
        '<pre><code class="language-text">A -&gt; B</code></pre></figure>',
    );
  });

  it('uses the fence title as the figcaption when the fence declares one', () => {
    const html = renderCode({ text: 'A -> B', lang: 'text title="Evidence Pipeline"' });

    expect(html).toContain(
      '<figcaption class="diagram-frame__label">Evidence Pipeline</figcaption>',
    );
  });

  it('escapes both the code and the title', () => {
    const html = renderCode({ text: 'x < y', lang: 'text title="A & B"' });

    expect(html).toContain('<figcaption class="diagram-frame__label">A &amp; B</figcaption>');
    expect(html).toContain('<code class="language-text">x &lt; y</code>');
  });

  it('renders a real code fence as plain code, not a diagram figure', () => {
    const html = renderCode({ text: 'const x = 1;', lang: 'ts' });

    expect(html).toBe('<pre><code class="language-ts">const x = 1;</code></pre>');
  });

  it('renders an unfenced or language-less block without a class', () => {
    expect(renderCode({ text: 'plain', lang: '' })).toBe('<pre><code>plain</code></pre>');
  });
});

describe('wrapTables', () => {
  it('wraps a table in a scrollable, labeled region', () => {
    const html = wrapTables('<table><tr><td>1</td></tr></table>');

    expect(html).toBe(
      '<div class="table-scroll" role="region" tabindex="0" aria-label="Tabela com rolagem horizontal">' +
        '<table><tr><td>1</td></tr></table></div>',
    );
  });

  it('leaves content without a table untouched', () => {
    expect(wrapTables('<p>No table</p>')).toBe('<p>No table</p>');
  });
});

describe('readingTimeMinutes', () => {
  it('rounds up to the nearest whole minute', () => {
    expect(readingTimeMinutes(Array(199).fill('word').join(' '))).toBe(1);
    expect(readingTimeMinutes(Array(201).fill('word').join(' '))).toBe(2);
    expect(readingTimeMinutes(Array(400).fill('word').join(' '))).toBe(2);
  });

  it('never reports less than one minute, even for a single word', () => {
    expect(readingTimeMinutes('word')).toBe(1);
    expect(readingTimeMinutes('')).toBe(1);
  });

  it('collapses repeated whitespace instead of counting empty words', () => {
    expect(readingTimeMinutes('word   word\n\nword')).toBe(1);
  });
});

describe('routeFor', () => {
  it('derives the route from the locale and the content type', () => {
    expect(routeFor({ locale: 'pt', type: 'project', slug: 'lucyos' })).toBe('/pt/work/lucyos');
    expect(routeFor({ locale: 'pt', type: 'article', slug: 'evidence' })).toBe(
      '/pt/writing/evidence',
    );
    expect(routeFor({ locale: 'pt', type: 'lab', slug: 'memory' })).toBe('/pt/labs/memory');
    expect(routeFor({ locale: 'pt', type: 'decision', slug: 'mcp-first' })).toBe(
      '/pt/engineering/decisions/mcp-first',
    );
  });

  it('puts the same file under its own locale, with no other change', () => {
    expect(routeFor({ locale: 'en', type: 'article', slug: 'evidence' })).toBe(
      '/en/writing/evidence',
    );
    expect(routeFor({ locale: 'en', type: 'page', slug: 'about' })).toBe('/en/about');
  });

  it('falls back to the slug for a page that declares no route', () => {
    expect(routeFor({ locale: 'pt', type: 'page', slug: 'about' })).toBe('/pt/about');
  });

  it('prefixes an explicit route with the locale, so content never names one', () => {
    expect(
      routeFor({
        locale: 'pt',
        type: 'page',
        slug: 'engineering-principles',
        route: 'engineering/principles',
      }),
    ).toBe('/pt/engineering/principles');
  });

  it('tolerates a leading slash on an explicit route rather than doubling it', () => {
    expect(routeFor({ locale: 'pt', type: 'page', slug: 'x', route: '/custom' })).toBe(
      '/pt/custom',
    );
  });
});
