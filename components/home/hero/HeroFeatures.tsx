import { CalendarCheck2, FileText, UtensilsCrossed, Video } from "lucide-react";

// What sets Eat Rrite apart, drawn from the site copy: plans built on reports,
// everyday meals, online consultations and the Friday check-ins.
const FEATURES = [
  { label: "Report-based Plans", icon: FileText },
  { label: "Your Everyday Meals", icon: UtensilsCrossed },
  { label: "Online Consultations", icon: Video },
  { label: "Friday Check-ins", icon: CalendarCheck2 },
] as const;

// Phones: a 2×2 grid, so both rows line up (a wrapped divided row puts dividers and padding on the
// second line). From sm up: one row split by thin dividers.
export function HeroFeatures() {
  return (
    <ul className="mt-10 mb-0 grid grid-cols-2 gap-x-4 gap-y-3 p-0 sm:flex sm:flex-wrap sm:items-center sm:gap-0 sm:divide-x sm:divide-white/25">
      {FEATURES.map(({ label, icon: Icon }) => (
        <li key={label} className="flex items-center gap-1.5 sm:px-2.5 sm:first:pl-0 sm:last:pr-0">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/12 text-accent backdrop-blur-sm">
            <Icon className="size-3" strokeWidth={1.75} />
          </span>
          <span className="text-[10px] leading-snug text-white/90 sm:text-[11px]">{label}</span>
        </li>
      ))}
    </ul>
  );
}
