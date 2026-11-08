import type { ClinicTodo } from "@/types/admin/todo";

// Sample to-dos for the admin preview.
export const SEED_TODOS: ClinicTodo[] = [
  { id: "todo_1", label: "Review today's consultations", done: true },
  { id: "todo_2", label: "Check reports shared by Meera Iyer", done: true },
  { id: "todo_3", label: "Send Friday check-in to Vikram Singh", done: true },
  { id: "todo_4", label: "Answer pending questionnaires", done: true },
  { id: "todo_5", label: "Plan weekly meal plans for new leads", done: false },
  { id: "todo_6", label: "Follow up on missed consultations", done: false },
];
