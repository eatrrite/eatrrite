# Appointment Rules

How booking times are worked out. These rules are copied from the PHP site (`appointment-form/src/Slot*.php`, `constants/schedule.php`) and written once in code.

## Where the rules live

| What | File |
|---|---|
| Every number and setting | `features/appointment/constants/appointment-settings.ts` (`APPOINTMENT_SETTINGS`) |
| Working hours for each weekday | `features/appointment/constants/eatrrite-available-times.ts` (`EATRRITE_AVAILABLE_TIMES`) |
| Logic, one job per function | `features/appointment/utils/` (`clock`, `blocks`, `hours`, `slots`, `bookable`) |
| India date and time helpers | `features/appointment/utils/istTime.ts` |
| Admin: schedule page data and appointment guard | `features/appointment/utils/scheduleWeekly.ts`, `features/appointment/utils/appointmentSlots.ts`, `features/appointment/stores/appointmentSlotActions.ts` |
| Checks | `bun run check:rules` (`scripts/check-appointment-rules.ts`) |

Change a setting in `appointment-settings.ts` and everything that depends on it follows. Do not copy these numbers anywhere else.

## Settings

| Setting | Value | Meaning |
|---|---|---|
| `timezone` | Asia/Kolkata (+05:30) | All dates and times are India time |
| `meetingMinutes` | 30 | Length of the customer's call |
| `prepMinutes` | 15 | Consultant buffer after each call |
| `blockMinutes` | 45 | Call plus buffer. Time one booking occupies |
| `startStepMinutes` | 15 | Start times are offered every 15 minutes |
| `holdMinutes` | 15 | A payment in progress holds its slot this long |
| `bookingDaysAhead` | 30 | Today up to and including 30 days ahead |
| `currency` | INR | Fee amount comes from the server environment (₹800) |

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

## Admin panel (zustand)

- The Schedule page edits the weekly hours in the store (`days`). They are converted to the plain weekly hours the rules read (`scheduleToWeekly`).
- The appointment form offers only times the schedule allows on the chosen date, minus taken blocks. Closed days offer none.
- The store's `saveAppointment` checks the same rules: the time must fall in the working hours, and no other appointment may overlap its 45 minutes. A cancelled appointment frees its slot. An edit that keeps its own date and time always saves.
- The admin may record past visits, so the past-time and 30-day rules apply to customers only.

## Not built yet

- Hidden slots from the admin saved in the database (the rules already accept them).
- The admin schedule feeding the public booking page (it reads the constant until the schedule is saved in the database).
