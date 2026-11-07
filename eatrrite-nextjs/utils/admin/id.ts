/** Stable runtime ids for clinic entities (patients, appointments, etc.). */
export function createId() {
  return crypto.randomUUID();
}
