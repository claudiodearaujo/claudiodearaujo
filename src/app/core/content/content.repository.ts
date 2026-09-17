import { Injectable } from '@angular/core';
import { contentManifest } from '../../generated/content-manifest.generated';
import { ContentSummary, ContentType } from './content.models';

@Injectable({ providedIn: 'root' })
export class ContentRepository {
  readonly entries = contentManifest as readonly unknown[] as readonly ContentSummary[];

  list(type: ContentType): readonly ContentSummary[] {
    return this.entries.filter((entry) => entry.type === type);
  }

  related(entry: ContentSummary, limit = 3): readonly ContentSummary[] {
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
}
