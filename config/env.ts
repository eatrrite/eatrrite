// Server-only settings from .env.local. Never import this in a client component.
function readEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

// Optional settings: an empty string when not set, so a feature can fall back (for example the
// placeholder Meet link or skipping an email in development).
const optional = (name: string) => process.env[name]?.trim() ?? "";

export const env = {
  databaseUrl: () => readEnv("DATABASE_URL"),
  razorpayKeyId: () => readEnv("RAZORPAY_KEY_ID"),
  razorpayKeySecret: () => readEnv("RAZORPAY_KEY_SECRET"),
  neonAuthBaseUrl: () => readEnv("NEON_AUTH_BASE_URL"),
  neonAuthCookieSecret: () => readEnv("NEON_AUTH_COOKIE_SECRET"),
  adminEmails: () => readEnv("ADMIN_EMAILS"),
  razorpayWebhookSecret: () => optional("RAZORPAY_WEBHOOK_SECRET"),
  appsScriptUrl: () => optional("APPS_SCRIPT_URL"),
  appsScriptSecret: () => optional("APPS_SCRIPT_SECRET"),
  smtpHost: () => optional("SMTP_HOST"),
  smtpPort: () => Number(optional("SMTP_PORT") || 587),
  smtpUser: () => optional("SMTP_USER"),
  smtpPass: () => optional("SMTP_PASS"),
  mailFrom: () => optional("MAIL_FROM"),
  mailFromName: () => optional("MAIL_FROM_NAME") || "Eat Rrite",
  adminNotifyEmail: () => optional("ADMIN_NOTIFY_EMAIL"),
  cronSecret: () => optional("CRON_SECRET"),
  // Search tools. Each is empty until the owner copies the value from the tool's own screen.
  googleSiteVerification: () => optional("GOOGLE_SITE_VERIFICATION"),
  bingSiteVerification: () => optional("BING_SITE_VERIFICATION"),
  gaMeasurementId: () => optional("GA_MEASUREMENT_ID"),
  // Cosmic (site copy). When not set, the site shows the JSON copy in constants/.
  cosmicBucketSlug: () => optional("COSMIC_BUCKET_SLUG"),
  cosmicReadKey: () => optional("COSMIC_READ_KEY"),
  // Sent by the Cosmic webhook (header x-webhook-secret) so a publish refreshes the site.
  cosmicWebhookSecret: () => optional("COSMIC_WEBHOOK_SECRET"),
  // The public address used in email links and sign-in return links. Set SITE_URL to
  // https://www.eatrrite.com on Vercel: the fallback below may be the vercel.app address.
  // Canonical links and share previews use BRAND.url, not this.
  siteUrl: () =>
    optional("SITE_URL") ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "https://www.eatrrite.com",
};
