import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentSummary } from '../../core/content/content.models';
import { MetadataRow } from '../metadata-row/metadata-row';

@Component({
  selector: 'app-content-card',
  imports: [RouterLink, MetadataRow],
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
})
export class ContentCard {
  readonly entry = input.required<ContentSummary>();
}
