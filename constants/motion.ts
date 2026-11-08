// Motion values copied from the GSAP code in assets/js/main.js on the PHP site.
export const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

// main.js: VIEW_ROOT_MARGIN ignores the bottom 20% of the viewport.
export const viewMargin = "0px 0px -20% 0px";

export const revealPresets = {
  default: { y: 48, duration: 0.85, amount: 0.28, margin: viewMargin },
  label: { y: 24, duration: 0.7, amount: 0.35, margin: viewMargin },
  card: { y: 56, duration: 0.9, amount: 0.3, margin: viewMargin },
  illustration: { y: 40, duration: 0.95, amount: 0.3, margin: viewMargin },
  photos: { y: 40, duration: 0.95, amount: 0.28, margin: viewMargin },
  copy: { y: 28, duration: 0.8, amount: 0.35, margin: viewMargin },
  cta: { y: 48, duration: 0.95, amount: 0.3, margin: viewMargin },
  footer: { y: 28, duration: 0.8, amount: 0.25, margin: "0px 0px -8% 0px" },
  grid: { y: 36, duration: 0.85, amount: 0.3, margin: viewMargin },
  banner: { y: 30, duration: 0.8, amount: 0, margin: viewMargin },
  hero: { y: 28, duration: 0.8, amount: 0, margin: viewMargin },
} as const;

export type RevealPreset = keyof typeof revealPresets;
