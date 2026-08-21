# LinkedIn — Experience

Каждый блок ниже готов к копированию целиком: выделяешь содержимое рамки и вставляешь
в поле «Описание» соответствующей позиции. Переносы строк LinkedIn сохраняет.

---

## 1. Senior PHP Backend Engineer · systeme.io
`апр. 2024 — май 2026 · Дублин, Ирландия · Удалённая работа`

```text
• Replaced client-side polling with push over Mercure (SSE): heavy operations moved out of the synchronous request into queues, results delivered to the UI as events — ~200K fewer requests per hour (~1.5B a year, ~90% of polling traffic); the busiest route dropped from ~70K to ~4K req/h.
• Owned all 10+ payment-provider integrations (Stripe, PayPal, Apple Pay, Mollie, MercadoPago, Flutterwave, dLocal, Razorpay…) on a SaaS platform with ~50 TB of data; shipped Apple Pay via Stripe end-to-end, opening mobile checkout for US/EU markets.
• Extracted a payment integration from the monolith into a standalone microservice — own database, own deployment, shared contract bundle: a new provider plugs in without touching the core.
• Designed a multi-provider partial-refunds engine: order-item granularity, four webhook routing scenarios, a guarded status machine and cumulative over-refund protection.
• Upgraded PostgreSQL 14 → 18 on a ~50 TB cluster with zero downtime via logical replication; drove PHP 8.3 → 8.5 and Symfony 6.4 → 7.4 LTS migrations on live production (PHPStan level 9, hard CI gate on every PR).
• Stack: PHP 8.5, Symfony 7.4, PostgreSQL 18, MongoDB, Redis, RabbitMQ, Kafka, Mercure, Docker, AWS, Grafana/Loki.
```

---

## 2. PHP Developer · Octopays
`март 2023 — март 2024 · Сейшельские Острова · Удалённая работа`

```text
• Core engineer on an international PSP aggregator for the high-risk segment: ~5M transactions a month (60M+ a year), 40+ payment methods and providers, 200+ active merchants, a 2 TB+ production database, event-driven architecture on Kafka.
• Built balances with held funds: an amount stays frozen while an operation is in flight, so the same money cannot be spent twice under concurrent requests at ~150–200K operations a day; payout idempotency enforced by a unique database index — not a single double payout since rollout.
• Removed deadlocks on concurrent balance recalculation through lock ordering and targeted FOR UPDATE under READ COMMITTED — prevention at the access-pattern level, not a retry wrapper over the symptom.
• Migrated Laravel 9 → 10 and refactored critical payment pipelines: PHPUnit over financial scenarios (~80% coverage), PHPStan level 6+, observability on ELK — incident diagnosis went from hours to minutes.
• Contributed to a MySQL → PostgreSQL migration on a critical path: schema rework for PG-specific types and indexes, phased migration with no integrity loss; p95 on key transaction queries 2–3× faster.
• Stack: PHP 8.2, Laravel 10, PostgreSQL, MySQL, Redis, Kafka, Docker, ELK, PHPUnit, PHPStan.
```

---

## 3. PHP Developer · BASIS33
`апр. 2020 — март 2023 · Эстония · Удалённая работа`

```text
• Full-cycle custom development for EU clients in a 25-engineer team: high-load services with large codebases, business-process automation and a medical SaaS platform.
• Ran two products in unrelated domains, both shipped to production: a German medical platform with strict compliance requirements (a two-year build) and a video-consultation service — closed the remote-appointment request with a Zoom API integration, so doctor and patient enter the consultation straight from the booking calendar, with no links sent by hand.
• Owned SQL optimization on the production cluster: query plans, N+1 unfolded into explicit joins, composite indexes matching the real filters, schema normalisation and targeted denormalisation of hot result sets, Redis caching with domain-event invalidation, replication and partitioning.
• Built and scaled REST APIs with PHP 7.4 / Symfony 5.3 and API Platform; applied SOLID and design patterns, covered domain rules with unit tests and API scenarios with functional tests.
• Stack: PHP 7.4, Symfony 5.3, API Platform, MySQL, RabbitMQ, Redis, Docker, GitLab CI/CD.
```

---

## 4. PHP Developer · Like Systems
`февр. 2019 — март 2020 · Батуми, Грузия · Удалённая работа`

```text
• Built the backend of a search-driven classifieds platform from scratch: a domain model shaped for search and filtering in PostgreSQL, a versioned REST contract documented in Swagger, automated builds and deployment through GitLab CI. The first place where I owned a system rather than individual tickets.
• Took part in moving the platform off its legacy stack: PHP 7.1 → 7.4 and Symfony 3.4 → 4.4 LTS — modules ported piece by piece, with no service downtime.
• Implemented a data parser/aggregator pulling listings from external sources to keep the catalogue populated; laid out the codebase as a service-oriented architecture (SOA) following SOLID and GRASP.
• Established unit, integration and functional tests with a TDD approach.
• Stack: PHP 7.1—7.4, Symfony 4.4, PostgreSQL, Redis, Docker, Nginx, GitLab CI.
```
