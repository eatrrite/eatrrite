import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import programs from "@/constants/programs/programs.json";
import { programPath } from "@/constants/routes";
import { HomeSection } from "./kit/HomeSection";
import { LinkButton } from "./kit/LinkButton";
import { SectionIntro } from "./kit/SectionIntro";

// "Nutrition programs built around you": image cards in the Deccan card style.
export function ProgramGridSection() {
  const block = home.programs;
  return (
    <HomeSection tone="mint" food={FLOATING_FOOD.programGrid}>
      <SectionIntro eyebrow={block.pill} title={block.title} lead={block.lead} center />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((program, index) => (
          <BlurIn key={program.slug} delay={0.1 + index * 0.08} className="h-full">
            <Link href={programPath(program.slug)} className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image src={program.image} alt={program.short} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="m-0 font-heading text-lg leading-snug font-bold text-ink">{program.short}</h3>
                <p className="m-0 flex-1 text-sm leading-relaxed text-text">{program.summary}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </BlurIn>
        ))}
      </div>
      <BlurIn delay={0.2} className="mt-10 flex justify-center">
        <LinkButton href={block.cta.href} size="xl">{block.cta.label}</LinkButton>
      </BlurIn>
    </HomeSection>
  );
}
