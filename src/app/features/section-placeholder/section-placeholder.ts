import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-placeholder',
  imports: [RouterLink],
  template: `
    <section class="page-shell section-placeholder">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="lead">{{ description }}</p>
      <a class="text-link" routerLink="/pt">Voltar para a Home</a>
    </section>
  `,
})
export class SectionPlaceholder {
  private readonly route = inject(ActivatedRoute);
  protected readonly title = this.route.snapshot.data['title'] as string;
  protected readonly eyebrow = this.route.snapshot.data['eyebrow'] as string;
  protected readonly description = this.route.snapshot.data['description'] as string;
}
