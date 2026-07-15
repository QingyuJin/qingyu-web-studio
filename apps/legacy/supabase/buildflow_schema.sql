create extension if not exists "pgcrypto";

create type app_role as enum ('admin', 'worker');
create type project_status as enum (
  'estimating',
  'quoted',
  'contracted',
  'in_progress',
  'waiting_client',
  'completed',
  'paid',
  'closed'
);
create type subcontract_status as enum (
  'not_started',
  'quoting',
  'contracted',
  'in_progress',
  'waiting_confirm',
  'completed',
  'issue'
);
create type change_order_status as enum (
  'draft',
  'sent_line',
  'client_confirmed',
  'approved',
  'received',
  'cancelled'
);
create type task_status as enum ('todo', 'in_progress', 'completed', 'issue');

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  name text not null,
  role app_role not null default 'worker',
  phone text,
  line_user_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client text not null,
  address text,
  type text,
  budget numeric(12, 2) not null default 0,
  status project_status not null default 'estimating',
  manager_id uuid references profiles (id) on delete set null,
  start_date date,
  due_date date,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table subcontracts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  trade text,
  item text not null,
  qty numeric(10, 2) not null default 1,
  unit text,
  price numeric(12, 2) not null default 0,
  worker_id uuid references profiles (id) on delete set null,
  status subcontract_status not null default 'not_started',
  due_date date,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table bids (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  subcontract_id uuid references subcontracts (id) on delete cascade,
  vendor text not null,
  amount numeric(12, 2) not null default 0,
  selected boolean not null default false,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table change_orders (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  type text,
  item text not null,
  reason text,
  amount numeric(12, 2) not null default 0,
  status change_order_status not null default 'draft',
  confirmed_by_client boolean not null default false,
  date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trade text,
  phone text,
  area text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  subcontract_id uuid references subcontracts (id) on delete set null,
  title text not null,
  worker_id uuid references profiles (id) on delete set null,
  status task_status not null default 'todo',
  due_date date,
  note text,
  report text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table task_reports (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks (id) on delete cascade,
  reporter_id uuid references profiles (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create index projects_status_idx on projects (status);
create index subcontracts_project_id_idx on subcontracts (project_id);
create index subcontracts_worker_id_idx on subcontracts (worker_id);
create index bids_project_id_idx on bids (project_id);
create index change_orders_project_id_idx on change_orders (project_id);
create index tasks_project_id_idx on tasks (project_id);
create index tasks_worker_id_idx on tasks (worker_id);
create index task_reports_task_id_idx on task_reports (task_id);

alter table profiles enable row level security;
alter table projects enable row level security;
alter table subcontracts enable row level security;
alter table bids enable row level security;
alter table change_orders enable row level security;
alter table vendors enable row level security;
alter table tasks enable row level security;
alter table task_reports enable row level security;

create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create policy "profiles admin read all"
on profiles for select
using (is_admin() or id = auth.uid());

create policy "profiles admin write all"
on profiles for all
using (is_admin())
with check (is_admin());

create policy "admins manage projects"
on projects for all
using (is_admin())
with check (is_admin());

create policy "workers read assigned projects"
on projects for select
using (
  is_admin()
  or exists (
    select 1 from tasks
    where tasks.project_id = projects.id
      and tasks.worker_id = auth.uid()
  )
);

create policy "admins manage subcontracts"
on subcontracts for all
using (is_admin())
with check (is_admin());

create policy "workers read assigned subcontracts"
on subcontracts for select
using (is_admin() or worker_id = auth.uid());

create policy "admins manage bids"
on bids for all
using (is_admin())
with check (is_admin());

create policy "admins manage change orders"
on change_orders for all
using (is_admin())
with check (is_admin());

create policy "admins manage vendors"
on vendors for all
using (is_admin())
with check (is_admin());

create policy "admins manage tasks"
on tasks for all
using (is_admin())
with check (is_admin());

create policy "workers read own tasks"
on tasks for select
using (is_admin() or worker_id = auth.uid());

create policy "workers update own task reports"
on tasks for update
using (is_admin() or worker_id = auth.uid())
with check (is_admin() or worker_id = auth.uid());

create policy "task reports visible to admins and task owner"
on task_reports for select
using (
  is_admin()
  or exists (
    select 1 from tasks
    where tasks.id = task_reports.task_id
      and tasks.worker_id = auth.uid()
  )
);

create policy "workers insert own task reports"
on task_reports for insert
with check (
  is_admin()
  or reporter_id = auth.uid()
);
