import { CalendarCheck2, FileText, UtensilsCrossed, Video } from "lucide-react";

// What sets Eat Rrite apart, drawn from the site copy: plans built on reports,
// everyday meals, online consultations and the Friday check-ins.
const FEATURES = [
  { label: "Report-based Plans", icon: FileText },
  { label: "Your Everyday Meals", icon: UtensilsCrossed },
  { label: "Online Consultations", icon: Video },
  { label: "Friday Check-ins", icon: CalendarCheck2 },
] as const;

export function HeroFeatures() {
  return (
    <ul className="mt-10 mb-0 flex flex-wrap items-center divide-x divide-white/25 p-0">
      {FEATURES.map(({ label, icon: Icon }) => (
        <li key={label} className="flex items-center gap-1.5 px-2.5 first:pl-0 last:pr-0">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/12 text-accent backdrop-blur-sm">
            <Icon className="size-3" strokeWidth={1.75} />
          </span>
          <span className="text-[10px] leading-snug text-white/90 sm:text-[11px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
