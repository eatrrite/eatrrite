"use client";

import { CheckCircle2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATUS_BADGE_BASE, STATUS_TONES } from "@/constants/admin/statusTones";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment } from "@/types/admin/appointment";
import { cn } from "cn";

/** "Payment due" chip for lists, shown only while the fee is not received. */
export function PaymentDueBadge({ paymentDone }: { paymentDone: boolean }) {
  if (paymentDone) return null;
  return <span className={cn(STATUS_BADGE_BASE, STATUS_TONES.danger)}>Payment due</span>;
}

// Payment line in the appointment details: Paid, or Due with a button to mark the fee received.
export function AppointmentPaymentRow({ appointment }: { appointment: Appointment }) {
  const markPaid = useAdminStore((s) => s.markAppointmentsPaid);
  return (
    <div className="border-t border-border/70 pt-3">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Wallet className="size-3.5" />
        Payment
      </p>
      {appointment.paymentDone ? (
        <p className="m-0 flex items-center gap-1.5 text-sm text-foreground">
          <CheckCircle2 className="size-4 text-primary" />
          Paid
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <PaymentDueBadge paymentDone={false} />
          <Button type="button" size="sm" variant="outline" onClick={() => markPaid([appointment.id], { title: "Marked as paid" })}>
            <CheckCircle2 className="size-3.5" />
            Mark as paid
          </Button>
        </div>
      )}
    </div>
  );
}
