import Image from "next/image";
import { faQuoteRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import home from "@/lib/data/home.json";

// Copies .testimonial-grid and .testimonial-card from style.css.
export function Testimonials() {
  const stories = home.testimonials;
  return (
    <section id="testimonials" className="er-section bg-cream">
      <div className="er-container">
        <SectionHeading pill={stories.pill} title={stories.title} lead={stories.lead} />
        <div className="mt-10 grid grid-cols-3 gap-6 er-md:grid-cols-2 er-sm:grid-cols-1">
          {stories.items.map((item) => (
            <Reveal key={item.name} preset="card" className="group/testimonial h-full">
              <Card
                lift={false}
                className="relative block h-full border-t-4 border-t-primary p-9 transition-all duration-300 ease-[ease] group-hover/testimonial:-translate-y-1.5 group-hover/testimonial:border-border-hover group-hover/testimonial:border-t-accent group-hover/testimonial:shadow-lift"
              >
                <div className="absolute top-9 right-9 text-4xl leading-[1.7] text-accent/35">
                  <Icon icon={faQuoteRight} />
                </div>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={136}
                  height={136}
                  className="mb-5 size-[68px] rounded-full border-[3px] border-accent object-cover"
                />
                <div aria-hidden className="mb-4 text-sm text-accent">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Icon key={n} icon={faStar} />
                  ))}
                </div>
                <p className="mb-5 text-[15px] leading-[1.6] text-text italic">&quot;{item.quote}&quot;</p>
                <h4 className="mb-1 text-[18px] font-semibold text-primary">{item.name}</h4>
                <span className="text-[13px] text-muted-foreground">{item.role}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
