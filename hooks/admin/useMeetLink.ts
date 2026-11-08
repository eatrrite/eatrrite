"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createMeetLinkAction } from "@/features/admin/services/meetActions";
import type { AppointmentInput } from "@/types/admin/appointment";

type UseMeetLinkOptions = {
  value: AppointmentInput;
  leadName?: string;
  /** Set when editing: the first link uses the appointment's own id. */
  appointmentId?: string;
  enabled: boolean;
  onCreated: (meetLink: string) => void;
};

// Creates the Meet link through the Apps Script, with a pending toast. One id per link: a
// repeat click returns the same link; generate(true) ("Generate a new link") takes a new id.
export function useMeetLink({ value, leadName, appointmentId, enabled, onCreated }: UseMeetLinkOptions) {
  const [key, setKey] = useState(() => appointmentId ?? crypto.randomUUID());
  const [creating, setCreating] = useState(false);

  async function generate(fresh = false) {
    if (!enabled || creating) return;
    const linkKey = fresh ? crypto.randomUUID() : key;
    setKey(linkKey);
    setCreating(true);
    const id = toast.loading("Creating Google Meet link…");
    const input = { key: linkKey, name: leadName ?? "Client", service: value.service, date: value.date, time: value.time };
    const result = await createMeetLinkAction(input).catch(() => ({ ok: false as const, error: "Check your connection and try again." }));
    setCreating(false);
    if (!result.ok) {
      toast.error("Meet link not created", { id, description: result.error });
      return;
    }
    onCreated(result.meetLink);
    toast.success("Meet link created", { id });
  }

  return { creating, generate };
}
