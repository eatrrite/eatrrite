import { getInitials } from "@/utils/admin/initials";
import { cn } from "cn";

type DashboardAvatarProps = {
  name: string;
  className?: string;
};

export function DashboardAvatar({ name, className }: DashboardAvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground",
        className,
      )}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}
