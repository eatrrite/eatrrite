"use client";

import { ChevronRight, FileText } from "lucide-react";
import { PaymentActionBadge } from "@/components/admin/appointments/AppointmentPaymentRow";
import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import { paymentAvatarTone } from "@/utils/admin/paymentState";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import type { Appointment } from "@/types/admin/appointment";
import { appointmentEndTime } from "@/utils/admin/calendarTime";
import { useAdminStore } from "@/stores/useAdminStore";
import { formatTimeLabel } from "@/utils/admin/time";

type CalendarDayAppointmentCardProps = {
  appointment: Appointment;
  leadName: string;
  onOpen: () => void;
};

export function CalendarDayAppointmentCard({
  appointment,
  leadName,
  onOpen,
}: CalendarDayAppointmentCardProps) {
  const { meetingMinutes } = useAdminStore((s) => s.settings);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full shrink-0 gap-2 overflow-hidden rounded-xl border border-border/80 bg-card p-2.5 pl-3.5 text-left shadow-xs transition-[background-color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-background sm:gap-3 sm:p-3 sm:pl-4"
    >
      {/* Teal edge marks each consultation, like the lists elsewhere in the admin. */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-primary/70 transition-colors group-hover:bg-primary" />
      <div className="w-14 shrink-0 text-[11px] leading-snug text-muted-foreground sm:w-[4.5rem] sm:text-xs">
        <p className="font-heading font-bold text-primary">
          {formatTimeLabel(appointment.time)}
        </p>
        <p>{formatTimeLabel(appointmentEndTime(appointment.time, meetingMinutes))}</p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <DashboardAvatar name={leadName} toneClass={paymentAvatarTone(appointment)} className="size-8 text-[10px]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {leadName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {appointment.service || "Consultation"}
                </p>
              </div>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <AppointmentStatusBadge status={appointment.status} />
                <PaymentActionBadge appointment={appointment} />
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <FileText className="size-3.5 shrink-0" />
              <span className="truncate">
                {appointment.notes ?? "No notes"}
              </span>
            </p>
          </div>
          <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </button>
  );
}
