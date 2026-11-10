"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NAV_LINKS } from "@/constants/routes";

const isActive = (pathname: string, href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

const linkClass = (mobile: boolean, active: boolean) =>
  cn(
    "relative font-medium transition-colors duration-300 hover:text-primary",
    mobile ? "block rounded-lg px-3 py-2.5 hover:bg-beige" : "py-2 text-[0.95rem]",
    !mobile && "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full",
    active ? "text-primary after:w-full" : "text-ink after:w-0",
    mobile && active && "bg-beige"
  );

// Desktop or mobile list of the main links, with the active underline.
// A link with children opens a dropdown on desktop and lists them indented on mobile.
export function NavLinks({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className={cn("m-0 p-0", mobile ? "flex flex-col gap-1" : "flex items-center gap-6")}>
      {NAV_LINKS.map(({ label, href, children }) => {
        const active = isActive(pathname, href);
        if (children && mobile) {
          return (
            <li key={href}>
              <p className={cn(linkClass(true, false), "m-0 hover:bg-transparent hover:text-ink")}>{label}</p>
              <ul className="m-0 ml-3 flex flex-col gap-1 border-l border-border p-0 pl-2">
                {children.map((child) => (
                  <li key={child.href}>
                    <Link prefetch={false} href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={onNavigate} className={linkClass(true, pathname === child.href)}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }
        if (children) {
          return (
            <li key={href}>
              <DropdownMenu>
                <DropdownMenuTrigger openOnHover delay={80} className={cn(linkClass(false, active), "group/nav flex cursor-pointer items-center gap-1 bg-transparent outline-none")}>
                  {label}
                  <ChevronDown className="size-3.5 transition-transform duration-300 group-data-popup-open/nav:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} className="w-52 rounded-xl p-1.5">
                  {children.map((child) => (
                    <DropdownMenuItem
                      key={child.href}
                      render={<Link prefetch={false} href={child.href} />}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-2 text-[0.95rem] focus:bg-beige focus:text-primary not-data-[variant=destructive]:focus:**:text-primary",
                        pathname === child.href ? "bg-beige text-primary" : "text-ink"
                      )}
                    >
                      {child.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        }
        return (
          <li key={href}>
            <Link prefetch={false} href={href} aria-current={active ? "page" : undefined} onClick={onNavigate} className={linkClass(mobile, active)}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
