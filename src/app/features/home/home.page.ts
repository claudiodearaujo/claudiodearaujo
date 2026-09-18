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
  ] as const;

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

  protected readonly deliveryFlow = [
    'Problem',
    'Product',
    'Architecture',
    'Frontend',
    'Backend',
    'Data',
    'Infrastructure',
    'Observability',
    'Governance',
    'Production',
  ] as const;

  protected readonly leadership = [
    'Technical direction',
    'Architecture reviews',
    'Problem decomposition',
    'Engineering standards',
    'Documentation',
    'Risk management',
  ] as const;

  protected readonly exploring = [
    ['Agentic AI', 'Agentes usando contexto, ferramentas e conhecimento de forma confiável.'],
    ['MCP', 'Boundaries consistentes entre inteligência e capacidades externas.'],
    ['Long-Term Memory', 'Memória útil sem transformar contexto acumulado em ruído.'],
    ['AI Evaluation', 'Evidência objetiva sobre comportamento, qualidade e segurança.'],
    ['AI Governance', 'Authority, auditabilidade, supervisão e autonomia progressiva.'],
    ['Human-AI Collaboration', 'Automação que amplia capacidade humana sem remover controle.'],
  ] as const;

  protected readonly articles = [
    [
      'AI Agents Need Architecture, Not Just Prompts',
      'Por que agentes confiáveis exigem muito mais do que bons prompts.',
      '/pt/writing/ai-agents-need-architecture',
    ],
    [
      'From Automation to Autonomy',
      'Automatizar uma tarefa e delegar uma decisão são problemas diferentes.',
      '/pt/writing/from-automation-to-autonomy',
    ],
    [
      'Evidence Before Autonomy',
      'Por que sistemas inteligentes deveriam conquistar autoridade através de evidência.',
      '/pt/writing/evidence-before-autonomy',
    ],
  ] as const;

  constructor() {
    this.seo.setHome();
  }
}
