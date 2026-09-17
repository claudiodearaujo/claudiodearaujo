import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
})
export class HomePage {
  private readonly seo = inject(SeoService);

  protected readonly journey = [
    'Web',
    'Enterprise',
    'Architecture',
    'AI',
    'Agents',
    'Autonomous Systems',
  ];

  protected readonly projects = [
    [
      'LucyOS',
      'Personal Agentic AI Platform',
      'Agentes, memória, conhecimento, ferramentas e MCP.',
      '/pt/work/lucyos',
    ],
    [
      'Invest Lucy',
      'Evidence-Driven Autonomous Research',
      'Autonomia progressiva sustentada por evidência, risco e governança.',
      '/pt/work/invest-lucy',
    ],
    [
      'Livrya',
      'AI-Powered Publishing Platform',
      'Produto editorial com IA, colaboração, publicação e áudio.',
      '/pt/work/livrya',
    ],
    [
      'Enterprise AI',
      'Knowledge & Retrieval Systems',
      'RAG, embeddings e integração de conhecimento corporativo.',
      '/pt/work',
    ],
  ] as const;

  protected readonly principles = [
    'Evidence Before Autonomy',
    'AI is a System, Not a Prompt',
    'Observability by Design',
    'Human-in-the-loop',
    'Replaceable Boundaries',
    'Documentation is Engineering',
  ] as const;

  constructor() {
    this.seo.setHome();
  }
}
