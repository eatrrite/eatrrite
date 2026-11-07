import Image from "next/image";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { cn } from "cn";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/shared/Icon";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { programPath } from "@/constants/routes";

// Copies .card.program-card. The Programs page uses the wider 16/10 image.
export function ProgramCard({
  program,
  linkLabel,
  wide = false,
}: {
  program: { slug: string; short: string; image: string; summary: string };
  linkLabel: string;
  wide?: boolean;
}) {
  return (
    <Reveal preset="card" className="h-full">
      <Card className="h-full gap-0">
        <div className="relative mb-5 overflow-hidden rounded-[18px]">
          <Image
            src={program.image}
            alt={program.short}
            width={520}
            height={420}
            sizes={
              wide
                ? "(max-width: 900px) 100vw, 600px"
                : "(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
            }
            className={cn(
              "w-full object-cover transition-transform duration-500 ease-[ease] group-hover/card:scale-108",
              wide ? "aspect-[16/10]" : "aspect-[4/3]"
            )}
          />
        </div>
        <CardTitle className="mb-3">{program.short}</CardTitle>
        <CardDescription className="mb-4 flex-1">{program.summary}</CardDescription>
        <Link
          href={programPath(program.slug)}
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-[color,gap] duration-300 ease-[ease] group-hover/card:text-primary-dark"
        >
          {linkLabel}
          <Icon
            icon={faArrowRight}
            className="text-accent transition-transform duration-300 ease-[ease] group-hover/card:translate-x-1"
          />
        </Link>
      </Card>
    </Reveal>
  );
}
