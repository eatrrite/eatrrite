/** Builds a Meet-style URL for admin-created appointments (preview / local store). */
export function generateAdminMeetLink(): string {
  const part = () => Math.random().toString(36).slice(2, 5);
  return `https://meet.google.com/${part()}-${part()}-${part()}`;
}
