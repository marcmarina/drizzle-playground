import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  lastName: varchar("last_name").notNull(),
  age: smallint("age").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id"),
  body: varchar("body").notNull(),
  userId: smallint("user_id")
    .references(() => users.id)
    .notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  users: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
