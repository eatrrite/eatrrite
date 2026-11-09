# Eat Rrite: Requirements

Client work for Mukta Patil on www.eatrrite.com: fixes, SEO, speed and automation from her developer brief (`eatrrite-developer-brief.pdf`), on a Next.js rebuild of the PHP site that should look and work the same.

The Next.js app is the project root. The PHP site was removed from the repo in November 2026 (it stays in git history; its secrets and booking files are in a private backup outside the repo).

The work list is `tasks.md`: the build history, then the brief's Phase 1 and Phase 2 checklist (copied from the Notion page "Eat Rrite: Phase 1 and Phase 2 checklist"), then Handover and Go-live.

## Scope

| Part | What it covers | Status |
| --- | --- | --- |
| Rebuild (build Phases 1 to 10) | PHP site rebuilt in Next.js: pages, booking with Razorpay, questionnaire, Meet links, emails, reminders, Neon database, admin panel | Built; live testing at handover |
| Brief Phase 1 (₹5,000) | Content and page fixes, redirects, clean slugs, SEO titles, structured data, Search Console | Mostly done; items needing Mukta or the host remain |
| Brief Phase 2 (₹5,000) | Media articles, reviews and social, booking flow upgrades, WhatsApp automation, legal pages, consent, tracking, ads landing pages, speed, blog template | Not started, apart from the email automation |
| Handover and go-live | Client accounts, live payments, final real booking | Must be finished before handover |

## Client Rules

From `CLAUDE.md` and the brief. They apply to every change.

- No changes to design, fonts, colours, logo, layout or existing text, except the fixes in the brief. Use the brief's wording exactly.
- Keep the ₹800 fee. Do not publish program fees.
- Keep the word "PMOS".
- Never mention the product line.
- Client names, photos and stories only with written consent. Never WhatsApp screenshots.
- No health information or personal data in tracking events or URLs.
- Every change serves Visibility, Trust or Client turnover.
- Work on staging, keep a backup, and show Mukta before going live. Mukta owns every account; the developer gets access, not ownership.

## Stack

| Part | Choice |
| --- | --- |
| Framework | Next.js 16 with the App Router and TypeScript (`cacheComponents` on) |
| Styling | Tailwind CSS 4 |
| Components | shadcn (`base-nova` style, built on Base UI) |
| Icons | Font Awesome 6.5.2 as inline SVG on the site; Lucide in the admin and shadcn parts |
| Animation | Framer Motion |
| Fonts | Libre Baskerville (headings), Merriweather (body), Caveat (accents), self-hosted through `next/font` |
| Package manager | Bun |
| Database | Neon Postgres, through `@neondatabase/serverless` |
| Auth | Neon Auth for the admin; access by `ADMIN_EMAILS` |
| Payments | Razorpay Standard Checkout and webhook; test mode until handover |
| Meet links | Google Apps Script web app (`apps-script/Code.gs`) with the Calendar advanced service |
| Email | nodemailer over SMTP (the account the PHP site used) |

## Design Tokens

`app/globals.css` holds every token. The `--er-*` variables copy the PHP `:root` one for one, and the shadcn variables point at them.

**Colours**

| PHP variable | Value | shadcn or Tailwind name |
| --- | --- | --- |
| `--color-primary` | `#014e4e` | `primary`, `ring` |
| `--color-primary-dark` | `#003636` | `primary-dark` |
| `--color-accent` | `#e5b858` | `accent` |
| `--color-accent-green` | `#52c834` | `accent-green` |
| `--color-cream` | `#f8f5f0` | `cream` |
| `--color-mint` | `#f1f7f4` | `secondary`, `mint` |
| `--color-white` | `#ffffff` | `background`, `card`, `popover` |
| `--color-ink` | `#1c2029` | `ink`, `popover-foreground` |
| `--color-text` | `#595b62` | `foreground`, `card-foreground` |
| `--color-muted` | `#819291` | `muted-foreground` |
| `--color-footer` | `#111416` | `footer` |
| `--color-border` | `rgba(1, 78, 78, 0.12)` | `border` |
| `--color-border-hover` | `rgba(229, 184, 88, 0.45)` | `border-hover` |

**Radius:** The PHP `--radius` is 24px and `--radius-sm` is 16px. shadcn's calculated scale is replaced with fixed values: `2xs` 8px, `xs` 12px, `sm` 16px, `md` 20px, `lg` 24px, `xl` 28px, `2xl` 36px, and `full` for pills and buttons.

**Layout:** `er-container` is 1200px wide with a 20px gutter on each side. `er-section` has 100px padding above and below.

