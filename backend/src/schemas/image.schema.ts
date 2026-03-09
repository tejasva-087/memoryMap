import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";
import { tripTable } from "./trip.schema";

export const imageTable = pgTable("trip_images", {
  id: uuid("image_id").primaryKey().defaultRandom(),
  tripId: uuid("trip_id")
    .notNull()
    .references(() => tripTable.id, { onDelete: "cascade" }),

  imageKey: text("image_key").notNull(),
  caption: text("caption"),
  orderIndex: integer("order_index").default(0),
});
