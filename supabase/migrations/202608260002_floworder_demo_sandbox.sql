begin;

create or replace function private.seed_floworder_tenant(target_organization_id uuid)
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $$
begin
  insert into public.floworder_customer_tiers (
    organization_id, code, name, default_discount, payment_terms_days
  ) values
    (target_organization_id, 'STANDARD', '標準客戶', 0, 7),
    (target_organization_id, 'SILVER', '銀級合作', 3, 14),
    (target_organization_id, 'GOLD', '金級夥伴', 6, 30),
    (target_organization_id, 'STRATEGIC', '策略客戶', 9, 45);

  insert into public.floworder_sales_accounts (
    organization_id, name, email, phone, territory
  ) values
    (target_organization_id, '王柏翔', 'bo.wang@demo.floworder.tw', '0912-680-231', '台南中西區、安平區'),
    (target_organization_id, '陳怡君', 'yijun.chen@demo.floworder.tw', '0928-430-517', '台南東區、永康區'),
    (target_organization_id, '林俊豪', 'junhao.lin@demo.floworder.tw', '0936-721-406', '新營、鹽水、白河'),
    (target_organization_id, '黃雅雯', 'yawen.huang@demo.floworder.tw', '0988-316-952', '嘉義市、民雄、水上'),
    (target_organization_id, '蔡明哲', 'mingzhe.tsai@demo.floworder.tw', '0975-280-663', '高雄左營、鼓山、三民'),
    (target_organization_id, '吳思穎', 'siying.wu@demo.floworder.tw', '0966-542-187', '高雄前鎮、苓雅、鳳山');

  with customer_names(name, ord) as (
    select * from unnest(array[
      '新營佳味餐飲有限公司','府城日光飯店','安平海味食堂','永康豐盛團膳有限公司',
      '赤崁宴會館','善化田園自助餐','南科好食企業社','白河關子嶺餐飲有限公司',
      '鹽水月津港餐廳','麻豆柚香宴席中心','佳里鮮味坊','學甲虱目魚餐廳',
      '東山山產料理','柳營牧場廚房','官田菱角食堂','仁德幸福外燴',
      '歸仁大廚團膳','關廟鳳梨宴會館','玉井青果餐廳','楠西梅嶺風味館',
      '嘉義檜意森活餐廳','民雄金桔宴會廳','水上北回餐飲有限公司','太保故宮南院餐廳',
      '朴子配天宮宴席','新港香藝食堂','布袋海風餐飲','東石漁港鮮味館',
      '左營蓮池潭餐廳','鼓山港都會館','三民好客自助餐','苓雅文化中心餐廳',
      '前鎮漁市料理','鳳山曹公宴會館','大寮工業區團膳','鳥松澄清湖餐廳',
      '岡山羊肉宴席中心','路竹科學園區餐飲','湖內東方餐廳','茄萣濱海食堂',
      '旗津海岸餐廳','小港機場餐飲服務'
    ]::text[]) with ordinality
  ), tier_rows as (
    select id, row_number() over (order by code) as ord
    from public.floworder_customer_tiers where organization_id = target_organization_id
  ), sales_rows as (
    select id, row_number() over (order by email) as ord
    from public.floworder_sales_accounts where organization_id = target_organization_id
  )
  insert into public.floworder_customers (
    organization_id, tier_id, assigned_sales_account_id, code, name, tax_id,
    contact_name, phone, email, payment_terms_days
  )
  select
    target_organization_id,
    (select id from tier_rows where ord = ((names.ord - 1) % 4) + 1),
    (select id from sales_rows where ord = ((names.ord - 1) % 6) + 1),
    'CUST-' || lpad(names.ord::text, 3, '0'),
    names.name,
    lpad((78000000 + names.ord)::text, 8, '0'),
    (array['陳小姐','林先生','黃經理','蔡主任','吳小姐','許主廚','鄭店長','謝採購','郭先生','周經理'])[((names.ord - 1) % 10) + 1],
    '06-2' || lpad((31000 + names.ord)::text, 5, '0'),
    'purchase' || names.ord || '@demo.floworder.tw',
    (array[7,14,30,45])[((names.ord - 1) % 4) + 1]
  from customer_names names;

  with customer_rows as (
    select customer.*, row_number() over (order by code) as ord
    from public.floworder_customers customer where organization_id = target_organization_id
  )
  insert into public.floworder_customer_addresses (
    organization_id, customer_id, label, recipient, phone, postal_code, city,
    district, address_line, delivery_notes, is_default
  )
  select
    target_organization_id, customer.id, '主要收貨地址', coalesce(customer.contact_name, '收貨人'),
    customer.phone,
    (array['700','701','702','704','710','730','600','813','806','830'])[((customer.ord - 1) % 10) + 1],
    case when customer.ord <= 20 then '台南市' when customer.ord <= 28 then '嘉義縣' else '高雄市' end,
    (array['中西區','東區','安平區','永康區','新營區','民雄鄉','水上鄉','左營區','前鎮區','鳳山區'])[((customer.ord - 1) % 10) + 1],
    (array['民生路二段 18 號','中華東路三段 120 號','安平路 77 號','中正北路 210 號','健康路一段 35 號','文化路 168 號','中山路二段 91 號'])[((customer.ord - 1) % 7) + 1],
    case when customer.ord % 3 = 0 then '上午十點前送達，請先電話聯絡' else '抵達後請由後門卸貨' end,
    true
  from customer_rows customer;

  with product_names(name, ord) as (
    select * from unnest(array[
      '美國特選牛五花','美國翼板牛排','美國無骨牛小排','美國牛肋條','美國牛板腱','美國牛腱心','澳洲穀飼牛五花',
      '澳洲穀飼牛腱','澳洲牛梅花火鍋片','紐西蘭牛肋條','紐西蘭牛腱','骰子牛肉','牛絞肉','牛筋','牛肚',
      '台灣梅花豬','台灣五花豬','台灣里肌豬排','台灣豬絞肉','台灣豬腳','台灣豬肋排','西班牙伊比利梅花豬',
      '西班牙伊比利豬肋條','加拿大豬梅花','加拿大豬五花','松阪豬','豬大腸','豬肚','豬軟骨','培根肉片',
      '國產去骨雞腿排','國產帶骨雞腿','國產雞胸肉','國產雞里肌','國產二節翅','國產三節翅','國產雞翅小腿',
      '國產雞胗','國產雞心','國產雞皮','國產全雞','鹽水雞胸','香草嫩雞腿','舒肥雞胸','雞絞肉',
      '挪威鮭魚菲力','挪威鮭魚切片','智利鮭魚丁','冰島鱈魚切片','格陵蘭大比目魚','台灣鯛魚片','虱目魚柳',
      '虱目魚肚','白帶魚切片','日本干貝','北海道生食級干貝','草蝦仁','白蝦','鯖魚片','透抽圈','花枝丸',
      '手工貢丸','香菇貢丸','墨魚香腸','原味香腸','德式香腸','煙燻火腿','黃金魚丸','虱目魚丸','花枝漿',
      '蝦仁漿','起司雞肉丸','黑胡椒肉排','日式唐揚雞','酥炸雞塊','古早味排骨酥',
      '冷凍青花菜','冷凍玉米筍','冷凍毛豆仁','冷凍三色豆','冷凍薯條','冷凍洋蔥圈','冷凍南瓜塊','冷凍栗子地瓜','冷凍菠菜','冷凍甜椒丁'
    ]::text[]) with ordinality
  )
  insert into public.floworder_products (
    organization_id, sku, name, category, specification, unit,
    standard_price, cost, safety_stock, active
  )
  select
    target_organization_id,
    case
      when ord <= 15 then 'BEEF-' || lpad(ord::text, 3, '0')
      when ord <= 30 then 'PORK-' || lpad((ord - 15)::text, 3, '0')
      when ord <= 45 then 'CHKN-' || lpad((ord - 30)::text, 3, '0')
      when ord <= 60 then 'SEAF-' || lpad((ord - 45)::text, 3, '0')
      when ord <= 74 then 'PROC-' || lpad((ord - 60)::text, 3, '0')
      else 'VEGE-' || lpad((ord - 74)::text, 3, '0')
    end,
    name,
    case
      when ord <= 15 then '牛肉' when ord <= 30 then '豬肉' when ord <= 45 then '雞肉'
      when ord <= 60 then '海鮮' when ord <= 74 then '調理加工品' else '冷凍蔬菜'
    end,
    case
      when ord <= 45 then (8 + (ord % 5) * 2)::text || ' kg／箱'
      when ord <= 60 then (6 + (ord % 4) * 2)::text || ' kg／箱'
      when ord <= 74 then (10 + (ord % 3) * 2)::text || ' kg／箱'
      else '10 kg／箱'
    end,
    '箱',
    (820 + ord * 37 + (ord % 5) * 80)::numeric(12,2),
    (610 + ord * 28 + (ord % 5) * 55)::numeric(12,2),
    (8 + (ord % 7) * 2)::numeric(12,3),
    true
  from product_names;

  with product_rows as (
    select product.*, row_number() over (order by sku) as ord
    from public.floworder_products product where organization_id = target_organization_id
  ), balances as (
    insert into public.floworder_inventory_balances (organization_id, product_id, on_hand, reserved)
    select target_organization_id, product.id, (24 + ((product.ord * 13) % 92))::numeric, 0
    from product_rows product
    returning product_id, on_hand
  )
  insert into public.floworder_inventory_transactions (
    organization_id, product_id, transaction_type, quantity_delta, balance_after, reason
  )
  select target_organization_id, product_id, 'opening', on_hand, on_hand, '沙盒期初庫存'
  from balances;

  with strategic_customers as (
    select customer.id, row_number() over (order by customer.code) as ord
    from public.floworder_customers customer
    join public.floworder_customer_tiers tier on tier.id = customer.tier_id
    where customer.organization_id = target_organization_id and tier.code in ('GOLD','STRATEGIC')
    order by customer.code limit 8
  ), featured_products as (
    select id, standard_price, row_number() over (order by sku) as ord
    from public.floworder_products where organization_id = target_organization_id
    order by sku limit 12
  )
  insert into public.floworder_customer_prices (
    organization_id, customer_id, product_id, unit_price, discount_percent, valid_from
  )
  select target_organization_id, customer.id, product.id,
    round(product.standard_price * (0.91 - (customer.ord % 3) * 0.01), 2), 0, current_date - 90
  from strategic_customers customer
  cross join featured_products product
  where (customer.ord + product.ord) % 3 = 0;

  with message_seed(customer_ord, sender_name, raw_text, message_status, age_hours) as (
    values
      (1, '陳小姐', '牛五花15箱，雞腿排8箱，星期五送新營', 'unread', 0),
      (2, '黃經理', '澳洲牛腱 6 箱，下週一送飯店中央廚房', 'unread', 1),
      (3, '許主廚', '跟上次一樣的鮭魚跟干貝，這週五到', 'processing', 2),
      (4, '謝採購', '去骨雞腿排 20 箱，雞胸 12 箱，請報專案價', 'read', 5),
      (5, '郭先生', '豬肋排十箱、排骨酥六箱，明天下午送', 'converted', 18),
      (6, '周經理', '鮭魚菲力 8 箱，白蝦 5 箱，月底結帳', 'converted', 28),
      (7, '鄭店長', '青花菜 6 箱、玉米筍 4 箱、毛豆仁 3 箱', 'archived', 50),
      (8, '林先生', '伊比利梅花豬 4 箱，週三上午到貨', 'converted', 72),
      (9, '吳小姐', '唐揚雞 15 箱，薯條 10 箱，活動用', 'converted', 96),
      (10, '蔡主任', '牛肋條 8 箱、牛筋 3 箱，送原地址', 'converted', 120),
      (11, '陳小姐', '虱目魚肚 12 箱，虱目魚柳 8 箱', 'converted', 144),
      (12, '許主廚', '花枝丸 5 箱，墨魚香腸 5 箱，週末前到', 'converted', 168),
      (13, '謝採購', '松阪豬 7 箱，梅花豬 10 箱', 'archived', 220),
      (14, '郭先生', '雞翅小腿 12 箱、二節翅 6 箱', 'converted', 260),
      (15, '周經理', '鱈魚切片 8 箱，鯖魚片 8 箱', 'converted', 300),
      (16, '鄭店長', '原味香腸 6 箱、德式香腸 4 箱', 'converted', 350),
      (17, '林先生', '舒肥雞胸 10 箱，下週團膳使用', 'converted', 400),
      (18, '黃經理', '牛小排 3 箱、骰子牛 5 箱，送宴會廳', 'converted', 480)
  ), customers as (
    select id, row_number() over (order by code) as ord
    from public.floworder_customers where organization_id = target_organization_id
  )
  insert into public.floworder_messages (
    organization_id, customer_id, sender_name, source, raw_text, fingerprint,
    status, read_at, processed_at, archived_at, created_at
  )
  select
    target_organization_id, customer.id, seed.sender_name, 'line', seed.raw_text,
    encode(extensions.digest(customer.id::text || ':' || seed.raw_text, 'sha256'), 'hex'),
    seed.message_status,
    case when seed.message_status <> 'unread' then now() - make_interval(hours => seed.age_hours) + interval '5 minutes' end,
    case when seed.message_status in ('converted','archived') then now() - make_interval(hours => seed.age_hours) + interval '12 minutes' end,
    case when seed.message_status = 'archived' then now() - make_interval(hours => seed.age_hours) + interval '1 hour' end,
    now() - make_interval(hours => seed.age_hours)
  from message_seed seed join customers customer on customer.ord = seed.customer_ord;

  with parsed_messages as (
    select message.id, message.raw_text, row_number() over (order by message.created_at) as ord
    from public.floworder_messages message
    where message.organization_id = target_organization_id and message.status in ('converted','archived')
  )
  insert into public.floworder_ai_parses (
    organization_id, message_id, provider, model, status, confidence,
    structured_result, final_result, duration_ms, parsed_at, reviewed_at
  )
  select target_organization_id, message.id, 'historical_import', 'not-applicable', 'needs_review',
    null,
    jsonb_build_object('sourceText', message.raw_text, 'importedHistory', true),
    jsonb_build_object('reviewed', true, 'importedHistory', true),
    620 + message.ord * 31, now() - make_interval(hours => message.ord * 12),
    now() - make_interval(hours => message.ord * 12) + interval '4 minutes'
  from parsed_messages message;

  with order_source as materialized (
    select
      extensions.gen_random_uuid() as id,
      customer.id as customer_id,
      customer.assigned_sales_account_id as sales_account_id,
      product.id as product_id,
      product.sku,
      product.name as product_name,
      product.specification,
      product.unit,
      product.standard_price,
      customer.ord,
      (1 + (customer.ord % 4))::numeric as quantity,
      case when customer.ord <= 14 then 'completed' else 'shipped' end as order_status
    from (
      select c.*, row_number() over (order by c.code) as ord
      from public.floworder_customers c where c.organization_id = target_organization_id
      order by c.code limit 18
    ) customer
    join (
      select p.*, row_number() over (order by p.sku) as ord
      from public.floworder_products p where p.organization_id = target_organization_id
    ) product on product.ord = customer.ord
  ), inserted_orders as (
    insert into public.floworder_orders (
      id, organization_id, order_number, customer_id, sales_account_id, status,
      payment_status, fulfillment_status, delivery_date, delivery_address,
      subtotal, discount_total, total, confirmed_at, created_at
    )
    select source.id, target_organization_id,
      'FO-' || to_char(current_date - source.ord, 'YYYYMM') || '-' || lpad((900000 + source.ord)::text, 6, '0'),
      source.customer_id, source.sales_account_id, source.order_status,
      case when source.ord % 4 = 0 then 'unpaid' else 'paid' end,
      case when source.order_status = 'completed' then 'fulfilled' else 'shipped' end,
      current_date - source.ord + 2,
      address.city || address.district || address.address_line,
      round(source.quantity * source.standard_price, 2), 0,
      round(source.quantity * source.standard_price, 2),
      now() - make_interval(days => source.ord), now() - make_interval(days => source.ord)
    from order_source source
    join lateral (
      select * from public.floworder_customer_addresses a
      where a.organization_id = target_organization_id and a.customer_id = source.customer_id and a.is_default
      limit 1
    ) address on true
    returning id
  )
  insert into public.floworder_order_items (
    organization_id, order_id, product_id, sku, product_name, specification,
    unit, quantity, unit_price, discount_percent, line_subtotal, line_total
  )
  select target_organization_id, source.id, source.product_id, source.sku,
    source.product_name, source.specification, source.unit, source.quantity,
    source.standard_price, 0, round(source.quantity * source.standard_price, 2),
    round(source.quantity * source.standard_price, 2)
  from order_source source join inserted_orders inserted on inserted.id = source.id;

  update public.floworder_inventory_balances balance
  set on_hand = balance.on_hand - sold.quantity, version = balance.version + 1, updated_at = now()
  from (
    select item.product_id, sum(item.quantity) as quantity
    from public.floworder_order_items item
    where item.organization_id = target_organization_id
    group by item.product_id
  ) sold
  where balance.organization_id = target_organization_id and balance.product_id = sold.product_id;

  insert into public.floworder_inventory_transactions (
    organization_id, product_id, order_id, transaction_type, quantity_delta,
    balance_after, reason, created_at
  )
  select target_organization_id, item.product_id, item.order_id, 'order_confirmed',
    -item.quantity, balance.on_hand, '歷史訂單 ' || orders.order_number,
    orders.confirmed_at
  from public.floworder_order_items item
  join public.floworder_orders orders on orders.id = item.order_id and orders.organization_id = item.organization_id
  join public.floworder_inventory_balances balance on balance.product_id = item.product_id and balance.organization_id = item.organization_id
  where item.organization_id = target_organization_id;

  insert into public.audit_logs (organization_id, action, target_type, target_id, metadata, created_at)
  select target_organization_id, 'floworder.order.seeded', 'order', orders.id::text,
    jsonb_build_object('order_number', orders.order_number, 'demo_seed', true), orders.created_at
  from public.floworder_orders orders where orders.organization_id = target_organization_id;
