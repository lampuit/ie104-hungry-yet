CREATE TABLE IF NOT EXISTS "userWorkShifts" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"shiftId" uuid,
	"workDate" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shifts" DROP CONSTRAINT "shifts_userWorkShift_users_userId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userWorkShifts" ADD CONSTRAINT "userWorkShifts_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userWorkShifts" ADD CONSTRAINT "userWorkShifts_shiftId_shifts_shiftId_fk" FOREIGN KEY ("shiftId") REFERENCES "public"."shifts"("shiftId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "shifts" DROP COLUMN IF EXISTS "userWorkShift";