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

test('whatsapp anchors keep the ink colors', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  const ink = async (selector: string) =>
    page.locator(selector).first().evaluate((node) => {
      const style = getComputedStyle(node);
      return { color: style.color, decoration: style.textDecorationLine };
    });

  expect(await ink('.hero .cta')).toEqual({ color: 'rgb(18, 18, 18)', decoration: 'none' });
  const rule = await page.locator('.hero .cta i').evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(rule).toBe('rgb(18, 18, 18)');
  expect(await ink('nav a.talk')).toEqual({ color: 'rgb(18, 18, 18)', decoration: 'none' });
  expect(await ink('.ns2 .cta2')).toEqual({ color: 'rgb(18, 18, 18)', decoration: 'none' });

  await page.locator('#contacto').scrollIntoViewIfNeeded();
  expect(await ink('.c3 .big')).toEqual({ color: 'rgb(237, 231, 218)', decoration: 'none' });
  expect(await ink('.c3 .row')).toEqual({ color: 'rgb(237, 231, 218)', decoration: 'none' });
  await page.locator('.c3 .big').hover();
  expect(await ink('.c3 .big')).toEqual({ color: 'rgb(237, 231, 218)', decoration: 'none' });
  await page.locator('.c3 .row').first().hover();
  await expect.poll(() => ink('.c3 .row')).toEqual({ color: 'rgb(184, 50, 30)', decoration: 'none' });
});

test('project titles load Shippori Mincho 400 and the arrow is U+2192', async ({ page }) => {
  for (const [width, size] of [
    [1440, '42px'],
    [375, '32px'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await ready(page);
    const titles = await page.locator('.pjx h3').evaluateAll((nodes) =>
      nodes.map((node) => {
        const style = getComputedStyle(node);
        const sample = 'KoiPOS';
        const canvas = document.createElement('canvas').getContext('2d');
        if (!canvas) return null;
        canvas.font = `400 42px "Shippori Mincho"`;
        const shippori = canvas.measureText(sample).width;
        canvas.font = `400 42px "Times New Roman"`;
        const times = canvas.measureText(sample).width;
        return {
          text: node.textContent,
          family: style.fontFamily,
          weight: style.fontWeight,
          size: style.fontSize,
          loaded: document.fonts.check('400 42px "Shippori Mincho"'),
          shippori,
          times,
        };
      }),
    );
    expect(titles.map((title) => title?.text)).toEqual(['KoiPOS', 'KoiCRM', 'Koins', 'Nutrea']);
    for (const title of titles) {
      expect(title?.family).toContain('Shippori Mincho');
      expect(title?.weight).toBe('400');
      expect(title?.size).toBe(size);
      expect(title?.loaded).toBe(true);
      expect(Math.abs((title?.shippori ?? 0) - (title?.times ?? 0))).toBeGreaterThan(4);
    }
    const marks = await page.locator('.pjx .go b').evaluateAll((nodes) =>
      nodes.map((node) => {
        const style = getComputedStyle(node);
        const range = document.createRange();
        range.selectNodeContents(node);
        const box = range.getBoundingClientRect();
        const arrowFace = [...document.fonts].some(
          (face) =>
            face.status === 'loaded' &&
            face.family.replaceAll('"', '') === 'Zen Kaku Gothic New' &&
            face.weight === '400' &&
            face.unicodeRange.replaceAll(' ', '') === 'U+2192',
        );
        return {
          text: node.textContent,
          code: node.textContent?.codePointAt(0),
          weight: style.fontWeight,
          color: style.color,
          width: box.width,
          arrowFace,
        };
      }),
    );
    expect(marks).toHaveLength(4);
    for (const mark of marks) {
      expect(mark.text).toBe('\u2192');
      expect(mark.code).toBe(0x2192);
      expect(mark.weight).toBe('400');
      expect(mark.color).toBe('rgb(184, 50, 30)');
      expect(mark.arrowFace).toBe(true);
      expect(mark.width).toBeGreaterThan(8);
    }
  }
});

test('contacto focus rings match the nav and header links warm on hover', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);

  const ring = async (selector: string) => {
    const locator = page.locator(selector).first();
    await locator.evaluate((node) => (node as HTMLElement).focus({ focusVisible: true }));
    return locator.evaluate((node) => {
      const style = getComputedStyle(node);
      return { style: style.outlineStyle, width: style.outlineWidth, color: style.outlineColor };
    });
  };
  const seal = { style: 'solid', width: '2px', color: 'rgb(184, 50, 30)' };
  expect(await ring('nav a.talk')).toEqual(seal);
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  expect(await ring('.c3 .big')).toEqual(seal);
  expect(await ring('.c3 .row')).toEqual(seal);
  expect(await ring('.c3 a[href="mailto:info@koisoftware.com"]')).toEqual(seal);
  expect(await ring('.c3 a[href="https://instagram.com/carloshugoeg"]')).toEqual(seal);

  const colorOf = (selector: string) =>
    page.locator(selector).first().evaluate((node) => getComputedStyle(node).color);
  await page.locator('nav a.talk').hover();
  await expect.poll(() => colorOf('nav a.talk')).toBe('rgb(184, 50, 30)');
  await page.locator('nav a[href="#servicios"]').hover();
  await expect.poll(() => colorOf('nav a[href="#servicios"]')).toBe('rgb(184, 50, 30)');
  await page.locator('nav a[href="#proyectos"]').hover();
  await expect.poll(() => colorOf('nav a[href="#proyectos"]')).toBe('rgb(184, 50, 30)');
  await page.locator('nav a[href="#nosotros"]').hover();
  await expect.poll(() => colorOf('nav a[href="#nosotros"]')).toBe('rgb(184, 50, 30)');
  await page.locator('.hero .cta').hover();
  await expect.poll(() => colorOf('.hero .cta')).toBe('rgb(184, 50, 30)');
});

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
