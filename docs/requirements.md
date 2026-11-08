# Eat Rrite Next.js Rebuild: Requirements

Move www.eatrrite.com from PHP to Next.js without changing how it looks or works. The user should not be able to tell the site was rebuilt.

The new project lives in `eatrrite-nextjs/`. The PHP site stays in the project root as the reference and keeps running until the new site is approved.

## The Five Phases

| Phase | What gets built | Done when |
| --- | --- | --- |
| 1. Foundation | Next.js, shadcn, Tailwind and Framer Motion, the PHP theme in shadcn variables, and a foundation UI page | Farhan approves typography, colours, spacing and radius |
| 2. Home page | Header, footer and the home page, matching the PHP home page exactly | Side-by-side check passes |
| 3. Other pages | About, Programs, Pricing, Blog, Contact, Book Appointment and the program detail pages | Side-by-side check passes on every page |
| 4. Payments and booking | Razorpay ₹800 payment, slots, confirmed appointments, questionnaire, Google Meet and emails | Test booking works from start to finish |
| 5. Admin panel | Admin UI copied from the Deccan Dentics admin, then connected to Neon | Farhan approves the admin UI, then the live data |

Each phase waits for approval before the next one starts. Phases 1 to 3 are front end only, with no backend, database or payment logic.

## Rules for Every Phase

**Rebuild rules**

- Keep layout, spacing, colours, fonts, images, wording and animation as they are on the PHP site.
- Build the UI from shadcn components, restyled to the PHP rules.
- Take colours only from `app/globals.css`. Do not add a shade to a component.
- Move copy from `constants/` in the PHP site into typed data files. Do not retype it.

**Client rules** (from `CLAUDE.md` and the brief)

- Keep the ₹800 fee. Do not publish program fees.
- Keep the word "PMOS".
- Never mention the product line.
- Use client names, photos and stories only with written consent.
- Keep health information and personal data out of tracking events and URLs.
- Work on staging, keep a backup, and show Mukta before going live.

## Stack

| Part | Choice |
| --- | --- |
| Framework | Next.js 16 with the App Router and TypeScript |
| Styling | Tailwind CSS 4 |
| Components | shadcn (`base-nova` style, built on Base UI) |
| Icons | Font Awesome 6.5.2 as inline SVG |
| Animation | Framer Motion, replacing the PHP site's GSAP |
| Fonts | Libre Baskerville (headings), Merriweather (body), Caveat (accents), self-hosted through `next/font`, as on Deccan Dentics |
| Package manager | Bun |
| Database | Neon Postgres, through `@neondatabase/serverless` |
| Auth | Neon Auth (users in `neon_auth.user`), linked to `profiles` |
| Payments | Razorpay Standard Checkout, test mode for now |

## Design Tokens

`eatrrite-nextjs/app/globals.css` holds every token. The `--er-*` variables copy the PHP `:root` one for one, and the shadcn variables point at them.

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

**Motion:** `lib/motion.ts` holds the durations, distances, thresholds and staggers from `assets/js/main.js`.

**Transitions:** Tailwind 4 moves elements with the CSS `translate`, `scale` and `rotate` properties. A `transition-[...]` list must name them, or the movement jumps instead of animating.

**Line height:** PHP text inherits 1.7 from `body`, so Tailwind's `text-xs` to `text-xl` are set to 1.7. For headings, which use 1.2 in PHP, write the size as `text-[20px]` instead, or the heading comes out too tall.

## Project Layout

| Path | What it holds |
| --- | --- |
| `app/(site)/` | Public pages, sharing the top bar, header, footer and floating buttons |
| `app/foundation/` | Foundation UI reference page, not indexed |
| `components/site/` | Top bar, header, footer, floating buttons and shared parts |
| `components/home/` | One file per home page section |
| `components/about/`, `components/programs/` | Parts of the other pages |
| `features/appointment/` | All appointment code: booking and confirmation components, hooks, services, constants (rules, hours, questionnaire), types, utils and the admin slot guard |
| `lib/data/` | Page copy, exported from the PHP `constants/` files |

