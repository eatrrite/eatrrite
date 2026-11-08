import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

// Header call to action, using the shadcn (reference style) Button.
export function BookButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Button size="lg" className={className} nativeButton={false} render={<Link href={ROUTES.appointment} onClick={onClick} />}>
      <CalendarDays />
      Book Appointment
    </Button>
  );
}
