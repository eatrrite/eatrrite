import { Block, Spec, SubHead } from "./block";

const spacing = [
  [".page-banner padding", 120],
  [".section padding", 100],
  [".site-footer top padding", 80],
  [".section-heading margin", 48],
  [".contact-grid gap", 48],
  [".card padding", 32],
  [".btn horizontal padding", 28],
  [".faq-question horizontal padding", 22],
  [".form-grid input horizontal padding", 20],
  [".form-grid gap", 16],
  [".er-fields gap", 14],
  [".btn vertical padding", 12],
] as const;

const radii = [
  ["rounded-2xs", "8px", "rounded-2xs"],
  ["rounded-xs", "12px, .er-field", "rounded-xs"],
  ["rounded-sm", "16px, --radius-sm", "rounded-sm"],
  ["rounded-md", "20px, .blog-card__media", "rounded-md"],
  ["rounded-lg", "24px, --radius", "rounded-lg"],
  ["rounded-xl", "28px, .blog-card", "rounded-xl"],
  ["rounded-2xl", "36px", "rounded-2xl"],
  ["rounded-full", "999px, .btn, .pill-label", "rounded-full"],
];

const shadows = [
  ["shadow-card", "--shadow: 0 18px 50px rgba(1,78,78,.06)"],
  ["shadow-card-hover", ".card:hover: 0 30px 60px rgba(1,78,78,.12)"],
  ["shadow-btn-primary", ".btn-primary:hover: 0 10px 25px rgba(1,78,78,.2)"],
  ["shadow-btn-accent", ".btn-accent:hover: 0 10px 25px rgba(229,184,88,.35)"],
  ["shadow-faq-open", ".faq-item.is-open: 0 18px 40px rgba(229,184,88,.28)"],
];

export function Spacing() {
  return (
    <Block
      id="spacing"
      pill="Layout"
      title="Spacing, radius and shadow"
      lead="Container is 1200px with a 20px side gutter. Tailwind's 4px spacing scale reaches every value below."
    >
      <SubHead>Spacing</SubHead>
      <ul className="mb-14 grid gap-2.5">
        {spacing.map(([name, px]) => (
          <li key={name} className="grid items-center gap-x-4 sm:grid-cols-[280px_1fr]">
            <Spec>{name}: {px}px</Spec>
            <div className="h-3.5 rounded-full bg-primary" style={{ width: px * 3, maxWidth: "100%" }} />
          </li>
        ))}
      </ul>

      <SubHead>Border radius</SubHead>
      <ul className="mb-14 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {radii.map(([name, note, cls]) => (
          <li key={name} className="grid gap-3">
            <div className={`h-28 border border-primary/25 bg-mint ${cls}`} />
            <div className="grid gap-0.5">
              <strong className="text-sm font-semibold text-ink">{name}</strong>
              <Spec>{note}</Spec>
            </div>
          </li>
        ))}
      </ul>
      <p className="mb-14 max-w-[600px] text-sm">
        Used only once or twice in PHP, so written as one-off values when those
        rules are rebuilt: 10px, 14px, 18px, 30px.
      </p>

      <SubHead>Shadow</SubHead>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8">
        {shadows.map(([name, note]) => (
          <li key={name} className={`rounded-lg bg-white p-6 ${name}`}>
            <strong className="mb-2 block text-sm font-semibold text-ink">{name}</strong>
            <Spec>{note}</Spec>
          </li>
        ))}
      </ul>
    </Block>
  );
}
