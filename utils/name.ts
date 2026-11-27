// "Asha Rao" → "Asha", for greetings in emails and WhatsApp messages. Empty stays empty.
export function firstName(name: string): string {
  const [first] = name.trim().split(/\s+/);
  return first ?? "";
}
