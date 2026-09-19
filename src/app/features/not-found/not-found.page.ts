import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { localizedPath } from '../../core/i18n/locale';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="page-shell section-placeholder">
      <p class="eyebrow">404</p>
      <h1>Página não encontrada</h1>
      <p class="lead">A página pode ter mudado ou nunca ter existido.</p>
      <div class="action-row">
        <a class="button button--primary" [routerLink]="homePath">Ir para a Home</a>
        <a class="button button--secondary" [routerLink]="workPath">Explorar trabalhos</a>
      </div>
    </section>
  `,
})
export class NotFoundPage {
  private readonly seo = inject(SeoService);

  protected readonly homePath = localizedPath();
  protected readonly workPath = localizedPath('work');

  constructor() {
    this.seo.setNotFound();
  }
}
