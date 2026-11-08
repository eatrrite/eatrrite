import "server-only";
import { createNeonAuth } from "@neon/auth/next/server";
import { env } from "@/config/env";

let instance: ReturnType<typeof createNeonAuth> | null = null;

// The Neon Auth (Managed Better Auth) server instance. Made on first use, so a build or a page
// that never touches auth does not need the auth settings.
export function neonAuth() {
  instance ??= createNeonAuth({
    baseUrl: env.neonAuthBaseUrl(),
    cookies: { secret: env.neonAuthCookieSecret() },
  });
  return instance;
}
