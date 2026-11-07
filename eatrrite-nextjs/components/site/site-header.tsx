"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { navLinks } from "@/lib/data/site";
import { ButtonLink } from "./button-link";

// Copies .site-header, .site-nav and .nav-toggle from the PHP style.css.
export function SiteHeader() {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-primary/8 backdrop-blur-[10px] transition-all duration-300 ease-[ease]",
        sticky ? "bg-mint/97 shadow-nav-sticky" : "bg-white/96"
      )}
    >
      <div className="er-container relative flex min-h-[84px] items-center justify-between gap-5">
        <Link href="/" className="group/logo" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo/logo-horizontal.png"
            alt="Eat Rrite"
            width={1162}
            height={332}
            priority
            className="h-14 w-auto transition-transform duration-300 ease-[ease] group-hover/logo:scale-[1.03]"
          />
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="hidden cursor-pointer border-0 bg-transparent text-[28px] text-primary er-md:block"
        >
          ☰
        </button>
        <nav
          className={cn(
            "flex items-center gap-[22px]",
            "er-md:absolute er-md:top-full er-md:right-0 er-md:left-0 er-md:flex-col er-md:items-stretch er-md:gap-5 er-md:border-t er-md:border-primary/5 er-md:bg-white er-md:p-[30px] er-md:text-center er-md:shadow-nav-menu",
            !open && "er-md:hidden"
          )}
        >
          {navLinks.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "relative py-2 font-medium transition-colors duration-300 ease-[ease] hover:text-primary er-md:block er-md:py-2.5",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-[width] after:duration-300 after:ease-[ease] hover:after:w-full",
                  active ? "text-primary after:w-full" : "text-ink after:w-0"
                )}
              >
                {label}
              </Link>
            );
          })}
          <ButtonLink href="/appointment" className="er-md:w-full">
            Book Appointment
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
