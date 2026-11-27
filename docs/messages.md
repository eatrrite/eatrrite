# Messages: Emails and WhatsApp

The source of truth for every message the site sends: when, to whom, the exact WhatsApp template wording to create in Meta, and the code that sends it. Change a template here first, then in WhatsApp Manager and in the code. Meta setup, numbers and costs: `whatsApp.md`.

## Rules

- Every email has a WhatsApp twin with the same news. The two are sent separately, so one failing never stops the other, and neither ever blocks or changes a booking step.
- WhatsApp carries only first name, program, date, time, mobile and links. Never questionnaire answers, and never the contact form's free-text message (it may hold health details): those stay in the admin and the team email.
- WhatsApp templates are **Utility**, language **English** (code `en`). Plain wording only: anything that reads like an offer can be moved to Marketing by Meta (about 7 times the price).
- A URL button can hold one variable, only at the end of the address.
- Buttons may not link to WhatsApp itself (`wa.me`, `api.whatsapp.com`): Meta rejects the template.

## Overview

| # | Event | To | Email (function) | WhatsApp template (function) |
| --- | --- | --- | --- | --- |
| 1 | Payment confirmed (new booking only) | Customer | `questionnaireEmail` (`sendQuestionnaireEmail`) | `booking_confirmed` (`sendBookingConfirmedWhatsApp`) |
| 2 | Reminder while the questionnaire is empty | Customer | `reminderEmail` (`sendReminderEmail`) at 1, 3, 6, 12, 24, 30, 36 h | `questionnaire_reminder` (`sendReminderWhatsApp`) at 3 and 24 h only |
| 3 | Questionnaire submitted (first time only) | Customer | `meetLinkEmail` (`sendMeetLinkEmail`) | `consultation_meet_link` (`sendMeetLinkWhatsApp`) |
| 4 | Questionnaire submitted (first time only) | Team | `adminBookingEmail` (`sendAdminBookingEmail`) | `admin_booking_alert` (`sendAdminBookingWhatsApp`) |
| 5 | Contact form sent | Team | `adminNewEnquiryEmail` (`sendAdminEnquiryEmail`) | `admin_new_enquiry` (`sendAdminEnquiryWhatsApp`) |
| 6 | Contact form reached the team | Customer | `enquiryReceivedEmail` (`sendEnquiryReceivedEmail`), only if they gave an email | `enquiry_received` (`sendEnquiryReceivedWhatsApp`) |

So: **6 WhatsApp templates**, **6 email templates**, **12 send functions** (one per message and channel).

## The booking flow

1. The customer pays. `POST /api/payments/verify` (or the Razorpay webhook, if the tab closed) confirms the booking. Only when it **created** the appointment: message 1, email and WhatsApp.
2. Every 15 minutes the cron (`/api/cron/questionnaire-reminders`) sends message 2 while the questionnaire is empty, for 48 hours. One reminder per run per appointment; the hour is recorded once either channel sent it.
3. The customer submits the questionnaire. `submitQuestionnaireAction` saves it and creates the Meet link. Only on the **first** save: messages 3 and 4, each on both channels.

## The contact flow

1. The visitor sends `/contact` (name, mobile, city, optional email, program, message, consent tick). `submitEnquiryAction` checks it on the server.
2. Message 5 to the team, email and WhatsApp together. If **both** fail, the visitor sees "We could not send your enquiry just now. Please WhatsApp or call us on +91 96398 77483." and nothing else is sent.
3. If at least one reached the team: message 6 to the visitor, and a success toast. Enquiries are not stored in the database; the team messages are the record.

## WhatsApp templates to create in Meta

Create each template once per WhatsApp Business account: once on the test account now, again on Mukta's account at go-live (templates do not move between accounts). Copy every value exactly; the name, language, number of variables and button order must match the code.

### How to create one (same for all six)

1. business.facebook.com → **WhatsApp Manager** → **Message templates** → **Manage templates** → check the right WhatsApp account is selected at the top → **Create template**.
2. **Set up template** (step one): choose **Utility**, then **Default** → **Next**.
3. **Template name and language:** the name from the template below (lowercase, underscores); language **English** (not English (US) or English (UK): the code sends `en`).
4. **Content:**
   - **Type of variable:** Number (variables are `{{1}}`, `{{2}}`…).
   - **Media sample:** None.
   - **Header:** leave empty.
   - **Body:** paste the body below, keeping the blank lines. Type variables as `{{1}}`, or use "+ Add variable".
   - **Variable samples:** fill in each sample below. Samples are only for Meta's review, never sent.
   - **Footer:** paste the footer below, or leave empty when it says none.
5. **Buttons:** for each button below, in the order given: **Add button** → **Visit website**. Fill in **Button text**, choose **URL type** (Static or Dynamic) and paste the **Website URL**. For a Dynamic URL, type the address **without** `{{1}}` (for example `https://meet.google.com/`): Meta adds `{{1}}` at the end itself. Typing `{{1}}` as well gives a broken link (`https://meet.google.com/%7B%7B1%7D%7D{{1}}`). Meta then shows **Add sample URL**: paste the full sample URL below. After submitting, open the template and check the URL ends in exactly one `{{1}}`.
6. **Message validity period:** leave off.
7. **Submit for review.** Status goes from In review to **Active**, usually within minutes (at most 24 hours).

