begin;

alter table public.roles drop constraint roles_slug_check;
alter table public.roles add constraint roles_slug_check
  check (slug in ('admin', 'manager', 'staff', 'sales', 'customer'));

insert into public.permissions (key, description) values
  ('floworder.messages.read', 'Read FlowOrder messages'),
  ('floworder.messages.create', 'Create FlowOrder messages'),
  ('floworder.messages.manage', 'Manage and parse FlowOrder messages'),
  ('floworder.orders.read', 'Read FlowOrder orders'),
  ('floworder.orders.manage', 'Create, update, and cancel FlowOrder orders'),
  ('floworder.inventory.read', 'Read FlowOrder inventory'),
  ('floworder.inventory.manage', 'Adjust FlowOrder inventory'),
  ('floworder.catalog.read', 'Read FlowOrder products and customer pricing'),
  ('floworder.catalog.manage', 'Manage FlowOrder products'),
  ('floworder.pricing.manage', 'Manage FlowOrder customer pricing')
on conflict (key) do nothing;

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
    (new.id, 'sales', 'Sales'),
    (new.id, 'customer', 'Customer');

  insert into public.role_permissions (organization_id, role_id, permission_id)
  select new.id, role.id, permission.id
  from public.roles as role
  cross join public.permissions as permission
  where role.organization_id = new.id
    and (
      role.slug = 'admin'
      or (role.slug = 'manager' and permission.key not in ('members.manage'))
      or (role.slug in ('staff', 'sales') and permission.key in (
        'files.read', 'files.write', 'floworder.messages.read', 'floworder.messages.create',
        'floworder.messages.manage', 'floworder.orders.read', 'floworder.orders.manage',
        'floworder.inventory.read', 'floworder.catalog.read'
      ))
      or (role.slug = 'customer' and permission.key in (
        'files.read', 'floworder.messages.read', 'floworder.messages.create',
        'floworder.orders.read', 'floworder.catalog.read'
      ))
    );
  return new;
end;
$$;

insert into public.roles (organization_id, slug, name)
select id, 'sales', 'Sales' from public.organizations
on conflict (organization_id, slug) do nothing;

insert into public.role_permissions (organization_id, role_id, permission_id)
select role.organization_id, role.id, permission.id
from public.roles as role
cross join public.permissions as permission
where (
  role.slug = 'admin'
  or (role.slug = 'manager' and permission.key like 'floworder.%')
  or (role.slug in ('staff', 'sales') and permission.key in (
    'floworder.messages.read', 'floworder.messages.create', 'floworder.messages.manage',
    'floworder.orders.read', 'floworder.orders.manage', 'floworder.inventory.read',
    'floworder.catalog.read'
  ))
  or (role.slug = 'customer' and permission.key in (
    'floworder.messages.read', 'floworder.messages.create', 'floworder.orders.read',
    'floworder.catalog.read'
  ))
)
on conflict do nothing;

create table public.floworder_customer_tiers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  code text not null check (code ~ '^[A-Z][A-Z0-9_-]{1,19}$'),
  name text not null check (char_length(name) between 1 and 80),
  default_discount numeric(5,2) not null default 0 check (default_discount between 0 and 100),
  payment_terms_days integer not null default 0 check (payment_terms_days between 0 and 365),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, code),
  unique (id, organization_id)
);

create table public.floworder_sales_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null check (char_length(name) between 1 and 80),
  email text not null check (char_length(email) between 3 and 320),
  phone text check (phone is null or char_length(phone) <= 40),
  territory text check (territory is null or char_length(territory) <= 120),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, email),
  unique (id, organization_id)
);

create table public.floworder_customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  tier_id uuid not null,
  assigned_sales_account_id uuid,
  code text not null check (code ~ '^[A-Z0-9-]{3,30}$'),
  name text not null check (char_length(name) between 1 and 160),
  tax_id text check (tax_id is null or tax_id ~ '^[0-9]{8}$'),
  contact_name text check (contact_name is null or char_length(contact_name) <= 80),
  phone text check (phone is null or char_length(phone) <= 40),
  email text check (email is null or char_length(email) <= 320),
  payment_terms_days integer not null default 0 check (payment_terms_days between 0 and 365),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint floworder_customers_tier_fkey foreign key (tier_id, organization_id)
    references public.floworder_customer_tiers(id, organization_id) on delete restrict,
  constraint floworder_customers_sales_fkey foreign key (assigned_sales_account_id, organization_id)
    references public.floworder_sales_accounts(id, organization_id) on delete restrict,
  unique (organization_id, code),
  unique (id, organization_id)
);

