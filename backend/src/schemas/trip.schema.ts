import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";

export const tripTable = pgTable("trips", {
  id: uuid("trip_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  flag: varchar("flag", { length: 255 }).default(
    "https://flagcdn.com/w40/un.png",
  ),
  country: varchar("country_name", { length: 255 }).notNull(),
  place: varchar("place_name", { length: 255 }).notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),

  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),

  description: text("description").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
