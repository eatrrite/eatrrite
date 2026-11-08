import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { BlurInItem } from "@/components/motion/BlurIn";
import { Icon } from "@/components/shared/Icon";
import { cn } from "cn";

// The cohort page card: round icon, optional number, title, text or a list below.
export function IconCard({
  icon, num, title, text, brand = false, delay = 0, children,
}: {
  icon: IconDefinition;
  num?: string;
  title: string;
  text?: string;
  brand?: boolean;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <BlurInItem delay={delay} className={cn("group h-full rounded-lg border p-6 transition-all duration-300 hover:-translate-y-0.5", brand ? "border-primary bg-mint" : "border-border bg-white hover:bg-mint")}>
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon icon={icon} />
        </span>
        {num ? <span className="font-heading text-3xl font-bold text-primary/15 tabular-nums">{num}</span> : null}
      </div>
      <h3 className="mt-5 mb-0 font-heading text-lg font-bold text-ink">{title}</h3>
      {text ? <p className="mt-2 mb-0 text-sm leading-relaxed text-text">{text}</p> : null}
      {children}
    </BlurInItem>
  );
}
