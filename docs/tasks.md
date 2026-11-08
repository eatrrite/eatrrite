# Eat Rrite Next.js Rebuild: Tasks

Five phases, done in order. Each phase needs approval before the next one starts. Details are in `requirements.md`.

The earlier PHP fix list from the client brief is in `php-site-tasks.md`.

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

- [ ] Decide `cohort.php` and `snackbar.php` (open decision 3). Both are left out for now.
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
- [ ] Respect slots hidden by the admin (needs the Phase 5 admin)

Payment (Razorpay Standard Checkout):

- [x] Create the order on the server, with the fee from the server
- [x] Checkout closes before the hold ends, so a payment cannot land on an expired hold
- [x] Handle cancel, payment failure, script load failure and double clicks
- [x] Verify the payment signature on the server, then confirm the booking
- [x] Webhook `/api/payments/webhook` for `payment.captured`, in case the browser closes after paying
- [ ] Add the webhook URL and secret in the Razorpay dashboard once the site has a public URL

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
- [ ] Hide or show single slots (needs a table; the slot rules already accept hidden slots)
- [x] Save the weekly schedule and use it for public booking slots
- [x] Save to-dos and settings (`er_todos`, `er_settings`)
- [ ] Test that logged-out visitors cannot reach any admin page or action (needs `NEON_AUTH_BASE_URL` set)

Emails (moved from Phase 4):

- [ ] Customer email with the questionnaire link after payment
- [ ] Customer email with the Meet link, and the admin booking email
- [ ] Questionnaire reminders at 1, 3, 6, 12, 24, 30 and 36 hours, stopping once the form is submitted
- [ ] Confirmation page wording about emails, once emails are sent

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
- [ ] Run the migration: `bun run db:migrate` (the Neon SQL Editor splits the file and fails on the questionnaire insert)
- [ ] Set `NEON_AUTH_BASE_URL` in `.env.local` (Neon Console → Settings → Better Auth → Project Info)
- [ ] Restart the dev server, open `/admin/signup` and create the admin account with the admin email
- [ ] Test end to end: sign in, add a lead and appointment, change the schedule, book and pay on the website, fill the questionnaire

## Next: Real Services

Today the booking runs on the browser store with a placeholder Meet link. These steps make it real, in this order:

- [ ] **Google Meet link:** replace the placeholder (`generateAdminMeetLink`) with real generation through the existing Apps Script / Google Calendar, from a server route, with a loading state and an error state on the confirmation page
- [ ] **Emails with the Resend API:** add `RESEND_API_KEY` and a verified sending domain; send the customer email with the Meet link after the questionnaire is submitted, the admin booking email, and the questionnaire reminders; keep the sending in server routes
- [x] **Neon database and Neon in the app:** done in Phase 6 (run the migration to start)
- [ ] **Razorpay webhook and live testing:** add the webhook so a payment is recorded even if the tab closes, switch to live keys, run one real ₹800 booking end to end (payment, questionnaire, Meet link, emails, admin view), then switch back or keep live with Mukta's agreement

## Launch

- [ ] Deploy to staging and show Mukta
- [ ] Back up the live site and database
- [ ] Run one real ₹800 booking on staging or at launch, with Mukta's agreement
- [ ] Switch the domain and check that old `.php` addresses redirect
- [ ] Keep the PHP site available for rollback until the new site is stable
