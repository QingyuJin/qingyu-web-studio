create extension if not exists "pgcrypto";

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  company text,
  service_type text,
  budget_range text,
  message text,
  source text not null default 'website',
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'contacted', 'closed')),
  admin_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_name text,
  category text,
  status text not null default 'draft'
    check (status in ('draft', 'estimating', 'in_progress', 'completed', 'archived')),
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  summary text,
  note text,
  started_at date,
  completed_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects (id) on delete cascade,
  file_name text not null,
  file_type text,
  file_url text,
  file_role text not null default 'photo'
    check (file_role in ('photo', 'quote', 'note', 'document')),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists contact_requests_status_idx on contact_requests (status);
create index if not exists contact_requests_created_at_idx on contact_requests (created_at desc);
create index if not exists projects_status_idx on projects (status);
create index if not exists project_files_project_id_idx on project_files (project_id);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contact_requests_set_updated_at on contact_requests;
create trigger contact_requests_set_updated_at
before update on contact_requests
for each row execute function set_updated_at();

drop trigger if exists projects_set_updated_at on projects;
create trigger projects_set_updated_at
before update on projects
for each row execute function set_updated_at();

alter table contact_requests enable row level security;
alter table projects enable row level security;
alter table project_files enable row level security;

drop policy if exists "public insert contact requests" on contact_requests;
create policy "public insert contact requests"
on contact_requests
for insert
to anon
with check (true);

-- MVP policy:
-- The current app uses a lightweight local admin login, not Supabase Auth yet.
-- To make the admin page usable now, anon can read/update contact requests.
-- Before handling real sensitive leads, replace these with authenticated admin policies.
drop policy if exists "mvp read contact requests" on contact_requests;
create policy "mvp read contact requests"
on contact_requests
for select
to anon
using (true);

drop policy if exists "mvp update contact request status" on contact_requests;
create policy "mvp update contact request status"
on contact_requests
for update
to anon
using (true)
with check (true);

drop policy if exists "mvp read projects" on projects;
create policy "mvp read projects"
on projects
for select
to anon
using (true);

drop policy if exists "mvp read project files" on project_files;
create policy "mvp read project files"
on project_files
for select
to anon
using (true);
