import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentSummary } from '../../core/content/content.models';

@Component({
  selector: 'app-content-card',
  imports: [RouterLink],
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
})
export class ContentCard {
  readonly entry = input.required<ContentSummary>();

  // Statuses come from free-form frontmatter ("Active Research"), so they are slugified
  // rather than lowercased — a raw space would split into two classes and match the
  // wrong modifier.
  protected readonly statusModifier = computed(() => {
    const status = this.entry().status;
    return status ? `status-pill--${status.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : '';
  });
}
