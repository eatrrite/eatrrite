import { toast } from "sonner";
import type { ActionResult } from "@/utils/actionResult";

// The store shows a change at once. This saves it to Neon in the background and, if saving
// fails, undoes the change and says why.
export function saveOrRevert(save: Promise<ActionResult<object>>, revert: () => void) {
  save
    .then((result) => {
      if (result.ok) return;
      revert();
      toast.error("Not saved", { description: result.error });
    })
    .catch(() => {
      revert();
      toast.error("Not saved", { description: "Check your connection and try again." });
    });
}
