-- Eat Rrite: first migration. Run once in the Neon SQL Editor.
-- Needs Neon Auth turned on first, so the neon_auth."user" table exists.
-- Check its id type with: \d neon_auth."user"   (this file assumes uuid).

-- Keeps updated_at current on every UPDATE.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- One profile per signed-in user. Used for admin access in Phase 5.
create table profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references neon_auth."user"(id) on delete cascade,
  email text not null,
  phone text,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on profiles
for each row execute function set_updated_at();

-- One row per booking. Guests book without an account, so the contact
-- details live here. A 'pending' row holds the slot while payment is open.
create table appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  slot_start timestamptz not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'finalizing', 'completed', 'failed', 'cancelled')),
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  questionnaire jsonb,
  meet_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger appointments_set_updated_at
before update on appointments
for each row execute function set_updated_at();
