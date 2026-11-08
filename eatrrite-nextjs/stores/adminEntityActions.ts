import { deleteAppointmentAction, deleteLeadAction, saveLeadAction, addTodoAction, deleteTodoAction, setTodoDoneAction } from "@/features/admin/services/adminActions";
import { saveOrRevert } from "@/stores/saveOrRevert";
import type { Appointment } from "@/types/admin/appointment";
import type { Lead, LeadInput } from "@/types/admin/lead";
import type { Todo, TodoInput } from "@/types/admin/todo";
import { createId } from "@/utils/admin/id";

type EntitySlice = {
  leads: Lead[];
  appointments: Appointment[];
  todos: Todo[];
};

type SetState = (partial: Partial<EntitySlice> | ((state: EntitySlice) => Partial<EntitySlice>)) => void;
type GetState = () => EntitySlice;

// Leads, appointment deletes and to-dos: shown at once, saved to Neon, undone if saving fails.
export function createEntityActions(set: SetState, get: GetState) {
  return {
    getLead: (id: string) => get().leads.find((lead) => lead.id === id),

    addLead: (input: LeadInput) => {
      const now = new Date().toISOString();
      const lead: Lead = { ...input, id: createId(), createdAt: now, updatedAt: now };
      set((s) => ({ leads: [lead, ...s.leads] }));
      saveOrRevert(saveLeadAction(lead), () => set((s) => ({ leads: s.leads.filter((item) => item.id !== lead.id) })));
      return lead;
    },

    updateLead: (id: string, input: LeadInput) => {
      const before = get().leads;
      const current = before.find((item) => item.id === id);
      if (!current) return;
      const next: Lead = { ...current, ...input, updatedAt: new Date().toISOString() };
      set({ leads: before.map((item) => (item.id === id ? next : item)) });
      saveOrRevert(saveLeadAction(next), () => set({ leads: before }));
    },

    // Deleting a lead deletes their appointments too, as the database does.
    deleteLead: (id: string) => {
      const { leads, appointments } = get();
      set({ leads: leads.filter((item) => item.id !== id), appointments: appointments.filter((item) => item.leadId !== id) });
      saveOrRevert(deleteLeadAction(id), () => set({ leads, appointments }));
    },

    deleteAppointment: (id: string) => {
      const before = get().appointments;
      set({ appointments: before.filter((item) => item.id !== id) });
      saveOrRevert(deleteAppointmentAction(id), () => set({ appointments: before }));
    },

    addTodo: (input: TodoInput) => {
      const todo: Todo = { id: createId(), label: input.label.trim(), done: false };
      set((s) => ({ todos: [todo, ...s.todos] }));
      saveOrRevert(addTodoAction(todo), () => set((s) => ({ todos: s.todos.filter((item) => item.id !== todo.id) })));
      return todo;
    },

    toggleTodo: (id: string) => {
      const before = get().todos;
      const current = before.find((todo) => todo.id === id);
      if (!current) return;
      set({ todos: before.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)) });
      saveOrRevert(setTodoDoneAction(id, !current.done), () => set({ todos: before }));
    },

    deleteTodo: (id: string) => {
      const before = get().todos;
      set({ todos: before.filter((todo) => todo.id !== id) });
      saveOrRevert(deleteTodoAction(id), () => set({ todos: before }));
    },
  };
}
