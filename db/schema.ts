import { relations } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("userTable", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  invitedBy: integer("invitedBy"),
});

export const userTableRelation = relations(userTable, (props) => {
  return {
    profile: props.one(profileTable, {
      fields: [userTable.id],
      references: [profileTable.userId],
    }),
    invitee: props.one(userTable, {
      fields: [userTable.invitedBy],
      references: [userTable.id],
    }),
    posts: props.many(postTable),
    organization: props.many(organizationTable),
  };
});

export const profileTable = sqliteTable("profileTable", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
});

export const postTable = sqliteTable("postTable", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  authorId: integer("id").notNull(),
});

export const postTableRelation = relations(postTable, (props) => {
  return {
    author: props.one(userTable, {
      fields: [postTable.authorId],
      references: [userTable.id],
    }),
    comments: props.many(commentTable),
  };
});

export const commentTable = sqliteTable("commentTable", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  authorId: integer("authorId").notNull(),
  postId: integer("postId").notNull(),
});

export const commentTableRelation = relations(commentTable, (props) => {
  return {
    post: props.one(postTable, {
      fields: [commentTable.postId],
      references: [postTable.id],
    }),
  };
});

export const organizationTable = sqliteTable("organizationTable", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const organizationTableRelation = relations(
  organizationTable,
  (props) => {
    return {
      users: props.many(userTable),
    };
  }
);

export const userToOrganizationTable = sqliteTable(
  "userToOrganizationTable",
  {
    userId: integer("userId").notNull(),
    organizationId: integer("organizationId").notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.organizationId] })]
);

export const userToOrganizationTableRelation = relations(
  userToOrganizationTable,
  (props) => {
    return {
      user: props.one(userTable, {
        fields: [userToOrganizationTable.userId],
        references: [userTable.id],
      }),
      organization: props.one(organizationTable, {
        fields: [userToOrganizationTable.organizationId],
        references: [organizationTable.id],
      }),
    };
  }
);

export const chatTable = sqliteTable("chatTable", {
  id: integer("id").primaryKey(),
  name: text("name").default(""),
});

export const chatTableRelation = relations(chatTable, (props) => ({
  messages: props.many(messageTable),
}));

export const messageTable = sqliteTable("messageTable", {
  id: integer("id").primaryKey(),
  chatId: integer("chatId").notNull(),
  role: text("name").default(""),
  content: text("content").default(""),
});

export const messageTableRelation = relations(messageTable, (props) => ({
  chat: props.one(chatTable, {
    fields: [messageTable.chatId],
    references: [chatTable.id],
  }),
}));
