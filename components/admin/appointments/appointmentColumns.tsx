"use client";

import { format, parseISO } from "date-fns";
import { CircleCheck, RotateCcw, WalletCards } from "lucide-react";
import { cn } from "cn";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import { AppointmentStatusBadge, appointmentAvatarTone } from "@/components/admin/appointments/AppointmentStatusBadge";
import type { Appointment } from "@/types/admin/appointment";
import type { DataTableColumn } from "@/types/admin/dataTable";
import { PAYMENT_STATE_LABELS, paymentState, type PaymentState } from "@/utils/admin/paymentState";
import { formatTimeLabel } from "@/utils/admin/time";

// How each payment state shows: red needs action, teal is done, grey is closed.
const PAYMENT_LOOK: Record<PaymentState, { Icon: typeof CircleCheck; text: string; dot: string }> = {
  due: { Icon: WalletCards, text: "text-alert-text", dot: "bg-alert-text" },
  done: { Icon: CircleCheck, text: "text-primary", dot: "bg-accent-green" },
  refunded: { Icon: RotateCcw, text: "text-muted-foreground", dot: "bg-muted-foreground/40" },
};

function PaymentLine({ item }: { item: Appointment }) {
  const state = paymentState(item);
  if (!state) return null;
  const { Icon, text } = PAYMENT_LOOK[state];
  return (
    <span className={cn("mt-0.5 inline-flex items-center gap-1 text-xs font-medium", text)}>
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {PAYMENT_STATE_LABELS[state]}
    </span>
  );
}

function PaymentDot({ item }: { item: Appointment }) {
  const state = paymentState(item);
  if (!state) return null;
  return <span aria-hidden className={cn("size-2 shrink-0 rounded-full", PAYMENT_LOOK[state].dot)} />;
}

export function getAppointmentListColumns(
  leadName: (leadId: string) => string,
): DataTableColumn<Appointment>[] {
  return [
    {
      key: "lead",
      header: "Lead name",
      width: 40,
      // The name, with the payment under it ("Payment done", "Payment due", "Refunded"), laid out
      // like the date's weekday line; the status column holds only the status.
      cell: (item) => (
        <span className="flex min-w-0 items-center gap-3">
          <DashboardAvatar name={leadName(item.leadId)} toneClass={appointmentAvatarTone(item)} className="size-8 text-[11px]" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-medium text-ink">{leadName(item.leadId)}</span>
            <PaymentLine item={item} />
          </span>
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: 30,
      // "19 Nov 2026", with the weekday and time under it ("Thu · 8:30 PM").
      cell: (item) => (
        <span className="flex flex-col leading-tight">
          <span className="truncate text-ink">{format(parseISO(item.date), "d MMM yyyy")}</span>
          <span className="mt-0.5 truncate text-xs text-muted-foreground">
            {format(parseISO(item.date), "EEE")} · {formatTimeLabel(item.time)}
          </span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: 30,
      // The status chip, and at the row's end a small dot for the payment: red due, green paid,
      // grey refunded.
      cell: (item) => (
        <span className="flex items-center justify-between gap-2">
          <AppointmentStatusBadge status={item.status} />
          <PaymentDot item={item} />
        </span>
      ),
    },
  ];
}
