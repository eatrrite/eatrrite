import type { AdminSettings, AdminSettingsKey } from "@/types/admin/settings";

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  emailReminders: true,
  smsReminders: false,
  appointmentEmails: true,
  marketingEmails: false,
  desktopNotifications: true,
  weeklyDigest: true,
};

export const SETTINGS_TOGGLES: {
  key: AdminSettingsKey;
  title: string;
  description: string;
}[] = [
  {
    key: "emailReminders",
    title: "Email reminders",
    description: "Send appointment reminders to leads by email.",
  },
  {
    key: "smsReminders",
    title: "SMS reminders",
    description: "Send short text reminders before consultations.",
  },
  {
    key: "appointmentEmails",
    title: "Booking emails",
    description: "Notify Eat Rrite when a new consultation is booked.",
  },
  {
    key: "marketingEmails",
    title: "Marketing emails",
    description: "Occasional nutrition tips and updates.",
  },
  {
    key: "desktopNotifications",
    title: "Desktop notifications",
    description: "Show alerts in the admin browser tab.",
  },
  {
    key: "weeklyDigest",
    title: "Weekly digest",
    description: "A Monday summary of consultations and open todos.",
  },
];
