import { BRAND } from "@/constants/brand";
import { ROUTES } from "@/constants/routes";
import { emailLayout } from "@/emails/layout";
import { button, detailsCard, note, secondaryButton, sectionTitle, type DetailRow } from "@/emails/parts";
import { escapeHtml } from "@/emails/theme";
import type { EnquiryInput } from "@/features/contact/types/enquiry";
import { firstName } from "@/utils/name";

// Contact-form emails. Each one has a WhatsApp twin with the same news (docs/messages.md).

// The rows the visitor filled in, leaving out the empty optional ones.
function enquiryRows(data: EnquiryInput): DetailRow[] {
  const city: DetailRow[] = data.city ? [["City", data.city]] : [];
  const message: DetailRow[] = data.message ? [["Message", data.message]] : [];
  return [["Program", data.program], ...city, ...message];
}

// 1. Customer, after the contact form (only when they gave an email).
export const enquiryReceivedEmail = (data: EnquiryInput, siteUrl: string) => ({
  subject: `We have received your enquiry, ${firstName(data.name) || "thank you"}`,
  html: emailLayout({
    preheader: "Thank you for contacting Eat Rrite. We will get back to you soon.",
    eyebrow: "Enquiry received",
    heading: "Thank you for reaching out",
    intro: `Hi ${escapeHtml(firstName(data.name) || "there")}, thank you for contacting ${BRAND.name}. We have received your enquiry, and our team will get back to you soon on WhatsApp or by phone at +91 ${escapeHtml(data.phone)}.`,
    footerNote: "Anything to add? Reply to this email or message us.",
    body:
      sectionTitle("Your enquiry") +
      detailsCard(enquiryRows(data)) +
      note("Ready to begin? You can book a 30-minute online consultation at a time that suits you.") +
      button(`${siteUrl}${ROUTES.appointment}`, "Book a consultation"),
  }),
});

// 2. Team, after the contact form, to every ADMIN_NOTIFY_EMAIL address.
export const adminNewEnquiryEmail = (data: EnquiryInput, whatsAppChat: string) => ({
  subject: `New enquiry: ${data.name}, ${data.program}`,
  html: emailLayout({
    preheader: `${data.name} · +91 ${data.phone} · ${data.program}`,
    eyebrow: "New website enquiry",
    heading: `New enquiry from ${data.name}`,
    intro: "Someone sent the contact form on the website. Reply on WhatsApp or call them back.",
    signOff: false,
    footerNote: "Sent to the team from the website contact form.",
    body:
      button(whatsAppChat, "Reply on WhatsApp") +
      secondaryButton(`tel:+91${data.phone}`, `Call +91 ${data.phone}`) +
      sectionTitle("Enquiry") +
      detailsCard([["Name", data.name], ["Mobile", `+91 ${data.phone}`], ["Email", data.email || "Not given"], ...enquiryRows(data)]),
  }),
});
