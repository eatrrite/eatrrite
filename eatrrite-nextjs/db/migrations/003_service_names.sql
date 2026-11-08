-- 003: booking dropdown names match the footer's program names (brief §5.1).
-- Old appointments keep the name chosen at booking.
-- Run once: bun run db:migrate db/migrations/003_service_names.sql
begin;

update er_services set name = 'Complete Weight & Lifestyle Management' where name = 'Nutrition for Weight & Lifestyle Management';
update er_services set name = 'Diabetes Management & Reversal' where name = 'Nutrition for Diabetes Management & Reversal';
update er_services set name = 'Gut Health' where name = 'Nutrition for Gut Health';
update er_services set name = 'Female Hormone Health' where name = 'Female Hormone Health Diet Program';

commit;
