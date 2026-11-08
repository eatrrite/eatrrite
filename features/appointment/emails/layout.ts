import { env } from "@/config/env";

// The PHP email layout (email/templates/layout.php): brand header, white card, contact footer.
const PRIMARY = "#014e4e";
const ACCENT = "#e5b858";
const MINT = "#f1f7f4";
const TEXT = "#595b62";

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function emailLayout(body: string): string {
  const logo = `${env.siteUrl()}/images/logo/logo-horizontal.png`;
  const year = new Date().getFullYear();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Eat Rrite</title></head>
<body style="margin:0;padding:0;background:${MINT};font-family:Georgia,'Segoe UI',Arial,sans-serif;color:${TEXT};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${MINT};padding:28px 12px;"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(1,78,78,0.12);">
<tr><td style="background:${PRIMARY};padding:26px 32px;border-bottom:4px solid ${ACCENT};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
<td valign="middle"><img src="${logo}" alt="Eat Rrite" width="168" style="display:block;width:168px;max-width:60%;height:auto;background:#ffffff;border-radius:10px;padding:8px 12px;"></td>
<td valign="middle" align="right"><p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${ACCENT};font-weight:700;">Nutrition &amp; Wellness</p>
<p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.2;color:#ffffff;font-weight:600;">Eat Healthy. Live Better.</p></td>
</tr></table></td></tr>
<tr><td style="padding:34px 32px 28px;">${body}</td></tr>
<tr><td style="background:${MINT};padding:22px 32px;border-top:1px solid rgba(1,78,78,0.12);">
<p style="margin:0 0 8px;font-size:13px;line-height:1.55;color:${TEXT};">Consultations are 30 minutes. Please join Google Meet at your booked time (IST).</p>
<p style="margin:0;font-size:13px;color:${PRIMARY};font-weight:600;">Phone: +91 96398 77483 · Email: info@eatrrite.com</p>
</td></tr></table>
<p style="margin:18px 0 0;font-size:12px;color:#819291;">&copy; ${year} Eat Rrite. All rights reserved.</p>
</td></tr></table></body></html>`;
}

// Pieces the templates share: heading, paragraph, details box and the gold button.
export const heading = (text: string) =>
  `<h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;color:${PRIMARY};">${text}</h2>`;
export const paragraph = (html: string, margin = "0 0 22px") =>
  `<p style="margin:${margin};font-size:15px;line-height:1.65;color:${TEXT};">${html}</p>`;
export const detailsBox = (rows: [string, string][]) =>
  `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${MINT};border:1px solid rgba(1,78,78,0.12);border-radius:14px;"><tr><td style="padding:20px 22px;">${rows
    .map(([label, value]) => `<p style="margin:0 0 10px;font-size:14px;color:#1c2029;"><strong style="color:${PRIMARY};">${label}:</strong> ${escapeHtml(value)}</p>`)
    .join("")}</td></tr></table>`;
export const button = (href: string, label: string) =>
  `<p style="margin:0;"><a href="${escapeHtml(href)}" style="display:inline-block;background:${ACCENT};color:#1c2029;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;font-size:15px;">${label}</a></p>
<p style="margin:16px 0 0;font-size:13px;color:#819291;word-break:break-all;">${escapeHtml(href)}</p>`;
