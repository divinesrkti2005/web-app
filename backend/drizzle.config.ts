import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config();

export default {
  schema: "./src/db/schema/todo.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./drizzle",
} satisfies Config;
