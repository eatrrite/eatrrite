-- 004: payment_done (true or false) becomes payment_status: 'paid', 'due' or 'refunded', so a
-- booking cancelled after paying can be marked refunded (and leaves the revenue).
-- Run once on a database that has payment_done (after 003):
--   bun run db:migrate db/migrations/004_payment_status_refunded.sql
-- Safe to run again: it does nothing once payment_status exists.
begin;

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'er_appointments' and column_name = 'payment_status'
  ) then
    alter table er_appointments add column payment_status text not null default 'due'
      constraint er_appointments_payment_status_check check (payment_status in ('paid', 'due', 'refunded'));
    -- Carry the old flag over: true was paid, false was due.
    if exists (
      select 1 from information_schema.columns
      where table_name = 'er_appointments' and column_name = 'payment_done'
    ) then
      update er_appointments set payment_status = case when payment_done then 'paid' else 'due' end;
      alter table er_appointments drop column payment_done;
    end if;
  end if;
end $$;

commit;
