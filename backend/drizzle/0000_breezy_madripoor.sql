CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false,
	"email_verification_token" varchar(255),
	"email_verification_expires_in" timestamp,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
