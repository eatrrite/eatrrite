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
        "min-h-0 shrink-0 space-y-1.5 overflow-y-auto",
        collapsed ? "flex-1 p-3" : "max-h-[55%] p-4",
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
              "flex items-center gap-3 rounded-2xl text-sm font-medium transition",
              collapsed ? "justify-center px-4 py-4" : "px-4 py-2.5",
              active
                ? "btn-elevated btn-primary ![background-clip:padding-box,border-box]"
                : "text-sidebar-foreground/75 hover:bg-secondary hover:text-secondary-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {collapsed ? (
              <span className="sr-only">{item.label}</span>
            ) : (
              <span>{item.label}</span>
            )}
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
