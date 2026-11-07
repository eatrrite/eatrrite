"use client";

import { CalendarDays, Clock3, Salad } from "lucide-react";
import { format, parseISO } from "date-fns";
import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import type { Appointment } from "@/types/admin/admin";

type AppointmentDetailsBodyProps = {
  appointment: Appointment;
  patientName: string;
};

function formatStamp(iso: string) {
  return format(parseISO(iso), "MMM d, yyyy");
}

export function AppointmentDetailsBody({
  appointment,
  patientName,
}: AppointmentDetailsBodyProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-bold text-foreground">
                {patientName}
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
                <span>{appointment.date}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  {appointment.time}
                </span>
              </p>
            </div>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl bg-muted/50 px-3.5 py-3">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Salad className="size-3.5" />
            Service
          </p>
          <p
            className={`text-sm leading-snug ${appointment.reason ? "text-foreground" : "text-muted-foreground"}`}
          >
            {appointment.reason || "No service added"}
          </p>
        </div>
        <div className="border-t border-border/70 pt-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Notes</p>
          <p
            className={`text-sm leading-snug ${appointment.notes ? "text-foreground" : "text-muted-foreground"}`}
          >
            {appointment.notes ?? "No notes added"}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Added {formatStamp(appointment.createdAt)} · Updated{" "}
        {formatStamp(appointment.updatedAt)}
      </p>
    </div>
  );
}
