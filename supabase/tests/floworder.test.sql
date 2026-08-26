begin;

create extension if not exists pgtap with schema extensions;
set search_path = public, extensions;

select plan(36);

insert into public.organizations (id, name, slug) values
  ('30000000-0000-4000-8000-000000000001', '海港食品測試租戶', 'floworder-test');
select private.seed_floworder_tenant('30000000-0000-4000-8000-000000000001');

select has_table('public', 'floworder_messages', 'messages table exists');
select has_table('public', 'floworder_orders', 'orders table exists');
select has_table('public', 'floworder_inventory_transactions', 'inventory transaction ledger exists');
select has_table('public', 'floworder_rate_limit_buckets', 'database-backed rate limit buckets exist');
select has_function('public', 'floworder_confirm_message_order', 'atomic order confirmation function exists');
select has_function('public', 'floworder_cancel_order', 'atomic order cancellation function exists');
select has_function('public', 'floworder_modify_order', 'atomic order modification function exists');
select has_function('public', 'floworder_consume_rate_limit', 'cross-instance rate limit function exists');

select is((select count(*) from public.floworder_customer_tiers where organization_id = '30000000-0000-4000-8000-000000000001'), 4::bigint, 'four customer tiers are seeded');
select is((select count(*) from public.floworder_sales_accounts where organization_id = '30000000-0000-4000-8000-000000000001'), 6::bigint, 'six sales accounts are seeded');
select is((select count(*) from public.floworder_customers where organization_id = '30000000-0000-4000-8000-000000000001'), 42::bigint, 'more than forty realistic customers are seeded');
select is((select count(*) from public.floworder_products where organization_id = '30000000-0000-4000-8000-000000000001'), 84::bigint, 'more than eighty SKUs are seeded');
select is((select count(*) from public.floworder_orders where organization_id = '30000000-0000-4000-8000-000000000001'), 18::bigint, 'historical orders are seeded');
select ok((select count(*) from public.floworder_inventory_transactions where organization_id = '30000000-0000-4000-8000-000000000001') >= 102, 'opening and historical stock transactions are seeded');

create temporary table floworder_test_ids as
select
  (select id from public.floworder_messages where organization_id = '30000000-0000-4000-8000-000000000001' and status = 'unread' order by created_at limit 1) as message_id,
  (select id from public.floworder_customers where organization_id = '30000000-0000-4000-8000-000000000001' order by code limit 1) as customer_id,
  (select id from public.floworder_products where organization_id = '30000000-0000-4000-8000-000000000001' and sku = 'BEEF-001') as beef_id,
  (select id from public.floworder_products where organization_id = '30000000-0000-4000-8000-000000000001' and sku = 'CHKN-001') as chicken_id;

create temporary table floworder_stock_before as
select product_id, on_hand from public.floworder_inventory_balances
where organization_id = '30000000-0000-4000-8000-000000000001'
  and product_id in ((select beef_id from floworder_test_ids), (select chicken_id from floworder_test_ids));

select lives_ok($$
  select public.floworder_record_parse(
    '30000000-0000-4000-8000-000000000001',
    (select message_id from floworder_test_ids), null,
    'openai', 'gpt-5.4-mini', 'succeeded', 0.94,
    jsonb_build_object('items', jsonb_build_array(
      jsonb_build_object('productId', (select beef_id from floworder_test_ids), 'quantity', 2, 'unit', '箱'),
      jsonb_build_object('productId', (select chicken_id from floworder_test_ids), 'quantity', 3, 'unit', '箱')
    )), null, 842
  )
$$, 'a structured provider result is persisted before human confirmation');
select is(
  (select status from public.floworder_messages where id = (select message_id from floworder_test_ids)),
  'processing',
  'a parsed message waits for human review'
);

select lives_ok($$
  create temporary table floworder_confirm_result as
  select public.floworder_confirm_message_order(
    '30000000-0000-4000-8000-000000000001',
    (select message_id from floworder_test_ids),
    null,
    jsonb_build_object(
      'items', jsonb_build_array(
        jsonb_build_object('productId', (select beef_id from floworder_test_ids), 'quantity', 2, 'unit', '箱'),
        jsonb_build_object('productId', (select chicken_id from floworder_test_ids), 'quantity', 3, 'unit', '箱')
      ),
      'deliveryDate', current_date + 2,
      'deliveryAddress', '台南市新營區民生路二段 18 號',
      'notes', '資料庫交易測試'
    ),
    'confirm-test-0001'
  ) as result
$$, 'a message can be atomically confirmed as an order');

select is(
  (select status from public.floworder_messages where id = (select message_id from floworder_test_ids)),
  'converted',
  'confirmed message becomes converted'
);
select is(
  (select count(*) from public.floworder_order_items where order_id = ((select result from floworder_confirm_result) ->> 'orderId')::uuid),
  2::bigint,
  'confirmation creates both order items'
);
select is(
  (select before.on_hand - balance.on_hand
   from floworder_stock_before before
   join public.floworder_inventory_balances balance on balance.product_id = before.product_id
   where balance.product_id = (select beef_id from floworder_test_ids)),
  2::numeric,
  'confirmation decrements stock through the ledger workflow'
);
select is(
  (select count(*) from public.floworder_inventory_transactions
   where order_id = ((select result from floworder_confirm_result) ->> 'orderId')::uuid and transaction_type = 'order_confirmed'),
  2::bigint,
  'confirmation records one transaction per SKU'
);
select is(
  (public.floworder_confirm_message_order(
    '30000000-0000-4000-8000-000000000001',
    (select message_id from floworder_test_ids), null,
    '{}'::jsonb, 'confirm-test-0001'
  ) ->> 'orderId'),
  ((select result from floworder_confirm_result) ->> 'orderId'),
  'repeated idempotency key returns the original order'
);

