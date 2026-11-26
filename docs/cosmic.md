# Cosmic (CMS)

How the site's text and images are edited in Cosmic, and how the code reads them.

## What Cosmic is, and why we use it

Cosmic is a **headless CMS**: a dashboard to edit content, plus an API that hands that content to your own site. It does not build or host pages; our Next.js site still draws every page, and Cosmic only stores the words and pictures. It gives us a dashboard Mukta can use without a developer or a deploy, image storage on a CDN, an API (`@cosmicjs/sdk`) and webhooks that call our site when content changes.

Before Cosmic, all copy lived in JSON files (`constants/<page>/content.json`), so changing a sentence meant a code change and a deploy. Now the copy lives in Cosmic; the JSON files stay as the starting data and the backup.

| Word | Meaning here |
| --- | --- |
| Bucket | One content store: `eatrrite-production` (project "Eatrrite") |
| Object type / object | A kind of content and one entry of it, like a table and a row. "Home Page" is one object |
| Singleton | A type that holds exactly one object. Every page type is one |
| Metafield | One field: `text`, `textarea`, `switch`, `file` (image), `parent` (a group), `repeater` (a list, such as FAQs) |
| Read key / write key | API passwords: read gets content, write changes it |
| Webhook | A URL Cosmic calls after a change |

## 1. Account setup (done once)

1. The project lives on the client account (marketing.eatrrite@gmail.com), bucket `eatrrite-production`.
2. Cosmic's "migrate from URL" tool had scraped the old site into one `Pages` type. It only saw what showed at page load (one program, no hero slides), so we deleted it.
3. Bucket → Settings → **API keys** gives the slug and keys; they go in `.env.local` and Vercel (see Environment).

## 2. Write: the one-time import

`bun run cms:import` (`scripts/cms-import.ts`) copies the JSON files into Cosmic, on your computer, with the write key:

1. It stops if any of our object types exist, so it never overwrites edits made in Cosmic.
2. It uploads every image the JSON names (`/images/...` in `public/`) to Cosmic Media.
3. It builds each content model from the JSON (`features/cms/utils/metafields.ts`): a group becomes a `parent`, a list a `repeater` (plain text lists get one `item` field), an image path a `file`, `true`/`false` a `switch`, long text a `textarea`. Keys stay the JSON keys.
4. It publishes one object per page and one per program and package, in site order (`toCosmic.ts`).

| Cosmic type | JSON file | Used on |
| --- | --- | --- |
| `home-page` | `constants/home/content.json` | `/`, quote on `/about` and program pages |
| `about-page`, `credentials` | `constants/about/content.json`, `credentials.json` | `/about`, `/about/doctors`, `/media`, home strip |
| `programs-page` | `constants/programs/content.json` | `/programs`, program pages |
| `pricing-page`, `cohort-page`, `contact-page`, `privacy-page` | `constants/pricing/`, `cohort/`, `contact/` `content.json`; `constants/legal/privacy.json` | Their pages |
| `booking-page` | `features/appointment/constants/content.json` | `/book` |
| `programs` (4), `packages` (3) | `constants/programs/programs.json`, `packages.json` | Program pages, home, footer, contact, pricing |

The list is `features/cms/sources.ts`. `bun run check:cms` proves the round trip: JSON → Cosmic format → back must come out identical.

## 3. Read: how a page gets its content

```ts
const home = await getPage("home-page");          // one page object
const programs = await getCollection("programs"); // a list, in Cosmic order
```

Both live in `features/cms/services/cmsContent.ts`. Each call:

1. Asks Cosmic with the **read key**, on the server only; the key never reaches the browser.
2. Turns the answer back into the exact shape of the JSON file (`fromCosmic.ts`), so components keep their types: images become their URL, empty list fields are left out.
3. **Falls back to the JSON file** if Cosmic fails (one `try/catch`, logged).
4. Is cached (`"use cache"`, tag `cms`, life `hours`); Cosmic is asked again after the webhook or when the cache runs out.

Client components cannot fetch, so their server parent passes the data as props (the layout gives program names to the WhatsApp button). Helpers take copy as an argument: `whatsappMessageFor(pathname, programs)`, `personData(articles)`. Images come from `cdn.cosmicjs.com`, allowed in `next.config.ts`, so `next/image` still resizes them.

## 4. Webhook: how an edit reaches the live site

```
Mukta edits in Cosmic → Publish
  → Cosmic calls POST https://www.eatrrite.com/api/cms/revalidate (header x-webhook-secret)
  → the route checks the secret, then revalidateTag("cms")
  → the next visitor gets fresh content from Cosmic
```

Route: `app/api/cms/revalidate/route.ts` (a wrong secret gets `401`). Cosmic setup (Bucket → Settings → Webhooks): that URL, resource `objects`, all types, events created, edited and deleted, payload off, header `x-webhook-secret`. Without the webhook, edits appear within about an hour.

## Environment

| Name | `.env.local` | Vercel |
| --- | --- | --- |
| `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WEBHOOK_SECRET` | yes | yes |
| `COSMIC_WRITE_KEY` | yes | **never**: only the import script writes |

Without the slug and read key, every page shows the JSON copy.

## Things to know

- **Cosmic is the source of truth.** Editing a page's JSON changes only the fallback.
- **New field:** add it to the JSON and a metafield with the **same key** in Cosmic; until then the page shows the JSON value.
- **Quirk:** a list item without an image gets the previous item's image, so the import sends every field, `null` when empty.
- **Quirk:** deleting an object type through the API left its objects behind; delete objects first, then types and media.
- **Free plan:** 10,000 uncached requests a month, 1,000 objects, 50 types; the cache keeps us far below.
- **Not in Cosmic, on purpose:** SEO titles and descriptions (in each `page.tsx`, as the brief words them), banner titles, the questionnaire questions, booking messages, the logo and banner photo.

## Adding a blog later

1. **Cosmic:** add a multiple type `posts` with `excerpt` (textarea), `cover` (image), `content` (rich text), `published_at` (date), `seo_title`, `seo_description`.
2. **Read:** `getPosts()` and `getPost(slug)` in `features/cms/services/`, with `"use cache"` and `cacheTag(CMS_TAG)` and a `Post` type. On failure return an empty list; `/blog` shows its empty state.
3. **Pages:** list posts in `app/(site)/blog/page.tsx`; add `blog/[slug]/page.tsx` with `generateStaticParams` and `pageMetadata()`. Rich text arrives as HTML.
4. **SEO:** post URLs in `app/sitemap.ts`, `BlogPosting` in `utils/structuredData.ts`, the route in `constants/routes.ts`.
5. **Home:** show the blog section again (brief §5.1). The webhook already covers every type.