create table public.floworder_customer_addresses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null,
  label text not null check (char_length(label) between 1 and 60),
  recipient text not null check (char_length(recipient) between 1 and 80),
  phone text check (phone is null or char_length(phone) <= 40),
  postal_code text check (postal_code is null or char_length(postal_code) <= 10),
  city text not null check (char_length(city) between 1 and 40),
  district text not null check (char_length(district) between 1 and 40),
  address_line text not null check (char_length(address_line) between 1 and 240),
  delivery_notes text check (delivery_notes is null or char_length(delivery_notes) <= 500),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint floworder_customer_addresses_customer_fkey foreign key (customer_id, organization_id)
    references public.floworder_customers(id, organization_id) on delete cascade
);
create unique index floworder_customer_default_address_idx
  on public.floworder_customer_addresses (organization_id, customer_id) where is_default;

create table public.floworder_products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sku text not null check (sku ~ '^[A-Z0-9-]{4,40}$'),
  name text not null check (char_length(name) between 1 and 160),
  category text not null check (char_length(category) between 1 and 80),
  specification text not null check (char_length(specification) between 1 and 160),
  unit text not null check (char_length(unit) between 1 and 20),
  standard_price numeric(12,2) not null check (standard_price >= 0),
  cost numeric(12,2) not null check (cost >= 0),
  safety_stock numeric(12,3) not null default 0 check (safety_stock >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, sku),
  unique (id, organization_id)
);

create table public.floworder_inventory_balances (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid not null,
  on_hand numeric(12,3) not null default 0 check (on_hand >= 0),
  reserved numeric(12,3) not null default 0 check (reserved >= 0 and reserved <= on_hand),
  version bigint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (organization_id, product_id),
  constraint floworder_inventory_product_fkey foreign key (product_id, organization_id)
    references public.floworder_products(id, organization_id) on delete cascade
);

create table public.floworder_customer_prices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null,
  product_id uuid not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  discount_percent numeric(5,2) not null default 0 check (discount_percent between 0 and 100),
  valid_from date not null default current_date,
  valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint floworder_customer_prices_customer_fkey foreign key (customer_id, organization_id)
    references public.floworder_customers(id, organization_id) on delete cascade,
  constraint floworder_customer_prices_product_fkey foreign key (product_id, organization_id)
    references public.floworder_products(id, organization_id) on delete cascade,
  constraint floworder_customer_prices_dates_check check (valid_until is null or valid_until >= valid_from),
  unique (organization_id, customer_id, product_id, valid_from)
);

create table public.floworder_messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid not null,
  sender_user_id uuid references auth.users(id) on delete set null,
  sender_name text not null check (char_length(sender_name) between 1 and 120),
  source text not null default 'web' check (source in ('web', 'line', 'api', 'import')),
  external_message_id text,
  raw_text text not null check (char_length(raw_text) between 1 and 4000),
  fingerprint text not null check (char_length(fingerprint) = 64),
  status text not null default 'unread' check (status in ('unread', 'read', 'processing', 'converted', 'archived')),
  read_at timestamptz,
  read_by uuid references auth.users(id) on delete set null,
  processed_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint floworder_messages_customer_fkey foreign key (customer_id, organization_id)
    references public.floworder_customers(id, organization_id) on delete restrict,
  unique (organization_id, customer_id, fingerprint),
  unique (id, organization_id)
);

create table public.floworder_ai_parses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  message_id uuid not null,
  provider text not null check (char_length(provider) between 1 and 80),
  model text not null check (char_length(model) between 1 and 120),
  status text not null check (status in ('succeeded', 'needs_review', 'failed', 'not_configured')),
  confidence numeric(5,4) check (confidence is null or confidence between 0 and 1),
  structured_result jsonb,
  final_result jsonb,
  error_code text,
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  parsed_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  constraint floworder_ai_parses_message_fkey foreign key (message_id, organization_id)
    references public.floworder_messages(id, organization_id) on delete cascade,
  unique (id, organization_id)
);

create sequence public.floworder_order_number_seq;
revoke all on sequence public.floworder_order_number_seq from public, anon, authenticated;
grant usage, select on sequence public.floworder_order_number_seq to service_role;

