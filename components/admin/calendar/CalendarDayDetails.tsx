"use client";

import { useMemo } from "react";
import { CalendarDayDetailsPanel } from "@/components/admin/calendar/CalendarDayDetailsPanel";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment, AppointmentInput } from "@/types/admin/appointment";
import { toDateValue } from "@/utils/admin/date";

type CalendarDayDetailsProps = {
  selectedDate: Date;
  leadName: (leadId: string) => string;
  canAdd: boolean;
  onAdd: (defaults?: Partial<AppointmentInput>) => void;
  onOpenAppointment: (appointment: Appointment) => void;
};

export function CalendarDayDetails({
  selectedDate,
  leadName,
  canAdd,
  onAdd,
  onOpenAppointment,
}: CalendarDayDetailsProps) {
  const appointments = useAdminStore((s) => s.appointments);
  const selectedKey = toDateValue(selectedDate);
  const dayItems = useMemo(
    () => appointments.filter((item) => item.date === selectedKey),
    [appointments, selectedKey],
  );

  return (
    <CalendarDayDetailsPanel
      selectedDate={selectedDate}
      appointments={dayItems}
      leadName={leadName}
      canAdd={canAdd}
      onAdd={() => onAdd()}
      onOpenAppointment={onOpenAppointment}
    />
  );
}
