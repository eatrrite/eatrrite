"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard, AuthError } from "@/features/auth/components/AuthCard";
import { resetPasswordAction } from "@/features/auth/services/passwordActions";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";

// The page the reset email opens (?token=…). Neon Auth adds ?error=… when the link is no good.
export function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const linkBroken = !token || Boolean(params.get("error"));
  const [state, formAction, pending] = useActionState(resetPasswordAction, null);

  return (
    <AuthCard title="Set a new password" lead="Choose a new password for your admin account.">
      {linkBroken ? (
        <AuthError message="This reset link has expired or was already used. Ask for a new one." />
      ) : (
        <form action={formAction} className="mt-6 grid gap-4">
          <input type="hidden" name="token" value={token} />
          <div className="grid gap-2">
            <Label htmlFor="new-password">New password</Label>
            <Input id="new-password" name="password" type="password" autoComplete="new-password" minLength={8} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input id="confirm-password" name="confirm" type="password" autoComplete="new-password" minLength={8} required />
          </div>
          {state?.error ? <AuthError message={state.error} /> : null}
          <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full">
            {pending ? "Saving…" : "Save new password"}
          </Button>
        </form>
      )}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <Link href={linkBroken ? ADMIN_ROUTES.forgotPassword : ADMIN_ROUTES.login} className="font-medium text-primary hover:underline">
          {linkBroken ? "Send a new link" : "Back to log in"}
        </Link>
      </p>
    </AuthCard>
  );
}
