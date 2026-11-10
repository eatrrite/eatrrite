/**
 * Icon chip colours for admin cards, taken from the sidebar illustration:
 * teal coat, gold plate, fresh leaf, tomato. Only existing theme tokens.
 */
export const ICON_TONES = {
  teal: "bg-primary/10 text-primary",
  gold: "bg-accent/25 text-ink",
  leaf: "bg-accent-green/15 text-primary",
  coral: "bg-alert-bg text-alert-text",
} as const;

const ICON_TONESS = {
  teal: "bg-primary/10 text-primary",
  gold: "bg-accent/25 text-ink",
  leaf: "bg-accent-green/15 text-primary",
  coral: "bg-alert-bg text-alert-text",
} as const;

export type IconTone = keyof typeof ICON_TONES;
