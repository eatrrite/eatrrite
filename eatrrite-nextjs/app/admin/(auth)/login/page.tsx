import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/components/AuthForm";

export const metadata: Metadata = { title: "Admin sign in | Eat Rrite" };

export default function AdminLoginPage() {
  return <AuthForm mode="login" />;
}
