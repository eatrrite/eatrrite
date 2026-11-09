"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: "default" | "destructive";
  onConfirm: () => void;
  /** Keep the dialog open after confirming (the caller closes it, or the page changes). */
  closeOnConfirm?: boolean;
  /** While true, both buttons are disabled and the confirm button shows `pendingLabel`. */
  pending?: boolean;
  pendingLabel?: string;
};

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmVariant = "default",
  onConfirm,
  closeOnConfirm = true,
  pending = false,
  pendingLabel,
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            disabled={pending}
            onClick={() => {
              onConfirm();
              if (closeOnConfirm) onOpenChange(false);
            }}
          >
            {pending ? (
              <>
                <Loader2 className="animate-spin" />
                {pendingLabel ?? confirmLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
