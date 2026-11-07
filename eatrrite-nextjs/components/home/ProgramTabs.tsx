"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import { faDroplet, faLeaf, faVenus, faWheatAwn } from "@fortawesome/free-solid-svg-icons";
import { BlurIn } from "@/components/motion/BlurIn";
import { Icon } from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import programs from "@/constants/programs/programs.json";
import { programPath } from "@/constants/routes";
import { LinkButton } from "./kit/LinkButton";

// Same order as 'icons' in constants/home/services.php.
const ICONS = [faWheatAwn, faDroplet, faLeaf, faVenus];

// Tabs plus a detail panel, as in the Deccan Dentics services section.
export function ProgramTabs() {
  const [active, setActive] = useState(0);
  const program = programs[active];
  return (
    <>
      <BlurIn delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {programs.map((item, index) => (
          <Button key={item.slug} type="button" size="lg" variant={index === active ? "default" : "outline"} onClick={() => setActive(index)} className="gap-2 px-4">
            <Icon icon={ICONS[index]} />
            {item.short}
          </Button>
        ))}
      </BlurIn>
      <BlurIn delay={0.15} className="mt-8">
        <div className="grid gap-8 rounded-xl border border-border bg-white p-6 md:grid-cols-2 md:p-8 lg:gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-lg text-primary">
              <Icon icon={ICONS[active]} />
            </div>
            <h3 className="m-0 font-heading text-2xl font-bold text-ink">{program.short}</h3>
            <p className="m-0 leading-relaxed text-text">{program.summary}</p>
            <ul className="m-0 grid gap-2.5 p-0">
              {program.benefits.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <LinkButton href={programPath(program.slug)} className="mt-2 self-start px-5">Learn More</LinkButton>
          </div>
          <div className="relative min-h-56 overflow-hidden rounded-lg bg-secondary sm:min-h-72">
            <Image src={program.image} alt={program.short} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </BlurIn>
    </>
  );
}
