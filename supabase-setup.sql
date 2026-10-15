-- Monkeying Around — Supabase setup
-- Custom password auth: passwords are checked inside the database (bcrypt via pgcrypto),
-- never in JavaScript. The public anon key can only READ sessions and call the
-- admin_* functions below — every write requires the correct username + password.

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  session_date date not null,
  type text not null check (type in ('Extended', 'Full Day')),
  time text not null,
  price text not null,
  url text not null,
  created_at timestamptz not null default now()
);

alter table public.sessions enable row level security;

-- Everyone (including logged-out visitors) can READ sessions.
create policy "sessions_public_read"
  on public.sessions for select
  to anon, authenticated
  using (true);

-- NOTE: there are deliberately NO insert/update/delete policies.
-- Direct writes through the API are blocked for everyone.
-- Writes only happen through the security definer functions below,
-- which verify the admin password first.

create extension if not exists pgcrypto;

-- Admin credentials (username -> bcrypt hash). No read policies = invisible to API.
create table public.admin_users (
  username text primary key,
  password_hash text not null
);

alter table public.admin_users enable row level security;

-- User: Monkey / Pass: m0nk3y1ng!
insert into public.admin_users (username, password_hash)
values ('monkey', extensions.crypt('m0nk3y1ng!', extensions.gen_salt('bf')));

-- Verify admin credentials. Returns true/false.
create or replace function public.verify_admin(p_username text, p_password text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  stored_hash text;
begin
  select password_hash into stored_hash
  from public.admin_users
  where username = lower(trim(p_username));

  if stored_hash is null then
    return false;
  end if;

  return stored_hash = extensions.crypt(p_password, stored_hash);
end;
$$;

-- Add or update a session. Pass p_id = null to insert, or an existing id to update.
create or replace function public.admin_save_session(
  p_username text,
  p_password text,
  p_id uuid,
  p_session_date date,
  p_type text,
  p_time text,
  p_price text,
  p_url text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if not public.verify_admin(p_username, p_password) then
    raise exception 'Invalid credentials';
  end if;

  if p_id is null then
    insert into public.sessions (session_date, type, time, price, url)
    values (p_session_date, p_type, p_time, p_price, p_url)
    returning id into new_id;
  else
    update public.sessions
    set session_date = p_session_date,
        type = p_type,
        time = p_time,
        price = p_price,
        url = p_url
    where id = p_id;
    new_id := p_id;
  end if;

  return new_id;
end;
$$;

-- Delete a session.
create or replace function public.admin_delete_session(
  p_username text,
  p_password text,
  p_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.verify_admin(p_username, p_password) then
    raise exception 'Invalid credentials';
  end if;

  delete from public.sessions where id = p_id;
end;
$$;

-- Seed the current October half-term 2026 sessions.
insert into public.sessions (session_date, type, time, price, url) values
  ('2026-10-19', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/06f1dee2-e73c-4237-923b-e73db4bff427'),
  ('2026-10-19', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/d3c04cb7-5916-4b2d-97e7-59536379c820'),
  ('2026-10-20', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/de21a744-aead-4bcf-987c-f4993c3471c9'),
  ('2026-10-20', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/8a8b4669-f485-415f-a4bf-2c1dfbcf9fe2'),
  ('2026-10-21', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/3b1d934f-b4d4-48c2-8efe-afdf9218b5e2'),
  ('2026-10-21', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/9ab5b2c6-d6e9-431f-b8f1-5f53e953332d'),
  ('2026-10-22', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/b8f2850c-070d-490a-bfcf-7f1dda296f18'),
  ('2026-10-22', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/1d4f5d65-c834-4243-855a-7228739fb63f'),
  ('2026-10-26', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/9dedfd5d-f7a3-4425-bec4-9a4fa40f53cf'),
  ('2026-10-26', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/04d03869-11e8-43fb-b2fd-7d01e943e60b'),
  ('2026-10-27', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/1d3530f4-c800-491b-92f5-4ac3de0a827b'),
  ('2026-10-27', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/dd16ece6-afc1-4892-8d62-f0e22184a971'),
  ('2026-10-28', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/8609102e-6e7c-4319-8414-7afab9f6517e'),
  ('2026-10-28', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/33156ffd-7ea4-4682-ba8c-bc03e58ec1cd'),
  ('2026-10-29', 'Extended', '8am - 5:30pm', '£37.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/c2bc747b-a2dd-4f1f-90da-ffe1111ca00d'),
  ('2026-10-29', 'Full Day', '9am - 4pm', '£29.50', 'https://bookaby.me/monkeying-around-ltd/whats-on/session/6f941076-d126-4fc8-9620-e097acad5965');
