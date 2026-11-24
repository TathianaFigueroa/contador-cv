// Purpose: the clear button (REQ-003) — one press, no question, the count and message reset, undo restores.
const { test } = require('@playwright/test');
const { open, setText, readNow, count, expect, NO_UNDO_IN_WEBKIT } = require('./helpers');

const SUMMARY = 'Ingeniera de software con 8 años de experiencia en equipos ágiles.';

test('ROW-009, ROW-010, ROW-034: one press empties the box with no question, resets, and keeps focus', async ({ page }) => {
  let dialogs = 0;
  page.on('dialog', async (d) => { dialogs++; await d.dismiss(); });
  await open(page);
  await setText(page, 'a'.repeat(520));
  await page.locator('#borrar').click();
  const r = await readNow(page);
  expect(r).toMatchObject({ value: '', count: count(0), message: false });
  expect(dialogs).toBe(0);
  await page.keyboard.type('nuevo');
  expect((await readNow(page)).value).toBe('nuevo');
});

test('ROW-011: undo right after clearing brings back the exact text', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, SUMMARY);
  await page.locator('#borrar').click();
  await page.keyboard.press('ControlOrMeta+z');
  expect(await readNow(page)).toMatchObject({ value: SUMMARY, count: count(SUMMARY.length) });
});

test('ROW-032: the browser undo command restores, redo clears again, no doubling', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, SUMMARY);
  await page.locator('#borrar').click();
  await page.evaluate(() => document.execCommand('undo'));
  expect((await readNow(page)).value).toBe(SUMMARY);
  await page.evaluate(() => document.execCommand('redo'));
  expect((await readNow(page)).value).toBe('');
  await page.evaluate(() => document.execCommand('undo'));
  await page.evaluate(() => document.execCommand('undo'));
  expect((await readNow(page)).value.includes(SUMMARY + SUMMARY)).toBe(false);
});

test('ROW-033: clear twice then undo brings the text back', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, SUMMARY);
  await page.locator('#borrar').click();
  await page.locator('#borrar').click();
  for (let i = 0; i < 3 && (await readNow(page)).value === ''; i++) {
    await page.evaluate(() => document.execCommand('undo'));
  }
  expect((await readNow(page)).value).toBe(SUMMARY);
});

test('ROW-049: clear, undo, clear again, undo again', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, SUMMARY);
  await page.locator('#borrar').click();
  await page.evaluate(() => document.execCommand('undo'));
  await page.locator('#borrar').click();
  expect((await readNow(page)).value).toBe('');
  await page.evaluate(() => document.execCommand('undo'));
  expect((await readNow(page)).value).toBe(SUMMARY);
});

test('ROW-050: the button is reached with Tab and works with Enter and Space', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Safari does not move focus to buttons with Tab by default');
  await open(page);
  for (const key of ['Enter', ' ']) {
    await setText(page, SUMMARY);
    await page.locator('#resumen').focus();
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement.id)).toBe('borrar');
    await page.keyboard.press(key === ' ' ? 'Space' : key);
    expect((await readNow(page)).value).toBe('');
    await page.evaluate(() => document.execCommand('undo'));
    expect((await readNow(page)).value).toBe(SUMMARY);
  }
});
