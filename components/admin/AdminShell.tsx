"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ADMIN_NAV } from "@/constants/admin/admin";
import { signOutAction } from "@/features/auth/services/authActions";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  const title = useMemo(() => {
    const match = [...ADMIN_NAV]
      .reverse()
      .find((item) =>
        "exact" in item && item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href),
      );
    return match?.label ?? "Admin";
  }, [pathname]);

  return (
    <div className="admin-shell flex h-dvh overflow-hidden bg-background">
      <AdminSidebar
        collapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent side="left" className="w-64 max-w-[85vw] p-0" showCloseButton>
          <SheetHeader className="sr-only">
            <SheetTitle>Admin navigation</SheetTitle>
          </SheetHeader>
          <AdminSidebar
            mode="sheet"
            collapsed={false}
            onNavigate={() => setIsMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <AdminHeader
          title={title}
          onMobileMenuClick={() => setIsMobileNavOpen(true)}
          onLogout={signOutAction}
        />
        <main className="relative isolate min-h-0 flex-1 overflow-y-auto px-4 py-6 text-left sm:px-6 lg:px-8">
          {/* Soft teal and gold glows behind the page, as on the website; they never take clicks. */}
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 right-[-10rem] size-[34rem] rounded-full bg-primary/[0.07] blur-3xl" />
            <div className="absolute bottom-[-12rem] left-[10%] size-[30rem] rounded-full bg-accent/[0.10] blur-3xl" />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
