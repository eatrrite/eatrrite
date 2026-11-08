import { addDays } from "@/features/appointment/utils/istTime";
import type { Todo } from "@/types/admin/todo";

export type TodoDayFilter = "today" | "yesterday" | "date" | "all";
export type TodoStatusFilter = "all" | "pending" | "completed";
export type TodoFilters = { day: TodoDayFilter; date: string; status: TodoStatusFilter };

export const TODO_DAY_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "date", label: "Pick a date…" },
  { value: "all", label: "All to-dos" },
] as const;

export const TODO_STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
] as const;

// The India date a day filter points at, or null for "all to-dos".
export function todoFilterDate({ day, date }: TodoFilters, today: string): string | null {
  if (day === "today") return today;
  if (day === "yesterday") return addDays(today, -1);
  if (day === "date") return date;
  return null;
}

// To-dos for the chosen day (or all) and status, pending first.
export function filterTodos(todos: Todo[], filters: TodoFilters, today: string): Todo[] {
  const day = todoFilterDate(filters, today);
  return todos
    .filter((todo) => day === null || todo.date === day)
    .filter((todo) => filters.status === "all" || todo.done === (filters.status === "completed"))
    .sort((a, b) => Number(a.done) - Number(b.done));
}
