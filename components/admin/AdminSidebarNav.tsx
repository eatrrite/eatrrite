"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  CalendarDays,
  Clock3,
  LayoutDashboard,
  Settings,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ADMIN_NAV } from "@/constants/admin/admin";
import { cn } from "cn";

const ICONS: Record<string, LucideIcon> = {
  "/admin/dashboard": LayoutDashboard,
  "/admin/schedule": Clock3,
  "/admin/leads": Users,
  "/admin/appointments": CalendarDays,
  "/admin/calendar": Calendar,
  "/admin/account": UserRound,
  "/admin/settings": Settings,
};

type AdminSidebarNavProps = {
  collapsed: boolean;
  onNavigate?: () => void;
};

export function AdminSidebarNav({
  collapsed,
  onNavigate,
}: AdminSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className={cn(
        "min-h-0 space-y-1.5 overflow-y-auto",
        collapsed ? "flex-1 p-3" : "p-4",
      )}
    >
      {ADMIN_NAV.map((item) => {
        const Icon = ICONS[item.href] ?? LayoutDashboard;
        const active =
          "exact" in item && item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

        const link = (
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group/nav relative flex items-center gap-3 rounded-2xl text-sm font-medium transition-[background-color,color,translate] duration-300",
              collapsed ? "justify-center px-4 py-4" : "px-4 py-2.5",
              active
                ? "btn-elevated btn-primary ![background-clip:padding-box,border-box]"
                : "text-sidebar-foreground/75 hover:translate-x-0.5 hover:bg-mint hover:text-primary",
            )}
          >
            <Icon className={cn("size-4 shrink-0 transition-colors", active ? "text-accent" : "group-hover/nav:text-primary")} />
            {collapsed ? (
              <span className="sr-only">{item.label}</span>
            ) : (
              <span>{item.label}</span>
            )}
            {active && !collapsed ? <span aria-hidden className="ml-auto size-1.5 rounded-full bg-accent" /> : null}
          </Link>
        );

        if (!collapsed) return <div key={item.href}>{link}</div>;

        return (
          <Tooltip key={item.href}>
            <TooltipTrigger delay={0} render={<div className="w-full" />}>
              {link}
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <p className="font-medium">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}
