import { neon } from "@neondatabase/serverless";
import { env } from "@/config/env";

// One SQL client for the server. Queries use tagged templates, so values are
// always sent as parameters, never pasted into the SQL text.
export function db() {
  return neon(env.databaseUrl());
}
