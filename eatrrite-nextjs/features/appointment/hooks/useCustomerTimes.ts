"use client";

import { customerTimes } from "@/features/appointment/utils/customerSlots";
import { useAdminStore } from "@/stores/useAdminStore";

// Times a customer can pick on a date, read from the store: a booked or held slot disappears at once.
export function useCustomerTimes() {
  const days = useAdminStore((s) => s.days);
  const appointments = useAdminStore((s) => s.appointments);
  const holds = useAdminStore((s) => s.holds);
  return (date: string) => customerTimes(date, { days, appointments, holds });
}
