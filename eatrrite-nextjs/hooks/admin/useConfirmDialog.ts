"use client";

import { useCallback, useState } from "react";

export type ConfirmDialogRequest = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "default" | "destructive";
  onConfirm: () => void;
};

type ConfirmDialogState = ConfirmDialogRequest & { open: boolean };

export function useConfirmDialog() {
  const [state, setState] = useState<ConfirmDialogState | null>(null);

  const ask = useCallback((request: ConfirmDialogRequest) => {
    setState({ ...request, open: true });
  }, []);

  const onOpenChange = useCallback((open: boolean) => {
    setState((prev) => (prev ? { ...prev, open } : null));
  }, []);

  return {
    ask,
    props: state
      ? {
          open: state.open,
          onOpenChange,
          title: state.title,
          description: state.description,
          confirmLabel: state.confirmLabel ?? "Confirm",
          cancelLabel: state.cancelLabel ?? "Cancel",
          confirmVariant: state.confirmVariant ?? "destructive",
          onConfirm: state.onConfirm,
        }
      : null,
  };
}