create table public.floworder_orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  order_number text not null check (order_number ~ '^FO-[0-9]{6}-[0-9]{6,}$'),
  customer_id uuid not null,
  sales_account_id uuid,
  source_message_id uuid,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'shipped', 'completed', 'canceled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'partial', 'paid', 'refunded')),
  fulfillment_status text not null default 'unfulfilled' check (fulfillment_status in ('unfulfilled', 'preparing', 'shipped', 'fulfilled', 'canceled')),
  delivery_date date,
  delivery_address text not null check (char_length(delivery_address) between 1 and 500),
  notes text check (notes is null or char_length(notes) <= 2000),
  subtotal numeric(14,2) not null default 0 check (subtotal >= 0),
  discount_total numeric(14,2) not null default 0 check (discount_total >= 0),
  total numeric(14,2) not null default 0 check (total >= 0),
  confirmed_at timestamptz,
  canceled_at timestamptz,
  cancel_reason text check (cancel_reason is null or char_length(cancel_reason) <= 500),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint floworder_orders_customer_fkey foreign key (customer_id, organization_id)
    references public.floworder_customers(id, organization_id) on delete restrict,
  constraint floworder_orders_sales_fkey foreign key (sales_account_id, organization_id)
    references public.floworder_sales_accounts(id, organization_id) on delete restrict,
  constraint floworder_orders_message_fkey foreign key (source_message_id, organization_id)
    references public.floworder_messages(id, organization_id) on delete restrict,
  unique (organization_id, order_number),
  unique (organization_id, source_message_id),
  unique (id, organization_id)
);

create table public.floworder_order_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  order_id uuid not null,
  product_id uuid not null,
  sku text not null,
  product_name text not null,
  specification text not null,
  unit text not null,
  quantity numeric(12,3) not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  discount_percent numeric(5,2) not null default 0 check (discount_percent between 0 and 100),
  line_subtotal numeric(14,2) not null check (line_subtotal >= 0),
  line_total numeric(14,2) not null check (line_total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint floworder_order_items_order_fkey foreign key (order_id, organization_id)
    references public.floworder_orders(id, organization_id) on delete cascade,
  constraint floworder_order_items_product_fkey foreign key (product_id, organization_id)
    references public.floworder_products(id, organization_id) on delete restrict,
  unique (organization_id, order_id, product_id)
);

create table public.floworder_inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid not null,
  order_id uuid,
  transaction_type text not null check (transaction_type in ('opening', 'adjustment', 'order_confirmed', 'order_modified', 'order_canceled')),
  quantity_delta numeric(12,3) not null check (quantity_delta <> 0),
  balance_after numeric(12,3) not null check (balance_after >= 0),
  reason text not null check (char_length(reason) between 1 and 500),
  actor_user_id uuid references auth.users(id) on delete set null,
  idempotency_key text,
  created_at timestamptz not null default now(),
  constraint floworder_inventory_transactions_product_fkey foreign key (product_id, organization_id)
    references public.floworder_products(id, organization_id) on delete restrict,
  constraint floworder_inventory_transactions_order_fkey foreign key (order_id, organization_id)
    references public.floworder_orders(id, organization_id) on delete restrict
);

create table public.floworder_idempotency_keys (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  idempotency_key text not null check (char_length(idempotency_key) between 8 and 200),
  operation text not null check (char_length(operation) between 3 and 80),
  response jsonb not null,
  created_at timestamptz not null default now(),
  primary key (organization_id, idempotency_key, operation)
);

create table public.floworder_demo_sandboxes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz not null,
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index floworder_customers_sales_idx on public.floworder_customers (organization_id, assigned_sales_account_id);
create index floworder_messages_inbox_idx on public.floworder_messages (organization_id, status, created_at desc);
create index floworder_messages_search_idx on public.floworder_messages using gin (to_tsvector('simple', raw_text));
create index floworder_ai_parses_message_idx on public.floworder_ai_parses (organization_id, message_id, parsed_at desc);
create index floworder_orders_list_idx on public.floworder_orders (organization_id, status, created_at desc);
create index floworder_orders_customer_idx on public.floworder_orders (organization_id, customer_id, created_at desc);
create index floworder_inventory_transactions_idx on public.floworder_inventory_transactions (organization_id, product_id, created_at desc);
create index floworder_demo_sandboxes_expiry_idx on public.floworder_demo_sandboxes (expires_at);

