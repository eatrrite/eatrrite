import type { ShowToastInput } from "@/hooks/admin/useShowToast";

/** Success toast for a discrete filter change. */
export function notifyFilterApplied(
  showToast: (input: ShowToastInput) => void,
  title: string,
  label: string,
) {
  showToast({
    title,
    description: `Showing ${label.toLowerCase()}.`,
    type: "success",
  });
}
