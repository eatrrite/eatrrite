"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useShowToast } from "@/hooks/useShowToast";
import { useAdminStore } from "@/stores/useAdminStore";

type ProfileFormDialogProps = { open: boolean; onClose: () => void };

// Edit the admin's own name, mobile and address. The email is shown but locked: it is the login.
export function ProfileFormDialog({ open, onClose }: ProfileFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        {open ? <ProfileFormBody onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function ProfileFormBody({ onClose }: { onClose: () => void }) {
  const profile = useAdminStore((s) => s.profile);
  const saveProfile = useAdminStore((s) => s.saveProfile);
  const showToast = useShowToast();
  const [name, setName] = useState(profile?.name ?? "");
  const [mobile, setMobile] = useState(profile?.mobile ?? "");
  const [address, setAddress] = useState(profile?.address ?? "");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setSaving(true);
    const id = showToast({ title: "Saving your profile…", type: "pending" });
    const result = await saveProfile({ name, mobile, address });
    setSaving(false);
    if (!result.ok) return showToast({ title: "Profile not saved", description: result.error, type: "error", id });
    showToast({ title: "Profile updated", description: "Your name and contact details are saved.", type: "success", id });
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">Edit profile</DialogTitle>
        <DialogDescription>Your name and contact details in the admin.</DialogDescription>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="profile-name">Full name</Label>
          <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required minLength={2} maxLength={80} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input id="profile-email" value={profile?.email ?? ""} disabled readOnly />
          <p className="m-0 flex items-start gap-1.5 text-xs text-muted-foreground">
            <Lock className="mt-0.5 size-3 shrink-0" />
            This is your login email, so it cannot be changed here. Ask your developer if it needs to change.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-mobile">Mobile</Label>
          <Input id="profile-mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} autoComplete="tel" placeholder="+91 98765 43210" maxLength={20} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-address">Address</Label>
          <Textarea id="profile-address" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" rows={3} maxLength={200} />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
        </DialogFooter>
      </form>
    </>
  );
}
