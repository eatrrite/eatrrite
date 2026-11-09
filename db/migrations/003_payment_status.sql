-- 003: payment_done on appointments, so the admin can tell a paid booking from one whose fee is
-- still due (an appointment added from the admin to hold a slot before the lead pays).
-- Run once on a database set up before this column was in 001:
--   bun run db:migrate db/migrations/003_payment_status.sql
-- Safe to run again: the column is added only if missing, and only then are old rows marked paid.
-- 004 later turns payment_done into payment_status; a database that already has payment_status
-- (set up from 001 after that change) skips this file.
begin;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'er_appointments' and column_name in ('payment_done', 'payment_status')
  ) then
    alter table er_appointments add column payment_done boolean not null default false;
    -- Every booking made before this column existed counts as paid.
    update er_appointments set payment_done = true;
  end if;
end $$;

commit;
