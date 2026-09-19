import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentSummary } from '../../core/content/content.models';
import { ContentRepository } from '../../core/content/content.repository';
import { slugifyTag } from '../../core/content/slug.util';
import { MetadataRow } from '../metadata-row/metadata-row';

@Component({
  selector: 'app-content-card',
  imports: [RouterLink, MetadataRow],
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
})
export class ContentCard {
  private readonly repository = inject(ContentRepository);

  readonly entry = input.required<ContentSummary>();

  protected hasTopic(tag: string): boolean {
    return this.repository.hasTopic(tag);
  }

  protected topicRoute(tag: string): string {
    return `/pt/topics/${slugifyTag(tag)}`;
  }
}
