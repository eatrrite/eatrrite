"use client";

import { ChevronRight, FileText, Salad } from "lucide-react";
import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import type { Appointment } from "@/types/admin/admin";
import { appointmentEndTime } from "@/utils/admin/calendarTime";
import { formatTimeLabel } from "@/utils/admin/time";

type CalendarDayAppointmentCardProps = {
  appointment: Appointment;
  patientName: string;
  onOpen: () => void;
};

export function CalendarDayAppointmentCard({
  appointment,
  patientName,
  onOpen,
}: CalendarDayAppointmentCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full gap-2 rounded-xl border border-border bg-card p-2.5 text-left shadow-xs transition-colors hover:bg-muted/40 sm:gap-3 sm:p-3"
    >
      <div className="w-14 shrink-0 text-[11px] leading-snug text-muted-foreground sm:w-[4.5rem] sm:text-xs">
        <p className="font-medium text-foreground">
          {formatTimeLabel(appointment.time)}
        </p>
        <p>{formatTimeLabel(appointmentEndTime(appointment.time))}</p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <DashboardAvatar name={patientName} className="size-8 text-[10px]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {patientName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {appointment.reason || "Consultation"}
                </p>
              </div>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Salad className="size-3.5 shrink-0" />
              <span className="truncate">{appointment.reason || "No treatment"}</span>
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <FileText className="size-3.5 shrink-0" />
              <span className="truncate">
                {appointment.notes ?? "No notes"}
              </span>
            </p>
          </div>
          <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
}