**Type:** `type-*` utilities copy the PHP rules, such as `type-hero` for `.hero-title` and `type-section` for `.section-title`. Body text is 16px with a line height of 1.7.

**Breakpoints:** `er-lg` (1100px), `er-md` (980px), `er-sm` (640px) and `er-xs` (520px) match the PHP `max-width` media queries.

**Motion:** `constants/motion.ts` holds the durations, distances and staggers from the PHP site's animations; the wrappers are in `components/motion/`.

**Transitions:** Tailwind 4 moves elements with the CSS `translate`, `scale` and `rotate` properties. A `transition-[...]` list must name them, or the movement jumps instead of animating.

**Line height:** PHP text inherits 1.7 from `body`, so Tailwind's `text-xs` to `text-xl` are set to 1.7. For headings, which use 1.2 in PHP, write the size as `text-[20px]` instead, or the heading comes out too tall.

## Project Layout

| Path | What it holds |
| --- | --- |
| `app/(site)/` | Public pages, sharing the header, footer and floating buttons |
| `app/admin/` | Admin sign-in (`(auth)`) and the admin panel (`(panel)`) |
| `app/api/` | Slots, appointments, payment verify and webhook, reminder cron, auth |
| `components/` | UI by page (`home`, `about`, `programs`, `contact`, `layout`, `shared`, `admin`) and shadcn parts in `ui` |
| `features/appointment/` | All booking code: components, hooks, services (booking, emails, Meet link, reminders), constants, types, utils |
| `features/admin/`, `features/auth/` | Admin server actions and queries; Neon Auth |
| `config/` | Environment getters (`env.ts`) and the 301 list (`redirects.ts`) |
| `constants/`, `lib/data/` | Site copy and settings |
| `db/migrations/` | `001_initial.sql` builds the whole database |
| `apps-script/Code.gs` | The Google Apps Script that creates Meet links |

## Pages

| Page | Route | Old PHP address (301) |
| --- | --- | --- |
| Home | `/` | `index.php` |
| About | `/about` (and `/about/doctors`) | `about.php`, `founder-profile.php` |
| Programs | `/programs` | `programs.php` |
| Program detail | `/programs/weight-loss-indian-food`, `/programs/diabetes-diet-plan`, `/programs/gut-health-diet`, `/programs/female-hormone-health` | `program.php?slug=…`, `nutricare-for-mom-to-be.php` |
| Pricing | `/pricing` | `pricing.php` |
| Blog | `/blog` | `blog.php` |
| Contact | `/contact` | `contact.php` |
| Book Appointment | `/book` | `appointment.php` |
| Booking confirmed and questionnaire | `/appointment-confirmed?appointmentId=…` | – |
| Media | `/media` | (new) |
| Privacy Policy | `/privacy-policy` | (new; lawyer to check) |
| Cohort | `/cohort` (not in the menu) | `cohort.php` |

The full redirect list is `config/redirects.ts`. Old-site addresses still unknown are listed in `tasks.md` (1.2).

## Booking Flow

The order never changes: payment, confirmed appointment, questionnaire, Meet link, emails. Rules and settings: `appointment-rules.md`.

1. The visitor picks a service and slot; the slot is held for 15 minutes.
2. Razorpay takes the ₹800 fee. The server checks the signature; the webhook confirms the booking if the tab closed.
3. The customer gets the questionnaire email. Reminders follow at 1, 3, 6, 12, 24, 30 and 36 hours until it is filled in.
4. After the questionnaire, the Apps Script creates the Google Calendar event with a Meet link (one per appointment), saved on the appointment.
5. The customer gets the Meet-link email; the team gets the booking email (no health answers in it).

## Database

Neon Postgres, set up by `db/migrations/001_initial.sql` on an empty database (`bun run db:migrate`). Tables, setup and how the code reads and writes: `database.md`.

## Environment

`.env.local` in the project root, never committed. `.env.example` lists the names. On the host, the same names are set in its environment settings.

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Neon connection string |
| `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `ADMIN_EMAILS` | Admin sign-in |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Test keys now; live keys at handover |
| `RAZORPAY_WEBHOOK_SECRET` | From the Razorpay webhook (test now, live at handover) |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_SECRET` | The Meet-link web app and its `SECRET` script property |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_FROM_NAME`, `ADMIN_NOTIFY_EMAIL` | The sending mail account, and where team emails go (`ADMIN_NOTIFY_EMAIL` takes several addresses, comma-separated) |
| `CRON_SECRET` | Protects the questionnaire reminder route |
| `SITE_URL` | Address used in email links (defaults to `https://www.eatrrite.com`) |

## Handover and Go-live

