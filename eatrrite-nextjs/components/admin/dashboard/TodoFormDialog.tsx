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
import type { TodoInput } from "@/types/admin/todo";

type TodoFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (input: TodoInput) => void;
};

export function TodoFormDialog({ open, onClose, onSave }: TodoFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        {open ? <TodoFormBody onClose={onClose} onSave={onSave} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function TodoFormBody({
  onClose,
  onSave,
}: Omit<TodoFormDialogProps, "open">) {
  const [label, setLabel] = useState("");
  const trimmed = label.trim();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">
          Add to-do
        </DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!trimmed) return;
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
            Add to-do
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
