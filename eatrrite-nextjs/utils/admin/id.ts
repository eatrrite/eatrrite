/** Stable runtime ids for clinic entities (leads, appointments, etc.). */
export function createId() {
  return crypto.randomUUID();
}
