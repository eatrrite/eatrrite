import { neonAuth } from "@/features/auth/services/neonAuth";

// Neon Auth's API (sign-in, sign-up, session, sign-out) runs through this route.
type Context = { params: Promise<{ path: string[] }> };
const handle = (method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE") => (request: Request, context: Context) =>
  neonAuth().handler()[method](request, context);

export const GET = handle("GET");
export const POST = handle("POST");
export const PUT = handle("PUT");
export const PATCH = handle("PATCH");
export const DELETE = handle("DELETE");
