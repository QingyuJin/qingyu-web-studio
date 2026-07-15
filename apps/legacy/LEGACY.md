# Legacy application

This directory is a path-preserving copy of the production Vite application,
including its Vercel functions and historical SQL. It remains independently
buildable with `pnpm --filter @qingyu/legacy build`.

Legacy authentication and demo state are intentionally quarantined here and
must not be imported by any v2 workspace package.
