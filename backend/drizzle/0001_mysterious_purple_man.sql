CREATE TABLE "trip_images" (
	"image_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"order_index" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "trip_images" ADD CONSTRAINT "trip_images_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "image_keys";