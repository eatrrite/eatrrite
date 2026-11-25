# Eat Rrite

Next.js site and admin for www.eatrrite.com. Plan: `docs/tasks.md`. Rules: `docs/RULES.md`. Database: `docs/database.md`. Site copy (Cosmic CMS): `docs/cosmic.md`.

## Setup

1. `bun install`
2. Copy `.env.example` to `.env.local` and fill it in (see `docs/requirements.md`, Environment).
3. In Neon, turn on Neon Auth, then set up the database with `bun run db:migrate` (one file, `db/migrations/001_initial.sql`, builds everything).
4. Add the Cosmic keys (`COSMIC_*`, see `docs/cosmic.md`). The content is already in Cosmic; without the keys the site shows the JSON copy.
5. `bun run dev`, then sign up once at `/admin/signup` with an email listed in `ADMIN_EMAILS`.

## Test a booking (Razorpay test mode)

1. Open `/book`, fill the form, tick the consent box, pick a slot, press Pay.
2. Pay with a Razorpay test card, for example Visa `4100 2800 0000 1007`, any future expiry, any CVV, any 4 to 10 digit OTP.
3. You land on `/appointment-confirmed`. Answer the questionnaire to get the Meet link and the emails.

Test payments move no money.

## Folders

| Path | Holds |
| --- | --- |
| `app/(site)/` | Public pages |
| `app/admin/` | Admin login, signup and panel |
| `app/api/` | Slots, booking, payment verify, Razorpay webhook, reminder cron, Cosmic webhook |
| `features/` | `appointment/`, `auth/`, `admin/`, `cms/` (Cosmic): everything one feature needs |
| `components/` | Page parts, layout, shared parts, shadcn `ui/` |
| `constants/` | Brand, routes, WhatsApp links; page copy JSON (imported into Cosmic, now the fallback) |
| `config/` | Server environment, redirects |
| `db/migrations/` | SQL for Neon, numbered |
| `docs/` | Brief, requirements, tasks, rules |
