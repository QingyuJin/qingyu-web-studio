# Migration from the legacy site

## Current state

The production Vite application is preserved at `apps/legacy`. No v2 package
imports its mock authentication, browser storage, demo data, manual SQL, or API
functions. Its own `vercel.json`, routes, public assets, and build configuration
remain together.

## Production-safe sequence

1. Keep the current production deployment pinned to `main` while this branch is
   reviewed.
2. Verify `pnpm --filter @qingyu/legacy build` produces `apps/legacy/dist`.
3. Before merging any monorepo change into the production branch, change the
   existing Vercel project's Root Directory to `apps/legacy` and run a preview
   deployment with its existing environment variables.
4. Deploy `apps/web` and `apps/api` as new, separate services and domains. Do not
   repoint the production domain during foundation review.
5. Create a staging Supabase project, apply migrations from an empty database,
   and run the RLS suite before importing any real records.
6. Plan legacy data mapping separately. Historical SQL under
   `apps/legacy/supabase` is documentation, not a v2 migration source.

There is no automatic legacy user migration. Shared demo credentials and
browser-stored sessions are intentionally invalid in v2; users must be invited
through Supabase Auth.
