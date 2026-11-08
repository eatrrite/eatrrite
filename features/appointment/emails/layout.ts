import { LOGO_CID, LOGO_HEIGHT, LOGO_WIDTH } from "@/features/appointment/emails/logo";

// The site's colours (app/globals.css) and type, written inline because mail apps drop
// stylesheets. Headings use Libre Baskerville and text Merriweather where the mail app loads
// web fonts (Apple Mail, iOS); everywhere else Georgia keeps the same serif look.
const C = {
  primary: "#014e4e",
  primaryDark: "#003636",
  accent: "#e5b858",
  cream: "#f8f5f0",
  mint: "#f1f7f4",
  ink: "#1c2029",
  text: "#595b62",
  muted: "#819291",
  border: "rgba(1,78,78,0.12)",
};
const HEADING = "'Libre Baskerville',Georgia,'Times New Roman',serif";
const BODY = "Merriweather,Georgia,'Times New Roman',serif";

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const SIGN_OFF = `<p style="margin:32px 0 0;font-size:15px;line-height:1.6;color:${C.text};">Warm regards,</p>
<p style="margin:4px 0 0;font-family:${HEADING};font-style:italic;font-size:18px;color:${C.primary};">Mukta Patil</p>
<p style="margin:2px 0 0;font-size:12px;color:${C.muted};">Founder, Eat Rrite · Nutritionist, Yoga Teacher &amp; Life Coach</p>`;

type EmailParts = {
  /** Hidden line shown after the subject in the inbox list. */
  preheader: string;
  /** Small italic line above the heading, like the site's eyebrows. */
  eyebrow: string;
  heading: string;
  /** Already-escaped HTML for the opening paragraph. */
  intro: string;
  body: string;
  /** Mukta's sign-off; off for the team's own notification. */
  signOff?: boolean;
};

// One email: logo, teal welcome band with gold rule, white content, mint contact footer.
export function emailLayout({ preheader, eyebrow, heading, intro, body, signOff = true }: EmailParts): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>Eat Rrite</title>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet"></head>
<body style="margin:0;padding:0;background:${C.cream};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.cream};"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;">
<tr><td align="center" style="padding:0 0 22px;"><img src="cid:${LOGO_CID}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="Eat Rrite" style="display:block;width:${LOGO_WIDTH}px;height:auto;border:0;"></td></tr>
<tr><td style="background:#ffffff;border:1px solid ${C.border};border-radius:24px;overflow:hidden;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tr><td style="background:${C.primary};background-image:linear-gradient(135deg,${C.primary},${C.primaryDark});padding:36px 36px 32px;border-radius:24px 24px 0 0;">
<p style="margin:0 0 10px;font-family:${HEADING};font-style:italic;font-size:16px;color:${C.accent};">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;font-family:${HEADING};font-size:26px;line-height:1.3;font-weight:700;color:#ffffff;">${escapeHtml(heading)}</h1>
<div style="width:48px;height:3px;background:${C.accent};border-radius:3px;margin:18px 0 0;font-size:0;line-height:0;">&nbsp;</div>
</td></tr>
<tr><td style="padding:32px 36px 36px;font-family:${BODY};">
<p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:${C.text};">${intro}</p>
${body}
${signOff ? SIGN_OFF : ""}
</td></tr>
<tr><td style="background:${C.mint};padding:24px 36px;border-top:1px solid ${C.border};border-radius:0 0 24px 24px;font-family:${BODY};">
<p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:${C.text};">Consultations are 30 minutes on Google Meet, at your booked time (IST).</p>
<p style="margin:0;font-size:13px;line-height:1.8;">
<a href="https://wa.me/919639877483" style="color:${C.primary};font-weight:700;text-decoration:none;">WhatsApp</a>
<span style="color:${C.muted};">&nbsp;·&nbsp;</span><a href="tel:+919639877483" style="color:${C.primary};font-weight:700;text-decoration:none;">+91 96398 77483</a>
<span style="color:${C.muted};">&nbsp;·&nbsp;</span><a href="mailto:info@eatrrite.com" style="color:${C.primary};font-weight:700;text-decoration:none;">info@eatrrite.com</a></p>
</td></tr></table></td></tr>
<tr><td align="center" style="padding:22px 24px 0;font-family:${BODY};font-size:12px;line-height:1.7;color:${C.muted};">
General guidance, not medical advice. With a medical condition, follow your doctor.<br>&copy; ${year} Eat Rrite · <a href="https://www.eatrrite.com" style="color:${C.muted};">www.eatrrite.com</a>
</td></tr></table></td></tr></table></body></html>`;
}

// Booking details as label / value rows on a mint card.
export const detailsCard = (rows: [string, string][]) =>
  `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.mint};border:1px solid ${C.border};border-radius:16px;">${rows
    .map(
      ([label, value], i) =>
        `<tr><td style="padding:14px 20px;${i ? `border-top:1px solid ${C.border};` : ""}font-size:13px;color:${C.muted};width:38%;vertical-align:top;">${label}</td><td style="padding:14px 20px;${i ? `border-top:1px solid ${C.border};` : ""}font-size:14px;font-weight:700;color:${C.ink};word-break:break-word;">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

// The teal pill button, as on the site, with the address written out under it.
export const button = (href: string, label: string) =>
  `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 0;"><tr><td style="background:${C.primary};border-radius:999px;">
<a href="${escapeHtml(href)}" style="display:inline-block;padding:15px 32px;font-family:${BODY};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${label}</a></td></tr></table>
<p style="margin:12px 0 0;font-size:12px;line-height:1.6;color:${C.muted};word-break:break-all;">Or open: <a href="${escapeHtml(href)}" style="color:${C.primary};">${escapeHtml(href)}</a></p>`;

// A soft cream panel for what happens next.
export const note = (html: string) =>
  `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:28px 0 0;"><tr><td style="background:${C.cream};border-radius:16px;padding:16px 20px;font-size:14px;line-height:1.7;color:${C.text};">${html}</td></tr></table>`;
