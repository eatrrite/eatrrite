import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import { createMeetLink } from "@/features/appointment/services/appsScript";
import { findAppointment } from "@/features/appointment/services/appointmentReads";
import { claimForMeet, markMeetFailed, saveMeetLink } from "@/features/appointment/services/appointmentWrites";
import type { BookingAppointment } from "@/features/appointment/types/booking";
import { fail, ok } from "@/utils/apiResponse";

type Context = { params: Promise<{ id: string }> };

const endOf = (start: string) => new Date(new Date(start).getTime() + APPOINTMENT_SETTINGS.meetingMinutes * 60000);

// Apps Script expects times with the India offset, as PHP sent them.
const istIso = (date: Date) =>
  `${new Date(date.getTime() + 330 * 60000).toISOString().slice(0, 19)}+05:30`;

async function generate(appointment: BookingAppointment) {
  return createMeetLink({
    name: appointment.name,
    service: appointment.service,
    phone: appointment.phone,
    paymentId: appointment.razorpayPaymentId ?? "",
    startIso: istIso(new Date(appointment.slotStart)),
    endIso: istIso(endOf(appointment.slotStart)),
  });
}

// POST /api/appointments/:id/meet → creates the Meet link after the questionnaire.
export async function POST(_request: Request, { params }: Context) {
  const { id } = await params;
  const appointment = await findAppointment(id);
  if (!appointment) return fail("Appointment not found.", 404);
  if (appointment.meetLink) return ok({ meetLink: appointment.meetLink });
  if (!(await claimForMeet(id))) return ok({ status: "processing" });
  try {
    const meetLink = await generate(appointment);
    await saveMeetLink(id, meetLink);
    return ok({ meetLink });
  } catch (error) {
    console.error("Meet link failed", error);
    await markMeetFailed(id);
    return fail("We could not create your Meet link right now. Your slot is still reserved.", 502);
  }
}
