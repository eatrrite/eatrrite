# Eat Rrite Tasks

> Original work list for fixing the PHP site, from the client brief. Kept for reference. The Next.js rebuild is tracked in `tasks.md`.

Ordered easiest to hardest. Time groups are rough guesses, since the site code has not been seen yet. Tags are Mukta's deadlines: **P1** this week, **P2** within 3 weeks, **P3** before the first ad. Exact text is in the brief at the § shown.

## 0. Before Anything Else

- [ ] Get hosting, code and DNS access (§12)
- [ ] Back up the live site (§2)
- [ ] Set up a staging copy (§2)
- [ ] Send Mukta her 8 questions (§12)
- [ ] Run PageSpeed on Home, one program page and Booking, and save the "before" reports (§7)

## 1. Wording Corrections (minutes each)

- [ ] P1 Home: delete the repeated "Where Food Becomes Medicine" H3 (§5.1)
- [ ] P1 Home: change the stat label to "Client Stories" (§5.1)
- [ ] P1 About: fix the 4 typos (§5.1)
- [ ] P1 Programs: change the breadcrumb to "Programs" (§5.1)
- [ ] P1 Pricing: remove the stray "Pricing" line (§5.1)
- [ ] P1 Pricing: move "Most Popular" to the 90-Day card (§5.1)
- [ ] P1 Booking: replace the hours line in header and footer (§5.1)
- [ ] P1 Booking: add the Meet link line under the pay button (§5.1)
- [ ] P1 Booking: match dropdown names to the footer names (§5.1)
- [ ] P1 Remove the stray "meta-description" text on About and Booking (§4)
- [ ] P1 Blog: remove the 3 placeholder posts (§5.1)
- [ ] P1 Home: hide the blog section until articles are live (§5.1)

## 2. Small Code Fixes (under an hour each)

- [ ] P1 Tap-to-call and tap-to-mail links (§4)
- [ ] P1 Label the menu button "Open menu" and test on both phones (§4)
- [ ] P1 Footer social links (§4)
- [ ] P1 Home: aria-labels on the program cards (§5.1)
- [ ] P1 Home: testimonial names to bold text, FAQ questions to H3 (§5.1)
- [ ] P1 About: make "Our Story" and "What guides us" H2s (§5.1)
- [ ] P1 Programs: second heading to a subtitle; "About the Program" and "Packages" to H2 (§5.1)
- [ ] P1 Booking: "Reserve your slot" to H2 (§5.1)
- [ ] P1 Alt text on all images listed in the brief (§5.1)
- [ ] P1 Paste all page titles and descriptions (§6.2)
- [ ] P1 Canonical tag on every page (§6.5)
- [ ] P1 Noindex on thank-you and ad pages (§6.5)
- [ ] P2 `lang="en-IN"` on every page (§6.5)
- [ ] P2 Auto-updating copyright year (§4)
- [ ] P2 Favicon at 32×32 and 180×180, if missing (§4)
- [ ] P3 Footer disclaimer line (§4)

## 3. Small Features (1–3 hours each)

- [ ] P1 Mobile sticky bar and desktop floating WhatsApp button (§4)
- [ ] P1 Replace the raw WhatsApp address on Pricing and Contact (§4)
- [ ] P1 Branded 404 page (§3)
- [ ] P1 sitemap.xml and robots.txt (§6.5)
- [ ] P1 Full HTTPS, no mixed content, one domain version (§3, §6.5)
- [ ] P1 Search Console and Bing verified, sitemap submitted (§6.1)
- [ ] P1 Booking: consent tick box linked to the Privacy Policy (§5.1)
- [ ] P1 Contact: build the form with a consent box (§5.1)
- [ ] P2 WhatsApp messages pre-filled per page (§4)
- [ ] P2 Share previews on every page (§4)
- [ ] P2 Google Business Profile: find or create and fill in (§8.1)
- [ ] P2 Link the 4.8 ★ stat to the reviews page (§5.1)

## 4. New Sections (half a day each)

