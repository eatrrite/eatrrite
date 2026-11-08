"use client";

import { Pencil, Trash2 } from "lucide-react";
import { AppointmentDetailsBody } from "@/components/admin/appointments/AppointmentDetailsBody";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Appointment } from "@/types/admin/appointment";

type CalendarAppointmentSheetProps = {
  appointment: Appointment | null;
  leadName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function CalendarAppointmentSheet({
  appointment,
  leadName,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: CalendarAppointmentSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border pr-12">
          <SheetTitle className="font-heading text-xl font-bold">
            Appointment details
          </SheetTitle>
        </SheetHeader>
        {appointment ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <AppointmentDetailsBody
                appointment={appointment}
                leadName={leadName}
              />
            </div>
            <SheetFooter className="flex-row justify-end gap-2 border-t border-border">
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
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
