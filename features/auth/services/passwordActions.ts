"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/config/env";
import { neonAuth } from "@/features/auth/services/neonAuth";
import { assertAdmin } from "@/features/auth/services/session";
import type { AuthFormState, ResetRequestState } from "@/features/auth/types";
import { isAdminEmail } from "@/features/auth/utils/adminEmails";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";
import { attempt, type ActionResult } from "@/utils/actionResult";

// Password reset by email link (Neon Auth). The email holds a one-time link; it opens
// /admin/reset-password?token=… on the site the request came from.
async function sendResetLink(email: string) {
  const origin = (await headers()).get("origin") || env.siteUrl();
  return neonAuth().requestPasswordReset({ email, redirectTo: `${origin}${ADMIN_ROUTES.resetPassword}` });
}

// "Forgot password?" on the login page. Every email gets the same answer, so the form never
// shows which emails have an admin account; only admin emails are actually sent a link.
export async function requestPasswordResetAction(_state: ResetRequestState, form: FormData): Promise<ResetRequestState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter your email address." };
  if (isAdminEmail(email)) {
    const { error } = await sendResetLink(email);
    if (error) console.error("Password reset email failed", error.message);
  }
  return { sent: true };
}

// "Reset password" on the Account page: sends the link to the signed-in admin's own email.
export async function sendMyResetLinkAction(): Promise<ActionResult<{ email: string }>> {
  return attempt(async () => {
    const admin = await assertAdmin();
    const { error } = await sendResetLink(admin.email);
    if (error) throw new Error(error.message || "Could not send the reset link.");
    return { email: admin.email };
  }, "Could not send the reset link.");
}

// The page the email link opens: sets the new password, then back to log in.
export async function resetPasswordAction(_state: AuthFormState, form: FormData): Promise<AuthFormState> {
  const token = String(form.get("token") ?? "");
  const password = String(form.get("password") ?? "");
  if (!token) return { error: "This reset link is not valid. Ask for a new one." };
  if (password.length < 8) return { error: "Use a password of at least 8 characters." };
  if (password !== String(form.get("confirm") ?? "")) return { error: "The two passwords do not match." };
  const { error } = await neonAuth().resetPassword({ newPassword: password, token });
  if (error) return { error: "This reset link has expired or was already used. Ask for a new one." };
  redirect(`${ADMIN_ROUTES.login}?reset=done`);
}
