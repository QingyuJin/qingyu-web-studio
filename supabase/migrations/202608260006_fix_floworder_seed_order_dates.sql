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
    'current_date - source.ord,',
    'current_date - source.ord::integer,'
  );
  corrected_definition := replace(
    corrected_definition,
    'current_date - source.ord + 2',
    'current_date - source.ord::integer + 2'
  );
  corrected_definition := replace(
    corrected_definition,
    'make_interval(days => source.ord)',
    'make_interval(days => source.ord::integer)'
  );

  if corrected_definition <> function_definition then
    execute corrected_definition;
  end if;
end;
$migration$;

commit;
