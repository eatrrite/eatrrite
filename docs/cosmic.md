# Cosmic (CMS)

How the site's text and images are edited in Cosmic, and how the code reads them.

## What Cosmic is

Cosmic is a **headless CMS**: a website where you edit content (a dashboard) plus an API that hands that content to your own site. It does not build or host pages. Our Next.js site still draws every page; Cosmic only stores the words and pictures.

What it gives us:

- A dashboard where Mukta can change copy, FAQs, testimonials, programs and photos without a developer or a deploy
- Media storage with a CDN for images
- An API (and the `@cosmicjs/sdk` package) to read and write content
- Webhooks: Cosmic calls our site whenever content changes

## Why the site uses it

Before Cosmic, all copy lived in JSON files (`constants/<page>/content.json`). Changing a sentence meant editing code and deploying. Now the copy lives in Cosmic, and the JSON files stay as the starting data and the backup.

## Words you will see

| Word | Meaning here |
| --- | --- |
| Bucket | One content store. Ours is `eatrrite-production` (project "Eatrrite") |
| Object type | A kind of content, like a database table. Ours: one per page, plus Programs and Packages |
| Object | One entry of a type, like a row. "Home Page" is one object |
| Singleton | An object type that holds exactly one object. Every page type is a singleton |
| Metafield | One field of an object. `text`, `textarea`, `switch`, `file` (an image), `parent` (a group of fields) and `repeater` (a list, such as FAQs) |
| Media | Uploaded files. A `file` metafield points at one |
| Read key / Write key | Passwords for the API. Read gets content; write changes it |
| Webhook | A URL Cosmic calls after a change |

## 1. Account setup (done once)

1. The Cosmic project lives on the client account (marketing.eatrrite@gmail.com), bucket `eatrrite-production`.
2. Cosmic's own "migrate from URL" tool had scraped the old site into one `Pages` type. It only saw what the browser showed at load (one program, no hero slides), so we deleted that type, its 4 objects and its image.
3. Bucket → Settings → **API keys** gives the slug, read key and write key.
4. The keys go in `.env.local` (and some in Vercel, see Environment below).

## 2. Write: the one-time import

`bun run cms:import` (`scripts/cms-import.ts`) copies the JSON files into Cosmic. It runs on your computer with the write key.

What it does, in order:

1. Stops if any of our object types already exist, so it can never overwrite edits made in Cosmic.
2. Uploads every image the JSON names (`/images/...` in `public/`) to Cosmic Media (`scripts/cms/uploadImages.ts`).
3. For each page, builds the content model from the JSON (`features/cms/utils/metafields.ts`) and creates the object type:
   - a JSON group (`hero`) becomes a `parent` field
   - a JSON list (`faq.items`) becomes a `repeater`; a list of plain text becomes a repeater with one `item` field
   - an image path becomes a `file` field; `true`/`false` a `switch`; long text a `textarea`
   - field keys are the JSON keys, so `hero.slides[0].title` in JSON is `hero.slides[0].title` in Cosmic
4. Publishes one object per page, and one object per program and package, in site order (`features/cms/utils/toCosmic.ts`).

The list of what gets imported is `features/cms/sources.ts`:

| Cosmic object type | JSON file | Used on |
| --- | --- | --- |
| `home-page` | `constants/home/content.json` | `/`, quote on `/about` and program pages |
| `about-page` | `constants/about/content.json` | `/about`, `/about/doctors` |
| `credentials` | `constants/about/credentials.json` | `/about`, `/media`, home strip |
| `programs-page` | `constants/programs/content.json` | `/programs`, program pages |
| `pricing-page` | `constants/pricing/content.json` | `/pricing` |
| `cohort-page` | `constants/cohort/content.json` | `/cohort` |
| `contact-page` | `constants/contact/content.json` | `/contact` |
| `booking-page` | `features/appointment/constants/content.json` | `/book`, questionnaire |
| `privacy-page` | `constants/legal/privacy.json` | `/privacy-policy` |
| `programs` (4 objects) | `constants/programs/programs.json` | home, `/programs`, the 4 program pages, footer, contact form |
| `packages` (3 objects) | `constants/programs/packages.json` | `/pricing`, program pages |

`bun run check:cms` (`scripts/check-cms-content.ts`) proves the round trip: every file goes JSON → Cosmic format → back, and must come out identical.

## 3. Read: how a page gets its content

```ts
const home = await getPage("home-page");        // one page object
const programs = await getCollection("programs"); // a list, in Cosmic order
```

Both live in `features/cms/services/cmsContent.ts`. Each call:

