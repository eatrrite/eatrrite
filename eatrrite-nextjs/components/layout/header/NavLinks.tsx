"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { NAV_LINKS } from "@/constants/routes";

// Desktop or mobile list of the main links, with the active underline.
export function NavLinks({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className={cn("m-0 p-0", mobile ? "flex flex-col gap-1" : "flex items-center gap-6")}>
      {NAV_LINKS.map(({ label, href }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "relative font-medium transition-colors duration-300 hover:text-primary",
                mobile ? "block rounded-lg px-3 py-2.5 hover:bg-mint" : "py-2 text-[0.95rem]",
                !mobile && "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full",
                active ? "text-primary after:w-full" : "text-ink after:w-0",
                mobile && active && "bg-mint"
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
