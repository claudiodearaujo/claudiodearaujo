export type ContentType = 'project' | 'article' | 'lab' | 'decision' | 'page';

export interface ContentHeading {
  readonly level: number;
  readonly id: string;
  readonly text: string;
}

export interface ContentSummary {
  readonly title: string;
  readonly slug: string;
  readonly locale: 'pt' | 'en';
  readonly type: ContentType;
  readonly route: string;
  readonly summary: string;
  readonly status?: string;
  readonly tags: readonly string[];
  readonly category?: string;
  /** Promoted to the Home narrative — see ContentRepository.featured(). */
  readonly featured: boolean;
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  /** Editorial cross-references from front matter, validated at build time
   *  against the content manifest — see ContentRepository.related(). */
  readonly relatedRoutes: readonly string[];
  /** Minutes, rounded up from a ~200wpm estimate over the raw Markdown body. */
  readonly readingTime: number;
  /** Words in the raw Markdown body — published as the Article's wordCount. */
  readonly wordCount: number;
  readonly source: string;
}

export interface ContentEntry extends ContentSummary {
  readonly headings: readonly ContentHeading[];
  readonly html: string;
}

export interface BreadcrumbItem {
  readonly label: string;
  /** Omitted for the current page — it renders as plain text, not a link. */
  readonly route?: string;
}
