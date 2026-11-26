# WhatsApp Messages

**Decided with Mukta:** Meta's WhatsApp Cloud API, direct. No provider (AiSensy, Interakt, WATI). Every email the booking flow sends also goes out on WhatsApp; the emails stay exactly as they are. Not built yet.

Brief: §9 and `tasks.md` 2.4.

## Cost

- No monthly fee and no setup fee. Testing on Meta's test number is free.
- Every message we send is a **Utility template**, charged only when delivered: ₹0.115 + 18% GST ≈ ₹0.14 to a +91 number. There is no free monthly allowance for these.
- A typical booking sends 3 to 5 messages (about ₹0.41 to ₹0.68). 100 bookings a month ≈ ₹41 to ₹68.
- Price depends on the template category and the recipient's country. If a utility template reads like an offer, Meta can recategorise it as marketing (about 7 times the price), so keep templates plain.
- Meta's India rate card from 1 October 2026; it can change on 1 Jan, 1 Apr, 1 Jul and 1 Oct. Check before go-live.

## The flow

The booking order never changes: payment, confirmed appointment, questionnaire, Meet link. WhatsApp goes out beside each email and never blocks or changes a step.

| # | When | To | Template | Sent from (beside the email) |
| --- | --- | --- | --- | --- |
| 1 | Right after payment, new booking only | Customer | `booking_questionnaire` | `app/api/payments/verify`, `app/api/payments/webhook` |
| 2 | 1, 3, 6, 12, 24, 30 and 36 hours after payment, while the questionnaire is empty (stops at 48 hours) | Customer | `questionnaire_reminder` | `runQuestionnaireReminders` (cron every 15 minutes) |
| 3 | After the questionnaire is submitted | Customer | `meet_link` | `submitQuestionnaireAction` (`bookingActions.ts`) |
| 4 | Same moment as 3 | Team numbers | `admin_new_booking` | `submitQuestionnaireAction` |

## Templates: 4 to create now

Created in WhatsApp Manager as **Utility**, language **English (`en`)**. The language code in the code must match exactly. Only first name, program, date, time and links; never health answers.

| Name | Body (variables in braces) | Button |
| --- | --- | --- |
| `booking_questionnaire` | Hi {{1}}, your Eat Rrite consultation is booked for {{2}} at {{3}} (IST). One step left: please fill in the short questionnaire so we can prepare. Your Google Meet link follows on WhatsApp and email. | URL "Fill questionnaire": `https://www.eatrrite.com/appointment-confirmed?appointmentId={{1}}` |
| `questionnaire_reminder` | Hi {{1}}, a reminder: your questionnaire for {{2}} at {{3}} (IST) is still open. It takes a few minutes, and your Google Meet link is sent once it is done. | Same as above |
| `meet_link` | Hi {{1}}, thank you for filling in the questionnaire. Your consultation is on {{2}} at {{3}} (IST). Join with the Google Meet button below. | URL "Join Google Meet": `https://meet.google.com/{{1}}` |
| `admin_new_booking` | New consultation: {{1}}, {{2}} at {{3}}. Program: {{4}}. Mobile: {{5}}. Details are in the admin. | URL "Open admin": `https://www.eatrrite.com/admin` (fixed) |

- A URL button may hold one variable, only at the end, so it carries the appointment ID or the Meet code.
- Mukta approves the wording. Approval usually takes minutes, at most 24 hours.
- Later, each with its own template (not in this step): reminders 24 hours and 1 hour before the consultation, and the Google review request when a program ends.

## Code

Same shape as the email code, which is not touched. Each function does one job, with early returns and no nesting. Repeating a line is fine when it keeps a function easy to read.

| File | Functions |
| --- | --- |
| `services/whatsapp.ts` | `whatsAppNumber(phone)`: digits only; 10 digits → `91` + digits; 11 starting `0` → `91` + the last 10; 12 starting `91` → as is; anything else → `null` |
| | `cleanParam(text)`: newlines and tabs become spaces, runs of spaces become one (Meta rejects them); empty → `"there"` |
| | `sendWhatsAppMessage({ to, template, bodyParams, buttonParam })`: the only function that calls Meta. Returns `true` or `false`, never throws |
| `features/appointment/whatsapp/templates.ts` | `questionnaireMessage(data)`, `reminderMessage(data)`, `meetMessage(data)`, `adminBookingMessage(data)`: each returns `{ template, bodyParams, buttonParam }`; plus `firstName(name)` and `meetCode(link)` |
| `features/appointment/services/bookingWhatsApp.ts` | `bookingWhatsAppData(appointmentId)`: one query for name, phone, service, date, time and Meet link; `null` when the appointment is missing |
| | `sendQuestionnaireWhatsApp(id)`, `sendReminderWhatsApp(id)`, `sendMeetWhatsApp(id)`, `sendAdminWhatsApp(id)`: load the data, build one message, send it. Each returns `true` or `false` |

`sendWhatsAppMessage`, in order, each step an early return:

1. `WHATSAPP_TOKEN` or `WHATSAPP_PHONE_NUMBER_ID` missing → log `WhatsApp skipped (not set up): <template>`, return `false`.
2. `whatsAppNumber(to)` is `null` → log `WhatsApp skipped (no usable number): <template>`, return `false`.
3. `POST https://graph.facebook.com/<GRAPH_API_VERSION>/<WHATSAPP_PHONE_NUMBER_ID>/messages` with `Authorization: Bearer <WHATSAPP_TOKEN>`, `{ messaging_product: "whatsapp", to, type: "template", template: { name, language: { code: "en" }, components } }`, and `signal: AbortSignal.timeout(10_000)`. `components` holds the body parameters, and the button parameter (`type: "button"`, `sub_type: "url"`, `index: "0"`) only when there is one.
4. Network error or timeout → log, return `false`.
5. Response not `ok` → log Meta's `error.code` and `error.message` with the template name, return `false`.
6. Otherwise return `true`. This means Meta **accepted** the message, not that it was delivered.

