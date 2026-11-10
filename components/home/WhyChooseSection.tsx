import Image from "next/image";
import { BlurIn, BlurInItem } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";

// Why choose us in the reference design layout: round image left, numbered reasons right.
export function WhyChooseSection() {
  const { why } = home;
  return (
    <PageSection id="why-choose" tone="white" food={FLOATING_FOOD.why}>
      <div aria-hidden className="pointer-events-none absolute top-1/2 -left-24 size-[20rem] -translate-y-1/2 sm:size-[28rem] rounded-full bg-beige-deep/80 blur-3xl" />
      <div className="relative grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <BlurIn className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="relative mx-auto flex aspect-square max-w-[26rem] items-center justify-center lg:max-w-none">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-beige-deep" />
            <Image src="/images/about/holistic-wellness-branding.png" alt="Eat Rrite branding card with wellness props: journal, herbs, yoga mat and water bottle" width={1536} height={1024} sizes="(max-width: 1024px) 416px, 40vw" className="relative z-10 h-auto w-full drop-shadow-sm" />
          </div>
        </BlurIn>
        <div className="min-w-0">
          <SectionIntro eyebrow={why.pill} title={why.title} />
          <ul className="mt-8 mb-0 grid gap-6 p-0 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
            {why.items.map((item, index) => (
              <BlurInItem key={item.num} delay={0.1 + index * 0.06} className="group flex gap-4 border-t border-border pt-5 first:border-t-0 first:pt-0 sm:gap-5 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+2)]:pt-0">
                  <span aria-hidden className="font-heading text-2xl font-bold text-accent/60 tabular-nums transition-colors group-hover:text-accent-deep sm:text-3xl">{item.num}</span>
                  <div className="min-w-0">
                    {"title" in item && item.title ? <h3 className="m-0 font-heading text-lg font-bold text-ink sm:text-xl">{item.title}</h3> : null}
                    <p className={"title" in item && item.title ? "mt-1.5 mb-0 text-sm leading-relaxed text-text" : "m-0 text-sm leading-relaxed text-text"}>{item.text}</p>
                  </div>
              </BlurInItem>
            ))}
          </ul>
        </div>
      </div>
    </PageSection>
  );
}
