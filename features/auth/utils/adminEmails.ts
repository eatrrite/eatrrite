import "server-only";
import { env } from "@/config/env";

const normalise = (email: string) => email.trim().toLowerCase();

// Only these people may sign up or open the admin (ADMIN_EMAILS in .env.local, comma separated).
export function isAdminEmail(email: string): boolean {
  const allowed = env.adminEmails().split(",").map(normalise).filter(Boolean);
  return allowed.includes(normalise(email));
}
