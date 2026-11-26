# Eat Rrite

Client work for Mukta Patil on www.eatrrite.com: fixes, SEO, speed and automation, not a redesign.

- Client brief: `docs/eatrrite-developer-brief.pdf` (source of truth, with exact copy-paste text)
- The Next.js app is the project root (the PHP site was removed; it lives on in git history).
- Tick items off in `docs/tasks.md` as they are done, and wait for approval between phases.
- Before handover: Apps Script moves to marketing.eatrrite@gmail.com, emails and reminders tested, Razorpay in live mode, then one real live booking (see `docs/tasks.md`)

## Rules

- Do not change design, fonts, colours, logo, layout or existing text, except fixes in the brief. Use the brief's wording exactly.
- Keep the ₹800 fee. Do not publish program fees. Keep "PMOS". Never mention the product line.
- Client names, photos and stories only with written consent.
- No health information or personal data in tracking events or URLs.
- Eat Rrite is online, pan-India and abroad. Pages show only "Head operations: Hyderabad, Mumbai, Dehradun" (`BRAND.headOperations`), never street addresses; the addresses (primary Sainikpuri, Secunderabad, plus Sus Road Pune and Sahastradhara Road Dehradun) go only in structured data and the Google Business Profile.
- Work on staging, keep a backup, and show Mukta before going live.
- Code follows `docs/RULES.md` strictly: plain code a beginner can read and debug, one job per function, flat logic, every edge case handled.

## Docs

Code rules and folders:
@docs/RULES.md

Summary, stack, pages, booking flow, environment and decisions:
@docs/requirements.md

What is built and every open item:
@docs/tasks.md

Booking times, slot rules and the booking flow in code:
@docs/appointment-rules.md

Database tables and setup:
@docs/database.md

SEO decisions and owner steps:
@docs/seo.md

Site copy in Cosmic (CMS):
@docs/cosmic.md

WhatsApp messages (Meta Cloud API, direct):
@docs/whatsApp.md

Next.js version notes:
@AGENTS.md
