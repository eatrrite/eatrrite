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
- [ ] Turn on Neon Auth, paste `DATABASE_URL`, run the migration
- [ ] Choose hosting and confirm it runs Next.js (open decision 5)

Slots:

- [x] Weekly hours, 15-minute steps, 45-minute blocking, 30-day window (`utils/slots.ts`)
- [x] A pending booking holds its slot for 15 minutes
- [x] Slot picker loads open times from `/api/slots`
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
- [ ] Replace the Deccan sidebar illustration (it shows a tooth icon) with an Eat Rrite one

Connect to Neon (next step):

- [ ] Admin sign-in with Neon Auth; access by `profiles.role = admin`. Remove the front-end password.
- [ ] Migration for a `patients` table, and link `appointments` to it with `patient_id`
- [ ] Create or match a patient from each public booking (by phone)
- [ ] Read and update real patients and appointments instead of sample data
- [ ] Migration for a `disabled_slots` table and hide or show slots
- [ ] Save the weekly schedule and use it for public booking slots
- [ ] Save to-dos and settings (tables to be decided)
- [ ] Test that logged-out visitors cannot reach any admin page or API

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
- [ ] Connect the contact form (backend and the consent box the brief asks for)
- [ ] Swap the floating icons for real cut-out food images, if wanted
- [ ] **Mukta approves the redesign** (the brief asked for no redesign)

## Launch

- [ ] Deploy to staging and show Mukta
- [ ] Back up the live site and database
- [ ] Run one real ₹800 booking on staging or at launch, with Mukta's agreement
- [ ] Switch the domain and check that old `.php` addresses redirect
- [ ] Keep the PHP site available for rollback until the new site is stable
