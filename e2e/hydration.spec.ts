import { expect, test } from '@playwright/test';

// These run against `ng serve`, which server-renders, so the page starts as
// real HTML and Angular hydrates it — the same shape the prerendered build
// ships. Hydration diagnostics are dev-only messages, which is exactly why
// this file asserts on them here rather than against a production bundle.

const routes = [
  '/pt',
  '/pt/work',
  '/pt/work/invest-lucy',
  '/pt/engineering/principles',
  '/pt/engineering/decisions',
  '/pt/topics/mcp',
  '/pt/writing/ai-agents-need-architecture',
];

for (const scheme of ['dark', 'light'] as const) {
  test(`hydration reconciles cleanly in ${scheme} mode`, async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: scheme });
    const page = await context.newPage();
    const problems: string[] = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (/NG050\d/.test(text) || (msg.type() === 'error' && /hydrat/i.test(text))) {
        problems.push(`${page.url()} [${msg.type()}] ${text.slice(0, 400)}`);
      }
      // A "skipped" component is one Angular gave up hydrating and re-created
      // from scratch, which is what a server/client mismatch degrades into.
      const skipped = /hydrated .* (\d+) component\(s\) were skipped/.exec(text);
      if (skipped && Number(skipped[1]) > 0) {
        problems.push(`${page.url()} skipped ${skipped[1]} component(s)`);
      }
    });

    for (const route of routes) {
      await page.goto(route, { waitUntil: 'networkidle' });
    }
    await context.close();
    expect(problems, problems.join('\n')).toEqual([]);
  });
}

// The control used to render its glyph and its aria-label from a signal that
// the server always evaluated as "dark". A reader who prefers light received
// `☀` and "Ativar tema claro" — both wrong — until hydration caught up (D18).
test.describe('theme control', () => {
  test('a light-preference reader gets the right glyph in the server HTML', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'light' });
    const page = await context.newPage();
    await page.goto('/pt');

    await expect(page.locator('.theme-toggle__glyph--light')).toBeVisible();
    await expect(page.locator('.theme-toggle__glyph--dark')).toBeHidden();
    await context.close();
  });

  test('its accessible name does not depend on the active theme', async ({ browser }) => {
    for (const colorScheme of ['dark', 'light'] as const) {
      const context = await browser.newContext({ colorScheme });
      const page = await context.newPage();
      await page.goto('/pt');
      await expect(page.getByRole('button', { name: 'Alternar tema' })).toBeVisible();
      await context.close();
    }
  });

  test('toggling flips the document theme and the glyph', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/pt');

    await page.getByRole('button', { name: 'Alternar tema' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('.theme-toggle__glyph--light')).toBeVisible();
    await expect(page.locator('.theme-toggle__glyph--dark')).toBeHidden();
    await context.close();
  });
});

// Content that never hydrates still has to behave: the DOM is real, and the
// handlers that serve it live on the app root, which does hydrate (D17).
test.describe('deferred hydration islands', () => {
  test('fragment links inside the never-hydrated prose still jump', async ({ page }) => {
    await page.goto('/pt/engineering/principles', { waitUntil: 'networkidle' });
    await page
      .locator('.prose')
      .getByRole('link', { name: '1. Evidence Before Autonomy' })
      .first()
      .click();

    await expect(page).toHaveURL(/#1-evidence-before-autonomy$/);
    await expect(page.locator('[id="1-evidence-before-autonomy"]')).toBeFocused();
  });

  test('related cards navigate once they hydrate on viewport', async ({ page }) => {
    await page.goto('/pt/work/lucyos', { waitUntil: 'networkidle' });
    const card = page.locator('.related-grid a').first();
    await card.scrollIntoViewIfNeeded();
    const href = await card.getAttribute('href');
    await card.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });

  // The footer is deliberately not deferred: `hydrate never` on it measured
  // at 15 nodes saved and cost these links their router navigation.
  test('footer links navigate through the router', async ({ page }) => {
    await page.goto('/pt/labs', { waitUntil: 'networkidle' });
    await page.locator('.site-footer').getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL(/\/pt\/contact$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

// A client-side navigation is silent for a screen reader and leaves focus on
// the link that was activated, so the next Tab resumes from the old page (D19).
test.describe('route change', () => {
  test('moves focus to main and announces the new page', async ({ page }) => {
    await page.goto('/pt', { waitUntil: 'networkidle' });
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Writing' })
      .click();

    await expect(page).toHaveURL(/\/pt\/writing$/);
    await expect(page.locator('#main-content')).toBeFocused();
    await expect(page.getByRole('status')).toHaveText(/Writing/);
  });

  test('announces nothing on a first load', async ({ page }) => {
    await page.goto('/pt/work', { waitUntil: 'networkidle' });
    await expect(page.getByRole('status')).toHaveText('');
  });

  test('keeps the header nav highlight in step with the route', async ({ page }) => {
    await page.goto('/pt/work', { waitUntil: 'networkidle' });
    const nav = page.getByRole('navigation', { name: 'Navegação principal' });
    await expect(nav.getByRole('link', { name: 'Work' })).toHaveClass(/is-active/);

    await nav.getByRole('link', { name: 'Labs' }).click();
    await expect(nav.getByRole('link', { name: 'Labs' })).toHaveClass(/is-active/);
    await expect(nav.getByRole('link', { name: 'Work' })).not.toHaveClass(/is-active/);
  });
});
