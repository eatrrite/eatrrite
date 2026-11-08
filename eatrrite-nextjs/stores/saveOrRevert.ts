import { toast } from "sonner";
import type { ActionResult } from "@/utils/actionResult";

/** What the toast says once the database confirms the change. */
export type SaveNotice = { title: string; description?: string };

// The store shows a change at once. This saves it to Neon in the background with a "Saving…"
// toast, which becomes the success message once the database confirms. If saving fails the
// change is undone and the same toast says why.
export function saveOrRevert(save: Promise<ActionResult<object>>, revert: () => void, notice: SaveNotice) {
  const id = toast.loading("Saving…");
  const failed = (description: string) => {
    revert();
    toast.error("Not saved", { id, description });
  };
  save
    .then((result) => {
      if (!result.ok) return failed(result.error);
      toast.success(notice.title, { id, description: notice.description });
    })
    .catch(() => failed("Check your connection and try again."));
}
