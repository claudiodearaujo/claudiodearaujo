import { Component, input } from '@angular/core';
import { StatusBadge } from '../status-badge/status-badge';

/**
 * The type + status chip row repeated, with two slightly different gaps and
 * alignments, in ContentCard and ContentDetailPage. `justify="between"` is
 * the card layout (type left, status pinned right); the default is the
 * detail-page header layout (type and status sit together at the start).
 */
@Component({
  selector: 'app-metadata-row',
  imports: [StatusBadge],
  templateUrl: './metadata-row.html',
  styleUrl: './metadata-row.scss',
})
export class MetadataRow {
  readonly type = input.required<string>();
  readonly status = input<string>();
  readonly justify = input<'start' | 'between'>('start');
}
