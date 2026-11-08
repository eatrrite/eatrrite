/** What a sign-in or sign-up form shows after submitting. */
export type AuthFormState = { error: string } | null;

/** The signed-in admin, from the Neon Auth session. */
export type AdminUser = { id: string; email: string; name: string };

/** One row of er_profiles. */
export type Profile = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  address?: string;
};
