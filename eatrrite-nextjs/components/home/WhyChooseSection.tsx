import Image from "next/image";
import { BlurIn, BlurInItem } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { HomeSection } from "./kit/HomeSection";
import { SectionIntro } from "./kit/SectionIntro";

// Why choose us in the Deccan Dentics layout: round image left, numbered reasons right.
export function WhyChooseSection() {
  const { why } = home;
  return (
    <HomeSection id="why-choose" tone="mint" food={FLOATING_FOOD.why}>
      <div aria-hidden className="pointer-events-none absolute top-1/2 -left-24 size-[28rem] -translate-y-1/2 rounded-full bg-secondary/70 blur-3xl" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <BlurIn className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="relative mx-auto flex aspect-square max-w-[22rem] items-center justify-center lg:max-w-none">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-soft" />
            <Image src="/images/about/bowl.jpg" alt="A balanced Indian meal" width={1200} height={1200} sizes="(max-width: 1024px) 320px, 40vw" className="relative z-10 aspect-square w-[78%] rounded-full object-cover shadow-card" />
          </div>
        </BlurIn>
        <div className="min-w-0">
          <SectionIntro eyebrow={why.pill} title={why.title} />
          <ul className="mt-8 mb-0 grid gap-6 p-0 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
            {why.items.map((item, index) => (
              <BlurInItem key={item.num} delay={0.1 + index * 0.06} className="group flex gap-4 border-t border-border pt-5 first:border-t-0 first:pt-0 sm:gap-5 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+2)]:pt-0">
                  <span aria-hidden className="font-heading text-2xl font-bold text-primary/25 tabular-nums transition-colors group-hover:text-primary/50 sm:text-3xl">{item.num}</span>
                  <div className="min-w-0">
                    <h3 className="m-0 font-heading text-lg font-bold text-ink sm:text-xl">{item.title}</h3>
                    <p className="mt-1.5 mb-0 text-sm leading-relaxed text-text">{item.text}</p>
                  </div>
              </BlurInItem>
            ))}
          </ul>
        </div>
      </div>
    </HomeSection>
  );
}
