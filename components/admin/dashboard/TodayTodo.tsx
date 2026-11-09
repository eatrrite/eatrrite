"use client";

import { useMemo, useState } from "react";
import { ListTodo, Plus } from "lucide-react";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { DashboardCard, DashboardCardHeader } from "@/components/admin/dashboard/DashboardCard";
import { TodoFormDialog } from "@/components/admin/dashboard/TodoFormDialog";
import { TodoFilters } from "@/components/admin/dashboard/todos/TodoFilters";
import { TodoItem } from "@/components/admin/dashboard/todos/TodoItem";
import { ListPagination } from "@/components/admin/ListPagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { todayIst } from "@/features/appointment/utils/istTime";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { usePagination } from "@/hooks/admin/usePagination";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Todo, TodoInput } from "@/types/admin/todo";
import { filterTodos, type TodoFilters as Filters } from "@/utils/admin/filterTodos";

const PAGE_SIZE = 5;

// The dashboard to-do list: filter by day and status, add, tick off, edit and delete.
export function TodayTodo() {
  const todos = useAdminStore((s) => s.todos);
  const addTodo = useAdminStore((s) => s.addTodo);
  const updateTodo = useAdminStore((s) => s.updateTodo);
  const toggleTodo = useAdminStore((s) => s.toggleTodo);
  const deleteTodo = useAdminStore((s) => s.deleteTodo);
  const today = todayIst();
  const [filters, setFilters] = useState<Filters>({ day: "all", date: today, status: "all" });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const { ask, props: confirmProps } = useConfirmDialog();

  const rows = useMemo(() => filterTodos(todos, filters, today), [todos, filters, today]);
  const { page, pageCount, pageItems, setPage } = usePagination(rows, PAGE_SIZE, JSON.stringify(filters));
  const doneCount = rows.filter((todo) => todo.done).length;
  const filtered = filters.status !== "all" || filters.day !== "today";

  const openForm = (todo: Todo | null) => {
    setEditing(todo);
    setOpen(true);
  };
  const save = (input: TodoInput) => (editing ? updateTodo(editing.id, input) : addTodo(input));
  const remove = (todo: Todo) =>
    ask({ title: "Delete to-do?", description: `“${todo.label}” will be removed.`, confirmLabel: "Delete to-do", onConfirm: () => deleteTodo(todo.id) });

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<ListTodo className="size-4" />}
        tone="leaf"
        title={filters.day === "today" ? "Today's To-Do" : "To-Do"}
        action={
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">{doneCount} of {rows.length} done</span>
            <Button type="button" size="sm" className="gap-1" onClick={() => openForm(null)}>
              <Plus className="size-3.5" />
              Add Todo
            </Button>
          </div>
        }
      />
      <TodoFilters filters={filters} onChange={setFilters} />
      {rows.length === 0 ? (
        filtered ? (
          <EmptyState size="sm" image="search" title="No to-dos match" description="Try another day or status." />
        ) : (
          <EmptyState size="sm" image="todos" title="Your list is clear" description="Add a to-do to keep track of the day." />
        )
      ) : (
        <ul className="mt-2 divide-y divide-border">
          {pageItems.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={() => toggleTodo(todo.id)} onEdit={() => openForm(todo)} onDelete={() => remove(todo)} />
          ))}
        </ul>
      )}
      <ListPagination className="mt-3" page={page} pageCount={pageCount} onPageChange={setPage} />

      <TodoFormDialog open={open} todo={editing} onClose={() => setOpen(false)} onSave={save} />
      {confirmProps ? <ConfirmationModal {...confirmProps} /> : null}
    </DashboardCard>
  );
}
