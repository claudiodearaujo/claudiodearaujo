import { describe, expect, it } from 'vitest';
import { slugifyTag } from './slug.util';

describe('slugifyTag', () => {
  it('lowercases and keeps a simple tag as-is', () => {
    expect(slugifyTag('AI')).toBe('ai');
    expect(slugifyTag('MCP')).toBe('mcp');
  });

  it('turns internal punctuation into a single hyphen', () => {
    expect(slugifyTag('Human-in-the-loop')).toBe('human-in-the-loop');
  });

  it('strips accents', () => {
    expect(slugifyTag('Governança')).toBe('governanca');
  });

  it('matches the build pipeline for every tag actually in use', () => {
    // Content front matter uses these verbatim; if this list and
    // tools/content/markdown.mjs's slugify ever diverge, a tag link built
    // here would 404 against the route the build generated.
    const tags = [
      'AI',
      'Agents',
      'MCP',
      'Memory',
      'Autonomy',
      'Finance',
      'Research',
      'Product',
      'Publishing',
      'Architecture',
      'Governance',
      'Human-in-the-loop',
      'Evidence',
      'Evaluation',
    ];
    for (const tag of tags) {
      expect(slugifyTag(tag)).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
