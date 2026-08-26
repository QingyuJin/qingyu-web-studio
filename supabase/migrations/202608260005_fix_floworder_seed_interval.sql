begin;

do $migration$
declare
  function_definition text;
  corrected_definition text;
begin
  select pg_get_functiondef('private.seed_floworder_tenant(uuid)'::regprocedure)
  into function_definition;

  corrected_definition := replace(
    function_definition,
    'make_interval(hours => message.ord * 12)',
    'make_interval(hours => (message.ord * 12)::integer)'
  );

  if corrected_definition <> function_definition then
    execute corrected_definition;
  end if;
end;
$migration$;

commit;
