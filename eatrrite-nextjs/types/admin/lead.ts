export type LeadGender = "Female" | "Male";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  /** Website bookings do not ask for these. The admin can add them later. */
  age?: number;
  gender?: LeadGender;
  profession?: string;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
};

export type LeadInput = Omit<Lead, "id" | "createdAt" | "updatedAt">;

export type LeadAgeFilter = "all" | "under18" | "18-30" | "31-45" | "46plus";

export type LeadListFilters = {
  query: string;
  age: LeadAgeFilter;
};
