import { BRAND } from "@/constants/brand";
import { LOGO_CID, LOGO_HEIGHT, LOGO_WIDTH } from "@/emails/logo";
import { BODY_FONT, EMAIL_COLORS as C, HEADING_FONT, escapeHtml } from "@/emails/theme";

// Phones (Gmail, Apple Mail and Outlook apps read this): less padding, smaller type, and the
// detail rows stack label over value so nothing wraps into narrow columns.
const MOBILE_CSS = `@media only screen and (max-width:620px){
.er-outer{padding:12px 0 20px!important}
.er-logo{padding:4px 0 14px!important}
.er-logo img{width:150px!important}
.er-card{border-radius:18px!important}
.er-band{padding:22px 20px 20px!important;border-radius:18px 18px 0 0!important}
.er-band h1{font-size:21px!important}
.er-eyebrow{font-size:14px!important;margin-bottom:6px!important}
.er-body{padding:20px 20px 24px!important}
.er-body p,.er-note{font-size:14px!important;line-height:1.65!important}
.er-row td{display:block!important;width:auto!important;padding:10px 16px 0!important;border-top:0!important}
.er-row td.er-value{padding:2px 16px 10px!important}
.er-row+.er-row td.er-label{border-top:1px solid ${C.border}!important;padding-top:10px!important}
.er-btn a{display:block!important;text-align:center!important;padding:14px 20px!important}
.er-btn{width:100%!important}
.er-foot{padding:18px 20px!important;border-radius:0 0 18px 18px!important}
.er-legal{padding:16px 16px 0!important}
}`;

const SIGN_OFF = `<p style="margin:28px 0 0;font-size:15px;line-height:1.6;color:${C.text};">Warm regards,</p>
<p style="margin:4px 0 0;font-family:${HEADING_FONT};font-style:italic;font-size:18px;color:${C.primary};">${BRAND.founder}</p>
<p style="margin:2px 0 0;font-size:12px;line-height:1.5;color:${C.muted};">Founder, ${BRAND.name} · Nutritionist, Yoga Teacher &amp; Life Coach</p>`;

const LINK = `color:${C.primary};font-weight:700;text-decoration:none;`;
const DOT = `<span style="color:${C.muted};">&nbsp;·&nbsp;</span>`;
const WHATSAPP_CHAT = `https://wa.me/${BRAND.phoneHref.replace(/\D/g, "")}`;

export type EmailParts = {
  /** Hidden line shown after the subject in the inbox list. */
  preheader: string;
  /** Small italic line above the heading, like the site's eyebrows. */
  eyebrow: string;
  heading: string;
  /** Already-escaped HTML for the opening paragraph. */
  intro: string;
  body: string;
  /** Mukta's sign-off; off for the team's own notifications. */
  signOff?: boolean;
  /** First line of the beige footer, above the contact links. */
  footerNote?: string;
};

// The beige footer: one line, then WhatsApp, phone and email from constants/brand.ts.
function contactFooter(footerNote: string): string {
  return `<tr><td class="er-foot" style="background:${C.beige};padding:22px 32px;border-top:1px solid ${C.border};border-radius:0 0 24px 24px;font-family:${BODY_FONT};">
<p style="margin:0 0 6px;font-size:13px;line-height:1.6;color:${C.text};">${escapeHtml(footerNote)}</p>
<p style="margin:0;font-size:13px;line-height:1.8;">
<a href="${WHATSAPP_CHAT}" style="${LINK}">WhatsApp</a>${DOT}<a href="${BRAND.phoneHref}" style="${LINK}white-space:nowrap;">${BRAND.phone}</a>${DOT}<a href="${BRAND.emailHref}" style="${LINK}">${BRAND.email}</a></p>
</td></tr>`;
}

// One email: logo, teal welcome band with gold rule, white content, beige contact footer.
export function emailLayout(parts: EmailParts): string {
  const { preheader, eyebrow, heading, intro, body, signOff = true } = parts;
  const footerNote = parts.footerNote ?? "Questions about your booking? We're happy to help.";
  const year = new Date().getFullYear();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${escapeHtml(heading)}</title>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet"><style>${MOBILE_CSS}</style></head>
<body style="margin:0;padding:0;background:${C.cream};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.cream};"><tr><td class="er-outer" align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;">
<tr><td class="er-logo" align="center" style="padding:0 0 20px;"><img src="cid:${LOGO_CID}" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="${BRAND.name}" style="display:block;width:${LOGO_WIDTH}px;height:auto;border:0;"></td></tr>
<tr><td class="er-card" style="background:#ffffff;border:1px solid ${C.border};border-radius:24px;overflow:hidden;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tr><td class="er-band" style="background:${C.primary};background-image:linear-gradient(135deg,${C.primary},${C.primaryDark});padding:32px 32px 28px;border-radius:24px 24px 0 0;">
<p class="er-eyebrow" style="margin:0 0 8px;font-family:${HEADING_FONT};font-style:italic;font-size:15px;color:${C.accent};">${escapeHtml(eyebrow)}</p>
<h1 style="margin:0;font-family:${HEADING_FONT};font-size:25px;line-height:1.3;font-weight:700;color:#ffffff;">${escapeHtml(heading)}</h1>
<div style="width:44px;height:3px;background:${C.accent};border-radius:3px;margin:16px 0 0;font-size:0;line-height:0;">&nbsp;</div>
</td></tr>
<tr><td class="er-body" style="padding:28px 32px 32px;font-family:${BODY_FONT};">
<p style="margin:0 0 22px;font-size:15px;line-height:1.75;color:${C.text};">${intro}</p>
${body}
${signOff ? SIGN_OFF : ""}
</td></tr>
${contactFooter(footerNote)}</table></td></tr>
<tr><td class="er-legal" align="center" style="padding:20px 24px 0;font-family:${BODY_FONT};font-size:12px;line-height:1.7;color:${C.muted};">
${escapeHtml(BRAND.disclaimer)}<br>&copy; ${year} ${BRAND.name} · <a href="${BRAND.url}" style="color:${C.muted};">www.eatrrite.com</a>
</td></tr></table></td></tr></table></body></html>`;
}
