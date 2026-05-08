import { chromium } from '/Users/vladis/.claude/skills/gstack/node_modules/playwright/index.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'cv.html');
const OUT = path.join(__dirname, 'cv.pdf');

const browser = await chromium.launch();
const ctx = await browser.newContext({
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.goto(pathToFileURL(SRC).href, { waitUntil: 'networkidle' });
// Wait for all web fonts to be loaded.
await page.evaluate(async () => {
  await document.fonts.ready;
});
// Force a small extra settle for layout.
await page.waitForTimeout(300);

await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();
console.log(`PDF written: ${OUT}`);
