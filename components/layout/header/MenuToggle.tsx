"use client";

import { Menu, X } from "lucide-react";
import { cn } from "cn";

// Menu and close icons crossfade with a blur, as in the Pico header.
export function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const icon = "absolute size-6 transition-all duration-300";
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="relative flex size-11 cursor-pointer items-center justify-center rounded-lg text-primary transition-colors hover:bg-beige lg:hidden"
    >
      <Menu className={cn(icon, open ? "opacity-0 blur-md" : "opacity-100 blur-0")} />
      <X className={cn(icon, open ? "opacity-100 blur-0" : "opacity-0 blur-md")} />
    </button>
  );
}
