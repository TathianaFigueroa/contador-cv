// Purpose: the over-limit message (REQ-002) — the 500/501 boundary, never blocking, and agreement with the shown count.
const { test } = require('@playwright/test');
const { MESSAGE, open, setText, readNow, count, expect, NO_UNDO_IN_WEBKIT } = require('./helpers');

test('ROW-005: no message at exactly 500, shown at 501 and staying while above', async ({ page }) => {
  await open(page);
  await setText(page, 'a'.repeat(500));
  expect(await readNow(page)).toMatchObject({ count: count(500), message: false });
  await setText(page, 'a'.repeat(501));
  expect(await readNow(page)).toMatchObject({ count: count(501), message: true });
  await expect(page.locator('#aviso')).toHaveText(MESSAGE);
  await page.waitForTimeout(10000);
  expect((await readNow(page)).message).toBe(true);
  await page.locator('#resumen').press('End');
  await page.keyboard.type('a'.repeat(99));
  expect(await readNow(page)).toMatchObject({ count: count(600), message: true });
});

test('ROW-006: the message goes once the text is back to 500 or fewer, by deleting or undoing', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, 'a'.repeat(501));
  await page.locator('#resumen').press('End');
  await page.keyboard.press('Backspace');
  expect(await readNow(page)).toMatchObject({ count: count(500), message: false });
  await page.keyboard.type('a');
  expect((await readNow(page)).message).toBe(true);
  await page.evaluate(() => document.execCommand('undo'));
  expect((await readNow(page)).message).toBe(false);
});

test('ROW-007: typing and inserting past 500 is accepted whole', async ({ page }) => {
  await open(page);
  await setText(page, 'a'.repeat(499));
  await page.locator('#resumen').press('End');
  await page.keyboard.type('bcdef');
  await page.keyboard.insertText('g'.repeat(300));
  const r = await readNow(page);
  expect(r.value.length).toBe(804);
  expect(r.count).toBe(count(804));
  expect(await page.locator('#resumen').getAttribute('maxlength')).toBeNull();
});

test('ROW-008: the message follows the shown count for emoji and accents near the limit', async ({ page }) => {
  await open(page);
  const unit = '😀👍🏽é'; // a surrogate pair, a skin-tone sequence and a combining accent: 3 characters
  await setText(page, unit.repeat(166) + 'ab'); // 500
  expect(await readNow(page)).toMatchObject({ count: count(500), message: false });
  await setText(page, unit.repeat(166) + 'abc'); // 501
  expect(await readNow(page)).toMatchObject({ count: count(501), message: true });
});

test('ROW-035, ROW-036: one message however often 500 is crossed, and the over-limit look follows it', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  const over = () => page.evaluate(() => document.documentElement.classList.contains('excedido'));
  for (let i = 0; i < 3; i++) {
    await setText(page, 'a'.repeat(501));
    await page.locator('#borrar').click();
    await page.evaluate(() => document.execCommand('undo'));
  }
  expect(await page.locator('[role="alert"]:visible').count()).toBe(1);
  expect(await over()).toBe(true);
  await page.locator('#resumen').press('End');
  await page.keyboard.press('Backspace');
  expect(await over()).toBe(false);
  await setText(page, 'a'.repeat(500));
  expect(await over()).toBe(false);
});

test('ROW-041: with the stylesheet blocked the boundary still holds', async ({ page }) => {
  await page.route('**/styles.css', (r) => r.abort());
  await open(page);
  await expect(page.locator('#aviso')).toBeHidden();
  await setText(page, 'a'.repeat(500));
  await expect(page.locator('#aviso')).toBeHidden();
  await setText(page, 'a'.repeat(501));
  await expect(page.locator('#aviso')).toBeVisible();
});

test('ROW-021: the page never changes what was typed, and the caret stays put, above 500 too', async ({ page }) => {
  await open(page);
  const text = '  dos  espacios é al final  ' + 'x'.repeat(500);
  await setText(page, text);
  expect((await readNow(page)).value).toBe(text);
  await page.evaluate(() => { const c = document.getElementById('resumen'); c.focus(); c.setSelectionRange(100, 100); });
  await page.keyboard.type('Q');
  const pos = await page.evaluate(() => document.getElementById('resumen').selectionStart);
  expect(pos).toBe(101);
});
