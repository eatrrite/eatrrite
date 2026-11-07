"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "cn";

type AdminSidebarFooterProps = {
  collapsed: boolean;
  onToggleSidebar?: () => void;
};

export function AdminSidebarFooter({
  collapsed,
  onToggleSidebar,
}: AdminSidebarFooterProps) {
  if (!onToggleSidebar) return null;

  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;

  const button = (
    <button
      type="button"
      onClick={onToggleSidebar}
      aria-label={label}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl text-sm font-medium transition",
        collapsed
          ? "justify-center px-4 py-4 text-sidebar-foreground/75 hover:bg-secondary"
          : "px-4 py-2.5 text-sidebar-foreground/75 hover:bg-secondary hover:text-secondary-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {collapsed ? (
        <span className="sr-only">{label}</span>
      ) : (
        <span>Collapse sidebar</span>
      )}
    </button>
  );

  return (
    <div
      className={cn(
        "border-t border-sidebar-border/80",
        collapsed ? "p-3" : "p-4",
      )}
    >
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger delay={0} render={<div className="w-full" />}>
            {button}
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            <p className="font-medium">{label}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        button
      )}
    </div>
  );
}
