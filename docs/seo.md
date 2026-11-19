# SEO

Goal: www.eatrrite.com is the first result for "Eat Rrite" and "eatrrite". Audit run with the launch-seo skill on 19 November 2026 (full pass, live site).

## Decisions

- **Main address:** https://www.eatrrite.com (brief §3). eatrrite.com and eatrrite.vercel.app 301 to it.
- **Brand name:** Eat Rrite, always with the space. "Eatrrite" and "EatRrite" appear only in structured data `alternateName`, so the joined spelling people type still matches the brand.
- **Presence:** online, across India and abroad. Eat Rrite began in Hyderabad, Dehradun and Mumbai (`BRAND.origins`); those cities appear only in structured data (`foundingLocation`), never on pages as a service limit, and never in titles or descriptions.
- **No scorebadge badge** in the footer (the brief forbids layout changes).
- **Product Hunt: not a fit.** It is a launch site for software and tech products; a nutrition practice would get no relevant audience and risks removal. Skipped.

## Fixed in code

| Issue | Fix |
| --- | --- |
| Every page's canonical, `og:url` and `og:image` pointed at eatrrite.vercel.app, telling Google the Vercel copy was the real site | `metadataBase` now comes from `BRAND.url` (`app/layout.tsx`) |
| eatrrite.vercel.app served a full duplicate of the site with 200 | Public pages 301 to www (`config/redirects.ts`); `/api` and `/admin` stay so webhooks and sign-in keep working |
| No Search Console, Bing or GA4 tags | Read from `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `GA_MEASUREMENT_ID`; nothing renders until set (`config/env.ts`, `components/layout/GoogleAnalytics.tsx`) |
| Pages named Hyderabad and Dehradun as where Eat Rrite is based | Footer, contact page, home and cohort copy now say online, pan-India and abroad (`BRAND.presence`) |
| Organization schema had no origin | `foundingDate` 2018 and `foundingLocation` Hyderabad, Dehradun, Mumbai (`utils/structuredData.ts`) |

Already right: robots.txt (allows Google, Bing and AI crawlers; blocks admin, API, confirmation), sitemap of 15 live pages, unique titles under 60 characters, one H1 per page, alt text on every image, breadcrumbs, FAQ, Person and Service schema, real 404s, every internal link 200, confirmation page noindex.

## Owner clicks (marketing.eatrrite@gmail.com)

1. **Deploy** this branch, then check `https://www.eatrrite.com` view-source shows `<link rel="canonical" href="https://www.eatrrite.com">`.
2. **Search Console:** search.google.com/search-console → Add property → **Domain** → `eatrrite.com` → add the TXT record at the DNS host → Verify. (No DNS access: URL prefix `https://www.eatrrite.com/` → HTML tag → put the content value in Vercel as `GOOGLE_SITE_VERIFICATION` → redeploy → Verify.) Add Mukta as owner.
3. **Sitemap:** Search Console → Sitemaps → `sitemap.xml` → Submit.
4. **Request indexing:** URL Inspection → Home, /about, /programs, each program page → Request indexing.
5. **Vercel:** Project → Settings → Domains: www.eatrrite.com is primary; eatrrite.com redirects to it with 308/301.
6. **GA4:** analytics.google.com → Admin → Create property "Eat Rrite" (India, INR) → Web stream `https://www.eatrrite.com` → copy `G-…` → first add Google Analytics to the privacy policy (Mukta approves), then set `GA_MEASUREMENT_ID` in Vercel → redeploy.
7. **Link GA4 to Search Console:** Analytics → Admin → Product links → Search Console links → Link.
8. **Bing:** bing.com/webmasters → Import from Google Search Console (copies site and sitemap).
9. **Google Business Profile:** business.google.com → Nutritionist → online service-area business, area India, **hide the address**, website www.eatrrite.com, phone +91 96398 77483. Name exactly "Eat Rrite".
10. **Google Alerts:** google.com/alerts for "Eat Rrite", "eatrrite.com" and "Mukta Patil".
11. **Microsoft Clarity** (optional, free heatmaps): after GA4, if wanted, add it the same way.

## Branded links to earn (most likely first)

Each one names the brand "Eat Rrite" and links to https://www.eatrrite.com. Name, phone and email exactly as on the site.

1. Instagram @eatrrite and @muktapatil01 bio links, YouTube channel About, Facebook page: website field = www.eatrrite.com.
2. Mukta's LinkedIn: Contact info website, plus an "Eat Rrite" company page linking back.
3. Medium @19mukta: profile link, and each repost sets its canonical to the eatrrite.com article.
4. The New Indian Express and Deccan Chronicle: ask the editor to add the website to Mukta's author bio on her columns.
5. Event and talk hosts (ONGC, Clover Organic, Millet Festival, schools): ask for a link on their event write-ups.
6. Bing Places (import from Google Business Profile), Apple Business Connect, Justdial and Practo (health directories used in India).
7. One linkable piece: a free Indian-food guide (for example a printable PMOS or diabetes plate guide) that others can cite.

Never buy links, swap links or use "submit to 500 directories" services.

## What to expect

- Nobody can promise a ranking or a date. This removes every reason for Google to skip the site.
- Brand name searches move first: usually 1 to 4 weeks after the canonical fix is live and Search Console is verified and the sitemap submitted. The vercel.app duplicate drops out over the same weeks.
- Non-brand searches ("diabetes diet plan Indian food") take 3 to 6 months and depend on articles and earned links.
- Recheck in 2 weeks: Search Console Pages report, `site:eatrrite.com`, and searches for "Eat Rrite" and "eatrrite".
