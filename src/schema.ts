import { relations } from "drizzle-orm";
import { pgTable, serial, smallint, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  lastName: varchar("last_name").notNull(),
  age: smallint("age").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  body: varchar("body").notNull(),
  userId: smallint("user_id")
    .references(() => users.id, {
      onUpdate: "cascade",
    })
    .notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  body: varchar("body").notNull(),
  userId: smallint("user_id")
    .references(() => users.id, {
      onUpdate: "cascade",
    })
    .notNull(),
  postId: smallint("post_id")
    .references(() => posts.id, {
      onUpdate: "cascade",
    })
    .notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));
