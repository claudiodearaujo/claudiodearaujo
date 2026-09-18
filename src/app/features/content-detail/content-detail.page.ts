import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentEntry } from '../../core/content/content.models';
import { ContentRepository } from '../../core/content/content.repository';
import { SeoService } from '../../core/seo/seo.service';
import { ContentCard } from '../../shared/content-card/content-card';

@Component({
  selector: 'app-content-detail-page',
  imports: [RouterLink, ContentCard],
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

  constructor() {
    this.seo.setContent(this.entry);
  }

  protected parentRoute(): string {
    return (
      {
        project: '/pt/work',
        article: '/pt/writing',
        lab: '/pt/labs',
        decision: '/pt/engineering',
        page: '/pt',
      } as const
    )[this.entry.type];
  }
}
