import { saveQuestionnaire } from "@/services/appointmentWrites";
import { fail, ok } from "@/utils/apiResponse";
import { validateQuestionnaire } from "@/utils/validateQuestionnaire";

type Context = { params: Promise<{ id: string }> };

// POST /api/appointments/:id/questionnaire → saves the answers once.
export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const answers = validateQuestionnaire(body.answers ?? {});
  if (typeof answers === "string") return fail(answers);
  try {
    const saved = await saveQuestionnaire(id, answers);
    if (!saved) return fail("This questionnaire was already submitted.", 409);
    return ok({ saved: true });
  } catch (error) {
    console.error("Save questionnaire failed", error);
    return fail("We could not save your answers. Please try again.", 500);
  }
}
