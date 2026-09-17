import { expect, test } from '@playwright/test';

test('home exposes positioning and primary navigation', async ({ page }) => {
  await page.goto('/pt');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software Engineer');
  await expect(page.getByRole('link', { name: 'Conheça meu trabalho' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
});

test('work navigation resolves without a 404', async ({ page }) => {
  await page.goto('/pt');
  await page.getByRole('link', { name: 'Work', exact: true }).first().click();

  await expect(page).toHaveURL(/\/pt\/work$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Selected Work');
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('menu exposes mobile navigation links', async ({ page }) => {
    await page.goto('/pt');

    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeHidden();
    await page.getByRole('button', { name: 'Menu' }).click();

    const mobileNav = page.getByRole('navigation', { name: 'Navegação móvel' });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'Work', exact: true })).toBeVisible();
  });
});
