// What a server action returns: the result, or a message the page can show.
// Server actions return errors instead of throwing, because thrown messages are hidden in production.
export type ActionResult<T extends object = object> = ({ ok: true } & T) | { ok: false; error: string };

export async function attempt<T extends object>(work: () => Promise<T>, fallback: string): Promise<ActionResult<T>> {
  try {
    return { ok: true, ...(await work()) };
  } catch (error) {
    console.error(fallback, error);
    return { ok: false, error: error instanceof Error && error.message ? error.message : fallback };
  }
}
