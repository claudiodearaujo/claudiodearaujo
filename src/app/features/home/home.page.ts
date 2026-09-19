import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { localizedPath } from '../../core/i18n/locale';
import { ContentRepository } from '../../core/content/content.repository';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  styleUrl: './home.page.scss',
  templateUrl: './home.page.html',
})
export class HomePage {
  private readonly seo = inject(SeoService);
  private readonly repository = inject(ContentRepository);

  protected readonly journey = [
    'Web',
    'Enterprise',
    'Architecture',
    'AI',
    'Agents',
    'Autonomous Systems',
  ] as const;

  // Driven by `featured: true` in front matter (docs/SITE-EVOLUTION-PLAN.md
  // D7) instead of a hand-kept copy of data the content entries already
  // carry — publishing a new project only means setting that flag, not
  // editing this file.
  protected readonly projects = this.repository.featured('project');

  // These name sections *inside* the single Engineering Principles document,
  // not separate content entries — there is no per-principle manifest row a
  // `featured` flag could select from, so this stays a hand-curated teaser
  // of that one page rather than a copy of data that lives elsewhere.
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

  protected readonly articles = this.repository.featured('article');

  constructor() {
    this.seo.setHome();
  }

  /** Links in this template are written relative to the locale — see
   *  core/i18n/locale.ts. */
  protected path(section = ''): string {
    return localizedPath(section);
  }
}
