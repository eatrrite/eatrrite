"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Todo, TodoInput } from "@/types/admin/todo";

type TodoFormDialogProps = {
  open: boolean;
  /** The to-do being edited; empty when adding a new one. */
  todo?: Todo | null;
  onClose: () => void;
  onSave: (input: TodoInput) => void;
};

// Add or edit a to-do, the same dialog pattern as leads and appointments.
export function TodoFormDialog({ open, todo, onClose, onSave }: TodoFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        {open ? <TodoFormBody todo={todo} onClose={onClose} onSave={onSave} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function TodoFormBody({
  todo,
  onClose,
  onSave,
}: Omit<TodoFormDialogProps, "open">) {
  const [label, setLabel] = useState(todo?.label ?? "");
  const trimmed = label.trim();
  const editing = Boolean(todo);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">
          {editing ? "Edit to-do" : "Add to-do"}
        </DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!trimmed) return;
          if (trimmed === todo?.label) return onClose();
          onSave({ label: trimmed });
          onClose();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="todo-label">Task</Label>
          <Input
            id="todo-label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="What needs to get done?"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!trimmed}>
            {editing ? "Save changes" : "Add to-do"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
