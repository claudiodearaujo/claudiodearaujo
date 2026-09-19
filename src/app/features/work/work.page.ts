import { Component, inject } from '@angular/core';
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
  protected readonly experience = [
    [
      'Argos',
      'Developer Intelligence',
      'IA aplicada a desenvolvimento, conhecimento e colaboração técnica.',
    ],
    [
      'Enterprise AI',
      'Knowledge & Retrieval Systems',
      'RAG, embeddings, busca semântica e integração de conhecimento corporativo.',
    ],
    [
      'Financial Systems',
      'Enterprise Financial Engineering',
      'Sistemas críticos, crédito, segurança, observabilidade e integrações em ambiente financeiro.',
    ],
  ] as const;

  constructor() {
    this.seo.setPage(
      'Selected Work',
      'Projetos e sistemas que representam minha trajetória em engenharia.',
      'website',
      '/pt/work',
      '/og/site/work.png',
    );
  }
}
