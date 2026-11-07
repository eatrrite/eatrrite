import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { staggerReveal } from "@/lib/motion";
import { Block, SubHead } from "./block";
import { Fields } from "./fields";

const faqs = [
  ["How do I book a consultation with Eat Rrite?", "Book your consultation call via the appointment page on this site, or message us on WhatsApp at +91 96398 77483."],
  ["Are consultations online, in-person, or both?", "All Eat Rrite consultations and programs are conducted online, so you can work with Mukta from anywhere."],
  ["What program lengths do you offer?", "Every live program is available as a 30-Day Foundation, 90-Day Journey or 180-Day Commitment."],
];

const programs = ["Weight Management", "Female Hormone Health", "Gut Health"];

export function Showcase() {
  return (
    <Block
      id="components"
      pill="Components"
      tone="mint"
      title="shadcn components in the Eat Rrite theme"
      lead="Hover the buttons and cards, open the FAQ, and focus the fields. States match the PHP rules."
    >
      <SubHead>Buttons</SubHead>
      <div className="mb-5 flex flex-wrap gap-3">
        <Button>Book Appointment</Button>
        <Button variant="outline">Explore Our Programs</Button>
        <Button variant="accent">Get Consultation</Button>
        <Button variant="light">Light</Button>
        <Button variant="link" className="px-0">Link</Button>
      </div>
      <div className="mb-14 flex flex-wrap gap-3 rounded-lg bg-primary p-8">
        <Button variant="accent">Get Consultation</Button>
        <Button variant="outline-light">View Our Programs</Button>
        <Button variant="light">Light</Button>
      </div>

      <SubHead>Pills and tags</SubHead>
      <div className="mb-14 flex flex-wrap items-center gap-3">
        <Badge><BadgeDot />Programs</Badge>
        <Badge variant="tag">Most Popular</Badge>
        <span className="inline-flex rounded-lg bg-primary p-4">
          <Badge variant="hero"><BadgeDot />Holistic Nutrition Coaching</Badge>
        </span>
      </div>

      <SubHead>Cards</SubHead>
      <div className="mb-14 grid gap-[22px] md:grid-cols-3">
        {programs.map((name, i) => (
          <Reveal key={name} y={staggerReveal.y} duration={staggerReveal.duration} delay={i * staggerReveal.stagger}>
            <Card className="h-full">
              <div className="relative overflow-hidden rounded-[18px]">
                <Badge variant="tag" className="absolute top-3.5 left-3.5 z-1">Program</Badge>
                <Image
                  src="/images/services/weight.jpg"
                  alt=""
                  width={640}
                  height={480}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/card:scale-108"
                />
              </div>
              <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Choose a 30-day reset, a 90-day journey, or a 180-day commitment.</CardDescription>
              </CardHeader>
              <CardFooter>
                <a href="#components" className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover/card:text-primary-dark">
                  Learn more
                  <ArrowRight aria-hidden className="size-4 text-accent transition-transform duration-300 group-hover/card:translate-x-1" />
                </a>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mb-14">
        <SubHead>Forms</SubHead>
        <Fields />
      </div>

      <SubHead>FAQ accordion</SubHead>
      <Card lift={false} className="max-w-[780px]">
        <CardContent>
          <Accordion defaultValue={[faqs[0][0]]}>
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </Block>
  );
}
