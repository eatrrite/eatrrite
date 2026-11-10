"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useScrolled } from "@/hooks/useScrolled";
import { BRAND } from "@/constants/brand";
import { BookButton } from "./header/BookButton";
import { MenuToggle } from "./header/MenuToggle";
import { NavLinks } from "./header/NavLinks";

const ease = [0.22, 1, 0.36, 1] as const;
const transition = { duration: 0.45, ease };

// Full-width bar at the top. Once the page scrolls it shrinks into a floating
// rounded pill with blur, border and shadow, the way the Pico header does.
const BAR = {
  maxWidth: 1240,
  marginTop: 0,
  paddingTop: 14,
  paddingBottom: 14,
  borderRadius: 0,
  backgroundColor: "rgba(255, 255, 255, 1)",
  borderColor: "rgba(1, 78, 78, 0)",
  boxShadow: "0 0 0 rgba(1, 78, 78, 0)",
};
const PILL = {
  maxWidth: 1100,
  marginTop: 12,
  paddingTop: 8,
  paddingBottom: 8,
  borderRadius: 20,
  backgroundColor: "rgba(255, 255, 255, 0.62)",
  borderColor: "rgba(1, 78, 78, 0.10)",
  boxShadow: "0 12px 32px rgba(1, 78, 78, 0.10)",
};
// The open mobile menu needs a more solid pill so the links stay readable.
const PILL_OPEN = { ...PILL, backgroundColor: "rgba(255, 255, 255, 0.94)" };

export function SiteHeader() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 flow-root px-2">
      <m.div
        aria-hidden
        className="absolute inset-0 -z-10 border-b border-border bg-white"
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={transition}
      />
      <m.nav
        className={`mx-auto w-full border px-4 sm:px-5 bg-transparent ${scrolled ? "bg-white backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"}`}
        initial={false}
        animate={scrolled ? (open ? PILL_OPEN : PILL) : BAR}
        transition={transition}
      >
        <div className="flex items-center justify-between gap-5">
          <Link prefetch={false} href="/" onClick={close} className="shrink-0">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={1162}
              height={332}
              sizes="160px"
              priority
              className="h-11 w-auto"
            />
          </Link>
          <div className="hidden lg:block">
            <NavLinks />
          </div>
          <div className="hidden lg:block">
            <BookButton />
          </div>
          <MenuToggle open={open} onToggle={() => setOpen((v) => !v)} />
        </div>
        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              key="menu"
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
              transition={transition}
            >
              <div className="mt-3 flex flex-col gap-3 border-t border-border pt-3 pb-1">
                <NavLinks mobile onNavigate={close} />
                <BookButton className="w-full" onClick={close} />
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </m.nav>
    </header>
  );
}
