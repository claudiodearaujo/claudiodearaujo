import { describe, expect, it } from 'vitest';
import { topicRoutes } from '../../generated/topic-routes.generated';
import { ContentType } from './content.models';
import { ContentRepository } from './content.repository';
import { slugifyTag } from './slug.util';

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

  it('sorts dated entries newest first', () => {
    for (const type of ['article', 'lab', 'decision'] as const) {
      const dates = repository.list(type).map((entry) => entry.publishedAt);
      expect(dates).toEqual([...dates].sort().reverse());
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

  it('only relates entries that share at least one tag, absent an explicit related list', () => {
    for (const entry of repository.entries.filter((candidate) => !candidate.relatedRoutes.length)) {
      const tags = new Set(entry.tags.map((tag) => tag.toLowerCase()));
      for (const candidate of repository.related(entry)) {
        expect(
          candidate.tags.some((tag) => tags.has(tag.toLowerCase())),
          `${candidate.route} is unrelated to ${entry.route}`,
        ).toBe(true);
      }
    }
  });

  it('prefers an explicit `related` front-matter list over the tag guess', () => {
    const entry = repository.entries.find((candidate) => candidate.relatedRoutes.length > 0);
    expect(entry, 'no fixture entry declares `related`').toBeDefined();

    const related = repository.related(entry!);
    expect(related.map((candidate) => candidate.route)).toEqual(
      entry!.relatedRoutes.slice(0, related.length),
    );
  });

  it('honours the related-content limit', () => {
    const entry = repository.entries[0];
    expect(entry).toBeDefined();
    expect(repository.related(entry!, 1).length).toBeLessThanOrEqual(1);
    expect(repository.related(entry!).length).toBeLessThanOrEqual(3);
  });

  describe('byTopic', () => {
    it('finds every entry that declares the given tag, case- and accent-insensitively', () => {
      const [sample] = repository.entries.filter((entry) => entry.tags.length > 0);
      expect(sample, 'no fixture entry has any tags').toBeDefined();
      const tag = sample!.tags[0]!;

      const bySlug = repository.byTopic(tag.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''));
      expect(bySlug.some((entry) => entry.route === sample!.route)).toBe(true);
      expect(bySlug.every((entry) => entry.tags.some((candidate) => candidate === tag))).toBe(true);
    });

    it('returns nothing for a tag no content declares', () => {
      expect(repository.byTopic('not-a-real-tag')).toEqual([]);
    });
  });

  describe('hasTopic', () => {
    const generatedTopicRoutes = new Set(topicRoutes.map((route) => `/${route.path}`));

    // The build generates one route per tag above a minimum entry count, and
    // the UI decides independently whether to render that tag as a link. If
    // the two rules ever drift, tags start linking to 404s.
    it('agrees with the topic routes the build generated, for every tag in use', () => {
      for (const entry of repository.entries) {
        for (const tag of entry.tags) {
          expect(
            repository.hasTopic(tag),
            `tag "${tag}" (${entry.route}) disagrees with the generated routes`,
          ).toBe(generatedTopicRoutes.has(`/pt/topics/${slugifyTag(tag)}`));
        }
      }
    });

    it('rejects a tag that only one entry uses', () => {
      const counts = new Map<string, number>();
      for (const entry of repository.entries) {
        for (const tag of entry.tags) {
          const slug = slugifyTag(tag);
          counts.set(slug, (counts.get(slug) ?? 0) + 1);
        }
      }
      const [lonely] = [...counts.entries()].find(([, count]) => count === 1) ?? [];
      expect(lonely, 'no single-use tag in the fixture').toBeDefined();
      expect(repository.hasTopic(lonely!)).toBe(false);
    });
  });

  describe('labelForTopic', () => {
    it('returns the original spelling for a known tag slug', () => {
      expect(repository.labelForTopic('mcp')).toBe('MCP');
    });

    it('returns undefined for a slug nothing declares', () => {
      expect(repository.labelForTopic('not-a-real-tag')).toBeUndefined();
    });
  });

  describe('featured', () => {
    it('only returns entries marked featured: true', () => {
      for (const entry of repository.featured()) {
        expect(entry.featured, `${entry.route} is not featured`).toBe(true);
      }
    });

    it('narrows by type when one is given', () => {
      for (const entry of repository.featured('article')) {
        expect(entry.type).toBe('article');
      }
    });

    it('sorts dated entries newest first', () => {
      const dated = repository.featured('article').filter((entry) => entry.publishedAt);
      const dates = dated.map((entry) => entry.publishedAt);
      expect(dates).toEqual([...dates].sort().reverse());
    });
  });
});
