import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as auth from "@/drizzle/schema/auth";
import * as project from "@/drizzle/schema/project";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { ...auth, ...project } });
