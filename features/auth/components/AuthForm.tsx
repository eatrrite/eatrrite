"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/constants/brand";
import { signInAction, signUpAction } from "@/features/auth/services/authActions";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";

const COPY = {
  login: {
    eyebrow: "Admin",
    title: "Sign in",
    lead: "Sign in to manage leads, appointments and the schedule.",
    submit: "Sign in",
    busy: "Signing in…",
    switchText: "First time here?",
    switchLink: { label: "Create the admin account", href: ADMIN_ROUTES.signup },
  },
  signup: {
    eyebrow: "Admin",
    title: "Create account",
    lead: "Only the Eat Rrite admin email can create an account.",
    submit: "Create account",
    busy: "Creating account…",
    switchText: "Already have an account?",
    switchLink: { label: "Sign in", href: ADMIN_ROUTES.login },
  },
} as const;

// Admin sign-in and sign-up. The server action does the work; errors show under the fields.
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const copy = COPY[mode];
  const [state, formAction, pending] = useActionState(mode === "login" ? signInAction : signUpAction, null);

  return (
    <form action={formAction} className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <Image src={BRAND.logo} alt={BRAND.name} width={1162} height={332} priority className="h-12 w-auto" />
      <p className="mt-6 type-eyebrow">{copy.eyebrow}</p>
      <h1 className="mt-1 font-heading text-3xl font-bold text-foreground">{copy.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{copy.lead}</p>

      <div className="mt-6 grid gap-4">
        {mode === "signup" ? (
          <div className="grid gap-2">
            <Label htmlFor="auth-name">Full name</Label>
            <Input id="auth-name" name="name" autoComplete="name" required placeholder="Mukta Patil" />
          </div>
        ) : null}
        <div className="grid gap-2">
          <Label htmlFor="auth-email">Email</Label>
          <Input id="auth-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="auth-password">Password</Label>
          <Input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={mode === "signup" ? 8 : undefined}
            required
          />
        </div>
      </div>

      {state?.error ? (
        <p role="alert" className="mt-4 rounded-lg bg-alert-bg px-3 py-2 text-sm text-alert-text">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="mt-6 w-full">
        {pending ? copy.busy : copy.submit}
      </Button>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        {copy.switchText}{" "}
        <Link href={copy.switchLink.href} className="font-medium text-primary hover:underline">
          {copy.switchLink.label}
        </Link>
      </p>
    </form>
  );
}
