import { afterNextRender, Component, input, OnDestroy, signal } from '@angular/core';
import { ContentHeading } from '../../core/content/content.models';

/**
 * Renders the "on this page" navigation for a content detail page.
 *
 * Always in the DOM and always reachable — the previous inline markup was
 * `display: none` below 900px, making it unusable by keyboard or screen
 * reader on mobile (docs/SITE-EVOLUTION-PLAN.md D3). The <details> element
 * starts open everywhere and lets a mobile reader collapse it if they want
 * to, with zero custom JS for that behavior.
 *
 * The active-heading highlight is a progressive enhancement on top of that:
 * it only runs in the browser (afterNextRender never fires during SSR) and
 * its failure mode is simply "no heading highlighted", never a broken link.
 */
@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.html',
  styleUrl: './table-of-contents.scss',
})
export class TableOfContents implements OnDestroy {
  readonly headings = input.required<readonly ContentHeading[]>();

  protected readonly activeId = signal<string | null>(null);

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.observeHeadings());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private observeHeadings(): void {
    const elements = this.headings()
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    // Treats a heading as "current" once it has scrolled into a band near the
    // top of the viewport, and stays current until the next heading reaches
    // that same band — the standard scrollspy shape.
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        );
        this.activeId.set(topmost.target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );

    for (const element of elements) this.observer.observe(element);
  }
}
