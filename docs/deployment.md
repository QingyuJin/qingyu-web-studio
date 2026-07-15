# Deployment

Use separate deployables and secret scopes:

- Legacy Vercel project: Root Directory `apps/legacy`; keep the current domain.
- Platform web: Root Directory `apps/web`; provide only the three
  `NEXT_PUBLIC_*` variables.
- Platform API: deploy `apps/api` in a Node.js 24-capable service; inject
  Supabase server variables from its secret manager.
- Supabase: use a dedicated staging project first, then a dedicated production
  project. Never reuse a demo database.

## Release order

1. Run the complete pull-request CI workflow.
2. Link the intended Supabase project and run `supabase db push --dry-run`.
3. Review the migration diff, then run `supabase db push` from an approved release
   job. Do not paste SQL into the dashboard editor.
4. Deploy the API and confirm `/health`, `/ready`, structured logs, and Swagger
   access policy.
5. Deploy the web app and test Magic Link, callback cookie refresh, logout,
   protected-route redirect, and cross-organization denial.
6. Keep the production legacy domain unchanged until a separate cutover is
   approved.

Database migrations are forward-only in production. Roll back application code
without deleting tenant columns or policies; issue a reviewed corrective
migration when schema rollback is necessary.
