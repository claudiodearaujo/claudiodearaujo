import { Component, inject } from '@angular/core';
import { localizedPath } from '../../core/i18n/locale';
import { ContentRepository } from '../../core/content/content.repository';
import { SeoService } from '../../core/seo/seo.service';
import { ContentCard } from '../../shared/content-card/content-card';

@Component({
  selector: 'app-work-page',
  imports: [ContentCard],
  templateUrl: './work.page.html',
  styleUrl: './work.page.scss',
})
export class WorkPage {
  private readonly repository = inject(ContentRepository);
  private readonly seo = inject(SeoService);

  protected readonly projects = this.repository.list('project');

  // Argos, Enterprise AI and Financial Systems were placeholder cards here
  // with no link and no real source material to write a short case from
  // (see docs/SITE-EVOLUTION-PLAN.md D12) — UX-WIREFRAMES.md §26 is explicit
  // that a category without enough content should not appear at all, rather
  // than show as a "coming soon" filler. Removed until there's real content
  // to publish for them.

  constructor() {
    this.seo.setPage(
      'Selected Work',
      'Projetos e sistemas que representam minha trajetória em engenharia.',
      'website',
      localizedPath('work'),
      '/og/site/work.png',
    );
  }
}
