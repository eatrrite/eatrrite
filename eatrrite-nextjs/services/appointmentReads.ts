import { HOLD_MINUTES } from "@/constants/appointment/schedule";
import { db } from "@/services/database";
import type { Appointment } from "@/types/appointment";

type AppointmentRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  slot_start: string;
  status: Appointment["status"];
  razorpay_payment_id: string | null;
  questionnaire: Appointment["questionnaire"];
  meet_link: string | null;
};

function toAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    slotStart: new Date(row.slot_start).toISOString(),
    status: row.status,
    razorpayPaymentId: row.razorpay_payment_id,
    questionnaire: row.questionnaire,
    meetLink: row.meet_link,
  };
}

// Start times (HH:MM, India time) already taken on a date. A pending row
// counts only while its payment window is still open.
export async function takenTimes(date: string): Promise<string[]> {
  const rows = await db()`
    select to_char(slot_start at time zone 'Asia/Kolkata', 'HH24:MI') as time
    from appointments
    where (slot_start at time zone 'Asia/Kolkata')::date = ${date}::date
      and (
        status in ('confirmed', 'finalizing', 'completed')
        or (status = 'pending' and created_at > now() - make_interval(mins => ${HOLD_MINUTES}))
      )`;
  return rows.map((row) => String(row.time));
}

export async function findAppointment(id: string): Promise<Appointment | null> {
  const rows = await db()`select * from appointments where id = ${id}`;
  return rows[0] ? toAppointment(rows[0] as AppointmentRow) : null;
}

export async function findIdByOrder(orderId: string): Promise<string | null> {
  const rows = await db()`select id from appointments where razorpay_order_id = ${orderId}`;
  return rows[0] ? String(rows[0].id) : null;
}
