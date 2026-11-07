"use client";

import { useState } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input, bookingFieldClass } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlotDialog } from "./slot-dialog";

const SERVICES = [
  "Nutrition for Weight & Lifestyle Management",
  "Nutrition for Diabetes Management & Reversal",
  "Nutrition for Gut Health",
  "Female Hormone Health Diet Program",
];

const FEE_NOTE =
  "A ₹800 confirmation fee holds your 30-minute consultation. Hours (IST): Mon–Thu 11:30 AM–2:00 PM, 3:30 PM–5:30 PM, 8:30 PM–9:30 PM · Fri unavailable · Sat 11:30 AM–2:30 PM · Sun 11:30 AM–1:00 PM.";

// Copies appointment-form/views/form.php. Front end only: Phase 4 adds validation,
// Razorpay and real slots, so submitting only shows a notice for now.
export function BookingForm() {
  const [slotOpen, setSlotOpen] = useState(false);
  // The calendar reads today's date, so it first renders on click, not during prerender.
  const [calendarUsed, setCalendarUsed] = useState(false);
  const [slot, setSlot] = useState("");
  const [notice, setNotice] = useState("");

  return (
    <form
      noValidate
      className="text-left text-primary"
      onSubmit={(e) => {
        e.preventDefault();
        setNotice("Payment is not connected yet. It is added in Phase 4.");
      }}
    >
      {notice ? (
        <div role="alert" className="mb-3.5 rounded-xs bg-alert-bg px-3.5 py-3 text-sm text-alert-text">{notice}</div>
      ) : null}
      <div className="grid gap-3.5">
        <div className="grid min-w-0 gap-1.5">
          <Label htmlFor="booking-service">Service</Label>
          <Select items={SERVICES.map((s) => ({ label: s, value: s }))}>
            <SelectTrigger id="booking-service" size="sm" className={cn(bookingFieldClass, "min-w-0 hover:bg-white")}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => <SelectItem key={s} value={s} className="whitespace-normal">{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3.5 min-[576px]:grid-cols-2">
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor="booking-name">Full name</Label>
            <Input id="booking-name" autoComplete="name" maxLength={80} placeholder="Your name" className={bookingFieldClass} />
          </div>
          <div className="grid min-w-0 gap-1.5">
            <Label htmlFor="booking-email">Email address</Label>
            <Input id="booking-email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" className={bookingFieldClass} />
          </div>
        </div>
        <div className="grid min-w-0 gap-1.5">
          <Label htmlFor="booking-mobile">Mobile number</Label>
          <Input id="booking-mobile" type="tel" inputMode="numeric" maxLength={13} placeholder="10-digit number" className={bookingFieldClass} />
        </div>
        <button
          type="button"
          onClick={() => { setCalendarUsed(true); setSlotOpen(true); }}
          className={cn(
            "flex min-h-16 w-full cursor-pointer flex-col items-start gap-1 rounded-xs border px-3.5 py-2.5 text-left [font-family:Arial,sans-serif] transition-[border-color,background-color] duration-200 ease-[ease] hover:border-solid hover:border-primary hover:bg-white",
            slot ? "border-solid border-primary bg-white" : "border-dashed border-primary/35 bg-white/72"
          )}
        >
          <span className="type-field-label leading-[normal] text-text">Appointment slot</span>
          <span className={cn("text-[15px] leading-[normal]", slot ? "font-semibold text-primary" : "font-medium text-muted-foreground")}>
            {slot || "Select date and time"}
          </span>
        </button>
        <p className="m-0 text-[13px] leading-[1.45] text-text">{FEE_NOTE}</p>
        <Button type="submit" variant="submit">Pay ₹800 and book</Button>
      </div>
      {calendarUsed ? <SlotDialog open={slotOpen} onOpenChange={setSlotOpen} onConfirm={setSlot} /> : null}
    </form>
  );
}
