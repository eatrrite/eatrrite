import type { NextRequest } from "next/server";
import { neonAuth } from "@/features/auth/services/neonAuth";
import { ADMIN_ROUTES } from "@/features/auth/utils/routes";

// Anyone without a session who opens an admin page goes to the admin login.
// The admin layout also checks the email is an admin email.
export default function proxy(request: NextRequest) {
  return neonAuth().middleware({ loginUrl: ADMIN_ROUTES.login })(request);
}

export const config = {
  matcher: ["/admin", "/admin/((?!login|signup|forgot-password|reset-password).*)"],
};
