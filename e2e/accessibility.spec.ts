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
