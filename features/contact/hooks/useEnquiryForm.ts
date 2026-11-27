"use client";

import { useState, type FormEvent } from "react";
import { submitEnquiryAction } from "@/features/contact/services/enquiryActions";
import { useShowToast } from "@/hooks/useShowToast";

// The form's fields as plain text (a file input would be dropped; the form has none).
function formFields(form: HTMLFormElement): Record<string, string> {
  const entries = [...new FormData(form).entries()];
  return Object.fromEntries(entries.map(([key, value]) => [key, typeof value === "string" ? value : ""]));
}

// Sends the contact form: consent first, a "Sending…" toast, then the result in its place.
// A second press while sending is ignored.
export function useEnquiryForm() {
  const showToast = useShowToast();
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (!consent) {
      showToast({ title: "Please tick the consent box", description: "We need your consent to reply to your enquiry.", type: "error" });
      return;
    }
    const form = event.currentTarget;
    setPending(true);
    const id = showToast({ title: "Sending your enquiry…", type: "pending" });
    const result = await submitEnquiryAction({ ...formFields(form), consent: true }).catch((error: unknown) => {
      console.error("Enquiry request failed", error);
      return null;
    });
    setPending(false);
    if (!result) {
      showToast({ id, title: "Could not send your enquiry", description: "Please check your connection and try again.", type: "error" });
      return;
    }
    if (!result.ok) {
      showToast({ id, title: "Could not send your enquiry", description: result.error, type: "error" });
      return;
    }
    form.reset();
    setConsent(false);
    showToast({ id, title: "Thank you, we have your enquiry", description: "We will get back to you soon on WhatsApp or by phone.", type: "success" });
  }

  return { consent, setConsent, pending, submit };
}
