export type AdminSettings = {
  emailReminders: boolean;
  smsReminders: boolean;
  appointmentEmails: boolean;
  marketingEmails: boolean;
  desktopNotifications: boolean;
  weeklyDigest: boolean;
};

export type AdminSettingsKey = keyof AdminSettings;
