# 📄 CV Content Fixes — generalist переупаковка (EN + RU)

> **Что это:** новый контент резюме под позиционирование **«сильный адаптивный senior backend-инженер, открытый к любому домену»**.
> Это **источник правды** для контента: из него правится интерактивный сайт (`src/i18n/en.js`, `src/i18n/ru.js`)
> и собираются статические PDF (EN + RU). Исполняемый промт с конкретными правками кода — в `CV-adaptation-prompt.md`.

> 🧭 **Сквозной принцип:** PHP/Symfony — движок и keyword-якорь; FinTech/payments/highload — **доказательства планки**,
> поданные как «недавний опыт / один из примеров», а не как идентичность. Везде есть сигнал открытости к новому домену.
> Адаптивность (PHP 5.6→8.5, 4 компании, несколько СУБД) — **главный аргумент** «возьму любую сферу», выносим вперёд.

---

## ⚠️ Два сквозных фикса (применить ко ВСЕМ форматам)

1. **Единая цифра масштаба данных — `~50 TB` (зафиксировано).** Сейчас в `en.js`/`ru.js` рассинхрон: `about_text` говорит **«500 TB+»**, а `job1_*` и `str1_desc` — **«~50 TB»**. Это ловится на интервью. **Ставим `~50 TB` ВЕЗДЕ** (`about_text`, `job1_summary`, `job1_a1`, `str1_desc`, hero-стат `Data Processed`) — `500 TB+` в About заменить на `~50 TB`. Никаких «500» нигде. В текстах ниже цифра уже проставлена.
2. **Единый email:** `vladlikedev@gmail.com` (уже стоит в `index.html` и `cv.html` — просто не давать ему разъезжаться).

---

## 1. HERO / ТИТУЛ

**Роль (титул) — было → стало:**
- Сайт `typing_phrases` (EN): ~~`['Backend Architect', 'PHP Expert', 'Payment Systems Specialist', 'Highload Engineer']`~~
  → **`['Backend Engineer', 'Software Architect', 'PHP / Symfony Expert', 'High-Load & Scale']`**
- Сайт `typing_phrases` (RU): ~~`['Backend Архитектор', 'PHP Эксперт', 'Специалист по платежным системам', 'Highload Инженер']`~~
  → **`['Backend Инженер', 'Архитектор систем', 'PHP / Symfony Эксперт', 'High-Load и масштаб']`**
- Статический PDF `role-tag`: ~~`Senior Software Developer`~~ → **`Senior Backend Engineer`**
- Статический PDF `role`-строка (RU): ~~`Senior PHP Backend Developer · 7+ лет · Платёжные платформы, highload SaaS и другое`~~
  → **`Senior Backend Engineer · PHP / Symfony · 7+ лет · high-load, архитектура и любые сложные домены`**

> Убираем «Payment Systems Specialist» как самоназвание — это ровно тот ярлык, от которого отвязываемся.

---

## 2. ABOUT (главный блок переупаковки)

**EN (`about_text`) — новый текст:**
```
Senior backend engineer who builds, scales, and owns the systems businesses depend on — <strong>7+ years</strong> in <strong>PHP / Symfony</strong> across SaaS, FinTech, healthcare and web platforms. Deep where it counts, <strong>adaptable by default</strong>: shipped across <strong>PHP 5.6 → 8.5</strong>, Symfony 3.4 → 7.4 and Laravel 6 → 10, with PostgreSQL, MySQL, MongoDB and MySQL → PostgreSQL migrations. Strong in <strong>scalable architecture</strong>, <strong>high-load systems</strong>, REST APIs, DDD/SOLID, database performance and testing. Most recently leading backend work on the systeme.io platform — <strong>microservice architecture</strong>, multiple payment-provider integrations, <strong>~50 TB of data</strong>. I'm <strong>domain-agnostic by choice</strong> and open to remote roles worldwide — the constant isn't the domain, it's how I work: ownership end-to-end.
```

**RU (`about_text`) — новый текст:**
```
Senior backend-инженер, который строит, масштабирует и <strong>владеет</strong> системами, от которых зависит бизнес — <strong>7+ лет</strong> на <strong>PHP / Symfony</strong> в SaaS, финтехе, медицине и веб-платформах. Глубоко там, где это важно, и <strong>адаптивен по умолчанию</strong>: прошёл <strong>PHP 5.6 → 8.5</strong>, Symfony 3.4 → 7.4, Laravel 6 → 10, работал с PostgreSQL, MySQL, MongoDB и миграциями MySQL → PostgreSQL. Силён в <strong>масштабируемой архитектуре</strong>, <strong>highload-системах</strong>, REST API, DDD/SOLID, производительности БД и тестировании. Последнее время веду backend платформы systeme.io — <strong>микросервисная архитектура</strong>, интеграции платёжных провайдеров, <strong>~50 ТБ данных</strong>. <strong>Не привязан к домену</strong> и открыт к remote-ролям по всему миру — постоянная величина не сфера, а подход: ownership от и до.
```

