"use client";

import { useShowToast } from "@/hooks/useShowToast";
import type { ConfirmDialogRequest } from "@/hooks/admin/useConfirmDialog";
import { useAdminStore } from "@/stores/useAdminStore";
import { canBulkComplete, type Appointment } from "@/types/admin/appointment";
import { toDateValue } from "@/utils/admin/date";
import { plural } from "@/utils/admin/plural";

// Bulk "mark as completed" and delete for the Appointments list. Each asks first and says
// exactly what will change, including what will be skipped.
export function useAppointmentBulkActions(ask: (request: ConfirmDialogRequest) => void, done: () => void) {
  const completeAppointments = useAdminStore((s) => s.completeAppointments);
  const deleteAppointments = useAdminStore((s) => s.deleteAppointments);
  const showToast = useShowToast();

  const completeAll = (items: Appointment[]) => {
    const changing = items.filter((item) => canBulkComplete(item.status));
    if (changing.length === 0) {
      showToast({ title: "Nothing to update", description: "The selected appointments are already completed or cancelled.", type: "info" });
      return;
    }
    const today = toDateValue(new Date());
    const future = changing.filter((item) => item.date > today).length;
    const skipped = items.length - changing.length;
    const what = plural(changing.length, "appointment");
    const notes = [
      future > 0 ? `${future} of them ${future === 1 ? "is" : "are"} still in the future.` : "",
      skipped > 0 ? `${plural(skipped, "selected appointment")} already completed or cancelled will stay as they are.` : "",
    ].filter(Boolean);
    ask({
      title: `Mark ${what} as completed?`,
      description: ["Their status changes to Completed.", ...notes].join(" "),
      confirmLabel: `Mark ${what} completed`,
      confirmVariant: "default",
      onConfirm: () => {
        completeAppointments(changing.map((item) => item.id), { title: `${what} marked completed` });
        done();
      },
    });
  };

  const deleteAll = (items: Appointment[]) => {
    const what = plural(items.length, "appointment");
    ask({
      title: `Delete ${what}?`,
      description: `This permanently removes ${what}, with their questionnaire answers. This cannot be undone.`,
      confirmLabel: `Delete ${what}`,
      confirmVariant: "destructive",
      onConfirm: () => {
        deleteAppointments(items.map((item) => item.id), { title: `${what} deleted` });
        done();
      },
    });
  };

  return { completeAll, deleteAll };
}
