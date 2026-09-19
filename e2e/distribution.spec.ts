import { expect, test } from '@playwright/test';

import { contentManifest } from '../src/app/generated/content-manifest.generated';

test.describe('JSON-LD', () => {
  test('home publishes Person and WebSite in one graph', async ({ page }) => {
    await page.goto('/pt');
    const raw = await page.locator('#page-jsonld').textContent();
    const graph = JSON.parse(raw ?? '{}');

    expect(graph['@context']).toBe('https://schema.org');
    const types = (graph['@graph'] ?? []).map((node: { '@type': string }) => node['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('WebSite');
  });

  test('an article carries its dates, author and word count', async ({ page }) => {
    await page.goto('/pt/writing/ai-agents-need-architecture');
    const data = JSON.parse((await page.locator('#page-jsonld').textContent()) ?? '{}');

    expect(data['@type']).toBe('TechArticle');
    expect(data.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(data.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(data.author?.name).toBe('Cláudio Araújo');
    expect(data.wordCount).toBeGreaterThan(0);
    expect(data.inLanguage).toBe('pt-BR');
  });

  test('a standing page publishes no invented publication date', async ({ page }) => {
    await page.goto('/pt/about');
    const data = JSON.parse((await page.locator('#page-jsonld').textContent()) ?? '{}');

    expect(data.datePublished).toBeUndefined();
    expect(data.dateModified).toBeUndefined();
  });

  test('a breadcrumb is published alongside the content', async ({ page }) => {
    await page.goto('/pt/work/lucyos');
    const data = JSON.parse((await page.locator('#breadcrumb-jsonld').textContent()) ?? '{}');

    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[0].name).toBe('Work');
  });
});

test.describe('hreflang', () => {
  // With one published locale there is no alternate to point at, so the
  // correct markup is none — not a self-referencing tag (E7).
  test('is absent while a single locale is published', async ({ page }) => {
    await page.goto('/pt/work');
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  });
});

test.describe('feed discovery', () => {
  test('the document points a reader at the feed', async ({ page }) => {
    await page.goto('/pt');
    const feed = page.locator('link[rel="alternate"][type="application/rss+xml"]');
    await expect(feed).toHaveAttribute('href', '/rss.xml');
  });

  test('the footer links it for a human too', async ({ page }) => {
    await page.goto('/pt');
    await expect(page.locator('.site-footer').getByRole('link', { name: 'RSS' })).toHaveAttribute(
      'href',
      '/rss.xml',
    );
  });
});

test.describe('locale', () => {
  test('every prerendered content route sits under its own locale', () => {
    for (const entry of contentManifest) {
      expect(entry.route, `${entry.route} is not under /${entry.locale}`).toMatch(
        new RegExp(`^/${entry.locale}/`),
      );
    }
  });

  test('the site root redirects into the default locale', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/pt$/);
  });

  test('no language picker is shown while there is nothing to pick', async ({ page }) => {
    await page.goto('/pt');
    await expect(page.locator('.locale-nav')).toHaveCount(0);
  });
});
