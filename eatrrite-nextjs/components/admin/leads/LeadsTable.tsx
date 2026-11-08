"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { LeadDetailsCard } from "@/components/admin/leads/LeadDetailsCard";
import { LeadFormDialog } from "@/components/admin/leads/LeadFormDialog";
import { LEAD_LIST_COLUMNS } from "@/components/admin/leads/leadColumns";
import { LeadsToolbar } from "@/components/admin/leads/LeadsToolbar";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { useSelectedRow } from "@/hooks/admin/useSelectedRow";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Lead, LeadInput } from "@/types/admin/lead";
import type { LeadListFilters } from "@/types/admin/lead";
import { leadSaveToast } from "@/utils/admin/describeRecordChanges";
import { filterLeads } from "@/utils/admin/filterLeads";

const INITIAL_FILTERS: LeadListFilters = {
  query: "",
  age: "all",
};

export function LeadsTable() {
  const leads = useAdminStore((s) => s.leads);
  const addLead = useAdminStore((s) => s.addLead);
  const updateLead = useAdminStore((s) => s.updateLead);
  const deleteLead = useAdminStore((s) => s.deleteLead);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const { ask, props: confirmProps } = useConfirmDialog();

  const rows = useMemo(() => filterLeads(leads, filters), [leads, filters]);
  const getId = useCallback((lead: Lead) => lead.id, []);
  const [selectedId, selectRow, selected] = useSelectedRow(rows, getId);

  const save = (input: LeadInput) => {
    const { title, description } = leadSaveToast(editing, input);
    if (editing) updateLead(editing.id, input, { title, description });
    else addLead(input, { title, description });
  };

  const remove = (lead: Lead) => {
    ask({
      title: `Delete ${lead.name}?`,
      description:
        "This removes the lead and any linked appointments from the lead list.",
      confirmLabel: "Delete lead",
      onConfirm: () => {
        // The database removes the lead's appointments with it (on delete cascade).
        deleteLead(lead.id, {
          title: "Lead deleted",
          description: `${lead.name} was removed from the lead list.`,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <LeadsToolbar
        filters={filters}
        onChange={setFilters}
        onAdd={() => {
          setEditing(null);
          setOpen(true);
        }}
      />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <DataTable
          columns={LEAD_LIST_COLUMNS}
          rows={rows}
          getRowId={getId}
          selectedRowId={selectedId}
          onRowSelect={(lead) => selectRow(lead.id)}
          resetKey={JSON.stringify(filters)}
          empty={
            leads.length === 0 ? (
              <EmptyState image="leads" title="No leads yet" description="Leads appear here when someone books on the website, or add one yourself." />
            ) : (
              <EmptyState image="search" title="No leads match" description="Try a different search or age filter." />
            )
          }
        />
        <LeadDetailsCard
          lead={selected}
          onEdit={() => {
            if (!selected) return;
            setEditing(selected);
            setOpen(true);
          }}
          onDelete={() => {
            if (selected) remove(selected);
          }}
        />
      </div>
      <LeadFormDialog
        open={open}
        lead={editing}
        onClose={() => setOpen(false)}
        onSave={save}
      />
      {confirmProps ? <ConfirmationModal {...confirmProps} /> : null}
    </div>
  );
}