If Meta suggests changing the category to Marketing, keep Utility. If a template is rejected, change only that template, here first, then in Meta and in the code.

### 1. `booking_confirmed` (customer, after payment)

| Field | Value |
| --- | --- |
| Category / type | Utility / Default |
| Name | `booking_confirmed` |
| Language | English |
| Footer | `Need a different time? Reply to this message.` |
| Button 1 | Visit website · text `Fill questionnaire` · **Dynamic** · URL `https://www.eatrrite.com/appointment-confirmed?appointmentId={{1}}` |
| Button 1 sample URL | `https://www.eatrrite.com/appointment-confirmed?appointmentId=3f2b8c1e-5a6d-4e7f-9a0b-1c2d3e4f5a6b` |
| Body samples | {{1}} `Asha` · {{2}} `Tuesday, 10 November 2026` · {{3}} `11:30 AM` |

Body:
```
Hi {{1}}, your payment is received and your Eat Rrite consultation is booked for {{2}} at {{3}} IST.

Just one step left: please fill in the short questionnaire so Mukta can prepare for your call. Your Google Meet link is sent here and by email as soon as you submit it.
```

### 2. `questionnaire_reminder` (customer, while the questionnaire is empty)

| Field | Value |
| --- | --- |
| Category / type | Utility / Default |
| Name | `questionnaire_reminder` |
| Language | English |
| Footer | `Reminders stop once the questionnaire is in.` |
| Button 1 | Visit website · text `Fill questionnaire` · **Dynamic** · URL `https://www.eatrrite.com/appointment-confirmed?appointmentId={{1}}` |
| Button 1 sample URL | `https://www.eatrrite.com/appointment-confirmed?appointmentId=3f2b8c1e-5a6d-4e7f-9a0b-1c2d3e4f5a6b` |
| Body samples | {{1}} `Asha` · {{2}} `Tuesday, 10 November 2026` · {{3}} `11:30 AM` |

Body:
```
Hi {{1}}, a gentle reminder: your Eat Rrite consultation on {{2}} at {{3}} IST is reserved, but your questionnaire is still pending.

It takes about 5 minutes, and your Google Meet link is sent as soon as you submit it.
```

### 3. `consultation_meet_link` (customer, after the questionnaire)

| Field | Value |
| --- | --- |
| Category / type | Utility / Default |
| Name | `consultation_meet_link` |
| Language | English |
| Footer | `Need a different time? Reply to this message.` |
| Button 1 | Visit website · text `Join Google Meet` · **Dynamic** · URL `https://meet.google.com/{{1}}` |
| Button 1 sample URL | `https://meet.google.com/abc-defg-hij` |
| Body samples | {{1}} `Asha` · {{2}} `Tuesday, 10 November 2026` · {{3}} `11:30 AM` |

Body:
```
Hi {{1}}, thank you for completing the questionnaire. Your Eat Rrite consultation is on {{2}} at {{3}} IST.

Tap the button below to join on Google Meet at your booked time. Please join a couple of minutes early, from a quiet place.
```

### 4. `admin_booking_alert` (team, after the questionnaire)

| Field | Value |
| --- | --- |
| Category / type | Utility / Default |
| Name | `admin_booking_alert` |
| Language | English |
| Footer | none |
| Button 1 (must be first) | Visit website · text `Join Google Meet` · **Dynamic** · URL `https://meet.google.com/{{1}}` |
| Button 1 sample URL | `https://meet.google.com/abc-defg-hij` |
| Button 2 | Visit website · text `Today's appointments` · **Static** · URL `https://www.eatrrite.com/admin/calendar?view=day` |
| Body samples | {{1}} `Asha Rao` · {{2}} `Weight Loss` · {{3}} `Tuesday, 10 November 2026` · {{4}} `11:30 AM` · {{5}} `9876543210` |

Body:
```
New consultation booked on the website.

Name: {{1}}
Program: {{2}}
Date: {{3}}
Time: {{4}} IST
Mobile: {{5}}

The client has paid and completed the questionnaire. Their answers are in the admin.
```

### 5. `enquiry_received` (customer, after the contact form)

| Field | Value |
| --- | --- |
| Category / type | Utility / Default |
| Name | `enquiry_received` |
| Language | English |
| Footer | `Eat Rrite · Holistic Nutrition and Wellbeing` |
| Buttons | none (a "Book now" button would read as marketing) |
| Body samples | {{1}} `Asha` · {{2}} `Weight Loss` |

Body:
```
Hi {{1}}, thank you for contacting Eat Rrite. We have received your enquiry about {{2}}, and our team will get back to you soon on this number.
```

### 6. `admin_new_enquiry` (team, after the contact form)

