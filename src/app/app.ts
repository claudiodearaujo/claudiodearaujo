import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { stringsFor } from './core/i18n/ui-strings';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly text = stringsFor();

  /** Rendered by the aria-live region in app.html. */
  protected readonly routeAnnouncement = signal('');

  // A full page load already announces the document and leaves the reader at
  // its top; only the navigations after it are silent ones worth fixing.
  private firstNavigationSeen = false;

  constructor() {
    if (!this.isBrowser) return;

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.onNavigated());
  }

  /**
   * A client-side navigation replaces the page for a sighted reader but
   * changes nothing a screen reader or a keyboard notices: the title updates
   * silently, focus stays on whatever link was activated, and the next Tab
   * resumes from there rather than from the new page (D19).
   */
  private onNavigated(): void {
    if (!this.firstNavigationSeen) {
      this.firstNavigationSeen = true;
      return;
    }

    // The route's component sets the title through SeoService while
    // activating, so by NavigationEnd it already names the new page.
    this.routeAnnouncement.set(this.title.getTitle());
    this.document.getElementById('main-content')?.focus();
  }

  /**
   * Makes every same-page `href="#id"` link work.
   *
   * `<base href="/">` is load-bearing — the CLI emits script and style tags
   * as document-relative URLs, so a prerendered page at /pt/writing/x needs
   * it to resolve them — but it also makes the browser resolve a bare
   * fragment against the site root. Activating the skip link from an
   * article navigated to /pt instead of jumping to <main>, silently
   * defeating WCAG 2.4.1; heading anchors and the table of contents failed
   * the same way. Doing the fragment navigation here sidesteps that
   * resolution for every such link at once.
   */
  @HostListener('click', ['$event'])
  protected onFragmentLinkClick(event: MouseEvent): void {
    const href = (event.target as HTMLElement).closest('a')?.getAttribute('href');
    if (!href?.startsWith('#') || href === '#') return;

    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;

    event.preventDefault();
    history.pushState(null, '', `${location.pathname}${location.search}${href}`);
    target.scrollIntoView();
    // Headings are not focusable on their own; without this the next Tab
    // would resume from the top of the document rather than from the
    // section the reader just jumped to.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}
