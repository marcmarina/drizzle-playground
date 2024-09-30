import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

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
    comments: many(comments),
  };
});

export const newUserSchema = createInsertSchema(users);

export const posts = sqliteTable("posts", {
  id: integer("id")
    .primaryKey({
      autoIncrement: true,
    })
    .unique(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  body: text("body").notNull(),
});

export const postRelations = relations(posts, ({ one, many }) => {
  return {
    user: one(users, {
      fields: [posts.userId],
      references: [users.id],
    }),
    comments: many(comments),
  };
});

export const comments = sqliteTable("comments", {
  id: integer("id")
    .primaryKey({
      autoIncrement: true,
    })
    .unique(),
  postId: integer("postId")
    .references(() => posts.id)
    .notNull(),
  authorId: integer("authorId")
    .references(() => users.id)
    .notNull(),
  body: text("body").notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => {
  return {
    author: one(users, {
      fields: [comments.authorId],
      references: [users.id],
    }),
    post: one(posts, {
      fields: [comments.postId],
      references: [posts.id],
    }),
  };
});
