import "server-only";
import nodemailer from "nodemailer";
import { env } from "@/config/env";

export type Mail = { to: string; subject: string; html: string; replyTo?: string };

// Sends one email over the SMTP account the PHP site used (PHPMailer settings).
// Returns false, with a log line, when mail is not set up or sending fails, so a booking
// never fails because of an email.
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
      text: html.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim(),
    });
    return true;
  } catch (error) {
    console.error(`Email failed: ${subject}`, error);
    return false;
  }
}
