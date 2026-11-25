"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CmsPage } from "@/features/cms/sources";
import { useShowToast } from "@/hooks/useShowToast";

interface ContactFormProps {
  copy: Pick<CmsPage<"contact-page">, "enquireTitle" | "enquireText">;
  programs: readonly string[];
}

// reference design enquiry form with the fields PHP asks for (name, phone, city,
// program). Sending is not connected yet, so submitting shows a notice.
export function ContactForm({ copy, programs }: ContactFormProps) {
  const showToast = useShowToast();
  return (
    <div className="rounded-xl border border-accent/30 bg-beige p-6 md:p-8">
      <p className="m-0 type-eyebrow text-accent-deep">{copy.enquireTitle}</p>
      <p className="mt-2 mb-0 text-sm text-text">{copy.enquireText}</p>
      <form className="mt-6 space-y-4" onSubmit={(e) => {
        e.preventDefault();
        showToast({ title: "Online enquiries open soon", description: "Please call or WhatsApp us for now.", type: "info" });
      }}>
        <div className="space-y-2">
          <Label htmlFor="contact-name">Full name</Label>
          <Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="10-digit number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-city">City</Label>
            <Input id="contact-city" name="city" placeholder="Your city" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-program">Program of interest</Label>
          <Select items={programs.map((p) => ({ label: p, value: p }))} defaultValue={programs[0]}>
            <SelectTrigger id="contact-program" className="w-full min-w-0"><SelectValue className="block min-w-0 truncate" /></SelectTrigger>
            <SelectContent>
              {programs.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">Your message</Label>
          <Textarea id="contact-message" name="message" placeholder="How can we help?" />
        </div>
        <Button type="submit" size="xl" className="w-full sm:w-auto">Send enquiry</Button>
      </form>
    </div>
  );
}
