"use client";

import { useState } from "react";
import { Check, ListTodo, Plus } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { TodoFormDialog } from "@/components/admin/dashboard/TodoFormDialog";
import { Button } from "@/components/ui/button";
import { useClinicStore } from "@/stores/adminStore";
import type { TodoInput } from "@/types/admin/todo";
import { cn } from "cn";

export function TodayTodo() {
  const todos = useClinicStore((s) => s.todos);
  const addTodo = useClinicStore((s) => s.addTodo);
  const toggleTodo = useClinicStore((s) => s.toggleTodo);
  const [open, setOpen] = useState(false);
  const doneCount = todos.filter((todo) => todo.done).length;

  const save = (input: TodoInput) => {
    addTodo(input);
  };

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<ListTodo className="size-4" />}
        tone="leaf"
        title="Today's To-Do"
        action={
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {doneCount} of {todos.length} done
            </span>
            <Button
              type="button"
              size="sm"
              className="gap-1"
              onClick={() => setOpen(true)}
            >
              <Plus className="size-3.5" />
              Add Todo
            </Button>
          </div>
        }
      />
      <ul className="divide-y divide-border">
        {todos.map((todo) => (
          <li key={todo.id}>
            <button
              type="button"
              onClick={() => toggleTodo(todo.id)}
              className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-muted/40"
            >
              <span
                className={cn(
                  "inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  todo.done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background",
                )}
              >
                {todo.done ? <Check className="size-3 stroke-[3]" /> : null}
              </span>
              <span
                className={cn(
                  "text-sm text-foreground",
                  todo.done && "text-muted-foreground",
                )}
              >
                {todo.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <TodoFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={save}
      />
    </DashboardCard>
  );
}
