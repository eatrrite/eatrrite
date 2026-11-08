import type {
  ClinicAppointment,
  ClinicAppointmentInput,
} from "@/types/admin/appointment";
import type { Lead, LeadInput } from "@/types/admin/lead";
import type { ClinicTodo, TodoInput } from "@/types/admin/todo";
import { createId } from "@/utils/admin/id";

type EntitySlice = {
  leads: Lead[];
  appointments: ClinicAppointment[];
  todos: ClinicTodo[];
};

type SetState = (
  partial:
    | Partial<EntitySlice>
    | ((state: EntitySlice) => Partial<EntitySlice>),
) => void;

type GetState = () => EntitySlice;

export function createClinicEntityActions(set: SetState, get: GetState) {
  return {
    getLead: (id: string) => get().leads.find((lead) => lead.id === id),
    addLead: (input: LeadInput) => {
      const now = new Date().toISOString();
      const lead: Lead = {
        ...input,
        id: createId(),
        createdAt: now,
        updatedAt: now,
      };
      set((s) => ({ leads: [lead, ...s.leads] }));
      return lead;
    },
    updateLead: (id: string, input: LeadInput) => {
      set((s) => ({
        leads: s.leads.map((item) =>
          item.id === id
            ? { ...item, ...input, updatedAt: new Date().toISOString() }
            : item,
        ),
      }));
    },
    deleteLead: (id: string) => {
      set((s) => ({ leads: s.leads.filter((item) => item.id !== id) }));
    },
    addAppointment: (input: ClinicAppointmentInput) => {
      const now = new Date().toISOString();
      const appointment: ClinicAppointment = {
        ...input,
        id: createId(),
        createdAt: now,
        updatedAt: now,
      };
      set((s) => ({ appointments: [appointment, ...s.appointments] }));
      return appointment;
    },
    updateAppointment: (id: string, input: ClinicAppointmentInput) => {
      set((s) => ({
        appointments: s.appointments.map((item) =>
          item.id === id
            ? { ...item, ...input, updatedAt: new Date().toISOString() }
            : item,
        ),
      }));
    },
    deleteAppointment: (id: string) => {
      set((s) => ({
        appointments: s.appointments.filter((item) => item.id !== id),
      }));
    },
    addTodo: (input: TodoInput) => {
      const todo: ClinicTodo = {
        id: createId(),
        label: input.label.trim(),
        done: false,
      };
      set((s) => ({ todos: [todo, ...s.todos] }));
      return todo;
    },
    toggleTodo: (id: string) => {
      set((s) => ({
        todos: s.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo,
        ),
      }));
    },
    deleteTodo: (id: string) => {
      set((s) => ({ todos: s.todos.filter((todo) => todo.id !== id) }));
    },
  };
}
