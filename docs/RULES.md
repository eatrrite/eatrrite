# Rules

Short, binding rules for the Eat Rrite Next.js site. Clarity beats cleverness.

## Code

**Write code a beginner can read, change and debug without help.** These rules are strict.

- **Plain over clever.** The simplest code that works. No wrappers, helpers or layers that do not earn their place; repeating a few lines is better than a shared function that is hard to follow.
- **One function, one job,** named after that job. If the name needs "and", split it.
- **Flat logic.** Early returns. No nested conditions or loops, no chained ternaries, no clever one-liners.
- **Every edge case handled on purpose:** missing or bad input, empty lists, duplicate calls, network failures and timeouts, a service that is not set up. Each has a clear outcome (a message for the user, a log line for us) and nothing unexpected happens.
- **Never swallow an error.** Expected failures return a clear result; unexpected ones are logged with enough context to debug, never with personal data.
- Strict TypeScript. No `any`.
- **No file over 120 lines.** `components/ui/` is exempt, because the shadcn CLI generates it.
- Delete unused code, files and dependencies.

## Folders

| Folder | Holds |
| --- | --- |
| `app/` | Pages, layouts and API routes |
| `components/<page>/` | Parts of one page, such as `components/home/` |
| `components/layout/` | Top bar, header, footer, page banner |
| `components/shared/` | Parts used by several pages |
| `components/ui/` | shadcn components |
| `components/admin/` | Admin panel, by page (`components/admin/calendar/`) |
| `features/<feature>/` | Everything one feature needs, in one place: `components/`, `hooks/`, `services/`, `constants/`, `types/`, `utils/`, `stores/`, `emails/`, `whatsapp/`. Today: `features/appointment/`, `features/contact/` (contact form messages), `features/auth/` (Neon Auth: sign-in, sign-up, session, profile), `features/admin/` (admin data load and save actions), `features/cms/` |
| `emails/` | The shared email look (`layout.ts`, `parts.ts`, `theme.ts`, `logo.ts`). Each feature's email wording lives in its own `emails/templates.ts` |
| `stores/` | Client state for the admin (zustand), until Neon is wired |
| `constants/<page>/` | Copy for one page, such as `constants/about/`. Imported into Cosmic once; now the shape and the fallback |
| `constants/` | Brand manifest, routes, API paths, motion values |
| `hooks/` | Shared React hooks; admin hooks in `hooks/admin/`. Feature hooks live in their feature |
| `services/` | Shared services: the database client, `mailer.ts` (SMTP) and `whatsapp.ts` (Meta). Feature services live in their feature |
| `utils/` | Small pure helpers used everywhere, such as API responses. Feature helpers live in their feature |
| `config/` | Server environment variables |
| `types/` | Shared types |
| `db/migrations/` | SQL to run in Neon, numbered in order |

New feature code goes in `features/<feature>/`. Import it with `@/features/<feature>/...`. A feature never imports another feature's internals, and shared code (`components/ui`, `utils/apiResponse`, `services/database`) never imports from a feature.

## Naming

No clinic, dental or other-brand wording in names, files, comments or text. The business is Eat Rrite: it has leads, appointments and consultations. The store is `useAdminStore`.

| Item | Style | Example |
| --- | --- | --- |
| Components and their files | PascalCase | `BookingForm.tsx` |
| Hooks | `use` + camelCase | `useBooking.ts` |
| Functions, variables, other files | camelCase | `validateBooking.ts` |
| Constants | SCREAMING_SNAKE_CASE | `HOLD_MINUTES` |
| Routes | kebab-case | `/appointment-confirmed` |
| Database tables and columns | snake_case | `slot_start` |

## UI

- Colours, fonts, radius and shadows come only from `app/globals.css`.
- Spacing uses the Tailwind scale (4px steps). No one-off pixel values for padding, margin or gap.
- Public form fields are 48px high (`h-12`), 16px text. Admin fields keep the admin sizes.
- Public buttons use `PillButton`. The admin uses the shadcn `Button`.
- Dropdowns use the shadcn `Select`, never a native `<select>`.
- Every eyebrow (the line above a section heading) uses `type-eyebrow`, the handwritten Caveat style from the home page. Public pages and admin page headers alike. Never an uppercase small-caps line.
- Anything you can press or pick shows the pointer cursor. One rule in `app/globals.css` covers buttons, chips, radios, checkboxes, tabs and options; do not add `cursor-pointer` by hand.
- Every user action ends with a toast through `useShowToast` (long forms may also use `useProgressToast`). An action that waits on the server shows a pending toast first and replaces it with the result.
- Empty and failed views use `components/shared/EmptyState` (illustrations in `public/images/empty-states/`). Server waits use `LoadingState`; every route group has an `error.tsx` with `ErrorState` and a Try again button.
- Site copy is read with `getPage()` / `getCollection()` from `features/cms/services/cmsContent.ts`, never by importing a page's JSON in a component. Client components get it as props. Copy changes are made in Cosmic (`docs/cosmic.md`).
- Brand name, contact details and links come from `constants/brand.ts`. WhatsApp links come from `constants/whatsapp.ts` (pre-filled per page, never health details).
- Every public page sets its metadata with `pageMetadata()` (`utils/seo.ts`): brief title, description, canonical and share preview. Inner pages pass `path` to `PageBanner` for breadcrumb data.
- Old addresses redirect only through `config/redirects.ts` (301). Link with `ROUTES`, never an old address.

## Database

- Keep it minimal: only the tables and columns the site uses today.
- Every table starts with `er_` (Eat Rrite).
- Tables have a uuid `id` (`er_profiles.id` is the Neon Auth user id; `er_questions` uses its `key`), `created_at`, and `updated_at` when rows change.
- Every table with `updated_at` gets the `er_set_updated_at` trigger.
- Use foreign keys for real relationships. Choose `on delete` on purpose.
- Use `check` constraints for fixed value lists, such as `status` and `role`.
- No extra indexes, views or functions until a real need appears.
- Change the schema only with a new numbered file in `db/migrations/`. Never edit a file that already ran. `001_initial.sql` alone sets up the whole database (while nothing is live it is edited in place and re-run on a fresh database; once live, add a new file).
- Settings, working hours, services and questions are read through cached functions tagged `booking-config`; anything that changes them calls `updateTag("booking-config")`.
- Server actions return `ActionResult` (`utils/actionResult.ts`) instead of throwing, and start with `assertAdmin()` when they change admin data.
- Queries live in `services/` (or a feature's `services/`). Always use the `db()` tagged template, never string-built SQL.

## Security

- Secrets live only in `.env.local`. Never commit them, never send them to the browser.
- `config/env.ts` is server-only.
- `COSMIC_WRITE_KEY` stays in `.env.local` for the import script. It is never set on the host.
- Check every input on the server, even when the form already checks it.
- Payment amounts come from the server, never from the browser.
- Confirm a payment only after checking the Razorpay signature.
- No health answers or personal data in URLs, logs or tracking events. WhatsApp messages never carry questionnaire answers or the contact form's free text (`messages.md`).
- Every email and WhatsApp message follows `messages.md`: one send function per message and channel, each called on its own `after()` line, never blocking a booking step.
- Admin access: a Neon Auth session whose email is in `ADMIN_EMAILS`. `proxy.ts` sends visitors without a session to `/admin/login`; the admin layout and every admin action check the email again.

## Done means

- The client rules in `requirements.md` still hold (₹800 fee, no program fees, "PMOS", no product line, consent for client stories).
- Lint, type check and build pass.
- The change is tested in the browser.
- `docs/tasks.md` and `README.md` match the code.
