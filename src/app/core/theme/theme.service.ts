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
    localStorage.setItem('theme', next);
    this.theme.set(next);
  }
}
