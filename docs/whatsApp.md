# WhatsApp Messages

Plan for sending a WhatsApp message next to every email the booking flow already sends. The emails stay exactly as they are; WhatsApp is added beside them. Nothing here is built yet.

Brief: §9 (“Automatic WhatsApp and email confirmation with the questionnaire link”, “Google Meet link sent on WhatsApp and email”, “Reminders 24 hours and 1 hour before, on WhatsApp”) and `tasks.md` 2.4. The brief names a provider (Interakt, WATI or AiSensy) and leaves the choice to Mukta.

## What exists today (email)

| # | Message | To | When | Sent from |
| --- | --- | --- | --- | --- |
| 1 | Booking confirmed, questionnaire link | Customer | Right after payment, new booking only | `app/api/payments/verify`, `app/api/payments/webhook` → `sendQuestionnaireEmail` |
| 2 | Questionnaire reminder | Customer | 1, 3, 6, 12, 24, 30 and 36 hours after payment, until it is filled in; stops after 48 hours | Cron `GET /api/cron/questionnaire-reminders` → `runQuestionnaireReminders` → `sendReminderEmail` |
| 3 | Google Meet link | Customer | After the questionnaire is submitted | `submitQuestionnaireAction` (`bookingActions.ts`) → `sendMeetEmails` |
| 4 | New consultation (no health answers) | Team (`ADMIN_NOTIFY_EMAIL`) | Same moment as 3 | `sendMeetEmails` |

Every email goes through `sendMail()` in `services/mailer.ts`. When SMTP is not set it logs “Email skipped” and returns false; a failed send is logged and never fails a booking. Emails 1 and 3 run in `after()`, so the page does not wait.

The goal: messages 1 to 4 also go out on WhatsApp, to the customer’s mobile (`er_leads.phone`) and to the team’s WhatsApp number.

## Can it be free?

Not fully. Meta charges per **delivered** business-to-customer message. For this booking flow, every WhatsApp message is business-initiated, so it is billable.

| Part | Cost |
| --- | --- |
| Meta’s WhatsApp Cloud API (direct, no provider) | ₹0 a month. No setup fee |
| Development and testing | Free. Meta’s test number can send to a limited set of verified recipient numbers during development |
| Each utility message to a +91 number | ₹0.115 + 18% GST ≈ ₹0.14, charged only when delivered |
| Customer replies to the business | Free to receive. Non-template replies from the business within 24 hours: first 1,000 service messages per number per month are free, then ₹0.115 |
| Marketing messages (offers, festive broadcasts) | ₹0.8631 each, before GST. Not part of this work |
| Numbers outside India | Priced by the destination country’s rate card |

Rates are Meta’s India rate card, effective 1 October 2026. Meta may update pricing only on 1 January, 1 April, 1 July and 1 October; check before go-live.

**Per booking:** messages 1, 3 and 4 make 3 messages; reminders add 0 to 7 more. A typical booking is 3 to 5 messages, about ₹0.41 to ₹0.68 including GST. At 100 bookings a month that is roughly ₹41 to ₹68, against ₹80,000 in booking fees.

## Options

| Option | Monthly fee | Per utility message (India) | What Mukta gets | Our code |
| --- | --- | --- | --- | --- |
| **A. Meta Cloud API, direct (recommended to try first)** | ₹0 | ₹0.115 + GST | Messages only. Replies arrive in the WhatsApp Business app if the number uses app onboarding/coexistence | Calls Meta’s API |
| B. AiSensy | ₹1,500 (Basic) | ₹0.145 | Shared inbox, broadcasts, contacts | Calls AiSensy’s API |
| C. Interakt | ₹2,799 (Growth) or ₹3,499 a quarter (Starter) | ₹0.140 to ₹0.160 | Inbox, unlimited agents, broadcasts | Calls Interakt’s API |
| D. WATI | ₹2,999 (Growth) | ₹0.1495 | Inbox, 3 users, broadcasts | Calls WATI’s API |

Provider prices are from their pricing pages in November 2026, before tax. Re-check each provider’s live pricing page before Mukta decides.

Option A meets the brief’s automation needs at no fixed cost. A provider is worth it only if Mukta wants a team inbox or marketing broadcasts. Whichever she picks, the code is the same shape; only the function that calls the API changes. The brief leaves the choice to Mukta, so show her this table.

## Not an option

Unofficial libraries that drive WhatsApp Web (`whatsapp-web.js`, Baileys) and “free WhatsApp API” services built on them cost nothing but break WhatsApp’s terms. The number can be banned without warning, which would cut Mukta off from her clients on WhatsApp. They also need a server that runs all the time, which Vercel does not provide. Not for a commercial site.

## What we need

### From Mukta (she owns every account)

- [ ] Choice of option A, B, C or D
- [ ] Meta Business Portfolio owned by Mukta (already in `tasks.md` 2.6), with Farhan added as developer
- [ ] The WhatsApp number to send from. With WhatsApp Business app onboarding/coexistence, the number she uses in the WhatsApp Business app today can also send through the API, so clients keep one number and her chats stay in the app. Confirm eligibility during setup; otherwise use a second number that is not on WhatsApp
- [ ] Display name “Eat Rrite” approved by Meta for that number
- [ ] A payment method added in Meta Billing Hub before go-live, so production messages are not blocked
- [ ] The team number(s) that should get the new-consultation message

## From Meta (one-off setup)

Done by Farhan with Mukta’s access.

1. Set up the WhatsApp Business Platform / Cloud API connection through Meta’s current onboarding flow, linked to Mukta’s Business Portfolio.
2. Test with Meta’s test number first, sending only to our own verified numbers.
3. Add Mukta’s number, register it, and note the phone number ID.
4. Create a system user in the portfolio and generate a permanent access token with `whatsapp_business_messaging`. A personal user token expires quickly and is not suitable for production.
5. Submit the four templates below as **Utility**, language English. Approval usually takes minutes, at most 24 hours.

