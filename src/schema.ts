import { pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  lastName: varchar("last_name").notNull(),
  age: smallint("age").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id"),
  body: varchar("body"),
  userId: smallint("user_id")
    .references(() => users.id)
    .notNull(),
});
