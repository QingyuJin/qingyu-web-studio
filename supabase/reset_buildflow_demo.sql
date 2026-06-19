-- BuildFlow q-001 Demo reset
-- WARNING:
-- This is a manual Demo reset script. Run it only from Supabase SQL Editor
-- when you intentionally want to remove the q-001 seeded demo rows.
--
-- It only targets rows created by supabase/seed_buildflow_demo.sql:
-- - deterministic seed UUIDs
-- - payload->>'seed' = 'buildflow_demo'
-- - line_messages tags containing demo_seed
-- - projects title = q-001 屋頂防水工程 and source = demo_seed
--
-- It does not truncate tables and does not delete unrelated real data.

delete from buildflow_sync_actions
where id in (
  '10000000-0000-4000-8000-000000000401'::uuid,
  '10000000-0000-4000-8000-000000000402'::uuid,
  '10000000-0000-4000-8000-000000000403'::uuid,
  '10000000-0000-4000-8000-000000000404'::uuid,
  '10000000-0000-4000-8000-000000000405'::uuid,
  '10000000-0000-4000-8000-000000000406'::uuid,
  '10000000-0000-4000-8000-000000000407'::uuid,
  '10000000-0000-4000-8000-000000000408'::uuid,
  '10000000-0000-4000-8000-000000000409'::uuid,
  '10000000-0000-4000-8000-000000000410'::uuid,
  '10000000-0000-4000-8000-000000000411'::uuid,
  '10000000-0000-4000-8000-000000000412'::uuid
)
or (
  payload->>'seed' = 'buildflow_demo'
  and payload->>'quoteId' = 'q-001'
);

delete from project_daily_reports
where id = '10000000-0000-4000-8000-000000000301'::uuid
or (
  source = 'demo_seed'
  and project_id in (
    select id
    from projects
    where title = 'q-001 屋頂防水工程'
      and source = 'demo_seed'
  )
);

delete from line_message_parses
where id in (
  '10000000-0000-4000-8000-000000000201'::uuid,
  '10000000-0000-4000-8000-000000000202'::uuid,
  '10000000-0000-4000-8000-000000000203'::uuid,
  '10000000-0000-4000-8000-000000000204'::uuid,
  '10000000-0000-4000-8000-000000000205'::uuid
)
or line_message_id in (
  select id
  from line_messages
  where scenario_id = 'real_linebot_quote'
    and coalesce(tags, '[]'::jsonb) ? 'demo_seed'
    and coalesce(tags, '[]'::jsonb) ? 'q-001'
);

delete from line_messages
where id in (
  '10000000-0000-4000-8000-000000000101'::uuid,
  '10000000-0000-4000-8000-000000000102'::uuid,
  '10000000-0000-4000-8000-000000000103'::uuid,
  '10000000-0000-4000-8000-000000000104'::uuid,
  '10000000-0000-4000-8000-000000000105'::uuid
)
or (
  scenario_id = 'real_linebot_quote'
  and coalesce(tags, '[]'::jsonb) ? 'demo_seed'
  and coalesce(tags, '[]'::jsonb) ? 'q-001'
);

delete from projects
where id = '10000000-0000-4000-8000-000000000001'::uuid
or (
  title = 'q-001 屋頂防水工程'
  and source = 'demo_seed'
  and (
    coalesce(tags, '[]'::jsonb) ? 'Demo'
    or coalesce(tags, '[]'::jsonb) ? 'q-001'
  )
);
