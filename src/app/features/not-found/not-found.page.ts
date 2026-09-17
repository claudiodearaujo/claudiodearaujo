import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="page-shell section-placeholder">
      <p class="eyebrow">404</p>
      <h1>Página não encontrada</h1>
      <p class="lead">A página pode ter mudado ou nunca ter existido.</p>
      <div class="action-row">
        <a class="button button--primary" routerLink="/pt">Ir para a Home</a>
        <a class="button button--secondary" routerLink="/pt/work">Explorar trabalhos</a>
      </div>
    </section>
  `,
})
export class NotFoundPage {}
