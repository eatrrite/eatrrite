"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

// True once the page has scrolled past `offset` pixels (framer-motion scroll value).
export function useScrolled(offset = 40) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > offset));
  return scrolled;
}
