# FlowOrder

FlowOrder turns customer order messages into human-reviewed orders, inventory
transactions, and an auditable internal workflow. The public product page stays
inside the legacy QingyuWeb site while the authenticated application and API
remain isolated Platform v2 services.

## Runtime architecture

- `apps/legacy`: public `/works/floworder` page, QingyuWeb navigation, SEO,
  sitemap, and links to the application host.
- `apps/web`: Next.js application for customer, sales, and admin workflows. Its
  same-origin `/api/floworder/*` route is the browser-facing BFF and keeps the
  demo token in an HTTP-only cookie.
- `apps/api`: NestJS API, server-side authentication/RBAC enforcement, local
  rule-based parsing, PDF generation, and repository access with the
  Supabase service role.
- `supabase`: PostgreSQL schema, RLS, transactional business functions,
  database-backed demo tenants, and pgTAP tests.

The browser never receives the service-role key or a demo bearer token.

## Database model

The FlowOrder migrations create customer tiers, sales accounts, customers,
addresses, products, inventory balances, customer-specific prices, messages,
AI parse records, orders, order items, inventory transactions, idempotency
records, sandbox records, and rate-limit buckets.

Order confirmation, modification, and cancellation run in `security definer`
database functions. They lock the relevant order, message, and inventory rows,
write inventory ledger entries, update totals/statuses, store idempotent
responses, and append audit records in the same transaction. A failure rolls
back the entire operation.

## Migrations

Apply in timestamp order with the Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
supabase test db
```

- `202608260001_floworder_core.sql`: tenant tables, RLS, permissions, atomic
  confirmation/cancellation.
- `202608260002_floworder_demo_sandbox.sql`: isolated expiring sandboxes and
  realistic 海港食品 seed data.
- `202608260003_floworder_message_workflows.sql`: persisted message and AI
  parse workflows.
- `202608260004_floworder_order_changes_and_rate_limits.sql`: atomic order
  changes and shared database rate limiting.
- `202608260005_fix_floworder_seed_interval.sql`: PostgreSQL 17-compatible
  interval cast for sandbox history generation.
- `202608260006_fix_floworder_seed_order_dates.sql`: PostgreSQL 17-compatible
  date arithmetic for seeded historical orders.

## Environment variables

Web (browser-safe):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_API_URL`

Web (server-only configuration):

- `FLOWORDER_PUBLIC_ORIGIN`: trusted public browser origin, set to
  `https://www.qingyuweb.com` in production. This is the only additional
  origin accepted for mutation requests behind the cross-project rewrite;
  forwarded host headers are not trusted for CSRF validation.

API (server-only except the publishable key):

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WEB_ORIGIN`
- `OPENAI_API_KEY` (legacy optional configuration; not used by FlowOrder rules)
- `OPENAI_MODEL` (legacy optional configuration; not used by FlowOrder rules)
- `FLOWORDER_DEMO_TTL_MINUTES`
- `LOG_LEVEL`
- `NODE_ENV`

Legacy QingyuWeb:

- `VITE_FLOWORDER_APP_URL`

Secrets belong in the deployment platform secret manager and must never be
committed or exposed with a `NEXT_PUBLIC_`/`VITE_` prefix.

## Public demo lifecycle

The first visit creates a dedicated organization and realistic tenant dataset
through the API and database. The server returns a random token once; the Next
BFF stores it as a secure HTTP-only cookie. Every role view resolves access
against that same isolated organization. Expired organizations are removable
with `floworder_cleanup_expired_sandboxes()`.

## Verification

Before deployment run lint, typecheck, unit tests, application builds, and
`supabase test db`. The pgTAP suite covers message persistence, AI parse
persistence, order confirmation/modification/cancellation, stock changes,
insufficient stock, duplicate/idempotent requests, rate limiting, RLS, and
audit records.

The critical production smoke test is:

1. Customer submits a message.
2. Sales sees the persisted message, invokes the local rule parser, edits
   the structured result, and confirms it.
3. Admin sees the order, inventory transactions, and audit records.
4. Refresh all three views and confirm the records remain.
5. Download the database-backed PDF and verify the order number and totals.

## Deployment topology

- `www.qingyuweb.com`: existing legacy Vercel project and the only
  browser-visible production origin.
- `www.qingyuweb.com/works/floworder/app/*`: externally rewritten to the
  `qingyu-floworder-web` Next.js project.
- `www.qingyuweb.com/api/floworder/*`: externally rewritten to the same
  Next.js BFF, which forwards server-to-server requests to the
  `qingyu-floworder-api` NestJS project.
- `www.qingyuweb.com/_next/static/*`: forwarded to the Next.js project so
  application scripts, styles, and fonts remain same-origin. The application
  route uses the Next.js CSP rather than the legacy Vite page's CSP.
- `qingyu-floworder-web.vercel.app`: stable internal Next.js deployment alias.
- `qingyu-floworder-api.vercel.app`: stable internal API deployment alias.

Deploy API first, set the web API URL to its stable alias, deploy web, set the
legacy application URL to `https://www.qingyuweb.com`, then deploy the existing
QingyuWeb project. Preview deployments and the critical smoke test must pass
before promoting the same artifacts to production.

## Default parser: rules, no paid AI

FlowOrder binds `ORDER_PARSER` to `RuleBasedOrderParser`, regardless of whether
an OpenAI key remains in the environment. No model provider is contacted and
there is no automatic paid fallback. The original OpenAI adapter is retained
as unused source for future explicit integration, not registered at runtime.

Rules recognize exact SKUs, full catalog names and unique partial names,
Arabic/full-width/Chinese quantities with explicit units, ISO/Chinese dates,
current-year month/day dates, today/tomorrow, and explicitly named this/next
week weekdays in Asia/Taipei. Invalid/past/multiple dates, bare weekdays,
unknown/ambiguous products, duplicate items, unit mismatches and cancellation,
correction or range statements require manual handling. No unit conversion,
silent duplicate summing, or automatic order confirmation occurs.

Results keep the existing `floworder_ai_parses` table and audit workflow for
compatibility, with `provider=rules`, `model=floworder-rules-v1` and
`status=needs_review`. No schema migration is needed. Rule match scores are
not shown as AI confidence probabilities. The UI lists unresolved items,
prefills only safe catalog-backed lines, and requires review acknowledgement
before the existing confirmation action. Parsing only saves a result; it does
not invoke order or inventory mutations. Hosting/database costs remain separate.
