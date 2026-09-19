import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BreadcrumbItem, ContentEntry } from '../content/content.models';
import { SITE_CONFIG } from './site-config';

const githubUrl = 'https://github.com/claudiodearaujo';
const linkedinUrl = 'https://br.linkedin.com/in/claudio-de-araujo';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(SITE_CONFIG);

  setPage(title: string, description: string, type = 'website', route?: string): void {
    this.clearJsonLd();
    this.clearBreadcrumbJsonLd();

    const fullTitle = title === 'Cláudio Araújo' ? title : `${title} · Cláudio Araújo`;
    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: 'Cláudio Araújo' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    if (this.config.isPreview) {
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
      url: this.config.origin ? `${this.config.origin}/pt` : undefined,
      sameAs: [githubUrl, linkedinUrl],
    });
  }

  setContent(entry: ContentEntry, breadcrumb?: readonly BreadcrumbItem[]): void {
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
      url: this.config.origin ? `${this.config.origin}${entry.route}` : undefined,
      inLanguage: 'pt-BR',
      author: {
        '@type': 'Person',
        name: 'Cláudio Araújo',
        sameAs: [githubUrl, linkedinUrl],
      },
      keywords: entry.tags.join(', '),
    });

    if (breadcrumb?.length) {
      this.replaceBreadcrumbJsonLd(breadcrumb);
    }
  }

  setNotFound(): void {
    this.setPage(
      'Página não encontrada',
      'A página solicitada não existe ou mudou de endereço.',
      'website',
    );
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  private setCanonical(route?: string): void {
    this.document.querySelector('link[rel="canonical"]')?.remove();
    this.meta.removeTag("property='og:url'");

    if (!this.config.origin || !route) return;

    const url = `${this.config.origin}${route}`;
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

  private clearBreadcrumbJsonLd(): void {
    this.document.getElementById('breadcrumb-jsonld')?.remove();
  }

  // Kept as its own script (rather than folded into #page-jsonld) so a page
  // without a breadcrumb never has to think about the content schema's shape.
  private replaceBreadcrumbJsonLd(items: readonly BreadcrumbItem[]): void {
    this.clearBreadcrumbJsonLd();
    const script = this.document.createElement('script');
    script.id = 'breadcrumb-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        // The current page (last item) conventionally has no `item` URL.
        item: item.route && this.config.origin ? `${this.config.origin}${item.route}` : undefined,
      })),
    });
    this.document.head.appendChild(script);
  }
}
