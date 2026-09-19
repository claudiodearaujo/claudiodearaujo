import { Component, HostListener, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbItem, ContentEntry, ContentType } from '../../core/content/content.models';
import { ContentRepository } from '../../core/content/content.repository';
import { SeoService } from '../../core/seo/seo.service';
import { slugifyTag } from '../../core/content/slug.util';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';
import { ContentCard } from '../../shared/content-card/content-card';
import { MetadataRow } from '../../shared/metadata-row/metadata-row';
import { TableOfContents } from '../../shared/table-of-contents/table-of-contents';

// The section each content type belongs to, for the breadcrumb's first crumb.
// "page" (About, Now, Contact, Principles) has no section of its own — those
// are one level under Home.
const sections: Record<ContentType, BreadcrumbItem> = {
  project: { label: 'Work', route: '/pt/work' },
  article: { label: 'Writing', route: '/pt/writing' },
  lab: { label: 'Labs', route: '/pt/labs' },
  decision: { label: 'Architecture Decisions', route: '/pt/engineering/decisions' },
  page: { label: 'Início', route: '/pt' },
};

@Component({
  selector: 'app-content-detail-page',
  imports: [ContentCard, TableOfContents, Breadcrumb, MetadataRow, RouterLink],
  templateUrl: './content-detail.page.html',
  styleUrl: './content-detail.page.scss',
})
export class ContentDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly repository = inject(ContentRepository);
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly entry = this.route.snapshot.data['content'] as ContentEntry;
  protected readonly related = this.repository.related(this.entry);
  // HTML is produced from repository-owned Markdown and sanitized by sanitize-html at build time.
  protected readonly safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.entry.html);

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    sections[this.entry.type],
    { label: this.entry.title },
  ];

  constructor() {
    this.seo.setContent(this.entry, this.breadcrumb);
  }

  protected topicRoute(tag: string): string {
    return `/pt/topics/${slugifyTag(tag)}`;
  }

  // `<base href="/">` (required so the router can resolve absolute app
  // routes) makes the browser resolve a bare `href="#slug"` against the
  // site root instead of the current page — clicking a heading anchor or a
  // table-of-contents link would navigate to "/#slug" instead of scrolling.
  // Intercepting the click and doing the fragment navigation ourselves
  // sidesteps that resolution entirely.
  @HostListener('click', ['$event'])
  protected onFragmentLinkClick(event: MouseEvent): void {
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    if (!href?.startsWith('#')) return;

    const target = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!target) return;

    event.preventDefault();
    history.pushState(null, '', `${location.pathname}${location.search}${href}`);
    target.scrollIntoView();
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}
