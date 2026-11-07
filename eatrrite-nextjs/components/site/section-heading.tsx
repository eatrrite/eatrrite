import { cn } from "cn";
import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/motion/split-title";
import { Badge, BadgeDot } from "@/components/ui/badge";

// Pill, title and lead, copying .section-heading and .section-title.
export function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <Reveal preset="label">
      <Badge className="mb-[18px]">
        <BadgeDot />
        {children}
      </Badge>
    </Reveal>
  );
}

export function SectionHeading({
  pill,
  title,
  lead,
  center = true,
  split = true,
  titleClassName,
}: {
  pill: string;
  title: string;
  lead?: string;
  center?: boolean;
  split?: boolean;
  titleClassName?: string;
}) {
  const titleClass = cn(
    center ? "type-section mx-auto mb-5 max-w-[920px]" : "type-section mb-5 max-w-[760px]",
    titleClassName
  );
  return (
    <div className={cn("mb-12", center && "text-center")}>
      <SectionPill>{pill}</SectionPill>
      {split ? (
        <SplitTitle
          text={title}
          className={titleClass}
          lineClassName={center ? "justify-center" : undefined}
        />
      ) : (
        <h2 className={titleClass}>{title}</h2>
      )}
      {lead ? (
        <Reveal preset="label">
          <p className="type-lead mx-auto mb-10 max-w-[600px] text-center">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
