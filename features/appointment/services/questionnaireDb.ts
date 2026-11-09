import "server-only";
import { getBookingSettings, getQuestions } from "@/features/appointment/services/bookingConfig";
import { createMeetLink } from "@/features/appointment/services/meetLink";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";
import type { Lead, LeadGender } from "@/types/admin/lead";
import { applyLeadToQuestionnaire, isAdminQuestionnaireComplete } from "@/utils/admin/leadQuestionnaire";
import { db } from "@/services/database";

/** What the confirmation page shows. */
export type ConfirmedBooking = {
  id: string;
  name: string;
  phone: string;
  age?: number;
  gender?: LeadGender;
  service: string;
  date: string;
  time: string;
  /** Present once the questionnaire is submitted. */
  meetLink?: string;
  /** The fee is paid (payment_done); false while it is still due. */
  paid: boolean;
};

export type QuestionnaireInput = { name: string; age: number; gender: LeadGender; answers: QuestionnaireAnswers };

export async function getConfirmedBooking(id: string): Promise<ConfirmedBooking | null> {
  const [row] = await db()`
    select a.id, l.name, l.phone, l.age, l.gender, a.service, a.payment_done as paid,
      to_char(a.date, 'YYYY-MM-DD') as date, to_char(a.time, 'HH24:MI') as time,
      case when jsonb_array_length(a.questionnaire) > 0 then a.meet_link end as meet_link
    from er_appointments a join er_leads l on l.id = a.lead_id
    where a.id = ${id} and a.status <> 'cancelled'`;
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    age: row.age ?? undefined,
    gender: row.gender ?? undefined,
    service: row.service,
    date: row.date,
    time: row.time,
    meetLink: row.meet_link ?? undefined,
    paid: row.paid,
  };
}

// Creates the Meet link (Apps Script, as on the PHP site), then saves the answers on the
// appointment and the name, age and gender on the lead. If the link cannot be made nothing is
// saved, so the customer can submit again. Answers are saved once: a second submit keeps the first.
export async function saveQuestionnaire(appointmentId: string, input: QuestionnaireInput): Promise<{ meetLink: string }> {
  const sql = db();
  const [row] = await sql`
    select a.lead_id, a.meet_link, jsonb_array_length(a.questionnaire) as answered, a.service,
      to_char(a.date, 'YYYY-MM-DD') as date, to_char(a.time, 'HH24:MI') as time
    from er_appointments a
    where a.id = ${appointmentId} and a.status <> 'cancelled'`;
  if (!row) throw new Error("We could not find this booking.");
  if (row.answered > 0 && row.meet_link) return { meetLink: row.meet_link };

  const questions = await getQuestions();
  const ageRule = questions.find((question) => question.key === "age");
  const name = input.name.trim();
  if (name.length < 2) throw new Error("Please enter your full name.");
  if (!Number.isInteger(input.age) || input.age < (ageRule?.min ?? 1) || input.age > (ageRule?.max ?? 120)) {
    throw new Error(`Please enter an age between ${ageRule?.min ?? 1} and ${ageRule?.max ?? 120}.`);
  }
  const profile = { name, age: input.age, gender: input.gender } as Lead;
  const answers = applyLeadToQuestionnaire(input.answers, profile);
  if (!isAdminQuestionnaireComplete(answers, profile, questions)) throw new Error("Please answer every required question.");

  // The admin may have made the Meet link already (questionnaire left for the lead): keep it.
  const { meetingMinutes } = await getBookingSettings();
  const meetLink = row.meet_link || await createMeetLink({
    appointmentId, name, service: row.service, date: row.date, time: row.time, minutes: meetingMinutes,
  }).catch((error) => {
    console.error("Meet link failed", error);
    throw new Error("We could not create your Google Meet link. Please submit again in a moment.");
  });
  await sql.transaction([
    sql`update er_leads set name = ${name}, age = ${input.age}, gender = ${input.gender} where id = ${row.lead_id}`,
    sql`update er_appointments set questionnaire = ${JSON.stringify(answers)}::jsonb, meet_link = ${meetLink} where id = ${appointmentId}`,
  ]);
  return { meetLink };
}