> Ключевые сдвиги: адаптивность и «across SaaS, FinTech, healthcare, web» — впереди; платежи — «most recently / one of»; добавлена явная строка «domain-agnostic by choice / не привязан к домену»; убран overclaim 500 TB.

---

## 3. EXPERIENCE — роли (титулы) и акценты

**Титулы ролей — было → стало** (в `index.html`/`cv.html` и `job1_role`):
- systeme.io: ~~`Senior PHP Developer`~~ → **`Senior Backend Engineer (PHP/Symfony)`**
- Octopays (Mservis): `PHP Developer` → **`Backend Engineer (PHP)`**
- Basis33: `PHP Developer` → **`Backend Engineer (PHP)`**
- Sollento: `PHP Developer` → **`Backend Engineer (PHP)`**

**Акценты буллетов (контент в основном силён — корректируем рамку, не цифры):**
- `job1_a1` (EN): `<strong>High-load</strong> SaaS: ~50 TB data; I own backend epics end-to-end — design, delivery, release, monitoring — not just assigned tickets.`
- `job1_a2`: оставить как есть (ApplePay/Stripe, Flutterwave→микросервис) — добавить хвост «— a pattern reusable beyond payments / паттерн, переносимый за пределы платежей».
- `job3_a1` (Basis33): подчеркнуть **смену доменов** — «DeinArzt (медицина) и Fsexpert (консультации) — два очень разных домена, оба доведены до прода» — это доказательство «зайду в любую сферу».
- Везде, где встречается цифра данных — **единая** `~50 TB`.

> Содержание ролей переписывать целиком не нужно — оно сильное. Меняем титулы (шире) + добавляем 1 ownership/adaptation-акцент на роль. Полные EN-буллеты для LinkedIn — в `../JOB-SEARCH-2026/02-LinkedIn-тексты-EN.md`.

---

## 4. STRENGTHS — порядок и формулировки

- **Поставить «Adaptability» первой** (сейчас вторая). Это главный generalist-сигнал.
  - EN metric `PHP 5.6 → 8.5`; desc усилить: «…across 4 companies and several domains — I get productive in unfamiliar codebases and problem spaces fast.»
  - RU: «…в 4 компаниях и нескольких доменах — быстро вникаю в незнакомый код и новые задачи.»
- Problem Solving, Communication, Mentorship — оставить, в `str1_desc` выровнять цифру данных под единую.

---

## 5. CONTACT / СТАТУС

- `contact_status` (EN): ~~`Open to opportunities`~~ → **`Open to remote opportunities — any domain`**
- `contact_status` (RU): ~~`Открыт для предложений`~~ → **`Открыт к remote-предложениям — любой домен`**
- Email везде: **`vladlikedev@gmail.com`**.

---

## 6. SKILLS — порядок категорий

Категории и так общие (Languages & Frameworks, Databases, DevOps, Architecture, Testing, Monitoring) — **доменный блок платежей не делать заголовком**. `payment_label` («Payment Systems Integration») оставить как подпись внутри, не выносить наверх. Порядок категорий: Architecture/Languages/DB/DevOps впереди, платежи — внутри как один из навыков.

---

## 7. META / SEO (для статического PDF и `index.html`)

- `<title>` / og:title: ~~`Vladislav Laikov — Senior PHP Developer`~~ → **`Vladislav Laikov — Senior Backend Engineer (PHP/Symfony)`**
- meta description (cv.html): убрать «платёжные платформы» как ядро → **`Senior Backend Engineer · PHP/Symfony · 7+ лет · high-load системы, архитектура, ownership. Адаптивен к любому домену.`**

---

## ✅ Чек-лист готовности контента

- [ ] Титул везде = `Senior Backend Engineer · PHP / Symfony`
- [ ] About: адаптивность впереди, «domain-agnostic / не привязан», платежи как «most recently»
- [ ] Единая цифра данных во всех местах (about, job1, strengths, hero-стат)
- [ ] typing_phrases без «Payment Systems Specialist»
- [ ] Strengths: Adaptability первой
- [ ] Email `vladlikedev@gmail.com` везде
- [ ] contact_status с «any domain / любой домен»
- [ ] meta/title обновлены
- [ ] EN и RU синхронны по смыслу

---

*Дальше → `CV-adaptation-prompt.md` (исполняемый промт с правками кода + сборка двух PDF).*
