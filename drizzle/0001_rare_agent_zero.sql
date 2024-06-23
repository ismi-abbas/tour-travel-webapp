CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" uuid,
	"created_at" timestamp DEFAULT now()
);
