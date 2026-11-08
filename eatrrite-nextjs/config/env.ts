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
  neonAuthBaseUrl: () => readEnv("NEON_AUTH_BASE_URL"),
  neonAuthCookieSecret: () => readEnv("NEON_AUTH_COOKIE_SECRET"),
  adminEmails: () => readEnv("ADMIN_EMAILS"),
};
