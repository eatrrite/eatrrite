import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// Default copies .form-grid input. Add bookingFieldClass for .er-field input
// on the appointment form. Live site renders those fields in the browser font.
const bookingFieldClass =
  "h-[52px] rounded-xs border-transparent bg-white px-3.5 py-0 [font-family:Arial,sans-serif] text-[15px] leading-normal text-primary shadow-field focus-visible:border-primary focus-visible:bg-white focus-visible:shadow-booking-focus"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-sm border border-input bg-mint px-5 py-4 text-base leading-[1.7] text-ink transition-all duration-300 outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-white focus-visible:shadow-field-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input, bookingFieldClass }