`GRAPH_API_VERSION` is one constant at the top of the file, set to the version shown on the app's API Setup page.

Call sites gain separate lines beside the email, so a failing email never stops WhatsApp, and the reverse:

```ts
// app/api/payments/verify and app/api/payments/webhook
if (outcome.created) after(() => sendQuestionnaireEmail(outcome.appointmentId));
if (outcome.created) after(() => sendQuestionnaireWhatsApp(outcome.appointmentId));

// bookingActions.ts, after the questionnaire is saved
if (result.ok) after(() => sendMeetEmails(appointmentId));
if (result.ok) after(() => sendMeetWhatsApp(appointmentId));
if (result.ok) after(() => sendAdminWhatsApp(appointmentId));

// questionnaireReminders.ts: the hour is recorded when either channel sent it
const emailSent = await sendReminderEmail(row.id);
const whatsAppSent = await sendReminderWhatsApp(row.id);
if (!emailSent && !whatsAppSent) continue;
```

## Edge cases

| Case | What happens |
| --- | --- |
| WhatsApp not set up (development, or before go-live) | Skipped with a log line; the booking and emails carry on |
| Payment confirmed twice (verify and webhook) | Sent once: both only send when `outcome.created` |
| Phone not a usable Indian mobile (admin-added lead, foreign number) | Skipped with a log line. Country codes come with the picker in `tasks.md` 2.3; then store the full number and send it as is |
| Questionnaire already filled | No reminder: the reminder query skips it |
| Reminder: one channel fails | The hour is still recorded (the other channel sent it), so neither repeats. Both fail → retried on the next run |
| No Meet link yet | `sendMeetWhatsApp` returns `false` with a log line; no message with a broken button. Without `APPS_SCRIPT_URL` the link is a placeholder, so the dev button opens a room that does not exist |
| `WHATSAPP_ADMIN_NUMBERS` empty or with a bad entry | Each number is cleaned and sent separately; bad ones are skipped with a log line |
| Meta error `190` | Token expired: replace `WHATSAPP_TOKEN` (the test token lasts about 24 hours) |
| Meta error `131030` | Test number: that phone is not in the allowed recipient list |
| Meta error `132001` | Template not approved, or its name or language differs from the code |
| Meta error `131026` | The number is not on WhatsApp, or cannot receive the message |
| Meta slow or down | Gives up after 10 seconds, logs, returns `false` |
| Logs | Template name, appointment ID and Meta's error only; never the phone number, name or answers |

## Testing (free)

- **Sender:** Meta's test number, created with the developer app. **Receiver:** your own WhatsApp, including the Business app number you use daily; receiving does not touch it.
- Add your number (up to 5) as a test recipient and enter the code WhatsApp sends.
- Book on the local or staging site with **your number**, pay with a Razorpay test card, and check the booking message; fill the questionnaire and check the Meet and team messages. Repeat as often as you like.
- The 4 templates need approval on the test account too; Meta's ready-made `hello_world` works at once for a first check.

## Sending number

- Never register a WhatsApp Business **app** number straight on the Cloud API: it stops working in the app.
- **Coexistence** keeps one number in both the app and the API: app version 2.24.17 or later, used in the app for at least 7 days, app opened at least every 14 days. Most sources say it goes through Meta's Embedded Signup with a Tech Provider, not a plain developer app; confirm during setup. If it does not work for us, use a second number that is not on WhatsApp.

## Environment

All optional: the site runs without them, like SMTP. Set in `.env.local` and on the host, and add the names to `.env.example` and `config/env.ts`.

| Name | Value |
| --- | --- |
| `WHATSAPP_TOKEN` | Testing: the temporary token (about 24 hours). Live: a permanent system-user token from Mukta's portfolio, with `whatsapp_business_messaging` |
| `WHATSAPP_PHONE_NUMBER_ID` | The sending number's ID from API Setup (not the phone number) |
| `WHATSAPP_ADMIN_NUMBERS` | Team numbers with country code, comma-separated |

## Checklist

**Code (Claude)**
- [ ] `services/whatsapp.ts`, `features/appointment/whatsapp/templates.ts`, `features/appointment/services/bookingWhatsApp.ts`, and the call sites above
- [ ] `WHATSAPP_*` in `.env.example` and `config/env.ts`; consent tick and Privacy Policy name WhatsApp
- [ ] Lint, type check and build pass

**Test setup (Farhan, own Meta portfolio)**
- [ ] Developer app with the WhatsApp product; test number; own WhatsApp added as a recipient
- [ ] Token and phone number ID in `.env.local` (never pasted in a chat); the 4 templates approved
- [ ] Test booking: questionnaire message, one reminder, Meet message and team message all arrive

**Go-live (with Mukta)**
- [ ] Her sending number connected (see Sending number), display name "Eat Rrite" approved, payment method in Billing Hub
- [ ] The 4 templates approved on her account; system-user permanent token
- [ ] `WHATSAPP_*` on the host; included in the final live booking (`tasks.md`, Handover and go-live)
