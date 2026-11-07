"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";

const Dialog = DialogPrimitive.Root;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;

// Copies .er-modal, .er-modal__backdrop and .er-modal__dialog from appointment.css.
function DialogContent({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-backdrop"
        className="fixed inset-0 z-[10050] bg-[rgba(15,23,42,0.45)]"
      />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-0 left-1/2 z-[10051] my-4 max-h-[calc(100vh-32px)] w-[min(560px,calc(100%-24px))] -translate-x-1/2 overflow-auto rounded-md bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.2)] outline-none",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogClose, DialogContent, DialogTitle };