end;
$$;

revoke all on function private.seed_floworder_tenant(uuid) from public, anon, authenticated;
grant execute on function private.seed_floworder_tenant(uuid) to service_role;

create or replace function public.floworder_create_demo_sandbox(
  requested_token_hash text,
  ttl_minutes integer default 240
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  sandbox_id uuid := extensions.gen_random_uuid();
  organization_id uuid := extensions.gen_random_uuid();
  expires_at timestamptz;
begin
  if requested_token_hash !~ '^[a-f0-9]{64}$' then
    raise exception using errcode = '22023', message = 'INVALID_SANDBOX_TOKEN_HASH';
  end if;
  ttl_minutes := greatest(15, least(coalesce(ttl_minutes, 240), 1440));
  expires_at := now() + make_interval(mins => ttl_minutes);

  insert into public.organizations (id, name, slug)
  values (
    organization_id,
    '海港食品有限公司｜體驗工作區',
    'floworder-demo-' || left(replace(organization_id::text, '-', ''), 16)
  );
  perform private.seed_floworder_tenant(organization_id);
  insert into public.floworder_demo_sandboxes (id, organization_id, token_hash, expires_at)
  values (sandbox_id, organization_id, requested_token_hash, expires_at);
  insert into public.audit_logs (organization_id, action, target_type, target_id, metadata)
  values (organization_id, 'floworder.sandbox.created', 'sandbox', sandbox_id::text,
    jsonb_build_object('expires_at', expires_at));

  return jsonb_build_object(
    'sandboxId', sandbox_id,
    'organizationId', organization_id,
    'organizationName', '海港食品有限公司',
    'expiresAt', expires_at
  );
end;
$$;

create or replace function public.floworder_cleanup_expired_sandboxes()
returns integer
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  deleted_count integer;
begin
  with deleted as (
    delete from public.organizations organization
    using public.floworder_demo_sandboxes sandbox
    where sandbox.organization_id = organization.id and sandbox.expires_at < now()
    returning organization.id
  )
  select count(*)::integer into deleted_count from deleted;
  return deleted_count;
end;
$$;

revoke all on function public.floworder_create_demo_sandbox(text, integer) from public, anon, authenticated;
revoke all on function public.floworder_cleanup_expired_sandboxes() from public, anon, authenticated;
grant execute on function public.floworder_create_demo_sandbox(text, integer) to service_role;
grant execute on function public.floworder_cleanup_expired_sandboxes() to service_role;

commit;
