"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { Pencil, Trash2 } from "lucide-react";
import { AppointmentDetailsBody } from "@/components/admin/appointments/AppointmentDetailsBody";
import { Button } from "@/components/ui/button";
import { HeroMotion } from "@/components/motion/FadeIn";
import type { Appointment } from "@/types/admin/appointment";

type AppointmentDetailsCardProps = {
  appointment: Appointment | null;
  leadName: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function AppointmentDetailsCard({
  appointment,
  leadName,
  onEdit,
  onDelete,
}: AppointmentDetailsCardProps) {
  if (!appointment) {
    return (
      <aside className="flex h-fit min-h-48 items-center justify-center self-start rounded-2xl border border-dashed border-border bg-card p-6">
        <EmptyState size="sm" image="appointments" title="No appointment selected" description="Pick one from the list to see its details." />
      </aside>
    );
  }

  return (
    <aside className="flex h-fit flex-col gap-4 self-start overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)]">
      {/* Teal band across the top, like the website's banners; the details follow unchanged. */}
      <div className="relative -mx-5 -mt-5 flex items-center justify-between gap-3 bg-linear-to-br from-primary to-primary-dark px-5 py-3.5 text-white">
        <div aria-hidden className="absolute -top-10 -right-8 size-28 rounded-full bg-accent/20 blur-2xl" />
        <p className="relative m-0 type-eyebrow text-xl text-accent">Consultation</p>
        <p className="relative m-0 text-xs text-white/75">{appointment.service}</p>
      </div>
      <HeroMotion key={`${appointment.id}-body`} delay={0.05}>
        <AppointmentDetailsBody
          appointment={appointment}
          leadName={leadName}
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
