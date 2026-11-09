"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AdminSidebarArt } from "@/components/admin/AdminSidebarArt";
import { AdminSidebarFooter } from "@/components/admin/AdminSidebarFooter";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SHELL_SIDEBAR_MOTION } from "@/constants/admin/adminShell";
import { cn } from "cn";

type AdminSidebarProps = {
  collapsed: boolean;
  onNavigate?: () => void;
  onToggleSidebar?: () => void;
  mode?: "rail" | "sheet";
};

export function AdminSidebar({
  collapsed,
  onNavigate,
  onToggleSidebar,
  mode = "rail",
}: AdminSidebarProps) {
  const body = (
    <div className="flex h-full flex-col bg-linear-to-b from-card via-card to-mint text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-sidebar-border/80 px-4">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className={cn(
            "inline-flex items-center",
            collapsed ? "justify-center" : "gap-2",
          )}
        >
          <Image
            src={
              collapsed
                ? "/images/logo/logo-mark.png"
                : "/images/logo/logo-horizontal.png"
            }
            alt="Eat Rrite"
            width={collapsed ? 36 : 168}
            height={collapsed ? 36 : 40}
            className={
              collapsed ? "size-9 object-contain" : "h-9 w-auto object-contain"
            }
          />
          <span className="sr-only">Eat Rrite Admin</span>
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <AdminSidebarNav collapsed={collapsed} onNavigate={onNavigate} />
        {!collapsed ? <AdminSidebarArt /> : null}
      </div>
      <AdminSidebarFooter
        collapsed={collapsed}
        onToggleSidebar={onToggleSidebar}
      />
    </div>
  );

  if (mode === "sheet") {
    return <div className="h-full w-full">{body}</div>;
  }

  return (
    <TooltipProvider delay={0}>
      <motion.aside
        {...SHELL_SIDEBAR_MOTION}
        className={cn(
          "h-dvh min-h-0 w-0 shrink-0 overflow-hidden border-0 bg-sidebar text-sidebar-foreground",
          "transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "md:border-r md:border-sidebar-border/80",
          collapsed ? "md:w-20" : "md:w-64",
        )}
      >
        <div className="hidden h-full md:block">{body}</div>
      </motion.aside>
    </TooltipProvider>
  );
}
