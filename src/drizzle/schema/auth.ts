import { pgTable, pgEnum, text, timestamp } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role", ["admin", "staff", "customer"]);
export const genderEnum = pgEnum("gender", ["Nam", "Nữ", "Khác"]);
import { createInsertSchema } from "drizzle-zod";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  phone: text("phone"),
  email: text("email"),
  gender: genderEnum("gender"),
  address: text("address"),
  imageUrl: text("imageUrl"),
  birthday: timestamp("birthday"),
  role: userRoleEnum("role"),
  createdAt: timestamp("createdAt"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const insertUserSchema = createInsertSchema(user);
