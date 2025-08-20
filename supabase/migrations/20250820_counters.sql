create table if not exists public.counters (
  key text primary key,
  value bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.counters enable row level security;

-- No anon writes; the server will use the service role (bypasses RLS).
create policy "select_counters" on public.counters
  for select to anon using (true);

-- Atomic increment function (security definer runs with table owner privileges)
create or replace function public.bump_counter(name text)
returns bigint
language plpgsql
security definer
as $$
declare new_value bigint;
begin
  insert into public.counters as c (key, value)
  values (name, 1)
  on conflict (key) do update set value = c.value + 1, updated_at = now()
  returning c.value into new_value;
  return new_value;
end;
$$;
