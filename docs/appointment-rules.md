# Appointment Rules

How booking times are worked out. These rules are copied from the PHP site (`appointment-form/src/Slot*.php`, `constants/schedule.php`) and written once in code.

## Where the rules live

| What | File |
|---|---|
| Booking settings, working hours, services, questionnaire | Neon: `er_settings`, `er_schedule_slots`, `er_services`, `er_questions` (read by `features/appointment/services/bookingConfig.ts`, cached and refreshed when the admin changes them) |
| Their starting values (the PHP site) | `features/appointment/constants/appointment-settings.ts` (`DEFAULT_BOOKING_SETTINGS`, `DEFAULT_SERVICES`), `eatrrite-available-times.ts`, `questionnaire-questions.ts`; seeded by `db/migrations/001_initial.sql` |
| Logic, one job per function | `features/appointment/utils/` (`clock`, `blocks`, `hours`, `slots`, `bookable`) |
| India date and time helpers | `features/appointment/utils/istTime.ts` |
| Admin: schedule page data and appointment guard | `features/appointment/utils/scheduleWeekly.ts`, `features/appointment/utils/appointmentSlots.ts`, `features/appointment/stores/appointmentSlotActions.ts`, `features/admin/services/adminActions.ts` |
| Website booking on the server | `features/appointment/services/bookingDb.ts` (slots, holds, confirm), `questionnaireDb.ts`, `app/api/slots`, `app/api/appointments`, `app/api/payments/verify` |
| Checks | `bun run check:rules` (`scripts/check-appointment-rules.ts`), `bun run check:booking` (`scripts/check-booking-flow.ts`) |

Change a setting in `appointment-settings.ts` and everything that depends on it follows. Do not copy these numbers anywhere else.

## Settings

The values below are the starting row of `er_settings`. The app reads the database, so the admin can change them later.

| Setting | Value | Meaning |
|---|---|---|
| `timezone` | Asia/Kolkata (+05:30) | All dates and times are India time |
| `meetingMinutes` | 30 | Length of the customer's call |
| `prepMinutes` | 15 | Consultant buffer after each call |
| `blockMinutes` | 45 | Call plus buffer. Time one booking occupies |
| `startStepMinutes` | 15 | Start times are offered every 15 minutes |
| `holdMinutes` | 15 | A payment in progress holds its slot this long |
| `bookingDaysAhead` | 30 | Today up to and including 30 days ahead |
| `feeRupees` | 800 | Booking fee, charged through Razorpay; always read on the server |
| `currency` | INR | Fixed in code |

## Working hours (India time)

| Day | Hours |
|---|---|
| Monday to Thursday | 11:30 AM–2:00 PM, 3:30 PM–5:30 PM, 8:30 PM–9:30 PM |
| Friday | Closed |
| Saturday | 11:30 AM–2:30 PM |
| Sunday | 11:30 AM–1:00 PM |

The admin Schedule page starts from these same hours. The public note on the booking page is built from them (`hoursNote()`).

## Rules

1. **Start times.** Inside a working window, a start time is offered every 15 minutes from opening time.
2. **Last start.** The last start in a window is 30 minutes (`meetingMinutes`) before it closes. So Monday's first window ends with 1:30 PM, not 1:45 PM.
3. **Block.** Every booking occupies 45 minutes from its start. The block may run 15 minutes past closing time (the prep buffer).
4. **No overlap.** A start time is not offered when its 45-minute block overlaps another booking's block. Blocks that only touch are fine: after a 12:00 booking, 12:45 is free but 12:30 is not.
5. **What takes a slot.** Confirmed, finalizing and completed bookings, and pending bookings whose 15-minute payment hold is still open. A cancelled or expired booking frees its slot.
6. **Past times.** Today's times at or before the current minute are hidden. Past dates offer nothing.
7. **Hidden slots.** A slot the admin hides is not offered and cannot be booked.
8. **Window.** A customer can book from today to 30 days ahead, inclusive.
9. **Dates and times.** A date must be a real calendar day (`2026-02-31` is rejected). Times like `9:05`, `09:05` and `9:05 pm` are normalized to `HH:mm`.
10. **Weekly hours.** A working window must end after it starts, or it offers nothing.

## Booking check order

`bookingError(date, time, context)` returns the first problem, or `null` when the slot can be booked. Same order as the PHP site:

1. Valid date → `invalid-date`
2. Offered by the working hours and not hidden → `not-offered`
3. Inside the 30-day window → `out-of-window`
4. Not in the past → `past`
5. Not taken by another block → `taken`

The booking API returns 409 for `taken` and 400 for the others. The server checks again when the customer pays, so a stale screen cannot double-book.

## Admin panel

The admin pages keep zustand as an in-memory copy of the Neon data, filled on every page load. Each change shows at once and is saved through a server action; if saving fails it is undone with a toast. Appointments are saved server-first, because the server checks the slot rules again against the database.


