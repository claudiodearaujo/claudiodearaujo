import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentRepository } from '../../core/content/content.repository';
import { SeoService } from '../../core/seo/seo.service';
import { ContentCard } from '../../shared/content-card/content-card';

@Component({
  selector: 'app-engineering-page',
  imports: [RouterLink, ContentCard],
  templateUrl: './engineering.page.html',
  styleUrl: './engineering.page.scss',
})
export class EngineeringPage {
  private readonly repository = inject(ContentRepository);
  private readonly seo = inject(SeoService);
  protected readonly decisions = this.repository.list('decision');

  constructor() {
    this.seo.setPage(
      'How I Engineer',
      'Princípios, decisões e práticas que orientam meu trabalho.',
      'website',
      '/pt/engineering',
      '/og/site/engineering.png',
    );
  }
}
