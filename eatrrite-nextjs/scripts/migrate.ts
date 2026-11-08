// Runs one migration file against Neon in a single round trip (BEGIN … COMMIT is inside the file).
// Usage: bun run db:migrate            (runs db/migrations/001_initial.sql)
//        bun run db:migrate <file.sql>
import { readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const file = process.argv[2] ?? "db/migrations/001_initial.sql";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
try {
  await pool.query(await readFile(file, "utf8"));
  console.log(`Done: ${file}`);
} catch (error) {
  const e = error as { message: string; detail?: string };
  console.error(`Failed: ${file}\n${e.message}${e.detail ? `\n${e.detail}` : ""}\nNothing was saved (the file runs in one transaction).`);
  process.exitCode = 1;
} finally {
  await pool.end();
}