select lives_ok(
  format($sql$
    select public.floworder_modify_order(
      '30000000-0000-4000-8000-000000000001', %L::uuid, null,
      jsonb_build_object(
        'items', jsonb_build_array(
          jsonb_build_object('productId', %L::uuid, 'quantity', 4, 'unit', '箱'),
          jsonb_build_object('productId', %L::uuid, 'quantity', 1, 'unit', '箱')
        ),
        'deliveryDate', current_date + 3,
        'deliveryAddress', '台南市新營區復興路 66 號',
        'notes', '客戶修改數量'
      ),
      'modify-test-0001'
    )
  $sql$,
    ((select result from floworder_confirm_result) ->> 'orderId'),
    (select beef_id from floworder_test_ids),
    (select chicken_id from floworder_test_ids)
  ),
  'a confirmed order can be modified atomically'
);
select is(
  (select quantity from public.floworder_order_items
   where order_id = ((select result from floworder_confirm_result) ->> 'orderId')::uuid
     and product_id = (select beef_id from floworder_test_ids)),
  4::numeric,
  'order modification persists the human-confirmed quantity'
);
select is(
  (select count(*) from public.floworder_inventory_transactions
   where order_id = ((select result from floworder_confirm_result) ->> 'orderId')::uuid
     and transaction_type = 'order_modified'),
  4::bigint,
  'order modification records both restoration and deduction for every SKU'
);
select is(
  (public.floworder_modify_order(
    '30000000-0000-4000-8000-000000000001',
    ((select result from floworder_confirm_result) ->> 'orderId')::uuid,
    null, '{}'::jsonb, 'modify-test-0001'
  ) ->> 'orderId'),
  ((select result from floworder_confirm_result) ->> 'orderId'),
  'order modification is idempotent'
);

select is(
  (public.floworder_consume_rate_limit('floworder-test', repeat('b', 64), 1, 60) ->> 'allowed')::boolean,
  true,
  'the first request in a rate-limit bucket is allowed'
);
select is(
  (public.floworder_consume_rate_limit('floworder-test', repeat('b', 64), 1, 60) ->> 'allowed')::boolean,
  false,
  'requests over the configured limit are rejected'
);

select throws_matching(
  format($sql$
    select public.floworder_confirm_message_order(
      '30000000-0000-4000-8000-000000000001',
      %L::uuid, null,
      jsonb_build_object(
        'items', jsonb_build_array(jsonb_build_object('productId', %L::uuid, 'quantity', 999999, 'unit', '箱')),
        'deliveryAddress', '台南市新營區測試地址'
      ),
      'confirm-test-insufficient'
    )
  $sql$,
    (select id from public.floworder_messages where organization_id = '30000000-0000-4000-8000-000000000001' and status = 'read' limit 1),
    (select beef_id from floworder_test_ids)
  ),
  'INSUFFICIENT_STOCK:.*',
  'insufficient stock aborts the entire order'
);

select lives_ok(
  format($sql$
    select public.floworder_cancel_order(
      '30000000-0000-4000-8000-000000000001', %L::uuid, null,
      '客戶取消測試', 'cancel-test-0001'
    )
  $sql$, ((select result from floworder_confirm_result) ->> 'orderId')),
  'a confirmed order can be canceled atomically'
);
select is(
  (select status from public.floworder_orders where id = ((select result from floworder_confirm_result) ->> 'orderId')::uuid),
  'canceled',
  'canceling updates order status'
);
select is(
  (select before.on_hand - balance.on_hand
   from floworder_stock_before before
   join public.floworder_inventory_balances balance on balance.product_id = before.product_id
   where balance.product_id = (select beef_id from floworder_test_ids)),
  0::numeric,
  'canceling restores stock'
);

select lives_ok($$
  select public.floworder_create_message(
    '30000000-0000-4000-8000-000000000001',
    (select customer_id from floworder_test_ids), null, '測試客戶', 'web',
    '牛五花 1 箱', repeat('a', 64), 'message-test-0001'
  )
$$, 'message creation persists through the database workflow');
select throws_matching($$
  select public.floworder_create_message(
    '30000000-0000-4000-8000-000000000001',
    (select customer_id from floworder_test_ids), null, '測試客戶', 'web',
    '牛五花 1 箱', repeat('a', 64), 'message-test-0002'
  )
$$, 'DUPLICATE_MESSAGE', 'duplicate message fingerprints are rejected');

select is(
  (select count(*) from pg_policies
   where schemaname = 'public' and tablename like 'floworder_%' and 'anon' = any(roles)),
  0::bigint,
  'no FlowOrder tenant table exposes an anonymous RLS policy'
);
select ok(
  exists(select 1 from public.audit_logs where organization_id = '30000000-0000-4000-8000-000000000001' and action = 'floworder.order.confirmed'),
  'order confirmation is auditable'
);

select * from finish();
rollback;
