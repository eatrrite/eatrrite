"use client";

import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { confirmedPath } from "@/constants/routes";

// The page where the lead fills in the questionnaire (the same one website bookings land on after
// paying). Sending it creates the Meet link if there is none yet. Shown while there are no answers.
export function AppointmentQuestionnaireLink({ appointmentId }: { appointmentId: string }) {
  const path = confirmedPath(appointmentId);

  // Read the address on click, so the copied link matches the site the admin is on.
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      toast.success("Questionnaire link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  }

  return (
    <div className="space-y-2 rounded-lg bg-mint px-3 py-2.5">
      <p className="m-0 text-xs text-muted-foreground">Share this link so the lead can fill it in.</p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant="outline" onClick={copy}>
          <Copy className="size-3.5" />
          Copy questionnaire link
        </Button>
        <Button size="sm" variant="ghost" nativeButton={false} render={<a href={path} target="_blank" rel="noopener" />}>
          <ExternalLink className="size-3.5" />
          Open
        </Button>
      </div>
    </div>
  );
}
