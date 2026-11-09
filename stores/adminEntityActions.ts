import { deleteAppointmentAction, deleteLeadAction, saveLeadAction } from "@/features/admin/services/adminActions";
import { completeAppointmentsAction, deleteAppointmentsAction, deleteLeadsAction, markAppointmentsPaidAction } from "@/features/admin/services/bulkActions";
import { saveOrRevert, type SaveNotice } from "@/stores/saveOrRevert";
import { canBulkComplete, type Appointment } from "@/types/admin/appointment";
import type { Lead, LeadInput } from "@/types/admin/lead";
import { createId } from "@/utils/admin/id";

type EntitySlice = {
  leads: Lead[];
  appointments: Appointment[];
};

type SetState = (partial: Partial<EntitySlice> | ((state: EntitySlice) => Partial<EntitySlice>)) => void;
type GetState = () => EntitySlice;

// Leads and appointment deletes: shown at once, saved to Neon, undone if saving fails.
export function createEntityActions(set: SetState, get: GetState) {
  return {
    getLead: (id: string) => get().leads.find((lead) => lead.id === id),

    addLead: (input: LeadInput, notice: SaveNotice) => {
      const now = new Date().toISOString();
      const lead: Lead = { ...input, id: createId(), createdAt: now, updatedAt: now };
      set((s) => ({ leads: [lead, ...s.leads] }));
      saveOrRevert(saveLeadAction(lead), () => set((s) => ({ leads: s.leads.filter((item) => item.id !== lead.id) })), notice);
      return lead;
    },

    updateLead: (id: string, input: LeadInput, notice: SaveNotice) => {
      const before = get().leads;
      const current = before.find((item) => item.id === id);
      if (!current) return;
      const next: Lead = { ...current, ...input, updatedAt: new Date().toISOString() };
      set({ leads: before.map((item) => (item.id === id ? next : item)) });
      saveOrRevert(saveLeadAction(next), () => set({ leads: before }), notice);
    },

    // Deleting a lead deletes their appointments too, as the database does.
    deleteLead: (id: string, notice: SaveNotice) => {
      const { leads, appointments } = get();
      set({ leads: leads.filter((item) => item.id !== id), appointments: appointments.filter((item) => item.leadId !== id) });
      saveOrRevert(deleteLeadAction(id), () => set({ leads, appointments }), notice);
    },

    deleteAppointment: (id: string, notice: SaveNotice) => {
      const before = get().appointments;
      set({ appointments: before.filter((item) => item.id !== id) });
      saveOrRevert(deleteAppointmentAction(id), () => set({ appointments: before }), notice);
    },

    deleteLeads: (ids: string[], notice: SaveNotice) => {
      const { leads, appointments } = get();
      const gone = new Set(ids);
      set({ leads: leads.filter((item) => !gone.has(item.id)), appointments: appointments.filter((item) => !gone.has(item.leadId)) });
      saveOrRevert(deleteLeadsAction(ids), () => set({ leads, appointments }), notice);
    },

    deleteAppointments: (ids: string[], notice: SaveNotice) => {
      const before = get().appointments;
      const gone = new Set(ids);
      set({ appointments: before.filter((item) => !gone.has(item.id)) });
      saveOrRevert(deleteAppointmentsAction(ids), () => set({ appointments: before }), notice);
    },

    // Same rule as the server: only upcoming and not-attended ones change.
    completeAppointments: (ids: string[], notice: SaveNotice) => {
      const before = get().appointments;
      const picked = new Set(ids);
      const now = new Date().toISOString();
      set({
        appointments: before.map((item) =>
          picked.has(item.id) && canBulkComplete(item.status) ? { ...item, status: "completed", updatedAt: now } : item,
        ),
      });
      saveOrRevert(completeAppointmentsAction(ids), () => set({ appointments: before }), notice);
    },

    markAppointmentsPaid: (ids: string[], notice: SaveNotice) => {
      const before = get().appointments;
      const picked = new Set(ids);
      set({ appointments: before.map((item) => (picked.has(item.id) ? { ...item, paymentDone: true } : item)) });
      saveOrRevert(markAppointmentsPaidAction(ids), () => set({ appointments: before }), notice);
    },
  };
}
