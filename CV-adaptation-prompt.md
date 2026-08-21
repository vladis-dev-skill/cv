# 🤖 CV Adaptation Prompt — запусти это в репозитории `CV_VL`

> **Как использовать:** открой Claude Code в `~/PhpstormProjects/Mentor/CV_VL/` и вставь блок ниже (от `===PROMPT===`
> до конца) как сообщение. Промт самодостаточен: он прочитает `CV-content-fixes.md`, проанализирует сайт и PDF и применит правки.
> Цифра масштаба данных зафиксирована: **`~50 TB` везде** (фикс №1 в `CV-content-fixes.md`). Запускать можно сразу.

---

```
===PROMPT===

Ты — Senior Frontend/Build инженер. Работаешь в репозитории CV_VL (Vite + Tailwind, билингва EN/RU + статический PDF через Playwright). Задача: переупаковать резюме под позиционирование «сильный адаптивный senior backend-инженер, открытый к любому домену» и собрать ДВА статических PDF (EN + RU). Не ломай вёрстку, анимации и i18n-механику.

ШАГ 0 — Контекст (прочитай перед правками):
1. Прочитай `CV-content-fixes.md` в корне — это источник правды по контенту (EN+RU, все «было→стало»).
2. Прочитай `src/i18n/en.js`, `src/i18n/ru.js`, `index.html`, `cv-pdf/cv.html`, `cv-pdf/build-pdf.mjs`.
3. Зафиксируй два сквозных правила: (а) ЕДИНАЯ цифра масштаба данных везде = **`~50 TB`** (в живом CV `about_text` сейчас «500 TB+» — заменить на `~50 TB`; никаких «500» нигде); (б) email везде `vladlikedev@gmail.com`.

ШАГ 1 — Интерактивный сайт (контент в i18n):
В `src/i18n/en.js` и `src/i18n/ru.js` примени из `CV-content-fixes.md`:
- `typing_phrases` — новые наборы (убрать «Payment Systems Specialist» / «Специалист по платежным системам»).
- `about_text` — новый generalist-текст (EN и RU из дока). Сохрани HTML-теги `<strong>` и формат строки.
- `job1_role` → `Senior Backend Engineer (PHP/Symfony)`. Если роли job2/3/4 захардкожены в `index.html` — поправь их там на `Backend Engineer (PHP)`.
- `job1_a1` — добавить ownership-акцент; `job1_a2` — хвост «pattern reusable beyond payments / переносимый за пределы платежей»; `job3_a1` — подчеркнуть смену доменов (медицина/консультации).
- Strengths: переставить «Adaptability/Адаптация» на первое место среди str-блоков (поменяй порядок рендера или ключи так, чтобы адаптивность шла первой — выбери наименее инвазивный способ, не сломав вёрстку), усилить desc по доку.
- `contact_status` — «Open to remote opportunities — any domain» / «Открыт к remote-предложениям — любой домен».
- ЕДИНАЯ цифра данных в `about_text`, `job1_summary`, `job1_a1`, `str1_desc` (и в hero-стате, если число захардкожено).
- Проверь, что EN и RU остались синхронны по смыслу и по числу ключей i18n (никаких потерянных ключей).

ШАГ 2 — Meta/SEO в `index.html`:
- `<title>` и og:title → `Vladislav Laikov — Senior Backend Engineer (PHP/Symfony)`.
- Убедись, что email в контактах = `vladlikedev@gmail.com` (уже так — не сломать).

ШАГ 3 — Статический PDF, билингва (главное новое):
Сейчас `cv-pdf/cv.html` — только RU. Нужны ДВА PDF: RU и EN.
1. Обнови RU `cv-pdf/cv.html` по контенту из дока: `role-tag` → `Senior Backend Engineer`; `role`-строка → `Senior Backend Engineer · PHP / Symfony · 7+ лет · high-load, архитектура и любые сложные домены`; summary → новый RU-about (адаптивность впереди, платежи как «недавнее»); единая цифра данных; meta description по доку; титулы ролей `Backend Engineer (PHP)`.
2. Создай `cv-pdf/cv-en.html` — английская версия той же вёрстки/стилей, контент из EN-блоков дока (role, summary, роли, strengths, контакты). Сохрани идентичный дизайн, поменяй только текст на EN и `lang="en"`.
3. Обнови `cv-pdf/build-pdf.mjs` так, чтобы он собирал ОБА файла: `cv.html → cv-ru.pdf` (или оставить `cv.pdf` для RU) и `cv-en.html → cv-en.pdf`. Сделай это циклом по массиву пар [src, out], сохранив текущие настройки (A4, deviceScaleFactor 2, fonts.ready, printBackground, preferCSSPageSize, нулевые поля).

ШАГ 4 — Сборка и проверка:
1. Собери PDF: `node cv-pdf/build-pdf.mjs` (Playwright уже подключается из gstack — путь импорта в build-pdf.mjs не менять).
2. Проверь, что оба PDF созданы и непустые (`ls -la cv-pdf/*.pdf`).
3. Прогони dev-сборку сайта на ошибки: `npm run build` — убедись, что билд проходит без ошибок.
4. Grep-проверки консистентности (выведи результат):
   - один email: `grep -rin "gmail" src/ index.html cv-pdf/*.html` → только `vladlikedev@gmail.com`.
   - одна цифра данных: `grep -rin "TB" src/ index.html cv-pdf/*.html` → одно и то же число, без «500».
   - нет старого ярлыка: `grep -rin "Payment Systems Specialist\|Специалист по платежным" src/` → пусто.

ШАГ 5 — Отчёт:
Кратко перечисли: какие файлы изменены, какие PDF собраны, результаты grep-проверок, и что осталось на ручную проверку (например, реальная цифра данных, если был плейсхолдер). НЕ коммить — оставь изменения в рабочем дереве, я проверю сам.

Принципы: минимальные диффы, не трогай то, что не относится к переупаковке; сохрани все анимации, грид-фон, тему, навигацию; EN и RU должны остаться зеркальными по структуре.

===PROMPT===
```

---

## Что промт делает (резюме для тебя)

| Файл | Изменение |
|------|-----------|
| `src/i18n/en.js`, `ru.js` | typing_phrases, about_text (generalist), job-роли/акценты, strengths-порядок, contact_status, единая цифра данных |
| `index.html` | title/og:title, проверка email, роли job2–4 если захардкожены |
| `cv-pdf/cv.html` | RU PDF: новый титул/summary/роли, единая цифра, meta |
| `cv-pdf/cv-en.html` | **новый** — EN-версия PDF (та же вёрстка) |
| `cv-pdf/build-pdf.mjs` | собирает оба PDF (RU + EN) |
| итог | `cv-pdf/cv-ru.pdf` (или `cv.pdf`) + `cv-pdf/cv-en.pdf` |

> ✅ Цифра масштаба данных зафиксирована (`~50 TB` везде) — отдельных правок перед запуском не требуется.
> Промт намеренно НЕ коммитит — сначала глазами проверь оба PDF и сайт (`npm run dev`).
