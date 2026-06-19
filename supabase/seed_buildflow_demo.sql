-- BuildFlow q-001 Demo seed
-- Safe to run multiple times.
-- This script only upserts q-001 demo rows with deterministic ids / demo markers.
-- It does not delete whole tables and does not touch unrelated quote ids.

create extension if not exists pgcrypto;

do $$
declare
  v_project_id uuid;
  v_base_time timestamptz := date_trunc('day', now()) + interval '9 hours';
  v_scheduled_date text := (current_date + interval '3 days')::date::text;
  v_warranty_start text := current_date::text;
  v_warranty_expires text := (current_date + interval '1 year')::date::text;
begin
  select id
    into v_project_id
  from projects
  where id = '10000000-0000-4000-8000-000000000001'::uuid
    or (
      title = 'q-001 屋頂防水工程'
      and source = 'demo_seed'
      and (
        coalesce(tags, '[]'::jsonb) ? 'q-001'
        or coalesce(tags, '[]'::jsonb) ? 'Demo'
      )
    )
  order by
    case when source = 'demo_seed' then 0 else 1 end,
    updated_at desc nulls last,
    created_at desc nulls last
  limit 1;

  if v_project_id is null then
    v_project_id := '10000000-0000-4000-8000-000000000001'::uuid;

    insert into projects (
      id,
      title,
      customer_name,
      location,
      project_type,
      status,
      progress,
      latest_update,
      today_summary,
      photo_status,
      change_order_status,
      missing_fields,
      source,
      tags,
      created_at,
      updated_at
    )
    values (
      v_project_id,
      'q-001 屋頂防水工程',
      'LINE 業主',
      '未填地點',
      '防水 / 泥作',
      '已結案',
      100,
      '已確認付款，案件已結案',
      '工程已驗收並完成付款，案件進入保固期',
      '完工照片已上傳',
      '無',
      '[]'::jsonb,
      'demo_seed',
      '["q-001", "報價", "施工", "驗收", "請款", "已結案", "保固中", "Demo"]'::jsonb,
      v_base_time,
      v_base_time + interval '115 minutes'
    )
    on conflict (id) do update set
      title = excluded.title,
      customer_name = excluded.customer_name,
      location = excluded.location,
      project_type = excluded.project_type,
      status = excluded.status,
      progress = excluded.progress,
      latest_update = excluded.latest_update,
      today_summary = excluded.today_summary,
      photo_status = excluded.photo_status,
      change_order_status = excluded.change_order_status,
      missing_fields = excluded.missing_fields,
      source = excluded.source,
      tags = excluded.tags,
      updated_at = excluded.updated_at;
  else
    update projects
    set
      customer_name = 'LINE 業主',
      location = '未填地點',
      project_type = '防水 / 泥作',
      status = '已結案',
      progress = 100,
      latest_update = '已確認付款，案件已結案',
      today_summary = '工程已驗收並完成付款，案件進入保固期',
      photo_status = '完工照片已上傳',
      change_order_status = '無',
      missing_fields = '[]'::jsonb,
      source = 'demo_seed',
      tags = '["q-001", "報價", "施工", "驗收", "請款", "已結案", "保固中", "Demo"]'::jsonb,
      updated_at = v_base_time + interval '115 minutes'
    where id = v_project_id;
  end if;

  insert into line_messages (
    id,
    scenario_id,
    role,
    sender_name,
    message,
    message_time,
    status,
    tags,
    created_at
  )
  values
    (
      '10000000-0000-4000-8000-000000000101'::uuid,
      'real_linebot_quote',
      'customer',
      'LINE 業主',
      '想看 PDF',
      to_char(v_base_time, 'YYYY-MM-DD HH24:MI'),
      'received',
      '["q-001", "報價", "PDF", "demo_seed"]'::jsonb,
      v_base_time
    ),
    (
      '10000000-0000-4000-8000-000000000102'::uuid,
      'real_linebot_quote',
      'customer',
      'LINE 業主',
      '同意',
      to_char(v_base_time + interval '8 minutes', 'YYYY-MM-DD HH24:MI'),
      'received',
      '["q-001", "報價", "業主同意", "demo_seed"]'::jsonb,
      v_base_time + interval '8 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000103'::uuid,
      'real_linebot_quote',
      'worker',
      '現場師傅',
      '今日回報 q-001，2人出工，完成底層清潔，明天做防水底漆',
      to_char(v_base_time + interval '65 minutes', 'YYYY-MM-DD HH24:MI'),
      'received',
      '["q-001", "施工", "每日回報", "待照片", "demo_seed"]'::jsonb,
      v_base_time + interval '65 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000104'::uuid,
      'real_linebot_quote',
      'worker',
      '現場師傅',
      'q-001 屋頂防水完工，已試水 24 小時，目前沒有滲漏，完工照已傳',
      to_char(v_base_time + interval '86 minutes', 'YYYY-MM-DD HH24:MI'),
      'received',
      '["q-001", "完工", "試水", "驗收", "demo_seed"]'::jsonb,
      v_base_time + interval '86 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000105'::uuid,
      'real_linebot_quote',
      'customer',
      'LINE 業主',
      'q-001 驗收通過，沒問題',
      to_char(v_base_time + interval '99 minutes', 'YYYY-MM-DD HH24:MI'),
      'received',
      '["q-001", "驗收", "業主確認", "demo_seed"]'::jsonb,
      v_base_time + interval '99 minutes'
    )
  on conflict (id) do update set
    scenario_id = excluded.scenario_id,
    role = excluded.role,
    sender_name = excluded.sender_name,
    message = excluded.message,
    message_time = excluded.message_time,
    status = excluded.status,
    tags = excluded.tags,
    created_at = excluded.created_at;

  insert into line_message_parses (
    id,
    line_message_id,
    intent,
    confidence,
    entities,
    missing_fields,
    suggested_actions,
    created_at
  )
  values
    (
      '10000000-0000-4000-8000-000000000201'::uuid,
      '10000000-0000-4000-8000-000000000101'::uuid,
      'quote_view_pdf',
      0.96,
      jsonb_build_object('quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程'),
      '[]'::jsonb,
      '["記錄報價單已查看", "等待業主同意或修改"]'::jsonb,
      v_base_time
    ),
    (
      '10000000-0000-4000-8000-000000000202'::uuid,
      '10000000-0000-4000-8000-000000000102'::uuid,
      'quote_approved',
      0.97,
      jsonb_build_object('quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'approvalStatus', 'approved'),
      '["施工日", "現場照片"]'::jsonb,
      '["轉成正式案件", "安排施工日"]'::jsonb,
      v_base_time + interval '8 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000203'::uuid,
      '10000000-0000-4000-8000-000000000103'::uuid,
      'construction_daily_report',
      0.94,
      jsonb_build_object('quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'workerCount', 2, 'workSummary', '完成底層清潔', 'nextWork', '明天做防水底漆'),
      '["現場照片"]'::jsonb,
      '["新增施工日誌", "更新案件狀態為施工中"]'::jsonb,
      v_base_time + interval '65 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000204'::uuid,
      '10000000-0000-4000-8000-000000000104'::uuid,
      'completion_acceptance',
      0.95,
      jsonb_build_object('quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'testDuration', '24 小時', 'acceptanceResult', '試水正常，無滲漏', 'photoStatus', '完工照片已上傳'),
      '["業主驗收確認"]'::jsonb,
      '["標記待驗收", "通知業主驗收"]'::jsonb,
      v_base_time + interval '86 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000205'::uuid,
      '10000000-0000-4000-8000-000000000105'::uuid,
      'acceptance_confirmed',
      0.93,
      jsonb_build_object('quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'approvalStatus', 'accepted'),
      '["請款確認"]'::jsonb,
      '["建立請款紀錄", "等待付款確認"]'::jsonb,
      v_base_time + interval '99 minutes'
    )
  on conflict (id) do update set
    line_message_id = excluded.line_message_id,
    intent = excluded.intent,
    confidence = excluded.confidence,
    entities = excluded.entities,
    missing_fields = excluded.missing_fields,
    suggested_actions = excluded.suggested_actions,
    created_at = excluded.created_at;

  insert into project_daily_reports (
    id,
    project_id,
    report_date,
    worker_count,
    work_summary,
    next_work,
    photo_status,
    source,
    created_at
  )
  values (
    '10000000-0000-4000-8000-000000000301'::uuid,
    v_project_id,
    current_date,
    2,
    '完成底層清潔',
    '明天做防水底漆',
    '現場照片已歸檔',
    'demo_seed',
    v_base_time + interval '66 minutes'
  )
  on conflict (id) do update set
    project_id = excluded.project_id,
    report_date = excluded.report_date,
    worker_count = excluded.worker_count,
    work_summary = excluded.work_summary,
    next_work = excluded.next_work,
    photo_status = excluded.photo_status,
    source = excluded.source,
    created_at = excluded.created_at;

  insert into buildflow_sync_actions (
    id,
    line_message_id,
    project_id,
    action_type,
    payload,
    status,
    created_at
  )
  values
    (
      '10000000-0000-4000-8000-000000000401'::uuid,
      '10000000-0000-4000-8000-000000000101'::uuid,
      v_project_id,
      'quote_view_pdf',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '報價單已查看', 'nextStep', '等待業主同意或修改'),
      'synced',
      v_base_time + interval '1 minute'
    ),
    (
      '10000000-0000-4000-8000-000000000402'::uuid,
      '10000000-0000-4000-8000-000000000102'::uuid,
      v_project_id,
      'quote_approved',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '業主已同意', 'nextStep', '轉成正式案件'),
      'synced',
      v_base_time + interval '9 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000403'::uuid,
      '10000000-0000-4000-8000-000000000102'::uuid,
      v_project_id,
      'quote_convert_project',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '已轉正式案件', 'nextStep', '安排施工日'),
      'synced',
      v_base_time + interval '16 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000404'::uuid,
      null,
      v_project_id,
      'schedule_construction',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'scheduledDate', v_scheduled_date, 'status', '已排施工', 'nextStep', '施工前準備'),
      'synced',
      v_base_time + interval '28 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000405'::uuid,
      null,
      v_project_id,
      'pre_construction_ready',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '施工前準備完成', 'nextStep', '進場施工'),
      'synced',
      v_base_time + interval '43 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000406'::uuid,
      null,
      v_project_id,
      'start_construction',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '施工中', 'nextStep', '每日施工回報'),
      'synced',
      v_base_time + interval '55 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000407'::uuid,
      '10000000-0000-4000-8000-000000000103'::uuid,
      v_project_id,
      'construction_daily_report',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'workerCount', 2, 'workSummary', '完成底層清潔', 'nextWork', '明天做防水底漆', 'photoStatus', '現場照片已歸檔', 'status', '施工中', 'nextStep', '持續追蹤每日回報'),
      'synced',
      v_base_time + interval '66 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000408'::uuid,
      '10000000-0000-4000-8000-000000000104'::uuid,
      v_project_id,
      'completion_acceptance',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '待驗收', 'progress', 90, 'testDuration', '24 小時', 'acceptanceResult', '試水正常，無滲漏', 'photoStatus', '完工照片已上傳', 'nextStep', '通知業主驗收'),
      'synced',
      v_base_time + interval '87 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000409'::uuid,
      '10000000-0000-4000-8000-000000000104'::uuid,
      v_project_id,
      'notify_acceptance',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '已通知業主驗收', 'nextStep', '等待業主確認'),
      'synced',
      v_base_time + interval '93 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000410'::uuid,
      '10000000-0000-4000-8000-000000000105'::uuid,
      v_project_id,
      'acceptance_confirmed',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '已驗收', 'progress', 95, 'nextStep', '請款確認'),
      'synced',
      v_base_time + interval '100 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000411'::uuid,
      '10000000-0000-4000-8000-000000000105'::uuid,
      v_project_id,
      'create_payment_request',
      jsonb_build_object('seed', 'buildflow_demo', 'quoteId', 'q-001', 'amount', 53900, 'projectTitle', 'q-001 屋頂防水工程', 'status', '待請款', 'nextStep', '等待付款確認'),
      'synced',
      v_base_time + interval '108 minutes'
    ),
    (
      '10000000-0000-4000-8000-000000000412'::uuid,
      '10000000-0000-4000-8000-000000000105'::uuid,
      v_project_id,
      'payment_confirmed',
      jsonb_build_object(
        'seed', 'buildflow_demo',
        'quoteId', 'q-001',
        'amount', 53900,
        'projectTitle', 'q-001 屋頂防水工程',
        'status', '已付款',
        'nextStep', '案件結案並進入保固',
        'warranty', jsonb_build_object(
          'status', '保固中',
          'item', '屋頂防水',
          'startDate', v_warranty_start,
          'period', '一年',
          'expiresAt', v_warranty_expires,
          'note', '保固範圍依報價單與施工紀錄為準'
        )
      ),
      'synced',
      v_base_time + interval '116 minutes'
    )
  on conflict (id) do update set
    line_message_id = excluded.line_message_id,
    project_id = excluded.project_id,
    action_type = excluded.action_type,
    payload = excluded.payload,
    status = excluded.status,
    created_at = excluded.created_at;
end $$;
