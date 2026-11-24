// Purpose: the character counter (REQ-001) — the counting rule, the count's form, and every way the text can change.
const { test } = require('@playwright/test');
const { open, setText, readNow, count, expect, NO_UNDO_IN_WEBKIT } = require('./helpers');

// Expected counts by the owner's rule (A-001 as restated, A-016): what the person sees counts one,
// an emoji or accented letter counts one however built, a lone invisible character counts one,
// and a mark or joiner after a space counts on its own.
const CASES = [
  ['abc', 3], ['a b', 3], ['a\nb\n', 4], ['  hola  ', 8], [' \t ', 3], [' x', 2],
  ['é', 1], ['ñ', 1], ['ñ', 1],
  ['👨‍👩‍👧', 1], ['🇸🇻', 1], ['👍🏽', 1], ['❤️', 1], ['1️⃣', 1], ['#️⃣', 1], ['*️⃣', 1], ['👩‍💻', 1],
  ['abc​', 4], ['­', 1], ['a‏b', 3], ['a‎b', 3],
  ['a ́', 3], ['a ‍', 3], ['a 🏽', 3],
];

test('ROW-001: every character counts by the owner\'s rule', async ({ page }) => {
  await open(page);
  for (const [text, n] of CASES) {
    await setText(page, text);
    expect((await readNow(page)).count, JSON.stringify(text)).toBe(count(n));
  }
});

test('ROW-001: generated mixes count as the sum of their parts', async ({ page }) => {
  await open(page);
  let seed = 7;
  const rnd = (m) => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % m; };
  for (let i = 0; i < 25; i++) {
    let text = '';
    let n = 0;
    for (let j = 0; j < 30; j++) {
      const [t, k] = CASES[rnd(CASES.length)];
      // a part starting with a mark or joiner would fuse with what precedes it; join with a letter
      text += 'x' + t;
      n += 1 + k;
    }
    await setText(page, text);
    expect((await readNow(page)).count).toBe(count(n));
  }
});

test('ROW-003, ROW-004: used characters, the real number past 500, no thousands separator', async ({ page }) => {
  await open(page);
  await setText(page, 'a'.repeat(123));
  expect((await readNow(page)).count).toBe('123 / 500');
  await setText(page, 'a'.repeat(523));
  expect((await readNow(page)).count).toBe('523 / 500');
  await setText(page, 'a'.repeat(1234));
  expect((await readNow(page)).count).toBe('1234 / 500');
});

test('ROW-002, ROW-048: undo and redo update the count at once, read with no retry', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', NO_UNDO_IN_WEBKIT);
  await open(page);
  await setText(page, 'hola mundo');
  await page.evaluate(() => document.execCommand('undo'));
  expect((await readNow(page)).count).toBe(count(0));
  await page.evaluate(() => document.execCommand('redo'));
  expect((await readNow(page)).count).toBe(count(10));
  await page.waitForTimeout(1000);
  expect((await readNow(page)).count).toBe(count(10));
});

test('ROW-046, ROW-047: deletions by keyboard, typing over a selection, and a box emptied by hand', async ({ page }) => {
  await open(page);
  const box = page.locator('#resumen');
  await box.click();
  await page.keyboard.type('uno dos tres');
  await page.keyboard.press('Backspace');
  expect((await readNow(page)).count).toBe(count(11));
  await page.keyboard.press('Home');
  await page.keyboard.press('Delete');
  expect((await readNow(page)).count).toBe(count(10));
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.type('xy');
  expect((await readNow(page)).count).toBe(count(2));
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.press('Delete');
  const r = await readNow(page);
  expect(r.value).toBe('');
  expect(r.count).toBe(count(0));
});

test('ROW-019: text inserted with no key press is counted at once', async ({ page }) => {
  await open(page);
  await page.locator('#resumen').click();
  await page.keyboard.insertText('dictado sin teclas 😀');
  expect((await readNow(page)).count).toBe(count(20));
});

test('ROW-020, ROW-037: a composed accent counts once, and clear during composition leaves the box empty', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'real composition is driven in Chromium only (ROW-023)');
  await open(page);
  await page.locator('#resumen').click();
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.imeSetComposition', { text: '´', selectionStart: 1, selectionEnd: 1 });
  await cdp.send('Input.insertText', { text: 'é' });
  await page.waitForTimeout(50);
  expect((await readNow(page)).count).toBe(count(1));
  await cdp.send('Input.imeSetComposition', { text: 'hol', selectionStart: 3, selectionEnd: 3 });
  await page.locator('#borrar').click();
  await page.keyboard.type('z');
  const r = await readNow(page);
  expect(r.value).toBe('z');
  expect(r.count).toBe(count(1));
});

test('ROW-024, ROW-014: after a reload the box is empty and the count agrees with it', async ({ page }) => {
  await open(page);
  await setText(page, 'texto que no debe volver');
  await page.reload();
  await expect(page.locator('#contador')).toHaveText(count(0));
  expect(await page.locator('#resumen').inputValue()).toBe('');
  expect(await page.locator('#resumen').getAttribute('autocomplete')).toBe('off');
});

test('ROW-025: with the script blocked no count that looks like a reading, and no message', async ({ page }) => {
  await page.route('**/main.js', (r) => r.abort());
  await page.goto('/index.html');
  await page.locator('#resumen').fill('a'.repeat(600));
  await expect(page.locator('#contador')).toHaveText('');
  await expect(page.locator('#aviso')).toBeHidden();
});

test('ROW-042: with the counting facility missing, no reading and no message', async ({ page }) => {
  await page.addInitScript(() => { delete Intl.Segmenter; });
  await page.goto('/index.html');
  await setText(page, 'é👨‍👩‍👧' + 'a'.repeat(600));
  const r = await readNow(page);
  expect(r.count).toBe('');
  expect(r.message).toBe(false);
});

test('ROW-043: text typed while the script is still loading is kept and counted', async ({ page }) => {
  await page.route('**/main.js', async (r) => { await new Promise((ok) => setTimeout(ok, 2000)); await r.continue(); });
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await page.locator('#resumen').pressSequentially('rápido');
  await expect(page.locator('#contador')).toHaveText(count(6));
  expect(await page.locator('#resumen').inputValue()).toBe('rápido');
});

test('ROW-038: resizing and rotating leave the text, count and message unchanged', async ({ page }) => {
  await open(page);
  await setText(page, 'b'.repeat(520));
  for (const size of [{ width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1280, height: 800 }]) {
    await page.setViewportSize(size);
    const r = await readNow(page);
    expect(r.count).toBe(count(520));
    expect(r.message).toBe(true);
    expect(r.value.length).toBe(520);
  }
});

test('ROW-044: unusual text raises no error and the count keeps following the box', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await open(page);
  for (const t of ['a\uD800b', 'a\u0000b', 'שלום ‏ abc', 'x'.repeat(2000)]) {
    await setText(page, t);
  }
  expect((await readNow(page)).count).toBe(count(2000));
  expect(errors).toEqual([]);
});
