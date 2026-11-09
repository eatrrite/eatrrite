# Database and Auth (Neon)

Eat Rrite stores everything in one Neon Postgres database. Sign-in uses Neon's Managed Better Auth, so admin users live in the same database (`neon_auth."user"`).

## Setup (once)

1. In the Neon Console, open **Auth** and click **Enable Auth**. Copy the Auth URL from **Settings → Better Auth → Project Info**.
2. In `.env.local` (project root) set:
   - `DATABASE_URL`: the Neon connection string (already set)
   - `NEON_AUTH_BASE_URL`: the Auth URL from step 1
   - `NEON_AUTH_COOKIE_SECRET`: at least 32 characters (`openssl rand -base64 32`)
   - `ADMIN_EMAILS`: who may sign up and open the admin, comma separated (`marketing.eatrrite@gmail.com`)
3. Run `bun run db:migrate` once, from the project root. It sends `db/migrations/001_initial.sql`, the only setup file, to Neon as one transaction, so it either all runs or nothing is saved. It needs step 1 first, because `er_profiles` points at `neon_auth."user"`. (Pasting the file into the Neon SQL Editor can fail on the questionnaire insert, because the editor splits the file into separate statements.)
4. Start the app and open `/admin/signup`. Sign up with the admin email. The profile row is created on first sign-in.
5. Optional, for trying the admin only (never on the live database): `bun run db:migrate db/migrations/004_dashboard_seed.sql` adds 20 sample leads and about 100 appointments from three weeks ago to ten days ahead. Every one follows the booking rules, read from `er_schedule_slots` and `er_settings`: inside working hours, starts one 45-minute block apart, no overlaps, nothing on hidden slots or on top of real bookings. Their payment ids start with `pay_seed_`, and all are paid. Each is booked 1 to 5 days before its slot, never later than the moment the seed runs (a booking time is never in the future; the dashboard counts bookings up to today). Sample rows added before this fix may be dated in the future; run this once in the Neon SQL Editor to move them to now: `update er_appointments set created_at = least(created_at, now()), paid_at = least(paid_at, now()) where created_at > now() or paid_at > now();`
6. Only for a database set up before `payment_done` was added to `001_initial.sql`: `bun run db:migrate db/migrations/005_payment_status.sql` adds the column to `er_appointments` and marks every existing booking paid. Safe to run again. `payment_done` is true once the ₹800 fee is paid (website checkout, or marked paid in the admin) and false while it is due.

## Tables

All tables start with `er_`. Each has `created_at` and `updated_at`, and one trigger function (`er_set_updated_at`) keeps `updated_at` current. Foreign keys link the tables; there are no extra indexes in V1.

| Table | Holds | Links |
|---|---|---|
| `er_profiles` | Admin profile: name, email, mobile, address | `id` is the Neon Auth user id (`neon_auth."user"(id)`) |
| `er_settings` | One row: call length, prep buffer, start step, hold minutes, booking window, fee, admin notification toggles | – |
| `er_schedule_slots` | Working windows per weekday (a day with no rows is closed) | – |
| `er_services` | The services a booking can choose | – |
| `er_questions` | The questionnaire, in order | – |
| `er_leads` | People who booked or were added by the admin | – |
| `er_appointments` | One consultation: date, time, service, status, notes, Meet link, Razorpay payment id, `payment_done` (fee paid, or still due), `paid_at`, questionnaire answers | `lead_id` → `er_leads` |
| `er_slot_holds` | A slot kept for 15 minutes while a payment is open | – |
| `er_todos` | The admin dashboard to-do list, each on an India date | – |
| `er_hidden_slots` | Start times the admin hid from the website | – |

Payment: `payment_done` is true once the ₹800 fee is received: website checkout saves true (with the Razorpay `payment_id`); an appointment the admin adds starts as due (false) to hold the slot, and "Mark as paid" sets it true. `paid_at` is set when it becomes paid and cleared if it is set back to due. The dashboard's Revenue is paid, non-cancelled appointments × the fee, placed in the date range by `paid_at`; Due Payments counts unpaid, non-cancelled ones.

Questionnaire answers are stored on the appointment as JSON: `[{ "key": "primary_goal", "answer": "…" }, …]`. The key is the question's `key` in `er_questions`.

## How the code reads and writes

- `services/database.ts` gives one SQL client (`db()`), server only. Queries use tagged templates, never string-built SQL.
- **Admin:** the admin layout checks the session, loads everything from Neon on the server and fills the zustand store (an in-memory cache, no longer saved in the browser). Each change updates the store at once and is saved through a server action (`stores/saveOrRevert.ts`). A "Saving…" toast shows until Neon answers, then turns into the success message; if saving fails the change is undone and the same toast says why.
- **Public site:** slots, holds, payment confirmation and the questionnaire run on the server (`app/api/…` and server components), reading the settings, schedule, services and questions from Neon.
- **Auth:** `features/auth/` holds the Neon Auth server instance, the sign-in, sign-up and sign-out actions, the admin email check and the login and signup forms. `proxy.ts` sends anyone without a session from `/admin` to `/admin/login`; the admin layout also checks the email is in `ADMIN_EMAILS`.

## Phases

1. **Schema:** `db/migrations/001_initial.sql` with every table, trigger, foreign key and the starting rows (settings, PHP working hours, services, questionnaire).
2. **Auth:** Neon Auth in `features/auth/`, `/admin/login` and `/admin/signup`, the admin guard, sign-out, the profile row. The old front-end password is removed.
3. **Admin data:** leads, appointments, schedule, settings and to-dos read from and saved to Neon.
4. **Public booking:** slots, holds, payment confirmation, questionnaire and Meet link on Neon; the site's working hours, services and booking rules come from Neon.
