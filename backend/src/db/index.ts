/* eslint-disable no-var */
import dotenv from "dotenv";
dotenv.config();

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema/todo";

declare global {
  var db: NeonHttpDatabase<typeof schema> | undefined;
}

let db: NeonHttpDatabase<typeof schema>;

if (process.env.NODE_ENV === "development") {
  db = drizzle(neon(process.env.DATABASE_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(neon(process.env.DATABASE_URL!), {
      schema,
    });
  }
  db = global.db;
}

export { db };
