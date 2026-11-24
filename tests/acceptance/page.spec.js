// Purpose: the page as a whole — the shell, reachability, the Spanish wording, and the person's journey end to end.
const { test } = require('@playwright/test');
const { MESSAGE, open, setText, readNow, count, expect, NO_UNDO_IN_WEBKIT } = require('./helpers');

test('ROW-016: the page loads with its title, labelled box, count, button, no message and no console error', async ({ page }) => {
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  await open(page);
  await expect(page).toHaveTitle('Contador de caracteres para tu CV');
  await expect(page.getByLabel('Escribe o pega aquí el resumen de tu CV')).toBeVisible();
  await expect(page.locator('#contador')).toHaveText(count(0));
  await expect(page.getByRole('button', { name: 'Borrar todo' })).toBeVisible();
  await expect(page.locator('#aviso')).toBeHidden();
  expect(await page.locator('textarea').count()).toBe(1);
  expect(await page.locator('button, input, select, a').count()).toBe(1);
  expect(errors).toEqual([]);
});

test('ROW-017: the page is reached at its address and at /index.html', async ({ page }) => {
  for (const path of ['/', '/index.html']) {
    await open(page, path);
    await expect(page.locator('#resumen')).toBeVisible();
  }
  expect(await page.locator('a[href]').count()).toBe(0);
});

test('ROW-015: every word is Spanish, addresses the person as tú, and calls the document CV', async ({ page }) => {
  await open(page);
  const words = await page.evaluate(() => {
    const out = [document.title, document.documentElement.lang];
    for (const el of document.querySelectorAll('h1, label, button, #aviso')) out.push(el.textContent.trim());
    for (const el of document.querySelectorAll('[placeholder], [title], [aria-label]')) {
      out.push(el.getAttribute('placeholder') || el.getAttribute('title') || el.getAttribute('aria-label'));
    }
    return out;
  });
  expect(words).toEqual([
    'Contador de caracteres para tu CV', 'es',
    'Resumen de tu CV', 'Escribe o pega aquí el resumen de tu CV', 'Borrar todo', MESSAGE,
  ]);
  const usted = /\b(su|usted|ingrese|introduzca|pegue|escriba|borre|limpie|currículum|hoja de vida)\b/i;
  for (const w of words) expect(w).not.toMatch(usted);
});

test('ROW-018: the journey — write, pass 500, trim back, clear, undo', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, 'Diseñadora de producto. ');
  expect((await readNow(page)).count).toBe(count(24));
  await page.locator('#resumen').press('End');
  await page.keyboard.insertText('x'.repeat(480));
  expect(await readNow(page)).toMatchObject({ count: count(504), message: true });
  for (let i = 0; i < 4; i++) await page.keyboard.press('Backspace');
  expect(await readNow(page)).toMatchObject({ count: count(500), message: false });
  await page.locator('#borrar').click();
  expect(await readNow(page)).toMatchObject({ value: '', count: count(0), message: false });
  await page.keyboard.press('ControlOrMeta+z');
  expect((await readNow(page)).count).toBe(count(500));
});
