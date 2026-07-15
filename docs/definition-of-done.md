# Definition of done

A platform change is complete only when all applicable items pass:

- [ ] Code is on a non-production branch and legacy still builds.
- [ ] New TypeScript uses strict mode with no unchecked `any` escape.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.
- [ ] New database changes are timestamped Supabase migrations.
- [ ] `supabase db reset --local`, database lint, and pgTAP RLS tests pass.
- [ ] Every tenant-owned row has `organization_id` and an indexed access path.
- [ ] RLS is enabled; policies grant no anonymous tenant read.
- [ ] Frontend selection and backend mutation both verify membership.
- [ ] Service-role values exist only in server secret scopes.
- [ ] No mock login, shared password, sample tenant, or hard-coded credential was
  introduced.
- [ ] Errors have request IDs and logs exclude secrets and tokens.
- [ ] Security, deployment, migration, and environment documentation is updated.
- [ ] Preview deployment is tested before any production routing change.
