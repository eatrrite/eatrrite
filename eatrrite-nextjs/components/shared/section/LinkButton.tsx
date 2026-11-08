import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

// The shadcn (reference style) Button rendered as a Next.js link.
export function LinkButton({
  href,
  variant,
  size = "lg",
  className,
  ariaLabel,
  children,
}: {
  href: string;
  /** Hidden label for Google and screen readers when the visible text is generic ("Learn More"). */
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>) {
  return (
    <Button variant={variant} size={size} className={className} nativeButton={false} render={<Link href={href} aria-label={ariaLabel} />}>
      {children}
    </Button>
  );
}
