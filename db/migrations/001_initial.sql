-- Eat Rrite database setup. This one file builds the whole database: run it once on an empty
-- database, in the Neon SQL Editor or with: bun run db:migrate db/migrations/001_initial.sql
--
-- Before running: turn on Neon Auth (Neon Console → Auth → Enable Auth), so the
-- neon_auth."user" table exists. er_profiles points at it.
--
-- Rules for this file: every table starts with er_, has created_at (and updated_at when
-- rows change), uses foreign keys for real links, and no extra indexes in V1.

begin;

-- Keeps updated_at current on every UPDATE. One function, used by every table below.
create or replace function er_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Admin profile. Its id is the Neon Auth user id, so a profile always belongs to one sign-in.
create table er_profiles (
  id uuid primary key references neon_auth."user"(id) on delete cascade,
  name text not null,
  email text not null,
  mobile text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Booking rules and admin preferences. Exactly one row (id is always true).
create table er_settings (
  id boolean primary key default true check (id),
  meeting_minutes integer not null default 30 check (meeting_minutes > 0),
  prep_minutes integer not null default 15 check (prep_minutes >= 0),
  start_step_minutes integer not null default 15 check (start_step_minutes > 0),
  hold_minutes integer not null default 15 check (hold_minutes > 0),
  booking_days_ahead integer not null default 30 check (booking_days_ahead > 0),
  fee_rupees integer not null default 800 check (fee_rupees > 0),
  email_reminders boolean not null default true,
  sms_reminders boolean not null default false,
  appointment_emails boolean not null default true,
  marketing_emails boolean not null default false,
  desktop_notifications boolean not null default true,
  weekly_digest boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Working windows. A weekday with no rows is closed.
create table er_schedule_slots (
  id uuid primary key default gen_random_uuid(),
  weekday text not null
    check (weekday in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

-- Services a booking can choose, in display order.
create table er_services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The questionnaire, in display order. Answers are saved on the appointment by key.
create table er_questions (
  key text primary key,
  label text not null,
  type text not null check (type in ('text', 'number', 'radio', 'checkbox', 'checkbox-groups', 'textarea')),
  required boolean not null default true,
  options jsonb,
  groups jsonb,
  min_value integer,
  max_value integer,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- People who booked on the website or were added by the admin. Age and gender come later.
create table er_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  age integer check (age between 1 and 120),
  gender text check (gender in ('Female', 'Male')),
  profession text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One consultation. Deleting a lead deletes their appointments.
-- service keeps the name chosen at booking, so renaming a service never changes old bookings.
-- questionnaire is a list of answers: [{ "key": "<er_questions.key>", "answer": "..." | ["..."] }].
-- payment_id is unique, so one Razorpay payment can never create two appointments.
-- paid_at is when the payment was confirmed; reminders_sent lists the questionnaire reminders
-- (hours after payment) already emailed.
create table er_appointments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references er_leads(id) on delete cascade,
  date date not null,
  time time not null,
  service text not null,
  status text not null default 'upcoming'
    check (status in ('upcoming', 'completed', 'not-attended', 'cancelled')),
  notes text,
  meet_link text,
  payment_id text unique,
  paid_at timestamptz,
  -- The ₹800 fee: 'paid' (website checkout, or marked paid by the admin), 'due' (an admin booking
  -- holding the slot before payment) or 'refunded' (paid, then given back, usually after a cancel).
  payment_status text not null default 'due'
    constraint er_appointments_payment_status_check check (payment_status in ('paid', 'due', 'refunded')),
  reminders_sent integer[] not null default '{}',
  questionnaire jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- A slot kept for a customer while their payment is open. Ignored once expires_at has passed.
-- order_id (the Razorpay order) and booking (the customer's details) let the webhook finish a
-- paid booking even when the customer closed the tab before the page confirmed it.
create table er_slot_holds (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time time not null,
  expires_at timestamptz not null,
  order_id text unique,
  booking jsonb,
  created_at timestamptz not null default now()
);

-- Single slots the admin hides from the website.
create table er_hidden_slots (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time time not null,
  created_at timestamptz not null default now(),
  unique (date, time)
);

-- The admin dashboard to-do list. date is the day (India time) a to-do belongs to.
create table er_todos (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  done boolean not null default false,
  date date not null default (now() at time zone 'Asia/Kolkata')::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger er_profiles_updated_at before update on er_profiles for each row execute function er_set_updated_at();
create trigger er_settings_updated_at before update on er_settings for each row execute function er_set_updated_at();
create trigger er_schedule_slots_updated_at before update on er_schedule_slots for each row execute function er_set_updated_at();
create trigger er_services_updated_at before update on er_services for each row execute function er_set_updated_at();
create trigger er_questions_updated_at before update on er_questions for each row execute function er_set_updated_at();
create trigger er_leads_updated_at before update on er_leads for each row execute function er_set_updated_at();
create trigger er_appointments_updated_at before update on er_appointments for each row execute function er_set_updated_at();
create trigger er_todos_updated_at before update on er_todos for each row execute function er_set_updated_at();

-- Starting data: booking rules, working hours, services (the footer's program names) and the questionnaire.

insert into er_settings (id) values (true);

insert into er_schedule_slots (weekday, start_time, end_time) values
  ('monday', '11:30', '14:00'),
  ('monday', '15:30', '17:30'),
  ('monday', '20:30', '21:30'),
  ('tuesday', '11:30', '14:00'),
  ('tuesday', '15:30', '17:30'),
  ('tuesday', '20:30', '21:30'),
  ('wednesday', '11:30', '14:00'),
  ('wednesday', '15:30', '17:30'),
  ('wednesday', '20:30', '21:30'),
  ('thursday', '11:30', '14:00'),
  ('thursday', '15:30', '17:30'),
  ('thursday', '20:30', '21:30'),
  ('saturday', '11:30', '14:30'),
  ('sunday', '11:30', '13:00');

insert into er_services (name, position) values
  ('Complete Weight & Lifestyle Management', 1),
  ('Diabetes Management & Reversal', 2),
  ('Gut Health', 3),
  ('Female Hormone Health', 4);

insert into er_questions (key, label, type, required, options, groups, min_value, max_value, position) values
  ('name', 'Name', 'text', true, null, null, null, null, 1),
  ('age', 'Age', 'number', true, null, null, 13, 90, 2),
  ('gender', 'Gender', 'radio', true, '["Female","Male"]'::jsonb, null, null, null, 3),
  ('primary_goal', 'What is the primary change you want to achieve?', 'radio', true, '["Lose stubborn weight and reduce belly fat","Understand and manage hormonal / perimenopausal changes","Improve blood sugar / insulin resistance / diabetes","Improve fatty liver / metabolic health","Improve digestion, bloating, acidity or gut health","Improve energy, sleep and recovery","Reduce inflammation, puffiness and feeling of heaviness","Address multiple health concerns together"]'::jsonb, null, null, null, 4),
  ('current_symptoms', 'Which of these are you experiencing currently?', 'checkbox-groups', true, null, '{"Mind • Mood • Sleep":["Brain fog or difficulty concentrating","Mood swings, irritability or feeling emotionally overwhelmed","Poor sleep / frequent waking / waking up unrefreshed"],"Face • Skin • Hair":["Puffy face or bags under the eyes","Noticeable changes in skin or hair"],"Energy • Appetite • Weight":["Fatigue despite a full night''s sleep","Energy crash or sleepiness after meals","Increased hunger, cravings or difficulty feeling satisfied","Unexplained weight gain / difficulty losing weight"],"Abdomen • Digestion":["Increasing belly fat / waistline","Bloating, acidity, gas or indigestion"],"Blood Sugar • Metabolic Health":["Blood sugar fluctuations / insulin resistance / diabetes"],"Fluid Balance • Inflammation":["Puffy hands, feet or face, especially after waking","Feeling persistently heavy, swollen or inflamed"]}'::jsonb, null, null, 5),
  ('symptom_duration', 'How long have you been dealing with these concerns?', 'radio', true, '["Less than 3 months","3–6 months","6–12 months","1–3 years","More than 3 years"]'::jsonb, null, null, null, 6),
  ('attempted_solutions', 'What have you already tried?', 'checkbox', true, '["Diet plans","Intermittent fasting","Calorie restriction","Gym / exercise","Yoga","Supplements","Online programs / apps","Guidance from health professionals","Multiple approaches, but the results did not last"]'::jsonb, null, null, null, 7),
  ('readiness_level', 'How ready are you to make your health a priority?', 'radio', true, '["I am ready to take action and follow through consistently.","I am ready to change, but I need the right structure and accountability.","I am ready to stop experimenting and follow a personalised approach."]'::jsonb, null, null, null, 8),
  ('investment_readiness', 'If we determine that a personalised Eat Rrite program is the right fit for you, are you prepared to make the necessary time, effort and financial investment to follow through?', 'radio', true, '["Yes. I am ready to invest in getting this right.","Yes. I understand that meaningful health transformation requires a financial, time and personal commitment.","Yes. If I see that the approach is right for me, I am prepared to commit to it."]'::jsonb, null, null, null, 9);


commit;
