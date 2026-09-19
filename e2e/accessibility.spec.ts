import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  ['/pt', 'Home'],
  ['/pt/work', 'Work'],
  ['/pt/work/lucyos', 'Case Study'],
  ['/pt/writing/ai-agents-need-architecture', 'Article'],
] as const;

for (const [route, label] of routes) {
  test(`${label} has no WCAG A/AA violations detected by axe`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
// `<base href="/">` makes the browser resolve a bare `href="#id"` against
// the site root, so these links used to navigate away from the page instead
// of moving within it — the skip link threw the reader back to the home page.
test.describe('same-page fragment links', () => {
  test('skip link moves focus to main content without leaving the page', async ({ page }) => {
    await page.goto('/pt/writing/ai-agents-need-architecture');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/pt\/writing\/ai-agents-need-architecture#main-content$/);
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('table of contents links stay on the article', async ({ page }) => {
    await page.goto('/pt/writing/ai-agents-need-architecture');
    const link = page.locator('app-table-of-contents a').first();
    const href = await link.getAttribute('href');
    await link.click();

    await expect(page).toHaveURL(
      new RegExp(`/pt/writing/ai-agents-need-architecture${href?.replace('#', '\\#')}$`),
    );
  });
});

test.describe('mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('representative pages do not create horizontal document overflow', async ({ page }) => {
    for (const route of ['/pt', '/pt/work/lucyos', '/pt/writing/ai-agents-need-architecture']) {
      await page.goto(route);
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(hasOverflow, `Unexpected horizontal overflow at ${route}`).toBe(false);
    }
  });
});
