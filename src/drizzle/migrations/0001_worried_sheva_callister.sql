ALTER TABLE "favorite" ADD PRIMARY KEY ("userId");--> statement-breakpoint
ALTER TABLE "favorite" ADD PRIMARY KEY ("productId");--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "imageURL" text;