These must all be done before the website is handed over. The checklist is in `tasks.md` (Handover and Go-live).

| Item | Today | At handover |
| --- | --- | --- |
| Apps Script (Meet links and calendar events) | Deployed on Farhan's account, itz.me.farhan6710@gmail.com | Deployed again on the client account, marketing.eatrrite@gmail.com; new `APPS_SCRIPT_URL` and `APPS_SCRIPT_SECRET` on the host; old deployment removed |
| Emails | Built, sent over SMTP | Questionnaire, reminder, Meet-link and admin emails tested on phone and desktop from the client's sending account |
| Reminders | Route built | Scheduled every 15 minutes on the host and tested |
| Razorpay | Test mode, `rzp_test_` keys | Live mode on, live keys on the host, live webhook and secret, test mode off |
| Final check | – | After everything above, one real live-mode ₹800 booking from the website, end to end, with Mukta's agreement |

## Admin Profile and Password

- The Account page edits the admin's name, mobile and address (`er_profiles`, and the Neon Auth name).
- The email cannot be changed from the admin. It is the login, and admin access is checked against `ADMIN_EMAILS`, so a changed email would lock the admin out. To change it: add the new email to `ADMIN_EMAILS` on the host, sign up once at `/admin/signup` with it, then remove the old email.
- Password reset by email link (Neon Auth): "Forgot password?" on the login page, or "Reset password" on the Account page. The link opens `/admin/reset-password` on the same site. The site's address must be a trusted domain in Neon Auth, and Neon Auth must have an email provider that can send the reset email.

## Open Decisions

| Question | Current plan |
| --- | --- |
| Where will Next.js run? It needs Node.js hosting; the PHP site is on Hostinger. | Confirm the host before staging. |
| Mukta's approval of the redesign (the brief asked for no redesign) | Show her on staging before going live. |

## Decisions Made

| Decision | Outcome |
| --- | --- |
| Icons | Font Awesome 6.5.2 on the site, the version the PHP site loads, drawn as inline SVG by `components/shared/Icon.tsx`. Lucide stays inside shadcn components. |
| Hover lift | Deliberate change from PHP, asked for by Farhan: lifting cards use a 350 ms `ease` transition, and hover sits on a wrapper that does not move, so a card cannot rise off the pointer and flicker. |
| Layout below 375 px | The site must work down to 310 px. The top bar and call to action have small additions for this, below the widths the PHP site was built for. |
| Spacing and fields | From Phase 4, spacing follows the 4px Tailwind scale and all form fields share one 48px style in the site font. This replaces the copied PHP values (including Arial on the booking form). |
| Admin design | The admin follows the layout of the reference admin (not the PHP admin), in Eat Rrite colours and fonts, with Leads in place of patients. Every appointment links to a lead. Its theme applies only when the admin shell is on the page (`:root:has(.admin-shell)` in `globals.css`). |
| Buttons | The shadcn `Button` uses the Deccan variants (default, outline, secondary, ghost, destructive, link). Public pages use `PillButton`, which keeps the PHP pill style. |
| Home page redesign | Farhan asked for the home page (after the hero) to follow the Deccan Dentics home design: alternating white and mint sections with a bottom border, faint floating food icons behind content, numbered lists, a programs tab panel, an FAQ picker and a testimonials carousel. Every element reveals with slide, fade and blur (`components/motion/BlurIn.tsx`). The marquee is unchanged and all home copy is kept. The header later changed too: it starts as a full-width white bar and, after 40px of scroll, shrinks into a floating rounded pill with a blur and soft shadow (Pico style, Framer Motion). The hero kept its slides and overlay, but the left side follows the Deccan Dentics hero: an eyebrow pill, the last two title words in gold with a brush mark, four Eat Rrite points with Lucide icons, and a "Trusted by 500+ happy clients" card pinned to the right edge, centred vertically and tilted 45 degrees on wide screens (inline under the buttons on phones). The hero background slides and blurs between images with embla, with previous and next arrows on the right edge. Hero and header buttons are shadcn Buttons (a gold `accent` variant was added). The About menu item is a dropdown with Founder's Story (`/about`) and Doctors on Board (`/about/doctors`), which holds the doctors section on its own. The same style now covers every page and a light footer, and the fonts are the Deccan Dentics set. **This goes against the client brief's "no redesign" rule, so Mukta must approve it before launch.** |
| Heading tags | "Reserve your slot" is an H2, as the brief asks. PHP has it as a second H1. It looks the same. |
| Muted text colour | `--color-muted` (`#819291`) has about 3.3:1 contrast on white; the brief asks for 4.5:1 (2.10). Changing it is one line in `globals.css` if Mukta agrees. |