## Pages

| Nav item | PHP file | Next.js route | PHP sections |
| --- | --- | --- | --- |
| Home | `index.php` | `/` | hero, services, marquee, about-home, why-choose, process, programs, faq, blog, testimonials, cta |
| About | `about.php` | `/about` | page-banner, about-story, about-doctors, about-mission |
| Programs | `programs.php` | `/programs` | page-banner, program list |
| Program detail | `program.php?slug=` | `/programs/[slug]` | page-banner, program-about, program-benefits, program-packages |
| Pricing | `pricing.php` | `/pricing` | page-banner, pricing cards |
| Blog | `blog.php` | `/blog` | page-banner, blog |
| Contact | `contact.php` | `/contact` | page-banner, contact details |
| Book Appointment | `appointment.php` | `/appointment` | page-banner, booking form |

Program detail pages are not in the navigation, but the footer and Programs page link to them, so Phase 3 includes them. There are four: Diabetes, Female Hormone Health, Gut Health and Weight and Lifestyle.

Phase 4 adds `/appointment-confirmed` and `/appointment-thank-you`.

## Database

Run `db/migrations/001_initial.sql` in the Neon SQL Editor, after turning on Neon Auth.

| Table | Purpose | Key columns |
| --- | --- | --- |
| `neon_auth.user` | Signed-in users, managed by Neon Auth | `id` |
| `profiles` | One per user, for roles | `user_id` → `neon_auth.user(id)`, `email`, `phone`, `role` (`admin` or `customer`) |
| `appointments` | One per booking | contact details, `service`, `slot_start`, `status`, Razorpay order and payment ids, `questionnaire` (JSON), `meet_link` |

- Guests book without an account, as on the PHP site. So `appointments` keeps its own contact details and has no link to `profiles`.
- The PHP `holds` table is not needed. A `pending` appointment holds its slot for 15 minutes.
- The PHP `questionnaire_answers` table becomes one `questionnaire` JSON column.
- Phase 5 adds `disabled_slots` for the admin's hide and show, and a `patients` table (name, phone, email, age, profession, status) that `appointments` link to, because the admin has a Patients page.
- Statuses follow the PHP flow: `pending` → `confirmed` → `finalizing` → `completed`, or `failed` if the Meet link fails, or `cancelled`.

## Environment

`eatrrite-nextjs/.env.local`, never committed. `.env.example` lists the names.

