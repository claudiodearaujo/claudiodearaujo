import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './site-header.scss',
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  protected readonly links = [
    ['Work', '/pt/work'],
    ['Engineering', '/pt/engineering'],
    ['Labs', '/pt/labs'],
    ['Writing', '/pt/writing'],
    ['About', '/pt/about'],
    ['Now', '/pt/now'],
  ] as const;

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
