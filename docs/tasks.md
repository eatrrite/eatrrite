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

Setup:

- [ ] Choose hosting and confirm it runs Next.js (open decision 5)
- [ ] Decide on the database and connect to MySQL (open decision 6)
- [ ] Set up environment variables for Razorpay, Apps Script, SMTP and the cron secret, with test keys first
- [ ] Back up the live database

Slots:

- [ ] Port slot hours, slot grid and slot rules
- [ ] Port slot holds and 45-minute blocking
- [ ] Respect slots hidden by the admin
- [ ] Connect the slot picker to live data

Payment:

- [ ] Create a Razorpay order for ₹800
- [ ] Verify the payment signature on the server
- [ ] Save the confirmed appointment and email the customer the questionnaire link
- [ ] Protect form requests against CSRF

After payment:

- [ ] `/appointment-confirmed` with appointment details and the questionnaire
- [ ] Validate and save questionnaire answers against `appointment_id`
- [ ] Generate the Meet link through the existing Apps Script and save it on the appointment
- [ ] Show the Meet link, including the loading and error states
- [ ] Email the customer the Meet link and email the admin the booking
- [ ] Questionnaire reminder job at 1, 3, 6, 12, 24, 30 and 36 hours, stopping once the form is submitted
- [ ] `/appointment-thank-you`

Checks:

- [ ] Run a full booking in Razorpay test mode
- [ ] Test a failed payment, an expired hold and a Meet failure
- [ ] Two people cannot book the same slot
- [ ] No health or personal data appears in URLs or tracking events
- [ ] Questionnaire answers are stored securely
- [ ] **Farhan approves the booking flow**

## Phase 5: Admin Panel

**Goal:** Everything the PHP admin does, on Next.js.

- [ ] Admin login, logout and session, with the password kept on the server
- [ ] Protect every admin page and admin API route
- [ ] Admin layout matching `admin/layout-start.php`
- [ ] Appointments calendar: toolbar and month grid
- [ ] Day slot list with 45-minute booked blocks
- [ ] Hide and show slots
- [ ] Appointment detail drawer, including questionnaire answers
- [ ] Cancel booking, with the existing confirmation step
- [ ] Decide on the cohort and snackbar admin lists (depends on open decision 3)
- [ ] Compare side by side with the PHP admin
- [ ] Test that logged-out visitors cannot reach any admin page or API
- [ ] **Farhan approves the admin panel**

## Launch

- [ ] Deploy to staging and show Mukta
- [ ] Back up the live site and database
- [ ] Run one real ₹800 booking on staging or at launch, with Mukta's agreement
- [ ] Switch the domain and check that old `.php` addresses redirect
- [ ] Keep the PHP site available for rollback until the new site is stable
