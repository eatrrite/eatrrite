import { Block, Spec, SubHead } from "./block";

const samples: { cls: string; spec: string; text: string; as?: "h1" | "h2" | "h3" | "p" | "span" }[] = [
  { cls: "type-hero text-primary", spec: ".hero-title, Lora 700, clamp(32px, 4.6vw, 56px), 1.15", text: "Lose Weight Without Losing Your Dal-Chawal." , as: "p" },
  { cls: "type-banner text-primary", spec: ".page-banner h1, Lora 600, clamp(36px, 5vw, 60px), 1.2", text: "About Eat Rrite", as: "p" },
  { cls: "type-section", spec: ".section-title, Lora 600, clamp(30px, 3.8vw, 44px), 1.2", text: "Built around your reports, not a template", as: "h2" },
  { cls: "type-section-split", spec: ".split .section-title, Lora 600, clamp(28px, 3.2vw, 40px), 1.25", text: "Nutrition programs built around you", as: "h2" },
  { cls: "type-card text-primary", spec: ".program-card h3, Lora 600, clamp(17px, 1.3vw, 20px), 1.25", text: "Female Hormone Health", as: "h3" },
  { cls: "type-faq text-ink", spec: ".faq-question, Lora 600, 18px", text: "How do I book a consultation with Eat Rrite?", as: "h3" },
  { cls: "type-stat text-primary", spec: ".about-stat strong, Lora 700, 24px, 1.15", text: "Client Stories", as: "span" },
];

const body: { cls: string; spec: string; text: string }[] = [
  { cls: "type-lead", spec: ".section-lead, Bricolage 400, 18px, 1.7", text: "Every program starts with a consultation call that looks at your reports, history and lifestyle." },
  { cls: "", spec: "body, Bricolage 400, 16px, 1.7, #595b62", text: "Real nutrition isn't about starvation or fear. It's about learning how to Eat Rrite." },
  { cls: "text-[15px]", spec: ".faq-answer, Bricolage 400, 15px, 1.7", text: "All Eat Rrite consultations and programs are conducted online." },
  { cls: "text-sm", spec: ".program-card p, Bricolage 400, 14px, 1.7", text: "Choose a 30-day reset, a 90-day journey, or a 180-day commitment." },
  { cls: "type-eyebrow text-primary", spec: ".eyebrow, Bricolage 600, 14px, 0.08em, uppercase", text: "Holistic nutrition" },
  { cls: "type-field-label text-text", spec: ".er-field span, Bricolage 600, 12px, 0.04em, uppercase", text: "Full name" },
  { cls: "type-micro text-muted-foreground", spec: ".about-stat span, Bricolage 400, 11px, 0.03em, uppercase", text: "Client Stories" },
];

function Row({ spec, children }: { spec: string; children: React.ReactNode }) {
  return (
    <li className="grid gap-3 border-b border-border py-6 last:border-b-0 md:grid-cols-[1fr_300px] md:items-baseline md:gap-8">
      <div className="min-w-0">{children}</div>
      <Spec>{spec}</Spec>
    </li>
  );
}

export function Typography() {
  return (
    <Block
      id="typography"
      pill="Type"
      tone="cream"
      title="Typography"
      lead="Lora for headings and buttons, Bricolage Grotesque for body text. Self-hosted through next/font with the same weight and optical size axes."
    >
      <SubHead>Headings: Lora</SubHead>
      <ul className="mb-12">
        {samples.map(({ cls, spec, text, as: Tag = "p" }) => (
          <Row key={spec} spec={spec}>
            <Tag className={`mb-0 ${cls}`}>{text}</Tag>
          </Row>
        ))}
        <Row spec="Lora italic, loaded as on the PHP site">
          <p className="mb-0 font-heading text-[22px] text-ink italic">Where food becomes medicine</p>
        </Row>
      </ul>
      <SubHead>Body: Bricolage Grotesque</SubHead>
      <ul>
        {body.map(({ cls, spec, text }) => (
          <Row key={spec} spec={spec}>
            <p className={`mb-0 ${cls}`}>{text}</p>
          </Row>
        ))}
      </ul>
    </Block>
  );
}
