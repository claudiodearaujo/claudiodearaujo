import { describe, expect, it } from 'vitest';
import { ContentType } from './content.models';
import { ContentRepository } from './content.repository';

const types: readonly ContentType[] = ['project', 'article', 'lab', 'decision', 'page'];

describe('ContentRepository', () => {
  const repository = new ContentRepository();

  it('publishes at least one entry for every content type', () => {
    for (const type of types) {
      expect(
        repository.list(type).length,
        `no published content of type "${type}"`,
      ).toBeGreaterThan(0);
    }
  });

  it('indexes every entry under exactly one type', () => {
    const indexed = types.flatMap((type) => repository.list(type));
    expect(indexed).toHaveLength(repository.entries.length);
  });

  it('only returns entries of the requested type', () => {
    for (const type of types) {
      expect(repository.list(type).every((entry) => entry.type === type)).toBe(true);
    }
  });

  it('keeps publication routes unique', () => {
    const routes = repository.entries.map((entry) => entry.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('exposes the metadata every page and card renders', () => {
    for (const entry of repository.entries) {
      expect(entry.title.trim(), `${entry.route} has no title`).not.toBe('');
      expect(entry.summary.trim(), `${entry.route} has no summary`).not.toBe('');
      expect(entry.route, `${entry.route} is not a /pt route`).toMatch(/^\/pt(\/|$)/);
    }
  });

  it('never returns the current entry as related content', () => {
    for (const entry of repository.entries) {
      const related = repository.related(entry);
      expect(related.some((candidate) => candidate.route === entry.route)).toBe(false);
    }
  });

  it('only relates entries that share at least one tag', () => {
    for (const entry of repository.entries) {
      const tags = new Set(entry.tags.map((tag) => tag.toLowerCase()));
      for (const candidate of repository.related(entry)) {
        expect(
          candidate.tags.some((tag) => tags.has(tag.toLowerCase())),
          `${candidate.route} is unrelated to ${entry.route}`,
        ).toBe(true);
      }
    }
  });

  it('honours the related-content limit', () => {
    const entry = repository.entries[0];
    expect(entry).toBeDefined();
    expect(repository.related(entry!, 1).length).toBeLessThanOrEqual(1);
    expect(repository.related(entry!).length).toBeLessThanOrEqual(3);
  });
});
