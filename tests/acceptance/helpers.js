// Purpose: shared steps for the acceptance tests — open the page, edit the box as the browser does, read the count and the message.
const { expect } = require('@playwright/test');

const MESSAGE = 'Tu resumen supera los 500 caracteres. Acórtalo para que quepa.';

async function open(page, path = '/index.html') {
  await page.goto(path);
  await expect(page.locator('#contador')).not.toHaveText('');
}

// Replace the whole text through the browser's own editing command (not by setting the value).
async function setText(page, text) {
  await page.evaluate((t) => {
    const c = document.getElementById('resumen');
    c.focus();
    c.select();
    document.execCommand('insertText', false, t);
  }, text);
}

// Read once, with no retrying.
async function readNow(page) {
  return page.evaluate(() => ({
    count: document.getElementById('contador').textContent,
    message: !document.getElementById('aviso').hidden,
    value: document.getElementById('resumen').value,
  }));
}

function count(n) {
  return `${n} / 500`;
}

module.exports = { MESSAGE, open, setText, readNow, count, expect };

// Playwright's Linux build of WebKit undoes nothing, not even plain typing (a diagnostic run on
// 2026-11-24 showed Control+Z, Meta+Z and execCommand('undo') all leaving the text unchanged), so
// undo is checked there only on a real Safari, by the grading checklist's real-device line.
const NO_UNDO_IN_WEBKIT = 'WebKit test build has no working undo; checked on real Safari (grading checklist)';
module.exports.NO_UNDO_IN_WEBKIT = NO_UNDO_IN_WEBKIT;