1. Asks Cosmic for the object with the **read key**, on the server only. The key never reaches the browser.
2. Turns the answer back into the exact shape of the JSON file (`features/cms/utils/fromCosmic.ts`), so components keep their types: images become their URL, text lists are unwrapped, empty list fields are left out.
3. **Falls back to the JSON file** if Cosmic fails (one `try/catch`, logged). The site never goes blank.
4. Is cached (`"use cache"`, tag `cms`, life `hours`). Visitors are served from the cache; Cosmic is asked again only after the webhook or after the cache runs out.

Client components cannot fetch. Their server parent fetches and passes the data as props (for example `TestimonialsSection` passes `items` to `TestimonialsCarousel`, and the site layout passes program names to the WhatsApp button). Helpers that need copy take it as an argument: `whatsappMessageFor(pathname, programs)`, `personData(articles)`.

Images come from `https://cdn.cosmicjs.com/...`. `next.config.ts` allows that address, so `next/image` still resizes and converts them.

## 4. Webhook: how an edit reaches the live site

```
Mukta edits in Cosmic → Publish
  → Cosmic calls POST https://www.eatrrite.com/api/cms/revalidate
    with header x-webhook-secret: <COSMIC_WEBHOOK_SECRET>
  → the route checks the secret, then revalidateTag("cms")
  → the next visitor's page fetches fresh content from Cosmic
```

The route is `app/api/cms/revalidate/route.ts`. A wrong or missing secret gets `401`. Without the webhook, edits still appear once the cache runs out (about an hour).

Setup in Cosmic (Bucket → Settings → Webhooks): URL as above, resource `objects`, all object types, events created, edited and deleted, payload off, header `x-webhook-secret`.

## Environment

| Name | `.env.local` | Vercel | Why |
| --- | --- | --- | --- |
| `COSMIC_BUCKET_SLUG` | yes | yes | Which bucket |
| `COSMIC_READ_KEY` | yes | yes | Pages read content |
| `COSMIC_WEBHOOK_SECRET` | yes | yes | The webhook route checks it |
| `COSMIC_WRITE_KEY` | yes | **no** | Only the import script writes. Never put it on Vercel or in the browser |

Without the slug and read key, every page shows the JSON copy.

## Things to know

- **Cosmic is the source of truth for pages that read from it.** Editing their JSON file changes only the fallback. Change copy in Cosmic.
- **Adding a new field:** add it to the JSON file and add a metafield with the **same key** in Cosmic (object type → Add metafield). Until Cosmic has it, the page shows the JSON value.
- **Cosmic quirk 1:** a list item that leaves out an image field gets the previous item's image. The import therefore sends every field of every list item, `null` when empty.
- **Cosmic quirk 2:** deleting an object type through the API left its objects behind. To start over, delete the objects first, then the types and media.
- **Free plan:** 10,000 uncached API requests a month, 1,000 objects, 50 object types. The cache keeps us far below.

## Status

Every public page reads its copy from Cosmic: home, about, doctors, media, programs, the 4 program pages, pricing, cohort, contact, book, privacy, plus the footer, the WhatsApp messages, the contact form, structured data and the sitemap. No component imports a page's JSON any more.

Not in Cosmic, on purpose:

- SEO titles and descriptions (in each `page.tsx`, worded as the brief asks) and banner titles
- The questionnaire questions (`features/appointment/constants/questionnaire.json`) and the booking confirmation messages
- Design assets: the logo and the page banner photo

Still to do: replace the write key and webhook secret (they were pasted in a chat).

## Adding a blog later

1. **Cosmic:** Object types → Add → multiple, slug `posts`. Fields: `excerpt` (textarea), `cover` (file, image), `content` (rich text), `published_at` (date), `seo_title`, `seo_description`. Write posts there.
2. **Read:** in `features/cms/services/`, add `getPosts()` and `getPost(slug)` with the same `"use cache"` and `cacheTag(CMS_TAG)`. Give them a `Post` type. No JSON fallback is needed: on failure return an empty list, and `/blog` shows its existing empty state.
3. **Pages:** list the posts in `app/(site)/blog/page.tsx`; add `app/(site)/blog/[slug]/page.tsx` with `generateStaticParams` and `pageMetadata()` from the SEO fields. Rich text arrives as HTML.
4. **SEO:** add post URLs to `app/sitemap.ts` and a `BlogPosting` block in `utils/structuredData.ts`; add the route to `constants/routes.ts`.
5. **Home:** show the blog section again (hidden until articles are live, brief §5.1).
6. **Webhook:** nothing to do. It already covers every object type.
