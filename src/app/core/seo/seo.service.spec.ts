import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';
import { ContentEntry } from '../content/content.models';
import { SeoService } from './seo.service';
import { SITE_CONFIG } from './site-config';

const origin = 'https://example.test';

const entry: ContentEntry = {
  title: 'Evidence Before Autonomy',
  slug: 'evidence-before-autonomy',
  locale: 'pt',
  type: 'article',
  route: '/pt/writing/evidence-before-autonomy',
  summary: 'Por que sistemas inteligentes deveriam conquistar autoridade.',
  tags: ['ai', 'governance'],
  featured: false,
  relatedRoutes: [],
  readingTime: 3,
  source: 'src/content/pt/writing/evidence-before-autonomy.md',
  headings: [],
  html: '<p>x</p>',
};

describe('SeoService', () => {
  let seo: SeoService;
  let document: Document;

  const meta = (selector: string) =>
    document.querySelector(selector)?.getAttribute('content') ?? null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_CONFIG, useValue: { origin, isPreview: false } }],
    });
    seo = TestBed.inject(SeoService);
    document = TestBed.inject(DOCUMENT);
    document.head
      .querySelectorAll('meta[property], meta[name], link[rel="canonical"]')
      .forEach((node) => node.remove());
    document.getElementById('page-jsonld')?.remove();
  });

  it('suffixes the page title but leaves the site name alone', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');
    expect(TestBed.inject(Title).getTitle()).toBe('Labs · Cláudio Araújo');

    seo.setPage('Cláudio Araújo', 'Home');
    expect(TestBed.inject(Title).getTitle()).toBe('Cláudio Araújo');
  });

  it('publishes the description across the standard meta tags', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');

    expect(meta('meta[name="description"]')).toBe('Experimentos');
    expect(meta('meta[property="og:description"]')).toBe('Experimentos');
    expect(meta('meta[name="twitter:description"]')).toBe('Experimentos');
    expect(meta('meta[property="og:type"]')).toBe('website');
  });

  it('sets canonical and og:url from the route', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${origin}/pt/labs`,
    );
    expect(meta('meta[property="og:url"]')).toBe(`${origin}/pt/labs`);
  });

  it('omits canonical and og:url for routeless pages', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');
    seo.setPage('Sem rota', 'Sem rota');

    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(meta('meta[property="og:url"]')).toBeNull();
  });

  it('keeps exactly one canonical link across navigations', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');
    seo.setPage('Writing', 'Ensaios', 'website', '/pt/writing');

    const canonical = document.querySelectorAll('link[rel="canonical"]');
    expect(canonical).toHaveLength(1);
    expect(canonical[0].getAttribute('href')).toBe(`${origin}/pt/writing`);
  });

  it('defaults to a plain summary card without an og:image', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');

    expect(meta('meta[name="twitter:card"]')).toBe('summary');
    expect(meta('meta[property="og:image"]')).toBeNull();
    expect(meta('meta[name="twitter:image"]')).toBeNull();
  });

  it('publishes a large-image card when a page has one', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs', '/og/site/labs.png');

    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(meta('meta[property="og:image"]')).toBe(`${origin}/og/site/labs.png`);
    expect(meta('meta[property="og:image:width"]')).toBe('1200');
    expect(meta('meta[property="og:image:height"]')).toBe('630');
    expect(meta('meta[name="twitter:image"]')).toBe(`${origin}/og/site/labs.png`);
  });

  it('derives the content entry image from its own type and slug', () => {
    seo.setContent(entry);

    expect(meta('meta[property="og:image"]')).toBe(
      `${origin}/og/article/evidence-before-autonomy.png`,
    );
  });

  it('clears a stale og:image when the next page has none', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs', '/og/site/labs.png');
    seo.setPage('Sem imagem', 'Sem imagem');

    expect(meta('meta[property="og:image"]')).toBeNull();
    expect(meta('meta[name="twitter:card"]')).toBe('summary');
  });

  it('falls back to a summary card when there is no origin to resolve the image against', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_CONFIG, useValue: { origin: '', isPreview: false } }],
    });

    const noOriginSeo = TestBed.inject(SeoService);
    const noOriginDocument = TestBed.inject(DOCUMENT);
    noOriginSeo.setPage('Labs', 'Experimentos', 'website', '/pt/labs', '/og/site/labs.png');

    expect(
      noOriginDocument.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
    ).toBe('summary');
    expect(noOriginDocument.querySelector('meta[property="og:image"]')).toBeNull();
  });

  it('describes content entries as structured data', () => {
    seo.setContent(entry);

    const jsonLd = JSON.parse(document.getElementById('page-jsonld')?.textContent ?? '{}');
    expect(jsonLd['@type']).toBe('TechArticle');
    expect(jsonLd.url).toBe(`${origin}/pt/writing/evidence-before-autonomy`);
    expect(jsonLd.keywords).toBe('ai, governance');
    expect(meta('meta[property="og:type"]')).toBe('article');
  });

  it('keeps exactly one structured-data block across navigations', () => {
    seo.setContent(entry);
    seo.setContent({ ...entry, type: 'project', route: '/pt/work/lucyos', title: 'LucyOS' });

    const blocks = document.querySelectorAll('#page-jsonld');
    expect(blocks).toHaveLength(1);
    expect(JSON.parse(blocks[0].textContent ?? '{}')['@type']).toBe('CreativeWork');
  });

  it('publishes a BreadcrumbList alongside the content schema', () => {
    seo.setContent(entry, [{ label: 'Writing', route: '/pt/writing' }, { label: entry.title }]);

    const jsonLd = JSON.parse(document.getElementById('breadcrumb-jsonld')?.textContent ?? '{}');
    expect(jsonLd['@type']).toBe('BreadcrumbList');
    expect(jsonLd.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Writing', item: `${origin}/pt/writing` },
      { '@type': 'ListItem', position: 2, name: entry.title, item: undefined },
    ]);
  });

  it('omits the breadcrumb script when no breadcrumb is given', () => {
    seo.setContent(entry);

    expect(document.getElementById('breadcrumb-jsonld')).toBeNull();
  });

  it('clears a stale breadcrumb when the next page has none', () => {
    seo.setContent(entry, [{ label: 'Writing', route: '/pt/writing' }, { label: entry.title }]);
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');

    expect(document.getElementById('breadcrumb-jsonld')).toBeNull();
  });

  it('marks the not found page as noindex without a canonical', () => {
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');
    seo.setNotFound();

    expect(meta('meta[name="robots"]')).toBe('noindex, nofollow');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('marks every page noindex on a preview deployment', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: SITE_CONFIG, useValue: { origin: '', isPreview: true } }],
    });

    TestBed.inject(SeoService).setPage('Labs', 'Experimentos', 'website', '/pt/labs');

    const previewDocument = TestBed.inject(DOCUMENT);
    expect(previewDocument.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex, nofollow',
    );
    expect(previewDocument.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('drops the noindex tag when a real page follows the not found page', () => {
    seo.setNotFound();
    seo.setPage('Labs', 'Experimentos', 'website', '/pt/labs');

    expect(meta('meta[name="robots"]')).toBeNull();
  });
});
