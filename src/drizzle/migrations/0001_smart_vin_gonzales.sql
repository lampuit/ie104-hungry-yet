ALTER TABLE "ratings" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "updatedAt" timestamp;