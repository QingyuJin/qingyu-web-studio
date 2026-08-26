begin;

create table public.floworder_rate_limit_buckets (
  scope text not null check (char_length(scope) between 3 and 80),
  subject_hash text not null check (subject_hash ~ '^[a-f0-9]{64}$'),
  bucket_started_at timestamptz not null,
  request_count integer not null default 1 check (request_count > 0),
  updated_at timestamptz not null default now(),
  primary key (scope, subject_hash, bucket_started_at)
);

alter table public.floworder_rate_limit_buckets enable row level security;
alter table public.floworder_rate_limit_buckets force row level security;
revoke all on public.floworder_rate_limit_buckets from public, anon, authenticated;
grant select, insert, update, delete on public.floworder_rate_limit_buckets to service_role;

create or replace function public.floworder_consume_rate_limit(
  request_scope text,
  request_subject_hash text,
  max_requests integer,
  window_seconds integer
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  bucket_start timestamptz;
  current_count integer;
  retry_after integer;
begin
  if char_length(request_scope) not between 3 and 80
    or request_subject_hash !~ '^[a-f0-9]{64}$'
    or max_requests not between 1 and 10000
    or window_seconds not between 1 and 86400 then
    raise exception using errcode = '22023', message = 'INVALID_RATE_LIMIT_CONFIGURATION';
  end if;

  bucket_start := to_timestamp(
    floor(extract(epoch from clock_timestamp()) / window_seconds) * window_seconds
  );

  insert into public.floworder_rate_limit_buckets (
    scope, subject_hash, bucket_started_at, request_count
  ) values (
    request_scope, request_subject_hash, bucket_start, 1
  )
  on conflict (scope, subject_hash, bucket_started_at)
  do update set request_count = public.floworder_rate_limit_buckets.request_count + 1,
    updated_at = now()
  returning request_count into current_count;

  delete from public.floworder_rate_limit_buckets
  where scope = request_scope
    and subject_hash = request_subject_hash
    and bucket_started_at < clock_timestamp() - interval '2 days';

  retry_after := greatest(1, ceil(
    extract(epoch from bucket_start + make_interval(secs => window_seconds) - clock_timestamp())
  )::integer);

  return jsonb_build_object(
    'allowed', current_count <= max_requests,
    'count', current_count,
    'limit', max_requests,
    'retryAfterSeconds', retry_after
  );
end;
$$;

create or replace function public.floworder_modify_order(
  target_organization_id uuid,
  target_order_id uuid,
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
  order_row public.floworder_orders%rowtype;
  customer_row public.floworder_customers%rowtype;
  old_item public.floworder_order_items%rowtype;
  product_row public.floworder_products%rowtype;
  inventory_row public.floworder_inventory_balances%rowtype;
  item jsonb;
  tier_discount numeric(5,2);
  item_quantity numeric(12,3);
  item_price numeric(12,2);
  item_discount numeric(5,2);
  line_subtotal numeric(14,2);
  line_total numeric(14,2);
  order_subtotal numeric(14,2) := 0;
  order_total numeric(14,2) := 0;
  previous_items jsonb;
  cached_response jsonb;
  locked_product_id uuid;
  total_item_count integer;
  distinct_item_count integer;
begin
  if request_idempotency_key is null or char_length(request_idempotency_key) < 8 then
    raise exception using errcode = '22023', message = 'INVALID_IDEMPOTENCY_KEY';
  end if;

  select response into cached_response
  from public.floworder_idempotency_keys
  where organization_id = target_organization_id
    and idempotency_key = request_idempotency_key
    and operation = 'modify_order';
  if cached_response is not null then return cached_response; end if;

  select * into order_row
  from public.floworder_orders
  where id = target_order_id and organization_id = target_organization_id
  for update;
  if not found then raise exception using errcode = 'P0002', message = 'ORDER_NOT_FOUND'; end if;
  if order_row.status not in ('confirmed', 'preparing') then
    raise exception using errcode = '22023', message = 'ORDER_CANNOT_BE_MODIFIED';
  end if;
  if jsonb_typeof(final_payload -> 'items') <> 'array'
    or jsonb_array_length(final_payload -> 'items') = 0 then
    raise exception using errcode = '22023', message = 'ORDER_ITEMS_REQUIRED';
  end if;
  if coalesce(nullif(btrim(final_payload ->> 'deliveryAddress'), ''), '') = '' then
    raise exception using errcode = '22023', message = 'DELIVERY_ADDRESS_REQUIRED';
  end if;

  select count(*), count(distinct (value ->> 'productId')::uuid)
  into total_item_count, distinct_item_count
  from jsonb_array_elements(final_payload -> 'items');
  if total_item_count <> distinct_item_count then
    raise exception using errcode = '22023', message = 'DUPLICATE_ORDER_PRODUCT';
  end if;

  select customer.* into customer_row
  from public.floworder_customers customer
  where customer.id = order_row.customer_id
    and customer.organization_id = target_organization_id;
  if not found then raise exception using errcode = 'P0002', message = 'CUSTOMER_NOT_FOUND'; end if;
  select tier.default_discount into tier_discount
  from public.floworder_customer_tiers tier
  where tier.id = customer_row.tier_id
    and tier.organization_id = target_organization_id;

  select coalesce(jsonb_agg(to_jsonb(existing_item) order by existing_item.product_id), '[]'::jsonb)
  into previous_items
  from public.floworder_order_items existing_item
  where existing_item.organization_id = target_organization_id
    and existing_item.order_id = target_order_id;

  for locked_product_id in
    select balance.product_id
    from public.floworder_inventory_balances balance
    where balance.organization_id = target_organization_id
      and balance.product_id in (
        select existing_item.product_id
        from public.floworder_order_items existing_item
        where existing_item.organization_id = target_organization_id
          and existing_item.order_id = target_order_id
        union
        select (payload_item.value ->> 'productId')::uuid
        from jsonb_array_elements(final_payload -> 'items') payload_item
      )
    order by balance.product_id
    for update
  loop
    null;
  end loop;

  if (
    select count(*)
    from public.floworder_inventory_balances balance
    where balance.organization_id = target_organization_id
      and balance.product_id in (
        select (payload_item.value ->> 'productId')::uuid
        from jsonb_array_elements(final_payload -> 'items') payload_item
      )
  ) <> distinct_item_count then
    raise exception using errcode = 'P0002', message = 'INVENTORY_NOT_FOUND';
  end if;

  for old_item in
    select * from public.floworder_order_items
    where organization_id = target_organization_id and order_id = target_order_id
    order by product_id
  loop
    update public.floworder_inventory_balances
    set on_hand = on_hand + old_item.quantity, version = version + 1, updated_at = now()
    where organization_id = target_organization_id and product_id = old_item.product_id
    returning * into inventory_row;
    insert into public.floworder_inventory_transactions (
      organization_id, product_id, order_id, transaction_type, quantity_delta,
      balance_after, reason, actor_user_id, idempotency_key
    ) values (
      target_organization_id, old_item.product_id, target_order_id, 'order_modified', old_item.quantity,
      inventory_row.on_hand, '修改訂單 ' || order_row.order_number || '：回補原品項',
      actor_user_id, request_idempotency_key
    );
  end loop;

  delete from public.floworder_order_items
  where organization_id = target_organization_id and order_id = target_order_id;

  for item in select value from jsonb_array_elements(final_payload -> 'items') loop
    item_quantity := nullif(item ->> 'quantity', '')::numeric;
    if item_quantity is null or item_quantity <= 0 then
      raise exception using errcode = '22023', message = 'INVALID_ITEM_QUANTITY';
    end if;

    select * into product_row
    from public.floworder_products
    where id = (item ->> 'productId')::uuid
      and organization_id = target_organization_id
      and active
    for share;
    if not found then raise exception using errcode = 'P0002', message = 'PRODUCT_NOT_FOUND'; end if;

    select * into inventory_row
    from public.floworder_inventory_balances
    where organization_id = target_organization_id and product_id = product_row.id;
    if inventory_row.on_hand - inventory_row.reserved < item_quantity then
      raise exception using errcode = 'P0001', message = 'INSUFFICIENT_STOCK:' || product_row.sku;
    end if;

    select price.unit_price, price.discount_percent into item_price, item_discount
    from public.floworder_customer_prices price
    where price.organization_id = target_organization_id
      and price.customer_id = order_row.customer_id
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
      target_organization_id, target_order_id, product_row.id, product_row.sku,
      product_row.name, product_row.specification, product_row.unit, item_quantity,
      item_price, item_discount, line_subtotal, line_total
    );

    update public.floworder_inventory_balances
    set on_hand = on_hand - item_quantity, version = version + 1, updated_at = now()
    where organization_id = target_organization_id and product_id = product_row.id
    returning * into inventory_row;
    insert into public.floworder_inventory_transactions (
      organization_id, product_id, order_id, transaction_type, quantity_delta,
      balance_after, reason, actor_user_id, idempotency_key
    ) values (
      target_organization_id, product_row.id, target_order_id, 'order_modified', -item_quantity,
      inventory_row.on_hand, '修改訂單 ' || order_row.order_number || '：套用新品項',
      actor_user_id, request_idempotency_key
    );
    order_subtotal := order_subtotal + line_subtotal;
    order_total := order_total + line_total;
  end loop;

  update public.floworder_orders
  set delivery_date = nullif(final_payload ->> 'deliveryDate', '')::date,
    delivery_address = nullif(final_payload ->> 'deliveryAddress', ''),
    notes = nullif(final_payload ->> 'notes', ''),
    subtotal = order_subtotal,
    discount_total = order_subtotal - order_total,
    total = order_total,
    updated_by = actor_user_id,
    updated_at = now()
  where id = target_order_id and organization_id = target_organization_id;

  insert into public.audit_logs (organization_id, actor_user_id, action, target_type, target_id, metadata)
  values (
    target_organization_id, actor_user_id, 'floworder.order.modified', 'order', target_order_id::text,
    jsonb_build_object(
      'order_number', order_row.order_number,
      'previous_items', previous_items,
      'final_payload', final_payload,
      'total', order_total
    )
  );

  cached_response := jsonb_build_object(
    'orderId', target_order_id,
    'orderNumber', order_row.order_number,
    'status', order_row.status,
    'total', order_total
  );
  insert into public.floworder_idempotency_keys (organization_id, idempotency_key, operation, response)
  values (target_organization_id, request_idempotency_key, 'modify_order', cached_response);
  return cached_response;
end;
$$;

revoke all on function public.floworder_consume_rate_limit(text, text, integer, integer) from public, anon, authenticated;
revoke all on function public.floworder_modify_order(uuid, uuid, uuid, jsonb, text) from public, anon, authenticated;
grant execute on function public.floworder_consume_rate_limit(text, text, integer, integer) to service_role;
grant execute on function public.floworder_modify_order(uuid, uuid, uuid, jsonb, text) to service_role;

commit;
