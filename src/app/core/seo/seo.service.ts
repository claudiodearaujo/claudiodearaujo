import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPreview, siteOrigin } from '../../generated/site-config.generated';
import { ContentEntry } from '../content/content.models';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  setPage(title: string, description: string, type = 'website', route?: string): void {
    this.clearJsonLd();
    const fullTitle = title === 'Cláudio Araújo' ? title : `${title} · Cláudio Araújo`;
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: type });
    if (isPreview) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.removeTag("name='robots'");
    }
    this.setCanonical(route);
  }

  setHome(): void {
    const description =
      'Software Engineer com 20+ anos de experiência em arquitetura, AI Engineering, sistemas autônomos e liderança técnica.';
    this.setPage('Cláudio Araújo', description, 'profile', '/pt');
    this.replaceJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Cláudio Araújo',
      jobTitle: 'Software Engineer · AI Engineering · Technical Leadership',
      url: siteOrigin ? `${siteOrigin}/pt` : undefined,
      sameAs: ['https://github.com/claudiodearaujo'],
    });
  }

  setContent(entry: ContentEntry): void {
    this.setPage(
      entry.title,
      entry.summary,
      entry.type === 'article' ? 'article' : 'website',
      entry.route,
    );
    this.replaceJsonLd({
      '@context': 'https://schema.org',
      '@type': entry.type === 'article' ? 'TechArticle' : 'CreativeWork',
      name: entry.title,
      description: entry.summary,
      url: siteOrigin ? `${siteOrigin}${entry.route}` : undefined,
      author: { '@type': 'Person', name: 'Cláudio Araújo' },
      keywords: entry.tags.join(', '),
    });
  }

  private setCanonical(route?: string): void {
    this.document.querySelector('link[rel="canonical"]')?.remove();
    this.meta.removeTag("property='og:url'");
    if (!siteOrigin || !route) return;
    const url = `${siteOrigin}${route}`;
    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    this.document.head.appendChild(link);
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  private clearJsonLd(): void {
    this.document.getElementById('page-jsonld')?.remove();
  }

  private replaceJsonLd(value: object): void {
    this.clearJsonLd();
    const script = this.document.createElement('script');
    script.id = 'page-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(value);
    this.document.head.appendChild(script);
  }
}