## Templates

Every message we start must be an approved template. Templates carry only what the emails carry: first name, program, date, time and a link. No health answers, ever.

| Template name | To | Text (variables in braces) | Button |
| --- | --- | --- | --- |
| `booking_questionnaire` | Customer | Hi {{1}}, your Eat Rrite consultation is booked for {{2}} at {{3}} (IST). One step left: please fill in the short questionnaire so we can prepare. Your Google Meet link follows on WhatsApp and email. | “Fill questionnaire”: `https://www.eatrrite.com/appointment-confirmed?appointmentId={{1}}` |
| `questionnaire_reminder` | Customer | Hi {{1}}, a reminder: your questionnaire for {{2}} at {{3}} (IST) is still open. It takes a few minutes, and your Google Meet link is sent once it is done. | Same as above |
| `meet_link` | Customer | Hi {{1}}, thank you for filling in the questionnaire. Your consultation is on {{2}} at {{3}} (IST). Join with the Google Meet button below. | “Join Google Meet”: `https://meet.google.com/{{1}}` |
| `admin_new_booking` | Team | New consultation: {{1}}, {{2}} at {{3}}. Program: {{4}}. Mobile: {{5}}. Details are in the admin. | “Open admin”: `https://www.eatrrite.com/admin` |

Wording is a draft; Mukta approves it, and it must match the emails’ tone. Meta rejects a utility template that reads like an offer, so keep these plain. URL buttons with a variable place the variable only at the end of the address, which is why the button carries the appointment ID and the Meet code.

## How it fits the code

Same pattern as email, so the email code is not touched.

| Email today | WhatsApp, to add |
| --- | --- |
| `services/mailer.ts`: `sendMail()` | `services/whatsapp.ts`: `sendWhatsApp({ to, template, params, buttonParam })`. One `fetch` to `https://graph.facebook.com/<version>/<WHATSAPP_PHONE_NUMBER_ID>/messages` with the token. Logs “WhatsApp skipped” and returns false when not set up; logs and returns false on failure. Never throws, never fails a booking |
| `features/appointment/emails/templates.ts` | `features/appointment/whatsapp/templates.ts`: template names and their parameters from `BookingEmailData` |
| `features/appointment/services/bookingEmails.ts` | `features/appointment/services/bookingWhatsApp.ts`: `sendQuestionnaireWhatsApp`, `sendReminderWhatsApp`, `sendMeetWhatsApp` (customer and team), reusing `bookingEmailData()` |

Call sites gain one line each, next to the email call:

- `payments/verify` and `payments/webhook`: `after(() => sendQuestionnaireWhatsApp(id))` beside `sendQuestionnaireEmail`.
- `bookingActions.ts`: `after(() => sendMeetWhatsApp(id))` beside `sendMeetEmails`.
- `questionnaireReminders.ts`: send both; record the reminder hour when either one was sent, so neither repeats. A reminder hour is never sent twice on either channel.

## Details to get right

- **Phone format.** Leads store 10 digits (`validateBooking` takes Indian mobiles only). WhatsApp needs the country code: send `91` + the 10 digits. When the country-code picker from `tasks.md` 2.3 lands, store the full number and send it as is.
- **Meet link.** Send the Meet code (the part after `meet.google.com/`) as the button variable. Without `APPS_SCRIPT_URL` the link is a made-up placeholder, so in development the button opens a room that does not exist; that is expected.
- **Order stays the same:** payment, confirmed appointment, questionnaire, Meet link, then messages. WhatsApp never blocks or changes a step.
- **Opt-in.** Meta requires the customer to agree to WhatsApp messages. The line under the pay button already says the Meet link follows on WhatsApp, and the consent tick in `tasks.md` 2.3 should name WhatsApp too. The Privacy Policy already lists WhatsApp as a recipient.
- **Logs.** Log the template name and appointment ID only, never the phone number or answers.
- **Delivery status.** Not needed for the first version. Later, a webhook can record delivered or failed per message.

## Environment

Set in `.env.local` and on the host; add the names to `.env.example`. All optional, so the site runs without them, like SMTP.

| Name | Value |
| --- | --- |
| `WHATSAPP_TOKEN` | Permanent system-user token from Mukta’s portfolio |
| `WHATSAPP_PHONE_NUMBER_ID` | The sending number’s ID from the WhatsApp setup page (not the phone number) |
| `WHATSAPP_ADMIN_NUMBERS` | Team numbers with country code, comma-separated, for `admin_new_booking` |

With a provider (B, C or D), these become that provider’s API key and the code calls its endpoint instead.

## Not in this step

From the brief, for later; each needs its own template:

- Reminders 24 hours and 1 hour before the consultation (a new cron rule, no email equivalent today).
- Google review request when a program ends.
- Marketing broadcasts (marketing rate, and Mukta’s chosen tool).

## Checklist

- [ ] Mukta picks option A, B, C or D
- [ ] WhatsApp Business Platform / Cloud API connection and test number set up; test messages reach our own phones
- [ ] Four templates submitted and approved as Utility
- [ ] `services/whatsapp.ts`, WhatsApp templates and `bookingWhatsApp.ts` built; call sites added beside the emails
- [ ] Lint, type check and build pass
- [ ] Test booking on the test number: questionnaire message, one reminder, Meet message, team message
- [ ] Mukta’s number connected, display name approved, payment method added
- [ ] Token, phone number ID and team numbers set on the host
- [ ] Included in the final live booking (Handover and Go-live in `tasks.md`)