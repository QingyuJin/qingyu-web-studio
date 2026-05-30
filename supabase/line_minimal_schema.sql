create extension if not exists pgcrypto;

create table if not exists line_profiles (
  id text primary key,
  username text unique not null,
  name text not null,
  role text not null check (role in ('admin', 'worker')),
  line_user_id text unique,
  line_bind_code text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists line_projects (
  id text primary key,
  name text not null,
  client text,
  status text not null default '施工中',
  address text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists line_tasks (
  id text primary key,
  project_id text references line_projects(id) on delete cascade,
  project_name text not null,
  assigned_to text references line_profiles(id) on delete set null,
  title text not null,
  status text not null default '待完成',
  due_date date,
  note text,
  report text,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists line_task_reports (
  id uuid primary key default gen_random_uuid(),
  task_id text references line_tasks(id) on delete cascade,
  profile_id text references line_profiles(id) on delete set null,
  content text not null,
  created_at timestamptz not null default now()
);

insert into line_profiles (id, username, name, role, line_bind_code)
values
  ('u-admin', 'admin', '管理者', 'admin', 'BF-ADMIN-0000'),
  ('u-aming', 'aming', '阿明師傅', 'worker', 'BF-AMING-1234'),
  ('u-along', 'along', '阿龍師傅', 'worker', 'BF-ALONG-1234'),
  ('u-ming', 'ming', '小明水電', 'worker', 'BF-MING-1234')
on conflict (id) do update set
  username = excluded.username,
  name = excluded.name,
  role = excluded.role,
  line_bind_code = excluded.line_bind_code;

insert into line_projects (id, name, client, status, address, note)
values
  ('p-001', '屏東住宅防水工程', '林先生', '施工中', '屏東市住宅案', '浴室與陽台防水，拆除後發現追加需求。'),
  ('p-002', '高雄店面整修', '陳小姐', '待確認追加', '高雄市店面', '業主追加天花板燈槽與牆面修補。')
on conflict (id) do update set
  name = excluded.name,
  client = excluded.client,
  status = excluded.status,
  address = excluded.address,
  note = excluded.note;

insert into line_tasks (
  id,
  project_id,
  project_name,
  assigned_to,
  title,
  status,
  due_date,
  note,
  report
)
values
  (
    't-001',
    'p-001',
    '屏東住宅防水工程',
    'u-aming',
    '完成浴室牆面防水第一道',
    '待完成',
    current_date,
    '施工前先拍照。',
    ''
  ),
  (
    't-002',
    'p-002',
    '高雄店面整修',
    'u-along',
    '確認展示牆尺寸與燈槽位置',
    '待完成',
    current_date,
    '等業主最後尺寸。',
    ''
  ),
  (
    't-003',
    'p-001',
    '屏東住宅防水工程',
    'u-ming',
    '檢查浴室水管與排水位置',
    '待完成',
    current_date,
    '完成後回報現場狀況。',
    ''
  )
on conflict (id) do update set
  project_id = excluded.project_id,
  project_name = excluded.project_name,
  assigned_to = excluded.assigned_to,
  title = excluded.title,
  status = excluded.status,
  due_date = excluded.due_date,
  note = excluded.note,
  report = excluded.report,
  updated_at = now();