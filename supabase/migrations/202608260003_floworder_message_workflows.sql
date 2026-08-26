begin;

create or replace function public.floworder_create_message(
  target_organization_id uuid,
  target_customer_id uuid,
  actor_user_id uuid,
  sender_display_name text,
  message_source text,
  message_text text,
  message_fingerprint text,
  request_idempotency_key text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  message_id uuid := extensions.gen_random_uuid();
  cached_response jsonb;
begin
  select response into cached_response
  from public.floworder_idempotency_keys
  where organization_id = target_organization_id
    and idempotency_key = request_idempotency_key
    and operation = 'create_message';
  if cached_response is not null then return cached_response; end if;

  if not exists (
    select 1 from public.floworder_customers customer
    where customer.id = target_customer_id
      and customer.organization_id = target_organization_id
      and customer.active
  ) then
    raise exception using errcode = 'P0002', message = 'CUSTOMER_NOT_FOUND';
  end if;

  insert into public.floworder_messages (
    id, organization_id, customer_id, sender_user_id, sender_name,
    source, raw_text, fingerprint
  ) values (
    message_id, target_organization_id, target_customer_id, actor_user_id,
    sender_display_name, message_source, message_text, message_fingerprint
  );
  insert into public.audit_logs (
    organization_id, actor_user_id, action, target_type, target_id, metadata
  ) values (
    target_organization_id, actor_user_id, 'floworder.message.created', 'message',
    message_id::text, jsonb_build_object('customer_id', target_customer_id, 'source', message_source)
  );
  cached_response := jsonb_build_object('messageId', message_id, 'status', 'unread');
  insert into public.floworder_idempotency_keys (organization_id, idempotency_key, operation, response)
  values (target_organization_id, request_idempotency_key, 'create_message', cached_response);
  return cached_response;
exception
  when unique_violation then
    if exists (
      select 1 from public.floworder_idempotency_keys
      where organization_id = target_organization_id
        and idempotency_key = request_idempotency_key
        and operation = 'create_message'
    ) then
      select response into cached_response from public.floworder_idempotency_keys
      where organization_id = target_organization_id
        and idempotency_key = request_idempotency_key
        and operation = 'create_message';
      return cached_response;
    end if;
    raise exception using errcode = '23505', message = 'DUPLICATE_MESSAGE';
end;
$$;

create or replace function public.floworder_record_parse(
  target_organization_id uuid,
  target_message_id uuid,
  actor_user_id uuid,
  parser_provider text,
  parser_model text,
  parser_status text,
  parser_confidence numeric,
  parser_result jsonb,
  parser_error_code text,
  parser_duration_ms integer
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  parse_id uuid := extensions.gen_random_uuid();
begin
  if not exists (
    select 1 from public.floworder_messages message
    where message.id = target_message_id and message.organization_id = target_organization_id
  ) then
    raise exception using errcode = 'P0002', message = 'MESSAGE_NOT_FOUND';
  end if;
  insert into public.floworder_ai_parses (
    id, organization_id, message_id, provider, model, status, confidence,
    structured_result, error_code, duration_ms
  ) values (
    parse_id, target_organization_id, target_message_id, parser_provider,
    parser_model, parser_status, parser_confidence, parser_result,
    parser_error_code, parser_duration_ms
  );
  update public.floworder_messages
  set status = case when parser_status in ('succeeded','needs_review') then 'processing' else status end,
      read_at = coalesce(read_at, now()),
      read_by = coalesce(read_by, actor_user_id)
  where id = target_message_id and organization_id = target_organization_id;
  insert into public.audit_logs (
    organization_id, actor_user_id, action, target_type, target_id, metadata
  ) values (
    target_organization_id, actor_user_id, 'floworder.message.parsed', 'message',
    target_message_id::text,
    jsonb_build_object('parse_id', parse_id, 'provider', parser_provider, 'model', parser_model,
      'status', parser_status, 'confidence', parser_confidence)
  );
  return jsonb_build_object('parseId', parse_id, 'status', parser_status);
end;
$$;

revoke all on function public.floworder_create_message(uuid, uuid, uuid, text, text, text, text, text)
  from public, anon, authenticated;
revoke all on function public.floworder_record_parse(uuid, uuid, uuid, text, text, text, numeric, jsonb, text, integer)
  from public, anon, authenticated;
grant execute on function public.floworder_create_message(uuid, uuid, uuid, text, text, text, text, text)
  to service_role;
grant execute on function public.floworder_record_parse(uuid, uuid, uuid, text, text, text, numeric, jsonb, text, integer)
  to service_role;

commit;
