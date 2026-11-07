import type {
  Appointment,
  AppointmentInput,
  Patient,
  PatientInput,
} from "@/types/admin/admin";
import type { ClinicTodo, TodoInput } from "@/types/admin/todo";
import { createId } from "@/utils/admin/id";

type EntitySlice = {
  patients: Patient[];
  appointments: Appointment[];
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
    getPatient: (id: string) =>
      get().patients.find((patient) => patient.id === id),
    addPatient: (input: PatientInput) => {
      const now = new Date().toISOString();
      const patient: Patient = {
        ...input,
        id: createId(),
        createdAt: now,
        updatedAt: now,
      };
      set((s) => ({ patients: [patient, ...s.patients] }));
      return patient;
    },
    updatePatient: (id: string, input: PatientInput) => {
      set((s) => ({
        patients: s.patients.map((p) =>
          p.id === id
            ? { ...p, ...input, updatedAt: new Date().toISOString() }
            : p,
        ),
      }));
    },
    deletePatient: (id: string) => {
      set((s) => ({ patients: s.patients.filter((p) => p.id !== id) }));
    },
    addAppointment: (input: AppointmentInput) => {
      const now = new Date().toISOString();
      const appointment: Appointment = {
        ...input,
        id: createId(),
        createdAt: now,
        updatedAt: now,
      };
      set((s) => ({ appointments: [appointment, ...s.appointments] }));
      return appointment;
    },
    updateAppointment: (id: string, input: AppointmentInput) => {
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
