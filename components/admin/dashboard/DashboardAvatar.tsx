import { ICON_TONES, type IconTone } from "@/constants/admin/tones";
import { getInitials } from "@/utils/admin/initials";
import { cn } from "cn";

const TONE_ORDER: IconTone[] = ["teal", "gold", "leaf", "coral"];

// Same name always gets the same colour, so people are easy to spot in lists.
const toneFor = (name: string) =>
  TONE_ORDER[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % TONE_ORDER.length];

type DashboardAvatarProps = {
  name: string;
  className?: string;
};

export function DashboardAvatar({ name, className }: DashboardAvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold ring-2 ring-white shadow-xs",
        ICON_TONES[toneFor(name)],
        className,
      )}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}
