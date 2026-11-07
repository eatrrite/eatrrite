import Link from "next/link";
import { cn } from "cn";
import { pillVariants, type PillVariant } from "@/components/shared/PillButton";

// A link styled as a button. The PHP .btn elements are links too.
export function ButtonLink({
  href,
  variant,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  variant?: PillVariant;
}) {
  return (
    <Link href={href} className={cn(pillVariants({ variant }), className)}>
      {children}
    </Link>
  );
}
