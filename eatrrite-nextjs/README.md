# Eat Rrite Next.js

Next.js rebuild of www.eatrrite.com. The PHP site in the parent folder is the reference.
Plan: `../docs/tasks.md`. Rules: `../docs/RULES.md`.

## Setup

1. `bun install`
2. Copy `.env.example` to `.env.local` and fill it in (see `../docs/requirements.md`).
3. In Neon: turn on Neon Auth, then run `db/migrations/001_initial.sql` in the SQL Editor.
4. `bun run dev`

## Test a booking (Razorpay test mode)

1. Open `/appointment`, fill the form, pick a slot, press Pay.
2. Pay with a Razorpay test card, for example Visa `4100 2800 0000 1007`, any future expiry, any CVV.
3. On the mock bank page, enter any 4 to 10 digit OTP.
4. You land on `/appointment-confirmed`. Answer the questionnaire to create the Meet link.

Test payments move no money. Creating a Meet link adds a real event to the connected Google Calendar.

## Admin

Open `/admin`. Password for the UI preview: `eatrrite@1234`. The admin uses sample data stored in the browser until it is connected to Neon.

## Folders

| Path | Holds |
| --- | --- |
| `app/(site)/` | Pages |
| `app/api/` | Slots, booking, payment, questionnaire and Meet routes |
| `components/<page>/` | Parts of one page |
| `components/layout/`, `components/shared/`, `components/ui/` | Site chrome, shared parts, shadcn |
| `app/admin/`, `components/admin/` | Admin panel, copied from the Deccan Dentics admin |
| `stores/` | Admin client state (zustand) |
| `constants/` | Brand manifest, routes, API paths, page copy in `constants/<page>/` |
| `hooks/` | `useBooking`, `useRazorpayCheckout`, `useSlotTimes` |
| `services/` | Database queries, Razorpay, Apps Script, browser API calls |
| `utils/` | Slot maths, time helpers, validators, signatures |
| `db/migrations/` | SQL for Neon |
