// Purpose: nothing about the person is kept or sent (CON-001, CON-002) — requests, storage, address, title, clipboard, lifecycle.
const { test } = require('@playwright/test');
const { open, setText, readNow, count, expect } = require('./helpers');

const OWN = new Set(['/index.html', '/styles.css', '/main.js']);

// The clipboard API needs a secure page: serve the product's files under localhost, which browsers treat as secure.
const SECURE = 'http://localhost:8099';
async function openSecure(page, baseURL) {
  await page.route(SECURE + '/**', async (route) => {
    const res = await route.fetch({ url: route.request().url().replace(SECURE, baseURL) });
    await route.fulfill({ response: res });
  });
  await open(page, SECURE + '/index.html');
}

function watch(page) {
  const seen = [];
  page.context().on('request', (r) => seen.push(r.url()));
  return seen;
}

function foreign(seen, origin) {
  return seen.filter((u) => !(u.startsWith(origin) && OWN.has(new URL(u).pathname)) && !u.startsWith('data:') && u !== 'about:blank');
}

test('ROW-012, ROW-045: only the page\'s own files are requested; no storage, cookie, address or title change', async ({ page, baseURL }) => {
  const seen = watch(page);
  await open(page);
  const title = await page.title();
  await setText(page, 'a'.repeat(600));
  await page.locator('#borrar').click();
  await page.evaluate(() => document.execCommand('undo'));
  await page.waitForTimeout(500);
  expect(foreign(seen, baseURL)).toEqual([]);
  const state = await page.evaluate(() => ({
    ls: localStorage.length, ss: sessionStorage.length, cookie: document.cookie,
    name: window.name, hist: history.state, path: location.pathname + location.search + location.hash,
  }));
  expect(state).toEqual({ ls: 0, ss: 0, cookie: '', name: '', hist: null, path: '/index.html' });
  expect(await page.title()).toBe(title);
  expect(await page.context().cookies()).toEqual([]);
});

test('ROW-013: with the network cut after load, everything still works', async ({ page, context }) => {
  await open(page);
  await context.setOffline(true);
  await setText(page, 'a'.repeat(501));
  expect(await readNow(page)).toMatchObject({ count: count(501), message: true });
  await page.locator('#borrar').click();
  expect(await readNow(page)).toMatchObject({ value: '', count: count(0) });
  await context.setOffline(false);
});

test('ROW-030, ROW-031: text in the page address never enters the box, and the page still works', async ({ page }) => {
  for (const path of ['/index.html?texto=hola', '/index.html#hola']) {
    await open(page, path);
    expect(await readNow(page)).toMatchObject({ value: '', count: count(0) });
    await setText(page, 'abc');
    expect((await readNow(page)).count).toBe(count(3));
  }
});

test('ROW-051: hiding the page and leaving it send nothing', async ({ page, baseURL }) => {
  const seen = watch(page);
  await open(page);
  await setText(page, 'texto privado');
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    window.dispatchEvent(new Event('pagehide'));
  });
  await page.goto('about:blank');
  await page.waitForTimeout(500);
  expect(foreign(seen, baseURL)).toEqual([]);
});

test('ROW-026, ROW-027: the clipboard is untouched, and copying by hand works', async ({ page, context, browserName, baseURL }) => {
  test.skip(browserName !== 'chromium', 'clipboard permissions are granted in Chromium only');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await openSecure(page, baseURL);
  await page.evaluate(() => navigator.clipboard.writeText('antes'));
  await setText(page, 'texto');
  await page.locator('#borrar').click();
  await page.evaluate(() => document.execCommand('undo'));
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('antes');
  await page.locator('#resumen').focus();
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.press('ControlOrMeta+c');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('texto');
});

test('ROW-028, ROW-029: formatted paste lands as plain text and loads nothing; plain lines keep their breaks', async ({ page, context, browserName, baseURL }) => {
  test.skip(browserName !== 'chromium', 'clipboard permissions are granted in Chromium only');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const seen = watch(page);
  await openSecure(page, baseURL);
  await page.evaluate(async () => {
    const html = '<p><b>Hola</b><img src="http://198.51.100.7/x.png"></p><ul><li>uno</li></ul>';
    await navigator.clipboard.write([new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob(['Hola\nuno'], { type: 'text/plain' }),
    })]);
  });
  await page.locator('#resumen').focus();
  await page.keyboard.press('ControlOrMeta+v');
  const r = await readNow(page);
  expect(r.value).not.toContain('<');
  expect(r.count).toBe(count(r.value.length));
  expect(r.value).toContain('\n');
  await page.waitForTimeout(500);
  expect(foreign(seen, SECURE)).toEqual([]);
});

test('ROW-022: the page declares UTF-8 within its first 1024 bytes, and accents show although the server sends no charset', async ({ page, request }) => {
  const res = await request.get('/index.html');
  expect(res.headers()['content-type']).not.toContain('charset');
  const head = (await res.body()).subarray(0, 1024).toString('latin1');
  expect(head.toLowerCase()).toContain('<meta charset="utf-8">');
  await open(page);
  await setText(page, 'a'.repeat(501));
  await expect(page.locator('#aviso')).toContainText('Acórtalo');
});
