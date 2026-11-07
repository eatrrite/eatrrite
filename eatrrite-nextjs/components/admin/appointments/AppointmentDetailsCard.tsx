"use client";

import { Pencil, Trash2 } from "lucide-react";
import { AppointmentDetailsBody } from "@/components/admin/appointments/AppointmentDetailsBody";
import { Button } from "@/components/ui/button";
import { HeroMotion } from "@/components/motion/FadeIn";
import type { Appointment } from "@/types/admin/admin";

type AppointmentDetailsCardProps = {
  appointment: Appointment | null;
  patientName: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function AppointmentDetailsCard({
  appointment,
  patientName,
  onEdit,
  onDelete,
}: AppointmentDetailsCardProps) {
  if (!appointment) {
    return (
      <aside className="flex h-fit min-h-48 items-center justify-center self-start rounded-2xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
        Select an appointment to view details.
      </aside>
    );
  }

  return (
    <aside className="flex h-fit flex-col gap-4 self-start rounded-2xl border border-border bg-card p-5 shadow-xs">
      <HeroMotion key={`${appointment.id}-body`} delay={0.05}>
        <AppointmentDetailsBody
          appointment={appointment}
          patientName={patientName}
        />
      </HeroMotion>
      <HeroMotion key={`${appointment.id}-actions`} delay={0.28}>
        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            className="w-fit gap-1.5"
            onClick={onEdit}
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-fit gap-1.5"
            onClick={onDelete}
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </HeroMotion>
    </aside>
  );
}
