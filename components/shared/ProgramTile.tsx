import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programPath } from "@/constants/routes";

type Program = { slug: string; short: string; image: string; imageAlt: string; summary: string };

// One program card in the reference design card style.
export function ProgramTile({ program, index, linkLabel = "Learn More" }: { program: Program; index: number; linkLabel?: string }) {
  return (
    <Link href={programPath(program.slug)} aria-label={`${linkLabel} about ${program.short}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="m-0 font-heading text-lg leading-snug font-bold text-ink">{program.short}</h3>
        <p className="m-0 flex-1 text-sm leading-relaxed text-text">{program.summary}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {linkLabel} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
