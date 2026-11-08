/** Stable runtime ids for store entities (leads, appointments, etc.). */
export function createId() {
  return crypto.randomUUID();
}
