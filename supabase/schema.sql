create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text,
  customer_name text,
  location text,
  project_type text,
  status text,
  progress integer,
  latest_update text,
  today_summary text,
  photo_status text,
  change_order_status text,
  missing_fields jsonb,
  source text,
  tags jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists line_messages (
  id uuid primary key default gen_random_uuid(),
  scenario_id text,
  role text,
  sender_name text,
  message text,
  message_time text,
  status text,
  tags jsonb,
  created_at timestamptz default now()
);

create table if not exists line_message_parses (
  id uuid primary key default gen_random_uuid(),
  line_message_id uuid references line_messages(id),
  intent text,
  confidence numeric,
  entities jsonb,
  missing_fields jsonb,
  suggested_actions jsonb,
  created_at timestamptz default now()
);

create table if not exists buildflow_sync_actions (
  id uuid primary key default gen_random_uuid(),
  line_message_id uuid references line_messages(id),
  project_id uuid references projects(id),
  action_type text,
  payload jsonb,
  status text,
  created_at timestamptz default now()
);

create table if not exists project_daily_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  report_date date,
  worker_count integer,
  work_summary text,
  next_work text,
  photo_status text,
  source text,
  created_at timestamptz default now()
);

create index if not exists projects_status_idx on projects(status);
create index if not exists line_messages_scenario_id_idx on line_messages(scenario_id);
create index if not exists line_message_parses_line_message_id_idx on line_message_parses(line_message_id);
create index if not exists buildflow_sync_actions_line_message_id_idx on buildflow_sync_actions(line_message_id);
create index if not exists buildflow_sync_actions_project_id_idx on buildflow_sync_actions(project_id);
create index if not exists project_daily_reports_project_id_idx on project_daily_reports(project_id);
