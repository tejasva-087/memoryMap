CREATE TABLE "trip_images" (
	"image_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"order_index" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"trip_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"flag" varchar(255),
	"country_name" varchar(255) NOT NULL,
	"place_name" varchar(255) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"duration" varchar(255),
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"email_verification_token" varchar(255),
	"email_verification_expires_in" timestamp,
	"pending_email" varchar(255),
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"password_changed_at" timestamp,
	"password_reset_token" varchar(255),
	"password_reset_expires_in" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_pending_email_unique" UNIQUE("pending_email")
);
--> statement-breakpoint
ALTER TABLE "trip_images" ADD CONSTRAINT "trip_images_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;