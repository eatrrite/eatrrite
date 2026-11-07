import { cn } from "cn";
import { BlurIn } from "@/components/motion/BlurIn";

// Eyebrow, optional italic accent, title, lead and a large faded count, each
// revealed one after another. Copies the Deccan Dentics section headings.
export function SectionIntro({
  eyebrow,
  accent,
  title,
  lead,
  count,
  center = false,
  className,
}: {
  eyebrow: string;
  accent?: string;
  title: string;
  lead?: string;
  count?: number;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <BlurIn>
        <p className="mb-0 text-xs font-semibold tracking-[0.12em] text-primary uppercase sm:text-sm">{eyebrow}</p>
      </BlurIn>
      {accent ? (
        <BlurIn delay={0.05}>
          <p className="mt-3 mb-0 font-heading text-2xl text-primary italic sm:text-3xl">{accent}</p>
        </BlurIn>
      ) : null}
      <BlurIn delay={0.1}>
        <h2 className="mt-3 mb-0 font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      </BlurIn>
      {lead ? (
        <BlurIn delay={0.15}>
          <p className="mt-4 mb-0 text-text">{lead}</p>
        </BlurIn>
      ) : null}
      {count ? (
        <BlurIn delay={0.2}>
          <p className="mt-5 mb-0 font-heading text-5xl leading-none font-bold text-primary/15 tabular-nums sm:text-6xl">
            {String(count).padStart(2, "0")}
          </p>
        </BlurIn>
      ) : null}
    </div>
  );
}
