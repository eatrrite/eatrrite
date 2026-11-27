# Appointment Rules

How booking times are worked out. Copied from the PHP site (`appointment-form/src/Slot*.php`, `constants/schedule.php`) and written once in code.

## Where the rules live

| What | File |
|---|---|
| Settings, hours, services, questionnaire | Neon `er_settings`, `er_schedule_slots`, `er_services`, `er_questions`, read by `features/appointment/services/bookingConfig.ts` (cached, refreshed when the admin changes them) |
| Starting values (the PHP site) | `features/appointment/constants/appointment-settings.ts`, `eatrrite-available-times.ts`, `questionnaire-questions.ts`; seeded by `db/migrations/001_initial.sql` |
| Logic, one job per function | `features/appointment/utils/` (`clock`, `blocks`, `hours`, `slots`, `bookable`, `istTime`, `scheduleWeekly`, `appointmentSlots`) |
| Server booking | `features/appointment/services/bookingDb.ts`, `questionnaireDb.ts`; `app/api/slots`, `app/api/appointments`, `app/api/payments/verify` |
| Checks | `bun run check:rules`, `bun run check:booking` |

Never copy these numbers anywhere else.

## Settings (starting row of `er_settings`)

| Setting | Value | Meaning |
|---|---|---|
| `timezone` | Asia/Kolkata | All dates and times are India time |
| `meetingMinutes` / `prepMinutes` / `blockMinutes` | 30 / 15 / 45 | Call, buffer after it, and the time one booking occupies |
| `startStepMinutes` | 15 | A start time every 15 minutes |
| `holdMinutes` | 15 | A payment in progress holds its slot this long |
| `bookingDaysAhead` | 30 | Today up to and including 30 days ahead |
| `feeRupees` | 800 | Charged through Razorpay; always read on the server (INR) |

## Working hours (India time)

| Day | Hours |
|---|---|
| Monday to Thursday | 11:30 AM–2:00 PM, 3:30 PM–5:30 PM, 8:30 PM–9:30 PM |
| Friday | Closed |
| Saturday | 11:30 AM–2:30 PM |
| Sunday | 11:30 AM–1:00 PM |

The admin Schedule page starts from these; the booking page note is built from them (`hoursNote()`).

## Rules

1. **Start times:** every 15 minutes from opening; the last start is 30 minutes before closing (Monday's first window ends with 1:30 PM).
2. **Block:** a booking occupies 45 minutes and may run 15 minutes past closing.
3. **No overlap:** blocks may touch but not overlap. After a 12:00 booking, 12:45 is free, 12:30 is not.
4. **What takes a slot:** confirmed, finalizing and completed bookings, and pending ones whose 15-minute hold is open. Cancelled or expired ones free it.
5. **Past and window:** today's past times and past dates offer nothing; customers book from today to 30 days ahead.
6. **Hidden slots:** a slot hidden in the admin (calendar → day → Website slots, `er_hidden_slots`) cannot be booked.
7. **Input:** a date must be a real day (`2026-02-31` is rejected); `9:05`, `09:05` and `9:05 pm` become `HH:mm`; a window must end after it starts.

`bookingError(date, time, context)` returns the first problem, in the PHP order: `invalid-date`, `not-offered` (not in the hours, or hidden), `out-of-window`, `past`, `taken`. The API returns 409 for `taken`, 400 for the rest, and checks again at payment, so a stale screen cannot double-book.

## Admin panel

- Zustand holds an in-memory copy of the Neon data, filled on each page load. A change shows at once and saves through a server action; a failed save is undone with a toast. Appointments save server-first, because the server checks the rules again.
- The appointment form offers only times the schedule allows that day, minus taken blocks. `saveAppointment` checks the same rules; an edit that keeps its own date and time always saves.
- The admin may record past appointments: the past-time and 30-day rules apply to customers only.
- The calendar draws each appointment as its 45-minute block, labelled with the call time.
- Editing saves with the booking details only (date, time, service, status, lead); creating needs all three steps.

## Website booking flow

1. **Details:** name, email, 10-digit mobile, service and slot (`validateBooking`).
2. **Slots:** `GET /api/slots` returns the working hours minus booked appointments and live holds; full or closed days are disabled.
3. **Hold and order:** `POST /api/appointments` checks again (`bookingError`), writes a hold to `er_slot_holds` and creates the Razorpay order for the fee in `er_settings`. A failed order removes the hold.
4. **Cancel:** closing or failing the payment calls `POST /api/appointments/release`. The customer can retry inside the hold; a late success is never lost.
5. **Verify and confirm:** `POST /api/payments/verify` checks the signature, then `confirmBooking` saves the lead (reused by phone) and the appointment (Upcoming, with the payment id), frees the hold and opens `/appointment-confirmed?appointmentId=…`. The webhook does the same if the tab closed.
6. **Questionnaire:** name (from the booking, editable), age, gender, then the admin form's questions, numbered; Submit stays off until every required answer is in, and a progress toast counts the answers.
7. **Submit:** `submitQuestionnaireAction` saves the answers once as `{ key, answer }`, puts name, age and gender on the lead, creates the Meet link and shows "Your booking is confirmed." The panel is scrolled into view and focused, since the page shrinks.

| Situation | What happens |
|---|---|
| Payment closed or failed; order not created | Hold released, message shown, slot free |
| Paid but signature check failed | Hold kept, message with the payment id, no appointment |
| Same payment confirmed twice | One appointment (matched by payment id) |
| Slot taken before confirming | No appointment, message with the payment id |
| Double click on Pay; hold older than 15 minutes | Ignored; slot free again |
| Confirmation page with an unknown id | Back to the booking form, after the page has loaded |
| Questionnaire submitted twice | First answers stay |
| Missing answers, name under 2 letters, age outside 13–90 | Nothing saved, error toast |

## Toasts, emails and Meet links

- Every action toasts through `hooks/useShowToast.ts` (`success`, `info`, `error`, `pending`). Server waits show a `pending` toast ("Saving…", "Holding your slot…") that the result replaces by `id`. "Payment taken but booking not completed" also stays on screen. Questionnaire progress uses `hooks/useProgressToast.tsx`.
- Emails and WhatsApp (`messages.md`): questionnaire link after payment, reminders at 1, 3, 6, 12, 24, 30 and 36 hours until answered (`/api/cron/questionnaire-reminders`; WhatsApp at 3 and 24 only), then the Meet link to the customer and the booking to the team, sent once on the first questionnaire save.
- The Meet link comes from `apps-script/Code.gs`: one calendar event per appointment, its id made from the appointment id, so a retry returns the same link. The admin's "Generate Meet link" uses it too. Without `APPS_SCRIPT_URL` the link is a placeholder; if it fails, nothing is saved and the customer can submit again.

Not built yet: admin screens for the booking settings, services and questions (edit them in Neon for now).
