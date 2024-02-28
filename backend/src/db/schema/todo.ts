import { sql } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title"),
  completed: boolean("completed").default(false),
  created_at: text("created_at").default(sql`now()`),
});
