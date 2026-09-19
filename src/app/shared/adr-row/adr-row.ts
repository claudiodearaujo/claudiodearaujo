import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentSummary } from '../../core/content/content.models';
import { StatusBadge } from '../status-badge/status-badge';

/**
 * One row of the ADR index — a dense, scannable list rather than a card grid
 * (UX-WIREFRAMES.md §10: "Evitar cards grandes. ADRs funcionam melhor como
 * lista editorial densa"), per docs/SITE-EVOLUTION-PLAN.md D10.
 */
@Component({
  selector: 'app-adr-row',
  imports: [RouterLink, StatusBadge],
  templateUrl: './adr-row.html',
  styleUrl: './adr-row.scss',
})
export class AdrRow {
  readonly entry = input.required<ContentSummary>();
  /** Chronological position (oldest = 1), independent of display order. */
  readonly id = input.required<number>();
}
