"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_NAV } from "@/constants/admin/admin";

type AdminHeaderBreadcrumbsProps = {
  title: string;
  onMobileMenuClick: () => void;
};

function currentNavLabel(pathname: string, fallback: string) {
  const match = [...ADMIN_NAV]
    .reverse()
    .find((item) =>
      "exact" in item && item.exact
        ? pathname === item.href
        : pathname.startsWith(item.href),
    );
  return match?.label ?? fallback;
}

export function AdminHeaderBreadcrumbs({
  title,
  onMobileMenuClick,
}: AdminHeaderBreadcrumbsProps) {
  const pathname = usePathname();
  const isDashboard =
    pathname === "/admin/dashboard" || pathname === "/admin";
  const pageLabel = currentNavLabel(pathname, title);

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open sidebar"
        onClick={onMobileMenuClick}
      >
        <Menu className="size-4" />
      </Button>

      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
        <Link
          href="/admin/dashboard"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Admin home"
        >
          <Home className="size-4" />
        </Link>

        {!isDashboard ? (
          <>
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/70" />
            <Link
              href="/admin/dashboard"
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          </>
        ) : null}

        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/70" />
        <span
          className="truncate font-medium text-foreground"
          aria-current="page"
        >
          {pageLabel}
        </span>
      </nav>
    </div>
  );
}
