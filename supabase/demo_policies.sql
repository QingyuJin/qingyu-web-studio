-- BuildFlow / LineBot Demo RLS policies
--
-- DEMO ONLY:
-- This file is intended for local testing and portfolio demo data.
-- Do not treat these policies as production-ready security rules.
--
-- Before a real launch, replace this with stricter RLS, Supabase Auth,
-- admin-only policies, or route writes through a backend API / Edge Function.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in a browser client.

alter table projects enable row level security;
alter table line_messages enable row level security;
alter table line_message_parses enable row level security;
alter table buildflow_sync_actions enable row level security;
alter table project_daily_reports enable row level security;

drop policy if exists "demo read projects" on projects;
drop policy if exists "demo insert projects" on projects;
drop policy if exists "demo update projects" on projects;

create policy "demo read projects"
on projects for select
to anon, authenticated
using (true);

create policy "demo insert projects"
on projects for insert
to anon, authenticated
with check (true);

create policy "demo update projects"
on projects for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "demo read line messages" on line_messages;
drop policy if exists "demo insert line messages" on line_messages;
drop policy if exists "demo update line messages" on line_messages;

create policy "demo read line messages"
on line_messages for select
to anon, authenticated
using (true);

create policy "demo insert line messages"
on line_messages for insert
to anon, authenticated
with check (true);

create policy "demo update line messages"
on line_messages for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "demo read line parses" on line_message_parses;
drop policy if exists "demo insert line parses" on line_message_parses;

create policy "demo read line parses"
on line_message_parses for select
to anon, authenticated
using (true);

create policy "demo insert line parses"
on line_message_parses for insert
to anon, authenticated
with check (true);

drop policy if exists "demo read sync actions" on buildflow_sync_actions;
drop policy if exists "demo insert sync actions" on buildflow_sync_actions;
drop policy if exists "demo update sync actions" on buildflow_sync_actions;

create policy "demo read sync actions"
on buildflow_sync_actions for select
to anon, authenticated
using (true);

create policy "demo insert sync actions"
on buildflow_sync_actions for insert
to anon, authenticated
with check (true);

create policy "demo update sync actions"
on buildflow_sync_actions for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "demo read daily reports" on project_daily_reports;
drop policy if exists "demo insert daily reports" on project_daily_reports;
drop policy if exists "demo update daily reports" on project_daily_reports;

create policy "demo read daily reports"
on project_daily_reports for select
to anon, authenticated
using (true);

create policy "demo insert daily reports"
on project_daily_reports for insert
to anon, authenticated
with check (true);

create policy "demo update daily reports"
on project_daily_reports for update
to anon, authenticated
using (true)
with check (true);