create trigger floworder_customer_tiers_set_updated_at before update on public.floworder_customer_tiers
for each row execute function private.set_updated_at();
create trigger floworder_sales_accounts_set_updated_at before update on public.floworder_sales_accounts
for each row execute function private.set_updated_at();
create trigger floworder_customers_set_updated_at before update on public.floworder_customers
for each row execute function private.set_updated_at();
create trigger floworder_customer_addresses_set_updated_at before update on public.floworder_customer_addresses
for each row execute function private.set_updated_at();
create trigger floworder_products_set_updated_at before update on public.floworder_products
for each row execute function private.set_updated_at();
create trigger floworder_customer_prices_set_updated_at before update on public.floworder_customer_prices
for each row execute function private.set_updated_at();
create trigger floworder_messages_set_updated_at before update on public.floworder_messages
for each row execute function private.set_updated_at();
create trigger floworder_orders_set_updated_at before update on public.floworder_orders
for each row execute function private.set_updated_at();
create trigger floworder_order_items_set_updated_at before update on public.floworder_order_items
for each row execute function private.set_updated_at();

create or replace function private.floworder_has_role(target_organization_id uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    join public.roles role on role.id = membership.role_id and role.organization_id = membership.organization_id
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and role.slug = any(allowed_roles)
  );
$$;

