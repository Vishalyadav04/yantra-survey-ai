-- Enable required extension for UUIDs
create extension if not exists pgcrypto;

-- Timestamp trigger function (idempotent)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Prefill entries table
create table if not exists public.survey_prefill_entries (
  id uuid primary key default gen_random_uuid(),
  survey_key text not null,
  identifier_type text not null check (identifier_type in ('aadhaar','phone')),
  identifier_value text not null,
  prefill jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint unique_identifier_per_survey unique (survey_key, identifier_type, identifier_value)
);

-- Enable RLS
alter table public.survey_prefill_entries enable row level security;

-- Strict policies: block direct access; edge functions will use service role
create policy "No direct select" on public.survey_prefill_entries for select using (false);
create policy "No direct insert" on public.survey_prefill_entries for insert with check (false);
create policy "No direct update" on public.survey_prefill_entries for update using (false);
create policy "No direct delete" on public.survey_prefill_entries for delete using (false);

-- Trigger for updated_at
create trigger set_survey_prefill_entries_updated_at
before update on public.survey_prefill_entries
for each row execute function public.update_updated_at_column();

-- Helpful indexes
create index if not exists idx_prefill_survey_key on public.survey_prefill_entries (survey_key);
create index if not exists idx_prefill_lookup on public.survey_prefill_entries (survey_key, identifier_type, identifier_value);
