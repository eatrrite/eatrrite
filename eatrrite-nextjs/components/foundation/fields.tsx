"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, bookingFieldClass } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const programs = ["Weight Management", "Female Hormone Health", "Gut Health"];

export function Fields() {
  return (
    <div className="grid gap-[22px] lg:grid-cols-2">
      {/* Copies .form-grid */}
      <Card lift={false}>
        <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <p className="type-eyebrow mb-0 text-primary">General form</p>
          <div className="grid gap-1.5">
            <Label htmlFor="general-name">Full name</Label>
            <Input id="general-name" placeholder="Your name" />
          </div>
          <div className="grid gap-1.5">
            <Label>Program</Label>
            <Select items={programs.map((p) => ({ label: p, value: p }))}>
              <SelectTrigger><SelectValue placeholder="Choose a program" /></SelectTrigger>
              <SelectContent>
                {programs.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="general-message">Message</Label>
            <Textarea id="general-message" placeholder="How can we help?" />
          </div>
          <Button type="submit" className="justify-self-start">Send Message</Button>
        </form>
      </Card>

      {/* Copies .appointment-form-card--next and .er-field */}
      <div className="rounded-md bg-primary/8 px-7 py-5">
        <form className="grid gap-3.5" onSubmit={(e) => e.preventDefault()}>
          <p className="type-eyebrow mb-0 text-primary">Booking form</p>
          <div className="grid gap-1.5">
            <Label htmlFor="booking-name">Full name</Label>
            <Input id="booking-name" className={bookingFieldClass} placeholder="Your name" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="booking-email">Email</Label>
            <Input id="booking-email" type="email" className={bookingFieldClass} placeholder="you@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="booking-phone">Phone</Label>
            <Input id="booking-phone" type="tel" className={bookingFieldClass} placeholder="+91" />
          </div>
          <Button type="submit" variant="submit" size="default">Pay ₹800 and book</Button>
          <div role="alert" className="rounded-xs bg-alert-bg px-3.5 py-3 text-sm text-alert-text">
            Sample .er-alert message.
          </div>
        </form>
      </div>
    </div>
  );
}
