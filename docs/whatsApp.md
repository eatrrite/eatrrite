# WhatsApp Messages

**Decided with Mukta:** Meta's WhatsApp Cloud API, direct. No provider (AiSensy, Interakt, WATI). Every booking and contact email also goes out on WhatsApp. **Built (Nov 2026); testing on Meta's test number.**

This file covers Meta setup, numbers, cost, testing and go-live. The messages themselves (6 templates, exact wording, buttons, triggers, code, edge cases) are in `messages.md`, the source of truth. Brief: §9 and `tasks.md` 2.4.

## Numbers

| Role | Testing | Live |
| --- | --- | --- |
| Sender (messages come from) | Meta's free test number, from the developer app | Mukta's business number **+91 96398 77483** |
| Customer (receiver) | The mobile typed into the booking or contact form; must be in the test number's allowed list | The mobile typed into the form (anyone) |
| Team (`WHATSAPP_ADMIN_NUMBERS`) | Farhan's **+91 79938 96266** → `917993896266` | Mukta's **+91 96398 77483** → `919639877483` (add more, comma-separated) |
| Meta business portfolio | Farhan's own | Mukta's |

Receiving never affects a number's WhatsApp or WhatsApp Business app. Only the sender is registered on the Cloud API.

## Cost

- No monthly fee and no setup fee. Testing on Meta's test number is free.
- Every message is a **Utility template**, charged only when delivered: ₹0.115 + 18% GST ≈ ₹0.14 to a +91 number. No free monthly allowance for these.
- A booking sends 4 to 6 WhatsApp messages (booking, up to 2 reminders, Meet link, team), about ₹0.55 to ₹0.85; a contact enquiry 2 (about ₹0.28). 100 bookings a month ≈ ₹55 to ₹85.
- If a utility template reads like an offer, Meta can move it to Marketing (about 7 times the price), so templates stay plain.
- Meta's India rate card from 1 October 2026; it can change on 1 Jan, 1 Apr, 1 Jul and 1 Oct. Check before go-live.

## Test setup (Farhan, own Meta portfolio)

1. developers.facebook.com → My Apps → **Create app** → use case "Connect with customers through WhatsApp" → your own business portfolio.
2. App → **WhatsApp → API Setup**: Meta gives a test sender number. Copy the **Phone number ID** (not the phone number).
3. Same page, **To** → Manage phone number list → add +91 79938 96266 and enter the code WhatsApp sends. Add every other phone you will type into a form as a customer (up to 5 numbers).
4. **Token.** The temporary token on API Setup lasts about 24 hours. For one that does not expire: Business settings → Users → **System users** → Add (Admin) → Assign assets: the app and the WhatsApp account (full control) → **Generate token** for the app with `whatsapp_business_messaging` and `whatsapp_business_management`, expiry Never.
5. **Templates:** WhatsApp Manager (from API Setup, or business.facebook.com → WhatsApp accounts) → Message templates → create the 6 templates in `messages.md`, exactly. Wait for "Active" (minutes, at most 24 hours).
6. `.env.local` (never paste these in a chat or commit them), then restart `bun run dev`:
   ```
   WHATSAPP_TOKEN=<system-user token>
   WHATSAPP_PHONE_NUMBER_ID=<test number's Phone number ID>
   WHATSAPP_ADMIN_NUMBERS=917993896266
   ```
7. Check `WHATSAPP_GRAPH_VERSION` in `constants/whatsappTemplates.ts` matches the version on API Setup.

## Test run

1. Book on the local or staging site with an allowed mobile, pay with a Razorpay test card → `booking_confirmed` arrives; the team email arrives later.
2. Leave the questionnaire empty for 3 hours with the cron running (or call `/api/cron/questionnaire-reminders` with `Authorization: Bearer <CRON_SECRET>`) → `questionnaire_reminder` at 3 hours.
3. Submit the questionnaire → `consultation_meet_link` to the customer, `admin_booking_alert` to 7993896266. Tap "Today's appointments": the admin calendar opens on today.
4. Send the contact form with an allowed mobile → `admin_new_enquiry` to 7993896266, then `enquiry_received` to the customer. Tap the mobile number in the team message: WhatsApp offers to chat or call.
5. Check the server log for `WhatsApp failed` or `WhatsApp skipped` lines (codes in `messages.md`).

The test buttons open www.eatrrite.com (the templates hold the live domain).

## Go-live: switching to Mukta's number

1. **Sending number.** Never register a WhatsApp Business **app** number straight on the Cloud API: it stops working in the app. Use **coexistence** to keep +91 96398 77483 in both the app and the API: app version 2.24.17 or later, used in the app for at least 7 days, app opened at least every 14 days. Most sources say it goes through Meta's Embedded Signup with a Tech Provider, not a plain developer app; confirm during setup. If it does not work, use a second number that is not on WhatsApp.
2. In **Mukta's** business portfolio: a WhatsApp Business account with her number connected, display name "Eat Rrite" approved, a payment method in Billing Hub.
3. Create the same 6 templates there, exactly as in `messages.md`, and wait until all are Active. Templates do not move between accounts.
4. A system user in her portfolio with a never-expiring token (`whatsapp_business_messaging`, `whatsapp_business_management`).
5. On the host (and `.env.local` if testing live locally):
   ```
   WHATSAPP_TOKEN=<Mukta's system-user token>
   WHATSAPP_PHONE_NUMBER_ID=<Phone number ID of +91 96398 77483>
   WHATSAPP_ADMIN_NUMBERS=919639877483
   ```
   Add other team numbers with commas. Remove Farhan's number unless he should still get team messages.
6. Redeploy. No code changes: the code only reads these three values.
7. Include WhatsApp in the final live booking (`tasks.md`, Handover): all four booking messages and both contact messages arrive, from "Eat Rrite".
8. Delete the test app's token, or remove the test app.

## Checklist

**Code (Claude)**
- [x] `services/whatsapp.ts`, booking and contact templates and send functions, call sites (`messages.md`, Code)
- [x] `WHATSAPP_*` in `.env.example` and `config/env.ts`; consent tick on both forms; Privacy Policy names Meta for WhatsApp
- [x] Lint and type check pass
- [ ] Build passes and the flows are tested on the test number

**Test setup (Farhan)**
- [ ] Developer app, test number, 7993896266 and a customer phone as recipients
- [ ] Token and phone number ID in `.env.local`; the 6 templates Active
- [ ] Test run above: all six messages arrive

**Go-live (with Mukta)**
- [ ] Steps 1–8 above
