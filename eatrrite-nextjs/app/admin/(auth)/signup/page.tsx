import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/components/AuthForm";

export const metadata: Metadata = { title: "Create admin account | Eat Rrite" };

export default function AdminSignupPage() {
  return <AuthForm mode="signup" />;
}
