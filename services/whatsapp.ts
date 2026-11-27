import "server-only";
import { env } from "@/config/env";
import { WHATSAPP_GRAPH_VERSION, WHATSAPP_LANGUAGE } from "@/constants/whatsappTemplates";
import { whatsAppNumber } from "@/utils/phone";

const TIMEOUT_MS = 10_000;
// Meta rejects an empty variable, so an empty value is sent as this.
const EMPTY_PARAM = "-";

/** A URL button whose address ends in a variable; `index` is the button's position in the template (0 first). */
export type UrlButtonParam = { index: number; text: string };

/** One template message: its name, the body variables {{1}}, {{2}}… in order, and any URL button variables. */
export type WhatsAppMessage = { template: string; bodyParams: string[]; buttons?: UrlButtonParam[] };

type MetaError = { error?: { code?: number; message?: string } };

// Meta rejects variables with new lines, tabs or runs of spaces, so they become single spaces.
export function cleanParam(text: string): string {
  const clean = text.replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim();
  if (!clean) return EMPTY_PARAM;
  return clean;
}

// The template's "components": the body variables, then one entry per URL button variable.
function templateComponents(message: WhatsAppMessage) {
  const body = {
    type: "body",
    parameters: message.bodyParams.map((text) => ({ type: "text", text: cleanParam(text) })),
  };
  const buttons = (message.buttons ?? []).map((button) => ({
    type: "button",
    sub_type: "url",
    index: String(button.index),
    parameters: [{ type: "text", text: button.text }],
  }));
  return [body, ...buttons];
}

// One POST to Meta. Null when the network fails or Meta does not answer in 10 seconds.
async function postToMeta(to: string, message: WhatsAppMessage): Promise<Response | null> {
  const url = `https://graph.facebook.com/${WHATSAPP_GRAPH_VERSION}/${env.whatsappPhoneNumberId()}/messages`;
  try {
    return await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.whatsappToken()}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: { name: message.template, language: { code: WHATSAPP_LANGUAGE }, components: templateComponents(message) },
      }),
    });
  } catch (error) {
    console.error(`WhatsApp failed (network or timeout): ${message.template}`, error);
    return null;
  }
}

// Logs Meta's error code and text (never the phone number). Codes: docs/messages.md.
async function logMetaError(template: string, response: Response): Promise<void> {
  const body = (await response.json().catch(() => null)) as MetaError | null;
  const code = body?.error?.code ?? "none";
  const text = body?.error?.message ?? "no message";
  console.error(`WhatsApp failed: ${template} (HTTP ${response.status}, Meta code ${code}): ${text}`);
}

// Sends one template message. The only function that calls Meta. Returns true when Meta
// accepted the message (not that it was delivered), false otherwise, and never throws.
export async function sendWhatsAppMessage(phone: string, message: WhatsAppMessage): Promise<boolean> {
  if (!env.whatsappToken() || !env.whatsappPhoneNumberId()) {
    console.warn(`WhatsApp skipped (not set up): ${message.template}`);
    return false;
  }
  const to = whatsAppNumber(phone);
  if (!to) {
    console.warn(`WhatsApp skipped (no usable number): ${message.template}`);
    return false;
  }
  const response = await postToMeta(to, message);
  if (!response) return false;
  if (!response.ok) {
    await logMetaError(message.template, response);
    return false;
  }
  return true;
}

// Sends one message to every number in WHATSAPP_ADMIN_NUMBERS, one at a time, so one bad
// number does not stop the others. True when at least one was accepted.
export async function sendWhatsAppToTeam(message: WhatsAppMessage): Promise<boolean> {
  const numbers = env.whatsappAdminNumbers();
  if (numbers.length === 0) {
    console.warn(`WhatsApp skipped (no WHATSAPP_ADMIN_NUMBERS): ${message.template}`);
    return false;
  }
  let anySent = false;
  for (const number of numbers) {
    const sent = await sendWhatsAppMessage(number, message);
    if (sent) anySent = true;
  }
  return anySent;
}
