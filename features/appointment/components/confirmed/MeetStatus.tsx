"use client";

import { Check, Copy, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShowToast } from "@/hooks/useShowToast";

// The confirmed panel: the Google Meet link, to open or copy. The link is a placeholder for now.
export function MeetStatus({ link }: { link: string }) {
  const showToast = useShowToast();

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      showToast({ title: "Meet link copied", type: "success" });
    } catch {
      showToast({ title: "Could not copy the link", description: "Select it and copy it by hand.", type: "error" });
    }
  }

  return (
    <div className="text-center">
      <div aria-hidden className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-primary text-white">
        <Check className="size-7" />
      </div>
      <h2 className="mb-2 text-2xl text-primary">Your booking is confirmed.</h2>
      <p className="text-text">Join your consultation with this Google Meet link at your booked time. We will also be in touch on WhatsApp.</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="mb-5 inline-block rounded-xs bg-beige px-4 py-2.5 font-semibold break-all text-primary">
        {link}
      </a>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" nativeButton={false} render={<a href={link} target="_blank" rel="noopener noreferrer" />}>
          <Video className="size-4" />
          Open Google Meet
        </Button>
        <Button size="lg" variant="outline" onClick={copy}>
          <Copy className="size-4" />
          Copy link
        </Button>
      </div>
    </div>
  );
}
