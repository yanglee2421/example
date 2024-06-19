import { relations } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("userTable", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
});

export const userTableRelation = relations(userTable, (ctx) => {
  return {
    profile: ctx.one(profileTable, {
      fields: [userTable.id],
      references: [profileTable.userId],
    }),
  };
});

export const profileTable = sqliteTable("profileTable", {
  id: integer("id").primaryKey(),
  userId: integer("userId"),
});
