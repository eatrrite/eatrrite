// API endpoints used by the browser.
export const API = {
  slots: "/api/slots",
  appointments: "/api/appointments",
  releaseHold: "/api/appointments/release",
  verifyPayment: "/api/payments/verify",
} as const;
