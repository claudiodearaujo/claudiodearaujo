import { describe, expect, it } from 'vitest';
import { ContentRepository } from './content.repository';

describe('ContentRepository', () => {
  const repository = new ContentRepository();

  it('indexes the expected published content types', () => {
    expect(repository.list('project')).toHaveLength(3);
    expect(repository.list('article')).toHaveLength(3);
    expect(repository.list('lab')).toHaveLength(2);
    expect(repository.list('decision')).toHaveLength(3);
    expect(repository.list('page')).toHaveLength(4);
  });

  it('keeps publication routes unique', () => {
    const routes = repository.entries.map((entry) => entry.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('never returns the current entry as related content', () => {
    const entry = repository.list('project')[0];
    expect(entry).toBeDefined();
    const related = repository.related(entry!);
    expect(related.some((candidate) => candidate.route === entry!.route)).toBe(false);
  });
});
