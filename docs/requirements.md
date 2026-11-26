# Eat Rrite: Requirements

Client work for Mukta Patil on www.eatrrite.com: fixes, SEO, speed and automation from her developer brief (`eatrrite-developer-brief.pdf`), on a Next.js rebuild of the PHP site. The PHP site was removed from the repo in November 2026; it stays in git history, and its secrets and booking files are in a private backup outside the repo. Work list: `tasks.md`; code rules: `RULES.md`.

## Client rules

- No changes to design, fonts, colours, logo, layout or existing text, except the brief's fixes, in the brief's exact wording.
- Keep the ₹800 fee, never publish program fees, keep "PMOS", never mention the product line.
- Client names, photos and stories only with written consent; never WhatsApp screenshots.
- No health information or personal data in tracking events or URLs.
- Every change serves Visibility, Trust or Client turnover.
- Work on staging, keep a backup, show Mukta before going live. Mukta owns every account; the developer gets access, not ownership.

## Stack

| Part | Choice |
| --- | --- |
| App | Next.js 16, App Router, TypeScript (`cacheComponents` on), Bun |
| UI | Tailwind CSS 4, shadcn (`base-nova`, Base UI), Framer Motion |
| Icons | Font Awesome 6.5.2 as inline SVG on the site; Lucide in the admin and shadcn parts |
| Fonts | Libre Baskerville (headings), Merriweather (body), Caveat (accents), through `next/font` |
| Data and auth | Neon Postgres (`@neondatabase/serverless`); Neon Auth for the admin, access by `ADMIN_EMAILS` |
| Payments | Razorpay Standard Checkout and webhook; test mode until handover |
| Meet links | Google Apps Script web app (`apps-script/Code.gs`), Calendar advanced service |
| Messages | Email with nodemailer over SMTP; WhatsApp through Meta's Cloud API, direct, no provider (decided with Mukta; not built yet, `whatsApp.md`) |
| Site copy | Cosmic headless CMS, JSON files as fallback (`cosmic.md`) |

## Design

- `app/globals.css` holds every token: the `--er-*` variables copy the PHP `:root`, and the shadcn variables point at them.
- Colours: primary teal `#014e4e`, gold `#e5b858`, dark gold text `#9a6f1e`, beige `#f8f2e7` and deeper beige `#efe5d2` (Mukta's banner, in place of the PHP mint), ink `#1c2029`, text `#595b62`.
- Radius fixed (8 to 36px, `full` for pills); `er-container` 1200px with 20px gutters; breakpoints `er-lg` 1100, `er-md` 980, `er-sm` 640, `er-xs` 520; body 16px at line height 1.7, headings as `text-[20px]` so they keep 1.2.
- A `transition-[...]` list must name `translate`, `scale` and `rotate`, or Tailwind 4 movement jumps.

## Project layout

| Path | Holds |
| --- | --- |
| `app/(site)/`, `app/admin/`, `app/api/` | Public pages; admin sign-in and panel; slots, appointments, payments, reminder cron, auth, Cosmic webhook |
| `components/` | UI by page, layout, shared parts, shadcn `ui/` |
| `features/` | `appointment/` (all booking code), `admin/`, `auth/` (Neon Auth), `cms/` (Cosmic) |
| `config/` | Environment getters (`env.ts`) and the 301 list (`redirects.ts`) |
| `constants/` | Brand, routes, WhatsApp links, and the page copy JSON that seeded Cosmic and is its fallback |
| `db/migrations/` | `001_initial.sql` builds the database; `002` sample data (dev only); `003` and `004` update an older database's payment column |

## Pages

| Route | Old PHP address (301) |
| --- | --- |
| `/` | `index.php` |
| `/about`, `/about/doctors` | `about.php`, `founder-profile.php` |
| `/programs` | `programs.php` |
| `/programs/weight-loss-indian-food`, `/diabetes-diet-plan`, `/gut-health-diet`, `/female-hormone-health` | `program.php?slug=…`, `nutricare-for-mom-to-be.php` |
| `/pricing`, `/blog`, `/contact`, `/book` | `pricing.php`, `blog.php`, `contact.php`, `appointment.php` |
| `/appointment-confirmed?appointmentId=…` | Booking confirmed and questionnaire |
| `/media`; `/privacy-policy` (lawyer to check); `/cohort` (not in the menu) | New; new; `cohort.php` |

All redirects: `config/redirects.ts`; old addresses still unknown: `tasks.md` (1.2).

## Booking flow

The order never changes. Rules and settings: `appointment-rules.md`.

1. The visitor picks a service and slot; the slot is held for 15 minutes.
2. Razorpay takes ₹800; the server checks the signature, and the webhook confirms the booking if the tab closed.
3. The customer gets the questionnaire email, with reminders at 1, 3, 6, 12, 24, 30 and 36 hours until it is filled in.
4. After the questionnaire, the Apps Script creates one calendar event with a Meet link, saved on the appointment.
5. The customer gets the Meet-link email; the team gets the booking email (no health answers). Planned: each email also goes out on WhatsApp (`whatsApp.md`).

## Environment

`.env.local`, never committed; `.env.example` lists the names; the host has the same names. Database setup: `database.md`.

| Name | Value |
| --- | --- |
| `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `ADMIN_EMAILS` | Neon and admin sign-in |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` | Test now, live at handover |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_SECRET` | Meet-link web app and its `SECRET` property |
| `SMTP_*`, `MAIL_FROM`, `MAIL_FROM_NAME`, `ADMIN_NOTIFY_EMAIL` | Sending account; team addresses, comma-separated |
| `CRON_SECRET` | Protects the reminder route |
| `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WEBHOOK_SECRET` | Cosmic (also on the host); `COSMIC_WRITE_KEY` only in `.env.local` |
| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ADMIN_NUMBERS` | WhatsApp (planned, optional) |
| `SITE_URL` | `https://www.eatrrite.com` in Vercel Production, for email and sign-in links |

## Admin account

- The Account page edits name, mobile and address. The email is the login and is checked against `ADMIN_EMAILS`; to change it, add the new email there, sign up once at `/admin/signup`, then remove the old one.
- Password reset by email link (Neon Auth) opens `/admin/reset-password`. The site must be a trusted domain in Neon Auth, with an email provider set.

## Decisions

| Decision | Outcome |
| --- | --- |
| Hosting | Needs Node.js hosting (the PHP site is on Hostinger); confirm before staging |
| Redesign | The site follows the Deccan Dentics layout (header pill, hero, sections, light footer, fonts). This breaks the brief's "no redesign" rule, so Mukta must approve it before launch |
| Colours | Mukta asked for less green: white and beige sections, gold on headings, chips and tags; the admin and emails use the same palette |
| Admin | Reference admin layout in Eat Rrite colours, Leads in place of patients; its theme applies only inside `.admin-shell` |
| Buttons | Public pages use `PillButton`; shadcn `Button` with the Deccan variants elsewhere |
| Small details | Hover sits on a wrapper that does not move (no flicker); works down to 310px; "Reserve your slot" is an H2, as the brief asks |
| Muted text | `#819291` is about 3.3:1 on white (the brief asks 4.5:1, 2.10); one line in `globals.css` if Mukta agrees |
