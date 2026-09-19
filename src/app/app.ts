import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
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
