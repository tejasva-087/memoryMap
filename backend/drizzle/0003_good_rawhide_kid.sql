ALTER TABLE "trip_images" ADD COLUMN "image_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_images" DROP COLUMN "image_url";