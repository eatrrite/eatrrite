"use server";

import { after } from "next/server";
import { BRAND } from "@/constants/brand";
import { sendAdminEnquiryEmail, sendEnquiryReceivedEmail } from "@/features/contact/services/enquiryEmails";
import { sendAdminEnquiryWhatsApp, sendEnquiryReceivedWhatsApp } from "@/features/contact/services/enquiryWhatsApp";
import { validateEnquiry } from "@/features/contact/utils/validateEnquiry";
import type { ActionResult } from "@/utils/actionResult";

const NOT_DELIVERED = `We could not send your enquiry just now. Please WhatsApp or call us on ${BRAND.phone}.`;

// The contact form. The team gets the enquiry by email and WhatsApp first; only when at least
// one reached them does the visitor get "we have received your enquiry" (email and WhatsApp),
// after the page has its answer. Nothing is stored: the messages are the record.
export async function submitEnquiryAction(form: Record<string, unknown>): Promise<ActionResult> {
  // A hidden field people never see. Bots fill it in: tell them it worked and send nothing.
  if (typeof form.website === "string" && form.website.trim()) {
    console.warn("Enquiry ignored (hidden spam field filled)");
    return { ok: true };
  }
  const input = validateEnquiry(form);
  if (typeof input === "string") return { ok: false, error: input };

  const [emailSent, whatsAppSent] = await Promise.all([sendAdminEnquiryEmail(input), sendAdminEnquiryWhatsApp(input)]);
  if (!emailSent && !whatsAppSent) {
    console.error("Enquiry not delivered: the team email and WhatsApp both failed or are not set up");
    return { ok: false, error: NOT_DELIVERED };
  }
  after(() => sendEnquiryReceivedEmail(input));
  after(() => sendEnquiryReceivedWhatsApp(input));
  return { ok: true };
}
