"use client";

import { ConsentCheckbox } from "@/components/shared/ConsentCheckbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CmsPage } from "@/features/cms/sources";
import { useEnquiryForm } from "@/features/contact/hooks/useEnquiryForm";

interface ContactFormProps {
  copy: Pick<CmsPage<"contact-page">, "enquireTitle" | "enquireText">;
  programs: readonly string[];
}

// The enquiry form with the fields PHP asks for (name, phone, city, program), plus an optional
// email for the "we have received your enquiry" email. Sending: features/contact/.
export function ContactForm({ copy, programs }: ContactFormProps) {
  const { consent, setConsent, pending, submit } = useEnquiryForm();
  return (
    <div className="rounded-xl border border-accent/30 bg-beige p-6 md:p-8">
      <p className="m-0 type-eyebrow text-accent-deep">{copy.enquireTitle}</p>
      <p className="mt-2 mb-0 text-sm text-text">{copy.enquireText}</p>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <div className="space-y-2">
          <Label htmlFor="contact-name">Full name</Label>
          <Input id="contact-name" name="name" autoComplete="name" maxLength={80} placeholder="Your name" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input id="contact-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={14} placeholder="10-digit number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-city">City</Label>
            <Input id="contact-city" name="city" autoComplete="address-level2" maxLength={60} placeholder="Your city" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email (optional)</Label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-program">Program of interest</Label>
          <Select name="program" items={programs.map((p) => ({ label: p, value: p }))} defaultValue={programs[0]}>
            <SelectTrigger id="contact-program" className="w-full min-w-0"><SelectValue className="block min-w-0 truncate" /></SelectTrigger>
            <SelectContent>
              {programs.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">Your message</Label>
          <Textarea id="contact-message" name="message" maxLength={1000} placeholder="How can we help?" />
        </div>
        {/* Spam trap: hidden from people, filled in by bots (features/contact/services/enquiryActions.ts). */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <ConsentCheckbox id="contact-consent" checked={consent} onChange={setConsent} purpose="reply to my enquiry" />
        <Button type="submit" size="xl" className="w-full sm:w-auto" disabled={pending}>
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
      </form>
    </div>
  );
}
