"use client";

import { Check, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Todo } from "@/types/admin/todo";
import { cn } from "cn";

type TodoItemProps = {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

// One to-do: tap to mark it done or pending; the ⋮ menu edits or deletes it.
export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-2">
      <button
        type="button"
        aria-pressed={todo.done}
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center gap-3 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <span
          className={cn(
            "inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            todo.done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
          )}
        >
          {todo.done ? <Check className="size-3 stroke-[3]" /> : null}
        </span>
        <span className={cn("min-w-0 truncate text-sm text-foreground", todo.done && "text-muted-foreground line-through")}>
          {todo.label}
        </span>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Actions for ${todo.label}`}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuItem onClick={onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={onDelete}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
