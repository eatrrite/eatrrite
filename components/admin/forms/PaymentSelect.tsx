"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PaymentStatus } from "@/types/admin/appointment";
import { PAYMENT_STATUS_LABELS } from "@/utils/admin/paymentState";

const OPTIONS: PaymentStatus[] = ["paid", "due", "refunded"];

/** Paid, Due or Refunded: the appointment's payment_status. */
export function PaymentSelect({ id, value, onChange }: { id?: string; value: PaymentStatus; onChange: (status: PaymentStatus) => void }) {
  return (
    <Select
      items={OPTIONS.map((option) => ({ value: option, label: PAYMENT_STATUS_LABELS[option] }))}
      value={value}
      onValueChange={(next) => next && onChange(next as PaymentStatus)}
    >
      <SelectTrigger id={id} className="w-full">
        <SelectValue>{PAYMENT_STATUS_LABELS[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {PAYMENT_STATUS_LABELS[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
