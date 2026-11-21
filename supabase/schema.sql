-- 007 Tikinti Bazarı — Supabase schema for the contact form.
-- Run once in Supabase → SQL Editor. Then set SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY (server-only) in the hosting environment.

create table if not exists public.contact_messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  phone       text not null check (char_length(phone) between 9 and 20),
  message     text not null check (char_length(message) between 10 and 1000),
  handled     boolean not null default false
);

-- Row Level Security ON with no public policies: the table is NOT readable or
-- writable with the public anon key. Only the server (service role) inserts,
-- and the owner reads messages in Supabase → Table Editor.
alter table public.contact_messages enable row level security;
