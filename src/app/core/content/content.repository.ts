import { Injectable } from '@angular/core';
import { contentManifest } from '../../generated/content-manifest.generated';
import { ContentSummary, ContentType } from './content.models';
import { DEFAULT_LOCALE, Locale } from '../i18n/locale';
import { slugifyTag } from './slug.util';

// Entries without a publishedAt (an ongoing project has no single "publish
// date") compare equal to each other here and fall back to Array.sort's
// stability, keeping the manifest's own route-alphabetical order among them.
const byDateDescending = (a: ContentSummary, b: ContentSummary): number =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');

@Injectable({ providedIn: 'root' })
export class ContentRepository {
  readonly entries: readonly ContentSummary[] = contentManifest;

  /**
   * Newest first (docs/SITE-EVOLUTION-PLAN.md D8 — replaces the old
   * route-alphabetical ordering). Undated entries (projects have no single
   * "publish date") have nothing to sort by and keep the manifest's own
   * order, which is itself route-alphabetical and stable.
   */
  list(type: ContentType): readonly ContentSummary[] {
    return this.entries.filter((entry) => entry.type === type).sort(byDateDescending);
  }

  /**
   * Entries promoted into the Home narrative (`featured: true` in front
   * matter) — see docs/SITE-EVOLUTION-PLAN.md D7.
   */
  featured(type?: ContentType): readonly ContentSummary[] {
    return this.entries
      .filter((entry) => entry.featured && (!type || entry.type === type))
      .sort(byDateDescending);
  }

  related(entry: ContentSummary, limit = 3): readonly ContentSummary[] {
    // An explicit editorial cross-reference (front matter `related`, checked
    // at build time against the manifest) always wins over the tag-overlap
    // guess below.
    if (entry.relatedRoutes.length) {
      return entry.relatedRoutes
        .map((route) => this.entries.find((candidate) => candidate.route === route))
        .filter((candidate): candidate is ContentSummary => candidate !== undefined)
        .slice(0, limit);
    }

    const tags = new Set(entry.tags.map((tag) => tag.toLowerCase()));
    return this.entries
      .filter((candidate) => candidate.route !== entry.route)
      .map((candidate) => ({
        candidate,
        score: candidate.tags.filter((tag) => tags.has(tag.toLowerCase())).length,
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ candidate }) => candidate);
  }

  /**
   * Every entry in `locale` tagged with `tagSlug` (matched via slugifyTag,
   * case- and accent-insensitively) — what a topic page lists.
   *
   * Scoped to one locale because the routes are: a Portuguese and an English
   * article sharing a tag are two topic pages, and mixing them would list
   * content the reader cannot read.
   */
  byTopic(tagSlug: string, locale: Locale = DEFAULT_LOCALE): readonly ContentSummary[] {
    return this.entries
      .filter(
        (entry) => entry.locale === locale && entry.tags.some((tag) => slugifyTag(tag) === tagSlug),
      )
      .sort(byDateDescending);
  }

  /**
   * Whether `tag` has a topic page to link to. Mirrors the threshold
   * tools/content/build-content.mjs applies when generating the routes: a
   * tag used by a single entry gets no page, so linking it would 404.
   * content.repository.spec.ts checks the two stay in agreement.
   */
  hasTopic(tag: string, locale: Locale = DEFAULT_LOCALE): boolean {
    return this.byTopic(slugifyTag(tag), locale).length >= 2;
  }

  /** The tag's original spelling, for the topic page's own title. */
  labelForTopic(tagSlug: string, locale: Locale = DEFAULT_LOCALE): string | undefined {
    for (const entry of this.entries.filter((candidate) => candidate.locale === locale)) {
      const match = entry.tags.find((tag) => slugifyTag(tag) === tagSlug);
      if (match) return match;
    }
    return undefined;
  }
}
