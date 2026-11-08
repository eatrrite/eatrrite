import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Eat Rrite",
  robots: { index: false, follow: false },
};

// The admin panel (behind sign-in) and the login and signup pages share this.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
