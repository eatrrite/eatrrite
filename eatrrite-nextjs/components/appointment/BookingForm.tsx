"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <form noValidate onSubmit={submit} className="space-y-4">
      {error ? <p role="alert" className="m-0 rounded-lg bg-alert-bg px-4 py-3 text-sm text-alert-text">{error}</p> : null}
      <div className="space-y-2">
        <Label htmlFor="booking-service">Service</Label>
        <Select items={SERVICES.map((s) => ({ label: s, value: s }))} value={fields.service || null} onValueChange={(v) => update("service")(String(v ?? ""))}>
          <SelectTrigger id="booking-service" className="w-full"><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => <SelectItem key={s} value={s} className="whitespace-normal">{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="booking-name">Full name</Label>
          <Input id="booking-name" autoComplete="name" maxLength={80} placeholder="Your name" value={fields.name} onChange={(e) => update("name")(e.target.value)} />
        </div>
        <div className="min-w-0 space-y-2">
          <Label htmlFor="booking-email">Email address</Label>
          <Input id="booking-email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" value={fields.email} onChange={(e) => update("email")(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="booking-mobile">Mobile number</Label>
        <Input id="booking-mobile" type="tel" inputMode="numeric" autoComplete="tel" maxLength={13} placeholder="10-digit number" value={fields.phone} onChange={(e) => update("phone")(e.target.value)} />
      </div>
      <SlotTrigger slot={slot} onOpen={() => { setCalendarUsed(true); setSlotOpen(true); }} />
      <p className="m-0 text-sm leading-relaxed text-muted-foreground">
        A ₹{feeRupees} confirmation fee holds your {MEETING_MINUTES}-minute consultation. Hours (IST): {HOURS_NOTE}.
      </p>
      <Button type="submit" size="xl" disabled={busy} className="w-full sm:w-auto">
        {busy ? "Processing…" : `Pay ₹${feeRupees} and book`}
      </Button>
      {calendarUsed ? <SlotDialog open={slotOpen} onOpenChange={setSlotOpen} onConfirm={setSlot} /> : null}
    </form>
  );
}
