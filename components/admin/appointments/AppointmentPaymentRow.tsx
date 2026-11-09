"use client";

import { CheckCircle2, RotateCcw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATUS_BADGE_BASE, STATUS_TONES } from "@/constants/admin/statusTones";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment } from "@/types/admin/appointment";
import { PAYMENT_STATE_LABELS, needsPaymentAction, paymentState } from "@/utils/admin/paymentState";
import { cn } from "cn";

/** Red "Payment due" chip while the fee is owed; nothing otherwise. */
export function PaymentActionBadge({ appointment }: { appointment: Pick<Appointment, "status" | "paymentStatus"> }) {
  const state = paymentState(appointment);
  if (!state || !needsPaymentAction(appointment)) return null;
  return <span className={cn(STATUS_BADGE_BASE, STATUS_TONES.danger)}>{PAYMENT_STATE_LABELS[state]}</span>;
}

// Payment line in the appointment details: Paid (with "Mark as refunded" once the booking is
// cancelled), Refunded, or the red "Payment due" chip with "Mark as paid".
export function AppointmentPaymentRow({ appointment }: { appointment: Appointment }) {
  const setPayment = useAdminStore((s) => s.setAppointmentsPayment);
  const state = paymentState(appointment);
  const ids = [appointment.id];
  return (
    <div className="border-t border-border/70 pt-3">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Wallet className="size-3.5" />
        Payment
      </p>
      {state === "done" ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="m-0 flex items-center gap-1.5 text-sm text-foreground">
            <CheckCircle2 className="size-4 text-primary" />
            Paid
          </p>
          {appointment.status === "cancelled" ? (
            <Button type="button" size="sm" variant="outline" onClick={() => setPayment(ids, "refunded", { title: "Marked as refunded" })}>
              <RotateCcw className="size-3.5" />
              Mark as refunded
            </Button>
          ) : null}
        </div>
      ) : state === "refunded" ? (
        <p className="m-0 flex items-center gap-1.5 text-sm text-muted-foreground">
          <RotateCcw className="size-4" />
          Refunded
        </p>
      ) : state === null ? (
        <p className="m-0 text-sm text-muted-foreground">Not paid (cancelled, nothing owed)</p>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <PaymentActionBadge appointment={appointment} />
          <Button type="button" size="sm" variant="outline" onClick={() => setPayment(ids, "paid", { title: "Marked as paid" })}>
            <CheckCircle2 className="size-3.5" />
            Mark as paid
          </Button>
        </div>
      )}
    </div>
  );
}
