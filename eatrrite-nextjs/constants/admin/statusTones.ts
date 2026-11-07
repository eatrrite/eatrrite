/** Shared badge looks — map every status onto one of these. */
export const STATUS_TONES = {
  success: "bg-emerald-50 text-emerald-700",
  active: "bg-sky-100 text-sky-700",
  muted: "bg-zinc-100 text-zinc-800",
  danger: "bg-red-50 text-red-700",
} as const;

export type StatusTone = keyof typeof STATUS_TONES;

export const STATUS_BADGE_BASE =
  "inline-flex rounded-full px-3 py-1 text-xs font-body font-medium whitespace-nowrap";
