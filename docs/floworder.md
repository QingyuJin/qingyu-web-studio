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
- `apps/api`: NestJS API, server-side authentication/RBAC enforcement, OpenAI
  provider abstraction, PDF generation, and repository access with the
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

API (server-only except the publishable key):

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WEB_ORIGIN`
- `OPENAI_API_KEY` (optional; the UI reports `尚未設定` when absent)
- `OPENAI_MODEL` (defaults to `gpt-5.4-mini`)
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
2. Sales sees the persisted message, invokes the configured AI provider, edits
   the structured result, and confirms it.
3. Admin sees the order, inventory transactions, and audit records.
4. Refresh all three views and confirm the records remain.
5. Download the database-backed PDF and verify the order number and totals.

## Deployment topology

- `www.qingyuweb.com`: existing legacy Vercel project.
- `floworder.qingyuweb.com`: Next.js FlowOrder application.
- `floworder-api.qingyuweb.com`: NestJS API.

Deploy API first, set the web API URL, deploy web, set the legacy application
URL, then deploy the existing QingyuWeb project. Preview deployments and the
critical smoke test must pass before promoting the same artifacts to
production.
