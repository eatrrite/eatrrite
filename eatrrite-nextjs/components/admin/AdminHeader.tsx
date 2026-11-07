"use client";

import { motion } from "framer-motion";
import { AdminHeaderActions } from "@/components/admin/AdminHeaderActions";
import { AdminHeaderBreadcrumbs } from "@/components/admin/AdminHeaderBreadcrumbs";
import { SHELL_HEADER_MOTION } from "@/constants/admin/adminShell";

type AdminHeaderProps = {
  title: string;
  onMobileMenuClick: () => void;
  onLogout: () => void;
};

export function AdminHeader({
  title,
  onMobileMenuClick,
  onLogout,
}: AdminHeaderProps) {
  return (
    <motion.header
      {...SHELL_HEADER_MOTION}
      className="z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card/90 px-4 backdrop-blur-md sm:px-6"
    >
      <AdminHeaderBreadcrumbs
        title={title}
        onMobileMenuClick={onMobileMenuClick}
      />
      <AdminHeaderActions onLogout={onLogout} />
    </motion.header>
  );
}
