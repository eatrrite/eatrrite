import Image from "next/image";
import { Check } from "lucide-react";
import { BlurIn, BlurInItem } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { pageFood } from "@/constants/home/floatingFood";

type Program = { short: string; image_secondary: string; imageSecondaryAlt: string; benefits: string[]; ideal: string };

// Key benefits and ideal-for, round image left as in the reference why-choose layout.
export function ProgramBenefits({ program, benefitsTitle, idealTitle }: { program: Program; benefitsTitle: string; idealTitle: string }) {
  return (
    <PageSection tone="mint" food={pageFood(6)}>
      <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <BlurIn className="relative mx-auto flex aspect-square w-full max-w-[22rem] items-center justify-center lg:max-w-none">
          <div aria-hidden className="absolute inset-[8%] rounded-full bg-soft" />
          <Image src={program.image_secondary} alt={program.imageSecondaryAlt} width={800} height={800} sizes="(max-width: 1024px) 320px, 40vw" className="relative z-10 aspect-square w-[78%] rounded-full object-cover shadow-card" />
        </BlurIn>
        <div className="min-w-0">
          <BlurIn>
            <h2 className="m-0 font-heading text-3xl font-bold tracking-tight text-ink">{benefitsTitle}</h2>
          </BlurIn>
          <ul className="mt-6 mb-0 grid gap-3 p-0">
            {program.benefits.map((benefit, index) => (
              <BlurInItem key={benefit} delay={0.08 + index * 0.05} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Check className="size-3.5" />
                </span>
                {benefit}
              </BlurInItem>
            ))}
          </ul>
          <BlurIn delay={0.3} className="mt-8 rounded-lg border border-border bg-white p-5 sm:p-6">
            <p className="m-0 type-eyebrow">{idealTitle}</p>
            <p className="mt-2 mb-0 text-text">{program.ideal}</p>
          </BlurIn>
        </div>
      </div>
    </PageSection>
  );
}
