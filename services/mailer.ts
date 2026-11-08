import "server-only";
import nodemailer from "nodemailer";
import { env } from "@/config/env";
import { LOGO_CID, LOGO_PNG_BASE64 } from "@/features/appointment/emails/logo";

export type Mail = { to: string; subject: string; html: string; replyTo?: string };

// Sends one email over the SMTP account the PHP site used (PHPMailer settings).
// Returns false, with a log line, when mail is not set up or sending fails, so a booking
// never fails because of an email.
// A readable plain-text copy for mail apps that do not show HTML.
function plainText(html: string): string {
  return html
    .replace(/<head>[\s\S]*?<\/head>/i, "")
    .replace(/<div style="display:none[\s\S]*?<\/div>/i, "")
    .replace(/<br\s*\/?>|<\/(p|tr|h1)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&middot;|&copy;/g, "")
    .replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export async function sendMail({ to, subject, html, replyTo }: Mail): Promise<boolean> {
  const host = env.smtpHost();
  const user = env.smtpUser();
  if (!host || !user || !env.smtpPass() || !to) {
    console.warn(`Email skipped (mail not set up): ${subject}`);
    return false;
  }
  const port = env.smtpPort();
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: env.smtpPass() },
  });
  try {
    await transport.sendMail({
      from: { name: env.mailFromName(), address: env.mailFrom() || user },
      to,
      replyTo,
      subject,
      html,
      text: plainText(html),
      // The logo travels inside the email (cid:eatrrite-logo), so it shows in every mail app.
      attachments: [{ filename: "eatrrite-logo.png", content: Buffer.from(LOGO_PNG_BASE64, "base64"), cid: LOGO_CID, contentType: "image/png" }],
    });
    return true;
  } catch (error) {
    console.error(`Email failed: ${subject}`, error);
    return false;
  }
}
