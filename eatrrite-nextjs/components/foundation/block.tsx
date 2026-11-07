import { cn } from "cn";
import { Badge, BadgeDot } from "@/components/ui/badge";

// One section of the foundation page, built from .section and .section-heading.
export function Block({
  id,
  pill,
  title,
  lead,
  tone = "white",
  children,
}: {
  id: string;
  pill: string;
  title: string;
  lead?: string;
  tone?: "white" | "cream" | "mint";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "er-section",
        tone === "cream" && "bg-cream",
        tone === "mint" && "bg-mint"
      )}
    >
      <div className="er-container">
        <header className="mb-12">
          <Badge className="mb-[18px]">
            <BadgeDot />
            {pill}
          </Badge>
          <h2 className="type-section mb-5 max-w-[760px]">{title}</h2>
          {lead ? <p className="type-lead mb-0 max-w-[600px]">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

// Small heading used to group specimens inside a block.
export function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="type-eyebrow mb-5 font-sans text-primary">{children}</h3>;
}

// Spec text beside a specimen.
export function Spec({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-xs leading-[1.5] break-words text-text">{children}</code>;
}
