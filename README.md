# Qingyu Platform v2

This branch contains the isolated foundation for Qingyu Platform v2. The
production Vite site is preserved in `apps/legacy`; new platform applications
must not import legacy authentication, demo data, or browser-storage state.

## Quick start

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev:web
pnpm dev:api
```

See `docs/development.md` for local Supabase setup and the full verification
workflow.

FlowOrder architecture, operations, migrations, and deployment are documented
in `docs/floworder.md`.
