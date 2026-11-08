"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import type { ConfirmDialogRequest } from "@/hooks/admin/useConfirmDialog";
import type { Lead } from "@/types/admin/lead";
import { plural } from "@/utils/admin/plural";

// Bulk delete for the Leads list. Says how many appointments go with the leads, before asking.
export function useLeadBulkActions(ask: (request: ConfirmDialogRequest) => void, done: () => void) {
  const appointments = useAdminStore((s) => s.appointments);
  const deleteLeads = useAdminStore((s) => s.deleteLeads);

  const deleteAll = (leads: Lead[]) => {
    const ids = new Set(leads.map((lead) => lead.id));
    const linked = appointments.filter((item) => ids.has(item.leadId)).length;
    const what = plural(leads.length, "lead");
    ask({
      title: `Delete ${what}?`,
      description:
        (linked > 0
          ? `This permanently removes ${what} and their ${plural(linked, "appointment")}. `
          : `This permanently removes ${what}. `) + "This cannot be undone.",
      confirmLabel: `Delete ${what}`,
      confirmVariant: "destructive",
      onConfirm: () => {
        deleteLeads([...ids], { title: `${what} deleted`, description: "They were removed from the lead list." });
        done();
      },
    });
  };

  return { deleteAll };
}
