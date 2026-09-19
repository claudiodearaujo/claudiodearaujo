import { describe, expect, it } from 'vitest';
import { buildOgTree, categoryLabelFor, OG_HEIGHT, OG_WIDTH } from './template.mjs';

describe('categoryLabelFor', () => {
  it('maps each content type to its display label', () => {
    expect(categoryLabelFor('project')).toBe('Project');
    expect(categoryLabelFor('article')).toBe('Article');
    expect(categoryLabelFor('lab')).toBe('Lab');
    expect(categoryLabelFor('decision')).toBe('Architecture Decision');
  });

  it('has no label for a standalone page', () => {
    expect(categoryLabelFor('page')).toBe('');
  });

  it('falls back to an empty label for an unknown type', () => {
    expect(categoryLabelFor('unknown')).toBe('');
  });
});

describe('buildOgTree', () => {
  const flatten = (node) => {
    if (typeof node === 'string') return [node];
    const children = node?.props?.children;
    if (Array.isArray(children)) return children.flatMap(flatten);
    if (children != null) return flatten(children);
    return [];
  };

  it('renders at the canvas size Satori and resvg are called with', () => {
    const tree = buildOgTree({ title: 'LucyOS', summary: 'x' });
    expect(tree.props.style.width).toBe(OG_WIDTH);
    expect(tree.props.style.height).toBe(OG_HEIGHT);
    expect(OG_WIDTH).toBe(1200);
    expect(OG_HEIGHT).toBe(630);
  });

  it('includes the title, summary and brand text', () => {
    const tree = buildOgTree({ category: 'Project', title: 'LucyOS', summary: 'Agentic AI.' });
    const text = flatten(tree);

    expect(text).toContain('LucyOS');
    expect(text).toContain('Agentic AI.');
    expect(text).toContain('Cláudio Araújo');
    expect(text).toContain('claudiodearaujo.dev.br');
    expect(text).toContain('Project');
  });

  it('omits the category row entirely when there is none', () => {
    const tree = buildOgTree({ title: 'Now', summary: 'x' });
    const text = flatten(tree);

    expect(text).not.toContain('Project');
    expect(text).toContain('Now');
  });

  it('shrinks the title for long titles so it stays legible', () => {
    const short = buildOgTree({ title: 'LucyOS', summary: 'x' });
    const long = buildOgTree({
      title: 'Why Human Control Belongs in the Architecture?',
      summary: 'x',
    });

    // The summary block is always last; the title is always right before it,
    // whether or not a category row precedes them.
    const titleStyle = (tree) => tree.props.children[1].props.children.at(-2).props.style;
    expect(titleStyle(short).fontSize).toBeGreaterThan(titleStyle(long).fontSize);
  });
});
