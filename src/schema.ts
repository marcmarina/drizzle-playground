import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id")
    .primaryKey({
      autoIncrement: true,
    })
    .unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
});

export const userRelations = relations(users, ({ many }) => {
  return {
    posts: many(posts),
  };
});

export const posts = sqliteTable("posts", {
  id: integer("id")
    .primaryKey({
      autoIncrement: true,
    })
    .unique(),
  userId: integer("id")
    .references(() => users.id)
    .notNull(),
  body: text("body").notNull(),
});

export const postRelations = relations(posts, ({ one }) => {
  return {
    user: one(users, {
      fields: [posts.userId],
      references: [users.id],
    }),
  };
});
