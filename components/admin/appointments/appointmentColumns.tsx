"use client";

import { format, parseISO } from "date-fns";
import { CircleCheck, RotateCcw, WalletCards } from "lucide-react";
import { cn } from "cn";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import type { Appointment } from "@/types/admin/appointment";
import type { DataTableColumn } from "@/types/admin/dataTable";
import { APPOINTMENT_STATUS_LABELS } from "@/constants/admin/appointments/statuses";
import { PAYMENT_STATE_LABELS, PAYMENT_TONES, paymentAvatarTone, paymentState, type PaymentState } from "@/utils/admin/paymentState";
import { formatTimeLabel } from "@/utils/admin/time";

const PAYMENT_ICONS: Record<PaymentState, typeof CircleCheck> = {
  due: WalletCards,
  done: CircleCheck,
  refunded: RotateCcw,
};

function PaymentLine({ item }: { item: Appointment }) {
  const state = paymentState(item);
  if (!state) return null;
  const Icon = PAYMENT_ICONS[state];
  return (
    <span className={cn("mt-0.5 inline-flex items-center gap-1 text-xs font-medium", PAYMENT_TONES[state].text)}>
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {PAYMENT_STATE_LABELS[state]}
    </span>
  );
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
          <DashboardAvatar name={leadName(item.leadId)} toneClass={paymentAvatarTone(item)} className="size-8 text-[11px]" />
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
      // Plain text: the only colours in the list come from the payment (under the name).
      cell: (item) => <span className="truncate text-ink">{APPOINTMENT_STATUS_LABELS[item.status]}</span>,
    },
  ];
}
