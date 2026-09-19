import { Component, computed, input } from '@angular/core';

export type StatusCategory = 'active' | 'accepted' | 'research' | 'neutral';

// Content only ever declares status as free text in front matter ("Active",
// "Accepted", "Active Research", "Current", ...), so the shape is derived
// from a keyword match rather than a closed enum. Order matters: a settled
// outcome outranks "active", and "research" outranks a bare "active" so
// "Active Research" (Labs) reads as research, not as a running project.
const categoryFor = (status: string): StatusCategory => {
  const value = status.toLowerCase();
  if (value.includes('accepted') || value.includes('completed')) return 'accepted';
  if (value.includes('research') || value.includes('draft') || value.includes('experiment')) {
    return 'research';
  }
  if (value.includes('active') || value.includes('current')) return 'active';
  return 'neutral';
};

/**
 * Status text paired with a shape, never color alone (Visual §30): a
 * colorblind reader, or a print of the page, still tells the four
 * categories apart by the mark's form.
 */
@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  readonly status = input.required<string>();
  protected readonly category = computed(() => categoryFor(this.status()));
}
