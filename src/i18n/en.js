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
  hero_avail: 'Open to offers · remote',
  hero_role: 'Senior PHP Developer',
  hero_spec: 'High-load · distributed systems · Symfony / Laravel · PostgreSQL · microservices',
  hero_lead: 'Senior backend engineer, <b>7+ years on PHP / Symfony</b>. I build and keep in production systems where a mistake costs money and downtime: high load, distributed architecture, ~<b>50 TB</b> of data under my hands. For the last <b>3.5 years</b> my home ground has been the <b>money path of a product</b>: payments, balances and integrations, with <b>10+ payment providers</b> shipped to production. Before that — fintech core, a medical SaaS platform and classifieds: stepping into an unfamiliar domain is routine for me, not an exception. I carry an epic end-to-end, from the architectural decision to the graphs in production.',
  hero_cta_ru: 'Résumé PDF · RU',
  hero_cta_en: 'Résumé PDF · EN',
  hero_cta_contact: 'Get in touch',
  hero_location: 'Remote · UTC+3',

  m1_label: 'years of experience',
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
  about_p1: 'I design the money path so a payment cannot be lost, duplicated or spent twice: uniqueness is enforced by the database itself rather than by application code, lock ordering removes deadlocks instead of retries layered over the symptom, and internal and external states never diverge. Heavy operations move out of the synchronous cycle into queues, and the way the result comes back is chosen to fit the task.',
  about_p2: 'I change live production without a maintenance window: major database and framework upgrades, a dialect switch and carving services out of a monolith are staged and reversible, on a ~<b>50 TB</b> cluster. Infrastructure is not someone else\'s job — <b>Docker</b> and <b>Kubernetes</b>, <b>RabbitMQ</b> and <b>Kafka</b>, replication and sharding, <b>GitLab CI</b> / <b>GitHub Actions</b> pipelines, alerting in <b>Grafana</b>: I carry an epic from the architectural decision to the graphs in production.',

  prof_comp_k: 'Core competencies',
  prof_comp_v: 'payment integrations and billing · idempotency and consistency of money operations · <b>PHP 8 / Symfony 6—7</b> · Laravel · <b>PostgreSQL</b> and query tuning · queues and events (Kafka, RabbitMQ, Mercure) · carving services out of a monolith · Docker / Kubernetes, CI/CD, observability',
  prof_dom_k: 'Domains',
  prof_dom_v: '<b>payments &amp; billing</b> · <b>fintech core</b> · all-in-one SaaS · MedTech · classifieds · outsourcing for EU clients',
  prof_scale_k: 'Scale',
  prof_scale_v: '~<b>50 TB</b> of data and a PostgreSQL cluster under load · ~<b>1B</b> emails a month · ~<b>5M</b> payment transactions a month · <b>10+</b> providers and <b>40+</b> payment methods',





  card_link: 'Details',

  // ── Experience
  sec_stack: 'Stack',

  job1_dates: 'Apr 2024 — Present',
  job1_role: 'Senior PHP Developer · payments team',
  job1_co: 'systeme.io — international SaaS platform · Remote',
  job1_about: 'An international all-in-one SaaS platform for online business (email marketing, sales funnels, online courses, payment acceptance): <b>15M+</b> registered accounts and <b>500K+</b> active businesses across <b>170+ countries</b>. A high-load system: around <b>1B</b> email sends a month (<b>12B+</b> a year), ~<b>2B</b> contact records in the database, millions of published pages and funnels drawing hundreds of millions of views a month. Carving pieces of the monolith out into services — staged and reversible.',
  job1_stack: '<b>PHP 8.3—8.5</b>, <b>Symfony 6.4—7.4</b>, <b>Doctrine</b>, <b>PostgreSQL 14—18</b>, <b>MongoDB</b>, <b>Redis</b>, <b>RabbitMQ</b>, <b>Kafka</b>, <b>Mercure</b>, <b>Docker</b>, <b>AWS</b>, <b>Grafana / Loki</b>, PHPStan level 9, GrumPHP',
  job1_b1: 'Replaced client-side polling with push over <b>Mercure (SSE)</b>: heavy operations left the synchronous request for queues, and the interface receives an event the moment the result is ready instead of polling on a timer. Designed an observer registry for it: a new polling site plugs in as a single class, with no edits to business handlers, and an event fires only when the response actually changes. Result: <b>~200K redundant requests an hour</b> gone — <b>~1.5B a year</b>, about <b>90% of polling traffic</b>; the busiest route went from <b>~70K requests an hour to ~4K</b>.',
  job1_b2: 'Owned <b>all 10+ payment integrations</b> on the platform. Delivered <b>Apple Pay via Stripe</b> end-to-end and extracted one provider <b>from the monolith into a standalone microservice</b> — its own database, its own deployment, a shared contract bundle: a new provider plugs in without touching the core.',
  job1_b3: 'Designed a <b>partial-refund engine</b>: the business gave a one-line requirement — I defined the granularity (order-item level), four webhook routing scenarios, a guarded status machine and over-refund protection.',
  job1_b4: 'Ran a major <b>PostgreSQL 14 → 18</b> upgrade on a ~<b>50 TB</b> cluster without pausing payment acceptance: the new database ran alongside the old one and stayed in sync through logical replication, we switched over in parts and could roll back at any step.',
  job1_b5: 'Ran <b>PHP 8.3 → 8.5</b> and <b>Symfony 6.4 → 7.4 LTS</b> migrations on live production. Discipline through tooling: <b>PHPStan level 9</b>, a hard CI gate on every PR, real PostgreSQL and Redis in tests instead of mocks.',

  job2_dates: 'Mar 2023 — Mar 2024',
  job2_role: 'PHP Developer · CORE team',
  job2_co: 'Octopays (Mservis) — fintech platform · Remote',
  job2_about: 'An international payment provider (PSP aggregator) for the high-risk segment: payment acceptance and payouts to cards and wallets across <b>10+ countries</b>. A high-load system: ~<b>5M</b> transactions a month (<b>60M+</b> a year), <b>40+</b> payment methods and providers, <b>200+</b> active merchants. Core team, a <b>2 TB+</b> production database, real-time transaction processing, event-driven architecture (<b>Kafka</b>, millions of events a day).',
  job2_stack: '<b>PHP 7.4—8.2</b>, <b>Laravel 9—10</b>, <b>PostgreSQL</b>, MySQL, <b>Redis</b>, <b>Kafka</b>, <b>Docker</b>, ELK, <b>PHPUnit</b>, <b>PHPStan</b>',
  job2_b1: '<b>Balances with held funds:</b> while an operation is still in flight its amount stays frozen on the balance, so the same money cannot be spent twice under concurrent requests — at ~<b>150–200K operations a day</b>. Payout idempotency is enforced by a <b>unique index in the database</b>: a duplicate is rejected by the database itself, not by application code; <b>not a single double payout since rollout</b>.',
  job2_b2: '<b>Deadlocks</b> on concurrent balance recalculation were removed by <b>lock ordering and targeted FOR UPDATE</b> under READ COMMITTED — prevention at the access-pattern level, not a retry wrapper over the symptom. Concurrency errors at peak hours dropped to <b>almost none</b>, and manual investigations of “stuck” operations all but disappeared.',
  job2_b3: 'Financial module: a transaction moves through about ten internal statuses while the merchant sees a simple pending / success / fail; internal and external state never diverge. The result — predictable callbacks across <b>40+ integrations</b> and a <b>30–40% drop</b> in merchant queries about “unclear” statuses.',
  job2_b4: '<b>Laravel 9 → 10</b> migration and refactoring of critical payment pipelines: <b>PHPUnit</b> tests over financial scenarios (up to ~<b>80%</b> coverage), <b>PHPStan level 6+</b>, observability on <b>ELK</b> — diagnosing payment incidents went <b>from hours to minutes</b>. Took part in the <b>MySQL → PostgreSQL</b> switch on a critical contour (<b>2 TB+</b>): schema reworked for PG-specific types and indexes, staged migration with no loss of integrity and no pause in payment acceptance, legacy code synchronised with the new dialect; key transaction queries became <b>2–3× faster</b>, the slowest ones included.',

  job3_dates: 'Apr 2020 — Mar 2023',
  job3_role: 'PHP Developer',
  job3_co: 'Basis33 — outsourcing for EU clients · Remote',
  job3_about: 'Full-cycle custom development for EU clients, a team of <b>25 engineers</b>: high-load services with large codebases, business-process automation, a <b>medical SaaS platform</b>. I ran two products in unrelated domains, both shipped to production.',
  job3_stack: '<b>PHP 7.4</b>, <b>Symfony 5.3</b>, API Platform, <b>MySQL</b>, <b>RabbitMQ</b>, Redis, Docker, GitLab CI/CD',
  job3_b1: 'Grew the core of the medical platform and shipped new features. Closed the remote-appointment request with a <b>Zoom API integration</b>: doctor and patient enter the consultation straight from the booking calendar, with no links sent by hand.',
  job3_b2: 'Sped up the heavy screens: query plans, <b>N+1</b> unfolded into explicit joins, composite indexes matching the real filters, schema normalisation and targeted denormalisation of hot result sets, <b>Redis</b> caching with invalidation driven by domain events. The production cluster ran with <b>replication and partitioning</b> — read paths went to the replica.',
  job3_b3: 'Covered what mattered with tests: <b>unit tests</b> over domain rules, <b>integration tests</b> across the database and external services, and <b>functional tests</b> over API scenarios — regressions in booking and calendars were caught before release, not in production.',

  job4_dates: 'Feb 2019 — Mar 2020',
  job4_role: 'PHP Developer',
  job4_co: 'Like Systems — classifieds and data collection · Remote',
  job4_about: 'Search-driven SPA classifieds platform and an automated data collection service.',
  job4_stack: '<b>PHP 7.1—7.4</b>, <b>Symfony 3.4 → 4.4 LTS</b>, Doctrine, <b>PostgreSQL</b>, Docker, Swagger, GitLab CI',
  job4_b1: 'Took part in moving the platform off its legacy stack: <b>PHP 7.1 → 7.4</b>, <b>Symfony 3.4 → 4.4 LTS</b> — modules ported piece by piece, with no service downtime.',
  job4_b2: 'Built the backend of a classifieds platform: a domain model shaped for search and filtering in <b>PostgreSQL</b>, a versioned <b>REST contract</b> in Swagger, automated builds and deployment through <b>GitLab CI</b>, and a collector pulling listings from external sources.',

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
  sk4_s: 'webhook intake and orchestration, idempotent handlers, retries on failure',
  sk5_k: 'Quality &amp; testing',
  sk5_v: '<b>PHPUnit</b>, <b>Codeception</b>, <b>Selenium</b>, <b>PHPStan</b> (level 9), Rector, CS Fixer, GrumPHP',
  sk5_s: 'code review, staged legacy refactoring without rewrites, tests against real databases',
  sk6_k: 'Frontend &amp; mobile',
  sk6_v: 'TypeScript, <b>Vue 3</b>, Next.js / React, Angular + Ionic, React Native, Capacitor, Tailwind, PWA',
  sk6_s: 'there to take my own products to the user, not to stop at the API',

  // ── Projects
  proj_sub: 'My own products — from idea and architecture through to production deployment, with no team behind me.',
  proj_grace_tag: 'DDD · CQRS · FSD',
  proj_grace_desc: 'Community platform: <b>4 bounded contexts</b>, command and query buses on Symfony Messenger, a Feature-Sliced frontend. Context boundaries are enforced by <b>deptrac</b>, not by agreement.',
  proj_shushu_tag: 'Real-time PWA',
  proj_shushu_desc: 'Social gifting platform: real-time over <b>Centrifugo</b>, an installable <b>PWA</b> on Workbox, a Telegram bot, OAuth, gamification. 115 services, 36 entities.',

  // ── Education and contact
  edu_uni: 'Belarusian State University of Informatics and Radioelectronics',
  edu_fac: 'Faculty of Computer Systems and Networks — Computer Science',
  edu_place: 'Minsk, Belarus',
  edu_lang: 'English — <b>B1</b>: I read and write documentation freely and keep pushing the spoken side.',

  contact_lead: 'Open to senior roles with real ownership, remote.',
  contact_status: 'Open to opportunities',
};
