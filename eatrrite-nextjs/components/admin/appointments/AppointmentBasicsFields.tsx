"use client";

import { DatePicker } from "@/components/admin/forms/DatePicker";
import { TimeSelect } from "@/components/admin/forms/TimeSelect";
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
import { SERVICES } from "@/constants/appointment/schedule";
import type { ClinicAppointmentInput } from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";

type AppointmentBasicsFieldsProps = {
  value: ClinicAppointmentInput;
  leads: Lead[];
  onChange: (next: ClinicAppointmentInput) => void;
  onLeadChange: (leadId: string) => void;
};

export function AppointmentBasicsFields({
  value,
  leads,
  onChange,
  onLeadChange,
}: AppointmentBasicsFieldsProps) {
  const set = <K extends keyof ClinicAppointmentInput>(
    key: K,
    next: ClinicAppointmentInput[K],
  ) => onChange({ ...value, [key]: next });
  const selectedLeadName =
    leads.find((lead) => lead.id === value.leadId)?.name ?? "Select lead";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label>Lead</Label>
        <Select
          value={value.leadId}
          onValueChange={(leadId) => {
            if (leadId) onLeadChange(leadId);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select lead">
              {selectedLeadName}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {leads.map((lead) => (
              <SelectItem key={lead.id} value={lead.id}>
                {lead.name}
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
        <Label>Service</Label>
        <Select
          items={SERVICES.map((s) => ({ label: s, value: s }))}
          value={value.service || null}
          onValueChange={(service) => {
            if (service) set("service", service);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a service">
              {value.service || "Select a service"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((service) => (
              <SelectItem key={service} value={service} className="whitespace-normal">
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Status</Label>
        <Select
          value={value.status}
          onValueChange={(status) => {
            if (status) set("status", status as ClinicAppointmentInput["status"]);
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
