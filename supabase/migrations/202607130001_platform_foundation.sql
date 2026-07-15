begin;

create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text check (display_name is null or char_length(display_name) <= 120),
  avatar_url text check (avatar_url is null or char_length(avatar_url) <= 2048),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index profiles_email_lower_idx on public.profiles (lower(email)) where email is not null;

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z][a-z0-9_.-]+$'),
  description text not null,
  created_at timestamptz not null default now()
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  slug text not null check (slug in ('admin', 'manager', 'staff', 'customer')),
  name text not null check (char_length(name) between 1 and 80),
  created_at timestamptz not null default now(),
  constraint roles_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete cascade,
  constraint roles_organization_slug_key unique (organization_id, slug),
  constraint roles_id_organization_id_key unique (id, organization_id)
);

create table public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organization_memberships_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete cascade,
  constraint organization_memberships_role_id_fkey foreign key (role_id, organization_id)
    references public.roles(id, organization_id) on delete restrict,
  constraint organization_memberships_organization_user_key unique (organization_id, user_id)
);

create table public.role_permissions (
  organization_id uuid not null,
  role_id uuid not null,
  permission_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (organization_id, role_id, permission_id),
  constraint role_permissions_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete cascade,
  constraint role_permissions_role_id_fkey foreign key (role_id, organization_id)
    references public.roles(id, organization_id) on delete cascade,
  constraint role_permissions_permission_id_fkey foreign key (permission_id)
    references public.permissions(id) on delete cascade
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  email text not null check (char_length(email) between 3 and 320),
  role_id uuid not null,
  invited_by uuid not null references auth.users(id) on delete restrict,
  invited_user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked', 'expired')),
  expires_at timestamptz not null default (now() + interval '7 days'),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint invitations_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete cascade,
  constraint invitations_role_id_fkey foreign key (role_id, organization_id)
    references public.roles(id, organization_id) on delete restrict
);
create unique index invitations_pending_email_idx
  on public.invitations (organization_id, lower(email)) where status = 'pending';

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null check (char_length(action) between 3 and 160),
  target_type text check (target_type is null or char_length(target_type) <= 80),
  target_id text check (target_id is null or char_length(target_id) <= 200),
  metadata jsonb not null default '{}'::jsonb,
  request_id text check (request_id is null or char_length(request_id) <= 128),
  created_at timestamptz not null default now(),
  constraint audit_logs_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete restrict
);

create table public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  recipient_user_id uuid references auth.users(id) on delete set null,
  channel text not null check (channel in ('email', 'line', 'webhook')),
  recipient text not null check (char_length(recipient) between 1 and 320),
  template text not null check (char_length(template) between 1 and 120),
  status text not null default 'queued' check (status in ('queued', 'sent', 'delivered', 'failed')),
  provider_message_id text,
  error_code text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint notification_deliveries_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete cascade
);

