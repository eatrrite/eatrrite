import * as React from "react"
import { cn } from "cn"

// Copies .form-grid textarea from the PHP style.css.
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-32 w-full rounded-sm border border-input bg-mint px-5 py-4 text-base leading-[1.7] text-ink transition-all duration-300 outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-white focus-visible:shadow-field-focus disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
