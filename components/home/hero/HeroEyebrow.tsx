import { Sparkles } from "lucide-react";

// reference design hero eyebrow, adapted for the dark hero overlay.
export function HeroEyebrow({ text }: { text: string }) {
  return (
    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 shadow-xs backdrop-blur-sm">
      <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
        <Sparkles className="size-2.5 fill-current" strokeWidth={2} />
      </span>
      <span className="pr-1 text-[0.7rem] font-medium tracking-[0.12em] text-white/85 uppercase sm:text-xs">{text}</span>
    </p>
  );
}
