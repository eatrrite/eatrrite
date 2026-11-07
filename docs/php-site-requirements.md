# What Mukta Patil Wants From You

> Original summary of the client brief for the PHP site. Kept for reference. The Next.js rebuild is described in `requirements.md`.

Summary of her developer brief for www.eatrrite.com (31 Oct 2026). Exact copy-paste text and tables are in `eatrrite-developer-brief.pdf`.

**What `§` means:** `§` = section in the **PDF brief**. Example: `§5.1` = PDF brief, section 5.1. It is not a section number in this file.

**The job:** Mukta does not want a redesign. She wants you to fix, speed up and automate the existing site, so she gets found on Google, visitors trust her, and they book consultations. It must be ready for Google and Meta ads.

**Her deadlines:** P1 = this week · P2 = within 3 weeks · P3 = before the first ad.

## 1. Her Ground Rules (PDF §1, §2)

- Do not change the design, fonts, colours, logo, layout or existing text, except the fixes she lists.
- Keep the ₹800 consultation fee. Keep program fees unpublished, on purpose.
- Keep the word PMOS. It is intentional (new official name for PCOS/PCOD).
- Never mention her product line anywhere.
- Use client names, photos and stories only with written consent. Never use WhatsApp chat screenshots.
- Work on a staging copy, keep a backup, and show her before going live.
- Leave out any change that does not help visibility, trust or bookings.

## 2. Website Fixes

**Old site clean-up (PDF §3):** She wants every old address 301-redirected at server level, the old pages deleted, one version of the domain only, and a branded 404 page.

**Site-wide (PDF §4):** She wants you to add:
- Tap-to-call and tap-to-mail links, and a labelled menu button that works on iPhone and Android.
- A sticky WhatsApp + Book bar on mobile and a floating WhatsApp button on desktop, with messages pre-filled per page.
- Social links in the footer, legal links, an auto-updating copyright year, and a one-line disclaimer before ads.
- A favicon and share previews (Open Graph) on every page. Remove the stray "meta-description" text showing on pages.

**Page fixes (PDF §5.1):** She wants these corrected:
- **Home:** duplicate heading, "Client Stories" label, program card labels, FAQ alt text and headings, rating linked to Google, hide the blog block until articles are live.
- **About:** four typos, and proper headings.
- **Programs:** one H1 per page, unique image alt text, "Programs" breadcrumb.
- **Pricing:** remove the stray "Pricing" line, move "Most Popular" to the 90-Day card.
- **Contact:** build the missing form, with a consent box.
- **Blog:** remove the 3 placeholder posts.

**Booking page (PDF §5.1, §9):** She wants it to:
- Work on phones, with one H1, and show the next available day instead of a blank calendar.
- Use the correct hours wording and program names matching the footer.
- Have a country code picker, and show slots in the visitor's time zone with IST beside them.
- Have a consent box and explain how the Meet link arrives.
- End on a /thank-you page with "Add to calendar".
- Never ask health questions on the form. They belong in the questionnaire.

## 3. New Sections and Pages

- **Credentials & Media (PDF §5.2):** Her story, three rows (highlights, featured in, spoken at), "Read" cards and event photos on About, plus a one-line strip on Home. Publication names as plain text, no logos.
- **/media and 8 article pages (PDF §5.3):** She wants her 2019 New Indian Express columns typed out as real articles, once reprinting is confirmed. If unsure, use clipping + summary + e-paper link.
- **Testimonials (PDF §5.4):** Live Google reviews widget, click-to-load YouTube testimonials, and Anju's testimonial (after consent).
- **Legal pages (PDF §8.3):** Privacy Policy, Terms, Cancellation & Reschedule, Disclaimer. You build them; her lawyer checks the wording. Build to India's DPDP rules, and store health answers securely with access for her only.
- **Ad landing pages (PDF §10.4):** Noindex template with no main menu: /start/weight-loss, /start/diabetes, /start/pmos-perimenopause, /start/midlife-reset, /start/nri.
- **Free guides (PDF §9):** Download pages at /guides/diwali, /guides/sugar-sense and /guides/midlife in exchange for name + WhatsApp.
- **Blog system (PDF §11.1):** A template she can post to from her iPhone with a simple admin login. Fields, categories and layout are in the brief.

