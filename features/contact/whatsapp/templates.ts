import { WHATSAPP_TEMPLATES } from "@/constants/whatsappTemplates";
import type { EnquiryInput } from "@/features/contact/types/enquiry";
import type { WhatsAppMessage } from "@/services/whatsapp";
import { firstName } from "@/utils/name";

// Contact-form WhatsApp messages. Variables in the order of the template's {{1}}, {{2}}…
// (wording and buttons: docs/messages.md). The free-text message never goes on WhatsApp:
// it may hold health details, so it stays in the team email.

// enquiry_received: {{1}} first name, {{2}} program. No buttons.
export function enquiryReceivedMessage(data: EnquiryInput): WhatsAppMessage {
  return {
    template: WHATSAPP_TEMPLATES.enquiryReceived,
    bodyParams: [firstName(data.name) || "there", data.program],
  };
}

// admin_new_enquiry: {{1}} name, {{2}} mobile, {{3}} city, {{4}} program. No buttons: Meta does
// not allow wa.me links in buttons, and WhatsApp makes the "+91 …" mobile tappable (chat or call).
export function adminNewEnquiryMessage(data: EnquiryInput): WhatsAppMessage {
  return {
    template: WHATSAPP_TEMPLATES.adminNewEnquiry,
    bodyParams: [data.name, `+91 ${data.phone}`, data.city || "Not given", data.program],
  };
}