create table public.stored_files (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  owner_user_id uuid references auth.users(id) on delete set null,
  bucket text not null check (char_length(bucket) between 1 and 100),
  object_path text not null check (char_length(object_path) between 1 and 1024),
  original_filename text not null check (char_length(original_filename) between 1 and 255),
  content_type text check (content_type is null or char_length(content_type) <= 255),
  size_bytes bigint not null check (size_bytes >= 0),
  checksum_sha256 text check (checksum_sha256 is null or checksum_sha256 ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint stored_files_organization_id_fkey foreign key (organization_id)
    references public.organizations(id) on delete cascade,
  constraint stored_files_bucket_path_key unique (bucket, object_path)
);

create index organization_memberships_user_idx on public.organization_memberships (user_id, organization_id);
create index role_permissions_role_idx on public.role_permissions (organization_id, role_id);
create index invitations_organization_idx on public.invitations (organization_id, created_at desc);
create index audit_logs_organization_created_idx on public.audit_logs (organization_id, created_at desc);
create index notification_deliveries_organization_idx on public.notification_deliveries (organization_id, created_at desc);
create index stored_files_organization_idx on public.stored_files (organization_id, created_at desc);

insert into public.permissions (key, description) values
  ('members.invite', 'Invite members to an organization'),
  ('members.manage', 'Manage organization memberships'),
  ('audit.read', 'Read organization audit logs'),
  ('files.read', 'Read organization file metadata'),
  ('files.write', 'Create and update organization files');

create or replace function private.seed_organization_roles()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $$
begin
  insert into public.roles (organization_id, slug, name) values
    (new.id, 'admin', 'Admin'),
    (new.id, 'manager', 'Manager'),
    (new.id, 'staff', 'Staff'),
    (new.id, 'customer', 'Customer');

  insert into public.role_permissions (organization_id, role_id, permission_id)
  select new.id, role.id, permission.id
  from public.roles as role
  cross join public.permissions as permission
  where role.organization_id = new.id
    and (
      role.slug = 'admin'
      or (role.slug = 'manager' and permission.key in ('members.invite', 'members.manage', 'audit.read', 'files.read', 'files.write'))
      or (role.slug = 'staff' and permission.key in ('files.read', 'files.write'))
      or (role.slug = 'customer' and permission.key = 'files.read')
    );
  return new;
end;
$$;

create trigger organizations_seed_roles
after insert on public.organizations
for each row execute function private.seed_organization_roles();

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger organizations_set_updated_at before update on public.organizations
for each row execute function private.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function private.set_updated_at();
create trigger organization_memberships_set_updated_at before update on public.organization_memberships
for each row execute function private.set_updated_at();
create trigger invitations_set_updated_at before update on public.invitations
for each row execute function private.set_updated_at();
create trigger notification_deliveries_set_updated_at before update on public.notification_deliveries
for each row execute function private.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, nullif(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

insert into public.profiles (id, email, display_name)
select id, email, nullif(raw_user_meta_data ->> 'full_name', '')
from auth.users
on conflict (id) do nothing;

create or replace function private.is_organization_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select exists (
    select 1
    from public.organization_memberships as membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
  );
$$;

create or replace function private.has_any_membership()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select exists (
    select 1 from public.organization_memberships as membership
    where membership.user_id = auth.uid()
  );
$$;

create or replace function private.users_share_organization(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select exists (
    select 1
    from public.organization_memberships as mine
    join public.organization_memberships as theirs
      on theirs.organization_id = mine.organization_id
    where mine.user_id = auth.uid()
      and theirs.user_id = target_user_id
  );
$$;

create or replace function private.has_permission(target_organization_id uuid, target_permission text)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select exists (
    select 1
    from public.organization_memberships as membership
    join public.role_permissions as role_permission
      on role_permission.organization_id = membership.organization_id
     and role_permission.role_id = membership.role_id
    join public.permissions as permission
      on permission.id = role_permission.permission_id
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and permission.key = target_permission
  );
$$;

revoke all on function private.seed_organization_roles() from public, anon, authenticated;
revoke all on function private.set_updated_at() from public, anon, authenticated;
revoke all on function private.handle_new_user() from public, anon, authenticated;
revoke all on function private.is_organization_member(uuid) from public, anon, authenticated;
revoke all on function private.has_any_membership() from public, anon, authenticated;
revoke all on function private.users_share_organization(uuid) from public, anon, authenticated;
revoke all on function private.has_permission(uuid, text) from public, anon, authenticated;
grant execute on function private.is_organization_member(uuid) to authenticated, service_role;
grant execute on function private.has_any_membership() to authenticated, service_role;
grant execute on function private.users_share_organization(uuid) to authenticated, service_role;
grant execute on function private.has_permission(uuid, text) to authenticated, service_role;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.invitations enable row level security;
alter table public.audit_logs enable row level security;
alter table public.notification_deliveries enable row level security;
alter table public.stored_files enable row level security;

alter table public.organizations force row level security;
alter table public.profiles force row level security;
alter table public.organization_memberships force row level security;
alter table public.roles force row level security;
alter table public.permissions force row level security;
alter table public.role_permissions force row level security;
alter table public.invitations force row level security;
alter table public.audit_logs force row level security;
alter table public.notification_deliveries force row level security;
alter table public.stored_files force row level security;

create policy organizations_member_select on public.organizations
for select to authenticated using (private.is_organization_member(id));

create policy profiles_shared_organization_select on public.profiles
for select to authenticated using (id = auth.uid() or private.users_share_organization(id));
create policy profiles_self_update on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy memberships_self_or_manager_select on public.organization_memberships
for select to authenticated using (
  user_id = auth.uid() or private.has_permission(organization_id, 'members.manage')
);

create policy roles_member_select on public.roles
for select to authenticated using (private.is_organization_member(organization_id));

create policy permissions_member_select on public.permissions
for select to authenticated using (private.has_any_membership());

create policy role_permissions_member_select on public.role_permissions
for select to authenticated using (private.is_organization_member(organization_id));

create policy invitations_inviter_or_manager_select on public.invitations
for select to authenticated using (
  private.is_organization_member(organization_id)
  and (invited_by = auth.uid() or private.has_permission(organization_id, 'members.invite'))
);

create policy audit_logs_authorized_select on public.audit_logs
for select to authenticated using (private.has_permission(organization_id, 'audit.read'));

create policy notification_deliveries_recipient_select on public.notification_deliveries
for select to authenticated using (
  recipient_user_id = auth.uid() and private.is_organization_member(organization_id)
);

create policy stored_files_authorized_select on public.stored_files
for select to authenticated using (private.has_permission(organization_id, 'files.read'));

revoke all on all tables in schema public from anon, authenticated;
grant select on public.organizations, public.profiles, public.organization_memberships,
  public.roles, public.permissions, public.role_permissions, public.invitations,
  public.audit_logs, public.notification_deliveries, public.stored_files to authenticated;
grant update (display_name, avatar_url) on public.profiles to authenticated;
grant all privileges on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;

commit;
