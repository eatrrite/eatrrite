# Eat Rrite Next.js Rebuild: Tasks

Two parts:

1. **Build history (Phases 1 to 10):** the rebuild from PHP to Next.js, done in order, each approved before the next.
2. **Client brief checklist:** Phase 1 and Phase 2 from the Notion page "Eat Rrite: Phase 1 and Phase 2 checklist" (from Mukta's developer brief, `eatrrite-developer-brief.pdf`), then **Handover and go-live**, which must all be done before the site is handed over.

Details are in `requirements.md`. Tick items off as they are done.

## Phase 1: Foundation

**Goal:** Set up the project and prove it matches the PHP theme.

- [x] Create `eatrrite-nextjs/` with Next.js, TypeScript and Tailwind
- [x] Set up shadcn and add button, card, input, label, textarea, badge, accordion, select and separator
- [x] Install Framer Motion and copy the PHP animation values to `lib/motion.ts`
- [x] Copy the PHP `:root` variables to `app/globals.css` and point the shadcn variables at them
- [x] Load Lora and Bricolage Grotesque with the same weights and axes as the PHP site
- [x] Set the radius scale, shadows, container, section spacing and type styles from the PHP CSS
- [x] Restyle shadcn components to the PHP rules, including hover and focus states
- [x] Build the foundation UI page, now at `/foundation`
- [x] Compare computed styles against the live site
- [x] Check the page at phone width
- [x] **Farhan approves typography, colours, spacing and radius**

## Phase 2: Home Page

**Goal:** A home page that matches `index.php` exactly.

Setup:

- [x] Decide icons: Font Awesome 6.5.2, drawn as inline SVG (open decision 1)
- [x] Decide the brief's wording corrections: copy the site as it stands for now (open decision 2)
- [x] Copy the images the home page uses into `public/images/`
- [x] Export `constants/home/` and the home program details to `lib/data/*.json`, and put public site details in `lib/data/site.ts`
- [x] Move the foundation page from `/` to `/foundation`

Site-wide parts:

- [x] Top bar with hours, email and phone
- [x] Sticky header with logo, navigation and active link state
- [x] Mobile menu
- [x] Footer with links, programs and contact details
- [x] Floating call and WhatsApp buttons

Home sections, in page order:

- [x] Hero slider
- [x] Services
- [x] Marquee
- [x] About
- [x] Why choose
- [x] Process
- [x] Programs
- [x] FAQ
- [x] Blog
- [x] Testimonials
- [x] Call to action

Animation and checks:

- [x] Port the home page GSAP animations in `assets/js/main.js` to Framer Motion
- [x] Compare section heights against the live site at 1440, 1024, 768 and 375 px widths
- [x] Compare screenshots side by side at 1440 px, and the mobile menu at 375 px
- [x] Fix hover flicker: animate `translate`, and keep hover on a wrapper that does not move
- [x] Check for overflow from 310 to 1100 px, and fix the top bar and call to action at 310 px
- [x] **Farhan approves the home page**

Links to pages not built yet (`/about`, `/programs` and others) show a 404 until Phase 3.

## Phase 3: Remaining Pages

**Goal:** Every page in the navigation, front end only.

Shared:

- [x] `cohort.php` rebuilt as `/cohort` (not in the menu; booking buttons open `/appointment`). `snackbar.php` stays out: it is the product line.
- [x] Page banner section
- [x] Export `constants/about.php`, `constants/inner.php` and `constants/programs/` to `lib/data/*.json`

Pages:

- [x] About (`/about`): story, doctors, mission
- [x] Programs (`/programs`)
- [x] Program detail (`/programs/[slug]`): Diabetes, Female Hormone Health, Gut Health, Weight and Lifestyle
- [x] Pricing (`/pricing`), with no program fees published
- [x] Blog (`/blog`)
- [x] Contact (`/contact`)
- [x] Book Appointment (`/appointment`): form and slot picker UI, no payment yet, fee shown as ₹800

Site-wide:

- [x] Page titles and descriptions, carried over from PHP
- [x] 301 redirects from each `.php` page in the navigation, and `program.php`, to its new route
- [x] Branded 404 page. The wording is a placeholder: check it against brief section 3.

Checks:

- [x] Compare section heights on every page against live at 1440, 768 and 375 px widths
- [x] Compare screenshots at 1440 px, for About, program detail, Pricing, Contact and Book Appointment
- [x] Check for overflow at 310 px on every page
- [x] Search the new site for program fees and the product line
- [x] Confirm "PMOS" is unchanged
- [x] Check every internal route used by the navigation, footer and buttons returns 200
- [ ] Mobile PageSpeed of 80+, LCP under 2.5 s, INP under 200 ms, CLS under 0.1 (needs a deployed site)
- [ ] Confirm written consent for client names and photos in testimonials
- [ ] **Farhan approves the complete front end**

Known preview limits, removed in Phase 4:

- The slot picker shows every slot in the weekly hours as open.
- The pay button only shows a notice.

## Phase 4: Payments and Booking

**Goal:** The booking flow works exactly as it does on PHP. Do not change the order of steps.

Clean-up from Phases 1 to 3:

- [x] Folders by page: `components/<page>`, `constants/<page>`. Component files in PascalCase.
- [x] Remove unused code: foundation page, unused shadcn parts, `lib/`
- [x] Brand manifest in `constants/brand.ts`, used by the header, footer, SEO metadata and `app/manifest.ts`
- [x] Spacing on the 4px Tailwind scale. Form fields 48px high with one shared style.
- [x] Short `docs/RULES.md`

Setup:

- [x] `.env.local` with Razorpay test keys, fee and Apps Script values from the PHP site
- [x] `DATABASE_URL` placeholder in `.env.local`
- [x] Migration `db/migrations/001_initial.sql`: `profiles`, `appointments`, `set_updated_at` trigger
- [x] Neon Auth is on and `DATABASE_URL` is set (run the migration: see Phase 6)
- [ ] Choose hosting and confirm it runs Next.js (open decision 5)

Slots:

- [x] Weekly hours, 15-minute steps, 45-minute blocking, 30-day window (`features/appointment/utils/`, rules in `docs/appointment-rules.md`)
- [x] A pending booking holds its slot for 15 minutes
- [x] Slot picker reads open times from the zustand store (the `/api/slots` route stays for the database phase)
- [x] Respect slots hidden by the admin (done in Phase 9)

Payment (Razorpay Standard Checkout):

- [x] Create the order on the server, with the fee from the server
- [x] Checkout closes before the hold ends, so a payment cannot land on an expired hold
- [x] Handle cancel, payment failure, script load failure and double clicks
- [x] Verify the payment signature on the server, then confirm the booking
- [x] Webhook `/api/payments/webhook` for `payment.captured`, in case the browser closes after paying
- [ ] Add the webhook URL and secret in the Razorpay dashboard once the site has a public URL (see Handover and go-live)

After payment:

- [x] `/appointment-confirmed` with booking details and the questionnaire
- [x] Validate and save questionnaire answers on the appointment
- [x] Create the Meet link through the existing Apps Script and save it
- [x] Show the Meet link, with loading and error states
- [ ] `/appointment-thank-you` (PHP page has no content beyond a redirect; confirm it is still needed)

Checks:

- [x] Razorpay test keys create an order
- [x] Server checks: bad input, bad signature, dates outside the window
- [ ] Full booking in Razorpay test mode (needs the database)
- [ ] Meet link creation end to end (needs the database; creates a real calendar event)
- [ ] Test a failed payment, a cancelled checkout and a Meet failure
- [ ] **Farhan approves the booking flow**

## Phase 5: Admin Panel

**Goal:** An admin panel that copies the Deccan Dentics admin UI, including Patients, in Eat Rrite colours and fonts.

Admin UI (front end, sample data):

- [x] Port the Deccan admin shell: sidebar, collapse, header, breadcrumbs, search, user menu, mobile sheet
- [x] Password dialog on entry (`eatrrite@1234`, front end only for now)
- [x] Dashboard: stats, appointments chart, filters, today's to-do list with add and delete, today's appointments, recent patients
- [x] Patients: table, age and status filters, details card, add, edit, delete
- [x] Appointments: table, filters, details card, add, edit, delete, confirm and toasts
- [x] Calendar: month, week and day views, day details, add and edit from the calendar
- [x] Schedule: weekly hours with multiple time slots, set to the current consultation hours
- [x] Account and Settings pages
- [x] Deccan button styles for every shadcn Button variant, in Eat Rrite colours
- [x] Admin theme scoped to admin pages, so the public site keeps its approved look
- [x] Replace dental sample data and wording with consultation data
- [x] Admin colours from the sidebar illustration (teal, gold, leaf green, coral) on card icons, avatars, status badges, calendar blocks and chart dots, using existing theme tokens (`constants/admin/tones.ts`, `statusTones.ts`)
- [x] Dialog footer fixed at the bottom in every dialog (root fix in `components/ui/dialog.tsx`); the dialog scrolls, header and footer stay in view
- [x] Appointment form redesigned: three-step stepper, tap-to-select answers, review and Meet link step, "what's missing" hint, compact on phones
- [x] Appointment settings in one file (`features/appointment/constants/appointment-settings.ts`) and the real Eat Rrite hours per weekday (`eatrrite-available-times.ts`), as in the PHP site
- [x] Slot logic rebuilt as small single-purpose functions (`features/appointment/utils/`), checked with `bun run check:rules`
- [x] Admin schedule page shows the real hours, from the same constant; the appointment form offers only working-hour times and blocks overlaps (zustand `saveAppointment`)
- [x] `docs/appointment-rules.md` lists all booking rules and settings
- [x] Website booking end to end on zustand: slots from the store, 15-minute hold, Razorpay test payment (₹800), signature check, lead and appointment saved, duplicate and failure handling (`bun run check:booking`)
- [x] Questionnaire after payment (same questions as the admin step 2, plus age and gender), saved on the appointment as key and answer, then the placeholder Meet link
- [x] Toast on every public action through the shared `useShowToast` hook, with `<Toaster />` on the public site
- [ ] Pay with the Razorpay test card in the browser and confirm the booking appears in the admin (not yet done by hand)
- [x] Questionnaire: name starts as typed at booking (editable, saved to the lead), every question numbered with larger text, and a progress toast ("3 of 8 answered" with a bar) after each answer
- [x] Questionnaire polish: Submit at the right end, progress toast at the bottom right clear of the float buttons, and the confirmation panel scrolled into view and focused after submit (the page shrinks when the long form is replaced)
- [x] Calendar month cells show one dot per appointment. Upcoming (gold) dots were missing because the dot list still held the old tones
- [x] Calendar details sheet reads the live appointment by id, so an edit shows at once (it used to keep the copy it was opened with)
- [x] Edit appointment form: "Save changes" replaces Continue, the steps above are free tabs, and saving needs only the booking details, so a website booking with no questionnaire yet can still be cancelled or updated. New appointments keep the three steps
- [x] An untouched questionnaire stays empty when an appointment is saved (it no longer gets name, age and gender added, which made it look submitted)
- [x] No clinic wording anywhere: `ClinicAppointment*` became `Appointment`, `AppointmentInput`, `AppointmentStatus`; `ClinicTodo` became `Todo`; the store is `useAdminStore` in `stores/useAdminStore.ts`; "visit", "branch" and "treatment" became appointment, location and service; code comments no longer name another brand
- [x] Top bar, footer and contact page hours come from the store (`components/layout/WorkingHours.tsx`), so a change on the admin Schedule page shows on the website
- [x] Hero background is an embla carousel (same `useEmblaCarousel` + Autoplay pattern as the testimonials): slides sideways with a blur that clears as each image arrives, every 5 seconds, looping. Previous and next arrows stacked on the right edge, vertically centred, shown from tablet width up (`components/home/HeroSlides.tsx`)
- [x] Calendar week and day blocks no longer cut off their text or status badge. The block was 32px tall (a 30-minute call at 64px per hour) with about 60px of content, and the theme's 1.7 line height on small text made it worse. Blocks now span the 45 minutes an appointment reserves (48px, the same span the booking rules block) and show name plus time and service
- [x] Pointer cursor on every button, chip and option from one rule in `app/globals.css`
- [x] One eyebrow style everywhere: the handwritten `type-eyebrow` from the home page, now on every section heading in the public pages, the confirmation page and the admin page headers
- [x] All appointment code moved into `features/appointment/` (components, hooks, services, constants, types, utils, stores); behaviour unchanged
- [x] Sidebar illustration replaced with an Eat Rrite nutritionist one

Connect to Neon (done in Phase 6):

- [x] Admin sign-in with Neon Auth; access by an admin email list (`ADMIN_EMAILS`), as profiles have no role in V1. Front-end password removed.
- [x] `er_leads` table, and `er_appointments.lead_id` links each appointment to its lead
- [x] Create or match a lead from each public booking (by phone)
- [x] Read and update real leads and appointments instead of sample data
- [x] Hide or show single slots (done in Phase 9, `er_hidden_slots`)
- [x] Save the weekly schedule and use it for public booking slots
- [x] Save to-dos and settings (`er_todos`, `er_settings`)
- [ ] Test that logged-out visitors cannot reach any admin page or action (needs `NEON_AUTH_BASE_URL` set)

Emails (moved from Phase 4):

- [x] Customer email with the questionnaire link after payment (built in Phase 9)
- [x] Customer email with the Meet link, and the admin booking email (built in Phase 9)
- [x] Questionnaire reminders at 1, 3, 6, 12, 24, 30 and 36 hours, stopping once the form is submitted (built in Phase 9)
- [x] Email templates: Eat Rrite layout with the embedded logo, phone layout, subjects with the date and time (`features/appointment/emails/`)
- [ ] Confirmation page wording about emails, once emails are tested

- [ ] **Farhan approves the admin panel**

## Home Page Redesign (Deccan Dentics style)

- [x] Keep header, hero and marquee unchanged; keep all home copy
- [x] Programs tabs, founder, why choose, process, program cards, FAQ picker, blog, testimonials carousel and call to action rebuilt in the Deccan layout
- [x] Slide, fade and blur reveal on every element
- [x] Floating food icons behind sections (desktop only)
- [x] No overflow at 320 and 375 px
- [x] Fonts switched to the Deccan set: Libre Baskerville (headings), Merriweather (body), Caveat (handwritten accents)
- [x] Light footer in the Deccan layout, using the normal logo
- [x] About, Programs, program detail, Pricing, Blog, Contact, Book Appointment, confirmation and 404 pages in the same section style
- [x] Contact page enquiry form in the Deccan style (name, phone, city, program, message)
- [x] Header shrinks into a floating pill on scroll (Pico style), with an animated mobile menu
- [x] Hero left side in the Deccan style: eyebrow, gold title words with brush mark, four Eat Rrite points with Lucide icons, trust card
- [x] Hero and header buttons use shadcn Buttons, with a new gold `accent` variant
- [x] Header and hero checked at 1440, 375 and 320 px, with no overflow
- [x] Header pill sits 12px below the top on scroll, with a see-through glass blur
- [x] About menu item opens a dropdown: Founder's Story (`/about`) and Doctors on Board (`/about/doctors`)
- [x] Doctors section moved to its own page; About keeps the story and mission sections
- [x] Three more client reviews from Eat Rrite's Google reviews (Jayawardhan Suryaprakash, Omkar Nath, Anshul Kundu), shown with initials since there are no photos
- [ ] Connect the contact form (backend and the consent box the brief asks for)
- [ ] Swap the floating icons for real cut-out food images, if wanted
- [ ] **Mukta approves the redesign** (the brief asked for no redesign)

## Phase 6: Neon Database and Auth

**Goal:** Everything the site and admin show and save lives in Neon. Admin sign-in with Neon Auth. Details in `database.md`.

- [x] One migration, `db/migrations/001_initial.sql`: `er_profiles`, `er_settings`, `er_schedule_slots`, `er_services`, `er_questions`, `er_leads`, `er_appointments`, `er_slot_holds`, `er_todos`, one `er_set_updated_at` trigger, foreign keys, starting rows (PHP settings, hours, services, questionnaire)
- [x] Neon Auth in `features/auth/`: server instance, sign-in, sign-up and sign-out actions, admin email check (`ADMIN_EMAILS`), profile row on first sign-in, `/admin/login` and `/admin/signup`, `proxy.ts` guard, `/api/auth/[...path]`
- [x] Front-end admin password removed
- [x] Admin data from Neon (`features/admin/`): leads, appointments, schedule, to-dos, preferences, booking settings, services and questions; every change saved through a server action, undone with a toast if it fails
- [x] Dashboard and calendar use today's date in India and the fee from `er_settings`; the chart counts real appointments
- [x] Public booking on Neon: slots, holds, order, payment verification, lead and appointment, questionnaire, placeholder Meet link
- [x] Working hours in the top bar, footer and contact page, and the booking page's fee, hours and services, read from Neon
- [x] Production build passes; `check:rules` (15) and `check:booking` (7) pass
- [x] Run the migration: `bun run db:migrate` (the Neon SQL Editor splits the file and fails on the questionnaire insert)
- [x] Set `NEON_AUTH_BASE_URL` in `.env.local` (Neon Console → Settings → Better Auth → Project Info)
- [x] Restart the dev server, open `/admin/signup` and create the admin account with the admin email
- [ ] Test end to end: sign in, add a lead and appointment, change the schedule, book and pay on the website, fill the questionnaire

## Phase 7: Empty, Loading and Error States

- [x] Illustration sheet cut into `public/images/empty-states/` (appointments, leads, todos, today, chart, search, questionnaire, slots, error); the sheet kept in `docs/assets/`
- [x] `EmptyState` in tables (none yet vs. no match), detail cards, calendar day panel, dashboard cards, chart with no data, questionnaire not filled, slot picker
- [x] Every save waits with a "Saving…" toast that turns into the result (admin store, appointment form, booking payment, questionnaire)
- [x] `LoadingState` while the admin, booking page and confirmation page wait for Neon
- [x] `error.tsx` for the public site, the admin and admin pages, with a Try again button
- [ ] Check the admin toasts in the browser after signing in

## Phase 8: SEO and PHP Pages

- [x] Titles and descriptions match the PHP pages
- [x] `sitemap.xml`, `robots.txt` (admin, API and the confirmation page blocked), canonical on every public page, `lang="en-IN"`
- [x] Old `.php` addresses for cohort, thank-you and confirmed pages redirect
- [x] Admin sidebar picture only uses space left under the menu; the top bar shows from `lg` up

## Phase 9: What the PHP Site Has That Next.js Still Needs

Details in `requirements.md` (What the PHP Site Has That Next.js Still Needs).

- [x] Real Google Meet link through the PHP Apps Script (placeholder only when it is not configured) (`meetLink.ts`)
- [x] Emails over SMTP, same templates as PHP: questionnaire link after payment, Meet link to the customer and booking to the team after the questionnaire (`services/mailer.ts`, `features/appointment/emails/`)
- [x] Questionnaire reminder emails at 1, 3, 6, 12, 24, 30 and 36 hours, from `GET /api/cron/questionnaire-reminders` (Bearer `CRON_SECRET`)
- [x] Admin hides and shows single slots (calendar day panel, "Website slots"); the website skips hidden slots
- [x] Admin cancels a booking and the slot is freed (status Cancelled, or Delete)
- [x] Razorpay webhook records a paid booking even if the tab was closed (`POST /api/payments/webhook`; the hold keeps the order and details)
- [x] PHP-parity schema (hidden slots, hold order and details, `paid_at`, `reminders_sent`, to-do date) folded into `001_initial.sql`
- [x] New Apps Script `apps-script/Code.gs` (Meet only, one event per appointment); the admin Meet button uses it too
- [x] Deploy `apps-script/Code.gs` for development (on Farhan's Google account; moves to the client account at handover)
- [ ] Schedule the reminder route every 15 minutes on the host (see Handover and go-live)
- [ ] Add the webhook in the Razorpay dashboard (see Handover and go-live)
- [ ] Send one test booking and check the three emails arrive (see Handover and go-live)

## Phase 10: To-Dos and Pagination

- [x] To-do filters: day (all to-dos by default, today, yesterday, pick a date with a single-date calendar) and status (pending, completed)
- [x] Each to-do has a ⋮ menu: Edit (same dialog, label filled in) and Delete (confirm dialog), as for leads and appointments
- [x] shadcn Pagination (`components/ui/pagination.tsx`), one small pager `ListPagination` at the bottom right of the to-dos, leads, appointments and today's appointments; `usePagination` goes back to page 1 when filters change
- [x] Account page: Edit profile (name, mobile, address; email locked as the login) and Reset password; login page "Forgot password?" with `/admin/forgot-password` and `/admin/reset-password` (Neon Auth email link)
- [ ] Test the password reset email end to end on the deployed site (needs the Neon Auth email provider and the trusted domain)
- [x] Hero: three slides, each with its own headline, about the same length and one size, revealed letter by letter (slide, fade, blur) and held 5 seconds: dal-chawal ("Lose Weight with the Food You Already Love, Without Losing Your Dal-Chawal.", to confirm with Mukta), diabetes ("Manage or Reverse Your Diabetes Without Quitting Roti, Rice or Potatoes!"), hormones ("Lose Weight & Manage PMOS or Perimenopause Without Quitting Dal-Chawal or Roti."); one clock for picture and headline (`HeroSlideProvider`), copy in `constants/home/content.json`
- [x] Leads and appointments: 20 rows per page, compact on phones, tables scroll sideways under `lg`; every admin page checked at 375px
- [x] Bulk select on Leads and Appointments: tick boxes (shadcn Checkbox), a header box for the current page, ticks kept across pages (`useBulkSelection`), a floating bar with Delete all (both) and Mark as completed (appointments; cancelled and completed ones are skipped), each behind a confirmation that gives the counts (`features/admin/services/bulkActions.ts`)
- [x] Cohort application form: left out, `/cohort` books the normal consultation
- [x] Snackbar page and orders: left out on purpose (product line)

## Phase 12: Colour Pass (client feedback)

Mukta: "the whole site has become too green … use beige with hues of gold … check my LinkedIn banner". Details in `requirements.md` (Colour pass).

- [x] Palette from the banner: `beige` `#f8f2e7`, `beige-deep` `#efe5d2`, `accent-deep` `#9a6f1e` (gold readable as text)
- [x] Same palette in the admin (page, sidebar, panels, table header, gold eyebrows), the admin sign-in pages, the booking slot picker and the emails; mint removed from the project
- [x] Every page alternates white and beige sections (`PageSection tone="beige"`); no two beige sections touch; the footer is deeper beige
- [x] Gold on every section heading (eyebrow, rule, numbers), page banners, icon circles, chips, quote and form cards, "Most Popular"
- [ ] Show Mukta on staging and adjust shades if she wants

## Phase 13: Home Page Speed and Accessibility (Lighthouse, mobile)

- [x] Accessibility 100 on the home page (and About, Pricing): the star rating is `role="img"`
- [x] Local production build, Lighthouse mobile: Performance 44 to 82 (blocking time 3,000 ms to about 20 ms); LCP in the real browser 0.2 s, 4.9 s in Lighthouse's simulated slow 4G
- [x] Scroll reveals in plain CSS and one shared IntersectionObserver (`components/motion/Appear.tsx`) instead of Framer Motion; hero entrance in CSS (`.hero-rise`); Framer Motion's animation code (header, floating food) loads after first paint (`MotionProvider`)
- [x] GSAP (Programs scroll) loads only when the section is near the screen (`programsMotion.ts`); the toast library mounts after the page loads (`LazyToaster`)
- [x] Hero: only the first picture is in the page at load (`fetchPriority="high"`); the others are added after load; logo `sizes`; no automatic prefetch from the header and hero; Caveat not preloaded; below-fold sections use `content-visibility: auto` (`PageSection defer`)
- [ ] Performance 90+ would need less up-front weight (fonts about 200 KB, framework and UI script about 330 KB): self-hosted trimmed fonts, fewer Base UI parts, a lighter hero

## Phase 11: Admin Payments, Questionnaire Link and List Tools

- [x] `payment_done` on appointments (`003_payment_status.sql` for an existing database; existing bookings marked paid): Paid/Due in the appointment form, "Payment due" badge on the list and calendar cards, "Mark as paid" in the details, payment filter; the confirmation page says "Payment received" only when paid
- [x] Questionnaire optional when the admin adds an appointment; unfinished answers are not saved. The details show a copyable questionnaire link while it is empty; the confirmation page opens admin-added bookings too, and sending it keeps a Meet link the admin already made
- [x] Dashboard cards: Appointments Upcoming, Appointments Completed, Due Payments, Revenue (paid × fee, by `paid_at`); admin data reloads when the tab regains focus (at most every 15 seconds)
- [x] Leads and Appointments: one date filter (All dates, Today, This week, This month, Custom range) shared in `components/shared/DateFilter.tsx`; sort (appointments: recently edited, date oldest or newest; leads: newest or oldest added); search on the left, filters on the right; toolbar stays pinned while the list scrolls (`StickyToolbar`)
- [x] "Add lead" and "Add appointment" in the page header (`AddRecordButton`, `AdminPageHeader` actions)
- [x] Details panel: two-way sticky beside the list, no scrollbar of its own (`useDetailsPanel`)
- [x] Time dropdown no longer warns about switching from uncontrolled to controlled (`TimeSelect` uses `null` for no time)
- [x] Seed bookings are never dated in the future (`002_dashboard_seed.sql`)
- [x] `payment_status` (`paid`, `due`, `refunded`) replaces `payment_done` (`004_payment_status_refunded.sql`): Paid/Due/Refunded in the form and filter, "Mark as refunded" in the details of a cancelled booking that was paid; Revenue counts only `paid`
- [x] Run `004_payment_status_refunded.sql` on the dev database (the admin needs `payment_status`)
- [ ] On the dev database, move sample rows dated in the future back to now, so the dashboard counts them (SQL in `database.md`, step 5)


---

# Client Brief Checklist

Copied from the Notion page "Eat Rrite: Phase 1 and Phase 2 checklist" (Mukta's developer brief, 31 Oct 2026). Two fixed-fee phases. Ticks match Notion; *Note:* lines say where the code is ahead of or behind a tick. Keep this list and Notion in step.

## Ground rules (both phases)

- No changes to design, fonts, colours, logo (or where it sits), layout or existing text, except the fixes listed here. Use the brief's copy-paste wording exactly.
- Keep the ₹800 consultation confirmation fee. Program fees stay unpublished.
- Keep "PMOS" (official new name for PCOS/PCOD, May 2026).
- Never mention the product line anywhere.
- Client names, photos and stories only with written consent on file. Never use WhatsApp chat screenshots.
- Handles: Instagram @muktapatil01 and @eatrrite, LinkedIn linkedin.com/in/19muktapatil, YouTube, Medium.
- No health information or personal data in tracking events or URLs.
- Every change must serve Visibility, Trust or Client turnover. If it helps none of them, leave it out.

## Phase 1: Content, page fixes, SEO, redirects and slugs (₹5,000)

**1.1 Setup**
- [ ] Work in a staging copy, keep a backup of the current live site, and show Mukta before going live

**1.2 Old website clean-up: 301 redirects (brief §3)**
- [ ] Get the full list of old addresses from the old sitemap, the hosting files and Search Console's "Pages" report (404 errors), and add every one to the redirect table (`config/redirects.ts`)
- [x] /founder-profile.php → /about (credentials and story moved onto About first)
- [x] /nutricare-for-mom-to-be.php (broken) → Female Hormone Health page
- [ ] Old "Post Natal NutriCare & Weight Loss" page → Female Hormone Health page (find the exact address in the old sitemap)
- [ ] Old "Weight & Lifestyle Management Program" page → new Weight program page
- [ ] Old "Diabetes Management And Reversal Diet Plan" page → new Diabetes program page
- [ ] Old "Gut Health Diet Program" page → new Gut Health page
- [ ] Old "Female Hormone Health Diet Program" page → new Female Hormone Health page
- [ ] Old "Celiac And Crohn's Disease" page → new Gut Health page
- [x] /index.php → / (one homepage address only)
- [ ] http:// (any page) → https:// (same page), on the host at launch
- [x] www.eatrrite.com is the one address; eatrrite.com redirects to it site-wide
- [x] Every redirect is a permanent 301 at server level (Next.js `redirects()`), never JavaScript
- [ ] Delete old pages from the server once they redirect, so no two versions of the same content stay live
- [x] Branded 404 page: logo, "This page has moved", links to Programs, Book a Consultation and WhatsApp

**1.3 Clean web addresses / slugs (brief §6.3)**
- [x] /about.php → /about
- [x] /programs.php → /programs
- [x] /program.php?slug=weight-lifestyle-management → /programs/weight-loss-indian-food
- [x] /program.php?slug=diabetes-management → /programs/diabetes-diet-plan
- [x] /program.php?slug=gut-health → /programs/gut-health-diet
- [x] /program.php?slug=female-hormone-health → /programs/female-hormone-health
- [x] /pricing.php → /pricing
- [x] /appointment.php → /book
- [x] /contact.php → /contact
- [x] /blog.php → /blog (articles at /blog/article-name)
- [x] New page address: /media
- [x] Every old address 301-redirects to its new one, and all internal links point to the new addresses

**1.4 Site-wide fixes (brief §4)**
- [x] Header: phone as tap-to-call (tel:+919639877483) and email as tap-to-mail (mailto:info@eatrrite.com)
- [ ] Header: ☰ menu button gets the accessible label "Open menu"; check it opens on every page on iPhone and Android
- [x] Header and footer hours line: "Consultations by appointment · Mon–Sun" (exact slots stay on the booking page)
- [x] Mobile: sticky bottom bar with WhatsApp and Book Appointment. Desktop: small floating WhatsApp button bottom-right
- [x] Replace the raw WhatsApp address on Pricing and Contact with the WhatsApp button
- [x] Pre-fill the WhatsApp message per page, so each enquiry shows its source page
- [ ] Footer: social icons for Instagram @muktapatil01, Instagram @eatrrite, LinkedIn, YouTube, Medium (and Facebook if the page exists). *Note:* both Instagrams, LinkedIn and Medium are live; YouTube and Facebook wait for Mukta's links
- [x] Footer: copyright year updates automatically
- [x] Footer disclaimer line: "General guidance, not medical advice. With a medical condition, follow your doctor."
- [x] Remove the stray "meta-description / meta-viewport / title" text on About and Booking
- [x] Favicon (logo mark): 16/32/48 favicon on a white tile, 512 icon, 180 Apple icon, 192/512 and maskable manifest icons, all from the full (uncut) tree mark; share previews use the deployment's own address (`SITE_URL`)
- [x] Open Graph share preview on every page: title, description and 1200×630 image. *Note:* the image is a branded logo card (`public/images/og/eatrrite-share.jpg`: logo, "Holistic Nutrition and Wellbeing", www.eatrrite.com), so WhatsApp, Facebook, LinkedIn, X and Slack show the logo, not a food photo

**1.5 Home page (brief §5.1)**
- [x] Delete the repeated H3 "Where Food Becomes Medicine"
- [x] Stat label "Stories / Real Client Stories" → Client Stories
- [x] Program cards: visible "Learn More" plus a hidden label per card ("Learn more about …")
- [ ] Blog cards: hide the section until Media articles are live, then show the 3 latest with full dates, each linking to its own article. *Note:* hidden; showing the latest 3 waits for the articles
- [x] FAQ illustration alt text: "Mukta Patil answering common nutrition questions"
- [x] FAQ questions as H3 headings (no text change)
- [ ] Link the "4.8★ Google Rating" stat to the Google reviews page (needs the link from Mukta)
- [x] Testimonial names: H4 tags → plain bold text
- [x] Credentials strip under the hero, linking to About › Credentials & Media

**1.6 About page (brief §5.1, §5.2)**
- [x] Typo fixes: "everyone and every symptom", "remains unchanged", "no generalisation, ever!", "well-nourished"
- [x] "Our Story" and "What guides us" as H2 headings
- [x] New Credentials & Media section below the story, pasted exactly from the brief
- [x] Highlights row: "Since 2018 · Clients in 10+ countries · Yoga Alliance RYT-200 · Global Sustainability Award 2024 (SDG-3)"
- [x] Featured in row (plain text, no newspaper logos)
- [x] Spoken at row
- [x] Row of 6 "Read" cards, each opening in a new tab
- [ ] Event photos from Drive › Eat Rrite Photo Library › 03 Talks, Sessions & Events, each with alt text naming the event (needs captions from Mukta)

**1.7 Program pages, all four (brief §5.1)**
- [x] The second heading that repeats the H1 becomes a styled subtitle
- [x] "About the Program" and "Packages" as H2 headings
- [x] Unique alt text for every image
- [x] Breadcrumb "Program" → "Programs"
- [x] Female Hormone Health meta description from the brief
- [x] Every program page ends with one line from Mukta, Book a Consultation and WhatsApp

**1.8 Pricing, Booking, Contact, Blog (brief §5.1)**
- [x] Pricing: remove the stray duplicate "Pricing" line
- [x] Pricing: "Most Popular" label on the 90-Day card
- [x] Pricing: hero image alt text
- [x] Booking: "Book Appointment" is the only H1; "Reserve your slot" is an H2
- [x] Booking: line under the pay button: "After payment you'll get a short questionnaire. Your Google Meet link follows on WhatsApp and email."
- [x] Booking: service dropdown names match the footer program names
- [x] Booking: consent tick box (not pre-ticked) with a link to the Privacy Policy
- [x] Contact: tap-to-call, tap-to-mail and the WhatsApp button
- [x] Contact: alt text on the hero image and header logo
- [x] Blog: the 3 placeholder posts removed

**1.9 Google and Bing tools (brief §6.1)**
- [ ] Verify the site in Google Search Console on marketing.eatrrite@gmail.com; add Mukta as owner
- [ ] Submit /sitemap.xml, then URL Inspection → "Request indexing" for Home, About, Programs and each program page
- [ ] Verify in Bing Webmaster Tools (import from Search Console)

**1.10 Page titles and descriptions (brief §6.2)**
- [x] Home, About, Programs, the four program pages, Pricing, Booking, Contact, Blog and Media use the brief's titles and descriptions (`utils/seo.ts`)
- [x] Every page has a unique title, a unique description and exactly one H1
- [x] Online, worldwide brand: no city names and no "coaching" in any title or description. Home title is Mukta's answer from Notion ("Eat Rrite | Holistic Nutrition and Wellbeing"), its description the credentials line

**1.11 Technical SEO (brief §6.5)**
- [x] /sitemap.xml lists only live, final pages and updates itself
- [x] /robots.txt allows public pages, points to the sitemap, blocks /thank-you and the admin
- [x] Self-referencing canonical on every page
- [ ] HTTPS on every page with no mixed-content warnings (check on the host)
- [ ] Thank-you page and ad-only landing pages set to noindex
- [x] lang="en-IN" on every page
- [x] Image files named by content
- [ ] Internal links: every program page links to 2–3 related articles and back to Book; every article links to its program (needs the articles)

**1.12 Structured data, JSON-LD (brief §6.4, §5.2)** — test each with Google's Rich Results Test
- [x] Organization / ProfessionalService site-wide
- [x] Person on About (jobTitle, worksFor, alumniOf, hasCredential, award, sameAs and article links)
- [ ] FAQPage on Home and each program page. *Note:* Home is done; program pages still need it
- [x] Service on each program page
- [x] BreadcrumbList on all inner pages
- [x] Review / AggregateRating only once real Google reviews exist (none added)

**1.13 Keywords each page should own (brief §6.6)**
- [ ] Home: "online nutritionist India"; also Indian food, holistic nutrition, Mukta Patil
- [x] About: "Mukta Patil nutritionist"
- [x] Weight: "weight loss with Indian food"
- [x] Diabetes: "diabetes diet plan Indian"
- [x] Gut Health: "gut health diet"
- [x] Female Hormone / PMOS: "PMOS diet"

## Phase 2: Automation, integrations, media content, speed and ads (₹5,000)

**2.1 Media page and old newspaper articles (brief §5.3)**
- [ ] Before publishing: check Mukta's agreement with The New Indian Express allows full reprints. If unsure, publish the clipping, a 3–4 line summary and the e-paper link instead
- [ ] /blog/mind-your-calories: "Mind your calories", 22 Aug 2019 (Press 003)
- [ ] /blog/a-z-of-child-nutrition: "The A–Z of child nutrition", 12 Sep 2019 (Press 002, also 004)
- [ ] /blog/blueprint-for-good-health: "The blueprint for good health", 10 Oct 2019 (Press 001)
- [ ] /blog/should-you-try-the-latest-diets: "Should you try out the latest diets?", 31 Oct 2019 (Press 006, also 011)
- [ ] /blog/can-detox-diets-flush-out-toxins: 2019, date to confirm (Press 010)
- [ ] /blog/macro-micro-nutrient-balance: 2019, date to confirm (Press 009, also 005)
- [ ] /blog/good-cholesterol-bad-cholesterol: 2019, date to confirm (Press 008)
- [ ] /blog/homecooked-food-first-step-to-health: 2019, date to confirm (Press 007)
- [ ] Each article: title as H1, then "First published in The New Indian Express, 'Body Basics' column, [date]."
- [ ] Each article: clipping image with alt text "Mukta Patil's column in The New Indian Express, [date]"
- [ ] Each article: full text typed out exactly as printed, subheadings as H2
- [ ] Each article: author box with Mukta's photo, name, "Nutritionist, Yoga Teacher & Life Coach" and a link to About
- [ ] Each article: link to the original e-paper page where known (10 Oct 2019 /c/44513938 · 12 Sep 2019 /c/43504147 · 31 Oct 2019 /c/45224864)
- [ ] Each article: related program card, then Book Appointment and WhatsApp
- [ ] Each article: Article structured data with author Mukta Patil and the original datePublished
- [ ] /media page: grid of the 8 articles (clipping thumbnail, title, date)
- [ ] /media page: "In the news" row for the 2023 Dehradun coverage (Press 012 and 013)
- [ ] /media page: "Online articles and interviews" list with the six Read-card links (link only)

**2.2 Reviews, testimonials and social integrations (brief §5.4, §5.5, §8.1)**
- [ ] Google Business Profile managed from the marketing account (or created: online service-area business for Hyderabad and Dehradun, category Nutritionist) before the 4.8★ rating stays on the site
- [ ] Google Business Profile links to the website and booking page; the website links back to it
- [ ] Google reviews widget: live rating, latest reviews, "See all reviews on Google" link
- [ ] YouTube client testimonial videos with click-to-load thumbnails and VideoObject structured data
- [ ] Instagram feed: latest 6 posts on Home and /media, lazy-loaded
- [ ] YouTube "Latest videos" block on /media with a Subscribe button
- [ ] LinkedIn and Medium linked in the footer and the article author box
- [ ] Every social profile's bio link points to the website with UTM tags
- [ ] Reply to every Google review (process set up with Mukta)
- [ ] Anju's testimonial ("Anju, Madrid, Spain · Weight & gut health · 2025"), only once her written consent is on file
- [ ] Written testimonials use: quote · first name · city/country · program · month and year, only with written consent

**2.3 Booking and conversion flow (brief §5.1 Booking, §9)** — target: three taps to a booking from any page
- [ ] Test that booking dates and slots load and can be picked on iPhone Safari and Android Chrome
- [ ] Mobile number field with a country code picker (+91 default)
- [ ] Show slots in the visitor's own time zone with IST beside them (NRI clients)
- [ ] If a day has no slots, show the next available day instead of a blank calendar
- [ ] Short forms only: no health questions on the booking form (they belong in the questionnaire)
- [ ] Booking form flow: program, name, email, mobile (country code), slot in own time zone, consent tick, then ₹800 payment
- [ ] /thank-you page after payment: slot confirmed, "Add to calendar", what to expect, WhatsApp button (counts as the booking conversion)
- [ ] Booking creates a Google Calendar event on the marketing account with the Meet link, so double-booking is impossible. *Note:* the event and Meet link are built (`apps-script/Code.gs`) but run on Farhan's account until handover
- [ ] Hidden fields capture UTM source, medium and campaign and save them with the booking
- [ ] Contact page: connect the form (name, phone, city, program of interest) with a consent tick box. *Note:* the form UI exists; it is not connected yet
- [ ] "Not ready yet?" guide pages for name + WhatsApp number (with consent): /guides/diwali, /guides/sugar-sense, /guides/midlife

**2.4 WhatsApp and email automation (brief §5.4, §9)**
- [ ] Connect the WhatsApp Business API through Mukta's chosen provider (Interakt, WATI or AiSensy)
- [ ] Automatic WhatsApp and email confirmation after booking, with the questionnaire link. *Note:* email is built; WhatsApp waits for the provider
- [ ] Questionnaire done → Google Meet link on WhatsApp and email. *Note:* email is built; WhatsApp waits for the provider
- [ ] WhatsApp reminders 24 hours and 1 hour before the consultation
- [ ] When a program ends, automatic WhatsApp asking for a Google review with the direct link

**2.5 Legal pages, privacy and consent (brief §8.3, §8.4; Mukta's lawyer checks final wording)**
- [ ] Privacy Policy: data collected, why, who it is shared with, retention, withdrawing consent or deletion, complaints contact. *Note:* `/privacy-policy` is live from the brief; the lawyer still has to check it
- [ ] Terms of Service page
- [ ] Cancellation & Reschedule Policy page
- [ ] Disclaimer page (general guidance, not medical advice)
- [ ] Footer links to the legal pages
- [ ] DPDP Rules (main duties from May 2027): clear notice at every form, consent box not pre-ticked, easy way to withdraw consent
- [ ] Health questionnaire answers treated as sensitive: stored securely (not in plain email), access limited to Mukta. *Note:* answers stay in Neon and the admin; the admin email carries none
- [ ] Legal pages linked on every form
- [ ] Cookie banner with equal "Accept" and "Reject", using Google Consent Mode v2

**2.6 Ads accounts and tracking set-up (brief §5.5, §10.1)**
- [ ] Google Tag Manager on every page; all tags go through it
- [ ] GA4 on the marketing account, linked to Search Console and Google Ads
- [ ] Google Ads with conversion tag and enhanced conversions (only with consent)
- [ ] Meta Business Portfolio owned by Mukta with the Facebook Page, both Instagrams and the WhatsApp Business number
- [ ] Meta domain verification for eatrrite.com
- [ ] Meta Pixel + Conversions API (server-side)
- [ ] Consent Mode v2 and the cookie banner control all tags
- [ ] Mukta is admin on every account; the developer gets access, not ownership

**2.7 Events to track (brief §10.2)**
- [ ] page_view → GA4 · Meta PageView
- [ ] view_program → GA4 · Meta ViewContent
- [ ] click_whatsapp → GA4 · Google Ads secondary · Meta Contact
- [ ] click_call → GA4 · Google Ads secondary · Meta Contact
- [ ] start_booking → GA4 · Meta custom event
- [ ] booking_complete → GA4 key event · Google Ads primary · Meta Lead (or a neutral custom event)
- [ ] guide_signup → GA4 · Google Ads secondary · Meta Lead
- [ ] Event names and parameters never contain health information, and no personal data in URLs

**2.8 Platform health rules and ad landing pages (brief §8.2, §10.3, §10.4)**
- [ ] Once the pixel is live, check how Meta classifies eatrrite.com and tell Mukta
- [ ] Plan Google Search campaigns, not remarketing (Health in Personalized Advertising policy)
- [ ] Landing page compliance: no "cure"/"guaranteed" claims, no before/after photos, visible disclaimer, privacy policy and contact details
- [ ] If an ad is rejected for a line on the page, replace that one line only
- [ ] Landing page template, noindex: logo only, one headline matching the ad, Mukta's photo, 3 benefits, 1–2 client stories, credentials strip, FAQs, one repeated Book button, WhatsApp, brand styles
- [ ] /start/weight-loss
- [ ] /start/diabetes
- [ ] /start/pmos-perimenopause
- [ ] /start/midlife-reset
- [ ] /start/nri (time zones, online, "Indian food wherever you live")
- [ ] Each landing page loads in under 2.5 s on mobile

**2.9 UTM link tracking (brief §10.5)**
- [ ] Meta ads: ?utm_source=meta&utm_medium=paid&utm_campaign=diabetes_nov26
- [ ] Google ads: ?utm_source=google&utm_medium=cpc&utm_campaign=pmos_search, plus auto-tagging
- [ ] Instagram bio: ?utm_source=instagram&utm_medium=bio&utm_campaign=muktapatil01
- [ ] LinkedIn posts: ?utm_source=linkedin&utm_medium=post&utm_campaign=week45
- [ ] WhatsApp broadcasts: ?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=diwali26
- [ ] Campaign names describe the campaign or program, never a person's condition

**2.10 Speed, mobile and accessibility (brief §7)**
- [ ] Mobile PageSpeed for Home, one program page and Booking: Performance 80+, LCP under 2.5 s, INP under 200 ms, CLS under 0.1
- [ ] Run PageSpeed Insights before and after; share both reports with Mukta
- [ ] Images to WebP, sized to display (hero max 1600 px), lazy-load below the first screen
- [ ] Load only the site fonts, self-hosted, font-display: swap (`next/font` does this; check against the brief's font list)
- [ ] Remove unused scripts and libraries; defer non-essential JavaScript
- [ ] Caching and compression on the host; CDN if the host is outside India
- [ ] Reels and YouTube embedded with click-to-load thumbnails
- [ ] Tap targets at least 48 px apart; no text smaller than 16 px on mobile
- [ ] Text contrast at least 4.5:1 (gold for lines and buttons, not small text)
- [ ] Every form field has a visible label; forms work with iPhone autofill
- [ ] Test on iPhone Safari, Android Chrome and desktop Chrome before going live

**2.11 Blog template Mukta can post to from her iPhone (brief §11.1)**
- [ ] Each article at /blog/article-name
- [ ] Layout: H1 → author box → published and updated dates → reel near top → article with H2s → related program card → Book + WhatsApp → 2–3 related articles
- [ ] Fields per article: title, page title, description, image + alt text, category, related program
- [ ] Categories: Weight · Diabetes · Gut Health · PMOS & Hormones · Perimenopause & Menopause · Mind & Lifestyle · Yoga
- [ ] Automatic Article structured data, sitemap entry and share image per article
- [ ] Share buttons: WhatsApp, LinkedIn, Facebook, copy link
- [ ] Medium reposts point their canonical link back to eatrrite.com
- [ ] Simple admin login that works on mobile (iPhone). *Note:* the admin sign-in works on phones; article editing is not built

**2.12 After launch**
- [ ] After four weeks, check Search Console for leftover 404s and redirect them
- [ ] Monthly one-page report to Mukta: Search Console, Business Profile, GA4 by source, WhatsApp clicks and bookings by source, cost per booking once ads run, mobile speed

## Needed from Mukta (not billed; Mukta stays owner of everything)

- [ ] Access: hosting and the domain DNS for eatrrite.com
- [ ] Access: Search Console, Analytics, Tag Manager, Ads, Business Profile (all on marketing.eatrrite@gmail.com)
- [ ] Access: Meta Business Portfolio (Events Manager only)
- [ ] Access: the marketing Google account, to deploy the Apps Script there (see Handover and go-live)
- [ ] Link to the Google reviews profile (site shows 4.8★)
- [ ] Links to the YouTube client testimonial videos, and the YouTube and Facebook profile links
- [ ] Written consent from Anju (and any other client) to show a testimonial with first name and city
- [ ] Certificate images and the Global Sustainability Award
- [ ] Captions for the event photos (event, place, year)
- [ ] OK to reprint the 2019 New Indian Express columns in full
- [ ] Publication dates of the 4 undated columns
- [ ] WhatsApp automation provider choice (Interakt, WATI or AiSensy)
- [ ] Approval of the redesign (the brief asked for no redesign; see `requirements.md`, Decisions Made)

---

# Handover and Go-live

All of this is done, in this order, before the website is handed to Mukta. Details in `requirements.md` (Handover and Go-live).

**Hosting and data**
- [ ] Choose the host and confirm it runs Next.js; deploy to staging and show Mukta
- [ ] Back up the live PHP site and the database
- [ ] Set every environment variable on the host (`.env.example` lists them); secrets never go in the repo

**Google Apps Script (Meet links) on the client's account**
- [ ] The Apps Script runs on Farhan's account (itz.me.farhan6710@gmail.com) today. Deploy `apps-script/Code.gs` again on the client account, marketing.eatrrite@gmail.com: new project, Calendar advanced service on, Script Property `SECRET`, deploy as a web app (execute as me, anyone can access)
- [ ] Put the new web app URL and secret in `APPS_SCRIPT_URL` and `APPS_SCRIPT_SECRET` on the host
- [ ] Create one Meet link from the admin and one from a booking; check the event lands in the marketing account's calendar
- [ ] Remove the old deployment from Farhan's account

**Emails and reminders**
- [ ] Sending account: confirm `SMTP_*`, `MAIL_FROM` and `ADMIN_NOTIFY_EMAIL` are the client's
- [ ] Schedule `GET /api/cron/questionnaire-reminders` every 15 minutes with `Authorization: Bearer <CRON_SECRET>`
- [ ] Test the questionnaire email (after payment), at least one reminder (leave the questionnaire empty past the first hour), the Meet-link email and the admin email, on a phone and on desktop

**Razorpay live mode**
- [ ] Switch the Razorpay account to Live mode and put the live keys (`rzp_live_…`) in `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` on the host; no test keys left anywhere in production
- [ ] Add the live webhook `https://www.eatrrite.com/api/payments/webhook` (events `payment.captured`, `order.paid`) and put its secret in `RAZORPAY_WEBHOOK_SECRET`
- [ ] Turn test mode off for the site

**Final check, after everything above**
- [ ] With Mukta's agreement, make one real live-mode ₹800 booking from the website: payment, slot confirmed, questionnaire email, questionnaire, Meet link, Meet email, admin email, booking in the admin and the calendar. Refund it afterwards if Mukta wants
- [ ] Switch the domain; check old `.php` addresses redirect and HTTPS works everywhere
- [ ] Keep the PHP site available for rollback until the new site is stable
- [ ] **Mukta approves the live site**