create or replace function private.floworder_customer_visible(target_organization_id uuid, target_customer_id uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select
    private.floworder_has_role(target_organization_id, array['admin','manager'])
    or exists (
      select 1
      from public.floworder_customers customer
      left join public.floworder_sales_accounts sales on sales.id = customer.assigned_sales_account_id
      where customer.organization_id = target_organization_id
        and customer.id = target_customer_id
        and (
          customer.user_id = auth.uid()
          or (sales.organization_id = target_organization_id and sales.user_id = auth.uid())
        )
    );
$$;

revoke all on function private.floworder_has_role(uuid, text[]) from public, anon, authenticated;
revoke all on function private.floworder_customer_visible(uuid, uuid) from public, anon, authenticated;
grant execute on function private.floworder_has_role(uuid, text[]) to authenticated, service_role;
grant execute on function private.floworder_customer_visible(uuid, uuid) to authenticated, service_role;

alter table public.floworder_customer_tiers enable row level security;
alter table public.floworder_sales_accounts enable row level security;
alter table public.floworder_customers enable row level security;
alter table public.floworder_customer_addresses enable row level security;
alter table public.floworder_products enable row level security;
alter table public.floworder_inventory_balances enable row level security;
alter table public.floworder_customer_prices enable row level security;
alter table public.floworder_messages enable row level security;
alter table public.floworder_ai_parses enable row level security;
alter table public.floworder_orders enable row level security;
alter table public.floworder_order_items enable row level security;
alter table public.floworder_inventory_transactions enable row level security;
alter table public.floworder_idempotency_keys enable row level security;
alter table public.floworder_demo_sandboxes enable row level security;

alter table public.floworder_customer_tiers force row level security;
alter table public.floworder_sales_accounts force row level security;
alter table public.floworder_customers force row level security;
alter table public.floworder_customer_addresses force row level security;
alter table public.floworder_products force row level security;
alter table public.floworder_inventory_balances force row level security;
alter table public.floworder_customer_prices force row level security;
alter table public.floworder_messages force row level security;
alter table public.floworder_ai_parses force row level security;
alter table public.floworder_orders force row level security;
alter table public.floworder_order_items force row level security;
alter table public.floworder_inventory_transactions force row level security;
alter table public.floworder_idempotency_keys force row level security;
alter table public.floworder_demo_sandboxes force row level security;

create policy floworder_tiers_member_select on public.floworder_customer_tiers for select to authenticated
using (private.is_organization_member(organization_id));
create policy floworder_sales_member_select on public.floworder_sales_accounts for select to authenticated
using (private.is_organization_member(organization_id));
create policy floworder_customers_scoped_select on public.floworder_customers for select to authenticated
using (private.floworder_customer_visible(organization_id, id));
create policy floworder_addresses_scoped_select on public.floworder_customer_addresses for select to authenticated
using (private.floworder_customer_visible(organization_id, customer_id));
create policy floworder_products_member_select on public.floworder_products for select to authenticated
using (private.is_organization_member(organization_id));
create policy floworder_inventory_staff_select on public.floworder_inventory_balances for select to authenticated
using (private.floworder_has_role(organization_id, array['admin','manager','staff','sales']));
create policy floworder_customer_prices_scoped_select on public.floworder_customer_prices for select to authenticated
using (private.floworder_customer_visible(organization_id, customer_id));
create policy floworder_messages_scoped_select on public.floworder_messages for select to authenticated
using (private.floworder_customer_visible(organization_id, customer_id));
create policy floworder_ai_parses_staff_select on public.floworder_ai_parses for select to authenticated
using (private.floworder_has_role(organization_id, array['admin','manager','staff','sales']));
create policy floworder_orders_scoped_select on public.floworder_orders for select to authenticated
using (private.floworder_customer_visible(organization_id, customer_id));
create policy floworder_order_items_scoped_select on public.floworder_order_items for select to authenticated
using (exists (
  select 1 from public.floworder_orders orders
  where orders.id = public.floworder_order_items.order_id
    and orders.organization_id = public.floworder_order_items.organization_id
    and private.floworder_customer_visible(orders.organization_id, orders.customer_id)
));
create policy floworder_transactions_staff_select on public.floworder_inventory_transactions for select to authenticated
using (private.floworder_has_role(organization_id, array['admin','manager','staff','sales']));

revoke all on public.floworder_customer_tiers, public.floworder_sales_accounts,
  public.floworder_customers, public.floworder_customer_addresses, public.floworder_products,
  public.floworder_inventory_balances, public.floworder_customer_prices, public.floworder_messages,
  public.floworder_ai_parses, public.floworder_orders, public.floworder_order_items,
  public.floworder_inventory_transactions, public.floworder_idempotency_keys,
  public.floworder_demo_sandboxes from anon, authenticated;
grant select on public.floworder_customer_tiers, public.floworder_sales_accounts,
  public.floworder_customers, public.floworder_customer_addresses, public.floworder_products,
  public.floworder_inventory_balances, public.floworder_customer_prices, public.floworder_messages,
  public.floworder_ai_parses, public.floworder_orders, public.floworder_order_items,
  public.floworder_inventory_transactions to authenticated;
grant all privileges on public.floworder_customer_tiers, public.floworder_sales_accounts,
  public.floworder_customers, public.floworder_customer_addresses, public.floworder_products,
  public.floworder_inventory_balances, public.floworder_customer_prices, public.floworder_messages,
  public.floworder_ai_parses, public.floworder_orders, public.floworder_order_items,
  public.floworder_inventory_transactions, public.floworder_idempotency_keys,
  public.floworder_demo_sandboxes to service_role;

create or replace function public.floworder_confirm_message_order(
  target_organization_id uuid,
  target_message_id uuid,
  actor_user_id uuid,
  final_payload jsonb,
  request_idempotency_key text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  message_row public.floworder_messages%rowtype;
  customer_row public.floworder_customers%rowtype;
  tier_discount numeric(5,2);
  item jsonb;
  product_row public.floworder_products%rowtype;
  inventory_row public.floworder_inventory_balances%rowtype;
  new_order_id uuid := extensions.gen_random_uuid();
  new_order_number text;
  item_quantity numeric(12,3);
  item_price numeric(12,2);
  item_discount numeric(5,2);
  line_subtotal numeric(14,2);
  line_total numeric(14,2);
  order_subtotal numeric(14,2) := 0;
  order_total numeric(14,2) := 0;
  cached_response jsonb;
begin
  if request_idempotency_key is null or char_length(request_idempotency_key) < 8 then
    raise exception using errcode = '22023', message = 'INVALID_IDEMPOTENCY_KEY';
  end if;

  select response into cached_response
  from public.floworder_idempotency_keys
  where organization_id = target_organization_id
    and idempotency_key = request_idempotency_key
    and operation = 'confirm_message_order';
  if cached_response is not null then return cached_response; end if;

  select * into message_row from public.floworder_messages
  where id = target_message_id and organization_id = target_organization_id
  for update;
  if not found then raise exception using errcode = 'P0002', message = 'MESSAGE_NOT_FOUND'; end if;
  if message_row.status = 'converted' then
    raise exception using errcode = '23505', message = 'MESSAGE_ALREADY_CONVERTED';
  end if;
  if jsonb_typeof(final_payload -> 'items') <> 'array' or jsonb_array_length(final_payload -> 'items') = 0 then
    raise exception using errcode = '22023', message = 'ORDER_ITEMS_REQUIRED';
  end if;

  select customer.* into customer_row
  from public.floworder_customers customer
  where customer.id = message_row.customer_id and customer.organization_id = target_organization_id;
  select tier.default_discount into tier_discount
  from public.floworder_customer_tiers tier
  where tier.id = customer_row.tier_id and tier.organization_id = target_organization_id;

  new_order_number := 'FO-' || to_char(clock_timestamp(), 'YYYYMM') || '-' ||
    lpad(nextval('public.floworder_order_number_seq')::text, 6, '0');

  insert into public.floworder_orders (
    id, organization_id, order_number, customer_id, sales_account_id, source_message_id,
    status, delivery_date, delivery_address, notes, created_by, updated_by, confirmed_at
  ) values (
    new_order_id, target_organization_id, new_order_number, message_row.customer_id,
    customer_row.assigned_sales_account_id, target_message_id, 'confirmed',
    nullif(final_payload ->> 'deliveryDate', '')::date,
    coalesce(nullif(final_payload ->> 'deliveryAddress', ''), '待業務確認配送地址'),
    nullif(final_payload ->> 'notes', ''), actor_user_id, actor_user_id, now()
  );

  for item in select value from jsonb_array_elements(final_payload -> 'items') loop
    item_quantity := nullif(item ->> 'quantity', '')::numeric;
    if item_quantity is null or item_quantity <= 0 then
      raise exception using errcode = '22023', message = 'INVALID_ITEM_QUANTITY';
    end if;

    select * into product_row from public.floworder_products
    where id = (item ->> 'productId')::uuid and organization_id = target_organization_id and active
    for share;
    if not found then raise exception using errcode = 'P0002', message = 'PRODUCT_NOT_FOUND'; end if;

    select * into inventory_row from public.floworder_inventory_balances
    where organization_id = target_organization_id and product_id = product_row.id
    for update;
    if not found then raise exception using errcode = 'P0002', message = 'INVENTORY_NOT_FOUND'; end if;
    if inventory_row.on_hand - inventory_row.reserved < item_quantity then
      raise exception using errcode = 'P0001', message = 'INSUFFICIENT_STOCK:' || product_row.sku;
    end if;

    select price.unit_price, price.discount_percent into item_price, item_discount
    from public.floworder_customer_prices price
    where price.organization_id = target_organization_id
      and price.customer_id = message_row.customer_id
      and price.product_id = product_row.id
      and price.valid_from <= current_date
      and (price.valid_until is null or price.valid_until >= current_date)
    order by price.valid_from desc limit 1;
    item_price := coalesce(item_price, product_row.standard_price);
    item_discount := coalesce(item_discount, tier_discount, 0);
    line_subtotal := round(item_quantity * item_price, 2);
    line_total := round(line_subtotal * (1 - item_discount / 100), 2);

    insert into public.floworder_order_items (
      organization_id, order_id, product_id, sku, product_name, specification, unit,
      quantity, unit_price, discount_percent, line_subtotal, line_total
    ) values (
      target_organization_id, new_order_id, product_row.id, product_row.sku, product_row.name,
      product_row.specification, product_row.unit, item_quantity, item_price, item_discount,
      line_subtotal, line_total
    );

    update public.floworder_inventory_balances
    set on_hand = on_hand - item_quantity, version = version + 1, updated_at = now()
    where organization_id = target_organization_id and product_id = product_row.id
    returning * into inventory_row;

    insert into public.floworder_inventory_transactions (
      organization_id, product_id, order_id, transaction_type, quantity_delta,
      balance_after, reason, actor_user_id, idempotency_key
    ) values (
      target_organization_id, product_row.id, new_order_id, 'order_confirmed', -item_quantity,
      inventory_row.on_hand, '確認訂單 ' || new_order_number, actor_user_id, request_idempotency_key
    );
    order_subtotal := order_subtotal + line_subtotal;
    order_total := order_total + line_total;
  end loop;

  update public.floworder_orders
  set subtotal = order_subtotal, discount_total = order_subtotal - order_total, total = order_total
  where id = new_order_id and organization_id = target_organization_id;
  update public.floworder_messages
  set status = 'converted', processed_at = now(), read_at = coalesce(read_at, now()), read_by = coalesce(read_by, actor_user_id)
  where id = target_message_id and organization_id = target_organization_id;
  update public.floworder_ai_parses
  set final_result = final_payload, reviewed_at = now(), reviewed_by = actor_user_id
  where id = (
    select id from public.floworder_ai_parses
    where organization_id = target_organization_id and message_id = target_message_id
    order by parsed_at desc limit 1
  );
  insert into public.audit_logs (organization_id, actor_user_id, action, target_type, target_id, metadata)
  values (
    target_organization_id, actor_user_id, 'floworder.order.confirmed', 'order', new_order_id::text,
    jsonb_build_object('order_number', new_order_number, 'source_message_id', target_message_id, 'total', order_total)
  );

  cached_response := jsonb_build_object('orderId', new_order_id, 'orderNumber', new_order_number, 'total', order_total);
  insert into public.floworder_idempotency_keys (organization_id, idempotency_key, operation, response)
  values (target_organization_id, request_idempotency_key, 'confirm_message_order', cached_response);
  return cached_response;
end;
$$;

create or replace function public.floworder_cancel_order(
  target_organization_id uuid,
  target_order_id uuid,
  actor_user_id uuid,
  reason_text text,
  request_idempotency_key text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  order_row public.floworder_orders%rowtype;
  item_row public.floworder_order_items%rowtype;
  new_balance numeric(12,3);
  cached_response jsonb;
begin
  select response into cached_response from public.floworder_idempotency_keys
  where organization_id = target_organization_id and idempotency_key = request_idempotency_key
    and operation = 'cancel_order';
  if cached_response is not null then return cached_response; end if;

  select * into order_row from public.floworder_orders
  where id = target_order_id and organization_id = target_organization_id for update;
  if not found then raise exception using errcode = 'P0002', message = 'ORDER_NOT_FOUND'; end if;
  if order_row.status = 'canceled' then raise exception using errcode = '23505', message = 'ORDER_ALREADY_CANCELED'; end if;
  if order_row.status in ('shipped', 'completed') then
    raise exception using errcode = '22023', message = 'ORDER_CANNOT_BE_CANCELED';
  end if;

  for item_row in select * from public.floworder_order_items
    where order_id = target_order_id and organization_id = target_organization_id
    order by product_id for update
  loop
    update public.floworder_inventory_balances
    set on_hand = on_hand + item_row.quantity, version = version + 1, updated_at = now()
    where organization_id = target_organization_id and product_id = item_row.product_id
    returning on_hand into new_balance;
    insert into public.floworder_inventory_transactions (
      organization_id, product_id, order_id, transaction_type, quantity_delta,
      balance_after, reason, actor_user_id, idempotency_key
    ) values (
      target_organization_id, item_row.product_id, target_order_id, 'order_canceled', item_row.quantity,
      new_balance, '取消訂單 ' || order_row.order_number || '：' || reason_text,
      actor_user_id, request_idempotency_key
    );
  end loop;

  update public.floworder_orders set status = 'canceled', fulfillment_status = 'canceled',
    canceled_at = now(), cancel_reason = reason_text, updated_by = actor_user_id
  where id = target_order_id and organization_id = target_organization_id;
  insert into public.audit_logs (organization_id, actor_user_id, action, target_type, target_id, metadata)
  values (target_organization_id, actor_user_id, 'floworder.order.canceled', 'order', target_order_id::text,
    jsonb_build_object('order_number', order_row.order_number, 'reason', reason_text));
  cached_response := jsonb_build_object('orderId', target_order_id, 'status', 'canceled');
  insert into public.floworder_idempotency_keys (organization_id, idempotency_key, operation, response)
  values (target_organization_id, request_idempotency_key, 'cancel_order', cached_response);
  return cached_response;
end;
$$;

revoke all on function public.floworder_confirm_message_order(uuid, uuid, uuid, jsonb, text) from public, anon, authenticated;
revoke all on function public.floworder_cancel_order(uuid, uuid, uuid, text, text) from public, anon, authenticated;
grant execute on function public.floworder_confirm_message_order(uuid, uuid, uuid, jsonb, text) to service_role;
grant execute on function public.floworder_cancel_order(uuid, uuid, uuid, text, text) to service_role;

commit;
