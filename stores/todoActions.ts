import { addTodoAction, deleteTodoAction, setTodoDoneAction, updateTodoAction } from "@/features/admin/services/todoActions";
import { todayIst } from "@/features/appointment/utils/istTime";
import { saveOrRevert } from "@/stores/saveOrRevert";
import type { Todo, TodoInput } from "@/types/admin/todo";
import { createId } from "@/utils/admin/id";

type TodoSlice = { todos: Todo[] };
type SetState = (partial: Partial<TodoSlice> | ((state: TodoSlice) => Partial<TodoSlice>)) => void;
type GetState = () => TodoSlice;

// The dashboard to-dos: shown at once, saved to Neon, undone if saving fails.
export function createTodoActions(set: SetState, get: GetState) {
  return {
    // A new to-do belongs to the day it is added on (India time).
    addTodo: (input: TodoInput) => {
      const todo: Todo = { id: createId(), label: input.label.trim(), done: false, date: todayIst() };
      set((s) => ({ todos: [todo, ...s.todos] }));
      saveOrRevert(addTodoAction(todo), () => set((s) => ({ todos: s.todos.filter((item) => item.id !== todo.id) })), { title: "To-do added", description: todo.label });
      return todo;
    },

    updateTodo: (id: string, input: TodoInput) => {
      const before = get().todos;
      const label = input.label.trim();
      set({ todos: before.map((todo) => (todo.id === id ? { ...todo, label } : todo)) });
      saveOrRevert(updateTodoAction(id, label), () => set({ todos: before }), { title: "To-do updated", description: label });
    },

    toggleTodo: (id: string) => {
      const before = get().todos;
      const current = before.find((todo) => todo.id === id);
      if (!current) return;
      set({ todos: before.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)) });
      saveOrRevert(setTodoDoneAction(id, !current.done), () => set({ todos: before }), { title: current.done ? "Marked as pending" : "Marked as completed", description: current.label });
    },

    deleteTodo: (id: string) => {
      const before = get().todos;
      const current = before.find((todo) => todo.id === id);
      set({ todos: before.filter((todo) => todo.id !== id) });
      saveOrRevert(deleteTodoAction(id), () => set({ todos: before }), { title: "To-do deleted", description: current?.label });
    },
  };
}
