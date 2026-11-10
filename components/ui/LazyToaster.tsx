"use client";

import { useEffect, useState, type ComponentProps } from "react";
import dynamic from "next/dynamic";

type ToasterProps = ComponentProps<typeof import("@/components/ui/sonner").Toaster>;

const Toaster = dynamic(() => import("@/components/ui/sonner").then((module) => module.Toaster), { ssr: false });

// Toasts only appear after something is done on the page, so the toast library is added once the
// page has finished loading, not with the first paint.
export function LazyToaster(props: ToasterProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let id = 0;
    const show = () => (id = window.setTimeout(() => setReady(true), 1000));
    if (document.readyState === "complete") show();
    else window.addEventListener("load", show, { once: true });
    return () => {
      window.removeEventListener("load", show);
      window.clearTimeout(id);
    };
  }, []);
  return ready ? <Toaster {...props} /> : null;
}
