"use client";

import { useState } from "react";
import { PillButton } from "@/components/shared/PillButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HOURS_NOTE, MEETING_MINUTES, SERVICES } from "@/constants/appointment/schedule";
import { useBooking } from "@/hooks/useBooking";
import { SlotDialog, type Slot } from "./SlotDialog";
import { SlotTrigger } from "./SlotTrigger";

const EMPTY = { service: "", name: "", email: "", phone: "" };

// Copies appointment-form/views/form.php. Payment runs through useBooking.
export function BookingForm({ feeRupees }: { feeRupees: number }) {
  const { book, busy, error, setError } = useBooking();
  const [fields, setFields] = useState(EMPTY);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [slotOpen, setSlotOpen] = useState(false);
  // The calendar reads today's date, so it first renders on click, not during prerender.
  const [calendarUsed, setCalendarUsed] = useState(false);
  const update = (key: keyof typeof EMPTY) => (value: string) => setFields((f) => ({ ...f, [key]: value }));

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!slot) return setError("Select an available date and time to continue.");
    book({ ...fields, ...slot });
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-4 text-primary">
      {error ? <p role="alert" className="m-0 rounded-xs bg-alert-bg px-4 py-3 text-sm text-alert-text">{error}</p> : null}
      <div className="grid gap-1.5">
        <Label className="type-field-label text-text" htmlFor="booking-service">Service</Label>
        <Select items={SERVICES.map((s) => ({ label: s, value: s }))} value={fields.service || null} onValueChange={(v) => update("service")(String(v ?? ""))}>
          <SelectTrigger id="booking-service" className="h-12 w-full bg-white"><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => <SelectItem key={s} value={s} className="whitespace-normal">{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 min-[576px]:grid-cols-2">
        <div className="grid min-w-0 gap-1.5">
          <Label className="type-field-label text-text" htmlFor="booking-name">Full name</Label>
          <Input className="h-12 bg-white" id="booking-name" autoComplete="name" maxLength={80} placeholder="Your name" value={fields.name} onChange={(e) => update("name")(e.target.value)} />
        </div>
        <div className="grid min-w-0 gap-1.5">
          <Label className="type-field-label text-text" htmlFor="booking-email">Email address</Label>
          <Input className="h-12 bg-white" id="booking-email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" value={fields.email} onChange={(e) => update("email")(e.target.value)} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label className="type-field-label text-text" htmlFor="booking-mobile">Mobile number</Label>
        <Input className="h-12 bg-white" id="booking-mobile" type="tel" inputMode="numeric" autoComplete="tel" maxLength={13} placeholder="10-digit number" value={fields.phone} onChange={(e) => update("phone")(e.target.value)} />
      </div>
      <SlotTrigger slot={slot} onOpen={() => { setCalendarUsed(true); setSlotOpen(true); }} />
      <p className="m-0 text-sm leading-normal text-text">
        A ₹{feeRupees} confirmation fee holds your {MEETING_MINUTES}-minute consultation. Hours (IST): {HOURS_NOTE}.
      </p>
      <PillButton type="submit" variant="accent" disabled={busy} className="w-full">
        {busy ? "Processing…" : `Pay ₹${feeRupees} and book`}
      </PillButton>
      {calendarUsed ? <SlotDialog open={slotOpen} onOpenChange={setSlotOpen} onConfirm={setSlot} /> : null}
    </form>
  );
}
