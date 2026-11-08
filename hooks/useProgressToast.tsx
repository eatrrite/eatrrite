"use client";

import { useCallback } from "react";
import { toast } from "sonner";

const ID = "form-progress";

// One toast that updates in place as a long form fills up: "3 of 9 answered" with a bar.
// `noun` finishes the sentence, for example "answered".
export function useProgressToast() {
  return useCallback((done: number, total: number, noun: string) => {
    const bar = (
      <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} className="mt-2 h-1.5 w-52 overflow-hidden rounded-full bg-border">
        <span className="block h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${(done / total) * 100}%` }} />
      </div>
    );
    // Bottom right, beside the other notices at the top, so answering never covers the questions.
    const options = { id: ID, description: bar, duration: 2500, position: "bottom-right" as const };
    if (done >= total) toast.success(`All ${total} ${noun}`, options);
    else toast.info(`${done} of ${total} ${noun}`, options);
  }, []);
}
