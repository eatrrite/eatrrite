/** Profile keys asked on the public questionnaire; filled from booking/lead elsewhere. */
export const PROFILE_QUESTION_KEYS = ["name", "age", "gender"] as const;

export type ProfileQuestionKey = (typeof PROFILE_QUESTION_KEYS)[number];

export function isProfileQuestionKey(key: string): key is ProfileQuestionKey {
  return (PROFILE_QUESTION_KEYS as readonly string[]).includes(key);
}