- The Schedule page edits the weekly hours in the store (`days`). They are converted to the plain weekly hours the rules read (`scheduleToWeekly`).
- The appointment form offers only times the schedule allows on the chosen date, minus taken blocks. Closed days offer none.
- The store's `saveAppointment` checks the same rules: the time must fall in the working hours, and no other appointment may overlap its 45 minutes. A cancelled appointment frees its slot. An edit that keeps its own date and time always saves.
- The admin may record past appointments, so the past-time and 30-day rules apply to customers only.
- The admin calendar draws each appointment as the 45 minutes it reserves (the 30-minute call plus the 15-minute prep), the same span the booking rules block. The time written on it is the call itself.
- Editing an appointment saves with just the booking details (date, time, service, status, lead). Creating one needs all three steps. The top bar, footer and contact page read the working hours from Neon.

## Website booking flow

The booking runs on the server against Neon. A website booking shows up in the admin on its next page load.

1. **Details.** The form checks name, email, 10-digit mobile, service and slot (`validateBooking`).
2. **Slots.** When the picker opens it loads `GET /api/slots`: the working hours from Neon, minus booked appointments and live holds. A fully booked or closed day is disabled.
3. **Hold and order.** On Pay, `POST /api/appointments` checks the details and the slot again (`bookingError`), writes a hold to `er_slot_holds` for `hold_minutes`, and creates a Razorpay **test** order for the fee in `er_settings`. If the order fails the hold is removed.
4. **Cancel.** Closing or failing the payment calls `POST /api/appointments/release`, which removes the hold.
5. **Checkout.** Razorpay Standard Checkout opens. The customer can retry inside the window after a failed attempt. A late success is never lost.
6. **Verify.** `POST /api/payments/verify` checks the Razorpay signature with the secret key.
7. **Confirm.** The verify route then calls `confirmBooking` (server), which saves the lead (an existing lead with the same phone is reused) and a separate appointment (status Upcoming, with the payment id, no questionnaire and no Meet link yet), frees the hold, and the page opens `/appointment-confirmed?appointmentId=…`.
8. **Questionnaire.** While the appointment has no questionnaire, the confirmation page shows it on the right. The left summary stays in view (sticky) while the right side scrolls. Questions are numbered with larger text: 1 Name (starts as what the customer typed when booking, editable), 2 Age, 3 Gender, then the same questions as step 2 of the admin form (`QuestionnaireForm` reuses `AppointmentQuestionnaireFields`). Submit stays off until every required answer is in, and says how many are left.
   After each answer a progress toast shows how far along they are, for example "3 of 9 answered" with a bar. It sits at the bottom right, beside the call and WhatsApp buttons, and updates in place. The Submit button is at the right end, with "n required answers left" on the left.
9. **Submit.** The `submitQuestionnaireAction` server action saves the answers on that appointment as `{ key, answer }` entries (the question id and the answer, plus name, age and gender), saves name, age and gender on the lead, and creates the placeholder Meet link. A toast says "Questionnaire submitted". The page refreshes from the server and the right side shows "Your booking is confirmed." with the link. The form is much taller than that panel, so the page shrinks under the reader; before the next paint the panel is scrolled into view and given focus (`ConfirmedBooking`), so they never land at the footer. Answers are saved once and never overwritten.

| Situation | What happens |
|---|---|
| Payment window closed or payment failed | Hold released, nothing saved, message shown, slot free again |
| Order could not be created | Hold released, message shown |
| Payment taken but signature check failed | Hold kept, message with the payment id, no appointment |
| Same payment confirmed twice | One appointment (matched by payment id) |
| Slot taken by someone else before confirming | No appointment, message with the payment id |
| Double click on Pay | Ignored while a booking is running |
| Hold older than 15 minutes | Ignored, slot free again |
| Confirmation page with an unknown id | Goes back to the booking form (after the page has finished loading, so a saved booking is never missed) |
| Questionnaire submitted twice | The first answers stay; nothing is overwritten |
| Questionnaire missing answers, name under 2 letters, or age outside 13–90 | Nothing saved, error toast |

## Toasts

Every user action shows a toast through one hook, `hooks/useShowToast.ts` (sonner, `<Toaster />` mounted in the site and admin layouts). It takes `{ title, description, type }` with type `success`, `info`, `error` or `pending`. Public actions that toast: booking problems (slot taken, order failed, payment cancelled or failed, payment not verified), payment success, form validation, questionnaire submitted or rejected, Meet link copied, and the contact form notice. The one message that also stays on screen is "payment taken but booking not completed", because it must not disappear.

Questionnaire progress uses `hooks/useProgressToast.tsx`, which updates one toast in place.

Checks: `bun run check:booking` (7 checks on the server-side booking rules; the database calls themselves need Neon).

Still to do: a customer who pays and closes the tab before the page confirms is not recorded until the Razorpay webhook is added. The Google Meet link is a placeholder (`generateAdminMeetLink`). A website lead gets its name, age and gender from the questionnaire.

## Not built yet

- Hidden slots from the admin saved in the database (the rules already accept them).
- Admin screens to change the booking settings, services and questions (they live in Neon and can be edited there for now).
