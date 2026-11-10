"use client";

import { useState } from "react";
import { KeyRound, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { DashboardCard } from "@/components/admin/dashboard/DashboardCard";
import { ProfileFormDialog } from "@/components/admin/account/ProfileFormDialog";
import { Button } from "@/components/ui/button";
import { sendMyResetLinkAction } from "@/features/auth/services/passwordActions";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";
import { useShowToast } from "@/hooks/useShowToast";

// The admin's own card: details, Edit profile, and a password reset link sent to their email.
export function ProfileHeroCard() {
  const profile = useAdminProfile();
  const showToast = useShowToast();
  const [editing, setEditing] = useState(false);
  const [sending, setSending] = useState(false);

  const sendResetLink = async () => {
    setSending(true);
    const id = showToast({ title: "Sending the reset link…", type: "pending" });
    const result = await sendMyResetLinkAction();
    setSending(false);
    if (!result.ok) return showToast({ title: "Link not sent", description: result.error, type: "error", id });
    showToast({ title: "Reset link sent", description: `Check ${result.email} for a link to set a new password.`, type: "success", id });
  };

  return (
    <DashboardCard>
      {/* Teal band with the admin's initials and name, like the lead and appointment cards. */}
      <div className="relative -mx-4 -mt-4 mb-5 flex items-center gap-4 overflow-hidden rounded-t-2xl bg-linear-to-br from-primary to-primary-dark px-5 py-6 text-white sm:-mx-5 sm:-mt-5">
        <div aria-hidden className="absolute -top-12 -right-10 size-40 rounded-full bg-accent/20 blur-2xl" />
        <span className="relative inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-base font-bold text-ink ring-4 ring-white/15">
          {profile.initials}
        </span>
        <div className="relative min-w-0">
          <p className="m-0 type-eyebrow text-lg text-accent">Admin</p>
          <p className="truncate font-heading text-2xl font-bold text-white">{profile.name}</p>
        </div>
      </div>
      <div className="space-y-2.5 rounded-xl border border-border bg-background px-3.5 py-3">
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Mail className="size-3.5 shrink-0 text-primary" />
          {profile.email}
        </p>
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Phone className="size-3.5 shrink-0 text-primary" />
          {profile.mobile ?? "Mobile not added"}
        </p>
        <p className="flex items-start gap-2.5 text-sm text-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
          {profile.address ?? "Address not added"}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Button type="button" onClick={() => setEditing(true)}>
          <Pencil data-icon="inline-start" />
          Edit profile
        </Button>
        <Button type="button" variant="outline" disabled={sending} onClick={() => void sendResetLink()}>
          <KeyRound data-icon="inline-start" />
          {sending ? "Sending…" : "Reset password"}
        </Button>
      </div>
      <ProfileFormDialog open={editing} onClose={() => setEditing(false)} />
    </DashboardCard>
  );
}
