# Development

## Requirements

- Node.js 24 or a supported Node.js 22 LTS release
- Corepack and pnpm 11.12.0
- Docker Desktop for local Supabase and RLS tests
- Supabase CLI 2.84.2 or newer compatible 2.x release

## Install and verify

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
# Or run all four in sequence:
pnpm verify
```

## Environment

Copy `apps/web/.env.example` to `apps/web/.env.local` and
`apps/api/.env.example` to `apps/api/.env`. Use values printed by `supabase
status` for local development. Never place a service-role key in the web file.

## Database

```bash
supabase start
supabase db reset --local
supabase db lint --local --level error
supabase test db
```

`db reset` destroys only the local Supabase database and rebuilds it solely from
`supabase/migrations`. The test command runs `supabase/tests/rls.test.sql` inside
a transaction and rolls its fixtures back.

## Run services

```bash
pnpm dev:web
pnpm dev:api
pnpm dev:legacy
```

The defaults are web `http://localhost:3000`, API `http://localhost:4000`, API
docs `http://localhost:4000/docs`, and legacy Vite on the URL printed by Vite.
