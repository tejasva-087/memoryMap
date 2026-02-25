ALTER TABLE "users" ADD COLUMN "first_name" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";