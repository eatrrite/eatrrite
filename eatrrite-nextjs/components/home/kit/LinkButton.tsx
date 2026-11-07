import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

// The shadcn (Deccan style) Button rendered as a Next.js link.
export function LinkButton({
  href,
  variant,
  size = "lg",
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>) {
  return (
    <Button variant={variant} size={size} className={className} nativeButton={false} render={<Link href={href} />}>
      {children}
    </Button>
  );
}
