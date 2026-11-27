import "server-only";
import { env } from "@/config/env";
import { adminNewEnquiryEmail, enquiryReceivedEmail } from "@/features/contact/emails/templates";
import type { EnquiryInput } from "@/features/contact/types/enquiry";
import { sendMail } from "@/services/mailer";

// Customer: "we have received your enquiry". Only when they gave an email.
export async function sendEnquiryReceivedEmail(data: EnquiryInput): Promise<boolean> {
  if (!data.email) return false;
  return sendMail({ to: data.email, ...enquiryReceivedEmail(data, env.siteUrl()) });
}

// Team: the full enquiry, message included. Replying to it answers the visitor.
export async function sendAdminEnquiryEmail(data: EnquiryInput): Promise<boolean> {
  const chat = `https://wa.me/91${data.phone}`;
  return sendMail({ to: env.adminNotifyEmail(), replyTo: data.email || undefined, ...adminNewEnquiryEmail(data, chat) });
}