- [ ] P2 Credentials & Media on About, plus the Home strip (§5.2)
- [ ] P2 Legal pages, linked in footer and forms (§8.3)
- [ ] P2 Testimonials: Anju's quote, YouTube click-to-load (§5.4)
- [ ] P2 Google reviews widget (§5.4)
- [ ] P2 Instagram feed and YouTube block (§5.5)
- [ ] P2 Same closing block on every program page and article (§9)
- [ ] P2 Connect profiles: Business Profile links, bio links with UTMs (§5.5)

## 5. Bigger SEO and Speed Work (1–2 days each)

- [ ] P1 List every old address from the sitemap and Search Console (§3)
- [ ] P1 + P2 Clean URLs and 301 redirects, built as one job (§3, §6.3)
- [ ] P1 Delete old pages once they redirect (§3)
- [ ] P2 Update all internal links to the new addresses (§6.3)
- [ ] P2 Structured data, tested in Rich Results (§6.4)
- [ ] P2 Speed: WebP, lazy-load, self-host fonts, remove old scripts, caching, CDN (§7)
- [ ] P2 Rename image files by content (§6.5)
- [ ] P2 Accessibility pass: tap targets, 16 px text, contrast, form labels (§7)
- [ ] P2 Internal links between programs and articles (§6.5)

## 6. Content System (2–4 days)

- [ ] P2 Blog template with iPhone-friendly admin login (§11.1)
- [ ] P2 /media page (§5.3)
- [ ] P2 8 article pages, after her reprint answer (§5.3)
- [ ] P2 Share buttons and Article data on posts (§11.1)
- [ ] P2 Canonical link back to the site on Medium reposts (§5.5, §11.1)

## 7. Booking Rebuild (2–4 days)

- [ ] P1 Calendar loads and works on iPhone Safari and Android Chrome (§5.1)
- [ ] P1 Country code picker and visitor time zone with IST (§5.1)
- [ ] P1 /thank-you page with "Add to calendar" (§5.1)
- [ ] P2 Show the next available day when a day is empty (§9)
- [ ] P2 Google Calendar event with Meet link, no double-booking (§9)
- [ ] P2 Store questionnaire answers securely, access for Mukta only (§8.3)

## 8. Automation (2–4 days)

- [ ] P2 WhatsApp API: confirmation, questionnaire and Meet link, reminders (§9)
- [ ] P2 Automatic review request when a program ends (§5.4, §9)
- [ ] P3 Save UTMs from hidden fields to the booking sheet (§9)

## 9. Ads Readiness (3–5 days)

- [ ] P3 Cookie banner with Consent Mode v2 (§8.4)
- [ ] P3 Google Tag Manager, GA4 and Google Ads conversions (§10.1)
- [ ] P3 Meta Business Portfolio and domain verification (§5.5, §10.1)
- [ ] P3 Meta Pixel and Conversions API (§10.1)
- [ ] P3 All 7 events, with no health data (§10.2)
- [ ] P3 Check how Meta classifies the site and tell Mukta (§10.3)
- [ ] P3 5 ad landing pages (§10.4)
- [ ] P3 3 guide download pages (§9)

## 10. Final Check and Ongoing

- [ ] Test on iPhone Safari, Android Chrome and desktop Chrome (§7)
- [ ] Show Mukta on staging, then go live (§2)
- [ ] Send the "after" PageSpeed reports (§7)
- [ ] P2 Four weeks later, redirect leftover 404s (§3)
- [ ] Monthly report (§11.2)

## Watch Out

These are places where easiest-first order or the brief itself creates a conflict:

- **Redirects before clean URLs:** The brief puts redirects in P1 and clean URLs in P2. Doing them separately creates redirect chains, so they are one job above. Ask Mukta if she is fine with this finishing after week 1.
- **/founder-profile.php:** Its credentials must be on About before it redirects, but that section is P2. Keep this page live until Credentials & Media is done.
- **P1 items low on this list:** Sections 5 and 7 hold P1 work, including the booking calendar. Do these in week 1 even though they are harder.
- **4.8 ★ rating:** The brief could not find her Google profile. If it does not exist, the rating needs a decision from her before it stays on the site.
- **Hours fix:** Tagged P2 in §4 but P1 in §5.1 and §9. It is treated as P1 here.
