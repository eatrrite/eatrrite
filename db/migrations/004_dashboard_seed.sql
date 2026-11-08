-- 004: Dummy leads + appointments for the admin dashboard chart.
-- Past 7 India days, ~10–30 appointments per day (cancelled ones are not counted on the chart).
-- Run once: bun run db:migrate db/migrations/004_dashboard_seed.sql
begin;

-- Fixed sample people. Reused across the week.
with new_leads as (
  insert into er_leads (name, phone, email, age, gender, profession, address, created_at, updated_at)
  values
    ('Sara Ahmed', '9876510001', 'sara.ahmed@example.com', 29, 'Female', 'Designer', 'Hyderabad', now() - interval '10 days', now() - interval '2 days'),
    ('Rohan Kapoor', '9876510002', 'rohan.kapoor@example.com', 35, 'Male', 'Banker', 'Mumbai', now() - interval '10 days', now() - interval '2 days'),
    ('Neha Patel', '9876510003', 'neha.patel@example.com', 31, 'Female', 'Consultant', 'Ahmedabad', now() - interval '9 days', now() - interval '1 day'),
    ('Ananya Reddy', '9876510004', 'ananya.reddy@example.com', 32, 'Female', 'Software engineer', 'Hyderabad', now() - interval '9 days', now() - interval '1 day'),
    ('Vikram Singh', '9876510005', 'vikram.singh@example.com', 41, 'Male', 'School teacher', 'Delhi', now() - interval '8 days', now() - interval '1 day'),
    ('Meera Iyer', '9876510006', 'meera.iyer@example.com', 28, 'Female', 'Architect', 'Dehradun', now() - interval '8 days', now()),
    ('Arjun Sharma', '9876510007', 'arjun.sharma@example.com', 38, 'Male', 'Entrepreneur', 'Pune', now() - interval '7 days', now()),
    ('Priya Sharma', '9876510008', 'priya.sharma@example.com', 26, 'Female', 'Student', 'Jaipur', now() - interval '7 days', now()),
    ('Kabir Khan', '9876510009', 'kabir.khan@example.com', 45, 'Male', 'Civil engineer', 'Lucknow', now() - interval '6 days', now()),
    ('Isha Nair', '9876510010', 'isha.nair@example.com', 33, 'Female', 'Doctor', 'Kochi', now() - interval '6 days', now()),
    ('Dev Malhotra', '9876510011', 'dev.malhotra@example.com', 52, 'Male', 'Retired', 'Chandigarh', now() - interval '5 days', now()),
    ('Leena Joshi', '9876510012', 'leena.joshi@example.com', 37, 'Female', 'HR manager', 'Indore', now() - interval '5 days', now()),
    ('Aisha Khan', '9876510013', 'aisha.khan@example.com', 30, 'Female', 'Marketing', 'Bengaluru', now() - interval '4 days', now()),
    ('Rahul Mehta', '9876510014', 'rahul.mehta@example.com', 34, 'Male', 'Product manager', 'Bengaluru', now() - interval '4 days', now()),
    ('Sneha Desai', '9876510015', 'sneha.desai@example.com', 27, 'Female', 'Nutritionist', 'Surat', now() - interval '3 days', now()),
    ('Imran Ali', '9876510016', 'imran.ali@example.com', 39, 'Male', 'Chef', 'Hyderabad', now() - interval '3 days', now()),
    ('Kavya Rao', '9876510017', 'kavya.rao@example.com', 25, 'Female', 'Analyst', 'Chennai', now() - interval '2 days', now()),
    ('Nikhil Verma', '9876510018', 'nikhil.verma@example.com', 36, 'Male', 'Lawyer', 'Delhi', now() - interval '2 days', now()),
    ('Pooja Nair', '9876510019', 'pooja.nair@example.com', 42, 'Female', 'Homemaker', 'Trivandrum', now() - interval '1 day', now()),
    ('Siddharth Jain', '9876510020', 'sid.jain@example.com', 29, 'Male', 'Founder', 'Gurgaon', now() - interval '1 day', now())
  returning id
),
lead_list as (
  select id, row_number() over (order by id) as n from new_leads
),
-- day_offset 0 = today (IST), 1 = yesterday, … 6 = six days ago.
-- Counts stay between 10 and 30 so the 0–40 chart looks full.
day_plan (day_offset, apt_count) as (
  values
    (6, 14),
    (5, 22),
    (4, 18),
    (3, 27),
    (2, 12),
    (1, 25),
    (0, 19)
),
slots as (
  select
    ((now() at time zone 'Asia/Kolkata')::date - d.day_offset) as apt_date,
    d.day_offset,
    g.n as slot_n,
    d.apt_count
  from day_plan d
  cross join lateral generate_series(1, d.apt_count) as g(n)
)
insert into er_appointments (
  lead_id,
  date,
  time,
  service,
  status,
  notes,
  meet_link,
  payment_id,
  questionnaire,
  paid_at,
  created_at,
  updated_at
)
select
  l.id,
  s.apt_date,
  time '09:00' + ((s.slot_n - 1) * interval '20 minutes'),
  (array[
    'Complete Weight & Lifestyle Management',
    'Diabetes Management & Reversal',
    'Gut Health',
    'Female Hormone Health'
  ])[1 + ((s.slot_n + s.day_offset) % 4)],
  case
    when s.day_offset = 0 and s.slot_n % 5 = 0 then 'upcoming'
    when s.slot_n % 11 = 0 then 'not-attended'
    when s.slot_n % 17 = 0 then 'cancelled'
    else 'completed'
  end,
  case when s.slot_n % 7 = 0 then 'Seed data for dashboard chart' else null end,
  case
    when s.slot_n % 17 = 0 then null
    else 'https://meet.google.com/seed-' || substr(md5(s.apt_date::text || s.slot_n::text), 1, 3)
      || '-' || substr(md5(s.apt_date::text || s.slot_n::text), 4, 4)
      || '-' || substr(md5(s.apt_date::text || s.slot_n::text), 8, 3)
  end,
  'pay_seed_' || to_char(s.apt_date, 'YYYYMMDD') || '_' || lpad(s.slot_n::text, 2, '0'),
  '[]'::jsonb,
  case
    when s.slot_n % 17 = 0 then null
    else (s.apt_date + time '09:00' + ((s.slot_n - 1) * interval '20 minutes'))
      at time zone 'Asia/Kolkata'
  end,
  (s.apt_date + time '08:30' + ((s.slot_n - 1) * interval '12 minutes'))
    at time zone 'Asia/Kolkata',
  (s.apt_date + time '08:45' + ((s.slot_n - 1) * interval '12 minutes'))
    at time zone 'Asia/Kolkata'
from slots s
join lead_list l on l.n = 1 + ((s.slot_n + s.day_offset - 1) % 20);

commit;
