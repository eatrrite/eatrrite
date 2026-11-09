// Motion values copied from the GSAP code in assets/js/main.js on the PHP site.
export const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

// Every reveal starts as soon as the element's top edge rises 8% above the bottom of the screen.
// (The PHP site waited for a share of each element inside the top 80%, which made tall blocks
// sit blank for a long scroll.)
export const viewMargin = "0px 0px -8% 0px";

export const revealPresets = {
  default: { y: 48, duration: 0.85, amount: 0, margin: viewMargin },
  label: { y: 24, duration: 0.7, amount: 0, margin: viewMargin },
  card: { y: 56, duration: 0.9, amount: 0, margin: viewMargin },
  illustration: { y: 40, duration: 0.95, amount: 0, margin: viewMargin },
  photos: { y: 40, duration: 0.95, amount: 0, margin: viewMargin },
  copy: { y: 28, duration: 0.8, amount: 0, margin: viewMargin },
  cta: { y: 48, duration: 0.95, amount: 0, margin: viewMargin },
  footer: { y: 28, duration: 0.8, amount: 0, margin: viewMargin },
  grid: { y: 36, duration: 0.85, amount: 0, margin: viewMargin },
  banner: { y: 30, duration: 0.8, amount: 0, margin: viewMargin },
  hero: { y: 28, duration: 0.8, amount: 0, margin: viewMargin },
} as const;

export type RevealPreset = keyof typeof revealPresets;
