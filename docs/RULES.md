# Rules

Short, binding rules for the Eat Rrite Next.js site. Clarity beats cleverness.

## Code

- One function does one job. Name it after that job.
- Prefer early returns. No nested loops, no nested conditions, no clever one-liners.
- No abstraction until it removes real repetition. Small duplication is fine.
- Handle expected failures with a clear message for the user. Never swallow an error.
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
| `features/<feature>/` | Everything one feature needs, in one place: `components/`, `hooks/`, `services/`, `constants/`, `types/`, `utils/`, `stores/`. Today: `features/appointment/` |
| `stores/` | Client state for the admin (zustand), until Neon is wired |
| `constants/<page>/` | Copy for one page, such as `constants/about/` |
| `constants/` | Brand manifest, routes, API paths, motion values |
| `hooks/` | Shared React hooks; admin hooks in `hooks/admin/`. Feature hooks live in their feature |
| `services/` | Shared services, such as the database client. Feature services live in their feature |
| `utils/` | Small pure helpers used everywhere, such as API responses. Feature helpers live in their feature |
| `config/` | Server environment variables |
| `types/` | Shared types |
| `db/migrations/` | SQL to run in Neon, numbered in order |

New feature code goes in `features/<feature>/`. Import it with `@/features/<feature>/...`. A feature never imports another feature's internals, and shared code (`components/ui`, `utils/apiResponse`, `services/database`) never imports from a feature.

## Naming

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
- Public form fields are 48px high (`h-12`), 16px text. Admin fields keep the Deccan sizes.
- Public buttons use `PillButton`. The admin uses the shadcn `Button`.
- Dropdowns use the shadcn `Select`, never a native `<select>`.
- Brand name, contact details and links come from `constants/brand.ts`.

## Database

- Keep it minimal: only the tables and columns the site uses today.
- Every table has `id uuid primary key default gen_random_uuid()`, `created_at` and `updated_at`.
- Every table gets the `set_updated_at` trigger.
- Use foreign keys for real relationships. Choose `on delete` on purpose.
- Use `check` constraints for fixed value lists, such as `status` and `role`.
- No extra indexes, views or functions until a real need appears.
- Change the schema only with a new numbered file in `db/migrations/`. Never edit a file that already ran.
- Queries live in `services/` (or a feature's `services/`). Always use the `db()` tagged template, never string-built SQL.

## Security

- Secrets live only in `.env.local`. Never commit them, never send them to the browser.
- `config/env.ts` is server-only.
- Check every input on the server, even when the form already checks it.
- Payment amounts come from the server, never from the browser.
- Confirm a payment only after checking the Razorpay signature.
- No health answers or personal data in URLs, logs or tracking events.
- Authorize admins by `profiles.role`, never by email.

## Client rules

- Keep the ₹800 fee. Do not publish program fees. Keep "PMOS". Never mention the product line.
- Use client names, photos and stories only with written consent.

## Done means

- Lint, type check and build pass.
- The change is tested in the browser.
- `docs/tasks.md` and `README.md` match the code.
