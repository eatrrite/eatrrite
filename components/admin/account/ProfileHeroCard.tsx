"use client";

import { useState } from "react";
import { KeyRound, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { DashboardCard, DashboardCardHeader } from "@/components/admin/dashboard/DashboardCard";
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
      <DashboardCardHeader
        icon={<span className="font-heading text-sm font-bold">{profile.initials}</span>}
        title={profile.name}
        subtitle="Admin"
      />
      <div className="space-y-2.5 rounded-xl bg-mint px-3.5 py-3">
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Mail className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.email}
        </p>
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Phone className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.mobile ?? "Mobile not added"}
        </p>
        <p className="flex items-start gap-2.5 text-sm text-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
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
