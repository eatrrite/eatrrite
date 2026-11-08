import { SEED_LEAD_IDS, type SeedLeadKey } from "@/constants/admin/leads/seedIds";
import type { Lead, LeadGender } from "@/types/admin/lead";

type SeedRow = [
  key: SeedLeadKey,
  name: string,
  phone: string,
  age: number,
  gender: LeadGender,
  profession: string,
  createdAt: string,
  updatedAt: string,
  email?: string,
  address?: string,
];

// Sample leads for the admin preview. Names are made up, not real clients.
/** Fixed createdAt/updatedAt relative to dashboard reference 2026-10-30. */
const ROWS: SeedRow[] = [
  ["sara", "Sara Ahmed", "98765 10001", 29, "Female", "Designer", "2026-10-28T09:00:00.000Z", "2026-10-30T08:00:00.000Z"],
  ["rohan", "Rohan Kapoor", "98765 10002", 35, "Male", "Banker", "2026-10-26T11:00:00.000Z", "2026-10-29T10:00:00.000Z"],
  ["neha", "Neha Patel", "98765 10003", 31, "Female", "Consultant", "2026-10-20T08:30:00.000Z", "2026-10-28T12:00:00.000Z"],
  ["ananya", "Ananya Reddy", "98765 43210", 32, "Female", "Software engineer", "2026-10-12T10:00:00.000Z", "2026-10-25T10:00:00.000Z", "ananya.reddy@example.com", "Hyderabad"],
  ["vikram", "Vikram Singh", "98123 45678", 41, "Male", "School teacher", "2026-09-18T08:30:00.000Z", "2026-10-15T09:00:00.000Z", "vikram.singh@example.com"],
  ["meera", "Meera Iyer", "99001 22334", 28, "Female", "Architect", "2026-09-02T14:15:00.000Z", "2026-10-02T14:15:00.000Z", undefined, "Dehradun"],
  ["arjun", "Arjun Sharma", "98111 22003", 38, "Male", "Entrepreneur", "2026-08-14T07:00:00.000Z", "2026-09-20T11:00:00.000Z"],
  ["priya", "Priya Sharma", "98222 33004", 26, "Female", "Student", "2026-07-22T13:00:00.000Z", "2026-08-30T16:00:00.000Z"],
  ["kabir", "Kabir Khan", "98333 44005", 45, "Male", "Civil engineer", "2026-06-10T10:00:00.000Z", "2026-07-18T10:00:00.000Z"],
  ["isha", "Isha Nair", "98444 55006", 33, "Female", "Doctor", "2026-05-05T09:30:00.000Z", "2026-06-12T09:30:00.000Z"],
  ["dev", "Dev Malhotra", "98555 66007", 52, "Male", "Retired", "2026-04-18T12:00:00.000Z", "2026-05-01T12:00:00.000Z"],
  ["leena", "Leena Joshi", "98666 77008", 37, "Female", "HR manager", "2026-03-08T15:00:00.000Z", "2026-04-02T15:00:00.000Z"],
];

export const SEED_LEADS: Lead[] = ROWS.map(
  ([key, name, phone, age, gender, profession, createdAt, updatedAt, email, address]) => ({
    id: SEED_LEAD_IDS[key],
    name,
    phone,
    age,
    gender,
    profession,
    createdAt,
    updatedAt,
    ...(email ? { email } : {}),
    ...(address ? { address } : {}),
  }),
);
