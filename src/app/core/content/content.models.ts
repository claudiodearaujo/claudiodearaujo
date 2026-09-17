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
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  readonly source: string;
}

export interface ContentEntry extends ContentSummary {
  readonly headings: readonly ContentHeading[];
  readonly html: string;
}
