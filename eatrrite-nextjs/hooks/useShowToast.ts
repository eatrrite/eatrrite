"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export type ToastType = "success" | "info" | "pending" | "error";

export type ShowToastInput = {
  title: string;
  description?: string;
  type: ToastType;
};

/** One way to show a toast, for the public site and the admin. Call it after every user action. */
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

    if (type === "info") {
      toast.info(title, options);
      return;
    }

    toast.loading(title, options);
  }, []);
}