| Name | Value |
| --- | --- |
| `DATABASE_URL` | Neon connection string |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Razorpay test keys, from the PHP site |
| `RAZORPAY_WEBHOOK_SECRET` | Set when the webhook is added in the Razorpay dashboard |
| `APPOINTMENT_FEE_RUPEES` | `800` |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_SECRET` | The Apps Script that creates Meet links, same as PHP |

## What Phases 4 and 5 Must Replace

| PHP code | What it does |
| --- | --- |
| `appointment-form/api/` | Create order, verify payment, slots, questionnaire, Meet link |
| `appointment-form/src/` | Slot rules, holds, 45-minute blocking, Razorpay, checkout |
| `docs/appointment-rules.md` | Next.js booking rules and settings, copied from the PHP slot rules |
| `includes/db/` and `sql/` | MySQL tables and queries |
| `email/` | Customer and admin emails, currently through PHPMailer |
| `appointment-form/cron/` | Questionnaire reminder emails at 1, 3, 6, 12, 24, 30 and 36 hours |
| `appointment-form/scripts/google-apps-script` | Google Meet and Calendar |
| `admin/` | Login, appointments calendar, hide and show slots, cancel booking |

The booking order must not change: payment, confirmed appointment, questionnaire, Meet link, confirmation email.

## Open Decisions

| # | Question | Needed by | Current plan |
| --- | --- | --- | --- |
| 3 | Are `cohort.php` and `snackbar.php` part of the rebuild? They are not in the navigation you listed. | Phase 3 | Leave both out. `snackbar.php` also conflicts with the client's rule against mentioning the product line, so ask Mukta about it. |
| 5 | Where will Next.js run? It needs Node.js hosting, and the PHP site is on Hostinger. | Phase 4 | Check the Hostinger plan before Phase 4 starts. |
| 6 | Keep the existing Hostinger MySQL database and its data? | Phase 4 | Keep it, so existing appointments carry over. |

## Decisions Made

| Decision | Outcome |
| --- | --- |
| Icons | Font Awesome 6.5.2 on the site, the version the PHP site loads, drawn as inline SVG by `components/site/icon.tsx`. Lucide stays inside shadcn components. |
| Hover lift | Deliberate change from PHP, asked for by Farhan: lifting cards use a 350 ms `ease` transition, and hover sits on a wrapper that does not move, so a card cannot rise off the pointer and flicker. |
| Layout below 375 px | The site must work down to 310 px. The top bar and call to action have small additions for this, below the widths the PHP site was built for. |
| Spacing and fields | From Phase 4, spacing follows the 4px Tailwind scale and all form fields share one 48px style in the site font. This replaces the copied PHP values (including Arial on the booking form). |
| Admin design | The admin copies the Deccan Dentics admin (not the PHP admin), in Eat Rrite colours and fonts, including Patients. Appointments link to a patient, as in Deccan. Its theme applies only when the admin shell is on the page (`:root:has(.admin-shell)` in `globals.css`). |
| Buttons | The shadcn `Button` uses the Deccan variants (default, outline, secondary, ghost, destructive, link). Public pages use `PillButton`, which keeps the PHP pill style. |
| Admin password | `eatrrite@1234`, checked in the browser for the UI preview only. Anyone can read it in the page code. It is replaced by Neon Auth before launch. |
| Home page redesign | Farhan asked for the home page (after the hero) to follow the Deccan Dentics home design: alternating white and mint sections with a bottom border, faint floating food icons behind content, numbered lists, a programs tab panel, an FAQ picker and a testimonials carousel. Every element reveals with slide, fade and blur (`components/motion/BlurIn.tsx`). The marquee is unchanged and all home copy is kept. The header later changed too: it starts as a full-width white bar and, after 40px of scroll, shrinks into a floating rounded pill with a blur and soft shadow (Pico style, Framer Motion). The hero kept its slides and overlay, but the left side follows the Deccan Dentics hero: an eyebrow pill, the last two title words in gold with a brush mark, four Eat Rrite points with Lucide icons, and a "Trusted by 500+ happy clients" card at the bottom right. Hero and header buttons are shadcn Buttons (a gold `accent` variant was added). The About menu item is a dropdown with Founder's Story (`/about`) and Doctors on Board (`/about/doctors`), which holds the doctors section on its own. The same style now covers every page and a light footer, and the fonts are the Deccan Dentics set. **This goes against the client brief's "no redesign" rule, so Mukta must approve it before launch.** |
| Emails | Moved to Phase 5. The confirmation page no longer says an email is on its way. |
| Heading tags | "Reserve your slot" is an H2, as the brief asks. PHP has it as a second H1. It looks the same. |
| Brief's wording corrections | Copy the site as it stands during the rebuild, then apply the brief in one pass. List of corrections: `php-site-tasks.md`. Applying them later means the home page still shows the blog placeholders, testimonials and the 4.8★ rating as they are on the live site. |

## Differences Found in the Existing Docs

- `DESIGN.md` gives mint as `#e5fad1`. That value only appears as the slot picker's day hover colour. The site-wide mint is the PHP `:root` value `#f1f7f4`.
- `--color-muted` (`#819291`) has about 3.3:1 contrast on white, and the brief asks for 4.5:1. It is kept for an exact match. Changing it is one line in `globals.css` if Mukta wants it.
