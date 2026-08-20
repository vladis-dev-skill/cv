import { chromium } from '/Users/vladis/.claude/skills/gstack/node_modules/playwright/index.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { copyFile, mkdir } from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [source HTML, output PDF] — bilingual: RU (cv.html) + EN (cv-en.html).
// Имя файла — часть первого впечатления: у рекрутёра в папке лежит
// «Laikov-Vladislav-Senior-PHP.pdf», а не безликое «cv.pdf».
const TARGETS = [
  ['cv.html', 'Laikov-Vladislav-Senior-PHP.pdf'],
  ['cv-en.html', 'Laikov-Vladislav-Senior-PHP-en.pdf'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  deviceScaleFactor: 2,
});

for (const [srcName, outName] of TARGETS) {
  const SRC = path.join(__dirname, srcName);
  const OUT = path.join(__dirname, outName);

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

  await page.close();

  // Вторая копия — в public/: сайт отдаёт PDF по кнопкам «Резюме PDF · RU / EN».
  // Пишем здесь, а не руками, иначе версии на сайте и в репозитории разъезжаются.
  const PUB = path.join(__dirname, '..', 'public', outName);
  await mkdir(path.dirname(PUB), { recursive: true });
  await copyFile(OUT, PUB);

  console.log(`PDF written: ${OUT}\n         → ${PUB}`);
}

await browser.close();
