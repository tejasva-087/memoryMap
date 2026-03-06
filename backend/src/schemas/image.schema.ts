import { pgTable, uuid, text, integer, boolean } from "drizzle-orm/pg-core";
import { tripTable } from "./trip.schema";

export const tripImagesTable = pgTable("trip_images", {
  id: uuid("image_id").primaryKey().defaultRandom(),
  tripId: uuid("trip_id")
    .notNull()
    .references(() => tripTable.id, { onDelete: "cascade" }),

  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  orderIndex: integer("order_index").default(0),
});
