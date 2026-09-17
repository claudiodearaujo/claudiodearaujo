import { expect, test } from '@playwright/test';

test('work landing exposes the three full case studies', async ({ page }) => {
  await page.goto('/pt/work');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Selected Work');
  await expect(page.getByRole('link', { name: 'LucyOS' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Invest Lucy' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Livrya' })).toBeVisible();
});

test('case study renders long-form content and table of contents', async ({ page }) => {
  await page.goto('/pt/work/lucyos');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('LucyOS');
  await expect(page.getByRole('heading', { name: 'Personal Agentic AI Platform' })).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Neste conteúdo' })).toBeVisible();
  await expect(page).toHaveTitle(/LucyOS · Cláudio Araújo/);
  expect(await page.locator('script#page-jsonld').textContent()).toContain('"CreativeWork"');
});

test('writing index and article route are generated from content metadata', async ({ page }) => {
  await page.goto('/pt/writing');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Writing');
  const article = page
    .getByRole('link', { name: 'AI Agents Need Architecture, Not Just Prompts' })
    .first();
  await expect(article).toBeVisible();
  await article.click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'AI Agents Need Architecture, Not Just Prompts',
  );
  expect(await page.locator('script#page-jsonld').textContent()).toContain('"TechArticle"');
});

test('labs and engineering routes expose research and decisions', async ({ page }) => {
  await page.goto('/pt/labs');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Labs');
  await page.getByRole('link', { name: 'Long-Term Memory for Agents' }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Long-Term Memory for Agents');

  await page.goto('/pt/engineering');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How I Engineer');
  await expect(page.getByRole('link', { name: 'Engineering Principles' })).toBeVisible();
  await page.getByRole('link', { name: 'Why MCP-first?' }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Why MCP-first?');
});

test('institutional pages are published as typed content', async ({ page }) => {
  for (const [route, title] of [
    ['/pt/about', 'Engineering, intelligence and curiosity'],
    ['/pt/now', 'Now'],
    ['/pt/contact', "Let's talk"],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  }
});
