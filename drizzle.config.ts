import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/drizzle/schema/",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:jrplCIV7QZ0M@ep-purple-wave-a5592zzs.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
