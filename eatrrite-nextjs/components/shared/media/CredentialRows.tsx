import { BlurIn } from "@/components/motion/BlurIn";
import credentials from "@/constants/about/credentials.json";

// The three short rows under Mukta's story: highlights, featured in, spoken at (brief §5.2).
// Publication names are plain text, never newspaper logos.
export function CredentialRows() {
  return (
    <BlurIn>
      <dl className="m-0 grid gap-0 divide-y divide-border rounded-lg border border-border bg-white">
        {credentials.rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="type-eyebrow text-xl">{row.label}</dt>
            <dd className="m-0 text-sm leading-relaxed text-text sm:text-base">{row.text}</dd>
          </div>
        ))}
      </dl>
    </BlurIn>
  );
}
