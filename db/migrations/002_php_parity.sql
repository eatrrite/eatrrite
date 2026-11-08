-- 002: what the PHP site had that 001 left out.
-- Run once: bun run db:migrate db/migrations/002_php_parity.sql
begin;

-- Single slots the admin hides from the website (PHP disabled_slots).
create table er_hidden_slots (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time time not null,
  created_at timestamptz not null default now(),
  unique (date, time)
);

-- The Razorpay order and the customer's details are kept with the hold, so the webhook can
-- finish a paid booking even when the customer closed the tab before the page confirmed it.
alter table er_slot_holds
  add column order_id text unique,
  add column booking jsonb;

-- When the payment was confirmed, and which questionnaire reminders (hours after payment) were sent.
alter table er_appointments
  add column paid_at timestamptz,
  add column reminders_sent integer[] not null default '{}';
update er_appointments set paid_at = created_at where payment_id is not null;

-- The day a to-do belongs to (India date), so the dashboard can show one day's list.
alter table er_todos
  add column date date not null default (now() at time zone 'Asia/Kolkata')::date;
update er_todos set date = (created_at at time zone 'Asia/Kolkata')::date;

commit;
