import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      address: {
        type: "string",
      },
      birthday: {
        type: "date",
      },
      gender: {
        type: "string",
      },
      imageUrl: {
        type: "string",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  logger: {
    verboseLogging: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
});
