begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(27);

select has_table('public', 'organizations', 'organizations exists');
select has_table('public', 'profiles', 'profiles exists');
select has_table('public', 'organization_memberships', 'organization_memberships exists');
select has_table('public', 'roles', 'roles exists');
select has_table('public', 'permissions', 'permissions exists');
select has_table('public', 'role_permissions', 'role_permissions exists');
select has_table('public', 'invitations', 'invitations exists');
select has_table('public', 'audit_logs', 'audit_logs exists');
select has_table('public', 'notification_deliveries', 'notification_deliveries exists');
select has_table('public', 'stored_files', 'stored_files exists');

insert into auth.users (
  id, instance_id, aud, role, email, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin-a@rls.test', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('10000000-0000-4000-8000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'staff-a@rls.test', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('10000000-0000-4000-8000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'staff-b@rls.test', now(), '{"provider":"email","providers":["email"]}', '{}', now(), now());

insert into public.organizations (id, name, slug) values
  ('20000000-0000-4000-8000-000000000001', 'RLS Tenant A', 'rls-tenant-a'),
  ('20000000-0000-4000-8000-000000000002', 'RLS Tenant B', 'rls-tenant-b');

insert into public.organization_memberships (organization_id, user_id, role_id) values
  (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    (select id from public.roles where organization_id = '20000000-0000-4000-8000-000000000001' and slug = 'admin')
  ),
  (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000002',
    (select id from public.roles where organization_id = '20000000-0000-4000-8000-000000000001' and slug = 'staff')
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000003',
    (select id from public.roles where organization_id = '20000000-0000-4000-8000-000000000002' and slug = 'staff')
  );

insert into public.audit_logs (organization_id, actor_user_id, action) values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'rls.test'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000003', 'rls.test');

insert into public.stored_files (
  organization_id, owner_user_id, bucket, object_path, original_filename, size_bytes
) values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002', 'private', 'tenant-a/file.txt', 'file.txt', 1),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000003', 'private', 'tenant-b/file.txt', 'file.txt', 1);

insert into public.invitations (organization_id, email, role_id, invited_by) values (
  '20000000-0000-4000-8000-000000000001',
  'invitee@rls.test',
  (select id from public.roles where organization_id = '20000000-0000-4000-8000-000000000001' and slug = 'staff'),
  '10000000-0000-4000-8000-000000000001'
);

select is(
  (select count(*) from public.roles where organization_id = '20000000-0000-4000-8000-000000000001'),
  5::bigint,
  'each organization receives exactly five platform roles'
);
select is(
  (
    select count(*)
    from public.role_permissions as rp
    join public.roles as r on r.id = rp.role_id and r.organization_id = rp.organization_id
    where r.organization_id = '20000000-0000-4000-8000-000000000001' and r.slug = 'admin'
  ),
  15::bigint,
  'admin receives every platform permission'
);
select is(
  (
    select count(*)
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'organizations', 'profiles', 'organization_memberships', 'roles', 'permissions',
        'role_permissions', 'invitations', 'audit_logs', 'notification_deliveries', 'stored_files'
      )
      and 'anon' = any(roles)
  ),
  0::bigint,
  'no tenant table has an anon policy'
);

set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claims', '{"sub":"10000000-0000-4000-8000-000000000001","role":"authenticated"}', true);

select is((select count(*) from public.organizations), 1::bigint, 'admin sees one member organization');
select ok(
  exists(select 1 from public.organizations where id = '20000000-0000-4000-8000-000000000001'),
  'admin sees the correct organization'
);
select is((select count(*) from public.roles), 5::bigint, 'roles from other tenants are hidden');
select is((select count(*) from public.profiles), 2::bigint, 'shared-organization profiles are visible without cross-tenant leakage');
select is((select count(*) from public.permissions), 15::bigint, 'authenticated members can read the permission catalog');
select is((select count(*) from public.audit_logs), 1::bigint, 'admin can read only own-tenant audit logs');
select is((select count(*) from public.invitations), 1::bigint, 'admin can read own-tenant invitations');

reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-4000-8000-000000000002', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
select set_config('request.jwt.claims', '{"sub":"10000000-0000-4000-8000-000000000002","role":"authenticated"}', true);

select is((select count(*) from public.organizations), 1::bigint, 'staff sees only its organization');
select is((select count(*) from public.audit_logs), 0::bigint, 'staff lacks audit permission');
select is((select count(*) from public.stored_files), 1::bigint, 'staff file reads remain tenant-scoped');
select is((select count(*) from public.invitations), 0::bigint, 'staff cannot read invitations');
select throws_ok(
  $$insert into public.invitations (organization_id, email, role_id, invited_by)
    values (
      '20000000-0000-4000-8000-000000000001',
      'blocked@rls.test',
      (select id from public.roles where organization_id = '20000000-0000-4000-8000-000000000001' and slug = 'staff'),
      '10000000-0000-4000-8000-000000000002'
    )$$,
  '42501',
  'permission denied for table invitations',
  'authenticated clients cannot bypass the server invitation API'
);
select throws_ok(
  $$insert into public.organization_memberships (organization_id, user_id, role_id)
    values (
      '20000000-0000-4000-8000-000000000001',
      '10000000-0000-4000-8000-000000000003',
      (select id from public.roles where organization_id = '20000000-0000-4000-8000-000000000001' and slug = 'staff')
    )$$,
  '42501',
  'permission denied for table organization_memberships',
  'authenticated clients cannot create memberships directly'
);

reset role;
set local role anon;
select set_config('request.jwt.claims', '{}', true);
select throws_ok(
  $$select * from public.organizations$$,
  '42501',
  'permission denied for table organizations',
  'anon cannot read organization data'
);

reset role;
select * from finish();
rollback;
