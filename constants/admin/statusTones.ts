/** Shared badge looks — map every status onto one of these. */
export const STATUS_TONES = {
  success: "bg-accent-green/15 text-primary",
  active: "bg-primary/10 text-primary",
  pending: "bg-accent/25 text-ink",
  muted: "bg-pill text-muted-foreground",
  danger: "bg-alert-bg text-alert-text",
} as const;

export type StatusTone = keyof typeof STATUS_TONES;

export const STATUS_BADGE_BASE =
  "inline-flex rounded-full px-3 py-1 text-xs font-body font-medium whitespace-nowrap";
