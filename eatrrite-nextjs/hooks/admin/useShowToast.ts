"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export type ToastType = "success" | "pending" | "error";

export type ShowToastInput = {
  title: string;
  description?: string;
  type: ToastType;
};

/** Thin wrapper around sonner for success / pending / error notices. */
export function useShowToast() {
  return useCallback(({ title, description, type }: ShowToastInput) => {
    const options = { description };

    if (type === "success") {
      toast.success(title, options);
      return;
    }

    if (type === "error") {
      toast.error(title, options);
      return;
    }

    toast.loading(title, options);
  }, []);
}