## 4. SEO

- **Tools (PDF §6.1):** Search Console and Bing Webmaster verified, sitemap submitted, key pages requested for indexing.
- **Titles and descriptions (PDF §6.2):** Paste her exact text. One H1 per page.
- **Clean URLs (PDF §6.3):** e.g. `/about.php` → `/about`, with all internal links updated.
- **Structured data (PDF §6.4):** Organization, Person, FAQPage, Service, Breadcrumb, Article, VideoObject. Reviews markup only from real Google reviews.
- **Technical (PDF §6.5):** Auto-updating sitemap, robots.txt, canonicals, full HTTPS, noindex on thank-you and ad pages, `lang="en-IN"`, content-named images, internal links.
- **Keywords (PDF §6.6):** Each page owns the phrase she assigned to it.

## 5. Speed and Accessibility (PDF §7)

She wants mobile PageSpeed of 80+, LCP under 2.5 s, INP under 200 ms and CLS under 0.1, with before and after reports sent to her. Also WebP images, self-hosted fonts, old scripts removed, caching and compression, 48 px tap spacing, 16 px minimum text, 4.5:1 contrast, and visible form labels.

## 6. Social Media (PDF §5.5)

- **Instagram:** latest 6 posts, lazy-loaded, on Home and /media.
- **YouTube:** "Latest videos" block with Subscribe on /media.
- **LinkedIn and Medium:** linked in the footer and author box. Medium reposts carry a canonical link back to the site.
- **Bio links:** every profile points to the site with UTM tags.
- **Handles:** Instagram @muktapatil01 and @eatrrite, linkedin.com/in/19muktapatil, YouTube, Medium.

## 7. Third-Party Integrations and Automations

- **Google Business Profile (PDF §8.1):** Find or create it (category Nutritionist), managed from the marketing account. The brief says it could not be found in a search, and the site's "4.8 ★" depends on it.
- **WhatsApp API (PDF §9):** Through Interakt, WATI or AiSensy (her choice), connected to the booking sheet. Sends confirmation, questionnaire link and Meet link, reminders 24 hours and 1 hour before, and a review request when a program ends.
- **Google Calendar (PDF §9):** Each booking creates an event with a Meet link and blocks double-booking.
- **Booking source (PDF §9):** Hidden fields save UTMs into the booking sheet.

## 8. Ads and Tracking (PDF §8.4, §10)

- **Setup:** Everything goes through Google Tag Manager: GA4, Google Ads with enhanced conversions, Meta Pixel + Conversions API, and Consent Mode v2.
- **Cookie banner:** "Accept" and "Reject" with equal weight.
- **Events:** page_view, view_program, click_whatsapp, click_call, start_booking, booking_complete, guide_signup. No health information or personal data in events or URLs.
- **Ownership:** Mukta owns every account. You get access only.
- **Meta check:** Once the pixel is live, check how Meta classifies the site and tell her.
- **Ad-safe pages:** No "cure" or "guaranteed" claims and no before/after body photos.

## 9. Ongoing (PDF §8.1, §11.2)

- A one-page monthly report: Search Console, Business Profile, GA4, bookings by source, cost per booking, mobile speed.
- A check for leftover 404s after four weeks.
- Replies to every Google review. The brief does not say who does this, so confirm with her.

## 10. What You Need From Mukta (PDF §12)

**Access:** Hosting and code, domain DNS, Google accounts (marketing.eatrrite@gmail.com), Meta Events Manager, booking sheet and script.

**Answers:**
1. Google reviews profile link
2. YouTube testimonial links
3. Written consent from Anju and other clients
4. Certificate and award images
5. Event photo captions
6. OK to reprint the columns in full
7. Dates of the 4 undated columns
8. WhatsApp provider choice
