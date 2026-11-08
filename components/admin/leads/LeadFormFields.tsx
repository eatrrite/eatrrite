"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadGender, LeadInput } from "@/types/admin/lead";

const GENDERS: LeadGender[] = ["Female", "Male"];

type LeadFormFieldsProps = {
  value: LeadInput;
  onChange: (next: LeadInput) => void;
};

export function LeadFormFields({ value, onChange }: LeadFormFieldsProps) {
  const set = <K extends keyof LeadInput>(key: K, next: LeadInput[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="lead-name">Full name</Label>
        <Input
          id="lead-name"
          value={value.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-phone">Phone</Label>
        <Input
          id="lead-phone"
          value={value.phone}
          onChange={(e) => set("phone", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-age">Age</Label>
        <Input
          id="lead-age"
          type="number"
          min={1}
          max={120}
          value={value.age}
          onChange={(e) => set("age", Number(e.target.value))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Gender</Label>
        <Select
          value={value.gender}
          onValueChange={(gender) => {
            if (gender) set("gender", gender as LeadGender);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>{value.gender}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {GENDERS.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-profession">Profession (optional)</Label>
        <Input
          id="lead-profession"
          value={value.profession ?? ""}
          onChange={(e) => set("profession", e.target.value || undefined)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-email">Email (optional)</Label>
        <Input
          id="lead-email"
          type="email"
          value={value.email ?? ""}
          onChange={(e) => set("email", e.target.value || undefined)}
        />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="lead-address">Address (optional)</Label>
        <Input
          id="lead-address"
          value={value.address ?? ""}
          onChange={(e) => set("address", e.target.value || undefined)}
        />
      </div>
    </div>
  );
}
