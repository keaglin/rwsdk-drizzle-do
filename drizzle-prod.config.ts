import "dotenv/config";
import { defineConfig, type Config } from "drizzle-kit";

const baseConfig: Config = {
  out: "./drizzle",
  schema: ["./src/db/schema.ts", "./src/db/auth-schema.ts"],
  dialect: "sqlite",
};

const prodConfig: Config = {
  ...baseConfig,
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
};

const config = defineConfig(prodConfig);

// console.log("starting drizzle using prod config", config);
export default config;
