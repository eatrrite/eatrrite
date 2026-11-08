"use client";

import {
  PATIENT_STATUSES,
  PATIENT_STATUS_LABELS,
} from "@/constants/admin/patients/statuses";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PatientInput, PatientStatus } from "@/types/admin/admin";

type PatientFormFieldsProps = {
  value: PatientInput;
  onChange: (next: PatientInput) => void;
};

export function PatientFormFields({ value, onChange }: PatientFormFieldsProps) {
  const set = <K extends keyof PatientInput>(key: K, next: PatientInput[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="patient-name">Full name</Label>
        <Input
          id="patient-name"
          value={value.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="patient-phone">Phone</Label>
        <Input
          id="patient-phone"
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="patient-age">Age</Label>
        <Input
          id="patient-age"
          type="number"
          min={1}
          max={120}
          value={value.age}
          onChange={(e) => set("age", Number(e.target.value))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="patient-profession">Profession (optional)</Label>
        <Input
          id="patient-profession"
          value={value.profession ?? ""}
          onChange={(e) => set("profession", e.target.value || undefined)}
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={value.status}
          onValueChange={(status) => {
            if (status) set("status", status as PatientStatus);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>{PATIENT_STATUS_LABELS[value.status]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PATIENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {PATIENT_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="patient-email">Email (optional)</Label>
        <Input
          id="patient-email"
          type="email"
          value={value.email ?? ""}
          onChange={(e) => set("email", e.target.value || undefined)}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="patient-address">Address (optional)</Label>
        <Input
          id="patient-address"
          value={value.address ?? ""}
          onChange={(e) => set("address", e.target.value || undefined)}
        />
      </div>
    </div>
  );
}
