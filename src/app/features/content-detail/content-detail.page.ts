import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbItem, ContentEntry, ContentType } from '../../core/content/content.models';
import { ContentRepository } from '../../core/content/content.repository';
import { Locale, localizedPath, SECTION_FOR_TYPE } from '../../core/i18n/locale';
import { stringsFor } from '../../core/i18n/ui-strings';
import { SeoService } from '../../core/seo/seo.service';
import { slugifyTag } from '../../core/content/slug.util';
import { Breadcrumb } from '../../shared/breadcrumb/breadcrumb';
import { ContentCard } from '../../shared/content-card/content-card';
import { MetadataRow } from '../../shared/metadata-row/metadata-row';
import { TableOfContents } from '../../shared/table-of-contents/table-of-contents';

// The section each content type belongs to, for the breadcrumb's first crumb.
// "page" (About, Now, Contact, Principles) has no section of its own — those
// are one level under Home, so its crumb is the locale's home.
const sectionCrumb = (type: ContentType, locale: Locale): BreadcrumbItem => {
  const text = stringsFor(locale);
  const section = type === 'page' ? '' : SECTION_FOR_TYPE[type];
  return { label: text.sections[type], route: localizedPath(section, locale) };
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
  protected readonly text = stringsFor(this.entry.locale);
  protected readonly related = this.repository.related(this.entry);
  // HTML is produced from repository-owned Markdown and sanitized by sanitize-html at build time.
  protected readonly safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.entry.html);

  protected readonly breadcrumb: readonly BreadcrumbItem[] = [
    sectionCrumb(this.entry.type, this.entry.locale),
    { label: this.entry.title },
  ];

  constructor() {
    this.seo.setContent(this.entry, this.breadcrumb);
  }

  protected hasTopic(tag: string): boolean {
    return this.repository.hasTopic(tag, this.entry.locale);
  }

  protected topicRoute(tag: string): string {
    return localizedPath(`topics/${slugifyTag(tag)}`, this.entry.locale);
  }
}
