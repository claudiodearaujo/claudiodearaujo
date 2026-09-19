import { Component, inject } from '@angular/core';
import { ContentSummary } from '../../core/content/content.models';
import { ContentRepository } from '../../core/content/content.repository';
import { SeoService } from '../../core/seo/seo.service';
import { AdrRow } from '../../shared/adr-row/adr-row';

@Component({
  selector: 'app-engineering-decisions-page',
  imports: [AdrRow],
  templateUrl: './engineering-decisions.page.html',
  styleUrl: './engineering-decisions.page.scss',
})
export class EngineeringDecisionsPage {
  private readonly repository = inject(ContentRepository);
  private readonly seo = inject(SeoService);

  // Displayed newest first (list()'s usual order), but each row's own
  // "ADR-00N" id is chronological (oldest = 1) and stays fixed regardless of
  // that display order — an ADR's number is its identity, not its rank.
  protected readonly decisions = this.repository.list('decision');
  private readonly idByRoute = new Map(
    [...this.decisions]
      .sort((a, b) => (a.publishedAt ?? '').localeCompare(b.publishedAt ?? ''))
      .map((entry, index) => [entry.route, index + 1]),
  );

  constructor() {
    this.seo.setPage(
      'Architecture Decisions',
      'Decisões técnicas públicas, com contexto, alternativas e consequências.',
      'website',
      '/pt/engineering/decisions',
      '/og/site/engineering-decisions.png',
    );
  }

  protected idFor(entry: ContentSummary): number {
    return this.idByRoute.get(entry.route) ?? 0;
  }
}
