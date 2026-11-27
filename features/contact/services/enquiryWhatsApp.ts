import "server-only";
import type { EnquiryInput } from "@/features/contact/types/enquiry";
import { adminNewEnquiryMessage, enquiryReceivedMessage } from "@/features/contact/whatsapp/templates";
import { sendWhatsAppMessage, sendWhatsAppToTeam } from "@/services/whatsapp";

// Customer: "we have received your enquiry", to the number they typed.
export async function sendEnquiryReceivedWhatsApp(data: EnquiryInput): Promise<boolean> {
  return sendWhatsAppMessage(data.phone, enquiryReceivedMessage(data));
}

// Team: the enquiry, with the visitor's mobile (tap it in WhatsApp to chat or call).
export async function sendAdminEnquiryWhatsApp(data: EnquiryInput): Promise<boolean> {
  return sendWhatsAppToTeam(adminNewEnquiryMessage(data));
}
