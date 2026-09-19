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

// Every published route, at the narrowest iPhone widths still in use. A long
// code block used to widen the content column past the viewport, and the old
// three-route sample at a single width did not reach the affected pages.
const mobileRoutes = [
  '/pt',
  '/pt/work',
  '/pt/engineering',
  '/pt/writing',
  '/pt/labs',
  '/pt/about',
  '/pt/now',
  '/pt/contact',
  '/pt/work/lucyos',
  '/pt/writing/ai-agents-need-architecture',
  '/pt/engineering/principles',
  '/pt/engineering/decisions',
  '/pt/engineering/decisions/why-mcp-first',
  '/pt/topics/mcp',
] as const;

const phoneWidths = [
  ['iPhone SE (1st gen)', 320, 568],
  ['iPhone SE (2nd/3rd gen)', 375, 667],
  ['iPhone 15 Pro', 393, 852],
] as const;

for (const [device, width, height] of phoneWidths) {
  test.describe(`mobile layout on ${device}`, () => {
    test.use({ viewport: { width, height } });

    test(`no page overflows horizontally at ${width}px`, async ({ page }) => {
      for (const route of mobileRoutes) {
        await page.goto(route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `Horizontal overflow of ${overflow}px at ${route}`).toBeLessThanOrEqual(1);
      }
    });
  });
}

test.describe('mobile controls', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('header controls meet the iOS minimum tap target', async ({ page }) => {
    await page.goto('/pt');

    for (const name of ['Ativar tema claro', 'Ativar tema escuro', 'Menu']) {
      const control = page.getByRole('button', { name });
      if ((await control.count()) === 0) continue;
      const box = await control.first().boundingBox();
      expect(box, `${name} has no box`).not.toBeNull();
      expect(box!.width, `${name} is only ${box!.width}px wide`).toBeGreaterThanOrEqual(44);
      expect(box!.height, `${name} is only ${box!.height}px tall`).toBeGreaterThanOrEqual(44);
    }
  });

  test('long code blocks scroll inside their own box', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/pt/now');

    const metrics = await page.evaluate(() => {
      const pre = document.querySelector('.prose pre');
      if (!pre) return null;
      return {
        width: pre.getBoundingClientRect().width,
        documentWidth: document.documentElement.clientWidth,
      };
    });

    expect(metrics, 'expected a code block on /pt/now').not.toBeNull();
    expect(metrics!.width).toBeLessThanOrEqual(metrics!.documentWidth);
  });
});
