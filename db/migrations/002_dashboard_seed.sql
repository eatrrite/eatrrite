-- 004: Sample leads and appointments for trying the admin (dashboard, calendar, lists).
-- Run once, on a database with 001: bun run db:migrate db/migrations/004_dashboard_seed.sql
--
-- Every appointment follows the booking rules (docs/appointment-rules.md), read from the
-- database itself, so the sample matches whatever the Schedule page says:
--   * only inside the weekly hours in er_schedule_slots (none on a closed day, Friday today);
--   * a start every block (call + prep, 45 minutes) from each window's opening time, so starts
--     sit on the 15-minute steps and no two blocks overlap;
--   * the last start is the call length before the window closes;
--   * never on a slot the admin hid (er_hidden_slots), never on top of a booking already there.
-- About three quarters of the possible slots are filled, from three weeks ago to ten days ahead.
-- Past ones are mostly completed (some not attended, a few cancelled); later ones are upcoming.
begin;

with new_leads as (
  insert into er_leads (name, phone, email, age, gender, profession, address, created_at, updated_at)
  values
    ('Sara Ahmed', '9876510001', 'sara.ahmed@example.com', 29, 'Female', 'Designer', 'Hyderabad', now() - interval '30 days', now() - interval '2 days'),
    ('Rohan Kapoor', '9876510002', 'rohan.kapoor@example.com', 35, 'Male', 'Banker', 'Mumbai', now() - interval '30 days', now() - interval '2 days'),
    ('Neha Patel', '9876510003', 'neha.patel@example.com', 31, 'Female', 'Consultant', 'Ahmedabad', now() - interval '29 days', now() - interval '1 day'),
    ('Ananya Reddy', '9876510004', 'ananya.reddy@example.com', 32, 'Female', 'Software engineer', 'Hyderabad', now() - interval '29 days', now() - interval '1 day'),
    ('Vikram Singh', '9876510005', 'vikram.singh@example.com', 41, 'Male', 'School teacher', 'Delhi', now() - interval '28 days', now() - interval '1 day'),
    ('Meera Iyer', '9876510006', 'meera.iyer@example.com', 28, 'Female', 'Architect', 'Dehradun', now() - interval '28 days', now()),
    ('Arjun Sharma', '9876510007', 'arjun.sharma@example.com', 38, 'Male', 'Entrepreneur', 'Pune', now() - interval '27 days', now()),
    ('Priya Sharma', '9876510008', 'priya.sharma@example.com', 26, 'Female', 'Student', 'Jaipur', now() - interval '27 days', now()),
    ('Kabir Khan', '9876510009', 'kabir.khan@example.com', 45, 'Male', 'Civil engineer', 'Lucknow', now() - interval '26 days', now()),
    ('Isha Nair', '9876510010', 'isha.nair@example.com', 33, 'Female', 'Doctor', 'Kochi', now() - interval '26 days', now()),
    ('Dev Malhotra', '9876510011', 'dev.malhotra@example.com', 52, 'Male', 'Retired', 'Chandigarh', now() - interval '25 days', now()),
    ('Leena Joshi', '9876510012', 'leena.joshi@example.com', 37, 'Female', 'HR manager', 'Indore', now() - interval '25 days', now()),
    ('Aisha Khan', '9876510013', 'aisha.khan@example.com', 30, 'Female', 'Marketing', 'Bengaluru', now() - interval '24 days', now()),
    ('Rahul Mehta', '9876510014', 'rahul.mehta@example.com', 34, 'Male', 'Product manager', 'Bengaluru', now() - interval '24 days', now()),
    ('Sneha Desai', '9876510015', 'sneha.desai@example.com', 27, 'Female', 'Nutritionist', 'Surat', now() - interval '23 days', now()),
    ('Imran Ali', '9876510016', 'imran.ali@example.com', 39, 'Male', 'Chef', 'Hyderabad', now() - interval '23 days', now()),
    ('Kavya Rao', '9876510017', 'kavya.rao@example.com', 25, 'Female', 'Analyst', 'Chennai', now() - interval '22 days', now()),
    ('Nikhil Verma', '9876510018', 'nikhil.verma@example.com', 36, 'Male', 'Lawyer', 'Delhi', now() - interval '22 days', now()),
    ('Pooja Nair', '9876510019', 'pooja.nair@example.com', 42, 'Female', 'Homemaker', 'Trivandrum', now() - interval '21 days', now()),
    ('Siddharth Jain', '9876510020', 'sid.jain@example.com', 29, 'Male', 'Founder', 'Gurgaon', now() - interval '21 days', now())
  returning id
),
lead_list as (
  select id, row_number() over (order by id) as n from new_leads
),
settings as (
  select meeting_minutes, prep_minutes, meeting_minutes + prep_minutes as block_minutes from er_settings where id
),
now_ist as (
  select (now() at time zone 'Asia/Kolkata') as at
),
days as (
  select ((select at from now_ist)::date + d) as day from generate_series(-21, 10) as d
),
-- Every rule-following start: from each window's opening, one block apart, up to the last start.
starts as (
  select dy.day, gs::time as start_time
  from days dy
  join er_schedule_slots w on w.weekday = to_char(dy.day, 'FMday')
  cross join settings s
  cross join lateral generate_series(
    dy.day + w.start_time,
    dy.day + w.end_time - make_interval(mins => s.meeting_minutes),
    make_interval(mins => s.block_minutes)
  ) as gs
),
picked as (
  select st.day, st.start_time, row_number() over (order by st.day, st.start_time) as k
  from starts st
  cross join settings s
  where abs(hashtext(st.day::text || st.start_time::text)) % 100 < 75
    and not exists (
      select 1 from er_hidden_slots h where h.date = st.day and h.time = st.start_time
    )
    and not exists (
      select 1 from er_appointments a
      where a.date = st.day and a.status <> 'cancelled'
        and a.time < st.start_time + make_interval(mins => s.block_minutes)
        and st.start_time < a.time + make_interval(mins => s.block_minutes)
    )
),
planned as (
  select
    p.*,
    case
      when p.k % 13 = 0 then 'cancelled'
      when p.day + p.start_time + make_interval(mins => s.meeting_minutes) > (select at from now_ist) then 'upcoming'
      when p.k % 9 = 0 then 'not-attended'
      else 'completed'
    end as status,
    -- Booked 1 to 5 days before the slot, but never later than now (a booking is never in the future).
    least((p.day - (1 + p.k % 5)::int) + time '10:00', (select at from now_ist)) as booked_at
  from picked p
  cross join settings s
)
insert into er_appointments (
  lead_id, date, time, service, status, notes, meet_link, payment_id, payment_done,
  questionnaire, paid_at, created_at, updated_at
)
select
  l.id,
  pl.day,
  pl.start_time,
  (array[
    'Complete Weight & Lifestyle Management',
    'Diabetes Management & Reversal',
    'Gut Health',
    'Female Hormone Health'
  ])[1 + (pl.k % 4)],
  pl.status,
  case when pl.k % 7 = 0 then 'Sample appointment' else null end,
  case
    when pl.status = 'cancelled' then null
    else 'https://meet.google.com/seed-' || substr(md5(pl.day::text || pl.start_time::text), 1, 3)
      || '-' || substr(md5(pl.day::text || pl.start_time::text), 4, 4)
      || '-' || substr(md5(pl.day::text || pl.start_time::text), 8, 3)
  end,
  'pay_seed_' || to_char(pl.day, 'YYYYMMDD') || '_' || to_char(pl.start_time, 'HH24MI'),
  true,
  '[]'::jsonb,
  case when pl.status = 'cancelled' then null else pl.booked_at at time zone 'Asia/Kolkata' end,
  pl.booked_at at time zone 'Asia/Kolkata',
  pl.booked_at at time zone 'Asia/Kolkata'
from planned pl
join lead_list l on l.n = 1 + (pl.k % 20);

commit;
