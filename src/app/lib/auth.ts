import { createDrizzleClient } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/auth-schema";
import { env } from "cloudflare:workers";

export const auth = betterAuth({
  database: drizzleAdapter(createDrizzleClient(env.DB), {
    provider: "sqlite",
    schema
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});
