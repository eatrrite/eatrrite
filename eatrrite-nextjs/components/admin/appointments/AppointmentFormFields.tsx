"use client";

import { DatePicker } from "@/components/admin/forms/DatePicker";
import { TimeSelect } from "@/components/admin/forms/TimeSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPOINTMENT_STATUSES,
  APPOINTMENT_STATUS_LABELS,
} from "@/constants/admin/appointments/statuses";
import type { AppointmentInput, Patient } from "@/types/admin/admin";

type AppointmentFormFieldsProps = {
  value: AppointmentInput;
  patients: Patient[];
  onChange: (next: AppointmentInput) => void;
};

export function AppointmentFormFields({
  value,
  patients,
  onChange,
}: AppointmentFormFieldsProps) {
  const set = <K extends keyof AppointmentInput>(
    key: K,
    next: AppointmentInput[K],
  ) => onChange({ ...value, [key]: next });
  const selectedPatientName =
    patients.find((patient) => patient.id === value.patientId)?.name ??
    "Select patient";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label>Patient</Label>
        <Select
          value={value.patientId}
          onValueChange={(patientId) => {
            if (patientId) set("patientId", patientId);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select patient">
              {selectedPatientName}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {patients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="apt-date">Date</Label>
        <DatePicker
          id="apt-date"
          value={value.date}
          onChange={(date) => set("date", date)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="apt-time">Time</Label>
        <TimeSelect
          id="apt-time"
          value={value.time}
          onChange={(time) => set("time", time)}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="apt-reason">Service (optional)</Label>
        <Input
          id="apt-reason"
          value={value.reason}
          onChange={(e) => set("reason", e.target.value)}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Status</Label>
        <Select
          value={value.status}
          onValueChange={(status) => {
            if (status) set("status", status as AppointmentInput["status"]);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {APPOINTMENT_STATUS_LABELS[value.status]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {APPOINTMENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {APPOINTMENT_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="apt-notes">Notes (optional)</Label>
        <Textarea
          id="apt-notes"
          value={value.notes ?? ""}
          onChange={(e) => set("notes", e.target.value || undefined)}
        />
      </div>
    </div>
  );
}
