import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

// Public-site pill buttons, copied from the PHP .btn rules. The admin uses the
// shadcn Button in components/ui instead.
export const pillVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-7 py-3 font-heading text-base leading-[1.7] font-semibold tracking-[0.01em] whitespace-nowrap transition-all duration-300 ease-er outline-none select-none hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark hover:shadow-btn-primary",
        accent: "bg-accent text-ink hover:bg-accent-hover hover:shadow-btn-accent",
        "outline-light": "border border-white/30 bg-transparent text-white hover:bg-white hover:text-primary",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type PillVariant = VariantProps<typeof pillVariants>["variant"];

export function PillButton({
  variant,
  className,
  ...props
}: React.ComponentProps<"button"> & { variant?: PillVariant }) {
  return <button className={cn(pillVariants({ variant }), className)} {...props} />;
}
