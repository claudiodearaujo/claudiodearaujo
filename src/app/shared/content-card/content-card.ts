import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentSummary } from '../../core/content/content.models';
import { slugifyTag } from '../../core/content/slug.util';
import { MetadataRow } from '../metadata-row/metadata-row';

@Component({
  selector: 'app-content-card',
  imports: [RouterLink, MetadataRow],
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
})
export class ContentCard {
  readonly entry = input.required<ContentSummary>();

  protected topicRoute(tag: string): string {
    return `/pt/topics/${slugifyTag(tag)}`;
  }
}