| Field | Value |
| --- | --- |
| Category / type | Utility / Default |
| Name | `admin_new_enquiry` |
| Language | English |
| Footer | none |
| Buttons | none. Meta rejects `wa.me` links in buttons ("Direct links to WhatsApp aren't allowed for buttons"); WhatsApp makes the `+91 …` mobile in the body tappable, which offers chat or call |
| Body samples | {{1}} `Asha Rao` · {{2}} `+91 98765 43210` · {{3}} `Pune` · {{4}} `Weight Loss` |

Body:
```
New enquiry from the website contact form.

Name: {{1}}
Mobile: {{2}}
City: {{3}}
Program: {{4}}

Any message they wrote is in the team email.
```

## Emails

All share one look (`emails/layout.ts`: logo, teal band, white card, beige footer with WhatsApp, phone and email from `constants/brand.ts`) and parts (`emails/parts.ts`: details card, main button, outlined second button, section title, note). Every value is escaped.

| Email | Subject | Buttons |
| --- | --- | --- |
| `questionnaireEmail` | Booking confirmed for {date, time}: one step left | Fill in the questionnaire |
| `reminderEmail` | Reminder: your questionnaire for {date, time} | Fill in the questionnaire |
| `meetLinkEmail` | Your Google Meet link for {date, time} | Join Google Meet |
| `adminBookingEmail` | New consultation: {name}, {date, time} | Join Google Meet; Today's appointments |
| `adminNewEnquiryEmail` | New enquiry: {name}, {program} | Reply on WhatsApp; Call |
| `enquiryReceivedEmail` | We have received your enquiry, {first name} | Book a consultation |

Team emails go to every `ADMIN_NOTIFY_EMAIL` address with Reply-To set to the customer, have no sign-off, and never include questionnaire answers.

## Code

| File | Holds |
| --- | --- |
| `services/mailer.ts` | `sendMail`: the only function that talks to SMTP |
| `services/whatsapp.ts` | `sendWhatsAppMessage`, `sendWhatsAppToTeam`, `cleanParam`: the only code that calls Meta |
| `utils/phone.ts`, `utils/name.ts` | `whatsAppNumber`, `indianMobile`, `firstName` |
| `constants/whatsappTemplates.ts` | Template names, language, Graph API version, WhatsApp reminder hours |
| `constants/routes.ts` | `ADMIN_TODAY_PATH` (`/admin/calendar?view=day`) |
| `emails/` | Shared email look: `layout.ts`, `parts.ts`, `theme.ts`, `logo.ts` |
| `features/appointment/emails/templates.ts`, `whatsapp/templates.ts` | Booking messages 1–4 |
| `features/appointment/services/bookingMessageData.ts` | One query for everything a booking message needs |
| `features/appointment/services/bookingEmails.ts`, `bookingWhatsApp.ts` | Booking send functions |
| `features/contact/emails/templates.ts`, `whatsapp/templates.ts` | Contact messages 5–6 |
| `features/contact/services/enquiryEmails.ts`, `enquiryWhatsApp.ts`, `enquiryActions.ts` | Contact send functions and the form's server action |

To add a message: write the template here, create it in Meta, add its name to `constants/whatsappTemplates.ts`, add a builder in the feature's `whatsapp/templates.ts` and email in `emails/templates.ts`, add one send function per channel, and call each on its own line with `after()`.

## Edge cases

| Case | What happens |
| --- | --- |
| WhatsApp or SMTP not set up (development) | Skipped with a log line; bookings carry on. The contact form shows the "could not send" message, because nothing reached the team |
| Payment confirmed twice (page and webhook) | Message 1 once: only when `outcome.created` |
| Questionnaire submitted twice | Messages 3 and 4 once: only on `firstSubmit` |
| No Meet link | Messages 3 and 4 skipped with a log line, never sent with a broken button |
| Phone not a usable Indian mobile | WhatsApp skipped with a log line; emails still go |
| One `WHATSAPP_ADMIN_NUMBERS` entry bad | That number is skipped, the others still get the message |
| Reminder: one channel fails | The hour is recorded (the other sent it). Both fail: retried next run |
| Reminder email permanently failing | Reminders stay on the first unsent hour, so the WhatsApp reminders (3 and 24 h) wait too; fix SMTP |
| Contact form filled by a bot (hidden `website` field) | Told it worked, nothing sent, log line |
| Contact form: team email and WhatsApp both fail | Error toast with the phone number; no acknowledgement to the visitor |
| Admin opens "Today's appointments" signed out | Sign-in page, then the dashboard (which lists today's appointments) |
| Meet button in testing | Templates hold `www.eatrrite.com`, so test buttons open the live site; the questionnaire link only works there if that deployment uses the same database |
| Meta slow or down | Gives up after 10 seconds, logs, returns false |

Meta error codes in the logs: `190` token expired; `131030` recipient not in the test number's allowed list; `132001` template not approved, or name or language differs; `132000` wrong number of variables; `131026` number not on WhatsApp; `131047` more than 24 hours since the customer's last reply (only for non-template messages, which we never send).
