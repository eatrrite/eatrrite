"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export type ToastType = "success" | "info" | "pending" | "error";

export type ShowToastInput = {
  title: string;
  description?: string;
  type: ToastType;
  /** Replace an earlier toast (for example the "Saving…" one) instead of adding a new one. */
  id?: string | number;
};

/**
 * One way to show a toast, for the public site and the admin. Call it after every user action.
 * A "pending" toast returns its id; pass that id to the result toast so it replaces the spinner.
 */
export function useShowToast() {
  return useCallback(({ title, description, type, id }: ShowToastInput) => {
    const options = { description, id };
    if (type === "success") return toast.success(title, options);
    if (type === "error") return toast.error(title, options);
    if (type === "info") return toast.info(title, options);
    return toast.loading(title, options);
  }, []);
}
