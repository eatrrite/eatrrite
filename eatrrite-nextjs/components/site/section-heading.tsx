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
}: {
  pill: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <SectionPill>{pill}</SectionPill>
      <SplitTitle
        text={title}
        className="type-section mx-auto mb-5 max-w-[920px]"
        lineClassName="justify-center"
      />
      {lead ? (
        <Reveal preset="label">
          <p className={cn("type-lead mx-auto mb-10 max-w-[600px] text-center")}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
