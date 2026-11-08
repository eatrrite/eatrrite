// API endpoints used by the browser.
export const API = {
  slots: "/api/slots",
  appointments: "/api/appointments",
  verifyPayment: "/api/payments/verify",
  questionnaire: (id: string) => `/api/appointments/${id}/questionnaire`,
  meet: (id: string) => `/api/appointments/${id}/meet`,
} as const;
