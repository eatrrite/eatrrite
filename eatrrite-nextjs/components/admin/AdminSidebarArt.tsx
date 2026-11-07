"use client";

import Image from "next/image";

const SIDEBAR_ART = "/images/admin/layout/woman-with-laptop.png";

/** Decorative fill for empty space above the sidebar collapse control. */
export function AdminSidebarArt() {
  return (
    <div
      className="relative mt-auto min-h-0 flex-1 overflow-hidden px-2 pb-1"
      aria-hidden
    >
      <Image
        src={SIDEBAR_ART}
        alt=""
        width={480}
        height={520}
        className="pointer-events-none absolute inset-x-2 bottom-0 mx-auto h-auto max-h-full w-[calc(100%-1rem)] max-w-[14rem] object-contain object-bottom select-none"
        sizes="14rem"
        priority={false}
      />
    </div>
  );
}
