import { cn } from "cn";
import { BlurIn } from "@/components/motion/BlurIn";

// Eyebrow, optional italic accent, title, lead and a large faded count, each
// revealed one after another. Copies the reference design section headings. Gold from the
// brand palette marks every section the same way: the eyebrow, a short rule under the title
// and the faded count.
export function SectionIntro({
  eyebrow,
  accent,
  title,
  lead,
  count,
  center = false,
  eyebrowHeading = false,
  className,
}: {
  eyebrow: string;
  accent?: string;
  title: string;
  lead?: string;
  count?: number;
  center?: boolean;
  /** The eyebrow is the section's real heading (H2) and the title a styled line under it,
   *  as for "Our Story" and "What guides us" on About (brief §5.1). Looks the same. */
  eyebrowHeading?: boolean;
  className?: string;
}) {
  const Eyebrow = eyebrowHeading ? "h2" : "p";
  const Title = eyebrowHeading ? "p" : "h2";
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <BlurIn>
        <Eyebrow className="m-0 type-eyebrow text-accent-deep">{eyebrow}</Eyebrow>
      </BlurIn>
      {accent ? (
        <BlurIn delay={0.05}>
          <p className="mt-3 mb-0 type-eyebrow text-accent-deep">{accent}</p>
        </BlurIn>
      ) : null}
      <BlurIn delay={0.1}>
        <Title className="mt-3 mb-0 font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">{title}</Title>
        <span aria-hidden className={cn("mt-4 block h-[3px] w-12 rounded-full bg-accent", center && "mx-auto")} />
      </BlurIn>
      {lead ? (
        <BlurIn delay={0.15}>
          <p className="mt-4 mb-0 text-text">{lead}</p>
        </BlurIn>
      ) : null}
      {count ? (
        <BlurIn delay={0.2}>
          <p className="mt-5 mb-0 font-heading text-5xl leading-none font-bold text-accent/45 tabular-nums sm:text-6xl">
            {String(count).padStart(2, "0")}
          </p>
        </BlurIn>
      ) : null}
    </div>
  );
}
