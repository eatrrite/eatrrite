import { BODY_FONT, EMAIL_COLORS as C, HEADING_FONT, escapeHtml } from "@/emails/theme";

export type DetailRow = [label: string, value: string];

// Details as label / value rows on a beige card. On phones each label sits above its value.
export function detailsCard(rows: DetailRow[]): string {
  const cells = rows.map(([label, value], index) => {
    const line = index === 0 ? "" : `border-top:1px solid ${C.border};`;
    return `<tr class="er-row"><td class="er-label" style="padding:13px 20px;${line}font-size:13px;color:${C.muted};width:32%;vertical-align:top;">${escapeHtml(label)}</td><td class="er-value" style="padding:13px 20px;${line}font-size:14px;font-weight:700;color:${C.ink};word-break:break-word;white-space:pre-line;">${escapeHtml(value)}</td></tr>`;
  });
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.beige};border:1px solid ${C.border};border-radius:16px;">${cells.join("")}</table>`;
}

// The main action: the teal pill button, as on the site, full width on phones, with the
// address written out under it for mail apps that block buttons.
export function button(href: string, label: string): string {
  return `<table role="presentation" class="er-btn" cellspacing="0" cellpadding="0" style="margin:24px 0 0;"><tr><td style="background:${C.primary};border-radius:999px;">
<a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 30px;font-family:${BODY_FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a></td></tr></table>
<p style="margin:10px 0 0;font-size:12px;line-height:1.6;color:${C.muted};word-break:break-all;">Button not working? Open: <a href="${escapeHtml(href)}" style="color:${C.primary};">${escapeHtml(href)}</a></p>`;
}

// A second action under the main one: an outlined pill, so the main button stays first.
export function secondaryButton(href: string, label: string): string {
  return `<table role="presentation" class="er-btn" cellspacing="0" cellpadding="0" style="margin:14px 0 0;"><tr><td style="border:2px solid ${C.primary};border-radius:999px;">
<a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 28px;font-family:${BODY_FONT};font-size:15px;font-weight:700;color:${C.primary};text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a></td></tr></table>`;
}

// A small heading inside the body, for "Your booking" and similar.
export function sectionTitle(text: string): string {
  return `<p style="margin:26px 0 10px;font-family:${HEADING_FONT};font-size:15px;font-weight:700;color:${C.ink};">${escapeHtml(text)}</p>`;
}

// A soft cream panel for what happens next. Takes plain text.
export function note(text: string): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0 0;"><tr><td class="er-note" style="background:${C.cream};border-radius:16px;padding:16px 20px;font-size:14px;line-height:1.7;color:${C.text};">${escapeHtml(text)}</td></tr></table>`;
}
