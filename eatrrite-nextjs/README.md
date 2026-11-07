# Eat Rrite Next.js

Next.js rebuild of www.eatrrite.com. The PHP site in the parent folder is the design reference. Plan and checklist: `../docs/requirements.md` and `../docs/tasks.md`.

## Run

```bash
bun install
bun run dev
```

## Where Things Live

| Path | What it holds |
| --- | --- |
| `app/globals.css` | All design tokens, copied from the PHP `:root` |
| `components/ui/` | shadcn components, restyled to the PHP rules |
| `app/(site)/` | Public pages and their shared layout |
| `components/home/` | Home page sections |
| `components/site/` | Top bar, header, footer and shared parts |
| `lib/data/` | Page copy, exported from the PHP `constants/` files |
| `components/foundation/` | Foundation UI reference page at `/foundation` |
| `components/motion/` | Framer Motion versions of the PHP GSAP reveals |
| `lib/motion.ts` | Animation values from the PHP `main.js` |
