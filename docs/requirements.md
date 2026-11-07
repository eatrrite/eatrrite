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
| 5. Admin panel | Admin login, appointments calendar, hide and show slots, cancel booking | Admin can do everything the PHP admin can |

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
| Fonts | Lora and Bricolage Grotesque, self-hosted through `next/font` |
| Package manager | Bun |

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

**Line height:** PHP text inherits 1.7 from `body`, so Tailwind's `text-xs` to `text-xl` are set to 1.7. For headings, which use 1.2 in PHP, write the size as `text-[20px]` instead, or the heading comes out too tall.

## Project Layout

| Path | What it holds |
| --- | --- |
| `app/(site)/` | Public pages, sharing the top bar, header, footer and floating buttons |
| `app/foundation/` | Foundation UI reference page, not indexed |
| `components/site/` | Top bar, header, footer, floating buttons and shared parts |
| `components/home/` | One file per home page section |
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

## What Phases 4 and 5 Must Replace

| PHP code | What it does |
| --- | --- |
| `appointment-form/api/` | Create order, verify payment, slots, questionnaire, Meet link |
| `appointment-form/src/` | Slot rules, holds, 45-minute blocking, Razorpay, checkout |
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
| 4 | Booking fields and the pay button show in the browser's default font (Arial) on the live site, because the PHP CSS never sets a font on them. Keep this or use Bricolage Grotesque? | Phase 3 | Keep Arial to match the live site, unless Farhan decides otherwise. |
| 5 | Where will Next.js run? It needs Node.js hosting, and the PHP site is on Hostinger. | Phase 4 | Check the Hostinger plan before Phase 4 starts. |
| 6 | Keep the existing Hostinger MySQL database and its data? | Phase 4 | Keep it, so existing appointments carry over. |

## Decisions Made

| Decision | Outcome |
| --- | --- |
| Icons | Font Awesome 6.5.2 on the site, the version the PHP site loads, drawn as inline SVG by `components/site/icon.tsx`. Lucide stays inside shadcn components. |
| Brief's wording corrections | Copy the site as it stands during the rebuild, then apply the brief in one pass. List of corrections: `php-site-tasks.md`. Applying them later means the home page still shows the blog placeholders, testimonials and the 4.8★ rating as they are on the live site. |

## Differences Found in the Existing Docs

- `DESIGN.md` gives mint as `#e5fad1`, but no stylesheet on the site uses that value. The PHP `:root` value `#f1f7f4` is used here.
- `--color-muted` (`#819291`) has about 3.3:1 contrast on white, and the brief asks for 4.5:1. It is kept for an exact match. Changing it is one line in `globals.css` if Mukta wants it.
