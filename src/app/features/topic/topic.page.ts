import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentRepository } from '../../core/content/content.repository';
import { DEFAULT_LOCALE, Locale, localizedPath } from '../../core/i18n/locale';
import { stringsFor } from '../../core/i18n/ui-strings';
import { SeoService } from '../../core/seo/seo.service';
import { ContentCard } from '../../shared/content-card/content-card';

/**
 * Where a tag click lands (docs/SITE-EVOLUTION-PLAN.md D15/§23): every route
 * this page can render is generated at build time from the actual tags in
 * use (tools/content/build-content.mjs → topic-routes.generated.ts), so it
 * stays fully prerendered like everything else instead of falling back to
 * client-side rendering for an unbounded `:tag` param.
 */
@Component({
  selector: 'app-topic-page',
  imports: [ContentCard],
  templateUrl: './topic.page.html',
  styleUrl: './topic.page.scss',
})
export class TopicPage {
  private readonly route = inject(ActivatedRoute);
  private readonly repository = inject(ContentRepository);
  private readonly seo = inject(SeoService);

  protected readonly tagSlug = this.route.snapshot.data['tagSlug'] as string;
  protected readonly label = this.route.snapshot.data['tagLabel'] as string;
  private readonly locale = (this.route.snapshot.data['locale'] as Locale) ?? DEFAULT_LOCALE;
  protected readonly text = stringsFor(this.locale);
  protected readonly entries = this.repository.byTopic(this.tagSlug, this.locale);

  constructor() {
    this.seo.setPage(
      this.label,
      this.text.topicSummary(this.label),
      'website',
      localizedPath(`topics/${this.tagSlug}`, this.locale),
    );
  }
}
