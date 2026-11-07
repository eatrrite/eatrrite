// Server-only settings from .env.local. Never import this in a client component.
function readEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export const env = {
  databaseUrl: () => readEnv("DATABASE_URL"),
  razorpayKeyId: () => readEnv("RAZORPAY_KEY_ID"),
  razorpayKeySecret: () => readEnv("RAZORPAY_KEY_SECRET"),
  razorpayWebhookSecret: () => readEnv("RAZORPAY_WEBHOOK_SECRET"),
  appsScriptUrl: () => readEnv("APPS_SCRIPT_URL"),
  appsScriptSecret: () => readEnv("APPS_SCRIPT_SECRET"),
  feeRupees: () => Number(process.env.APPOINTMENT_FEE_RUPEES ?? 800),
};
