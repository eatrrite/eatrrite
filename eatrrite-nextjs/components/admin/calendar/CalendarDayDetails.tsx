"use client";

import { useMemo } from "react";
import { CalendarDayDetailsPanel } from "@/components/admin/calendar/CalendarDayDetailsPanel";
import { useClinicStore } from "@/stores/adminStore";
import type { ClinicAppointment, ClinicAppointmentInput } from "@/types/admin/appointment";
import { toDateValue } from "@/utils/admin/date";

type CalendarDayDetailsProps = {
  selectedDate: Date;
  leadName: (leadId: string) => string;
  canAdd: boolean;
  onAdd: (defaults?: Partial<ClinicAppointmentInput>) => void;
  onOpenAppointment: (appointment: ClinicAppointment) => void;
};

export function CalendarDayDetails({
  selectedDate,
  leadName,
  canAdd,
  onAdd,
  onOpenAppointment,
}: CalendarDayDetailsProps) {
  const appointments = useClinicStore((s) => s.appointments);
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
