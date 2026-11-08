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
| `er_appointments` | One consultation: date, time, service, status, notes, Meet link, payment id, questionnaire answers | `lead_id` → `er_leads` |
| `er_slot_holds` | A slot kept for 15 minutes while a payment is open | – |
| `er_todos` | The admin dashboard to-do list, each on an India date | – |
| `er_hidden_slots` | Start times the admin hid from the website | – |

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
