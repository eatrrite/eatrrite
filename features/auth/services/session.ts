import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";
import type { AdminUser } from "@/features/auth/types";
import { isAdminEmail } from "@/features/auth/utils/adminEmails";
import { neonAuth } from "@/features/auth/services/neonAuth";

// The signed-in admin, or null when nobody is signed in or the email is not an admin email.
// Sessions are per request, so this never runs while pages are prerendered at build time.
export async function currentAdmin(): Promise<AdminUser | null> {
  await connection();
  const { data } = await neonAuth().getSession();
  const user = data?.user;
  if (!user?.email || !isAdminEmail(user.email)) return null;
  return { id: user.id, email: user.email, name: user.name ?? "" };
}

// For admin pages: the admin, or a redirect to the login page.
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await currentAdmin();
  if (!admin) redirect(ADMIN_ROUTES.login);
  return admin;
}

// For server actions: the admin, or an error the caller turns into a message.
export async function assertAdmin(): Promise<AdminUser> {
  const admin = await currentAdmin();
  if (!admin) throw new Error("Your session has ended. Please sign in again.");
  return admin;
}
