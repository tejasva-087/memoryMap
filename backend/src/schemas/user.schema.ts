import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  userName: varchar("user_name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  isVerified: boolean("is_verified").notNull().default(false),
  emailVerificationToken: varchar("email_verification_token", { length: 255 }),
  emailVerificationExpiresIn: timestamp("email_verification_expires_in"),

  password: varchar("password", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  passwordChangedAt: timestamp("password_changed_at"),

  passwordResetToken: varchar("password_reset_token", { length: 255 }),
  passwordResetExpiresIn: timestamp("password_reset_expires_in"),
});
