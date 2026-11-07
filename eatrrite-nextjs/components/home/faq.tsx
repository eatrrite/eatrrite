import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/motion/split-title";
import { SectionPill } from "@/components/site/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import home from "@/lib/data/home.json";

// Copies .faq-section, .faq-panel and .faq-layout from style.css.
export function Faq() {
  const { faq } = home;
  return (
    <section id="faqs" className="bg-white pt-10 pb-[100px]">
      <div className="er-container">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-mint px-[50px] py-[70px] er-md:px-6 er-md:py-10">
          <div className="grid grid-cols-[1fr_1px_1.15fr] items-start gap-10 er-md:grid-cols-1">
            <div>
              <SectionPill>{faq.pill}</SectionPill>
              <SplitTitle text={faq.title} className="type-section mb-7 max-w-[420px]" />
              <Reveal preset="illustration" className="max-w-[380px]">
                <Image
                  src={faq.image}
                  alt=""
                  width={433}
                  height={326}
                  className="h-auto w-full mix-blend-multiply"
                />
              </Reveal>
            </div>
            <div aria-hidden className="min-h-full w-px self-stretch bg-primary/12 er-md:hidden" />
            <Accordion defaultValue={[faq.items[0].q]}>
              {faq.items.map((item) => (
                <Reveal key={item.q} preset="card">
                  <AccordionItem value={item.q}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
