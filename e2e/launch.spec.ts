import { expect, test } from '@playwright/test';

test('home exposes the complete launch narrative and professional profiles', async ({ page }) => {
  await page.goto('/pt');

  await expect(page).toHaveTitle('Cláudio Araújo');
  await expect(
    page.getByRole('heading', { name: 'Engenharia atravessa o sistema inteiro' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Perguntas que estão guiando meu trabalho agora' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Ideias transformadas em conhecimento reutilizável' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Tecnologia é parte da pergunta, não a pergunta inteira.' }),
  ).toBeVisible();

  await expect(page.getByRole('link', { name: 'GitHub' }).first()).toHaveAttribute(
    'href',
    'https://github.com/claudiodearaujo',
  );
  await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toHaveAttribute(
    'href',
    'https://br.linkedin.com/in/claudio-de-araujo',
  );
});

test('contact page publishes real professional links without placeholders', async ({ page }) => {
  await page.goto('/pt/contact');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText("Let's talk");
  await expect(
    page.getByRole('link', { name: 'linkedin.com/in/claudio-de-araujo' }),
  ).toHaveAttribute('href', 'https://br.linkedin.com/in/claudio-de-araujo');
  await expect(page.getByRole('link', { name: 'github.com/claudiodearaujo' })).toHaveAttribute(
    'href',
    'https://github.com/claudiodearaujo',
  );
  await expect(page.getByText('[Email]')).toHaveCount(0);
});

test('not found route has explicit title and noindex metadata', async ({ page }) => {
  await page.goto('/pt/does-not-exist');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada');
  await expect(page).toHaveTitle('Página não encontrada · Cláudio Araújo');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test('favicon is published', async ({ page }) => {
  const response = await page.request.get('/favicon.svg');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain('<svg');
});

test.describe('mobile menu keyboard behavior', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('traps focus and closes with Escape returning focus to the trigger', async ({ page }) => {
    await page.goto('/pt');

    const trigger = page.getByRole('button', { name: 'Menu' });
    await trigger.click();

    const mobileNav = page.getByRole('navigation', { name: 'Navegação móvel' });
    const firstLink = mobileNav.getByRole('link', { name: 'Work', exact: true });
    const lastLink = mobileNav.getByRole('link', { name: 'LinkedIn' });

    await expect(firstLink).toBeFocused();
    await lastLink.focus();
    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(mobileNav).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
