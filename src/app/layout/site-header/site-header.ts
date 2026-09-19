import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './site-header.scss',
  templateUrl: './site-header.html',
  host: { '(document:keydown)': 'handleDocumentKeydown($event)' },
})
export class SiteHeader {
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly mobileNav = viewChild<ElementRef<HTMLElement>>('mobileNav');

  protected readonly links = [
    ['Work', '/pt/work'],
    ['Engineering', '/pt/engineering'],
    ['Labs', '/pt/labs'],
    ['Writing', '/pt/writing'],
    ['About', '/pt/about'],
    ['Now', '/pt/now'],
  ] as const;

  protected toggleMenu(): void {
    const opening = !this.menuOpen();
    this.menuOpen.set(opening);
    if (opening) {
      setTimeout(() => this.focusFirstMenuItem());
    }
  }

  protected closeMenu(returnFocus = false): void {
    this.menuOpen.set(false);
    if (returnFocus) {
      queueMicrotask(() => this.menuButton()?.nativeElement.focus());
    }
  }

  protected handleDocumentKeydown(event: KeyboardEvent): void {
    if (!this.menuOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu(true);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = this.getMenuFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusFirstMenuItem(): void {
    this.getMenuFocusableElements()[0]?.focus();
  }

  private getMenuFocusableElements(): HTMLElement[] {
    const element = this.mobileNav()?.nativeElement;
    if (!element) return [];
    return Array.from(element.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  }
}
