"use client";

import { useActionState } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard, AuthError } from "@/features/auth/components/AuthCard";
import { requestPasswordResetAction } from "@/features/auth/services/passwordActions";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";

// "Forgot password?": asks for the email and sends a one-time reset link to it.
export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, null);
  const sent = state !== null && "sent" in state;

  return (
    <AuthCard title="Reset your password" lead="Enter your admin email and we'll send you a link to set a new password.">
      {sent ? (
        <div className="mt-6 flex gap-3 rounded-xl bg-mint p-4 text-sm text-foreground">
          <MailCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
          <p className="m-0">If that email has an admin account, a reset link is on its way. It works once and expires soon, so use it shortly. Check your spam folder if it doesn&apos;t arrive.</p>
        </div>
      ) : (
        <form action={formAction} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input id="reset-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </div>
          {state && "error" in state ? <AuthError message={state.error} /> : null}
          <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full">
            {pending ? "Sending link…" : "Send reset link"}
          </Button>
        </form>
      )}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link href={ADMIN_ROUTES.login} className="font-medium text-primary hover:underline">Back to log in</Link>
      </p>
    </AuthCard>
  );
}
