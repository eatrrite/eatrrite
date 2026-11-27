const INDIAN_MOBILE = /^[6-9]\d{9}$/;

// A phone number as WhatsApp needs it: country code and digits, no "+" or spaces.
// Only Indian mobiles for now (the forms take 10 digits). Anything else gives null.
//   "98765 43210" → "919876543210"   "098765 43210" → "919876543210"   "+91 98765 43210" → "919876543210"
export function whatsAppNumber(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (INDIAN_MOBILE.test(digits)) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0") && INDIAN_MOBILE.test(digits.slice(1))) return `91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91") && INDIAN_MOBILE.test(digits.slice(2))) return digits;
  return null;
}

// The 10-digit mobile from what a person typed, or "" when it is not one.
export function indianMobile(phone: string): string {
  const number = whatsAppNumber(phone);
  if (!number) return "";
  return number.slice(2);
}
