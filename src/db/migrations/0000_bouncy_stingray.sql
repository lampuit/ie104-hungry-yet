CREATE TABLE IF NOT EXISTS "Categories" (
	"ProductId" serial PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"ImageUrl" text,
	"CreatedDate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FoodStall" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" integer NOT NULL,
	"ProductId" integer NOT NULL,
	"Address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "OrderDetail" (
	"OrderId" integer NOT NULL,
	"UserId" integer NOT NULL,
	"ProductId" integer NOT NULL,
	"Quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Orders" (
	"OrderId" serial PRIMARY KEY NOT NULL,
	"UserId" integer NOT NULL,
	"TotalAmount" integer NOT NULL,
	"Status" text,
	"OrderDate" timestamp NOT NULL,
	"DeliveryAddress" text NOT NULL,
	"DeliveryTime" timestamp NOT NULL,
	"Distance" real NOT NULL,
	"Rating" integer,
	"Review" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Products" (
	"ProductId" serial PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"Description" text,
	"Price" real NOT NULL,
	"Quantity" integer NOT NULL,
	"ImageUrl" text,
	"CategoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"UserId" serial PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"Age" integer NOT NULL,
	"UserName" text NOT NULL,
	"Password" text NOT NULL,
	"Phone" text NOT NULL,
	"Email" text NOT NULL,
	"Address" text,
	"ImageUrl" text,
	"IsCustomer" boolean,
	"CreatedDate" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_Phone_unique" UNIQUE("Phone"),
	CONSTRAINT "Users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FoodStall" ADD CONSTRAINT "FoodStall_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FoodStall" ADD CONSTRAINT "FoodStall_ProductId_Products_ProductId_fk" FOREIGN KEY ("ProductId") REFERENCES "public"."Products"("ProductId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_ProductId_Products_ProductId_fk" FOREIGN KEY ("ProductId") REFERENCES "public"."Products"("ProductId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Orders" ADD CONSTRAINT "Orders_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Products" ADD CONSTRAINT "Products_CategoryId_Categories_ProductId_fk" FOREIGN KEY ("CategoryId") REFERENCES "public"."Categories"("ProductId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
