/**
 * English locale.
 * Content mirrors the static PDF (cv-pdf/cv-en.html):
 * one positioning, one set of numbers, one set of claims.
 */
export default {
  lang_label: 'EN',

  // ── Navigation
  nav_profile: 'Profile',
  nav_experience: 'Experience',
  nav_skills: 'Skills',
  nav_projects: 'Projects',
  nav_education: 'Education',
  nav_contact: 'Contact',

  // ── Hero
  hero_role: 'Senior PHP Developer',
  hero_spec: 'Symfony / Laravel · distributed systems &amp; high load',
  hero_lead: 'Senior backend engineer, <b>7+ years on PHP / Symfony</b>. For the last <b>3.5 years</b> my home ground has been the <b>money path of a product</b>: payments, balances and integrations; <b>12+ payment providers</b> shipped to production.',
  hero_cta_ru: 'Résumé PDF · RU',
  hero_cta_en: 'Résumé PDF · EN',
  hero_cta_contact: 'Get in touch',
  hero_location: 'Remote · UTC+3',

  m1_label: 'years on PHP',
  m2_unit: ' TB',
  m2_label: 'of data under my hands',
  m3_label: 'payment providers',

  // ── Section headings
  sec_profile: 'Profile',
  sec_experience: 'Experience',
  sec_skills: 'Skills',
  sec_projects: 'Projects',
  sec_education: 'Education',
  sec_contact: 'Contact',

  // ── Profile
  strengths_title: 'Strengths',
  str1_t: 'Payment idempotency',
  str1_d: 'I design so a payment cannot be lost, duplicated or spent twice: uniqueness enforced by the database, lock ordering instead of retries layered over the symptom, internal and external states that never diverge.',
  str2_t: 'Change on live production without a maintenance window',
  str2_d: 'Major database and framework upgrades, a dialect switch, carving services out of a monolith — staged and reversible, on a ~<b>50 TB</b> cluster and a <b>2 TB+</b> production database.',
  str3_t: 'Infrastructure is not someone else\'s job',
  str3_d: 'Docker and Kubernetes, RabbitMQ and Kafka, replication and sharding, GitLab CI / GitHub Actions pipelines, alerting in Grafana — I carry an epic from the architectural decision to the graphs in production.',

  prof_comp_k: 'Core competencies',
  prof_comp_v: 'payment integrations and billing · PHP / Symfony · Laravel · PostgreSQL · high-load and distributed systems',
  prof_dom_k: 'Domains',
  prof_dom_v: '<b>payments &amp; billing</b> · <b>fintech core</b> · SaaS · MedTech · classifieds · outsourcing',

  // ── Experience
  sec_stack: 'Stack',

  job1_dates: 'Apr 2024 — Jun 2026',
  job1_role: 'Senior PHP Developer · payments team',
  job1_co: 'systeme.io — international SaaS platform · Remote',
  job1_about: 'Funnels, courses, email marketing, payment acceptance. <b>Payments team</b> — the domain where a mistake costs money directly: ~<b>50 TB</b> of data, <b>12+ providers</b>, microservices around a monolith.',
  job1_stack: '<b>PHP 8.3—8.5</b>, <b>Symfony 6.4—7.4</b>, <b>Doctrine</b>, <b>PostgreSQL 14—18</b>, <b>MongoDB</b>, <b>Redis</b>, <b>RabbitMQ</b>, <b>Kafka</b>, <b>Docker</b>, <b>AWS</b>, <b>Grafana / Loki</b>, PHPStan level 9, GrumPHP',
  job1_b1: 'Ran a major <b>PostgreSQL 14 → 18</b> upgrade on a ~<b>50 TB</b> cluster without pausing payment acceptance: logical replication, drift driven to zero before cut-over, one contour switched at a time with the option to step back at any point.',
  job1_b2: 'Owned <b>all 12+ payment integrations</b> on the platform. Delivered <b>Apple Pay via Stripe</b> end-to-end and extracted one provider <b>from the monolith into a standalone microservice</b> — its own database, its own deployment, a shared contract bundle: a new provider plugs in without touching the core.',
  job1_b3: 'Designed a <b>partial-refund engine</b>: the business gave a one-line requirement — I defined the granularity (order-item level), four webhook routing scenarios, a guarded status machine and over-refund protection.',
  job1_b4: 'Built payment webhook intake so that <b>no money event is ever dropped or applied twice</b>: the raw payload is stored before processing, a guard on the event key, signature verification, retries over 30 days, and a bypass path during database maintenance.',
  job1_b5: 'With the team, <b>cut hot-path query latency 3×</b>: profiling, indexing strategies, batch processing in <b>Doctrine</b>. Owned the epic end-to-end — design, splitting work across two developers, acceptance.',
  job1_b6: 'Ran <b>PHP 8.3 → 8.5</b> and <b>Symfony 6.4 → 7.4 LTS</b> migrations on live production. Discipline through tooling: <b>PHPStan level 9</b>, a hard CI gate on every PR, real PostgreSQL and Redis in tests instead of mocks.',

  job2_dates: 'Mar 2023 — Mar 2024',
  job2_role: 'PHP Developer · CORE team',
  job2_co: 'Octopays (Mservis) — fintech platform · Remote',
  job2_about: 'Payment transaction processing and card payouts. Core team, <b>2 TB+</b> production database, real-time transaction processing, event-driven architecture.',
  job2_stack: '<b>PHP 7.4—8.2</b>, <b>Laravel 9—10</b>, <b>PostgreSQL</b>, MySQL, <b>Redis</b>, <b>Kafka</b>, <b>Docker</b>, ELK, <b>PHPUnit</b>, <b>PHPStan</b>',
  job2_b1: 'Balances with an <b>in-flight reserve</b>: money promised to pending operations cannot be spent twice under parallel requests. Payout idempotency enforced by a <b>unique database index</b> — the database rejects the duplicate, not the application code.',
  job2_b2: 'Eliminated <b>deadlocks</b> on parallel balance recalculation through <b>lock ordering and targeted FOR UPDATE</b> under READ COMMITTED — prevention at the access-pattern level, not a retry wrapper over the symptom.',
  job2_b3: 'Financial module: a transaction moves through about ten internal statuses while the merchant sees a simple pending / success / fail — built so that internal and external state never diverge.',
  job2_b4: 'Took part in the <b>MySQL → PostgreSQL</b> switch on a critical contour: reworking the schema for PG-specific types and indexes, staged data migration with no loss of integrity, aligning legacy code with the new dialect, and validation in production.',
  job2_b5: '<b>Laravel 9 → 10</b> migration, refactoring of critical payment pipelines, test coverage (<b>PHPUnit</b>), static analysis (<b>PHPStan</b>), observability on <b>ELK</b>.',

  job3_dates: 'Apr 2020 — Mar 2023',
  job3_role: 'PHP Developer',
  job3_co: 'Basis33 — outsourcing for EU clients · Remote',
  job3_about: 'A team of <b>25 engineers</b>. I ran two products in unrelated domains, both shipped to production: a <b>German medical platform</b> — two years, strict compliance, appointment booking and calendars — and a <b>video consultation service</b> integrated with the Zoom API.',
  job3_stack: '<b>PHP 7.4</b>, <b>Symfony 5.3</b>, API Platform, <b>MySQL</b>, <b>RabbitMQ</b>, Redis, Docker, GitLab CI/CD',
  job3_b1: 'Sped up the heavy screens of the medical platform: pulled query plans, unfolded <b>N+1</b> into explicit joins, picked composite indexes matching the real filters, moved hot result sets into <b>Redis</b> with invalidation driven by domain events. The production cluster ran with <b>replication and partitioning</b> — read paths went to the replica.',
  job3_b2: 'Kept contracts aligned between Frontend, Backend and DevOps: on a medical platform a mismatched contract costs more than a bug in the code.',
  job3_b3: 'Two unfamiliar domains back to back, both taken to production: stepping into someone else\'s problem space is routine for me, not an exception.',

  job4_dates: 'Feb 2019 — Mar 2020',
  job4_role: 'PHP Developer',
  job4_co: 'Sollento Group — classifieds and data collection · Remote',
  job4_about: 'Search-driven SPA classifieds platform and an automated data collection service.',
  job4_stack: '<b>PHP</b>, <b>Symfony</b>, Doctrine, <b>PostgreSQL</b>, Docker, Swagger, GitLab CI',
  job4_b1: 'Built the backend of a classifieds platform: a domain model shaped for search and filtering in <b>PostgreSQL</b>, a versioned <b>REST contract</b> documented in Swagger, automated builds and deployment through <b>GitLab CI</b>. The first place where I owned a system rather than individual tickets.',
  job4_b2: 'Wrote a collector pulling listings from external sources to keep the catalogue populated; laid out the codebase as <b>SOA</b> following SOLID and GRASP.',

  // ── Skills
  sk1_k: 'Languages &amp; frameworks',
  sk1_v: '<b>PHP 5.6—8.4</b>, <b>Symfony 3.4—7.4</b>, <b>Laravel 6—13</b>, Doctrine, API Platform, Symfony Messenger, <b>Go</b>, Composer / PSR, <b>OOP</b>, <b>SOLID</b>',
  sk1_s: 'GRASP, GoF patterns, DDD, CQRS, Hexagonal',
  sk2_k: 'Data &amp; database performance',
  sk2_v: '<b>PostgreSQL 14—18</b>, MySQL 5.7—8, <b>Redis</b>, <b>MongoDB</b>, <b>ClickHouse</b>, Elasticsearch, PgBouncer',
  sk2_s: 'query plans and composite indexes, partitioning of growing tables, sharding, logical replication, upgrades under load',
  sk3_k: 'Infrastructure &amp; operations',
  sk3_v: '<b>Docker</b>, <b>Kubernetes</b>, <b>Linux</b>, <b>AWS</b> (ECS, EC2, S3), Nginx, <b>GitLab CI</b>, GitHub Actions, <b>Grafana / Loki</b>, Prometheus, Sentry, ELK',
  sk3_s: 'metrics, logs, alerting, incident analysis down to root cause',
  sk4_k: 'Distributed systems &amp; real-time',
  sk4_v: '<b>Kafka</b>, <b>RabbitMQ</b>, Symfony Messenger, <b>Mercure</b>, <b>Centrifugo</b>, WebSocket, microservices, REST API / OpenAPI',
  sk4_s: 'webhook intake and orchestration, idempotent handlers, retries and DLQ, outbox, saga',
  sk5_k: 'Quality &amp; testing',
  sk5_v: '<b>PHPUnit</b>, <b>PHPStan</b> (level 9), Rector, CS Fixer, GrumPHP, deptrac',
  sk5_s: 'code review, staged legacy refactoring without rewrites, tests against real databases',
  sk6_k: 'Frontend &amp; mobile',
  sk6_v: 'TypeScript, <b>Vue 3</b>, Next.js / React, Angular + Ionic, React Native, Capacitor, Tailwind, PWA',
  sk6_s: 'there to take my own products to the user, not to stop at the API',

  // ── Projects
  proj_sub: 'My own products — from idea and architecture through to production deployment, with no team behind me.',
  proj_grace_tag: 'DDD · CQRS · FSD',
  proj_grace_desc: 'Community platform: <b>4 bounded contexts</b>, command and query buses on Symfony Messenger, a Feature-Sliced frontend. Context boundaries are enforced by <b>deptrac</b>, not by agreement.',
  proj_arena_tag: 'EdTech · real-time',
  proj_arena_desc: 'Learn-to-code platform that runs code <b>in the browser</b>: Monaco editor, xterm terminal emulation, live collaboration over WebSocket.',
  proj_shushu_tag: 'Real-time PWA',
  proj_shushu_desc: 'Social gifting platform: real-time over <b>Centrifugo</b>, an installable <b>PWA</b> on Workbox, a Telegram bot, OAuth, gamification. 115 services, 36 entities.',
  proj_nesty_tag: 'Mobile-first',
  proj_nesty_desc: 'Rental marketplace with Leaflet maps and a hybrid mobile app: Angular + Ionic packaged for iOS and Android via <b>Capacitor</b>.',
  proj_travel_tag: 'Polyglot · PHP + Go',
  proj_travel_desc: 'Travel marketplace: <b>Go microservices</b> (Echo) for price search with rate limiting, multi-vendor integrations, a Next.js web app and a React Native mobile app.',
  proj_mentor_name: 'Mentorship',
  proj_mentor_tag: 'mid → senior',
  proj_mentor_desc: 'I take PHP developers from mid to <b>senior</b> on a structured programme: concept map, code review, mock interviews, weak-spot tracking. AI-assisted spec → code → QA loops are part of the process.',

  // ── Education and contact
  edu_uni: 'Belarusian State University of Informatics and Radioelectronics',
  edu_fac: 'Faculty of Computer Systems and Networks — Computer Science',
  edu_place: 'Minsk, Belarus',
  edu_lang: 'English — <b>B1</b>: I read and write documentation freely, hold working calls, and keep pushing the spoken side.',

  contact_lead: 'Open to senior roles with real ownership, remote.',
  contact_status: 'Open to opportunities',
  footer_note: 'Hand-built with Vite, Tailwind and a little vanilla JS. Same content as the PDF.',
};
