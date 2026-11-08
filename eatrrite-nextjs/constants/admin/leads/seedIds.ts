/**
 * Fixed UUIDs for seed patients (generated via crypto.randomUUID once).
 * Kept stable so appointments can reference them and SSR/persist stay consistent.
 */
export const SEED_PATIENT_IDS = {
  sara: "852d2940-a715-44a2-8eee-b03ebd0893bb",
  rohan: "9437e1dc-ad49-4a1c-826c-fda105abeac6",
  neha: "0a57d89f-f952-4dfe-8029-832a88e74a57",
  ananya: "41e10350-9cb4-4398-bd5f-bcda5e3bdcdd",
  vikram: "510d1b2e-306c-4a74-81f1-3fb88b87f282",
  meera: "b2019ce6-ed35-4219-bd75-c8923fb7cf46",
  arjun: "504a5eb7-c241-446e-a291-25d9a036aca4",
  priya: "3618b22f-c314-4542-872a-e9619dcb70a8",
  kabir: "bdfbb974-f5f4-4cc2-ac57-8256df940eeb",
  isha: "8ead382f-625e-4140-978d-bbd82359e756",
  dev: "2d967191-e0ea-4b59-a87c-b7fb9e914371",
  leena: "fc003321-4c3f-480f-ae15-825542809ea8",
} as const;

export type SeedPatientKey = keyof typeof SEED_PATIENT_IDS;
