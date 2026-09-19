import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  readonly theme = signal<Theme>('dark');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    const current = this.document.documentElement.dataset['theme'];
    this.theme.set(current === 'light' ? 'light' : 'dark');
  }

  toggle(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.document.documentElement.dataset['theme'] = next;
    this.persist(next);
    this.theme.set(next);
  }

  // Storage throws in private mode and when site data is blocked; the choice is
  // still applied to the document, it just does not survive a reload.
  private persist(theme: Theme): void {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* the data-theme attribute already carries the choice for this page */
    }
  }
}
