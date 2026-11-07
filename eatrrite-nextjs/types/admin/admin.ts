export type PatientStatus =
  | "new"
  | "follow-up-one"
  | "follow-up-two"
  | "follow-up-three"
  | "done";

export type Patient = {
  id: string;
  name: string;
  phone: string;
  age: number;
  profession?: string;
  status: PatientStatus;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "not-attended"
  | "cancelled";

export type Appointment = {
  id: string;
  patientId: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ScheduleTimeSlot = {
  id: string;
  openTime: string;
  closeTime: string;
};

export type DaySchedule = {
  day: Weekday;
  isOpen: boolean;
  slots: ScheduleTimeSlot[];
};

export type PatientInput = Omit<Patient, "id" | "createdAt" | "updatedAt">;
export type AppointmentInput = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;
