"use server";

import { redirect } from "next/navigation";
import type { AuthFormState } from "@/features/auth/types";
import { neonAuth } from "@/features/auth/services/neonAuth";
import { ensureProfile } from "@/features/auth/services/profiles";
import { isAdminEmail } from "@/features/auth/utils/adminEmails";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

// Signs in with email and password, then opens the admin. The admin layout makes the profile row
// on first sign-in (loadAdminData), so login does not wait for it twice.
export async function signInAction(_state: AuthFormState, form: FormData): Promise<AuthFormState> {
  const email = text(form, "email").toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };
  if (!isAdminEmail(email)) return { error: "This email does not have admin access." };

  const { data, error } = await neonAuth().signIn.email({ email, password });
  if (error || !data?.user) return { error: error?.message || "Email or password is incorrect." };
  redirect(ADMIN_ROUTES.home);
}

// Creates an admin account. Only emails in ADMIN_EMAILS may sign up.
export async function signUpAction(_state: AuthFormState, form: FormData): Promise<AuthFormState> {
  const name = text(form, "name");
  const email = text(form, "email").toLowerCase();
  const password = String(form.get("password") ?? "");
  if (name.length < 2) return { error: "Enter your full name." };
  if (!isAdminEmail(email)) return { error: "This email cannot create an admin account." };
  if (password.length < 8) return { error: "Use a password of at least 8 characters." };

  const { data, error } = await neonAuth().signUp.email({ name, email, password });
  if (error || !data?.user) return { error: error?.message || "Could not create the account. Try again." };
  await ensureProfile({ id: data.user.id, email, name });
  redirect(ADMIN_ROUTES.home);
}

export async function signOutAction() {
  await neonAuth().signOut();
  redirect(ADMIN_ROUTES.login);
}
