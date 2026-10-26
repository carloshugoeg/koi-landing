import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WHATSAPP = 'https://wa.me/50258713903';
const EMAIL = 'mailto:info@koisoftware.com';
const INSTAGRAM = 'https://instagram.com/carloshugoeg';

async function ready(page: Page) {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
}

async function overflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

test('loads every section, the contact hrefs, and a quiet console', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
  });

  await ready(page);

  await expect(page.getByRole('heading', { level: 1, name: 'Software hecho a la medida.' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Servicios' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Proyectos' })).toBeVisible();
  await expect(page.getByRole('region', { name: /Se construye en capas/ })).toBeVisible();
  await expect(page.getByRole('region', { name: /Empecemos por la/ })).toBeVisible();
  await expect(page.getByRole('contentinfo')).toContainText('Estudio integral de software');
  await expect(page.getByText('Probado en casa')).toHaveCount(0);
  await expect(page.getByText('Guatemala')).toHaveCount(0);
  await expect(page.getByText('NeuroMenu')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'KoiPOS' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Nutrea' })).toBeVisible();

  await expect(page.locator(`a[href="${WHATSAPP}"]`)).toHaveCount(5);
  await expect(page.locator(`a[href="${EMAIL}"]`)).toHaveCount(1);
  await expect(page.locator(`a[href="${INSTAGRAM}"]`)).toHaveCount(1);
  const agendas = page.getByRole('link', { name: 'Agenda una primera llamada' });
  await expect(agendas).toHaveCount(2);
  await expect(agendas.nth(0)).toHaveAttribute('href', WHATSAPP);
  await expect(agendas.nth(1)).toHaveAttribute('href', WHATSAPP);

  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});

test('nav anchors scroll where the mockup shows them', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  await page.getByRole('link', { name: 'Servicios', exact: true }).click();
  await expect(page.locator('#servicios')).toBeInViewport();
  await page.getByRole('link', { name: 'Trabajo', exact: true }).click();
  await expect(page.locator('#proyectos')).toBeInViewport();
  await page.getByRole('link', { name: 'Nosotros', exact: true }).click();
  await expect(page.locator('#nosotros')).toBeInViewport();
  await page.getByRole('link', { name: 'Koi Software' }).click();
  await expect(page.locator('#inicio')).toBeInViewport();
});

test('nav anchors still resolve at a phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await ready(page);
  for (const id of ['#servicios', '#proyectos', '#nosotros']) {
    await page.locator(`a[href="${id}"]`).first().evaluate((node) => (node as HTMLAnchorElement).click());
    await expect(page.locator(id)).toBeInViewport();
  }
  await page.locator('#contacto').evaluate((node) => node.scrollIntoView());
  await expect(page.locator('#contacto')).toBeInViewport();
});

for (const width of [320, 375, 768, 1440]) {
  test(`no horizontal overflow at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await ready(page);
    expect(await overflow(page)).toBeLessThanOrEqual(1);
    await page.evaluate(async () => {
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 400) {
        window.scrollTo(0, y);
        await new Promise((resolve) => requestAnimationFrame(() => resolve(true)));
      }
      window.scrollTo(0, height);
    });
    expect(await overflow(page)).toBeLessThanOrEqual(1);
  });
}

test('axe is clean on the page and inside a project dialog', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  const pageResults = await new AxeBuilder({ page }).analyze();
  expect(pageResults.violations).toEqual([]);

  await page.getByRole('button', { name: 'Ver proyecto KoiPOS' }).click();
  await expect(page.getByRole('dialog', { name: 'KoiPOS' })).toBeVisible();
  await expect.poll(() => page.locator('.pm .card').evaluate((node) => getComputedStyle(node).opacity)).toBe('1');
  await expect(page.getByText('Capturas en preparación.')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'info@koisoftware.com', exact: true })).toHaveAttribute('href', EMAIL);
  const dialogResults = await new AxeBuilder({ page }).include('.pm').analyze();
  expect(dialogResults.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'KoiPOS' })).toBeHidden();
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });

  test('nosotros is settled and the sheets do not travel', async ({ page }) => {
    await ready(page);
    const section = page.locator('#nosotros');
    await expect(section).toHaveAttribute('data-phase', 'settled');
    const motion = await section.locator('.leaf').evaluateAll((nodes) =>
      nodes.map((node) => {
        const style = getComputedStyle(node);
        return { opacity: Number(style.opacity), q: node.style.getPropertyValue('--q') };
      }),
    );
    expect(motion).toHaveLength(4);
    for (const leaf of motion) {
      expect(leaf.q).toBe('1');
      expect(leaf.opacity).toBeGreaterThan(0.95);
    }
    const hanko = await section.locator('.hanko').evaluate((node) => getComputedStyle(node).opacity);
    expect(Number(hanko)).toBeGreaterThan(0.95);
    await expect(section).toHaveScreenshot('nosotros-reduced.png');
  });
});
