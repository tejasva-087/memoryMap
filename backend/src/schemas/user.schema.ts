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
  isVerified: boolean("is_verified").default(false),
  emailVerificationToken: varchar("email_verification_token", { length: 255 }),
  emailVerificationExpiresIn: timestamp("email_verification_expires_in"),

  password: varchar("password", { length: 255 }).notNull(),
});
