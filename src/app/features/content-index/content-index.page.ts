import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentRepository } from '../../core/content/content.repository';
import { ContentType } from '../../core/content/content.models';
import { SeoService } from '../../core/seo/seo.service';
import { ContentCard } from '../../shared/content-card/content-card';

@Component({
  selector: 'app-content-index-page',
  imports: [ContentCard],
  templateUrl: './content-index.page.html',
  styleUrl: './content-index.page.scss',
})
export class ContentIndexPage {
  private readonly route = inject(ActivatedRoute);
  private readonly repository = inject(ContentRepository);
  private readonly seo = inject(SeoService);

  protected readonly title = this.route.snapshot.data['title'] as string;
  protected readonly eyebrow = this.route.snapshot.data['eyebrow'] as string;
  protected readonly description = this.route.snapshot.data['description'] as string;
  protected readonly type = this.route.snapshot.data['contentType'] as ContentType;
  protected readonly entries = this.repository.list(this.type);

  constructor() {
    const route = this.type === 'article' ? '/pt/writing' : '/pt/labs';
    this.seo.setPage(this.title, this.description, 'website', route);
  }
}
