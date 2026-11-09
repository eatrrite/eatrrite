"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OPTIONS = [
  { value: "paid", label: "Paid" },
  { value: "due", label: "Due" },
] as const;

/** Paid or Due, saved as payment_done (true or false). */
export function PaymentSelect({ id, value, onChange }: { id?: string; value: boolean; onChange: (paid: boolean) => void }) {
  const current = value ? "paid" : "due";
  return (
    <Select items={[...OPTIONS]} value={current} onValueChange={(next) => next && onChange(next === "paid")}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue>{value ? "Paid" : "Due"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
