# Eat Rrite: Tasks

Numbers like 1.2 and 2.4 follow Mukta's brief and the Notion page "Eat Rrite: Phase 1 and Phase 2 checklist"; keep the ticks in step with Notion. Details in `requirements.md`; full history in git.
## Done
- [x] **Pages:** Next.js 16 rebuild of every PHP page: home, about, doctors, programs, the 4 program pages, pricing, blog, contact, book, media, privacy, cohort and a branded 404. Deccan Dentics layout, beige and gold palette from Mukta's banner. No program fees, "PMOS" kept, no product line
- [x] **Booking:** slots from the weekly hours (15-minute steps, 45-minute blocking, 30-day window, 15-minute hold, admin-hidden slots), ₹800 Razorpay payment with a server signature check and webhook, lead and appointment in Neon, questionnaire, Google Meet link through the Apps Script
- [x] **Emails:** questionnaire link after payment, reminders at 1, 3, 6, 12, 24, 30 and 36 hours (cron route), Meet link to the customer and booking email to the team
- [x] **Admin:** Neon Auth sign-in by `ADMIN_EMAILS`, profile and password reset; dashboard, leads, appointments, calendar, schedule, to-dos and settings; payment status (paid, due, refunded), date filter, sort, search, pagination and bulk actions; empty, loading and error states with toasts
- [x] **Data:** Neon Postgres from `db/migrations/001_initial.sql` (`database.md`); site copy in Cosmic with a JSON fallback and a publish webhook (`cosmic.md`)
- [x] **SEO:** the brief's titles and descriptions, one H1 per page, clean slugs with 301s from the old `.php` addresses, www as the one address, sitemap, robots, canonicals, `en-IN`, share card, favicons; Organization, Person, Service, BreadcrumbList and home FAQPage data; Search Console verified and sitemap submitted on 19 Nov 2026 (`seo.md`)
- [x] **Brief fixes:** tap-to-call and mail, hours line, sticky WhatsApp and Book bar, WhatsApp message per page, footer year and disclaimer, and the home, About (Credentials & Media), program, pricing, booking (consent tick, line under the pay button), contact and blog fixes
- [x] **Speed:** home on Lighthouse mobile from 44 to 82, accessibility 100 (CSS reveals, GSAP and toasts loaded late, only the first hero image at load)
- [x] **Google Business Profile:** run from the marketing account; the site shows the same 4.7★
## Checks and approvals
- [ ] Full test booking in the browser: Razorpay test card, booking in the admin, questionnaire, a real Meet link and calendar event, the three emails; then a failed payment, a cancelled checkout and a Meet failure
- [ ] Admin: logged-out visitors reach no admin page or action; toasts checked after sign-in; add a lead and appointment, change the schedule
- [ ] Password reset email end to end on the deployed site (Neon Auth email provider and trusted domain)
- [ ] Dev database: move sample rows dated in the future back to now (`database.md`, step 5); confirmation page wording about emails once they are tested; decide whether `/appointment-thank-you` is needed (the PHP page only redirects)
- [ ] Approvals: Farhan approves the front end, booking flow and admin; Mukta approves the redesign (the brief asked for none) and the colours on staging
- [ ] Optional: real cut-out food images instead of the floating icons
- [ ] Cosmic: deploy the all-pages change and check one edit per page type live; replace the write key and webhook secret (pasted in a chat) in `.env.local` and Vercel; decide whether SEO titles move into Cosmic
## Brief Phase 1: pages, SEO and redirects
- [ ] **1.1** Work on staging, keep a backup of the live site, show Mukta before going live
- [ ] **1.2** Every old address (old sitemap, hosting files, Search Console 404s) in `config/redirects.ts`, including the old program pages: Post Natal NutriCare & Weight Loss and Female Hormone Health → Female Hormone Health; Weight & Lifestyle → Weight; Diabetes Management And Reversal → Diabetes; Gut Health and Celiac And Crohn's Disease → Gut Health
- [ ] **1.2** http → https on the host at launch; delete old pages from the server once they redirect
- [ ] **1.4** ☰ button labelled "Open menu", checked on every page on iPhone and Android; footer YouTube and Facebook icons (need Mukta's links)
- [ ] **1.5** Home blog cards: show the 3 latest articles with full dates once Media articles are live (hidden now); link the "4.7★ Google Rating" stat to the reviews page (needs the link)
- [ ] **1.6** About: event photos from Drive (03 Talks, Sessions & Events), alt text naming each event (needs captions)
- [ ] **1.9, 1.13** Verify in Bing Webmaster Tools (import from Search Console); home owns "online nutritionist India" (also Indian food, holistic nutrition, Mukta Patil)
- [ ] **1.11, 1.12** HTTPS on every page with no mixed content; ad landing pages noindex; program pages link to 2–3 related articles and back to Book, articles link to their program; FAQPage data on each program page (home is done)
## Brief Phase 2: content, integrations, tracking and ads
### 2.1 Media page and the 2019 New Indian Express columns
- [ ] Check the agreement allows full reprints; if unsure, publish the clipping, a 3–4 line summary and the e-paper link
- [ ] /blog/: mind-your-calories (22 Aug 2019, Press 003), a-z-of-child-nutrition (12 Sep 2019, Press 002, 004), blueprint-for-good-health (10 Oct 2019, Press 001), should-you-try-the-latest-diets (31 Oct 2019, Press 006, 011); dates to confirm: can-detox-diets-flush-out-toxins (010), macro-micro-nutrient-balance (009, 005), good-cholesterol-bad-cholesterol (008), homecooked-food-first-step-to-health (007)
- [ ] Each article: title as H1; "First published in The New Indian Express, 'Body Basics' column, [date]."; clipping with alt "Mukta Patil's column in The New Indian Express, [date]"; full text as printed, subheadings as H2; author box (photo, name, "Nutritionist, Yoga Teacher & Life Coach", link to About)
- [ ] Each article: e-paper link where known (10 Oct 2019 /c/44513938 · 12 Sep 2019 /c/43504147 · 31 Oct 2019 /c/45224864); related program card, Book Appointment and WhatsApp; Article data with author Mukta Patil and the original datePublished
- [ ] /media: grid of the 8 articles (thumbnail, title, date); "In the news" row for the 2023 Dehradun coverage (Press 012, 013); "Online articles and interviews" list of the six Read links
### 2.2 Reviews, testimonials and social
- [ ] Business Profile: category Nutritionist, service area India, links to the website and booking page; the website links back
- [ ] Google reviews widget (live rating, latest reviews, "See all reviews on Google"); reply to every review (process with Mukta)
- [ ] YouTube testimonial videos as click-to-load thumbnails with VideoObject data; "Latest videos" with Subscribe on /media; Instagram feed of the latest 6 posts on Home and /media, lazy-loaded
- [ ] LinkedIn and Medium in the article author box; every social bio links to the site with UTM tags
- [ ] Testimonials only with written consent (quote · first name · city/country · program · month and year): confirm it for the current names and photos; add Anju's ("Anju, Madrid, Spain · Weight & gut health · 2025") once hers arrives
### 2.3 Booking and conversion (three taps to a booking from any page)
- [ ] Dates and slots work on iPhone Safari and Android Chrome; country code picker (+91 default); slots in the visitor's time zone with IST beside them; the next available day when a day has none
- [ ] Form order: program, name, email, mobile, slot, consent tick, then ₹800; no health questions on the form
- [ ] /thank-you after payment: slot confirmed, "Add to calendar", what to expect, WhatsApp button (the booking conversion)
- [ ] Calendar event with the Meet link on the marketing account (built; moves there at handover); hidden UTM source, medium and campaign saved with each booking
- [ ] Contact form connected (name, phone, city, optional email, program) with a consent tick: built, sends team and customer email and WhatsApp (`messages.md`); test it; "Not ready yet?" guides for name + WhatsApp, with consent: /guides/diwali, /guides/sugar-sense, /guides/midlife
### 2.4 WhatsApp and email automation (`messages.md`, `whatsApp.md`)
- [x] Build the sender beside the emails: 6 templates (booking, reminder, Meet link, team booking with "Today's appointments", enquiry received, team enquiry)
- [x] Test setup (27 Nov 2026): Farhan's Meta app and test number (+1 555 168 8902), recipient 7993896266 verified, system-user token and phone number ID in `.env.local`, Graph API v25.0, 6 templates submitted for review
- [x] Template fix 1 (28 Nov 2026): the Meet button in `meet_link_ready` and `admin_new_booking` was saved as `https://meet.google.com/%7B%7B1%7D%7D{{1}}`. Recreated by API as `consultation_meet_link` and `admin_booking_alert` with `https://meet.google.com/{{1}}` (a deleted name is blocked for 30 days); code and docs use the new names
- [ ] Delete `meet_link_ready` and `admin_new_booking` in WhatsApp Manager (the token cannot delete)
- [x] Template fix 2 (27 Nov 2026): `admin_new_enquiry` has no button (Meta rejects `wa.me` links); body ends "Any message they wrote is in the team email."; Active
- [ ] Before testing: all 6 templates Active (`consultation_meet_link` and `admin_booking_alert` in review since 28 Nov 2026)
- [ ] Local test (28 Nov 2026), on the test number with 7993896266 as team and customer: one booking (`booking_confirmed`, questionnaire → `consultation_meet_link` and `admin_booking_alert`), one contact enquiry (`admin_new_enquiry`, `enquiry_received`), one reminder after 3 hours; then commit and push
- [ ] Live publish test on Mukta's account (`whatsApp.md`, Go-live): her number connected, the 6 templates recreated and Active, system-user token; `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ADMIN_NUMBERS=919639877483` in Vercel; redeploy; one booking and one enquiry on the live site, all six messages arrive from "Eat Rrite"
- [ ] Privacy Policy line in Cosmic: "Meta, for WhatsApp messages about your consultation or enquiry" (lawyer checks)
- [ ] WhatsApp reminders 24 hours and 1 hour before the consultation; Google review request when a program ends
### 2.5 Legal, privacy and consent (Mukta's lawyer checks the wording)
- [ ] Lawyer checks `/privacy-policy`; Terms of Service, Cancellation & Reschedule Policy and Disclaimer pages, linked in the footer and on every form
- [ ] DPDP (main duties from May 2027): notice at every form, consent box not pre-ticked, easy withdrawal
- [ ] Questionnaire answers kept sensitive: only in Neon and the admin, access limited to Mukta, never in emails
- [ ] Cookie banner with equal "Accept" and "Reject", using Consent Mode v2
### 2.6–2.7 Ads accounts and events
- [ ] Tag Manager on every page; GA4 on the marketing account, linked to Search Console and Ads; Ads conversion tag with enhanced conversions (with consent)
- [ ] Meta Business Portfolio owned by Mukta (Page, both Instagrams, WhatsApp number); domain verification; Pixel + Conversions API
- [ ] Consent Mode v2 and the banner control every tag; Mukta is admin everywhere, the developer only has access
- [ ] Events: page_view (GA4, Meta PageView), view_program (GA4, Meta ViewContent), click_whatsapp and click_call (GA4, Ads secondary, Meta Contact), start_booking (GA4, Meta custom)
- [ ] Events: booking_complete (GA4 key event, Ads primary, Meta Lead or a neutral custom event), guide_signup (GA4, Ads secondary, Meta Lead); no health information or personal data in events or URLs
### 2.8–2.9 Ad landing pages and UTM links
- [ ] Check how Meta classifies eatrrite.com once the pixel is live; plan Google Search campaigns, not remarketing
- [ ] Rules: no "cure" or "guaranteed", no before/after photos, visible disclaimer, privacy policy and contact; if an ad is rejected, change only that line
- [ ] Template, noindex: logo, one headline matching the ad, Mukta's photo, 3 benefits, 1–2 stories, credentials strip, FAQs, repeated Book button, WhatsApp; under 2.5 s on mobile
- [ ] /start/weight-loss, /start/diabetes, /start/pmos-perimenopause, /start/midlife-reset, /start/nri (time zones, online, "Indian food wherever you live")
- [ ] UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=diabetes_nov26`; `?utm_source=google&utm_medium=cpc&utm_campaign=pmos_search` plus auto-tagging; `?utm_source=instagram&utm_medium=bio&utm_campaign=muktapatil01`; `?utm_source=linkedin&utm_medium=post&utm_campaign=week45`; `?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=diwali26`; names never describe a person's condition
### 2.10 Speed, mobile and accessibility
- [ ] Mobile PageSpeed for Home, one program page and Booking: 80+, LCP under 2.5 s, INP under 200 ms, CLS under 0.1; before and after reports to Mukta
- [ ] For 90+: less up-front weight (fonts about 200 KB, script about 330 KB): trimmed self-hosted fonts, fewer Base UI parts, a lighter hero
- [ ] Images in WebP, sized to display (hero max 1600 px), lazy below the first screen; only the site fonts, self-hosted, `font-display: swap`
- [ ] Remove unused scripts and libraries, defer the rest; caching and compression on the host, CDN if it is outside India; reels and YouTube click-to-load
- [ ] Tap targets 48 px apart, no text under 16 px on mobile, contrast 4.5:1 (gold not for small text), visible labels, iPhone autofill; test on iPhone Safari, Android Chrome and desktop Chrome before going live
### 2.11 Blog Mukta can post to from her iPhone (Cosmic `posts` type, steps in `cosmic.md`)
- [ ] /blog/article-name: H1, author box, published and updated dates, reel near the top, H2s, related program card, Book + WhatsApp, 2–3 related articles
- [ ] Fields: title, page title, description, image and alt text, category, related program. Categories: Weight · Diabetes · Gut Health · PMOS & Hormones · Perimenopause & Menopause · Mind & Lifestyle · Yoga
- [ ] Automatic Article data, sitemap entry and share image; share buttons for WhatsApp, LinkedIn, Facebook and copy link; Medium reposts point their canonical to eatrrite.com; posting works from her iPhone
### 2.12 After launch
- [ ] After four weeks, redirect leftover 404s from Search Console; monthly one-page report: Search Console, Business Profile, GA4 by source, WhatsApp clicks and bookings by source, cost per booking once ads run, mobile speed
## Needed from Mukta (she owns every account)
- [ ] Access: hosting and DNS; Search Console, Analytics, Tag Manager, Ads and Business Profile (marketing.eatrrite@gmail.com); Meta Business Portfolio (Events Manager); the marketing Google account for the Apps Script
- [ ] Links: Google reviews profile, YouTube testimonial videos, YouTube and Facebook profiles
- [ ] Written testimonial consent (Anju and others); certificate images and the Global Sustainability Award; event photo captions (event, place, year)
- [ ] OK to reprint the 2019 columns in full, and the dates of the 4 undated ones
- [ ] WhatsApp (Meta Cloud API, direct, decided): the sending number (coexistence check) and the team numbers (`whatsApp.md`)
## Handover and go-live (in this order)
- [ ] Choose the host and confirm it runs Next.js; deploy to staging and show Mukta; back up the live PHP site and database
- [ ] Every variable from `.env.example` on the host, secrets never in the repo; Cosmic: show Mukta how to edit and publish, confirm the plan limits once the setup period ends
- [ ] Apps Script on marketing.eatrrite@gmail.com (today on Farhan's account): new project, Calendar advanced service, Script Property `SECRET`, web app (execute as me, anyone can access); new `APPS_SCRIPT_URL` and `APPS_SCRIPT_SECRET` on the host; a Meet link from the admin and one from a booking land in the marketing calendar; old deployment removed
- [ ] `SMTP_*`, `MAIL_FROM` and `ADMIN_NOTIFY_EMAIL` are the client's; `GET /api/cron/questionnaire-reminders` every 15 minutes with `Authorization: Bearer <CRON_SECRET>`; questionnaire email, one reminder (left empty past the first hour), Meet email and admin email checked on a phone and desktop
- [ ] WhatsApp: Mukta's number connected, display name approved, payment method in Billing Hub, the 6 templates in `messages.md` Active, system-user token; `WHATSAPP_*` in Vercel (see 2.4, live publish test)
- [ ] Razorpay live: `rzp_live_…` keys on the host and no test keys anywhere; webhook `https://www.eatrrite.com/api/payments/webhook` (`payment.captured`, `order.paid`) with `RAZORPAY_WEBHOOK_SECRET`; test mode off
- [ ] With Mukta's agreement, one real ₹800 booking: payment, slot, questionnaire email and WhatsApp, questionnaire, Meet link, Meet email and WhatsApp, admin email and WhatsApp, booking in the admin and calendar; refund if she wants
- [ ] Switch the domain; old `.php` addresses redirect and HTTPS works everywhere; keep the PHP site for rollback until stable
- [ ] **Mukta approves the live site**
