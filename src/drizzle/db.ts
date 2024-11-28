import * as auth from "@/drizzle/schema/auth";
import * as project from "@/drizzle/schema/project";

import { config } from "dotenv";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

config({ path: ".env" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema: { ...auth, ...project } });
