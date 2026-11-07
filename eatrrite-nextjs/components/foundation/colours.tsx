import { Block, Spec, SubHead } from "./block";

const brand = [
  ["--color-primary", "#014e4e", "primary, ring", "bg-primary"],
  ["--color-primary-dark", "#003636", "primary-dark", "bg-primary-dark"],
  ["--color-accent", "#e5b858", "accent", "bg-accent"],
  ["--color-accent-green", "#52c834", "accent-green", "bg-accent-green"],
  ["--color-cream", "#f8f5f0", "cream", "bg-cream"],
  ["--color-mint", "#f1f7f4", "secondary, mint", "bg-mint"],
  ["--color-white", "#ffffff", "background, card, popover", "bg-white"],
  ["--color-ink", "#1c2029", "ink, popover-foreground", "bg-ink"],
  ["--color-text", "#595b62", "foreground, card-foreground", "bg-text"],
  ["--color-muted", "#819291", "muted-foreground", "bg-muted-foreground"],
  ["--color-footer", "#111416", "footer", "bg-footer"],
  ["--color-border", "rgba(1,78,78,.12)", "border", "bg-border"],
  ["--color-border-hover", "rgba(229,184,88,.45)", "border-hover", "bg-border-hover"],
];

const extra = [
  ["#f0c96a", ".btn-accent:hover", "accent-hover", "bg-accent-hover"],
  ["#eceeed", ".pill-label", "muted, pill", "bg-pill"],
  ["#eef3f1", ".faq-chevron", "chevron", "bg-chevron"],
  ["#e8f3ef", ".section-primary-soft", "soft", "bg-soft"],
  ["#c9d0ce", ".site-footer text", "footer-text", "bg-footer-text"],
  ["#25d366", "WhatsApp button", "whatsapp", "bg-whatsapp"],
  ["#fdecee", ".er-alert", "alert-bg", "bg-alert-bg"],
  ["#842029", ".er-alert text", "destructive, alert-text", "bg-alert-text"],
];

function Swatch({ name, value, token, cls }: { name: string; value: string; token: string; cls: string }) {
  return (
    <li className="overflow-hidden rounded-sm border border-border bg-white">
      <div className={`h-24 border-b border-border ${cls}`} />
      <div className="grid gap-1 p-4">
        <strong className="text-sm font-semibold break-words text-ink">{name}</strong>
        <Spec>{value}</Spec>
        <span className="text-xs leading-[1.5] text-text">shadcn: {token}</span>
      </div>
    </li>
  );
}

export function Colours() {
  return (
    <Block
      id="colours"
      pill="Colour"
      title="Colour shades"
      lead="Exact values from the PHP :root, mapped to shadcn theme tokens in app/globals.css."
    >
      <SubHead>PHP :root variables</SubHead>
      <ul className="mb-12 grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {brand.map(([name, value, token, cls]) => (
          <Swatch key={name} name={name} value={value} token={token} cls={cls} />
        ))}
      </ul>
      <SubHead>Hard-coded in PHP rules</SubHead>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {extra.map(([value, name, token, cls]) => (
          <Swatch key={name} name={name} value={value} token={token} cls={cls} />
        ))}
      </ul>
    </Block>
  );
}
