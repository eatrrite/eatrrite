// Motion values copied from the GSAP code in assets/js/main.js on the PHP site.
export const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

// Every reveal starts once the element's top edge has risen a quarter of the screen above the
// bottom, so the visitor sees it animate after scrolling it into view (8% and 15% fired while it
// was still near the edge, so it looked already done). amount 0: a share of a tall block (the PHP site's
// way) left it blank for a long scroll. One shared viewport for Reveal, BlurIn and FadeIn.
export const viewMargin = "0px 0px -25% 0px";
export const revealViewport = { once: true, amount: 0, margin: viewMargin } as const;

// The footer sits at the end of the page, where its last items can never rise a quarter up a phone
// screen, so it uses a smaller margin to always reveal.
export const footerViewport = { once: true, amount: 0, margin: "0px 0px -4% 0px" } as const;

export const revealPresets = {
  default: { y: 48, duration: 0.85 },
  label: { y: 24, duration: 0.7 },
  card: { y: 56, duration: 0.9 },
  illustration: { y: 40, duration: 0.95 },
  photos: { y: 40, duration: 0.95 },
  copy: { y: 28, duration: 0.8 },
  cta: { y: 48, duration: 0.95 },
  footer: { y: 28, duration: 0.8 },
  grid: { y: 36, duration: 0.85 },
  banner: { y: 30, duration: 0.8 },
  hero: { y: 28, duration: 0.8 },
} as const;

export type RevealPreset = keyof typeof revealPresets;
